<template>
  <div class="home-category" @mouseleave="categoryId = null">
    <ul class="menu">
      <li :class="{active: categoryId && categoryId === item.id}" v-for="item in menuList" :key="item.id" @mouseenter="categoryId = item.id">
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
    <!-- 弹层，弹出商品 -->
    <div class="layer">
      <!-- 当id为brand的时候就显示品牌否则显示分类 -->
      <h4 v-if="currCategory">{{currCategory.id === 'brand' ? '品牌' : '分类'}}推荐<small>根据您的购买或者浏览记录推荐</small></h4>

      <!-- 商品数据 -->
      <ul v-if="currCategory && currCategory.goods">
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink :to="`/category/sub/${item.id}`">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{item.name}}</p>
              <p class="dessc ellipsis">{{item.desc}}</p>
              <p class="price"><i>￥</i>{{item.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>

      <!-- 品牌数据 -->
      <ul v-if="currCategory && currCategory.brands">
        <li class="brand" v-for="item in currCategory.brands" :key="item">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>
                {{item.place}}
              </p>
              <p class="name ellipsis">{{item.name}}</p>
              <p class="desc ellipsis-2">{{item.desc}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { findBrand } from '@/api/home'
export default {
  name: 'HomeCategory',

  // 1、需要渲染组件，获取vue中category中list的一级分类，并且只需要两个二级分类。使用slice
  // 2、数据只有9个，但是页面中有10个，所以需要在组件内部定义一个品牌数据
  // 3、根据vuex的分类数据和组件中定义的品牌数据，得到左侧完整的数据(9分类 + 1品牌)数组
  // 4、将上述得到的最终数据进行渲染

  // setup()函数尽量避免使用async awite.因为组件加载要等到setup全部加载完成之后再加载
  setup () {
    // 定义品牌数据
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [
        {
          id: 'brand-children',
          name: '品牌推荐'
        }
      ],
      // 定义品牌里面的数据
      brands: []
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
          children: item.children && item.children.slice(0, 2),
          goods: item.goods
        }
      })
      list.push(brand)
      return list
    })

    // 调用findBrand()函数来将数据填充到brand.brands中
    findBrand().then(data => {
      brand.brands = data.result
    })

    // 获取当前分类下的数据
    // 需要定义一个获取当前商品的id，再去数据中遍历寻找，如果找到，就赋值下面创建的数据中，在返回出去给模板使用
    const categoryId = ref(null)
    const currCategory = computed(() => {
      return menuList.value.find(item => item.id === categoryId.value)
    })
    // setTimeout(() => console.log(menuList.value, currCategory.value), 3000)
    return {
      menuList,
      categoryId,
      currCategory
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
      &:hover, &.active{
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
  &:hover{
    .layer{
      display: block;
    }
  }
  .layer{
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4{
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small{
        font-size: 16px;
        color: #666;
      }
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        // nth-children选择器匹配属于父元素的第N个子元素，无论元素的类型
        &:nth-child(3n){
          margin-right: 0;
        }
        a{
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover{
            background: #e3f9f4;
          }
          img{
            width: 95px;
            height: 95px;
          }
          .info{
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name{
              font-size: 16px;
              color: #666;
              width: 180px;
            }
            .desc{
              color:#999;
              width: 120px;
              text-overflow: ellipsis;
            }
            .price{
              font-size: 22px;
              color: @weiweiColor;
              i{
                font-size: 16px;
              }
            }
          }
        }
      }
      li.brand{
        height: 180px;
        a{
          align-items: flex-start;
          img{
            width: 120px;
            height: 160px;
          }
          .info{
            p{
              margin-top: 8px;
            }
            .place{
              color: #999;
            }
          }
        }
      }
    }
  }
}
</style>
