<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}桥梁</h4>
      <template-add
          :fields="fields"
          :active="active"
          :save="saveFunc"
          :update="update"
          :currentData="currentData"
          :deleteItemAction="ActionType.DeleteBridge"
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
import LeftPartComponent from '../shared/template/compose/left-part';
import RightPartComponent from '../shared/template/compose/right-part';
import ConvertPinyin from '../shared/template/basic/convert-pinyin';
import FileType from 'src/config/file-type';

export default {
    name: 'NewBridge',
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
    methods: {
        saveFunc (fieldData, update) {
            if (!fieldData['bimFiles']) {
                fieldData['bimFiles'] = JSON.stringify({'type': 'bridges', 'files': []});
            };
            let data = {
                ...fieldData,
                [Field.Bridge.Project]: Cookies.get('project'),
                [Field.Bridge.RightPart]: JSON.stringify(fieldData[[Field.Bridge.RightPart]]),
                [Field.Bridge.id]: update ? fieldData[Field.Bridge.id] : '',
            };
            this.$Message.loading({
                content: '正在提交...',
                duration: 5,
            });
            this.$store.dispatch(update ? ActionType.UpdateBridge : ActionType.AddBridge, data)
                .then((data) => {
                    this.$Message.destroy();
                    if (data['data'] && data['timestamp']) {
                        this.$store.dispatch(ActionType.LoadBridge);
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
                    label: '桥梁中文名称',
                    key: Field.Bridge.CnName,
                    type: FieldType.Text,
                },
                {
                    label: '桥梁英文名称',
                    key: Field.Bridge.EnName,
                    component: ConvertPinyin,
                    params: {
                        from: Field.Bridge.CnName,
                    },
                },
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
                                to: Field.Bridge.SectionID,
                            },
                        ],
                    },
                },
                {
                    label: '偏移量X',
                    key: Field.Bridge.Posture,
                    vueKey: Field.Bridge.Posture + '_X',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Bridge.Posture.x,
                    },
                },
                {
                    label: '偏移量Y',
                    key: Field.Bridge.Posture,
                    vueKey: Field.Bridge.Posture + '_Y',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Bridge.Posture.y,
                    },
                },
                {
                    label: '偏移量Z',
                    key: Field.Bridge.Posture,
                    vueKey: Field.Bridge.Posture + '_Z',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Bridge.Posture.z,
                    },
                },
                {
                    label: '角度',
                    key: Field.Bridge.Posture,
                    vueKey: Field.Bridge.Posture + '_Alpha',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Bridge.Posture.alpha,
                    },
                },
                {
                    label: '绑定路线（右）',
                    key: Field.Bridge.RightPart,
                    component: RightPartComponent,
                },
                {
                    label: '绑定路线（左）',
                    key: Field.Bridge.LeftPart,
                    component: LeftPartComponent,
                },
                {
                    label: '设计文件',
                    key: Field.Bridge.BimFiles,
                    type: FieldType.File,
                    params: {
                        fileType: FileType.Bridge,
                    },
                },
                {
                    label: '描述',
                    key: Field.Bridge.Desc,
                    type: FieldType.Text,
                },
            ],
        };
    },
};
</script>
