const dictsMap = {
  type: {
    1: '外包',
  },
}

const initFormData = () => {
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
    underTakeDeptId: [],
    directorId: '',
    contractAmount: '',
    contractLevel: '',
    contractStatus: '',
    deposit: '',
  }
}

const rules = {}

const allTableOption = [
  { label: '合同名称', prop: 'contractName' },
  { label: '业务类型', prop: 'businessType' },
  { label: '合同金额', prop: 'contractAmount' },
  { label: '合同状态', prop: 'contractStatus' },
  { label: '回款率', prop: 'odds' },
]
export{dictsMap,initFormData,rules,allTableOption}