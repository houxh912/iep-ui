import { mergeByFirst } from '@/util/util'

const initForm = () => {
	return {
		id: '',
		name: '',
		job:'',//职务
		titel:'',//职称
		entryTime:'',//入职时间
		postName:'',//岗位名称
		ipostName:'',//调入岗位
		transDepartment:'',//调入部门 
		businessArea:'',//出差地点
		workerTime:'',//转正时间
		createTime:'',//发起时间
		type:'',//类型
		duration:'',//时长
		startTime:'',//开始时间
		endTime:'',//结束时间
		reason:'',//申请理由
		annex:'',//附件
		approver:'',//审批人
		copyPerson:'',//抄送人
	}
}
const formToDto = (row) => {
	const newForm = mergeByFirst(initForm(), row)
	return newForm
}

export {
	columnsMap,
	initForm,
	formToDto,
}
