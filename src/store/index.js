// 引入创建vuex的方法
import { createStore } from 'vuex'
// 引入vuex持久化插件
import createPersistedState from 'vuex-persistedstate'

// 引入三个模块
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'

// 导出该方法
export default createStore({
  // 导入模块
  modules: {
    user,
    cart,
    category
  },

  // 启用插件
  plugins: [
    createPersistedState({
      // 配置插件
      // key表示存储的名字
      key: 'weiwei-xiaotu-3344',
      // paths指定要存储的模块
      paths: ['user', 'cart']
    })
  ]
})
