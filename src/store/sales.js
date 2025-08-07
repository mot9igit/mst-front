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
    salesBanners: {}
  },
  actions: {
    async getSales({ commit }, { filter, filtersdata, page, sort, perpage, actionId, type, isAction }) {
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
        is_action: isAction ? true : false,
        extended_name: router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart'
      }
      const response = await api.sales.getSales(data)
      if (response) {
        if(actionId){
          commit('SET_SALE', response.data)
        }else{
          commit('SET_SALES', response.data)
        }

      }
      return response
    },
    async getSalesBanners({ commit }) {
      const data = {
        action: "get/banners",
			  id: router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? router.currentRoute._value.params.id_org_from : router.currentRoute._value.params.id
      }
      const response = await api.sales.getSales(data)
      if (response) {
        commit('SET_SALES_BANNERS', response.data)
      }
      return response
    },
    unsetSalesBanners({ commit }) {
      commit('UNSET_SALES_BANNERS')
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
    }
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
    }
  },
}
