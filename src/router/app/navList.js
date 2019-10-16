const navList = [
  { // eslint-disable-next-line
    id: `${ICAN_URL}/`,
    name: '首页',
  }, {
    // eslint-disable-next-line
    id: `${ICAN_URL}/newsList/`,
    name: '头条新知',
  }, {
    // eslint-disable-next-line
    id: `${ICAN_URL}/businessList/`,
    name: '任务协作',
  }, {
    // eslint-disable-next-line
    id: `${ICAN_URL}/dataAssets/`,
    name: '数据资产',
  }, {
    // eslint-disable-next-line
    id: `${ICAN_URL}/masterList/`,
    name: '人脉资本',
  }, {
    // eslint-disable-next-line
    id: `${ICAN_URL}/thoughtsList/`,
    name: '我要说说',
  },
]
const navPathList = navList.map(m => m.id)
export { navList, navPathList }
