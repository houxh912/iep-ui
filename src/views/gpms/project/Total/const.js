import { getStore } from '@/util/store'
import { checkProjectName } from '@/api/gpms/index'
const dicData = getStore({ name: 'dictGroup' })
function changeDict (list) {
  let data = {}
  for (let item of list) {
    data[item.value] = item.label
  }
  return data
}

export const dictMap = {
  is_yes: [
    { value: 1, label: '是' },
    { value: 2, label: '否' },
  ],
  projectStatus: {
    1:'待提交',2:'待审核',3:'已立项',4:'审核未通过',5:'锁定',
  },
  projectStage: changeDict(dicData.prms_project_stage),
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
var timeout = null
var checkName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('项目名称不能为空'))
  }
  if(timeout !== null) 
          clearTimeout(timeout)
  timeout = setTimeout(() => {
    checkProjectName({projectName:value}).then(res => {
      if (res.data.data === false) {
        return callback(new Error(res.data.msg))
      } 
      else {
        callback()
      }
    })
  }, 1000)
}

export const rules = {
  projectType: [
    { required: true, message: '请选择项目类型', trigger: 'blur' },
  ],
  projectName: [
    { validator: checkName, required: true, trigger: 'change' },
  ],
  projectTime: [
    { required: true, message: '请选择立项时间', trigger: 'blur' },
  ],
  relatedClient: [
    { required: true, message: '请输入相关客户', trigger: 'change' },
  ],
  projectTagList: [
    { required: true, message: '请输入项目标签', trigger: 'change' },
  ],
  projectStage: [
    { required: true, message: '请选择项目阶段', trigger: 'change' },
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

export function initFormData (obj) {
  const name = obj ? obj.realName : ''
  const id = obj ? obj.userId : ''
  return {
    projectTime:'',//立项时间
    projectStatus:'',//项目状态
    projectName: '', // 项目名称
    projectExplain: '',//项目说明
    projectTypeBefore: '', // 项目类型
    projectType: '', // 项目类型
    businessType: '', // 业务类型
    businessTypeSec: '', // 其他
    projectLevel: '',//项目等级
    attendeeId:'',//委托组织
    relatedClient: '', // 相关客户
    relatedClientList: {
      id: '',
      name: '',
    },
    projectBudget: '', // 项目预算
    approvalTime:'',//立项时间
    applyTime:'',//审批时间
    endTime:'',
    projectManager:'',// 项目经理
    projectManagerList:{
      id,
      name,
    },// 项目经理
    projectHandles:'',// 协作负责人
    projectHandlesList:[],
    memberList: [], // 项目成员
    membersList: [],
    mktManager: '', // 市场经理
    marketManagerList:[],
    mktManagerList: [],
    projectMentor: '', // 项目指导人
    mentorList:[],
    projectMentorList: [],
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
    contractAmount: '',//合同金额
    contractList: [],
    projectIds: [], // 项目
    projectList: [],
    reportIds: [], // 周报
    reportList: [],
    paymentRelations: [], // 预计回款时间,
    estimatedSigntime: '', // 预计签订时间
    projectBudgetList: {},
    projectAmount: 0,
    projectStage: '',
    orgId:'',
    isClaim: 1,
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
  // }, {
  //   name: '关联的合同',
  //   ids: 'contractIds',
  //   list: 'contractList',
  // }, {
  //   name: '关联的项目',
  //   ids: 'projectIds',
  //   list: 'projectList',
  }, {
    name: '关联的项目周报',
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
    isRelevanceProduct: '',//是否项目关联
    manager: '',//项目经理
  }
}

// 项目预算
export const initBudgetForm = () => {
  return {
    artificialCost: '', // 人工成本
    projectCommission: '', // 项目提成
    taxes: '', // 税费
    bidWinning: '', // 中标服务费
    outsourcingCost: '', // 外包费用(必填)
    commission: '', // 佣金(必填)
    expertsFee: '', // 项目评审专家费
    otherFees: '', //其他
    managementFee: '', // 项目管理费
    invoiceFee: '', // 开票费用
    travelFee: '', // 差旅费
    projectBudget: '', // 项目总预算(必填)
    forecastProfits: '', // 预估利润
  }
}

export function initTransferForm () {
  return {
    name:'',
    projectManagerList:{
      id: '',
      name: '',
    },
    pubilsh:false,
  }
}