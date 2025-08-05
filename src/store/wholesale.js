import api from '@/shared/api/api'
import router from '../router'

export default {
  namespaced: true,
  state: {
    orders: {
      orders: [],
      total: -1,
    },
    order: {},
    vendors: {},
  },
  actions: {
    async getOrders({ commit }, { filter, sort, page, perpage }) {
      const data = {
        action: 'get/orders/seller',
        id: router.currentRoute._value.params.id,

        filter: filter,
        page: page,
        sort: sort,
        perpage: perpage,
      }
      const response = await api.wholesale.getOrders(data)
      if (response) {
        commit('SET_ORDERS', response.data)
      }
      return response
    },
    async getOrder({ commit }, { order_id }) {
      const data = {
        action: 'get/orders/seller',
        id: router.currentRoute._value.params.id,
        order_id: order_id,
      }
      const response = await api.wholesale.getOrders(data)
      if (response) {
        commit('SET_ORDER', response.data)
      }
      return response
    },
    async getVendors({ commit }, { filter, filtersdata }) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: router.currentRoute._value.params.type,
        get_type: 'vendors',
        filter: filter,
        filtersdata: filtersdata,
      }
      const response = await api.wholesale.getVendors(data)
      if (response) {
        commit('SET_VENDORS', response.data)
      }
      return response
    },
    unsetOrders({ commit }) {
      commit('UNSET_ORDERS')
    },
    unsetOrder({ commit }) {
      commit('UNSET_ORDER')
    },
    unsetVendors({ commit }) {
      commit('UNSET_VENDORS')
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
    SET_ORDER: (state, data) => {
      state.order = data.data.order
    },
    UNSET_ORDER: (state) => {
      state.order = {}
    },
    SET_VENDORS: (state, data) => {
      state.vendors = data.data
    },
    UNSET_VENDORS: (state) => {
      state.vendors = {}
    },
  },
  getters: {
    orders(state) {
      return state.orders
    },
    order(state) {
      return state.order
    },
    vendors(state) {
      return state.vendors
    },
  },
}
