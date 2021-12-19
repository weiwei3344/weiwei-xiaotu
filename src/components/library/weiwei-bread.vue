<template>
  <div class="weiwei-bread">
    <div class="weiwei-bread-item">
      <RouterLink to="/">
        首页
      </RouterLink>
    </div>
    <i class="iconfont icon-angle-right"></i>
    <div v-if="parentName" class="weiwei-bread-item">
      <RouterLink v-if="parentPath" :to="parentPath">
        {{parentName}}
      </RouterLink>
      <span v-else>{{parentName}}</span>
    </div>
    <i v-if="parentName" class="iconfont icon-angle-right"></i>
    <div class="weiwei-bread-item">
      <span><slot /></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeiweiBread',
  props: {
    // 父级类目路径
    parentPath: {
      type: [String, Object],
      default: '/'
    },
    // 父级类目名称
    parentName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
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
