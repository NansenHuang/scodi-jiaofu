<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}隧道</h4>
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
import Field, { SubField } from 'src/config/field';
import FieldType from 'src/config/field-type';
import ActionType from 'src/config/action-type.js';
import Cookies from 'js-cookie';
import LeftPartComponent from '../shared/template/compose/left-part';
import RightPartComponent from '../shared/template/compose/right-part';
import ConvertPinyin from '../shared/template/basic/convert-pinyin';
import FileType from 'src/config/file-type';

export default {
    name: 'NewTunnel',
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
            let data = {
                ...fieldData,
                [Field.Tunnel.Project]: Cookies.get('project'),
                [Field.Tunnel.RightPart]: JSON.stringify(fieldData[[Field.Tunnel.RightPart]]),
                [Field.Tunnel.id]: update ? fieldData[Field.Tunnel.id] : '',
            };
            this.$Message.loading({
                content: '正在提交...',
                duration: 5,
            });
            this.$store.dispatch(update ? ActionType.UpdateTunnel : ActionType.AddTunnel, data)
                .then((data) => {
                    this.$Message.destroy();
                    if (data['data'] && data['timestamp']) {
                        this.$store.dispatch(ActionType.LoadTunnel);
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
                    label: '隧道中文名称',
                    key: Field.Tunnel.CnName,
                    type: FieldType.Text,
                },
                {
                    label: '隧道英文名称',
                    key: Field.Tunnel.EnName,
                    component: ConvertPinyin,
                    params: {
                        from: Field.Tunnel.CnName,
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
                                to: Field.Tunnel.SectionID,
                            },
                        ],
                    },
                },
                {
                    label: '偏移量X',
                    key: Field.Tunnel.Posture,
                    vueKey: Field.Tunnel.Posture + '_X',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Tunnel.Posture.x,
                    },
                },
                {
                    label: '偏移量Y',
                    key: Field.Tunnel.Posture,
                    vueKey: Field.Tunnel.Posture + '_Y',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Tunnel.Posture.y,
                    },
                },
                {
                    label: '偏移量Z',
                    key: Field.Tunnel.Posture,
                    vueKey: Field.Tunnel.Posture + '_Z',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Tunnel.Posture.z,
                    },
                },
                {
                    label: '角度',
                    key: Field.Tunnel.Posture,
                    vueKey: Field.Tunnel.Posture + '_Alpha',
                    type: FieldType.JSON,
                    params: {
                        name: SubField.Tunnel.Posture.alpha,
                    },
                },
                {
                    label: '绑定路线（右）',
                    key: Field.Tunnel.RightPart,
                    component: RightPartComponent,
                },
                {
                    label: '绑定路线（左）',
                    key: Field.Tunnel.LeftPart,
                    component: LeftPartComponent,

                },
                {
                    label: '设计文件',
                    key: Field.Tunnel.BimFiles,
                    type: FieldType.File,
                    params: {
                        fileType: FileType.Tunnel,
                    },
                },
                {
                    label: '描述',
                    key: Field.Tunnel.Desc,
                    type: FieldType.Text,
                },
            ],
        };
    },
};
</script>
