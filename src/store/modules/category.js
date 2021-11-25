// 分类模块
// 不用存储在本地

// 导入创建的常量
import { topCategory } from '@/api/constants'
// 导入创建好的api请求工具
import { findAllCategory } from '@/api/category'

export default {
  // 开启命名空间
  namespaced: true,

  // 定义数据
  state () {
    return {
      // list是一个数组
      // 如果默认是[]空数组,刚开始不会看到默认的分类,等数据加载完毕后才会看到分类
      // 所以需要根据常量的数据来生成一个默认的顶级分类,在数据没有加载完全或者加载失败的时候不会出现白屏
      list: topCategory.map(item => ({ name: item }))
      // map()方法创建一个新数组,其结果是该数组中每个元素调用提供的函数后的返回值
    }
  },

  // 加载数据后需要修改list的值
  // 里面方法有两个参数,一个传值,然后state中的list改变成传值过来的payload
  mutations: {
    setList (state, payload) {
      state.list = payload
    }
  },
  // 后台加载数据后需要获取数据
  actions: {
    async getList ({ commit }) {
      const { result } = await findAllCategory()
      // 获取成功后,需要调用setList来修改数据
      commit('setList', result)
    }
  }
}
