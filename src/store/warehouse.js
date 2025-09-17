import api from '@/shared/api/api'
import router from '../router'

export default {
  namespaced: true,
  state: {
    orders: {
      orders: [],
      total: -1,
    },
    collectionBuild: {
      items: [],
      total: -1,
      totalAll: 0,
    },
    collectionBuildExclude: {
      items: [],
      total: -1,
      totalAll: 0,
    },
    products: {},
    order: {},
    dilers: {},
    managers: {},
    stores: {},
  },
  actions: {
    async getCollections({ commit }, { filter, page, perpage, sort }) {
      const data = {
        action: 'get',
        filter: filter,
        page: page,
        sort: sort,
        perpage: perpage,
        id: router.currentRoute._value.params.id,
      }
      const response = await api.warehouse.getCollections(data)
      if (response) {
        commit('SET_COLLECTIONS', response.data)
      }
      return response
    },
    async getCollection({ commit }) {
      const data = {
        action: 'get',
        id: router.currentRoute._value.params.id,
        group_id: router.currentRoute._value.params.collection_id,
      }
      const response = await api.warehouse.getCollection(data)
      if (response) {
        commit('SET_COLLECTION', response.data)
      }
      return response
    },
    async buildCollection(
      { commit },
      { typeData, store_id, terms, page, perpage, filter, type, typeExclude, file, fileExclude },
    ) {
      const data = {
        action: 'build',
        id: router.currentRoute._value.params.id,
        typeData: typeData,
        store_id: store_id,
        terms: terms,
        page: page,
        perpage: perpage,
        filter: filter,
        type: type,
        typeExclude: typeExclude,
        file: file,
        fileExclude: fileExclude,
      }
      const response = await api.warehouse.buildCollection(data)
      if (response) {
        if (typeData == 1) {
          commit('SET_COLLECTION_BUILD', response.data)
        }
        if (typeData == 2) {
          commit('SET_COLLECTION_EXCLUDE_BUILD', response.data)
        }
      }
      return response
    },
    async clearCollectionData() {
      const data = {
        action: 'clear/data',
        id: router.currentRoute._value.params.id,
      }
      const response = await api.warehouse.clearCollectionData(data)
      return response
    },
    async toggleProductCollection(store, { mode, remain_id }) {
      const data = {
        action: 'toogle/product',
        id: router.currentRoute._value.params.id,
        mode: mode,
        remain_id: remain_id,
      }
      const response = await api.warehouse.toggleProductCollection(data)
      return response
    },
    async setCollection(
      store,
      { store_id, terms, type, typeExclude, name, description, update, file, fileExclude },
    ) {
      const data = {
        action: 'set',
        id: router.currentRoute._value.params.id,
        group_id: router.currentRoute._value.params.collection_id,
        store_id: store_id,
        terms: terms,
        type: type,
        typeExclude: typeExclude,
        name: name,
        description: description,
        file: file,
        fileExclude: fileExclude,
        update: update,
      }
      const response = await api.warehouse.setCollection(data)
      return response
    },
    async deleteCollection(store, { group_id }) {
      const data = {
        action: 'delete',
        id: router.currentRoute._value.params.id,
        group_id: group_id,
      }
      const response = await api.warehouse.deleteCollection(data)
      return response
    },
    async getData({ commit }, { filter, filtersdata, page, sort, perpage, id, owner_id }) {
      const data = {
        store_id: router.currentRoute._value.params.store_id,
        filter: filter,
        filtersdata: filtersdata,
        sort: sort,
        page: page,
        perpage: perpage,
      }
      if (id) {
        data.id = id
      } else {
        data.id = router.currentRoute._value.params.id
      }
      if (owner_id) {
        data.owner_id = owner_id
      } else {
        data.owner_id = router.currentRoute._value.params.id
      }
      if (router.currentRoute._value.params.store_id) {
        data.store_id = router.currentRoute._value.params.store_id
      }
      const response = await api.warehouse.getData(data)
      if (response) {
        commit('SET_DATA', response.data)
      }
      return response
    },
    unsetCollections({ commit }) {
      commit('UNSET_COLLECTIONS')
    },
    unsetCollection({ commit }) {
      commit('UNSET_COLLECTION')
    },
  },
  mutations: {
    SET_COLLECTIONS: (state, data) => {
      state.collections = data.data
    },
    SET_COLLECTION: (state, data) => {
      state.collection = data.data
    },
    SET_DATA: (state, data) => {
      state.products = data.data
    },
    SET_COLLECTION_BUILD: (state, data) => {
      state.collectionBuild = data.data
    },
    SET_COLLECTION_EXCLUDE_BUILD: (state, data) => {
      state.collectionBuildExclude = data.data
    },
    UNSET_COLLECTIONS: (state) => {
      state.collections = []
    },
    UNSET_COLLECTION: (state) => {
      state.collection = {}
    },
  },
  getters: {
    collections(state) {
      return state.collections
    },
    collection(state) {
      return state.collection
    },
    products(state) {
      return state.products
    },
    collectionBuild(state) {
      return state.collectionBuild
    },
    collectionBuildExclude(state) {
      return state.collectionBuildExclude
    },
  },
}
