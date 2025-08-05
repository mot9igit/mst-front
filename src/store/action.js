import api from '@/shared/api/api'
import router from '../router'

export default {
  namespaced: true,
  state: {
    action: {},
    actionAdvPlaces: [],
    productsAvailable: [],
    productsSelected: [],
    complectsAvailable: [],
    complectsSelected: [],
    productGroups: [],
    activeActions: [],
    productsPrices: [],
    groupProducts: []
  },
  actions: {
    // Берем акцию ID из URL
    async getAction({ commit }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action_id: router.currentRoute._value.params.action,
        extended_name: router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart'
      }
      const response = await api.action.getAction(data)
      if (response) {
        commit('SET_ACTION', response.data)
      }
      return response
    },
    // Чистим данные
    async unsetAction({ commit }){
      const data = {
        id: router.currentRoute._value.params.id,
        action: "unset/data"
      }
      const response = await api.action.unsetAction(data)
      if (response) {
        commit('UNSET_ACTION')
      }
      return response
    },
    // Берем места рекламы
    async getActionAdvPlaces({ commit }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'get/adv/pages'
      }
      const response = await api.action.getActionAdvPlaces(data)
      if (response) {
        commit('SET_ACTION_ADV_PLACES', response.data)
      }
      return response
    },
    // Берем все доступные Акции
    async getAllActions({ commit }, { store_id }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'get/all',
        store_id: store_id
      }
      const response = await api.action.getActionAdvPlaces(data)
      if (response) {
        commit('SET_ALL_ACTIONS', response.data)
      }
      return response
    },
    // Берем доступные товары
    async getAvailableProducts({ commit }, { store_id, filter, filtersdata, page, perpage, type }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'product/get',
        stores_ids: store_id,
        filter: filter,
        filtersdata: filtersdata,
        page: page,
        perpage: perpage,
        type: type
      }
      const response = await api.action.getAvailableProducts(data)
      if (response) {
        if(response.data.data.type == 1){
          commit('SET_AVAILABLE_PRODUCTS', response.data)
        }
        if(response.data.data.type == 2){
          commit('SET_SELECTED_PRODUCTS', response.data)
        }
      }
      return response
    },
    // Берем доступные комплекты
    async getAvailableComplects({ commit }, { store_id, filter, page, perpage, type }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'complect/get',
        store_id: store_id,
        filter: filter,
        page: page,
        perpage: perpage,
        type: type
      }
      const response = await api.action.getAvailableProducts(data)
      if (response) {
        if(response.data.data.type == 1){
          commit('SET_AVAILABLE_COMPLECTS', response.data)
        }
        if(response.data.data.type == 2){
          commit('SET_SELECTED_COMPLECTS', response.data)
        }
      }
      return response
    },
    // Берем доступные Группы Товаров
    async getProductGroups({ commit }, { store_id }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'get',
        store_id: store_id
      }
      const response = await api.action.getProductGroups(data)
      if (response) {
        commit('SET_PRODUCT_GROUPS', response.data)
      }
      return response
    },
    // Берем активные Акции
    async getActiveActions({ commit }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'get/actions/active'
      }
      const response = await api.action.getActiveActions(data)
      if (response) {
        commit('SET_ACTIVE_ACTIONS', response.data)
      }
      return response
    },
    // Берем цены Товаров
    async getProductsPrices({ commit }, { store_id }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'get/type/prices',
        store_id: store_id
      }
      const response = await api.action.getProductsPrices(data)
      if (response) {
        commit('SET_PRODUCTS_PRICES', response.data)
      }
      return response
    },
    // Берем товары Группы
    async getGroupProducts({ commit }, { group_id, filter, page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'get/products',
        group_id: group_id,
        filter: filter,
        page: page,
        perpage: perpage
      }
      const response = await api.action.getGroupProducts(data)
      if (response) {
        commit('SET_GROUP_PRODUCTS', response.data)
      }
      return response
    },
  },
  mutations: {
    SET_ACTION: (state, data) => {
      state.action = data.data
    },
    UNSET_ACTION: (state) => {
      state.action = {}
    },
    SET_ACTION_ADV_PLACES: (state, data) => {
      state.actionAdvPlaces = data.data
    },
    SET_ALL_ACTIONS: (state, data) => {
      state.allActions = data.data
    },
    SET_AVAILABLE_PRODUCTS: (state, data) => {
      state.productsAvailable = data.data
    },
    SET_SELECTED_PRODUCTS: (state, data) => {
      state.productsSelected = data.data
    },
    SET_AVAILABLE_COMPLECTS: (state, data) => {
      state.complectsAvailable = data.data
    },
    SET_SELECTED_COMPLECTS: (state, data) => {
      state.complectsSelected = data.data
    },
    SET_PRODUCT_GROUPS: (state, data) => {
      state.productGroups = data.data
    },
    SET_ACTIVE_ACTIONS: (state, data) => {
      state.activeActions = data.data
    },
    SET_PRODUCTS_PRICES: (state, data) => {
      state.productsPrices = data.data
    },
    SET_GROUP_PRODUCTS: (state, data) => {
      state.groupProducts = data.data
    },
  },
  getters: {
    action(state) {
      return state.action
    },
    actionAdvPlaces(state) {
      return state.actionAdvPlaces
    },
    allActions(state) {
      return state.allActions
    },
    productsAvailable(state) {
      return state.productsAvailable
    },
    productsSelected(state) {
      return state.productsSelected
    },
    complectsAvailable(state) {
      return state.complectsAvailable
    },
    complectsSelected(state) {
      return state.complectsSelected
    },
    productGroups(state) {
      return state.productGroups
    },
    activeActions(state) {
      return state.activeActions
    },
    productsPrices(state) {
      return state.productsPrices
    },
    groupProducts(state) {
      return state.groupProducts
    },
  },
}
