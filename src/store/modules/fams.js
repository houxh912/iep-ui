import { getTotal } from '@/api/fams/total'
const fams = {
  state: {
    rewardDialogShow: false,
    withdrawableCash: 0,
    totalAsset: 0,
    dayBell: 0,
    ARewardedPerson: [],
    invoiceDialogShow: false,
    billingDialogShow: false,

  },
  mutations: {
    SET_REWARD_DIALOG_SHOW: (state, rewardDialogShow) => {
      state.rewardDialogShow = rewardDialogShow
    },
    SET_WITHDRAWABLECASH: (state, withdrawableCash) => {
      state.withdrawableCash = withdrawableCash
    },
    SET_TOTALASSET: (state, totalAsset) => {
      state.totalAsset = totalAsset
    },
    SET_DAYBELL: (state, dayBell) => {
      state.dayBell = dayBell
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
    async famsGetTotal ({ commit }) {
      const { data } = await getTotal()
      commit('SET_WITHDRAWABLECASH', data.withdrawableCash)
      commit('SET_TOTALASSET', data.data.govmadeBell + data.data.lockBell)
      commit('SET_DAYBELL', data.data.dayBell)
      return data
    },
    async famsReward ({ commit, dispatch }, aperson = null) {
      const { data } = await dispatch('famsGetTotal')
      commit('SET_WITHDRAWABLE_CASH', {
        withdrawableCash: data.withdrawableCash,
        person: aperson ? [aperson] : [],
      })
      commit('SET_REWARD_DIALOG_SHOW', true)
    },
  },
}

export default fams