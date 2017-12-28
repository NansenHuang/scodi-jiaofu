<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'structure', 'tunnel']"
        :filters="filters"
        @update:filters="val => this.$emit('update:filters',val)"
        @showItemModal="showItemModal"
        :setActiveTabFunc="setActiveTabFunc"
        :loadDataAction="ActionType.LoadTunnel"
        :deleteItemAction="ActionType.DeleteTunnel"
        :tabActive="tabActive"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
import ActionType from 'src/config/action-type';

export default {
    name: 'Tunnel',
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
        tabActive: {
            type: Boolean,
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
    },
    data () {
        return {
            ActionType,
            filterField: Field.Tunnel.CnName,
            filterFieldName: '名称',
            columnsList: [
                {
                    title: '隧道名称',
                    key: Field.Tunnel.CnName,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '区段编号',
                    key: Field.Tunnel.SectionID,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '左',
                    key: Field.Tunnel.LeftPart,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '右',
                    key: Field.Tunnel.RightPart,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '偏移量',
                    key: Field.Tunnel.Posture,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '描述',
                    key: Field.Tunnel.Desc,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '设计文件',
                    key: Field.Tunnel.BimFiles,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
