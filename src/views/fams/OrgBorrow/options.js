const dictsMap = {
	borrowMoneyType: {
		'0': '国脉贝',
		'1': '线下支付',
	},
	status: {
		'0': '向集团申请中',
		'1': '集团核准通过且发起资金调拨',
		'2': '待收款',
		'3': '待还款',
		'4': '向组织借款申请中',
		'5': '被借款组织确认且打款',
		'6': '借款组织确认收款',
		'7': '已还款',
		'8': '已撤回',
		'9': '已逾期',
		'10': '借款组织还款确认',
		'11': '被借款组织确认',
	},
}

const formatBorrow = (row) => {
	let name = ''
	if (row.borrowObjectType === 1) {
		name = 'org_borrow_detail'
	} else if (row.borrowObjectType === 2) {
		name = 'union_borrow_detail'
	} else {
		return
	}
	return `/fams_spa/${name}/${row.id}`
}

//【0向集团申请中，1集团核准通过且发起资金调拨，2调拨对象汇款确认，3调入对象收款确认】
//向组织借款状态
//【4，向组织借款申请中，5被借款组织确认且打款，6借款组织确认收款】
//7已还款，8已撤回,9已逾期）

export { dictsMap, formatBorrow }