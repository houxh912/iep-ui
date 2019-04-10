import { mergeByFirst } from '@/util/util'
import { initNow } from '@/util/date'
const initForm = () => {
	return {
		id: null, // ID
		userId: null, // 申请人ID
		avatar: null, // 申请人avatar
		name: null,
		positionName: null,
		job: null,
		title: null,
		entryTime: null,
		nowTime: initNow(),
		positiveTime: null,
		transferTime: null,
		deptList: [],
		type: 1, // 审批类型（字典：1-请假申请；2-出差申请；3-加班申请；4-请假申请；5-离职申请；6-调岗申请；7-招聘申请）
		startTime: initNow(), // 开始时间(1:请假开始时间；2:出差开始时间;3:加班开始时间;4:入职时间;5:入职时间）
		endTime: initNow(), // 结束时间(1:请假结束时间；2:出差结束时间;3:加班结束时间;4:转正时间;5:离职时间;6:调岗时间）
		reason: null, // 申请理由
		attachFile: [], // 文件
		approver: [], // 审批人
		cc: [], // 抄送人
		duration: null, //各种时长
		leaveType: null, // 请假类型
		transferDept: null, // 部门ID
		transferPosition: null, // 岗位ID
		transferPositionList: [], // 岗位ID
		busTripDistrict: null,
	}
}

const formToVo = (row) => {
	const newForm = mergeByFirst(initForm(), row)
	newForm.annex = row.attachFile ? [row.attachFile] : []
	return newForm
}

const initSelfForm = () => {
	return {
		id: '', // 用户ID 不可编辑
		name: '', // 真实姓名 不可编辑
		avatar: '', // 头像
		positionName: '', // 岗位
		job: '', // 职务
		title: '', // 职称
		entryTime: '', // 入职时间
		positiveTime: '', // 转正时间
		transferTime: '', // 调动时间
		deptList: [], // 所属部门 Vo 不可编辑
	}
}

const formToDto = (row, type) => {
	const newForm = { ...row, type }
	newForm.attachFileUrl = newForm.annex.map(m => m.url)[0]
	newForm.approver = newForm.approver.map(m => m.id)
	newForm.cc = newForm.cc.map(m => m.id)
	return newForm
}

export {
	initSelfForm,
	initForm,
	formToDto,
	formToVo,
}
