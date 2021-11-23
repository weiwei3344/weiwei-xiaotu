<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <Router-link to="/">weiwie小兔鲜</Router-link>
      </h1>
      <ul class="navs">
        <li class="home">
          <Router-link to="/">首页</Router-link>
        </li>
        <li><a href="#">美食</a></li>
        <li><a href="#">厨餐</a></li>
        <li><a href="#">艺术</a></li>
        <li><a href="#">电器</a></li>
        <li><a href="#">居家</a></li>
        <li><a href="#">洗护</a></li>
        <li><a href="#">孕婴</a></li>
        <li><a href="#">服装</a></li>
        <li><a href="#">杂货</a></li>
      </ul>
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
export default {
  name: 'AppHeader'
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

  // 导航栏眼样式代码
  .navs{
    width: 820px;
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    li{
      margin-right: 40px;
      width: 38px;
      text-align: center;
      a{
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover{
        a{
          color: @weiweiColor;
          border-bottom: 1px solid @weiweiColor;
        }
      }
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
