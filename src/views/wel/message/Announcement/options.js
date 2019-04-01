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
		id: 0,  // 通知公告id
		name: '',  // 通知公告Title
		time: '', // 通知公告时间
		sender: {
			id: 0,
			name: '',
		}, // 发布人
		receivers: {
			orgs: [],
			users: [],
		}, // 接收人
		content: '', // 发布人
		typeId: '', // 邀请联盟,会议纪要
		isMark: '', // 是否标记
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
