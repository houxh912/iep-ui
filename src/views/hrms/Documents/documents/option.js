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

export const tableOption = [
  {
    label: '创建时间',
    prop: 'createTime',
    width: '250',
  }, {
    label: '浏览次数',
    prop: 'views',
    width: '150',
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
    { required: true, message: '请选择文件状态', trigger: 'blur' },
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
