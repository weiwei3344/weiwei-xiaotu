<template>
  <!-- 面包屑 -->
  <SubBread />

  <!-- 筛选区 -->
  <SubFilter />

  <!-- 商品面板 ====>(排序组件 + 商品列表) -->
  <div class="goods-list">
    <SubSort />
  </div>

</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import { ref } from 'vue'

export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort
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
.goods-list{
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
