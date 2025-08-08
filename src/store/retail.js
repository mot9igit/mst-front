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
    balance: {},
    balance_request: {},
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
    async getOrder({ commit }, { order_id }) {
      const data = {
        id: router.currentRoute._value.params.id,
        order_id: order_id,
      }
      const response = await api.retail.getOrders(data)
      if (response) {
        commit('SET_ORDER', response.data)
      }
      return response
    },
    async getBalance({ commit }, { page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: 'balance',
        page: page,
        perpage: perpage,
      }
      const response = await api.retail.getBalance(data)
      if (response) {
        commit('SET_BALANCE', response.data)
      }
      return response
    },
    async getBalanceRequest({ commit }, { page, perpage }) {
      const data = {

        id: router.currentRoute._value.params.id,
        type: 'balance_requests',
        page: page,
        perpage: perpage,
      }
      const response = await api.retail.getBalanceRequest(data)
      if (response) {
        commit('SET_BALANCE_REQUEST', response.data)
      }
      return response
    },
    async setBalanceRequest({ commit }, {value}) {
      const data = {

        id: router.currentRoute._value.params.id,
        action: "set",
        type: "balance_request",
        value: value,
      }
      const response = await api.retail.setBalanceRequest(data)

      return response
    },
    async getSales({ commit }, { filter, filtersdata, page, sort, perpage, actionid, type, isAction }) {
      const data = {
        id: router.currentRoute._value.params.id,
        filter: filter,
        filtersdata: filtersdata,
        sort: sort,
        page: page,
        perpage: perpage,
        action: 'get',
        action_id: actionid,
        type: 2,
        is_action: isAction ? true : false,
        extended_name: router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart'
      }
      const response = await api.retail.getSales(data)
      if (response) {
        commit('SET_SALES', response.data)
      }
      return response
    },
    unsetOrders({ commit }) {
      commit('UNSET_ORDERS')
    },
    unsetOrder({ commit }) {
      commit('UNSET_ORDER')
    },
    unsetSales({ commit }) {
      commit('UNSET_SALES')
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
      state.order = data.data
    },
    UNSET_ORDER: (state) => {
      state.order = {}
    },
    SET_BALANCE: (state, data) => {
      state.balance = data.data
    },
    SET_BALANCE_REQUEST: (state, data) => {
      state.balance_request = data.data
    },
    SET_SALES: (state, data) => {
      state.sales = data.data
    },
    UNSET_SALES: (state) => {
      state.sales = {}
    },

  },
  getters: {
    orders(state) {
      return state.orders
    },
    order(state) {
      return state.order
    },
    balance(state) {
      return state.balance
    },
    balance_request(state) {
      return state.balance_request
    },
    sales(state) {
      return state.sales
    },

  },
}
