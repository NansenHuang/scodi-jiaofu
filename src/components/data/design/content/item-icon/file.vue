<style lang="less" scoped>
.file-icon-grid {
  display: inline-flex;
  justify-content: center;
}
.file-icon-grid img {
  height: 64px;
}
.file-icon-list img {
  height: 20px;
}
</style>

<template>
  <icon-base :layout="layout" :selected="selected" @enter="$emit('enter', fileId)" @select="$emit('select', fileId)" @append-select="$emit('append-select', fileId)">
      <div slot="icon" :class="`file-icon-${layoutString}`">
          <img src="./genericfile.png" alt="">
      </div>
      <div slot="name">{{ fileName }}</div>
      <div slot="date">{{ fileDate }}</div>
      <div slot="bind">{{ bindData.length ? `${bindData.length}条绑定记录` : '' }}</div>
  </icon-base>
</template>

<script>
import IconBase from './base';
import LayoutType from 'src/config/layout-type';

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
    computed: {
        layoutString: function () {
            return this.layout === LayoutType.Grid ? 'grid' : 'list';
        },
    },
};
</script>
