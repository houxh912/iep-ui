export const dictsMap = {
  approvalStatus: {
    '1': '待审核',
    '2': '审批通过',
    '3': '锁定',
  },
}

export const columnsMap = [
  {
    prop: 'projectBudget',
    label: '项目预算',
  }, {
    prop: 'projectManager',
    label: '项目经理',
  }, {
    prop: 'applyTime',
    label: '项目开始时间',
  }, {
    prop: 'approvalStatus',
    label: '审批状态',
    type: 'dict',
  },
]
