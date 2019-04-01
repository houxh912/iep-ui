const initSearchForm = () => {
  return {
    clientName: '',
    businessType: '',
    intentionLevel: '',
    projectName: '',
    publisher: '',
  }
}
const rules = {

}

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
    underTakeDeptId: [],//承接部门
    directorId: { id: '', name: '' },//市场经理
    contractAmount: '',
    contractLevel: '',
    contractStatus: '',
    deposit: '',
    fileList: [],
  }
}
export const deptList = [
  { id: 1, name: '浙江省教育厅' },
  { id: 2, name: '浙江省渔业厅' },
]

export { initSearchForm, rules }
