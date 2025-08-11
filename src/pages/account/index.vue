<template>
  <ProfileSidebar></ProfileSidebar>
  <div class="content">
    <ProfileHeader
      v-if="this.$route.params.id"
      @toggleCatalog="toggleCatalog"
      @toggleVendor="toggleVendor"
      @toggleCart="toggleCart"
      :active="toggleMenu"
    ></ProfileHeader>

    <main class="main">
      <div class="content-wrapper main__content-wrapper">
        <router-view> </router-view>
      </div>
      <ProfileCart
        @toggleCart="toggleCart()"
        @toggleOrder="toggleOrder()"
        :active="toggleShoppingCart"
      />
      <changeVendorsWindow :active="this.toggleVendors" @close="changeVendorsWindowClose()" />
      <OrderWindow :active="this.toggleOrderWindow" @close="changeOrderWindowClose()" />
    </main>
  </div>
  <ProfileCatalogMenu
    :active="toggleMenu"
    @headerDesignOff="headerDesignOff"
    @menuClose="menuClose"
  />
</template>
<script>
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
  },
  data() {
    return {
      toggleMenu: false,
      toggleVendors: false,
      toggleShoppingCart: false,
      toggleOrderWindow: false,
      headerDesignChange: false,
    }
  },
  mounted() {
    this.getSessionUser()
    const data = {
      action: 'get/orgs',
    }
    this.getOrg(data).then((response) => {
      if (response != undefined) {
        const org = localStorage.getItem('global.organization')
        let i = 0
        if (org) {
          const orgs = response.data.data
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
          this.$router.push({ name: 'purchases', params: { id: response.data.data[i].id } })
        }
      }
    })
  },
  computed: {
    ...mapGetters({
      orgs: 'orgs',
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
      },
    },
    $route: {
      handler: function () {
        this.toggleMenu = false
      },
    },
  },
}
</script>
<style lang="scss">
body {
  overflow: hidden;
}
header button,
aside button {
  color: #282828;
}
.content {
  background-color: #ededed;
  max-width: calc(100% - 84px);
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
</style>
