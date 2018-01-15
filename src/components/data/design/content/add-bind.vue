<style lang="less" scoped>
</style>

<template>
  <div>
      <template-add
          :active="active"
          :update="update"
          :currentData="currentData"
          :fields="fields"
          :save="saveFunc"
          :deleteItemAction="''"
          @close="() => {this.$emit('close')}"
      ></template-add>
  </div>
</template>

<script>
import TemplateAdd from 'src/components/coordinated-design/shared/template-add.vue';
import Field from 'src/config/field';
import FieldType from 'src/config/field-type';
// import ActionType from 'src/config/action-type.js';
// import Cookies from 'js-cookie';
// import RegionType from 'src/config/region-type';
// import ConvertPinyin from '../shared/template/basic/convert-pinyin';
import SinglePartComponent from 'src/components/coordinated-design/shared/template/compose/right-part';
import TypeValue from 'src/config/type';

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
            default: function () {
                return {};
            },
        },
    },
    methods: {
        saveFunc (fieldData, update = false) {
            let result = JSON.parse(JSON.stringify(fieldData));
            result = {...result, ...result['alignment']};
            delete result['alignment'];
            this.$emit('save', result);
        },
    },
    data () {
        return {
            fields: [
                {
                    label: '类型',
                    key: 'type',
                    type: FieldType.Array,
                    params: {
                        data: Object.values(TypeValue).map(item => ({
                            label: this.$t(item),
                            value: item,
                        })),
                    },
                },
                {
                    label: '部件类型',
                    key: 'modelType',
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
                    key: 'alignment',
                    component: SinglePartComponent,
                },
                {
                    label: '所属工点',
                    type: FieldType.Map,
                    params: {
                        arraySource: [
                            {
                                label: '测试',
                                value1: 'testType',
                                value2: 'testEnName',
                                value3: 'testCnName',
                            },
                        ],
                        storePattern: [],
                        map: [
                            { from: 'value1', to: 'siteType' },
                            { from: 'value2', to: 'siteEnName' },
                            { from: 'value3', to: 'siteCnName' },
                        ],
                    },
                },
                {
                    label: '方向',
                    key: 'direction',
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
                            {
                                label: '横向',
                                value: 'vertical',
                            },
                            {
                                label: '纵向',
                                value: 'horizontal',
                            },
                        ],
                    },
                },
            ],
        };
    },
};
</script>
