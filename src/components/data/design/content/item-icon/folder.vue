<style lang="less" scoped>
.file-icon-grid {
  position: relative;
}
.file-icon-grid img {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;  
}
.file-icon-grid div {
  position: absolute;
  left: 0;
  top: 0;
  width: 70px;
  height: 20px;
  margin: 5px;
  background-color: white;
  box-shadow: 0 1px 3px 2px rgba(1, 1, 0, 0.2);
}
.file-icon-grid > span {
  position: absolute;
  right: 8px;
  top: 36px;
  color: white;
  font-size: 8px;
}
.file-icon-list img {
  height: 20px;
}
</style>

<template>
  <icon-base :layout="layout" :selected="selected" @enter="$emit('enter', folderId)" @select="$emit('select', folderId)" @append-select="$emit('append-select', folderId)">
      <div v-if="layoutString === 'grid'" slot="icon" class="file-icon-grid">
          <img src="./folder-large_backplate.svg" alt="">
          <div v-if="childCount !== 0"></div>
          <img src="./folder-large_frontplate_nopreview.svg" alt="">
          <span v-if="childCount !== 0">{{ childCount }}</span>
      </div>
      <div v-else slot="icon" class="file-icon-list">
          <img src="./folder.svg" alt="">
      </div>
      <div slot="name">{{ folderName }}</div>
      <div slot="date">{{ folderDate }}</div>
      <div slot="bind">{{ bindData.length ? `${bindData.length}条绑定记录` : '' }}</div>
  </icon-base>
</template>

<script>
import IconBase from './base';
import LayoutType from 'src/config/layout-type';

export default {
    name: 'FolderIcon',
    components: {
        IconBase
    },
    props: {
        selected: {
            type: Boolean,
            default: false,
        },
        layout: {
            type: String,
            required: true,
        },
        bindData: {
            type: Array,
            default: function () {
                return [];
            },
        },
        folderId: {
            type: String,
            required: true,
        },
        childCount: {
            type: Number,
            default: 0,
        },
        folderName: {
            type: String,
            required: true,
        },
        folderDate: {
            type: String,
            required: true,
        },
    },
    computed: {
        layoutString: function () {
            return this.layout === LayoutType.Grid ? 'grid' : 'list';
        },
    },
};
</script>
