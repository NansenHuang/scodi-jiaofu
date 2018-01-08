<style lang="less" scoped>
.type-layout {
  display: flex;
  flex-direction: column;
}
.type-search {
  flex-grow: 0;
  height: 48px;
  //
  display: flex;
  align-items: center;
  padding: 0 16px;
}
.type-search p {
  padding-left: 16px;
  color: #aaa;
}
.type-list {
  flex-grow: 1;
  //
  display: flex;
  flex-direction: column;
}
.type-list-item-selected {
  border-left: 2px solid #0078d7;
  background-color: #eee;
  color: #0078d7;
}
.type-list-item {
  margin: 2px 0;
  padding: 0 16px;
  height: 48px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.split {
  flex-grow: 0;
  height: 1px;
  background-color: #eee;
  margin: 0 5px;
}
</style>

<template>
<div class="type-layout">
  <div class="type-search">
    <Icon size="16" type="ios-search"></Icon>
    <p>搜索</p>
  </div>
  <div class="split"></div>
  <div class="type-list">
    <div :class="`type-list-item ${selected === 'files' && 'type-list-item-selected'}`" @click="itemClick('files')">
      <span>文件</span>
    </div>
    <div :class="`type-list-item ${selected === 'recent' && 'type-list-item-selected'}`" @click="itemClick('recent')">
      <span>最近</span>
    </div>
    <div :class="`type-list-item ${selected === 'trash' && 'type-list-item-selected'}`" @click="itemClick('trash')">
      <span>回收站</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'DesignDataTypeView',
    data: function () {
        return {
            selected: 'files'
        };
    },
    methods: {
        setSelected (val) {
            this.selected = val;
        },
        itemClick: function (val) {
            let setSelected = this.setSelected;
            setSelected(val);
            this.$Message.info('正在开发中...');
            setTimeout(() => {
                setSelected('files');
            }, 1500);
        }
    }
};
</script>
