const initSearchForm = () => {
  return {
    contractName: '',
    signTime: '',
    businessType: '',
    contractStatus: '',
    contractLevel: '',
  }
}
const amount = (rules, value, callback) => {
  if (value === '') {
    callback(new Error('金额不能为空'))
  } else {
    var reg = /^\d{0,8}\.{0,1}(\d{1,2})?$/
    var num = /^\d{0,100}\.{0,1}(\d{1,2})?$/
    if (!num.test(value)) {
      callback(new Error('金额为数字类型且小数点后最多两位'))
    } else if (!reg.test(value)) {
      callback(new Error('金额不超过9位整数'))
    }
  }
  callback()
}
const amount1 = (rules, value, callback) => {
  var reg = /^\d{0,8}\.{0,1}(\d{1,2})?$/
  var num = /^\d{0,100}\.{0,1}(\d{1,2})?$/
  if (value == '无' ? false : !num.test(value)) {
    callback(new Error('金额为数字类型且小数点后最多两位'))
  } else if (value == '无' ? false : !reg.test(value)) {
    callback(new Error('金额不超过9位整数'))
  }
  callback()
}
const RespDept = (rules, value, callback) => {
  if (value.name == '' || value.name == null) {
    callback(new Error('签署组织不能为空'))
  } else {
    callback()
  }
}
export const rules = {
  contractName: [
    { required: true, message: '请输入合同名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度为2-20个字符', trigger: 'blur' },
  ],
  contractAmount: [{ required: true, validator: amount, trigger: 'change' }],
  contractExpl: [{ max: 255, message: '长度不超过255个字符', trigger: 'blur' }],
  businessType: [
    { required: true, message: '请选择业务类型', trigger: 'change' },
  ],
  tagKeyWords: [
    { required: true, message: '请选择或输入标签', trigger: 'blur' },
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
  signDeptOrgName: [{ required: true, validator: RespDept, trigger: 'blur' }],
  contractLevel: [
    { required: true, message: '请选择合同级别', trigger: 'change' },
  ],
  contractStatus: [
    { required: true, message: '请选择合同级别', trigger: 'change' },
  ],
  deposit: [{ validator: amount1, trigger: 'change' }],
}
export const initFormData = () => {
  return {
    contractName: '',
    contractExpl: '',
    businessType: '',
    tagKeyWords: [],
    signTime: '',
    finishTime: '',
    companyOrgId: null, //委托单位
    signDeptOrgName: {
      id: null,
      name: null,
    }, //签属单位
    signCompanyOrgId: null, //签属单位
    signDeptOrgId: { id: '', name: '' }, //签属部门
    underTakeDeptName: [], //承接部门
    underTakeDeptId: [], //承接部门
    directorId: '', //市场经理
    Manager: '',
    contractAmount: '',
    contractLevel: '',
    contractStatus: '',
    deposit: '',
    fileList: [],
    contractType: 1,
  }
}

export { initSearchForm }
