<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}天桥</h4>
      <template-add
          :fields="fields"
          :active="active"
          :save="saveFunc"
          :update="update"
          :currentData="newCurrentData"
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
    name: 'NewOverbridge',
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
                [Field.Overbridge.Project]: this.currentData[Field.Overbridge.Project],
                [Field.Overbridge.id]: this.currentData[Field.Overbridge.id],
                [Field.Overbridge.SectionID]: this.currentData[Field.Overbridge.SectionID],
                [Field.Overbridge.Desc]: this.currentData[Field.Overbridge.Desc],
                [Field.Overbridge.BimFiles]: this.currentData[Field.Overbridge.BimFiles],
                'SinglePart': {
                    [Field.Overbridge.AlignmentID]: this.currentData[Field.Overbridge.AlignmentID],
                    [Field.Overbridge.AlignmentCnName]: this.currentData[Field.Overbridge.AlignmentCnName],
                    [Field.Overbridge.StationMark]: this.currentData[Field.Overbridge.StationMark],
                    [Field.Overbridge.Station]: this.currentData[Field.Overbridge.Station],
                    [Field.Overbridge.StationChain]: this.currentData[Field.Overbridge.StationChain],
                },
            };
        },
    },
    methods: {
        saveFunc (fieldData, update) {
            let data = {
                ...fieldData,
                [Field.Overbridge.Project]: Cookies.get('project'),
                [Field.Overbridge.id]: update ? fieldData[Field.Overbridge.id] : '',
                ...fieldData['SinglePart'],
            };
            delete data['SinglePart'];
            this.$Message.loading({
                content: '正在提交...',
                duration: 5,
            });
            this.$store.dispatch(update ? ActionType.UpdateOverbridge : ActionType.AddOverbridge, data)
                .then((data) => {
                    this.$Message.destroy();
                    if (data['data'] && data['timestamp']) {
                        this.$store.dispatch(ActionType.LoadOverbridge);
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
                    label: '区段',
                    type: FieldType.Enum,
                    params: {
                        displayName: Field.Section.SectionID,
                        id: Field.Section.id,
                        storePath: ['highway', 'section', 'construction'],
                        map: [
                            {
                                from: Field.Section.SectionID,
                                to: Field.Overbridge.SectionID,
                            },
                        ],
                    },
                },
                {
                    label: '偏移量X',
                    key: Field.Overbridge.Posture,
                    vueKey: Field.Overbridge.Posture + '_X',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Overbridge.Posture.x,
                    },
                },
                {
                    label: '偏移量Y',
                    key: Field.Overbridge.Posture,
                    vueKey: Field.Overbridge.Posture + '_Y',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Overbridge.Posture.y,
                    },
                },
                {
                    label: '偏移量Z',
                    key: Field.Overbridge.Posture,
                    vueKey: Field.Overbridge.Posture + '_Z',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Overbridge.Posture.z,
                    },
                },
                {
                    label: '角度',
                    key: Field.Overbridge.Posture,
                    vueKey: Field.Overbridge.Posture + '_Alpha',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Overbridge.Posture.alpha,
                    },
                },
                {
                    label: '绑定路线',
                    key: 'SinglePart',
                    component: SinglePartComponent,
                },
                {
                    label: '设计文件',
                    key: Field.Overbridge.BimFiles,
                    type: FieldType.File,
                    params: {
                        fileType: FileType.Overbridge,
                    },
                },
                {
                    label: '描述',
                    key: Field.Overbridge.Desc,
                    type: FieldType.Text,
                },
            ],
        };
    },
};
</script>
