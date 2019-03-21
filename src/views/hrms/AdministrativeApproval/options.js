// org config options
const dictsMap = {
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
    'id': '1', // ID
    'name': 'xxx', // 申请人
    'type': 1, // 
    'deptList': ['技术部'], // 所属部门
    'createTime': '2015-10-10', // 创建时间
    'startTime': '2015-10-10', // 开始时间(1:请假开始时间；2:出差开始时间;3:加班开始时间;4:入职时间;5:入职时间）
    'endTime': '2015-10-10', // 结束时间(1:请假结束时间；2:出差结束时间;3:加班结束时间;4:转正时间;5:离职时间;6:调岗时间）
    'job': '专员', // 职务
    'title': '大佬', // 职称
    'reason': '服务领导调配情况/n绝对服从', // 申请理由
    'annex': 'xxx.jpg', // 附件
    'processList': [
      {
        id: 1,
        time: '2015-10-10',
        username: '李杰',
        status: '已转交',
        msg: '同意',
      },
    ], // 申请流程
    'cc': '1', // 抄送人
  }
}

const initSearchForm = () => {
  return {
    theme: '',
    teacher: '',
    type: '',
    date: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm }
