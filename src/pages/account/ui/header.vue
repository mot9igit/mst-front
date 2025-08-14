<template>
  <div class="header__wrapper">
    <header class="content-wrapper header">
      <div class="header__catalog-content">
        <a href="/" class="header__logo-container">
          <img src="/icons/logo.svg" alt="MST" width="40" height="40" class="header__logo" />
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
              <i class="d-icon-pen header__address-edit-icon"></i>
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
              @click.prevent="this.modals.requirement = true"
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
            <!--
            <button class="d-button d-button-secondary d-button-rounded header__notification">
              <i class="d-icon-bell header__notification-icon"></i>
              <div class="status">+100</div>
            </button>
            -->
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
            <i class="d-icon-pen header__address-edit-icon"></i>
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
    <customModal v-model="showChangeAddressModal" @cancel="cancel">
      <template v-slot:title>Выбрать склад доставки</template>
      <Loader v-if="loading.changeBasketStore"></Loader>
      <changeAddressWindow @setWarehouse="setWarehouse" />
    </customModal>
  </teleport>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import SearchField from './search.vue'
import changeAddressWindow from './changeAddressWindow.vue'
import requirement from './requirement.vue'

export default {
  name: 'ProfileHeader',
  data() {
    return {
      loading: {
        changeBasketStore: false,
      },
      showChangeAddressModal: false,
      designMenuActive: false,
      basketStore: {},
      modals: {
        requirement: false,
      },
    }
  },
  emits: ['toggleCatalog', 'toggleVendor', 'toggleCart'],
  components: { Loader, customModal, changeAddressWindow, SearchField, requirement },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.getOrgStores().then(() => {
      this.getOrgBasketStore()
      this.getBasket()
    })
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      orgStores: 'org/orgStores',
      basket: 'basket/basket',
      basketWarehouse: 'basket/basketWarehouse',
      optVendorsAvailable: 'org/optVendorsAvailable',
      optVendorsSelected: 'org/optVendorsSelected',
    }),
    orgBasketWarehouse() {
      return this.orgStores?.items?.find((el) => el.id == this.basketWarehouse)
    },
  },
  methods: {
    ...mapActions({
      getOrgStores: 'org/getOrgStores',
      getOrgBasketStore: 'basket/getOrgBasketStore',
      setOrgBasketStore: 'basket/setOrgBasketStore',
      getBasket: 'basket/getBasket',
    }),
    toggleMenu() {
      if (this.active === true) {
        this.designMenuActive = false
      } else {
        this.designMenuActive = true
      }

      this.$emit('toggleCatalog')
    },
    closeRequirementsWindow() {
      console.log('closeWindow')
      this.modals.requirement = false
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
        this.getBasket()
        this.loading.changeBasketStore = false
        this.showChangeAddressModal = false
      })
    },
  },
  watch: {
    basket(newVal) {
      if (Object.keys(this.basket).length > 1) {
        if (
          Object.prototype.hasOwnProperty.call(newVal.data, this.basketWarehouse) &&
          this.basketWarehouse
        ) {
          this.basketStore = newVal.data[this.basketWarehouse]
        } else {
          this.basketStore = {}
        }
      } else {
        this.basketStore = {}
      }
    },
  },
}
</script>
<style lang="scss">
.header {
  padding-block: 11px 20px;
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
</style>
