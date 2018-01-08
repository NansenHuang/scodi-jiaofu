<style lang="less" scoped>
.icon-base {
  display: flex;
  flex-direction: column;
  width: 120px;
  height: 150px;
  margin: 20px;
  padding: 20px;
}
.click-area {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
}
</style>

<template>
    <div class="icon-base">
        <div class="click-area">
            <slot name="icon"></slot>
            <slot name="name"></slot>
        </div>
        <slot name="date"></slot>
    </div>
</template>

<script>
export default {
    name: 'IconBase',
};
</script>
