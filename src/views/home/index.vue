<template>
  <!-- 里面组要内容 -->
  <div class="container">
    <!-- 首页入口 -->
    <div class="home-entry">
    <!-- 需要两个组件 -->
    <!-- 第一个是左侧分类部分 -->
    <HomeCategory />
    <!-- 第二个是整个的广告区域部分 -->
    </div>
  </div>
</template>

<script>
// 引入左侧分类组件
import HomeCategory from './components/home-category.vue'
export default {
  name: 'Home',
  components: {
    HomeCategory
  }
}
</script>

<style lang="less" scoped>
</style>
