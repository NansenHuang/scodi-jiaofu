<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}路线</h4>
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
import RegionType from 'src/config/region-type';
import ConvertPinyin from '../shared/template/basic/convert-pinyin';

export default {
    name: 'NewAlignment',
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
                [Field.Alignment.Project]: Cookies.get('project'),
                [Field.Alignment.id]: update ? fieldData[Field.Alignment.id] : '',
            };
            this.$Message.loading({
                content: '正在提交...',
                duration: 5,
            });
            this.$store.dispatch(update ? ActionType.UpdateAlignment : ActionType.AddAlignment, data)
                .then((data) => {
                    this.$Message.destroy();
                    if (data['data'] && data['timestamp']) {
                        this.$store.dispatch(ActionType.LoadAlignment);
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
                    label: '路线中文名称',
                    key: Field.Alignment.CnName,
                    type: FieldType.Text,
                },
                {
                    label: '路线英文名称',
                    key: Field.Alignment.EnName,
                    component: ConvertPinyin,
                    params: {
                        from: Field.Alignment.CnName,
                    },
                },
                {
                    label: '所属工点',
                    type: FieldType.Map,
                    params: {
                        arraySource: [
                            {
                                label: '无',
                                value1: RegionType.None,
                                value2: RegionType.None,
                                value3: RegionType.None,
                            },
                        ],
                        storePattern: [
                            {
                                path: ['highway', 'basic', 'servicearea'],
                                map: [
                                    { from: Field.Servicearea.CnName, to: 'label' },
                                    { from: Field.Servicearea.id, to: 'value1' },
                                    { from: [RegionType.FuWuQu], to: 'value2' },
                                    { from: Field.Servicearea.CnName, to: 'value3' },
                                ],
                            },
                            {
                                path: ['highway', 'basic', 'parkinglot'],
                                map: [
                                    { from: Field.Parkinglot.CnName, to: 'label' },
                                    { from: Field.Parkinglot.id, to: 'value1' },
                                    { from: [RegionType.TingCheQu], to: 'value2' },
                                    { from: Field.Parkinglot.CnName, to: 'value3' },
                                ],
                            },
                            {
                                path: ['highway', 'basic', 'interchange'],
                                map: [
                                    { from: Field.Interchange.CnName, to: 'label' },
                                    { from: Field.Interchange.id, to: 'value1' },
                                    { from: [RegionType.HuTong], to: 'value2' },
                                    { from: Field.Interchange.CnName, to: 'value3' },
                                ],
                            },
                        ],
                        map: [
                            { from: 'value1', to: Field.Alignment.OwerID },
                            { from: 'value2', to: Field.Alignment.OwerType },
                            { from: 'value3', to: Field.Alignment.OwerCnName },
                        ],
                    },
                },
                {
                    label: '路线标识符',
                    key: Field.Alignment.StationMark,
                    type: FieldType.Text,
                },
                {
                    label: '方向',
                    key: Field.Alignment.Direction,
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
                    label: '起点桩号',
                    key: Field.Alignment.StartStation,
                    type: FieldType.Number,
                },
                {
                    label: '终点桩号',
                    key: Field.Alignment.EndStation,
                    type: FieldType.Number,
                },
                // {
                //     label: '添加断链',
                //     key: 'chainData',
                //     type: FieldType.SubItem,
                //     children: [
                //         {
                //             label: '桩号',
                //             key: Field.Chain.Station,
                //             type: FieldType.Text,
                //         },
                //         {
                //             label: '长链/短链',
                //             key: Field.Chain.Type,
                //             type: FieldType.Text,
                //         },
                //         {
                //             label: '长度',
                //             key: Field.Chain.Length,
                //             type: FieldType.Text,
                //         },
                //     ],
                // },
                // {
                //     label: '设计资料',
                //     key: Field.Alignment.Attachments,
                //     type: FieldType.Text,
                //     params: {
                //         url: '//jsonplaceholder.typicode.com/posts/',
                //     },
                // },
            ],
        };
    },
};
</script>
