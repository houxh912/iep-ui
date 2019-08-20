import { getAccountInfo } from '@/api/fams/block_chain'
const ican = {
  state: {
    rewardDialogShow: false,
    withdrawableCash: 0,

  },
  mutations: {
    SET_ICAN_REWARD_DIALOG_SHOW: (state, rewardDialogShow) => {
      state.rewardDialogShow = rewardDialogShow
    },
    SET_ICAN_WITHDRAWABLE_CASH: (state, data) => {
      state.withdrawableCash = data.withdrawableCash
      state.ARewardedPerson = data.person
    },
  },
  actions: {
    icanReward ({ commit }) {
      getAccountInfo().then(({ data }) => {
        if (data.data) {
          commit('SET_ICAN_WITHDRAWABLE_CASH', {
            withdrawableCash: data.data.balance,
          })
          commit('SET_ICAN_REWARD_DIALOG_SHOW', true)
        }
      })
    },
  },
}

export default ican