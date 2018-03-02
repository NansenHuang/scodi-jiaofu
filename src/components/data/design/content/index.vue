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
                  :currentData = "{sectionID: currentPathsection,alignment:{alignmentID:currentStationID[0],startStation: currentPathStartStation[0] ,endStation: currentPathEndStation[0]},type:{type: currentPathtype,modelType:currentPathtypeModel[0]},site:{siteID:currentSiteID[0]}}"
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
import TypeValue from 'src/config/type';
import TypeModel from 'src/config/model-type';
import Utils from 'src/libs/util';
import StationUtil from 'src/libs/station';

export default {
    name: 'DesignDataContent',
    components: {
        FolderIcon,
        FileIcon,
        AddBind,
    },
    computed: {
        currentPathSiteSection: function () {
            let path = this.$store.state['graphy']['explore']['path'];
            console.log('CCC', path);
            let LJ8 = 'LJ8';
            let LJ9 = 'LJ9';
            let LJ10 = 'LJ10';
            let LJ11 = 'LJ11';
            let LJ12 = 'LJ12';
            let LJ13 = 'LJ13';
            let LJ14 = 'LJ14';
            let LJ15 = 'LJ15';
            if (path.length >= 2) {
                if (path[1].name === 'LJ8') {
                    return LJ8;
                } else if (path[1].name === 'LJ9') {
                    return LJ9;
                } else if (path[1].name === 'LJ10') {
                    return LJ10;
                } else if (path[1].name === 'LJ11') {
                    return LJ11;
                } else if (path[1].name === 'LJ12') {
                    return LJ12;
                } else if (path[1].name === 'LJ13') {
                    return LJ13;
                } else if (path[1].name === 'LJ14') {
                    return LJ14;
                } else if (path[1].name === 'LJ15') {
                    return LJ15;
                }
            }
        },
        currentPathSiteType: function () {
            let path = this.$store.state['graphy']['explore']['path'];
            let HANDONG = 'HANDONG';
            let QIAOLIANG = 'QIAO';
            let TIANQIAO = 'TIANQIAO';
            if (path.length >= 3) {
                if (path[2].name === '涵洞') {
                    return HANDONG;
                } else if (path[2].name === '桥梁') {
                    return QIAOLIANG;
                } else if (path[2].name === '天桥') {
                    return TIANQIAO;
                }
            }
        },
        siteArray () {
            let data = (this.currentPathSiteType &&
                this.typeToStorePath[this.currentPathSiteType] &&
                Utils.deepFind(this.$store.state, this.typeToStorePath[this.currentPathSiteType])) || [];
            return data.map((item) => ({
                value: item.id,
                label: item['bridgeCnName'] ||
                item['geologyCnName'] ||
                item['tunnelCnName'] ||
                item['alignmentCnName'] + '  ' + (item['station'] && StationUtil.NumberToLetterStaion(item['station']).replace('K', item['stationMark'])) ||
                '未命名',
            }));
        },
        siteID () {
            return this.rightPartObject['siteID'];
        },
        layout: function () {
            return this.$store.state['graphy']['explore']['layout'];
        },
        layoutString: function () {
            return this.layout === LayoutType.Grid ? 'grid' : 'list';
        },
        currentDataToBind: function () {
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
            let dataToBind = this.$store.state['graphy']['bind']['ing']
                ? [...fileSelected, ...folderSelected]
                : [];
            if (dataToBind.length <= 1) {
                return dataToBind.map(item => {
                    let dataItem = this.currentFolderData.find(i => i.id === item.id);
                    return {
                        ...item,
                        name: dataItem ? dataItem['Alias'] : '',
                        type: item['type'],
                    };
                });
            }
        },
        displayBindPanel: {
            get: function () {
                return this.$store.state['graphy']['bind']['ing'];
            },
            set: function (val) {
                if (!val) {
                    this.$store.commit(ActionType.BindModels, false);
                }
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
                }
                dataById[item['Data']['docs']['id']].push(item);
            });
            return dataById;
        },
        currentPath: function () {
            let path = this.$store.state['graphy']['explore']['path'];
            path = path[path.length - 1];
            return path;
        },
        currentPathsection: function () {
            let path = this.$store.state['graphy']['explore']['path'];
            if (path.length >= 2) {
                return path[1].name;
            } else {
                return path[0].name;
            }
        },
        currentPathtype: function () {
            let path = this.$store.state['graphy']['explore']['path'];
            if (path.length >= 3) {
                if (path[2].name === '涵洞') {
                    return TypeValue.HanDong;
                } else if (path[2].name === '天桥') {
                    return TypeValue.TianQiao;
                } else if (path[2].name === '桥梁') {
                    return TypeValue.Qiao;
                }
            }
            if (path.length >= 4) {
                if (path[2].name === '路基' && path[3].name === '路面结构标准图') {
                    return TypeValue.LuMian;
                } else if (path[2].name === '路基' && path[3].name === '挡土墙工点设计图') {
                    return TypeValue.DangQiang;
                } else if (path[2].name === '路基' && path[3].name === '软基换填工点设计图') {
                    return TypeValue.Rjht;
                } else if (path[2].name === '总体' && path[3].name === '公路平面总体设计图') {
                    return TypeValue.BianPo;
                } else if (path[2].name === '总体' && path[3].name === '公路平面总体设计图') {
                    return TypeValue.LuMian;
                }
            }
            if (path.length >= 5) {
                if (path[2].name === '路基' && path[3].name === '排水盲沟标准图' && path[4].name === '路基、路面排水工程设计图') {
                    return TypeValue.MangGou;
                } else if (path[2].name === '路基' && path[3].name === '排水盲沟标准图' && path[4].name === '陡坡路堤或填挖交界处理设计图') {
                    return TypeValue.MangGou;
                }
            }
            if (path.length >= 6) {
                if (path[2].name === '交叉' && path[5].name === '挡墙工点设计图') {
                    return TypeValue.DangQiang;
                } else if (path[2].name === '交叉' && path[5].name === '挡土墙工点设计图') {
                    return TypeValue.DangQiang;
                } else if (path[2].name === '交叉' && path[5].name === '路面结构标准图') {
                    return TypeValue.LuMian;
                } else if (path[2].name === '交叉' && path[5].name === '软基换填工点设计图') {
                    return TypeValue.Rjht;
                }
            }
            if (path.length >= 7) {
                if (path[2].name === '交叉' && path[6].name === '路基、路面排水工程设计图') {
                    return TypeValue.MangGou;
                } else if (path[2].name === '交叉' && path[6].name === '陡坡路堤或填挖交界处理设计图') {
                    return TypeValue.MangGou;
                } else if (path[2].name === '交叉' && path[6].name === '软基换填工点设计图') {
                    return TypeValue.Rjht;
                }
            }
        },
        currentPathtypeModel: function () {
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
            let dataToBind = this.$store.state['graphy']['bind']['ing']
                ? [...fileSelected, ...folderSelected]
                : [];
            if (dataToBind.length <= 1) {
                return dataToBind.map(item => {
                    let path = this.$store.state['graphy']['explore']['path'];
                    let dataItem = this.currentFolderData.find(i => i.id === item.id);
                    let numb = dataItem['Alias'].replace(/[^0-9]/ig, '');
                    if (path.length >= 4) {
                        if (path[2].name === '路基' && path[3].name === '软基换填工点设计图') {
                            return TypeModel[TypeValue.Rjht].RJHT;
                        } else if (path[2].name === '桥梁' && numb === '2') {
                            return TypeModel[TypeValue.Qiao].SiJieFeng;
                        } else if (path[2].name === '桥梁' && numb === '3') {
                            return TypeModel[TypeValue.Qiao].GaiLiang;
                        } else if (path[2].name === '桥梁' && numb === '4') {
                            return TypeModel[TypeValue.Qiao].QiaoDun;
                        } else if (path[2].name === '桥梁' && numb === '5') {
                            return TypeModel[TypeValue.Qiao].DunXiLiang;
                        } else if (path[2].name === '桥梁' && numb === '6') {
                            return TypeModel[TypeValue.Qiao].ChengTai;
                        } else if (path[2].name === '桥梁' && numb === '7') {
                            return TypeModel[TypeValue.Qiao].Zhuang;
                        } else if (path[2].name === '桥梁' && numb === '8') {
                            return TypeModel[TypeValue.Qiao].QiaoTai;
                        }
                    } else if (path.length >= 5) {
                        if (path[2].name === '路基' && path[3].name === '排水盲沟标准图' && path[4].name === '路基、路面排水工程设计图') {
                            return TypeModel[TypeValue.MangGou].BianGouMangGou;
                        } else if (path[2].name === '路基' && path[3].name === '排水盲沟标准图' && path[4].name === '陡坡路堤或填挖交界处理设计图') {
                            return TypeModel[TypeValue.MangGou].JiaoJieMangGou;
                        }
                    } else if (path.length >= 6) {
                        if (path[2].name === '交叉' && path[5].name === '软基换填工点设计图') {
                            return TypeModel[TypeValue.Rjht].RJHT;
                        }
                    } else if (path.length >= 7) {
                        if (path[2].name === '交叉' && path[6].name === '路基、路面排水工程设计图') {
                            return TypeModel[TypeValue.MangGou].BianGouMangGou;
                        } else if (path[2].name === '交叉' && path[6].name === '陡坡路堤或填挖交界处理设计图') {
                            return TypeModel[TypeValue.MangGou].JiaoJieMangGou;
                        } else if (path[2].name === '交叉' && path[6].name === '软基换填工点设计图') {
                            return TypeModel[TypeValue.Rjht].RJHT;
                        }
                    }
                });
            }
        },
        currentPathStartStation: function () {
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
            let dataToBind = this.$store.state['graphy']['bind']['ing']
                ? [...fileSelected, ...folderSelected]
                : [];
            if (dataToBind.length <= 1) {
                return dataToBind.map(item => {
                    let dataItem = this.currentFolderData.find(i => i.id === item.id);
                    let path = this.$store.state['graphy']['explore']['path'];
                    if (path.length >= 4 && path.length < 6) {
                        if ((path[2].name === '总体' && path[3].name === '公路平面总体设计图') || (path[2].name === '路基' && path[3].name === '软基换填工点设计图')) {
                            let numb = dataItem['Alias'].replace(/[^0-9]/ig, '');
                            if (numb.length === 13) {
                                if (numb.substr(5, 1) === '1') {
                                    return parseFloat(numb.substr(0, 5));
                                } else return parseFloat(numb.substr(0, 6));
                            } else if (numb.length === 14) {
                                return parseFloat(numb.substr(0, 6));
                            } else if (numb.length === 12) {
                                if (numb.substr(0, 1) !== '1') {
                                    return parseFloat(numb.substr(0, 5));
                                } else if (numb.substr(0, 1) !== '1' && numb.substr(5, 1) === '1') {
                                    return parseFloat(numb.substr(0, 5));
                                } else {
                                    return parseFloat(numb.substr(0, 6));
                                }
                            } else if (numb.length === 11) {
                                return parseFloat(numb.substr(0, 5));
                            } else if (numb.length === 10) {
                                return parseFloat(numb.substr(0, 5));
                            } else if (numb.length === 15) {
                                return parseFloat(numb.substr(0, 6));
                            } else if (numb.length === 19) {
                                return parseFloat(numb.substr(0, 6));
                            } else if (numb.length === 16) {
                                return parseFloat(numb.substr(0, 6));
                            }
                        } else if (path[2].name === '路基' && path[3].name === '挡土墙工点设计图') {
                            let numb = dataItem['Alias'].replace(/[^0-9]/ig, '');
                            if (path.length >= 4) {
                                if (numb.length === 12) {
                                    return parseFloat(numb.substr(0, 6));
                                } else if (numb.length === 13 && numb.substr(6, 1) === '1') {
                                    return parseFloat(numb.substr(0, 6));
                                } else if (numb.length === 13 && numb.substr(6, 1) !== '1') {
                                    return parseFloat(numb.substr(0, 6));
                                } else if (numb.length === 14 && numb.substr(6, 1) === '1') {
                                    return parseFloat(numb.substr(0, 6));
                                } else if (numb.length === 14 && numb.substr(6, 1) !== '1') {
                                    return parseFloat(numb.substr(0, 6));
                                } else if (numb.length === 15) {
                                    return parseFloat(numb.substr(0, 6));
                                } else if (numb.length === 18) {
                                    return parseFloat(numb.substr(0, 6));
                                }
                            }
                        }
                    } else if (path.length >= 6) {
                        if (path[2].name === '交叉' && path[5].name === '挡墙工点设计图') {
                            let numb = dataItem['Alias'].replace(/[^0-9]/ig, '');
                            if (numb.length === 12) {
                                return parseFloat(numb.substr(0, 6));
                            } else if (numb.length === 11) {
                                return parseFloat(numb.substr(0, 4));
                            } else if (numb.length === 14) {
                                return parseFloat(numb.substr(0, 6));
                            } else if (numb.length === 15 && numb.substr(0, 1) === numb.substr(6, 1) && numb.substr(1, 1) === numb.substr(7, 1) && numb.substr(2, 1) === numb.substr(8, 1)) {
                                return parseFloat(numb.substr(0, 6));
                            } else if (numb.length === 15) {
                                return parseFloat(numb.substr(0, 6));
                            }
                        } else if (path[2].name === '交叉' && path[5].name === '挡土墙工点设计图') {
                            let numb = dataItem['Alias'].replace(/[^0-9]/ig, '');
                            if (numb.length === 14) {
                                return parseFloat(numb.substr(0, 6));
                            } else if (numb.length === 15) {
                                return parseFloat(numb.substr(0, 6));
                            } else if (numb.length === 10) {
                                return parseFloat(numb.substr(0, 4));
                            } else if (numb.length === 8) {
                                return parseFloat(numb.substr(0, 4));
                            } else if (numb.length === 7) {
                                return parseFloat(numb.substr(0, 4));
                            }
                        } else if (path[2].name === '交叉' && path[5].name === '软基换填工点设计图') {
                            let numb = dataItem['Alias'].replace(/[^0-9]/ig, '');
                            if (numb.length === 8) {
                                return parseFloat(numb.substr(0, 4));
                            }
                        }
                    }
                });
            }
        },
        currentStationID: function () {
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
            let dataToBind = this.$store.state['graphy']['bind']['ing']
                ? [...fileSelected, ...folderSelected]
                : [];
            if (dataToBind.length <= 1) {
                return dataToBind.map(item => {
                    let dataItem = this.currentFolderData.find(i => i.id === item.id);
                    let path = this.$store.state['graphy']['explore']['path'];
                    let AlignmentArray = this.$store.state['highway']['basic']['alignment'];
                    let words = dataItem['Alias'];
                    let patternAK = new RegExp('AK');
                    let patternBK = new RegExp('BK');
                    let patternCK = new RegExp('CK');
                    let patternLK = new RegExp('LK');
                    let patternZK = new RegExp('ZK');
                    let patternMuChuan = new RegExp('沐川枢纽');
                    let Stationline;
                    if (path.length >= 4 && path.length < 6) {
                        if (path[2].name === '总体' && path[3].name === '公路平面总体设计图' && patternZK.test(words) === false) {
                            Stationline = AlignmentArray[54].id;
                        } else if (path[2].name === '总体' && path[3].name === '公路平面总体设计图' && patternZK.test(words) === true) {
                            for (let i = 9; i < 16; i++) {
                                if ((AlignmentArray[i].startStation <= this.currentPathStartStation[0]) && (AlignmentArray[i].endStation >= this.currentPathEndStation[0])) {
                                    Stationline = AlignmentArray[i].id;
                                }
                            }
                        } else if (path[2].name === '路基' && path[3].name === '软基换填工点设计图') {
                            Stationline = AlignmentArray[54].id;
                        } else if (path[2].name === '路基' && path[3].name === '挡土墙工点设计图' && patternZK.test(words) === true) {
                            for (let i = 9; i < 16; i++) {
                                if ((AlignmentArray[i].startStation <= this.currentPathStartStation[0]) && (AlignmentArray[i].endStation >= this.currentPathEndStation[0])) {
                                    Stationline = AlignmentArray[i].id;
                                }
                            }
                        } else if (path[2].name === '路基' && path[3].name === '挡土墙工点设计图' && patternZK.test(words) === false) {
                            Stationline = AlignmentArray[54].id;
                        }
                    } else if (path.length >= 6) {
                        if (path[2].name === '交叉' && path[5].name === '挡墙工点设计图' && patternAK.test(words) === false && patternBK.test(words) === false && patternZK.test(words) === false && patternCK.test(words) === false) {
                            Stationline = AlignmentArray[54].id;
                        } else if (path[2].name === '交叉' && path[5].name === '挡墙工点设计图' && patternMuChuan.test(path[3].name) === true && patternAK.test(words) === true) {
                            Stationline = AlignmentArray[33].id;
                        } else if (path[2].name === '交叉' && path[3].name === '沐川服务区' && path[5].name === '挡土墙工点设计图' && patternBK.test(words) === true) {
                            Stationline = AlignmentArray[25].id;
                        } else if (path[2].name === '交叉' && (path[5].name === '挡土墙工点设计图' || path[5].name === '挡墙工点设计图') && patternZK.test(words) === true) {
                            for (let i = 9; i < 16; i++) {
                                if ((AlignmentArray[i].startStation <= this.currentPathStartStation[0]) && (AlignmentArray[i].endStation >= this.currentPathEndStation[0])) {
                                    Stationline = AlignmentArray[i].id;
                                }
                            }
                        } else if (path[2].name === '交叉' && path[5].name === '挡土墙工点设计图' && patternAK.test(words) === false && patternBK.test(words) === false && patternZK.test(words) === false && patternCK.test(words) === false) {
                            Stationline = AlignmentArray[54].id;
                        } else if (path[2].name === '交叉' && path[3].name === '沐川南互通' && path[5].name === '挡墙工点设计图' && patternCK.test(words) === true) {
                            Stationline = AlignmentArray[22].id;
                        } else if (path[2].name === '交叉' && path[3].name === '沐川南互通' && path[5].name === '软基换填工点设计图' && patternLK.test(words) === true) {
                            Stationline = AlignmentArray[0].id;
                        }
                    }
                    return Stationline;
                });
            }
        },
        currentSiteID: function () {
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
            let dataToBind = this.$store.state['graphy']['bind']['ing']
                ? [...fileSelected, ...folderSelected]
                : [];
            if (dataToBind.length <= 1) {
                return dataToBind.map(item => {
                    let dataItem = this.currentFolderData.find(i => i.id === item.id);
                    let reg = /[\u4e00-\u9fa5]/g;
                    let numb = dataItem['Alias'].replace(/[^0-9]/ig, '');
                    let path = this.$store.state['graphy']['explore']['path'];
                    let CulvertSite = this.$store.state['highway']['structure']['culvert'];
                    let OverbridgeSite = this.$store.state['highway']['structure']['overbridge'];
                    let BridgeSite = this.$store.state['highway']['structure']['bridge'];
                    let SiteStationId;
                    if (path.length >= 2 && path[2].name === '涵洞') {
                        if (CulvertSite.length > 0) {
                            for (let i = 0; i < CulvertSite.length; i++) {
                                if (parseFloat(numb) === CulvertSite[i].station) {
                                    SiteStationId = CulvertSite[i].id;
                                }
                            }
                        }
                    } else if (path.length >= 4 && path[2].name === '天桥') {
                        if (OverbridgeSite.length > 0) {
                            for (let i = 0; i < OverbridgeSite.length; i++) {
                                if ((parseFloat(path[3].name.replace(/[^0-9]/ig, '').substr(4, 5)) === OverbridgeSite[i].station) || (parseFloat(path[3].name.replace(/[^0-9]/ig, '').substr(4, 6)) === OverbridgeSite[i].station) || (parseFloat(path[3].name.replace(/[^0-9]/ig, '').substr(5, 6)) === OverbridgeSite[i].station)) {
                                    SiteStationId = OverbridgeSite[i].id;
                                }
                            }
                        }
                    } else if (path.length >= 4 && path[2].name === '桥梁') {
                        if (BridgeSite.length > 0) {
                            for (let i = 0; i < BridgeSite.length; i++) {
                                if (path[3].name.match(reg).join('') === BridgeSite[i].bridgeCnName.match(reg).join('')) {
                                    SiteStationId = BridgeSite[i].id;
                                }
                            }
                        }
                    }
                    return SiteStationId;
                });
            }
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
        currentPathEndStation: function () {
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
            let dataToBind = this.$store.state['graphy']['bind']['ing']
                ? [...fileSelected, ...folderSelected]
                : [];
            if (dataToBind.length <= 1) {
                return dataToBind.map(item => {
                    let dataItem = this.currentFolderData.find(i => i.id === item.id);
                    let path = this.$store.state['graphy']['explore']['path'];
                    if (path.length >= 4 && path.length < 6) {
                        if ((path[2].name === '总体' && path[3].name === '公路平面总体设计图') || (path[2].name === '路基' && path[3].name === '软基换填工点设计图')) {
                            let numb = dataItem['Alias'].replace(/[^0-9]/ig, '');
                            if (numb.length === 13) {
                                if (numb.substr(5, 1) === '1') {
                                    return parseFloat(numb.substr(5, 6));
                                } else return parseFloat(numb.substr(6, 6));
                            } else if (numb.length === 14) {
                                if (numb.substr(0, 1) === numb.substr(7, 1) && numb.substr(1, 1) === numb.substr(8, 1)) {
                                    return parseFloat(numb.substr(7, 6));
                                } else {
                                    return parseFloat(numb.substr(6, 6));
                                }
                            } else if (numb.length === 12) {
                                if (numb.substr(0, 1) !== '1' && numb.substr(5, 1) !== '1') {
                                    return parseFloat(numb.substr(5, 5));
                                } else if (numb.substr(0, 1) !== '1' && numb.substr(5, 1) === '1') {
                                    return parseFloat(numb.substr(5, 6));
                                } else {
                                    return parseFloat(numb.substr(6, 6));
                                }
                            } else if (numb.length === 11) {
                                return parseFloat(numb.substr(5, 5));
                            } else if (numb.length === 10) {
                                return parseFloat(numb.substr(5, 5));
                            } else if (numb.length === 15) {
                                return parseFloat(numb.substr(6, 6));
                            } else if (numb.length === 19) {
                                return parseFloat(numb.substr(9, 6));
                            } else if (numb.length === 16) {
                                return parseFloat(numb.substr(6, 6));
                            }
                        } else if (path[2].name === '路基' && path[3].name === '挡土墙工点设计图') {
                            let numb = dataItem['Alias'].replace(/[^0-9]/ig, '');
                            if (path.length >= 4) {
                                if (numb.length === 12) {
                                    return parseFloat(numb.substr(6, 6));
                                } else if (numb.length === 13 && numb.substr(6, 1) === '1') {
                                    return parseFloat(numb.substr(6, 6));
                                } else if (numb.length === 13 && numb.substr(6, 1) !== '1') {
                                    return parseFloat(numb.substr(7, 6));
                                } else if (numb.length === 14 && numb.substr(7, 1) === '1' && numb.substr(8, 1) === '1' && numb.substr(9, 1) !== '1') {
                                    return parseFloat(numb.substr(7, 6));
                                } else if (numb.length === 14 && numb.substr(6, 1) === '1') {
                                    return parseFloat(numb.substr(6, 6));
                                } else if (numb.length === 14 && numb.substr(6, 1) !== '1') {
                                    return parseFloat(numb.substr(8, 6));
                                } else if (numb.length === 15 && numb.substr(6, 1) === '1') {
                                    return parseFloat(numb.substr(6, 6));
                                } else if (numb.length === 15 && numb.substr(6, 1) !== '1' && numb.substr(7, 1) !== '1' && numb.substr(8, 1) !== '1') {
                                    return parseFloat(numb.substr(9, 6));
                                } else if (numb.length === 15 && numb.substr(6, 1) !== '1') {
                                    return parseFloat(numb.substr(8, 6));
                                } else if (numb.length === 18) {
                                    return parseFloat(numb.substr(9, 6));
                                }
                            }
                        }
                    } else if (path.length >= 6) {
                        if (path[2].name === '交叉' && path[5].name === '挡墙工点设计图') {
                            let numb = dataItem['Alias'].replace(/[^0-9]/ig, '');
                            if (numb.length === 12) {
                                return parseFloat(numb.substr(6, 6));
                            } else if (numb.length === 11) {
                                return parseFloat(numb.substr(7, 4));
                            } else if (numb.length === 15 && numb.substr(0, 1) === numb.substr(6, 1) && numb.substr(1, 1) === numb.substr(7, 1) && numb.substr(2, 1) === numb.substr(8, 1)) {
                                return parseFloat(numb.substr(6, 6));
                            } else if (numb.length === 15) {
                                return parseFloat(numb.substr(9, 6));
                            }
                        } else if (path[2].name === '交叉' && path[5].name === '挡土墙工点设计图') {
                            let numb = dataItem['Alias'].replace(/[^0-9]/ig, '');
                            if (numb.length === 14) {
                                return parseFloat(numb.substr(6, 6));
                            } else if (numb.length === 15) {
                                return parseFloat(numb.substr(6, 6));
                            } else if (numb.length === 10) {
                                return parseFloat(numb.substr(4, 3));
                            } else if (numb.length === 8) {
                                return parseFloat(numb.substr(4, 4));
                            } else if (numb.length === 7) {
                                return parseFloat(numb.substr(4, 3));
                            }
                        } else if (path[2].name === '交叉' && path[5].name === '软基换填工点设计图') {
                            let numb = dataItem['Alias'].replace(/[^0-9]/ig, '');
                            if (numb.length === 8) {
                                return parseFloat(numb.substr(4, 4));
                            }
                        }
                    }
                });
            }
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
            return this.$store.state['graphy']['explore']['folderSelected'];
        },
        fileSelected: function () {
            return this.$store.state['graphy']['explore']['fileSelected'];
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
            ],
            rightPartObject: {},
            typeToAction: {
                // [TypeValue.LuMian]: ,
                // [TypeValue.LuJian]: ,
                // [TypeValue.BiaoXian]: ,
                // [TypeValue.FenGeDai]: ,
                // [TypeValue.DangQiang]: ,
                // [TypeValue.Rjht]: ,
                // [TypeValue.MangGou]: ,
                // [TypeValue.BianGou]: ,
                // [TypeValue.BianPo]: ,
                // [TypeValue.HongXian]: ,
                // [TypeValue.BiaoPai]: ,
                [TypeValue.DiZhi]: ActionType.LoadGeology,
                [TypeValue.Qiao]: ActionType.LoadBridge,
                [TypeValue.SuiDao]: ActionType.LoadTunnel,
                [TypeValue.HanDong]: ActionType.LoadCulvert,
                [TypeValue.TianQiao]: ActionType.LoadOverbridge,
            },
            typeToStorePath: {
                // [TypeValue.LuMian]: ,
                // [TypeValue.LuJian]: ,
                // [TypeValue.BiaoXian]: ,
                // [TypeValue.FenGeDai]: ,
                // [TypeValue.DangQiang]: ,
                // [TypeValue.Rjht]: ,
                // [TypeValue.MangGou]: ,
                // [TypeValue.BianGou]: ,
                // [TypeValue.BianPo]: ,
                // [TypeValue.HongXian]: ,
                // [TypeValue.BiaoPai]: ,
                [TypeValue.DiZhi]: ['highway', 'structure', 'geology'],
                [TypeValue.Qiao]: ['highway', 'structure', 'bridge'],
                [TypeValue.SuiDao]: ['highway', 'structure', 'tunnel'],
                [TypeValue.HanDong]: ['highway', 'structure', 'culvert'],
                [TypeValue.TianQiao]: ['highway', 'structure', 'overbridge'],
            },
        };
    },
    methods: {
        requestSite (type, sectionID) {
            let storePath = this.typeToStorePath[type];
            let action = this.typeToAction[type];
            if (storePath && action) {
                // let data = Utils.deepFind(this.$store.state, storePath);
                // if (!data.length) {
                let queryBody = { 'query': { 'bool': { 'filter': [] } } };
                queryBody['query']['bool']['filter'].push({
                    'match': {
                        'Data.sectionID.keyword': sectionID,
                    },
                });
                let queryParams = {recursive: true};
                if (sectionID) {
                    queryParams['query'] = queryBody;
                }
                this.$store.dispatch(action, queryParams);
                // };
            }
        },
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
            this.$store.dispatch(ActionType.AddRelations, postData).then(() => {
                //
                this.displayBindPanel = false;
                let bindQuery = {query: {bool: {filter: []}}};
                bindQuery.query.bool.filter.push({
                    match: { 'Data.docs.path.keyword': this.currentPath.path }
                });
                this.$store.dispatch(ActionType.QueryRelation, {query: bindQuery, delay: true});
            });
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
            this.$store.commit(ActionType.SetFolderSelection, { [val]: true });
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
    watch: {
        currentPathSiteSection: function (val) {
            this.requestSite(this.currentPathSiteType, val);
            console.log('AAA', val);
        },
        currentPathSiteType: function (val) {
            this.requestSite(val, this.currentPathSiteSection);
            console.log('BBB', val);
        },
        siteID: function (val) {
            let selectedSite = this.siteArray.find((item) => item['value'] === val);
            this.rightPartObject['siteType'] = this.currentPathType;
            this.rightPartObject['siteCnName'] = (selectedSite && selectedSite.label) || '';
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
