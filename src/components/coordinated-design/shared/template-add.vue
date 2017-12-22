<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
  <div>
      <Form :label-width="100" style="padding: 0 20px;">
          <FormItem v-for="f in fields" :key="f.key" :label="f.label">
              <component
                :is="f.component || getComponent(f.type)"
                :itemData="data"
                v-model="data[f.key]"
                placeholder="请输入"

                :fields="f.children"
                :params="f.params"
                :active="active"

                :backdoor.sync="data">
              </component>
          </FormItem>
      </Form>
      <Row class="margin-top-20 publish-button-con" style="width:100%;display:inline-flex;justify-content:flex-end;">
          <span class="publish-button">
              <Button icon="ios-checkmark" @click="handleSave" style="width:90px;" :type="this.update?'success':'primary'">{{this.update?'更新':'保存'}}</Button>
              <Button @click="close" style="width:90px;">关闭</Button>
          </span>
      </Row>
  </div>
</template>

<script>
import { Input } from 'iview';
import FieldType from 'src/config/field-type';
import EnumType from './template/enumtype';
import SubItem from './template/subitem';
import JSONType from './template/jsontype';
import ArrayType from './template/arraytype';
import MapType from './template/maptype';
import ComplexType from './template/complextype';
import IntervalValidateType from './template/interval-validate';
import File from './template/file';

export default {
    name: 'NewItemTemplate',
    components: {},
    props: {
        active: {
            type: Boolean,
            required: true,
        },
        fields: {
            type: Array,
            required: true,
        },
        save: {
            type: Function,
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
    data () {
        return {
            data: {},
        };
    },
    methods: {
        getComponent (type) {
            switch (type) {
                case FieldType.Text:
                case FieldType.Number:
                    return Input;
                case FieldType.Enum:
                    return EnumType;
                case FieldType.JSON:
                    return JSONType;
                case FieldType.Array:
                    return ArrayType;
                case FieldType.File:
                    return File;
                case FieldType.Map:
                    return MapType;
                case FieldType.SubItem:
                    return SubItem;
                case FieldType.Complex:
                    return ComplexType;
                case FieldType.Validate:
                    return IntervalValidateType;
                default:
                    return Input;
            }
        },
        handleSave () {
            this.save(this.data, this.update);
        },
        clearData () {
            // 在关闭Modal时清空已填写数据
            this.data = {};
        },
        close () {
            this.$emit('close');
        },
    },
    watch: {
        active: function (val) {
            if (val) {
                this.data = JSON.parse(JSON.stringify(this.currentData));
            } else {
                this.data = {};
            }
        },
    },
    created: function () {
        this.data = JSON.parse(JSON.stringify(this.currentData));
    },
};
</script>
