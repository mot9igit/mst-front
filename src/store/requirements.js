import router from '@/router'
import api from '@/shared/api/api'

export default {
  namespaced: true,
  state: {
    requirements: {
      items: [],
      total: -1,
    },
  },
  actions: {
    async getRequirements({ commit }, { filter, page, perpage }) {
      const sendData = {
        id: router.currentRoute._value.params.id,
        action: 'get',
        filter: filter,
        page: page,
        perpage: perpage,
        matrix: router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? true : false,
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
    unsetRequirements({ commit }) {
      commit('UNSET_REQUIREMENTS')
    },
  },
  mutations: {
    SET_REQUIREMENTS: (state, data) => {
      state.requirements = data.data
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
  },
}
