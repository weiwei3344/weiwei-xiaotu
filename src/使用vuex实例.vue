<template>
<div>
  <!-- 假设再app中要使用store中的userName数据 -->
  <!-- 根模块使用store -->
  <p>{{$store.state.userName}}</p>

  <!-- 根模块使用setter -->
  <p>{{$store.getters.newName}}</p>

  <!-- 根模块中使用mutations -->
  <!-- <p>{{$store.commit ('updateName')}}</p> -->

  <!-- 创建一个按钮来使用actions -->
  <button @click="actionsFn">actionsFn</button>

</div>
</template>
<script>
// 导入一个创建仓库实例的方法
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    // 使用方法创建一个仓库实例
    const store = useStore()
    // 再setup中使用store中的数据
    console.log(store.state.userName)
    // 使用mutations
    // store.commit('updateName')

    // 创建一个函数
    const actionsFn = () => {
      store.dispatch('updateName')
    }

    return {
      actionsFn
    }
  }
}
</script>
