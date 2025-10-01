import api from '@/shared/api/api'
import router from '../router'

export default {
  namespaced: true,
  state: {
    opts: {
      items: [],
      total: -1,
    },
    optorders: {
      orders: {},
      total: -1,
    },
    optorder: {},
    ordercalc: {},
  },
  actions: {
    async getOptOrders({ commit }, { sort, filter, filtersdata, page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'get/orders/buyer',
        sort: sort,
        filter: filter,
        filtersdata: filtersdata,
        page: page,
        perpage: perpage,
      }
      const response = await api.purchases.getOptOrders(data)
      if (response) {
        commit('SET_OPT_ORDERS', response.data)
      }
      return response
    },
    async getOptOrder({ commit }, { order_id }) {
      const data = {
        action: 'get/orders/buyer',
        id: router.currentRoute._value.params.id,
        order_id: order_id,
      }
      const response = await api.purchases.getOptOrder(data)
      if (response) {
        commit('SET_OPT_ORDER', response.data)
      }
      return response
    },
    async canselOptOrder(store, { order_id }) {
      const data = {
        action: 'order/opt/cancel',
        order_id: order_id,
      }
      const response = await api.purchases.canselOptOrder(data)
      return response
    },
    async getOpts({ commit }, { filter, filtersdata, page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: 'opts',
        filter: filter,
        filtersdata: filtersdata,
        page: page,
        perpage: perpage,
      }
      const response = await api.purchases.getOpts(data)
      if (response) {
        commit('SET_OPTS', response.data)
      }
      return response
    },
    async toggleOpts(store, { id, action }) {
      const data = {
        id: id,
        action: action,
        store: router.currentRoute._value.params.id,
        type: 'toggleOpts',
      }
      const response = await api.purchases.toggleOpts(data)
      return response
    },
    async setNewOrgProfile(store, { code }) {
      const data = {
        action: 'add/code/warehouse',
        id: router.currentRoute._value.params.id,
        code: code,
      }
      const response = await api.purchases.setNewOrgProfile(data)

      return response
    },
    async getOrderCalc({ commit }, { orderEdit }) {
      const data = {
        id: router.currentRoute._value.params.order_id,
        action: 'order/calc',
        orderEdit: orderEdit
      }
      const response = await api.purchases.getOrderCalc(data)
      if (response) {
        commit('SET_ORDER_CALC', response.data)
      }
      return response
    },
    unsetOpts({ commit }) {
      commit('UNSET_OPTS')
    },
    unsetOptOrders({ commit }) {
      commit('UNSET_OPT_ORDERS')
    },
    unsetOptOrder({ commit }) {
      commit('UNSET_OPT_ORDER')
    },
  },
  mutations: {
    SET_OPTS: (state, data) => {
      state.opts = data.data
    },
    UNSET_OPTS: (state) => {
      state.opts = {
        items: [],
        total: -1,
      }
    },
    SET_OPT_ORDERS: (state, data) => {
      state.optorders = data.data
    },
    UNSET_OPT_ORDERS: (state) => {
      state.optorders = {}
    },
    SET_OPT_ORDER: (state, data) => {
      state.optorder = data.data.order
    },
    UNSET_OPT_ORDER: (state) => {
      state.optorder = {}
    },
    SET_ORDER_CALC: (state, data) => {
      state.ordercalc = data.data
    },
  },
  getters: {
    opts(state) {
      return state.opts
    },
    optorders(state) {
      return state.optorders
    },
    optorder(state) {
      return state.optorder
    },
    ordercalc(state) {
      return state.ordercalc
    }
  },
}
