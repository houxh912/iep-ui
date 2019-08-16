const utils = require('./config/utils')
const cacheGroups = require('./config/cacheGroups')
const devServer = require('./config/devServer')
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production'
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'lodash': '_',
  'axios': 'axios',
  'element-ui': 'ELEMENT'
}
const commonCss = [
  '/cdn/animate/animate.css',
  '/cdn/iconfont/index.css',
  '/cdn/iep/index.css',
  '/cdn/avue.index.css',
  '/cdn/element-ui.css',
  '/cdn/froala-editor/css/froala_editor.pkgd.min.css',
  '/cdn/froala-editor/css/froala_style.min.css',
  '/cdn/froala-editor/css/themes/gray.min.css',
]
const commonJs = [
  '/cdn/jquery.min.js',
  '/cdn/froala-editor/froala_editor.pkgd.min.js',
  '/cdn/froala-editor/zh_cn.js',
]
// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [...commonCss],
    js: [...commonJs]
  },
  // 生产环境
  build: {
    css: [...commonCss],
    js: [
      ...commonJs,
      '/cdn/vue.runtime.min.js',
      '/cdn/vue-router.min.js',
      '/cdn/vuex.min.js',
      '/cdn/axios.min.js',
      '/cdn/element-ui.js',
      '/cdn/lodash.min.js'
    ]
  }
}

module.exports = {
  lintOnSave: true,
  chainWebpack: config => {
    // config.entry('index').add('babel-polyfill').end()
    config.plugin('html').tap(args => {
      args[0].title = '我能一站式数字化转型服务平台'
      args[0].url = 'iep.govmade.com'
      if (isProduction) {
        args[0].cdn = cdn.build
      } else {
        args[0].cdn = cdn.dev
      }
      return args
    })
    if (isProduction) {
      // 删除预加载
      // config.plugins.delete('preload')
      // config.plugins.delete('prefetch')
    }
    config
      .plugin('webpack-context-replacement')
      .use(require('webpack').ContextReplacementPlugin, [
        /moment[/\\]locale$/,
        /zh-cn/,
      ])
    config.plugin('define').tap(definitions => {
      definitions[0] = Object.assign(definitions[0], {
        BUILD_PROJECT: JSON.stringify(utils.getProject()),
        BUILD_TEAM_NAME: JSON.stringify(utils.getProjectTeam()),
        BUILD_PRO_NAME: JSON.stringify(utils.getProjectName()),
        BUILD_VER_TAG: JSON.stringify(utils.getCurrentTag()),
        BUILD_GIT_HASH: JSON.stringify(utils.getGitHash()),
        BUILD_PRO_DESC: JSON.stringify(utils.getProjectDesc()),
        BUILD_TIME: Date.parse(new Date()),
      })
      return definitions
    })
    return config
  },
  configureWebpack: config => {
    if (isProduction) {
      // 用cdn方式引入
      config.optimization = {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: false, // Must be set to true if using source-maps in production
            terserOptions: {
              compress: {
                warnings: false,
                drop_debugger: true,
                // drop_console: true,
              }
              // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            }
          }),
        ],
        providedExports: true,
        usedExports: true,
        //识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
        //依赖于optimization.providedExports和optimization.usedExports
        sideEffects: true,
        //取代 new webpack.optimize.ModuleConcatenationPlugin()
        concatenateModules: true,
        //取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
        noEmitOnErrors: true,
        splitChunks: {
          // maxAsyncRequests: 1,                     // 最大异步请求数， 默认1
          // maxInitialRequests: 1,                   // 最大初始化请求书，默认1
          cacheGroups: cacheGroups.cacheGroups
        }
      }
      config.externals = externals
    } else {
      // 为开发环境修改配置...
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true,
    // 开启 CSS source maps?
    // sourceMap: false,
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#24a1f1',
          // 'link-color': '#1DA57A',
          // 'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      },
      // pass options to sass-loader
      sass: {
        // 引入全局变量样式,@使我们设置的别名,执行src目录
        data: `
            @import "@/styles/approval.scss";
            @import "@/styles/variables.scss";
        `,
      },
    },
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false,
  },
  // 配置转发代理
  devServer: {
    host: devServer.host, // can be overwritten by process.env.HOST
    open: false,
    port: devServer.port, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    proxy: devServer.proxy,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  pwa: {
    name: 'iep-2.0',
    themeColor: '#24a1f1',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
}
