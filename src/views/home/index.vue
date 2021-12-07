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
  <HomePanel title="新鲜好物" subTitle="新鲜出炉，品质可靠">
    <template #right><WeiweiMore path="/sub" />
      <HomePanel />
    </template>
  </HomePanel>
  <!-- 面板内容 -->
  <!-- 人气推荐 -->
</template>

<script>
// 引入左侧分类组件
import HomeCategory from './components/home-category.vue'
// 引入轮播图组件
import HomeBanner from './components/home-banner.vue'
// 测试面板封装组件
import HomePanel from './components/home-panel.vue'

export default {
  name: 'Home',
  components: {
    HomeCategory,
    HomeBanner,
    HomePanel
  }
}
</script>

<style lang="less" scoped>
</style>
