const dictsMap = {
  status: {
    0: '待认领',
    1: '已认领',
  },
}

const initFormData = () => {
  return {
    name: '',
  }
}

const rules = {}

const allTableOption = [
  { label: '客户名称', prop: 'clientName' },
  { label: '项目名称', prop: 'projectName' },
  { label: '业务类型', prop: 'businessTypeC' },
  { label: '意向程度', prop: 'intentionLevel' },
  { label: '客户经理', prop: 'publisher' },
  { label: '认领状态', prop: 'status', type: 'dict' },
]

export { dictsMap, initFormData, rules, allTableOption }