<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}地质</h4>
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
import ConvertPinyin from '../shared/template/basic/convert-pinyin';
import FileType from 'src/config/file-type';

export default {
    name: 'NewGeology',
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
                [Field.Geology.Project]: this.currentData[Field.Geology.Project],
                [Field.Geology.id]: this.currentData[Field.Geology.id],
                [Field.Geology.CnName]: this.currentData[Field.Geology.CnName],
                [Field.Geology.EnName]: this.currentData[Field.Geology.EnName],
                [Field.Geology.SectionID]: this.currentData[Field.Geology.SectionID],
                [Field.Geology.Desc]: this.currentData[Field.Geology.Desc],
                [Field.Geology.BimFiles]: this.currentData[Field.Geology.BimFiles],
                'SinglePart': {
                    [Field.Geology.AlignmentID]: this.currentData[Field.Geology.AlignmentID],
                    [Field.Geology.AlignmentCnName]: this.currentData[Field.Geology.AlignmentCnName],
                    [Field.Geology.StationMark]: this.currentData[Field.Geology.StationMark],
                    [Field.Geology.StartStation]: this.currentData[Field.Geology.StartStation],
                    [Field.Geology.StartStationChain]: this.currentData[Field.Geology.StartStationChain],
                    [Field.Geology.EndStation]: this.currentData[Field.Geology.EndStation],
                    [Field.Geology.EndStationChain]: this.currentData[Field.Geology.EndStationChain],
                },
            };
        },
    },
    methods: {
        saveFunc (fieldData, update) {
            let data = {
                ...fieldData,
                [Field.Geology.Project]: Cookies.get('project'),
                [Field.Geology.id]: update ? fieldData[Field.Geology.id] : '',
                ...fieldData['SinglePart'],
            };
            delete data['SinglePart'];
            this.$Message.loading({
                content: '正在提交...',
                duration: 5,
            });
            this.$store.dispatch(update ? ActionType.UpdateGeology : ActionType.AddGeology, data)
                .then((data) => {
                    this.$Message.destroy();
                    if (data['data'] && data['timestamp']) {
                        this.$store.dispatch(ActionType.LoadGeology);
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
                    label: '地质中文名称',
                    key: Field.Geology.CnName,
                    type: FieldType.Text,
                },
                {
                    label: '地质英文名称',
                    key: Field.Geology.EnName,
                    component: ConvertPinyin,
                    params: {
                        from: Field.Geology.CnName,
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
                                to: Field.Geology.SectionID,
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
                    label: '设计文件',
                    key: Field.Geology.BimFiles,
                    type: FieldType.File,
                    params: {
                        fileType: FileType.Geology,
                    },
                },
                {
                    label: '描述',
                    key: Field.Geology.Desc,
                    type: FieldType.Text,
                },
            ],
        };
    },
};
</script>
