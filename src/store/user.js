import Axios from 'axios'
import api from '@/shared/api/api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    user: null,
    newNotification: {},
  },
  getters: {
    getUser(state) {
      return state.user
    },
    newNotification(state) {
      return state.newNotification
    }

  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    DELETE_USER(state) {
      state.user = null
    },
    SET_NEW_NOTIFICATIONS(state, data) {
      state.newnotification = data.data
    },
  },
  actions: {
    setUser({ commit }, payload) {
      commit('SET_USER', payload)
    },
    deleteUser({ commit }) {
      commit('DELETE_USER')
    },
    getSessionUser({ commit }) {
      return Axios('/rest/auth', {
        method: 'POST',
        data: {
          action: 'get/session',
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => {
          commit('SET_USER', response.data.data)
          return response.data.data
        })
        .catch((error) => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'main' })
          }
        })
    },
    async signUp(store, data) {
      const response = await api.auth.signUp(data)
      return response
    },
    edit_profile(store, data) {
      return Axios('/rest/front_profile', {
        method: 'POST',
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => {
          return response
        })
        .catch((error) => {
          if (error.response.status === 403) {
            localStorage.removeItem('user')
            router.push({ name: 'main' })
          }
        })
    }
  },
}
