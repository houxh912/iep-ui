const columnsMap = [
  {
    prop: 'versionTitle',
    label: '标题',
    width:'600px',
  },
  {
    prop: 'versionNumber',
    label: '版本号',
    width:'100px',
  },
  {
    prop: 'publisherName',
    label: '发布人',
    width:'100px',
  },{
    prop: 'createTime',
    label: '发布时间',
    width:'150px',
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