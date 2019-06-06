function addChat (state, data, isNew = true) {
  let message = {
    id: data.id,
    message: data.message,
    time: data.time,
    type: data.type,
    msgCode: data.msgCode,
  }
  if (state.messageMap.hasOwnProperty(data.username)) {
    if (isNew) {
      state.messageMap[data.username].push(message)
    } else {
      state.messageMap[data.username].unshift(message)
    }
  } else {
    let userMessage = {}
    userMessage[data.username] = []
    if (isNew) {
      userMessage[data.username].push(message)
    } else {
      userMessage[data.username].unshift(message)
    }
    state.messageMap = {
      ...state.messageMap,
      ...userMessage,
    }
  }
}

function updateChatList (state, user, reverse = true) {
  let chatList = state.chatList
  let chat = {}
  for (let i = chatList.length; i--;) {
    if (chatList[i].username === user.username) {
      chat = chatList[i]
      chatList.splice(i, 1)
      updateUnread(state, chat.username, user.unread)
      if (reverse) {
        chatList.unshift(chat)
      } else {
        chatList.push(chat)
      }
      return
    }
  }
  chat =  {
    username: user.username,
    avatar: user.avatar,
    userId: user.userId,
    realName: user.realName,
  }
  updateUnread(state, user.username, user.unread)
  if (reverse) {
    chatList.unshift(chat)
  } else {
    chatList.push(chat)
  }
}

function updateUnread (state, username, num) {
  if (!state.unreadMap.hasOwnProperty(username)) {
    state.unreadMap[username] = 0
  }
  if (num) {
    state.unreadMap[username] = state.unreadMap[username] + num
  } else {
    state.unreadMap[username] = 0
  }
  updateUnreadTotal(state)
}

function updateUnreadTotal (state) {
  state.unreadTotal = 0
  for (let key in state.unreadMap) {
    state.unreadTotal += state.unreadMap[key]
  }
}

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
  if (state.unreadMap.hasOwnProperty(username)) {
    state.unreadMap[username] = 0
  } else {
    let unread = {}
    unread[username] = 0
    state.unreadMap = {
      ...state.unreadMap,
      ...unread,
    }
  }
  updateUnreadTotal(state)
}

function initUserList (state, tree) {
  state.userList = treeToList(tree)
}

function treeToList (tree) {
  let list = []
  for (let i = tree.length; i--;) {
    if (tree[i].leaf) {
      list.push(tree[i])
    } else {
      list.push(...treeToList(tree[i].children))
    }
  }
  return list
}

function getUserInfo (state, username) {
  for (let i = state.userList.length; i--;) {
    if (state.userList[i].py === username) {
      return {
        username,
        realName: state.userList[i].label,
        avatar: state.userList[i].avatar,
        userId: state.userList[i].value,
      }
    }
  }
}

const im = {
  state: {
    userList: [],
    userTree: [],
    messageMap: {},
    messageMore: {},
    chatList: [],
    currentChatList: [],
    unreadMap: {},
    unreadTotal: 0,
  },
  mutations: {
    addMessage (state, data) {
      addChat(state, data)
      updateChatList(state, data)
    },
    addHistoryMessage (state, data) {
      for (let i = 0; i < data.list.length; i++) {
        addChat(state, {
          id: data.list[i].id,
          message: data.list[i].msg,
          msgCode: data.list[i].msgCode,
          time: data.list[i].sendTime,
          type: data.username === data.list[i].targetName ? 0 : 1,
          username: data.username,
        }, false)
      }
      if (data.list.length < 10) {
        state.messageMore[data.username] = false
      }
    },
    addCurrentChatList (state, user) {
      if (newChat(user, state.currentChatList)) {
        state.currentChatList.unshift(user)
      }
      if (!state.messageMore.hasOwnProperty(user.username)) {
        state.messageMore[user.username] = true
      }
      clearUserUnread(state, user.username)
    },
    clearUserUnread (state, username) {
      clearUserUnread(state, username)
    },
    closeCurrentChatList (state, index) {
      state.currentChatList.splice(index, 1)
    },
    initHistory (state, history) {
      for (let i = 0; i <  history.length; i++) {
        let user = getUserInfo(state, history[i].resourceName)
        user.unread = history[i].msgNum
        updateChatList(state, user, false)
        addChat(state, {
          id: history[i].id,
          message: history[i].msg,
          time: history[i].sendTime,
          type: history[i].msgType,
          username: history[i].resourceName,
          msgCode:  history[i].msgCode,
        })
      }
    },
    imClearAll (state) {
      state.messageMap = {}
      state.chatList = []
      state.currentChatList = []
      state.unreadMap = {}
      state.unreadTotal = 0
    },
    setUserList (state, data) {
      state.userTree = data
      initUserList(state, data)
    },
  },
}
export default im
