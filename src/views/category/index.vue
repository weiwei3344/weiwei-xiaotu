<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <WeiweiBread >
        <WeiweiBreadItem to="/">首页</WeiweiBreadItem>
        <WeiweiBreadItem v-if="topCategory">{{topCategory.name}}</WeiweiBreadItem>
      </WeiweiBread>
      <!-- 轮播图 -->
      <WeiweiCarousel :sliders=sliders style="height:500px" />
      <!-- 全部分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" alt="">
              <p>{{sub.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各个分类的推荐商品 -->
      <div class="ref-goods">
        <div class="head">
            <h3>- 海鲜 -</h3>
            <p class="tag">温暖柔软，品质之选</p>
            <WeiweiMore />
        </div>
        <div class="body">
            <GoodItem v-for="i in 5" :key="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import GoodItem from './components/good-item.vue'

export default {
  name: 'TopCategory',
  components: {
    GoodItem
  },
  // 做两件事。1、调用接口请求轮播图的数据。2、在vuex中获取全部分类的数据
  setup () {
    // 请求轮播图数据
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })

    // 全部子分类数据
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      console.log(store.state.category.list)
      console.log(route.params.id)
      return store.state.category.list.find(item => {
        // eslint-disable-next-line no-return-assign
        return item.id = route.params.id
      })
    })

    return {
      sliders,
      topCategory
    }
  }
}
</script>

<style lang="less" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @weiweiColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .weiwei-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
