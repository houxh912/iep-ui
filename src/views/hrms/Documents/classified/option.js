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
    className: '',
    columnCode: '',
    represent: '',
  }
}

export const rules = {
  className: [
    { required: true, message: '请输入文件标题', trigger: 'blur' },
  ],
  columnCode: [
    { required: true, message: '请选择文件类别', trigger: 'blur' },
  ],
  represent: [
    { required: true, message: '请输入文件简述', trigger: 'blur' },
  ],
}
