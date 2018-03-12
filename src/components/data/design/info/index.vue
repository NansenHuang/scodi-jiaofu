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
    margin-bottom: 10px;
  }
  .info-item-title {
      font-size: 12px;
      color: black;
  }
  .info-item-value {
      font-size: 14px;
      color: #333;
  }

  .info-item-alias {
      font-size: 14px;
      color: #999;
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
          <div class="info-item-title">类型: {{selectedInfoForDisplay2.type}}</div>
          <br/>
          <div class="info-item-title">上传时间: {{selectedInfoForDisplay2.createtime}}</div>
          <br/>
          <div class="info-item-title">文件名称: {{selectedInfoForDisplay2.name}}</div>
          <br/>
          <div class="info-item-title">文件ID: {{selectedInfoForDisplay2.id}}</div>
      </div>
      <div class="info-body" v-else>
        <h4>{{ `已选中${selected.length}个项目` }}</h4>
      </div>
      <div class="info-header" v-if="bindInfo.length">
        <Icon type="link" size="32"></Icon>
        <h4>绑定信息</h4>
      </div>
      <div class="info-body" v-if="bindInfo.length">
          <div v-for="(bindInfo, index) in bindInfoForDisplay" :key="index">
              <p>{{ index + 1 }} <Button type="text" @click="deleteBind(index)" style="color:#57a3f3;">修改</Button></p>
              <div class="info-item" v-for="item in bindInfo" :key="item.key">
                <div class="info-item-title">{{item.key}}</div>
                <div class="info-item-value">{{item.value}}</div>
              </div>
          </div>
      </div>

      <div class="info-header" v-if="!folderInfoVisible && !fileInfoVisible && currentFolderInvalidBindData.length">
        <Icon type="android-alert" size="32"></Icon>
        <h4>无效的绑定</h4>
      </div>
      <div class="info-body" v-if="!folderInfoVisible && !fileInfoVisible && currentFolderInvalidBindData.length">
          <div v-for="(bindInfo, index) in currentFolderInvalidBindData" :key="index">
              <p>{{ index + 1 }} <Button type="text" @click="deleteInvalidBind(index)" style="color:#57a3f3;">修改</Button></p>
              <div class="info-item" v-for="item in bindInfo['docs']" :key="'docs' + item.key">
                <div class="info-item-title">{{item.key}}</div>
                <div class="info-item-value">{{item.value}}</div>
              </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import ActionType from 'src/config/action-type';

export default {
    name: 'DesignDataInfoView',
    computed: {
        bindInfo: function () {
            if (this.selected.length === 1) {
                let data = this.$store.state['graphy']['bind']['data'][this.currentPath.path] || [];
                let bindInfo = data.filter(item => item['Data']['docs']['id'] === this.selected[0].id);
                return (bindInfo.length && bindInfo) || [];
            } else {
                return [];
            }
        },
        bindInfoForDisplay: function (obj) {
            let data = this.bindInfo.map((item) => {
                return Object.keys(item['Data']['model']).map((f) => ({
                    key: f,
                    value: f === 'type' ? this.$t(item['Data']['model'][f]) : item['Data']['model'][f] || '无',
                }));
            });
            return data;
        },
        currentFolderInvalidBindData: function () {
            let data = this.$store.state['graphy']['bind']['data'][this.currentPath.path] || [];
            let dataById = [];
            data.map((item) => {
                let validItem = this.currentFolderData.filter(fileItem => fileItem.id === item['Data']['docs']['id']);
                if (!validItem.length) {
                    dataById.push({
                        id: item['id'],
                        docs: Object.keys(item['Data']['docs']).map((f) => ({
                            key: f,
                            value: f === 'type' ? this.$t(item['Data']['docs'][f]) : item['Data']['docs'][f] || '无',
                        })),
                        model: Object.keys(item['Data']['model']).map((f) => ({
                            key: f,
                            value: f === 'type' ? this.$t(item['Data']['model'][f]) : item['Data']['model'][f] || '无',
                        })),
                    });
                };
            });
            return dataById;
        },
        currentPath: function () {
            let path = this.$store.state['graphy']['explore']['path'];
            path = path[path.length - 1];
            return path;
        },
        currentFolderData: function () {
            return this.$store.state['graphy']['explore']['data'][this.currentPath.path] || [];
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
                value: this.selectedInfo[f] || '无',
            }));
        },

        selectedInfoForDisplay2: function () {
            if (this.selected.length === 1) {
                let selectedItem = this.currentFolderData.find(item => item.id === this.selected[0].id);
                let folderinfo = {
                    type: selectedItem['Type'],
                    name: selectedItem['Alias'],
                    id: selectedItem['ID'],
                    namespace: selectedItem['NameSpace'],
                    createtime: selectedItem.Timestamp.substring(0, selectedItem.Timestamp.indexOf('T')),
                };
                return folderinfo;
            }
        },
        selected: function () {
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
        fileInfoVisible: function () {
            return this.selected.length === 1 && this.selected[0]['type'] === 'FILE';
        },
        folderInfoVisible: function () {
            return this.selected.length === 1 && this.selected[0]['type'] === 'DIRECTORY';
        }
    },
    methods: {
        deleteBind: function (index) {
            this.$Modal.confirm({
                title: '确定要删除这条绑定信息吗？',
                onOk: () => {
                    this.$store.dispatch(ActionType.DeleteRelation, {id: this.bindInfo[index]['id']}).then(() => {
                        //
                        let bindQuery = {query: {bool: {filter: []}}};
                        bindQuery.query.bool.filter.push({
                            match: { 'Data.docs.path.keyword': this.currentPath.path }
                        });
                        this.$store.dispatch(ActionType.QueryRelation, {query: bindQuery, delay: true});
                    });
                }
            });
        },
        deleteInvalidBind: function (index) {
            this.$Modal.confirm({
                title: '确定要删除这条绑定信息吗？',
                onOk: () => {
                    this.$store.dispatch(ActionType.DeleteRelation, {id: this.currentFolderInvalidBindData[index]['id']});
                }
            });
        },
    },
    data: function () {
        return {};
    }
};
</script>
