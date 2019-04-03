// import { getStore } from '@/util/store'
// const getDict = getStore({ name: 'dictGroup' })

export const dictMap = {
  projectType: [
    { value: 1, label: '项目类型一' },
  ],
  businessType: [
    { value: 1, label: '业务类型一' },
  ],
  isRelevanceProduct: [
    { value: 1, label: '是' },
    { value: 2, label: '否' },
  ],
}

export const infoList = [
  { label: '审批状态：', value: 'approvalStatus' },
  { label: '申请人：', value: 'applicantName' },
  { label: '审批人：', value: 'approverName' },
  { label: '申请时间：', value: 'applyTime' },
  { label: '审批时间：', value: 'approvalTime' },
  { label: '指导建议：', value: 'guideSugges' },
  { label: '审批不通过理由：', value: 'approvalFailReason' },
]

export const setUpList = [
  { label: '编号：', value: 'serialNo' },
  { label: '项目名称：', value: 'projectName' },
  { label: '项目类型：', value: 'projectType', type: 'dict' },
  { label: '业务类型：', value: 'businessType', type: 'dict' },
  { label: '相关客户：', value: 'relatedClient' },
  { label: '项目预算（万元）：', value: 'projectBudget' },
  { label: '项目标签：', value: 'projectTagList', type: 'tag' },
  { label: '是否关联产品：', value: 'isRelevanceProduct', type: 'dict' },
  { label: '相关产品：', value: 'aa-aa', type: 'tag' },
  { label: '承接部门：', value: 'inChargeDept' },
  { label: '合作部门：', value: 'coopDept' },
  { label: '集团外部合作伙伴：', value: 'groupExternalCooperatePartner' },
  { label: '发布人：', value: 'publisher' },
  { label: '发布时间：', value: 'publishTime' },
]

export function initFormData () {
  return {
    serialNo: '',
    projectName: '',
    approver: '',
    approverObj: {
      id: '',
      name: '',
    },
    ccPersonList: [],
    ccPersonLists: {
      orgs: [],
      users: [],
      unions: [],
    },
    approvalStatus: 2,
  }
}

export function getDictMap (value, list) {
  for (let item of list) {
    if (item.value == value) {
      return item.label
    }
  }
}
