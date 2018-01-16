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
    <!-- <Button class="toolbar-btn" type="text" @click="sendOperation('createFolder')" v-if="!selectedItems.length">
      <Icon size="16" type="ios-plus-empty"></Icon>
      <span class="text">新建文件夹</span>
    </Button>
    <Button class="toolbar-btn" type="text" @click="sendOperation('uploadFile')" v-if="!selectedItems.length">
      <Icon size="16" type="ios-arrow-thin-up"></Icon>
      <file-upload v-model="selectedFiles" multiple>
        <span class="text">上传文件</span>
      </file-upload>
    </Button> -->
    <Button class="toolbar-btn" type="text" @click="sendOperation('uploadFolder')" v-if="!selectedItems.length">
      <Icon size="16" type="ios-arrow-thin-up"></Icon>
      <file-upload v-model="selectedFiles2" ref="folder-upload" multiple directory>
        <span class="text">上传文件夹</span>
      </file-upload>
    </Button>
    <Button class="toolbar-btn" type="text" @click="sendOperation('downloadFile')" v-if="singleFileSelected">
      <Icon size="16" type="ios-arrow-thin-down"></Icon>
      <span class="text">下载</span>
    </Button>
    <Button class="toolbar-btn" type="text" @click="deleteItems" v-if="selectedItems.length">
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
    <Button class="toolbar-btn" type="text" @click="bindModel" v-if="selectedItems.length">
      <Icon size="16" type="link"></Icon>
      <span class="text">绑定到模型</span>
    </Button>
    <Modal
    :styles="{minWidth:'800px'}"
    :closable="false"
    :mask-closable="false"
    v-model="modalVisible">
    <h3>上传界面</h3>
    <div>{{ `共${currentData.length}个文件，已上传${currentDataFinished.length}个。` }}</div>
    <Button type="primary" @click="startUpload" :disabled="currentDataFinished.length !== 0">上传文件</Button>
    </Modal>
  </div>
</template>

<script>
import VueUploadComponent from 'vue-upload-component';
import Services from 'src/services';
import Cookies from 'js-cookie';
import Path from 'path-browserify';
import ActionType from 'src/config/action-type';
import GraphyField from 'src/config/graphy-field';
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
        currentDataFinished: function () {
            return this.currentData.filter(item => item.progress === '100');
        },
        currentPath: function () {
            let path = this.$store.state['graphy']['explore']['path'];
            path = path[path.length - 1];
            return path;
        },
        selectedItems: function () {
            let fileSelected = Object.keys(this.$store.state['graphy']['explore']['fileSelected']).map((key) => ({
                type: 'FILE',
                id: key,
            }));
            fileSelected = fileSelected.filter(item => this.$store.state['graphy']['explore']['fileSelected'][item.id]);

            let folderSelected = Object.keys(this.$store.state['graphy']['explore']['folderSelected']).map((key) => ({
                type: 'DIRECTORY',
                id: key,
            }));
            folderSelected = folderSelected.filter(item => this.$store.state['graphy']['explore']['folderSelected'][item.id]);

            return [...fileSelected, ...folderSelected];
        },
        singleFileSelected: function () {
            return this.selectedItems.length === 1 && this.selectedItems[0]['type'] === 'FILE';
        },
        singleFolderSelected: function () {
            return this.selectedItems.length === 1 && this.selectedItems[0]['type'] === 'DIRECTORY';
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
                    title: '唯一编码',
                    key: 'id',
                },
                {
                    title: '文件大小',
                    key: 'size',
                },
                {
                    title: '上传进度',
                    key: 'progress',
                },
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
        deleteItems: function () {
            this.$Modal.confirm({
                title: '确定删除吗？',
                // content: '<p>请务必确认是否存在与之关联的其他数据。</p>',
                onOk: () => {
                    this.$store.dispatch(ActionType.DeleteItems, {
                        path: this.currentPath.path,
                        items: this.selectedItems,
                    });
                }
            });
        },
        bindModel: function () {
            this.$store.commit(ActionType.BindModels, true);
        },
        startUpload: async function () {
            const REQUEST_AMOUNT = 50;
            let index = 0;
            let idToRemoteName = {};
            let remoteNameToUrl = {};
            while (true) {
                if (index > this.currentData.length) {
                    break;
                }
                let names = this.currentData.slice(index, index + REQUEST_AMOUNT).map((item) => {
                    let ext = Path.extname(item.name);
                    let insertPos = ext ? item.name.lastIndexOf(ext) : item.name.length;
                    let remoteName = item.name.substring(0, insertPos) + '_' + item.id + ext;
                    remoteName = Path.join(Cookies.get('project'), remoteName);
                    idToRemoteName[item.id] = remoteName;
                    return remoteName;
                });

                let resp = await Services.Graphy.Storage.getUploadUrls(
                    Cookies.get('project'),
                    names,
                );
                resp.map(item => {
                    remoteNameToUrl[item.name] = item.uri;
                });
                index += REQUEST_AMOUNT;
            };
            for (let index = 0; index < this.currentData.length; index++) {
                this.currentData[index]['putAction'] = remoteNameToUrl[idToRemoteName[this.currentData[index]['id']]];
            }

            let currentPath = this.currentPath.path;
            let parentFoldersObject = {};
            let filesObject = {};
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
                let currentTime = (new Date()).getTime();
                for (let i = 0; i < parentFolders.length; i++) {
                    let path = parentFolders[i];
                    if (path === '/' || path === '.') {
                        parrentId = currentPath;
                        continue;
                    }
                    if (parentFoldersObject[path]) {
                        parrentId = parentFoldersObject[path].id;
                    } else {
                        let id = uuidv4();
                        let name = uuidv4();
                        parentFoldersObject[path] = {
                            id: id,
                            type: 'DIRECTORY',
                            path: parrentId,
                            name: name,
                            alias: Path.basename(path),
                            data: JSON.stringify({
                                [GraphyField.FolderData.uploadTime]: currentTime,
                                [GraphyField.FolderData.createTime]: '',
                                [GraphyField.FolderData.updateTIme]: '',
                            }),
                        };
                        parrentId = id;
                    }
                    if (i === parentFolders.length - 1) {
                        let fileId = uuidv4();
                        let fileName = uuidv4();
                        if (!filesObject[parrentId]) {
                            filesObject[parrentId] = [];
                        };

                        filesObject[parrentId].push({
                            id: fileId,
                            type: 'FILE',
                            path: parrentId,
                            name: fileName,
                            alias: Path.basename(file.name),
                            data: JSON.stringify({
                                [GraphyField.FileData.info]: JSON.stringify({fileSize: file.size}),
                                [GraphyField.FileData.fileType]: file.type,
                                [GraphyField.FileData.uploadTime]: currentTime,
                                [GraphyField.FileData.createTime]: '',
                                [GraphyField.FileData.updateTIme]: '',
                                [GraphyField.FileData.viewTime]: '',
                                [GraphyField.FileData.storage]: idToRemoteName[this.currentData[index]['id']],
                            }),
                        });
                    }
                }
            }

            const CAPACITY = 50;
            let packages = [[]];
            Object.keys(parentFoldersObject).map((key) => {
                let currentPackage = packages[packages.length - 1];
                let folderKey = parentFoldersObject[key]['id'];

                let parentFolders = [];
                let currentParent = parentFoldersObject[key];
                while (true) {
                    parentFolders.splice(0, 0, currentParent);
                    if (currentParent['path'] === '/' || currentParent['path'] === '.') {
                        break;
                    };
                    currentParent = Object.values(parentFoldersObject).find(item => item.id === currentParent.path);
                };
                if (!filesObject[folderKey]) {
                    console.log('当前路径下只有子文件夹：', parentFolders.map(item => item.alias).join(' \ '));
                    return;
                };

                if (filesObject[folderKey].length < CAPACITY - currentPackage.length) {
                    packages[packages.length - 1] = [...packages[packages.length - 1], ...parentFolders, ...filesObject[folderKey]];
                } else {
                    let partIndex = CAPACITY - currentPackage.length;
                    packages[packages.length - 1] = [...packages[packages.length - 1], ...parentFolders, ...filesObject[folderKey].slice(0, partIndex)];
                    while (partIndex < filesObject[folderKey].length) {
                        packages.push([
                            ...parentFolders, ...filesObject[folderKey].slice(partIndex, partIndex + CAPACITY)
                        ]);
                        partIndex += CAPACITY;
                    }
                };
            });

            for (let i = 0; i < packages.length; i++) {
                let resp = await Services.Graphy.Manage.batchAddFile(Cookies.get('project'), packages[i], false);
                console.log(resp);
            }

            // 上传文件
            const batchSize = 3;
            for (let index = 0; index < this.currentData.length; index += batchSize) {
                let prs = [];
                for (let jj = 0; jj < batchSize && jj < this.currentData.length - index; jj++) {
                    prs.push(
                        new Promise((resolve, reject) => {
                            let xhr = new XMLHttpRequest();
                            xhr.open('PUT', this.currentData[index + jj].putAction, true);
                            xhr.send(this.currentData[index + jj].file);
                            xhr.onload = () => {
                                // fileInfo.uploading = false;
                                if (xhr.status === 200) {
                                    this.currentData[index + jj].progress = '100';
                                } else {
                                    // this.currentData[index].progress = 'NaN';
                                };
                                resolve();
                            };
                        })
                    );
                };
                await Promise.all(prs);
                console.log('第' + (index + 1) + '个，共' + this.currentData.length + '个');
            }
        },
    },
};
</script>
