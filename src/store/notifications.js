import Axios from 'axios'
import api from '@/shared/api/api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    newNotification: {},
    notificationsAll: {},
    notifications: {},
    notifications_types: {},
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
    async getNotifications ({ commit }, { page, perpage, read }) {
      const senddata = {
        page: page,
        perpage: perpage,
        read: read,
        action: 'get',
        id: router.currentRoute._value.params.id,
      }
      const response = await api.notifications.getNotifications(senddata)
      if (response) {
        commit('SET_NOTIFICATIONS', response.data)
      }
      return response
    },
    async getAllNotifications ({ commit }, data) {
      const senddata = {
        data: data,
        action: 'get',
        id: router.currentRoute._value.params.id,
      }
      const response = await api.notifications.getAllNotifications(senddata)
      if (response) {
        commit('SET_ALL_NOTIFICATIONS', response.data)
      }
      return response
    },
    async readAllNotifications ({ commit }) {
      const senddata = {
        ids: 'all',
        action: 'read',
        id: router.currentRoute._value.params.id,
      }
      const response = await api.notifications.getAllNotifications(senddata)
      if (response) {
        commit('SET_ALL_NOTIFICATIONS', response.data)
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
        commit('SET_NOTIFICATIONS', response.data)
      }
      return response
    },
    async getNotificationsTypes ({ commit }) {
      const senddata = {
        action: 'get/types',
        id: router.currentRoute._value.params.id,
      }
      const response = await api.notifications.getNotificationsTypes(senddata)
      if (response) {
        commit('SET_NOTIFICATIONS_TYPES', response.data)
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
    SET_ALL_NOTIFICATIONS(state, data) {
      state.notificationsAll = data.data
    },
    SET_NOTIFICATIONS_TYPES(state, data) {
      state.notifications_types = data.data
    },
  },
  getters: {
    newNotification(state) {
      return state.newNotification
    },
    notifications(state) {
      return state.notifications
    },
    notificationsAll(state) {
      return state.notificationsAll
    },
    notifications_types(state) {
      return state.notifications_types
    },

  },
}
