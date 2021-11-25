<template>
  <ul class="app-header-nav">
    <li class="home">
      <Router-link to="/">首页</Router-link>
    </li>
    <li>
      <a href="#">美食</a>
      <!-- 完善子级分类布局 -->
      <div class="layer">
        <ul>
          <!-- 模拟数据循环10次 -->
          <li v-for="i in 10" :key="i">
            <a href="#">
              <img src="https://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(4).png" alt="果干">
              <p>果干</p>
            </a>
          </li>
        </ul>
      </div>
    </li>
    <li><a href="#">厨餐</a></li>
    <li><a href="#">艺术</a></li>
    <li><a href="#">电器</a></li>
    <li><a href="#">居家</a></li>
    <li><a href="#">洗护</a></li>
    <li><a href="#">孕婴</a></li>
    <li><a href="#">服装</a></li>
    <li><a href="#">杂货</a></li>
  </ul>
</template>

<script>
export default {
  name: 'AppHeaderNav'
}
</script>

<style lang="less" scoped>
// 导航栏眼样式代码
.app-header-nav{
    width: 820px;
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    // 子级分类中有绝对定位,所以再其父元素上要写上相对定位
    position: relative;
    > li{
      margin-right: 40px;
      width: 38px;
      text-align: center;
      > a{
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover{
        > a{
          color: @weiweiColor;
          border-bottom: 1px solid @weiweiColor;
        }
        > .layer {
          height: 132px;
          opacity: 1;
        }
      }
    }
  }

  // 子级分类样式
  .layer {
    width: 1240px;
    background-color: #fff;
    position: absolute;
    left: -200px;
    top: 56px;
    height: 0;
    overflow: hidden;
    // 透明度,越小也透明
    opacity: 0;
    box-shadow: 0 0 5px #ccc;
    transform: all .2s 1s;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 70px;
      align-items: center;
      height: 132px;
      li {
        width: 110px;
        text-align: center;
        img {
          width: 60px;
          height: 60px;
        }
        p {
          padding-top: 10px;
        }
        &:hover {
          p {
            color: @weiweiColor;
          }
        }
      }
    }
  }
</style>
