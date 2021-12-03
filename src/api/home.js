// 定义首页API接口函数

import request from '@/utils/request'

/**
 * 获取品牌信息
 * @param {Integer} limt - 品牌个数
 * @returns Promise
 */

export const findBrand = (limt = 6) => {
  return request('/home/brand', 'get', { limt })
}
