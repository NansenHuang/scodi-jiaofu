<style lang="less" scoped>
.file-icon {
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
  <icon-base :selected="selected" @enter="$emit('enter', fileId)" @select="$emit('select', fileId)" @append-select="$emit('append-select', fileId)">
      <div slot="icon" class="file-icon">
          <img src="./genericfile.png" alt="">
      </div>
      <p slot="name" class="file-name">{{ fileName }}</p>
      <p slot="date" class="file-date">{{ fileDate }}</p>
      <p slot="bind" class="file-date">{{ bindData.length ? `${bindData.length}条绑定记录` : '' }}</p>
  </icon-base>
</template>

<script>
import IconBase from './base';

export default {
    name: 'FileIcon',
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
        fileId: {
            type: String,
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        fileDate: {
            type: String,
            required: true,
        },
    },
};
</script>
