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
  <icon-base>
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
