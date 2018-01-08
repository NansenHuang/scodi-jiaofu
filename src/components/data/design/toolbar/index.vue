<style lang="less" scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  padding: 5px;
}
</style>

<template>
  <div class="toolbar">
    <edit-toolbar></edit-toolbar>
    <info-toolbar></info-toolbar>
  </div>
</template>

<script>
import EditToolbar from './edit';
import InfoToolbar from './info';

export default {
    name: 'Toolbar',
    components: {
        EditToolbar,
        InfoToolbar,
    },
    data: function () {
        return {};
    },
};
</script>
