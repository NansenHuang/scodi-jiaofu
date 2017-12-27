<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'alignment', 'chain']"
        :filters="filters"
        @update:filters="val => this.$emit('update:filters',val)"
        @showItemModal="showItemModal"
        :setActiveTabFunc="setActiveTabFunc"
        :loadDataAction="ActionType.LoadChain"
        :deleteItemAction="ActionType.DeleteChain"
        :tabActive="tabActive"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
import ActionType from 'src/config/action-type';

export default {
    name: 'Chain',
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
            filterField: Field.Chain.AlignmentCnName,
            filterFieldName: '路线名称',
            columnsList: [
                {
                    title: '路线名称',
                    key: Field.Chain.AlignmentCnName,
                    align: 'center',
                    link: {
                        showValue: true,
                        fieldName: Field.Chain.AlignmentCnName,
                        targetId: 'alignment',
                        targetLabel: '路线',
                    },
                },
                {
                    title: 'Config',
                    key: Field.Chain.config,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
