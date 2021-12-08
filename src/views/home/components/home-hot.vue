<template>
  <HomePanel title="人气推荐" subTitle="人气爆款 不容错过">
    <div style="position: relative; height: 426px;">
      <Transition name="fade">
        <ul v-if="lists.length" ref="pannel" class="goods-list">
          <li v-for="item in lists" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="">
              <p class="name">{{item.name}}</p>
              <p class="desc">{{item.alt}}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import { ref } from 'vue'
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import { findHot } from '@/api/home'
export default {
  name: 'HomeHot',
  // 注册面板组件,骨架屏组件
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    // 获取人气推荐数据
    const lists = ref([])
    findHot().then(data => {
      lists.value = data.result
    })

    return {
      lists
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list{
  display: flex;
  justify-content: space-between;
  height: 426px;
  li{
    width: 306px;
    height: 406px;
    .hoverShadow();
    img{
      width: 306px;
      height: 306px;
    }
    p{
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc{
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
