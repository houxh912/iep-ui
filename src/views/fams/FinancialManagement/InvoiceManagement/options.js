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
    prop: 'type',
    label: '提交类型',
  },
  {
    prop: 'rise',
    label: '发票抬头',
  },
  {
    prop: 'applicant',
    label: '申请人',
  },
  {
    prop: 'departments',
    label: '所属部门',
  },
  {
    prop: 'money',
    label: '金额',
  },
  {
    prop: 'applyTime',
    label: '申请日期',
  },
  {
    prop: 'state',
    label: '状态',
  },
  {
    prop: 'availableAmount',
    label: '可用金额',
  },
  {
    prop: 'auditor',
    label: '审核人',
  },
  {
    prop: 'auditTime',
    label: '审核日期',
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
    keyword: '',
    applyTime: '',
    sendTime: '',
    sum1: '',
    sum2: '',
    type: '',
    name: '',
    status: '',
    seller: '',
  }
}

export { dictsMap, columnsMap, initForm, formToDto, initSearchForm }