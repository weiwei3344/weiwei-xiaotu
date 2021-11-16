<template>
  <div>
    <!-- 测试没有使用持久化的时候能不能保存信息 -->
    <!-- 经过测试，只要一刷新页面，就会失去数据 -->
    <!-- 所有需要引入一个工具用来持久化 -->
    <!-- {{$store.state.user.profile.nickname}}
    <button @click="$store.commit('user/setUserInfo', {nickname: 'weiwei'})">修改用户信息</button> -->
    <!-- 需要借助插件来实现vuex的持久化 vuex-persistedstate -->

    <!-- 测试请求工具 -->
    <!-- 创建一个button，点击后进行发送请求 -->
    <button @click="fn">测试request请求工具</button>

  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'App',
  setup () {
    const fn = () => {
      request('/member/profile', 'get')
    }
    return fn
  }
}
</script>

<style>

</style>
