import { getCustomGroup, getGroup, clearUnread, getGroupMembers, updateGroupInfo, deleteGroup, updateCustomGroup, deleteCustomGroup } from '@/api/im'
import { getUserListTree } from '@/api/admin/contacts'

function addChat (state, data, isNew = true) {
  let message = {
    id: data.id,
    message: data.message,
    messageType: data.messageType,
    time: data.time,
    sendOrReceive: data.sendOrReceive,
    msgCode: data.msgCode,
    avatar: data.avatar,
    resourceName: data.resourceName,
  }
  if (state.messageMap.hasOwnProperty(data.chatNo)) {
    if (isNew) {
      state.messageMap[data.chatNo].push(message)
    } else {
      state.messageMap[data.chatNo].unshift(message)
    }
  } else {
    let userMessage = {}
    userMessage[data.chatNo] = []
    if (isNew) {
      userMessage[data.chatNo].push(message)
    } else {
      userMessage[data.chatNo].unshift(message)
    }
    state.messageMap = {
      ...state.messageMap,
      ...userMessage,
    }
  }
}

function updateChatList (state, chat, reverse = true) {
  let chatList = state.chatList
  let chatTemp = {}
  for (let i = chatList.length; i--;) {
    if (chatList[i].chatNo === chat.chatNo) {
      chatTemp = chatList[i]
      chatList.splice(i, 1)
      updateUnread(state, chatTemp.chatNo, chat.unread)
      if (reverse) {
        chatList.unshift(chatTemp)
      } else {
        chatList.push(chatTemp)
      }
      return
    }
  }
  chatTemp =  {
    id: chat.id,
    chatNo: chat.chatNo,
    type: chat.type,
    avatar: chat.avatar,
    realName: chat.realName,
    username: chat.username,
    originatorId: chat.originatorId || '',
  }
  updateUnread(state, chat.chatNo, chat.unread)
  if (reverse) {
    chatList.unshift(chatTemp)
  } else {
    chatList.push(chatTemp)
  }
}

function updateUnread (state, chatNo, num) {
  if (!state.unreadMap.hasOwnProperty(chatNo)) {
    state.unreadMap[chatNo] = 0
  }
  if (num) {
    state.unreadMap[chatNo] = state.unreadMap[chatNo] + num
  } else {
    state.unreadMap[chatNo] = 0
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
    if (chatList[i].chatNo === chat.chatNo) {
      chatList.splice(i, 1, chat)
      return false
    }
  }
  return true
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

function getUserInfo (state, userId) {
  for (let i = state.userList.length; i--;) {
    if (state.userList[i].value === userId) {
      return {
        username: state.userList[i].py,
        realName: state.userList[i].label,
        avatar: state.userList[i].avatar,
        id: state.userList[i].value,
      }
    }
  }
  return null
}

function getUserInfoByName (state, username) {
  for (let i = state.userList.length; i--;) {
    if (state.userList[i].py === username) {
      return {
        username: state.userList[i].py,
        realName: state.userList[i].label,
        avatar: state.userList[i].avatar,
        id: state.userList[i].value,
      }
    }
  }
}

function getGroupInfro (state, id) {
  for (let i = state.groups.length; i--;) {
    if (state.groups[i].id === id) {
      return {
        username: state.groups[i].groupName,
        realName: state.groups[i].groupName,
        avatar: state.groups[i].avator,
        id: state.groups[i].id,
        originatorId: state.groups[i].originatorId,
      }
    }
  }
}

function getCustomGroupMembers (state, data) {
  let list = []
  for (let i = data.length; i--;) {
    let children = [{leaf: true}]
    let ids = data[i].members ? data[i].members.split(',') : []
    for (let j = ids.length; j--;) {
      let user = getUserInfo(state, parseInt(ids[j]))
      children.unshift({
        avatar: user.avatar,
        leaf: true,
        label: user.realName,
        py: user.username,
        value: user.id,
      })
    }
    let item = {
      label: data[i].name,
      leaf: false,
      value: data[i].id,
      children,
    }
    list.unshift(item)
  }
  return list
}

function groupRemove (state, groupId) {
  let groups = state.groups
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].id === groupId) {
      groups.splice(i, 1)
      break
    }
  }
  let chatList = state.chatList
  for (let i = 0; i < chatList.length; i++) {
    if (chatList[i].chatNo === `group${groupId}`) {
      chatList.splice(i, 1)
      break
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
    currentChat: {},
    groups: [],
    customGroups: [],
    groupMemberMap: {},
    chatShow: false,
  },
  mutations: {
    addMessage (state, data) {
      let chat = Object.assign({}, data)
      updateChatList(state, {...chat, ...{id: chat.userId}})
      let user = getUserInfoByName(state, data.resourceName)
      data.resourceName = user.realName
      data.avatar = user.avatar
      addChat(state, data)
    },
    addHistoryMessage (state, data) {
      let chatNo = ''
      if (data.type == 1) {
        chatNo = 'user' + data.targetId
      } else {
        chatNo = 'group' + data.targetId
      }
      for (let i = 0; i < data.list.length; i++) {
        let sendOrReceive = ''
        let resourceName = ''
        let avatar = ''
        if (data.type == 1) {
          let user = getUserInfo(state, data.list[i].resourceId)
          avatar = user.avatar
          resourceName = user.realName
          sendOrReceive = data.selfId === data.list[i].targetId ? 1 : 0
        } else {
          let user = getUserInfo(state, data.list[i].resourceId)
          avatar = user.avatar
          resourceName = user.realName
          sendOrReceive = data.selfId === data.list[i].resourceId ? 0 : 1
        }
        addChat(state, {
          id: data.list[i].id,
          chatNo,
          message: data.list[i].msg,
          messageType: data.list[i].msgType,
          msgCode: data.list[i].msgCode,
          time: data.list[i].sendTime,
          sendOrReceive,
          username: data.username,
          resourceName,
          avatar,
        }, false)
      }
      if (data.list.length < 10) {
        state.messageMore[chatNo] = false
      }
    },
    clearUserUnread (state, chatNo) {
      if (state.unreadMap.hasOwnProperty(chatNo)) {
        state.unreadMap[chatNo] = 0
      } else {
        let unread = {}
        unread[chatNo] = 0
        state.unreadMap = {
          ...state.unreadMap,
          ...unread,
        }
      }
      updateUnreadTotal(state)
    },
    closeCurrentChatList (state, index) {
      state.currentChatList.splice(index, 1)
    },
    initHistory (state, {history, selfId}) {
      for (let i = 0; i < history.length; i++) {
        let chat = {}
        let sendOrReceive = ''
        let resourceName = ''
        let avatar = ''
        if (history[i].oneOrMore == 1) {
          chat = getUserInfo(state, history[i].resourceId === selfId ? history[i].targetId : history[i].resourceId)
          let user = getUserInfo(state, history[i].resourceId)
          avatar = user.avatar
          resourceName = user.realName
          sendOrReceive = history[i].targetId === selfId ? 1 : 0
        } else {
          chat = getGroupInfro(state, history[i].targetId)
          let user = getUserInfo(state, history[i].resourceId)
          avatar = user.avatar
          resourceName = user.realName
          sendOrReceive = selfId === history[i].resourceId ? 0 : 1
        }
        let chatNo = history[i].oneOrMore == 1 ? `user${chat.id}` : `group${chat.id}`
        chat.chatNo = chatNo
        chat.unread = history[i].msgNum
        chat.type = history[i].oneOrMore
        updateChatList(state, chat, false)
        addChat(state, {
          id: history[i].id,
          chatNo,
          message: history[i].msg,
          messageType: history[i].msgType,
          time: history[i].sendTime,
          sendOrReceive,
          msgCode:  history[i].msgCode,
          resourceName,
          avatar,
        })
      }
    },
    imClearAll (state) {
      state.messageMap = {}
      state.messageMore = {}
      state.chatList = []
      state.currentChatList = []
      state.unreadMap = {}
      state.unreadTotal = 0
      state.currentChat = {}
      state.groups = []
      state.customGroups = []
      state.groupMemberMap = {}
    },
    setUserList (state, data) {
      state.userTree = data
      initUserList(state, data)
    },
    initGroup (state, data) {
      state.groups = data
    },
    initCustomGroup (state, data) {
      state.customGroups = getCustomGroupMembers(state, data)
    },
    updateCustomGroup (state, data) {
      for (let i = state.customGroups.length; i--;) {
        if (state.customGroups[i].value === data.id) {
          state.customGroups[i].label = data.name
          return
        }
      }
    },
    deleteCustomGroup (state, id) {
      for (let i = state.customGroups.length; i--;) {
        if (state.customGroups[i].value === id) {
          state.customGroups.splice(i, 1)
          return
        }
      }
    },
    chatChange (state, {chat, show}) {
      state.chatShow = show
      state.currentChat = chat || {}
      if (chat) {
        if (newChat(chat, state.currentChatList)) {
          state.currentChatList.unshift(chat)
        }
        if (!state.messageMore.hasOwnProperty(chat.chatNo)) {
          state.messageMore[chat.chatNo] = true
        }
      }
    },
    updateGroup (state, data) {
      if (data.type) {
        state.groups.push(data)
      } else {
        groupRemove(state, data.id)
      }
    },
    updateGroupInfo (state, {id, groupName}) {
      for (let i = state.groups.length; i--;) {
        if (state.groups[i].id === id) {
          state.groups[i].groupName = groupName
          if (state.currentChat.chatNo === `group${id}`) {
            state.currentChat.chatName = groupName
          }
        }
      }
    },
    updateGroupMember (state, {groupId, type, ids}) {
      if (state.groupMemberMap.hasOwnProperty(`group${groupId}`)) {
        if (type) {
          let newMembers = []
          for (let i = ids.length; i--;) {
            let user = getUserInfo(state, ids[i])
            newMembers.push({
              id: groupId,
              membersId: user.id,
              avatar: user.avatar,
              membersName: user.username,
              realName: user.realName,
            })
          }
          let members = Object.assign([], state.groupMemberMap[`group${groupId}`])
          state.groupMemberMap[`group${groupId}`] = [...members, ...newMembers]
        } else {
          for (let i = state.groupMemberMap[`group${groupId}`].length; i--;) {
            if (ids.includes(state.groupMemberMap[`group${groupId}`][i].membersId)) {
              state.groupMemberMap[`group${groupId}`].splice(i, 1)
            }
          }
        }
      }
    },
    innitGroupMember (state, {groupId, data}) {
      if (state.groupMemberMap.hasOwnProperty(`group${groupId}`)) {
        let members = Object.assign([], state.groupMemberMap[`group${groupId}`])
        state.groupMemberMap[`group${groupId}`] = [...members, ...data]
      } else {
        let members = {}
        members[`group${groupId}`] = data
        state.groupMemberMap = {...state.groupMemberMap, ...members}
      }
    },
    groupRemove (state, groupId) {
      groupRemove (state, groupId)
    },
  },
  actions: {
    initCustomGroup ({ commit }) {
      return new Promise((resolve, reject) => {
        getCustomGroup().then(({data}) => {
          if (data.code === 0) {
            commit('initCustomGroup', data.data)
            resolve()
          } else {
            reject(new Error(data.msg))
          }
        }, () => {
          reject()
        }).catch(() => {
          reject()
        })
      })
    },
    initGroup ({ commit }) {
      return new Promise((resolve, reject) => {
        getGroup().then(({data}) => {
          if (data.code === 0) {
            commit('initGroup', data.data)
            resolve()
          } else {
            reject(new Error(data.msg))
          }
        }, () => {
          reject()
        }).catch(() => {
          reject()
        })
      })
    },
    updateCurrentChat ({ commit }, {chat, show}) {
      if (chat) {
        clearUnread({type: chat.type, targetId: chat.id}).then(() => {
          commit('clearUserUnread', chat.chatNo)
          commit('chatChange', {chat, show})
        })
      } else {
        commit('chatChange', {chat, show})
      }
    },
    getUserListTree ({ commit }) {
      return new Promise(resolve => {
        getUserListTree().then(({data}) => {
          commit('setUserList', data.data)
          resolve()
        })
      })
    },
    updateGroupInfo ({ commit }, {id, groupName}) {
      return new Promise((resolve, reject) => {
        updateGroupInfo({
          id,
          groupName,
        }).then(({data}) => {
          if (data.code === 0) {
            commit('updateGroupInfo', {id, groupName})
            resolve()
          } else {
            reject(data)
          }
        }, (error) => {
          reject(error)
        })
      })
    },
    setGroupMembers ({ commit }, groupId) {
      return new Promise((resolve, reject) => {
        getGroupMembers({groupId}).then(({data}) => {
          if (data.code === 0) {
            commit('innitGroupMember', {groupId, data: data.data})
            resolve(data.data)
          }
        }, error => {
          reject(error)
        })
      })
    },
    removeGroup ({ commit }, groupId) {
      return new Promise((resolve, reject) => {
        deleteGroup({groupId}).then(({data}) => {
          if (data.code === 0) {
            commit('groupRemove', groupId)
            resolve()
          }
        }, error => {
          reject(error)
        })
      })
    },
    updateCustomGroup ({ commit }, param) {
      return new Promise((resolve, reject) => {
        updateCustomGroup(param).then(({data}) => {
          if (data.code === 0) {
            commit('updateCustomGroup', param)
            resolve()
          } else {
            reject(data.msg)
          }
        }, error => {
          reject(error.msg)
        })
      })
    },
    deleteCustomGroup ({ commit }, param) {
      return new Promise((resolve, reject) => {
        deleteCustomGroup(param).then(({data}) => {
          if (data.code === 0) {
            commit('deleteCustomGroup', param.id)
            resolve()
          } else {
            reject(data.msg)
          }
        }, error => {
          reject(error.msg)
        })
      })
    },
  },
}
export default im
