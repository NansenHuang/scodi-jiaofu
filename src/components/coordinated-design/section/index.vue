<style lang="less">
</style>

<template>
    <content-layout :itemTypes="items" :activeTab.sync='activeTab' layout="tabs">
        <component
            slot="content"
            slot-scope="props"
            :is="props.isType"
            :tabActive="props.tabActive"
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
// import DesignSection from './design-section.vue';
import ConstructionSection from './construction-section.vue';
import ConstructionSectionItem from './construction-section-add';
import ContentLayout from '../shared/content-layout.vue';

export default {
    name: 'Section',
    components: {
        ContentLayout,
    },
    data () {
        return {
            modalVisible: false,
            currentData: null,
            update: false,
            activeTab: '施工区段',
            filters: {},
            newItem: null,
            items: [
                // {
                //     label: '设计区段',
                //     key: DesignSection.name,
                //     type: DesignSection,
                // },
                {
                    label: '施工区段',
                    key: ConstructionSection.name,
                    type: ConstructionSection,
                    newItemComponent: ConstructionSectionItem,
                },
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
