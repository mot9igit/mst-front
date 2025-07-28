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
                      ? this.activeOrganization?.name.startsWith('ИП') || this.activeOrganization?.name.startsWith('ООО')
                        ? this.activeOrganization?.name
                            .replace(/^ИП\s*/, '')
                            .replace(/^ООО\s*/, '')
                            .replace(/^"\s*/, '')
                            .split(' ')[0]
                            .slice(0, 2)
                            .toUpperCase()
                        : this.activeOrganization?.name.slice(0, 2).toUpperCase()
                      :  ''
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
        <a
          href="#"
          v-for="item in this.organizations?.filter((org) => org.id !== this.activeOrganization.id)"
          @click.prevent="this.orgChange(item.id)"
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
        </a>
      </div>
    </div>
    <!--
    <div class="d-modal2__actions change-organization__modal-actions">
      <button
        class="d-button d-button-primary d-button-primary-small box-shadow-none d-modal2__action-button"
      >
        Ок
      </button>
    </div>
    -->
  </div>
</template>
<script>
export default {
  name: 'OrgChangeWindow',
  emits: ['orgChange'],
  props: {
    activeOrganization: {
      type: Object,
      default() {
        return {}
      },
    },
    organizations: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    orgChange(id) {
      this.$emit('orgChange', id)
    },
  },
}
</script>
<style lang="scss">
.change-organization__modal {
  max-width: 100%;
  width: auto;
  padding: 0;
  .change-organization__item-list {
    gap: 0;
    .change-organization__item {
      padding-top: 8px;
      &:hover {
        background: #f0f0f0;
      }
    }
  }
  .d-modal2__header {
    padding-top: 0;
  }
  .d-modal2__header,
  .change-organization__modal-content {
    padding-left: 0;
    padding-right: 0;
  }
  .d-modal2__actions {
    padding-top: 15px;
  }
  .d-modal2__content {
    z-index: 9;
    justify-items: flex-start;
   
  }
  .change-organization__item-image-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .change-organization__item-list .sitebar-avatar-none-char {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.2;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}
.change-organization__item--big .sitebar-avatar-none-char {
  display: inline-block;
  margin: 0 auto;
  width: 40px;
  height: 40px;
  font-size: 16px;
  text-transform: uppercase;
  background: #f0f0f0;
  color: #343434;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
    max-width: 1134px;
    padding:4px 32px 32px 32px;
}
.change-organization__item-image-container {
  margin-right: 16px;
}
.change-organization__item-image {
    object-fit: cover;
    width: 48px;
    height: 48px;
}
.change-organization__item-title {
    font-size: 32px;
    font-weight: 600;
    font-size: 32px;
    line-height: 42px;
    letter-spacing: -0.01em;
}
.d-divider--vertical {
  opacity: 0.5;
}
@media (width <= 1920px) {
    .change-organization__item-active {
        font-size: 14px;
        height: 30px;
    }
}
.change-organization__item-active {
    font-size: 14px;
    font-weight: 500;
    padding: 6px 12px;
    height: 30px;
}
.change-organization__item-data-icon {
    font-size: 24px;
}
.change-organization__item-data-text {
    font-size: 20px;
    font-weight: 400;
}
.change-organization__item-list .change-organization__item-title {
    font-size: 24px;
}
.change-organization__item-list .change-organization__item-data-text {
    font-size: 16px;
    font-weight: 400;
    
}
.change-organization__modal .change-organization__item-list .change-organization__item {
    padding-top: 16px;
}
.change-organization__item-list .change-organization__item-data{
  padding-bottom: 16px;
}
.change-organization__modal .change-organization__item-list {
    border-bottom: 1px solid #7575757d;
}
.vfm__content {
    -webkit-backdrop-filter: blur(13.4px);
    backdrop-filter: blur(13.4px);
}
.vfm__overlay {
    -webkit-backdrop-filter: blur(35px);
    backdrop-filter: blur(35px);
}
</style>
