import api from '@/shared/api/api'
import router from '../router'

export default {
    namespaced: true,
    state: {
        opts: {},
    },
    actions: {
        async getOpts({ commit }, { filter, filtersdata, page, perpage }) {
            const data = {
                id: router.currentRoute._value.params.id,
                type: 'opts',
                filter: filter,
                filtersdata: filtersdata,
                page: page,
                perpage: perpage
            }
            const response = await api.purchases.getOpts(data)
            if (response) {
                commit('SET_OPTS', response.data)
            }
            return response
        },
        unsetOpts({ commit }) {
            commit('UNSET_OPTS')
        },
    },
    mutations: {
        SET_OPTS: (state, data) => {
            state.opts = data.data
        },
        UNSET_OPTS: (state) => {
            state.opts = {}
        },
    },
    getters: {
        opts(state) {
            return state.opts
        },
    },
}