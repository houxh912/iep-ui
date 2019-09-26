export default {
  title: 'Iep',
  logo: 'Iep',
  indexTitle: '我能智慧组织赋能平台',
  whiteList: ['/login', '/404', '/401', '/lock'], // 配置无权限可以访问的页面
  whiteTagList: ['/login', '/404', '/401', '/lock'], // 配置不添加tags页面 （'/advanced-router/mutative-detail/*'——*为通配符）
  lockPage: '/lock',
  tokenTime: 6000,
  info: {
    title: '我能智慧组织赋能平台',
    list: [],
  },
  statusWhiteList: [428],
  // http的status默认放行不才用统一处理的,
  // 配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    label: '首页',
    value: '/wel/index',
    params: {},
    query: {},
    group: [],
    close: false,
  },
  // 配置菜单的属性
  menu: {
    props: {
      name: 'name',
      label: 'label',
      path: 'path',
      icon: 'icon',
      children: 'children',
    },
    firstMenu: {
      name: '个人赋能台',
      path: '/wel/index',
      modulePath: '/wel',
    },
  },
  collectWebsite: [
    {
      name: '国脉电子政务网',
      url: 'http://www.echinagov.com/',
    },
    {
      name: '国脉智慧城市网',
      url: 'http://www.besticity.com/',
    },
    {
      name: '国脉物联网',
      url: 'http://www.im2m.com.cn/',
    },
    {
      name: '司马钱',
      url: 'http://www.smartqian.com/',
    },
    {
      name: '数邦客',
      url: 'http://www.databanker.cn/',
    },
    {
      name: '中船通',
      url: 'http://www.allship.cn/',
    },
    {
      name: '蟠桃会',
      url: 'http://www.51banhui.com/',
    },
    {
      name: '营商通',
      url: 'https://www.govmade.com/yingst/',
    },
    {
      name: '国策数据',
      url: 'http://gc.govmade.cn/',
    },
  ],
  backupUrl: [
    {
      name: '移动',
      url: 'http://218.205.124.18:1888/',
    },
    {
      name: '网通',
      url: 'http://123.157.68.243:1888/',
    },
    {
      name: '电信',
      url: 'http://183.131.134.242:1888/',
    },
  ],
}
