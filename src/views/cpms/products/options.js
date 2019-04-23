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
    versions: [],//版本集合
    moduleRelations: [],//模块关联集合
    materialRelations: [],//材料关联集合
    userRelationCharges: [],//负责人集合
    userRelationDemands: [],//需求方集合
    userRelationTechnologys: [],//技术经理集合
    userRelationProducts: [],//产品经理集合
    userRelationTeams: [],//团队成员集合
  }
}

const toDtoForm = (row) => {
  const newForm = { ...row }
  newForm.userCharges = row.userRelationCharges.map(m => m.id)
  newForm.userDemands = row.userRelationDemands.map(m => m.id)
  newForm.userTechnologys = row.userRelationTechnologys.map(m => m.id)
  newForm.userProducts = row.userRelationProducts.map(m => m.id)
  newForm.userTeams = row.userRelationTeams.map(m => m.id)
  newForm.modules = row.moduleRelations.map(m => m.id)
  newForm.materials = row.materialRelations.map(m => m.id)

  delete newForm.userRelationCharges
  delete newForm.userRelationDemands
  delete newForm.userRelationTechnologys
  delete newForm.userRelationProducts
  delete newForm.userRelationTeams
  delete newForm.moduleRelations
  delete newForm.materialRelations

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

const rules = {
  tagKeywords: [
    { type: 'array', min: 3, message: '标签至少 3 个', trigger: 'change' },
    { type: 'array', required: true, message: '请填写标签', trigger: 'change' },
  ],
}

export { dictsMap, columnsMap, Column, initForm, toDtoForm, initSearchForm, rules }
