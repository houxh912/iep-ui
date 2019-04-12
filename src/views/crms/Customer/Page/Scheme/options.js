const initForm = () => {
  return {
    createName:'',
    clientId: '',
    programName: '',
    attachs: [],
  }
}
const tableOption = [
  {
    label: '创建时间',
    prop: 'createTime',
    width: '250',
  },
  {
    label: '浏览次数',
    prop: 'views',
    width: '200',
  },
]
const rules = {
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
const initLocalForm = () => {
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
export { initForm, tableOption,rules,initLocalForm }
