<template>
  <aside class="sidebar" id="sidebar" :class="{ 'sidebar--full': !active }">
    <div class="sidebar__inner sidebar__inner--desktop">
      <div class="sidebar__content-wrapper">
        <div class="sidebar__logo-wrapper">
          <a href="/" class="sidebar__logo-container">
            <img src="/icons/logo.svg" alt="MST" width="40" height="40" class="sidebar__logo" />
            <span class="sidebar__logo-text"
              ><span class="sidebar__logo-text sidebar__logo-text--bold">МС:</span>Управление
              продажами и закупками</span
            >
          </a>
          <div class="sidebar__block sidebar__toggle-block sidebar__logo-toggle">
            <button class="sidebar__toggle" @click.prevent="sidebarToggle()">
              <i class="d-icon-arrow sidebar__toggle-icon"></i>
            </button>
          </div>
        </div>
        <div class="sidebar__content">
          <div class="sidebar__block sidebar__toggle-block">
            <button class="sidebar__toggle" @click.prevent="sidebarToggle()">
              <i class="d-icon-arrow sidebar__toggle-icon"></i>
            </button>
          </div>

          <div class="sidebar__info">
            <div
              class="sidebar__divider sidebar__divider--light sidebar__user-divider--top sidebar__hidden"
            ></div>
            <div
              class="sidebar__block sidebar__organization-block"
              v-if="this.organizations.length"
            >
              <button
                class="sidebar__organization sidebar__organization--mini"
                v-if="this.activeOrganization"
              >
                <img
                  v-if="activeOrganization.image"
                  :src="activeOrganization.image"
                  :alt="activeOrganization.name"
                  class="sidebar__organization-logo"
                />
                <div v-else class="sitebar-avatar-none-char">
                  {{
                    this.activeOrganization?.name
                      ? this.activeOrganization?.name.startsWith('ИП')
                        ? this.activeOrganization?.name
                            .replace(/^ИП\s*/, '')
                            .split(' ')[0]
                            .slice(0, 2)
                            .toUpperCase()
                        : this.activeOrganization?.name.slice(0, 2).toUpperCase()
                      : ''
                  }}
                </div>
              </button>
              <div
                class="sidebar__organization sidebar__organization--full sidebar__hidden"
                v-if="this.activeOrganization"
              >
                <img
                  v-if="activeOrganization.image"
                  :src="activeOrganization.image"
                  :alt="activeOrganization.name"
                  class="sidebar__organization-logo"
                />
                <div v-else class="sitebar-avatar-none-char">
                  {{
                    this.activeOrganization?.name
                      ? this.activeOrganization?.name.startsWith('ИП')
                        ? this.activeOrganization?.name
                            .replace(/^ИП\s*/, '')
                            .split(' ')[0]
                            .slice(0, 2)
                            .toUpperCase()
                        : this.activeOrganization?.name.slice(0, 2).toUpperCase()
                      : ''
                  }}
                </div>
                <div class="sidebar__organization-content">
                  <span class="sidebar__organization-title">{{ activeOrganization.name }}</span>
                  <button
                    class="d-button d-button-tertiary d-button-tertiary-small sidebar__organization-button"
                    @click.prevent="showChangeOrgModal = true"
                  >
                    <i class="d-icon-refresh sidebar__organization-button-icon"></i>
                    <span class="sidebar__organization-button-text">Сменить компанию</span>
                  </button>
                </div>
              </div>
            </div>
            <button
              class="d-button d-button-secondary d-button--sm-shadow sidebar__new-organization"
              v-else
            >
              <i class="d-icon-card-plus sidebar__new-organization-icon"></i>
              Зарегистрировать компанию
            </button>

            <router-link :to="{ name: 'profile' }" class="sidebar__user sidebar__hidden">
              <i class="d-icon-profile sidebar__user-icon"></i>
              <span class="sidebar__user-text">{{ this.getUser?.profile?.fullname }}</span>
            </router-link>

            <div
              class="sidebar__divider sidebar__divider--light sidebar__user-divider--bottom"
            ></div>
          </div>

          <!-- <div class="sidebar__divider sidebar__nav-divider--top"></div> -->

          <sidebarMenu />
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
          <i class="d-icon-faq sidebar__bottom-block-icon"></i>
          <span class="sidebar__bottom-block-text">Работа в Закупках</span>
        </button>

        <button
          class="sidebar__bottom-block sidebar__exit-block sidebar__hidden"
          @click.prevent="logOut()"
        >
          <i class="d-icon-exit sidebar__bottom-block-icon"></i>
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
            <button class="sidebar__item-button" @click.prevent="logOut()">
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
      <ChangeOrgWindow
        :organizations="this.organizations"
        :activeOrganization="this.activeOrganization"
        @orgChange="this.orgChange"
      />
    </customModal>
  </teleport>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import sidebarMenu from './sidebarMenu.vue'
import customModal from '@/shared/ui/Modal.vue'
import ChangeOrgWindow from '@/pages/org/ui/ChangeOrgWindow.vue'

export default {
  name: 'ProfileSidebar',
  data() {
    return {
      active: false,
      showChangeOrgModal: false,
      organizations: [],
      activeOrganization: {},
    }
  },
  components: { customModal, ChangeOrgWindow, sidebarMenu },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      orgs: 'orgs',
    }),
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      setUser: 'user/setUser',
      deleteUser: 'user/deleteUser',
      getSessionUser: 'user/getSessionUser',
    }),
    orgChange(id) {
      localStorage.setItem('global.organization', Number(id))
      this.showChangeOrgModal = false
      if (this.$route.params.id && this.$route.params.id != id) {
        this.$router.push({ name: 'purchases', params: { id: id } })
      }
    },
    sidebarToggle() {
      this.active = !this.active
      localStorage.setItem('sidebar.position', Number(this.active))
    },
    async logOut() {
      if (this.getUser) {
        await this.$api.auth.logout()
        localStorage.removeItem('user')
        this.deleteUser()
        this.$router.push({ name: 'home' })
      } else {
        this.$router.push({ name: 'home' })
      }
    },
    cancel(close) {
      close()
    },
    setOrgs() {
      const newVal = this.orgs
      this.activeOrganization = null
      if (newVal && this.$route.params.id) {
        const org = newVal.find((el) => el.id === this.$route.params.id)
        if (org) {
          this.organization = org
        }
        this.activeOrganization = this.organizations?.find(
          (org) => org.id === this.$route.params.id,
        )
      }
    },
  },
  mounted() {
    const sidebarPosition = localStorage.getItem('sidebar.position')
    if (sidebarPosition) {
      this.active = sidebarPosition
    }
    this.setOrgs()
  },
  watch: {
    orgs: function (newVal) {
      this.organizations = newVal
      this.setOrgs()
    },
    $route() {
      // if (this.$route.params.id) {
      this.setOrgs()
      // }
    },
  },
}
</script>
<style>
aside {
  background-color: #ededed;
}
.sidebar__organization .sitebar-avatar-none-char {
  display: inline-block;
  margin: 0 auto;
  width: 40px;
  height: 40px;
  font-size: 16px;
  text-transform: uppercase;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
