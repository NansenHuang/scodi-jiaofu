<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'alignment', 'interchange']"
        :filters="filters"
        @update:filters="val => this.$emit('update:filters',val)"
        @showItemModal="showItemModal"
        :setActiveTabFunc="setActiveTabFunc"
        :loadDataAction="ActionType.LoadInterchange"
        :deleteItemAction="ActionType.DeleteInterchange"
        :tabActive="tabActive"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
import ActionType from 'src/config/action-type';

export default {
    name: 'Interchange',
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
            filterField: Field.Interchange.CnName,
            filterFieldName: '互通名称',
            columnsList: [
                {
                    title: '互通名称',
                    key: Field.Interchange.CnName,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '区段编号',
                    key: Field.Interchange.SectionID,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '左',
                    key: Field.Interchange.LeftPart,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '右',
                    key: Field.Interchange.RightPart,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '描述',
                    key: Field.Interchange.Desc,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
