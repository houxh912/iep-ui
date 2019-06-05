import { pushNotify } from '@/util/notify'
const notify = {
  state: {
    announcementList: [],
    announcementNum: 0,
    emailList: [],
    emailNum: 0,
    systemMessageList: [],
    systemMessageNum: 0,
  },
  mutations: {
    updateNotify (state, data) {
      state[data.key] = data.value
    },
  },
  actions: {
    UpdatePushNotify ({ commit }, data) {
      const {notifyBody, body} = pushNotify(data)
      commit('updateNotify', { key: notifyBody.listName, value: body.msgList })
      commit('updateNotify', { key: notifyBody.numName, value: body.msgNum })
    },
    SetNotify ({ commit }, data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key]
          commit('updateNotify', { key: key, value: element })
        }
      }
    },
  },
}
export default notify
