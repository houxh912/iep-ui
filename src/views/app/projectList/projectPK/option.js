const initForm = () => {
  return {
    projectStatus:'',//项目状态
    projectName: '', // 项目名称
    projectExplain: '',//项目说明
    projectTypeBefore: '', // 项目类型
    projectType: '', // 项目类型
    businessType: '', // 业务类型
    businessTypeSec: '', // 其他
    projectLevel: 0,//项目等级
    attendeeId:'',//委托组织
    relatedClient: '', // 相关客户
    relatedClientList: {
    },
    projectBudget: '', // 项目预算
    approvalTime:'',//立项时间
    applyTime:'',//审批时间
    endTime:'',
    projectManager:'',// 项目经理
    projectManagerList:{
    },// 项目经理
    projectHandles:'',// 执行项目经理
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
    projectStage: 0,
    orgId:'',
    isClaim: 1,
    totalCycle:0,//总周期
    contractCycle:0,//签约周期
    profitMargin:0,//利润率
    receiptRate:0,//收款率
    paymentTimeChange:0,//收款时间戳
  }
}
const maxList = () => {
  return {
    projectBudgetMax: 0,//预算
    projectAmountMax: 0,//项目金额
    membersListMax:0,//成员
    projectLevel:1,//项目等级
    profitMargin:0,//利润率
    totalCycle:0,//总周期
    contractCycle:0,//签约周期
    receiptRate:0,//收款率
    paymentTimeChange:0,//收款时间戳
  }
}
export const rules = {
  project: [
    { required: true, message: '请选择项目名称', trigger: 'blur' },
  ],
}
export { initForm,maxList }