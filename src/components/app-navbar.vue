<template>
  <nav class="app-navbar">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{profile.nickname ?  profile.nickname: 'weiwei'}}</a></li>
          <li><a href="javascript:;">退出登录</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'AppNavBar',
  // 需要判别是登录状态还是未登录状态
  setup () {
    // 拿到store实例
    const store = useStore()
    // 解构出token，判断有没有登录
    // 原版用的是一个计算属性，但是如果使用结构的方法，那么完全没有必要使用结构这个方法
    const { profile } = store.state.user

    // 导出给组件使用
    return {
      profile
    }
  }
}
</script>

<style lang="less" scoped>
.app-navbar{
  background: #333;
  ul{
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li{
      a{
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i{
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover{
          color: @weiweiColor;
        }
      }
      // ~ 选择器，表示找到同类型的所有兄弟节点
      ~ li{
        a{
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
