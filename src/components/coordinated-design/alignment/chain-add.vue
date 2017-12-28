<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <h4 slot="header">{{this.update ? '更新' : '添加'}}断链</h4>
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
import ChainConfig from 'src/components/coordinated-design/shared/template/compose/chain-config';
import FieldType from 'src/config/field-type';
import ActionType from 'src/config/action-type.js';
import Field from 'src/config/field';
import Cookies from 'js-cookie';

export default {
    name: 'NewChain',
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
                [Field.Chain.Project]: Cookies.get('project'),
                [Field.Chain.id]: update ? fieldData[Field.Chain.id] : '',
            };
            this.$Message.loading({
                content: '正在提交...',
                duration: 5,
            });
            this.$store.dispatch(update ? ActionType.UpdateChain : ActionType.AddChain, data)
                .then((data) => {
                    this.$Message.destroy();
                    if (data['data'] && data['timestamp']) {
                        this.$store.dispatch(ActionType.LoadChain);
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
                    label: '路线',
                    type: FieldType.Enum,
                    params: {
                        displayName: Field.Alignment.CnName,
                        id: Field.Alignment.id,
                        storePath: ['highway', 'basic', 'alignment'],
                        map: [
                            {
                                from: Field.Alignment.id,
                                to: Field.Chain.AlignmentID,
                            },
                            {
                                from: Field.Alignment.CnName,
                                to: Field.Chain.AlignmentCnName,
                            },
                        ],
                    },
                },
                {
                    label: '断链参数',
                    key: Field.Chain.config,
                    component: ChainConfig,
                },
            ],
        };
    },
};
</script>
