<style lang="less">
    @import '../../../../styles/common.less';
</style>

<template>
    <div>
        <Input :placeholder="placeholder" v-model="jsonValue"></Input>
    </div>
</template>

<script>

export default {
    name: 'JSONType',
    components: {},
    props: {
        placeholder: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            default: '',
        },
        params: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {};
    },
    computed: {
        jsonValue: {
            get: function () {
                let obj = (this.value && JSON.parse(this.value)) || {};
                return obj[this.params['name']] || '';
            },
            set: function (val) {
                let obj = (this.value && JSON.parse(this.value)) || {};
                let newObj = {
                    ...obj,
                    [this.params['name']]: val,
                };
                this.$emit('input', JSON.stringify(newObj));
            },
        },
    },
    methods: {},
};
</script>
