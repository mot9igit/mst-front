import api from '@/shared/api/api'
import router from '../router'

export default {
    namespaced: true,
    state: {
        dilers: {},
    },
    actions: {
        async getDilers({ commit }, { filter, filtersdata, page, perpage }) {
            const data = {
                id: router.currentRoute._value.params.id,
                filter: filter,
                filtersdata: filtersdata,
                page: page,
                perpage: perpage
            }
            const response = await api.purchases.getDilers(data)
            if (response) {
                commit('SET_DILERS', response.data)
            }
            return response
        },
        unsetDilers({ commit }) {
            commit('UNSET_DILERS')
        },
    },
    mutations: {
        SET_DILERS: (state, data) => {
            state.dilers = data.data
        },
        UNSET_DILERS: (state) => {
            state.dilers = {}
        },
    },
    getters: {
        dilers(state) {
            return state.dilers
        },
    },
}