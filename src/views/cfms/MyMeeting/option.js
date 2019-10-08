const columns = [
  // { label: '会议海报', prop: 'huiyi' },
  { label: '会议信息', prop: 'meetingTitle', width: 250 },
  { label: '链接地址', prop: 'meetingUrl', width: 300 },
  { label: '已报名', prop: 'meetingSignupView', width: 100 },
  { label: '发布时间', prop: 'createTime' },
  { label: '状态', prop: 'meetingFlagName' },
]
const columnsName = [
  { label: '名称', prop: 'name' },
  { label: '手机', prop: 'phoneNumber' },
  { label: '组织', prop: 'companyName', width: 200 },
  { label: '职务', prop: 'position', width: 200 },
  { label: '邮箱', prop: 'email' },
  // { label: '报名渠道', prop: 'meetingFlagName' },
  { label: '状态', prop: 'signupFlagName' },
  // { label: '备注', prop: 'meetingFlagName' },
]
const initSearchForm = () => {
  return {
    inName: '',
    inPhone: '',
    inEmail: '',
    signupFlag: '',
  }
}
const rules = {
  companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
  position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phoneNumber: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
  email: [{ required: true, message: '请输入电子邮箱', trigger: 'blur' }],
}
const initForm = () => {
  return {
    companyName: '', // 公司
    position: '', // 职位
    name: '', // 姓名
    phoneNumber: '', // 联系电话
    email: '', // 电子邮箱
  }
}
export { columns, columnsName, initSearchForm, rules, initForm }