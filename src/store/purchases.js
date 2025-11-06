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
    offers: {},
    offer: {},
    offerStatuses: {},
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
    async setOrderEdit(store, { orderEdit }) {
      const data = {
        action: 'order/edit',
        orderEdit: orderEdit,
      }
      const response = await api.purchases.setOrderEdit(data)

      return response
    },
    async setOrderEditToCart(store, { store_id, seller_id, seller_store_id }) {
      const data = {
        action: 'order/edit/basket',
        id: router.currentRoute._value.params.id,
        order_id: router.currentRoute._value.params.order_id,
        store_id: store_id,
        seller_id: seller_id,
        seller_store_id: seller_store_id,

      }
      const response = await api.purchases.setOrderEdit(data)

      return response
    },
    async repeatOrder(store, data) {
          const sendData = {
            action: 'set/order/repeat',
            id: router.currentRoute._value.params.id,
            data: data,
          }
          const response = await api.purchases.repeatOrder(sendData)
          return response
    },
    async setStatusAccept(store, { order_id }) {
      const senddata = {
        action: 'status/edit',
        order_id: order_id,
      }
      const response = await api.purchases.setStatusAccept(senddata)

      return response
    },
    async getOffers({ commit }, { filter, sort, page, perpage, filterstatus }) {
      const data = {
        action: 'get/offers/my',
        id: router.currentRoute._value.params.id,
        filter: filter,
        filterstatus: filterstatus,
        page: page,
        sort: sort,
        perpage: perpage,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }
      const response = await api.offer.getOffers(data)
      if (response) {
        commit('SET_OFFERS', response.data)
      }
      return response
    },
    async getOffer({ commit }, { offer_id }) {
      const data = {
        action: 'get/offers/my',
        id: router.currentRoute._value.params.id,
        offer_id: offer_id,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }
      const response = await api.offer.getOffers(data)
      if (response) {
        commit('SET_OFFER', response.data)
      }
      return response
    },
    async acceptOffer(store, { offer_id }) {
      const data = {
        action: 'offer/accept/setorder',
        id: router.currentRoute._value.params.id,
        offer_id: offer_id,
      }
      const response = await api.offer.getOffers(data)

      return response
    },
    async cancelOffer(store, { offer_id }) {
      const data = {
        action: 'offer/cancel',
        offer_id: offer_id,
      }
      const response = await api.offer.getOffers(data)

      return response
    },
    async getOffersStatuses({ commit }) {
      const data = {
        action: 'get/offer/statuses',
        id: router.currentRoute._value.params.id,
      }
      const response = await api.offer.getOffers(data)
      if (response) {
        commit('SET_OFFERS_STATUSES', response.data)
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
    unsetOffers({ commit }) {
      commit('UNSET_OFFERS')
    },
    unsetOffer({ commit }) {
      commit('UNSET_OFFER')
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
    SET_OFFERS: (state, data) => {
      state.offers = data.data
    },
    SET_OFFER: (state, data) => {
      state.offer = data.data
    },
    UNSET_OFFERS: (state) => {
      state.offers = {}
    },
    UNSET_OFFER: (state) => {
      state.offer = {}
    },
    SET_OFFERS_STATUSES: (state, data) => {
      state.offerStatuses = data.data
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
    },
    offers(state) {
      return state.offers
    },
    offer(state) {
      return state.offer
    },
    offerStatuses(state) {
      return state.offerStatuses
    },
  },
}
