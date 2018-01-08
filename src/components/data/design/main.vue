<style lang="less" scoped>
  .main-layout {
    height: 500px;
    display: flex;
  }
  .main-left {
    flex-grow: 0;
    width: 200px;
    //
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
  }
  .center-content {
    flex-grow: 1;
    //
    display: flex;
  }
  .content-container {
    flex-grow: 1;
    //
  }
  .content-info {
    flex-grow: 0;
    width: 200px;
    //
  }
</style>

<template>
  <Card>
    <div class="main-layout">
      <div class="main-left">
        文件/最近/回收站
      </div>
      <div class="main-center">
        <div class="center-toolbar">
          新建/上传/排序/视图
        </div>
        <div class="center-content">
          <div class="content-container">
            文件列表
          </div>
          <div class="content-info">
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
};
</script>
