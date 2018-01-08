<style lang="less" scoped>
  .content-root {
    display: flex;
    flex-direction: column;
    padding:20px;
    min-height: 500px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
  }
  .no-content {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
  }
.no-content span {
    font-size: 24px;
    color: #ccc;
}
</style>

<template>
  <div class="content-root">
    <h3>文件</h3>
    <div class="content">
      <folder-icon @enter="onEnterFolder" @select="onSelectFolder" v-for="(item, index) in folders" :key="index" :folderId="item.name" :childCount="item.count" :folderName="item.name" :folderDate="item.date"></folder-icon>
    </div>
    <div class="content">
      <file-icon @enter="onEnterFile" @select="onSelectFile" v-for="(item, index) in files" :key="index" :fileId="item.name" :fileName="item.name" :fileDate="item.date"></file-icon>
    </div>
    <div class="no-content" v-if="!folders.length && !files.length">
        <span>当前文件夹无内容</span>
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
    computed: {
        folders: function () {
            // return [];
            return [
                {
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
                }
            ];
        },
        files: function () {
            // return [];
            return [
                {
                    name: 'a.txt',
                    date: '2018/01/01',
                }, {
                    name: 'b.txt',
                    date: '2018/01/02',
                }
            ];
        },
    },
    data: function () {
        return {};
    },
    methods: {
        onEnterFolder (val) {
            console.log('Enter folder: ', val);
        },
        onSelectFolder (val) {
            console.log('Select folder: ', val);
        },
        onEnterFile (val) {
            console.log('Enter file: ', val);
        },
        onSelectFile (val) {
            console.log('Select file: ', val);
        },
    },
};
</script>
