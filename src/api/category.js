// 首页API接口函数
// 导入之前我们封装好的请求工具
import request from '@/utils/request'

/**
 * 获取首页头部分类数据
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

/**
 * 获取顶级类目信息（children属性）
 * @param {String} id - 顶级类目id
 * @returns Promise
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
