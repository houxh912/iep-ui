export const dictsMap = {
  type: {
    1: '类型1',
    2: '类型2',
  },
}

export const tableOption = [
  {
    label: '创建时间',
    prop: 'createTime',
    width: '250',
  }, {
    label: '浏览次数',
    prop: 'views',
    width: '200',
  },
]

export const initLocalForm = () => {
  return {
    id: '',
    name: '',
    intro: '',
    content: '',
    firstClass: '',
    secondClass: '',
    type: '',
    tagKeyWords: [],
    isContri: '',
  }
}


export const initFormData = () => {
  return {
    id: '',
    name: '',
    intro: '',
    content: '',
    firstClass: '',
    secondClass: '',
    type: '',
    downloadCost: '',
    tagKeyWords: [],
    fileList: [],
  }
}

export const rules = {
  name: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  intro: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  firstClass: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  secondClass: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  type: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  tagKeyWords: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  isContri: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  downloadCost: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  creator: [
    { required: true, message: '必填', trigger: 'change' },
  ],
}
