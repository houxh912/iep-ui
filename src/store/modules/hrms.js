const hrms = {
  state: {
    approvalDialogShow: false,
    invoiceDialogShow: false,
  },
  mutations: {
    SET_APPROVAL_DIALOG_SHOW: (state, approvalDialogShow) => {
      state.approvalDialogShow = approvalDialogShow
    },
    SET_INVOICE_DIALOG_SHOW: (state, invoiceDialogShow) => {
      state.invoiceDialogShow = invoiceDialogShow
    },
  },
}

export default hrms