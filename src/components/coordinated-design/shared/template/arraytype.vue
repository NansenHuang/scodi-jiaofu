<style lang="less">
    @import '../../../../styles/common.less';
</style>

<template>
    <div>
        <Select ref="select" v-if="dataSource && dataSource.length" v-model="selected" clearable @on-change="selectChange">
            <Option
                v-for="item in dataSource"
                :value="item['value']"
                :label="item['label']"
                :key="item['value']"></Option>
        </Select>
        <Select ref="select" v-else></Select>
    </div>
</template>

<script>

export default {
    name: 'ArrayType',
    components: {},
    props: {
        value: {
            default: function () {
                return '';
            },
        },
        active: {
            type: Boolean,
            required: true,
        },
        params: {
            type: Object,
            required: true,
        },
    },
    computed: {
        dataSource () {
            return this.params['data'];
        },
    },
    data () {
        return {
            selected: '',
        };
    },
    methods: {
        selectChange (val) {
            this.$emit('input', val);
        },
    },
    watch: {
        active: function (val) {
            if (val) {
                this.selected = this.value;
            } else {
                this.$refs['select'].clearSingleSelect();
            };
        },
    },
    created: function () {
        this.selected = this.value;
    },
};
</script>
