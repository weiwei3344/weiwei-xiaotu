<template>
  <div class="weiwei-bread">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'WeiweiBread'
}
</script>

<style lang="less">
// 去除scoped属性,就可以让让样式作用于全局
.weiwei-bread{
  display: flex;
  padding: 25px 10px;
  &-item{
    a{
      color: #666;
      transition: all .4s;
      &:hover{
        color: @weiweiColor;
      }
    }
  }
  i{
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
