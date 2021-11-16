// 封装请求，响应拦截器

// 1、创建一个新的axions实例
// 2、请求拦截器：如果有token就进行头部携带
// 3、响应拦截器：1：剥离无效数据 2：处理token失效
// 4、导出一个函数，调用当前的axios发请求，函数返回值Promise

// 导入axios
import axios from 'axios'
// 导入vuex仓库
import store from '@/store'
// 导入router路由
import router from '@/router'

// 导出基准地址，原因：其他地方不是通过axios发请求的地方用上基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'

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
    if (profile.token) {
      // 设置token
      config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
  },
  err => {
    // 拦截失败处理的事件：这里直接返回错误对象
    return err
  })

// 响应拦截器
instance.interceptors.response.use(
  // res.data：剥离无效数据。将来调用接口的时候拿到了的就是后台数据
  res => res.date,
  err => {
    // 请求失败处理的事件，如果没有什么特殊要求，可以直接返回错误对象
    // 401状态码，就进入到该函数
    // 判断状态码是否是401
    // 为什么要加上err.response，因为可能服务器没有响应
    // response.status拿到状态码
    if (err.response && err.response.status === 401) {
      // 1、清空无效信息
      // 2、跳转登录页面
      // 3、跳转需要传入当前路由地址给登录页面
      store.commit('user/setUserInfo', {})
      // 要获取当前路由地址
      // 在组件中获取： $router.path = /user：只能获取到路由命名，不能获取到路由携带的参数。  $router.fullpath：能获取到该路由完整形态
      // 在js中获取： router.currentRouter.fullpath 就是当前路由。其中router.currentRouter就是当前路由对象。但是数据是ref类型的响应式数据，所以取值的时候要使用.value来取值
      // 在取地址的时候可能会有一些拼接错误，所以我们需要转码，使用encodeURIComponent
      const fullPath = encodeURIComponent(router.currentRoute.value.fullpath)
      router.push('/login?redirectUrl' + fullPath)
    }
    return Promise.reject(err)
  }
)

// 导出一个函数，可以分开写，也可以写一起，直接导出
export default (
  url,
  method,
  submitData
) => {
  // 负责发请求：请求地址，请求方式，提交的数据
  return instance({
    url,
    method,
    // 1、如果是一个get请求，需要使用params来传递submitData
    // 2、如果不是一个get请求，则使用data来传递submitData
    // [] 设置一个动态的key，写js表达式，js表达式的执行结果当作key
    // method参数是get，Get，GET。都使用toLowerCase()转换为小写在进行判断
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
