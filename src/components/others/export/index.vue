<style lang="less">
</style>

<template>
    <Card>
        <h4 slot="title">数据导出</h4>
        <Row class="margin-top-10">
            <Col span="8">
                <div>选择要导出的内容：</div>
                <Tree
                    show-checkbox
                    @on-select-change="treeNodeSelect"
                    @on-check-change="treeCheckChange"
                    :data="TreeNodeConfig">
                </Tree>
            </Col>

            <Col span="8">
                <div style="padding-bottom: 10px;">导出字段设置</div>
                <div style="border:thin dashed lightgray;padding:15px;width:60%;">
                    <div v-if="TreeNodeField.hasOwnProperty(currentNode)">
                        <div
                            v-for="(key,index) in TreeNodeField[currentNode]"
                            :key="key.label">
                            <Checkbox
                                :key="currentNode + key.label"
                                v-model="TreeNodeField[currentNode][index]['enable']">
                                {{key.label}}
                            </Checkbox>
                        </div>
                    </div>
                    <div v-else style="font-size: 8px;color: #aaa;">选中左侧某个树节点以查看其导出字段信息</div>
                </div>
            </Col>

            <Col span="8">
                <div>导出进度</div>
                <Progress :percent="typesToExport.length ? Math.ceil(current / typesToExport.length * 100) : 0">
                </Progress>
                <Button
                    :disabled="working"
                    type="success"
                    icon="share"
                    @click="exportFile">
                    导出数据
                </Button>
                    <p v-if="working">
                        正在导出第{{ current }}个，共{{ typesToExport.length }}个。
                    </p>
            </Col>
        </Row>


    </Card>
</template>

<script>
import blobUtil from 'blob-util';
import json2csv from 'json2csv';
import download from 'downloadjs';

import NodeConfig from './node-config';
import NodeField from './node-field';
import NodeProcessor from './node-processor';

export default {
    name: 'TableExport',
    props: {},
    data () {
        return {
            TreeNodeConfig: NodeConfig,
            TreeNodeField: NodeField,

            current: 0,
            working: false,
            currentNode: '',
            typesToExport: [],
        };
    },
    methods: {
        resetProgress () {
            this.current = 0;
        },
        treeNodeSelect (data) {
            this.resetProgress();
            if (data && data.length && data[0].key) {
                this.currentNode = data[0].key;
            } else {
                this.currentNode = null;
            }
        },
        treeCheckChange (data) {
            this.resetProgress();
            let array = [];

            function findNode (obj) {
                if (obj && obj['key']) {
                    array.push(obj);
                }
            };
            data.map((item) => {
                findNode(item);
            });
            this.typesToExport = array;
        },
        exportFile: async function () {
            this.resetProgress();
            this.working = true;
            for (let i = 0; i < this.typesToExport.length; i++) {
                this.current = i + 1;
                await this.processExport(this.typesToExport[i]);
            }
            this.working = false;
        },
        processExport: async function (typeObj) {
            // 请求所有的数据记录
            let resp = await this.$store.dispatch(typeObj.action, {recursive: true});
            // 按不同的type处理
            let data = await NodeProcessor(typeObj, resp, this.$store.state);
            // 要导出的字段
            let fields = this.TreeNodeField[typeObj.key].filter(item => item.enable);
            // 本次得到的csv数据
            let csv = json2csv({ data: data, fields: fields, hasCSVColumnTitle: true, newLine: '\r\n', withBOM: true });
            // 下载文件
            download(blobUtil.createBlob([csv], {type: 'text/plain'}), typeObj.fileName + '.csv', 'text/plain');
        },
    },
};
</script>
