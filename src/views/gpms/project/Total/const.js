
export const dictMap = {
  is_yes: [
    { value: 1, label: '是' },
    { value: 2, label: '否' },
  ],
  status: [
    { value: 1, label: '未提交' },
    { value: 2, label: '待审核' },
    { value: 3, label: '审核通过' },
    { value: 4, label: '审核不通过' },
  ],
  projectStage: {
    1: '立项阶段',
    2: '实施阶段',
    3: '收尾阶段',
    4: '完结阶段',
    5: '失败阶段',
  },
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
    prop: 'contractAmount',
    label: '合同金额',
  },
  {
    prop: 'projectStage',
    label: '项目阶段',
    type: 'dict',
  },
  {
    prop: 'publisherName',
    label: '发布人',
  },
  // {
  //   prop: 'projectTime',
  //   label: '立项时间',
  // },
]

let intValidate = (rule, value, callback) => {
  if (/^[1-9]*[1-9][0-9]*$/.test(value) || value === '') {
    callback()
  } else {
    callback(new Error())
  }
}

export const rules = {
  projectType: [
    { required: true, message: '请选择项目类型', trigger: 'blur' },
  ],
  projectName: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
  ],
  relatedClient: [
    { required: true, message: '请输入相关客户', trigger: 'change' },
  ],
  projectTagList: [
    { required: true, message: '请输入项目标签', trigger: 'change' },
  ],
  projectTime: [
    { required: true, message: '请选择立项时间', trigger: 'change' },
  ],
  projectBudget: [
    { validator: intValidate, message: '请输入正整数', trigger: 'change' },
  ],
  isRelevanceProduct: [
    { required: true, message: '请选择是否关联产品', trigger: 'change' },
  ],
  notRelevanceProductReason: [
    { required: true, message: '请输入未关联产品理由', trigger: 'blur' },
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
    projectType: '', // 项目类型
    businessType: '', // 业务类型
    businessTypeSec: '', // 其他
    relatedClient: '', // 相关客户
    relatedClientList: {
      id: '',
      name: '',
    },
    projectBudget: '', // 项目预算
    projectTime:'',
    endTime:'',
    projectManager:'',// 项目经理
    projectManagerList:{
      id: '',
      name: '',
    },// 项目经理
    projectMembersList: [], // 项目成员
    membersList: [],
    mktManager: '', // 市场经理
    mktManagerList: {
      id: '',
      name: '',
    },
    projectMentor: '', // 项目指导人
    projectMentorList: {
      id: '',
      name: '',
    },
    projectTagList: [], // 项目标签
    isRelevanceProduct: '', // 是否关联产品
    notRelevanceProductReason: '', // 不关联理由
    inChargeDept: '', // 承接部门
    inChargeDeptList: {},
    initFormData:{},// 项目等级
    coopDept: '', // 合作部门
    coopDeptList: {},
    groupExternalCooperatePartner: '', // 集团外部合作伙伴
    groupExternalCooperatePartnerList: { id: '', name: '' },
    productIds: [], // 产品
    productList: [],
    summaryIds: [], // 纪要
    summaryList: [],
    materialIds: [], // 材料
    materialList: [],
    contractIds: [], // 合同
    contractList: [],
    projectIds: [], // 项目
    projectList: [],
    reportIds: [], // 周报
    reportList: [],
    paymentRelations: [], // 预计回款时间,
    estimatedSigntime: '', // 预计签订时间
  }
}

export const relatedFormList = [{
    name: '关联的纪要',
    ids: 'summaryIds',
    list: 'summaryList',
  }, {
    name: '关联的材料',
    ids: 'materialIds',
    list: 'materialList',
  }, {
    name: '关联的合同',
    ids: 'contractIds',
    list: 'contractList',
  }, {
    name: '关联的项目',
    ids: 'projectIds',
    list: 'projectList',
  }, {
    name: '关联的周报',
    ids: 'reportIds',
    list: 'reportList',
  },
]
export const initSearchForm = () => {
  return {
    projectName: '',//项目名称
    orgId:'',//所属组织
    projectStage: [],//项目阶段
    projectLevel: [],//项目等级
    associatedProducts: false,//是否项目关联
    manager: '',//项目经理
  }
}