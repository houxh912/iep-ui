const fams = {
  state: {
    apprenticeShow: false,
    apprenticeReason: '', // 拜师理由
    apprenticePerson: {id: '', name: ''},

  },
  mutations: {
    SET_APPRENTICE_SHOW: (state, apprenticeShow) => {
      state.apprenticeShow = apprenticeShow
    },
    SET_APPRENTICE_REASON: (state, data) => {
      state.apprenticeReason = data.reason
      state.apprenticePerson = data.person
    },
  },
  actions: {
    ApprenticeApply ({ commit }, person = {id: '', name: ''}, reason = '') {
      commit('SET_APPRENTICE_REASON', {
        reason: reason,
        person: person,
      })
      commit('SET_APPRENTICE_SHOW', true)
    },
  },
}

export default fams