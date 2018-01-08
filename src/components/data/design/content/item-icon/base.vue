<style lang="less" scoped>
.icon-base {
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  margin: 20px 10px;
  padding: 20px 35px;
}
.icon-base:hover {
    background-color: #f4f4f4;
}
.click-area {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
  cursor: pointer;
}
</style>

<template>
    <div class="icon-base" @click.stop="$emit('select')">
        <div class="click-area" @click.stop="$emit('enter')">
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
