import api from '@/shared/api/api'
import router from '../router'

export default {
  namespaced: true,
  state: {
    vendors: [],
    catalogs: [],
    out_catalogs: [],
    regions: [],
    organizations: [],
    tags: [],
  },
  actions: {
    async getVendors({ commit }, sendData) {
      const data = {
        id: router.currentRoute._value.params.id,
        get_type: 'vendors',
      }
      if (sendData) {
        if (Object.prototype.hasOwnProperty.call(sendData, 'search')) {
          data.search = sendData.search
        }
      }
      const response = await api.addition.getVendors(data)
      if (response) {
        commit('SET_VENDORS', response.data)
      }
      return response
    },
    async getOurVendors({ commit }, { store_id }) {
      const data = {
        action: 'get/vendors',
        id: router.currentRoute._value.params.id,
        store_id: store_id,
      }
      const response = await api.addition.getOurVendors(data)
      if (response) {
        commit('SET_OUR_VENDORS', response.data)
      }
      return response
    },
    async getCatalogs({ commit }) {
      const data = {
        id: router.currentRoute._value.params.id,
        get_type: 'catalog',
      }
      const response = await api.addition.getCatalogs(data)
      if (response) {
        commit('SET_CATALOGS', response.data)
      }
      return response
    },
    async getOutCatalogs({ commit }, { store_id }) {
      const data = {
        action: 'get/catalog/warehouse',
        id: router.currentRoute._value.params.id,
        store_id: store_id,
      }
      const response = await api.addition.getOutCatalogs(data)
      if (response) {
        commit('SET_OUT_CATALOGS', response.data)
      }
      return response
    },
    async getRegions({ commit }, { exclude, filter }) {
      const data = {
        id: router.currentRoute._value.params.id,
        get_type: 'regions',
        exclude: exclude,
        filter: filter,
      }
      const response = await api.addition.getRegions(data)
      if (response) {
        commit('SET_REGIONS', response.data)
      }
      return response
    },
    async getOrganizations({ commit }, { exclude, filter }) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: 'get/organizations',
        exclude: exclude,
        filter: filter,
      }
      const response = await api.addition.getOrganizations(data)
      if (response) {
        commit('SET_ORGANIZATIONS', response.data)
      }
      return response
    },
    async getTags({ commit }, { store_id }) {
      const data = {
        action: 'get/tags',
        id: router.currentRoute._value.params.id,
        store_id: store_id,
      }
      const response = await api.addition.getTags(data)
      if (response) {
        commit('SET_TAGS', response.data)
      }
      return response
    },
  },
  mutations: {
    SET_VENDORS: (state, data) => {
      state.vendors = data.data
    },
    SET_OUR_VENDORS: (state, data) => {
      state.our_vendors = data.data
    },
    SET_CATALOGS: (state, data) => {
      state.catalogs = data.data
    },
    SET_OUT_CATALOGS: (state, data) => {
      state.out_catalogs = data.data
    },
    SET_REGIONS: (state, data) => {
      state.regions = data.data
    },
    SET_ORGANIZATIONS: (state, data) => {
      state.organizations = data.data
    },
    SET_TAGS: (state, data) => {
      state.tags = data.data
    },
  },
  getters: {
    vendors(state) {
      return state.vendors
    },
    our_vendors(state) {
      return state.our_vendors
    },
    catalogs(state) {
      return state.catalogs
    },
    out_catalogs(state) {
      return state.out_catalogs
    },
    regions(state) {
      return state.regions
    },
    organizations(state) {
      return state.organizations
    },
    tags(state) {
      return state.tags
    },
  },
}
