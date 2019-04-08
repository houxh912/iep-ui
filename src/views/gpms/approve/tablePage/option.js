export const dictsMap = {
  businessType: {
    '1': '立项申请',
    '2': '立项申请',
    '3': '立项申请',
    '4': '立项申请',
  },
  projectStage: {
    '1': '未提交',
    '2': '待审核',
    '3': '审核通过',
    '4': '审核不通过',
  },
}

export const columnsMap = [
  {
    prop: 'projectName',
    label: '项目名称',
    width:400,
  }, {
    prop: 'businessType',
    label: '申请类别',
    type: 'dict',
  }, {
    prop: 'serialNo',
    label: '编号',
  }, {
    prop: 'projectStage',
    label: '审批状态',
    type: 'dict',
  }, {
    prop: 'applicant',
    label: '申请人',
  }, {
    prop: 'approver',
    label: '审批人',
  },
]

export const pagedTable = [
  {
    id: 1270253,
    name:'20181212滨州市指挥交通转向规划',
    budget:'立项申请',
    manay:'GM20190001',
    stage:'待审批',
    issue:'杨晓凤',
    issuename:'张三',
    ProjectBudget:'30',
  }, {
    id: 1270254,
    name:'20181101宁津县委18年末及19年上半年政务公开评估',
    budget:'项目经理授权申请',
    manay:'GM20190004',
    stage:'审批通过',
    issue:'杨晓凤',
    issuename:'李四',
    ProjectBudget:'101',
  },
]