import { getStore } from '@/util/store'
const dicData = getStore({ name: 'dictGroup' })
let changeDictFn = (name) => {
  let obj = {}
  for (let item of dicData[name]) {
    obj[item.value] = item.label
  }
  return obj
}


export const dictsMap = {
  // contractType: [
  //   { value: '0', label: '内部合同' },
  //   { value: '1', label: '外部合同' },
  // ],
  contractType: {
    '0': '内部合同',
    '1': '外部合同',
  },
  businessType: changeDictFn('mlms_business_type'),
  contractStatus: changeDictFn('mlms_contract_status'),
  contractLevel: changeDictFn('mlms_contract_level'),
}

export const deptList = [
  { id: 1, name: '浙江省教育厅' },
  { id: 2, name: '浙江省渔业厅' },
]

export const tableOption = [
  {
    label: '合同类型',
    prop: 'contractType',
    type: 'dict',
  }, {
    label: '合同金额',
    prop: 'contractAmount',
  }, {
    label: '合同状态',
    prop: 'contractStatus',
    type: 'dict',
  }, {
    label: '回款率',
    prop: '',
  },
]

export const initFormData = () => {
  return {
    contractName: '',
    contractExpl: '',
    contractType: '', // 合同类型
    businessType: '',
    tagKeyWords: [],
    signTime: '',
    finishTime: '',
    companyOrgId: '',
    signCompanyOrgId: '',
    signDeptOrgId: '', // 签署部门
    signDeptOrgName: {},
    underTakeDeptId: [], // 承接部门
    underTakeDeptList: [],
    directorId: '', // 市场经理-id
    directorName: '', // 市场经理-name
    directorList: {
      id: 0,
      name: '',
    }, // 市场经理-list
    contractAmount: '',
    contractLevel: '',
    contractStatus: '',
    deposit: '',
  }
}

export const rules = {
  contractName: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  contractExpl: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  contractType: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  businessType: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  tagKeyWords: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  signTime: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  finishTime: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  companyOrgId: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  signCompanyOrgId: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  signDeptOrgId: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  signDeptOrgName: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  underTakeDeptId: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  underTakeDeptList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  directorId: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  directorName: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  directorList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  contractAmount: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  contractLevel: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  contractStatus: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  deposit: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
}
