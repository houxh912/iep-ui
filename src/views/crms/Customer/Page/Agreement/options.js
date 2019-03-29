const columnsMap = [
  { label: '业务类型', prop: 'type', width: '150px' },
  { label: '合同金额', prop: 'contractAmount', width: '150px' },
  { label: '合同状态', prop: 'contractStatus', width: '150px' },
  { label: '回款率', prop: 'efficiency', width: '150px' },
]
const initForm = () => {
  return {
    name: '',
  }
}
export const deptList = [
  { id: 1, name: '浙江省教育厅' },
  { id: 2, name: '浙江省渔业厅' },
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
    companyOrgId: '',
    signCompanyOrgId: '',
    signDeptOrgId: '',
    underTakeDeptId: '',
    directorId: '',
    contractAmount: '',
    contractLevel: '',
    contractStatus: '',
    deposit: '',
  }
}

export const rules = {
  name: [
    { required: true, message: '请输入组织名称', trigger: 'blur' },
  ],
}
export { columnsMap, initForm }
