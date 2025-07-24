import api from '@/shared/api/api'

export default {
  state: {
    orgs: [],
  },
  actions: {
    async org_get_from_api({ commit }, data) {
      const response = await api.org.getOrg(data)
      if (response) {
        commit('SET_ORG_TO_VUEX', response.data)
      }
      return response
    },
  },
  mutations: {
    SET_ORG_TO_VUEX: (state, data) => {
      state.orgs = data.data
    },
  },
  getters: {
    orgs(state) {
      return state.orgs
    },
  },
}
