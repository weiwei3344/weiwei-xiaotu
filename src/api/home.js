// 定义首页API接口函数

import request from '@/utils/request'

/**
 * 获取品牌信息
 * @param {Integer} limt - 品牌个数
 * @returns Promise
 */
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}

/**
 * 获取首页广告区图片
 * @returns Promise
 */
export const findBanner = () => {
  return request('/home/banner', 'get')
}

/**
 * 获取首页新鲜好物数据
 * @returns Promise
 */
export const findNew = () => {
  return request('/home/new', 'get')
}

/**
 * 获取首页人气推荐数据
 * @returns Promise
 */
export const findHot = () => {
  return request('/home/hot', 'get')
}
