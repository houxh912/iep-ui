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
    prop: 'name',
    label: '项目名称',
    width:400,
  }, {
    prop: 'budget',
    label: '申请类别',
    // type: 'dict',
  }, {
    prop: 'manay',
    label: '编号',
  }, {
    prop: 'stage',
    label: '审批状态',
    // type: 'dict',
  }, {
    prop: 'issuename',
    label: '申请人',
  }, {
    prop: 'issue',
    label: '审批人',
  },
]
