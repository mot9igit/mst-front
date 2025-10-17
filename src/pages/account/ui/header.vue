<template>
  <div class="header__wrapper">
    <header class="content-wrapper header" id="header">
      <Toast />
      <div class="header__catalog-content">
        <a href="/" class="header__logo-container">
          <img src="/icons/logo_light.svg" alt="MST" width="40" height="40" class="header__logo" />
          <span class="header__logo-text">Управление продажами</span>
        </a>
        <div class="sidebar__divider sidebar__divider--light header__logo-divider"></div>
        <div class="header__top">
          <button
            class="header__address"
            v-if="orgBasketWarehouse"
            @click.prevent="showChangeAddressModal = true"
          >
            <i class="d-icon-location header__address-icon"></i>
            <p class="header__address-title">Склад:</p>
            <div class="header__address-value">
              <p class="header__address-text">
                {{
                  orgBasketWarehouse?.name_short
                    ? orgBasketWarehouse?.name_short
                    : orgBasketWarehouse?.name
                }},
                {{
                  orgBasketWarehouse?.address_short
                    ? orgBasketWarehouse?.address_short
                    : orgBasketWarehouse?.address
                }}
              </p>
              <div class="header__address-divider"></div>
              <i class="d-icon-pen2 header__address-edit-icon"></i>
            </div>
          </button>

          <div class="header__vendor" v-if="this.optVendorsAvailable">
            <span class="header__vendor-title">выбрано поставщиков:</span>
            <button class="header__vendor-button" @click.prevent="toggleVendor">
              <i class="d-icon-trolley header__vendor-icon"></i>
              <span class="header__vendor-value"
                >{{ this.optVendorsSelected.total }} из {{ this.optVendorsSelected.totalAll }}</span
              >
              <i class="d-icon-angle header__vendor-arrow"></i>
            </button>
          </div>
        </div>
        <div class="header__content">
          <div class="header__left">
            <div
              class="header__design"
              :class="{ 'header__design--active': designMenuActive && active }"
            >
              <div class="header__design-block header__design-block--left"></div>
              <div class="header__design-block header__design-block--right"></div>

              <button
                class="d-button d-button-primary header__catalog"
                @click.prevent="toggleMenu"
                id="catalogBtn"
              >
                <i class="d-icon-catalog header__catalog-icon"></i>
                <span class="header__catalog-text">Каталог</span>
              </button>
              <SearchField></SearchField>
            </div>
            <a
              href="#"
              class="d-button d-button-tertiary shadow header__upload"
              @click.prevent="((this.modals.requirement = true), openRequirementsWindow())"
            >
              <i class="d-icon-upload header__upload-icon"></i>
              <span class="header__upload-text">Потребность</span>
            </a>
          </div>
          <div class="header__right">
            <button
              class="d-button d-button-secondary d-button-rounded header__cart"
              @click.prevent="toggleCart()"
            >
              <i class="d-icon-cart header__cart-icon"></i>
              <span class="cart-badge">{{
                basketStore.cart_data?.sku_count ? basketStore.cart_data?.sku_count : 0
              }}</span>
            </button>

            <button class="d-button d-button-secondary d-button-rounded header__notification"
            @click.prevent="showNotificationsModal = true">
              <i class="d-icon-bell header__notification-icon"></i>
              <div class="status" v-if="notificationsAll.no_read != 0">+{{ notificationsAll.no_read ? notificationsAll.no_read : 0 }}</div>
            </button>

          </div>
        </div>
      </div>
      <div class="header__profile-content">
        <div class="header__vendor" v-if="this.optVendorsAvailable">
          <div class="header__vendor-content">
            <span class="header__vendor-title">выбрано поставщиков:</span>
            <button class="header__vendor-button" @click.prevent="toggleVendor">
              <i class="d-icon-trolley header__vendor-icon"></i>
              <span class="header__vendor-value"
                >{{ this.optVendorsSelected.total }} из {{ this.optVendorsSelected.totalAll }}</span
              >
            </button>
          </div>
          <button @click.prevent="toggleVendor">
            <i class="d-icon-angle-rounded header__vendor-arrow"></i>
          </button>
        </div>

        <div class="sidebar__divider sidebar__divider--light header__vendor-divider"></div>

        <div
          class="sidebar__divider sidebar__divider--light header__user-divider header__user-divider--top"
        ></div>

        <router-link :to="{ name: 'profile' }" class="header__user">
          <i class="d-icon-profile sidebar__user-icon"></i>
          <span class="header__user-text">{{ this.getUser?.profile?.fullname }}</span>
        </router-link>

        <button
          class="header__address header__address--alt"
          v-if="orgBasketWarehouse"
          @click.prevent="showChangeAddressModal = true"
        >
          <i class="d-icon-location header__address-icon"></i>
          <div class="header__address-content">
            <p class="header__address-title">Склад:</p>
            <p class="header__address-text">
              {{
                orgBasketWarehouse?.name_short
                  ? orgBasketWarehouse?.name_short
                  : orgBasketWarehouse?.name
              }},
              {{
                orgBasketWarehouse?.address_short
                  ? orgBasketWarehouse?.address_short
                  : orgBasketWarehouse?.address
              }}
            </p>
          </div>
          <span class="header__address-edit">
            <i class="d-icon-pen2 header__address-edit-icon"></i>
          </span>
        </button>

      </div>
    </header>
  </div>
  <requirement
    :requirementsModal="this.modals.requirement"
    @closeWindow="closeRequirementsWindow"
  />
  <teleport to="body">
    <customModal
      v-model="showChangeAddressModal"
      @cancel="cancel"
      class="header__address-edit-modal"
    >
      <template v-slot:title>Выбрать склад доставки</template>
      <Loader v-if="loading.changeBasketStore"></Loader>
      <changeAddressWindow @setWarehouse="setWarehouse" />
    </customModal>
  </teleport>

    <customModal
          v-model="showNotificationsModal"
          class="notifications__modal"
        >
        <notificationsWindow :reload="reloadNotificationsModal" @reloadSuccess="this.reloadNotificationsModal = false"/>
    </customModal>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import SearchField from './search.vue'
import changeAddressWindow from './changeAddressWindow.vue'
import requirement from './requirement.vue'
import notificationsWindow from './notificationsWindow.vue'
import Toast from 'primevue/toast'


export default {
  name: 'ProfileHeader',
  data() {
    return {
      loading: {
        changeBasketStore: false,
      },
      showChangeAddressModal: false,
      showNotificationsModal: false,
      designMenuActive: false,
      basketStore: {},
      reloadNotificationsModal: false,
      modals: {
        requirement: false,
      },
      data_start: new Date(),
    }
  },
  emits: ['toggleCatalog', 'toggleVendor', 'toggleCart', 'showRequipments', 'notifications', 'notificationsMobile'],
  components: { Loader, customModal, changeAddressWindow, SearchField, requirement, Toast, notificationsWindow },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    mobileRequipments: {
      type: Boolean,
      default: false,
    },
    mobileNotificationsShow: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {


      this.getOrgStores().then(() => {
        this.getOrgBasketStore()
        this.getBasket()
        this.getAllNotifications()
      })



    // mobile header
    let elem = document.querySelector('.main')
    elem.addEventListener('scroll', function () {
      let scrolling = elem.scrollTop
      if (window.innerWidth <= 600 && document.querySelector('.header')) {
        if (scrolling >= 100) {
          document.querySelector('.header').classList.add('min-mobile-header')
        } else {
          document.querySelector('.header').classList.remove('min-mobile-header')
        }
      }
    })

    // уведомления
    if (this.$route.params.id) {
      this.intervalId = setInterval(() => {
        this.fetchNotification();
      }, 40000);
      this.fetchNotification();
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      orgStores: 'org/orgStores',
      //fromOrgStores: 'offer/fromOrgStores',
      orgActive: 'org/orgActive',
      basket: 'basket/basket',
      basketWarehouse: 'basket/basketWarehouse',
      //basketOfferWarehouse: 'offer/basketOfferWarehouse',
      optVendorsAvailable: 'org/optVendorsAvailable',
      optVendorsSelected: 'org/optVendorsSelected',
      newNotification: 'notifications/newNotification',
      notificationsAll: 'notifications/notificationsAll',
    }),
    orgBasketWarehouse() {
      //  if(this.$route?.matched[6]?.name == 'WholesaleClientsOffer'){
      //      return this.fromOrgStores?.items?.find((el) => el.id == this.basketWarehouse)
      //   }else{

      return this.orgStores?.items?.find((el) => el.id == this.basketWarehouse)
     // }

    },
  },
  methods: {
    ...mapActions({
      getOrgStores: 'org/getOrgStores',
    //  getFromOrgStores: 'offer/getFromOrgStores',
      getOrgBasketStore: 'basket/getOrgBasketStore',
      setOrgBasketStore: 'basket/setOrgBasketStore',
    //  getOrgBasketOfferStore: 'offer/getOrgBasketOfferStore',
      getBasket: 'basket/getBasket',
      getNewNotification: 'notifications/getNewNotification',
      getAllNotifications: 'notifications/getAllNotifications',
      readAllNotifications: 'notifications/readAllNotifications',
    }),
    toggleMenu() {
      if (this.active === true) {
        this.designMenuActive = false
      } else {
        this.designMenuActive = true
      }

      this.$emit('toggleCatalog')
    },
    openRequirementsWindow() {
      this.$emit('showRequipments')
    },
    closeRequirementsWindow() {
      console.log('closeWindow')
      this.modals.requirement = false
      this.$emit('showRequipments')
    },
    toggleVendor() {
      this.$emit('toggleVendor')
    },
    toggleCart() {
      this.$emit('toggleCart')
    },
    cancel(close) {
      close()
    },
    setWarehouse(id) {
      this.loading.changeBasketStore = true
      this.setOrgBasketStore(id).then(() => {
        // this.getBasket()
        this.loading.changeBasketStore = false
        this.showChangeAddressModal = false
        window.location.reload()
      })
    },
    updateCart() {
      if (Object.keys(this.basket).length > 1) {
        if (
          Object.prototype.hasOwnProperty.call(this.basket.data, this.basketWarehouse) &&
          this.basketWarehouse
        ) {
          this.basketStore = this.basket.data[this.basketWarehouse]
        } else {
          this.basketStore = {}
        }
      } else {
        this.basketStore = {}
      }
    },

    fetchNotification(){
      this.getNewNotification({
        data_start: this.data_start
      }).then((res) => {
                for (let i = 0; i < res.data.data?.total; i++) {
                    setTimeout(() => {
                        let title = res.data.data.items[i].title;
                        this.$toast.add({ severity: 'secondary', summary: title, detail: res.data.data.items[i].text, info: res.data.data.items[i], life: 7000 });
                    }, i * 500);
                    if(this.showNotificationsModal == true){
                      this.reloadNotificationsModal = true
                    }
                    this.getAllNotifications()
                }
            });

      this.data_start = new Date();
    },

  },
  watch: {
    basket() {
      this.updateCart()
    },
    basketWarehouse() {
      this.updateCart()
    },
    mobileRequipments: function (newVal) {
      this.modals.requirement = newVal
    },
    orgActive: function () {
      this.getOrgStores().then(() => {
        this.getOrgBasketStore()
      })
    },
    'showNotificationsModal': function(newVal){
      if(newVal == false){
          this.readAllNotifications()
          this.getAllNotifications()
        }
      if(newVal != this.mobileNotificationsShow){
        this.$emit('notificationsMobile', this.showNotificationsModal)
      }
    },
    notificationsAll: function(newVal){
      this.$emit('notifications', newVal.no_read)
    },
    mobileNotificationsShow: function(newVal){
      if(this.showNotificationsModal != newVal){
        this.showNotificationsModal = newVal
      }

    },
    // '$route.matched[6].name': function(newVal){
    //   this.getOrgBasketStore()
    // }

  }
}
</script>
<style lang="scss">
.header {
  /*padding-block: 11px 20px;*/
  .header__cart {
    position: relative;
    .cart-badge {
      position: absolute;
      top: -3px;
      right: -10px;
      display: inline-block;
      width: 20px;
      height: 20px;
      font-size: 10px;
      line-height: 20px;
      text-align: center;
      background: #f92c0d;
      color: #fff;
      border-radius: 50%;
    }
  }
}
.notifications__modal-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -24px;
}
.notifications__modal-header-buttons{
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 8px;
  max-width: 350px;
  width:320px;
  margin-right: 42px;
}
.notifications__modal-header-buttons button{
  min-width: calc(50% - 4px);
  max-width: calc(50% - 4px);
  width: calc(50% - 4px);
  font-size: 16px;
  font-weight: 500;
}
.notifications__modal-cansel{
  color: #757575;
}
.notifications__modal-container{
  width: 100%;
  padding-right: 20px;
}
.notifications__modal-container h4{
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #757575;
  margin: 20px 0;

}
.notifications__modal-list{
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.notifications__modal-item{
  width: 100%;
  height: auto;
  min-height: 115px;
  background-color: #ffffff85;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 16px 16px 16px 19px;
  position: relative;
}
.notifications__modal-list-new .notifications__modal-item:after{
  content: '';
  position:absolute;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  top: 5px;
  left: 5px;
  background-color:#f92c0d;

}
.notifications__modal-item-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.notifications__modal-list .header__notification-icon{
  width:20px;
  height:20px;
  font-size: 14px;
}
.notifications__modal-list-new .header__notification-icon{
   color:#f92c0d
}
.notifications__modal-list-old .header__notification-icon{
   color:#757575;
}
.notifications__modal-item-header-left{
  font-weight: 500;
  font-size: 12px;
  line-height: 123%;
  color: #757575;
}
.notifications__modal-item .std-notification__header,.notifications__modal-item h6,.notifications__modal-item .std-notification__span{
  display:none;
}
.notifications__modal-item .std-notification__content{
  margin-top: 8px;
  color: #757575;
}
.notifications__modal-container-empty{
  margin-top:30px;
}
</style>
