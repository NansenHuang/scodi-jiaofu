<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}盲沟</h4>
      <template-add
          :fields="fields"
          :active="active"
          :save="saveFunc"
          :update="update"
          :currentData="newCurrentData"
          :deleteItemAction="ActionType.DeleteCrossBlinddrain"
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
    name: 'NewCrossBlinddrain',
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
                [Field.CrossBlinddrain.Project]: this.currentData[Field.CrossBlinddrain.Project],
                [Field.CrossBlinddrain.id]: this.currentData[Field.CrossBlinddrain.id],
                [Field.CrossBlinddrain.Type]: this.currentData[Field.CrossBlinddrain.Type],
                [Field.CrossBlinddrain.ModelType]: this.currentData[Field.CrossBlinddrain.ModelType],
                [Field.CrossBlinddrain.SectionID]: this.currentData[Field.CrossBlinddrain.SectionID],
                [Field.CrossBlinddrain.Direction]: this.currentData[Field.CrossBlinddrain.Direction],
                [Field.CrossBlinddrain.Desc]: this.currentData[Field.CrossBlinddrain.Desc],
                'SinglePart': {
                    [Field.CrossBlinddrain.AlignmentID]: this.currentData[Field.CrossBlinddrain.AlignmentID],
                    [Field.CrossBlinddrain.AlignmentCnName]: this.currentData[Field.CrossBlinddrain.AlignmentCnName],
                    [Field.CrossBlinddrain.StationMark]: this.currentData[Field.CrossBlinddrain.StationMark],
                    [Field.CrossBlinddrain.StartStation]: this.currentData[Field.CrossBlinddrain.StartStation],
                    [Field.CrossBlinddrain.StartStationChain]: this.currentData[Field.CrossBlinddrain.StartStationChain],
                    [Field.CrossBlinddrain.EndStation]: this.currentData[Field.CrossBlinddrain.EndStation],
                    [Field.CrossBlinddrain.EndStationChain]: this.currentData[Field.CrossBlinddrain.EndStationChain],
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
                [Field.CrossBlinddrain.Type]: 'MG',
                [Field.CrossBlinddrain.ModelType]: 'JJMG',
                ...fieldData['SinglePart'],
            };
            delete data['SinglePart'];
            this.$Message.loading({
                content: '正在提交...',
                duration: 5,
            });
            this.$store.dispatch(update ? ActionType.UpdateBlinddrain : ActionType.AddBlinddrain, data)
                .then((data) => {
                    this.$Message.destroy();
                    if (data['data'] && data['timestamp']) {
                        this.$store.dispatch(ActionType.LoadCrossBlinddrain);
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
                                to: Field.CrossBlinddrain.SectionID,
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
                    key: Field.CrossBlinddrain.Direction,
                    type: FieldType.Array,
                    params: {
                        data: [
                            {
                                label: '横向',
                                value: 'horizontal',
                            },
                            {
                                label: '纵向',
                                value: 'vertical',
                            },
                        ],
                    },
                },
                {
                    label: '描述',
                    key: Field.CrossBlinddrain.Desc,
                    type: FieldType.Text,
                },
            ],
        };
    },
};
</script>
