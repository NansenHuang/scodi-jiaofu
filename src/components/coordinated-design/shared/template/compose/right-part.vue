<style lang="less">
</style>

<template>
    <div>
        <p>选择路线</p>
        <selector-item
                :itemData="itemData"
                :active="active"
                v-model="rightPartObject['alignmentID']"
                :dataSource="alignmentArray">
        </selector-item>
        <p>起点桩号</p>
        <Input v-model.number="rightPartObject['startStation']"></Input>
        <chain-interval
                :active="active"
                :alignment="rightPartObject['alignmentID']"
                :station="rightPartObject['startStation']"
                v-model="rightPartObject['startStationChain']">

        </chain-interval>
        <p>终点桩号</p>
        <Input v-model.number="rightPartObject['endStation']"></Input>
        <chain-interval
                :active="active"
                :alignment="rightPartObject['alignmentID']"
                :station="rightPartObject['endStation']"
                v-model="rightPartObject['endStationChain']">

        </chain-interval>
    </div>
</template>

<script>
    import Field from 'src/config/field';
    import SelectorItem from '../basic/selector-item';
    import ChainInterval from './chain-interval';

    export default {
        name: 'RightPart',
        components: {
            SelectorItem,
            ChainInterval,
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
                let data = this.$store.state['highway']['basic']['alignment'].map((item) => {
                    return {
                        ...item,
                        label: item[Field.Alignment.CnName],
                        value: item[Field.Alignment.id],
                    };
                });
                return data;
            },
            rightPartStr () {
                return JSON.stringify(this.rightPartObject);
            },
            alignmentID () {
                return this.rightPartObject['alignmentID'];
            },
        },
        data () {
            return {
                rightPartObject: {},
            };
        },
        methods: {},
        watch: {
            active: function (val) {
                if (val) {
                    this.rightPartObject = JSON.parse(JSON.stringify(this.value || {}));
                } else {
                    this.rightPartObject = {};
                }
            },
            rightPartStr: function (val) {
                if (this.active) {
                    this.$emit('input', val !== '{}' ? this.rightPartObject : undefined);
                }
            },
            alignmentID: function (val) {
                if (this.active) {
                    let selectedAlignment = this.alignmentArray.filter((item) => item[Field.Alignment.id] === val);
                    this.rightPartObject['alignmentCnName'] = (selectedAlignment.length && selectedAlignment[0][Field.Alignment.CnName]) || undefined;
                    this.rightPartObject['stationMark'] = (selectedAlignment.length && selectedAlignment[0][Field.Alignment.StationMark]) || undefined;
                    // this.rightPartObject['startStation'] = undefined;
                    // this.rightPartObject['endStation'] = undefined;
                }
            },
        },
        created: function () {
            this.rightPartObject = JSON.parse(JSON.stringify(this.value || {}));
        },
    };
</script>
