import api from '@/shared/api/api'
import router from '../router'

export default {
  namespaced: true,
  state: {
    vendors: [],
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
  },
  mutations: {
    SET_VENDORS: (state, data) => {
      state.vendors = data.data
    },
  },
  getters: {
    vendors(state) {
      return state.vendors
    },
  },
}
