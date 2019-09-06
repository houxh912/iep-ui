const initForm = () => {
  return {
    id: '', // ID
    meetingTitle: '', // 会议标题
    meetingScale: '', // 会议规模
    meetingType: '',// 会议类型
    meetingTimeStart: '',//开始时间
    meetingTimeEnd: '',//结束时间
    cityAdrss: [],  //省市地址
    meetingAddress: '', //详细地址
    meetingClasses: [], //会议分类
    tags: [], // 会议标签
    meetingHighlights: '', //会议亮点
    content: '', //会议详情
    attachs: '', //会议海报
    meetingUrl: '',//链接地址
  }
}
export { initForm }