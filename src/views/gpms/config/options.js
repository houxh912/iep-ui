// org config options
const dictsMap = {
  isOpen: {
    0: '开',
    1: '关',
  },
  status: {
    0: '审核通过',
    1: '待审核',
    2: '审核驳回',
  },
}

const columnsMap = [
  {
    prop: 'name',
    label: '名称',
  },
  {
    prop: 'type',
    label: '项目类别',
  },
  {
    prop: 'date',
    label: '业务类型',
    width: 300,
  },
]

const pagedTable = [
  {
    name:'项目周报',
    type:'内部项目',
    date:'咨询',
  },
  {
    name:'会议纪要',
    type:'内部项目',
    date:'咨询',
  },
  {
    name:'项目方案',
    type:'内部项目',
    date:'产品',
  },
  {
    name:'最终成果文档',
    type:'内部项目',
    date:'产品',
  },
  {
    name:'需求规格说明书',
    type:'内部项目',
    date:'数据',
  },
  {
    name:'测试文档',
    type:'外部项目',
    date:'数据',
  },
  {
    name:'项目合同',
    type:'外部项目',
    date:'咨询',
  },
  {
    name:'汇报PPT',
    type:'外部项目',
    date:'产品',
  },
  {
    name:'汇报PPT',
    type:'外部项目',
    date:'产品',
  },
  {
    name:'投标文件',
    type:'外部项目',
    date:'产品',
  },
]

const initForm = () => {
  return {
    name: '',
    isOpen: false,
    intro: '',
  }
}

const initSearchForm = () => {
  return {
    name: '',
    teacher: '',
    type: '',
    date: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm, pagedTable}
