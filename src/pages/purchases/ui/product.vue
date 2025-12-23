<template>
  <!-- <div class="product-item"> -->
  <div class="product-item product-item-vertical">
    <div class="products__header">
      <!-- Левая часть шапки страницы -->
      <div class="products__header-left" @click.prevent="modalProduct = false">
        <div class="products__image-container">
          <img
            :src="product.image"
            :alt="product.pagetitle"
            class="products__header-image"
            v-if="product.image"
          />
        </div>
        <span class="products__title">{{ product.pagetitle }}</span>
        <!-- <button class="products__header-description-button">
          <i class="d-icon-arrow-right products__header-description-button-icon"></i>
        </button> -->
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
            <div class="product-modal__info-header-info-characters-item">
              <div class="product-modal__info-header-info-characters-label">Производитель</div>
              <div class="product-modal__info-header-info-characters-text">Интерскол</div>
            </div>
            <div class="product-modal__info-header-info-characters-item">
              <div class="product-modal__info-header-info-characters-label">Производитель</div>
              <div class="product-modal__info-header-info-characters-text">Интерскол</div>
            </div>
          </div>
        </div>
        <div class="product-modal__info-header-slider"><img :src="product.image" :alt="product.pagetitle" class="product-card__image" /></div>
      </div>

      <Tabs class="product-modal__info-content">
        <TabList class="product-modal__info-tabs">
          <Tab class="d-tab2" :class="{ 'd-tab2--active': !tabException }" :value="tabException">
            <button class="collection__tabs-link" @click.prevent="tabException = false">
              <span>О товаре</span>
            </button>
          </Tab>
          <Tab class="d-tab2" :class="{ 'd-tab2--active': tabException }" :value="tabException">
            <button class="collection__tabs-link" @click.prevent="tabException = true">
              <span>Характеристики</span>
            </button>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel v-if="!tabException">О товаре</TabPanel>
          <TabPanel v-else>Характеристики</TabPanel>
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

export default {
  name: 'productComponent',
  emits: ['updateBasket', 'updateCatalog'],
  data() {
    return {
      modalProduct: false,
      tabException: false,
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
  components: { offer, offerForOffer, customModal, Tabs },
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
  .products__header-description-button {
    height: 70px;
    width: 20px;
    background: #EDEDED;
    border-radius: 0px 12px 12px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    .products__header-description-button-icon{
      font-size: 11px;
    }
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
  }
  .product-modal__info .product-card__title{
    max-width: 492px;
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

  }
  .product-modal__info .product-modal__info-header-info-characters{

  }
  .product-modal__info .product-modal__info-header-info-characters-item{

  }
  .product-modal__info .product-modal__info-header-info-characters-label{

  }
  .product-modal__info .product-modal__info-header-info-characters-text{

  }
  .product-modal__info .product-modal__info-header-slider{

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
      display: none;
    }
  }
</style>
