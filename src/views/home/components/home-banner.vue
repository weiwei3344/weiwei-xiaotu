<template>
  <!-- 需要一个组件来控制轮播图组件的大小 -->
  <div class="home-banner">
    <WeiweiCarousel />
  </div>
</template>

<script>
export default {
  name: 'HomeBanner'
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
