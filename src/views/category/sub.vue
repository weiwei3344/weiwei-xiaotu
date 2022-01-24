<template>
  <!-- 面包屑 -->
  <SubBread />

  <!-- 筛选区 -->
  <SubFilter />

  <!-- 商品面板 ====>(排序组件 + 商品列表) -->
  <div class="goods-list">
    <SubSort />
    <ul>
      <li v-for="item in goodsList" :key="item.id">
        <GoodItem :goods="item" />
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
import { useRoute } from 'vue-router'
import { findSubCategoryGoods } from '@/api/category'
import { watch } from '@vue/runtime-core'

export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodItem
  },
  setup () {
    const route = useRoute()
    // 加载状态
    const loading = ref(false)
    // 没有商品状态
    const finished = ref(false)
    // 商品列表
    const goodsList = ref([])
    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    // 获取数据函数
    const getData = () => {
      loading.value = true
      // 获取id
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          // 有数据将其写如到goodsList中
          goodsList.value.push(...result.items)
          // 注意，页码要加，不然就会请求相同的数据
          reqParams.page++
        } else {
          finished.value = true
        }
        loading.value = false
      })
    }

    // 切换二级分类时重新加载,监听路由变化
    watch(() => route.params.id, (newVal) => {
      // 判断路由是否相同
      if (newVal && route.path === `/category/sub/${newVal}`) {
        // 初始化数据
        goodsList.value = []
        reqParams = {
          page: 1,
          pageSize: 20
        }
        // 将其前面没有数据置为空
        finished.value = false
      }
    })
    return {
      getData,
      loading,
      finished,
      goodsList
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
