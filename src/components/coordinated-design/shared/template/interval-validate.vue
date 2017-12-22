<style lang="less">
    @import '../../../../styles/common.less';
</style>

<template>
    <div>
        <p v-if="intervalId.length" style="color:red;">检测到该桩号在断链范围内，请选择：</p>
        <Select ref="select" :disabled="!intervalId.length" v-model="selected" clearable @on-change="selectChange">
            <Option label="前" value="front"></Option>
            <Option label="后" value="rear"></Option>
        </Select>
    </div>
</template>

<script>

export default {
    name: 'IntervalValidateType',
    components: {},
    props: {
        active: {
            type: Boolean,
            required: true,
        },
        backdoor: {
            type: Object,
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
    computed: {
        srcStation () {
            if (typeof this.params['from'] === 'object') {
                let src = (this.backdoor && this.backdoor[this.params['from']['field']]) || '{}';
                return JSON.parse(src)[this.params['from']['key']];
            } else {
                return this.backdoor[this.params['from']];
            }
        },
        alignmentId () {
            if (typeof this.params['match'] === 'object') {
                let src = (this.backdoor && this.backdoor[this.params['match']['field']]) || '{}';
                return JSON.parse(src)[this.params['match']['key']];
            } else {
                return this.backdoor[this.params['match']];
            };
        },
        intervalId () {
            let iTreeObject = this.$store.state['highway']['intervalTree'];
            if (!isNaN(Number(this.srcStation)) && iTreeObject[this.alignmentId]) {
                return iTreeObject[this.alignmentId].search(Number(this.srcStation));
            } else {
                return [];
            }
        },
    },
    data () {
        return {
            selected: '',
        };
    },
    methods: {
        selectChange: function (val) {
            let intervalStr = this.intervalId.length ? '_' + this.intervalId[0]['start'] : '';
            if (typeof this.params['to'] === 'object') {
                let obj = (this.value && JSON.parse(this.value)) || {};
                let newObj = {
                    ...obj,
                    [this.params['to']['key']]: val + intervalStr,
                };
                this.$emit('input', JSON.stringify(newObj));
            } else {
                this.$emit('input', val + intervalStr);
            };
        }
    },
    watch: {
        active: function (val) {
            this.$refs['select'].clearSingleSelect();
        },
        intervalId: function (val) {
            if (!val.length) {
                this.$refs['select'].clearSingleSelect();
            }
        },
    },
};
</script>
