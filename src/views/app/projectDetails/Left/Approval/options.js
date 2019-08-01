import { getStore } from '@/util/store'
const dicData = getStore({ name: 'dictGroup' })
function changeDict (list) {
  let data = {}
  for (let item of list) {
    data[item.value] = item.label
  }
  return data
}

export const dictMap = {
  projectType: getStore({ name: 'dictGroup' }).prms_project_type,
  businessType: getStore({ name: 'dictGroup' }).prms_business_type,
  isRelevanceProduct: [
    { value: 1, label: '是' },
    { value: 2, label: '否' },
  ],
  projectStatus: [
    { value: 1, label: '待提交' },
    { value: 2, label: '待审核' },
    { value: 3, label: '已立项' },
    { value: 4, label: '审核未通过' },
    { value: 5, label: '锁定' },
  ],
  projectStage: changeDict(dicData.prms_project_stage),
}

export const getDictLabel = (val, list) => {
  for (let item of list) {
    if (item.value == val) {
      return item.label
    }
  }
  return ''
}

export const setItOption = [
  {
    title: '立项信息',
    lists: [
      {
        post: '项目阶段',
        name: 'projectStage',
        dict: true,
      },
      {
        post: '立项时间',
        name: 'projectTime',
      },
      {
        post: '结束时间',
        name: 'endTime',
      },
      {
        post: '签约时间',
        name: 'estimatedSigntime',
      },
      {
        post: '外部合作',
        name: 'groupExternalCooperatePartner',
      },
    ],
  },
]

export const setUpOption = [
  {
    title: '审批信息',
    lists: [
      {
        post: '审批状态',
        name: 'projectStatus',
        dict: true,
      },
      {
        post: '申请人',
        name: 'applicantName',
      },
      {
        post: '审批人',
        name: 'approverName',
      },
      {
        post: '申请时间',
        name: 'applyTime',
      },
      {
        post: '审批不通过理由',
        name: 'content',
      },
    ],
  },
]
