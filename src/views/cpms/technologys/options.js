// org config options
const dictsMap = {
  status: {
    0: '待开发', 1: '开发中', 2: '已完成',
  },
}

const columnsMap = []

const Column = {
  id: '',
  name: '', // 名字
  imageUrl: '', // logo
  synopsis: '', // 简介
  userRelationCharges: [], // 负责人s
}

const initForm = () => {
  return {
    id: '', // ID
    imageUrl: '', // logo
    number: '', // 编号
    name: '', // 名称
    englishName: '', // 英文名称
    status: '', // 状态（0-待开发，1-开发中，2-已完成）
    type: '', // 类别
    synopsis: '', // 简介
    description: '', // 介绍
    moduleRelations: [],//模块关联集合
    materialRelations: [],//材料关联集合
    technologyRelations: [],//技术关联集合
    userRelationCharges: [],//负责人集合
    tagKeywords: [],//关联标签
  }
}

const toDtoForm = (row) => {
  const newForm = { ...row }
  newForm.userCharges = row.userRelationCharges.map(m => m.id)
  newForm.technologys = row.technologyRelations.map(m => m.id)
  newForm.materials = row.materialRelations.map(m => m.id)
  newForm.modules = row.moduleRelations.map(m => m.id)
  return newForm
}

const initSearchForm = () => {
  return {
    type: '',
    status: '',
  }
}

export { dictsMap, columnsMap, Column, initForm, toDtoForm, initSearchForm }
