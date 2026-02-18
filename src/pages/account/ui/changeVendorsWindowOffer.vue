<template>
  <div class="d-sheet__overlay vendor-change__sheet-overlay" :class="{ active: active }">
    <div class="d-sheet__wrapper vendor-change__sheet-wrapper" v-if="vendorOfferAvailable.items">
      <div
        class="d-sheet d-sheet--active vendor-change__sheet"
        data-sheet="vendor-change"
        :class="offer ? 'd-sheet__overlay-500' : ''"
      >
        <Loader v-if="this.loading" />
        <div class="d-sheet__content vendor-change">
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
                <!-- <div v-if="error" class="d-input-error vendor-change-error">
                    <i class="d-icon-warning d-input-error__icon"></i>
                    <span class="d-input-error__text">Вы должны выбрать хотя бы один склад</span>
                  </div> -->
                <div
                  class="vendor-change__selected-item"
                  v-for="item in vendorOfferSelected.items"
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
                      <p class="vendor-change__selected-item-title">
                        {{ item.name }}
                      </p>
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
                        <p class="vendor-change__selected-item-data-text">
                          {{ item.phone }}
                        </p>
                      </div>

                      <div
                        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                      ></div>

                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">
                          {{ item.email }}
                        </p>
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
                        :inputId="'offer-' + store.id"
                        :name="'offer-' + store.id"
                        :value="true"
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
              </form>

              <!-- Список -->
              <div class="vendor-change__selected-list">
                <!-- Карточка подключенного поставщика -->
                <div
                  class="vendor-change__connected-item"
                  v-for="item in vendorOfferAvailable.items"
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
import { mapActions, mapGetters } from 'vuex'
import { Checkbox } from 'primevue'
import Paginate from 'vuejs-paginate-next'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'changeVendorsWindowOffer',
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
  emits: ['vendorCheck', 'catalogUpdate', 'close'],
  components: {
    Checkbox,
    Loader,
    Paginate,
  },
  data() {
    return {
      loading: false,
      pageSelected: 1,
      pageAvailable: 1,
      filter: '',
      vendorForm: {
        selected: [],
      },
      multisupplier: true,
    }
  },
  computed: {
    ...mapGetters({
      vendorOfferAvailable: 'offer/vendorOfferAvailable',
      vendorOfferSelected: 'offer/vendorOfferSelected',
    }),
    avLength() {
      return this.vendorOfferAvailable.total
    },
    pagesCountAvailable() {
      let pages = Math.ceil(this.vendorOfferAvailable.total / this.cfg.vendors.perpage)
      if (pages === 0) {
        pages = 1
      }
      return pages
    },
    pagesCountSelected() {
      let pages = Math.ceil(this.vendorOfferSelected.total / this.cfg.vendors.perpage)
      if (pages === 0) {
        pages = 1
      }
      return pages
    },
    avLengthOffer() {
      return this.vendorOfferAvailable.total
    },
    pagesCountAvailableOffer() {
      let pages = Math.ceil(this.vendorOfferAvailable.total / this.cfg.vendors.perpage)
      if (pages === 0) {
        pages = 1
      }
      return pages
    },
    pagesCountSelectedOffer() {
      let pages = Math.ceil(this.vendorOfferSelected.total / this.cfg.vendors.perpage)
      if (pages === 0) {
        pages = 1
      }
      return pages
    },
  },
  mounted() {
    this.getOptVendorsOfferSelected({
      filter: '',
      page: this.pageSelected,
      perpage: this.cfg.vendors.perpage,
    })
  },
  methods: {
    ...mapActions({
      toggleOptsVisible: 'offer/toggleOptsVisible',
      toggleOpts: 'offer/toggleOpts',
      toggleVendorStores: 'offer/toggleVendorStores',
      getOptVendorOffer: 'offer/getOptVendorOffer',
      getOptVendorsOfferSelected: 'offer/getOptVendorsOfferSelected',
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
        this.getOptVendorOffer({
          filter: '',
          page: this.pageAvailable,
          perpage: this.cfg.vendors.perpage,
        }).then(() => {
          this.getOptVendorsOfferSelected({
            filter: '',
            page: this.pageSelected,
            perpage: this.cfg.vendors.perpage,
          }).then(() => {
            this.loading = false
            this.$emit('catalogUpdate')
            this.$emit('vendorCheck')
          })
        })
      })
    },
    pagClickCallbackSelected(pageNum) {
      this.pageSelected = pageNum
      this.loading = true
      this.getOptVendorsOfferSelected({
        filter: this.filter,
        page: this.pageSelected,
        perpage: this.cfg.vendors.perpage,
      }).then(() => {
        this.loading = false
      })
    },
    pagClickCallbackAvailable(pageNum) {
      this.pageAvailable = pageNum
      this.getOptVendorOffer({
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
            this.getOptVendorOffer({
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
      console.log(active)
      //если снимаем галочку
      let col_active_stores = 0
      if (active == false) {
        //проверяем, остались ли активные склады, кроме этого
        for (let i = 0; i < this.vendorOfferSelected.items.length; i++) {
          if (this.vendorOfferSelected.items[i].id == org_id) {
            for (let ii = 0; ii < this.vendorOfferSelected.items[i].stores.length; ii++) {
              if (this.vendorOfferSelected.items[i].stores[ii].active) {
                col_active_stores++
                console.log(col_active_stores)
              }
            }
          }
        }
      }
      if ((active == false && col_active_stores > 0) || active == true) {
        this.toggleVendorStores({
          active: active,
          org_id: org_id,
          store_id: store_id,
        }).then(() => {
          this.loading = false
          this.getOptVendorOffer({
            filter: '',
            page: this.pageAvailable,
            perpage: this.cfg.vendors.perpage,
          }).then(() => {
            this.getOptVendorsOfferSelected({
              filter: '',
              page: this.pageSelected,
              perpage: this.cfg.vendors.perpage,
            }).then(() => {
              this.loading = false
            })
          })
          this.vendorForm.selected = []
          this.$emit('catalogUpdate')
          this.$emit('vendorCheck')
        })
      } else {
        this.changeOpts(org_id, 0)
      }
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
            this.getOptVendorOffer({
              filter: '',
              page: this.pageAvailable,
              perpage: this.cfg.vendors.perpage,
            }).then(() => {
              this.getOptVendorsOfferSelected({
                filter: '',
                page: this.pageSelected,
                perpage: this.cfg.vendors.perpage,
              }).then(() => {
                this.loading = false
              })
            })
            this.vendorForm.selected = []
            this.$emit('catalogUpdate')
            this.$emit('vendorCheck')
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
  },
  watch: {
    offer: function (newVal) {
      if (newVal == false) {
        this.close()
      }
    },
    '$route.matched': function (newVal) {
      if (newVal[5] && newVal[5].name != 'WholesaleClientsOffer') {
        this.close()
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
// @media (width <= 3000px) {
//   .vendor-change__sheet {
//     padding: 20px;
//     width: 940px;
//   }
// }
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
