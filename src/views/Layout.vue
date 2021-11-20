<template>
  <!-- 顶部通栏 -->
  <nav>顶部通栏</nav>

  <!-- 头部组件 -->
  <header>头部组件</header>

  <!-- 中间组件 -->
  <div class="main">
    <router-view />
  </div>
  <!-- 底部组件 -->
  <footer>底部组件</footer>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="less">
@import '../assets/styles/mixins';

.main{
  .hoverShadow()
}
</style>
