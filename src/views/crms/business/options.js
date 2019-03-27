const initForm = () => {
  return {
    id: '', // ID
    clientName: '', // 客户名称 clientName
    projectName: '', // 项目名称 projectName
    businessType: [], // 业务类型 businessType
    intentionLevelKey: '', // 意向程度 intentionLevel
    tags: [], // 商机标签 businessTag
    opportunityDes: '', // 商机描述
    publisher: '', //发布者
    publishDate: '', //发布日期
    reciver: '', //认领人
  }
}
// 全部客户搜索
const allSearchForm = () => {
  return {
    clientName: '',
    intentionLevel: '',
    projectName: '',
    statusValue: '',
    businessTypeKey: [],
  }
}
// 我的客户/协作客户搜索
const initSearchForm = () => {
  return {
    clientName: '',
    intentionLevel: '',
    projectName: '',
    businessTypeKey: [],
    publisher: '',
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
  tags: [{ required: true, message: '请添加商机标签', trigger: 'blur' }],
  opportunityDes: [
    { required: true, message: '请输入商机描述', trigger: 'blur' },
  ],
}

export { initForm, allSearchForm, initSearchForm, rules }
