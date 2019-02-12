const utils = require('./config/utils')
const devServer = require('./config/devServer')
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    // 忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT'
    })
    config.plugin('define').tap(definitions => {
      definitions[0] = Object.assign(definitions[0], {
        BUILD_TIME: Date.parse(new Date()),
        BUILD_GIT_HASH: JSON.stringify(utils.getGitHash()),
        BUILD_PRO_NAME: JSON.stringify(utils.getProjectName()),
        BUILD_VER_TAG: JSON.stringify(utils.getCurrentTag()),
        BUILD_PRO_DESC: JSON.stringify(utils.getProjectDesc()),
      })
      return definitions
    })
  },
  transpileDependencies: ['avue-plugin-transfer', 'avue-plugin-ueditor'],
  // 配置转发代理
  devServer: {
    host: devServer.host, // can be overwritten by process.env.HOST
    open: true,
    port: devServer.port, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    proxy: devServer.proxy,
    overlay: {
      warnings: true,
      errors: true,
    },
  }
}
