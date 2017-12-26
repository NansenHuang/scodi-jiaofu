<style lang="less">
</style>

<template>
    <template-table
            :tableId="this.$options.name"
            :columnsList="columnsList"
            :filterField="filterField"
            :storePath="['highway', 'alignment', 'clignment']"
            :filters="filters"
            @update:filters="val => this.$emit('update:filters',val)"
            @showItemModal="showItemModal"
            :setActiveTabFunc="setActiveTabFunc"
            :loadDataAction="ActionType.LoadClignment"
            :deleteItemAction="ActionType.DeleteClignment"
            :tabActive="tabActive"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import Field from 'src/config/field';
import ActionType from 'src/config/action-type';

export default {
    name: 'Clignment',
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
                    key: Field.Clignment.AlignmentCnName,
                    align: 'center',
                    link: {
                        showValue: true,
                        fieldName: Field.Clignment.AlignmentCnName,
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
                    key: Field.Clignment.StartStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '终点桩号',
                    key: Field.Clignment.EndStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '道路dwg',
                    key: Field.Clignment.CorridorFiles,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
