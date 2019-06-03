function pushChat (state, data) {
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
}

function updateUnread (state, username, add) {
  if (!state.unreadMap[username]) {
    state.unreadMap[username] = 0
  }
  if (add) {
    state.unreadMap[username] = state.unreadMap[username] + 1
  } else {
    state.unreadMap[username] = 0
  }
  updateUnreadTotal(state)
}

function updateChatList (state, data) {
  let chatList = state.chatList
  let chat = {}
  for (let i = chatList.length; i--;) {
    if (chatList[i].username === data.username) {
      chat = chatList[i]
      chatList.splice(i, 1)
      if (data.unread) {
        updateUnread(state, chat.username, true)
      } else {
        updateUnread(state, chat.username, false)
      }
      chatList.unshift(chat)
      return
    }
  }
  chat =  {
    username: data.username,
    avatar: data.avatar,
    userId: data.userId,
    realName: data.realName,
  }
  if (data.unread) {
    updateUnread(state, chat.username, true)
  } else {
    updateUnread(state, chat.username, false)
  }
  chatList.unshift(chat)
}

// function addCurrentChatList (state, data) {
//   let chatList = state.currentChatList
//   for (let i = chatList.length; i--;) {
//     if (chatList[i].username === data.username) {
//       let chat = chatList[i]
//       chatList.splice(i, 1)
//       chat.unread ++
//       chatList.unshift(chat)
//       return
//     }
//   }
//   chatList.unshift({
//     username: data.username,
//     avatar: data.avatar,
//     userId: data.userId,
//     realName: data.realName,
//   })
// }

function newChat (chat, chatList) {
  for (let i = chatList.length; i--;) {
    if (chatList[i].userId === chat.userId) {
      chatList.splice(i, 1, chat)
      return false
    }
  }
  return true
}

function clearUserUnread (state, username) {
  let unread = {}
  unread[username] = 0
  state.unreadMap = {
    ...state.unreadMap,
    ...unread,
  }
  updateUnreadTotal(state)
}

function updateUnreadTotal (state) {
  state.unreadTotal = 0
  for (let key in state.unreadMap) {
    state.unreadTotal += state.unreadMap[key]
  }
}

const im = {
  state: {
    userList: [],
    messageMap: {},
    chatList: [],
    currentChatList: [],
    unreadMap: {},
    unreadTotal: 0,
  },
  mutations: {
    addMessage (state, data) {
      pushChat(state, data)
      updateChatList(state, data)
      // if (data.unread) {
      //   addCurrentChatList(state, data)
      // }
    },
    setUserList (state, data) {
      state.userList = data
    },
    addCurrentChatList (state, data) {
      if (newChat(data, state.currentChatList)) {
        state.currentChatList.unshift(data)
      }
      clearUserUnread(state, data.username)
    },
    clearUserUnread (state, key) {
      clearUserUnread(state, key)
    },
    closeCurrentChatList (state, index) {
      state.currentChatList.splice(index, 1)
    },
  },
}
export default im
