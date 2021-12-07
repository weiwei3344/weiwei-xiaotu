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
</template>

<script>
// 引入左侧分类组件
import HomeCategory from './components/home-category.vue'
// 引入轮播图组件
import HomeBanner from './components/home-banner.vue'
// 引入新鲜好物组件
import HomeNew from './components/home-new.vue'

export default {
  name: 'Home',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew
  }
}
</script>

<style lang="less" scoped>
</style>
