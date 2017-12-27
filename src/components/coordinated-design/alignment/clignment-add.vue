<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div>
        <h4 slot="header">{{this.update ? '更新' : '添加'}}道路</h4>
        <template-add
                :fields="fields"
                :active="active"
                :save="saveFunc"
                :update="update"
                :currentData="currentData"
                @close="() => {this.$emit('close')}"
        ></template-add>
    </div>
</template>

<script>
    import TemplateAdd from 'src/components/coordinated-design/shared/template-add.vue';
    import Field from 'src/config/field';
    import FieldType from 'src/config/field-type';
    import ActionType from 'src/config/action-type.js';
    import Cookies from 'js-cookie';
    import FileType from 'src/config/file-type';

    export default {
        name: 'NewClignment',
        components: {
            TemplateAdd,
        },
        props: {
            active: {
                type: Boolean,
                required: true,
            },
            update: {
                type: Boolean,
                required: true,
            },
            currentData: {
                type: Object,
            },
        },
        methods: {
            saveFunc (fieldData, update = false) {
                let data = {
                    ...fieldData,
                    [Field.Clignment.Project]: Cookies.get('project'),
                    [Field.Clignment.id]: update ? fieldData[Field.Clignment.id] : '',
                };
                this.$Message.loading({
                    content: '正在提交...',
                    duration: 5,
                });
                this.$store.dispatch(update ? ActionType.UpdateClignment : ActionType.AddClignment, data)
                    .then((data) => {
                        this.$Message.destroy();
                        if (data['data'] && data['timestamp']) {
                            this.$store.dispatch(ActionType.LoadClignment);
                            this.$emit('close');
                        } else {
                            this.$Message.error({
                                content: data['message'] || JSON.stringify(data),
                                duration: 5,
                            });
                        };
                    });
            },
        },
        data () {
            return {
                fields: [
                    {
                        label: '所属设计路线',
                        type: FieldType.Enum,
                        params: {
                            displayName: Field.Alignment.CnName,
                            id: Field.Alignment.id,
                            storePath: ['highway', 'basic', 'alignment'],
                            map: [
                                {
                                    from: Field.Alignment.id,
                                    to: Field.Clignment.AlignmentID,
                                },
                                {
                                    from: Field.Alignment.CnName,
                                    to: Field.Clignment.AlignmentCnName,
                                },
                                {
                                    from: Field.Alignment.StationMark,
                                    to: Field.Clignment.StationMark,
                                },
                                // for quicker input
                                // {
                                //     from: Field.Alignment.StartStation,
                                //     to: Field.Blignment.StartStation,
                                // },
                                // {
                                //     from: Field.Alignment.EndStation,
                                //     to: Field.Blignment.EndStation,
                                // },
                            ],
                        },
                    },
                    {
                        label: '起点桩号',
                        key: Field.Clignment.StartStation,
                        type: FieldType.Number,
                    },
                    {
                        label: '终点桩号',
                        key: Field.Clignment.EndStation,
                        type: FieldType.Number,
                    },
                    {
                        label: '道路dwg',
                        key: Field.Clignment.CorridorFiles,
                        type: FieldType.File,
                        params: {
                            fileType: FileType.Clignment,
                        },
                    },
                ],
            };
        },
    };
</script>
