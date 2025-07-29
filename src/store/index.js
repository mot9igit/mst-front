import Vuex from 'vuex'

import addition from './addition'
import user from './user'
import org from './org'
import basket from './basket'
import catalog from './catalog'
import retail from './retail'

export default new Vuex.Store({
  modules: {
    user,
    org,
    catalog,
    basket,
    retail,
    addition,
  },
})
