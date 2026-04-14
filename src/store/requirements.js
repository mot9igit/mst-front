import router from '@/router'
import api from '@/shared/api/api'

export default {
  namespaced: true,
  state: {
    requirements: {
      items: [],
      total: -1,
    },
    reqCounts: {},
  },
  actions: {
    async getRequirements({ commit }, { filter, page, perpage }) {
      const sendData = {
        id: router.currentRoute._value.params.id,
        action: 'get',
        filter: filter,
        page: page,
        perpage: perpage,
        matrix:
          router?.currentRoute?._value?.matched[5]?.name == 'WholesaleClientsOffer' ? true : false,
      }
      const response = await api.requirements.getRequirements(sendData)
      if (response) {
        commit('SET_REQUIREMENTS', response.data)
      }
      return response
    },
    async setRequirement(store, data) {
      const sendData = {
        action: 'set',
        id: router.currentRoute._value.params.id,
        data: data,
        matrix:
          router?.currentRoute?._value?.matched[5]?.name == 'WholesaleClientsOffer' ? true : false,
      }
      const response = await api.requirements.setRequirement(sendData)
      return response
    },
    async setRequirementWarehouse(store, data) {
      const sendData = {
        action: 'set/warehouse',
        id: router.currentRoute._value.params.id,
        data: data,
      }
      const response = await api.requirements.setRequirement(sendData)
      return response
    },
    async removeRequirements(store, { requirements }) {
      const sendData = {
        action: 'delete',
        id: router.currentRoute._value.params.id,
        requirements: requirements,
      }
      const response = await api.requirements.setRequirement(sendData)
      return response
    },
    async saveReqXLS(store, { req_name }) {
      let req = null
      if (router.currentRoute._value.params.requirement_id) {
        req = router.currentRoute._value.params.requirement_id
      }
      const sendData = {
        id: router.currentRoute._value.params.id,
        id_org_from: null,
        type: router.currentRoute._value.params.type,
        category_id: 'all',
        org_w_id: router.currentRoute._value.params.org_w_id,
        warehouse_id: router.currentRoute._value.params.warehouse_id,
        warehouse_cat_id: router.currentRoute._value.params.warehouse_cat_id,
        extended_name: 'cart',
        req: req,
        req_name: req_name,
        action: 'get/req/xslx',
      }
      // const sendData = {
      //   action: 'get/req/xslx',
      //   req: req,
      //   req_id: req_id,
      //   products: products,
      //   id: router.currentRoute._value.params.id,
      // }
      const response = await api.catalog.getOptProducts(sendData)
      return response
    },
    async getReqCounts({ commit }, { req }) {
      const sendData = {
        id: router.currentRoute._value.params.id,
        id_org_from: null,
        type: router.currentRoute._value.params.type,
        category_id: 'all',
        org_w_id: router.currentRoute._value.params.org_w_id,
        warehouse_id: router.currentRoute._value.params.warehouse_id,
        warehouse_cat_id: router.currentRoute._value.params.warehouse_cat_id,
        extended_name: 'cart',
        req: req,
        action: 'get/req/counts',
      }

      const response = await api.catalog.getOptProducts(sendData)
      if (response) {
        commit('SET_REQ_COUNTS', response.data)
      }
      return response
    },
    unsetRequirements({ commit }) {
      commit('UNSET_REQUIREMENTS')
    },
  },
  mutations: {
    SET_REQUIREMENTS: (state, data) => {
      state.requirements = data.data
    },
    SET_REQ_COUNTS: (state, data) => {
      state.reqCounts = data.data
    },
    UNSET_REQUIREMENTS: (state) => {
      state.requirements = {
        items: [],
        total: -1,
      }
    },
  },
  getters: {
    requirements(state) {
      return state.requirements
    },
    reqCounts(state) {
      return state.reqCounts
    },
  },
}
