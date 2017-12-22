<style lang="less">
</style>

<template>
    <template-table
        tableId="customsection"
        tableName="自定义区段"
        :columnsList="columnsList"
        :newItem="newItem"
        :storePath="['highway', 'section', 'custom']"
        :showModalFunc="showModalFunc"
    ></template-table>
</template>

<script>
import TemplateTable from 'src/components/coordinated-design/shared/template.vue';
import NewCustomSection from './custom-section-add.vue';
import Field from 'src/config/field';

export default {
    name: 'CustomSection',
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
        showModalFunc: {
            type: Function,
            default: () => {},
        },
    },
    computed: {
        newItem: function () {
            return NewCustomSection;
        },
    },
    methods: {},
    data () {
        return {
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
                    title: '起点桩号',
                    key: Field.Section.StartStation,
                    align: 'center',
                    editable: true,
                },
                {
                    title: '终点桩号',
                    key: Field.Section.EndStation,
                    align: 'center',
                    editable: true,
                },
            ],
        };
    },
};
</script>
