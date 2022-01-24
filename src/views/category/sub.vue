<template>
  <!-- 面包屑 -->
  <SubBread />

  <!-- 筛选区 -->
  <SubFilter />

  <!-- 商品面板 ====>(排序组件 + 商品列表) -->
  <div class="goods-list">
    <SubSort />
    <ul>
      <li v-for="i in 20" :key="i">
        <GoodItem :goods={} />
      </li>
    </ul>
    <!-- 无限加载组件 -->
    <WeiweiInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
  </div>

</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodItem from './components/good-item.vue'
import { ref } from '@vue/reactivity'

export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodItem
  },
  setup () {
    const loading = ref(false)
    const finished = ref(false)
    const getData = () => {
      console.log('加载数据')
    }
    return {
      getData,
      loading,
      finished
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list{
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;
  li {
    margin-right: 20px;
    margin-bottom: 20px;
    &:nth-child(5n) {
      margin-right: 0;
      }
    }
  }
}
</style>
