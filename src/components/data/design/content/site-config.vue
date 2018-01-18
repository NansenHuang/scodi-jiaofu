<style lang="less">
</style>

<template>
    <div>
        <p>选择工点</p>
        <selector-item
                :itemData="itemData"
                :active="active"
                v-model="rightPartObject['siteID']"
                :dataSource="siteArray">
        </selector-item>
    </div>
</template>

<script>
    import Field from 'src/config/field';
    import SelectorItem from 'src/components/coordinated-design/shared/template/basic/selector-item';
    import TypeValue from 'src/config/type';
    import Utils from 'src/libs/util';
    import ActionType from 'src/config/action-type';

    export default {
        name: 'SiteConfig',
        components: {
            SelectorItem,
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
            selectedSection () {
                return this.itemData['sectionID'] || null;
            },
            currentType () {
                return (this.itemData['type'] && this.itemData['type']['type']) || null;
            },
            directionArray () {
                switch (this.currentType) {
                    case TypeValue.MangGou:
                        return [
                            {
                                label: '横向',
                                value: 'vertical',
                            },
                            {
                                label: '纵向',
                                value: 'horizontal',
                            },
                        ];
                    case TypeValue.DangQiang:
                        return [
                            {
                                label: '左',
                                value: 'left',
                            },
                            {
                                label: '右',
                                value: 'right',
                            },
                        ];
                    default:
                        return [];
                };
            },
            rightPartStr () {
                return JSON.stringify(this.rightPartObject);
            },
            siteArray () {
                let data = (this.currentType &&
                this.typeToStorePath[this.currentType] &&
                Utils.deepFind(this.$store.state, this.typeToStorePath[this.currentType])) || [];
                return data.map((item) => ({
                    value: item.id,
                    label: item['bridgeCnName'] ||
                    item['geologyCnName'] ||
                    item['tunnelEnName'] ||
                    item['Station'] ||
                    '未命名',
                }));
            },
            siteID () {
                return this.rightPartObject['siteID'];
            },
        },
        data () {
            return {
                rightPartObject: {},
                typeToAction: {
                    // [TypeValue.LuMian]: ,
                    // [TypeValue.LuJian]: ,
                    // [TypeValue.BiaoXian]: ,
                    // [TypeValue.FenGeDai]: ,
                    // [TypeValue.DangQiang]: ,
                    // [TypeValue.Rjht]: ,
                    // [TypeValue.MangGou]: ,
                    // [TypeValue.BianGou]: ,
                    // [TypeValue.BianPo]: ,
                    // [TypeValue.HongXian]: ,
                    // [TypeValue.BiaoPai]: ,
                    [TypeValue.DiZhi]: ActionType.LoadGeology,
                    [TypeValue.Qiao]: ActionType.LoadBridge,
                    [TypeValue.SuiDao]: ActionType.LoadTunnel,
                    [TypeValue.HanDong]: ActionType.LoadCulvert,
                    [TypeValue.TianQiao]: ActionType.LoadOverbridge,
                },
                typeToStorePath: {
                    // [TypeValue.LuMian]: ,
                    // [TypeValue.LuJian]: ,
                    // [TypeValue.BiaoXian]: ,
                    // [TypeValue.FenGeDai]: ,
                    // [TypeValue.DangQiang]: ,
                    // [TypeValue.Rjht]: ,
                    // [TypeValue.MangGou]: ,
                    // [TypeValue.BianGou]: ,
                    // [TypeValue.BianPo]: ,
                    // [TypeValue.HongXian]: ,
                    // [TypeValue.BiaoPai]: ,
                    [TypeValue.DiZhi]: ['highway', 'structure', 'geology'],
                    [TypeValue.Qiao]: ['highway', 'structure', 'bridge'],
                    [TypeValue.SuiDao]: ['highway', 'structure', 'tunnel'],
                    [TypeValue.HanDong]: ['highway', 'structure', 'culvert'],
                    [TypeValue.TianQiao]: ['highway', 'structure', 'overbridge'],
                },
            };
        },
        methods: {
            requestSite (type, sectionID) {
                let storePath = this.typeToStorePath[type];
                let action = this.typeToAction[type];
                if (storePath && action) {
                    // let data = Utils.deepFind(this.$store.state, storePath);
                    // if (!data.length) {
                    let queryBody = { 'query': { 'bool': { 'filter': [] } } };
                    queryBody['query']['bool']['filter'].push({
                        'match': {
                            'Data.sectionID.keyword': sectionID,
                        },
                    });
                    let queryParams = {recursive: true};
                    if (sectionID) {
                        queryParams['query'] = queryBody;
                    };
                    this.$store.dispatch(action, queryParams);
                    // };
                };
            },
        },
        watch: {
            selectedSection: function (val) {
                this.requestSite(this.currentType, val);
            },
            currentType: function (val) {
                this.requestSite(val, this.selectedSection);
            },
            active: function (val) {
                if (val) {
                    this.rightPartObject = JSON.parse(JSON.stringify(this.value || {}));
                } else {
                    this.rightPartObject = {};
                };
            },
            rightPartStr: function (val) {
                if (this.active) {
                    this.$emit('input', val !== '{}' ? this.rightPartObject : undefined);
                };
            },
            siteID: function (val) {
                let selectedSite = this.siteArray.find((item) => item['value'] === val);
                this.rightPartObject['siteType'] = this.currentType;
                this.rightPartObject['siteCnName'] = (selectedSite && selectedSite.label) || '';
            },
        },
        created: function () {
            this.rightPartObject = JSON.parse(JSON.stringify(this.value || {}));
        },
    };
</script>
