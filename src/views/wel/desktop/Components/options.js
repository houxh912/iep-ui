const dictsMap = {
  status: {
    0: '禁用',
    1: '正常',
  },
}

const initForm = () => {
  return {
    attachmentIds: [],
    content: '',
    emailId: 0,
    materialIds: [],
    projectIds: [],
    receiverIds: [],
    receiverList: {
      unions: [],
      orgs: [],
      users: [],
    },
    reportIds: [],
    status: 1,
    subject: '',
    summaryIds: [],
    summaryList: [],
    tagKeyWords: [],
    type: 2, // 类型为分享
    kind: 0,
  }
}

const rules = {
  subject: [{
    required: true,
    message: '请输入主题名称',
    trigger: 'blur',
  }],
  content: [{
    required: true,
    message: '请输入内容',
    trigger: 'blur',
  }],
}


export { dictsMap, initForm, rules }