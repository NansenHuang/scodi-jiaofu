<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :storePath="['highway', 'section', 'construction']"
        @showItemModal="showItemModal"
        :loadDataAction="ActionType.LoadConstructionSection"
        :deleteItemAction="ActionType.DeleteConstructionSection"
        :tabActive="tabActive"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
import ActionType from 'src/config/action-type';

export default {
    name: 'ConstructionSection',
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
    data () {
        return {
            ActionType,
            filterField: '',
            filterFieldName: '',
            columnsList: [
                {
                    title: '区段名称',
                    key: Field.Section.Name,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '区段编号',
                    key: Field.Section.SectionID,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '左',
                    key: Field.Section.LeftPart,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '右',
                    key: Field.Section.RightPart,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
    methods: {
        showItemModal () {
            this.$emit('showItemModal', this.$options.name, ...arguments);
        },
    },
};
</script>
