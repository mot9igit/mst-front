import { createRouter, createWebHistory } from 'vue-router'
import notFound from '../pages/not-found/index.vue'
import SignIn from '../pages/sign-in/index.vue'
import Account from '../pages/account/index.vue'
import Purchases from '../pages/purchases/index.vue'
import Organization from '../pages/org/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SignIn,
    },
    {
      path: '',
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('user')) {
          next()
        } else {
          next({ name: 'home' })
        }
      },
      children: [
        {
          path: '/account',
          name: 'account',
          props: true,
          label: 'Профиль',
          component: Account,
          children: [
            {
              path: '/:id',
              children: [
                {
                  path: '',
                  name: 'org',
                  props: true,
                  meta: {
                    breadcrumb: {
                      label: 'Организация',
                    },
                  },
                  label: 'Организация',
                  component: Organization,
                },
                {
                  path: 'purchases',
                  name: 'purchases',
                  props: true,
                  label: 'Закупки',
                  component: Purchases,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: notFound,
    },
  ],
})

export default router
