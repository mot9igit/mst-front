import instance from './instance'
import additionModule from './addition'
import authModule from '@/pages/sign-in/api/auth'
import orgModule from '@/pages/org/api/org'
import basketModule from '@/pages/org/api/basket'
import catalogModule from '@/pages/account/api/catalog'
import retailModule from '@/pages/retail/api'

export default {
  auth: authModule(instance),
  addition: additionModule(instance),
  org: orgModule(instance),
  catalog: catalogModule(instance),
  basket: basketModule(instance),
  retail: retailModule(instance),
}
