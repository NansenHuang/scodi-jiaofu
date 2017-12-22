<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'alignment', 'alignment']"
        :filters="filters"
        @update:filters="val => this.$emit('update:filters',val)"
        @showItemModal="showItemModal"
        :loadData="loadData"
        :setActiveTabFunc="setActiveTabFunc"
        :deleteItem="deleteItem"
        :editItem="editItem"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
import Services from 'src/services';
import ActionType from 'src/config/action-type';

export default {
    name: 'Alignment',
    components: {
        TemplateTable,
    },
    props: {
        filters: {
            type: Object,
            default: function () {
                return {};
            },
        },
        setActiveTabFunc: {
            type: Function,
            default: () => {},
        },
    },
    computed: {},
    methods: {
        showItemModal () {
            this.$emit('showItemModal', this.$options.name, ...arguments);
        },
        loadData () {
            this.$store.dispatch(ActionType.LoadAlignment);
        },
        deleteItem: async function (fieldData) {
            await Services.Alignment.Alignment.delete(fieldData);
            setTimeout(() => {
                this.loadData();
            }, 1500);
        },
        editItem: async function (fieldData) {
            await Services.Alignment.Alignment.update(fieldData);
            setTimeout(() => {
                this.loadData();
            }, 1500);
        },
    },
    data () {
        return {
            filterField: Field.Alignment.CnName,
            filterFieldName: '名称',
            columnsList: [
                {
                    title: '路线名称',
                    key: Field.Alignment.CnName,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '所属工点',
                    key: Field.Alignment.OwerCnName,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '路线标识符',
                    key: Field.Alignment.StationMark,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '起点桩号',
                    key: Field.Alignment.StartStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '终点桩号',
                    key: Field.Alignment.EndStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '查看断链',
                    key: Field.Alignment.EnName,
                    align: 'center',
                    link: {
                        fieldName: Field.Alignment.CnName,
                        targetId: 'chain',
                        targetLabel: '断链',
                    },
                },
                // {
                //     title: '设计资料（dwg）',
                //     key: Field.Alignment.Attachments,
                //     align: 'center',
                //     open: {
                //         fieldName: Field.Alignment.CnName,
                //         srcId: 'alignment',
                //     },
                // },
            ],
        };
    },
};
</script>
