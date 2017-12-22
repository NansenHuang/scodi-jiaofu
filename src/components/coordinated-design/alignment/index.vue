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

import Alignment from './alignment.vue';
import AlignmentItem from './alignment-add';
import Blignment from './blignment.vue';
import BlignmentItem from './blignment-add';
import SideBlindDrain from './sideblinddrain.vue';
import SideBlindDrainItem from './sideblinddrain-add';
import CrossBlindDrain from './crossblinddrain.vue';
import CrossBlindDrainItem from './crossblinddrain-add';
import Chain from './chain.vue';
import ChainItem from './chain-add';
import GuardWall from './guardwall.vue';
import GuardWallItem from './guardwall-add';
import Interchange from './interchange.vue';
import InterchangeItem from './interchange-add';
import ParkingLot from './parkinglot.vue';
import ParkingLotItem from './parkinglot-add';
import ServiceArea from './servicearea.vue';
import ServiceAreaItem from './servicearea-add';
import SoftBase from './softbase.vue';
import SoftBaseItem from './softbase-add';

export default {
    name: 'Alignment',
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
                    label: '路线',
                    key: Alignment.name,
                    type: Alignment,
                    newItemComponent: AlignmentItem,
                },
                {
                    label: '区段路线',
                    key: Blignment.name,
                    type: Blignment,
                    newItemComponent: BlignmentItem,
                },
                {
                    label: '断链',
                    key: Chain.name,
                    type: Chain,
                    newItemComponent: ChainItem,
                },
                {
                    label: '互通',
                    key: Interchange.name,
                    type: Interchange,
                    newItemComponent: InterchangeItem,
                },
                {
                    label: '服务区',
                    key: ServiceArea.name,
                    type: ServiceArea,
                    newItemComponent: ServiceAreaItem,
                },
                {
                    label: '停车区',
                    key: ParkingLot.name,
                    type: ParkingLot,
                    newItemComponent: ParkingLotItem,
                },
                {
                    label: '挡墙',
                    key: GuardWall.name,
                    type: GuardWall,
                    newItemComponent: GuardWallItem,
                },
                {
                    label: '边沟盲沟',
                    key: SideBlindDrain.name,
                    type: SideBlindDrain,
                    newItemComponent: SideBlindDrainItem,
                },
                {
                    label: '交界盲沟',
                    key: CrossBlindDrain.name,
                    type: CrossBlindDrain,
                    newItemComponent: CrossBlindDrainItem,
                },
                {
                    label: '软基处理',
                    key: SoftBase.name,
                    type: SoftBase,
                    newItemComponent: SoftBaseItem,
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
