import { mergeByFirst } from '@/util/util'
const dictsMap = {
  status: {
    0: '暂无',
    1: '正式员工',
    2: '试用期员工',
    3: '实习期员工',
    4: '兼职员工',
    5: '其他',
    6: '离职员工',
  },
}
// 入职 0,6
// 转正 2,3,4,5
// 调动 1,2,3,4,5
// 离职 1,2,3,4,5
const columnsMap = [
  {
    prop: 'status',
    label: '时间',
    type: 'string',
    hidden: false,
  },
]

const initTransferForm = () => {
  return {
    id: '',
    dept: [],
    position: [],
    jobId: '',
    titleId: '',
    transferTime: '',
  }
}
const initDtoTransferForm = () => {
  return {
    id: '',
    deptId: '',
    positionId: '',
    jobId: '',
    titleId: '',
    transferTime: '',
  }
}

const transferFormToDto = (form) => {
  const newForm = mergeByFirst(initDtoTransferForm(), form)
  newForm.positionId = form.position[form.position.length - 1]
  newForm.deptId = form.dept[form.dept.length - 1]
  return newForm
}

const initDepartureForm = () => {
  return {
    id: '',
    departureTime: '',
    reason: '',
  }
}
const initInductionForm = () => {
  return {
    id: '',
    status: 2,
    inductionTime: '',
  }
}
const initPositiveForm = () => {
  return {
    id: '',
    positiveTime: '',
  }
}
export { dictsMap, columnsMap, transferFormToDto, initTransferForm, initDepartureForm, initInductionForm, initPositiveForm }