<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}互通</h4>
      <template-add
          :fields="fields"
          :active="active"
          :save="saveFunc"
          :update="update"
          :currentData="currentData"
          :deleteItemAction="ActionType.DeleteInterchange"
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
    name: 'NewInterchange',
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
                [Field.Interchange.Project]: Cookies.get('project'),
                [Field.Interchange.RightPart]: JSON.stringify(fieldData[[Field.Interchange.RightPart]]),
                [Field.Interchange.id]: update ? fieldData[Field.Interchange.id] : '',
            };
            this.$Message.loading({
                content: '正在提交...',
                duration: 5,
            });
            this.$store.dispatch(update ? ActionType.UpdateInterchange : ActionType.AddInterchange, data)
                .then((data) => {
                    this.$Message.destroy();
                    if (data['data'] && data['timestamp']) {
                        this.$store.dispatch(ActionType.LoadInterchange);
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
                    label: '互通中文名称',
                    key: Field.Interchange.CnName,
                    type: FieldType.Text,
                },
                {
                    label: '互通英文名称',
                    key: Field.Interchange.EnName,
                    component: ConvertPinyin,
                    params: {
                        from: Field.Interchange.CnName,
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
                                to: Field.Interchange.SectionID,
                            },
                        ],
                    },
                },
                {
                    label: '绑定路线（右）',
                    key: Field.Interchange.RightPart,
                    component: RightPartComponent,
                },
                {
                    label: '绑定路线（左）',
                    key: Field.Interchange.LeftPart,
                    component: LeftPartComponent,
                },
                {
                    label: '描述',
                    key: Field.Interchange.Desc,
                    type: FieldType.Text,
                },
            ],
        };
    },
};
</script>
