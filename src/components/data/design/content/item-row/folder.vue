<style lang="less" scoped>
.file-icon {
  position: relative;
}
.file-icon img {
  height: 20px;
}
.file-name {
}
.file-date {
  font-size: 10px;
  color: #999;
  margin: 0 40px;
}
</style>

<template>
  <icon-base :selected="selected" @enter="$emit('enter', folderId)" @select="$emit('select', folderId)" @append-select="$emit('append-select', folderId)">
      <div slot="icon" class="file-icon">
          <img src="./folder.svg" alt="">
      </div>
      <p slot="name" class="file-name">{{ folderName }}</p>
      <p slot="date" class="file-date">{{ folderDate }}</p>
      <p slot="bind" class="file-date">{{ bindData.length ? `${bindData.length}条绑定记录` : '' }}</p>
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
};
</script>
