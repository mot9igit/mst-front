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
        action: 'get/offer/basket',
        extended_name:'offer',
        id: router.currentRoute._value.params.id_org_from
      }
      const response = await api.offer.getBasketOffer(data)
      if (response) {
        commit('SET_BASKET_OFFER', response.data)
      }
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
      state.basketOffer = data.data
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
