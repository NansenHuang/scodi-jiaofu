<style lang="less">
</style>

<template>
    <Card>
      <h4 slot="title">数据导出</h4>
        <Row class="margin-top-10">
          <Col span="8">
            <div>数据源选择</div>
            <Tree :data="typeData" show-checkbox @on-select-change="nodeSelect" @on-check-change="checkChange"></Tree>
          </Col>
          <Col span="8">
            <div>导出字段</div>
            <div style="border:thin dashed lightgray;padding:15px;width:60%;">
                <div :v-if="typeField.hasOwnProperty(currentNode)">
                  <div v-for="(key,index) in typeField[currentNode]" :key="key.label">
                      <Checkbox :key="currentNode + key.label" v-model="typeField[currentNode][index]['enable']">{{key.label}}</Checkbox>
                  </div>
                </div>
            </div>
          </Col>
          <Col span="8">
            <div>导出进度</div>
            <Progress :percent="singleProgress"></Progress>
            <Progress :percent="typesToExport.length ? Math.ceil(current / typesToExport.length * 100) : 0"></Progress>
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
import Services from 'src/services';
import blobUtil from 'blob-util';
import json2csv from 'json2csv';
import Field, { SubField } from 'src/config/field';
import Cookies from 'js-cookie';
import FieldName from './field-name';
const iconv = require('iconv-lite');

export default {
    name: 'TableExport',
    props: {},
    data () {
        return {
            exportEmptyTable: true,
            typeData: [
                {
                    title: '全部',
                    expand: true,
                    children: [
                        {
                            title: '区段',
                            expand: true,
                            children: [
                                {
                                    title: '施工区段',
                                    key: 'Section',
                                },
                            ]
                        },
                        {
                            title: '路线',
                            expand: true,
                            children: [
                                {
                                    title: '路线',
                                    key: 'Alignment',
                                },
                                {
                                    title: '区段路线',
                                    key: 'Blignment',
                                },
                                {
                                    title: '断链',
                                    key: 'Chain',
                                },
                                {
                                    title: '互通',
                                    key: 'Interchange',
                                },
                                {
                                    title: '服务区',
                                    key: 'Servicearea',
                                },
                                {
                                    title: '停车区',
                                    key: 'Parkinglot',
                                },
                                {
                                    title: '挡墙',
                                    key: 'Guardwall',
                                },
                                {
                                    title: '边沟盲沟',
                                    key: 'SideBlinddrain',
                                },
                                {
                                    title: '交界盲沟',
                                    key: 'CrossBlinddrain',
                                },
                                {
                                    title: '软基处理',
                                    key: 'Softbase',
                                },
                            ]
                        },
                        {
                            title: '结构物',
                            expand: true,
                            children: [
                                {
                                    title: '桥梁',
                                    key: 'Bridge',
                                },
                                {
                                    title: '地质',
                                    key: 'Geology',
                                },
                                {
                                    title: '隧道',
                                    key: 'Tunnel',
                                },
                                {
                                    title: '涵洞',
                                    key: 'Culvert',
                                },
                                {
                                    title: '天桥',
                                    key: 'Overbridge',
                                },
                            ]
                        },
                    ]
                }
            ],
            currentNode: '',
            typeField: {},
            singleProgress: 0,

            current: 0,
            typesToExport: [],
            working: false,

            queryFuncs: {
                Section: Services.Section.Construction.query,
                Alignment: Services.Alignment.Alignment.query,
                Blignment: Services.Alignment.Blignment.query,
                Chain: Services.Alignment.Chain.query,
                Interchange: Services.Alignment.Interchange.query,
                Servicearea: Services.Alignment.Servicearea.query,
                Parkinglot: Services.Alignment.Parkinglot.query,
                Guardwall: Services.Alignment.Guardwall.query,
                SideBlinddrain: Services.Alignment.SideBlinddrain.query,
                CrossBlinddrain: Services.Alignment.CrossBlinddrain.query,
                Softbase: Services.Alignment.Softbase.query,
                Bridge: Services.Structure.Bridge.query,
                Geology: Services.Structure.Geology.query,
                Tunnel: Services.Structure.Tunnel.query,
                Culvert: Services.Structure.Culvert.query,
                Overbridge: Services.Structure.Overbridge.query,
            },
        };
    },
    computed: {},
    methods: {
        checkChange (data) {
            this.current = 0;
            this.singleProgress = 0;
            let array = [];

            function findNode (obj) {
                if (obj && obj['key']) {
                    array.push(obj['key']);
                }
            };
            data.map((item) => {
                findNode(item);
            });
            this.typesToExport = array;
        },
        nodeSelect (data) {
            this.current = 0;
            this.singleProgress = 0;
            if (data && data.length && data[0].key) {
                this.currentNode = data[0].key;
            } else {
                this.currentNode = null;
            }
        },
        exportFile: async function () {
            this.working = true;
            this.current = 0;
            this.singleProgress = 0;
            for (let i = 0; i < this.typesToExport.length; i++) {
                this.current = i + 1;
                await this.requestTypeData(this.typesToExport[i]);
            }
            this.working = false;
        },
        requestTypeData: async function (type) {
            let queryFunc = this.queryFuncs[type];
            let blobArray = [];

            this.singleProgress = 0;
            let total = 0;
            let currentAmount = 0;
            let afterArray = [];
            let isFirstTime = true;
            while (true) {
                // 构造查询参数
                let queryBody = {
                    size: 50,
                    sort: [{Timestamp: {order: 'asc'}}],
                };
                if (!isFirstTime) {
                    queryBody['search_after'] = afterArray;
                };
                // 原始response
                let resp = await queryFunc(Cookies.get('project'), JSON.stringify(queryBody));
                if (!(resp && resp['hits'] && resp['hits']['hits'] && resp['hits']['hits'].length)) {
                    // eslint-disable-next-line no-console
                    console.warn(`${type}: 未找到有效的数据。`);
                    if (!this.exportEmptyTable) {
                        break;
                    };
                };
                // 提取数据内容
                let data = [];
                let sort = [];
                if (resp && resp['hits'] && resp['hits']['hits']) {
                    data = resp['hits']['hits'].map(item => {
                        return {
                            ...item['_source']['Data'],
                            id: item['_source']['ID'],
                        };
                    });
                    sort = resp['hits']['hits'].map(item => item['sort']);
                    // 记录下一步要用的search_after
                    afterArray = sort[sort.length - 1];
                    // 记录数据总条数
                    total = resp['hits']['total'];
                } else {
                    ;
                };
                // 记录当前已获得条数
                currentAmount += data.length;
                // 更新进度显示
                this.singleProgress = total === 0 ? 100 : Math.ceil(currentAmount / total * 100);
                // 解析JSON字段
                if (SubField[type] && data.length) {
                    data.map((dataItem) => {
                        Object.keys(SubField[type]).map((Key) => {
                            if (typeof dataItem[Field[type][Key]] === 'string') {
                                dataItem[Field[type][Key]] = JSON.parse(dataItem[Field[type][Key]]);
                            };
                        });
                    });
                };
                if (type === 'Section') {
                    let newData = [];
                    data.map((item) => {
                        if (item[Field.Section.RightPart]) {
                            let newItem = JSON.parse(JSON.stringify(item));
                            delete newItem[Field.Section.LeftPart];
                            // let newItem = {};
                            // Object.keys(item).map((key) => {
                            //     if (key !== Field.Section.LeftPart) {
                            //         newItem[key] = item[]
                            //     };
                            // });
                            newData.push(newItem);
                        };
                        if (item[Field.Section.LeftPart] && Array.isArray(item[Field.Section.LeftPart])) {
                            for (let i = 0; i < item[Field.Section.LeftPart].length; i++) {
                                let newItem = JSON.parse(JSON.stringify(item));
                                newItem[Field.Section.RightPart] = newItem[Field.Section.LeftPart][i];
                                delete newItem[Field.Section.LeftPart];
                                newData.push(newItem);
                            };
                        };
                    });
                    data = newData;
                } else if (type === 'Blignment') {
                    let alignments = this.$store.state['highway']['alignment']['alignment'];
                    data.map((blignmentItem) => {
                        let al = alignments.filter(item => {
                            return item[Field.Alignment.id] === blignmentItem[Field.Blignment.AlignmentID];
                        });
                        if (al.length) {
                            let str = JSON.stringify({
                                regionID: al[0][Field.Alignment.OwerID],
                                regionType: al[0][Field.Alignment.OwerType],
                                regionCnName: al[0][Field.Alignment.OwerCnName],
                                siteID: '',
                                siteType: '',
                                siteCnName: '',
                            });
                            blignmentItem['region'] = str.replace(/,/g, '#');
                        };
                    });
                };

                // 提取要导出的字段列表
                let fields = this.typeField[type].filter(item => item.enable).map((item) => {
                    return {
                        label: item.label,
                        value: item.value,
                    };
                });
                // 本次得到的数据
                let csv = json2csv({ data: data, fields: fields, hasCSVColumnTitle: isFirstTime, newLine: '\r\n' });
                // to utf-8, add BOM when isFirstTime = true
                let withBOM = iconv.encode(csv + '\r\n', 'utf-8', {addBOM: isFirstTime});
                // to blob
                let blobData = await blobUtil.arrayBufferToBlob(withBOM, 'string');
                blobArray.push(blobData);
                // blobArray.push(blobUtil.createBlob([csv + '\r\n'], {type: 'text/plain'}));
                // 判断是否继续
                isFirstTime = false;
                if (currentAmount >= total) {
                    break;
                };
            };

            var saveData = (function () {
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.style = 'display: none';
                return function (data, fileName) {
                    var blob = blobUtil.createBlob(data, {type: 'text/plain'});
                    var url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
            }());
            let filename = type;
            if (type === 'Servicearea') {
                filename = 'ServiceArea';
            };
            if (type === 'Parkinglot') {
                filename = 'ParkingArea';
            };
            blobArray.length && saveData(blobArray, filename + '.csv');
        },
    },
    created () {
        Object.keys(Field).map((type) => {
            let fields = [];
            Object.keys(Field[type]).map((field) => {
                if (SubField[type] && SubField[type][field]) {
                    if (type === 'Section') {
                        Object.keys(SubField[type][field]).map((subFieldKey) => {
                            if (field === 'LeftPart') {
                                return;
                            };
                            let labelName = 'Section.' + SubField[type][field][subFieldKey].replace('right', '');
                            let fname = Field[type][field] + '.' + SubField[type][field][subFieldKey];
                            fields.push({
                                label: FieldName[labelName] || labelName,
                                value: fname,
                                enable: true,
                            });
                        });
                    } else {
                        Object.keys(SubField[type][field]).map((subFieldKey) => {
                            let fname = Field[type][field] + '.' + SubField[type][field][subFieldKey];
                            fields.push({
                                label: FieldName[fname] || fname,
                                value: fname,
                                enable: true,
                            });
                        });
                    };
                } else {
                    fields.push({
                        label: FieldName[Field[type][field]] || Field[type][field],
                        value: Field[type][field],
                        // value: function (fieldName, row, field, data) {
                        //     return row[fieldName];
                        // }.bind(null, Field[type][field]),
                        enable: (Field[type][field] !== 'project'),
                    });
                }
            });
            fields.push({
                label: 'tableType',
                value: function (fieldName, row, field, data) {
                    if (type === 'Servicearea') {
                        return 'ServiceArea';
                    };
                    if (type === 'Parkinglot') {
                        return 'ParkingArea';
                    };
                    return type;
                }.bind(null, type),
                enable: true,
            });
            this.typeField[type] = fields;
        });
    },
};
</script>
