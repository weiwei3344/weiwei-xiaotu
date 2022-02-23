<template>
  <div class="goods-image">
    <!-- 大图容器 -->
    <div v-show="show" class="large" :style="[{backgroundImage:`url(${images[currIndex]})`}, large]"></div>

    <!-- 中图容器 -->
    <div class="middle" ref="target">
      <!-- 取出当前索引的图片 -->
      <img :src="images[currIndex]" alt="">
      <!-- 遮罩容器 -->
      <div v-show="show" class="layer" :style="layerPosition"></div>
    </div>

    <!-- 小图容器 -->
    <ul class="small">
      <li v-for="(img,i) in images" :key="img" :class="{active:i===currIndex}">
        <!-- 鼠标经过的时候将图片索引赋值给currIndex -->
        <img @mouseenter="currIndex=i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    // 当前图片的索引
    const currIndex = ref(0)

    // 图片放大需要数据
    const { show, layerPosition, large, target } = usePreviewImg()

    return {
      currIndex,
      show,
      layerPosition,
      large,
      target
    }
  }
}

const usePreviewImg = () => {
// 1. 是否显示遮罩层和大图
  const show = ref(false)
  // 2. 遮罩层的坐标位置（定义成样式的状态，方便直接使用）
  const layerPosition = reactive({
    left: 0,
    top: 0
  })
  // 3. 大图的坐标定位（和上面一样写成样式）
  const large = reactive({
    backgroundPositionX: 0,
    backgroundPositionY: 0
  })
  // 4. 使用vueuse中的useMouseInElement来监听页面的变化 (watch函数)
  const target = ref(null)
  const { elementX, elementY, isOutside } = useMouseInElement(target)
  // 如果监听对象为响应式的，则不用函数来处理，直接中括号
  watch([elementX, elementY, isOutside], () => {
    // 5. 使用得到的数据来处理
    // 处理是否显示遮罩和大图
    show.value = !isOutside.value
    // 处理X和Y
    const position = {
      x: 0,
      y: 0
    }
    if (elementX.value < 100) position.x = 0
    else if (elementX.value > 300) position.x = 200
    else position.x = elementX.value - 100
    if (elementY.value < 100) position.y = 0
    else if (elementY.value > 300) position.y = 200
    else position.y = elementY.value - 100

    console.log(position.x, position.y)
    // 结合样式负值
    layerPosition.left = position.x + 'px'
    layerPosition.top = position.y + 'px'
    large.backgroundPositionX = -2 * position.x + 'px'
    large.backgroundPositionY = -2 * position.y + 'px'
  })

  // 返回数据出去
  return {
    show,
    layerPosition,
    large,
    target
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
 .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
   background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
   .layer {
     width: 200px;
     height: 200px;
     background: rgba(0,0,0,.2); left: 0; top: 0; position: absolute; }
    }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid @weiweiColor;
      }
    }
  }
}
</style>
