<style lang="less" scoped>
  .toolbar-btn {
    font-size: 15px;
  }
</style>

<template>
  <div>
    <Button class="toolbar-btn" type="text" @click="onClick">
      <Icon size="16" type="ios-information-outline"></Icon>
    </Button>
  </div>
</template>

<script>
export default {
    name: 'InfoToolbar',
    data: function () {
        return {};
    },
    methods: {
        onClick: function () {
            console.log('点击了‘信息’按钮。');
        },
    },
};
</script>
