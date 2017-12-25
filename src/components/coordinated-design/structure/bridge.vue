<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'structure', 'bridge']"
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
    name: 'Bridge',
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
        loadData: async function () {
            this.$store.dispatch(ActionType.LoadBridge);
        },
        deleteItem: async function (fieldData) {
            await Services.Structure.Bridge.delete(fieldData);
            setTimeout(() => {
                this.loadData();
            }, 1500);
        },
        editItem: async function (fieldData) {
            await Services.Structure.Bridge.update(fieldData);
            setTimeout(() => {
                this.loadData();
            }, 1500);
        },
    },
    data () {
        return {
            filterField: Field.Bridge.CnName,
            filterFieldName: '名称',
            columnsList: [
                {
                    title: '桥梁名称',
                    key: Field.Bridge.CnName,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '区段编号',
                    key: Field.Bridge.SectionID,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '左',
                    key: Field.Bridge.LeftPart,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '右',
                    key: Field.Bridge.RightPart,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '设计文件',
                    key: Field.Bridge.BimFiles,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '描述',
                    key: Field.Bridge.Desc,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
