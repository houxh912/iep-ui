const navList = [
  {
    id: '//www.icanvip.net/',
    name: '首页',
  }, {
    id: '//www.icanvip.net/newsList',
    name: '头条新知',
  }, {
    id: '//www.icanvip.net/businessList',
    name: '商机合作',
  }, {
    id: '//www.icanvip.net/dataAssets',
    name: '数据资产',
  }, {
    id: '//www.icanvip.net/masterList',
    name: '师父专家',
  }, {
    id: '//www.icanvip.net/thoughtsList',
    name: '我要说说',
  },
]
const navPathList = navList.map(m => m.id)
export { navList, navPathList }