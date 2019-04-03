const columnsMap = [
  { label: '主题', prop: 'theme' },
  { label: '时间', prop: 'visitTime' },
  { label: '拜访记录', prop: 'contactRecord' },
]
const visitColumnsMap = [
  { label: '主题', prop: 'title', width: 400 },
  { label: '拜访时间', prop: 'createTime' },
  // { label: '类型', prop: 'contactRecord' },
]
const initForm = () => {
  return {
    theme: '',
    visitTime: '',
    contactRecord: '',
  }
}

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

export const initFormData = () => {
  return {
    // type: 1, // 0 是会议纪要，1 是拜访记录
    // meetingType: 6,
    // title: '',
    // meetingContent: '',
    // meetingCon: '',
    // thoughtsProblem: '',
    // meetingTime: '',
    // meetingLocation: '',
    // tagKeyWords: [],
    // receiverIds: [],
    // receiverList: {
    //   orgs: [],
    //   users: [],
    // },
    // // receiverList: [],
    // attendeeList: {
    //   orgs: [],
    //   users: [],
    // },
    // // attendeeList: [],
    // hostList: {
    //   id: '',
    //   name: '',
    // },
    // remark: '',
    // visitType: -1,
    // visitingAddress: '',
    // visitingUserId: [],

    type: 1, // 0 是会议纪要，1 是拜访记录
    meetingType: '6',
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
      unions: [],
    },
    attendeeList: {
      orgs: [],
      users: [],
      unions: [],
    },
    hostList: {
      id: '',
      name: '',
    },
    remark: '',
    visitType: -1,
    visitingAddress: '',
    visitingUserId: [],
    status: 0,
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
export { columnsMap, initForm, visitColumnsMap }
