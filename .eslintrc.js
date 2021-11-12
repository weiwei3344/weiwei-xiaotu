// eslintrc配置文件

module.exports = {

  // 要将ESLint限制为特定项目,使用root
  root: true,

  // 定义了预定义的全局变量
  env: {

    // 启用了node环境
    node: true,

    // 启用浏览器环境
    browser: true
  },
  
  // 定义插件
  extends: [

    // plugins 包名 属性值可以省略包名的前缀 
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],

  // 支持JavaScript语言选项
  parserOptions: {

    // 使用什么作为解析器
    parser: 'babel-eslint'
  },

  // 规则定义
  rules: {
    // 启用警告
    // 如果生产环境为开发,则启用警告
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // 如果生产环境为开发,则启用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}


