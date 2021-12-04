// 自定义插件ui入口文件

// 插件：扩展vue原有的功能：全局组件。自定义指令，挂载原型方法，注意 Vue3没有全局过滤器
/**
 * Vue2 全局注册组件
 * Vue.component('组件名字', 组件)
 * Vue3 全局注册组件
 * app.component('组件名', 组件)
 */

// 导入需要的类
import WeiweiSkeleton from './weiwei-skeleton'

// 导出一个函数
export default {
  // install写法以后是提供给app.use安装组件库用的
  install (app) {
    app.component(WeiweiSkeleton.name, WeiweiSkeleton)
  }
}
