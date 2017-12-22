<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}停车区</h4>
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
    name: 'NewParkinglot',
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
                [Field.Parkinglot.Project]: Cookies.get('project'),
                [Field.Servicearea.RightPart]: JSON.stringify(fieldData[[Field.Servicearea.RightPart]]),
                [Field.Servicearea.id]: update ? fieldData[Field.Servicearea.id] : '',
            };
            this.$Message.loading({
                content: '正在提交...',
                duration: 5,
            });
            this.$store.dispatch(update ? ActionType.UpdateParkinglot : ActionType.AddParkinglot, data)
                .then((data) => {
                    this.$Message.destroy();
                    if (data['data'] && data['timestamp']) {
                        this.$store.dispatch(ActionType.LoadParkinglot);
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
                    label: '停车区中文名称',
                    key: Field.Parkinglot.CnName,
                    type: FieldType.Text,
                },
                {
                    label: '停车区英文名称',
                    key: Field.Parkinglot.EnName,
                    component: ConvertPinyin,
                    params: {
                        from: Field.Parkinglot.CnName,
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
                                to: Field.Parkinglot.SectionID,
                            },
                        ],
                    },
                },
                {
                    label: '绑定路线（右）',
                    key: Field.Parkinglot.RightPart,
                    component: RightPartComponent,
                },
                {
                    label: '绑定路线（左）',
                    key: Field.Parkinglot.LeftPart,
                    component: LeftPartComponent,
                },
                {
                    label: '描述',
                    key: Field.Parkinglot.Desc,
                    type: FieldType.Text,
                },
            ],
        };
    },
};
</script>
