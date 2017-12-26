<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'alignment', 'servicearea']"
        :filters="filters"
        @update:filters="val => this.$emit('update:filters',val)"
        @showItemModal="showItemModal"
        :setActiveTabFunc="setActiveTabFunc"
        :loadDataAction="ActionType.LoadServicearea"
        :deleteItemAction="ActionType.DeleteServicearea"
        :tabActive="tabActive"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
import ActionType from 'src/config/action-type';

export default {
    name: 'Servicearea',
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
            filterField: Field.Servicearea.CnName,
            filterFieldName: '服务区名称',
            columnsList: [
                {
                    title: '服务区名称',
                    key: Field.Servicearea.CnName,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '区段编号',
                    key: Field.Servicearea.SectionID,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '左',
                    key: Field.Servicearea.LeftPart,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '右',
                    key: Field.Servicearea.RightPart,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '描述',
                    key: Field.Servicearea.Desc,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
