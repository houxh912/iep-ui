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

// 分享
export function initFormData () {
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

var receiverValidate = (rule, value, callback) => {
  if (value.orgs.length == 0 && value.users.length == 0) {
    callback(new Error())
  } else {
    callback()
  }
}

export const rules = {
  subject: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  receiverList: [
    { validator: receiverValidate, message: '必填', trigger: 'change' },
  ],
  content: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
}
