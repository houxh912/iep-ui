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
export const tipContent = {
    honorQualName:'1、日期+单位简称/产品+荣誉资质名称+类型：20190101数据基因发明专利审查合格通知书；<br/>' +
    '备注：名称中切记出现特殊符号',
    intro:'1、荣誉资质用途和发放单位等相关信息',
    type:'1、专利2、软著3、认证  4、商标 5、评选奖项 6、软件评测',
    number:'根据证书/通知书上信息填写',
    acquireTime:'根据证书/通知书上日期正确填写',
    downloadCost:'？？',
    tagKeyWords:'1、标签必须三个以上；<br/>' +
    '2、标签必须与荣誉资质材料内容密切相关；',
    attachFileList:'支持jpg，png、.gif 、bmp等格式',
}