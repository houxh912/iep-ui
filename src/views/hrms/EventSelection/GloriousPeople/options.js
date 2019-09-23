
const dictsMap = {
  status: {
    1: '启用',
    2: '禁用',
  },
}

const initForm = () => {
  return {
    selectionName:'',//名称
    targetId:'',//指标
    priority:'',//优先级
    status:'',//状态
    describes:'',//描述
    userId:'',
    sign:1,//标记
    user: {
      id: '',
      name: '',
    },
    realName:'默认',
    targetUserId:'',
  }
}
const columnsMap = [
  {
    prop: 'selectionName',
    label: '评选名称',
  },
  {
    prop: 'categoryName',
    label: '类别',
  },
  {
    prop: 'realName',
    label: '显示对象',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'priority',
    label: '优先级',
  },
  {
    prop: 'describes',
    label: '描述',
  },
]

const initSearchForm = () => {
  return {
  }
}

const rules = {
  selectionName: [
    { required: true, message: '请输入评选名称', trigger: 'blur' },
  ],
  targetId: [
    { required: true, message: '请选择关联指标', trigger: 'change' },
  ],
  status: [
    { required: true, message: '请选择评选状态', trigger: 'change' },
  ],
  priority: [
    { required: true, message: '请输入评选优先级', trigger: 'blur' },
  ],
  user: [
    { required: true, message: '请选择被评选人', trigger: 'blur' },
  ],
}

export { dictsMap, columnsMap, initForm, initSearchForm, rules }