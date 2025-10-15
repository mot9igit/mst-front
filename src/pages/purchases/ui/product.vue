<template>
  <div class="product-item">
    <div class="products__header">
      <!-- Левая часть шапки страницы -->
      <div class="products__header-left">
        <div class="products__image-container">
          <img
            :src="product.image"
            :alt="product.pagetitle"
            class="products__header-image"
            v-if="product.image"
          />
        </div>
        <span class="products__title">{{ product.pagetitle }}</span>
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
    <div class="products__list-wrapper">
      <div class="products__list" v-if="product.stores">
        <offer
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
</template>
<script>
import offer from './offer.vue'

export default {
  name: 'productComponent',
  emits: ['updateBasket', 'updateCatalog'],
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  components: { offer },
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
<style lang="scss"></style>
