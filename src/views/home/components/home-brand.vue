<template>
  <HomePanel title="热门品牌" sub-title="国际经典，品质保证">
    <template #right>
      <a @click="toggle(-1)" :class="{disabled: index === 0}" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a @click="toggle(1)" :class="{disabled: index === 1}" href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="target">
      <Transition name="fade">
        <ul v-if="brands.length" class="list" :style="{transform:`translateX(${-index*1240}px)`}">
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="">
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <WeiweiSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px" />
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import { ref } from '@vue/reactivity'
import HomePanel from './home-panel.vue'
import { findBrand } from '@/api/home'
import { useLazyData } from '@/hooks'

export default {
  name: 'HomeBrand',
  components: {
    HomePanel
  },
  setup () {
    // 获取数据
    // const brands = ref([])
    // findBrand(10).then(data => {
    //   brands.value = data.result
    // })

    // 使用组件数据懒加载获取数据
    // useLazyData需要的是API函数，如果遇到要传参的情况，自己写函数在函数中调用API传参，有点绕
    // 通俗来说，就是useLazyData需要函数，那就传入一个箭头函数，不过箭头函数中又调用了获取数据的API
    const { target, result } = useLazyData(() => findBrand(10))

    // 切换的时候可以使用数组来实现,前提是 0 1 两页
    // 或者换一个思路，有多项，但必须处理上一张和下一张逻辑
    const index = ref(0)
    // 点击上一页减1
    // 点击下一页加1
    const toggle = (setp) => {
      const newIndex = index.value + setp
      if (newIndex < 0 || newIndex > 1) return
      index.value = newIndex
    }

    return {
      brands: result,
      toggle,
      index,
      target
    }
  }
}
</script>

<style lang="less" scoped>
.home-panel{
  background: #f5f5f5;
}
.iconfont{
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @weiweiColor;
  &::before{
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled{
    background: #ccc;
    cursor: not-allowed;
  }
}
.box{
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list{
    width: 200%;
    display: flex;
    transition: all 1s;
    li{
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n){
        margin-right: 0;
      }
      img{
        width: 240px;
        height: 305px;
      }
    }
  }
}
.skeleton{
  width: 100%;
  display: flex;
  .item{
    margin-right: 10px;
    &:nth-child(5n){
      margin-right: 0;
    }
  }
}
</style>
