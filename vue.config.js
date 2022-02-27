// 导入path路径模块
const path = require('path')

module.exports = {
  // 插件的配置
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
  },
  // 图片的配置，将10kb以下的图片转换为base64编码格式
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10000 }))
  }
}
