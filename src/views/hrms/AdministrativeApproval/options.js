// org config options
const dictsMap = {
  startTime: {
    1: '请假开始时间',
    2: '出差开始时间',
    3: '加班开始时间',
    4: '入职时间',
    5: '入职时间',
    6: '调岗前时间',
  },
  endTime: {
    1: '请假结束时间',
    2: '出差结束时间',
    3: '加班结束时间',
    4: '转正时间',
    5: '离职时间',
    6: '调岗时间',
  },
  isOpen: {
    0: '开',
    1: '关',
  },
  status: {
    0: '未审核',
    1: '通过',
    2: '拒绝',
  },
}

const columnsMap = [
  {
    prop: 'startTime',
    label: '申请开始时间',
  },
  {
    prop: 'endTime',
    label: '申请结束时间',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
]

const initForm = () => {
  return {
    'id': null, // ID
    'name': null, // 申请人
    'avatar': null, // 头像
    'type': 1, // 
    'deptList': [], // 所属部门
    'attachFile': [], // 附件
    'createTime': null, // 创建时间
    'startTime': null, // 开始时间(1:请假开始时间；2:出差开始时间;3:加班开始时间;4:入职时间;5:入职时间）
    'endTime': null, // 结束时间(1:请假结束时间；2:出差结束时间;3:加班结束时间;4:转正时间;5:离职时间;6:调岗时间）
    'job': null, // 职务
    'title': null, // 职称
    'reason': null, // 申请理由
    'annex': null, // 附件
    'processList': [], // 申请流程
    'cc': null, // 抄送人
  }
}

const initSearchForm = () => {
  return {
    name: '',
    type: '',
    status: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm }
