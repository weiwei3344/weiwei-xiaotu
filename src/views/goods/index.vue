<template>
  <div class='xtx-goods-page' v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <WeiweiBread>
        <WeiweiBreadItem to="/">首页</WeiweiBreadItem>
        <WeiweiBreadItem :to="`/category/${goods.categories[1].id}`">{{goods.categories[1].name}}</WeiweiBreadItem>
        <WeiweiBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{goods.categories[0].name}}</WeiweiBreadItem>
        <WeiweiBreadItem >{{goods.name}}</WeiweiBreadItem>
      </WeiweiBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures"/>
          <GoodsSales />
        </div>
        <div class="spec">
          <!-- 名字组件 -->
          <GoodsName :goods="goods" />
          <!-- 规格组件 -->
          <GoodsSku :goods="goods" />
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/product'
import { nextTick, watch } from '@vue/runtime-core'
export default {
  name: 'WeiweiGoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku
  },

  setup () {
    // 1.获取商品详情，去渲染面包屑
    const goods = useGoods()

    return {
      goods
    }
  }
}

// 获取商品详情
const useGoods = () => {
  // 注意，可能会出现路由地址商品ID发生变化，但不会重新初始化组件。
  // 这种情况需要使用watch来监听，并设置为第一次必须触发
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        // 目的是更新数据，使组件重新加载
        // 让商品数据为null，以后使用v-if的组件可以重新销毁和创建
        goods.value = null
        nextTick(() => {
          goods.value = data.result
        })
        // console.log(goods)
      })
    }
  }, { immediate: true })
  return goods
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
