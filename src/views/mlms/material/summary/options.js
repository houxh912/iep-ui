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

export const shareRules = {
  zhuti: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  shoujianren: [
    { required: true, message: '至少选择一个收件人', trigger: 'change' },
  ],
  zhengwen: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
}
