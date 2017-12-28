<style lang="less">
</style>

<template>
    <div>
        <p>测量桩号</p>
        <Input v-model.number="configObject[SubField.Chain.config.MeasureStation]"></Input>
        <p>断链桩号</p>
        <Input v-model.number="configObject[SubField.Chain.config.Station]"></Input>
        <p>断链类型</p>
        <selector-item
                :itemData="itemData"
                :active="active"
                v-model.number="configObject[SubField.Chain.config.Type]"
                :dataSource="[{label: '长链', value: 'long',}, {label: '短链', value: 'short'}]"
        ></selector-item>
        <p>长度</p>
        <Input v-model.number="configObject[SubField.Chain.config.Length]"></Input>
        <p>累积长链</p>
        <Input v-model.number="configObject[SubField.Chain.config.SumLong]"></Input>
        <p>累积短链</p>
        <Input v-model.number="configObject[SubField.Chain.config.SumShort]"></Input>
        <p>连续桩号</p>
        <Input v-model.number="configObject[SubField.Chain.config.SequentStation]"></Input>
    </div>
</template>

<script>
    import { SubField } from 'src/config/field';
    import SelectorItem from '../basic/selector-item';

    export default {
        name: 'ChainConfig',
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
            configObjectStr () {
                return JSON.stringify(this.configObject);
            },
        },
        data () {
            return {
                SubField,
                configObject: {},
            };
        },
        methods: {},
        watch: {
            active: function (val) {
                if (val) {
                    this.configObject = JSON.parse(this.value || '{}');
                } else {
                    this.configObject = {};
                };
            },
            configObjectStr: function (val) {
                if (this.active) {
                    this.$emit('input', val);
                };
            },
        },
        created: function () {
            this.configObject = JSON.parse(this.value || '{}');
        },
    };
</script>
