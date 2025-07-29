import api from '@/shared/api/api'
import router from '../router'

export default {
  namespaced: true,
  state: {
    orders: {
      orders: [],
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
  },
  mutations: {
    SET_ORDERS: (state, data) => {
      state.orders = data.data
    },
  },
  getters: {
    orders(state) {
      return state.orders
    },
  },
}
