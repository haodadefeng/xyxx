/**
 * Created by zzmhot on 2017/3/23.
 *
 * 路由Map
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:30
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//import components
//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//404
import noPageComponent from 'pages/error/404'
//login
import loginComponent from 'pages/user/login'
//base table
import baseTableComponent from 'pages/table/base'
//sort table
import sortTableComponent from 'pages/table/sort'
//save table
import saveTableComponent from 'pages/table/save'
//bar charts
import barChartsComponent from 'pages/charts/bar'

//基础模块
//学校管理模块
import schoolManagementComponent from 'pages/base/schoolsManagement'
import addSchoolComponent from 'pages/base/schoolsManagement/addSchool'
//年级管理模块
import gradeManagementComponent from 'pages/base/gradeManagement'
//教师管理模块
import teacherManagementComponent from 'pages/base/teacherManagement'
import addTeacherComponent from 'pages/base/teacherManagement/addTeacher'
//学生管理模块
import studentsManagementComponent from 'pages/base/studentsManagement'
//教材管理模块
import teachingMaterialManagementComponent from 'pages/base/teachingMaterialManagement'
import addMeterialComponent from 'pages/base/teachingMaterialManagement/addMaterial'

//在线练习模块
//标签管理
import tagManagementComponent from 'pages/OnlineExercise/tagManagement'
//试题管理模块
import ExaminationManagementComponent from 'pages/OnlineExercise/ExaminationManagement'
//在线测试模块
import onlineTestComponent from 'pages/OnlineExercise/onlineTest'
//在线作业模块
import onlineHomeworkComponent from 'pages/OnlineExercise/onlineHomework'
//在线游戏模块
import onlineGamesComponent from 'pages/OnlineExercise/onlineGames'
//英雄榜模块
import heroesListComponent from 'pages/OnlineExercise/heroesList'

//在线商城
//商品管理
import shopsManagementComponent from 'pages/shop/shopsManagement'
//兑换记录
import exchangeRecordComponent from 'pages/shop/exchangeRecord'
//订单管理
import orderManagementComponent from 'pages/shop/orderManagement'
//消费记录
import consumptionComponent from 'pages/shop/consumption'

//statistics 统计分析模块
import statisticsComponent from 'pages/statistics'
//广告管理模块
import ADmanagementComponent from 'pages/ADmanagement'
//投诉评论模块
import complaintComponent from 'pages/complaint'

Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [{
  path: '/404',
  name: 'notPage',
  component: noPageComponent
}, {
  path: '*',
  redirect: '/404'
}, {
  path: '/user/login',
  name: 'login',
  component: loginComponent
}, {
  path: '/',
  redirect: '/home',
  component: viewPageComponent,
  children: [{
    path: '/home',
    name: 'home',
    component: homeComponent,
    meta: {
      title: "主页",
      auth: true
    }
  }, {
    path: '/table/base',
    name: 'tableBase',
    component: baseTableComponent,
    meta: {
      title: "基本表格",
      auth: true
    }
  }, {
    path: '/table/sort',
    name: 'tableSort',
    component: sortTableComponent,
    meta: {
      title: "排序表格",
      auth: true
    }
  }, {
    path: '/table/update/:id',
    name: 'tableUpdate',
    component: saveTableComponent,
    meta: {
      title: "数据修改",
      auth: true
    }
  }, {
    path: '/table/add',
    name: 'tableAdd',
    component: saveTableComponent,
    meta: {
      title: "添加数据",
      auth: true
    }
  }, {
    path: '/charts/bar',
    name: 'chartsBar',
    component: barChartsComponent,
    meta: {
      title: "柱状图表",
      auth: true
    }
  },{
    path: '/base/schoolManagement',
    name: 'schoolManagement',
    component: schoolManagementComponent,
    meta: {
      title: "学校管理",
      auth: true
    }
  },{
    path: '/base/schoolManagement/options',
    name: 'addSchool',
    component: addSchoolComponent,
    meta: {
      title: "添加学校",
      auth: true
    }
  },{
    path: '/base/gradeManagement',
    name: 'gradeManagement',
    component: gradeManagementComponent,
    meta: {
      title: "年级管理",
      auth: true
    }
  },{
    path: '/base/teacherManagement',
    name: 'teacherManagement',
    component: teacherManagementComponent,
    meta: {
      title: "教师管理",
      auth: true
    }
  },{
    path: '/base/teacherManagement/options',
    name: 'addTeacher',
    component: addTeacherComponent,
    meta: {
      title: "添加教师",
      auth: true
    }
  },{
    path: '/base/studentsManagement',
    name: 'studentsManagement',
    component: studentsManagementComponent,
    meta: {
      title: "学生管理",
      auth: true
    }
  },{
    path: '/base/teachingMaterialManagement',
    name: 'teachingMaterialManagement',
    component: teachingMaterialManagementComponent,
    meta: {
      title: "教材管理",
      auth: true
    }
  },{
    path: '/base/teachingMaterialManagement/options',
    name: 'addMeterial',
    component: addMeterialComponent,
    meta: {
      title: "添加教材",
      auth: true
    }
  },{
    path: '/OnlineExercise/tagManagement',
    name: 'tagManagement',
    component: tagManagementComponent,
    meta: {
      title: "标签管理",
      auth: true
    }
  },{
    path: '/OnlineExercise/ExaminationManagement',
    name: 'ExaminationManagement',
    component: ExaminationManagementComponent,
    meta: {
      title: "试题管理",
      auth: true
    }
  },{
    path: '/OnlineExercise/onlineTest',
    name: 'onlineTest',
    component: onlineTestComponent,
    meta: {
      title: "在线测试",
      auth: true
    }
  },{
    path: '/OnlineExercise/onlineHomework',
    name: 'onlineHomework',
    component: onlineHomeworkComponent,
    meta: {
      title: "在线作业",
      auth: true
    }
  },{
    path: '/OnlineExercise/onlineGames',
    name: 'onlineGames',
    component: onlineGamesComponent,
    meta: {
      title: "在线游戏",
      auth: true
    }
  },{
    path: '/OnlineExercise/heroesList',
    name: 'heroesList',
    component: heroesListComponent,
    meta: {
      title: "英雄榜",
      auth: true
    }
  },{
    path: '/shop/shopsManagement',
    name: 'shopsManagement',
    component: shopsManagementComponent,
    meta: {
      title: "商品管理",
      auth: true
    }
  },{
    path: '/shop/exchangeRecord',
    name: 'exchangeRecord',
    component: exchangeRecordComponent,
    meta: {
      title: "兑换记录",
      auth: true
    }
  },{
    path: '/shop/orderManagement',
    name: 'orderManagement',
    component: orderManagementComponent,
    meta: {
      title: "订单管理",
      auth: true
    }
  },{
    path: '/shop/consumption',
    name: 'consumption',
    component: consumptionComponent,
    meta: {
      title: "消费记录",
      auth: true
    }
  },{
    path: '/statistics',
    name: 'statistics',
    component: statisticsComponent,
    meta: {
      title: "统计分析",
      auth: true
    }
  },{
    path: '/ADmanagement',
    name: 'ADmanagement',
    component: ADmanagementComponent,
    meta: {
      title: "广告管理",
      auth: true
    }
  },,{
    path: '/complaint',
    name: 'complaint',
    component: complaintComponent,
    meta: {
      title: "投诉/评论",
      auth: true
    }
  }]
}]

const router = new VueRouter({
  routes,
  mode: 'history', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start()
  let toName = to.name
  // let fromName = from.name
  let is_login = store.state.user_info.login

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
