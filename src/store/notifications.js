import Axios from 'axios'
import api from '@/shared/api/api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    newNotification: {},
    notifications: {},
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
    async getNotifications ({ commit }, data) {
      const senddata = {
        data: data,
        action: 'get',
        id: router.currentRoute._value.params.id,
      }
      const response = await api.notifications.getNotifications(senddata)
      if (response) {
        commit('SET_NOTIFICATIONS', response.data)
      }
      return response
    },
    async readAllNotifications ({ commit }) {
      const senddata = {
        ids: 'all',
        action: 'read',
        id: router.currentRoute._value.params.id,
      }
      const response = await api.notifications.getNotifications(senddata)
      if (response) {
        commit('READ_NOTIFICATIONS', response.data)
      }
      return response
    },
    async deleteNotifications ({ commit }, { notification_id }) {
      const senddata = {
        action: 'delete',
        id: router.currentRoute._value.params.id,
        notification_id: notification_id
      }
      const response = await api.notifications.getNotifications(senddata)
      if (response) {
        commit('DELETE_NOTIFICATIONS', response.data)
      }
      return response
    },
  },
  mutations: {
    SET_NEW_NOTIFICATIONS(state, data) {
      state.newnotification = data.data
    },
    SET_NOTIFICATIONS(state, data) {
      state.notifications = data.data
    },
  },
  getters: {
    newNotification(state) {
      return state.newNotification
    },
    notifications(state) {
      return state.notifications
    },

  },
}
