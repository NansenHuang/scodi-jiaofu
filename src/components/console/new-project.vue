<style lang="less" scoped>
</style>

<template>
    <Form :label-width="88" style="padding:10px 20px 0 20px;">
        <FormItem label="项目名称">
            <Input v-model="projectname"></Input>
        </FormItem>
        <FormItem label="创建者">
            <Input disabled :value="user"></Input>
        </FormItem>
        <FormItem label="项目描述">
            <Input type="textarea" :rows="6" v-model="desc"></Input>
        </FormItem>
        <FormItem>
            <div style="display:flex;justify-content:space-between;">
                <Button @click="saveFunc" style="width:160px;" type="primary" long>确定</Button>
                <Button @click="closeFunc" style="width:160px;" long>关闭</Button>
            </div>
        </FormItem>
    </Form>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    name: 'NewProject',
    components: {},
    props: {
        save: {
            type: Function,
            default: () => {},
        },
        closeFunc: {
            type: Function,
            default: () => {},
        },
    },
    data () {
        return {
            projectname: '',
            desc: '',
        };
    },
    computed: {
        user: function () {
            return Cookies.get('user');
        },
    },
    methods: {
        saveFunc: function () {
            this.save(this.projectname, this.user, this.desc);
        },
    }
};
</script>
