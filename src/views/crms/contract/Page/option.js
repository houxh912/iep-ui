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
    width: '180px',
  }, {
    label: '合同金额',
    prop: 'contractAmount',
    width: '180px',
  }, {
    label: '合同状态',
    prop: 'contractStatus',
    type: 'dict',
    width: '180px',
  }, {
    label: '回款率',
    prop: '',
    minWidth: '100px',
  },
]

export const initFormData = () => {
  return {
    contractName: '',
    contractExpl: '',
    contractType: '1', // 合同类型
    businessType: '',
    tagKeyWords: [],
    signTime: '',
    finishTime: '',
    companyOrgId: '', // 委托单位
    companyName: {id: '', name: ''},
    companyOrgObj: {},
    signCompanyOrgId: '', // 签署单位
    signCompanyRealName: {id: '', name: ''},
    signCompanyOrgObj: {},
    signDeptOrgId: '', // 签署组织
    signDeptName: '',
    underTakeDeptId: [], // 承接部门
    underTakeDeptName: [],
    directorId: '', // 市场经理-id
    directorName: '', // 市场经理-name
    directorList: {
      id: '',
      name: '',
    }, // 市场经理-list
    contractAmount: '',
    contractLevel: '',
    contractStatus: '',
    deposit: '',
    projectName: '',
    projectId: '',
    contractFile: [],
    contractFileList: [],
    isHistory: 1,
    signCompany: '',
  }
}

let intValidate = (rule, value, callback) => {
  if (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) || value === '') {
    callback()
  } else {
    callback(new Error())
  }
}

let xsValidate = (rule, value, callback) => {
  if (/^\d+(\.\d{1,2})?$/.test(value) || value === '') {
    callback()
  } else {
    callback(new Error())
  }
}

let objValidate = (rule, value, callback) => {
  if (value.id == undefined) {
    callback(new Error())
  } else {
    callback()
  }
}

export const rules = {
  contractName: [
    { required: true, message: '请输入合同名称', trigger: 'blur' },
  ],
  contractExpl: [
    { required: true, message: '', trigger: 'blur' },
  ],
  contractType: [
    { required: true, message: '请选择合同类型', trigger: 'change' },
  ],
  businessType: [
    { required: true, message: '请选择业务类型', trigger: 'change' },
  ],
  tagKeyWords: [
    { required: true, message: '请输入至少3个标签', trigger: 'change' },
  ],
  signTime: [
    { required: true, message: '请选择签订日期', trigger: 'blur' },
  ],
  finishTime: [
    { required: true, message: '请选择完结日期', trigger: 'blur' },
  ],
  companyOrgId: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  companyOrgObj: [
    { validator: objValidate, message: '必填', trigger: 'change' },
  ],
  signCompanyOrgId: [
    { required: true, message: '请输入签署组织', trigger: 'change' },
  ],
  signCompanyOrgObj: [
    { validator: objValidate, message: '必填', trigger: 'change' },
  ],
  signDeptOrgId: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  signDeptName: [
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
    { required: true, message: '请选择市场经理', trigger: 'change' },
  ],
  contractAmount: [
    { required: true, message: '请输入合同金额', trigger: 'change' },
    { validator: intValidate, message: '请输入正数', trigger: 'change' },
    { validator: xsValidate, message: '小数位最多为2位', trigger: 'change' },
  ],
  contractLevel: [
    { required: true, message: '请选择合同级别', trigger: 'change' },
  ],
  contractStatus: [
    { required: true, message: '请选择合同状态', trigger: 'change' },
  ],
  deposit: [
    { validator: intValidate, message: '请输入正数', trigger: 'change' },
    { validator: xsValidate, message: '小数位最多为2位', trigger: 'change' },
  ],
  projectId: [
    { required: true, message: '请选择关联项目', trigger: 'change' },
  ],
}

export const projecTableOption = [
  {
    label: '项目名称',
    prop: 'projectName',
  }, {
    label: '项目预算',
    prop: 'projectBudget',
  }, {
    label: '发布人',
    prop: 'publisherName',
  },
]

export function initSearchForm () {
  return {
    contractName: '',
    director: '',
    businessTypeFirst: '',
    businessType: '',
    contractLevel: '',
    contractStatus: '',
    signDeptName: '',
    signTime: '',
    contractType: '',
  }
}

export const infoList = [
  { name: '关联项目', value: 'projectName' },
  { name: '市场经理', value: 'directorRealName' },
  { name: '合同类型', value: 'contractType', type: 'dict' },
  { name: '业务类型', value: 'businessTypeList' },
  { name: '签订日期', value: 'signTime', type: 'date' },
  { name: '完结日期', value: 'finishTime', type: 'date' },
  { name: '委托单位', value: 'companyRealName' },
  { name: '签署单位', value: 'signCompanyName' },
  { name: '签署组织', value: 'signDeptOrgNames' },
  { name: '承接部门', value: 'underTakeDeptNames' },
  { name: '合同金额', value: 'contractAmount' },
  { name: '合同级别', value: 'contractLevel', type: 'dict' },
  { name: '保证金', value: 'deposit' },
]
