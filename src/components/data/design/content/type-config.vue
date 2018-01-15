<style lang="less" scoped>
</style>

<template>
    <div>
        <p>类型</p>
        <selector-item
                :itemData="itemData"
                :active="active"
                v-model="rightPartObject['type']"
                :dataSource="typeSource">
        </selector-item>
        <p>部件类型</p>
        <selector-item
                :itemData="itemData"
                :active="active"
                v-model="rightPartObject['modelType']"
                :dataSource="modelTypeSource">
        </selector-item>
    </div>
</template>

<script>
    import SelectorItem from 'src/components/coordinated-design/shared/template/basic/selector-item';
    import TypeValue from 'src/config/type';
    import ModelTypeValue from 'src/config/model-type';

    export default {
        name: 'TypeConfig',
        components: {
            SelectorItem,
        },
        props: {
            active: {
                type: Boolean,
                required: true,
            },
            itemData: {
                required: true,
            },
            value: {
                required: true,
            },
        },
        computed: {
            typeSource () {
                return Object.values(TypeValue).map(item => ({
                    label: this.$t(item),
                    value: item,
                }));
            },
            rightPartStr () {
                return JSON.stringify(this.rightPartObject);
            },
            modelTypeSource () {
                if (this.value && this.value['type']) {
                    let modelTypes = ModelTypeValue[this.value['type']];
                    return Object.values(modelTypes).map(item => ({
                        label: this.$t(item),
                        value: item,
                    }));
                } else {
                    return [];
                }
            },
        },
        data () {
            return {
                rightPartObject: {},
            };
        },
        methods: {},
        watch: {
            modelTypeSource: function (val) {
                // if (val.length === 1) {
                //     this.rightPartObject['modelType'] = this.modelTypeSource[0].value;
                // };
            },
            active: function (val) {
                if (val) {
                    this.rightPartObject = JSON.parse(JSON.stringify(this.value || {}));
                } else {
                    this.rightPartObject = {};
                };
            },
            rightPartStr: function (val) {
                if (this.active) {
                    this.$emit('input', val !== '{}' ? this.rightPartObject : undefined);
                };
            },
        },
        created: function () {
            this.rightPartObject = JSON.parse(JSON.stringify(this.value || {}));
        },
    };
</script>
