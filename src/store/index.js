import Vuex from 'vuex'

import user from './user'
import org from './org'

export default new Vuex.Store({
  modules: {
    user,
    org,
  },
})
