import { mergeByFirst } from '@/util/util'
const dictsMap = {
  status: {
    0: '待审核',
    1: '审核通过',
    2: '审核驳回',
  },
}
const columnsMap = [
  {
    prop: 'purchaser',
    label: '购买方',
  },
  {
    prop: 'seller',
    label: '销售方',
  },
  {
    prop: 'money',
    label: '开票金额',
  },
  {
    prop: 'applyDate',
    label: '申请日期',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'auditor',
    label: '审核人',
  },
  {
    prop: 'auditDate',
    label: '审核日期',
  },
]

const initForm = () => {
  return {
    'id': '',
    'name': '',
  }
}

const initDtoForm = () => {
  return {
    'id': '',
    'name': '',
  }
}

const formToDto = (form) => {
  const newForm = mergeByFirst(initDtoForm(), form)
  newForm.positionId = form.position[form.position.length - 1]
  return newForm
}

const initSearchForm = () => {
  return {
    name: '',
    sex: '',
    purchaser: '',
    applyTime: '',
    seller: '',
    auditDate: '',
    sum1: '',
    sum2: '',
    status: '',
  }
}
const initToResumeForm = () => {
  return {
    ids: [],
    reason: '',
  }
}
const initToBlacklistForm = () => {
  return {
    ids: [],
    area: '',
    reason: '',
  }
}

const initrejectedForm = () => {
  return {
    msg: '',
  }
}


export { columnsMap, initForm, initSearchForm, initrejectedForm, formToDto, dictsMap, initToResumeForm, initToBlacklistForm}