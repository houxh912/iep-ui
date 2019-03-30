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
		id: null,  // 通知公告id
		name: null,  // 通知公告Title
		time: null, // 通知公告时间
		senderName: null, // 发布人
		receiverName: null, // 接收人
		content: null, // 发布人
		typeId: null, // 邀请联盟,会议纪要
		isMark: null, // 是否标记
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
