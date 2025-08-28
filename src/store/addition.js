import api from '@/shared/api/api'
import router from '../router'

export default {
  namespaced: true,
  state: {
    vendors: [],
    catalogs: [],
    regions: [],
    organizations: []
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
    async getCatalogs({ commit }) {
      const data = {
        id: router.currentRoute._value.params.id,
        get_type: 'catalog'
      }
      const response = await api.addition.getCatalogs(data)
      if (response) {
        commit('SET_CATALOGS', response.data)
      }
      return response
    },
    async getRegions({ commit }) {
      const data = {
        id: router.currentRoute._value.params.id,
        get_type: 'regions'
      }
      const response = await api.addition.getRegions(data)
      if (response) {
        commit('SET_REGIONS', response.data)
      }
      return response
    },
    async getOrganizations({ commit }) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: 'get/organizations'
      }
      const response = await api.addition.getOrganizations(data)
      if (response) {
        commit('SET_ORGANIZATIONS', response.data)
      }
      return response
    },
  },
  mutations: {
    SET_VENDORS: (state, data) => {
      state.vendors = data.data
    },
    SET_CATALOGS: (state, data) => {
      state.catalogs = data.data
    },
    SET_REGIONS: (state, data) => {
      state.regions = data.data
    },
    SET_ORGANIZATIONS: (state, data) => {
      state.organizations = data.data
    },
  },
  getters: {
    vendors(state) {
      return state.vendors
    },
    catalogs(state) {
      return state.catalogs
    },
    regions(state) {
      return state.regions
    },
    organizations(state) {
      return state.organizations
    },
  },
}
