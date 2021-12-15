<template>
  <div class="home-product">
    <HomePanel title="生鲜" v-for="i in 4" :key="i">
      <template #right>
        <div class="sub">
          <RouterLink to="/">海鲜</RouterLink>  
          <RouterLink to="/">水果</RouterLink>  
          <RouterLink to="/">蔬菜</RouterLink>  
          <RouterLink to="/">水产</RouterLink>  
        </div>
        <WeiweiMore />
      </template>
      <div class="box">
        <RouterLink class="cover" to="/">
          <img src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/fresh_goods_cover.jpg" alt="">
          <strong class="label">
            <span>生鲜馆</span>
            <span>全场3件7</span>
          </strong>
        </RouterLink>
      </div>
    </HomePanel>
  </div>
</template>

<script>
export default {
  name: 'HomeProduct'
}
</script>

<style lang="less" scoped>

</style>