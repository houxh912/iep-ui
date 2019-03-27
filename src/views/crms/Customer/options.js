const allTableOption = [
  {
    label: '业务类型',
    prop: 'businessTypeC',
  },
  {
    label: '区域类型',
    prop: 'districtTypeName',
  },
  {
    label: '客户关系',
    prop: 'clientRelaName',
  },
  {
    label: '跟进状态',
    prop: 'followUpStatusName',
  },
  {
    label: '市场经理',
    prop: 'marketManager',
  },
]

const myTableOption = [
  {
    label: '业务类型',
    prop: 'businessTypeC',
  },
  {
    label: '区域类型',
    prop: 'districtTypeName',
  },
  {
    label: '客户关系',
    prop: 'clientRelaName',
  },
  {
    label: '跟进状态',
    prop: 'followUpStatusName',
  },
  {
    label: '市场经理',
    prop: 'marketManager',
  },
  // {
  //   label: '距离上次拜访',
  //   prop: 'date',
  // },
]

const initFormData = () => {
  return {
    id: '',
    name: '',
    clientTypeKey: [],
    businessTypeKey: [],
    businessType: 9,
    clientName: '',
  }
}
const initForm = () => {
  return {
    clientId: '',
    clientName: '', //客户名称
    clientTypeKey: [], //客户类型
    districtType: '', // 区域类型
    businessTypeKey: [], // 业务类型
    specificBusinessType: '', //具体业务类型
    clientRela: '', //客户关系
    followUpStatus: '', // 跟进状态
    marketManager: '', // 市场经理
    lastTime: '', // 距离上次拜访已有(全部客户没有但依然存着)
    phoneNumber: '', //手机号码
    respDept: '', //负责部门
    companyUrl: '', //单位网址
    companyFunction: '', //单位职能
    contractAddress: '', //单位地址
    otherDesc: '', //其他说明
    tags: [1, 2],
  }
}
// 全部客户搜索
const allSearchForm = () => {
  return {
    clientName: '',
    districtType: '',
    clientRela: '',
    followUpStatus: '',
    businessTypeKey: [],
    marketManager: '',
  }
}
// 我的客户/协作客户搜索
const initSearchForm = () => {
  return {
    clientName: '',
    districtType: '',
    clientRela: '',
    followUpStatus: '',
    businessTypeKey: [],
    lastTime: '',
  }
}
const rules = {
  clientName: [
    { required: true, message: '客户名称', trigger: 'blur' },
    { min: 6, max: 50, message: '至少6个字', trigger: 'blur' },
  ],
  phoneNumber: [
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
  companyUrl: [{ required: true, message: '请填写单位网址', trigger: 'blur' }],
  companyFunction: [
    { required: true, message: '请填写单位职能', trigger: 'blur' },
  ],
  contractAddress: [
    { required: true, message: '请填写单位地址', trigger: 'blur' },
  ],
  otherDesc: [{ required: true, message: '请填写其他说明', trigger: 'blur' }],
  clientTypeKey: [
    { required: true, message: '请选择客户类型', trigger: 'blur' },
  ],
  businessTypeKey: [
    { required: true, message: '请选择业务类型', trigger: 'blur' },
  ],
  specificBusinessType: [
    { required: true, message: '请填写具体业务类型', trigger: 'blur' },
  ],
  clientRela: [
    { required: true, message: '请选择客户关系', trigger: 'blur' },
  ],
  followUpStatus: [
    { required: true, message: '请选择跟进状态', trigger: 'blur' },
  ],
}

export {
  allTableOption,
  myTableOption,
  initFormData,
  initSearchForm,
  allSearchForm,
  rules,
  initForm,
}
