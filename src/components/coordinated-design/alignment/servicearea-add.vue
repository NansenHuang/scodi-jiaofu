<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}服务区</h4>
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
import LeftPartComponent from '../shared/template/compose/left-part';
import RightPartComponent from '../shared/template/compose/right-part';
import ConvertPinyin from '../shared/template/basic/convert-pinyin';

export default {
    name: 'NewServicearea',
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
                [Field.Servicearea.Project]: Cookies.get('project'),
                [Field.Servicearea.RightPart]: JSON.stringify(fieldData[[Field.Servicearea.RightPart]]),
                [Field.Servicearea.id]: update ? fieldData[Field.Servicearea.id] : '',
            };
            this.$Message.loading({
                content: '正在提交...',
                duration: 5,
            });
            this.$store.dispatch(update ? ActionType.UpdateServicearea : ActionType.AddServicearea, data)
                .then((data) => {
                    this.$Message.destroy();
                    if (data['data'] && data['timestamp']) {
                        this.$store.dispatch(ActionType.LoadServicearea);
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
                    label: '服务区中文名称',
                    key: Field.Servicearea.CnName,
                    type: FieldType.Text,
                },
                {
                    label: '服务区英文名称',
                    key: Field.Servicearea.EnName,
                    component: ConvertPinyin,
                    params: {
                        from: Field.Servicearea.CnName,
                    },
                },
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
                                to: Field.Servicearea.SectionID,
                            },
                        ],
                    },
                },
                {
                    label: '绑定路线（右）',
                    key: Field.Servicearea.RightPart,
                    component: RightPartComponent,
                },
                {
                    label: '绑定路线（左）',
                    key: Field.Servicearea.LeftPart,
                    component: LeftPartComponent,
                },
                {
                    label: '描述',
                    key: Field.Servicearea.Desc,
                    type: FieldType.Text,
                },
            ],
        };
    },
};
</script>
