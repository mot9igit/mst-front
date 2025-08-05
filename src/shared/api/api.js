import instance from './instance'
import additionModule from './addition'
import authModule from '@/pages/sign-in/api/auth'
import orgModule from '@/pages/org/api/org'
import basketModule from '@/pages/org/api/basket'
import catalogModule from '@/pages/account/api/catalog'
import retailModule from '@/pages/retail/api'
import wholesaleModule from '@/pages/wholesale/api'
import salesModule from '@/pages/wholesale/api/sales'
import actionModule from '@/shared/api/action'

export default {
  auth: authModule(instance),
  addition: additionModule(instance),
  org: orgModule(instance),
  catalog: catalogModule(instance),
  basket: basketModule(instance),
  retail: retailModule(instance),
  wholesale: wholesaleModule(instance),
  sales: salesModule(instance),
  action: actionModule(instance),
}
