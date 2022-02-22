// 获取商品信息

import request from '@/utils/request'

/**
 * 获取商品信息
 * @param {String} id 商品ID
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}
