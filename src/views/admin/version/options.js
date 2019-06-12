const columnsMap = [
  {
    prop: 'versionTitle',
    label: '标题',
  },
  {
    prop: 'versionNumber',
    label: '版本号',
  },
  {
    prop: 'publisherName',
    label: '发布人',
  },{
    prop: 'createTime',
    label: '发布时间',
  },
]

const initForm = () => {
  return {
    id: '',
    versionTitle: '',
    versionNumber: '',
    createTime:'',
    versionDesc:'',
  }
}


export { columnsMap, initForm }