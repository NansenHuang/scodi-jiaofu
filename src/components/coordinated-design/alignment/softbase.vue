<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'alignment', 'softbase']"
        :filters="filters"
        @update:filters="val => this.$emit('update:filters',val)"
        @showItemModal="showItemModal"
        :setActiveTabFunc="setActiveTabFunc"
        :loadDataAction="ActionType.LoadSoftbase"
        :deleteItemAction="ActionType.DeleteSoftbase"
        :tabActive="tabActive"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
import ActionType from 'src/config/action-type';

export default {
    name: 'Softbase',
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
            filterField: Field.Softbase.AlignmentCnName,
            filterFieldName: '路线名称',
            columnsList: [
                {
                    title: '类型',
                    key: Field.Softbase.Type,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '部件类型',
                    key: Field.Softbase.ModelType,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '区段编号',
                    key: Field.Softbase.SectionID,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '所属路线',
                    key: Field.Softbase.AlignmentCnName,
                    align: 'center',
                    editable: true,
                },
                // {
                //     title: '路线标识符',
                //     key: Field.Softbase.StationMark,
                //     align: 'center',
                //     editable: true,
                // },
                {
                    title: '起始桩号',
                    key: Field.Softbase.StartStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '结束桩号',
                    key: Field.Softbase.EndStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '描述',
                    key: Field.Softbase.Desc,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
