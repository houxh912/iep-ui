import { getStore } from '@/util/store'

export const dictMap = {
  projectType: getStore({ name: 'dictGroup' }).prms_project_type,
  businessType: getStore({ name: 'dictGroup' }).prms_business_type,
  isRelevanceProduct: [
    { value: 1, label: '是' },
    { value: 2, label: '否' },
  ],
  approvalStatus: [
    { value: 1, label: '未提交' },
    { value: 2, label: '待审核' },
    { value: 3, label: '审核通过' },
    { value: 4, label: '审核不通过' },
  ],
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
    title: '审批信息',
    lists: [
      {
        post: '审批状态',
        name: 'approvalStatus',
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
        name: 'approvalFailReason',
      },
    ],
  },
]

export const setUpOption = [
  {
    title: '立项信息',
    lists: [
      {
        post: '编号',
        name: 'serialNo',
      },
      {
        post: '项目名称',
        name: 'projectName',
      },
      {
        post: '项目类型',
        name: 'projectType',
        dict: true,
      },
      {
        post: '业务类型',
        name: 'businessType',
        dict: true,
      },
      {
        post: '相关客户',
        name: 'relatedClientName',
      },
      {
        post: '项目预算',
        name: 'projectBudget',
      },
      {
        post: '项目标签',
        name: 'projectTagList',
        show: 'show',
      },
      {
        post: '是否关联产品',
        name: 'isRelevanceProduct',
        dict: true,
      },
      {
        post: '相关产品',
        name: '海南政务信息资源目录管理项目',
      },
      {
        post: '承接部门',
        name: 'inChargeDeptName',
      },
      {
        post: '合作部门',
        name: 'coopDeptName',
      },
      {
        post: '集团外部合作伙伴',
        name: 'groupExternalCooperatePartnerName',
      },
      {
        post: '发布人',
        name: 'publisherName',
      },
      {
        post: '发布时间',
        name: 'publishTime',
      },
    ],
  },
]
