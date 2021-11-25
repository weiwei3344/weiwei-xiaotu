// 首页API接口函数
// 导入之前我们封装好的请求工具
import request from '@/utils/request'

/**
 * 获取首页头部分类数据
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
