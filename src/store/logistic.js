import api from '@/shared/api/api'
import router from '../router'

function normalizePostOrderStatus(item) {
  const status =
    item?.status && typeof item.status === 'object'
      ? item.status
      : item?.order_status && typeof item.order_status === 'object'
        ? item.order_status
        : null
  if (!status) return item
  return {
    ...item,
    status_name: item.status_name || status.name || '',
    status_key: item.status_key || status.api_key || '',
    status_color:
      item.status_color || (status.color ? String(status.color).replace('#', '') : ''),
    color_text: item.color_text || status.color_text || status.status_color_text || '',
  }
}

export default {
  namespaced: true,
  state: {
    orders: {
      orders: [],
      total: -1,
    },
    order: {},
    nearStores: {},
    postOrders: {},
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
    async getPostOrders({ commit }, { filter, sort, page, perpage, filtersdata } = {}) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'get/post/orders',
        filter: filter,
        sort: sort,
        page: page,
        perpage: perpage,
        filtersdata: filtersdata,
      }
      const response = await api.logistics.getPostOrders(data)
      if (response && response !== 'technical error') {
        commit('SET_POST_ORDERS', response.data.data)
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
    async getNearStores({ commit }) {
      const data = {
        action: 'get/near/stores',
        id: router.currentRoute._value.params.id,
        store_id: router.currentRoute._value.params.store_id,
      }
      const response = await api.logistics.getOrders(data)
      if (response) {
        commit('SET_NEAR_STORES', response.data)
      }
      return response
    },
    async saveHub(store, { hub_id }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'save/hub',
        hub_id: hub_id,
        store_id: router.currentRoute._value.params.store_id,
      }
      const response = await api.logistics.acceptCode(data)
      return response
    },
    async createShippingCity(store, { form }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'create/shipping/city',
        form: form,
      }
      const response = await api.logistics.saveShippingCity(data)
      return response
    },
    async setCityActive(store, { city_id }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'set/city/active',
        city_id: city_id,
      }
      const response = await api.logistics.saveShippingCity(data)
      return response
    },
    async deleteLogisticCity(store, { city_id }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'delete/logistic/city',
        city_id: city_id,
      }
      const response = await api.logistics.saveShippingCity(data)
      return response
    },
    unsetPostOrders({ commit }) {
      commit('UNSET_POST_ORDERS')
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
    SET_POST_ORDERS: (state, data) => {
      const postOrders = data?.data
      if (!postOrders || typeof postOrders !== 'object') {
        state.postOrders = postOrders || {}
        return
      }
      if (Array.isArray(postOrders.orders)) {
        postOrders.orders = postOrders.orders.map(normalizePostOrderStatus)
      }
      if (Array.isArray(postOrders.items)) {
        postOrders.items = postOrders.items.map(normalizePostOrderStatus)
      }
      state.postOrders = postOrders
    },
    UNSET_POST_ORDERS: (state) => {
      state.postOrders = {}
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
    SET_NEAR_STORES: (state, data) => {
      state.nearStores = data.data
    },
  },
  getters: {
    orders(state) {
      return state.orders
    },
    postOrders(state) {
      return state.postOrders
    },
    order(state) {
      return state.order
    },
    nearStores(state) {
      return state.nearStores
    },
  },
}
