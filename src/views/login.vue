<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录BIM交付系统
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <div style="text-align:right;"><a style="color:#aaa;font-size:12px;text-decoration:underline;" @click="initFunc">前往初始化页面</a></div>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import Services from 'src/services';
import forge from 'node-forge';
import Encrypt from 'src/config/encrypt';

forge.options.usePureJavaScript = true;
const pkey = forge.pki.publicKeyFromPem(Encrypt.PublicKey);

export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit: async function () {
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    let resp = await Services.Account.logon(this.form.userName, forge.util.encode64(pkey.encrypt(this.form.password)));
                    if (resp['user']) {
                        Cookies.set('user', resp.user.username);
                        Cookies.set('password', this.form.password.substring(this.form.password.substring(this.form.password.length - 2)));
                        // TODO set access according to resp.user.permissions
                        Cookies.set('access', 0);
                        this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                        this.$router.push({
                            name: 'console'
                        });
                    } else if (resp['code'] && resp['message']) {
                        this.$Message.error(resp['message']);
                    }
                }
            });
        },
        initFunc: function () {
            this.$router.push({
                name: 'init'
            });
        },
    }
};
</script>

<style>

</style>
