<template>
  <ProfileSidebar
    :mobileCatalog="toggleMenu"
    :toggleShoppingCart="toggleShoppingCart"
    :cartBadge="cartCount"
    :mobileRequipments="mobileRequipments"
    :notificationsNoRead="notificationsNoRead"
    :mobileNotificationsShow="mobileNotificationsShow"
    @showCart="toggleCart()"
    @showNotifications="mobileNotifications()"
    @showCatalog="toggleCatalog()"
    @isMobile="mobileCatalog()"
    @showRequipment="showRequip()"
  ></ProfileSidebar>
  <div class="content">
    <ProfileHeader
      v-if="this.$route.params.id"
      @toggleCatalog="toggleCatalog"
      @toggleVendor="toggleVendor"
      @toggleCart="toggleCart"
      @showRequipments="showRequip()"
      @notifications="notificationsCol"
      @notificationsMobile="mobileNotifications()"
      :mobileRequipments="mobileRequipments"
      :active="toggleMenu"
      :mobileNotificationsShow="mobileNotificationsShow"
    ></ProfileHeader>

    <main class="main">
      <div class="content-wrapper main__content-wrapper">
        <router-view> </router-view>
      </div>
      <teleport to="body">
        <ProfileCart
          @toggleCart="toggleCart()"
          @toggleOrder="toggleOrder()"
          @catalogUpdate="catalogUpdate()"
          :active="toggleShoppingCart"
        />
      </teleport>

      <changeVendorsWindow
        :active="this.toggleVendors"
        @close="changeVendorsWindowClose()"
        @catalogUpdate="catalogUpdate()"
      />
      <teleport to="body">
        <OrderWindow
          :active="this.toggleOrderWindow"
          @close="changeOrderWindowClose()"
          @catalogUpdate="catalogUpdate()"
        />
      </teleport>
    </main>
  </div>
  <ProfileCatalogMenu
    :active="toggleMenu"
    :isMobile="mobileCatalogShow"
    @headerDesignOff="headerDesignOff"
    @menuClose="menuClose"
  />
</template>
<script>
import { computed } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import ProfileSidebar from './ui/sidebar.vue'
import ProfileHeader from './ui/header.vue'
import ProfileCatalogMenu from './ui/catalogMenu.vue'
import ProfileCart from './ui/cart.vue'
import changeVendorsWindow from './ui/changeVendorsWindow.vue'
import OrderWindow from './ui/orderWindow.vue'


export default {
  name: 'UserAccount',
  props: {
    id: {
      type: String,
      default: '',
    },
    category_id: {
      type: String,
      default: '',
    },
    search: {
      type: String,
      default: '',
    },
    requirement_id: {
      type: String,
      default: '',
    },
    action_id: {
      type: String,
      default: '',
    },
    action: {
      type: String,
      default: '',
    },
    order_id: {
      type: String,
      default: '',
    },
    store_id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      toggleMenu: false,
      toggleVendors: false,
      toggleShoppingCart: false,
      toggleOrderWindow: false,
      headerDesignChange: false,
      catalogUpdater: false,
      cartCount: 0,
      mobileCatalogShow: false,
      mobileRequipments: false,
      mobileNotificationsShow: false,
      notificationsNoRead: 0,
    }
  },
  mounted() {
    this.getSessionUser()
    this.getOrg().then((response) => {
      console.log(response)
      if (response != undefined) {
        const orgs = response.data.data
        const org = localStorage.getItem('global.organization')
        let i = 0
        if (org) {
          orgs.forEach((element, index) => {
            if (element.id == org) {
              i = index
            }
          })
        }
        if (this.$route.params.id) {
          this.getOptVendorsAvailable({
            filter: '',
            page: 1,
            perpage: this.cfg.vendors.perpage,
          }).then(() => {
            this.getOptVendorsSelected({
              filter: '',
              page: 1,
              perpage: this.cfg.vendors.perpage,
            }).then(() => {})
          })
        }
        if (this.$route.name == 'account') {
          if (orgs.length) {
            this.$router.push({ name: 'purchases', params: { id: response.data.data[i].id } })
          } else {
            this.$router.push({ name: 'OrgAdd' })
          }
        }
      }
    })
  },
  computed: {
    ...mapGetters({
      orgs: 'org/orgs',
      orgActive: 'org/orgActive',
      optVendorsAvailable: 'org/optVendorsAvailable',
      optVendorsSelected: 'org/optVendorsSelected',
      basket: 'basket/basket',
      basketWarehouse: 'basket/basketWarehouse',
    }),
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser',
      deleteUser: 'user/deleteUser',
      getSessionUser: 'user/getSessionUser',
      getOrgBasketStore: 'basket/getOrgBasketStore',
      getBasket: 'basket/getBasket',
      getOrg: 'org/getOrg',
      getOptVendorsAvailable: 'org/getOptVendorsAvailable',
      getOptVendorsSelected: 'org/getOptVendorsSelected',
    }),
    catalogUpdate() {
      this.catalogUpdater = true
      setTimeout(() => {
        this.catalogUpdater = false
      }, 500)
    },
    toggleCatalog() {
      this.toggleMenu = !this.toggleMenu
    },
    headerDesignOff() {
      this.toggleMenu = !this.toggleMenu
    },
    menuClose() {
      //console.log('close menu')
      if (this.toggleMenu) {
        this.toggleMenu = false
      }
    },
    mobileCatalog() {
      this.mobileCatalogShow = true
    },
    mobileNotifications(){
      this.mobileNotificationsShow = !this.mobileNotificationsShow
    },
    showRequip() {
      this.mobileRequipments = !this.mobileRequipments
    },
    toggleVendor() {
      this.toggleVendors = !this.toggleVendors
    },
    toggleCart() {
      this.toggleShoppingCart = !this.toggleShoppingCart
    },
    toggleOrder() {
      this.toggleShoppingCart = false
      this.toggleOrderWindow = !this.toggleOrderWindow
    },
    changeVendorsWindowClose() {
      this.toggleVendors = false
    },
    changeOrderWindowClose() {
      this.toggleOrderWindow = false
    },
    copyVersion() {
      var range = document.createRange()
      range.selectNode(document.getElementById('version'))
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
      document.execCommand('copy')
      window.getSelection().removeAllRanges()
    },
    notificationsCol(data){
      this.notificationsNoRead = data
    },
  },
  provide() {
    return {
      catalogUpdater: computed(() => this.catalogUpdater),
    }
  },
  components: {
    ProfileSidebar,
    ProfileHeader,
    ProfileCatalogMenu,
    ProfileCart,
    OrderWindow,
    changeVendorsWindow,
  },
  watch: {
    '$route.params.id': {
      handler: function () {
        if (this.$route.params.id) {
          window.location.reload()
        }
      },
    },
    $route: {
      handler: function () {
        this.toggleMenu = false
        let content = document.querySelector('main')
        content.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      },
    },
    basket: function (newVal) {
      this.cartCount = newVal.cart_data?.sku_count ? newVal.cart_data.sku_count : 0
    },
  },
}
</script>
<style lang="scss">
body {
  overflow: hidden;
  button {
    color: inherit;
  }
}
header button,
aside button {
  color: #282828;
}
.content {
  background-color: #ededed;
  max-width: calc(100% - 84px);
  .header__wrapper {
    position: relative;
    z-index: 2;
  }
  main {
    position: relative;
    z-index: 1;
  }
  @media (width > 600px) {
    .header__wrapper {
      display: block;
    }
  }
}
.text-center {
  text-align: center;
}
#app {
  .p-inputtext {
    background: #fff;
  }
  .d-modal2__actions-start {
    justify-content: flex-start;
  }
}
@media (max-width: 600px) {
  .content {
    max-width: 100%;
  }
}
</style>
