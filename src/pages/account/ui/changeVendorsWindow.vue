<template>
  <div class="d-sheet__overlay vendor-change__sheet-overlay" :class="{ active: active }">
    <div class="d-sheet__wrapper vendor-change__sheet-wrapper" v-if="optVendors">
      <div class="d-sheet d-sheet--active vendor-change__sheet" data-sheet="vendor-change">
        <div class="d-sheet__content vendor-change">
          <!-- Яндекс карта -->
          <div class="vendor-change__map">
            <div class="yandex-map vendor-change__map-image" v-if="optVendors.available">
              <yandex-map v-model="map" :settings="mapSettings" height="100%">
                <yandex-map-default-features-layer />
                <yandex-map-default-scheme-layer />
                <yandex-map-clusterer :grid-size="64" zoom-on-cluster-click>
                  <yandex-map-marker
                    v-for="item in optVendors.available"
                    :key="item.id"
                    position="top left-center"
                    :settings="{
                      coordinates: item.mapcoordinates,
                    }"
                    @click="checkVendor(item.id)"
                  >
                    <div class="marker">
                      <img :src="item.image" :alt="item.name" />
                    </div>
                  </yandex-map-marker>
                </yandex-map-clusterer>
              </yandex-map>
            </div>
          </div>

          <div class="vendor-change__content">
            <!-- Заголовок модалки -->
            <div class="vendor-change__title-container">
              <h3 class="vendor-change__title">Выбор поставщиков</h3>
              <button class="vendor-change__close-button" @click.prevent="close()">
                <i class="d-icon-times vendor-change__close-button-icon"></i>
                <i class="d-icon-angle-rounded-left vendor-change__title-back"></i>
              </button>
            </div>

            <!-- Выбранные поставщики -->
            <div class="vendor-change__block vendor-change__selected">
              <p class="vendor-change__block-title vendor-change__selected-title">
                Выбранные поставщики
              </p>

              <div class="vendor-change__selected-list">
                <!-- Карточка выбранного поставщика -->
                <div
                  class="vendor-change__selected-item"
                  v-for="item in optVendors.selected"
                  :key="item.id"
                >
                  <!-- Верхушка -->
                  <div class="vendor-change__selected-item-header">
                    <div class="vendor-change__selected-item-title-container">
                      <div class="vendor-change__selected-item-image-container">
                        <img
                          v-if="item.image"
                          :src="item.image"
                          alt=""
                          class="vendor-change__selected-item-image"
                        />
                        <span v-else>
                          {{ item.name.slice(0, 2).toUpperCase() }}
                        </span>
                      </div>
                      <p class="vendor-change__selected-item-title">{{ item.name }}</p>
                    </div>

                    <button
                      class="vendor-change__selected-item-delete-button"
                      @click.prevent="changeOpts(item.id, 0)"
                    >
                      <i class="d-icon-trash vendor-change__selected-item-delete-icon"></i>
                    </button>
                  </div>

                  <!-- Контент с данными -->
                  <div class="vendor-change__selected-item-content">
                    <div class="vendor-change__selected-item-data">
                      <i class="d-icon-location vendor-change__selected-item-data-icon"></i>
                      <p class="vendor-change__selected-item-data-text">
                        {{ item.address }}
                      </p>
                    </div>

                    <div class="vendor-change__selected-item-data-container">
                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-phone vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">{{ item.phone }}</p>
                      </div>

                      <div
                        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                      ></div>

                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">{{ item.email }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Данные склада -->
                  <div class="vendor-change__selected-item-footer" v-if="item.stores">
                    <div
                      class="d-radio__wrapper vendor-change__selected-item-radio-wrapper"
                      v-for="store in item.stores"
                      :key="store.id"
                    >
                      <Checkbox
                        @change="changeStores(item.id, store.id, store.active)"
                        v-model="store.active"
                        :binary="true"
                        :inputId="'store-' + store.id"
                        :name="'store-' + store.id"
                        value="true"
                      />
                      <label
                        for="warehouse1"
                        class="d-radio__label vendor-change__selected-item-radio-label"
                        >Склад #{{ store.id }},
                        {{ store.address_short ? store.address_short : store.address }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button class="d-button d-button-primary vendor-change__more">
              <span>Еще +8</span>
              <i class="d-icon-angle-rounded-right vendor-change__more-icon"></i>
            </button>

            <!-- Список подключенных поставщиков -->
            <p
              class="vendor-change__block-title vendor-change__connected-title vendor-change__connected-title--1280"
            >
              Список подключенных поставщиков
            </p>
            <div class="vendor-change__block vendor-change__connected">
              <!-- Заголовок -->
              <p class="vendor-change__block-title vendor-change__connected-title">
                Список подключенных поставщиков
              </p>

              <!-- Поиск -->
              <form class="d-search d-search--alt vendor-change__connected-search">
                <input
                  type="text"
                  v-model="this.filter"
                  @input="setFilter('filter')"
                  placeholder="Найти по адресу или наименованию склада / поставщика"
                  class="d-search__field vendor-change__connected-search-field"
                />
                <button
                  type="button"
                  class="d-button d-button-primary d-button-primary-small d-search__button box-shadow-none vendor-change__connected-search-button"
                >
                  <i
                    class="d-icon-search-big header__icon-button-icon vendor-change__connected-search-button-icon"
                  ></i>
                </button>

                <ul class="d-search__suggestions">
                  <!-- <li class="d-search__suggestion">
														Россия, Москва, Большой Предтеченский переулок, 13с4
													</li>
													<li class="d-search__suggestion">
														Россия, Москва, Большой Предтеченский переулок, 13с4
													</li>
													<li class="d-search__suggestion">
														Россия, Москва, Большой Предтеченский переулок, 13с4
													</li> -->
                </ul>
              </form>

              <!-- Список -->
              <div class="vendor-change__selected-list">
                <!-- Карточка подключенного поставщика -->
                <div
                  class="vendor-change__connected-item"
                  v-for="item in optVendors.available"
                  :key="item.id"
                >
                  <!-- Выбор -->
                  <Checkbox
                    @change="changeSelectCheckbox(item.id)"
                    v-model="vendorForm.selected[item.id]"
                    name="0"
                    :binary="true"
                  />

                  <div class="vendor-change__connected-item-content">
                    <!-- Верхушка -->
                    <div class="vendor-change__selected-item-header">
                      <div
                        class="vendor-change__selected-item-title-container vendor-change__connected-item-title-container"
                      >
                        <div class="vendor-change__selected-item-image-container">
                          <img
                            v-if="item.image"
                            :src="item.image"
                            alt=""
                            class="vendor-change__selected-item-image"
                          />
                          <span v-else>
                            {{ item.name.slice(0, 2).toUpperCase() }}
                          </span>
                        </div>
                        <p
                          class="vendor-change__selected-item-title vendor-change__connected-item-title"
                        >
                          {{ item.name }}
                        </p>
                      </div>
                    </div>

                    <!-- Контент с данными -->
                    <div class="vendor-change__selected-item-content">
                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-location vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">
                          {{ item.address }}
                        </p>
                      </div>
                      <div class="vendor-change__selected-item-data-container">
                        <div class="vendor-change__selected-item-data">
                          <i class="d-icon-phone vendor-change__selected-item-data-icon"></i>
                          <p class="vendor-change__selected-item-data-text">{{ item.phone }}</p>
                        </div>
                        <div
                          class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                        ></div>

                        <div class="vendor-change__selected-item-data">
                          <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                          <p class="vendor-change__selected-item-data-text">{{ item.email }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button class="d-button d-button-primary vendor-change__more">
              <span>Еще +8</span>
              <i class="d-icon-angle-rounded-right vendor-change__more-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { shallowRef } from 'vue'
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
  YandexMapClusterer,
} from 'vue-yandex-maps'
import { mapActions, mapGetters } from 'vuex'
import { Checkbox } from 'primevue'

export default {
  name: 'changeVendorsWindow',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['vendorCheck'],
  components: {
    YandexMap,
    YandexMapDefaultSchemeLayer,
    YandexMapDefaultFeaturesLayer,
    YandexMapMarker,
    YandexMapClusterer,
    Checkbox,
  },
  data() {
    return {
      loading: false,
      map: shallowRef(null),
      mapSettings: {
        location: {
          center: [37.420365, 55.903302],
          zoom: 9,
        },
      },
      filter: '',
      vendorForm: {
        selected: [],
      },
      multisupplier: true,
    }
  },
  computed: {
    ...mapGetters({
      optVendors: 'org/optVendors'
    }),
    avLength() {
      return Object.keys(this.items.available).length
    },
  },
  methods: {
    ...mapActions({
      toggleOptsVisible: 'org/toggleOptsVisible',
      getOptVendors: 'org/getOptVendors',
    }),
    close() {
      this.$emit('close')
    },
    checkVendor(id) {
      if (!this.multisupplier) {
        for (let i = 0; i < this.vendorForm.selected.length; i++) {
          // if (i !== id) {
          this.vendorForm.selected[i] = false
          // }
        }
        this.vendorForm.selected[id] = true
      }
      if (this.multisupplier) {
        this.vendorForm.selected[id] = !this.vendorForm.selected[id]
      }
    },
    // Установка чекбокса поставщика
    changeSelectCheckbox(id) {
      if (!this.multisupplier) {
        for (let i = 0; i < this.vendorForm.selected.length; i++) {
          this.vendorForm.selected[i] = false
        }
        this.vendorForm.selected[id] = true
      }
    },
    changeOpts(id, action) {
      this.loading = true
      const data = {
        id: id,
        action: action,
      }
      this.toggleOptsVisible(data).then(() => {
        this.$emit('vendorCheck')
        this.loading = false
      })
    },
    setFilter(type) {
      if (type === 'filter') {
        if (this.filter.length >= 3 || this.filter.length === 0) {
          setTimeout(() => {
            this.loading = true
            this.getOptVendors({
              filter: this.filter,
            }).then(() => {
              this.loading = false
            })
          }, 400)
        }
      }
    },
    changeStores(org_id, store_id, active) {
      console.log(org_id, store_id, active)
      this.opt_api({
        action: 'toggle/vendors/stores',
        active: active,
        extended_name:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart',
        id:
          router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
            ? router.currentRoute._value.params.id_org_from
            : router.currentRoute._value.params.id,
        org_id: org_id,
        store_id: store_id,
      }).then((result) => {
        this.loading = false
        this.get_opt_vendors_from_api()
        this.vendorForm.selected = []
        this.$emit('vendorCheck')
        this.get_opt_products_from_api({
          page: 1,
          perpage: 25,
        })
      })
    },
    checkVendors() {
      let error = true
      this.vendorForm.selected.forEach((element) => {
        if (element) {
          error = false
        }
      })
      if (!error) {
        if (!this.multisupplier) {
          for (let i = 0; i < this.items.selected.length; i++) {
            const data = {
              id: this.items.selected[i].id,
              action: 0,
              extended_name:
                router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
                  ? 'offer'
                  : 'cart',
              store:
                router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
                  ? router.currentRoute._value.params.id_org_from
                  : router.currentRoute._value.params.id,
            }
            this.toggle_opts_visible(data)
          }
        }
        this.loading = true
        this.$load(async () => {
          await this.toggle_opts_visible({
            action: 1,
            store:
              router?.currentRoute?._value.matched[4]?.name == 'purchases_offer'
                ? router.currentRoute._value.params.id_org_from
                : router.currentRoute._value.params.id,
            extended_name:
              router?.currentRoute?._value.matched[4]?.name == 'purchases_offer' ? 'offer' : 'cart',
            id: this.vendorForm.selected,
          })
            .then((result) => {
              this.loading = false
              this.get_opt_vendors_from_api()
              this.vendorForm.selected = []
              this.$emit('vendorCheck')
              this.get_opt_products_from_api({
                page: 1,
                perpage: 25,
              })
            })
            .catch((result) => {
              console.log(result)
            })

          this.get_opt_warehouse_catalog_from_api()
        })
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Укажите поставщиков',
          detail: 'Для того, чтобы выбрать поставщиков, отметьте флажки рядом с ними',
          life: 3000,
        })
      }
    },
  },
}
</script>
<style lang="scss">
.d-search__field {
  background: transparent;
}
.vendor-change__close-button,
.vendor-change__selected-item-delete-button {
  color: #282828;
}
.d-sheet__overlay {
  transition: all 0.2s ease;
  left: auto;
  left: 3333px;
  &.active {
    left: 0;
    transition: all 0.2s ease;
  }
}
@media (width <= 1920px) {
  .vendor-change__sheet {
    padding: 20px;
    width: 940px;
  }
}
.d-sheet {
  backdrop-filter: blur(17.5px);
}
.d-sheet__wrapper {
  position: fixed;
  top: var(--header-height);
  height: calc(100vh - var(--header-height));
}
.vendor-change__content .p-checkbox-checked .p-checkbox-box,
.vendor-change__content
  .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover)
  .p-checkbox-box {
  border-color: rgba(249, 44, 13, 1);
  background: rgba(249, 44, 13, 1);
}
</style>
