import Vuex from 'vuex'

import addition from './addition'
import user from './user'
import org from './org'
import basket from './basket'
import catalog from './catalog'
import retail from './retail'
import wholesale from './wholesale'
import sales from './sales'
import action from './action'
import purchases from './purchases'
import requirements from './requirements'
import warehouse from './warehouse'
import notifications from './notifications'
import offer from './offer'


export default new Vuex.Store({
  modules: {
    user,
    org,
    catalog,
    basket,
    retail,
    wholesale,
    sales,
    addition,
    action,
    purchases,
    requirements,
    warehouse,
    notifications,
    offer
  },
})
