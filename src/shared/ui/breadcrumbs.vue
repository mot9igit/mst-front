<template>
  <a class="d-back promotions__top-back products__back" @click="$router.go(-1)">
    <i class="d-icon-arrow d-back__icon"></i>
    <span class="d-back__text hidden-640">Назад</span>
  </a>
  <ul class="d-breadcrumbs d-top-breadcrumbs">
    <template v-for="(crumb, index) in breadcrumbs" :key="index">
      <li
        class="d-breadcrumbs__item d-top-breadcrumbs-item"
        v-if="crumb"
        :class="{ active: index === breadcrumbs.length - 1 }"
      >
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
  data() {
    return {
      crumbs: [],
    }
  },
  computed: {
    ...mapGetters({
      orgActive: 'org/orgActive',
      sale: 'sales/sale',
      optCatalog: 'catalog/optCatalog',
      optCatalogWarehouse: 'catalog/optCatalogWarehouse',
    }),
    breadcrumbs() {
      const currentRoute = router.currentRoute.value
      const fullPath = currentRoute.matched[currentRoute.matched.length - 1].path
      const pathRoutes = fullPath.split('/')
      const pathRoutesWithId = currentRoute.fullPath.split('/')

      const routeMatched = this.$route.matched
      const breadcrumbs = pathRoutes.map((route, index) => {
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
        if (pathRoutes[pathRoutes.length - 1] == ':category_id') {
          const parents = this.getCategoriesCatItemParents(4, currentRoute.params.category_id)

          parents?.forEach((parent) => {
            const newPathRoutesWithId = pathRoutesWithId.map((path) => path)
            newPathRoutesWithId[newPathRoutesWithId.length - 1] = parent.id

            // breadcrumbs.splice(-1, 0, {
            //   name: parent?.pagetitle,
            //   path: newPathRoutesWithId.join('/'),
            // })
          })
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
  mounted() {
    this.updateCrumbs()
  },
  methods: {
    updateCrumbs() {
      const currentRoute = router.currentRoute.value
      const fullPath = currentRoute.matched[currentRoute.matched.length - 1].path
      const pathRoutes = fullPath.split('/')
      const pathRoutesWithId = currentRoute.fullPath.split('/')
      const routeMatched = this.$route.matched

      console.log(pathRoutes)
      console.log(pathRoutesWithId)
      console.log(routeMatched)

      pathRoutes.forEach((route, index) => {
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
        if (route.startsWith(':') && route != ':category_id') {
          this.crumbs.push({
            name: this.getRouteName(currentRoute, route),
            path: pathRoutesWithId.slice(0, index + 1).join('/'),
          })
        }
        if (route == ':category_id') {
          const parents = this.getCategoriesCatItemParents(4, currentRoute.params.category_id)
          console.log(currentRoute.params.category_id)
          parents?.forEach((parent) => {
            const newPathRoutesWithId = pathRoutesWithId.map((path) => path)
            newPathRoutesWithId[newPathRoutesWithId.length - 1] = parent.id

            this.crumbs.push({
              name: parent?.pagetitle,
              path: pathRoutesWithId.join('/'),
            })
          })
        }
      })
    },
    getRouteName(currentRoute, param) {
      // console.log("Current route: ", currentRoute);
      // console.log("Current route param: ", param);
      switch (param) {
        case ':id': {
          return this.orgActive.name_short ? this.orgActive.name_short : this.orgActive.name
        }
        case ':order_id': {
          return `Заказ № ${currentRoute.params?.order_id || '-'}`
        }
        case ':action_id': {
          return this.sale.name
        }
        case ':search': {
          return `Поиск: ${this.$route.params.search}`
        }
      }
    },
    getCatItem(id, catalog = this.optCatalogWarehouse) {
      // console.log(id)
      // console.log(catalog)
      for (var i in catalog) {
        if (catalog[i].id == id) {
          return catalog[i]
        } else {
          if (Object.prototype.hasOwnProperty.call(catalog[i], 'children')) {
            let res = this.getCatItem(id, catalog[i].children)
            if (res) {
              return res
            }
          }
        }
      }
    },
    getCategoriesCatItemParents(stopId, catItemId) {
      const catItem = this.getCatItem(catItemId, this.optCatalog)
      console.log('Searched catItem', catItem)

      if (!catItem) return
      if (catItem?.parent == 0) return

      let parents = this.getAllParents(stopId, catItem, [], this.optCatalog)
      console.log('Searched catItem', parents)
      return parents
    },
    getAllParents(stopId, catItem, parents, catalog) {
      if (catItem.id == stopId) return parents
      let currParent = this.getCatItem(catItem?.parent, catalog)
      console.log(currParent)
      if (currParent) {
        parents.unshift(currParent)
        this.getAllParents(stopId, currParent, parents, catalog)
      }
      return parents
    },
  },
  watch: {
    optCatalog: function () {
      this.updateCrumbs()
    },
    orgActive: function () {
      this.updateCrumbs()
    },
  },
}
</script>
<style lang="scss"></style>
