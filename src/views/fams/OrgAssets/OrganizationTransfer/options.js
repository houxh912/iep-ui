// org config options
const dictsMap = {
	isReward: {
		1: '打赏',
		2: '扣减',
	},
}

const tabList = [
	{
		label: '转出',
		value: 'outOrgId',
	},
	{
		label: '转入',
		value: 'inOrgId',
	},
]

const colMap = {
	'inOrgId': [
		{
			prop: 'outOrgName',
			label: '转出组织',
		},
		{
			prop: 'amount',
			label: '金额',
		},
		{
			prop: 'createTime',
			label: '操作时间',
		},
	],
	'outOrgId': [
		{
			prop: 'inOrgName',
			label: '转入组织',
		},
		{
			prop: 'amount',
			label: '金额',
		},
		{
			prop: 'createTime',
			label: '操作时间',
		},
	],
}

const initForm = () => {
	return {
		id: '', // ID
		amount: 0, // 打赏金额
		remarks: '', // 打赏备注
		orgId: '', // 打赏对象
	}
}

const rules = {
	amount: [
		{ type: 'number', required: true, message: '输入的金额至少大于 0 元', trigger: 'blur', min: 1 },
	],
	orgId: [
		{ required: true, message: '请选择组织', trigger: 'change' },
	],
}

export { dictsMap, colMap, initForm, tabList, rules }
