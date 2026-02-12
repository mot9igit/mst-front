import api from '@/shared/api/api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    fromOrgStores: [],
    orgBasketOfferStore: 0,
    basketOffer: {},
    vendorOfferAvailable: {},
    vendorOfferSelected: {},
    optOfferProducts: {},
    optOfferCatalog: {},
    optOfferWarehouseCatalog: {},
    cartCleaner: [],
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
    async getOrgBasketOfferStore({ commit }, { active_store }) {
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
        extended_name: 'offer',
        id: router.currentRoute._value.params.id_org_from,
      }
      const response = await api.basket.getBasket(data)
      if (response) {
        commit('SET_BASKET_OFFER', response.data)
      }
      return response
    },
    async basketOfferClear(store, { org_id, store_id }) {
      const data = {
        action: 'basket/clear',
        extended_name: 'offer',
        id: router.currentRoute._value.params.id_org_from,
        org_id: org_id,
        store_id: store_id,
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
        id_org_from: router.currentRoute._value.params.id_org_from,
        action: 'get/offer/vendor',
        extended_name: 'offer',
        type: 0,
      }
      const response = await api.offer.getOptVendorOffer(data)
      if (response) {
        commit('SET_OPT_VENDOR_OFFER', response.data)
      }
      return response
    },
    async getOptVendorsOfferSelected({ commit }, { filter }) {
      const data = {
        id: router.currentRoute._value.params.id,
        id_org_from: router.currentRoute._value.params.id_org_from,
        action: 'get/offer/vendor',
        extended_name: 'offer',
        type: 1,
        filter: filter,
      }
      const response = await api.offer.getOptVendorOffer(data)
      if (response) {
        commit('SET_OPT_VENDOR_SELECTED_OFFER', response.data)
      }
      return response
    },
    async toggleVendorStores(store, { active, org_id, store_id }) {
      const data = {
        action: 'toggle/vendors/stores',
        active: active,
        extended_name: 'offer',
        id: router.currentRoute._value.params.id_org_from,
        org_id: org_id,
        store_id: store_id,
      }
      const response = await api.org.toggleVendorStores(data)
      return response
    },
    async toggleOpts(store, { action, id }) {
      const data = {
        type: 'toggleOptsVisible',
        id: id,
        action: action,
        extended_name: 'offer',
        store: router.currentRoute._value.params.id_org_from,
      }
      const response = await api.org.toggleOpts(data)
      return response
    },
    async toggleOptsVisible(store, sendData) {
      const data = {
        action: 'get/vendors',
        extended_name: 'offer',
        store: router.currentRoute._value.params.id_org_from,
      }
      if (Object.prototype.hasOwnProperty.call(sendData, 'id')) {
        data.id = sendData.id
      }
      if (Object.prototype.hasOwnProperty.call(sendData, 'action')) {
        data.action = sendData.action
      }
      if (Object.prototype.hasOwnProperty.call(sendData, 'filter')) {
        data.filter = sendData.filter
      }
      await api.org.toggleOptsVisible(data)
    },
    async getOfferOptCatalog({ commit }) {
      const data = {
        id: router.currentRoute._value.params.id_org_from,
        id_org_from: router.currentRoute._value.params.id,
        action: 'get/catalog',
      }
      const response = await api.catalog.getCatalog(data)
      if (response) {
        commit('SET_OPT_OFFER_CATALOG', response.data)
      }
    },
    async getOfferOptWarehouseCatalog({ commit }) {
      const data = {
        id: router.currentRoute._value.params.id_org_from,
        warehouse: true,
        action: 'get/catalog',
        id_org_from: router.currentRoute._value.params.id,
        extended_name: 'offer',
      }
      const response = await api.catalog.getCatalog(data)
      if (response) {
        commit('SET_OPT_OFFER_WAREHOUSE_CATALOG', response.data)
      }
    },

    async getOfferOptProductsSearch(store, { page, perpage, search }) {
      let req = null
      if (router.currentRoute._value.params.req) {
        req = router.currentRoute._value.params.req
      }
      const data = {
        id: router.currentRoute._value.params.id_org_from,
        id_org_from: router.currentRoute._value.params.id,
        type: router.currentRoute._value.params.type,
        search: search,
        extended_name: 'offer',
        page: page,
        req: req,
        perpage: perpage,
        action: 'get/products/all_sales',
      }
      const response = await api.catalog.getOptProducts(data)
      return response
    },
    async getOfferOptProducts({ commit }, { filters, page, perpage, basket, search }) {
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
        id: router.currentRoute._value.params.id_org_from,
        id_org_from: router.currentRoute._value.params.id,
        type: router.currentRoute._value.params.type,
        filters: filters,
        category_id: cat,
        org_w_id: router.currentRoute._value.params.org_w_id,
        warehouse_id: router.currentRoute._value.params.warehouse_id,
        warehouse_cat_id: router.currentRoute._value.params.warehouse_cat_id,
        search: search,
        extended_name: 'offer',
        page: page,
        req: req,
        perpage: perpage,
        action: 'get/products/all_sales',
        basket: basket,
      }
      const response = await api.catalog.getOptProducts(data)
      if (response) {
        commit('SET_OFFER_OPT_PRODUCTS', response.data)
      }
      return response
    },
    async offerSubmit(store, { date_end }) {
      const data = {
        action: 'create/offer',
        id: router.currentRoute._value.params.id,
        id_org_from: router.currentRoute._value.params.id_org_from,
        date_end: date_end,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }
      const response = await api.offer.offerSubmit(data)
      return response
    },
    async createOfferExtended(store, { id }) {
      const data = {
        action: 'create/offer/extended',
        id_org_from: router.currentRoute._value.params.id,
        id: id,
        extended_name: 'offer',
      }
      const response = await api.offer.offerSubmit(data)
      return response
    },
    async acceptOfferReview({ commit }, { offer_id, store_id }) {
      const data = {
        action: 'offer/accept/review',
        id: router.currentRoute._value.params.id,
        offer_id: offer_id,
        store_id: store_id,
      }
      const response = await api.offer.getOffers(data)
      if (response) {
        commit('SET_OFFER_REVIEW', response.data)
      }
      return response
    },
    async setOfferBasketComment(store, { store_id, org_id, org_store, comment, set }) {
      const data = {
        action: 'basket/set/comment',
        id: router.currentRoute._value.params.id,
        store_id: store_id,
        org_id: org_id,
        org_store: org_store,
        comment: comment,
        set: set,
        extended_name: 'offer',
      }
      const response = api.offer.getOffers(data)
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
      state.vendorOfferAvailable = data.data
    },
    SET_OPT_VENDOR_SELECTED_OFFER: (state, data) => {
      state.vendorOfferSelected = data.data
    },
    SET_OFFER_OPT_PRODUCTS: (state, data) => {
      state.optOfferProducts = data.data
    },
    SET_OPT_OFFER_CATALOG: (state, data) => {
      state.optOfferCatalog = data.data
    },
    SET_OPT_OFFER_WAREHOUSE_CATALOG: (state, data) => {
      state.optOfferWarehouseCatalog = data.data
    },
    SET_OFFER_REVIEW: (state, data) => {
      state.cartCleaner = data.data
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
    vendorOfferAvailable(state) {
      return state.vendorOfferAvailable
    },
    vendorOfferSelected(state) {
      return state.vendorOfferSelected
    },
    optOfferProducts(state) {
      return state.optOfferProducts
    },
    optOfferCatalog(state) {
      return state.optOfferCatalog
    },
    optOfferWarehouseCatalog(state) {
      return state.optOfferWarehouseCatalog
    },
    cartCleaner(state) {
      return state.cartCleaner
    },
  },
}
