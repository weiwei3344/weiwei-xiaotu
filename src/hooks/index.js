// hooks封装逻辑，提供响应式数据

// 封装钩子函数，实现数据懒加载
// 窗口缩放对该方法起作用
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

// 数据懒加载函数
/**
 * 数据懒加载函数
 * @param {Function} apiFn 请求数据的方法
 * @returns target Dom元素
 * @returns result 请求数据后接收的函数
 */
export const useLazyData = (apiFn) => {
  // 需要的东西
  // 1、被观察的对象，一定是一个dom元素
  // 2、不同的请求数据的API函数
  const target = ref(null)
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop()
        // 调用API函数获取数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    }
  )

  // 返回数据（dom，后台数据）
  return {
    target,
    result
  }
}
