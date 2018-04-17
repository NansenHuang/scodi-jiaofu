<style lang="less">
</style>

<template>
    <div>
        <Select style="position: relative" ref="select" v-if="dataSource && dataSource.length" v-model="selected" clearable @on-change="selectChange" :multiple="multiple">
            <Option
                v-for="item in dataSource"
                :label="item['label']"
                :value="item['value']"
                :key="item['value']"
                ></Option>
        </Select>
        <Select ref="select" disabled v-else></Select>
    </div>
</template>

<script>
export default {
    name: 'SelectorItem',
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
        dataSource: {
            type: Array,
            required: true,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
    },
    computed: {},
    data () {
        return {
            selected: '',
        };
    },
    methods: {
        selectChange (val) {
            if (this.active) {
                this.$emit('input', val || undefined);
            }
        },
    },
    watch: {
        active: function (val) {
            if (val) {
                this.selected = this.value;
            } else {
                this.$refs['select'].clearSingleSelect();
            }
        },
    },
    created () {
        this.selected = this.value;
    },
};
</script>
