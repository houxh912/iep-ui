const utils = require('./config/utils')
const devServer = require('./config/devServer')
// const IS_PRODUCTION = process.env.NODE_ENV === 'production'
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  // pages: {
  //   index: {
  //     // page 的入口
  //     entry: IS_PRODUCTION ? 'src/main.js' : 'src/main.dev.js',
  //     // 模板来源
  //     template: IS_PRODUCTION ? 'public/index.html' : 'public/index.dev.html',
  //   },
  // },
  // configureWebpack: {
  //   externals: IS_PRODUCTION
  //     ? {
  //       vue: 'Vue',
  //       vuex: 'Vuex',
  //       'vue-router': 'VueRouter',
  //       'element-ui': 'ELEMENT',
  //       '@smallwei/avue/lib/index.js': 'AVUE',
  //     }
  //     : undefined,
  // },
  chainWebpack: config => {
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

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#BA1B21',
          // 'link-color': '#1DA57A',
          // 'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    }
  },
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
  },
}
