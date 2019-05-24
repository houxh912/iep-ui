import { mergeByFirst } from '@/util/util'
// org config options
const dictsMap = {
  status: {
    0: '审核通过',
    1: '待审核',
    2: '审核驳回',
  },
}

const columnsMap = [
  {
    prop: 'id',
    label: '序号',
  },
  {
    prop: 'createTime',
    label: '日期',
  },
  {
    prop: 'remark',
    label: 'summary',
  },
]

const initForm = () => {
  return {
    isOpen: false,
    intro: '',
  }
}

const initDtoForm = () => {
  return {
    isOpen: false,
    intro: '',
  }
}

const formToDto = (row) => {
  const newForm = mergeByFirst(initDtoForm(), row)
  newForm.positionId = row.position[row.position.length - 1]
  newForm.deptId = row.dept[row.dept.length - 1]
  return newForm
}

const initSearchForm = () => {
  return {
    year: new Date().getFullYear(),
    companyId: '0',
    month: new Date().getMonth()+1,
  }
}

export { dictsMap, columnsMap, initForm, formToDto, initSearchForm }