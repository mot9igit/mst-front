import api from '@/shared/api/api'
import router from '../router'

export default {
  namespaced: true,
  state: {
    orders: {
      orders: [],
      total: -1,
    },
  },
  actions: {
    async getOrders({ commit }, { filter, sort, page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: router.currentRoute._value.params.type,
        filter: filter,
        page: page,
        sort: sort,
        perpage: perpage,
      }
      const response = await api.retail.getOrders(data)
      if (response) {
        commit('SET_ORDERS', response.data)
      }
      return response
    },
    unsetOrders({ commit }) {
      commit('UNSET_ORDERS')
    },
  },
  mutations: {
    SET_ORDERS: (state, data) => {
      state.orders = data.data
    },
    UNSET_ORDERS: (state) => {
      state.orders = {
        orders: [],
        total: -1,
      }
    },
  },
  getters: {
    orders(state) {
      return state.orders
    },
  },
}
