<style lang="less" scoped>
.icon-base-grid {
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  margin: 20px 10px;
  padding: 28px 35px 12px 35px;
  position: relative;
}
.icon-base-list {
  display: flex;
  position: relative;
}
.icon-base-selected, .icon-base-grid:hover {
    background-color: #f4f4f4;
}
.icon-base-list:hover {
    background-color: #ddd;
}
.click-area-grid {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
  cursor: pointer;
}
.click-area-list {
  display: flex;
  width: 200px;
  margin-left: 36px;
  overflow: hidden;
  margin-right: 40px;
  cursor: pointer;
}
.click-area-list > * {
    padding-right: 8px;
}
.selected-sign-grid {
  position: absolute;
  right: 6px;
  top: 6px;
  color: #aaa;
}
.selected-sign-list {
  position: absolute;
  color: #aaa;
}
.selected-sign-selected {
  color: #0078d7;
}
.file-name-grid {
  display: inline-flex;
  justify-content: center;
}
.file-date-grid {
  display: inline-flex;
  justify-content: center;
  font-size: 10px;
  color: #999;
}
.file-date-list {
  font-size: 10px;
  color: #999;
  margin: 0 40px;
}
</style>

<template>
    <div :class="`icon-base-${layoutString} ${selected ? 'icon-base-selected' : ''}`" @click.stop="$emit('select')"
    @mouseover="mouseverHander" @mouseout="mouseoutHander"
    >
        <div :class="`selected-sign-${layoutString} ${selected ? 'selected-sign-selected' : ''}`" v-if="mouseHover || selected"
        @mouseover="circleMouseverHander" @mouseout="circleMouseoutHander" @click.stop="$emit('append-select')"
        >
            <Icon size="20" :type="`${selected ? 'ios-checkmark' : circleMouseHover ? 'ios-checkmark-outline' : 'ios-circle-outline'}`"></Icon>
        </div>
        <div :class="`click-area-${layoutString}`" @click.stop="$emit('enter')">
            <slot name="icon"></slot>
            <div :class="`file-name-${layoutString}`"><slot name="name"></slot></div>
        </div>
        <div :class="`file-date-${layoutString}`">
            <slot name="date"></slot>
        </div>
        <div :class="`file-date-${layoutString}`">
            <slot name="bind"></slot>
        </div>
    </div>
</template>

<script>
import LayoutType from 'src/config/layout-type';

export default {
    name: 'IconBase',
    props: {
        selected: {
            type: Boolean,
            default: false,
        },
        layout: {
            type: String,
            required: true,
        },
    },
    computed: {
        layoutString: function () {
            return this.layout === LayoutType.Grid ? 'grid' : 'list';
        },
    },
    data: function () {
        return {
            mouseHover: false,
            circleMouseHover: false,
        };
    },
    methods: {
        mouseverHander: function () {
            this.mouseHover = true;
        },
        mouseoutHander: function () {
            this.mouseHover = false;
        },
        circleMouseverHander: function () {
            this.circleMouseHover = true;
        },
        circleMouseoutHander: function () {
            this.circleMouseHover = false;
        },
    },
};
</script>
