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
            loadData () {
                this.$store.dispatch(ActionType.LoadClignment);
            },
            deleteItem: async function (fieldData) {
                await Services.Alignment.Clignment.delete(fieldData);
                setTimeout(() => {
                    this.loadData();
                }, 1500);
            },
            editItem: async function (fieldData) {
                // await Services.Alignment.Alignment.update(fieldData);
                // setTimeout(() => {
                //     this.loadData();
                // }, 1500);
            },
        },
        data () {
            return {
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
