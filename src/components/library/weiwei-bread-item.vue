<template>
  <div class="weiwei-bread-item">
    <RouterLink v-if="to" :to="to">
      <solt />
    </RouterLink>
    <span v-else>
      <solt />
    </span>
    <i class="iconfont icon-angle-right"></i>
  </div>
</template>

<script>
export default {
  name: 'WeiweiBreadItem',
  props: {
    to: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>

</style>
