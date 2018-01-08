<style lang="less" scoped>
  .main-layout {
    height: 500px;
    display: flex;
  }
  .main-left {
    flex-grow: 0;
    width: 200px;
    //
    padding: 5px;
  }
  .main-center {
    flex-grow: 1;
    //
    display: flex;
    flex-direction: column;
  }
  .center-toolbar {
    flex-grow: 0;
    height: 48px;
    //
    padding: 5px;
  }
  .center-content {
    flex-grow: 1;
    //
    display: flex;
  }
  .content-container {
    flex-grow: 1;
    //
    padding: 5px;
  }
  .content-info {
    flex-grow: 0;
    width: 200px;
    //
    padding: 5px;
  }
  .vertical-split {
    flex-grow: 0;
    height: 1px;
    background-color: #eee;
    margin: 0 5px;
  }
  .horizontal-split {
    flex-grow: 0;
    width: 1px;
    background-color: #eee;
    margin: 5px 0;
  }
</style>

<template>
  <Card>
    <div class="main-layout">
      <div class="main-left" v-if="fileTypesPanelVisible">
        文件/最近/回收站
      </div>
      <div class="horizontal-split" v-if="fileTypesPanelVisible"></div>
      <div class="main-center">
        <div class="center-toolbar">
          新建/上传/排序/视图
        </div>
        <div class="vertical-split"></div>
        <div class="center-content">
          <div class="content-container">
            文件列表
          </div>
          <div class="horizontal-split" v-if="infoPanelVisible"></div>
          <div class="content-info" v-if="infoPanelVisible">
            选中文件的信息
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
    name: 'DesignDataMainView',
    data: function () {
        return {
            fileTypesPanelVisible: true,
            infoPanelVisible: true,
        };
    },
};
</script>
