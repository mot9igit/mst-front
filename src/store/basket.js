import api from '@/shared/api/api'
import router from '@/router'

export default {
  state: {
    basket: {},
    orgBasketStore: 0,
  },
  actions: {
    async getBasket({ commit }) {
      const data = {
        action: 'basket/get',
        extended_name:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart',
        id:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id_org_from
            : router.currentRoute._value.params.id,
      }
      const response = await api.basket.getBasket(data)
      if (response) {
        commit('SET_BASKET', response.data)
      }
      return response
    },
    async setOrgBasketStore({ commit }, id) {
      const data = {
        action: 'set/active/basket/warehouse',
        id: router.currentRoute._value.params.id,
        id_warehouse: id,
      }
      const response = await api.basket.setOrgBasketStore(data)
      if (response) {
        commit('SET_ORG_BASKET_STORE', response.data)
      }
      return response
    },
    async getOrgBasketStore({ commit }) {
      const data = {
        action: 'get/active/basket/warehouse',
        id:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id_org_from
            : router.currentRoute._value.params.id,
      }
      const response = await api.basket.getBasket(data)
      if (response) {
        commit('SET_ORG_BASKET_STORE', response.data)
      }
      return response
    },
  },
  mutations: {
    SET_BASKET: (state, data) => {
      state.orgs = data.data
    },
    SET_ORG_BASKET_STORE: (state, data) => {
      state.orgBasketStore = data.data
    },
  },
  getters: {
    basket(state) {
      return state.basket
    },
    basketWarehouse(state) {
      return state.orgBasketStore
    },
  },
}
