<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'alignment', 'guardwall']"
        :filters="filters"
        @update:filters="val => this.$emit('update:filters',val)"
        @showItemModal="showItemModal"
        :setActiveTabFunc="setActiveTabFunc"
        :loadDataAction="ActionType.LoadGuardwall"
        :deleteItemAction="ActionType.DeleteGuardwall"
        :tabActive="tabActive"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
import ActionType from 'src/config/action-type';

export default {
    name: 'Guardwall',
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
            filterField: Field.Guardwall.AlignmentCnName,
            filterFieldName: '路线名称',
            columnsList: [
                {
                    title: '类型',
                    key: Field.Guardwall.Type,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '部件类型',
                    key: Field.Guardwall.ModelType,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '区段编号',
                    key: Field.Guardwall.SectionID,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '所属路线',
                    key: Field.Guardwall.AlignmentCnName,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '方向',
                    key: Field.Guardwall.Direction,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '起始桩号',
                    key: Field.Guardwall.StartStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '结束桩号',
                    key: Field.Guardwall.EndStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '描述',
                    key: Field.Guardwall.Desc,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
