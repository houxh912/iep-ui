export const dictMap = {
  stageOptions: [],
  typeOptions: [
    { id: 1, value: '1', label: '类型一' },
  ],
  workTypeOne: [
    { id: 1, value: '1', label: '类型一' },
  ],
  bustypeOptions: [],
  isRelevOptions: [],
  undertakeOptions: [],
}

export const columnsMap = [
  {
    prop: 'projectBudget',
    label: '项目预算',
  },
  {
    prop: 'manay',
    label: '合同金额',
  },
  {
    prop: 'stage',
    label: '项目阶段',
  },
  {
    prop: 'issue',
    label: '发布人',
  },
  {
    prop: 'issuetime',
    label: '发布时间',
  },
]

export const rules = {
  projectName: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  projectType: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  businessType: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  relatedClientList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  projectBudget: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  mktManagerList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  projectMentorList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  projectTagList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  isRelevanceProduct: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  notRelevanceProductReason: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  inChargeDeptObj: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  coopDeptObj: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  groupExternalCooperatePartnerList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
}

export function paramForm () {
  return {
    name: '',//项目名称
    stage: '',//项目阶段
    protype: '',//项目类型
    bustype: '',//业务类型
    budget:{
      num1 : null,
      num2 : null,
    },//项目预算
    pact: {
      num1:null,
      num2:null,
    },//合同金额
    manager: '',//市场经理
    guide: '',//项目指导
    relevancy: '',//关联产品
    carry: '',//承接部门
    join: '',//合作部门
    time:{
      opentime:null,
      closetime:null,
    },
    issue: '',//发布人
  }
}

export function initFormData () {
  return {
    projectName: '', // 项目名称
    projectType: '', // 项目类行
    businessType: '', // 业务类型
    businessTypeSec: '', // 其他
    relatedClient: '', // 相关客户
    relatedClientList: {
      id: 0,
      name: '',
    },
    projectBudget: '', // 项目预算
    mktManager: '', // 市场经理
    mktManagerList: {
      id: 0,
      name: '',
    },
    projectMentor: '', // 项目指导人
    projectMentorList: {
      id: 0,
      name: '',
    },
    projectTagList: [], // 项目标签
    isRelevanceProduct: '', // 是否关联产品
    notRelevanceProductReason: '', // 不关联理由
    inChargeDept: '', // 承接部门
    inChargeDeptObj: {},
    coopDept: '', // 合作部门
    coopDeptObj: {},
    groupExternalCooperatePartner: '', // 集团外部合作伙伴
    groupExternalCooperatePartnerList: {
      id: 0,
      name: '',
    },
  }
}

export const status = [
  { value: 1, label: '未提交' },
  { value: 2, label: '待审核' },
  { value: 3, label: '审核通过' },
  { value: 4, label: '审核不通过' },
]
