<style lang="less">
</style>

<template>
    <div v-if="intervalId.length" >
        <p style="color:red;">检测到该桩号在断链范围内，请选择：</p>
        <Select ref="select" v-model="selected" clearable>
            <Option label="前" value="front"></Option>
            <Option label="后" value="rear"></Option>
        </Select>
    </div>
</template>

<script>

export default {
    name: 'ChainInterval',
    components: {},
    props: {
        active: {
            type: Boolean,
            required: true,
        },
        alignment: {
            // type: String,
            required: true,
        },
        station: {
            // type: String, // or Number
            required: true,
        },
        value: {
            // type: String,
            required: true,
        },
    },
    computed: {
        intervalId () {
            let iTreeObject = this.$store.state['highway']['intervalTree'];
            if (!isNaN(Number(this.station)) && iTreeObject[this.alignment]) {
                return iTreeObject[this.alignment].search(Number(this.station));
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
        clearSelection: function () {
            this.selected = this.intervalId.length ? '' : undefined;
            this.$refs['select'] && this.$refs['select'].clearSingleSelect();
        },
    },
    watch: {
        selected: function (val) {
            if (this.active) {
                let emitValue = this.intervalId.length && val ? `${val}_${this.intervalId[0]['start']}` : this.selected;
                this.$emit('input', emitValue);
            };
        },
        active: function (val) {
            if (val) {
                let sel = this.value && this.value.indexOf('_') > -1 ? this.value.substring(0, this.value.indexOf('_')) : undefined;
                this.selected = sel;
            } else {
                this.clearSelection();
            };
        },
        alignment: function (newVal, oldVal) {
            if (oldVal !== undefined) {
                this.clearSelection();
            }
        },
        station: function (newVal, oldVal) {
            if (oldVal !== undefined) {
                this.clearSelection();
            }
        },
    },
    created: function () {
        let sel = this.value && this.value.indexOf('_') > -1 ? this.value.substring(0, this.value.indexOf('_')) : undefined;
        this.selected = sel;
    },
};
</script>
