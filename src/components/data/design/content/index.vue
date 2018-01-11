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
.navigator {
  height: 36px;
}
.navigator .root-nav {
  font-size: 14px;
  padding: 6px 7px;
}
.navigator button {
    padding: 6px 6px;
}
</style>

<template>
  <div class="content-root" @click="deselectAll">
    <div class="navigator">
      <div class="root-nav" v-if="currentPath === '/'">文件</div>
      <div v-else>
          <span v-for="item in parentFolders" :key="item.value">
              <Button size="large" type="text" @click="jumpToPath(item.value)">{{ item.label }}</Button>
              <span>/</span>
          </span>
          <Button size="large" type="text">{{ currentPathBasename }}</Button>
      </div>
    </div>
    <div class="content">
      <folder-icon @enter="enterFolder" @select="onSelectFolder" @append-select="onAppendSelectFolder" v-for="item in folders" :key="item.id" :selected="folderSelected[item.id]" :folderId="item.id" :childCount="item.count" :folderName="item.name" :folderDate="item.date"></folder-icon>
    </div>
    <div class="content">
      <file-icon @enter="deselectAll" @select="onSelectFile" @append-select="onAppendSelectFile" v-for="item in files" :key="item.id" :selected="fileSelected[item.id]" :fileId="item.id" :fileName="item.name" :fileDate="item.date"></file-icon>
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
        currentPath: function () {
            return this.$store.state['highway']['graphyCurrentPath'];
        },
        currentPathBasename: function () {
            return Path.basename(this.currentPath);
        },
        parentFolders: function () {
            let ancestorFolders = [];
            let path = this.currentPath;
            while (true) {
                if (path === '/') {
                    break;
                };
                ancestorFolders.splice(0, 0, Path.dirname(path));
                path = Path.dirname(path);
            };
            return ancestorFolders.map((path) => ({
                label: Path.basename(path) || '根目录',
                value: path,
            }));
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
        },
        folderSelected: function () {
            return this.$store.state['highway']['folderSelected'];
        },
        fileSelected: function () {
            return this.$store.state['highway']['fileSelected'];
        },
    },
    data: function () {
        return {};
    },
    methods: {
        jumpToPath (val) {
            this.$store.commit(ActionType.SetPath, val);
        },
        deselectAll () {
            this.$store.commit(ActionType.SetFolderSelection, {});
            this.$store.commit(ActionType.SetFileSelection, {});
            console.log('deselect all！');
        },
        enterFolder (val) {
            this.deselectAll();
            let clickedFolder = this.currentFolderData.find(item => item.id === val);
            let newPath = Path.resolve(clickedFolder['Path'], clickedFolder['Name']);
            clickedFolder && this.$store.commit(ActionType.SetPath, newPath);
        },
        onSelectFolder (val) {
            this.$store.commit(ActionType.SetFileSelection, {});
            this.$store.commit(ActionType.SetFolderSelection, {[val]: true});
            console.log('Select folder: ', val);
        },
        onAppendSelectFolder (val) {
            this.$store.commit(ActionType.SetFolderSelection, {
                ...this.folderSelected,
                [val]: !this.folderSelected[val]
            });
            console.log('Appendselect folder: ', val);
        },
        onSelectFile (val) {
            this.$store.commit(ActionType.SetFolderSelection, {});
            this.$store.commit(ActionType.SetFileSelection, {[val]: true});
            console.log('Select file: ', val);
        },
        onAppendSelectFile (val) {
            this.$store.commit(ActionType.SetFileSelection, {
                ...this.fileSelected,
                [val]: !this.fileSelected[val]
            });
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
