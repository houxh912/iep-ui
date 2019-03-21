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
// 新增传的表单数据
const initForm = () => {
  return {
    id: '', // ID
    clientName: '', // 客户名称 clientName
    projectName: '', // 项目名称 projectName
    businessType: [], // 业务类型 businessType
    intentionLevel: '', // 意向程度 intentionLevel
    tags: [], // 商机标签 businessTag
    opportunityDes: '', // 商机描述
    publisher: '', //发布者
    publishDate: '', //发布日期
    reciver: '', //认领人
  }
}
const rules = {
  clientName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
  projectName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  businessType: [
    { required: true, message: '请选择业务类型', trigger: 'blur' },
  ],
  intentionLevel: [
    { required: true, message: '请选择意向程度', trigger: 'blur' },
  ],
  // tags: [{ required: true, message: '请添加商机标签', trigger: 'blur' }],
  opportunityDes: [
    { required: true, message: '请输入商机描述', trigger: 'blur' },
  ],
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
  { label: '意向程度', prop: 'intentionLevelValue' },
  { label: '认领状态', prop: 'statusValue' },
]
export { dictsMap, initForm, rules, allTableOption, initSearchForm }
