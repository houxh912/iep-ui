import { loadAllDictMap } from '@/api/admin/dict'
import { getStore, setStore } from '@/util/store'
import { getUserPyList } from '@/api/admin/contacts'
import { pickDeep } from '@/util/util'
import keyBy from 'lodash/keyBy'
const cache = {
  state: {
    dictGroup: getStore({ name: 'dictGroup' }) || {},
    contactsPyGroup: getStore({ name: 'contactsPyGroup' }) || {},
  },
  actions: {
    // 获取通讯录
    LoadContactsPyGroup ({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        getUserPyList().then(res => {
          const { data } = res
          commit('SET_CONTACTS_PY_GROUP', keyBy(data.data, 'id'))
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
    SET_CONTACTS_PY_GROUP: (state, contactsPyGroup) => {
      state.contactsPyGroup = contactsPyGroup
      setStore({
        name: 'contactsPyGroup',
        content: contactsPyGroup,
        type: 'session',
      })
    },
  },
  
}

export default cache