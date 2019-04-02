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
    companyOrgId: null,//委托单位
    signDeptOrgName: {
      id: null,
      name: null,
    },//签属单位
    signCompanyOrgId: null,//签属单位
    signDeptOrgId: { id: '', name: '' },//签属部门
    underTakeDeptName: [],//承接部门
    underTakeDeptId: [],//承接部门
    directorId: '',//市场经理
    contractAmount: '',
    contractLevel: '',
    contractStatus: '',
    deposit: '',
    fileList: [],
    contractType: 1,
  }
}

export { initSearchForm, rules }
