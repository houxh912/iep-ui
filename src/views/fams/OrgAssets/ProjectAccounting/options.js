
const columnsMap = [
	{
		prop: 'projectNum',
		label: '项目编号',
	},
	{
		prop: 'projectName',
		label: '项目名称',
	},
	{
		prop: 'createTime',
		label: '创建时间',
	},
	{
		prop:'amount',
		label:'合同金额',
	},
	{
		prop:'invoiceAmount',
		label:'开票金额',
	},
]

const initForm = () => {
  return {
    projectName: '',
    contractAmount: 0,
    publisher: '',
    serialNo: '',
    publisherList: {id:'',name:''},
    projectManagerList: {id:'',name:''},
    mktManagerList: {id:'',name:''},
    projectTime: '',
    endTime: '',
  }
}
export { columnsMap, initForm }