// import { mergeByFirst } from '@/util/util'

const columnsMap = [
	{
		prop: 'userName',
		label: '捐助者姓名',
	},
	{
		prop: 'amount',
		label: '金额',
	},
	{
		prop: 'createTime',
		label: '捐助日期',
		width: '170',
	},
]

const initForm = () => {
	return {
		amount: 1,
	}
}

const rules = {
	amount: [
		{ required: true, message: '请输入捐助金额', trigger: 'blur', type: 'number' },
	],
}

export {
	columnsMap,
	initForm,
	rules,
}
