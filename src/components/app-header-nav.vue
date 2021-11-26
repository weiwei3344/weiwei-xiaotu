<template>
  <ul class="app-header-nav">
    <li class="home">
      <Router-link to="/">首页</Router-link>
    </li>
    <li v-for="item in list" :key="item.id">
      <!-- 这里就不用a标签了,因为以后需要带参数,所以需要跳转 -->
      <Router-link to="/">{{item.name}}</Router-link>
      <!-- 完善子级分类布局 -->
      <div class="layer">
        <ul>
          <!-- 模拟数据循环10次 -->
          <li v-for="sub in item.children" :key="sub.id">
            <Router-link to="/">
              <img :src="sub.picture" alt="">
              <p>{{sub.name}}</p>
            </Router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'AppHeaderNav',
  setup () {
    // 记得每次使用store都要引入
    const store = useStore()
    // 为社么要定义一个计算属性,如果直接写的话,会有大量的重复代码
    const list = computed(() => {
      // console.log(list)
      return store.state.category.list
    })

    return {
      list
    }
  }
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
    // transform: all .2s .1s;
    transition: all .2s .1s;
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
