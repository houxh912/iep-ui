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
    directorId: '章渝佩',//市场经理
    contractAmount: '',
    contractLevel: '',
    contractStatus: '',
    deposit: '',
    fileList: [],
    contractType: 1,
  }
}

export { initSearchForm, rules }
