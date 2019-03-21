const dictsMap = {
  status: {
    0: '待认领',
    1: '已认领',
  },
  intentionLevel: {
    1: '高',
    2: '中',
    3: '低',
  },
}
const rules = {}
const initForm = () => {
  return {
    id: '', // ID
    clientName: '', // 客户名称 clientName
    projectName: '', // 项目名称 projectName
    businessType: [], // 业务类型 businessType
    intentionLevel: '', // 意向程度 intentionLevel
    businessTag: [], // 商机标签 businessTag
    opportunityDes: '', // 商机描述
    publisher: '', //发布者
    publishDate: '', //发布日期
    reciver: '', //认领人
  }
}
const initSearchForm = () => {
  return {
    clientName: '',
    businessType: '',
    intentionLevel: '',
    projectName: '',
    publisher: '',
  }
}

const allTableOption = [
  { label: '客户名称', prop: 'clientName' },
  { label: '项目名称', prop: 'projectName' },
  { label: '业务类型', prop: 'businessTypeC' },
  { label: '意向程度', prop: 'intentionLevel', type: 'dict' },
  { label: '客户经理', prop: 'publisher' },
  { label: '认领状态', prop: 'status', type: 'dict' },
]
export { dictsMap, rules, allTableOption, initForm, initSearchForm }