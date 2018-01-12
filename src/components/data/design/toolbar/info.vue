<style lang="less" scoped>
  .toolbar-btn {
    font-size: 15px;
  }
</style>

<template>
  <div>
    <ButtonGroup>
        <Button :type="layout === 'grid' ? 'primary' : 'ghost'" @click="setLayout('grid')" icon="android-apps" size="small"></Button>
        <Button :type="layout === 'list' ? 'primary' : 'ghost'" @click="setLayout('list')" icon="android-list" size="small"></Button>
    </ButtonGroup>
    <Button class="toolbar-btn" type="text" @click="onClick">
      <Icon size="16" type="ios-information-outline"></Icon>
    </Button>
  </div>
</template>

<script>
import ActionType from 'src/config/action-type';

export default {
    name: 'InfoToolbar',
    data: function () {
        return {};
    },
    computed: {
        layout: function () {
            return this.$store.state['highway']['graphyLayout'] || 'grid';
        },
    },
    methods: {
        setLayout: function (val) {
            this.$store.commit(ActionType.SetLayout, val);
        },
        onClick: function () {
            console.log('点击了‘信息’按钮。');
        },
    },
};
</script>
