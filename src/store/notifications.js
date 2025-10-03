import Axios from 'axios'
import api from '@/shared/api/api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    newNotification: {},
  },

  actions: {
    async getNewNotification ({ commit }, data) {
      const senddata = {
        data: data,
        action: 'get/new',
        id: router.currentRoute._value.params.id,
      }
      const response = await api.notifications.getNewNotification(senddata)
      if (response) {
        commit('SET_NEW_NOTIFICATIONS', response.data)
      }
      return response
    },
    async setViewNotification (store, { item }) {
      const senddata = {
        item: item,
        action: 'set/view',
        id: router.currentRoute._value.params.id,
      }
      const response = await api.notifications.setViewNotification(senddata)
      return response
    },
  },
  mutations: {
    SET_NEW_NOTIFICATIONS(state, data) {
      state.newnotification = data.data
    },
  },
  getters: {
    newNotification(state) {
      return state.newNotification
    }

  },
}
