const initSearchForm = () => {
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
// const amount = (rules, value, callback) => {
//   if (value === '') {
//     callback(new Error('金额不能为空'))
//   } else {
//     var reg = /^\d{0,8}\.{0,1}(\d{1,2})?$/
//     var num = /^\d{0,100}\.{0,1}(\d{1,2})?$/
//     if (!num.test(value)) {
//       callback(new Error('金额为数字类型且小数点后最多两位'))
//     } else if (!reg.test(value)) {
//       callback(new Error('金额不超过9位整数'))
//     }
//   }
//   callback()
// }
// const amount1 = (rules, value, callback) => {
//   var reg = /^\d{0,8}\.{0,1}(\d{1,2})?$/
//   var num = /^\d{0,100}\.{0,1}(\d{1,2})?$/
//   if (!num.test(value)) {
//     callback(new Error('金额为数字类型且小数点后最多两位'))
//   } else if (!reg.test(value)) {
//     callback(new Error('金额不超过9位整数'))
//   }
//   callback()
// }
// const RespDept = (rules, value, callback) => {
//   if (value.name == '' || value.name == null) {
//     callback(new Error('签署组织不能为空'))
//   } else {
//     callback()
//   }
// }
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
export const rules = {
  contractName: [
    { required: true, message: '请输入合同名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度为2-50个字符', trigger: 'blur' },
  ],
  // contractAmount: [{ required: true, validator: amount, trigger: 'change' }],
  contractAmount: [
    { required: true, message: '请输入合同金额', trigger: 'change' },
    { validator: intValidate, message: '请输入正数', trigger: 'change' },
    { validator: xsValidate, message: '小数位最多为2位', trigger: 'change' },
  ],
  contractExpl: [{ max: 255, message: '长度不超过255个字符', trigger: 'blur' }],
  businessType: [
    { required: true, message: '请选择业务类型', trigger: 'change' },
  ],
  tagKeyWords: [
    { required: true, message: '请选择或输入标签', trigger: 'change' },
  ],
  companyOrgId: [
    { required: true, message: '请选择委托单位', trigger: 'change' },
  ],
  signCompanyOrgId: [
    { required: true, message: '请选择签属单位', trigger: 'change' },
  ],
  signTime: [{ required: true, message: '请选择签订日期', trigger: 'change' }],
  finishTime: [
    { required: true, message: '请选择完结日期', trigger: 'change' },
  ],
  // signDeptOrgName: [{ required: true, validator: RespDept, trigger: 'change' }],
  contractLevel: [
    { required: true, message: '请选择合同级别', trigger: 'change' },
  ],
  contractStatus: [
    { required: true, message: '请选择合同状态', trigger: 'change' },
  ],
  // deposit: [{ validator: amount1, trigger: 'change' }],
  deposit: [
    { validator: intValidate, message: '请输入正数', trigger: 'change' },
    { validator: xsValidate, message: '小数位最多为2位', trigger: 'change' },
  ],
  projectId: [{ required: true, message: '请选择关联项目', trigger: 'change' }],
}
export const initFormData = () => {
  return {
    contractName: '',
    contractExpl: '',
    contractType: 1, // 合同类型
    businessType: '',
    tagKeyWords: [],
    signTime: '',
    finishTime: '',
    companyOrgId: '', // 委托单位
    companyName: { id: '', name: '' },
    companyOrgObj: {},
    signCompanyOrgId: '', // 签署单位
    signCompanyRealName: { id: '', name: '' },
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
  }
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

export { initSearchForm }
