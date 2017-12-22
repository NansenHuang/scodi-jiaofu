<style lang="less">
    @import '../../../../styles/common.less';
</style>

<template>
    <div>
        <Select ref="select" v-if="dataSource && dataSource.length" v-model="selected" clearable @on-change="selectChange">
            <Option
                v-for="item in dataSource"
                :value="item['label']"
                :label="item['label']"
                :key="item['label']"></Option>
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
    name: 'MapType',
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
            let data = [...this.params.arraySource];
            if (this.params.storePattern) {
                this.params.storePattern.map((mapRule) => {
                    let storeItem = deepFind(this.$store.state, mapRule['path']);
                    storeItem.map((object) => {
                        let item = {};
                        mapRule['map'].map((mr) => {
                            item[mr['to']] = Array.isArray(mr['from']) ? mr['from'][0] : object[mr['from']];
                        });
                        data.push(item);
                    });
                });
            };
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
            let selectedItem = this.dataSource.find((item) => item['label'] === val);
            let newData = {...this.backdoor};
            this.params['map'].map((mapItem) => {
                newData[mapItem['to']] = (selectedItem && selectedItem[mapItem['from']]);
            });
            this.$emit('update:backdoor', newData);
        },
    },
    watch: {
        active: function (val) {
            if (val) {
                this.dataSource.map((dataItem) => {
                    let match = true;
                    this.params['map'].map((mapItem) => {
                        match = match && this.backdoor[mapItem['to']] === dataItem[mapItem['from']];
                    });
                    if (match) {
                        this.selected = dataItem['label'];
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
                this.selected = dataItem['label'];
                return;
            };
        });
    },
};
</script>
