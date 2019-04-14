// org config options
const dictsMap = {
}

const columnsMap = []

const Column = {
  id: '',
  name: '', // 名字
  imageUrl: '', // logo
  synopsis: '', // 简介
  userList: [], // 负责人
  onlineTime: '', // 上线时间
}

const initForm = () => {
  return {
    id: '', // ID
    imageUrl: '', // logo
    number: '', // 编号
    name: '', // 名称
    website: '', // 网址
    onlineTime: '',//上线时间
    tagKeywords: [], // 标签
    tapeLibrary: '', // 是否带库
    valuation: '', // 产品估值
    instructions: '', // 估值说明
    synopsis: '', // 产品简介
    description: '', // 产品介绍
    userRelationCharges: [],//负责人ids
    userRelationDemands: [],//需求方ids
    userRelationTechnologys: [],//技术经理ids
    userRelationProducts: [],//产品经理ids
    userRelationTeams: [],//团队成员ids
    versions: [],//关联模块ids
    modules: [],//关联模块ids
    materials: [],//关联材料ids
  }
}

const toDtoForm = (row) => {
  const newForm = { ...row }
  newForm.userCharges = row.userRelationCharges.map(m => m.id)
  newForm.userDemands = row.userRelationDemands.map(m => m.id)
  newForm.userTechnologys = row.userRelationTechnologys.map(m => m.id)
  newForm.userProducts = row.userRelationProducts.map(m => m.id)
  newForm.userTeams = row.userRelationTeams.map(m => m.id)
  return newForm
}

const initSearchForm = () => {
  return {
    theme: '',
    teacher: '',
    type: '',
    date: '',
  }
}

export { dictsMap, columnsMap, Column, initForm, toDtoForm, initSearchForm }
