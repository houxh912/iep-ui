﻿export const dictsMap = {
  businessType: {
    '1': '立项申请',
    '2': '立项申请',
    '3': '立项申请',
    '4': '立项申请',
  },
  approvalStatus: {
    '1': '未提交',
    '2': '待审核',
    '3': '审核通过',
    '4': '审核不通过',
  },
}

export const columnsMap = [
  {
    prop:'projectName',
    label:'项目名称',
    width:'220',
  },
  {
    prop: 'projectManagerName',
    label: '项目经理',
    width:'100',
  },
  {
    prop: 'approvalStatus',
    label: '审批状态',
    type: 'dict',
    width:'100',
  },
  {
    prop: 'applicantName',
    label: '申请人',
    width:'100',
  },
  {
    prop: 'applyTime',
    label: '申请时间',
    width:'170',
  },
]
