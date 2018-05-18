<style lang="less">
    @import './style.less';
</style>

<template>
    <div style="height:100%;padding:20px;">
        <Row style="height:60px;">
            <div style="display:flex;justify-content:space-between;">
                <div style="font-size:24px;line-height:32px;">四川交通设计院BIM中心·设计协同交付系统</div>
                <div style="display:flex;justify-content:flex-end;">
                    <Dropdown transfer @on-click="usersDropDownClick">
                        <a href="javascript:void(0)">
                            <span style="margin-left:8px;font-size:16px;line-height:24px;">{{ currentUser }}</span>
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="manageUsers">用户管理</DropdownItem>
                            <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Avatar icon="person" size="small" style="margin-left:5px;"></Avatar>
                </div>
            </div>
        </Row>
        <Row style="height:calc( 100% - 60px );">
            <Col span="20" style="height:100%;">
                <Row style="height:45px;padding:0 2px;">
                    <Col span="18" style="display:flex;">
                        <Button type="ghost" size="small" style="width:60px;" @click="sortDate">日期 <Icon :type="dateSort==='asc'?'arrow-up-b':'arrow-down-b'"></Icon></Button>
                        <Button type="ghost" size="small" style="width:60px;margin-left:5px;" @click="sortName">名称 <Icon :type="nameSort==='asc'?'arrow-up-b':'arrow-down-b'"></Icon></Button>
                        <Button type="ghost" size="small" style="width:60px;margin-left:5px;" @click="sortAuthor">作者 <Icon :type="authorSort==='asc'?'arrow-up-b':'arrow-down-b'"></Icon></Button>
                        <span>
                            <Input v-model="filter" size="small" style="width:160px;margin-left:5px;">
                                <Button slot="append" icon="ios-search" size="small"></Button>
                            </Input>
                        </span>
                        <Button type="info" size="small" style="width:60px;margin-left:15px;" @click="loadProjects"><Icon type="refresh"></Icon> 刷新</Button>
                    </Col>
                    <Col span="6" style="display:flex;justify-content:flex-end;">
                        <Button type="ghost" size="small" icon="plus" style="width:88px;" @click="addProject">新增项目</Button>
                        <Button type="ghost" size="small" icon="plus" style="width:88px;margin-left:5px;" disabled>新建分组</Button>
                        <ButtonGroup style="margin-left:5px;">
                            <Button disabled type="ghost" icon="android-apps" size="small"></Button>
                            <Button disabled type="ghost" icon="android-list" size="small"></Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row style="overflow-y:auto;padding:16px 0 0 16px;background-color:#eee;height:calc( 100% - 45px );display:flex;justify-content:flex-start;flex-wrap:wrap;align-content:flex-start;">
                    <Card
                        style="height:200px;width:200px;margin: 0 10px 10px 0;"
                        v-for="item in filterdProjects"
                        :key="item.id">
                        <h4 slot="title">{{item.title}}</h4>
                        <div
                        @mouseover="mouseverHander(item.id)"
                        @mouseout="mouseoutHander"
                        style="display:flex;flex-direction:column;height:123px;justify-content:space-between;">
                            <p>{{item.desc}}</p>
                            <div :style="{display:mouseoverId!==item.id?'flex':'none', flexDirection:'column', alignItems:'flex-end'}">
                                <p style="color:#999;font-size:8px;">
                                    {{ item.author }}
                                </p>
                                <p style="color:#999;font-size:8px;">
                                    {{ formatTime(item.time) }}
                                </p>
                            </div>
                            <div :style="{display:mouseoverId===item.id?'flex':'none', justifyContent:'flex-end'}">
                                <Poptip
                                    confirm
                                    title="确认删除该项目吗？"
                                    @on-ok="deleteProject(item.id)">
                                    <Button type="error" size="small">删除</Button>
                                </Poptip>
                                <Button type="success" @click="enterProject(item.id, item.title)" size="small" style="margin-left:5px;">打开</Button>
                            </div>
                        </div>
                    </Card>
                </Row>
            </Col>
            <Col span="4">
                <Row style="height:45px;">
                    <div style="padding:16px 0 0 16px;display:inline-flex;color:#666;">
                        <Icon type="ios-information-outline" size="24"></Icon>
                        <h4 style="color:#333;line-height:24px;font-size:16px;margin-left:5px;">信息</h4>
                    </div>
                </Row>
                <Row style="padding:16px 0 0 16px;">
                    <span style="color:#777;">点击项目查看基本信息。</span>
                </Row>
            </Col>
        </Row>
        <Modal
        :styles="{minWidth:'800px'}"
        :closable="false"
        :mask-closable="false"
        :scrollable="true"
        v-model="userManagementVisible">
            <h4 slot="header">用户管理</h4>
            <user-management></user-management>
            <div slot="footer">
                <Button type="primary" @click="hideManageUser">关闭</Button>
            </div>
        </Modal>
        <Modal
        title="添加项目"
        :styles="{minWidth:'480px'}"
        :closable="false"
        :mask-closable="false"
        :scrollable="true"
        v-model="newProjectVisible">
            <new-project :save="saveNewProject" :closeFunc="hideNewProject"></new-project>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import Services from 'src/services';
import UserManagement from './user-management';
import ActionType from 'src/config/action-type';
import NewProject from './new-project';
import Cookies from 'js-cookie';
const moment = require('moment');

export default {
    name: 'Console',
    components: {
        UserManagement,
        NewProject,
    },
    data () {
        return {
            filter: '',
            dateSort: 'asc',
            nameSort: 'asc',
            authorSort: 'asc',
            userManagementVisible: false,
            newProjectVisible: false,
            mouseoverId: '',
            projects: [],
            projectCount: 0,
        };
    },
    computed: {
        filterdProjects: function () {
            return this.filter ? this.projects.filter(item => item.title.indexOf(this.filter) >= 0) : this.projects;
        },
        currentUser: function () {
            return Cookies.get('user');
        },
    },
    methods: {
        enterProject (id, title) {
            Cookies.set('projectName', title);
            Cookies.set('project', id);
            this.$store.commit(ActionType.ResetStoreData);

            this.$router.push({
                name: 'home_index'
            });
        },
        deleteProject (val) {
            Services.Project.delete(val).then(() => {
                this.loadProjects(2000);
            });
        },
        formatTime (val) {
            return moment(val).format('YYYY-MM-DD H:mm');
        },
        addProject () {
            this.newProjectVisible = true;
        },
        hideNewProject () {
            this.newProjectVisible = false;
        },
        mouseverHander (val) {
            this.mouseoverId = val;
        },
        mouseoutHander () {
            this.mouseoverId = '';
        },
        showManageUser () {
            this.userManagementVisible = true;
        },
        hideManageUser () {
            this.userManagementVisible = false;
        },
        sortDate () {
            let sortFunc = this.dateSort === 'asc'
                ? (a, b) => (moment(b.time).valueOf() - moment(a.time).valueOf())
                : (a, b) => (moment(a.time).valueOf() - moment(b.time).valueOf());
            this.dateSort = this.dateSort === 'asc' ? 'desc' : 'asc';
            this.projects.sort(sortFunc);
        },
        sortName () {
            let sortFunc = this.nameSort === 'asc'
                ? (a, b) => (a.title < b.title)
                : (a, b) => (a.title > b.title);
            this.nameSort = this.nameSort === 'asc' ? 'desc' : 'asc';
            this.projects.sort(sortFunc);
        },
        sortAuthor () {
            let sortFunc = this.authorSort === 'asc'
                ? (a, b) => (a.author < b.author)
                : (a, b) => (a.author > b.author);
            this.authorSort = this.authorSort === 'asc' ? 'desc' : 'asc';
            this.projects.sort(sortFunc);
        },
        loadProjects: async function (delay = 0) {
            if (delay) {
                setTimeout(() => {
                    this.loadProjects();
                }, delay);
                return;
            }
            let resp = await Services.Project.query();
            if (resp && resp['hits'] && resp['hits']['hits']) {
                this.projectCount = resp['hits']['total'];
                this.projects = resp['hits']['hits'].map((hitItem) => {
                    let item = hitItem['_source'];
                    return {
                        title: item.Data.name,
                        desc: item.Data.desc,
                        id: item.ID,
                        time: item.Timestamp,
                        author: item.Data.creator,
                    };
                });
            }
        },
        saveNewProject: async function (name, creator, desc) {
            this.hideNewProject();
            let resp = await Services.Project.add(name, creator, desc);
            if (resp['data']) {
                this.loadProjects(2000);
            } else {
                resp['message'] && alert(resp['message']);
                !resp['message'] && alert(JSON.stringify(resp));
            }
        },
        usersDropDownClick: function (name) {
            switch (name) {
                case 'manageUsers':
                    this.showManageUser();
                    break;
                case 'loginout':
                    // 退出登录
                    Cookies.remove('user');
                    Cookies.remove('password');
                    Cookies.remove('hasGreet');
                    Cookies.remove('access');
                    this.$Notice.close('greeting');
                    this.$store.commit('clearOpenedSubmenu');
                    // 恢复默认样式
                    let themeLink = document.querySelector('link[name="theme"]');
                    themeLink.setAttribute('href', '');
                    // 清空打开的页面等数据，但是保存主题数据
                    let theme = '';
                    if (localStorage.theme) {
                        theme = localStorage.theme;
                    }
                    localStorage.clear();
                    if (theme) {
                        localStorage.theme = theme;
                    }
                    this.$router.push({
                        name: 'login'
                    });
                    break;
            };
        },
    },
    created: function () {
        Cookies.set('projectName', '');
        Cookies.set('project', '');
        this.loadProjects();
        this.$store.commit(ActionType.ResetStoreData);
    },
};
</script>
