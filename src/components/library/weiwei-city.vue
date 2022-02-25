<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="taggle()" :class="{active: visitable}">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visitable">
      <span class="ellipsis" v-for="i in 24" :key="i">北京市</span>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
export default {
  name: 'WeiweiCity',

  setup () {
    // 控制展开收起函数
    const { visitable, taggle, target } = control()

    return {
      visitable,
      taggle,
      target
    }
  }
}

/**
 * 控制展开收起
 */
const control = () => {
  // 设置一个数据，显示是否收起或者展开
  const visitable = ref(false)
  // 设置监听dom，是否直接收起
  const target = ref(null)

  // 展开状态
  const open = () => {
    visitable.value = true
  }

  // 关闭状态
  const close = () => {
    visitable.value = false
  }

  // 应该传出一个函数，用来控制或者收起
  const taggle = () => {
    // console.log(visitable.value)
    visitable.value ? close() : open()
  }

  // 第一个参数，需要监听的对象，第二个参数，监听对象所做的事情
  onClickOutside(target, () => {
    close()
    // console.log(123)
  })

  return {
    visitable,
    taggle,
    target
  }
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
