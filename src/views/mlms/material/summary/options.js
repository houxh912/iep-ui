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
    isSend: 1,
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

var receiverValidate = (rule, value, callback) => {
  if (value.orgs.length == 0 && value.users.length == 0) {
    callback(new Error())
  } else {
    callback()
  }
}
export const shareRules = {
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


function formatDig (num) {
  return num>9?''+num:'0'+num
}

function formatYear (day){
  var y = new Date(day)
  let raws = [ y.getFullYear(), formatDig(y.getMonth() + 1), formatDig(y.getDate()) ]
  let format = ['-','-','-']
  return String.raw({raw:raws}, ...format)
}

export function getWeekStartAndEnd () {
  let date = new Date()
  let today = date.getDay()
  let firstDay = +new Date(+date - (today-1)*24*3600*1000)
  let lastDay = firstDay + 6*24*3600*1000
  return {
    startTime: formatYear(firstDay),
    endTime: formatYear(lastDay),
  }
}
export const tipContent = {
    meetingType: [
        '以组织/部门/小组为单位召开的早会、周例会、月度会议等',
        '围绕某个特定项目为主题开展的会议，如内网2.0开发工作会议纪要',
        '围绕某个市场开拓项目为主题开展的会议，如广东国脉20190415关于讨论佛山市总商会营商环境评估方案工作会议纪要',
        '围绕公司某个产品为主题开展的会议，如国脉集团研发中心20190415关于营商通二期开发工作会议纪要',
        '以拜访客户交流沟通/汇报所形成的纪要，如北方一部20190415关于中国建设银行黑龙江省分行信息技术部拜访纪要',
        '中高层领导、委员会、先锋队围绕管理工作召开的会议，如集团中高层20190412关于如何做好管理工作会议纪要',
        '围绕培训为目的开展的会议，如王XX关于XXXX项目的培训纪要',
        '上述未包含的会议类型，如感想及述职等请以邮件形式发送',
    ],
    meetingContent:'一、格式要求：<br/>'+
    '①默认字体、字号（带有格式的内容使用“格式清除”工具）；<br/>' +
    '②分段落阐述会议内容，并以大标题一、二、三......，小标题1、2、3......的形式，段落首行缩进2个字符；<br/>' +
    '二、内容包含要素：<br/>' +
    '1、会议议题<br/>' +
    '2、按议题分主题描述，记录意见建议，讨论过程及结果，及下一步工作安排；<br/>' +
    '3、附上相关汇报/讨论材料',
    meetingCon:'以序列的形式简明扼要说明会议的结果和要点（特别要说明关联人员），如1、2、3、',
    thoughtsProblem:'1、分段发表感想和说明困惑之处，如1、2、3......<br/>' +
    '2、感想主要围绕会议中所汇报内容和指导意见如何应用到之后工作中；<br/>' +
    '3、困惑主要围绕目前工作中疑惑不解，需要寻求帮助的事情。',
    meetingTime:'根据实际会议时间选择',
    meetingLocation:'1、若会议地点为线下：<br/>' +
    '①在公司，注明“分支机构通称（地点+国脉）+室+厅”，如舟山国脉1101室求知厅。<br/>' +
    '②在外面，注明具体地点且尽可能详细。<br/>' +
    '2、若为在线会议：语音会议/视频会议/电话会议等。',
    tagKeyWords:'1、会议标签要突出主题，如谈到客户或战略合作伙伴，必须成为标签，如谈到产品，产品名要成为标签，如讨论某个部门某个人，要成为标签。<br/>' +
    '2、标签数量必须3个以上；<br/>' +
    '3、标签本身符合标签规范且次序按照重要性排序。',
    hostList:'根据实际情况添加人员，会议可以没有主持人。',
    attendeeList:'1、即所有参会人员，若主持人已添加，参会人员中无需再添加主持人。<br/>' +
    '2、仅可选国脉员工，注意参会人员排序，领导在前、普通员工在后。',
    receiverList:'一、根据会议类型确定抄送人<br/>' +
    '1、日常例会：①组织例会纪要抄送7位高层，相关协作人员；②部门例会抄送组织班长，班委及相关协作人员；<br/>' +
    '2、项目会议：①抄送郑总与王路燕，②抄送未参加会议的项目成员，③抄送需要获悉该会议纪要的非参会人员；<br/>' +
    '3、市场会议（战略合作）：①抄送郑总、刘佳、李凯，②抄送未参加会议的相关市场成员，③抄送需要获悉该会议纪要的非参会人员；<br/>' +
    '4、产品/技术会议：①抄送杨董、刘佳、黄磊，②抄送未参加会议的相关产品经理，③抄送需要获悉该会议纪要的非参会人员；<br/>' +
    '5、拜访纪要：①抄送郑总、刘佳、李凯，②抄送需要获悉该会议纪要的非参会人员；<br/>' +
    '6、管理会议：①抄送公司7位高层，②抄送需要获悉该会议纪要的非参会人员；<br/>' +
    '7、培训会议：①抄送公司7位高层，集团人事负责人；<br/>' +
    '8、其他：会议中重点提到各条线版块，如产品技术抄送黄磊，市场抄送郑总、刘佳，项目抄送郑总、王路燕，品牌/平台/研究抄送郑总，人力抄送杨董、王虎；资产管理抄送郑总、谢海艳；<br/>' +
    '二、注意抄送人员排序问题，一般领导在前、普通员工在后；<br/>' +
    '三、所有会议均抄送人缪巧巧（以方便内网监督、排查，如涉及保密内容可忽略）。',
}