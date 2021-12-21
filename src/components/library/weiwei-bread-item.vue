<template>
  <div class="weiwei-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
    <!-- <i class="iconfont icon-angle-right"></i> -->
  </div>
</template>

<script>
export default {
  name: 'WeiweiBreadItem',
  props: {
    to: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>

</style>
