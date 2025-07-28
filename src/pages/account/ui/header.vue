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
          <div class="header__vendor" v-if="this.optVendors">
            <span class="header__vendor-title">выбрано поставщиков:</span>
            <button class="header__vendor-button" @click.prevent="toggleVendor">
              <i class="d-icon-trolley header__vendor-icon"></i>
              <span class="header__vendor-value"
                >{{ this.optVendors.selected_count }} из {{ this.optVendors.available_count }}</span
              >
              <i class="d-icon-angle header__vendor-arrow"></i>
            </button>
          </div>
        </div>
        <div class="header__content">
          <div class="header__left">
            <div class="header__design" :class="{ 'header__design--active': designMenuActive }">
              <div class="header__design-block header__design-block--left"></div>
              <div class="header__design-block header__design-block--right"></div>

              <button class="d-button d-button-primary header__catalog" @click.prevent="toggleMenu">
                <i class="d-icon-catalog header__catalog-icon"></i>
                <span class="header__catalog-text">Каталог</span>
              </button>
              <SearchField></SearchField>
            </div>
            <button class="d-button d-button-tertiary shadow header__upload">
              <i class="d-icon-upload header__upload-icon"></i>
              <span class="header__upload-text">Потребность</span>
            </button>
          </div>
          <div class="header__right">
            <button class="d-button d-button-secondary d-button-rounded header__cart">
              <i class="d-icon-cart header__cart-icon"></i>
            </button>
            <button class="d-button d-button-secondary d-button-rounded header__notification">
              <i class="d-icon-bell header__notification-icon"></i>
              <div class="status">+100</div>
            </button>
          </div>
        </div>
      </div>
      <div class="header__profile-content">
        <div class="header__vendor" v-if="this.optVendors">
          <div class="header__vendor-content">
            <span class="header__vendor-title">выбрано поставщиков:</span>
            <button class="header__vendor-button" @click.prevent="toggleVendor">
              <i class="d-icon-trolley header__vendor-icon"></i>
              <span class="header__vendor-value"
                >{{ this.optVendors.selected_count }} из {{ this.optVendors.available_count }}</span
              >
            </button>
          </div>
          <button @click.prevent="toggleVendor">
            <i class="d-icon-angle-rounded header__vendor-arrow"></i>
          </button>
        </div>

        <div class="sidebar__divider sidebar__divider--light header__vendor-divider"></div>

        <div class="header__organization">
          <div class="header__organization-info">
            <img src="/icons/spo-logo.svg" alt="SPO" class="header__organization-logo" />
            <span class="header__organization-title"
              >Специальное Профессиональное Оборудование</span
            >
          </div>
          <button class="d-icon-wrapper header__organization-info-button">
            <i class="d-icon-info header__organization-info-button-icon"></i>
          </button>
        </div>

        <div
          class="sidebar__divider sidebar__divider--light header__user-divider header__user-divider--top"
        ></div>

        <button class="header__user">
          <i class="d-icon-profile header__user-icon"></i>
          <span class="header__user-text">Игорь Игореведовичив</span>
        </button>

        <div
          class="sidebar__divider sidebar__divider--light header__user-divider header__user-divider--bottom"
        ></div>

        <div class="header__organization-button-wrapper">
          <button
            class="d-button d-button-tertiary d-button-tertiary-small sidebar__organization-button"
          >
            <i class="d-icon-refresh sidebar__organization-button-icon"></i>
            <span class="sidebar__organization-button-text">Сменить компанию</span>
          </button>
        </div>

        <div class="header__address header__address--alt">
          <i class="d-icon-location header__address-icon"></i>
          <div class="header__address-content">
            <p class="header__address-title">Склад:</p>
            <p class="header__address-text">
              Ростов на Дону, ул. Микухина Каланахлоя, 11 / 7 к 32 ЛИТ 898
            </p>
          </div>
          <button class="header__address-edit">
            <i class="d-icon-pen header__address-edit-icon"></i>
          </button>
        </div>
      </div>
    </header>
  </div>
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

export default {
  name: 'ProfileHeader',
  data() {
    return {
      loading: {
        changeBasketStore: false,
      },
      showChangeAddressModal: false,
      designMenuActive: false,
    }
  },
  emits: ["toggleCatalog", "toggleVendor"],
  components: { Loader, customModal, changeAddressWindow, SearchField },
  mounted() {
    this.getOrgStores().then(() => {
      this.getOrgBasketStore()
      this.getBasket()
    })
  },
  computed: {
    ...mapGetters(['orgStores', 'basket', 'basketWarehouse', 'optVendors']),
    orgBasketWarehouse() {
      return this.orgStores?.items?.find((el) => el.id == this.basketWarehouse)
    },
  },
  methods: {
    ...mapActions(['getOrgStores', 'getOrgBasketStore', 'setOrgBasketStore', 'getBasket']),
    toggleMenu() {
      this.designMenuActive = !this.designMenuActive
      this.$emit('toggleCatalog')
    },
    toggleVendor() {
      this.$emit('toggleVendor')
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
}
</script>
<style></style>
