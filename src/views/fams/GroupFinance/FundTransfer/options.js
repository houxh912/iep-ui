// import { mergeByFirst } from '@/util/util'
import { initNow } from '@/util/date'
import moment from 'moment'

const dictsMap = {
  status: {
    0: '调拨中',
    1: '调出方确认',
    2: '调入方确认',
    3: '已还款',
    4: '发起方取消',
  },
  allocationWay: {
    0: '国脉贝',
    1: '线下支付',
  },
}

const columnsMap = [
	{
		prop: 'inOrgName',
		label: '调入组织',
	},
	{
		prop: 'outOrgName',
		label: '调出组织',
	},
	{
		prop: 'amount',
		label: '调拨金额',
	},
	{
		prop: 'allocationWay',
		label: '资金调拨方式',
		type: 'dict',
	},
	{
		prop: 'status',
		label: '状态',
		type: 'dict',
	},
	{
		prop: 'creator',
		label: '资金调拨发起人',
	},
	{
		prop: 'createTime',
		label: '创建时间',
	},
]

const calcularTime = (time, value) => {
	return moment(time).add(value, 'day').format('YYYY-MM-DD')
}

const initForm = () => {
	return {
		id: 0, //id
  
	amount: 0,//调拨金额
  allocationWay: 0,//资金调拨方式（0国脉贝，1现金）
  interest: 0,//利息
  allocationDays: 0,//调拨天数
  implementRangeTime: [initNow(), initNow()],//执行日期
  implementStartTime: '',//执行开始日期
  implementEndTime: '',//执行结束日期
  
  callOutOrgId: '',//调出组织ID
  callOutCompanyId: '',//调出线下公司ID
  callOutCompanyBankId: '',//调出线下公司银行账户ID
  callOutUser: {id:'',name:''},//调出方财务用户
  callOutUserId: '',//调出方财务用户ID
  
  callInOrgId: '',//调入组织ID
  callInCompanyId: '',//调入线下公司ID
  callInCompanyBankId: '',//调入线下公司银行账户ID
  callInUser: {id:'',name:''},//调入方财务用户
  callInUserId: '',//调入方财务用户ID
	}
}

const formToDto = (row) => {
	const newForm = {...row}
	newForm.implementStartTime = newForm.implementRangeTime[0]
	newForm.implementEndTime = newForm.implementRangeTime[1]
	return newForm
}

export { dictsMap, columnsMap, initForm, formToDto, calcularTime }