import { createRouter, createWebHashHistory } from 'vue-router'

// 使用路由懒加载；原理，通过webpack打包后的js文件，只要当需要用到这个路由的时候，才会从js文件中加载
const Layout = () => import('@/views/Layout')
const HomePage = () => import('@/views/home')
// 引入分类模块
const TopCategory = () => import('@/views/category/index')
// 引入二级分类子目录、
const SubCategory = () => import('@/views/category/sub.vue')

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({}) 创建路由实例
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: HomePage
      },

      // 分类模块
      {
        path: '/category/:id',
        component: TopCategory
      },

      // 二级分类子目录
      {
        path: '/category/sub/:id',
        component: SubCategory

      }
    ]
  }
]

const router = createRouter({
  // 使用hash的路由模式
  history: createWebHashHistory(),
  routes,
  // scrollBehavior
  // 当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。
  scrollBehavior () {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
