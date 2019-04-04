const columnsMap = [
  { label: '业务类型', prop: 'contractTypeValue' },
  { label: '合同金额', prop: 'contractAmount' },
  { label: '合同状态', prop: 'contractStatusValue' },
  { label: '回款率', prop: 'efficiency' },
]
export const tableOption = [
  {
    label: '合同类型',
    prop: 'businessType',
  }, {
    label: '合同金额',
    prop: 'contractAmount',
  }, {
    label: '合同状态',
    prop: 'contractStatus',
  }, {
    label: '回款率',
    prop: '',
  },
]

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
    contractAmount: '',
    contractLevel: '',
    contractStatus: '',
    deposit: '',
    fileList: [],
    contractType: 1,
    id: '',
    contractId: '',
  }
}

export const rules = {
  contractAmount: [
    { required: true, message: '请输入金额', trigger: 'blur' },
    { type: 'number', message: '金额必须为数字值' },
  ],
  deposit: [
    { required: true, message: '请输入金额', trigger: 'blur' },
    { type: 'number', message: '金额必须为数字值' },
  ],
}
export { columnsMap }
