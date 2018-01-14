<style lang="less" scoped>
.icon-base {
  display: flex;
  position: relative;
}
.icon-base-selected {
    background-color: #f4f4f4;
}
.icon-base:hover {
    background-color: #ddd;
}
.click-area {
  display: flex;
  width: 200px;
  margin-left: 36px;
  overflow: hidden;
  margin-right: 40px;
  cursor: pointer;
}
.click-area > * {
    padding-right: 8px;
}
.selected-sign {
  position: absolute;
  color: #aaa;
}
.selected-sign-selected {
  color: #0078d7;
}
</style>

<template>
    <div :class="`icon-base ${selected && 'icon-base-selected'}`" @click.stop="$emit('select')"
    @mouseover="mouseverHander" @mouseout="mouseoutHander"
    >
        <div :class="`selected-sign ${selected && 'selected-sign-selected'}`" v-if="mouseHover || selected"
        @mouseover="circleMouseverHander" @mouseout="circleMouseoutHander" @click.stop="$emit('append-select')"
        >
            <Icon size="20" :type="`${selected ? 'ios-checkmark' : circleMouseHover ? 'ios-checkmark-outline' : 'ios-circle-outline'}`"></Icon>
        </div>

        <div class="click-area" @click.stop="$emit('enter')">
            <slot name="icon"></slot>
            <slot name="name"></slot>
        </div>
        <slot name="date"></slot>
        <slot name="bind"></slot>
    </div>
</template>

<script>
export default {
    name: 'IconBase',
    props: {
        selected: {
            type: Boolean,
            default: false,
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
