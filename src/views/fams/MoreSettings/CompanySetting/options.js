// import { mergeByFirst } from '@/util/util'

const initForm = () => {
	return {
		parentId: '',
		parentName: '',
		orgId: '',
		name: '',
	}
}

const columnsMap = [
	{
		prop: 'id',
		label: 'ID',
		width: 80,
	},
	{
		prop: 'name',
		label: '公司名称',
	},
	{
		prop: 'orgName',
		label: '关联组织',
	},
	{
		prop: 'updateTime',
		label: '操作时间',
	},
]

export {
	columnsMap,
	initForm,
}
