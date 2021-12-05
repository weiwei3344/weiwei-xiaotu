<template>
  <!-- 需要一个组件来控制轮播图组件的大小 -->
  <div class="home-banner">
    <!-- 将获取的数据传入到其中 -->
    <WeiweiCarousel :sliders="sliders"/>
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    // 创建一个数组，将动态显示广告区数据
    const sliders = ref([])
    // 调用api接口函数，写入数据
    findBanner().then(data => {
      sliders.value = data.result
    })

    return {
      sliders
    }
  }
}
</script>

<style lang="less" scoped>
.home-banner{
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
.weiwei-carousel{
  ::v-deep .craousel-btn.prev{
    left: 270px;
  }
  ::v-deep .carousel-indicator{
    padding-left: 250px;
  }
}
</style>
