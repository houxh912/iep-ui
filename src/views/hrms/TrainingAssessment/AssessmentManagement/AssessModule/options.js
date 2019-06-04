// org config options
const dictsMap = {
  isOpen: {
    0: '开',
    1: '关',
  },
  status: {
    0: '审核通过',
    1: '待审核',
    2: '审核驳回',
  },
}

const columnsMap = [
  {
    prop: 'score',
    label: '考核分值',
  },
]

const initForm = () => {
  return {
    id: '',
    templateName: '',
    score: '',
    checks: [{
      item: '',
      explain: '',
      weight: '',
    }],
  }
}

const initSearchForm = () => {
  return {
    templateName: '',
    sex: '',
  }
}

const rules = {
  assessName: [
    { required: true, message: '请输入模版名称', trigger: 'blur' },
  ],
  templateScore: [
    { required: true, message: '请输入考核分值', trigger: 'blur' },
  ],
}

export { dictsMap, columnsMap, initForm, initSearchForm, rules }