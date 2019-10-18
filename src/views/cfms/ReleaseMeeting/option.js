const initForm = () => {
  return {
    id: '', // ID
    meetingTitle: '', // 会议标题
    meetingScale: '', // 会议规模
    meetingType: '',// 会议类型
    meetingTimeStart: '',//开始时间
    meetingTimeEnd: '',//结束时间
    cityAdrss: [],  //省市地址
    provinceName: '',//省名称
    cityName: '',//城市名称
    meetingAddress: '', //详细地址
    meetingClasses1: [], //会议分类
    meetingClasses2: [],//会议子分类
    tags: [], // 会议标签
    meetingHighlights: '', //会议亮点
    content: '', //会议详情
    attachs: '', //会议海报
    meetingUrl: '',//链接地址
    meetingFlag: 6, //会议状态
    sendDraft: 2, //发送/草稿
  }
}
const rules = {
  meetingTitle: [{ required: true, message: '请输入会议标题', trigger: 'blur' }, { max: 35, message: '标题不超过35个字符', trigger: 'blur' }],
  meetingType: [{ required: true, message: '请选择会议类型', trigger: 'change' }],
  meetingScale: [{ required: true, message: '请输入会议规模', trigger: 'blur' }],
  meetingTimeStart: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
  meetingTimeEnd: [{ required: true, message: '请选择结束时间', trigger: 'blur' }],
  cityAdrss: [{ required: true, message: '请选择地址', trigger: 'change' }],
  meetingClasses1: [{ required: true, message: '请选择会议分类', trigger: 'change' }],
  tags: [{ required: true, message: '请添加标签', trigger: 'blur' }],
  meetingHighlights: [{ required: true, message: '请输入会议亮点', trigger: 'blur' }],
  content: [{ required: true, message: '请输入会议详情', trigger: 'blur' }],
  attachs: [{ required: true, message: '请上传海报', trigger: 'change' }],
}
export { initForm, rules }