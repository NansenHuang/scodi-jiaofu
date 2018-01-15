<style lang="less" scoped>
  .info-header {
    display: flex;
    align-items: center;
  }
  .info-header img, .info-header i {
    width: 32px;
    height: 32px;
    margin-right: 15px;
  }
  .info-header i {
    display: inline-flex;
    justify-content: center;
    color: #666;
  }
  .info-body {
    margin: 20px 0;
  }
  .info-item {
    margin-bottom: 20px;
  }
  .info-item-title {
      font-size: 12px;
      color: #666;
  }
  .info-item-value {
      font-size: 14px;
      color: #333;
  }
</style>

<template>
  <div>
    <div style="padding:10px;">
      <div class="info-header" v-if="folderInfoVisible || !fileInfoVisible">
        <img src="./folder.svg" alt="">
        <h4>文件信息</h4>
      </div>
      <div class="info-header" v-else-if="fileInfoVisible">
        <img src="./genericfile.png" alt="">
        <h4>文件信息</h4>
      </div>
      <div class="info-body" v-if="folderInfoVisible || fileInfoVisible">
        <div class="info-item" v-for="item in selectedInfoForDisplay" :key="item.key">
           <div class="info-item-title">{{item.key}}</div>
           <div class="info-item-value">{{item.value}}</div>
        </div>
      </div>
      <div class="info-body" v-else>
        <h4>{{ `已选中${selected.length}个项目` }}</h4>
      </div>
      <div class="info-header" v-if="bindInfo.length">
        <Icon type="link" size="32"></Icon>
        <h4>绑定信息</h4>
      </div>
      <div class="info-body" v-if="bindInfo.length">
          <div v-for="(bindItem, index) in bindInfo" :key="bindItem['id']">
              <p>{{ index + 1 }} <Button type="text" @click="deleteBind" style="color:#57a3f3;">修改</Button></p>
              <p>{{ JSON.stringify(bindItem['Data']['model']) }}</p>
          </div>
      </div>

      <div class="info-header" v-if="!folderInfoVisible && !fileInfoVisible && currentFolderInvalidBindData.length">
        <Icon type="android-alert" size="32"></Icon>
        <h4>无效的绑定</h4>
      </div>
      <div class="info-body" v-if="!folderInfoVisible && !fileInfoVisible && currentFolderInvalidBindData.length">
          <div v-for="(item, index) in currentFolderInvalidBindData" :key="item['id']">
              <p>{{ index + 1 }} <Button type="text" @click="deleteInvalidBind" style="color:#57a3f3;">修改</Button></p>
              <p>{{ JSON.stringify(item['Data']['docs']) }}</p>
          </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
    name: 'DesignDataInfoView',
    computed: {
        bindInfo: function () {
            if (this.selected.length === 1) {
                let data = this.$store.state['highway']['graphyBind'][this.currentPath.path] || [];
                let bindInfo = data.filter(item => item['Data']['docs']['id'] === this.selected[0].id);
                return (bindInfo.length && bindInfo) || [];
            } else {
                return [];
            };
        },
        currentFolderInvalidBindData: function () {
            let data = this.$store.state['highway']['graphyBind'][this.currentPath.path] || [];
            let dataById = [];
            data.map((item) => {
                let validItem = this.currentFolderData.filter(fileItem => fileItem.id === item['Data']['docs']['id']);
                if (!validItem.length) {
                    dataById.push(item);
                };
            });
            return dataById;
        },
        currentPath: function () {
            let path = this.$store.state['highway']['graphyCurrentPath'];
            path = path[path.length - 1];
            return path;
        },
        currentFolderData: function () {
            return this.$store.state['highway']['graphy'][this.currentPath.path] || [];
        },
        selectedInfo: function () {
            if (this.selected.length === 1) {
                let selectedItem = this.currentFolderData.find(item => item.id === this.selected[0].id);
                return (selectedItem && selectedItem.Data) || {};
            } else {
                return {};
            };
        },
        selectedInfoForDisplay: function () {
            let fields = Object.keys(this.selectedInfo);
            return fields.map((f) => ({
                key: f,
                value: this.selectedInfo[f],
            }));
        },
        selected: function () {
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

            return [...fileSelected, ...folderSelected];
        },
        fileInfoVisible: function () {
            return this.selected.length === 1 && this.selected[0]['type'] === 'FILE';
        },
        folderInfoVisible: function () {
            return this.selected.length === 1 && this.selected[0]['type'] === 'DIRECTORY';
        }
    },
    methods: {
        bindInfoForDisplay: function (obj) {
            let fields = Object.keys(obj);
            return fields.map((f) => ({
                key: f,
                value: obj[f],
            }));
        },
        deleteBind: function () {
            
        },
        deleteInvalidBind: function () {

        },
    },
    data: function () {
        return {};
    }
};
</script>
