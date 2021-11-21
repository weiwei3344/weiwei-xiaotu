<template>
  <!-- 顶部通栏 -->
  <NavBar />

  <!-- 头部组件 -->
  <header>头部组件</header>

  <!-- 中间组件 -->
  <div class="container">
    <router-view />
  </div>
  <!-- 底部组件 -->
  <footer>底部组件</footer>
</template>

<script>
import NavBar from '@/components/app-navbar.vue'
export default {
  name: 'Layout',
  components: {
    NavBar
  }
}
</script>

<style lang="less">

.main{
  .hoverShadow();
  color: @weiweiColor;
}
</style>
