<style lang="less">
    @import '../../../../styles/common.less';
</style>

<template>
    <div>
        <Select ref="select" v-if="dataSource && dataSource.length" v-model="selected" clearable @on-change="selectChange">
            <Option
                v-for="item in dataSource"
                :value="item[params['id']]"
                :label="item[params['displayName']]"
                :key="item[params['id']]"></Option>
        </Select>
        <Select ref="select" v-else></Select>
    </div>
</template>

<script>

function deepFind (obj, pathArray) {
    let current = obj;
    for (let i = 0; i < pathArray.length; i++) {
        if (current[pathArray[i]] === undefined) {
            return undefined;
        } else {
            current = current[pathArray[i]];
        }
    }
    return current;
}

export default {
    name: 'EnumType',
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
        params: {
            type: Object,
            required: true,
        },
    },
    computed: {
        dataSource () {
            let data = deepFind(this.$store.state, this.params['storePath']);
            return data;
        },
    },
    data () {
        return {
            selected: '',
        };
    },
    methods: {
        selectChange (val) {
            let selectedItem = this.dataSource.find((item) => item[this.params['id']] === val);
            let newData = {...this.backdoor};
            this.params['map'].map((mapItem) => {
                newData[mapItem['to']] = selectedItem && selectedItem[mapItem['from']];
            });
            this.$emit('update:backdoor', newData);
        },
    },
    watch: {
        active: function (val) {
            if (val) {
                this.dataSource.map((dataItem) => {
                    let match = true;
                    let mapItem = this.params['map'][0];
                    match = match && this.backdoor[mapItem['to']] === dataItem[mapItem['from']];
                    // this.params['map'].map((mapItem) => {
                    //     match = match && this.backdoor[mapItem['to']] === dataItem[mapItem['from']];
                    // });
                    if (match) {
                        this.selected = dataItem['id'];
                        return;
                    };
                });
            } else {
                this.$refs['select'].clearSingleSelect();
            };
        },
    },
    created () {
        this.dataSource.map((dataItem) => {
            let match = true;
            this.params['map'].map((mapItem) => {
                match = match && this.backdoor[mapItem['to']] === dataItem[mapItem['from']];
            });
            if (match) {
                this.selected = dataItem['id'];
                return;
            };
        });
    },
};
</script>
