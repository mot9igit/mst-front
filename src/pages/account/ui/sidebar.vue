<template>
  <Toast />
  <aside class="sidebar" id="sidebar" :class="{ 'sidebar--full': !active }">
    <div
      class="sidebar__inner sidebar__inner--desktop"
      @click.prevent="clickAround()"
      id="sidebar__inner--desktop"
    >
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
                      ? this.activeOrganization?.name.startsWith('ИП') ||
                        this.activeOrganization?.name.startsWith('ООО')
                        ? this.activeOrganization?.name
                            .replace(/^ИП\s*/, '')
                            .replace(/^ООО\s*/, '')
                            .replace(/^"\s*/, '')
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
                      ? this.activeOrganization?.name.startsWith('ИП') ||
                        this.activeOrganization?.name.startsWith('ООО')
                        ? this.activeOrganization?.name
                            .replace(/^ИП\s*/, '')
                            .replace(/^ООО\s*/, '')
                            .replace(/^"\s*/, '')
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
              <div class="sidebar__organization sidebar__organization--full sidebar__hidden" v-else>
                <div class="sidebar__organization-content d-fw">
                  <button
                    class="d-button d-button-tertiary d-button-tertiary-small sidebar__organization-button d-fw"
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
              <span v-if="active === false"
                ><i class="d-icon-card-plus sidebar__new-organization-icon"></i>Зарегистрировать
                компанию</span
              >
              <span v-else
                ><a href="#" title="Зарегистрировать компанию"
                  ><i class="d-icon-plus sidebar__new-organization-icon"></i></a
              ></span>
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

          <sidebarMenu
            :toggle="Boolean(active)"
            @sidebarToggle="sidebarToggle()"
            v-if="this.$route.params.id"
          />
          <div class="sidebar__divider sidebar__bottom-divider sidebar__visible"></div>
        </div>
      </div>
      <div class="sidebar__bottom">
        <div class="sidebar__divider sidebar__bottom-divider sidebar__hidden"></div>
        <!--
        <div
          class="sidebar__block sidebar__item sidebar__question-block sidebar__question-block--mini"
        >
          <button class="sidebar__item-button sidebar__question">
            <i class="d-icon-question sidebar__item-icon sidebar__question-logo"></i>
            <span class="sidebar__item-text">Вопросы</span>
          </button>
        </div>
        -->
        <div class="sidebar__block sidebar__item sidebar__exit-block sidebar__exit-block--mini">
          <button class="sidebar__item-button sidebar__exit" @click.prevent="logOut()">
            <i class="d-icon-exit sidebar__item-icon sidebar__exit-logo"></i>
            <span class="sidebar__item-text">Выйти</span>
          </button>
        </div>
        <!--
        <button class="sidebar__bottom-block sidebar__question-block sidebar__hidden">
          <i class="d-icon-faq sidebar__bottom-block-icon"></i>
          <span class="sidebar__bottom-block-text">Работа в Закупках</span>
        </button>
        -->
        <button
          class="sidebar__bottom-block sidebar__exit-block sidebar__hidden"
          @click.prevent="logOut()"
        >
          <i class="d-icon-exit sidebar__bottom-block-icon"></i>
          <span class="sidebar__bottom-block-text">Выйти из ЛК</span>
        </button>
      </div>
      <div class="version-bar">
        <span @click="copyVersion()" id="version">v. {{ version }}</span>
      </div>
    </div>
    <div class="sidebar__inner--mobile">
      <nav class="sidebar__nav">
        <ul class="sidebar__list">
          <li class="sidebar__block sidebar__item">
            <button class="sidebar__item-button" @click.prevent="sidebarToggleMobile()">
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
          <li class="sidebar__block sidebar__item" v-if="this.activeOrganization">
            <button class="sidebar__item-button" @click.prevent="showChangeOrgModal = true" v-if="activeOrganization.image">
              <img

                  :src="activeOrganization.image"
                  :alt="activeOrganization.name"
                  class="sidebar__item-img"
                />
            </button>
            <button class="sidebar__item-button sidebar__item-button-none-char" @click.prevent="showChangeOrgModal = true" v-else>
                <div  class="sitebar-avatar-none-char">
                  {{
                    this.activeOrganization?.name
                      ? this.activeOrganization?.name.startsWith('ИП') ||
                        this.activeOrganization?.name.startsWith('ООО')
                        ? this.activeOrganization?.name
                            .replace(/^ИП\s*/, '')
                            .replace(/^ООО\s*/, '')
                            .replace(/^"\s*/, '')
                            .split(' ')[0]
                            .slice(0, 2)
                            .toUpperCase()
                        : this.activeOrganization?.name.slice(0, 2).toUpperCase()
                      : ''
                  }}
                </div>
            </button>

          </li>
        </ul>
      </nav>
    </div>
  </aside>

  <customModal v-model="showChangeOrgModal" @cancel="cancel">
    <template v-slot:title></template>
    <ChangeOrgWindow
      :organizations="this.organizations"
      :activeOrganization="this.activeOrganization"
      @orgChange="this.orgChange"
    />
  </customModal>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Toast from 'primevue/toast'
import sidebarMenu from './sidebarMenu.vue'
import customModal from '@/shared/ui/Modal.vue'
import ChangeOrgWindow from '@/pages/org/ui/ChangeOrgWindow.vue'

export default {
  name: 'ProfileSidebar',
  data() {
    return {
      active: false,
      activeMobile: false,
      showChangeOrgModal: false,
      organizations: [],
      activeOrganization: {},
    }
  },
  components: { customModal, ChangeOrgWindow, sidebarMenu, Toast },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      orgs: 'org/orgs',
      orgActive: 'org/orgActive',
    }),
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser',
      deleteUser: 'user/deleteUser',
      getSessionUser: 'user/getSessionUser',
    }),
    orgChange(id) {
      localStorage.setItem('global.organization', Number(id))
      this.showChangeOrgModal = false
      if (this.$route.params.id && this.$route.params.id != id) {
        this.$router.push({ name: 'purchases', params: { id: id } })
      } else {
        this.$router.push({ name: 'purchases', params: { id: id } })
      }
    },
    sidebarToggle() {
      this.active = !this.active
      localStorage.setItem('sidebar.position', Number(this.active))
    },
    sidebarToggleMobile() {
      this.activeMobile = !this.activeMobile
    },
    clickAround() {
      document.addEventListener('click', (event) => {
        let sidebarElement = document.getElementById('sidebar__inner--desktop')
        if (!sidebarElement.contains(event.target)) {
          if (this.active === false) {
            this.active = !this.active
            localStorage.setItem('sidebar.position', Number(this.active))
          }
        }
      })
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
    copyVersion() {
      var range = document.createRange()
      var elem = document.getElementById('version')
      range.selectNode(elem)
      window.getSelection().removeAllRanges() // clear current selection
      window.getSelection().addRange(range) // to select text
      document.execCommand('copy')
      window.getSelection().removeAllRanges() // to deselect
      this.$toast.add({
        severity: 'info',
        summary: 'Версия скопирована',
        detail: '',
        life: 3000,
      })
    },
  },
  mounted() {
    const sidebarPosition = localStorage.getItem('sidebar.position')
    if (sidebarPosition) {
      this.active = sidebarPosition
    }
    this.setOrgs()
    window.onload = function() {
      if(window.innerWidth <= 600){
        document.querySelector('.sidebar__inner--desktop').classList.add('sidebar--mobile')
      }else{
        document.querySelector('.sidebar__inner--desktop').classList.remove('sidebar--mobile')
      }
    }
    window.addEventListener('resize', function(event) {
    if(window.innerWidth <= 600){
        document.querySelector('.sidebar__inner--desktop').classList.add('sidebar--mobile')
      }else{
        document.querySelector('.sidebar__inner--desktop').classList.remove('sidebar--mobile')
      }
    }, true);
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
<style lang="scss">
.d-fw {
  width: 100%;
}
aside {
  position: relative;
  background-color: #ededed;
  padding-bottom: 20px;
  &.sidebar--full .version-bar {
    display: block;
  }
  .version-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 5px 20px;
    text-align: center;
    z-index: 75;
    display: none;
    span {
      display: block;
      font-size: 12px;
      color: #bbb;
    }
  }
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
.sidebar--full .sidebar__organization .sitebar-avatar-none-char {
  margin: 0 12px 0 0;
}
.sidebar--full .sidebar__new-organization:hover {
  background-color: #f92c0d;
  color: #fbfbfb;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.2588235294);
}
.sidebar--full .sidebar__new-organization:active {
  background-color: #fbfbfb;
  color: #282828;
  font-weight: 600;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.2588235294);
}
.sidebar--full .sidebar__new-organization {
  background-color: #fbfbfb;
  color: #282828;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.2588235294);
}
.sidebar__new-organization:hover {
  background-color: transparent;
  color: #f92c0d;
  box-shadow: none;
}
.sidebar__new-organization:active {
  background-color: transparent;
  color: #282828;
  font-weight: 600;
  box-shadow: none;
}
.sidebar__new-organization {
  background-color: transparent;
  color: #282828;
  box-shadow: none;
}
.sidebar-container {
  margin-block: 35px 32px;
}
.sidebar__inner {
  z-index: 75;
}
.sidebar__user {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  background-color: #ffffff8c;
  border-radius: 30px;

  padding: 4px 12px;
  height: 32px;
  width: 100%;
}
</style>
