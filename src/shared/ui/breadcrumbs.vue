<template>
  <ul class="d-breadcrumbs d-top-breadcrumbs">
    <template v-for="(crumb, index) in breadcrumbs">
      <li
      class="d-breadcrumbs__item d-top-breadcrumbs-item"
      v-if="crumb"
      :class="{ active: index === breadcrumbs.length - 1 }">
        <router-link :to="crumb.path" class="d-breadcrumbs__button">{{ crumb.name }}</router-link>
      </li>
    </template>
  </ul>
</template>
<script>
import router from '@/router'
import { mapGetters } from 'vuex'

export default {
  name: 'BreadcrumbsComponent',
  computed: {
    ...mapGetters({
      orgActive: 'org/orgActive'
    }),
    breadcrumbs() {
      const currentRoute = router.currentRoute.value
      const fullPath = currentRoute.matched[currentRoute.matched.length - 1].path
      const pathRoutes = fullPath.split('/')
      const pathRoutesWithId = currentRoute.fullPath.split('/')

      const routeMatched = this.$route.matched

      const breadcrumbs = pathRoutes.map((route, index) => {
        console.log(route, index);
        console.log(route)
        if (
          route == '/' ||
          route == '' ||
          (!route.startsWith(':') &&
            !routeMatched.find(
              (matchedRoute) => matchedRoute.path === pathRoutes.slice(0, index + 1).join('/'),
            )?.meta.breadcrumb?.label)
        ) {
          return
        }
        if (route.startsWith(':')) {
          return {
            name: this.getRouteName(currentRoute, route),
            path: pathRoutesWithId.slice(0, index + 1).join('/'),
          }
        }

        return {
          name: routeMatched.find(
            (matchedRoute) => matchedRoute.path === pathRoutes.slice(0, index + 1).join('/'),
          )?.meta.breadcrumb?.label,
          path: pathRoutesWithId.slice(0, index + 1).join('/'),
        }
      })
      return breadcrumbs
    },
  },
  methods: {
    getRouteName(currentRoute, param) {
      console.log("Current route: ", currentRoute);
      console.log("Current route param: ", param);
      switch (param) {
        case ':id': {
          return this.orgActive.name_short ? this.orgActive.name_short : this.orgActive.name
        }
        case ':order_id': {
          return `Заказ № ${currentRoute.params?.order_id || '-'}`
        }
      }
    },
  },
}
</script>
<style lang="scss"></style>
