<template>
  <!-- <div class="product-item"> -->
  <div class="product-item product-item-vertical">
    <div class="products__header">
      <!-- Левая часть шапки страницы -->
      <div class="products__header-left" @click.prevent="showInfo ? modalProduct = true : modalProduct = false" 
      :class="{ 'products__header-left--active' : showInfo }">
        <div class="products__image-container">
          <img
            :src="product.image"
            :alt="product.pagetitle"
            class="products__header-image"
            v-if="product.image"
          />
        </div>
        <span class="products__title">{{ product.pagetitle }}</span>
        <button class="products__header-description-button"  :class="{ 'products__header-description-button--active' : showInfo }">
          <i class="d-icon-arrow-right products__header-description-button-icon"></i>
        </button>
      </div>
      <!-- Правая часть шапки страницы -->
      <div class="products__header-right">
        <!-- Элемент статистики -->
        <div class="products__stat">
          <span class="products__stat-value">{{ product.our_forecast }}</span>
          <p class="products__stat-label">Прогноз остатков</p>
        </div>
        <div class="d-divider d-divider--vertical d-divider--big products__stat-divider"></div>
        <!-- Элемент статистики -->
        <div class="products__stat">
          <span class="products__stat-value">{{ product.our_available }}</span>
          <p class="products__stat-label">Остаток на вашем складе</p>
        </div>
        <div class="d-divider d-divider--vertical d-divider--big products__stat-divider"></div>
        <!-- Элемент статистики -->
        <div class="products__stat">
          <span class="products__stat-value">{{ product.our_purchase_speed }}</span>
          <p class="products__stat-label">Скорость продаж</p>
        </div>
      </div>
    </div>
     <div class="products__list-wrapper  product-card__vertical">
    <!--<div class="products__list-wrapper">-->
      <div class="products__list" v-if="product.stores && !$route.params.id_org_from">
        <offer
          v-for="(item, index) in product.stores"
          :key="new Date().getTime() + '_' + Number(item.id) + '_' + index"
          :offer="item"
          :offerData="product"
          @updateBasket="updateBasket()"
          @updateCatalog="updateCatalog()"
        />
      </div>
      <div class="products__list" v-else-if="product.stores && $route.params.id_org_from">
        <offerForOffer
          v-for="(item, index) in product.stores"
          :key="new Date().getTime() + '_' + Number(item.id) + '_' + index"
          :offer="item"
          :offerData="product"
          @updateBasket="updateBasket()"
          @updateCatalog="updateCatalog()"
        />
      </div>
    </div>
  </div>
  <teleport to="body">
    <customModal
      v-model="this.modalProduct"
      
      class="product-modal__info"
    >
      <div class="product-modal__info-header">
        <div class="product-modal__info-header-info">
          <div class="product-card__info-text">
            <p class="product-card__title">
              {{ product.pagetitle }}
            </p>
            <p class="product-card__article">Арт: {{ product.article }}</p>
          </div>
          <div class="product-modal__info-header-info-characters">
            <div class="product-modal__info-header-info-characters-item" v-for="(item, index) in product.category_characters" :key="index">
              <div class="product-modal__info-header-info-characters-label">{{ item.caption }}</div>
              <div class="product-modal__info-header-info-characters-text">{{ item.value }}</div>
            </div>
          </div>
        </div>
        <div class="product-modal__info-header-slider" v-if="product.gallery.length > 1">
          
          <Swiper
            ref="galleryTop"
            class="galleryTop"
            :modules="[Thumbs]"
            :thumbs="{ swiper: galleryThumbs }"
            :slides-per-view="1"
          >
            <SwiperSlide v-for="(img, ind) in product.gallery" :key="ind">
              <img :src="site_url_prefix + img.url" />
            </SwiperSlide>
            
          </Swiper>
          <Swiper
            ref="galleryThumbs"
            class="galleryThumbs"
            :modules="[Thumbs]"
            :slides-per-view="4"
            :space-between="10"
            watch-slides-progress
          >
            <SwiperSlide v-for="(img, ind) in product.gallery" :key="ind">
              <img :src="site_url_prefix + img.url" />
            </SwiperSlide>
          </Swiper>
          <!-- <Swiper
            v-if="product.gallery.length>1"
            :slides-per-view="1"
            
            :modules="[Navigation, Pagination]"
            navigation
            pagination
            :autoplay="{ delay: 10000, disableOnInteraction: false }"
            >
            <template v-for="(img, n) in product.gallery" :key="n">
              <SwiperSlide>
                <img :src="site_url_prefix + img.url" :alt="product.pagetitle" class="product-card__image" loading="lazy"/>
              </SwiperSlide>
            </template>
          </Swiper> -->
          
        </div>
        <div class="product-modal__info-header-slider product-modal__info-header-simple-image" v-else>
          <img :src="product.image" :alt="product.pagetitle" class="product-card__image" /> 
        </div>
      </div>

      <Tabs class="product-modal__info-content">
        <TabList class="product-modal__info-tabs">
          <Tab class="d-tab2" :class="{ 'd-tab2--active': tabException == 0 }" :value="0">
            <button class="collection__tabs-link" @click.prevent="tabException = 0">
              <span>О товаре</span>
            </button>
          </Tab>
          <Tab class="d-tab2" :class="{ 'd-tab2--active': tabException == 1 }" :value="1">
            <button class="collection__tabs-link" @click.prevent="tabException = 1">
              <span>Характеристики</span>
            </button>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel v-if="tabException == 0">
            <div class="product-modal__info-tab" 
            v-html="product.content"
            v-if="product.content && product.content != '<p></p>'">
            </div>
            <div v-else  class="product-modal__info-tab">
              <div class="dart-alert dart-alert-info">Нет описания</div>
            </div>
          </TabPanel>
          <TabPanel v-else>
            <div class="product-modal__info-tab product-modal__info-tab-characters" v-if="product.characters.length">
              <div class="product-modal__info-header-info-characters-item" v-for="(item, index) in product.characters" :key="index">
                <div class="product-modal__info-header-info-characters-label">{{ item.caption }}</div>
                <div class="product-modal__info-header-info-characters-text">{{ item.value }}</div>
              </div>
            </div>
            <div v-else  class="product-modal__info-tab">
              <div class="dart-alert dart-alert-info">Характеристики не найдены</div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </customModal>
  </teleport>

</template>
<script>
import offer from './offerVertical.vue'
// import offer from './offer.vue'
import offerForOffer from './offerOffer.vue'
import customModal from '@/shared/ui/Modal.vue'
import Tabs from 'primevue/tabs'
//import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import TabList from 'primevue/tablist'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Thumbs } from 'swiper'
import { ref } from 'vue'

export default {
  name: 'productComponent',
  emits: ['updateBasket', 'updateCatalog'],
  data() {
    return {
      modalProduct: false,
      tabException: 0,
      showInfo: false,
      galleryTop: ref(null),
      galleryThumbs: ref(null),
    }
  },
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },

  },
  components: { offer, offerForOffer, customModal, Tabs,  TabPanels, TabPanel, TabList, Swiper, SwiperSlide, Thumbs },
  mounted() {
    if(Object.keys(this.product).length){
      if(this.product.id != 0 && this.product.id != null){
        if(this.product?.category_characters?.length > 1 || this.product?.category_characters?.length > 0){
          this.showInfo = true
        }
      }
    }
  },
  methods: {
    updateBasket() {
      this.$emit('updateBasket')
    },
    updateCatalog() {
      this.$emit('updateCatalog')
    },
  },
}
</script>
<style lang="scss">
  .products__header-left--active {
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .products__header-description-button.products__header-description-button--active {
    display: flex;
  }
  .products__header-description-button {
    height: 70px;
    width: 20px;
    background: #EDEDED;
    border-radius: 0px 12px 12px 0px;
    align-items: center;
    justify-content: center;
    display: none;
    .products__header-description-button-icon{
      font-size: 11px;
    }
  }
  .product-modal__info .modal__content{
    padding-right: 16px;
  }
  .product-modal__info .modal-content{
    max-width: 1008px;
  }
  .product-modal__info .product-modal__info-header{
    display: flex;
    align-items: start;
    gap: 64px;
  }
  .product-modal__info .product-modal__info-header-info{
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  .product-modal__info .product-card__info-text{
    gap: 8px;
    max-width: 492px;
    width: 492px;
  }
  .product-modal__info .product-card__title{
    font-weight: 600;
    font-size: 24px;
    line-height: 31px;
  }
  .product-modal__info .product-card__article{
    font-weight: 500;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: -0.01em;
    color: #757575;
  }
  .product-modal__info .product-modal__info-header-info-characters{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 544px;
    width: 544px;
  }
  .product-modal__info .product-modal__info-header-info-characters-item{
    min-height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ededed;
  }
  .product-modal__info .product-modal__info-header-info-characters-label{
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #757575;
  }
  .product-modal__info .product-modal__info-header-info-characters-text{
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    text-align: right;
    color: #282828;
  }
  .product-modal__info .product-modal__info-header-slider{
    width: 336px;
    max-width: 336px;
    overflow: hidden;
  }
  .product-modal__info .product-modal__info-header-slider.product-modal__info-header-simple-image{
    width: 336px;
    max-width: 336px;
    height: 336px;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }

  .product-modal__info .product-modal__info-content{
    margin-top: 48px;
  }
  .product-modal__info .product-modal__info-content .product-modal__info-tabs{
    display: flex;
    gap: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #75757575;
  }
  .product-modal__info .d-tab2--active {
    background-color: #282828 !important;
    color: #fbfbfb !important;
    font-weight: 600 !important;
  }
  .product-modal__info .d-tab2 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    background-color: #ededed;
    border-radius: 30px;
    color: #282828;
    font-size: 16px;
    font-weight: 600;
    transition-duration: 0.2s;
    padding: 4px 16px;
    height: 38px;
    max-height: 100%;
  }
  .product-modal__info  .product-modal__info-tab{
    margin: 24px 0;
  }
  .product-modal__info  .product-modal__info-tab .content{
    background-color: transparent !important;
    font-weight: 300;
    font-size: 16px;
    line-height: 21px;
    color: #282828;
  }
  .product-modal__info .product-modal__info-tab .product-modal__info-header-info-characters-label,
  .product-modal__info .product-modal__info-tab .product-modal__info-header-info-characters-text{
    font-size: 14px;
    line-height: 100%;
  }
  .product-modal__info .product-modal__info-tab .product-modal__info-header-info-characters{
    gap: 4px;
  }
  .product-modal__info  .product-modal__info-tab-characters{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 40px; 
  }
  .product-modal__info  .product-card__image{
    border-radius: 16px;
  }
  .product-modal__info .product-modal__info-header-slider img {
    width: auto;
    max-width: 100%;
    height: 100%;
    margin: 0 auto;
    object-fit: contain;
    aspect-ratio: 1;
    border-radius: 16px;
  }
  .product-modal__info .product-modal__info-header-slider .swiper-slide {
    max-width: 301px;
    max-height: 301px;
    border-radius: 16px;
    background-color: #fff;
  }
  .product-modal__info .product-modal__info-header-slider .galleryThumbs{
    margin-top: 16px;
  }
  .product-modal__info .p-tablist-tab-list {
    position: relative;
    display: flex;
    border: none;
    background: transparent;
    border-style: solid;
    border-color: transparent;
    border-width: 0px;
    gap: 16px;
  }
  .product-modal__info .p-tabpanels{
    padding: 0;
  }
  @media (width <= 1280px) {
    .products__header-description-button {
      height: 50px;
      width: 15px;
      background: #EDEDED;
      border-radius: 0px 12px 12px 0px;
      .products__header-description-button-icon{
        font-size: 8px;
      }
    }
    .product-modal__info .modal-content{
      max-width: 800px;
    }
    .product-modal__info .product-modal__info-header{
      gap: 40px;
    }
    .product-modal__info .product-modal__info-header-info{
      gap: 24px;
    }
    .product-modal__info .product-card__info-text{
      gap: 8px;
      max-width: 392px;
      width: 392px;
    }
    .product-modal__info .product-card__title{
      font-size: 16px;
      line-height: 18px;
    }
    .product-modal__info .product-card__article{
      font-size: 16px;
      line-height: 18px;
    }
    .product-modal__info .product-modal__info-header-info-characters{
      gap: 8px;
      max-width: 444px;
      width: 444px;
    }
    .product-modal__info .product-modal__info-header-info-characters-item{
      min-height: 32px;
    }
    .product-modal__info .product-modal__info-header-info-characters-label{
      font-size: 14px;
      line-height: 16px;
    }
    .product-modal__info .product-modal__info-header-info-characters-text{
      font-size: 14px;
      line-height: 16px;
    }
    .product-modal__info .product-modal__info-header-slider{
      width: 217px;
      max-width: 217px;
    }
    .product-modal__info .product-modal__info-header-slider.product-modal__info-header-simple-image{
      width: 217px;
      max-width: 217px;
      height: 217px;
    }
    .product-modal__info .product-modal__info-content{
      margin-top: 32px;
    }
    .product-modal__info .product-modal__info-content .product-modal__info-tabs{
      gap: 8px;
      padding-bottom: 8px;
    }
    .product-modal__info .d-tab2 {
      gap: 4px;
      font-size: 12px;
      height: 24px;
    }
    .product-modal__info  .product-modal__info-tab{
      margin: 16px 0;
    }
    .product-modal__info  .product-modal__info-tab .content{
      font-size: 14px;
      line-height: 16px;
    }
    .product-modal__info .product-modal__info-tab .product-modal__info-header-info-characters-label,
    .product-modal__info .product-modal__info-tab .product-modal__info-header-info-characters-text{
      font-size: 12px;
    }
    .product-modal__info .product-modal__info-tab .product-modal__info-header-info-characters{
      gap: 4px;
    }
    .product-modal__info  .product-modal__info-tab-characters{
      gap: 8px 24px; 
    }
    .product-modal__info .product-modal__info-header-slider .swiper-slide {
      max-width: 217px;
      max-height: 217px;
    }
    .product-modal__info .product-modal__info-header-slider .galleryThumbs{
      margin-top: 8px;
    }
    .product-modal__info .p-tablist-tab-list {
      gap: 8px;
    }
  }
  @media (width <= 1024px) {
    .products__header-description-button {
      height: 40px;
      width: 12px;
      background: #EDEDED;
      border-radius: 0px 6px 6px 0px;
      .products__header-description-button-icon{
        font-size: 8px;
      }
    }
    .product-modal__info .modal-content{
      max-width: 700px;
    }
    .product-modal__info .product-modal__info-header{
      gap: 40px;
    }
    .product-modal__info .product-modal__info-header-info{
      gap: 24px;
    }
    .product-modal__info .product-card__info-text{
      gap: 8px;
      max-width: 292px;
      width: 292px;
    }
    .product-modal__info .product-modal__info-header-info-characters{
      gap: 8px;
      max-width: 344px;
      width: 344px;
    }
  }
   @media (width <= 800px) {
    .product-modal__info .modal-content{
      max-width: 600px;
    }
    .product-modal__info .product-modal__info-header{
      gap: 16px;
    }
    .product-modal__info .product-modal__info-header-info{
      gap: 16px;
    }
    .product-modal__info .product-card__info-text{
      gap: 8px;
      max-width: 292px;
      width: 292px;
    }
    .product-modal__info .product-card__title{
      font-size: 10px;
      line-height: 12px;
    }
    .product-modal__info .product-card__article{
      font-size: 9px;
      line-height: 11px;
    }
    .product-modal__info .product-modal__info-header-info-characters{
      gap: 8px;
      max-width: 344px;
      width: 344px;
    }
    .product-modal__info .product-modal__info-header-info-characters-item{
      min-height: 16px;
    }
    .product-modal__info .product-modal__info-header-info-characters-label{
      font-size: 9px;
      line-height: 11px;
    }
    .product-modal__info .product-modal__info-header-info-characters-text{
      font-size: 9px;
      line-height: 11px;
    }
    .product-modal__info .product-modal__info-header-slider{
      width: 157px;
      max-width: 157px;
    }
    .product-modal__info .product-modal__info-header-slider.product-modal__info-header-simple-image{
      width: 157px;
      max-width: 157px;
      height: 157px;
    }
    .product-modal__info .product-modal__info-content{
      margin-top: 16px;
    }
    .product-modal__info .product-modal__info-content .product-modal__info-tabs{
      gap: 8px;
      padding-bottom: 8px;
    }
    .product-modal__info .d-tab2 {
      gap: 4px;
      font-size: 9px;
      height: 16px;
    }
    .product-modal__info  .product-modal__info-tab{
      margin: 16px 0;
    }
    .product-modal__info  .product-modal__info-tab .content{
      font-size: 8px;
      line-height: 10px;
    }
    .product-modal__info .product-modal__info-tab .product-modal__info-header-info-characters-label,
    .product-modal__info .product-modal__info-tab .product-modal__info-header-info-characters-text{
      font-size: 8px;
    }
    .product-modal__info .product-modal__info-tab .product-modal__info-header-info-characters{
      gap: 4px;
    }
    .product-modal__info  .product-modal__info-tab-characters{
      gap: 8px 16px; 
    }
    .product-modal__info .product-modal__info-header-slider .swiper-slide {
      max-width: 157px;
      max-height: 157px;
    }
    .product-modal__info .product-modal__info-header-slider .galleryThumbs{
      margin-top: 8px;
    }
    .product-modal__info .p-tablist-tab-list {
      gap: 8px;
    }
   }
  @media (width <= 700px) {
    .products__header-description-button {
      height: 35px;
      width: 12px;
      background: #EDEDED;
      border-radius: 0px 6px 6px 0px;
      .products__header-description-button-icon{
        font-size: 6px;
      }
    }
  }
  @media (width <= 600px) {
    .products__header-description-button {
      display: none !important;
    }
    .product-modal__info .modal-content{
      max-width: 100%;
    }
    .product-modal__info .product-modal__info-header{
      gap: 16px;
      flex-direction: column-reverse;
    }
    .product-modal__info .product-modal__info-header-info{
      gap: 32px;
    }
    .product-modal__info .product-card__info-text{
      gap: 8px;
      max-width: 100%;
      width: 100%;
    }
    .product-modal__info .product-card__title{
      font-size: 20px;
      line-height: 22px;
    }
    .product-modal__info .product-card__article{
      font-size: 16px;
      line-height: 18px;
    }
    .product-modal__info .product-modal__info-header-info-characters{
      gap: 8px;
      max-width: 100%;
      width: 100%;
    }
    .product-modal__info .product-modal__info-header-info-characters-item{
      min-height: 24px;
    }
    .product-modal__info .product-modal__info-header-info-characters-label{
      font-size: 14px;
      line-height: 16px;
    }
    .product-modal__info .product-modal__info-header-info-characters-text{
      font-size: 14px;
      line-height: 16px;
    }
    .product-modal__info .product-modal__info-header-slider{
      width: 100%;
      max-width: 100%;
    }
    .product-modal__info .product-modal__info-header-slider.product-modal__info-header-simple-image{
      width: 100%;
      max-width: 100%;
      height: 100%;
    }
    .product-modal__info .product-modal__info-content{
      margin-top: 40px;
    }
    .product-modal__info .product-modal__info-content .product-modal__info-tabs{
      gap: 16px;
      padding-bottom: 16px;
    }
    .product-modal__info .d-tab2 {
      gap: 16px;
      font-size: 14px;
      height: 32px;
    }
    .product-modal__info  .product-modal__info-tab{
      margin: 32px 0;
    }
    .product-modal__info  .product-modal__info-tab .content{
      font-size: 14px;
      line-height: 16px;
    }
    .product-modal__info .product-modal__info-tab .product-modal__info-header-info-characters-label,
    .product-modal__info .product-modal__info-tab .product-modal__info-header-info-characters-text{
      font-size: 14px;
    }
    .product-modal__info .product-modal__info-tab .product-modal__info-header-info-characters{
      gap: 8px;
    }
    .product-modal__info  .product-modal__info-tab-characters{
      gap: 16px; 
      display: flex;
      flex-direction: column;
    }
    .product-modal__info .product-modal__info-header-slider .swiper-slide {
      max-width: 100%;
      max-height: 100%;
      border-radius: 8px;
    }
    .product-modal__info .product-modal__info-header-slider .galleryThumbs{
      margin-top: 8px;
    }
    .product-modal__info .p-tablist-tab-list {
      gap: 16px;
    }
  }
</style>
