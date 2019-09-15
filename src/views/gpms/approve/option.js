import { getStore } from '@/util/store'

const dicData = getStore({ name: 'dictGroup' })
function changeDict (list) {
  let data = {}
  for (let item of list) {
    data[item.value] = item.label
  }
  return data
}
export const dictsMap = {
  projectStatus: {
    '1': '待提交',
    '2': '待审核',
    '3': '已立项',
    '4': '审核未通过',
    '5': '锁定',
  },
  projectStage: changeDict(dicData.prms_project_stage),
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
