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
// 导入轮播图组件
import WeiweiCarousel from './weiwei-carousel.vue'
// 导入查看更多组件
import WeiweiMore from './weiwei-more.vue'
// 导入面包屑组件
import WeiweiBread from './weiwei-bread.vue'
// 导入面包屑第二级组件
import WeiweiBreadItem from './weiwei-bread-item.vue'
// 导入复选框组件
import WeiweiCheckbox from './weiwei-checkbox.vue'
// 导入默认图片
import defaultImg from '@/assets/images/200.png'

// 导出一个函数
export default {
  // install写法以后是提供给app.use安装组件库用的
  install (app) {
    // 在app上进行扩展，app提供component，di'rective 函数
    // 如果要挂载原型 app.config.globalProperties方式
    // 注册骨架屏组件
    app.component(WeiweiSkeleton.name, WeiweiSkeleton)
    // 注册轮播图组件
    app.component(WeiweiCarousel.name, WeiweiCarousel)
    // 注册查看更多组件
    app.component(WeiweiMore.name, WeiweiMore)
    // 注册面包屑组件
    app.component(WeiweiBread.name, WeiweiBread)
    // 注册面包屑二级组件
    app.component(WeiweiBreadItem.name, WeiweiBreadItem)
    // 注册复选框组件
    app.component(WeiweiCheckbox.name, WeiweiCheckbox)

    // 定义指令
    defineDirective(app)
  }
}

// 定义指令
const defineDirective = (app) => {
  // 首先要定义图片懒加载指令， 这里定义为v-lazy
  // 这里使用图片懒加载的原理：先存储图片地址不能在scr上显示，当图片进入可视区，将存储的图片地址设置给图片元素
  app.directive('lazyload', {
    // 这里需要知道DOM元素是否创建好
    // vue 2.0 监听指令的DOM是否创建好  ，使用钩子函数：inserted
    // vue 3.0 的指令拥有的钩子函数和组件一样，使用指令的DOM是否创建好，钩子函数：mounted

    // 有两个元素，一个是观察传进来的元素，另外一个是传入进来的值
    mounted (el, binding) {
      // 创建一个观察对象，来观察当前使用指令的元素
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        // 判断是否进入可视区
        if (isIntersecting) {
          // 测试
          // console.log('进入可视区')
          // 停止观察
          observer.unobserve(el)
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        // 设置为一进入可视区就直接加载
        threshold: 0.01
      })
      observer.observe(el)
    }
  })
}

/**
 * 上述代码中讲到观察对象，
 * IntersectionObserver 是一个webAPI
 * 创建观察对象实例
 * const observer = new IntersectionObserver(callback[, options])
 * callback被观察dom进入可视区离开可视区都会触发
 * - 两个回调参数，entries，observer
 * - entries被观察的元素信息对象的数组[{元素信息}， {}]，信息中isIntersecting判断进入或者离开
 * - observer就是观察实例
 * options 配置参数
 * - 三个配置属性 root rootMargin threshold
 * - root 基于的滚动容器，默认是document
 * - rootMargin 容器有没有外边距
 * threshold 相交的比例
 * 实例提供两个方法
 * observer(dom) 开始观察哪个dom
 * unonserver(dom) 停止观察哪个dom
 */
