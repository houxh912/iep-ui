import { mergeByFirst } from '@/util/util'

const columnsMap = [
	{
		prop: 'type',
		label: '类型',
	},
	{
		prop: 'senderName',
		label: '发布人',
	},
	{
		prop: 'time',
		label: '时间',
		width: 200,
	},
]

const initForm = () => {
	return {
		id: '',
		name: '',
		content: '',
		prop: '',
		area: '',
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
