<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
          <!-- slected和disable是选中与没有选中的状态 -->
          <template v-for="val in item.values" :key="val.name">
            <img :class="{selected:val.selected}" @click="changeSku(item, val)" v-if="val.prict" class="selected" :src="picture" :title="val.picture">
            <span :class="{selected:val.selected}" @click="changeSku(item,val)" v-else>{{val.name}}</span>
          </template>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup () {
    // 1. 选中与取消逻辑
    const changeSku = (item, val) => {
      // 1.1 如果有选中就取消选中
      if (val.selected) {
        val.selected = false
      } else {
        // 如果没有，则将其他本行的选中样式置为false，在将点击的置为true
        item.values.forEach(valitem => {
          valitem.selected = false
        })
        val.selected = true
      }
    }

    return {
      changeSku
    }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @weiweiColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-top: 10px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
