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
      <folder-icon @enter="enterFolder" @select="onSelectFolder" @append-select="onAppendSelectFolder" v-for="item in folders" :key="item.id" :selected="selected[item.id]" :folderId="item.id" :childCount="item.count" :folderName="item.name" :folderDate="item.date"></folder-icon>
    </div>
    <div class="content">
      <file-icon @enter="deselectAll" @select="onSelectFile" @append-select="onAppendSelectFile" v-for="item in files" :key="item.id" :selected="selected[item.id]" :fileId="item.id" :fileName="item.name" :fileDate="item.date"></file-icon>
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
import ActionType from 'src/config/action-type';
import Path from 'path-browserify';

export default {
    name: 'DesignDataContent',
    components: {
        FolderIcon,
        FileIcon,
    },
    computed: {
        currentFolderData: function () {
            let currentPath = this.$store.state['highway']['graphyCurrentPath'];
            return this.$store.state['highway']['graphy'][currentPath] || [];
        },
        folders: function () {
            let folders = this.currentFolderData.filter(item => item.Type === 'DIRECTORY');
            return folders.map((item) => ({
                name: item.Name,
                date: item.Timestamp.substring(0, item.Timestamp.indexOf('T')),
                id: item.id,
            }));
        },
        files: function () {
            let files = this.currentFolderData.filter(item => item.Type === 'FILE');
            return files.map((item) => ({
                name: item.Name,
                date: item.Timestamp.substring(0, item.Timestamp.indexOf('T')),
                id: item.id,
            }));
        }
    },
    data: function () {
        return {
            selected: {},
        };
    },
    methods: {
        deselectAll () {
            this.selected = {};
            console.log('deselect all！');
        },
        enterFolder (val) {
            let clickedFolder = this.currentFolderData.find(item => item.id === val);
            let newPath = Path.resolve(clickedFolder['Path'], clickedFolder['Name']);
            clickedFolder && this.$store.commit(ActionType.SetPath, newPath);
        },
        onSelectFolder (val) {
            this.selected = {[val]: true};
            console.log('Select folder: ', val);
        },
        onAppendSelectFolder (val) {
            this.selected = {...this.selected, [val]: !this.selected[val]};
            console.log('Appendselect folder: ', val);
        },
        onSelectFile (val) {
            this.selected = {[val]: true};
            console.log('Select file: ', val);
        },
        onAppendSelectFile (val) {
            this.selected = {...this.selected, [val]: !this.selected[val]};
            console.log('Appendselect file: ', val);
        },
    },
    created: function () {
        let path = '/';
        this.$store.commit(ActionType.SetPath, path);
        let queryParams = {query: {bool: {filter: []}}};
        queryParams.query.bool.filter.push({
            match: { 'Path.keyword': path }
        });
        this.$store.dispatch(ActionType.LoadFiles, {query: queryParams});
    },
};
</script>
