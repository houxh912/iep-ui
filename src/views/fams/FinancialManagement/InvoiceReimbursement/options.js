import { mergeByFirst } from '@/util/util'
// org config options
const dictsMap = {
  status: {
    0: '待提交',
    1: '待确认',
    2: '已确认',
  },
  referType: {
    1: '项目管理类',
    2: '日常管理类',
    3: '其他类',
  },
  invoiceType: {
    1: '增值税专用发票',
    2: '增值税普通发票',
    3: '其他',
  },
}

const columnsMap = [
  {
    prop: 'creatorName',
    label: '申请人',
  },
  {
		prop: 'referType',
		label: '发票类型',
		type: 'dict',
	},
	{
		prop: 'companyName',
		label: '发票抬头',
	},
	{
		prop: 'totalAmount',
		label: '发票金额',
	},
	{
		prop: 'createTime',
		label: '申请日期',
	},
	{
		prop: 'status',
		label: '状态',
		type: 'dict',
	},
	{
		prop: 'auditorName',
		label: '审核人',
	},
	{
		prop: 'auditingTime',
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