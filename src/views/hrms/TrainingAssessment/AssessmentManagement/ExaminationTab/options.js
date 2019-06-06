const dictsMap = {
  status: {
    0: '考核中',
    1: '考核完成',
    2: '已过期',
  },
  scoringMethod: {
    1: '平均分',
    2: '去掉最高最低平均分',
  },
}

const columnsMap = [
  {
    prop: 'userName',
    label: '被考核人',
  },
  {
    prop: 'kpiName',
    label: '考核名称',
  },
  {
    prop: 'time',
    label: '考核时间',
  },
  {
    prop: 'status',
    label: '考核状态',
    type: 'dict',
    width:  '200px',
  },
  {
    prop: 'score',
    label: '考核分值',
    width:  '200px',
  },
]
const initFormData = () => {
  return {
    coverId: '',
    kpiType: 1,
    score: '',
    evaluate: '',
    kpiRelations: [], // checkId score
  }
}

const rules = {
  score: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  evaluate: [
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