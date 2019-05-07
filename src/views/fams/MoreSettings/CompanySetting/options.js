// import { mergeByFirst } from '@/util/util'

const initForm = () => {
	return {
		id: '',
		
	}
}

const columnsMap = [
	{
		prop: 'id',
		label: 'ID',
	},
	{
		prop: 'companyName',
		label: '公司名称',
	},
	{
		prop: 'related',
		label: '关联组织',
	},
	{
		prop: 'createTime',
		label: '操作时间',
	},
]

export {
	columnsMap,
	initForm,
}
