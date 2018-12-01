/*
 * updated by pengzhen on 2018/01/11
 * peng_zhen@outlook.com
 * -------------------------------------------------
 * 路由配置文件
 * 配置基础路由，在 App.vue 中根据权限信息, 添加权限配置路由
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: resolve => require([`@src/App.vue`], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require([`@src/Login.vue`], resolve)
    },
    {
      path: '/layout',
      name: 'Layout',
      component: resolve => require([`@src/components/theme/${kindo.config.SYSTEM_THEME}/Layout.vue`], resolve)
    },
    {
      path: '/changeLog',
      name: 'ChangeLog',
      component: resolve => require([`@src/ChangeLog.vue`], resolve)
    }
  ]
})
export default router
