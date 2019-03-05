export const dictsMap = {
  meetingType: {
    1: '管理会议',
    2: '市场会议',
    3: '项目会议',
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
