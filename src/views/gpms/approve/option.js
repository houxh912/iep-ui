export const dictsMap = {
  projectStatus: {
    '1': '待提交',
    '2': '待审核',
    '3': '已立项',
    '4': '审核未通过',
    '5': '锁定',
  },
}

export const columnsMap = [
  {
    prop: 'projectBudget',
    label: '项目预算',
  }, {
    prop: 'applicantName',
    label: '申请人',
  }, {
    prop: 'approverName',
    label: '审批人',
  }, {
    prop: 'applyTime',
    label: '项目开始时间',
  }, {
    prop: 'projectStatus',
    label: '审批状态',
    type: 'dict',
  },
]
