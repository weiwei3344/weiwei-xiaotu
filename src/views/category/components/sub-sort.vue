<template>
  <div class="sub-sort">
    <div class="sort">
      <a :class="{active: sortParams.sortField === null}" @click="changeSort(null)" href="javascript:;">默认排序</a>
      <a :class="{active: sortParams.sortField === 'publishTime'}" href="javascript:;" @click="changeSort('publishTime')">最新商品</a>
      <a :class="{active: sortParams.sortField === 'orderNum'}" href="javascript:;" @click="changeSort('orderNum')">最高人气</a>
      <a :class="{active: sortParams.sortField === 'evaluateNum'}" href="javascript:;" @click="changeSort('evaluateNum')">评论最多</a>
      <a @click="changeSort('price')" href="javascript:;">
        价格排序
        <i :class="{active: sortParams.sortField === 'price' && sortParams.sortMethod === 'asc'}" class="arrow up"></i>
        <i :class="{active: sortParams.sortField === 'price' && sortParams.sortMethod === 'desc'}" class="arrow down"></i>
      </a>
    </div>
    <div class="check">
      <WeiweiCheckbox v-model="sortParams.inventory">仅显示有货商品</WeiweiCheckbox>
      <WeiweiCheckbox v-model="sortParams.onlyDiscount">仅显示特惠商品</WeiweiCheckbox>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  // 定义一个组件sub-sort，完成基础布局
  // 在sub.vue组件中使用
  // 完成切换各种排序时候的交互效果
  name: 'SubSort',

  setup () {
  // 实现交互的数据要和后台保持一致
  // 1. 明确交互数据
  /**
   * inventory：是否有库存；
   * onlyDiscount：只显示特惠；
   * sortField：排序字段，取值范围：[publishTime,orderNum,price,evaluateNum]
   * sortMethod：排序规则，asc为正序，desc为倒序，默认为desc
   */
    const sortParams = reactive({
      inventory: false,
      onlyDiscount: false,
      sortField: null,
      sortMethod: null
    })

    // 2.绑定按钮的点击事件，修改默认排序
    const changeSort = (sortField) => {
      if (sortField === 'price') {
        sortParams.sortField = sortField
        // 处理排序，当sortMethod为null时候，是第一次点击
        if (sortParams.sortMethod === null) {
          sortParams.sortMethod = 'desc'
        } else {
          sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 如果已经选中，阻止继续选中
        if (sortParams.sortField === sortField) return
        sortParams.sortField = sortField
        sortParams.sortMethod = null
      }
    }

    // 3. 提供给模板使用
    return {
      sortParams,
      changeSort
    }
  }
}
</script>

<style lang="less" scoped>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;
      &.active {
        background: @weiweiColor;
        border-color: @weiweiColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
            &.active {
            border-bottom-color: @weiweiColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @weiweiColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
