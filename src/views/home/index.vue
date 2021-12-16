<template>
  <!-- 里面组要内容 -->
    <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
    <!-- 需要两个组件 -->
    <!-- 第一个是左侧分类部分 -->
    <HomeCategory />
    <!-- 第二个是整个的广告区域部分 -->
    <HomeBanner />
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew />

  <!-- 人气推荐 -->
  <HomeHot />

  <!-- 热门品牌 -->
  <HomeBrand />

  <!-- 商品区域 -->
  <HomeProduct />

  <!-- vue动画 -->
  <!-- <button @click="show = true">显示</button>
  <button @click="show = false">隐藏</button>
  <Transition>
    <div v-if="show" style="width: 100px; background: red"></div>
  </Transition>
  <Transition name="weiwei">
    <div v-if="show" style="width: 100px;"></div>
  </Transition> -->
</template>

<script>
// 引入左侧分类组件
import HomeCategory from './components/home-category.vue'
// 引入轮播图组件
import HomeBanner from './components/home-banner.vue'
// 引入新鲜好物组件
import HomeNew from './components/home-new.vue'
// 引入人气推荐组件
import HomeHot from './components/home-hot.vue'
// import { ref } from '@vue/reactivity'
// 引入热门品牌组件
import HomeBrand from './components/home-brand.vue'
// 引入商品区域组件
import HomeProduct from './components/home-product.vue'

export default {
  name: 'Home',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct
  }

  // setup () {
  //   const show = ref(true)

  //   return {
  //     show
  //   }
  // }
}
</script>

<style lang="less" scoped>
// vue2 进入动画 v-enter v-enter-active v-enter-to
// vue2 离开动画 v-leave v-leave-active v-leave-to

// vue3 进入动画 v-enter-from v-enter-active v-enter-to
// vue3 离开动画 v-leave-from v-leave-active v-leave
// .v-enter-from{
//   opacity: 0;
//   height: 0;
// }

// .v-enter-active{
//   transition: all 2s;
// }

// .v-enter-to{
//   opacity: 1;
//   height: 100px;
// }
// .wiewei-enter-from{
//   opacity: 0;
//   height: 0;
// }

// .weiwei-enter-active{
//   transition: all 2s;
// }

// .weiwei-enter-to{
//   opacity: 1;
//   height: 100px;
//   background: pink;
// }

// 若需要多个动画效果，则可以在transition上加name属性，假设为weiwei
// 则css样式就变化为
// 进入动画 weiwie-enter-from weiwei-enter-active weiwei-enter-to
// 离开动画 weiwei-leave-from weiwei-leave-active weiwie-leave

</style>
