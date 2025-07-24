import Vuex from 'vuex'

import user from './user'
import org from './org'
import catalog from './catalog'

export default new Vuex.Store({
  modules: {
    user,
    org,
    catalog,
  },
})
