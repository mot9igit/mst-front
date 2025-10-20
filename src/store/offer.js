import api from '@/shared/api/api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    fromOrgStores: [],
    orgBasketOfferStore: 0,
    basketOffer: {},
    vendorOffer: {},
  },
  actions: {
    async getFromOrgStores({ commit }) {
      const data = {
        action: 'get/stores/offer',
        id_org_from: router.currentRoute._value.params.id_org_from,
      }
      const response = await api.offer.getFromOrgStores(data)
      if (response) {
        commit('SET_FROM_ORG_STORES', response.data)
      }
      return response
    },
    async getOrgBasketOfferStore({ commit }, { active_store } ) {
      const data = {
        action: 'get/warehouse/basket/offer',
        id_org_from: router.currentRoute._value.params.id_org_from,
        active_store: active_store,
      }
      const response = await api.offer.getOrgBasketOfferStore(data)
      if (response) {
        commit('SET_ORG_BASKET_OFFER_STORE', response.data)
      }
      return response
    },
    async getBasketOffer({ commit }) {
      const data = {
        action: 'basket/get',
        extended_name:'offer',
        id: router.currentRoute._value.params.id_org_from
      }
      const response = await api.basket.getBasket(data)
      if (response) {
        commit('SET_BASKET_OFFER', response.data)
      }
      return response
    },
    async basketOfferClear(store, { org_id }) {
      const data = {
        action: 'basket/clear',
        extended_name: 'offer',
        id:  router.currentRoute._value.params.id_org_from,
        org_id: org_id,
      }
      const response = await api.basket.basketClear(data)
      return response
    },
    async basketOfferProductRemove(store, { org_id, store_id, key, product }) {
      const data = {
        action: 'basket/remove',
        extended_name: 'offer',
        id: router.currentRoute._value.params.id_org_from,
        org_id: org_id,
        store_id: store_id,
        key: key,
        product: product,
      }
      const response = await api.basket.basketProductRemove(data)
      return response
    },
    async basketOfferProductAdd(store, { org_id, store_id, id_remain, count, actions }) {
      const data = {
        action: 'basket/add',
        extended_name: 'offer',
        id: router.currentRoute._value.params.id_org_from,
        org_id: org_id,
        store_id: store_id,
        id_remain: id_remain,
        count: count,
        actions: actions,
      }
      const response = await api.basket.basketProductAdd(data)
      return response
    },
    async basketOfferProductUpdate(store, { org_id, store_id, key, id_remain, count, actions }) {
      const data = {
        action: 'basket/update',
        extended_name: 'offer',
        id: router.currentRoute._value.params.id_org_from,
        org_id: org_id,
        store_id: store_id,
        id_remain: id_remain,
        count: count,
        key: key,
        actions: actions,
      }
      const response = await api.basket.basketProductUpdate(data)
      return response
    },
    async getOptVendorOffer({ commit }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'get/offer/vendor',
        extended_name: 'offer',
      }
      const response = await api.offer.getOptVendorOffer(data)
      if (response) {
        commit('SET_OPT_VENDOR_OFFER', response.data)
      }
      return response
    },


  },
  mutations: {
    SET_FROM_ORG_STORES: (state, data) => {
      state.fromOrgStores = data.data
    },
    SET_ORG_BASKET_OFFER_STORE: (state, data) => {
      state.orgBasketOfferStore = data.data
    },
    SET_BASKET_OFFER: (state, data) => {
      state.basketOffer = data.data.data
    },
    SET_OPT_VENDOR_OFFER: (state, data) => {
      state.vendorOffer = data.data
    },

  },
  getters: {
    fromOrgStores(state) {
      return state.fromOrgStores
    },
    basketOfferWarehouse(state) {
      return state.orgBasketOfferStore
    },
    basketOffer(state) {
      return state.basketOffer
    },
    vendorOffer(state) {
      return state.vendorOffer
    },

  },
}
