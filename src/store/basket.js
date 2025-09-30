import api from '@/shared/api/api'
import router from '@/router'

export default {
  namespaced: true,
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
    async basketClear(store, { org_id }) {
      const data = {
        action: 'basket/clear',
        extended_name:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart',
        id:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id_org_from
            : router.currentRoute._value.params.id,
        org_id: org_id,
      }
      const response = await api.basket.basketClear(data)
      return response
    },
    async basketProductRemove(store, { org_id, store_id, key, product }) {
      const data = {
        action: 'basket/remove',
        extended_name:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart',
        id:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id_org_from
            : router.currentRoute._value.params.id,
        org_id: org_id,
        store_id: store_id,
        key: key,
        product: product,
      }
      const response = await api.basket.basketProductRemove(data)
      return response
    },
    async basketProductAdd(store, { org_id, store_id, id_remain, count, actions }) {
      const data = {
        action: 'basket/add',
        extended_name:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart',
        id:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id_org_from
            : router.currentRoute._value.params.id,

        org_id: org_id,
        store_id: store_id,
        id_remain: id_remain,
        count: count,
        actions: actions,
      }
      const response = await api.basket.basketProductAdd(data)
      return response
    },
    async basketProductUpdate(store, { org_id, store_id, key, id_remain, count, actions }) {
      const data = {
        action: 'basket/update',
        extended_name:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart',
        id:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id_org_from
            : router.currentRoute._value.params.id,
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
    async orderSubmit(store, { orgId }) {
      const data = {
        action: 'order/opt/submit',
        id: router.currentRoute._value.params.id,
        org_id: orgId,
      }
      const response = await api.basket.orderSubmit(data)
      return response
    },
  },
  mutations: {
    SET_BASKET: (state, data) => {
      state.basket = data.data.data
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
