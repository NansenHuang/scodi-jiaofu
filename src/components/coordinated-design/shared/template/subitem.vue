<style lang="less">
    @import '../../../../styles/common.less';
</style>

<template>
    <div>
        <multifunctional-table
            size="small"
            v-model="value"
            :columnsList="chainColumn"
            :saveEdit="saveEditInline"
            :deleteRow="deleteRowInline"
        ></multifunctional-table>
        <span style="margin: 10px 0 0 0;display:flex;justify-content:space-between;">
            <div v-for="f in fields" :key="f.key">
                {{ f.label }}
                <Input style="width:150px;" placeholder="请输入" v-model="data[f.key]"></Input>
            </div>
            <Button
                size="small"
                type="primary"
                icon="android-add-circle"
                @click="addData"
            >
                新增
            </Button>
        </span>
    </div>
</template>

<script>
import MultifunctionalTable from '../../shared/table.vue';

export default {
    name: 'NewSubItem',
    components: {
        MultifunctionalTable
    },
    props: {
        value: {
            default: function () {
                return [];
            },
        },
        fields: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {
            data: {},
        };
    },
    computed: {
        chainColumn: function () {
            let columns = this.fields.map((item) => {
                return {
                    title: item.label,
                    key: item.key,
                    align: 'center',
                };
            });
            return [{
                title: '序号',
                type: 'index',
                width: 80,
                align: 'center',
            }].concat(columns);
        },
    },
    methods: {
        saveEditInline: function () {},
        deleteRowInline: function () {},
        addData: function () {
            this.$emit('input', (this.value || []).concat([this.data]));
            this.data = {};
        },
    },
};
</script>
