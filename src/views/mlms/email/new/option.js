export const initFormData = () => {
  return {
    attachmentIds: [], // 附件
    attachmentList: [],
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
    transferList: {
      projectIds: [], // 项目
      summaryIds: [], // 纪要
      materialIds: [], // 材料
      reportIds: [], // 报表
    },
    reportIds: [],
    status: 1,
    subject: '',
    summaryIds: [],
    tagKeyWords: [],
    type: 0,
    kind: 0,
  }
}

var receiverValidate = (rule, value, callback) => {
  if (value.orgs.length == 0 && value.users.length == 0) {
    callback(new Error())
  } else {
    callback()
  }
}

export const rules = {
  content: [{ required: true, message: '必填', trigger: 'blur' }],
  subject: [{ required: true, message: '必填', trigger: 'blur' }],
  receiverList: [{ validator: receiverValidate, message: '必填', trigger: 'change' }],
}