<style lang="less" scoped>
.modal_foot {
  width: 100%;
  display: inline-flex;
  justify-content: flex-end;
}
</style>

<template>
    <div>
      <Form :label-width="80">
        <FormItem :label="field.name" v-for="field in fields" :key="field.key">
          <Select v-if="fieldOptions[field.key] && fieldOptions[field.key].length" v-model="fieldValues[field.key]" multiple>
            <Option v-for="item in fieldOptions[field.key]" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-else></Select>
        </FormItem>
      </Form>
      <Row class="margin-top-20 publish-button-con modal_foot">
        <span class="publish-button">
            <Button icon="ios-checkmark" @click="handleSave" style="width:90px;" type="primary">保存</Button>
            <Button @click="close" style="width:90px;">关闭</Button>
        </span>
      </Row>
    </div>
</template>

<script>
import Type from 'src/config/type';

export default {
    name: 'BindField',
    computed: {
        fieldValuesForSave: function () {
            let result = JSON.parse(JSON.stringify(this.fieldValues));
            Object.keys(result).map((key) => {
                if (!result[key] || !result[key].length) {
                    delete result[key];
                };
            });
            return result;
        },
    },
    data: function () {
        return {
            fieldValues: {
                type: [],
                modelType: [],
                section: [],
                alignment: [],
                site: [],
            },
            fieldOptions: {
                type: Object.values(Type).map(item => ({ label: item, value: item })),
                modelType: [],
                section: ['LJ8', 'LJ9', 'LJ10'].map(item => ({ label: item, value: item })),
                alignment: [],
                site: [],
            },
            fields: [
                {
                    name: '类型',
                    key: 'type',
                },
                {
                    name: '部件类型',
                    key: 'modelType',
                },
                {
                    name: '合同段',
                    key: 'section',
                },
                {
                    name: '路线',
                    key: 'alignment',
                },
                {
                    name: '工点',
                    key: 'site',
                }
            ],
        };
    },
    methods: {
        close: function () {
            this.$emit('close');
        },
        handleSave: function () {
            this.$emit('save', this.fieldValuesForSave);
        },
    },
};
</script>
