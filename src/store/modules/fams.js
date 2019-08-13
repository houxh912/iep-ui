import { getTotal } from '@/api/fams/total'
const fams = {
  state: {
    rewardDialogShow: false,
    withdrawableCash: 0,
    ARewardedPerson: { id: '', name: '' },
    invoiceDialogShow: false,
    billingDialogShow: false,

  },
  mutations: {
    SET_REWARD_DIALOG_SHOW: (state, rewardDialogShow) => {
      state.rewardDialogShow = rewardDialogShow
    },
    SET_INVOICE_DIALOG_SHOW: (state, invoiceDialogShow) => {
      state.invoiceDialogShow = invoiceDialogShow
    },
    SET_BILLING_DIALOG_SHOW: (state, billingDialogShow) => {
      state.billingDialogShow = billingDialogShow
    },
    SET_WITHDRAWABLE_CASH: (state, data) => {
      state.withdrawableCash = data.withdrawableCash
      state.ARewardedPerson = data.person
    },
  },
  actions: {
    famsReward ({ commit }, person = { id: '', name: '' }) {
      getTotal().then(({ data }) => {
        if (data.data) {
          commit('SET_WITHDRAWABLE_CASH', {
            withdrawableCash: data.data.withdrawableCash,
            person: person,
          })
          commit('SET_REWARD_DIALOG_SHOW', true)
        }
      })
    },
  },
}

export default fams