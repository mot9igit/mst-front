import api from '@/shared/api/api'
import router from '../router'

export default {
  namespaced: true,
  state: {
    orders: {
      orders: [],
      total: -1,
    },
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
  },
}
