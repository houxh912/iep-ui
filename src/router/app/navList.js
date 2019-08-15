const navList = [
  {
    id: '/app/index',
    name: '首页',
  }, {
    id: '/app/person',
    name: '头条新知',
  }, {
    id: '/app/resource',
    name: '上级合作',
  }, {
    id: '/app/products',
    name: '方案实例',
  }, {
    //   id: '/app/news',
    //   name: '要闻',
    // }, {
    id: '/app/data',
    name: '师傅专家',
  }, {
    id: '/app/wealth',
    name: '数据资产',
  }, {
    id: '/app/project',
    name: '学堂考试',
  }, {
    //   id: '/app/policyCenter',
    //   name: '政策中心',
    //   show: 'show',
    // }, {
    id: '/app/more_thoughts',
    name: '我要说说',
  },
]
const navPathList = navList.map(m => m.id)
export { navList, navPathList }