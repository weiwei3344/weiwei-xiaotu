<template>
  <WeiweiBread >
    <WeiweiBreadItem to="/">首页</WeiweiBreadItem>
    <transition name="fade-right" mode="out-in">
      <WeiweiBreadItem v-if="category.top" :key="category.top.id">{{category.top.name}}</WeiweiBreadItem>
    </transition>
    <transition name="fade-right" mode="out-in">
      <WeiweiBreadItem v-if="category.sub" :key="category.sub.id">{{category.sub.name}}</WeiweiBreadItem>
    </transition>
  </WeiweiBread>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'SubBread',
  setup () {
    // 通过计算属性从vuex中获取顶级类目和二级类目
    // 对象： { top: { id, name }, sub: { id, name }}
    const route = useRoute()
    const store = useStore()
    const category = computed(() => {
      const cate = {}
      // 完成获取数据的逻辑
      store.state.category.list.foreach(top => {
        if (top.children) {
          const sub = top.children.find(sub => sub.id === route.params.id)
          if (sub) {
            cate.top = { id: top.id, name: top.name }
            cate.sub = { id: sub.id, name: sub.name }
          }
        }
      })
      return cate
    })

    return {
      category
    }
  }
}
</script>

<style lang="less" scoped>

</style>
