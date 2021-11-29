<template>
  <!-- <div class="app-header-sticky":class="{show: isShow}"> -->
  <div class="app-header-sticky" :class="{show: y >= 78}">
    <div class="container" v-show="y >= 78">
      <Router-link class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <Router-link to="/">品牌</Router-link>
        <Router-link to="/">专题</Router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderNav from '@/components/app-header-nav.vue'
// 导入需要用到的工具函数
import { useWindowScroll } from '@vueuse/core'

export default {
  name: 'AppHeaderSticky',
  components: {
    AppHeaderNav
  },

  // 使用传统API实现监听
  // setup () {
  //   const isShow = ref(false)
  //   // 浏览器绑定滚动事件
  //   window.onscroll = () => {
  //     // 获取文档滚动了多少
  //     const scrollTop = document.documentElement.scrollTop
  //     console.log(scrollTop)
  //     // 文档滚动到78px的时候，显示吸顶，否则隐藏
  //     if (scrollTop >= 78) {
  //       isShow.value = true
  //     } else {
  //       isShow.value = false
  //     }
  //   }

  //   return {
  //     isShow
  //   }
  // }

  // 使用组合API实现吸顶导航
  setup () {
    // 获取屏幕滚动y的值
    const { y } = useWindowScroll()

    // 返回给模板使用
    return {
      y
    }
  }
}
</script>

<style lang="less" scoped>
// 总体样式
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;

  // 会到默认吸顶位置完全显示
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transition: all .3s linear;
    transform: translateY(0);
    opacity: 1;
  }

  // 布局样式
  .container {
    display: flex;
    align-items: center;
  }

  // logo样式
  .logo {
    width: 200px;
    height: 80px;
    background: url(~@/assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    padding-left: 40px;
    border-left: 2px solid @weiweiColor;
    a{
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover{
        color: @weiweiColor
      }
    }
  }
}
</style>
