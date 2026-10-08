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
  },
  actions: {
    async getOrders({ commit }, { filter, sort, page, perpage, filtersdata } = {}) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'get/logistic/orders',
        filter: filter,
        sort: sort,
        page: page,
        perpage: perpage,
        filtersdata: filtersdata,
      }
      const response = await api.logistics.getOrders(data)
      if (response) {
        commit('SET_ORDERS', response.data.data)
      }
      return response
    },
    async getOrder({ commit }, { order_id }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'get/logistic/orders',
        order_id: order_id,
      }
      const response = await api.logistics.getOrders(data)
      if (response) {
        commit('SET_ORDER', response.data)
      }
      return response
    },
    async acceptCode(store, { order_id, code }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'order/accept_code',
        order_id: order_id,
        code: code,
      }
      const response = await api.logistics.acceptCode(data)
      return response
    },
    unsetOrders({ commit }) {
      commit('UNSET_ORDERS')
    },
    unsetOrder({ commit }) {
      commit('UNSET_ORDER')
    },
  },
  mutations: {
    SET_ORDERS: (state, data) => {
      state.orders = data.data
      if (state.orders?.items) {
        state.orders.items = state.orders.items.map((item) => ({
          ...item,
          status_name: item.status?.name,
          status_color: item.status?.color ? String(item.status.color).replace('#', '') : '',
          status_key: item.status?.api_key,
          color_text: item.status?.color_text,
        }))
      }
    },
    UNSET_ORDERS: (state) => {
      state.orders = {
        orders: [],
        total: -1,
      }
    },
    SET_ORDER: (state, data) => {
      if (data?.data?.data?.items?.[0]) {
        state.order = data.data.data.items[0]
      } else {
        state.order = data.data ?? {}
      }
      if (state.order?.status && typeof state.order.status === 'object') {
        state.order.status_name = state.order.status.name
        state.order.status_color = state.order.status.color
          ? String(state.order.status.color).replace('#', '')
          : ''
        state.order.status_key = state.order.status.api_key
        state.order.color_text = state.order.status.color_text
      }
    },
    UNSET_ORDER: (state) => {
      state.order = {}
    },
  },
  getters: {
    orders(state) {
      return state.orders
    },
    order(state) {
      return state.order
    },
  },
}
