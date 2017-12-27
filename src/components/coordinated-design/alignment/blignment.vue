<style lang="less">
</style>

<template>
    <template-table
        :tableId="this.$options.name"
        :columnsList="columnsList"
        :filterField="filterField"
        :storePath="['highway', 'alignment', 'blignment']"
        :filters="filters"
        @update:filters="val => this.$emit('update:filters',val)"
        @showItemModal="showItemModal"
        :setActiveTabFunc="setActiveTabFunc"
        :loadDataAction="ActionType.LoadBlignment"
        :deleteItemAction="ActionType.DeleteBlignment"
        :tabActive="tabActive"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
import ActionType from 'src/config/action-type';

export default {
    name: 'Blignment',
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
            filterField: '',
            filterFieldName: '',
            columnsList: [
                {
                    title: '所属路线',
                    key: Field.Blignment.AlignmentCnName,
                    align: 'center',
                    link: {
                        showValue: true,
                        fieldName: Field.Blignment.AlignmentCnName,
                        targetId: 'alignment',
                        targetLabel: '路线',
                    },
                },
                // {
                //     title: '路线标识符',
                //     key: Field.Blignment.StationMark,
                //     align: 'center',
                //     editable: true,
                // },
                {
                    title: '起点桩号',
                    key: Field.Blignment.StartStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '终点桩号',
                    key: Field.Blignment.EndStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '路线dwg',
                    key: Field.Blignment.AlignmentFiles,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '道路dwg',
                    key: Field.Blignment.CorridorFiles,
                    align: 'center',
                    editable: true,
                },
                // {
                //     title: '设计资料（dwg）',
                //     key: Field.Alignment.Attachments,
                //     align: 'center',
                //     open: {
                //         fieldName: Field.Alignment.CnName,
                //         srcId: 'alignment',
                //     },
                // },
            ],
        };
    },
};
</script>
