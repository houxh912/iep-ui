const dictsMap = {
  status: {
    1: '考核中',
    2: '考核完成',
    3: '已过期',
  },
  scoringMethod: {
    1: '平均分',
    2: '去掉最高最低平均分',
  },
}

const columnsMap = [
  {
    prop: 'assessor',
    label: '被考核人',
  },
  {
    prop: 'assessName',
    label: '考核名称',
  },
  {
    prop: 'assessTime',
    label: '考核时间',
  },
  {
    prop: 'status',
    label: '考核状态',
    type: 'dict',
  },
  {
    prop: 'assessScore',
    label: '考核分值',
  },
]
const initFormData = () => {
  return {
    kpiName: '', // 考核名称
    startTime: '', // 开始时间
    endTime: '', // 结束时间
    timeList: [],
    templateId: '', // 考核模板
    templateName: '',
    selfWeight: '', // 自评权重
    assessorWeight: '', // 考核人权重
    scoringMethod: '', // 考核人评分方式
    covers: [], // 被考核人集合
    coversList: {
      orgs: [],
      users: [],
      unions: [],
    },
    assessors: [], // 考核人集合
    assessorsList: {
      orgs: [],
      users: [],
      unions: [],
    },
  }
}

const validateSelfWeight = (rule, value, callback) => {
  if (/^[1-9]*[1-9][0-9]*$/.test(value) && value >= 0 && value <= 100) {
    callback()
  } else {
    callback(new Error())
  }
}

const validateAssessorWeight = (rule, value, callback) => {
  if (/^[1-9]*[1-9][0-9]*$/.test(value) && value >= 0 && value <= 100) {
    callback()
  } else {
    callback(new Error())
  }
}

const validateZero = (rule, value, callback) => {
  if (value.users.length == 0) {
    callback(new Error())
  } else {
    callback()
  }
}

const validateCovers = (rule, value, callback) => {
  if (value.users.length > 5) {
    callback(new Error())
  } else {
    callback()
  }
}

const validateAssessors = (rule, value, callback) => {
  if (value.users.length > 5) {
    callback(new Error())
  } else {
    callback()
  }
}

const rules = {
  kpiName: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  timeList: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  templateId: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  coversList: [
    { required: true, message: '必填', trigger: 'change' },
    { validator: validateZero, message: '请至少选择一名被考核人', trigger: 'change' },
    { validator: validateCovers, message: '最多只可选择五名被考核人', trigger: 'change' },
  ],
  assessorsList: [
    { required: true, message: '必填', trigger: 'change' },
    { validator: validateZero, message: '请至少选择一名被考核人', trigger: 'change' },
    { validator: validateAssessors, message: '最多只可选择三名考核人', trigger: 'change' },
  ],
  selfWeight: [
    { required: true, message: '必填', trigger: 'blur' },
    { validator: validateSelfWeight, message: '请输入0-100的正整数', trigger: 'change' },
  ],
  assessorWeight: [
    { required: true, message: '必填', trigger: 'blur' },
    { validator: validateAssessorWeight, message: '请输入1-100的正整数', trigger: 'change' },
  ],
  scoringMethod: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
}

const initSearchForm = () => {
  return {
    name: '',
    assessName: '',
  }
}

export { dictsMap, columnsMap, initFormData, initSearchForm, rules }