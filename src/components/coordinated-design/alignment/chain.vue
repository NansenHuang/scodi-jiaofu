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
        :loadData="loadData"
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
            this.$store.dispatch(ActionType.LoadChain);
        },
        deleteItem: async function (fieldData) {
            await Services.Alignment.Chain.delete(fieldData);
            setTimeout(() => {
                this.loadData();
            }, 1500);
        },
        editItem: async function (fieldData) {
            await Services.Alignment.Chain.update(fieldData);
            setTimeout(() => {
                this.loadData();
            }, 1500);
        },
    },
    data () {
        return {
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
