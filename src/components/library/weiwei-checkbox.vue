<template>
  <div class="weiwei-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
// import { ref } from '@vue/reactivity'
// import { watch } from '@vue/runtime-core'
import { useVModel } from '@vueuse/core'
export default {
  // 1.实现组件本身的选中与不选中效果
  // 2.实现组件的 v-model 指令双向绑定
  // 3.改造成@vueuse/core的函数写法

  name: 'WeiweiCheckbox',

  // v-model ===> :modelValue + @update:modelValue
  // 接收一下modelValue的值
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // 使用useModel实现双向数据绑定v-model指令
    // 1. 使用props接受modelValue
    // 2. 使用useVModel来包装props中的modelValue属性数据
    // 3. 在使用checked.value就是使用父组件的数据
    // 4. 在使用checked.value = '数据' 赋值，触发emit('update: modelValue', '数据')
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      const newVal = !checked.value
      // 通知父组件
      checked.value = newVal
      // 触发change事件
      emit('change', newVal)
    }
    // const checked = ref(false)
    // const changeChecked = () => {
    //   checked.value = !checked.value
    //   // 使用emit通知父组件数据的改变
    //   // 注意写事件的时候有没有空格
    //   emit('update:modelValue', checked.value)
    // }

    // // 使用侦听器得到父组件传递数据，给checked数据
    // watch(() => props.modelValue, () => {
    //   checked.value = props.modelValue
    // }, { immediate: true })
    // return {
    //   checked,
    //   changeChecked
    // }

    return {
      checked,
      changeChecked
    }
  }
}
</script>

<style lang="less" scoped>
.weiwei-checkbox {
  display: inline-block;
  margin-right: 2px;
  cursor: pointer;
  user-select: none;
  .icon-checked {
    color: @weiweiColor;
    ~ span {
      color: @weiweiColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
