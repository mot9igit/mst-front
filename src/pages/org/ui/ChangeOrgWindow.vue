<template>
  <div class="d-modal2 d-modal2--active change-organization__modal">
    <div class="d-modal2__header change-organization__modal-header">
      <!-- Карточка организации -->
      <div class="change-organization__item change-organization__item--big">
        <!-- Верхушка -->
        <div class="change-organization__item-header">
          <div class="change-organization__item-image-container">
            <img
              v-if="this.activeOrganization?.image"
              :src="this.activeOrganization?.image"
              alt=""
              class="change-organization__item-image"
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
          </div>
          <p class="change-organization__item-title">{{ this.activeOrganization?.name }}</p>
          <div class="change-organization__item-active-container">
            <div
              class="d-divider d-divider--vertical d-divider--big change-organization__item-active-divider"
            ></div>
            <div class="d-badge2 d-badge2--fit change-organization__item-active">
              Сейчас активно
            </div>
          </div>
        </div>
        <!-- Контент -->
        <div class="change-organization__item-content">
          <div class="change-organization__item-data">
            <i class="d-icon-location-flat change-organization__item-data-icon"></i>
            <p class="change-organization__item-data-text">
              {{ this.activeOrganization?.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-modal2__content change-organization__modal-content">
      <!-- Список организаций -->
      <div class="change-organization__item-list" v-if="this.organizations">
        <!-- Карточка организации -->
        <router-link
          v-for="item in this.organizations?.filter((org) => org.id !== this.activeOrganization.id)"
          :to="{ name: 'account', params: { id: item.id } }"
          @click="changeOrg"
          class="change-organization__item"
          v-bind:key="item.id"
        >
          <!-- Верхушка -->
          <div class="change-organization__item-header">
            <div class="change-organization__item-image-container">
              <div class="change-organization__item-image-fallback">
                <img v-if="item.image" :src="item.image" alt="" />
                <div v-else class="sitebar-avatar-none-char">
                  {{
                    item?.name
                      ? item?.name.startsWith('ИП')
                        ? item?.name
                            .replace(/^ИП\s*/, '')
                            .split(' ')[0]
                            .slice(0, 2)
                            .toUpperCase()
                        : item?.name.slice(0, 2).toUpperCase()
                      : ''
                  }}
                </div>
              </div>
            </div>
            <p class="change-organization__item-title">{{ item.name }}</p>
          </div>
          <!-- Контент -->
          <div class="change-organization__item-content">
            <div class="change-organization__item-data">
              <i class="d-icon-location-flat change-organization__item-data-icon"></i>
              <p class="change-organization__item-data-text">
                {{ item.description }}
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="d-modal2__actions change-organization__modal-actions">
      <button
        class="d-button d-button-primary d-button-primary-small box-shadow-none d-modal2__action-button"
      >
        Ок
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'OrgChangeWindow',
  data() {
    return {
      activeOrganization: {},
      organization: {},
      organizations: [],
    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      orgs: 'orgs',
    }),
  },
  mounted() {
    if (this.orgs) {
      this.organizations = this.orgs
      const org = this.organizations.find((el) => el.id === this.$route.params.id)
      if (org) {
        this.organization = org
      }
      this.activeOrganization = this.organizations?.find((org) => org.id === this.$route.params.id)
    }
  },
  watch: {
    orgs: function (newVal, oldVal) {
      this.organizations = newVal
      if (newVal) {
        const org = newVal.find((el) => el.id === this.$route.params.id)
        if (org) {
          this.organization = org
        }
      }
      this.activeOrganization = this.organizations?.find((org) => org.id === this.$route.params.id)
    },
  },
}
</script>
<style lang="scss">
.change-organization__modal {
  max-width: 100%;
  padding: 0;
  .d-modal2__header,
  .change-organization__modal-content {
    padding-left: 0;
    padding-right: 0;
  }
  .d-modal2__actions {
    padding-top: 15px;
  }
}
</style>
