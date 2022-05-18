import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
let constantRoutes = [
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/homePage/index'),
    hidden: true
  },
  {
    path: '/compareSchool',
    name: 'compareSchool',
    component: () => import('@/views/compareSchool/index'),
    hidden: true
  },
  {
    path: '/schoolDetails',
    name: 'schoolDetails',
    component: () => import('@/views/schoolDetails/index'),
    hidden: true
  },
  {
    path: '/collegeExpert',
    name: 'collegeExpert',
    component: () => import('@/views/collegeExpert/index'),
    meta: {
      title: '高考专家'
    },
    hidden: true
  },
  {
    path: '/teacherDetail',
    name: 'teacherDetail',
    component: () => import('@/views/teacherDetail/index'),
    meta: {
      title: '专家详情'
    },
    hidden: true
  },
  {
    path: '/schoolLeagueTable',
    name: 'schoolLeagueTable',
    component: () => import('@/views/schoolLeagueTable/index'),
    meta: {
      title: '学校排行榜'
    },
    hidden: true
  },
  {
    path: '/searchMajor',
    name: 'searchMajor',
    component: () => import('@/views/searchMajor/index'),
    meta: {
      title: '查专业'
    },
    hidden: true
  },
  {
    path: '/batchLine',
    name: 'batchLine',
    component: () => import('@/views/batchLine/index'),
    meta: {
      title: '批次线'
    },
    hidden: true
  },
  {
    path: '/subjectAssessment',
    name: 'subjectAssessment',
    component: () => import('@/views/batchLine/subjectAssessment'),
    meta: {
      title: '学科评估'
    },
    hidden: true
  },
  {
    path: '/scoreTable',
    name: 'scoreTable',
    component: () => import('@/views/batchLine/scoreTable'),
    meta: {
      title: '一分一段表'
    },
    hidden: true
  },
  {
    path: '/majorDetails',
    name: 'majorDetails',
    component: () => import('@/views/majorDetails/index'),
    meta: {
      title: '专业详情'
    },
    hidden: true
  },
  {
    path: '/userCenter',
    name: 'userCenter',
    component: () => import('@/views/userCenter/index'),
    meta: {
      title: '个人中心'
    },
    hidden: true,
    children: [
      {
        path: '/userMeans',                     //我的资料
        component: () => import('@/views/userCenter/userMeans'),
        meta: {
          title: '我的资料'
        }
      },
      {
        path: '/changePassword',                     //修改密码
        component: () => import('@/views/userCenter/changePassword'),
        meta: {
          title: '修改密码'
        }
      },

      
    ]
  },
  
  // {
  //   path: '/',
  //   children: [{
  //     path: 'index',
  //     name: 'index',
  //     component: () => import('@/views/homePage/index'),
  //     meta: { title: '学为高考志愿' }
  //   }]
  // },
  // {
  //   path: '/',
  //   children: [{
  //     path: 'compareSchool',
  //     name: 'compareSchool',
  //     component: () => import('@/views/compareSchool/index'),
  //     meta: { title: '学为高考志愿' }
  //   }]
  // },
  // {
  //   path: '/index',
  //   component: Layout,
  //   redirect: '/index',
  //   name: 'index',
  //   meta: { title: '用户管理' },
  //   children: [
  //     {
  //       path: 'accountManage',
  //       name: 'accountManage',
  //       component: () => import('@/views/powerManage/account/index'),
  //       meta: { title: '用户管理' }
  //     }
  //   ]
  // },
  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
    const createRouter = () => new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes 
      })
      const router = createRouter()
export default router
