import { createApp } from 'vue'
import App from './App.vue'

// 导入路由
import router from './router'

// 导入存储结构
import store from './store'

// 导入noralize.css基础样式库
import 'normalize.css'

// 导入项目的基本样式库
import '@/assets/styles/common.less'

createApp(App).use(store).use(router).mount('#app')
