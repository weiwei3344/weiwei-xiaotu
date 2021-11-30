<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id">
        <RouterLink :to="`/category/${item.id}`">{{item.name}}</RouterLink>
        <!-- 没有数据的时候不显示 -->
        <template v-if="item.children">
          <RouterLink
          v-for="sub in item.children"
          :key="sub.id"
          :to="`/category/sub/${sub.id}`"
          >{{sub.name}}</RouterLink>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'HomeCategory',

  // 1、需要渲染组件，获取vue中category中list的一级分类，并且只需要两个二级分类。使用slice
  // 2、数据只有9个，但是页面中有10个，所以需要在组件内部定义一个品牌数据
  // 3、根据vuex的分类数据和组件中定义的品牌数据，得到左侧完整的数据(9分类 + 1品牌)数组
  // 4、将上述得到的最终数据进行渲染
  setup () {
    // 定义品牌数据
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [
        {
          id: 'brand-children', name: '品牌推荐'
        }
      ]
    })

    // 拿到vuex中category中的数据
    const store = useStore()
    // 使用计算属性来获取
    const menuList = computed(() => {
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          // 防止初始化的时候children中没有数据调用slice函数报错
          children: item.children && item.children.slice(0, 2)
        }
      })
      list.push(brand)
      return list
    })
    return {
      menuList
    }
  }
}
</script>

<style lang="less" scoped>
.home-category{
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu{
    li{
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover{
        background: @weiweiColor;
      }
      a{
        margin-right: 4px;
        color: #fff;
        &:first-child{
          font-size: 16px;
        }
      }
    }
  }
}
</style>
