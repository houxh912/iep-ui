import { mergeByFirst } from '@/util/util'
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
const initDtoForm = () => {
  return {
    id: '',
    clientName: '', //客户名称
    type: [], //客户类型
    districtType: '', // 区域类型
    businessType: [], // 业务类型
    specificType: '', //具体业务类型
    relation: 1, //客户关系
    status: 2, // 跟进状态
    marketManager: '', // 市场经理
    lastTime: '', // 距离上次拜访已有(全部客户没有但依然存着)
    tags: [], //客户标签
    phoneNum: '', //手机号码
    respDept: '', //负责部门
    url: '', //单位网址
    function: '', //单位职能
    address: '', //单位地址
    otherDesc: '', //其他说明
    sex: '', //性别
    products: '', // 相关产品
    scheme: '', //方案
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
const formToDto = row => {
  const newForm = mergeByFirst(initDtoForm(), row)
  newForm.positionId = row.position[row.position.length - 1]
  newForm.deptId = row.dept[row.dept.length - 1]
  return newForm
}
const rules = {
  name: [
    { required: true, message: '客户名称', trigger: 'blur' },
    { min: 6, max: 50, message: '至少6个字', trigger: 'blur' },
  ],
  phoneNum: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { min: 11, max: 11, message: '手机位数为11位', trigger: 'blur' },
  ],
  districtType: [
    { required: true, message: '请选择区域类型', trigger: 'blur' },
  ],
  marketManager: [
    { required: true, message: '请填写市场经理', trigger: 'blur' },
  ],
  respDept: [{ required: true, message: '请选择负责部门', trigger: 'blur' }],
  url: [{ required: true, message: '请填写单位网址', trigger: 'blur' }],
  function: [{ required: true, message: '请填写单位职能', trigger: 'blur' }],
  address: [{ required: true, message: '请填写单位地址', trigger: 'blur' }],
  otherDesc: [{ required: true, message: '请填写其他说明', trigger: 'blur' }],
  type: [{ required: true, message: '请选择客户类型', trigger: 'blur' }],
  businessType: [
    { required: true, message: '请选择业务类型', trigger: 'blur' },
  ],
  specificType: [
    { required: true, message: '请填写具体业务类型', trigger: 'blur' },
  ],
  relation: [{ required: true, message: '请选择客户关系', trigger: 'blur' }],
  status: [{ required: true, message: '请选择跟进状态', trigger: 'blur' }],
}

export { initForm, initDtoForm, formToDto, initSearchForm, rules }
