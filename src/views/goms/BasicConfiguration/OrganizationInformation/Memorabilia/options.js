const dictsMap = {
  status: {
    0: '正常',
    1: '待审核',
    2: '锁定',
    3: '待配置',
  },
}

const columnsMap = [
  {
    prop: 'title',
    label: '标题',
    width: 400,
  },
  {
    prop: 'creator',
    label: '发布人',
  },
  {
    prop: 'happenTime',
    label: '发布时间',
  },
]

const initForm = () => {
  return {
    id: '',
    title: '',
    happenTime: '',
    content: '',
  }
}

const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'change' },
  ],
  happenTime: [
    { required: true, message: '请选择日期', trigger: 'change' },
  ],
  content: [
    { required: true, message: '请填写详细内容', trigger: 'change' },
  ],
}


export { dictsMap, columnsMap, initForm, rules }
