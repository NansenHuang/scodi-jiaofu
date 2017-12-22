<style lang="less">
</style>

<template>
    <content-layout :itemTypes="items" :activeTab.sync='activeTab' layout="tabs">
        <component
            slot="content"
            slot-scope="props"
            :is="props.isType"
            @showItemModal="showItemModal"
            :setActiveTabFunc="setActiveTab"
            :filters.sync="filters">
        </component>
        <Modal
        :styles="{minWidth:'800px'}"
        :closable="false"
        :mask-closable="false"
        v-model="modalVisible">
            <component
            :active="modalVisible"
            :update="update"
            :currentData="currentData"
            @close="hideModal"
            ref="templateAdd"
            :is="newItem"></component>
            <div slot="footer">
            </div>
        </Modal>
    </content-layout>
</template>

<script>
import ContentLayout from '../shared/content-layout.vue';
import Bridge from './bridge.vue';
import BridgeItem from './bridge-add';
import Culvert from './culvert.vue';
import CulvertItem from './culvert-add';
import Geology from './geology.vue';
import GeologyItem from './geology-add';
import Tunnel from './tunnel.vue';
import TunnelItem from './tunnel-add';
import OverBridge from './overbridge.vue';
import OverBridgeItem from './overbridge-add';

export default {
    name: 'Structure',
    components: {
        ContentLayout,
    },
    data () {
        return {
            modalVisible: false,
            currentData: null,
            update: false,
            activeTab: '',
            filters: {},
            newItem: null,
            items: [
                {
                    label: '桥梁',
                    key: Bridge.name,
                    type: Bridge,
                    newItemComponent: BridgeItem,
                },
                {
                    label: '地质',
                    key: Geology.name,
                    type: Geology,
                    newItemComponent: GeologyItem,
                },
                {
                    label: '隧道',
                    key: Tunnel.name,
                    type: Tunnel,
                    newItemComponent: TunnelItem,
                },
                {
                    label: '涵洞',
                    key: Culvert.name,
                    type: Culvert,
                    newItemComponent: CulvertItem,
                },
                {
                    label: '天桥',
                    key: OverBridge.name,
                    type: OverBridge,
                    newItemComponent: OverBridgeItem,
                }
            ],
        };
    },
    methods: {
        setActiveTab (val) {
            this.activeTab = val;
        },
        hideModal () {
            this.modalVisible = false;
        },
        showItemModal (keyName, currentData = {}, update = false) {
            this.currentData = currentData;
            this.update = update;
            let itemType = this.items.filter(i => i.key === keyName);
            this.newItem = itemType.length ? itemType[0].newItemComponent : null;
            if (itemType.length) {
                this.modalVisible = true;
            } else {
                // eslint-disable-next-line no-console
                console.error('Fatal error. Component type not found.');
            };
        },
    },
};
</script>
