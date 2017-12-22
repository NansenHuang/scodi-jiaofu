<style lang="less">
</style>

<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <h4 slot="title">数据发布</h4>
                    <Row class="margin-top-10">
                        <Col span="12">
                            <div>数据源选择</div>
                            <Tree :data="typeData" show-checkbox @on-check-change="checkChange"></Tree>
                        </Col>
                        <Col span="12">
                            <p>认证用户名：</p>
                            <Input v-model="verifyusername" size="small" style="max-width:200px;"></Input>
                            <p>认证密码：</p>
                            <Input type="password" v-model="verifypassword" size="small" style="max-width:200px;"></Input>
                            <p>发布地址：</p>
                            <Input v-model="publishurl" size="small" style="max-width:360px;"></Input>

                            <div>导出进度</div>
                            <Progress :percent="singleProgress"></Progress>
                            <Progress :percent="typesToExport.length ? Math.ceil(current / typesToExport.length * 100) : 0"></Progress>
                            <Button :disabled="working" type="success" @click="publishData">
                                开始发布
                            </Button>
                            <p v-if="working">
                                正在发布第{{ current }}个，共{{ typesToExport.length }}个。
                            </p>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Row class="margin-top-10" style="display:none;">
            <Col span="24">
                <Card>
                    <h4 slot="title">Logs</h4>
                    <Row>
                        <Col span="24">
                            <div v-for="(item, index) in logData" :key="index">
                                <Icon v-if="item['type']==='info'" type="information-circled" style="color:#0080ff;"></Icon>
                                <Icon v-else-if="item['type']==='warnning'" type="alert-circled" style="color:#ff8000;"></Icon>
                                <Icon v-else-if="item['type']==='error'" type="close-circled" style="color:red;"></Icon>
                                <Icon v-else-if="item['type']==='success'" type="checkmark" style="color:#00cc00;"></Icon>
                                <Icon v-else type="code-working" style="color:#a6a6a6;"></Icon>
                                {{ item['msg'] }}
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import Services from 'src/services';
import PublishServices from 'src/publish-services';
import Cookies from 'js-cookie';
import DynamicCherry from 'src/libs/dynamic-cherry';

export default {
    name: 'PublishData',
    props: {},
    data () {
        return {
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
                                    title: '盲沟',
                                    key: 'Blinddrain',
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
            publishFuncs: {
                Section: PublishServices.Section.Construction.batchUpload,
                Alignment: PublishServices.Alignment.Alignment.batchUpload,
                Chain: PublishServices.Alignment.Chain.batchUpload,
                Interchange: PublishServices.Alignment.Interchange.batchUpload,
                Servicearea: PublishServices.Alignment.Servicearea.batchUpload,
                Parkinglot: PublishServices.Alignment.Parkinglot.batchUpload,
                Guardwall: PublishServices.Alignment.Guardwall.batchUpload,
                Blinddrain: PublishServices.Alignment.Blinddrain.batchUpload,
                Softbase: PublishServices.Alignment.Softbase.batchUpload,
                Bridge: PublishServices.Structure.Bridge.batchUpload,
                Geology: PublishServices.Structure.Geology.batchUpload,
                Tunnel: PublishServices.Structure.Tunnel.batchUpload,
                Culvert: PublishServices.Structure.Culvert.batchUpload,
                Overbridge: PublishServices.Structure.Overbridge.batchUpload,
            },
            queryFuncs: {
                Section: Services.Section.Construction.query,
                Alignment: Services.Alignment.Alignment.query,
                Chain: Services.Alignment.Chain.query,
                Interchange: Services.Alignment.Interchange.query,
                Servicearea: Services.Alignment.Servicearea.query,
                Parkinglot: Services.Alignment.Parkinglot.query,
                Guardwall: Services.Alignment.Guardwall.query,
                Blinddrain: Services.Alignment.Blinddrain.query,
                Softbase: Services.Alignment.Softbase.query,
                Bridge: Services.Structure.Bridge.query,
                Geology: Services.Structure.Geology.query,
                Tunnel: Services.Structure.Tunnel.query,
                Culvert: Services.Structure.Culvert.query,
                Overbridge: Services.Structure.Overbridge.query,
            },
            typesToExport: [],
            verifypassword: '',
            verifyusername: 'highway',
            publishurl: 'http://118.114.253.52:8498/rmx/rest/',

            singleProgress: 0,
            current: 0,
            working: false,

            cherryInstance: null,

            logData: [
                // {
                //     type: 'info',
                //     msg: '测试',
                // },
                // {
                //     type: 'warnning',
                //     msg: '测试',
                // },
                // {
                //     type: 'error',
                //     msg: '测试',
                // },
                // {
                //     type: 'success',
                //     msg: '测试',
                // },
                // {
                //     type: '',
                //     msg: '测试',
                // },
            ],
        };
    },
    computed: {},
    methods: {
        resetProgress () {
            this.current = 0;
            this.singleProgress = 0;
        },
        checkChange (data) {
            this.resetProgress();

            let array = [];
            data.map((item) => {
                if (item && item['key']) {
                    array.push(item['key']);
                }
            });
            this.typesToExport = array;
        },
        publishData: async function () {
            this.resetProgress();

            this.working = true;
            this.cherryInstance = new DynamicCherry(this.publishurl);
            PublishServices.Publish.auth(this.cherryInstance, this.verifyusername, this.verifypassword);

            for (let i = 0; i < this.typesToExport.length; i++) {
                this.current = i + 1;
                await this.processPublish(this.typesToExport[i]);
                // TODO log to LOG panel
            }

            this.working = false;
        },
        processPublish: async function (type) {
            let queryFunc = this.queryFuncs[type];
            let publishFunc = this.publishFuncs[type];

            let total = 0;
            let isFirstTime = true;

            this.singleProgress = 0;
            let currentAmount = 0;
            let afterArray = [];
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
                if (!(resp && resp['hits'] && resp['hits']['hits'])) {
                    // eslint-disable-next-line no-console
                    console.error('response数据有误。');
                };
                // 记录数据总条数
                if (isFirstTime) {
                    total = resp['hits']['total'];
                };
                // 提取数据内容
                let data = resp['hits']['hits'].map(item => item['_source']['Data']);
                let sort = resp['hits']['hits'].map(item => item['sort']);
                // 记录下一步要用的search_after
                afterArray = sort[sort.length - 1];
                // 记录当前已获得条数
                currentAmount += data.length;
                // 更新进度显示
                this.singleProgress = Math.ceil(currentAmount / total * 100);

                await publishFunc(this.cherryInstance, Cookies.get('project'), data);

                isFirstTime = false;
                if (currentAmount >= total) {
                    break;
                };
            };
        },
    },
};
</script>
