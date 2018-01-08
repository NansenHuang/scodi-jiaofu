<style lang="less" scoped>
  .info-header {
    display: flex;
    align-items: center;
  }
  .info-header img {
    width: 32px;
    height: 32px;
    margin-right: 15px;
  }
</style>

<template>
  <div>
    <div style="padding:10px;">
      <div class="info-header" v-if="folderInfoVisible">
        <img src="./folder.svg" alt="">
        <h4>文件信息</h4>
      </div>
      <div class="info-header" v-else-if="fileInfoVisible">
        <img src="./genericfile.png" alt="">
        <h4>文件信息</h4>
      </div>
      <div class="info-header" v-else>
        <h4>{{ `已选中${selected.length}个项目` }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'DesignDataInfoView',
    computed: {
        selected: function () {
            return [{ type: 'folder' }];
            return [{ type: 'file' }];
            return [{}, {}, {}];
        },
        fileInfoVisible: function () {
            return this.selected.length === 1 && this.selected[0]['type'] === 'file';
        },
        folderInfoVisible: function () {
            return this.selected.length === 1 && this.selected[0]['type'] === 'folder';
        }
    },
    data: function () {
        return {};
    }
};
</script>
