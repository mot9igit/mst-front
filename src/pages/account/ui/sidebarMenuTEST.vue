<template>
  <nav class="sidebar__nav">
    <ul class="sidebar__list">
      <li
        class="sidebar__block sidebar__item"
        v-for="(item, index) in menu"
        :key="index"
        :class="{ 'sidebar__item--expanded': item.collapse }"
      >
        <router-link
          class="sidebar__item-button"
          :to="item.to"
          v-if="toggle"
          active-class="sidebar__item-button--active"
        >
          <div class="sidebar__item-button-content">
            <i
              class="sidebar__item-icon d-icon-cube"
              v-if="item.icon == '' || item.icon == undefined"
            ></i>
            <i class="sidebar__item-icon" v-else :class="item.icon"></i>
            <span class="sidebar__item-text">{{ item.name }}</span>
          </div>
          <i class="d-icon-angle-rounded-bottom sidebar__item-dropdown" v-if="item.children"></i>
        </router-link>
        <button class="sidebar__item-button" @click.prevent="sidebarItem(index)" v-else>
          <div class="sidebar__item-button-content">
            <i
              class="sidebar__item-icon d-icon-cube"
              v-if="item.icon == '' || item.icon == undefined"
            ></i>
            <i class="sidebar__item-icon" v-else :class="item.icon"></i>
            <span class="sidebar__item-text">{{ item.name }}</span>
          </div>
          <i class="d-icon-angle-rounded-bottom sidebar__item-dropdown" v-if="item.children"></i>
        </button>

        <ul class="sidebar__item-list" v-if="item.children">
          <li
            class="sidebar__item-list-item"
            v-for="(subitem, index) in item.children"
            :key="index"
          >
            <router-link
              class="sidebar__item-list-item-content"
              :to="subitem.to"
              @click.prevent="HideSidebar()"
            >
              <i
                class="sidebar__item-list-item-icon d-icon-doc"
                v-if="subitem.icon == '' || subitem.icon == undefined"
              ></i>
              <i class="sidebar__item-list-item-icon" v-else :class="subitem.icon"></i>
              {{ subitem.name }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'sidebarMenu',
  data() {
    return {
      menu: [],
      active: false,
      sidebarToggle: false,
    }
  },
  props: {
    toggle: {
      type: Boolean,
      default: true,
    },
    activeOrganization: {
      type: Object,
    },
  },
  mounted() {
    this.menu = this.getMenu()
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      orgs: 'org/orgs',
    }),
  },
  emits: ['sidebarToggle'],
  watch: {
    toogle: function (Newval) {
      this.sidebarToggle = Newval
    },
    orgs: function () {
      this.menu = this.getMenu()
    },
    $route() {
      this.menu = this.getMenu()
    },
  },
  methods: {
    getMenu() {
      let punkts = []
      if (this.activeOrganization.verified == 0) {
        punkts.push({
          name: 'Моя компания',
          icon: 'd-icon-company',
          collapse: this.collapsed('organization'),
          to: { name: 'organization', params: { id: this.$route.params.id } },
          children: [
            {
              name: 'Карточка компании',
              icon: 'd-icon-focus',
              to: { name: 'organization', params: { id: this.$route.params.id } },
            },
          ],
        })
      } else {
        punkts.push({
          name: 'Закупки',
          icon: 'd-icon-cube',
          collapse: this.collapsed('purchases'),
          to: { name: 'purchases', params: { id: this.$route.params.id } },
          children: [
            {
              name: 'Оптовый каталог',
              icon: 'd-icon-doc',
              to: { name: 'purchasesCatalogIndex', params: { id: this.$route.params.id } },
            },
            {
              name: 'Мои заказы',
              icon: 'd-icon-cart',
              to: { name: 'purchasesOrders', params: { id: this.$route.params.id } },
            },
            {
              name: 'Предложения',
              icon: 'd-icon-cart',
              to: { name: 'purchasesOffers', params: { id: this.$route.params.id } },
            },
            {
              name: 'Мои поставщики',
              icon: 'd-icon-cube',
              to: { name: 'purchasesVendors', params: { id: this.$route.params.id } },
            },
          ],
        })
        if (this.activeOrganization.warehouse != 0 || this.activeOrganization.vendor != 0) {
          punkts.push({
            name: 'Оптовые продажи',
            icon: 'd-icon-bag',
            collapse: this.collapsed('wholesale'),
            to: { name: 'wholesaleOrders', params: { id: this.$route.params.id } },
            children: [
              {
                name: 'Заказы',
                icon: 'd-icon-doc',
                to: { name: 'wholesaleOrders', params: { id: this.$route.params.id } },
              },
              {
                name: 'Мои предложения',
                icon: 'd-icon-cart',
                to: { name: 'wholesaleOffers', params: { id: this.$route.params.id } },
              },
              {
                name: 'Оптовые цены',
                icon: 'd-icon-cart',
                to: { name: 'wholesalePrices', params: { id: this.$route.params.id } },
              },
              {
                name: 'Клиенты',
                icon: 'd-icon-people',
                to: { name: 'wholesaleClients', params: { id: this.$route.params.id } },
              },
              // {
              //   name: 'Отгрузки',
              //   icon: 'd-icon-truck',
              //   to: { name: 'wholesaleShipments', params: { id: this.$route.params.id } },
              // },
            ],
          })
        }
        punkts.push({
          name: 'Розничные продажи',
          icon: 'd-icon-sales',
          collapse: this.collapsed('retail'),
          to: { name: 'retailOrders', params: { id: this.$route.params.id } },
          children: [
            {
              name: 'Заказы',
              icon: 'd-icon-doc',
              to: { name: 'retailOrders', params: { id: this.$route.params.id } },
            },
            {
              name: 'Акции',
              icon: 'd-icon-percent-rounded',
              to: { name: 'retailActions', params: { id: this.$route.params.id } },
            },
            {
              name: 'Баланс',
              icon: 'd-icon-wallet',
              to: { name: 'retailBalance', params: { id: this.$route.params.id } },
            },
            {
              name: 'Сопоставление товаров',
              icon: 'd-icon-shuffle',
              to: { name: 'retailCompareProducts', params: { id: this.$route.params.id } },
            },
          ],
        })
        punkts.push({
          name: 'Мой склад',
          icon: 'd-icon-boxes-2',
          collapse: this.collapsed('warehouse'),
          to: { name: 'WarehouseCollections', params: { id: this.$route.params.id } },
          children: [
            {
              name: 'Анализ склада',
              icon: 'd-icon-line-chart',
              to: { name: 'warehouseReview', params: { id: this.$route.params.id } },
            },
            {
              name: 'Коллекции товара',
              icon: 'd-icon-layers',
              to: { name: 'WarehouseCollections', params: { id: this.$route.params.id } },
            },
            // {
            //   name: 'Настройки склада',
            //   icon: 'd-icon-conveyor',
            //   to: { name: 'warehouseCustomization', params: { id: this.$route.params.id } },
            // },
          ],
        })
        punkts.push({
          name: 'Моя компания',
          icon: 'd-icon-company',
          collapse: this.collapsed('organization'),
          to: { name: 'organization', params: { id: this.$route.params.id } },
          children: [
            {
              name: 'Карточка компании',
              icon: 'd-icon-focus',
              to: { name: 'organization', params: { id: this.$route.params.id } },
            },
            {
              name: 'Сотрудники',
              icon: 'd-icon-user',
              to: { name: 'profileStuff', params: { id: this.$route.params.id } },
            },
            // {
            //   name: 'Политики доступа',
            //   icon: 'd-icon-lock-open',
            //   to: { name: 'profileAccess', params: { id: this.$route.params.id } },
            // },
          ],
        })
      }
      return punkts
    },
    sidebarItem(index) {
      this.active = this.menu[index].collapse
      if (this.active === true) {
        this.menu[index].collapse = false
      } else {
        for (let i = 0; i < this.menu.length; i++) {
          if (i != index) {
            this.menu[i].collapse = false
          } else {
            this.menu[i].collapse = true
          }
        }
      }
    },
    HideSidebar() {
      this.toogleSidebar = true
      this.$emit('sidebarToggle')
    },
    collapsed(name) {
      let active = false
      const matched = this.$route.matched
      matched.forEach((entry) => {
        if (entry.name == name) {
          active = true
        }
      })
      return active
    },
  },
}
</script>
<style lang="scss" scoped>
.sidebar__list a {
  text-align: center;
}
.sidebar:not(.sidebar--full) .sidebar__item-button.sidebar__item-button--active {
  background-color: #ededed;
  border-left-color: #f92c0d;
  box-shadow: 0px 4px 13.4px 0px rgba(0, 0, 0, 0.2588235294);
}

.sidebar__item-list-item .router-link-active {
  color: #f92c0d;
}
</style>
