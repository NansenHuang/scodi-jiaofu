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
      <span class="text">上传文件</span>
    </Button>
    <Button class="toolbar-btn" type="text" @click="sendOperation('uploadFolder')" v-if="!selectedItems.length">
      <Icon size="16" type="ios-arrow-thin-up"></Icon>
      <span class="text">上传文件夹</span>
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
  </div>
</template>

<script>
export default {
    name: 'EditToolbar',
    computed: {
        selectedItems: function () {
            // return [{ type: 'folder' }];
            // return [{ type: 'file' }];
            // return [{}, {}, {}];
            return [];
        },
        singleFileSelected: function () {
            return this.selectedItems.length === 1 && this.selectedItems[0]['type'] === 'file';
        },
        singleFolderSelected: function () {
            return this.selectedItems.length === 1 && this.selectedItems[0]['type'] === 'folder';
        }
    },
    data: function () {
        return {};
    },
    methods: {
        sendOperation: function (name) {
            console.log('用户执行了操作：', name);
        },
    },
};
</script>
