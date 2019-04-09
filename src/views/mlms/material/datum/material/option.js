export const dictsMap = {
  type: {
    '1': '类型1',
    '2': '类型2',
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
    width: '150',
  },
]

export const initLocalForm = () => {
  return {
    uploader: '',
    type: 0,
    id: '',
    materialName: '',
    intro: '',
    content: '',
    firstClass: '',
    secondClass: '',
    materialType: '',
    tagKeyWords: [],
    isContri: '',
    attachFileList: [],
    attachFile: '',
  }
}


export const initFormData = () => {
  return {
    uploader: '',
    type: 1,
    id: '',
    materialName: '',
    intro: '',
    content: '',
    firstClass: '',
    secondClass: '',
    materialType: '',
    downloadCost: '',
    tagKeyWords: [],
    attachFileList: [],
  }
}

export const rules = {
  materialName: [
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
  materialType: [
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
  uploader: [
    { required: true, message: '必填', trigger: 'change' },
  ],
}
