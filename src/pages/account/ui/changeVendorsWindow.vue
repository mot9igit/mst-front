<template>
  <div class="d-sheet__overlay vendor-change__sheet-overlay" :class="{ active: active }">
    <div class="d-sheet__wrapper vendor-change__sheet-wrapper" v-if="optVendorsAvailable.items">
      <div
        class="d-sheet d-sheet--active vendor-change__sheet"
        data-sheet="vendor-change"
        :class="offer ? 'd-sheet__overlay-500' : ''"
      >
        <Loader v-if="this.loading" />
        <div class="d-sheet__content vendor-change">
          <!-- Яндекс карта -->
          <div class="vendor-change__map" v-if="!offer">
            <div class="yandex-map vendor-change__map-image" v-if="optVendorsAvailable.items">
              <yandex-map v-model="map" :settings="mapSettings" height="100%">
                <yandex-map-default-features-layer />
                <yandex-map-default-scheme-layer />
                <yandex-map-marker
                  v-for="item in optVendorsAvailable.items"
                  :key="item.mapcoordinates"
                  :settings="{
                    coordinates: item.mapcoordinates,
                  }"
                  @click="checkVendor(item.id)"
                >
                  <div class="marker">
                    <img :src="item.image" :alt="item.name" />
                  </div>
                </yandex-map-marker>
                <template #cluster="{ length }">
                  <div
                    class="cluster fade-in"
                    :style="{
                      background: background,
                    }"
                  >
                    {{ length }}
                  </div>
                </template>
              </yandex-map>
            </div>
          </div>

          <div class="vendor-change__content">
            <!-- Заголовок модалки -->
            <div class="vendor-change__title-container">
              <h3 class="vendor-change__title" v-if="!offer">Выбор поставщиков</h3>
              <h3 class="vendor-change__title" v-else>Выбор склада для создания предложения</h3>
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

              <div class="vendor-change__selected-list" v-if="!offer">
                <!-- Карточка выбранного поставщика -->
                <div
                  class="vendor-change__selected-item"
                  v-for="item in optVendorsSelected.items"
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
              <div class="vendor-change__selected-list" v-else>
                <!-- Карточка выбранного поставщика -->
                <div class="vendor-change__selected-item">
                  <!-- Верхушка -->
                  <div class="vendor-change__selected-item-header">
                    <div class="vendor-change__selected-item-title-container">
                      <div class="vendor-change__selected-item-image-container">
                        <img
                          v-if="vendorOffer?.items?.image"
                          :src="vendorOffer.items.image"
                          alt=""
                          class="vendor-change__selected-item-image"
                        />
                        <span v-else>
                          {{ vendorOffer?.items?.name.slice(0, 2).toUpperCase() }}
                        </span>
                      </div>
                      <p class="vendor-change__selected-item-title">
                        {{ vendorOffer?.items?.name }}
                      </p>
                    </div>
                  </div>

                  <!-- Контент с данными -->
                  <div class="vendor-change__selected-item-content">
                    <div class="vendor-change__selected-item-data">
                      <i class="d-icon-location vendor-change__selected-item-data-icon"></i>
                      <p class="vendor-change__selected-item-data-text">
                        {{ vendorOffer?.items?.address }}
                      </p>
                    </div>

                    <div class="vendor-change__selected-item-data-container">
                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-phone vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">
                          {{ vendorOffer?.items?.phone }}
                        </p>
                      </div>

                      <div
                        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                      ></div>

                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">
                          {{ vendorOffer?.items?.email }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Данные склада -->
                  <div v-if="error" class="d-input-error vendor-change-error">
                    <i class="d-icon-warning d-input-error__icon"></i>
                    <span class="d-input-error__text">Вы должны выбрать хотя бы один склад</span>
                  </div>
                  <div
                    class="vendor-change__selected-item-footer"
                    v-if="vendorOffer?.items?.stores"
                  >
                    <div
                      class="d-radio__wrapper vendor-change__selected-item-radio-wrapper"
                      v-for="store in vendorOffer.items.stores"
                      :key="store.id"
                    >
                      <Checkbox
                        @change="setOfferStores"
                        v-model="offerStoresSelected"
                        :binary="false"
                        :inputId="'offer-' + store.id"
                        :name="'offer-' + store.id"
                        :value="store.id"
                      />
                      <label
                        :for="'offer-' + store.id"
                        class="d-radio__label vendor-change__selected-item-radio-label"
                        >Склад #{{ store.id }},
                        {{ store.address_short ? store.address_short : store.address }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-pagination-wrap" v-if="pagesCountSelected > 1">
              <Paginate
                :page-count="pagesCountSelected"
                :click-handler="pagClickCallbackSelected"
                :prev-text="'Пред'"
                :next-text="'След'"
                :container-class="'d-pagination d-table__footer-right-pagination'"
                :page-class="'d-pagination__item'"
                :active-class="'d-pagination__item--active'"
                :initialPage="this.pageSelected"
                :forcePage="this.pageSelected"
              >
              </Paginate>
            </div>

            <!-- Список подключенных поставщиков -->
            <p
              class="vendor-change__block-title vendor-change__connected-title vendor-change__connected-title--1280"
              v-if="!offer"
            >
              Список подключенных поставщиков
            </p>
            <div class="vendor-change__block vendor-change__connected" v-if="!offer">
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
              </form>

              <!-- Список -->
              <div class="vendor-change__selected-list">
                <!-- Карточка подключенного поставщика -->
                <div
                  class="vendor-change__connected-item"
                  v-for="item in optVendorsAvailable.items"
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

            <div class="d-pagination-wrap" v-if="pagesCountAvailable > 1">
              <Paginate
                :page-count="pagesCountAvailable"
                :click-handler="pagClickCallbackAvailable"
                :prev-text="'Пред'"
                :next-text="'След'"
                :container-class="'d-pagination d-table__footer-right-pagination'"
                :page-class="'d-pagination__item'"
                :active-class="'d-pagination__item--active'"
                :initialPage="this.pageAvailable"
                :forcePage="this.pageAvailable"
              >
              </Paginate>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, shallowRef } from 'vue'
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
} from 'vue-yandex-maps'
import { mapActions, mapGetters } from 'vuex'
import { Checkbox } from 'primevue'
import Paginate from 'vuejs-paginate-next'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'changeVendorsWindow',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    offer: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['vendorCheck', 'catalogUpdate', 'offerStoresSelected'],
  components: {
    YandexMap,
    YandexMapDefaultSchemeLayer,
    YandexMapDefaultFeaturesLayer,
    YandexMapMarker,
    Checkbox,
    Loader,
    Paginate,
  },
  data() {
    return {
      loading: false,
      pageSelected: 1,
      pageAvailable: 1,
      map: shallowRef(null),
      gridSize: ref(128),
      bounds: ref([
        [0, 0],
        [0, 0],
      ]),
      trueBounds: ref([
        [0, 0],
        [0, 0],
      ]),
      clusterer: shallowRef(null),
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
      offerStoresSelected: [],
      error: false,
    }
  },
  computed: {
    ...mapGetters({
      optVendorsAvailable: 'org/optVendorsAvailable',
      optVendorsSelected: 'org/optVendorsSelected',
      vendorOffer: 'offer/vendorOffer',
    }),
    avLength() {
      return this.optVendorsAvailable.total
    },
    pagesCountAvailable() {
      let pages = Math.ceil(this.optVendorsAvailable.total / this.cfg.vendors.perpage)
      if (pages === 0) {
        pages = 1
      }
      return pages
    },
    pagesCountSelected() {
      let pages = Math.ceil(this.optVendorsSelected.total / this.cfg.vendors.perpage)
      if (pages === 0) {
        pages = 1
      }
      return pages
    },
  },
  mounted() {
    if (this.offer == true) {
      this.offerStoresSelected = []
      this.getOptVendorOffer().then(() => {
        for (let i = 0; i < this.vendorOffer.items.stores.length; i++) {
          this.offerStoresSelected.push(this.vendorOffer.items.stores[i].id)
        }
      })
    }
  },
  methods: {
    ...mapActions({
      toggleOptsVisible: 'org/toggleOptsVisible',
      getOptVendorsAvailable: 'org/getOptVendorsAvailable',
      getOptVendorsSelected: 'org/getOptVendorsSelected',
      toggleOpts: 'org/toggleOpts',
      toggleVendorStores: 'org/toggleVendorStores',
      getOptVendorOffer: 'offer/getOptVendorOffer',
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
      this.checkVendors()
    },
    // Установка чекбокса поставщика
    changeSelectCheckbox(id) {
      this.vendorForm.selected[id] = true
      this.checkVendors()
    },
    changeOpts(id, action) {
      this.loading = true
      const data = {
        id: id,
        action: action,
      }
      this.toggleOpts(data).then(() => {
        this.getOptVendorsAvailable({
          filter: '',
          page: this.pageAvailable,
          perpage: this.cfg.vendors.perpage,
        }).then(() => {
          this.getOptVendorsSelected({
            filter: '',
            page: this.pageSelected,
            perpage: this.cfg.vendors.perpage,
          }).then(() => {
            this.loading = false
            this.$emit('catalogUpdate')
          })
        })
      })
    },
    pagClickCallbackSelected(pageNum) {
      this.pageSelected = pageNum
      this.loading = true
      this.getOptVendorsSelected({
        filter: this.filter,
        page: this.pageSelected,
        perpage: this.cfg.vendors.perpage,
      }).then(() => {
        this.loading = false
      })
    },
    pagClickCallbackAvailable(pageNum) {
      this.pageAvailable = pageNum
      this.getOptVendorsAvailable({
        filter: this.filter,
        page: this.pageAvailable,
        perpage: this.cfg.vendors.perpage,
      }).then(() => {
        this.loading = false
      })
    },
    setFilter(type) {
      this.pageAvailable = 1
      if (type === 'filter') {
        if (this.filter.length >= 3 || this.filter.length === 0) {
          setTimeout(() => {
            this.loading = true
            this.getOptVendorsAvailable({
              filter: this.filter,
              page: this.pageAvailable,
              perpage: this.cfg.vendors.perpage,
            }).then(() => {
              this.loading = false
            })
          }, 400)
        }
      }
    },
    changeStores(org_id, store_id, active) {
      this.toggleVendorStores({
        active: active,
        org_id: org_id,
        store_id: store_id,
      }).then(() => {
        this.loading = false
        this.getOptVendorsAvailable({
          filter: '',
          page: this.pageAvailable,
          perpage: this.cfg.vendors.perpage,
        }).then(() => {
          this.getOptVendorsSelected({
            filter: '',
            page: this.pageSelected,
            perpage: this.cfg.vendors.perpage,
          }).then(() => {
            this.loading = false
          })
        })
        this.vendorForm.selected = []
        this.$emit('catalogUpdate')
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
        this.loading = true
        this.toggleOpts({
          action: 1,
          id: this.vendorForm.selected,
        })
          .then(() => {
            this.loading = false
            this.getOptVendorsAvailable({
              filter: '',
              page: this.pageAvailable,
              perpage: this.cfg.vendors.perpage,
            }).then(() => {
              this.getOptVendorsSelected({
                filter: '',
                page: this.pageSelected,
                perpage: this.cfg.vendors.perpage,
              }).then(() => {
                this.loading = false
              })
            })
            this.vendorForm.selected = []
            this.$emit('catalogUpdate')
          })
          .catch((result) => {
            console.log(result)
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
    debounce(func, delay) {
      clearTimeout(this.searchPTimer)
      this.searchPTimer = setTimeout(func, delay)
    },
    setOfferStores() {
      this.error = false
      if (this.offerStoresSelected.length == 0) {
        this.error = true
        this.debounce(() => {
          this.error = false
        }, 2000)
        this.offerStoresSelected.push(this.vendorOffer.items.stores[0].id)
        this.$emit('offerStoresSelected')
      } else {
        this.$emit('offerStoresSelected')
      }
    },
  },
  watch: {
    vendorOffer: function (newVal) {
      for (let i = 0; i < newVal.items.stores.length; i++) {
        this.offerStoresSelected.push(newVal.items.stores[i].id)
      }
    },
  },
}
</script>
<style lang="scss">
.marker {
  width: 30px;
  height: 30px;
  display: block;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #dedede;
}
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
@media (width <= 3000px) {
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
.d-sheet__overlay-500 {
  width: 500px !important;
}
.vendor-change-error {
  margin-bottom: 16px;
}
</style>
