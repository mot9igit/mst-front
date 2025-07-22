import { createRouter, createWebHistory } from 'vue-router'
import notFound from '../pages/not-found/index.vue'
import SignIn from '../pages/sign-in/index.vue'
import Account from '../pages/account/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SignIn,
    },
    {
      path: '/',
      name: 'account',
      component: Account,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: notFound,
    },
  ],
})

export default router
