const navList = [
  {
    id: '//218.205.124.18:10056/',
    name: '首页',
  }, {
    id: '//218.205.124.18:10056/newsList',
    name: '头条新知',
  }, {
    id: '//218.205.124.18:10056/businessList',
    name: '商机合作',
  }, {
    id: '//218.205.124.18:10056/',
    name: '数据资产',
  }, {
    id: '//218.205.124.18:10056/',
    name: '师傅专家',
  }, {
    id: '//218.205.124.18:10056/thoughtsList',
    name: '我要说说',
  },
]
const navPathList = navList.map(m => m.id)
export { navList, navPathList }