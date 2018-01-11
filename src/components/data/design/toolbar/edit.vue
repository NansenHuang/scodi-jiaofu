<style lang="less" scoped>
  .toolbar-btn {
    font-size: 15px;
  }
  .toolbar-btn .text {
    margin-left: 2px;
  }
</style>

<template>
  <div>
    <Button class="toolbar-btn" type="text" @click="sendOperation('createFolder')" v-if="!selectedItems.length">
      <Icon size="16" type="ios-plus-empty"></Icon>
      <span class="text">新建文件夹</span>
    </Button>
    <Button class="toolbar-btn" type="text" @click="sendOperation('uploadFile')" v-if="!selectedItems.length">
      <Icon size="16" type="ios-arrow-thin-up"></Icon>
      <file-upload v-model="selectedFiles" multiple>
        <span class="text">上传文件</span>
      </file-upload>
    </Button>
    <Button class="toolbar-btn" type="text" @click="sendOperation('uploadFolder')" v-if="!selectedItems.length">
      <Icon size="16" type="ios-arrow-thin-up"></Icon>
      <file-upload v-model="selectedFiles2" multiple directory>
        <span class="text">上传文件夹</span>
      </file-upload>
    </Button>
    <Button class="toolbar-btn" type="text" @click="sendOperation('downloadFile')" v-if="singleFileSelected">
      <Icon size="16" type="ios-arrow-thin-down"></Icon>
      <span class="text">下载</span>
    </Button>
    <Button class="toolbar-btn" type="text" @click="sendOperation('deleteSelected')" v-if="selectedItems.length">
      <Icon size="16" type="ios-trash-outline"></Icon>
      <span class="text">删除</span>
    </Button>
    <Button class="toolbar-btn" type="text" @click="sendOperation('moveSelected')" v-if="selectedItems.length">
      <Icon size="16" type="ios-filing-outline"></Icon>
      <span class="text">移动</span>
    </Button>
    <Button class="toolbar-btn" type="text" @click="sendOperation('copySelected')" v-if="selectedItems.length">
      <Icon size="16" type="ios-copy-outline"></Icon>
      <span class="text">复制</span>
    </Button>
    <Button class="toolbar-btn" type="text" @click="sendOperation('renameSelected')" v-if="selectedItems.length === 1">
      <Icon size="16" type="ios-compose-outline"></Icon>
      <span class="text">重命名</span>
    </Button>
    <Modal
    :styles="{minWidth:'800px'}"
    :closable="false"
    :mask-closable="false"
    v-model="modalVisible">
    上传界面
    <Table :columns="columns" :data="currentData"></Table>
    <Button type="primary" @click="startUpload">开始上传</Button>
    </Modal>
  </div>
</template>

<script>
import VueUploadComponent from 'vue-upload-component';
import Services from 'src/services';
import Cookies from 'js-cookie';
import Path from 'path-browserify';
import uuid from 'uuid';
const uuidv4 = uuid.v4;

export default {
    name: 'EditToolbar',
    components: {
        FileUpload: VueUploadComponent,
    },
    computed: {
        currentData: function () {
            if (this.selectedFiles.length) {
                return this.selectedFiles;
            }
            if (this.selectedFiles2.length) {
                return this.selectedFiles2;
            }
            return [];
        },
        currentPath: function () {
            return this.$store.state['highway']['graphyCurrentPath'];
        },
        selectedItems: function () {
            let fileSelected = Object.keys(this.$store.state['highway']['fileSelected']).map((key) => ({
                type: 'file',
                id: key,
            }));
            fileSelected = fileSelected.filter(item => this.$store.state['highway']['fileSelected'][item.id]);

            let folderSelected = Object.keys(this.$store.state['highway']['folderSelected']).map((key) => ({
                type: 'folder',
                id: key,
            }));
            folderSelected = folderSelected.filter(item => this.$store.state['highway']['folderSelected'][item.id]);

            return [...fileSelected, ...folderSelected];
        },
        singleFileSelected: function () {
            return this.selectedItems.length === 1 && this.selectedItems[0]['type'] === 'file';
        },
        singleFolderSelected: function () {
            return this.selectedItems.length === 1 && this.selectedItems[0]['type'] === 'folder';
        }
    },
    data: function () {
        return {
            modalVisible: false,
            selectedFiles: [],
            selectedFiles2: [],
            columns: [
                {
                    title: '文件名',
                    key: 'name',
                },
                {
                    title: '文件大小',
                    key: 'size',
                },
                {
                    title: '上传速度',
                    key: 'speed',
                }
            ],
        };
    },
    watch: {
        selectedFiles: function (arr) {
            if (arr.length > 0) {
                this.selectedFiles2 = [];
                this.modalVisible = true;
            }
        },
        selectedFiles2: function (arr) {
            if (arr.length > 0) {
                this.selectedFiles = [];
                this.modalVisible = true;
            }
        },
    },
    methods: {
        sendOperation: function (name) {
            console.log('用户执行了操作：', name);
        },
        startUpload: async function () {
            let currentPath = this.currentPath;

            let parentFoldersObject = {};
            for (let index = 0; index < this.currentData.length; index++) {
                // 1、
                let parentFolders = [];
                let file = this.currentData[index];
                let filePath = file.name;
                while (true) {
                    if (filePath === '/' || filePath === '.') {
                        break;
                    };
                    parentFolders.splice(0, 0, Path.dirname(filePath));
                    filePath = Path.dirname(filePath);
                };
                // 2、
                let parrentId = '';
                for (let i = 0; i < parentFolders.length; i++) {
                    let path = parentFolders[i];
                    if (path === '/' || path === '.') {
                        parrentId = currentPath;
                        continue;
                    }
                    if (parentFoldersObject[path]) {
                        parrentId = parentFoldersObject[path].id;
                        continue;
                    } else {
                        let id = uuidv4();
                        let name = uuidv4();
                        parentFoldersObject[path] = {
                            id: id,
                            type: 'DIRECTORY',
                            path: parrentId,
                            name: name,
                            alias: Path.basename(path),
                            data: JSON.stringify({path, id, name, parrentId}),
                        };
                        parrentId = id;
                    }
                }
            }

            let resp = await Services.Graphy.Manage.batchAddFile(Cookies.get('project'), Object.values(parentFoldersObject), false);
            console.log(resp);
            return;
        },
    },
};
</script>
