const dictsMap = {
  businessType: {
    0: '咨询',
    1: '数据',
    2: '事项',
    3: '平台',
    4: '软件',
  },
  clientType: {
    0: '客户类型1',
    1: '客户类型2',
    2: '客户类型3',
  },
  clientRela: {
    0: '重要客户',
    1: '一般客户',
    2: '待合作客户',
  },
  districtType: {
    0: '省级',
    1: '市级',
    2: '区级',
  },
  followUpStatus: {
    0: '已合作',
    1: '待合作',
    2: '未合作',
  },
}

const allTableOption = [
  {
    label: '业务类型',
    prop: 'type',
    type: 'dict',
  },
  {
    label: '客户类型',
    prop: 'type',
    type: 'dict',
  },
  {
    label: '客户关系',
    prop: 'guanxi',
  },
  {
    label: '市场经理',
    prop: 'jingli',
  },
]

const collaborationTableOption = [
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
  }
}

const initSearchForm = () => {
  return {
    clientName: '',
  }
}

const rules = {
  name: [
    { required: true, message: '请输入组织名称', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
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
  collaborationTableOption,
  initFormData,
  rules,
  initContactForm,
  initVisitForm,
  initConsultaForm,
  initSearchForm,
}
