import api from '@/shared/api/api'
import router from '../router'

export default {
  namespaced: true,
  state: {
    orders: {
      orders: [],
      total: -1,
    },
    order: {},
    balance: {},
    balance_request: {},
    organization: [],
    report_copo: [],
    report_copo_details: [],
    report_copo_all: [],
    cardstatus: [],
    msproducts: [],
  },
  actions: {
    async getOrders({ commit }, { filter, sort, page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: router.currentRoute._value.params.type,
        filter: filter,
        page: page,
        sort: sort,
        perpage: perpage,
      }
      const response = await api.retail.getOrders(data)
      if (response) {
        commit('SET_ORDERS', response.data)
      }
      return response
    },
    async getOrder({ commit }, { order_id }) {
      const data = {
        id: router.currentRoute._value.params.id,
        order_id: order_id,
      }
      const response = await api.retail.getOrders(data)
      if (response) {
        commit('SET_ORDER', response.data)
      }
      return response
    },
    async getBalance({ commit }, { page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: 'balance',
        page: page,
        perpage: perpage,
      }
      const response = await api.retail.getBalance(data)
      if (response) {
        commit('SET_BALANCE', response.data)
      }
      return response
    },
    async getBalanceRequest({ commit }, { page, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: 'balance_requests',
        page: page,
        perpage: perpage,
      }
      const response = await api.retail.getBalanceRequest(data)
      if (response) {
        commit('SET_BALANCE_REQUEST', response.data)
      }
      return response
    },
    async setBalanceRequest(store, { value }) {
      const data = {
        id: router.currentRoute._value.params.id,
        action: 'set',
        type: 'balance_request',
        value: value,
      }
      const response = await api.retail.setBalanceRequest(data)

      return response
    },
    async getSales({ commit }, { filter, filtersdata, page, sort, perpage, actionid, isAction }) {
      const data = {
        id: router.currentRoute._value.params.id,
        filter: filter,
        filtersdata: filtersdata,
        sort: sort,
        page: page,
        perpage: perpage,
        action: 'get',
        action_id: actionid,
        type: 2,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        offset: new Date().getTimezoneOffset(),
        is_action: isAction ? true : false,
        extended_name:
          router?.currentRoute?._value.matched[5]?.name == 'WholesaleClientsOffer'
            ? 'offer'
            : 'cart',
      }
      const response = await api.retail.getSales(data)
      if (response) {
        commit('SET_SALES', response.data)
      }
      return response
    },
    async changeStatus() {
      const data = {
        id: router.currentRoute._value.params.id,
        type: router.currentRoute._value.params.type,
        order_id: router.currentRoute._value.params.order_id,
      }
      const response = await api.retail.changeStatus(data)

      return response
    },
    async checkCode(store, { code }) {
      const data = {
        code: code,
        type: 'code/check',
        id: router.currentRoute._value.params.id,
        order_id: router.currentRoute._value.params.order_id,
      }
      const response = await api.retail.checkCode(data)
      return response
    },
    async getOrganization({ commit }) {
      const data = {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        id: router.currentRoute._value.params.id,
      }
      const response = await api.retail.getOrganization(data)
      if (response) {
        commit('SET_ORGANIZATION', response.data)
      }
      return response
    },
    async getReportCopo({ commit }, { tabledata, filter, filtersdata, page, sort, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        store_id: router.currentRoute._value.params.store_id,
        type: 'report_copo',
        filter: filter,
        filtersdata: filtersdata,
        tabledata: tabledata,
        sort: sort,
        page: page,
        perpage: perpage,
      }
      const response = await api.retail.getReportCopo(data)
      if (response) {
        commit('SET_REPORT_COPO', response.data)
      }
      return response
    },
    async getReportCopoDetails(
      { commit },
      { tabledata, filter, filtersdata, page, sort, perpage, brand_id },
    ) {
      const data = {
        id: router.currentRoute._value.params.id,
        store_id: router.currentRoute._value.params.store_id,
        brand_id: brand_id,
        type: 'report_copo_details',
        filter: filter,
        filtersdata: filtersdata,
        tabledata: tabledata,
        sort: sort,
        page: page,
        perpage: perpage,
      }
      const response = await api.retail.getReportCopoDetails(data)
      if (response) {
        commit('SET_REPORT_COPO_DETAILS', response.data)
      }
      return response
    },
    async getReportCopoAll(
      { commit },
      { tabledata, filter, filtersdata, page, sort, perpage, vendor_id },
    ) {
      const data = {
        id: router.currentRoute._value.params.id,
        vendor_id: vendor_id,
        type: 'report_copo_all_details',
        filter: filter,
        filtersdata: filtersdata,
        tabledata: tabledata,
        sort: sort,
        page: page,
        perpage: perpage,
      }
      const response = await api.retail.getReportCopoAll(data)
      if (response) {
        commit('SET_REPORT_COPO_ALL', response.data)
      }
      return response
    },
    async getCardstatus({ commit }) {
      const data = {
        type: 'cardstatus',
      }
      const response = await api.retail.getCardstatus(data)
      if (response) {
        commit('SET_CARDSTATUS', response.data)
      }
      return response
    },
    async getMSProducts({ commit }, { filter, filtersdata, page, sort, perpage }) {
      const data = {
        id: router.currentRoute._value.params.id,
        type: 'msproducts',
        filter: filter,
        filtersdata: filtersdata,
        sort: sort,
        page: page,
        perpage: perpage,
      }
      const response = await api.retail.getMSProducts(data)
      if (response) {
        commit('SET_MSPRODUCTS', response.data)
      }
      return response
    },
    unsetOrders({ commit }) {
      commit('UNSET_ORDERS')
    },
    unsetOrder({ commit }) {
      commit('UNSET_ORDER')
    },
    unsetSales({ commit }) {
      commit('UNSET_SALES')
    },
    unsetReportCopo({ commit }) {
      commit('UNSET_REPORT_COPO')
    },
    unsetReportCopoDetails({ commit }) {
      commit('UNSET_REPORT_COPO_DETAILS')
    },
    unsetReportCopoAll({ commit }) {
      commit('UNSET_REPORT_COPO_ALL')
    },
  },

  mutations: {
    SET_ORDERS: (state, data) => {
      state.orders = data.data
    },
    UNSET_ORDERS: (state) => {
      state.orders = {
        orders: [],
        total: -1,
      }
    },
    SET_ORDER: (state, data) => {
      state.order = data.data
    },
    UNSET_ORDER: (state) => {
      state.order = {}
    },
    SET_BALANCE: (state, data) => {
      state.balance = data.data
    },
    SET_BALANCE_REQUEST: (state, data) => {
      state.balance_request = data.data
    },
    SET_SALES: (state, data) => {
      state.sales = data.data
    },
    UNSET_SALES: (state) => {
      state.sales = {}
    },
    SET_ORGANIZATION: (state, data) => {
      state.organization = data.data
    },
    SET_REPORT_COPO: (state, data) => {
      state.report_copo = data.data
    },
    UNSET_REPORT_COPO: (state) => {
      state.report_copo = {}
    },
    SET_REPORT_COPO_DETAILS: (state, data) => {
      state.report_copo_details = data.data
    },
    UNSET_REPORT_COPO_DETAILS: (state) => {
      state.report_copo_details = {}
    },
    SET_REPORT_COPO_ALL: (state, data) => {
      state.report_copo_all = data.data
    },
    UNSET_REPORT_COPO_ALL: (state) => {
      state.report_copo_all = {}
    },
    SET_CARDSTATUS: (state, data) => {
      state.cardstatus = data.data.items
    },
    SET_MSPRODUCTS: (state, data) => {
      state.msproducts = data.data
    },
  },
  getters: {
    orders(state) {
      return state.orders
    },
    order(state) {
      return state.order
    },
    balance(state) {
      return state.balance
    },
    balance_request(state) {
      return state.balance_request
    },
    sales(state) {
      return state.sales
    },
    organization(state) {
      return state.organization
    },
    report_copo(state) {
      return state.report_copo
    },
    report_copo_details(state) {
      return state.report_copo_details
    },
    report_copo_all(state) {
      return state.report_copo_all
    },
    cardstatus(state) {
      return state.cardstatus
    },
    msproducts(state) {
      return state.msproducts
    },
  },
}
