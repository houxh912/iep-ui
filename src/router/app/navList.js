const e_ICAN_URL = '//www.icanvip.net/'
const navList = [
  {
    id: `${e_ICAN_URL}`,
    name: '首页',
  }, {
    id: `${e_ICAN_URL}newsList/`,
    name: '头条新知',
  }, {
    id: `${e_ICAN_URL}businessList/`,
    name: '任务协作',
  }, {
    id: `${e_ICAN_URL}dataAssets/`,
    name: '数据资产',
  }, {
    id: `${e_ICAN_URL}masterList/`,
    name: '人脉资本',
  }, {
    id: `${e_ICAN_URL}thoughtsList/`,
    name: '我要说说',
  },
]
const navPathList = navList.map(m => m.id)
export { navList, navPathList }
