<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="taggle()" :class="{active: visitable}">
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visitable">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span class="ellipsis" @click="changeItem(item)" v-for="item in currList" :key="item.code">{{item.name}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'WeiweiCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 控制展开收起函数
    const { visitable, taggle, target, loading, currList, close } = control()

    const changeItem = (item) => {
      if (item.level === 0) {
        // 省
        changeResult.proviceCode = item.code
        changeResult.proviceName = item.name
      } else if (item.level === 1) {
        // 市
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      } else if (item.level === 2) {
        // 县地区
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        // 拼接的完整路径
        changeResult.fullLocation = `${changeResult.proviceName} ${changeResult.cityName} ${changeResult.countyName}`
        // 到这里以及选完了，需要结束对话框，并且通知父组件
        close()
        emit('change', changeResult)
      }
    }

    return {
      visitable,
      taggle,
      target,
      loading,
      currList,
      changeItem
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
  // 创建一个加载中的数据
  const loading = ref(false)
  // 创建一个城市数据
  const allCityData = ref([])

  // 展开状态
  const open = () => {
    visitable.value = true
    loading.value = true
    getCityData().then(data => {
      allCityData.value = data
      loading.value = false
    })
    for (const key in changeResult) {
      changeResult[key] = ''
    }
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

  // 计算属性来实现省市区的显示
  const currList = computed(() => {
    // 默认省一级
    let list = allCityData.value
    // 可能市一级
    if (changeResult.proviceCode && changeResult.proviceName) {
      list = list.find(p => p.code === changeResult.proviceCode).areaList
    }
    // 可能县地区一级
    if (changeResult.cityCode && changeResult.cityName) {
      list = list.find(c => c.code === changeResult.cityCode).areaList
    }
    return list
  })

  return {
    visitable,
    taggle,
    target,
    loading,
    currList,
    close
  }
}

/**
 * 获取省市区的数据函数
 */
const getCityData = () => {
  // 1. 数据请求地址： https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
  // 2. 当本地有缓存的时候，直接拿取
  // 3. 本地没有数据，则从数据请求地址加载数据，缓存在window上
  // 4. 返回Promise在then上获取数据，因为这里操作可能是异步的和同步操作
  return new Promise((resolve, reject) => {
    // 5. 约定，数据存储在window上的cityData字段上
    if (window.cityData) {
      resolve(window.cityData)
    } else {
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      // 直接调用axios来请求数据，因为这个数据不是存在同一个地方
      axios.get(url, { timeout: 5000 }).then(data => {
        // console.log(data.data)
        window.cityData = data.data
        resolve(data.data)
      })
    }
  })
}

/**
 * 定义选择的省市区数据
 * provice: 省；city：市；county：县地区
 */
const changeResult = reactive({
  proviceCode: '',
  proviceName: '',
  cityCode: '',
  cityName: '',
  countyCode: '',
  countyName: '',
  fullLocation: ''
})

/**
 * 点击选择的省后的事件
 */

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
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
