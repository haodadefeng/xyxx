<template>
  <div class="left-side">
    <div class="left-side-inner">
      <router-link to="/" class="logo block">
        <img src="./images/logo.png" alt="AdminX">
      </router-link>
      <el-menu
        class="menu-box"
        theme="dark"
        router
        :default-active="$route.path">
        <div
          v-for="(item, index) in nav_menu_data"
          :key="index">
          <el-menu-item
            class="menu-list"
            v-if="typeof item.child === 'undefined'"
            :index="item.path">
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.title" class="text"></span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              :index="sub_item.path"
              :key="sub_index">
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span v-text="sub_item.title" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    name: 'slide',
    data(){
      return {
        nav_menu_data: [
        //   {
        //   title: "主页",
        //   path: "/home",
        //   icon: "fa-home"
        // }, {
        //   title: "表格管理",
        //   path: "/table",
        //   icon: "fa-table",
        //   child: [{
        //     title: "基本表格",
        //     path: "/table/base"
        //   }, {
        //     title: "排序表格",
        //     path: "/table/sort"
        //   }]
        // }, {
        //   title: "图表管理",
        //   path: "/charts",
        //   icon: "fa-bar-chart-o",
        //   child: [{
        //     title: "柱状图表",
        //     path: "/charts/bar"
        //   }]
        // },
        {
          title: "基础信息",
          path: "/base",
          icon: "iconfont icon-jichuxinxi",
          child: [{
            title: "学校管理",
            path: "/base/schoolManagement"
          },{
            title: "年级班级",
            path: "/base/gradeManagement"
          },{
            title: "教师管理",
            path: "/base/teacherManagement"
          },{
            title: "学生管理",
            path: "/base/studentsManagement"
          },{
            title: "教材管理",
            path: "/base/teachingMaterialManagement"
          }]
        },{
          title: "在线练习",
          path: "/OnlineExercise",
          icon: "iconfont icon-lianxi",
          child: [{
            title: "标签管理",
            path: "/OnlineExercise/tagManagement"
          },{
            title: "试题管理",
            path: "/OnlineExercise/ExaminationManagement"
          },{
            title: "在线测试",
            path: "/OnlineExercise/onlineTest"
          },{
            title: "在线作业",
            path: "/OnlineExercise/onlineHomework"
          },{
            title: "在线游戏",
            path: "/OnlineExercise/onlineGames"
          },{
            title: "英雄榜",
            path: "/OnlineExercise/heroesList"
          }]
        },{
          title: "在线商城",
          path: "/shop",
          icon: "iconfont icon-zaixianshangcheng",
          child: [{
            title: "商品管理",
            path: "/shop/shopsManagement"
          },{
            title: "兑换记录",
            path: "/shop/exchangeRecord"
          },{
            title: "订单管理",
            path: "/shop/orderManagement"
          },{
            title: "消费记录",
            path: "/shop/consumption"
          }]
        },{
          title: "统计分析",
          path: "/statistics",
          icon: "iconfont icon-tongjifenxi"
        },{
          title: "广告管理",
          path: "/ADmanagement",
          icon: "iconfont icon-guanggaoguanli"
        },{
          title: "投诉/评论",
          path: "/complaint",
          icon: "iconfont icon-tousu1"
        }]
      }
    }
  }
</script>
