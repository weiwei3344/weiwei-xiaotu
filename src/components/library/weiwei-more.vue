<template>
  <RouterLink  :to="path" class="weiwei-more">
    <span>查看全部</span>
    <i class="iconfont icon-angel-right"></i>
  </RouterLink>
</template>

<script>
export default {
  name: 'WeiweiMore',
  props: {
    path: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style lang="less" scoped>
.weiwei-more{
  margin-bottom: 2px;
  span{
    font-size: 16px;
    vertical-align: middle;
    margin-right: 4px;
    color: #999;
  }
  i{
    font-size: 14px;
    vertical-align: middle;
    position: relative;
    top: 2px;
    color: #ccc;
  }
  &:hover{
    span,i{
      color: @weiweiColor;
    }
  }
}
</style>
