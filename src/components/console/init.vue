<style lang="less" scoped>
    .center {
      background: #ED4264;
      background: -webkit-linear-gradient(to top, #F5F7FA, #C3CFE2);
      background: linear-gradient(to top, #F5F7FA, #C3CFE2);
    }
</style>

<template>
    <div class="center" style="height:100%;display:flex;justify-content:center;align-items:center;">
        <div style="width:400px;padding-bottom:80px;">
            <Card>
                <h4 slot="title">设置管理员账户</h4>
                <Form :label-width="88" style="padding:10px 20px 0 20px;">
                    <FormItem label="认证用户名">
                        <Input v-model="verifyusername"></Input>
                    </FormItem>
                    <FormItem label="认证密码">
                        <Input type="password" v-model="verifypassword"></Input>
                    </FormItem>
                    <FormItem label="管理员用户名">
                        <Input v-model="username"></Input>
                    </FormItem>
                    <FormItem label="输入密码">
                        <Input type="password" v-model="password1"></Input>
                    </FormItem>
                    <FormItem label="再次输入密码">
                        <Input type="password" v-model="password2"></Input>
                    </FormItem>
                    <FormItem>
                        <Button @click="save" type="primary" long>确定</Button>
                    </FormItem>
                </Form>
            </Card>
        </div>
    </div>
</template>

<script>
import Services from 'src/services';
import forge from 'node-forge';
import Encrypt from 'src/config/encrypt';

forge.options.usePureJavaScript = true;
const pkey = forge.pki.publicKeyFromPem(Encrypt.PublicKey);

export default {
    name: 'InitProject',
    components: {},
    data () {
        return {
            verifyusername: 'highway',
            verifypassword: '',
            username: '',
            password1: '',
            password2: '',
        };
    },
    methods: {
        save: async function () {
            if (this.password1 === this.password2) {
                let resp = await Services.Account.create(this.verifyusername, forge.util.encode64(pkey.encrypt(this.verifypassword)), this.username, forge.util.encode64(pkey.encrypt(this.password1)), this.username);
                if (resp['nickname'] && resp['username']) {
                    this.$Message.success({
                        content: '创建成功！即将前往登录界面。',
                        duration: 3
                    });
                    setTimeout(() => {
                        this.$router.push({
                            name: 'login'
                        });
                    }, 1500);
                } else {
                    resp['message'] && this.$Message.error(resp['message']);
                    !resp['message'] && this.$Message.error(JSON.stringify(resp));
                }
            } else {
                this.$Message.error('两次输入的密码不一致！');
            }
        },
    }
};
</script>
