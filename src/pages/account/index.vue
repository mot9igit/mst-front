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
      v-if="this.$route.params.id && !this.$route.params.id_org_from"
      @toggleCatalog="toggleCatalog"
      @toggleVendor="toggleVendor"
      @toggleCart="toggleCart"
      @showRequipments="showRequip()"
      @notifications="notificationsCol"
      @notificationsMobile="mobileNotifications()"
      :mobileRequipments="mobileRequipments"
      :active="toggleMenu"
      :mobileNotificationsShow="mobileNotificationsShow"
      :searchUpdater="searchUpdater"
    ></ProfileHeader>
    <ProfileHeaderOffer
      v-else-if="this.$route.params.id && this.$route.params.id_org_from"
      @toggleCatalog="toggleCatalog"
      @toggleOfferVendor="toggleOfferVendor"
      @toggleCart="toggleCart"
      @showRequipments="showRequip()"
      @notifications="notificationsCol"
      @notificationsMobile="mobileNotifications()"
      @offerNow="offerVendor()"
      :mobileRequipments="mobileRequipments"
      :active="toggleMenu"
      :mobileNotificationsShow="mobileNotificationsShow"
      :offer="isOffer"
      :searchUpdater="searchUpdater"
    ></ProfileHeaderOffer>

    <main class="main">
      <div class="content-wrapper main__content-wrapper">
        <router-view> </router-view>
      </div>
      <teleport to="body">
        <ProfileCart
          v-if="this.$route.params.id && !this.$route.params.id_org_from"
          @toggleCart="toggleCart()"
          @toggleOrder="toggleOrder()"
          @catalogUpdate="catalogUpdate()"
          :active="toggleShoppingCart"
        />
        <ProfileCartOffer
          v-else-if="this.$route.params.id && this.$route.params.id_org_from"
          @toggleCart="toggleCart()"
          @toggleOrderOffer="toggleOrderOffer()"
          @catalogUpdate="catalogUpdate()"
          :active="toggleShoppingCart"
        />
      </teleport>

      <changeVendorsWindow
        :offer="isOffer"
        :active="this.toggleVendors"
        @close="changeVendorsWindowClose()"
        @catalogUpdate="catalogUpdate()"
        @vendorCheck="vendorCheck()"
      />
      <changeVendorsOfferWindow
        :offer="isOffer"
        :active="this.toggleOfferVendors"
        @close="changeVendorsOfferWindowClose()"
        @catalogUpdate="catalogUpdate()"
        @vendorCheck="vendorCheck()"
      />

      <teleport to="body">
        <OrderWindow
          :active="this.toggleOrderWindow"
          @close="changeOrderWindowClose()"
          @catalogUpdate="catalogUpdate()"
        />
        <OrderOfferWindow
          :active="this.toggleOrderOfferWindow"
          @close="changeOrderOfferWindowClose()"
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
    v-if="!this.$route.params.id_org_from"
  />
  <ProfileOfferCatalogMenu
    :active="toggleMenu"
    :isMobile="mobileCatalogShow"
    @headerDesignOff="headerDesignOff"
    @menuClose="menuClose"
    v-else
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
import ProfileHeaderOffer from './ui/headerOffer.vue'
import ProfileOfferCatalogMenu from './ui/catalogMenuOffer.vue'
import ProfileCartOffer from './ui/cartOffer.vue'
import OrderOfferWindow from './ui/orderOfferWindow.vue'
import changeVendorsOfferWindow from './ui/changeVendorsWindowOffer.vue'

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
    manager_id: {
      type: String,
      default: '',
    },
    id_org_from: {
      type: String,
      default: '',
    },
    org_w_id: {
      type: String,
      default: '',
    },
    warehouse_id: {
      type: String,
      default: '',
    },
    warehouse_cat_id: {
      type: String,
      default: '',
    },
    offer_id: {
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
      isOffer: false,
      toggleOrderOfferWindow: false,
      toggleOfferVendors: false,
      searchUpdater: false,
    }
  },
  mounted() {
    ;(function (w, d, u) {
      var s = d.createElement('script')
      s.async = true
      s.src = u + '?' + ((Date.now() / 60000) | 0)
      var h = d.getElementsByTagName('script')[0]
      h.parentNode.insertBefore(s, h)
    })(window, document, 'https://cdn-ru.bitrix24.ru/b22921142/crm/site_button/loader_7_76ynno.js')
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
        if (this.$route.matched[5] && this.$route.matched[5].name == 'WholesaleClientsOffer') {
          this.isOffer = true
        } else {
          this.isOffer = false
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
    vendorCheck() {
      this.searchUpdater = true
      setTimeout(() => {
        this.searchUpdater = false
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
    mobileNotifications() {
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
    toggleOrderOffer() {
      this.toggleShoppingCart = false
      this.toggleOrderOfferWindow = !this.toggleOrderOfferWindow
    },
    changeVendorsWindowClose() {
      this.toggleVendors = false
    },
    changeVendorsOfferWindowClose() {
      this.toggleOfferVendors = false
    },
    changeOrderWindowClose() {
      this.toggleOrderWindow = false
    },
    changeOrderOfferWindowClose() {
      this.toggleOrderOfferWindow = false
    },
    offerVendor() {
      if (this.$route.matched[5].name == 'WholesaleClientsOffer') {
        this.isOffer = true
      } else {
        this.isOffer = false
      }
    },
    toggleOfferVendor() {
      this.toggleOfferVendors = !this.toggleOfferVendors
    },
    copyVersion() {
      var range = document.createRange()
      range.selectNode(document.getElementById('version'))
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
      document.execCommand('copy')
      window.getSelection().removeAllRanges()
    },
    notificationsCol(data) {
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
    ProfileHeaderOffer,
    ProfileOfferCatalogMenu,
    ProfileCartOffer,
    OrderOfferWindow,
    changeVendorsOfferWindow,
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
    '$route.matched': function (newVal) {
      if (newVal[5] && newVal[5].name == 'WholesaleClientsOffer') {
        this.isOffer = true
      } else {
        this.isOffer = false
        this.toggleOrderOfferWindow = false
      }
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
// clients
.clients__card,
.clients__card-data,
.clients__card-right,
.clients__card-right-left,
.clients__card-right-right {
  gap: 0;
}
.clients__card-info-content {
  padding-right: 12px;
}
.clients__card-inn {
  padding-right: 12px;
  padding-left: 12px;
}
.clients__card-contact-container {
  padding-right: 12px;
  padding-left: 20px;
}
.clients__devider:before {
  content: '';
  position: absolute;
  top: calc(50% - 10px);
  right: 0;

  width: 0.5px;
  height: 20px;
  background-color: #75757575;
}
.clients__filters-input select {
  width: 100%;
}
.clients__filters-radio-wrapper
  .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover)
  .p-checkbox-box,
.clients__filters-radio-wrapper .p-checkbox-checked .p-checkbox-box,
.p-multiselect-overlay
  .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover)
  .p-checkbox-box,
.p-multiselect-overlay .p-checkbox-checked .p-checkbox-box {
  border-color: rgba(249, 44, 13, 1);
  background: rgba(249, 44, 13, 1);
}
.clients__filters-input-actions .d-icon-wrapper:hover,
.clients__filters-input-actions .d-icon-wrapper--active {
  background-color: transparent;
  box-shadow: none;
  color: var(--d-icon-wrapper-color-hover);
}
.clients__filters-input-actions button:first-child {
  cursor: default;
}
.clients__filters-input .p-multiselect {
  background: transparent;
  border: none;
}
.clients__filters-input-multiselect .clients__filters-input-actions {
  position: absolute;
  right: 20px;
}
.clients__filters-input-multiselect .p-multiselect-label {
  padding-right: 35px;
  padding-left: 0;
}
.clients__filters-input-multiselect .p-multiselect-dropdown {
  color: #757575;
}
.clients__filters-input .dart-form-group {
  width: 100%;
}
.clients__filters-input {
  max-width: 350px;
}
.page-item .page-link {
  cursor: pointer;
}
.clients__card-right-right .clients__card-action-container {
  justify-content: end;
}
.clients-form__modal .modal-content {
  max-width: 700px;
}
.clients-info__label {
  display: flex;
  align-items: center;
  margin: 40px 0;
  gap: 12px;
}
.clients-button__container {
  display: flex;
  align-items: center;
  gap: 20px;
}
.clients-button__container .clients-info__button {
  min-width: 150px;
}
.clients__card-price {
  margin-left: -8px;
}
.clients__card-vendor {
  margin-left: 12px;
}
@media (width <= 1536px) {
  .clients__card .clients__card-inn:first-child::before {
    display: none;
  }
}
@media (width <= 1280px) {
  .clients__devider:before {
    display: none;
  }
  .clients__card-vendor {
    margin-left: 170px;
  }
  .clients__card-price-container .clients__card-price:nth-child(2) {
    margin-left: 8px;
  }
}
@media (width <= 1024px) {
  .clients__card-top-right-top {
    justify-content: end;
  }
  .clients__card-vendor {
    margin-left: 0px;
  }
}
@media (width <= 600px) {
  .clients__card-bottom .clients__card-price-container {
    display: none;
  }
  .clients__card-right-left {
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding-right: 0px;
    padding-left: 0px;
  }
  .clients__card-right-left .d-col-12 {
    width: 100%;
    padding-right: 0px;
    padding-left: 0px;
  }
  .clients__card-price {
    font-size: 10px;
    padding: 4px 8px;
    height: 24px;
  }
  .clients__card-price-container {
    justify-content: space-between;
  }
  .clients__card-price {
    margin-left: 0px;
    margin-right: 0px;
    min-width: calc(50% - 4px);
    justify-content: center;
  }
  .clients__card-price-container .clients__card-price:nth-child(2) {
    margin-left: 0px;
  }
  .clients__card-right-right {
    width: 100%;
  }
}
// order wholesale
.d-badge2 {
  background: #282828;
  border-radius: 41px;
  padding: 3px 12px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #ededed;
  min-height: 24px;
  min-width: 146px;
}
.order-card__ordercomment-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.order-card__ordercomment {
  margin: 0px 9% 0px 0;
}
.product-card-actions-product__modal-all-button {
  margin: 40px auto 0;
}
.product-card-actions-product__modal-all .product-card__seller {
  cursor: auto;
}
.product-card-actions-product__modal-all .product-card__price-container-all {
  width: 100%;
}
@media (width <= 1280px) {
  .shipments.optorder__content .d-top-order-container {
    align-items: start;
  }
}
// retail orders
.retailorders__content .dart-row {
  justify-content: end;
}
.retailorders__content .dart-mb-1 {
  margin-bottom: 40px;
}
.retailorders__content .p-inputtext {
  width: 100%;
}
.retailorders__content .form_input_group:after {
  content: '\e003';
  font-family: 'Iconly' !important;
  position: absolute;
  font-size: 16.8px;
  top: calc(50% - 8.4px);
  right: 20px;
}
.retailorders__content .p-inputtext {
  padding-right: 40px;
  box-shadow: none;
  border: 0.2px solid #75757575;
}
.retailorders__content .p-inputtext:enabled:focus {
  border-color: #f92c0d;
}
.retailorders__content .p-floatlabel:has(input:focus) label,
.retailorders__content .p-floatlabel:has(input:-webkit-autofill) label,
.retailorders__content .p-floatlabel:has(textarea:focus) label,
.retailorders__content .p-floatlabel:has(.p-inputwrapper-focus) label {
  color: #f92c0d;
}
.retailorders__content .d-table__col,
.retailorders__content .d-table__row:first-child > .d-table__col {
  padding: 16px;
}
.nowrap a,
.nowrap {
  white-space: nowrap;
}
// retail order
.codeWindow {
  .modal__title {
    margin: 24px 48px 0 0;
  }
  .modal__content {
    padding-bottom: 0;
  }
  .modal-content {
    max-width: 344px;
    img {
      max-width: 70px;
    }
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .p-inputotp {
        justify-content: center;
      }
      .p-inputtext {
        border: 1px solid #757575;
      }
    }
    .buttons-container {
      width: 100%;
      text-align: center;
      margin-top: 24px;
      .d-button {
        display: inline-block;
        box-shadow: none;
      }
    }
  }
}
// purchases order
.v-table-min-product {
  display: none;
}
.order-card__modal button {
  margin: 20px auto;
}
.order-card__modal h3 {
  margin-bottom: 40px;
  margin-top: -5px;
}
.order-card__modal-cansel .modal-content,
.order__edit-modal .modal-content {
  max-width: 600px;
}
.order-card__repeat {
  padding: 8px 23px;
  gap: 8px;
}
.order-card__repeat .item-list-item-icon {
  font-size: 18px;
  font-weight: 600;
}
.order-card__docs {
  margin-bottom: 16px;
}
.d-top-order-container-date-created-hidden.d-top-order-container-date-created {
  display: none;
}
.order-card__orderinfo-grid-text-down p {
  margin-top: 4px;
}
.d-order-container h3 {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  color: #757575;
  margin: 40px 0 24px;
}

@media (width <= 3000px) {
  .d-top-order-container-buttons-order_text.d-top-order-container-buttons-text p {
    max-width: 350px;
    color: #75757575;
  }
}
.d-button-quaternary:disabled {
  cursor: default;
  background-color: #75757540;
  color: #75757599;
  font-weight: 600;
}
.d-button--sm-shadow:disabled {
  box-shadow: none;
}
.d-top-order-container-buttons {
  align-items: center;
}
.order-card__action-edit {
  padding-left: 8px;
  padding-right: 8px;
  position: relative;
  font-size: 18px;
  color: #757575;
  display: flex;
  align-items: center;
}
.order-card__action-edit:before {
  content: '';
  background-color: rgb(117 117 117 / 30%);
  width: 0.5px;
  height: 13px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-50%, -50%);
}
.order-card__cancel i {
  transform: rotate(45deg);
  font-size: 18px;
}
.order-card__docs .item-list-item-icon {
  font-size: 20px;
  font-weight: 600;
}
.order-card__modal button {
  min-width: 111px;
}
// grids
.order-card__orderinfo-line2 .order-card__orderinfo-grid {
  display: none;
}
.order-card__orderinfo-grid {
  height: 100%;
  align-items: start;
  grid-template-rows: auto 100%;
}
.order-card__orderinfo-line1 {
  display: grid;
  grid-template-columns: 139fr 149fr 400fr 400fr 150fr 150fr 134fr;
  grid-template-rows: 100%;
  grid-row-gap: 24px;
  align-items: start;
}
.order-card__orderinfo-line2 {
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  align-items: start;
  gap: 8px;
}
.order-card__ordercomment {
  display: grid;
  width: 90%;
}
.order-card__orderinfo-grid:first-child {
  padding-left: 0;
}
.order-card__orderinfo-grid:not(:first-child) {
  border-left: 0.5px solid #75757575;
}
//
.d-top-order-container-left-top {
  display: flex;
  gap: 16px;
  align-items: center;
}
.d-top-order-container-left {
  flex-direction: column;
  gap: 16px;
}
.d-top-order-container-date-created {
  margin-top: 0px;
}
.d-top-order-container-left-top .d-badge2 {
  border-radius: 41px;
  padding: 7px 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #ededed;
  min-height: 32px;
  min-width: auto;
}
@media (width <= 1536px) {
  .d-top-order-container-left {
    gap: 8px;
  }
  .shipments .d-top-order-container {
    align-items: center;
  }
  .d-order-container h3,
  .d-top-order-container-info h3 {
    font-size: 16px;
    line-height: 18px;
    margin: 24px 0;
  }
  // grids
  .order-card__orderinfo-grid,
  .order-card__ordercomment {
    padding: 0 18px !important;
    margin: 0 0 0 0 !important;
    width: 100% !important;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:first-child {
    padding-left: 0px !important;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(-n) {
    display: none;
  }
  .order-card__orderinfo-line1.order-card__orderinfo {
    display: grid;
    grid-template-columns: 147fr 196fr 327fr 327fr 178fr;
    grid-template-rows: auto;
    grid-row-gap: 24px;
  }
  .order-card__orderinfo-grid-lable {
    height: min-content;
  }
  .order-card__orderinfo-line2.order-card__orderinfo {
    display: grid;
    grid-template-columns: 178fr 189fr 905fr;
    grid-template-rows: auto;
    grid-row-gap: 0px;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(6) {
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(7) {
    display: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(2) {
    display: inline-grid;
    border-left: none;
    padding-left: 0 !important;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(3) {
    display: inline-grid;
  }
  .order-card__ordercomment {
    display: grid;
    padding-left: 18px;
    border-left: 0.5px solid #75757575;
    grid-column-start: auto;
    grid-column-end: auto;
  }
  .order-card__orderinfo-grid:first-child {
    padding-left: 0;
  }
  .order-card__orderinfo-grid:not(:first-child) {
    border-left: 0.5px solid #75757575;
  }
  //
  .d-top-order-container h2 {
    font-size: 20px;
  }
  .d-top-order-container-buttons button {
    height: 38px;
    min-height: 38px;
    max-height: 38px;
  }
  .d-top-order-container-left-top .d-badge2 {
    border-radius: 41px;
    padding: 6px 16px;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #ededed;
    min-height: 30px;
    min-width: auto;
  }
  .order-card__orderinfo-grid-text {
    margin-top: 8px;
  }
  .order-card__ordercomment-container {
    gap: 8px !important;
  }
}
@media (width <= 1280px) {
  .shipments .d-top-order-container {
    align-items: end;
  }
  .order-card__orderinfo-grid-text-down-min,
  .order-card__orderinfo-grid-text-down,
  .order-card__ordercomment-container div {
    font-size: 12px;
    font-weight: 400;
  }
  .order-card__orderinfo-grid-text-down,
  .order-card__orderinfo-grid-text {
    margin-top: 8px;
  }
  .order-card__orderinfo-grid-text-down b {
    margin-bottom: 8px;
  }
  // grids
  .order-card__orderinfo-grid,
  .order-card__ordercomment {
    padding: 0 22px !important;
  }
  .order-card__orderinfo-grid,
  .order-card__ordercomment {
    padding: 0 22px !important;
    margin: 0 0 0 0 !important;
    width: 100% !important;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:first-child {
    padding-left: 0px !important;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(-n) {
    display: none;
  }
  .order-card__orderinfo-line1.order-card__orderinfo {
    display: grid;
    grid-template-columns: 102fr 184fr 274fr 274fr 173fr;
    grid-template-rows: auto;
    grid-row-gap: 24px;
  }
  .order-card__orderinfo-grid-lable {
    height: min-content;
  }
  .order-card__orderinfo-line2.order-card__orderinfo {
    display: grid;
    grid-template-columns: 162fr 180fr 666fr;
    grid-template-rows: auto;
    grid-row-gap: 0px;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(6) {
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(7) {
    display: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(2) {
    display: inline-grid;
    border-left: none;
    padding-left: 0 !important;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(3) {
    display: inline-grid;
  }
  .order-card__ordercomment {
    display: grid;
    padding-left: 22px;
    border-left: 0.5px solid #75757575;
    grid-column-start: auto;
    grid-column-end: auto;
  }
  //
  .d-top-order-container h2 {
    font-size: 16px;
  }
  .d-top-order-container-buttons button {
    height: 31px;
    min-height: 31px;
    max-height: 31px;
  }
  .d-top-order-container-left-top .d-badge2 {
    border-radius: 41px;
    padding: 4px 10px;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #ededed;
    min-height: 24px;
    min-width: auto;
  }
  .d-top-order-container-buttons {
    gap: 8px;
  }
}
@media (width <= 1024px) {
  .d-top-order-container-left-top .d-badge2 {
    padding: 3px 8px;
    font-size: 9px;
    line-height: 11px;
    min-height: 18px;
    max-height: 18px;
  }
  .shipments button span {
    font-size: 10px;
  }
  .order-card__cancel i {
    font-size: 12px;
  }
  .order-card__repeat .item-list-item-icon {
    font-size: 12px !important;
  }
  .order-card__docs .item-list-item-icon {
    font-size: 15px;
  }
  .order-card__action-edit i {
    font-size: 13px;
  }
  .d-top-order-container-left {
    gap: 8px;
  }
  .order-card__action-edit {
    color: #282828;
  }
}
@media (width <= 800px) {
  .d-top-order-container h2 {
    font-size: 14px;
  }
  .d-top-order-container-left-top .order-card__status {
    font-size: 9px !important;
  }
  .d-top-order-container-date-created {
    font-size: 12px;
    margin-top: 0px;
  }
  .order_content .d-top-order-container {
    flex-direction: row;
    align-items: end;
  }
  .order_content .d-top-order-container-buttons button,
  .shipments .d-badge2 {
    height: 20px;
    max-height: 20px;
    min-height: 20px;
  }
  .d-order-container .dart-row {
    margin-top: -32px !important;
  }
  // grids
  .order-card__orderinfo-grid {
    padding: 0 10px !important;
    margin: 0 0 0 0 !important;
    width: 100% !important;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:first-child {
    padding-left: 0px !important;
  }
  .order-card__orderinfo-line1.order-card__orderinfo {
    display: grid;
    grid-template-columns: 70fr 150fr 180fr 231fr;
    grid-template-rows: auto;
    grid-row-gap: 24px;
  }
  .order-card__orderinfo-grid-lable {
    height: min-content;
  }
  .order-card__orderinfo-line2.order-card__orderinfo {
    display: grid;
    grid-template-columns: 190fr 305fr 515fr;
    grid-template-rows: auto auto;
    grid-row-gap: 24px;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(5) {
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(6) {
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(7) {
    display: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:first-child {
    display: inline-grid;
    border-left: none;
    padding-left: 0 !important;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(2) {
    display: inline-grid;
    border-left: 1px solid #75757575;
    padding-left: 10px !important;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(3) {
    display: inline-grid;
  }
  .order-card__ordercomment {
    display: grid;
    padding: 0px !important;
    border-left: none;
    grid-column-start: 1;
    grid-column-end: 4;
  }
  //
  .order-card__orderinfo-grid-lable {
    font-size: 10px;
    line-height: 12px;
  }
  .d-top-order-container-info h3,
  .d-order-container h3 {
    font-size: 14px;
    line-height: 16px;
  }
  .order-card__orderinfo-grid-text {
    font-size: 12px;
    line-height: 14px;
  }
  .order-card__orderinfo-grid-text-down {
    font-size: 10px;
    line-height: 12px;
  }
  .order-card__orderinfo-grid-text-down-min,
  .order-card__ordercomment-container div {
    font-size: 10px;
  }
}
@media (width <= 780px) {
  .v-table-min-product {
    display: block;
  }
  .v-table {
    display: none;
  }
  .d-top-order-container {
    flex-direction: column !important;
    justify-content: center;
    align-items: start !important;
    gap: 8px;
    padding-bottom: 30px !important;
  }
  .order-card__orderinfo {
    padding-bottom: 16px;
  }
  .d-top-order-container-left {
    flex-direction: row;
    gap: 8px;
  }
  .d-top-order-container-date-created-hidden.d-top-order-container-date-created {
    display: flex;
  }
  .d-top-order-container-date-created:not(.d-top-order-container-date-created-hidden) {
    display: none;
  }
  .d-top-order-container-left-top .d-badge2 {
    height: 16px;
    max-height: 16px;
    min-height: 16px;
  }
  .order_content .d-top-order-container-buttons button {
    height: 18px;
    max-height: 18px;
    min-height: 18px;
    font-size: 9px;
    padding: 3px 8px;
    gap: 8px;
  }
  .order-card__action-edit {
    padding-left: 0 !important;
  }
  .d-top-order-container-info h3,
  .d-order-container h3 {
    font-size: 10px;
    line-height: 12px;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  // grids
  .order-card__orderinfo-grid {
    padding: 0 8px !important;
    margin: 0 0 0 0 !important;
    width: 100% !important;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:first-child {
    padding-left: 0px !important;
  }
  .order-card__orderinfo-line1.order-card__orderinfo {
    display: grid;
    grid-template-columns: 78fr 86fr 158fr 150fr;
    grid-template-rows: auto;
    grid-row-gap: 16px;
  }
  .order-card__orderinfo-grid-lable {
    height: min-content;
  }
  .order-card__orderinfo-line2.order-card__orderinfo {
    display: grid;
    grid-template-columns: 76fr 86fr 116fr 194fr;
    grid-template-rows: auto;
    grid-row-gap: 0px;
    gap: 0;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(5) {
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(6) {
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(7) {
    display: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:first-child {
    display: inline-grid;
    border-left: none;
    padding-left: 0 !important;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(2) {
    display: inline-grid;
    border-left: 1px solid #75757575;
    padding-left: 10px !important;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(3) {
    display: inline-grid;
  }
  .order-card__ordercomment {
    display: inline-grid;
    padding-left: 8px !important;
    border-left: 1px solid #75757575;
    grid-column-start: auto;
    grid-column-end: auto;
  }
  //
  .order-card__orderinfo-grid-lable {
    font-size: 7px;
    line-height: 9px;
  }
  .order-card__orderinfo-grid-text-down,
  .order-card__orderinfo-grid-text {
    margin-top: 4px;
  }
  .order-card__orderinfo-grid-text,
  .order-card__orderinfo-grid-text-down {
    font-size: 8px;
    line-height: 10px;
  }
  .order-card__orderinfo-grid-text-down p,
  .order-card__orderinfo-grid-text-down-min,
  .order-card__ordercomment-container div {
    font-size: 7px;
    line-height: 9px;
  }
  .order-card__ordercomment-container {
    gap: 4px !important;
  }
}
@media (width <= 600px) {
  .d-top-order-container {
    position: relative;
  }
  .d-top-order-container {
    border-bottom: none;
    padding-bottom: 40px !important;
  }
  .d-top-order-container-left-top {
    flex-direction: column;
    gap: 8px;
    align-items: start;
    justify-content: center;
  }
  .d-top-order-container-date-created {
    padding-bottom: 0;
    font-size: 14px;
  }
  .d-top-order-container h2 {
    font-size: 16px;
  }
  .order_content .d-top-order-container-left-top .d-badge2 {
    height: 24px;
    max-height: 24px;
    min-height: 24px;
    font-size: 12px !important;
    width: auto !important;
  }
  .order-card__action-edit {
    padding-right: 0 !important;
  }
  .order-card__action-edit:before {
    display: none;
  }
  .order-card__action-edit {
    position: absolute;
    top: 0;
    right: 0;
    width: min-content !important;
    padding: 0 !important;
    align-items: start;
  }
  .order_content .d-top-order-container-buttons button {
    height: 32px;
    max-height: 32px;
    min-height: 32px;
    font-size: 12px !important;
    padding: 8px;
    gap: 8px;
  }
  .order_content button span {
    font-size: 12px;
  }
  .order_content .d-top-order-container-buttons button:not(.order-card__action-edit) {
    width: 100%;
  }
  .d-top-order-container-buttons {
    flex-direction: column-reverse;
  }
  .d-top-order-container-info h3 {
    font-size: 16px;
    line-height: 18px;
    margin-top: 0;
    margin-bottom: 16px;
  }
  .d-order-container h3 {
    font-size: 16px;
    line-height: 18px;
    margin-top: 40px;
    margin-bottom: 32px;
  }
  // grids -> flex
  .order-card__orderinfo-grid {
    margin: 0 0 0 0 !important;
    width: 100% !important;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:first-child {
    padding-left: 0px !important;
  }
  .order-card__orderinfo-line1.order-card__orderinfo {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 0;
    padding-bottom: 0;
  }
  .order-card__orderinfo-grid-lable {
    height: min-content;
  }
  .order-card__orderinfo-line2.order-card__orderinfo {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 0;
    padding-bottom: calc(40px - 16px);
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(5) {
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(6) {
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(7) {
    display: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:first-child {
    display: block;
    border-left: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(2) {
    display: block;
    border-left: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(3) {
    display: block;
    border-left: none;
  }
  .order-card__ordercomment {
    display: block;
  }
  .order-card__orderinfo-grid,
  .order-card__ordercomment {
    border-left: none;
    padding: 16px 0px !important;
  }
  .order-card__orderinfo-grid:not(:first-child) {
    border-left: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(2) {
    padding-left: 0 !important;
  }
  //
  .order-card__orderinfo-grid-lable,
  .order-card__ordercomment-container .order-card__orderinfo-grid-lable {
    font-size: 12px;
    line-height: 14px;
  }
  .order-card__orderinfo-grid-text,
  .order-card__orderinfo-grid-text-down {
    font-size: 16px;
    line-height: 18px;
  }
  .order-card__orderinfo-grid-text-down p,
  .order-card__orderinfo-grid-text-down-min,
  .order-card__ordercomment-container div {
    font-size: 16px;
    line-height: 18px;
  }
  .order-card__orderinfo-grid-text {
    margin-top: 8px;
  }
  .order-card__ordercomment-container {
    gap: 8px !important;
  }
  .order-card__orderinfo-grid-text-down-min,
  .order-card__orderinfo-grid-text-down {
    margin-top: 4px;
  }
  .optorder__content .d-top-order-container-left .order-card__status {
    height: 24px;
    max-height: 24px;
    min-height: 24px;
    font-size: 12px !important;
  }
}
@media (width <= 320px) {
  .v-table-min-product {
    width: calc(100% + 56px);
    margin-left: -28px;
  }
  .d-table-min-product__row {
    padding: 16px 28px;
  }
}
// purchases orders
.myorders__content .dart-row {
  justify-content: end;
  margin-top: -39px;
}
.myorders__content .dart-mb-1 {
  margin-bottom: 40px;
}
.myorders__content .p-inputtext {
  width: 100%;
}
.myorders__content .form_input_group:after {
  content: '\e01d';
  font-family: 'Iconly' !important;
  position: absolute;
  font-size: 16.8px;
  top: calc(50% - 8.4px);
  right: 20px;
  color: #757575;
}
.myorders__content .p-inputtext {
  padding-right: 40px;
  box-shadow: none;
  border: 0.2px solid #75757575;
}
.myorders__content .p-inputtext:enabled:focus {
  border-color: #f92c0d;
}
.myorders__content .p-floatlabel:has(input:focus) label,
.myorders__content .p-floatlabel:has(input:-webkit-autofill) label,
.myorders__content .p-floatlabel:has(textarea:focus) label,
.myorders__content .p-floatlabel:has(.p-inputwrapper-focus) label {
  color: #f92c0d;
}
.myorders__content .d-table__col,
.myorders__content .d-table__row:first-child > .d-table__col {
  padding: 16px;
}
.cell_org-data .multyitem_cell {
  width: fit-content;
  padding: 0;
  margin: 0;
  display: inline-block;
  margin-right: 3px;
}
.cell_org-data .multyitem_cell:first-child::after {
  content: ',';
  position: relative;
}
.cell_initiatior-data .multyitem_cell {
  display: block;
}
.cell_initiatior-data .multyitem_cell:last-child span::before {
  content: '(';
  position: relative;
}
.cell_initiatior-data .multyitem_cell:last-child span::after {
  content: ')';
  position: relative;
}
.cell_data-label {
  display: none;
}
//--фиксированная ширина для колонок
.orders_table .d-table__col:first-child {
  width: 5%;
  min-width: 5%;
  max-width: 5%;
}
.orders_table .d-table__col:nth-child(2) {
  width: 7%;
  min-width: 7%;
  max-width: 7%;
}
.orders_table .d-table__col:nth-child(3),
.orders_table .d-table__col:nth-child(4) {
  width: 18%;
  min-width: 18%;
  max-width: 18%;
}
.orders_table .d-table__col:nth-child(4) {
  width: 16%;
  min-width: 16%;
  max-width: 16%;
}
.orders_table .d-table__col:nth-child(5) {
  width: 12%;
  min-width: 12%;
  max-width: 12%;
}
.orders_table .d-table__col:nth-child(6) {
  width: 10%;
  min-width: 10%;
  max-width: 10%;
}
.orders_table .d-table__col:last-child {
  width: 22%;
  min-width: 22%;
  max-width: 22%;
}
//
.d-top-order-container-buttons button {
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  margin: 0 0 0 0;
  box-shadow: none;
}
.cell_order-status div {
  white-space: pre-wrap;
  width: fit-content;
  margin: 0 auto;
}
.cell_order-status .cell--status {
  font-size: 14px;
  line-height: 16px;
  padding: 4px 12px;
}
.orders_table .v-table-min {
  display: none;
}
@media (width <= 3000px) {
  .shipments .d-top-order-container {
    align-items: end;
    min-height: 0;
    height: auto;
    padding-bottom: 22.5px;
  }
  .d-top-order-container-info h3 {
    margin: 24px 0;
  }
  .order-card__orderinfo-grid-text-down-min {
    font-size: 14px;
    font-weight: 300;
  }
  .d-top-order-container-info h3 {
    margin-top: 24px;
    margin-bottom: 24px;
  }
  .optorder__content .dart-mb-1 {
    margin-bottom: 0;
  }
}
@media (width <= 1536px) {
  .shipments h1 {
    font-size: 20px;
  }
  .shipments .d-table__col {
    font-size: 12px;
  }
  .cell_order-status .cell--status {
    font-size: 12px;
    line-height: 14px;
    padding: 2px 12px;
  }
  //--фиксированная ширина для колонок
  .orders_table .d-table__col:first-child {
    width: 4%;
    min-width: 4%;
    max-width: 4%;
  }
  .orders_table .d-table__col:nth-child(2) {
    width: 6%;
    min-width: 6%;
    max-width: 6%;
  }
  .orders_table .d-table__col:nth-child(3),
  .orders_table .d-table__col:nth-child(4) {
    width: 15%;
    min-width: 15%;
    max-width: 15%;
  }
  .orders_table .d-table__col:nth-child(4) {
    width: 18%;
    min-width: 18%;
    max-width: 18%;
  }
  .orders_table .d-table__col:nth-child(5) {
    width: 13%;
    min-width: 13%;
    max-width: 13%;
  }
  .orders_table .d-table__col:nth-child(6) {
    width: 13%;
    min-width: 13%;
    max-width: 13%;
  }
  .orders_table .d-table__col:last-child {
    width: 16%;
    min-width: 16%;
    max-width: 16%;
  }
  //
}
@media (width <= 1280px) {
  .shipments h1 {
    font-size: 16px;
  }
  .shipments .d-table__col {
    font-size: 10px;
  }
  .shipments .d-table__head-col {
    font-size: 12px;
  }
  .shipments .p-inputtext {
    padding-block: 7px;
    font-size: 12px;
  }
  .shipments .p-floatlabel label {
    font-size: 12px;
  }
  .shipments .form_input_group:after {
    top: calc(50% - 10.4px) !important;
    right: 20px !important;
  }
  .shipments .dart-row {
    margin-top: -24px !important;
  }
  .cell_order-status span {
    font-size: 10px !important;
  }
  .shipments .d-top-order-container-buttons button {
    height: 32px;
    max-height: 32px;
    min-height: 32px;
  }
  .shipments button span {
    font-size: 14px;
  }
  .cell_order-status .cell--status {
    font-size: 10px;
    line-height: 11px;
    padding: 4px 8px;
  }
  //--фиксированная ширина для колонок
  .orders_table .d-table__col:first-child {
    width: 3%;
    min-width: 3%;
    max-width: 3%;
  }
  .orders_table .d-table__col:nth-child(2) {
    width: 5%;
    min-width: 5%;
    max-width: 5%;
  }
  .orders_table .d-table__col:nth-child(3),
  .orders_table .d-table__col:nth-child(4) {
    width: 14%;
    min-width: 14%;
    max-width: 14%;
  }
  .orders_table .d-table__col:nth-child(4) {
    width: 14%;
    min-width: 14%;
    max-width: 14%;
  }
  .orders_table .d-table__col:nth-child(5) {
    width: 8%;
    min-width: 8%;
    max-width: 8%;
  }
  .orders_table .d-table__col:nth-child(6) {
    width: 9%;
    min-width: 9%;
    max-width: 9%;
  }
  .orders_table .d-table__col:last-child {
    width: 33%;
    min-width: 33%;
    max-width: 33%;
  }
  //
  .d-table__footer-right-pagination {
    display: flex;
  }
}
@media (width <= 1024px) {
  .shipments .d-table__col {
    font-size: 9px;
  }
  .shipments .d-table__head-col {
    font-size: 10px;
  }
  .shipments .p-inputtext {
    padding-block: 5px;
    font-size: 9px;
  }
  .shipments .p-floatlabel label {
    font-size: 9px;
  }
  .shipments .form_input_group:after {
    top: calc(50% - 6.4px) !important;
    right: 16px !important;
    font-size: 12px !important;
  }
  .shipments .dart-row {
    margin-top: -24px !important;
  }
  .cell_order-status span {
    font-size: 9px !important;
    color: #282828;
  }
  .shipments .dart-mb-1 {
    margin-bottom: 32px !important;
  }
  .cell_order-status .cell--status {
    font-size: 8px;
    line-height: 9px;
    padding: 2px 6.5px;
  }
  //--фиксированная ширина для колонок
  .orders_table .d-table__col:first-child {
    width: 2%;
    min-width: 2%;
    max-width: 2%;
  }
  .orders_table .d-table__col:nth-child(2) {
    width: 4%;
    min-width: 4%;
    max-width: 4%;
  }
  .orders_table .d-table__col:nth-child(3),
  .orders_table .d-table__col:nth-child(4) {
    width: 15%;
    min-width: 15%;
    max-width: 15%;
  }
  .orders_table .d-table__col:nth-child(4) {
    width: 15%;
    min-width: 15%;
    max-width: 15%;
  }
  .orders_table .d-table__col:nth-child(5) {
    width: 8%;
    min-width: 8%;
    max-width: 8%;
  }
  .orders_table .d-table__col:nth-child(6) {
    width: 8%;
    min-width: 8%;
    max-width: 8%;
  }
  .orders_table .d-table__col:last-child {
    width: 33%;
    min-width: 33%;
    max-width: 33%;
  }
  //
  .shipments .order-card__ordercomment-container {
    font-size: 10px;
  }
  .shipments .d-top-order-container-buttons button {
    height: 24px;
    max-height: 24px;
    min-height: 24px;
  }
  .shipments button span {
    font-size: 12px;
  }
  .order-card__repeat .item-list-item-icon {
    font-size: 14px !important;
  }
}
@media (width <= 850px) {
  .myorders__content .d-table__head-col:last-child span {
    display: none;
  }
  .myorders__content .d-table__head-col:last-child::before {
    display: none;
  }
  .myorders__content .d-table__col:last-child {
    display: flex;
    justify-content: start;
    align-items: end;
    position: absolute;
    bottom: 0;
    left: 0;
    width: auto;
    height: 58px;
  }
  .myorders__content .d-table__row:first-child .d-table__col:last-child {
    margin-top: 58px;
  }
  .cell_data-label {
    display: block;
    color: #757575;
  }
  .myorders__content .d-table__col:last-child:before {
    display: none;
  }
  .myorders__content .d-table-html-text {
    text-align: left;
    height: 58px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: start;
    justify-content: end;
    padding-left: 10px;
  }
  .myorders__content .d-table__row-padding .d-table__col:not(:last-child),
  .myorders__content .d-table__row-padding.d-table__row:first-child .d-table__col {
    padding-bottom: 68px;
  }
  .myorders__content .d-table__row-padding.d-table__row:first-child .d-table__col:last-child {
    bottom: -58px;
    padding-bottom: 68px;
  }
  .d-table__row-padding .d-table__col:not(:first-child)::before {
    top: 31% !important;
  }
  .d-table__row-padding.d-table__row:first-child .d-table__col:not(:first-child)::before {
    top: 31% !important;
  }
  //--фиксированная ширина для колонок
  .orders_table .d-table__col:first-child {
    width: auto;
    min-width: auto;
    max-width: auto;
  }
  .orders_table .d-table__col:nth-child(2) {
    width: auto;
    min-width: auto;
    max-width: auto;
  }
  .orders_table .d-table__col:nth-child(3),
  .orders_table .d-table__col:nth-child(4) {
    width: auto;
    min-width: auto;
    max-width: auto;
  }
  .orders_table .d-table__col:nth-child(4) {
    width: auto;
    min-width: auto;
    max-width: auto;
  }
  .orders_table .d-table__col:nth-child(5) {
    width: auto;
    min-width: auto;
    max-width: auto;
  }
  .orders_table .d-table__col:nth-child(6) {
    width: auto;
    min-width: auto;
    max-width: auto;
  }
  .orders_table .d-table__col:last-child {
    width: 80%;
    min-width: 80%;
    max-width: 80%;
  }
  .orders_table .d-table__head-col:nth-child(7) {
    padding-right: 0 !important;
  }
  .orders_table .d-table__head-col:last-child {
    padding-left: 0 !important;
    padding-right: 24px !important;
  }
  //
}
@media (width <= 800px) {
  .shipments .d-top-order-container {
    flex-direction: column;
    align-items: start;
  }
  .shipments .d-top-order-container-buttons button,
  .shipments .d-badge2 {
    height: 20px;
    max-height: 20px;
    min-height: 20px;
  }
  .shipments button span {
    font-size: 10px;
  }
}
@media (width <= 700px) {
  .orders_table .v-table-min {
    display: block;
  }
  .orders_table .v-table {
    display: none;
  }
  /* .v-table-min .cell_value .multyitem_cell:first-child{
    float: left;
    width: max-content;
    margin-right: 4px;
  } */
}
@media (width <= 600px) {
  .d-top-order-container-right {
    width: 100%;
  }
  .d-top-order-container-buttons {
    flex-direction: column;
  }

  .shipments button span {
    font-size: 14px;
  }
  .shipments h1 {
    font-size: 14px;
  }
  .v-table-min .dart-row {
    margin-bottom: 16px !important;
  }
  .v-table-min .d-col-xl-6.d-col-md-4 {
    padding: 0;
  }
  .shipments .v-table-min .p-inputtext {
    padding-block: 11.6px;
    font-size: 12px;
  }
  .shipments .v-table-min .p-floatlabel label {
    font-size: 12px;
    color: #757575;
  }
  .shipments .v-table-min .form_input_group:after {
    top: calc(50% - 6.4px);
    right: 16px;
    font-size: 12px;
  }
  .d-table-min {
    width: calc(100% + 16px);
    margin-left: 0px;
  }
  .d-table-min .d-table-min__row {
    padding: 24px 16px;
  }
  .orders_table .d-table__wrapper {
    width: calc(100% + 32px);
    margin-left: -16px;
    overflow: visible;
  }
  .d-table-min__header {
    padding-bottom: 8px;
  }
  .d-table-min__col-id {
    font-size: 16px;
    line-height: 21px;
  }
  .d-table-min__row .d-table-min__col-simple {
    padding-bottom: 8px;
  }
  .d-table-min__row .d-table-min__col-simple:nth-child(2) {
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 8px;
    border-top: 1px solid #75757575;
    padding-top: 12px;
  }
  .d-table-min__row .d-table-min__col-simple {
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 8px;
    border-top: 1px solid #75757575;
    padding-top: 12px;
  }
  .cell_value-label {
    width: 100%;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }
  .d-table-min__row .item_cell,
  .d-table-min__row .multyitem_cell {
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    width: 100%;
    text-align: left;
  }
  .d-table-min__col-simple-html .item_cell,
  .d-table-min__col-comment .item_cell {
    font-weight: 400 !important;
  }
  .d-table-min__col-status span {
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    padding: 3px 7.5px;
    border-radius: 20px;
  }

  .d-table-min__head {
    width: calc(100% - 34px);
    margin: 0 0 0 16px;
    height: 40px;
  }
  .d-table-min__row-sort {
    width: 100%;
  }
  .d-table-min__row-sort-label {
    width: 100%;
    justify-content: space-between;
    padding: 16px 16px 16px 12px;
    box-shadow: none;
    border: 0.2px solid rgba(117, 117, 117, 0.4588235294);
    border-radius: 6px;
    height: 40px;
  }
  .d-table-min__row-sort-label {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #757575;
    background: #ffffff;
  }
  .d-table-min__row-sort-list {
    gap: 16px;
    padding: 12px 16px;
    position: absolute;
    width: 100%;
    max-width: calc(100% - 16px);
    height: auto;
    right: 0px;
    top: 40px;
    background: #fff;
    box-shadow:
      0px 8px 16px rgba(0, 0, 0, 0.14),
      0px 0px 2px rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    z-index: 10;
  }
  .d-table-min__row-sort-list-item label {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #757575;
  }
  .d-table-min__head-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
@media (width <= 320px) {
  .d-table-min {
    width: calc(100% + 16px);
    margin-left: -8px;
  }
  .d-table-min .d-table-min__row {
    padding: 24px 20px;
  }
  .d-table-min__head {
    width: calc(100% - 34px);
    margin: 0 0 0 24px;
    height: 40px;
  }
}
// wholesale prices
.wholesaleprices {
  .v-table {
    margin-top: 24px;
  }
  .dart-form-group {
    margin-bottom: 0;
  }
  .ml-2 {
    margin-left: 8px;
  }
}
.d-flex {
  display: flex;
}
.d-flex-end {
  justify-content: end;
}
.d-gap-12 {
  gap: 12px;
}
.d-inline-block {
  display: inline-block;
  width: auto;
}
.promotions__card-collection-tabs-wrapper {
  overflow: hidden;
}
.d-button-wholesaleprices {
  width: auto;
}
// warehouse review
/* восстановить, если появляется возможность удалить склад
.warehouse-analysis__table .d-table__head .d-table__head-col:last-child:before{
  display:none;
}*/
.warehouse-analysis__table .d-table__head .d-table__head-col:nth-child(2),
.warehouse-analysis__table .d-table__row .d-table__col:nth-child(2) {
  min-width: 40%;
  width: 40%;
}
.warehouse-analysis__table .d-table__row .d-table__col:first-child a {
  display: flex;
  align-items: center;
  gap: 0;
}
.warehouse-analysis__table .d-table__row .d-table__col:first-child a .multyitem_cell:first-child {
  font-size: 16px;
  font-weight: 600;
  padding-right: 32px;
  width: 35%;
  position: relative;
}

.warehouse-analysis__table .d-table__row .d-table__col:first-child a .multyitem_cell:last-child {
  color: #757575;
  font-size: 14px;
  font-weight: 400;
  width: 60%;
  padding-left: 52px;
  position: relative;
}
.warehouse-analysis__table
  .d-table__row
  .d-table__col:first-child
  a
  .multyitem_cell:first-child::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 0;
  translate: 0 -50%;
  width: 0.5px;
  height: var(--d-table-col-divider-height);
  background-color: rgba(117, 117, 117, 0.4588235294);
}
.warehouse-analysis__table
  .d-table__row
  .d-table__col:first-child
  a
  .multyitem_cell:last-child::before {
  content: '\e00b';
  font-family: 'Iconly';
  position: absolute;
  font-size: 13px;
  width: 16px;
  height: 16px;
  top: calc(50% - 8px);
  left: 32px;
}
.cell_review-stores-active .cell__success,
.cell_review-stores-active .cell__error {
  font-size: 16px;
  font-weight: 500;
  color: #282828;
}
.cell_rightalign {
  text-align: right;
}
.warehouse-analysis__table .d-table__body .d-table__row {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.2588235294);
  background-clip: padding-box;
}
.warehouse-analysis__table .d-table__body .d-table__row .d-table__col {
  padding-top: 19px;
  padding-bottom: 19px;
}
.warehouse-analysis__table tbody .d-table__row:first-child::after,
.warehouse-analysis__table tbody .d-table__row::after {
  display: none;
}
.warehouse-analysis__table .d-table {
  border-collapse: separate;
  border-spacing: 0 16px;
}
.warehouse-analysis__table .d-table__body .d-table__row .d-table__col {
  border: 5px solid #fff;
}
.warehouse-analysis__table .d-table__body .d-table__row .d-table__col:first-child {
  border-radius: 12px 0 0 12px;
}
.warehouse-analysis__table .d-table__body .d-table__row .d-table__col:last-child {
  border-radius: 0 12px 12px 0;
}
.warehouse-analysis__table .d-table__head-col:first-child,
.warehouse-analysis__table .d-table__col:first-child {
  padding-left: 16px;
}
.cell_review-stores-trash {
  margin-left: 10px;
}
.warehouse-analysis__add-actions .d-button-secondary {
  background-color: #fff;
  border: 1px solid #282828;
  color: #282828;
}
.warehouse-analysis__add-actions .d-button-secondary:hover {
  background-color: #282828;
  border: 1px solid #282828;
  color: #fff;
}
.warehouse-analysis__products .dart-row .d-col-xl-6:last-child,
.warehouse-analysis__products .dart-row .d-col-xl-6:nth-last-child(2) {
  margin-top: 16px;
}
.warehouse-analysis__products .p-inputtext,
.warehouse-analysis__products .p-inputnumber,
.warehouse-analysis__products .p-select {
  width: 100%;
}
.warehouse-analysis__products .dart-row .d-col-xl-6:nth-child(-n + 3) {
  padding-right: 20px;
}
.warehouse-analysis__products .dart-row .d-col-xl-6:nth-child(2),
.warehouse-analysis__products .dart-row .d-col-xl-6:nth-child(3),
.warehouse-analysis__products .dart-row .d-col-xl-6:nth-child(4),
.warehouse-analysis__products .dart-row .d-col-xl-6:nth-child(6) {
  padding-left: 20px;
}
.warehouse-analysis__products .p-checkbox {
  margin-right: 16px;
}
.warehouse-analysis__products .dart-form-group label {
  font-size: 16px;
  color: #757575;
}
.warehouse-analysis__products .p-floatlabel label,
.warehouse-analysis__products .p-inputtext::placeholder,
.warehouse-analysis__products .p-placeholder {
  font-size: 14px;
  color: #757575;
}
.warehouse-analysis__products .form_input_group:after {
  content: '\e003';
  font-family: 'Iconly' !important;
  position: absolute;
  font-size: 16.8px;
  top: calc(50% - 8.4px);
  right: 30px;
}
.warehouse-analysis__products .dart-form-group > span {
  display: inline-flex;
  font-size: 14px;
  margin-bottom: 0px;
}
.warehouse-analysis__products .dart-align-items-center {
  -ms-flex-align: start !important;
  align-items: start !important;
}
</style>
