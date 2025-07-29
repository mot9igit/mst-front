<template>
  <ul class="d-breadcrumbs d-top-breadcrumbs">
    <li class="d-breadcrumbs__item d-top-breadcrumbs-item">
      <button class="d-breadcrumbs__button">Оптовые цены</button>
    </li>
    <li class="d-breadcrumbs__item d-top-breadcrumbs-item">
      <button class="d-breadcrumbs__button">Акции</button>
    </li>
    <li class="d-breadcrumbs__item d-breadcrumbs__item--active d-top-breadcrumbs-item">
      <button class="d-breadcrumbs__button">Насторойка акции</button>
    </li>
  </ul>
</template>
<script>
import router from '@/router'

export default {
  name: 'BreadcrumbsComponent',
  computed: {
    breadcrumbs() {
      const currentRoute = router.currentRoute.value
      const fullPath = currentRoute.matched[currentRoute.matched.length - 1].path
      const pathRoutes = fullPath.split('/')
      const pathRoutesWithId = currentRoute.fullPath.split('/')

      const routeMatched = this.$route.matched

      const breadcrumbs = pathRoutes.map((route, index) => {
        // console.log(route, index);
        // console.log(route)
        if (route == 'warehouses') {
          return {
            name: this.getRouteName(currentRoute, route),
            path: pathRoutesWithId.slice(0, index + 1).join('/'),
          }
        }
        if (route == 'offer') {
          return {
            name: this.getRouteName(currentRoute, route),
            path: pathRoutesWithId.slice(0, 2).join('/') + '/clients',
          }
        }
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
          if (route == ':warehouse_id' && currentRoute.name == 'org_opt_waregouse_category') {
            // console.log(pathRoutesWithId.slice(0, index + 2).join("/"))
            var arr = pathRoutesWithId.slice(0, index + 1)
            arr.push('all')
            return {
              name: this.getRouteName(currentRoute, route),
              path: arr.join('/'),
            }
          }
          return {
            name: this.getRouteName(currentRoute, route),
            path: pathRoutesWithId.slice(0, index + 1).join('/'),
          }
        }
        if (
          route == 'orders' &&
          (pathRoutes[index + 1] == 'my' || pathRoutes[index + 1] == 'opt')
        ) {
          return
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
      // console.log("Current route: ", currentRoute);
      // console.log("Current route param: ", param);
      switch (param) {
        case ':id': {
          return this.getOrgNameById(currentRoute.params[param.slice(1)])
        }
        case ':order_id': {
          switch (currentRoute?.meta?.breadcrumb?.path) {
            case 'order_id':
            case 'opt_order_id':
              return `Заказ № ${this.optorder?.order?.id}`
            case 'retail_order_id':
            default:
              return `Заказ № ${this.order?.id || '-'}`
          }
        }
      }
    },
  },
}
</script>
<style lang="scss"></style>
