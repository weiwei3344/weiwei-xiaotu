<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item" >
      <div class="head">品牌: </div>
      <div class="body">
        <a @click="filterData.brands.selectedBrand = item.id" :class="{active: item.id === filterData.brands.selectedBrand }" href="javascript:;" v-for="item in filterData.brands" :key="item.id">{{item.name}}</a>
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{item.name}}: </div>
      <div class="body">
        <a @click="item.selectedAttr = prop.id" :class="{active: prop.id === item.selectedAttr }" href="javascript:;" v-for="prop in item.properties" :key="prop.id">{{prop.name}}</a>
      </div>
    </div>
  </div>
  <!-- 筛选区股价屏效 -->
  <div v-else class="sub-filter">
    <WeiweiSkeleton class="item" width="800px" height="40px" v-for="i in 5" :key="i"/>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubFilter } from '@/api/category'
export default {
  name: 'SubFilter',
  setup () {
    const route = useRoute()
    // 监听二级类目ID的变化获取筛选数据
    const filterData = ref(null)
    // 监听数据发生改变，状态也发生改变
    const filterLoading = ref(null)
    // 监听路由变化
    watch(() => route.params.id, (newVal) => {
      // 变化后的ID有值，且处在二级类目路由下
      if (newVal && `/category/sub/${newVal}` === route.path) {
        // 拿数据的时候将filterLoading改为true
        filterLoading.value = true
        // 发请求拿数据
        findSubFilter(route.params.id).then(data => {
          // 每一组可选的筛选条件缺失全部条件，处理数据并加上 全部 筛选
          // 全部及没有id，所以id为null或undefined
          // 给每一组数据加上一个选中的ID

          // 品牌
          data.result.brands.selectedBrand = null
          data.result.brands.unshift({ id: null, name: '全部' })
          // 属性
          data.result.saleProperties.forEach(item => {
            item.selectedAttr = null
            item.properties.unshift({ id: null, name: '全部' })
          })
          // 设置修改数据
          filterData.value = data.result
          // 当数据拿到后将filterLoading改为false
          filterLoading.value = false
        })
      }
    })
    onMounted(() => {
      // 拿数据的时候将filterLoading改为true
      filterLoading.value = true
      // 发请求拿数据
      findSubFilter(route.params.id).then(data => {
        // 每一组可选的筛选条件缺失全部条件，处理数据并加上 全部 筛选
        // 全部及没有id，所以id为null或undefined
        // 给每一组数据加上一个选中的ID

        // 品牌
        data.result.brands.selectedBrand = null
        data.result.brands.unshift({ id: null, name: '全部' })
        // 属性
        data.result.saleProperties.forEach(item => {
          item.selectedAttr = null
          item.properties.unshift({ id: null, name: '全部' })
        })
        // 设置修改数据
        filterData.value = data.result
        // 当数据拿到后将filterLoading改为false
        filterLoading.value = false
      })
    })

    return {
      filterData,
      filterLoading
    }
  }
}
</script>

<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @weiweiColor;
        }
      }
    }
  }
  .weiwei-skeleton{
    padding: 10px 0;
  }
}
</style>
