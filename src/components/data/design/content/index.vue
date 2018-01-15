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
.modal-content {
    margin: 20px 0;
}
</style>

<template>
  <div class="content-root" @click="deselectAll">
    <div class="navigator">
      <div class="root-nav" v-if="currentPath.path === '/'">文件</div>
      <div v-else>
          <span v-for="(item, index) in parentFolders" :key="item.path">
              <Button size="large" type="text" @click="jumpToPath(index)">{{ item.name }}</Button>
              <span v-if="index !== parentFolders.length - 1">/</span>
          </span>
      </div>
    </div>
    <div :class="layoutString === 'grid' ? 'content' : ''">
      <folder-icon @enter="enterFolder" :layout="layout" @select="onSelectFolder" @append-select="onAppendSelectFolder" v-for="item in folders" :key="item.id" :bindData="currentFolderBindData[item.id]" :selected="folderSelected[item.id]" :folderId="item.id" :childCount="item.count" :folderName="item.name" :folderDate="item.date"></folder-icon>
    </div>
    <div :class="layoutString === 'grid' ? 'content' : ''">
      <file-icon @enter="deselectAll" :layout="layout" @select="onSelectFile" @append-select="onAppendSelectFile" v-for="item in files" :key="item.id" :bindData="currentFolderBindData[item.id]" :selected="fileSelected[item.id]" :fileId="item.id" :fileName="item.name" :fileDate="item.date"></file-icon>
    </div>
    <div class="no-content" v-if="!folders.length && !files.length">
        <img src="./empty_folder.svg" alt="">
        <span>当前文件夹无内容</span>
    </div>
    <Modal
    :styles="{minWidth:'800px'}"
    :closable="false"
    :mask-closable="false"
    v-model="displayBindPanel">
        <h3>为以下内容设置绑定信息：</h3>
        <div class="modal-content">
            <Table :columns="columns" size="small" :data="currentDataToBind"></Table>
        </div>
        <h3>选择相应的字段值：</h3>
        <div class="modal-content">
            <add-bind
            :update="false"
            :active="displayBindPanel"
            @close="displayBindPanel=false"
            @save="handleBind"></add-bind>
        </div>
        <div slot="footer">
        </div>
    </Modal>
  </div>
</template>

<script>
import FolderIcon from './item-icon/folder.vue';
import FileIcon from './item-icon/file.vue';
import ActionType from 'src/config/action-type';
import Path from 'path-browserify';
import AddBind from './add-bind';
import LayoutType from 'src/config/layout-type';

export default {
    name: 'DesignDataContent',
    components: {
        FolderIcon,
        FileIcon,
        AddBind,
    },
    computed: {
        layout: function () {
            return this.$store.state['graphy']['explore']['layout'];
        },
        layoutString: function () {
            return this.layout === LayoutType.Grid ? 'grid' : 'list';
        },
        currentDataToBind: function () {
            let fileSelected = Object.keys(this.$store.state['highway']['fileSelected']).map((key) => ({
                type: 'FILE',
                id: key,
            }));
            fileSelected = fileSelected.filter(item => this.$store.state['highway']['fileSelected'][item.id]);

            let folderSelected = Object.keys(this.$store.state['highway']['folderSelected']).map((key) => ({
                type: 'DIRECTORY',
                id: key,
            }));
            folderSelected = folderSelected.filter(item => this.$store.state['highway']['folderSelected'][item.id]);
            let dataToBind = this.$store.state['graphy']['bind']['ing']
                ? [...fileSelected, ...folderSelected]
                : [];
            return dataToBind.map(item => {
                let dataItem = this.currentFolderData.find(i => i.id === item.id);
                return {
                    ...item,
                    name: dataItem ? dataItem['Alias'] : '',
                    type: this.$t(item['type']),
                };
            });
        },
        displayBindPanel: {
            get: function () {
                return this.$store.state['graphy']['bind']['ing'];
            },
            set: function (val) {
                if (!val) {
                    this.$store.commit(ActionType.BindModels, false);
                };
            },
        },
        currentFolderData: function () {
            return this.$store.state['graphy']['explore']['data'][this.currentPath.path] || [];
        },
        currentFolderBindData: function () {
            let data = this.$store.state['graphy']['bind']['data'][this.currentPath.path] || [];
            let dataById = {};
            data.map((item) => {
                if (!dataById[item['Data']['docs']['id']]) {
                    dataById[item['Data']['docs']['id']] = [];
                };
                dataById[item['Data']['docs']['id']].push(item);
            });
            return dataById;
        },
        currentPath: function () {
            let path = this.$store.state['graphy']['explore']['path'];
            path = path[path.length - 1];
            return path;
        },
        parentFolders: function () {
            return this.$store.state['graphy']['explore']['path'].map(item => ({
                name: item.name,
                path: item.path,
            }));
        },
        folders: function () {
            let folders = this.currentFolderData.filter(item => item.Type === 'DIRECTORY');
            return folders.map((item) => ({
                name: item.Alias,
                date: item.Timestamp.substring(0, item.Timestamp.indexOf('T')),
                id: item.id,
            }));
        },
        files: function () {
            let files = this.currentFolderData.filter(item => item.Type === 'FILE');
            return files.map((item) => ({
                name: item.Alias,
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
        return {
            columns: [
                {
                    title: '名称',
                    key: 'name',
                },
                // {
                //     title: 'ID',
                //     key: 'id',
                // },
                {
                    title: '类型',
                    key: 'type',
                }
            ]
        };
    },
    methods: {
        handleBind (val) {
            let items = this.currentDataToBind;
            let postData = items.map(obj => {
                let item = this.currentFolderData.find(t => t.id === obj.id);
                let data = {
                    model: val,
                    docs: {
                        id: item && item.id,
                        type: obj.type,
                        path: item && item['Path'],
                        alias: item && item['Alias'],
                    },
                };
                return data;
            });
            this.$store.dispatch(ActionType.AddRelations, postData);
            // TODO close modal or not
        },
        jumpToPath (val) {
            this.$store.commit(
                ActionType.SetPath,
                this.$store.state['graphy']['explore']['path'].slice(0, val + 1)
            );
        },
        deselectAll () {
            this.$store.commit(ActionType.SetFolderSelection, {});
            this.$store.commit(ActionType.SetFileSelection, {});
            console.log('deselect all！');
        },
        enterFolder (val) {
            this.deselectAll();
            let clickedFolder = this.currentFolderData.find(item => item.id === val);
            let newPath = {
                name: clickedFolder['Alias'],
                path: clickedFolder['id'],
            };
            clickedFolder && this.$store.commit(ActionType.AppendPath, newPath);
            //
            let queryParams = {query: {bool: {filter: []}}};
            queryParams.query.bool.filter.push({
                match: { 'Path.keyword': newPath.path }
            });
            this.$store.dispatch(ActionType.LoadFiles, {query: queryParams});
            //
            let bindQuery = {query: {bool: {filter: []}}};
            bindQuery.query.bool.filter.push({
                match: { 'Data.docs.path.keyword': newPath.path }
            });
            this.$store.dispatch(ActionType.QueryRelation, {query: bindQuery});
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
        let path = {
            name: '根目录',
            path: '/',
        };
        this.$store.commit(ActionType.SetPath, [path]);
        let queryParams = {query: {bool: {filter: []}}};
        queryParams.query.bool.filter.push({
            match: { 'Path.keyword': path.path }
        });
        this.$store.dispatch(ActionType.LoadFiles, {query: queryParams});
        let bindQuery = {query: {bool: {filter: []}}};
        bindQuery.query.bool.filter.push({
            match: { 'Data.docs.path.keyword': path.path }
        });
        this.$store.dispatch(ActionType.QueryRelation, {query: bindQuery});
    },
};
</script>
