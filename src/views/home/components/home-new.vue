<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
      <template #right>
        <WeiweiMore path="/" />
      </template>
      <!-- 面板内容 -->
      <div style="position: relative; height: 426px">
        <Transition name="fade">
          <ul v-if="goods.length" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="">
                <p class="name ellipsis">{{item.name}}</p>
                <p class="price">&yen;{{item.price}}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import { ref } from 'vue'
import { findNew } from '@/api/home'
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'

export default {
  name: 'HomeNew',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    // 获取数据
    const goods = ref([])
    findNew().then(data => {
      goods.value = data.result
    })

    return {
      goods
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list{
  display: flex;
  justify-content: space-between;
  height: 420px;
  li{
    width: 306px;
    height: 420px;
    background: #f0f9f4;
    .hoverShadow();
    img{
      width: 306px;
      height: 306px;
    }
    p{
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price{
      color: @priceColor;
    }
  }
}
</style>
