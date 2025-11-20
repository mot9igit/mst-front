<template>
  <section class="shipments vendors" id="shipments">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>

    <div class="clients__header">
      <div class="clients__header-title-wrapper">
        <h1 class="clients__header-title">
          Мои поставщики (<span v-if="opts.total > -1">{{ opts.total }}</span
          ><span v-else>0</span>)
        </h1>
      </div>
      <p class="clients__header-description">
        Доступные организации, которые являются вашими поставщиками
      </p>
    </div>

    <div class="clients__filters">
      <div class="clients__filters-left" v-if="Object.keys(opts.items).length">
        <div class="clients__filters-input-container" v-for="(ffilter, i) in filters" :key="i">
          <div class="d-input d-input--light clients__filters-input" v-if="ffilter.type == 'text'">
            <input
              type="text"
              :id="ffilter.name"
              :placeholder="ffilter.placeholder"
              :name="i"
              class="d-input__field clients__filters-input-field"
              v-model="filterText"
              @input="setFilter('filter')"
            />
            <!---->
            <div class="d-input__actions clients__filters-input-actions">
              <button class="d-icon-wrapper clients__filters-input-button">
                <i class="d-icon-search-big"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
        @click.prevent="this.modalAdd = true"
      >
        <i class="d-icon-plus-flat clients__filters-create-icon"></i>
        Добавить поставщика
      </button>
    </div>
    <Loader v-if="loading" />
    <div class="clients__card-container" v-else>
      <template v-if="Object.keys(opts.items).length">
        <div class="clients__card dart-row" v-for="(item, index) in opts.items" :key="index">
          <div class="clients__card-left d-col-21">
            <div class="clients__card-info d-col-7 clients__devider">
              <div class="clients__card-info-image-container">
                <img :src="item.image" alt="" class="clients__card-info-image" />
              </div>
              <div class="clients__card-info-content">
                <p class="clients__card-info-title">{{ item.name }}</p>
                <div class="clients__card-info-address">
                  <i class="d-icon-location clients__card-info-address-icon"></i>
                  <span>{{
                    item.req?.fact_address != '' ? item.req?.fact_address : 'адрес не указан'
                  }}</span>
                </div>
              </div>
            </div>

            <div class="clients__card-data d-col-14">
              <div class="clients__card-inn d-col-12 clients__devider">
                <p class="clients__card-inn-label">ИНН:</p>
                <p class="clients__card-inn-value">
                  {{ item.req?.inn != '' ? item.req?.inn : 'не указан' }}
                </p>
              </div>
<!-- clients__devider -->
              <div class="clients__card-contact-container d-col-12 ">
                <a :href="'tel:' + item.phone.replace(/[^+\d]/g, '')" class="clients__card-contact">
                  <i class="d-icon-telephone clients__card-contact-icon"></i>
                  <span>{{ item.phone }}</span>
                </a>
                <a :href="'mailto:' + item.email" class="clients__card-contact">
                  <i class="d-icon-mail2 clients__card-contact-icon"></i>
                  <span>{{ item.email }}</span>
                </a>
              </div>
            </div>
          </div>

          <div class="clients__card-right d-col-3">
            <!--  <div class="clients__card-right-left d-col-3">
             <div class="d-divider d-divider--vertical clients__card-divider"></div>
           <div class="clients__card-price-container">
              <div class="clients__card-price">
                <span class="clients__card-price-label">ДЗ:</span>
                <span class="clients__card-price-value">5 500 000 ₽</span>
              </div>
              <div class="clients__card-price clients__card-price--secondary">
                <span class="clients__card-price-label">ПЗД:</span>
                <span class="clients__card-price-value">3 200 000 ₽</span>
              </div>
            </div>

            <div class="clients__card-vendor" v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id">Создан поставщиком</div>
          </div>-->
            <div class="clients__card-right-right d-col-24">
              <div class="clients__card-action-container d-col-6">
                <!-- <button class="clients__card-action" @click.prevent="changeOpts(item.id, '')">
                  <i class="d-icon-trash"></i>
                </button> -->
              </div>
            </div>
          </div>

          <div class="clients__card-top">
            <div class="clients__card-info">
              <div class="clients__card-info-image-container">
                <img src="/icons/spo-logo.svg" alt="" class="clients__card-info-image" />
              </div>
              <div class="clients__card-info-content">
                <p class="clients__card-info-title">{{ item.name }}</p>
                <div class="clients__card-info-address">
                  <i class="d-icon-location clients__card-info-address-icon"></i>
                  <span>{{
                    item.req?.fact_address != '' ? item.req?.fact_address : 'адрес не указан'
                  }}</span>
                </div>
              </div>
            </div>

            <div class="clients__card-top-right">
              <div class="clients__card-top-right-top">
                <!--
                <button class="d-button d-button-primary d-button--sm-shadow clients__card-offer">
                  <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                  Предложение
                </button>
                -->
                <div class="clients__card-action-container">
                  <!--
                    <button class="clients__card-action">
                      <i class="d-icon-pen2"></i>
                    </button>

                  <div
                    class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
                  ></div>
                  -->
                  <button class="clients__card-action" @click.prevent="changeOpts(item.id, '')">
                    <i class="d-icon-trash"></i>
                  </button>
                </div>
              </div>
              <div class="clients__card-vendor-wrapper">
                <!--
                  <div
                    class="clients__card-vendor"
                    v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id"
                  >
                    Создан поставщиком
                  </div>
                -->
              </div>
            </div>
          </div>

          <div class="clients__card-bottom">
            <div class="clients__card-bottom-left">
              <div class="clients__card-contact-container">
                <a :href="'tel:' + item.phone.replace(/[^+\d]/g, '')" class="clients__card-contact">
                  <i class="d-icon-telephone clients__card-contact-icon"></i>
                  <span>{{ item.phone }}</span>
                </a>
                <a :href="'mailto:' + item.email" class="clients__card-contact">
                  <i class="d-icon-mail2 clients__card-contact-icon"></i>
                  <span>{{ item.email }}</span>
                </a>
              </div>
              <div class="clients__card-inn">
                <p class="clients__card-inn-label">ИНН:</p>
                <p class="clients__card-inn-value">
                  {{ item.req?.inn != '' ? item.req?.inn : 'не указан' }}
                </p>
              </div>
            </div>

            <!--<div class="clients__card-price-container">
            <div class="clients__card-price">
              <span class="clients__card-price-label">ДЗ:</span>
              <span class="clients__card-price-value">5 500 000 ₽</span>
            </div>
            <div class="clients__card-price clients__card-price--secondary">
              <span class="clients__card-price-label">ПЗД:</span>
              <span class="clients__card-price-value">3 200 000 ₽</span>
            </div>
          </div>-->
          </div>
          <div class="clients__card-top-mobile">
            <div class="clients__card-top-right-top">
              <!--
              <button class="d-button d-button-primary d-button--sm-shadow clients__card-offer">
                <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                Предложение
              </button>
              -->
              <div class="clients__card-action-container">
                <!--
                <button class="clients__card-action">
                  <i class="d-icon-pen2"></i>
                </button>
                <div
                  class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
                ></div>
                -->
                <button class="clients__card-action" @click.prevent="changeOpts(item.id, '')">
                  <i class="d-icon-trash"></i>
                </button>
              </div>
            </div>
            <!--
            <div class="clients__card-vendor-wrapper">
              <div
                class="clients__card-vendor"
                v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id"
              >
                Создан поставщиком
              </div>
            </div>
            -->
          </div>
        </div>
      </template>
      <template v-else>
        <div class="dart-alert dart-alert-info">Подключенные Поставщики не найдены.</div>
      </template>
      <div class="clients__paginate" v-if="this.countPages > 1">
        <paginate
          :page-count="this.countPages"
          :click-handler="pagClickCallback"
          :prev-text="'Пред'"
          :next-text="'След'"
          :container-class="'d-pagination d-table__footer-right-pagination'"
          :page-class="'d-pagination__item'"
          :active-class="'d-pagination__item--active'"
          :initialPage="this.page"
          :forcePage="this.page"
        >
        </paginate>
      </div>
    </div>
    <teleport to="body" v-if="this.modalAdd === true">
      <customModal v-model="this.modalAdd" class="clients-form__modal-main">
        <addVendorWindow @closeAddWindow="close()" @addVendor="addNewVendor()" />
      </customModal>
    </teleport>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Paginate from 'vuejs-paginate-next'
import Loader from '@/shared/ui/Loader.vue'
import { toRaw } from 'vue'
import customModal from '@/shared/ui/Modal.vue'
import addVendorWindow from '../account/ui/addVendorWindow.vue'

export default {
  name: 'purchasesVendors',
  components: { Breadcrumbs, Loader, Paginate, customModal, addVendorWindow },
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25,
    },
    pagination_offset: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: true,
      modalAdd: false,
      page: 1,
      filterText: '',
      countPages: 0,
      filters: {
        name: {
          name: 'Название организации',
          placeholder: 'Введите название организации',
          type: 'text',
        },
      },
    }
  },
  methods: {
    ...mapActions({
      getOpts: 'purchases/getOpts',
      toggleOpts: 'purchases/toggleOpts',
      unsetOpts: 'purchases/unsetOpts',
      getOptVendorsAvailable: 'org/getOptVendorsAvailable',
      getOptVendorsSelected: 'org/getOptVendorsSelected',
    }),
    setFilter(type = '0') {
      if (type === 'filter') {
        if (this.filterText.length >= 3 || this.filterText.length === 0) {
          setTimeout(() => {
            this.filter({
              filter: this.filterText,
              filtersdata: toRaw(this.filterValues),
              page: 1,
              perpage: this.pagination_items_per_page,
            })
          })
        }
      } else {
        this.filter({
          filter: this.filterText,
          filtersdata: toRaw(this.filterValues),
          page: 1,
          perpage: this.pagination_items_per_page,
        })
      }
    },
    // TODO: сделать подтверждение удаления
    changeOpts(id, action) {
      const data = {
        id: id,
        action: action,
      }
      this.toggleOpts(data).then(() => {
        this.loading = true
        this.unsetOpts()
        this.page = 1
        this.getOpts(data).then(() => {
          this.loading = false
          this.updateVendors()
        })
      })
    },
    filter(data) {
      console.log(data)
      this.loading = true
      this.unsetOpts()
      this.page = 1
      this.getOpts(data).then(() => {
        this.loading = false
      })
    },
    pagClickCallback(pageNum) {
      this.paginate({
        filter: this.filterText,
        filtersdata: toRaw(this.filterValues),
        page: pageNum,
        perpage: this.pagination_items_per_page,
      })
      const el = document.querySelector('.clients__card-container')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    paginate(data) {
      this.loading = true
      this.unsetOpts()
      this.page = data.page
      this.getOpts(data).then(() => {
        this.loading = false
      })
    },
    close() {
      this.modalAdd = false
    },
    addNewVendor() {
      this.modalAdd = false
      this.getOpts({
        page: this.page,
        perpage: this.pagination_items_per_page,
      }).then(() => {
        this.loading = false
        this.updateVendors()
      })
    },
    updateVendors() {
      this.getOptVendorsAvailable({
        filter: '',
        page: 1,
        perpage: this.cfg.vendors.perpage,
      }).then(() => {
        this.getOptVendorsSelected({
          filter: '',
          page: 1,
          perpage: this.cfg.vendors.perpage,
        }).then(() => {})
      })
    },
  },
  mounted() {
    this.getOpts({
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      opts: 'purchases/opts',
    }),
  },
  watch: {
    opts: function () {
      this.countPages = Math.ceil(this.opts.total / this.pagination_items_per_page)
      if (this.countPages === 0) {
        this.countPages = 1
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.clients__card-right-right {
  justify-content: end;
}
.modal__content .clients-info__label {
  margin: 40px 0 20px;
}
.modal__content .d-button {
  margin-top: 40px;
}
</style>
