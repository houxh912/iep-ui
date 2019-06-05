
const dictsMap = {
	investmentMoneyType: {
	  '0': '国脉贝',
	  '1': '现金',
	},
  }
  
  const statusMap = {
	'1': 2,
	'2': 3,
	'3': 3,
  }
  
  const initForm = () => {
	return {
	  investmentNumber: '', //股份数量
	  totalAmount: '',//投资金额
	  investmentMoneyType: '0',//支付方式（0国脉贝，1现金）
		investmentId: '',//投资
		orgId: '',//投资组织
		targetAmount: 0,//目标金额
		sharesUnivalent: 0,//每股单价
	}
  }
  
  const formToDto = (row) => {
	const newForm = {...row}
	return newForm
  }
  
  const rules = {
		investmentNumber: [
		{ type:'number', required: true, message: '输入的股份数量至少大于 0', trigger: 'blur', min: 1 },
	],
	totalAmount: [
	  { type:'number', required: true, message: '输入的金额至少大于或等于每股单价', trigger: 'blur', min: 1 },
	],
	investmentMoneyType: [
	  { required: true, message: '请选择支付方式', trigger: 'blur' },
	],
	orgId: [
	  { required: true, message: '请选择投资组织', trigger: 'blur' },
	],
  }
  
  export { initForm, dictsMap, statusMap, rules, formToDto }