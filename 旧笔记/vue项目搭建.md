## 配置文件

```js
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
}) 
//挂载router,store
```



## 请求文件

```js
import axios from "axios";

const service = axios.create({
  // 配置基准路径,最终url=baseURL+接口url
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000, // 延时器,5秒不触发就报错
});

//暴露实例
export default service;
```



## vuex文件搭建

**store/index.js----创建store并导出**

```js
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission
  },
  getters
})

export default store
```



**store/modules/xxx.js-----配置各组件数据**

```js
const state = {}
const mutations = {}
const actions = {}

//导出
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```



**store/getter---->提取数据**

```js
const getters = {
  token: state => state.user.token,
}

//导出
export default getters
```



## 路由搭建

**router/modules-----配置各组件路由**

```js
import Layout from '@/layout'
//例如departments组件
export default {
  path: '/departments',    //表示跳转的url
  name: 'departments',     //表示导出的名字
  component: Layout,      //表示跳去的地方
  hidden: true,           //表示隐藏
  children: [
    {
      path: '',    //不需要再由url
      component: () => import('@/views/departments/index'),  //真正跳转的网页
      meta: { title: '部门', icon: 'tree' }   //设置名字和icon
    }
  ]
}
```



**router/index----配置函数**

```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import departmentsRouter from './modules/departments'

//配置静态路由----必然出现的路由---导出
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
//把引入的路由写上即可
  departmentsRouter
]

//配置动态路由-----按权限出现的路由---导出
export const asyncRoutes = [
  employeesRouter,
  permissionRouter,
]

//创建路由实例
const createRouter = () => new Router({
  mode: 'history', // 表示history路由模式
  base: 'admin',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes    //挂载路由
})

export default router   ///导出路由
```



**动态路由**

```js
1.在router/modules中给每个路由页面添加name属性,动态路由的数据最终集成到vuex里面

2.store/modules/perssion中收集数据
//引入两个路由列表
import { asyncRoutes, constantRoutes } from '@/router'

const state = {
  routes: []   //得到了最终路由
}
const mutations = {
  setRoutes(state, data) {    //合并两个路由
    state.routes = [
      ...constantRoutes,
      ...data
    ]
  }
}
const actions = {
  filterRoutes(store, menus) {
    // asyncRoutes是动态路由数组,menus是外部传过来的,是登录者的权限数组
    //现在要menus数组赋值给动态路由数组
    const routes = asyncRoutes.filter(route => {
      return menus.includes(route.name)
    })
 //把动态路由和静态路由合并
    store.commit('setRoutes', routes)
//得到'路由过滤结果', routes,并返回,导航守卫里面调用action时,希望得到这个数据
    return routes
  }
}

```



**登录前就要取得动态路由----导航守卫里写**

```js
if (token && url !== '/login') {
    //获取登陆者的权限数组,并调用action和传值
      const menus = store.state.user.profile.roles.menus
    //返回了动态路由数组
      const res = await store.dispatch('permission/filterRoutes', menus)
      // 添加路由的方法---router.addRoutes
      router.addRoutes([
        ...res,
        // 因为单纯的刷新不会经过导航守卫,所以会直接在静态路由里找界面
        //而静态路由没有动态的页面,就会导致404,所以要把404放这里
        { path: '*', redirect: '/404', hidden: true }
      ])
    //因为追加动态路由之前,next已经生效了,所以去的是空白页
    //所以要在追加之后自己跳转
      return next(to.path)
    }
    next()
  }
```



**路由菜单的显示**---layout

```js
 routes() {
     //用最新的 routes 渲染
      return this.$store.state.permission.routes
    },
```



**挂载点**

```js
 <router-view></router-view>
```

