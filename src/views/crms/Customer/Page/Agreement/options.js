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
    companyOrgId: { id: '', name: '' },//委托单位
    signCompanyOrgId: { id: '', name: '' },//签属单位
    signDeptOrgId: { id: '', name: '' },//签属部门
    underTakeDeptId: { id: '', name: '' },//承接部门
    directorId: { id: '', name: '' },//市场经理
    contractAmount: '',
    contractLevel: '',
    contractStatus: '',
    deposit: '',
    fileList: [],
  }
}

export const rules = {
  name: [
    { required: true, message: '请输入组织名称', trigger: 'blur' },
  ],
}
export { columnsMap, initForm }
