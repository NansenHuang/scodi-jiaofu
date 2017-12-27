<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'alignment', 'sideblinddrain']"
        :filters="filters"
        @update:filters="val => this.$emit('update:filters',val)"
        @showItemModal="showItemModal"
        :setActiveTabFunc="setActiveTabFunc"
        :loadDataAction="ActionType.LoadSideBlinddrain"
        :deleteItemAction="ActionType.DeleteSideBlinddrain"
        :tabActive="tabActive"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
import ActionType from 'src/config/action-type';

export default {
    name: 'SideBlinddrain',
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
            filterField: Field.SideBlinddrain.AlignmentCnName,
            filterFieldName: '路线名称',
            columnsList: [
                {
                    title: '类型',
                    key: Field.SideBlinddrain.Type,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '部件类型',
                    key: Field.SideBlinddrain.ModelType,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '区段编号',
                    key: Field.SideBlinddrain.SectionID,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '路线名称',
                    key: Field.SideBlinddrain.AlignmentCnName,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '方向',
                    key: Field.SideBlinddrain.Direction,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '路线标识符',
                    key: Field.SideBlinddrain.StationMark,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '起始桩号',
                    key: Field.SideBlinddrain.StartStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '结束桩号',
                    key: Field.SideBlinddrain.EndStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '描述',
                    key: Field.SideBlinddrain.Desc,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
