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
  if (value == '') {
    callback(new Error('金额不能为空'))
  } else if (value.length > 9) {
    callback(new Error('金额长度不能超过9'))
  } else {
    var reg = new RegExp('^[0-9]*$')
    if (!reg.test(value)) {
      callback(new Error('金额为数字类型'))
    } else {
      callback()
    }
  }
  callback()
}
export const rules = {
  contractName: [
    { required: true, message: '请输入合同名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度为2-20个字符', trigger: 'blur' },
  ],
  contractAmount: [{ required: true, validator: amount, trigger: 'blur' }],
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
  signDeptOrgName: [
    { required: true, message: '请选择签属部门', trigger: 'change' },
  ],
  underTakeDeptName: [
    { required: true, message: '请选择承接部门', trigger: 'change' },
  ],
  contractLevel: [
    { required: true, message: '请选择合同级别', trigger: 'change' },
  ],
  contractStatus: [
    { required: true, message: '请选择合同级别', trigger: 'change' },
  ],
  deposit: [{ required: false, validator: amount, trigger: 'change' }],
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
