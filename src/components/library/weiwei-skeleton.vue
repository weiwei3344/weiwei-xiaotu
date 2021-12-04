<template>
  <div class="weiwei-skeleton" :style="{width, height}" :class="{shan: animated}">
    <!-- 需要一个盒子来撑起高度 -->
    <div class="block" :style="{backgroundColor: bg}"></div>
    <!-- 闪一闪的效果需要weiwei-skeleton伪元素 -->
  </div>
</template>

<script>
export default {
  name: 'WeiweiSkeleton',

  // 使用该组件的时候需要动态设计高度、宽度、背景颜色、是否闪一闪
  props: {
    bg: {
      type: String,
      default: '#eee'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '30px'
    },
    animated: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.weiwei-skeleton{
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block{
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.shan{
  &::after{
    content: '';
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0%{
    left: -100%;
  }
  100%{
    left: 120%;
  }
}
</style>
