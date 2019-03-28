export const dictsMap = {
  meetingType: {
    0: '管理会议',
    1: '市场会议',
    2: '项目会议',
    3: '产品会议',
    4: '培训会议',
    5: '日常例会',
    6: '拜访纪要',
    7: '其他',
  },
  visitType: {
    0: '当面拜访',
    1: '电话拜访',
    2: '聊天软件拜访',
    3: '其他',
  },
}

export const columnsMap = [
  {
    prop: 'meetingTime',
    label: '会议时间',
    width: '300px',
  },
  {
    prop: 'meetingType',
    label: '会议类型',
    width: '300px',
    type: 'dict',
  },
]

export const initFormData = () => {
  return {
    type: 0, // 0 是会议纪要，1 是拜访记录
    meetingType: -1,
    title: '',
    meetingContent: '',
    meetingCon: '',
    thoughtsProblem: '',
    meetingTime: '',
    meetingLocation: '',
    tagKeyWords: [],
    receiverIds: [],
    receiverList: {
      orgs: [],
      users: [],
    },
    attendeeList: {
      orgs: [],
      users: [],
    },
    hostList: {
      id: '',
      name: '',
    },
    remark: '',
    visitType: -1,
    visitingAddress: '',
    visitingUserId: [],
  }
}

export const initSearchForm = () => {
  return {
    name: '',
  }
}

export const rules = {
  meetingType: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  title: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  meetingContent: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  meetingCon: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  thoughtsProblem: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  meetingTime: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  meetingLocation: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  tagKeyWords: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  receiverIds: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  remark: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  visitType: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  visitingAddress: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  visitingUserId: [
    { required: true, message: '必填', trigger: 'change' },
  ],
}

export const shareRules = {
  meetingType: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
}

// 分享
export function initShareForm () {
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

export const shareType = {
  summary: {
    ids: 'summaryIds',
    list: 'summaryList',
    name: '纪要',
  },
  material: {
    ids: 'materialIds',
    list: 'materialList',
    name: '材料',
  },
  aptitude: {
    ids: 'aptitudeIds',
    list: 'aptitudeList',
    name: '荣誉资质',
  },
}
