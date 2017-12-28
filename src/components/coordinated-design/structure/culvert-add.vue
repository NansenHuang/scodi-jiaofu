<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}涵洞</h4>
      <template-add
          :fields="fields"
          :active="active"
          :save="saveFunc"
          :update="update"
          :currentData="newCurrentData"
          :deleteItemAction="ActionType.DeleteCulvert"
          @close="() => {this.$emit('close')}"
      ></template-add>
  </div>
</template>

<script>
import TemplateAdd from 'src/components/coordinated-design/shared/template-add.vue';
import Field, { SubField } from 'src/config/field';
import FieldType from 'src/config/field-type';
import ActionType from 'src/config/action-type.js';
import Cookies from 'js-cookie';
import SinglePartComponent from '../shared/template/compose/single-station';
import FileType from 'src/config/file-type';

export default {
    name: 'NewCulvert',
    components: {
        TemplateAdd,
    },
    props: {
        update: {
            type: Boolean,
            required: true,
        },
        currentData: {
            type: Object,
        },
        active: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        newCurrentData () {
            return {
                [Field.Culvert.Project]: this.currentData[Field.Culvert.Project],
                [Field.Culvert.id]: this.currentData[Field.Culvert.id],
                [Field.Culvert.SectionID]: this.currentData[Field.Culvert.SectionID],
                [Field.Culvert.Angle]: this.currentData[Field.Culvert.Angle],
                [Field.Culvert.Desc]: this.currentData[Field.Culvert.Desc],
                [Field.Culvert.BimFiles]: this.currentData[Field.Culvert.BimFiles],
                'SinglePart': {
                    [Field.Culvert.AlignmentID]: this.currentData[Field.Culvert.AlignmentID],
                    [Field.Culvert.AlignmentCnName]: this.currentData[Field.Culvert.AlignmentCnName],
                    [Field.Culvert.StationMark]: this.currentData[Field.Culvert.StationMark],
                    [Field.Culvert.Station]: this.currentData[Field.Culvert.Station],
                    [Field.Culvert.StationChain]: this.currentData[Field.Culvert.StationChain],
                },
            };
        },
    },
    methods: {
        saveFunc (fieldData, update) {
            let data = {
                ...fieldData,
                [Field.CrossBlinddrain.Project]: Cookies.get('project'),
                [Field.CrossBlinddrain.id]: update ? fieldData[Field.CrossBlinddrain.id] : '',
                ...fieldData['SinglePart'],
            };
            delete data['SinglePart'];
            this.$Message.loading({
                content: '正在提交...',
                duration: 5,
            });
            this.$store.dispatch(update ? ActionType.UpdateCulvert : ActionType.AddCulvert, data)
                .then((data) => {
                    this.$Message.destroy();
                    if (data['data'] && data['timestamp']) {
                        this.$store.dispatch(ActionType.LoadCulvert);
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
            ActionType,
            fields: [
                {
                    label: '区段',
                    type: FieldType.Enum,
                    params: {
                        displayName: Field.Section.SectionID,
                        id: Field.Section.id,
                        storePath: ['highway', 'basic', 'construct_section'],
                        map: [
                            {
                                from: Field.Section.SectionID,
                                to: Field.Culvert.SectionID,
                            },
                        ],
                    },
                },
                {
                    label: '偏移量X',
                    key: Field.Culvert.Posture,
                    vueKey: Field.Culvert.Posture + '_X',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Culvert.Posture.x,
                    },
                },
                {
                    label: '偏移量Y',
                    key: Field.Culvert.Posture,
                    vueKey: Field.Culvert.Posture + '_Y',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Culvert.Posture.y,
                    },
                },
                {
                    label: '偏移量Z',
                    key: Field.Culvert.Posture,
                    vueKey: Field.Culvert.Posture + '_Z',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Culvert.Posture.z,
                    },
                },
                {
                    label: '角度',
                    key: Field.Culvert.Posture,
                    vueKey: Field.Culvert.Posture + '_Alpha',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Culvert.Posture.alpha,
                    },
                },
                {
                    label: '绑定路线',
                    key: 'SinglePart',
                    component: SinglePartComponent,
                },
                {
                    label: '角度',
                    key: Field.Culvert.Angle,
                    type: FieldType.Text,
                },
                {
                    label: '设计文件',
                    key: Field.Culvert.BimFiles,
                    type: FieldType.File,
                    params: {
                        fileType: FileType.Culvert,
                    },
                },
                {
                    label: '描述',
                    key: Field.Culvert.Desc,
                    type: FieldType.Text,
                },
            ],
        };
    },
};
</script>
