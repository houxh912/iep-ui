const initForm = () => {
  return [
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
  ]
}
const initFormTwo = () => {
  return [
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
  ]
}
const initFormThree = () => {
  return [
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
  ]
}
const initFormFour = () => {
  return [
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
  ]
}
const initFormFive = () => {
  return [
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
    {
      meetingId: '', // 会议ID
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
      ticketNumber: 1,//选择数量
    },
  ]
}
const rules = {
  companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
  position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phoneNumber: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
  email: [{ required: true, message: '请输入电子邮箱', trigger: 'blur' }],
}
export { initForm, initFormTwo, initFormThree, initFormFour, initFormFive, rules }