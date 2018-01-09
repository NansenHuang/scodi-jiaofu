<style lang="less" scoped>
  .main-layout {
    display: flex;
  }
  .main-left {
    flex-grow: 0;
    width: 200px;
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
  }
  .center-content {
    flex-grow: 1;
    //
    display: flex;
  }
  .content-container {
    flex-grow: 1;
  }
  .content-info {
    flex-grow: 0;
    width: 200px;
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
        <design-data-type></design-data-type>
      </div>
      <div class="horizontal-split" v-if="fileTypesPanelVisible"></div>
      <div class="main-center">
        <div class="center-toolbar">
          <design-data-toolbar></design-data-toolbar>
        </div>
        <div class="vertical-split"></div>
        <div class="center-content">
          <div class="content-container">
            <design-data-content></design-data-content>
          </div>
          <div class="horizontal-split" v-if="infoPanelVisible"></div>
          <div class="content-info" v-if="infoPanelVisible">
            <design-data-info></design-data-info>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import DesignDataContent from './content';
import DesignDataToolbar from './toolbar';
import DesignDataInfo from './info';
import DesignDataType from './type';

export default {
    name: 'DesignDataMainView',
    components: {
        DesignDataContent,
        DesignDataToolbar,
        DesignDataInfo,
        DesignDataType,
    },
    data: function () {
        return {
            fileTypesPanelVisible: true,
            infoPanelVisible: true,
        };
    },
};
</script>
