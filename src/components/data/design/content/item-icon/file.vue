<style lang="less" scoped>
.file-icon {
  display: inline-flex;
  justify-content: center;
}
.file-icon img {
  height: 64px;
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
  <icon-base @enter="$emit('enter', fileId)" @select="$emit('select', fileId)" @append-select="$emit('append-select', fileId)">
      <div slot="icon" class="file-icon">
          <img src="./genericfile.png" alt="">
      </div>
      <p slot="name" class="file-name">{{ fileName }}</p>
      <p slot="date" class="file-date">{{ fileDate }}</p>
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
