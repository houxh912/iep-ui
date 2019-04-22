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
		type: '', // 邀请联盟,会议纪要
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
		type: '', // 邀请联盟,会议纪要
		isMark: '', // 是否标记
	}
}
const formToDto = (row) => {
	const newForm = mergeByFirst(initDtoForm(), row)
	newForm.title = row.name
	newForm.text = row.content
	newForm.receivers.unionIds = row.receivers.unions.map(m => m.id)
	newForm.receivers.orgIds = row.receivers.orgs.map(m => m.id)
	newForm.receivers.userIds = row.receivers.users.map(m => m.id)
	return newForm
}

export {
	columnsMap,
	initForm,
	formToDto,
}
export const tipContent = {
    name : '主题请务必包含关于+事由+通知类型，如关于学习内网2.0相关功能操作的通知。',
    type : '日常公告：关于学习、传达会议精神/要求、放假等日常的通知；<br/>' +
    '公司制度：制度规范类征集意见或实施等公布的通知；<br/>' +
    '培训通知：关于培训而发布的通知；<br/>' +
    '人事调动：关于人事任免而发布的通知；<br/>' +
    '其他通知：除上述提到的以外的通知。<br/>',
    content : '1、包含称呼、通知缘由、事项、要求和发文单位等内容；<br/>' +
    '2、分段陈述，默认字体与字号，带格式的文字粘贴请使用“格式清除”工具；',
    receivers : '为该通知接收对象，一般以某个组织或群体为单位。',
}