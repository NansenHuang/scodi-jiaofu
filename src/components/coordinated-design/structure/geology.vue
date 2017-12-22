<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'structure', 'geology']"
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
    name: 'Geology',
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
            this.$store.dispatch(ActionType.LoadGeology);
        },
        deleteItem: async function (fieldData) {
            await Services.Structure.Geology.delete(fieldData);
            setTimeout(() => {
                this.loadData();
            }, 1500);
        },
        editItem: async function (fieldData) {
            await Services.Structure.Geology.update(fieldData);
            setTimeout(() => {
                this.loadData();
            }, 1500);
        },
    },
    data () {
        return {
            filterField: Field.Geology.CnName,
            filterFieldName: '名称',
            columnsList: [
                {
                    title: '地质名称',
                    key: Field.Geology.CnName,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '区段编号',
                    key: Field.Geology.SectionID,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '路线名称',
                    key: Field.Geology.AlignmentCnName,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '路线标识符',
                    key: Field.Geology.StationMark,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '起点桩号',
                    key: Field.Geology.StartStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '中点桩号',
                    key: Field.Geology.MidStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '终点桩号',
                    key: Field.Geology.EndStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '描述',
                    key: Field.Geology.Desc,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
