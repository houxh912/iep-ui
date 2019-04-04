import { mergeByFirst } from '@/util/util'

const columnsMap = [
  {
    prop: 'class',
    label: '往来分类',
  },
  {
    prop: 'contacts',
    label: '往来类型',
  },
  {
    prop: 'money',
    label: '金额',
  },
  {
    prop: 'data',
    label: '日期',
  },
  {
    prop: 'remark',
    label: '备注',
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


export { columnsMap, initForm, initSearchForm, initrejectedForm, formToDto, initToResumeForm, initToBlacklistForm}