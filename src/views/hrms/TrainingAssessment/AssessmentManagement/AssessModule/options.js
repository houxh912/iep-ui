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
      checkExplan: '',
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

let validateChecksLength = (rule, value, callback) => {
  if (value.length == 0) {
    callback(new Error())
  } else {
    callback()
  }
}

let validateChecksContent = (rule, value, callback) => {
  for (let item of value) {
    for (let key in item) {
      if (item[key] == '') {
        callback(new Error())
        return
      }
    }
  }
  callback()
}

let validateChecksCount = (rule, value, callback) => {
  let counts = 0
  for (let item of value) {
    counts += parseInt(item.weight)
  }
  if (counts !== 100) {
    callback(new Error())
  } else {
    callback()
  }
}

let intValidate = (rule, value, callback) => {
  if (/^[1-9]*[1-9][0-9]*$/.test(value) || value === '') {
    callback()
  } else {
    callback(new Error())
  }
}

const rules = {
  templateName: [
    { required: true, message: '请输入模版名称', trigger: 'blur' },
  ],
  score: [
    { required: true, message: '请输入考核分值', trigger: 'blur' },
    { validator: intValidate, message: '请输入正整数', trigger: 'change' },
  ],
  checks: [
    { validator: validateChecksLength, message: '请输入至少一条指标内容', trigger: 'blur' },
    { validator: validateChecksContent, message: '请完整填写所有参数', trigger: 'blur' },
    { validator: validateChecksCount, message: '请保证所有考核项权重之和为100', trigger: 'blur' },
  ],
}

export { dictsMap, columnsMap, initForm, initSearchForm, rules }