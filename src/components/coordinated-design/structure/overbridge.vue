<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'structure', 'overbridge']"
        :filters="filters"
        @update:filters="val => this.$emit('update:filters',val)"
        @showItemModal="showItemModal"
        :loadData="loadData"
        :setActiveTabFunc="setActiveTabFunc"
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
    name: 'Overbridge',
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
            this.$store.dispatch(ActionType.LoadOverbridge);
        },
        deleteItem: async function (fieldData) {
            await Services.Structure.Overbridge.delete(fieldData);
            setTimeout(() => {
                this.loadData();
            }, 1500);
        },
        editItem: async function (fieldData) {
            await Services.Structure.Overbridge.update(fieldData);
            setTimeout(() => {
                this.loadData();
            }, 1500);
        },
    },
    data () {
        return {
            // filterField: Field.Overbridge.CnName,
            // filterFieldName: '名称',
            filterField: '',
            filterFieldName: '',
            columnsList: [
                {
                    title: '区段编号',
                    key: Field.Overbridge.SectionID,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '路线名称',
                    key: Field.Overbridge.AlignmentCnName,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '路线标识符',
                    key: Field.Overbridge.StationMark,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '桩号',
                    key: Field.Overbridge.Station,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '描述',
                    key: Field.Overbridge.Desc,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
