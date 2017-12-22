<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}边沟盲沟</h4>
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
    name: 'NewSideBlinddrain',
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
                [Field.SideBlinddrain.Project]: this.currentData[Field.SideBlinddrain.Project],
                [Field.SideBlinddrain.id]: this.currentData[Field.SideBlinddrain.id],
                [Field.SideBlinddrain.Type]: this.currentData[Field.SideBlinddrain.Type],
                [Field.SideBlinddrain.ModelType]: this.currentData[Field.SideBlinddrain.ModelType],
                [Field.SideBlinddrain.SectionID]: this.currentData[Field.SideBlinddrain.SectionID],
                [Field.SideBlinddrain.Direction]: this.currentData[Field.SideBlinddrain.Direction],
                [Field.SideBlinddrain.Desc]: this.currentData[Field.SideBlinddrain.Desc],
                'SinglePart': {
                    [Field.SideBlinddrain.AlignmentID]: this.currentData[Field.SideBlinddrain.AlignmentID],
                    [Field.SideBlinddrain.AlignmentCnName]: this.currentData[Field.SideBlinddrain.AlignmentCnName],
                    [Field.SideBlinddrain.StationMark]: this.currentData[Field.SideBlinddrain.StationMark],
                    [Field.SideBlinddrain.StartStation]: this.currentData[Field.SideBlinddrain.StartStation],
                    [Field.SideBlinddrain.StartStationChain]: this.currentData[Field.SideBlinddrain.StartStationChain],
                    [Field.SideBlinddrain.EndStation]: this.currentData[Field.SideBlinddrain.EndStation],
                    [Field.SideBlinddrain.EndStationChain]: this.currentData[Field.SideBlinddrain.EndStationChain],
                },
            };
        },
    },
    methods: {
        saveFunc (fieldData, update) {
            let data = {
                ...fieldData,
                [Field.SideBlinddrain.Project]: Cookies.get('project'),
                [Field.SideBlinddrain.id]: update ? fieldData[Field.SideBlinddrain.id] : '',
                [Field.SideBlinddrain.Type]: 'MG',
                [Field.SideBlinddrain.ModelType]: 'BGMG',
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
                        this.$store.dispatch(ActionType.LoadSideBlinddrain);
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
                                to: Field.SideBlinddrain.SectionID,
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
                    key: Field.SideBlinddrain.Direction,
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
                    key: Field.SideBlinddrain.Desc,
                    type: FieldType.Text,
                },
            ],
        };
    },
};
</script>
