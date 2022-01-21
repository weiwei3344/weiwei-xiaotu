<template>
  <!-- 面包屑 -->
  <SubBread />

  <!-- 筛选区 -->
  <SubFilter />

  <!-- 测试复选框组件 -->
  <WeiweiCheckbox v-model="isAllChecked">全选</WeiweiCheckbox>{{isAllChecked}}
</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import { ref } from 'vue'

export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter
  },
  setup () {
    const isAllChecked = ref(true)

    return {
      isAllChecked
    }
  }
}
</script>

<style lang="less" scoped>

</style>
