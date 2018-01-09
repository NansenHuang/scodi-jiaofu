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
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: -16%;
  }
.no-content span {
    font-size: 24px;
    color: #ccc;
}
.no-content img {
    width: 128px;
}
</style>

<template>
  <div class="content-root" @click="deselectAll">
    <h3>文件</h3>
    <div class="content">
      <folder-icon @enter="deselectAll" @select="onSelectFolder" @append-select="onAppendSelectFolder" v-for="(item, index) in folders" :key="index" :selected="item.selected" :folderId="item.name" :childCount="item.count" :folderName="item.name" :folderDate="item.date"></folder-icon>
    </div>
    <div class="content">
      <file-icon @enter="deselectAll" @select="onSelectFile" @append-select="onAppendSelectFile" v-for="(item, index) in files" :key="index" :selected="item.selected" :fileId="item.name" :fileName="item.name" :fileDate="item.date"></file-icon>
    </div>
    <div class="no-content" v-if="!folders.length && !files.length">
        <img src="./empty_folder.svg" alt="">
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
    computed: {},
    data: function () {
        return {
            folders: [
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
            ],
            files: [
                {
                    name: 'a.txt',
                    date: '2018/01/01',
                }, {
                    name: 'b.txt',
                    date: '2018/01/02',
                }
            ],
        };
    },
    methods: {
        deselectAll () {
            let newFolders = this.folders.map(item => ({...item, selected: false}));
            let newFiles = this.files.map(item => ({...item, selected: false}));

            this.folders = newFolders;
            this.files = newFiles;
            console.log('deselect all！');
        },
        onSelectFolder (val) {
            let newFolders = this.folders.map(item => ({...item, selected: item.name === val}));
            let newFiles = this.files.map(item => ({...item, selected: false}));

            this.folders = newFolders;
            this.files = newFiles;
            console.log('Select folder: ', val);
        },
        onAppendSelectFolder (val) {
            let newFolders = this.folders.map(item => ({...item, selected: item.selected || item.name === val}));

            this.folders = newFolders;
            console.log('Appendselect folder: ', val);
        },
        onSelectFile (val) {
            let newFolders = this.folders.map(item => ({...item, selected: false}));
            let newFiles = this.files.map(item => ({...item, selected: item.name === val}));

            this.folders = newFolders;
            this.files = newFiles;
            console.log('Select file: ', val);
        },
        onAppendSelectFile (val) {
            let newFiles = this.files.map(item => ({...item, selected: item.selected || item.name === val}));

            this.files = newFiles;
            console.log('Appendselect file: ', val);
        },
    },
};
</script>
