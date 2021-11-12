// 用户模块
// 需要存储在本地
export default {
  // 开启命名空间
  namespaced: true,
  state () {
    return {
      // 用户信息
      profile: {
        // 用户id
        id: '',
        // 用户头像
        avater: '',
        // 用户昵称
        nickname: '',
        // 用户账户
        account: '',
        // 用户手机号码
        mobile: '',
        // 用户token
        token: ''
      }
    }
  },

  mutations: {
    // 修改用户信息，paload就是用户信息集
    setUserInfo (state, payload) {
      state.profile = payload
    }
  }
}
