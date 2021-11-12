import { createStore } from 'vuex'

// vue2.0 创建仓库 new Vuex.Store({})
// vue3.0 创建仓库 createStore({})

// 创建两个模块
const modulesA = {
  state: {
    userName: 'weiwei'
  },
  getters: {
    newName (state) {
      const newName_ = state.userName + '!!!'
      return newName_
    }
  }
}

// const modulesC = {
//   state: {
//     userName: 'weiwei123'
//   },

//   getters: {
//     newName () {
//       return 'weiwei123456'
//     }
//   }
// }

const modulesB = {
  // namespaced表示是否开启命名空间
  namespaced: true,
  state: {
    userName: 'weiwei3344'
  },

  getters: {
    newName (state) {
      const newName_ = state.userName + '!!!'
      return newName_
    }
  },

  mutations: {
    updateName (state) {
      const newVal_ = state.userName + '123'
      return newVal_
    }
  },

  actions: {
    updateName (ctx) {
      setTimeout(() => {
        ctx.commit('updateName')
      }, 1000)
    }
  }
}

export default createStore({
  modules: {
    // modulesC,
    modulesA,
    modulesB
  }
})

// export default createStore({
//   state: {
//     userName: 'weiwei3344'
//   },

//   getters: {
//     newName (state) {
//       return state.userName + '!!!'
//     }
//   },

//   mutations: {
//     updateName (state) {
//       const userName_ = state.userName = 'weiwei'
//       return userName_
//     }
//   },

//   actions: {
//     updateName (ctx) {
//       // 模拟发请求
//       setTimeout(() => {
//         ctx.commit('updateName')
//       }, 1000)
//     }
//   }
// })
// export default createStore({
//   // 存放数据
//   state: {
//     name: 'weiwei'
//   },

//   // // 计算属性
//   // getters:{
//   //   newVal(){
//   //     return state.name + '!!!'
//   //   }
//   // },
//   // // 修改方法
//   // mutations: {
//   // },

//   // // 取数据
//   // actions: {
//   // },

//   // // 模块
//   // modules: {
//   // }
// })
