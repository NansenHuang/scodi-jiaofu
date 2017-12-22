<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}施工区段</h4>
      <template-add
          :fields="fields"
          :active="active"
          :update="update"
          :currentData="currentData"
          :save="saveFunc"
          @close="() => {this.$emit('close')}"
      ></template-add>
  </div>
</template>

<script>
import TemplateAdd from 'src/components/coordinated-design/shared/template-add.vue';
import FieldType from 'src/config/field-type';
import ActionType from 'src/config/action-type.js';
import Field from 'src/config/field';
import Cookies from 'js-cookie';
import LeftPartComponent from '../shared/template/compose/left-part';
import RightPartComponent from '../shared/template/compose/right-part';

export default {
    name: 'NewContructionSection',
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
                [Field.Section.RightPart]: JSON.stringify(fieldData[[Field.Section.RightPart]]),
                [Field.Section.Project]: Cookies.get('project'),
                [Field.Section.id]: update ? fieldData[Field.Section.id] : '',
            };
            this.$Message.loading({
                content: '正在提交...',
                duration: 5,
            });
            this.$store.dispatch(update ? ActionType.UpdateConstructionSection : ActionType.AddConstructionSection, data)
                .then((data) => {
                    this.$Message.destroy();
                    if (data['data'] && data['timestamp']) {
                        this.$store.dispatch(ActionType.LoadConstructionSection);
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
                    label: '区段名称',
                    key: Field.Section.Name,
                    type: FieldType.Text,
                },
                {
                    label: '区段ID',
                    key: Field.Section.SectionID,
                    type: FieldType.Text,
                },
                {
                    label: '绑定路线（右）',
                    key: Field.Section.RightPart,
                    component: RightPartComponent,
                },
                {
                    label: '绑定路线（左）',
                    key: Field.Section.LeftPart,
                    component: LeftPartComponent,
                },
            ],
        };
    },
};
</script>
