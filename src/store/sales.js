import api from '@/shared/api/api'
import router from '../router'

export default {
  namespaced: true,
  state: {
    sales: {
      items: [],
      total: -1,
    },
    sale: {},
    salesBanners: {},
    salesProducts: {
      items: [],
      total: -1,
    },
  },
  actions: {
    async getSales(
      { commit },
      { filter, filtersdata, page, sort, perpage, actionId, type, isAction },
    ) {
      const data = {
        id: router.currentRoute._value.params.id,
        filter: filter,
        filtersdata: filtersdata,
        sort: sort,
        page: page,
        perpage: perpage,
        action: 'get',
        action_id: actionId,
        type: type,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        offset: new Date().getTimezoneOffset(),
        is_action: isAction ? true : false,
        extended_name:
          router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer'
            ? 'offer'
            : 'cart',
      }
      const response = await api.sales.getSales(data)
      if (response) {
        if (actionId) {
          commit('SET_SALE', response.data)
        } else {
          commit('SET_SALES', response.data)
        }
      }
      return response
    },
    async getSalesBanners({ commit }) {
      const data = {
        action: 'get/banners',
        id:
          router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer'
            ? router.currentRoute._value.params.id_org_from
            : router.currentRoute._value.params.id,
      }
      const response = await api.sales.getSales(data)
      if (response) {
        commit('SET_SALES_BANNERS', response.data)
      }
      return response
    },
    async getSalesProducts({ commit }, { actionId, page, perpage, view }) {
      const data = {
        action: 'get/products',
        action_id: actionId,
        page: page,
        perpage: perpage,
        id: router.currentRoute._value.params.id,
        view: view,
      }
      const response = await api.sales.getSalesProducts(data)
      if (response) {
        commit('SET_SALES_PRODUCTS', response.data)
      }
      return response
    },
    unsetSalesBanners({ commit }) {
      commit('UNSET_SALES_BANNERS')
    },
    unsetSalesProducts({ commit }) {
      commit('UNSET_SALES_PRODUCTS')
    },
    unsetSales({ commit }) {
      commit('UNSET_SALES')
    },
    unsetSale({ commit }) {
      commit('UNSET_SALE')
    },
  },

  mutations: {
    SET_SALES: (state, data) => {
      state.sales = data.data
    },
    UNSET_SALES: (state) => {
      state.sales = {
        items: [],
        total: -1,
      }
    },
    SET_SALE: (state, data) => {
      state.sale = data.data
    },
    UNSET_SALE: (state) => {
      state.sale = {}
    },
    SET_SALES_BANNERS: (state, data) => {
      state.salesBanners = data.data
    },
    UNSET_SALES_BANNERS: (state) => {
      state.salesBanners = {}
    },
    SET_SALES_PRODUCTS: (state, data) => {
      state.salesProducts = data.data
    },
    UNSET_SALES_PRODUCTS: (state) => {
      state.salesProducts = {
        items: [],
        total: -1,
      }
    },
  },
  getters: {
    sales(state) {
      return state.sales
    },
    sale(state) {
      return state.sale
    },
    salesBanners(state) {
      return state.salesBanners
    },
    salesProducts(state) {
      return state.salesProducts
    },
  },
}
