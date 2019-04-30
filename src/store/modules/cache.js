import { loadAllDictMap } from '@/api/admin/dict'
import { getStore, setStore } from '@/util/store'
import { loadContactsPyList } from '@/api/admin/contacts'
import { pickDeep } from '@/util/util'
const cache = {
  state: {
    dictGroup: getStore({ name: 'dictGroup' }) || {},
    contactsPyList: getStore({ name: 'contactsPyList' }) || {},
  },
  actions: {
    // 获取通讯录
    LoadContactsPyList ({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        loadContactsPyList().then(res => {
          const { data } = res
          commit('SET_CONTACTS_PY_LIST', data.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取全部字典
    LoadAllDictMap ({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        loadAllDictMap().then(res => {
          const { data } = res
          commit('SET_DICT_ALL', data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
  },
  mutations: {
    SET_DICT_ALL: (state, dictGroup) => {
      for (const key in dictGroup) {
        if (dictGroup.hasOwnProperty(key)) {
          const element = dictGroup[key]
          dictGroup[key] = pickDeep(element)
        }
      }
      state.dictGroup = dictGroup
      setStore({
        name: 'dictGroup',
        content: state.dictGroup,
        type: 'session',
      })
    },
    SET_CONTACTS_PY_LIST: (state, contactsPyList) => {
      state.contactsPyList = contactsPyList
      setStore({
        name: 'contactsPyList',
        content: contactsPyList,
        type: 'session',
      })
    },
  },
  
}

export default cache