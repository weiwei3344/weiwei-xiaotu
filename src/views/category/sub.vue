<template>
  <!-- 面包屑 -->
  <SubBread />

  <!-- 筛选区 -->
  <SubFilter />
</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'

export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter
  }
}
</script>

<style lang="less" scoped>

</style>
