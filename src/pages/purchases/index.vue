<template>
  <section class="promos" id="promos">
    <div class="promos__header">
      <h1 class="promos__header-title">Акции</h1>
      <!--
        <button class="d-select promos__header-select">
          <span class="d-select__title">Акции по брендам</span>
          <i class="d-icon-angle-rounded-bottom-bold d-select__arrow promos__header-select-icon"></i>
        </button>
      -->
    </div>
    <div class="promos__banners" v-if="salesBanners">
      <div class="dart-row promos__banners-row">
        <div class="d-col-24">
          <Swiper
            :slides-per-view="1"
            :space-between="10"
            :pagination="{ clickable: true }"
          >
            <template v-for="n in getCount" :key="n">
              <SwiperSlide v-if="n < 4">
                <router-link
                :to="{ name: 'purchasesAction', params: { action_id: salesBanners.items[n - 1].action_id } }"
                v-if="n < 5"
                class="promos__banners-item promos__banners-item--primary promos__banners-item--big"
                >
                  <img class="promos__banners-item-image" :src="salesBanners.items[n - 1].image.image"
                  :srcset="salesBanners.items[n - 1].image.image +' 2x, ' + salesBanners.items[n - 1].image.image + ' 1x'" alt=""
                  loading="lazy">
                  <div class="promos__banners-item-badges">
                    <div class="promos__banners-item-badges-item">
                      Реклама
                    </div>
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
              <router-link :to="{ name: 'purchasesAction', params: { action_id: salesBanners.items[n - 1].action_id } }">
                <img class="promos__banners-item-image" :src="salesBanners.items[n - 1].image.thumb_medium"
                :srcset="salesBanners.items[n - 1].image.image +' 2x, ' + salesBanners.items[n - 1].image.thumb_medium + ' 1x'" alt=""
                loading="lazy">
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
            <div class="promos__banners-item promos__banners-item--primary promos__banners-item--small">
              <router-link :to="{ name: 'purchasesAction', params: { action_id: salesBanners.items[n - 1].action_id } }">
                <img class="promos__banners-item-image" :src="salesBanners.items[n - 1].image.thumb_medium"
                :srcset="salesBanners.items[n - 1].image.image +' 2x, ' + salesBanners.items[n - 1].image.thumb_medium + ' 1x'" alt=""
                loading="lazy">
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
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'

SwiperCore.use([Pagination]);

export default {
  name: 'purchasesMain',
  components: { Swiper, SwiperSlide },
  mounted(){
    this.getSalesBanners()
  },
  methods: {
    ...mapActions({
      getSalesBanners: 'sales/getSalesBanners'
    })
  },
  computed: {
    ...mapGetters({
      salesBanners: 'sales/salesBanners'
    }),
    getCount () {
      return this.salesBanners.count
    },
  },
  watch: {
    salesBanners: function (newVal) {
      console.log(newVal)
      setTimeout(function(){
        window.dispatchEvent(new Event('resize'));
      }, 500)
    }
  }
}
</script>
<style lang="scss">
.content-wrapper{
  width: 100%;
  overflow: hidden;
}
.swiper-wrapper{
  box-sizing: border-box;
}
.swiper-pagination {
    display: flex;
    align-items: center;
    gap: 16px;
    position: absolute;
    bottom: 16px;
    left: 50%;
    translate: -50% 0;
    z-index: 2;
    .swiper-pagination-bullet {
      cursor: pointer;
      background-color: #282828;
      border-radius: 26px;
      opacity: 0.5;
      width: 40px;
      height: 4px;
      &.swiper-pagination-bullet-active{
        opacity: 1;
      }
    }
}

.promos__banners-row--small > div{
  margin-bottom: 16px;
}
.promos__banners-item{
  display: block;
  width: 100%;
  height: 100% !important;
  &.promos__banners-item--primary{
    background: transparent;
  }
  .promos__banners-item-image{
    width: 100%;
    display: block;
    border-radius: 13px;
    overflow: hidden;
  }
}

</style>
