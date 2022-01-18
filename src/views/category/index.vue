<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <WeiweiBread >
        <WeiweiBreadItem to="/">首页</WeiweiBreadItem>
        <transition name="fade-right" mode="out-in">
          <WeiweiBreadItem v-if="topCategory" :key="topCategory.id">{{topCategory.name}}</WeiweiBreadItem>
        </transition>
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
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
            <h3>- {{sub.name}} -</h3>
            <p class="tag">温暖柔软，品质之选</p>
            <WeiweiMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
            <GoodItem v-for="goods in sub.goods" :key="goods"  :goods="goods" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import GoodItem from './components/good-item.vue'
import { findTopCategory } from '@/api/category'

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
      // return store.state.category.list.find(item => {
      //   // eslint-disable-next-line no-return-assign
      //   return item.id = route.params.id
      // })
      let cate = {}
      const item = store.state.category.list.find(item => {
        // eslint-disable-next-line no-return-assign
        return item.id = route.params.id
      })
      if (item) cate = item
      return cate
    })

    // 获取各个子类目下推荐商品
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children
      })
    }

    // 监听路由中id发生改变的时候，重新发送请求.并且一进来就触发监听事件
    watch(() => route.params.id, (newVal) => {
      newVal && getSubList()
    }, { immediate: true })

    return {
      sliders,
      topCategory,
      subList
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
.fade-right {
  // 面包屑动画
  // 进入：右侧 20px的位移 透明度为0 做过度.5s 本来位置 没有位移 透明度为1
  // 离开：本来位置 没有位移 透明度为1 做过度.5s 右侧 20px位移 透明度0
  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  &-enter-active,
  &-leave-active {
    transition: all 0.5s;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }
}
</style>
