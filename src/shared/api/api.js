import instance from './instance'
import authModule from '@/pages/sign-in/api/auth'

export default {
  auth: authModule(instance),
}
