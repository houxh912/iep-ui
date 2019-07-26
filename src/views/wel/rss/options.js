// org config options
const dictsMap = {
  status: {
    0: '技术文档',
    1: '产品与解决方案',
    2: '培训/课程',
  },
}

const columnsMap = [
  {
    prop: 'themeList',
    label: '主题',
    type: 'tag',
    iepType: 'themeList',
  },
  {
    prop: 'industryList',
    label: '行业',
    type: 'tag',
    iepType: 'industryList',
  },
  {
    prop: 'publishTime',
    label: '发文时间',
    type: 'date',
    formatString: 'YYYY-MM-DD',
  },

]

const initForm = () => {
  return {
    name: '',
    isOpen: false,
    intro: '',
  }
}

const toDtoForm = (row) => {
  const newForm = { ...row }
  return newForm
}

export { dictsMap, columnsMap, initForm, toDtoForm }