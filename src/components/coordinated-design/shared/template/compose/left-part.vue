<style lang="less">
</style>

<template>
    <div>
        <multifunctional-table
            size="small"
            v-model="dataArray"
            :columnsList="chainColumn"
            :deleteRow="(index, success, fail) => {success(() => {});}"></multifunctional-table>
        <p>选择路线</p>
        <selector-item
            :itemData="itemData"
            :active="active"
            v-model="alignmentID"
            :dataSource="alignmentArray"
        ></selector-item>
        <p>起点桩号</p>
        <Input v-model.number="startStation"></Input>
        <chain-interval
        :active="active"
        :alignment="alignmentID"
        :station="startStation"
        v-model="startStationChain"></chain-interval>
        <p>终点桩号</p>
        <Input v-model.number="endStation"></Input>
        <chain-interval
        :active="active"
        :alignment="alignmentID"
        :station="endStation"
        v-model="endStationChain"></chain-interval>
        <Button type="primary" size="small" @click="addAlignment">添加路线</Button>
    </div>
</template>

<script>
import Field, { SubField } from 'src/config/field';
import SelectorItem from '../basic/selector-item';
import ChainInterval from './chain-interval';
import MultifunctionalTable from '../../table.vue';

export default {
    name: 'LeftPart',
    components: {
        SelectorItem,
        ChainInterval,
        MultifunctionalTable,
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
        alignmentArray () {
            let data = this.$store.state['highway']['alignment']['alignment'].map((item) => {
                return {
                    ...item,
                    label: item[Field.Alignment.CnName],
                    value: item[Field.Alignment.id],
                };
            });
            return data;
        },
    },
    data () {
        return {
            dataArray: [],
            chainColumn: [
                // {
                //     title: 'id',
                //     key: 'alignmentID',
                //     align: 'center',
                // },
                {
                    title: '名称',
                    key: 'alignmentCnName',
                    align: 'center',
                },
                {
                    title: '标识符',
                    key: 'stationMark',
                    align: 'center',
                },
                {
                    title: '起点桩号',
                    key: 'startStation',
                    align: 'center',
                },
                {
                    title: '断链前后',
                    key: 'startStationChain',
                    align: 'center',
                },
                {
                    title: '终点桩号',
                    key: 'endStation',
                    align: 'center',
                },
                {
                    title: '断链前后',
                    key: 'endStationChain',
                    align: 'center',
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 80,
                    key: 'handle',
                    handle: ['delete']
                },
            ],
            alignmentID: '',
            alignmentCnName: '',
            stationMark: '',
            startStation: undefined,
            startStationChain: '',
            endStation: undefined,
            endStationChain: '',
        };
    },
    methods: {
        addAlignment () {
            let item = {
                [SubField.Section.LeftPart.AlignmentID]: this.alignmentID,
                [SubField.Section.LeftPart.AlignmentCnName]: this.alignmentCnName,
                [SubField.Section.LeftPart.StationMark]: this.stationMark,
                [SubField.Section.LeftPart.StartStation]: this.startStation,
                [SubField.Section.LeftPart.EndStation]: this.endStation,
            };
            if (this.startStationChain) {
                item[SubField.Section.LeftPart.StartStationChain] = this.startStationChain;
            };
            if (this.endStationChain) {
                item[SubField.Section.LeftPart.EndStationChain] = this.endStationChain;
            };
            this.dataArray.push(item);
        },
    },
    watch: {
        active: function (val) {
            if (val) {
                this.dataArray = JSON.parse(this.value || '[]');
            } else {
                this.dataArray = [];
                this.alignmentID = '';
                this.alignmentCnName = '';
                this.stationMark = '';
                this.startStation = undefined;
                this.startStationChain = '';
                this.endStation = undefined;
                this.endStationChain = '';
            };
        },
        alignmentID: function (val) {
            let selectedAlignment = this.alignmentArray.filter((item) => item[Field.Alignment.id] === val);
            this.alignmentCnName = (selectedAlignment.length && selectedAlignment[0][Field.Alignment.CnName]) || '';
            this.stationMark = (selectedAlignment.length && selectedAlignment[0][Field.Alignment.StationMark]) || '';
        },
        dataArray: function (val) {
            if (this.active) {
                this.$emit('input', JSON.stringify(val));
            };
        },
    },
    created: function () {
        this.dataArray = JSON.parse(this.value || '[]');
    },
};
</script>
