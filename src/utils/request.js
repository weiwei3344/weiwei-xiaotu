// 封装请求，响应拦截器

// 1、创建一个新的axions实例
// 2、请求拦截器：如果有token就进行头部携带
// 3、响应拦截器：1：剥离无效数据 2：处理token失效
// 4、导出一个函数，调用当前的axios发请求，函数返回值Promise

// 导入axios
import axios from 'axios'
// 导入vuex仓库
import store from '@/store'

// 导出基准地址，原因：其他地方不是通过axios发请求的地方用上基准地址
export const baseURL = ''

// 创建axios实例
const instance = axios.create({
  // axios配置选项，例如baseURL timeout
  baseURL,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 拦截时候处理的事件：会给一个默认参数config，你需要将config修改后返回出去
    // 进行请求配置的修改： 如果本地有token，就将token在头部携带，做了vuex的持久化，所以token在vuex中
    
    // 获取用户信息对象
    const { profile } = store.state.user

    // 判断是否有token
    if(profile.token){
      // 设置token
      config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
  },
  err => {
    // 拦截失败处理的事件：这里直接返回错误对象
    new Promise.reject(err)
})
