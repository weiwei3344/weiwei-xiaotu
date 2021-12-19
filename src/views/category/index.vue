<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <WeiweiBread >
        <WeiweiBreadItem to="/">首页</WeiweiBreadItem>
        <WeiweiBreadItem to="category/100">电脑</WeiweiBreadItem>
        <WeiweiBreadItem>笔记本电脑</WeiweiBreadItem>
      </WeiweiBread>
      <!-- 轮播图 -->
      <!-- 全部分类 -->
      <!-- 各个分类的推荐商品 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopCategory'
}
</script>

<style lang="less" scoped>

</style>
