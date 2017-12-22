<style lang="less">
</style>

<template>
    <div>

        <template v-if="layout==='tabs'">
            <Card>
                <Tabs v-model="currentTab">
                    <TabPane v-for="item in itemTypes" :name="item.label" :label="item.label" :key="item.key || item.name || item.label">
                        <slot name="content" :isType="item.type"></slot>
                    </TabPane>
                </Tabs>
                <slot></slot>
            </Card>
        </template>

        <template v-else-if="layout==='tiles'">
            <Row>
                <Col v-for="item in itemTypes" :key="item.key || item.name || item.label" :span="item.span || 24" style="margin-bottom:10px;">
                    <Card>
                        <h4 slot="title">
                            <Icon type="android-archive"></Icon>
                            {{ item.label }}
                        </h4>
                        <slot name="content" :isType="item.type"></slot>
                    </Card>
                </Col>
                <slot></slot>
            </Row>
        </template>

        <template v-else>
            <p>layout type error, check the prop value.</p>
        </template>

    </div>
</template>

<script>
export default {
    name: 'ContentLayout',
    props: {
        itemTypes: {
            type: Array,
            default: [],
        },
        layout: {
            type: String,
            default: 'tabs', // the other value is 'tiles'
        },
        activeTab: {
            type: String,
            default: '',
        },
    },
    computed: {
        currentTab: {
            get: function () {
                return this.activeTab;
            },
            set: function (val) {
                this.$emit('update:activeTab', val);
            },
        },
    },
    created () {
    },
};
</script>
