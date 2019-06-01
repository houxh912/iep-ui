const im = {
  state: {
    messageMap: {},
    userList: [],
  },
  mutations: {
    addMessage (state, data) {
      let chat = state.messageMap[data.username]
      if (!chat) {
        state.messageMap[data.username] = []
      }
      let message = {
        message: data.message,
        time: data.time,
        type: data.type,
      }
      let messageList = {}
      messageList[data.username] = []
      state.messageMap = {
        ...state.messageMap,
        messageList,
      }
      state.messageMap[data.username].push(message)
    },
    setUserList (state, data) {
      state.userList = data
    },
  },
}
export default im
