import api from '@/shared/api/api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    orgActive: {},
    orgs: [],
    orgStores: [],
    orgprofile: [],
  },
  actions: {
    async getOrg({ commit }, data) {
      const response = await api.org.getOrg(data)
      if (response) {
        commit('SET_ORG', response.data)
        if (response.data && router.currentRoute._value.params.id) {
          const resp = response.data.data
          let activeOrganization = resp.find(
            (org) => org.id === router.currentRoute._value.params.id,
          )
          commit('SET_ACTIVE_ORG', activeOrganization)
        }
      }
      return response
    },
    async getOrgStores({ commit }) {
      const data = {
        action: 'get/stores',
        id: router.currentRoute._value.params.id,
      }
      const response = await api.org.getOrg(data)
      if (response) {
        commit('SET_ORG_STORES', response.data)
      }
      return response
    },
    async getOptVendors({ commit }, sendData) {
      const data = {
        id:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id_org_from
            : router.currentRoute._value.params.id,
        type: router.currentRoute._value.params.type,
        action: 'get/vendors',
        id_org_from:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id
            : null,
        extended_name:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart',
      }
      if (sendData) {
        if (Object.prototype.hasOwnProperty.call(sendData, 'filter')) {
          data.filter = sendData.filter
        }
      }
      const response = await api.org.getOptVendors(data)
      if (response) {
        commit('SET_OPT_VENDORS', response.data)
      }
      return response
    },
    async toggleOptsVisible({ commit }, sendData) {
      const data = {
        action: 'get/vendors',
        extended_name:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart',
        store:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id_org_from
            : router.currentRoute._value.params.id,
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
    async getOrgProfile({ commit }, data) {

      const response = await api.org.getOrgProfile(data)
      if (response) {
        commit('SET_ORG_PROFILE', response.data)
      }
      return response
    },
  },
  mutations: {
    SET_ORG: (state, data) => {
      state.orgs = data.data
    },
    SET_ACTIVE_ORG: (state, data) => {
      state.orgActive = data
    },
    SET_ORG_STORES: (state, data) => {
      state.orgStores = data.data
    },
    SET_OPT_VENDORS: (state, data) => {
      state.optVendors = data.data
    },
    SET_ORG_PROFILE: (state, data) => {
      state.orgprofile = data.data
    },
  },
  getters: {
    orgActive(state) {
      return state.orgActive
    },
    orgs(state) {
      return state.orgs
    },
    orgStores(state) {
      return state.orgStores
    },
    optVendors(state) {
      return state.optVendors
    },
    orgprofile(state) {
      return state.orgprofile
    },
  },
}
