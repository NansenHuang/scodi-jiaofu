<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}挡墙</h4>
      <template-add
          :fields="fields"
          :active="active"
          :save="saveFunc"
          :update="update"
          :currentData="newCurrentData"
          :deleteItemAction="ActionType.DeleteGuardwall"
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
import SinglePartComponent from '../shared/template/compose/right-part';

export default {
    name: 'NewGuardwall',
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
                [Field.Guardwall.Project]: this.currentData[Field.Guardwall.Project],
                [Field.Guardwall.id]: this.currentData[Field.Guardwall.id],
                [Field.Guardwall.Type]: this.currentData[Field.Guardwall.Type],
                [Field.Guardwall.ModelType]: this.currentData[Field.Guardwall.ModelType],
                [Field.Guardwall.SectionID]: this.currentData[Field.Guardwall.SectionID],
                [Field.Guardwall.Direction]: this.currentData[Field.Guardwall.Direction],
                [Field.Guardwall.Desc]: this.currentData[Field.Guardwall.Desc],
                'SinglePart': {
                    [Field.Guardwall.AlignmentID]: this.currentData[Field.Guardwall.AlignmentID],
                    [Field.Guardwall.AlignmentCnName]: this.currentData[Field.Guardwall.AlignmentCnName],
                    [Field.Guardwall.StationMark]: this.currentData[Field.Guardwall.StationMark],
                    [Field.Guardwall.StartStation]: this.currentData[Field.Guardwall.StartStation],
                    [Field.Guardwall.StartStationChain]: this.currentData[Field.Guardwall.StartStationChain],
                    [Field.Guardwall.EndStation]: this.currentData[Field.Guardwall.EndStation],
                    [Field.Guardwall.EndStationChain]: this.currentData[Field.Guardwall.EndStationChain],
                },
            };
        },
    },
    methods: {
        saveFunc (fieldData, update) {
            let data = {
                ...fieldData,
                [Field.Guardwall.Project]: Cookies.get('project'),
                [Field.Guardwall.id]: update ? fieldData[Field.Guardwall.id] : '',
                [Field.Guardwall.Type]: 'DQ',
                ...fieldData['SinglePart'],
            };
            delete data['SinglePart'];
            this.$Message.loading({
                content: '正在提交...',
                duration: 5,
            });
            this.$store.dispatch(update ? ActionType.UpdateGuardwall : ActionType.AddGuardwall, data)
                .then((data) => {
                    this.$Message.destroy();
                    if (data['data'] && data['timestamp']) {
                        this.$store.dispatch(ActionType.LoadGuardwall);
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
                    label: '部件类型',
                    key: Field.Guardwall.ModelType,
                    type: FieldType.Array,
                    params: {
                        data: [
                            {
                                label: '路肩墙',
                                value: 'LJQ',
                            },
                            {
                                label: '路中墙',
                                value: 'LZQ',
                            },
                            {
                                label: '路堤墙',
                                value: 'LDQ',
                            },
                            {
                                label: '路堑墙',
                                value: 'LQQ',
                            },
                        ],
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
                                to: Field.Guardwall.SectionID,
                            },
                        ],
                    },
                },
                {
                    label: '绑定路线',
                    key: 'SinglePart',
                    component: SinglePartComponent,
                },
                {
                    label: '方向',
                    key: Field.Guardwall.Direction,
                    type: FieldType.Array,
                    params: {
                        data: [
                            {
                                label: '左',
                                value: 'left',
                            },
                            {
                                label: '右',
                                value: 'right',
                            },
                        ],
                    },
                },
                {
                    label: '描述',
                    key: Field.Guardwall.Desc,
                    type: FieldType.Text,
                },
            ],
        };
    },
};
</script>
