import { getStore } from '@/util/store'
const dicData = getStore({ name: 'dictGroup' })
function changeDict (list) {
  let data = {}
  for (let item of list) {
    data[item.value] = item.label
  }
  return data
}

export const dictsMap = {
  meetingType: changeDict(dicData.mlms_meeting_type),
  visitType: changeDict(dicData.mlms_visit_type),
}

export const columnsMap = [
  {
    prop: 'meetingTime',
    label: '会议时间',
    width: '180px',
  },
  {
    prop: 'meetingType',
    label: '会议类型',
    width: '150px',
    type: 'dict',
  },
]

export const initFormData = () => {
  return {
    type: 0, // 0 是会议纪要，1 是拜访记录
    meetingType: '0',
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
    projectIds: [],
    projectList: [],
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
  hostList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  attendeeList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  receiverList: [
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

// 批示
export function initInstrForm () {
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
    type: 1, // 类型为分享
    kind: 0,
  }
}