<style lang="less" scoped>
  .content {
    display: flex;
    flex-wrap: wrap;
  }
</style>

<template>
  <div style="padding:20px;">
    <h3>文件</h3>
    <div class="content">
      <folder-icon v-for="(item, index) in folders" :key="index" :fileCount="item.count" :fileName="item.name" :fileDate="item.date"></folder-icon>
    </div>
    <div class="content">
      <file-icon v-for="(item, index) in files" :key="index" :fileName="item.name" :fileDate="item.date"></file-icon>
    </div>
  </div>
</template>

<script>
import FolderIcon from './item-icon/folder.vue';
import FileIcon from './item-icon/file.vue';

export default {
    name: 'DesignDataContent',
    components: {
        FolderIcon,
        FileIcon,
    },
    data: function () {
        return {
            folders: [{
                name: '文件夹一',
                date: '2018/01/01',
                count: 2,
            }, {
                name: '文件夹二',
                date: '2018/01/04',
                count: 4,
            }, {
                name: '文件夹三',
                date: '2018/01/09',
                count: 0,
            }],
            files: [{
                name: 'a.txt',
                date: '2018/01/01',
            }, {
                name: 'b.txt',
                date: '2018/01/02',
            }],
        };
    },
};
</script>
