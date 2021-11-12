<template>
  <div>
    <!-- 模块A空间使用state数据 -->
    <p>{{ $store.state.modulesA.userName }}</p>
    <!-- 模块A空间使用getter数据 -->
    <p>{{ $store.getters.newName }}</p>
    <!-- 假设还有一个模块C也是使用同样的名字，那么会执行哪一个模块
      控制台会报错，但是不影响输出：duplicate getter key: newName
      调用哪个函数是看哪个函数所在的模块先被引用，就执行哪个模块下的函数
      <p>{{$store.getters.newName}}</p> -->

    <!-- 模块B空间使用state数据 -->
    <p>{{ $store.state.modulesB.userName }}</p>
    <!-- 模块B空间使用getter数据 -->
    <p>{{ $store.getters["modulesB/newName"] }}</p>
    <!-- 模块B空间使用mutations数据 -->
    <button @click="mutationFn">mutationFn</button>
    <!-- 模块B空间使用actions数据 -->
    <button @click="actionsFn">actionsFn</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    const store = useStore()

    const mutationFn = () => {
      store.commit('modulesB/updateName')
    }

    const actionsFn = () => {
      store.dispatch('modulesB/updateName')
    }

    return {
      mutationFn,
      actionsFn
    }
  }
}
</script>
