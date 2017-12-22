<style lang="less">
</style>

<template>
    <div>
        <Row>
            <Col span="24">
                <Input
                    placeholder="搜索用户"
                    v-model="filter"
                    style="width:256px;"
                    @on-change="filterChange"
                />
                <span style="margin: 0 0 0 10px;">
                    {{ '用户数量：' + (filter ? filteredUser.length + ' / ' : '') + userCount }}
                </span>
                <Button type="info" size="small" style="width:60px;margin-left:15px;" @click="reloadUsers"><Icon type="refresh"></Icon> 刷新</Button>
            </Col>
        </Row>
        <Row class="margin-top-10" style="max-height:64vh;min-height:200px;overflow-y:auto;overflow-x:hidden;">
            <Col span="24">
                <Row v-for="(user, index) in pagedUser" :key="user.userName">
                    <div style="display:flex;margin: 10px 0;">
                        <div style="width: 48px;margin-right:8px;display:flex;justify-content:center;">
                            <Avatar icon="person" size="large">{{user.userName[0]}}</Avatar>
                        </div>
                        <div style="flex-grow:1;">
                            <div style="font-size:16px;">
                                {{user.userName}}
                                <Tooltip v-if="user.roles.Admin" content="管理员" placement="top">
                                    <Icon type="person" color="gray" size="16"></Icon>
                                </Tooltip>
                                <Tooltip v-if="!user.active" content="已禁用" placement="top">
                                    <Icon type="locked" color="gray" size="16"></Icon>
                                </Tooltip>
                                <span v-if="user.userName === currentUser" style="background-color:orange;padding:2px;font-size:14px;border-radius:4px;">我自己</span>
                            </div>
                            <div style="color:#777;">{{user.email}}</div>
                        </div>
                        <div>
                            <Dropdown @on-click="userOperationFuc" style="margin-right:16px;line-height:48px;" placement="bottom-end">
                                <a href="javascript:void(0)">
                                    操作
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem :name="'setRoles#' + user.userName">{{user.roles.Admin ? '设为普通成员' : '设为管理员'}}</DropdownItem>
                                    <DropdownItem :name="'resetPassword#' + user.userName" disabled>重置密码</DropdownItem>
                                    <DropdownItem :name="'setActiveState#' + user.userName" divided>{{user.active ? '停用账户' : '启用账户'}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </Row>
            </Col>
        </Row>
        <Page :total="this.filteredUser.length" size="small" @on-change="pageChange" :current.sync="currentPage" :page-size="pageCapacity"></Page>
        <Modal
        title="重设密码"
        :styles="{minWidth:'480px'}"
        :closable="false"
        :mask-closable="false"
        :scrollable="true"
        v-model="resetPassword.visible">
            <Form :label-width="88" style="padding:10px 20px 0 20px;">
                <FormItem label="用户名">
                    <Input disabled v-model="resetPassword.userName"></Input>
                </FormItem>
                <FormItem label="输入旧密码">
                    <Input type="password" v-model="resetPassword.oldPassword"></Input>
                </FormItem>
                <FormItem label="输入新密码">
                    <Input type="password" v-model="resetPassword.newPassword"></Input>
                </FormItem>
                <FormItem label="再次输入新密码">
                    <Input type="password" v-model="resetPassword.newPassword2"></Input>
                </FormItem>
                <FormItem>
                    <Button @click="applyResetPwdFunc" style="width:160px;" type="primary" long>确定</Button>
                    <Button @click="closeResetPwdFunc" style="width:160px;" long>关闭</Button>                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import Services from 'src/services';
import Cookies from 'js-cookie';

export default {
    name: 'UserManagement',
    components: {},
    data () {
        return {
            filter: '',
            resetPassword: {
                visible: false,
                userName: '',
                oldPassword: '',
                newPassword1: '',
                newPassword2: '',
            },
            colors: [
                '#FF2020',
                // '#FF8520',
                '#FFB520',
                '#FFD920',
                // '#FFFF20',
                // '#ADF51F',
                '#1CE01C',
                '#18C0C0',
                // '#2C5CCB',
                // '#542ECE',
                // '#8F23CB',
                '#E01C8B',
            ],
            users: [],
            userCount: 0,
            // for page
            currentPage: 1,
            pageCapacity: 5,
        };
    },
    computed: {
        currentUser: function () {
            return Cookies.get('user');
        },
        filteredUser: function () {
            return this.filter ? this.users.filter(item => item['userName'].indexOf(this.filter) >= 0) : this.users;
        },
        pagedUser: function () {
            return this.filteredUser.filter((item, index) =>
                (index >= (this.currentPage - 1) * this.pageCapacity) &&
                (index < this.currentPage * this.pageCapacity) &&
                (index < this.filteredUser.length));
        },
    },
    methods: {
        loadUsers: async function (append = false, delay = 0) {
            if (delay) {
                setTimeout(() => {
                    this.loadUsers();
                }, delay);
                return;
            }
            let lastSort = append && this.users.length ? this.users[this.users.length - 1]['sort'] : [];
            let queryParams = {
                'size': 100,
                // query参数可以省略，此时默认使用match_all
                // 'query': {
                //     'match_all': {}
                // },
                'sort': [
                    {
                        'Data.roles.Admin': {'order': 'desc'},
                        'Data.username.keyword': {'order': 'asc'},
                    }
                ],
                // 'search_after': [searchAfter]
            };
            if (lastSort && lastSort.length) {
                queryParams['search_after'] = lastSort;
            };
            let resp = await Services.Profile.query(JSON.stringify(queryParams));

            if (resp && resp['hits'] && resp['hits']['hits']) {
                this.userCount = resp['hits']['total'];
                let receivedUsers = resp['hits']['hits'].map((hitItem) => {
                    let item = hitItem['_source'];
                    let sort = hitItem['sort'];
                    return {
                        avatar: '',
                        userName: item.Data.username,
                        nickName: item.Data.nickname,
                        email: 'sample@scodi.cn',
                        access: item.Data.permissions,
                        roles: item.Data.roles,
                        active: Boolean(item.Data.actived),
                        sort: sort,
                    };
                });
                this.users = (append ? this.users : []).concat(receivedUsers);
            };
        },
        userOperationFuc: async function (val) {
            let opeType = val.substring(0, val.indexOf('#'));
            let username = val.substring(val.indexOf('#') + 1);
            let user = this.users.find(item => item.userName === username);
            if (user) {
                switch (opeType) {
                    case 'setRoles':
                        let roles = user.roles;
                        let newRoles = {
                            ...roles,
                            Admin: !roles.Admin,
                        };
                        let setRolesResp = await Services.Profile.updateRoles(username, JSON.stringify(newRoles));
                        if (setRolesResp['data']) {
                            // TODO verify resp body, then modify the store data
                        };
                        this.loadUsers(false, 2000);
                        break;
                    case 'resetPassword':
                        this.resetPassword.userName = username;
                        this.resetPassword.visible = true;
                        break;
                    case 'setActiveState':
                        let setActiveStateresp = await Services.Profile.updateStatus(username, !user.active);
                        if (setActiveStateresp['data']) {
                            // TODO verify resp body, then modify the store data
                        };
                        this.loadUsers(false, 2000);
                        break;
                }
            }
        },
        applyResetPwdFunc: async function () {
            // let resp = await Services.
            this.resetPassword.visible = false;
        },
        closeResetPwdFunc: function () {
            this.resetPassword.visible = false;
        },
        pageChange: function () {
            // TODO 普通的分页显示
            // if(this.currentPage) 接近最后几页的时候，获取新的数据
            if (this.users.length < this.userCount) {
                this.loadUsers(true);
            }
        },
        reloadUsers: function () {
            this.loadUsers();
        },
        filterChange: function () {
            this.currentPage = 1;
        },
    },
    created: function () {
        this.loadUsers();
    },
};
</script>
