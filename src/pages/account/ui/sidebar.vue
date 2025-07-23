<template>
  
  {{ console.log(this.active) }}
  <aside class="sidebar" id="sidebar" :class="{ 'sidebar--full': active }">
    <div class="sidebar__inner sidebar__inner--desktop">
      <div class="sidebar__content-wrapper">
        <div class="sidebar__logo-wrapper">
          <a href="/" class="sidebar__logo-container">
            <img src="/icons/logo.svg" alt="MST" width="40" height="40" class="sidebar__logo" />
            <span class="sidebar__logo-text">МСТ Аналитика</span>
          </a>
          <div class="sidebar__block sidebar__toggle-block sidebar__logo-toggle">
            <button class="sidebar__toggle" @click.prevent="sidebarToggle()">
              <i class="d-icon-arrow sidebar__toggle-icon"></i>
            </button>
          </div>
        </div>
        <div class="sidebar__content">
          <div
            class="sidebar__divider sidebar__divider--light sidebar__warehouse-divider-top sidebar__hidden"
          ></div>

          <div class="sidebar__warehouse sidebar__hidden">
            <div class="sidebar__warehouse-content">
              <span class="sidebar__warehouse-title">Склад доставки:</span>
              <p class="sidebar__warehouse-text">
                Ростов на Дону, ул. Микухина Каланахлоя, 11 / 7 к 32 ЛИТ 898
              </p>
            </div>
            <button class="d-icon-wrapper sidebar__warehouse-button">
              <i class="d-icon-pen sidebar__warehouse-button-icon"></i>
            </button>
          </div>

          <div
            class="sidebar__divider sidebar__divider--light sidebar__warehouse-divider-bottom sidebar__hidden"
          ></div>

          <div class="sidebar__block sidebar__toggle-block">
            <button class="sidebar__toggle" @click.prevent="sidebarToggle()">
              <i class="d-icon-arrow sidebar__toggle-icon"></i>
            </button>
          </div>

          <div
            class="sidebar__divider sidebar__divider--light header__vendor-divider-top sidebar__hidden"
          ></div>

          <div class="header__vendor">
            <span class="header__vendor-title">выбрано поставщиков:</span>
            <button class="header__vendor-button">
              <div>
                <i class="d-icon-trolley header__vendor-icon"></i>
                <span class="header__vendor-value">6 из 45</span>
              </div>
              <i class="d-icon-angle-rounded header__vendor-arrow"></i>
            </button>
          </div>

          <div
            class="sidebar__divider sidebar__divider--light sidebar__organization-divider-top sidebar__hidden"
          ></div>

          <div class="sidebar__block sidebar__organization-block">
            <button class="sidebar__organization sidebar__organization--mini">
              <img src="/icons/spo-logo.svg" alt="SPO" class="sidebar__organization-logo" />
            </button>
            <div class="sidebar__organization sidebar__organization--full sidebar__hidden">
              <img src="/icons/spo-logo.svg" alt="SPO" class="sidebar__organization-logo" />
              <div class="sidebar__organization-content">
                <span class="sidebar__organization-title"
                  >Специальное Профессиональное Оборудование</span
                >
                <button
                  class="d-button d-button-tertiary d-button-tertiary-small sidebar__organization-button"
                  @click.prevent="showChangeOrgModal = true"
                >
                  <i class="d-icon-refresh sidebar__organization-button-icon"></i>
                  <span class="sidebar__organization-button-text">Сменить компанию</span>
                </button>
              </div>
              <button class="d-icon-wrapper sidebar__organization-info-button">
                <i class="d-icon-info sidebar__organization-info-button-icon"></i>
              </button>
            </div>
          </div>

          <div
            class="sidebar__divider sidebar__divider--light sidebar__user-divider--top sidebar__hidden"
          ></div>

          <button class="sidebar__user sidebar__hidden">
            <i class="d-icon-profile sidebar__user-icon"></i>
            <span class="sidebar__user-text">Игорь Игореведовичив</span>
          </button>

          <div
            class="sidebar__divider sidebar__divider--light sidebar__user-divider--bottom sidebar__hidden"
          ></div>

          <div class="sidebar__divider sidebar__nav-divider--top"></div>

          <nav class="sidebar__nav">
            <ul class="sidebar__list">
              <li class="sidebar__block sidebar__item">
                <button class="sidebar__item-button">
                  <i class="d-icon-list sidebar__item-icon"></i>
                  <span class="sidebar__item-text">Закупки</span>
                </button>
              </li>
              <li class="sidebar__block sidebar__item">
                <button class="sidebar__item-button sidebar__visible">
                  <i class="d-icon-cart-solid sidebar__item-icon"></i>
                  <span class="sidebar__item-text">Заказы</span>
                </button>
                <button class="sidebar__item-button sidebar__hidden">
                  <i class="d-icon-bag sidebar__item-icon"></i>
                  <span class="sidebar__item-text">Мои заказы</span>
                </button>
              </li>
              <li class="sidebar__block sidebar__item">
                <button class="sidebar__item-button">
                  <i class="d-icon-star sidebar__item-icon"></i>
                  <span class="sidebar__item-text sidebar__visible">Поставщики</span>
                  <span class="sidebar__item-text sidebar__hidden">Мои поставщики</span>
                </button>
              </li>
              <li class="sidebar__block sidebar__item">
                <button class="sidebar__item-button">
                  <i class="d-icon-box sidebar__item-icon"></i>
                  <span class="sidebar__item-text">Товары</span>
                </button>
              </li>
            </ul>
          </nav>
          <div class="sidebar__divider sidebar__bottom-divider sidebar__visible"></div>
        </div>
      </div>
      <div class="sidebar__bottom">
        <div class="sidebar__divider sidebar__bottom-divider sidebar__hidden"></div>

        <div
          class="sidebar__block sidebar__item sidebar__question-block sidebar__question-block--mini"
        >
          <button class="sidebar__item-button sidebar__question">
            <i class="d-icon-question sidebar__item-icon sidebar__question-logo"></i>
            <span class="sidebar__item-text">Вопросы</span>
          </button>
        </div>
        <div class="sidebar__block sidebar__item sidebar__exit-block sidebar__exit-block--mini">
          <button class="sidebar__item-button sidebar__exit" @click.prevent="logOut()">
            <i class="d-icon-exit sidebar__item-icon sidebar__exit-logo"></i>
            <span class="sidebar__item-text">Выйти</span>
          </button>
        </div>

        <button class="sidebar__bottom-block sidebar__question-block sidebar__hidden">
          <i class="d-icon-question sidebar__question-logo"></i>
          <span class="sidebar__bottom-block-text">Работа в Закупках</span>
        </button>

        <button
          class="sidebar__bottom-block sidebar__exit-block sidebar__hidden"
          @click.prevent="logOut()"
        >
          <i class="d-icon-exit sidebar__exit-logo"></i>
          <span class="sidebar__bottom-block-text">Выйти из ЛК</span>
        </button>
      </div>
    </div>
    <div class="sidebar__inner sidebar__inner--mobile">
      <nav class="sidebar__nav">
        <ul class="sidebar__list">
          <li class="sidebar__block sidebar__item">
            <button class="sidebar__item-button" @click.prevent="sidebarToggle()">
              <i class="d-icon-burger sidebar__item-icon"></i>
            </button>
          </li>
          <li class="sidebar__block sidebar__item">
            <button class="sidebar__item-button">
              <i class="d-icon-bell-solid sidebar__item-icon"></i>
            </button>
          </li>
          <li class="sidebar__block sidebar__item">
            <button class="sidebar__item-button">
              <i class="d-icon-upload-solid sidebar__item-icon"></i>
            </button>
          </li>
          <li class="sidebar__block sidebar__item sidebar__item--active">
            <button class="sidebar__item-button">
              <i class="d-icon-catalog-solid sidebar__item-icon"></i>
            </button>
          </li>
          <li class="sidebar__block sidebar__item">
            <button class="sidebar__item-button">
              <i class="d-icon-cart-solid sidebar__item-icon"></i>
            </button>
          </li>
          <li class="sidebar__block sidebar__item">
            <button class="sidebar__item-button">
              <img src="/icons/spo-logo.svg" class="sidebar__item-img" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
  <teleport to="body">
    <customModal v-model="showChangeOrgModal" @cancel="cancel">
      <template v-slot:title>Смена организации</template>
      <ChangeOrgWindow />
    </customModal>
  </teleport>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import customModal from '@/shared/ui/Modal.vue'
import ChangeOrgWindow from '@/pages/org/ui/ChangeOrgWindow.vue'

export default {
  name: 'ProfileSidebar',
  props: {
    activeSidebar: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      active: true,
      showChangeOrgModal: false,
    }
  },
  components: { customModal, ChangeOrgWindow },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
    }),
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      setUser: 'user/setUser',
      deleteUser: 'user/deleteUser',
      getSessionUser: 'user/getSessionUser',
    }),
    sidebarToggle() {
      this.active = !this.active
      localStorage.setItem('storedsidebarToggle', Number(this.active))
      
    },
    async logOut() {
      if (this.getUser) {
        await this.$api.auth.logout()
        localStorage.removeItem('user')
        this.deleteUser()
        // console.log(this.$router)
        this.$router.push({ name: 'home' })
      } else {
        this.$router.push({ name: 'home' })
      }
    },
    cancel(close) {
      close()
    },
  },
  mounted() { 
    setTimeout(() => {
      const storedsidebarToggle = localStorage.getItem('storedsidebarToggle');
      console.log(storedsidebarToggle)
     if(Boolean(storedsidebarToggle)){
      this.active = storedsidebarToggle
      console.log(this.active)
     }else{
      this.active = storedsidebarToggle
     }
        console.log(this.active)
      
    }, 800);
  //  {{ console.log(localStorage.getItem('storedsidebarToggle')) }}
	//	this.active = localStorage.getItem('storedsidebarToggle');
	},
}
</script>
<style>
aside {
  background-color: #ededed;
}
</style>
