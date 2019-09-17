export const changeDict = (list, prop = ['value', 'label']) => {
  let data = {}
  for (let item of list) {
    data[item[prop[0]]] = item[prop[1]]
  }
  return data
}

export const dictsMap = {
  topShow: [
    { value: 0, label: '否' },
    { value: 1, label: '是' },
  ],
  status: [
    { value: 0, label: '生效' },
    { value: 1, label: '失效' },
    { value: 2, label: '废止' },
  ],
}

export const tableDictsMap = {
  classId: {},
  topShow: changeDict(dictsMap.topShow),
  status: changeDict(dictsMap.status),
}

export const tableOption = [
  {
    label: '标题名称',
    prop: 'title',
  }, {
    label: '类别',
    prop: 'classId',
    width: 100,
    type: 'dict',
  }, {
    label: '成文日期',
    prop: 'enterTime',
  }, {
    label: '发布时间',
    prop: 'createTime',
  }, {
    label: '文件状态',
    prop: 'status',
    width: 100,
    type: 'dict',
  }, {
    label: '显示状态',
    prop: 'status',
    width: 100,
    type: 'dict',
  },
]

export const initFormData = () => {
  return {
    title: '',
    classId: '',
    resume: '',
    content: '',
    status: 0,
    tagKeyWords: [],
    enterTime: '',
    annex: '',
    annexList: [],
    topShow: 0,
  }
}

export const rules = {
  title: [
    { required: true, message: '请输入文件标题', trigger: 'blur' },
  ],
  classId: [
    { required: true, message: '请选择文件类别', trigger: 'blur' },
  ],
  resume: [
    { required: true, message: '请输入文件简述', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入文件内容', trigger: 'blur' },
  ],
  enterTime: [
    { required: true, message: '请选择成文时间', trigger: 'blur' },
  ],
  annex: [
    { required: true, message: '请上传附件', trigger: 'blur' },
  ],
  annexList: [
    { required: true, message: '请上传附件', trigger: 'blur' },
  ],
  tagKeyWords: [
    { required: true, message: '请填写附件', trigger: 'blur' },
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'blur' },
  ],
}
