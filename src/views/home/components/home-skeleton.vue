<template>
  <div class="home-skeleton">
    <div class="item" v-for="i in 4" :key="i" :style="{backgroundColor: bg}">
      <WeiweiSkeleton bg="#e4e4e4" width="306px" height="306px" animated />
      <WeiweiSkeleton bg="#e4e4e4" width="240px" height="55px" animated />
      <WeiweiSkeleton bg="#e4e4e4" width="120px" height="24px" animated />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSkeleton',
  props: {
    type: String,
    default: () => { '#fff' }
  }
}
</script>

<style lang="less" scoped>
.home-skeleton{
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item{
    width: 306px;
    .weiwei-skeleton ~ .weiwei-skeleton{
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>
