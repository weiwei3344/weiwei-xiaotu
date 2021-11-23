<template>
  <!-- 顶部通栏 -->
  <NavBar />

  <!-- 头部组件 -->
  <Header />
  <!-- <header>头部组件</header> -->

  <!-- 中间组件 -->
  <div class="container">
    <router-view />
  </div>
  <!-- 底部组件 -->
  <footer>底部组件</footer>

  <button @click="$store.commit('user/setUserInfo', {token: 3344, nickname: 'weiwei3344'})">登录</button>
  <button @click="$store.commit('user/setUserInfo', {})">退出</button>
</template>

<script>
import NavBar from '@/components/app-navbar.vue'
import Header from '@/components/app-header.vue'
export default {
  name: 'Layout',
  components: {
    NavBar,
    Header
  }

  // setup () {
  //   const login = () => {

  //   }
  // }
}
</script>

<style lang="less">

.main{
  .hoverShadow();
  color: @weiweiColor;
}
</style>
