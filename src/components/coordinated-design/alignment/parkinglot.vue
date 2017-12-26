<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'alignment', 'parkinglot']"
        :filters="filters"
        @update:filters="val => this.$emit('update:filters',val)"
        @showItemModal="showItemModal"
        :setActiveTabFunc="setActiveTabFunc"
        :loadDataAction="ActionType.LoadParkinglot"
        :deleteItemAction="ActionType.DeleteParkinglot"
        :tabActive="tabActive"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
import ActionType from 'src/config/action-type';

export default {
    name: 'Parkinglot',
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
            filterField: Field.Parkinglot.CnName,
            filterFieldName: '停车区名称',
            columnsList: [
                {
                    title: '停车区名称',
                    key: Field.Parkinglot.CnName,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '区段编号',
                    key: Field.Parkinglot.SectionID,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '左',
                    key: Field.Parkinglot.LeftPart,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '右',
                    key: Field.Parkinglot.RightPart,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '描述',
                    key: Field.Parkinglot.Desc,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
