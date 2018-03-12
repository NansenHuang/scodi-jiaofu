<style lang="less" scoped>
</style>

<template>
  <div>
      <template-adds
          :active="active"
          :update="update"
          :currentData="currentData"
          :fields="fields"
          :save="saveFunc"
          :deleteItemAction="''"
          @close="() => {this.$emit('close')}"
      ></template-adds>
  </div>
</template>

<script>
import TemplateAdds from 'src/components/coordinated-design/shared/template-adds.vue';
import Field from 'src/config/field';
import FieldType from 'src/config/field-type';
// import ActionType from 'src/config/action-type.js';
// import Cookies from 'js-cookie';
// import RegionType from 'src/config/region-type';
// import ConvertPinyin from '../shared/template/basic/convert-pinyin';
import SinglePartComponent from 'src/components/coordinated-design/shared/template/compose/right-part';
import TypeConfig from './type-config';
import SiteConfig from './site-config';

export default {
    name: 'AddBinds',
    components: {
        TemplateAdds,
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
            let alignment = result['alignment'];
            let site = result['site'];
            let type = result['type'];
            //
            delete result['alignment'];
            delete result['site'];
            delete result['type'];
            //
            result = {...result, ...alignment, ...site, ...type};
            //
            this.$emit('save', result);
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
                                to: Field.Guardwall.SectionID,
                            },
                        ],
                    },
                },
                {
                    label: '绑定类型',
                    key: 'type',
                    component: TypeConfig,
                },
                {
                    label: '绑定路线',
                    key: 'alignment',
                    component: SinglePartComponent,
                },
                {
                    label: '绑定工点',
                    key: 'site',
                    component: SiteConfig,
                },
            ],
        };
    },
};
</script>
