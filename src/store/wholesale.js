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
    dilers: {},
    managers: {},
    stores: {},
    virtOrg: {},
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
    async getDilers({ commit }, { filter, filtersdata, page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        filter: filter,
        filtersdata: filtersdata,
        page: page,
        perpage: perpage,
      }
      const response = await api.wholesale.getDilers(data)
      if (response) {
        commit('SET_DILERS', response.data)
      }
      return response
    },
    async getManagers({ commit }, { value }) {
      const data = {
        action: 'get/org/managers',
        id: router.currentRoute._value.params.id,
        value: value,
      }
      const response = await api.wholesale.getManagers(data)
      if (response) {
        commit('SET_MANAGERS', response.data)
      }
      return response
    },
    async getStores({ commit }, { value }) {
      const data = {
        action: 'get/stores',
        id: router.currentRoute._value.params.id,
        value: value,
      }
      const response = await api.wholesale.getStores(data)
      if (response) {
        commit('SET_STORES', response.data)
      }
      return response
    },
    async orgVirtualProfile({ commit }, { client_id }) {
      const data = {
        action: 'get/org/profile',
        owner_id: router.currentRoute._value.params.id,
        id: client_id,
      }
      const response = await api.wholesale.orgVirtualProfile(data)
      if (response) {
        commit('SET_VIRT_ORG', response.data)
      }
      return response
    },
    async deleteOrgProfile(store, { client_id }) {
      const data = {
        action: 'delete/org/virtual_profile',
        id: router.currentRoute._value.params.id,
        client_id: client_id,
      }
      const response = await api.wholesale.deleteOrgProfile(data)

      return response
    },
    unsetOrders({ commit }) {
      commit('UNSET_ORDERS')
    },
    unsetOrder({ commit }) {
      commit('UNSET_ORDER')
    },
    unsetDilers({ commit }) {
      commit('UNSET_DILERS')
    },
    unsetVirtualProfile({ commit }) {
      commit('UNSET_VIRT_ORG')
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
    SET_DILERS: (state, data) => {
      state.dilers = data.data
    },
    UNSET_DILERS: (state) => {
      state.dilers = {}
    },
    SET_MANAGERS: (state, data) => {
      state.managers = data.data
    },
    SET_STORES: (state, data) => {
      state.stores = data.data
    },
    SET_VIRT_ORG: (state, data) => {
      state.virtOrg = data.data
    },
    UNSET_VIRT_ORG: (state) => {
      state.virtOrg = {}
    },
  },
  getters: {
    orders(state) {
      return state.orders
    },
    order(state) {
      return state.order
    },
    dilers(state) {
      return state.dilers
    },
    managers(state) {
      return state.managers
    },
    stores(state) {
      return state.stores
    },
    virtOrg(state) {
      return state.virtOrg
    },
  },
}
