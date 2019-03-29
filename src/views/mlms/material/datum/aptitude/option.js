export const dictsMap = {
  type: {
    1: '类型1',
    2: '类型2',
  },
}

export const tableOption = [
  {
    label: '获得时间',
    prop: 'acquireTime',
    width: '250',
  }, {
    label: '浏览次数',
    prop: 'views',
    width: '200',
  },
]

export const initFormData = () => {
  return {
    honorQualName: '',
    intro: '',
    type: '',
    number: '',
    acquireTime: '',
    downloadCost: '',
    tagKeyWords: [],
    attachFileList: [],
    attachFile: '',
  }
}

export const rules = {
  honorQualName: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  intro: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  type: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  number: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  acquireTime: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  downloadCost: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  tagKeyWords: [
    { required: true, message: '必填', trigger: 'change' },
  ],
}
