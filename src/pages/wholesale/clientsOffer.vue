<template>
  <section class="promos" id="promos">
    <div class="promos__header">
      <h1 class="promos__header-title">Предложение для {{ orgName.name }}</h1>
      <!--
        <button class="d-select promos__header-select">
          <span class="d-select__title">Акции по брендам</span>
          <i class="d-icon-angle-rounded-bottom-bold d-select__arrow promos__header-select-icon"></i>
        </button>
      -->
    </div>
    <div v-if="opts.total > 0">
      <div class="promos__banners" v-if="salesBanners.count > 0">
        <div class="dart-row promos__banners-row">
          <div class="d-col-24">
            <Swiper
              :slides-per-view="1"
              :space-between="10"
              :pagination="{ clickable: true }"
              :autoplay="{ delay: 10000, disableOnInteraction: false }"
            >
              <template v-for="n in getCount" :key="n">
                <SwiperSlide v-if="n < 4">
                  <router-link
                    :to="{
                      name: 'purchasesAction',
                      params: { action_id: salesBanners.items[n - 1].action_id },
                    }"
                    v-if="n < 5"
                    class="promos__banners-item promos__banners-item--primary promos__banners-item--big"
                  >
                    <img
                      class="promos__banners-item-image"
                      :src="salesBanners.items[n - 1].image.image"
                      :srcset="
                        salesBanners.items[n - 1].image.image +
                        ' 2x, ' +
                        salesBanners.items[n - 1].image.image +
                        ' 1x'
                      "
                      alt=""
                      loading="lazy"
                    />
                    <div class="promos__banners-item-badges">
                      <div class="promos__banners-item-badges-item">Реклама</div>
                      <span class="promos__banners-item-badges-text">0+</span>
                    </div>
                  </router-link>
                </SwiperSlide>
              </template>
            </Swiper>
          </div>
        </div>
        <div class="dart-row promos__banners-row" v-if="getCount > 4">
          <template v-for="n in getCount" :key="n">
            <div class="d-col-24 d-col-sm-12" v-if="n > 4 && n < 7">
              <div class="promos__banners-item promos__banners-item--primary">
                <router-link
                  :to="{
                    name: 'purchasesAction',
                    params: { action_id: salesBanners.items[n - 1].action_id },
                  }"
                >
                  <img
                    class="promos__banners-item-image"
                    :src="salesBanners.items[n - 1].image.thumb_medium"
                    :srcset="
                      salesBanners.items[n - 1].image.image +
                      ' 2x, ' +
                      salesBanners.items[n - 1].image.thumb_medium +
                      ' 1x'
                    "
                    alt=""
                    loading="lazy"
                  />
                  <!--
                <div class="promos__banners-item-badges">
                  <div class="promos__banners-item-badges-item">
                    Реклама
                  </div>
                  <span class="promos__banners-item-badges-text">0+</span>
                </div>
                -->
                </router-link>
              </div>
            </div>
          </template>
        </div>
        <div class="dart-row promos__banners-row promos__banners-row--small" v-if="getCount > 6">
          <template v-for="n in getCount" :key="n">
            <div class="d-col-8">
              <div
                class="promos__banners-item promos__banners-item--primary promos__banners-item--small"
              >
                <router-link
                  :to="{
                    name: 'purchasesAction',
                    params: { action_id: salesBanners.items[n - 1].action_id },
                  }"
                >
                  <img
                    class="promos__banners-item-image"
                    :src="salesBanners.items[n - 1].image.thumb_medium"
                    :srcset="
                      salesBanners.items[n - 1].image.image +
                      ' 2x, ' +
                      salesBanners.items[n - 1].image.thumb_medium +
                      ' 1x'
                    "
                    alt=""
                    loading="lazy"
                  />
                  <!--
                <div class="promos__banners-item-badges">
                  <div class="promos__banners-item-badges-item">
                    Реклама
                  </div>
                  <span class="promos__banners-item-badges-text">0+</span>
                </div>
                -->
                </router-link>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div v-else class="promos__novendors">
      <div class="promos__novendors-text">
        <p>Вы пока не добавили ни одного поставщика.</p>
        <p>
          Подключить поставщика можно в разделе
          <router-link :to="{ name: 'purchasesVendors', params: { id: this.$route.params.id } }">
            Закупки - Мои поставщики
          </router-link>
          или
        </p>
      </div>
      <button
        type="button"
        href="#"
        class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
        @click.prevent="this.modalAdd = true"
      >
        <i class="d-icon-plus-flat clients__filters-create-icon"></i>Добавить поставщика
      </button>
      <teleport to="body" v-if="this.modalAdd === true">
        <customModal v-model="this.modalAdd" class="clients-form__modal-main">
          <addVendorWindow @closeAddWindow="close()" @addVendor="addNewVendor()" />
        </customModal>
      </teleport>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'
import customModal from '@/shared/ui/Modal.vue'
import addVendorWindow from '../account/ui/addVendorWindow.vue'

SwiperCore.use([Autoplay, Pagination])

export default {
  name: 'WholesaleClientsOffer',
  inject: ['catalogUpdater'],
  data() {
    return {
      modalAdd: false,
      loading: false,
    }
  },
  components: { Swiper, SwiperSlide, customModal, addVendorWindow },
  mounted() {
    this.getOrgName()
    this.getSalesBanners()
    this.getOpts({
      page: 0,
      perpage: 0,
      filter: 0,
      filtersdata: 0,
    })
  },
  methods: {
    ...mapActions({
      getSalesBanners: 'sales/getSalesBanners',
      getOpts: 'purchases/getOpts',
      getOrgName: 'org/getOrgName',
    }),
    close() {
      this.modalAdd = false
    },
    addNewVendor() {
      this.modalAdd = false
      this.getOpts({
        page: 0,
        perpage: 0,
        filter: 0,
        filtersdata: 0,
      }).then(() => {
        this.loading = false
      })
    },
  },
  computed: {
    ...mapGetters({
      salesBanners: 'sales/salesBanners',
      opts: 'purchases/opts',
      orgName: 'org/orgName',
    }),
    getCount() {
      return this.salesBanners.count
    },
  },
  watch: {
    salesBanners: function () {
      // console.log(newVal)
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'))
      }, 500)
    },
    $route: {
      handler: function () {
        if (this.$route.params.id) {
          this.getSalesBanners()
        }
      },
    },
    catalogUpdater: function (newVal) {
      console.log(newVal)
      if (newVal) {
        this.loading = true
        this.getSalesBanners().then(() => {
          this.loading = false
        })
      }
    },
  },
}
</script>
<style lang="scss"></style>
