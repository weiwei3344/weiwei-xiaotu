// 导入path路径模块
const path = require('path')

module.exports = {
  pluginOptions: {
    // 使用vuecli的style-resources-loader插件完成自动注入到每个less文件或者vue组件中style标签
    // 简单来说，就是less的自动化，不用每次都引入到组件中
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 将需要注入的目录放在这里
        // 路径最好取绝对路径
        // 使用path.join来拼接路径
        path.join(__dirname, './src/assets/styles/mixins.less'),
        path.join(__dirname, './src/assets/styles/variables.less')
      ]
    }
  }
}
