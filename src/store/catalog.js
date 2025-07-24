import api from '@/shared/api/api'
import router from '@/router'

export default {
  state: {
    optcatalog: [],
    optcatalogtree: [],
    optcatalogwarehouse: [],
  },
  actions: {
    async get_opt_catalog_from_api({ commit }) {
      const data = {
        id:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id_org_from
            : router.currentRoute._value.params.id,
        //warehouse_id: router.currentRoute._value.params.warehouse_id,
        action: 'get/catalog',
      }
      const response = await api.catalog.getCatalog(data)
      if (response) {
        commit('SET_OPT_CATALOG_TO_VUEX', response.data)
      }
    },
    async get_opt_warehouse_catalog_from_api({ commit }) {
      const data = {
        id:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id_org_from
            : router.currentRoute._value.params.id,
        //warehouse_id: router.currentRoute._value.params.warehouse_id,
        warehouse: true,
        action: 'get/catalog',
        id_org_from:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id
            : null,
        extended_name:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart',
      }
      const response = await api.catalog.getCatalog(data)
      if (response) {
        commit('SET_OPT_WAREHOUSE_CATALOG_TO_VUEX', response.data)
      }
    },
  },
  mutations: {
    SET_OPT_CATALOG_TO_VUEX: (state, data) => {
      state.optcatalog = data.data
    },
    SET_OPT_CATALOG_TREE_TO_VUEX: (state, data) => {
      state.optcatalogtree = data.data
    },
    SET_OPT_WAREHOUSE_CATALOG_TO_VUEX: (state, data) => {
      state.optcatalogwarehouse = data.data
    },
  },
  getters: {
    optcatalog(state) {
      return state.optcatalog
    },
    optcatalogtree(state) {
      return state.optcatalogtree
    },
    optcatalogwarehouse(state) {
      return state.optcatalogwarehouse
    },
  },
}
