<template>
      <div class="product-modal__info-header">
        <div class="product-modal__info-header-info">
          <div class="product-card__info-text">
            <p class="product-card__title">
              {{ product.pagetitle }}
            </p>
            <p class="product-card__article">Арт: {{ product.article }}</p>
          </div>
          <div class="product-modal__info-header-info-characters">
            <div
              class="product-modal__info-header-info-characters-item"
              v-for="(item, index) in product.category_characters"
              :key="index"
            >
              <div class="product-modal__info-header-info-characters-label">{{ item.caption }}</div>
              <div class="product-modal__info-header-info-characters-text">{{ item.value }}</div>
            </div>
          </div>
        </div>
        <div class="product-modal__info-header-slider" v-if="product.gallery.length > 1">
          <Swiper
            class="galleryTop"
            :thumbs="{ swiper: thumbsSwiper }"
            :slides-per-view="1"
            :navigation="{ clickable: true }"
            :autoplay="{ delay: 10000, disableOnInteraction: false }"
          >
            <SwiperSlide v-for="(img, ind) in product.gallery" :key="ind">
              <img :src="site_url_prefix + img.url" />
            </SwiperSlide>
          </Swiper>
          <Swiper
            class="galleryThumbs"
            :slides-per-view="4"
            :space-between="10"
            @swiper="setThumbsSwiper"
            watch-slides-progress
          >
            <SwiperSlide v-for="(img, ind) in product.gallery" :key="ind">
              <img :src="site_url_prefix + img.url" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div
          class="product-modal__info-header-slider product-modal__info-header-simple-image"
          v-else
        >
          <img :src="product.image" :alt="product.pagetitle" class="product-card__image" />
        </div>
      </div>

      <Tabs class="product-modal__info-content">
        <TabList class="product-modal__info-tabs">
          <div class="d-tab2" :class="{ 'd-tab2--active': tabException == 0 }" :value="0">
            <button class="collection__tabs-link" @click.prevent="tabException = 0">
              <span>О товаре</span>
            </button>
          </div>
          <div class="d-tab2" :class="{ 'd-tab2--active': tabException == 1 }" :value="1">
            <button class="collection__tabs-link" @click.prevent="tabException = 1">
              <span>Характеристики</span>
            </button>
          </div>
        </TabList>

        <TabPanels>
          <TabPanel v-if="tabException == 0">
            <div
              class="product-modal__info-tab"
              v-html="product.content"
              v-if="product.content && product.content != '<p></p>'"
            ></div>
            <div v-else class="product-modal__info-tab">
              <div class="dart-alert dart-alert-info">Нет описания</div>
            </div>
          </TabPanel>
          <TabPanel v-else>
            <div
              class="product-modal__info-tab product-modal__info-tab-characters"
              v-if="product.characters.length"
            >
              <div
                class="product-modal__info-header-info-characters-item"
                v-for="(item, index) in product.characters"
                :key="index"
              >
                <div class="product-modal__info-header-info-characters-label">
                  {{ item.caption }}
                </div>
                <div class="product-modal__info-header-info-characters-text">{{ item.value }}</div>
              </div>
            </div>
            <div v-else class="product-modal__info-tab">
              <div class="dart-alert dart-alert-info">Характеристики не найдены</div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
</template>
<script>

import Tabs from 'primevue/tabs'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import TabList from 'primevue/tablist'
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Autoplay, Thumbs, Navigation, Pagination } from 'swiper'
import { ref } from 'vue'

SwiperCore.use([Autoplay, Pagination, Thumbs, Navigation])

export default {
  name: 'productInfoWindow',

  data() {
    return {
      tabException: 0,
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
  setup() {
    const thumbsSwiper = ref(null)
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper
    }
    return {
      Thumbs,
      thumbsSwiper,
      setThumbsSwiper,
    }
  },
  components: {
    Tabs,
    TabPanels,
    TabPanel,
    TabList,
    Swiper,
    SwiperSlide,
  },
  mounted() {

  },
  methods: {

  },
}
</script>
<style lang="scss">

</style>
