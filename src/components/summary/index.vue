<style lang="less">
    @import "./index.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row>
            <Col span="8">
                <Row>
                    <Card>
                        <Row type="flex" class="user-infor">
                            <Col span="24" style="padding-left:6px;">
                                <Row class-name="made-child-con-middle" type="flex" align="middle">
                                    <div>
                                        <b class="card-user-infor-name">{{projectName}}</b>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <div class="line-gray"></div>
                        <Row style="margin-top:16px;">
                            <Steps :current="1">
                                <Step title="立项" content="XXXX年XX月XX日"></Step>
                                <Step title="开发" content="XXXX年XX月XX日"></Step>
                                <Step title="测试" content="XXXX年XX月XX日"></Step>
                                <Step title="上线" content="XXXX年XX月XX日"></Step>
                            </Steps>
                        </Row>
                    </Card>
                </Row>
                <Row class="margin-top-10">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="android-bookmark"></Icon>
                            公告栏
                        </p>
                        <div class="to-do-list-con">
                            <div v-for="(item, index) in toDoList" :key="index" class="to-do-item">
                                <to-do-list-item :content="item.title"></to-do-list-item>
                            </div>
                        </div>
                    </Card>
                </Row>
            </Col>
            <Col span="16" class-name="padding-left-5">
                <Row>
                    <Col span="6">
                        <infor-card
                            id-name="user_created_count"
                            :end-val="count.createUser"
                            iconType="map"
                            color="#2d8cf0"
                            intro-text="总里程数"
                            suffix=" 公里"
                        ></infor-card>
                    </Col>
                    <Col span="6" class-name="padding-left-5">
                        <infor-card
                            id-name="visit_count"
                            :end-val="count.visit"
                            iconType="arrow-graph-up-right"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="桥梁"
                            suffix=" 座"
                        ></infor-card>
                    </Col>
                    <Col span="6" class-name="padding-left-5">
                        <infor-card
                            id-name="collection_count"
                            :end-val="count.collection"
                            iconType="stats-bars"
                            color="#ffd572"
                            intro-text="隧道"
                            suffix=" 座"
                        ></infor-card>
                    </Col>
                    <Col span="6" class-name="padding-left-5">
                        <infor-card
                            id-name="transfer_count"
                            :end-val="count.transfer"
                            iconType="pie-graph"
                            color="#f25e43"
                            intro-text="桥隧比"
                            suffix=" %"
                        ></infor-card>
                    </Col>
                </Row>
                <Row class="margin-top-10">
                    <Card :padding="0">
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            任务完成进度
                        </p>
                        <div style="height:266px;">
                            <visite-volume></visite-volume>
                        </div>
                    </Card>
                </Row>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Col span="8">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="map"></Icon>
                        访问来源IP分布
                    </p>
                    <div class="map-con">
                        <Col span="10">
                            <map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
                        </Col>
                        <Col span="14" class="map-incon">
                            <Row type="flex" justify="center" align="middle">
                                <home-map :city-data="cityData"></home-map>
                            </Row>
                        </Col>
                    </div>
                </Card>
            </Col>
            <Col span="8" class="padding-left-10">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        API接口访问统计
                    </p>
                    <div style="height:305px;">
                        <data-source-pie></data-source-pie>
                    </div>
                </Card>
            </Col>
            <Col span="8" class="padding-left-10">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-wifi"></Icon>
                        服务器资源占用情况
                    </p>
                    <div style="height:305px;">
                        <user-flow></user-flow>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import cityData from './map-data/get-city-value.js';
import homeMap from './map.vue';
import dataSourcePie from './dataSourcePie.vue';
import visiteVolume from './visiteVolume.vue';
import serviceRequests from './serviceRequests.vue';
import userFlow from './userFlow.vue';
import countUp from './countUp.vue';
import inforCard from './inforCard.vue';
import mapDataTable from './mapDataTable.vue';
import toDoListItem from './toDoListItem.vue';
import Cookies from 'js-cookie';

export default {
    name: 'home',
    components: {
        homeMap,
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        userFlow,
        countUp,
        inforCard,
        mapDataTable,
        toDoListItem
    },
    data () {
        return {
            toDoList: [
                {
                    title: '关于API接口的参数说明'
                },
                {
                    title: '在桥梁模型生成中的几点注意事项'
                },
                {
                    title: '模型轻量化的一般方法'
                },
                {
                    title: '交付系统用户使用手册'
                },
                {
                    title: '系统维护通知'
                }
            ],
            count: {
                createUser: 157,
                visit: 280,
                collection: 12,
                transfer: 78
            },
            cityData: cityData,
            showAddNewTodo: false,
            newToDoItemValue: ''
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        },
        projectName () {
            return Cookies.get('projectName');
        },
    },
    methods: {
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        }
    }
};
</script>
