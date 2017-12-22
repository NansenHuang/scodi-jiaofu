<style lang="less">
</style>

<template>
    <Input v-model="inputValue" :placeholder="placeholder"></Input>
</template>

<script>
const Convert = require('convert-chinese-to-pinyin');

export default {
    name: 'ConvertPinyin',
    components: {},
    props: {
        itemData: {
            required: true,
        },
        value: {
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
        },
        params: {
            type: Object,
            required: true,
        },
        placeholder: {
            type: String,
            default: '请输入',
        },
    },
    computed: {
        srcValue: function () {
            return this.itemData[this.params['from']];
        },
    },
    data () {
        return {
            inputValue: '',
        };
    },
    methods: {},
    watch: {
        srcValue: function (newVal, oldVal) {
            if (this.active && oldVal !== undefined) {
                let pinyin = Convert(newVal);
                this.inputValue = pinyin;
                this.$emit('input', pinyin);
            };
        },
        active: function (val) {
            if (val) {
                this.inputValue = this.value;
            } else {
                this.inputValue = '';
            };
        },
    },
    created: function () {
        this.inputValue = this.value;
    },
};
</script>
