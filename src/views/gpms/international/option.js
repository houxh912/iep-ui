import { getStore } from '@/util/store'
const dicData = getStore({ name: 'dictGroup' })
function changeDict (list) {
  let data = {}
  for (let item of list) {
    data[item.value] = item.label
  }
  return data
}

export const dictMap = {
  projectStage: changeDict(dicData.prms_project_stage),
}

export const columnsMap = [
]
export const initSearchForm = () => {
  return {
    projectName: '',//项目名称
    projectStatus:'',//项目状态
  }
}