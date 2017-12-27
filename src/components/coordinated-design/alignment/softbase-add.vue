<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}软基处理</h4>
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
import Field from 'src/config/field';
import FieldType from 'src/config/field-type';
import ActionType from 'src/config/action-type.js';
import Cookies from 'js-cookie';
import SinglePartComponent from '../shared/template/compose/right-part';

export default {
    name: 'NewSoftbase',
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
                [Field.Softbase.Project]: this.currentData[Field.Softbase.Project],
                [Field.Softbase.id]: this.currentData[Field.Softbase.id],
                [Field.Softbase.Type]: this.currentData[Field.Softbase.Type],
                [Field.Softbase.ModelType]: this.currentData[Field.Softbase.ModelType],
                [Field.Softbase.SectionID]: this.currentData[Field.Softbase.SectionID],
                [Field.Softbase.Desc]: this.currentData[Field.Softbase.Desc],
                'SinglePart': {
                    [Field.Softbase.AlignmentID]: this.currentData[Field.Softbase.AlignmentID],
                    [Field.Softbase.AlignmentCnName]: this.currentData[Field.Softbase.AlignmentCnName],
                    [Field.Softbase.StationMark]: this.currentData[Field.Softbase.StationMark],
                    [Field.Softbase.StartStation]: this.currentData[Field.Softbase.StartStation],
                    [Field.Softbase.StartStationChain]: this.currentData[Field.Softbase.StartStationChain],
                    [Field.Softbase.EndStation]: this.currentData[Field.Softbase.EndStation],
                    [Field.Softbase.EndStationChain]: this.currentData[Field.Softbase.EndStationChain],
                },
            };
        },
    },
    methods: {
        saveFunc (fieldData, update) {
            let data = {
                ...fieldData,
                [Field.Softbase.Project]: Cookies.get('project'),
                [Field.Softbase.id]: update ? fieldData[Field.Softbase.id] : '',
                [Field.Softbase.Type]: 'RJHT',
                [Field.Softbase.ModelType]: 'RJHT',
                ...fieldData['SinglePart'],
            };
            delete data['SinglePart'];
            this.$Message.loading({
                content: '正在提交...',
                duration: 5,
            });
            this.$store.dispatch(update ? ActionType.UpdateSoftbase : ActionType.AddSoftbase, data)
                .then((data) => {
                    this.$Message.destroy();
                    if (data['data'] && data['timestamp']) {
                        this.$store.dispatch(ActionType.LoadSoftbase);
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
                        storePath: ['highway', 'basic', 'construct_section'],
                        map: [
                            {
                                from: Field.Section.SectionID,
                                to: Field.Softbase.SectionID,
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
                    label: '描述',
                    key: Field.Softbase.Desc,
                    type: FieldType.Text,
                },
            ],
        };
    },
};
</script>
