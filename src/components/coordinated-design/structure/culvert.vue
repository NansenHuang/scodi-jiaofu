<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'structure', 'culvert']"
        :filters="filters"
        @update:filters="val => this.$emit('update:filters',val)"
        @showItemModal="showItemModal"
        :setActiveTabFunc="setActiveTabFunc"
        :loadDataAction="ActionType.LoadCulvert"
        :deleteItemAction="ActionType.DeleteCulvert"
        :tabActive="tabActive"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
import ActionType from 'src/config/action-type';

export default {
    name: 'Culvert',
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
            // filterField: Field.Culvert.CnName,
            // filterFieldName: '名称',
            filterField: '',
            filterFieldName: '',
            columnsList: [
                {
                    title: '区段编号',
                    key: Field.Culvert.SectionID,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '路线名称',
                    key: Field.Culvert.AlignmentCnName,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '路线标识符',
                    key: Field.Culvert.StationMark,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '偏移量',
                    key: Field.Culvert.Posture,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '桩号',
                    key: Field.Culvert.Station,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '描述',
                    key: Field.Culvert.Desc,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
