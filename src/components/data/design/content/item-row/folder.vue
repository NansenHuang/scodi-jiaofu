<style lang="less" scoped>
.file-icon {
  position: relative;
}
.file-icon img {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
}
.file-icon div {
  position: absolute;
  left: 0;
  top: 0;
  width: 70px;
  height: 20px;
  margin: 5px;
  background-color: white;
  box-shadow: 0 1px 3px 2px rgba(1, 1, 0, 0.2);
}
.file-icon > span {
  position: absolute;
  right: 8px;
  top: 36px;
  color: white;
  font-size: 8px;
}
.file-name {
  display: inline-flex;
  justify-content: center;
}
.file-date {
  display: inline-flex;
  justify-content: center;
  font-size: 10px;
  color: #999;
}
</style>

<template>
  <icon-base :selected="selected" @enter="$emit('enter', folderId)" @select="$emit('select', folderId)" @append-select="$emit('append-select', folderId)">
      <div slot="icon" class="file-icon">
          <img src="./folder-large_backplate.svg" alt="">
          <div v-if="childCount !== 0"></div>
          <img src="./folder-large_frontplate_nopreview.svg" alt="">
          <span v-if="childCount !== 0">{{ childCount }}</span>
      </div>
      <p slot="name" class="file-name">{{ folderName }}</p>
      <p slot="date" class="file-date">{{ folderDate }}</p>
  </icon-base>
</template>

<script>
import IconBase from './base';

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
};
</script>
