<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'alignment', 'crossblinddrain']"
        :filters="filters"
        @update:filters="val => this.$emit('update:filters',val)"
        @showItemModal="showItemModal"
        :setActiveTabFunc="setActiveTabFunc"
        :loadDataAction="ActionType.LoadCrossBlinddrain"
        :deleteItemAction="ActionType.DeleteCrossBlinddrain"
        :tabActive="tabActive"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
import ActionType from 'src/config/action-type';

export default {
    name: 'CrossBlinddrain',
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
            filterField: Field.CrossBlinddrain.AlignmentCnName,
            filterFieldName: '路线名称',
            columnsList: [
                {
                    title: '类型',
                    key: Field.CrossBlinddrain.Type,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '部件类型',
                    key: Field.CrossBlinddrain.ModelType,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '区段编号',
                    key: Field.CrossBlinddrain.SectionID,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '路线名称',
                    key: Field.CrossBlinddrain.AlignmentCnName,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '方向',
                    key: Field.CrossBlinddrain.Direction,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '起始桩号',
                    key: Field.CrossBlinddrain.StartStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '结束桩号',
                    key: Field.CrossBlinddrain.EndStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '描述',
                    key: Field.CrossBlinddrain.Desc,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
