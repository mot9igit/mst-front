import api from '@/shared/api/api'
import router from '../router'

export default {
    namespaced: true,
    state: {
        opts: {},
    },
    actions: {
        async getOptOrders({ commit }, { sort, filter, filtersdata, page, perpage }) {
            const data = {
                id: router.currentRoute._value.params.id,
                action: 'get/orders/buyer',
                sort: sort,
                filter: filter,
                filtersdata: filtersdata,
                page: page,
                perpage: perpage
            }
            const response = await api.purchases.getOptOrders(data)
            if (response) {
                commit('SET_OPT_ORDERS', response.data)
            }
            return response
        },
        async getOptOrder({ commit }, { order_id }) {
            const data = {
                action: "get/orders/buyer",
                id: router.currentRoute._value.params.id,
                order_id: order_id,
            }
            const response = await api.purchases.getOptOrder(data)
            if (response) {
                commit('SET_OPT_ORDER', response.data)
            }
            return response
        },
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
        async setNewOrgProfile({ commit }, { code }) {
            const data = {
                action: 'add/code/warehouse',
                id: router.currentRoute._value.params.id,
                code: code,
            }
            const response = await api.purchases.setNewOrgProfile(data)

            return response
        },
        unsetOpts({ commit }) {
            commit('UNSET_OPTS')
        },
        unsetOptOrders({ commit }) {
            commit('UNSET_OPT_ORDERS')
        },
        unsetOptOrder({ commit }) {
            commit('UNSET_OPT_ORDER')
        },
    },
    mutations: {
        SET_OPTS: (state, data) => {
            state.opts = data.data
        },
        UNSET_OPTS: (state) => {
            state.opts = {}
        },
        SET_OPT_ORDERS: (state, data) => {
            state.optorders = data.data
        },
        UNSET_OPT_ORDERS: (state) => {
            state.optorders = {}
        },
        SET_OPT_ORDER: (state, data) => {
            state.optorder = data.data.order
        },
        UNSET_OPT_ORDER: (state) => {
            state.optorder = {}
        },
    },
    getters: {
        opts(state) {
            return state.opts
        },
        optorders(state) {
            return state.optorders
        },
        optorder(state) {
            return state.optorder
        },
    },
}