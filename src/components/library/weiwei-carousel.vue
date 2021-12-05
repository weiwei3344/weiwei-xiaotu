<template>
  <!-- 轮播图组件 -->
  <div class='weiwei-carousel' @mouseenter="stop()" @mouseleave="start()">
    <!-- 存放轮播图组件 -->
    <ul class="carousel-body">
      <!-- 动态循环是否显示这个图片 -->
      <li class="carousel-item" v-for="(item, i) in sliders" :key="i" :class="{fade: index === i}">
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <!-- 上一张图片 -->
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <!-- 下一张图片 -->
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <!-- 图片之间的圆点 -->
    <!-- active属性决定是否选中 -->
    <div class="carousel-indicator">
      <span @click="index = i" v-for="(item, i) in sliders" :key="i" :class="{active: index === i}"></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue'
export default {
  name: 'WeiweiCarousel',
  props: {
    // 轮播图数据
    sliders: {
      type: Array,
      default: () => []
    },

    // 轮播图切换时间
    duration: {
      type: Number,
      default: 3000
    },

    // 轮播图是否自动切换
    autoPlay: {
      type: Boolean,
      default: false
    }
  },

  setup (props) {
    // 默认显示图片的索引
    const index = ref(0)

    /**
     * 自动播放逻辑
     */
    // 创建一个定时器，时间为传入的时间
    let timer = null
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        // 到时间后index自增
        index.value++
        // 判断如果index增加到比数组还多的时候让index等于0
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    // 使用watch监听props中sliders数据变化
    watch(() => props.sliders, (newVal) => {
      // 当有数据&开启自动播放才调用自动播放函数
      if (newVal.length && props.autoPlay) {
        index.value = 0
        autoPlayFn()
      }
      // immediate表示立即执行，为了防止是静态数据的时候数据没有变化
    }, { immediate: true })

    /**
     * 如果由自动播放，鼠标进入离开，暂停开启
     */
    // 轮播停止函数
    const stop = () => {
      // 有定时器把定时器清除
      if (timer) {
        clearInterval(timer)
      }
    }
    // 轮播开始函数
    const start = () => {
      // 如果有数据&&开启了自动播放，那就调用自动播放
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }

    /**
     * 指示器切换上一张和下一张
     */
    const toggle = (step) => {
      // 包装一个新值，用来判断这个值是否合法
      const newIndex = index.value + step
      // 数组越界，太大了
      if (newIndex >= props.sliders.length) {
        index.value = 0
        // 使用return组织函数继续运行
        return
      }
      // 数据越界，太小了
      if (newIndex < 0) {
        index.value = props.sliders.length - 1
        return
      }
      // 第三种情况，正常
      index.value = newIndex
    }

    /**
     * 销毁组件的时候，清理定时器，防止内存泄露
     */
    onUnmounted(() => {
      clearInterval(timer)
    })

    return {
      index,
      stop,
      start,
      toggle
    }
  }
}
</script>

<style lang="less" scoped>
.weiwei-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
