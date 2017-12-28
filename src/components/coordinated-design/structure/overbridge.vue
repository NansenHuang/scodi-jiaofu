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
        :setActiveTabFunc="setActiveTabFunc"
        :loadDataAction="ActionType.LoadOverbridge"
        :deleteItemAction="ActionType.DeleteOverbridge"
        :tabActive="tabActive"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
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
                    title: '桩号',
                    key: Field.Overbridge.Station,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '偏移量',
                    key: Field.Overbridge.Posture,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '描述',
                    key: Field.Overbridge.Desc,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '设计文件',
                    key: Field.Overbridge.BimFiles,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
