const dictsMap = {
  // 业务类型
  // businessType: {
  //   0: '咨询',
  //   1: '数据',
  //   2: '事项',
  //   3: '平台',
  //   4: '软件',
  // },
  // clientType: {
  //   0: '客户类型1',
  //   1: '客户类型2',
  //   2: '客户类型3',
  // },
  // 客户关系
  // clientRela: {
  //   0: '核心客户',
  //   1: '重要客户',
  //   2: '一般客户',
  //   3: '潜在客户',
  //   4: '其他客户',
  // },
  // 区域类型
  // districtType: {
  //   0: '省级',
  //   1: '市级',
  //   2: '区级',
  // },
  // 跟进状态
  // followUpStatus: {
  //   0: '已合作',
  //   1: '待合作',
  //   2: '未合作',
  // },
}

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

// 我的客户搜索
const initSearchForm = () => {
  return {
    clientName: '',
  }
}

// 全部客户搜索
const allSearchForm = () => {
  return {
    clientName: '',
    businessType: '',

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
  respDept: [
    { required: true, message: '请选择负责部门', trigger: 'blur' },
  ],
  companyUrl: [
    { required: true, message: '请填写单位网址', trigger: 'blur' },
  ],
  companyFunction: [
    { required: true, message: '请填写单位职能', trigger: 'blur' },
  ],
  contractAddress: [
    { required: true, message: '请填写单位地址', trigger: 'blur' },
  ],
  otherDesc: [
    { required: true, message: '请填写其他说明', trigger: 'blur' },
  ],
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

const initContactForm = () => {
  return {
    name: '',
  }
}

const initVisitForm = () => {
  return {
    name: '',
  }
}

const initConsultaForm = () => {
  return {
    name: '',
  }
}
export {
  dictsMap,
  allTableOption,
  myTableOption,
  initFormData,
  initSearchForm,
  allSearchForm,
  rules,
  initContactForm,
  initVisitForm,
  initConsultaForm,
}
