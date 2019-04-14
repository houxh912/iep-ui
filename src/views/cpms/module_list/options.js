// org config options
const dictsMap = {
  schedule: {
    1: '立项',
    2: '研发中',
    3: '测试',
    4: '验收中',
    5: '已上架',
  },
}

const columnsMap = [
]

const Column = {
  id: '',
  name: '', // 名字
  imageUrl: '', // logo
  synopsis: '', // 简介
  userRelationCharges: [], // 负责人s
  onlineTime: '', // 上线时间
}

const initForm = () => {
  return {
    id: '', // ID
    imageUrl: '', // logo
    number: '', // 编号
    name: '', // 名称
    type: '', // 类别
    guidePrice: '', // 模块指导价
    preferentialPrice: '', // 模块优惠价
    synopsis: '', // 简介
    description: '', // 介绍
    schedule: 1,//研发进度（1-立项，2-研发中，3-测试，4-验收中，5-已上架）
    onlineTime: '',//上线时间
    versions: [],//版本集合
    productRelations: [],//产品关联集合
    technologyRelations: [],//技术关联集合
    materialRelations: [],//材料关联集合
    userRelationCharges: [],//负责人集合
    userRelationDemands: [],//需求方集合
    userRelationTechnologys: [],//技术经理集合
    userRelationProducts: [],//产品经理集合
    userRelationTeams: [],//团队成员集合
    tagKeywords: [],//关联标签
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