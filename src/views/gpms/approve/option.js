export const dictsMap = {
  projectStatus: {
    '1': '待提交',
    '2': '待审核',
    '3': '已立项',
    '4': '审核未通过',
    '5': '锁定',
  },
}

export const columnsMap = [
  {
    prop: 'projectStatus',
    label: '审批状态',
    type: 'dict',
  },
]
export const initSearchForm = () => {
  return {
    projectName: '',//项目名称
    projectStatus:'',//审批状态
  }
}
