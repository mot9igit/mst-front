import instance from './instance'
import authModule from '@/pages/sign-in/api/auth'
import orgModule from '@/pages/org/api/org'
import catalogModule from '@/pages/account/api/catalog'

export default {
  auth: authModule(instance),
  org: orgModule(instance),
  catalog: catalogModule(instance),
}
