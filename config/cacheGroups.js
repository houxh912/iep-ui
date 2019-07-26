exports.cacheGroups = {
  // test: path.resolve(__dirname, '../node_modules'),
  echarts: {
    name: 'echarts',
    test: /[\\/]node_modules[\\/]echarts[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  element: {
    name: 'element',
    test: /[\\/]node_modules[\\/]element-ui[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  antDesign: {
    name: 'ant-design',
    test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  appChannel: {
    name: 'app-channel',
    test: /[\\/]src[\\/]views[\\/]app[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  components: {
    name: 'components',
    test: /[\\/]src[\\/]components[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  fams: {
    name: 'fams',
    test: /[\\/]src[\\/]views[\\/]fams[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  hrms: {
    name: 'hrms',
    test: /[\\/]src[\\/]views[\\/]hrms[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  exam: {
    name: 'exam',
    test: /[\\/]src[\\/]views[\\/]exam[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  mlms: {
    name: 'mlms',
    test: /[\\/]src[\\/]views[\\/]mlms[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  crms: {
    name: 'crms',
    test: /[\\/]src[\\/]views[\\/]crms[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  gpms: {
    name: 'gpms',
    test: /[\\/]src[\\/]views[\\/]gpms[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  goms: {
    name: 'goms',
    test: /[\\/]src[\\/]views[\\/]goms[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  wenjuan: {
    name: 'wenjuan',
    test: /[\\/]src[\\/]views[\\/]wenjuan[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  admin: {
    name: 'admin',
    test: /[\\/]src[\\/]views[\\/]admin[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
}