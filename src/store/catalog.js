import api from '@/shared/api/api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    optProducts: [],
    optCatalog: [],
    optCatalogTree: [],
    optCatalogWarehouse: [],
  },
  actions: {
    async getOptCatalog({ commit }) {
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
        commit('SET_OPT_CATALOG', response.data)
      }
    },
    async getOptWarehouseCatalog({ commit }) {
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
        commit('SET_OPT_WAREHOUSE_CATALOG', response.data)
      }
    },
    async getOptProductsSearch(store, { page, perpage, search }) {
      let req = null
      if (router.currentRoute._value.params.req) {
        req = router.currentRoute._value.params.req
      }
      const data = {
        id:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id_org_from
            : router.currentRoute._value.params.id,
        id_org_from:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id
            : null,
        type: router.currentRoute._value.params.type,
        search: search,
        extended_name:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart',
        page: page,
        req: req,
        perpage: perpage,
        action: 'get/products',
      }
      const response = await api.catalog.getOptProducts(data)
      return response
    },
    async getOptProducts({ commit }, { filters, page, perpage, basket, search }) {
      let cat = 0
      if (
        router.currentRoute._value.params.warehouse_id &&
        !router.currentRoute._value.params.warehouse_cat_id
      ) {
        cat = 'all'
      }
      if (
        !router.currentRoute._value.params.warehouse_id &&
        !router.currentRoute._value.params.warehouse_cat_id
      ) {
        cat = router.currentRoute._value.params.category_id
      }
      let req = null
      if (router.currentRoute._value.params.requirement_id) {
        req = router.currentRoute._value.params.requirement_id
        cat = 'all'
      }
      const data = {
        id:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id_org_from
            : router.currentRoute._value.params.id,
        id_org_from:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id
            : null,
        type: router.currentRoute._value.params.type,
        filters: filters,
        category_id: cat,
        org_w_id: router.currentRoute._value.params.org_w_id,
        warehouse_id: router.currentRoute._value.params.warehouse_id,
        warehouse_cat_id: router.currentRoute._value.params.warehouse_cat_id,
        search: search,
        extended_name:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart',
        page: page,
        req: req,
        perpage: perpage,
        action: 'get/products',
        basket: basket,
      }
      const response = await api.catalog.getOptProducts(data)
      if (response) {
        commit('SET_OPT_PRODUCTS', response.data)
      }
      return response
    },
  },
  mutations: {
    SET_OPT_PRODUCTS: (state, data) => {
      state.optProducts = data.data
    },
    SET_OPT_CATALOG: (state, data) => {
      state.optCatalog = data.data
    },
    SET_OPT_CATALOG_TREE: (state, data) => {
      state.optCatalogTree = data.data
    },
    SET_OPT_WAREHOUSE_CATALOG: (state, data) => {
      state.optCatalogWarehouse = data.data
    },
  },
  getters: {
    optCatalog(state) {
      return state.optCatalog
    },
    optCatalogTree(state) {
      return state.optCatalogTree
    },
    optCatalogWarehouse(state) {
      return state.optCatalogWarehouse
    },
    optProducts(state) {
      return state.optProducts
    },
  },
}
