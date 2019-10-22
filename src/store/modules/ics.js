const hrms = {
  state: {
    questionDialogShow: false,
  },
  mutations: {
    SET_QUESTION_DIALOG_SHOW: (state, status) => {
      state.questionDialogShow = status
    },
  },
  actions: {
    QuestionAndAnswer ({ commit }, status) {
      commit('SET_QUESTION_DIALOG_SHOW', status)
    },
  },
}

export default hrms