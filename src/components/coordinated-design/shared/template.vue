<style lang="less">
    @import '../../../styles/common.less';
    @import '../../style.less';
</style>

<template>
    <div>
        <Row>
            <Col span="24">
                <Input
                    :placeholder="'搜索' + this.$t(filterField)"
                    style="width: 200px"
                    v-model="filter"
                    v-if="Boolean(filterField)"
                />
                <span style="margin: 0 0 0 10px;">
                    <Button
                        type="primary"
                        icon="android-add-circle"
                        @click="addData"
                    >
                        {{'添加' + this.$t(tableId)}}
                    </Button>
                </span>
                <span style="margin: 0 0 0 10px;display:none;">
                    <Button
                        type="success"
                        icon="share"
                        @click="exportToExcel"
                    >
                        导出数据
                    </Button>
                </span>
                <span style="margin: 0 0 0 10px;">
                    <Button
                        type="info"
                        icon="refresh"
                        @click="refresh"
                    >
                        刷新数据
                    </Button>
                </span>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Col span="24">
                <multifunctional-table
                    :filterField="filterField"
                    :filter="filter"
                    v-model="tableData"
                    :columnsList="columns"
                    :saveEdit="saveEditInline"
                    :deleteRow="deleteRowInline"
                    :refName="tableId"
                    ref="table"
                ></multifunctional-table>
            </Col>
        </Row>
    </div>
</template>

<script>
import MultifunctionalTable from '../shared/table.vue';

function deepFind (obj, pathArray) {
    let current = obj;
    for (let i = 0; i < pathArray.length; i++) {
        if (current[pathArray[i]] === undefined) {
            return undefined;
        } else {
            current = current[pathArray[i]];
        }
    }
    return current;
}

export default {
    name: 'TemplateTable',
    components: {
        MultifunctionalTable
    },
    props: {
        tableId: {
            type: String,
            required: true,
        },
        columnsList: {
            type: Array,
            required: true,
        },
        filterField: {
            type: String,
            default: '',
        },
        storePath: {
            type: Array,
            required: true,
        },

        filters: {
            type: Object,
            default: function () {
                return {};
            },
        },
        loadData: {
            type: Function,
            // eslint-disable-next-line no-console
            default: () => { console.error('找不到刷新数据的方法。'); },
        },
        setActiveTabFunc: {
            type: Function,
            default: () => {},
        },
        deleteItem: {
            type: Function,
            required: true,
        },
        editItem: {
            type: Function,
            required: true,
        },
    },
    computed: {
        columns: function () {
            let cl = [{
                title: '序号',
                type: 'index',
                width: 80,
                align: 'center',
            }];
            this.columnsList.map((item) => {
                if (item.hasOwnProperty('link')) {
                    item.render = (h, data) => {
                        return h(
                            'span',
                            {},
                            [
                                item.link.showValue && data.row[item.link.fieldName],
                                item.link.showValue && '　',
                                h(
                                    'a',
                                    {
                                        on: { click: this.linkTo.bind(this, data.row[item.link.fieldName], item.link.targetId, item.link.targetLabel) },
                                    },
                                    [h(
                                        'Icon',
                                        {
                                            props: {
                                                type: 'android-open',
                                                size: 16
                                            }
                                        }
                                    )]
                                ),
                            ]
                        );
                    };
                };
                if (item.hasOwnProperty('open')) {
                    item.render = (h, data) => {
                        return h(
                            'a',
                            {
                                on: { click: this.viewAttatchment.bind(this, data.row[item.open.fieldName], item.open.srcId) },
                            },
                            [h(
                                'Icon',
                                {
                                    props: {
                                        type: 'folder',
                                        size: 24
                                    }
                                }
                            )]
                        );
                    };
                };
            });
            return cl.concat(this.columnsList).concat({
                title: '操作',
                align: 'center',
                width: 190,
                key: 'handle',
                handle: ['edit', 'delete']
            });
        },
        filter: {
            get: function () {
                return this.filters[this.tableId] || null;
            },
            set: function (val) {
                this.$emit('update:filters', { ...this.filters, [this.tableId]: val });
            },
        },
        tableData: {
            get: function () {
                return deepFind(this.$store.state, this.storePath);
            },
            set: function (val) {
                // TODO 重新加载数据来反映变化
            },
        },
    },
    methods: {
        saveEditInline (index, success, fail) {
            let vm = this;
            success(() => {
                this.$emit('showItemModal', JSON.parse(JSON.stringify(vm.tableData[index])), true);
            });
        },
        deleteRowInline (index, success, fail) {
            success(() => {
                this.deleteItem(this.tableData[index]);
            });
        },
        addData () {
            this.$emit('showItemModal');
        },
        linkTo (val, targetTableId, targetTableLabel) {
            this.$emit('update:filters', {...this.filters, [targetTableId]: val});
            this.setActiveTabFunc(targetTableLabel);
        },
        viewAttatchment (val, sourceTableId) {
            this.$router.push({
                name: 'dwgviewer',
                query: {
                    [sourceTableId]: val,
                },
            });
        },
        exportToExcel () {
            this.$refs['table'].$refs[this.tableId].exportCsv({
                filename: this.$t(this.tableId)
            });
        },
        refresh () {
            this.loadData();
        },
    },
    created () {
        this.loadData();
    }
};
</script>
