import { mergeByFirst } from '@/util/util'

const columnsMap = [
	{
		prop: 'typeName',
		label: '类型',
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
			unions: [],
			orgs: [],
			users: [],
		}, // 接收人
		content: '', // 发布人
		typeId: '', // 邀请联盟,会议纪要
		prop: '', // 邀请联盟,会议纪要
		isMark: '', // 是否标记
	}
}
const initDtoForm = () => {
	return {
		id: 0,  // 通知公告id
		name: '',  // 通知公告Title
		time: '', // 通知公告时间
		receivers: {
			unionIds: [],
			orgIds: [],
			userIds: [],
		}, // 接收人
		content: '', // 发布人
		typeId: '', // 邀请联盟,会议纪要
		prop: '', // 邀请联盟,会议纪要
		isMark: '', // 是否标记
	}
}
const formToDto = (row) => {
	const newForm = mergeByFirst(initDtoForm(), row)
	newForm.unionIds = row.receivers.unions.map(m => m.id)
	newForm.orgIds = row.receivers.orgs.map(m => m.id)
	newForm.userIds = row.receivers.users.map(m => m.id)
	return newForm
}

export {
	columnsMap,
	initForm,
	formToDto,
}
