// org config options
const dictsMap = {
  status: {
    0: '正常',
    1: '待审核',
    2: '锁定',
    3: '待配置',
  },
}

const optionMap = [{
  label: '锁定',
  value: 2,
}, {
  label: '解锁',
  value: 0,
}]

const columnsMap = [
  {
    prop: 'realName',
    label: '真实姓名',
  },
  {
    prop: 'phone',
    label: '手机',
  },
  {
    prop: 'assetOrg',
    label: '资产所属',
  },
  {
    prop: 'status',
    label: '员工状态',
    type: 'dict',
  },
]

const initForm = () => {
  return {
    orgId: '',
    logo: '',
    name: '',
    abrName: '',
    establishTime: '',
    creatorName: '',
    contactMethod: '',
    intro: '',
    structure: '',
    coreAdvantage: '',
    abilityTag: [],
    learningTag: [],
  }
}


const initSearchForm = () => {
  return {
    name: '',
  }
}

const rules = {
  platformName: [
    { required: true, message: '请输入平台名称', trigger: 'blur' },
  ],
  web: [
    { required: true, message: '请输入平台网址', trigger: 'blur' },
  ],
  desc: [
    { required: true, message: '请输入平台介绍', trigger: 'blur' },
  ],
}
export { rules,dictsMap, columnsMap, optionMap, initSearchForm, initForm }