import api from '@/shared/api/api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    orgActive: {},
    orgs: [],
    orgStores: [],
    orgStore: [],
    orgprofile: [],
    optVendorsAvailable: {
      items: [],
      total: -1,
      totalAll: 0,
    },
    optVendorsSelected: {
      items: [],
      total: -1,
      totalAll: 0,
    },
    manager: {},
    optPrices: {},
  },
  actions: {
    async getOrg({ commit }) {
      const data = {
        action: 'get/orgs',
      }
      const response = await api.org.getOrg(data)
      if (response) {
        commit('SET_ORG', response.data)
        if (response.data && router.currentRoute._value.params.id) {
          const resp = response.data.data
          let activeOrganization = resp.find(
            (org) => org.id === router.currentRoute._value.params.id,
          )
          if (activeOrganization) {
            commit('SET_ACTIVE_ORG', activeOrganization)
          } else {
            router.push({ name: 'OrgAdd' })
          }
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

    async getOrgStore({ commit }) {
      const data = {
        id: router.currentRoute._value.params.id,
        store_id: router.currentRoute._value.params.store_id,
        action: 'get/org/store',
      }
      const response = await api.org.getOrg(data)
      if (response) {
        commit('SET_ORG_STORE', response.data)
      }
      return response
    },
    async create(store, data) {
      const sendData = {
        id: router.currentRoute._value.params.id,
        action: 'org/create',
        data: data,
      }
      const response = await api.org.create(sendData)
      return response
    },
    async edit(store, data) {
      const sendData = {
        id: router.currentRoute._value.params.id,
        action: 'org/edit',
        data: data,
      }
      const response = await api.org.edit(sendData)
      return response
    },
    async getOptVendorsAvailable({ commit }, { filter, page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
          // router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer'
          //   ? router.currentRoute._value.params.id_org_from
          //   : router.currentRoute._value.params.id,
        type: 0,
        filter: filter,
        page: page,
        perpage: perpage,
        action: 'get/vendors',
        id_org_from: null,
          // router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer'
          //   ? router.currentRoute._value.params.id
          //   : null,
        extended_name: 'cart',
        //  router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer' ? 'offer' : 'cart',
      }
      const response = await api.org.getOptVendors(data)
      if (response) {
        commit('SET_OPT_VENDORS_AVAILABLE', response.data)
      }
      return response
    },
    async getOptVendorsSelected({ commit }, { page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
          // router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer'
          //   ? router.currentRoute._value.params.id_org_from
          //   : router.currentRoute._value.params.id,
        type: 1,
        page: page,
        perpage: perpage,
        action: 'get/vendors',
        id_org_from: null,
          // router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer'
          //   ? router.currentRoute._value.params.id
          //   : null,
        extended_name: 'cart',
          // router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer' ? 'offer' : 'cart',
      }
      const response = await api.org.getOptVendors(data)
      if (response) {
        commit('SET_OPT_VENDORS_SELECTED', response.data)
      }
      return response
    },
    async toggleVendorStores(store, { active, org_id, store_id }) {
      const data = {
        action: 'toggle/vendors/stores',
        active: active,
        extended_name: 'cart',
        //  router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer' ? 'offer' : 'cart',
        id: router.currentRoute._value.params.id,
          // router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer'
          //   ? router.currentRoute._value.params.id_org_from
          //   : router.currentRoute._value.params.id,
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
        extended_name: 'cart',
        //  router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer' ? 'offer' : 'cart',
        store: router.currentRoute._value.params.id,
          // router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer'
          //   ? router.currentRoute._value.params.id_org_from
          //   : router.currentRoute._value.params.id,
      }
      const response = await api.org.toggleOpts(data)
      return response
    },
    async toggleOptsVisible(store, sendData) {
      const data = {
        action: 'get/vendors',
        extended_name: 'cart',
        //  router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer' ? 'offer' : 'cart',
        store: router.currentRoute._value.params.id,
          // router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer'
          //   ? router.currentRoute._value.params.id_org_from
          //   : router.currentRoute._value.params.id,
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
    async getOrgProfile({ commit }) {
      const data = {
        action: 'get/org/profile',
        id: router.currentRoute._value.params.id,
      }
      const response = await api.org.getOrgProfile(data)
      if (response) {
        commit('SET_ORG_PROFILE', response.data)
      }
      return response
    },
    async editOrgProfile(store, { data }) {
      const sendData = {
        action: 'set/request/profile',
        id: router.currentRoute._value.params.id,
        data: data,
      }
      const response = await api.org.editOrgProfile(sendData)
      return response
    },
    async setManager(store, { data }) {
      const sendData = {
        action: 'set/org/manager',
        id: router.currentRoute._value.params.id,
        data: data,
      }
      const response = await api.org.setManager(sendData)
      return response
    },
    async deleteManager(store, { manager_id }) {
      const sendData = {
        action: 'delete/org/manager',
        id: router.currentRoute._value.params.id,
        manager_id: manager_id,
      }
      const response = await api.org.deleteManager(sendData)
      return response
    },
    async getManager({ commit }, { manager_id }) {
      const data = {
        action: 'get/org/manager',
        id: router.currentRoute._value.params.id,
        manager_id: manager_id,
      }
      const response = await api.org.getManager(data)
      if (response) {
        commit('SET_MANAGER', response.data)
      }
      return response
    },
    async getOptPrises({ commit }) {
      const data = {
        action: "get/type/prices",
				store_id: router.currentRoute._value.params.store_id,
      }
      const response = await api.org.getOptPrises(data)
      if (response) {
        commit('SET_OPT_PRICES', response.data)
      }
      return response
    },
    async setOrgSettings(store, { settings }) {
      const data = {
        action: "set/organization/settings",
        type: "organization",
        id: router.currentRoute._value.params.id,
				store_id: router.currentRoute._value.params.store_id,
        settings: settings,
      }
      const response = await api.org.setOrgSettings(data)

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
    SET_ORG_STORE: (state, data) => {
      state.orgStore = data.data
    },
    SET_OPT_VENDORS_AVAILABLE: (state, data) => {
      state.optVendorsAvailable = data.data
    },
    SET_OPT_VENDORS_SELECTED: (state, data) => {
      state.optVendorsSelected = data.data
    },
    SET_ORG_PROFILE: (state, data) => {
      state.orgprofile = data.data
    },
    SET_MANAGER: (state, data) => {
      state.manager = data.data
    },
    SET_OPT_PRICES: (state, data) => {
      state.optPrices = data.data
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

    orgStore(state) {
      return state.orgStore
    },
    optVendorsAvailable(state) {
      return state.optVendorsAvailable
    },
    optVendorsSelected(state) {
      return state.optVendorsSelected
    },
    orgprofile(state) {
      return state.orgprofile
    },
    manager(state) {
      return state.manager
    },
    optPrices(state) {
      return state.optPrices
    },
  },
}
