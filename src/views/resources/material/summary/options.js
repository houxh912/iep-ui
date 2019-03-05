export const dictsMap = {
  isOpen: {
    0: '开',
    1: '关',
  },
  status: {
    0: '审核通过',
    1: '待审核',
    2: '审核驳回',
  },
}

export const columnsMap = [
  {
    prop: 'biaoti',
    label: '会议标题',
  },
  {
    prop: 'shijan',
    label: '会议时间',
  },
  {
    prop: 'type',
    label: '会议类型',
  },
]

export const initFormData = () => {
  return {
    name: '',
    isOpen: false,
    intro: '',
  }
}

export const initSearchForm = () => {
  return {
    name: '',
  }
}
