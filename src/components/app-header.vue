<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <Router-link to="/">weiwie小兔鲜</Router-link>
      </h1>
      <!-- 这里的组件和吸顶导航栏有相同的组件，所以把他抽取出来 -->
      <HeaderNav />
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜"/>
      </div>
      <div class="cart">
        <a class="curr" href="#">
          <i class="iconfont icon-cart"></i>
          <em>0</em>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
// 引入抽取出来的导航栏的组件
import HeaderNav from '@/components/app-header-nav.vue'
export default {
  name: 'AppHeader',
  components: {
    HeaderNav
  }
}
</script>

<style lang="less" scoped>
.app-header{
  background: #fff;

  .container{
    display: flex;
    align-items: center;
  }

  // logo样式代码
  .logo{
    width: 200px;
    a{
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url(../assets/images/logo.png) no-repeat center 18px / contain;
    }
  }

  // 搜索框样式代码
  .search{
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;
    .icon-serch{
      font-size: 18px;
      margin-left: 5px;
    }
    input{
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

  // 购物车样式代码
  .cart{
    width: 50px;
    .curr{
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;
      .icon-cart{
        font-size: 22px;
      }
      em{
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        // 帮助文本样式主题
        background: @helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial, Helvetica, sans-serif;
      }
    }
  }
}
</style>
