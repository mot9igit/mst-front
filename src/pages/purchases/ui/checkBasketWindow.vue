<template>
  <div class="order__header">
    <h3 class="order__header-title">В вашей корзине уже лежат товары:</h3>
  </div>
  <!--Список товаров корзины -->
  <div class="order__item-list">
    <div v-for="(item, ind) in this.bask" :key="ind" class="order__item-list-cont">
      <div v-for="(store, i) in item.data" :key="i" class="order__item">
        <div class="order__item-header">
          <div class="order__item-header-top">
            <div class="order__item-header-left">
              <div class="d-badge2 d-badge2--fit order__item-header-badge">
                <div class="order__item-header-badge-image-container">
                  <img
                    :src="item.org_data.image"
                    :alt="item.org_data.name"
                    class="order__item-header-badge-image"
                  />
                </div>
                <p class="order__item-header-badge-text">{{ item.org_data.name }}</p>
              </div>
              <div class="d-divider d-divider--vertical order__item-header-divider"></div>
              <div class="order__item-header-warehouse">
                <p class="order__item-header-warehouse-label">
                  Склад
                  {{
                    store.warehouse_data.selfname
                      ? store.warehouse_data.selfname
                      : store.warehouse_data.name_short
                  }}
                  #{{ store.warehouse_data.id }}:
                </p>
                <p class="order__item-header-warehouse-value">
                  {{ store.warehouse_data.address_short }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="d-divider d-divider--full d-divider--big order__item-divider"></div>
        <div v-for="(prod, ii) in store.data" :key="ii" class="order__item-content">
          <div class="order__item-content-top">
            <div class="order__item-product">
              <div class="order__item-product-image-container">
                <img :src="prod.image" :alt="prod.name" class="order__item-product-image" />
              </div>
              <div class="order__item-product-content">
                <p class="order__item-product-title">{{ prod.name }}</p>
                <div class="order__item-product-additional">
                  <p class="order__item-product-article">Арт: {{ prod.article }}</p>
                </div>
              </div>
            </div>
            <div class="order__item-content-top-right">
              <span class="order__item-product-price nowrap" v-if="prod.cost > 0"
                >{{ prod.cost.toLocaleString('ru') }} ₽</span
              >
              <p class="order__item-product-article nowrap">{{ prod.count }} шт.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="order__footer-content">
    <div class="order__footer-left">
      <p class="order__footer-label">Сумма итого:</p>
    </div>
    <div class="order__footer-right">
      <p class="order__footer-value">{{ allcost.toLocaleString('ru') }} ₽</p>
    </div>
  </div>
  <div class="product-card-actions__modal-all-buttons">
    <button
      type="button"
      href="#"
      class="d-button d-button-primary d-button-primary-small d-button--sm-shadow product-card-vertical__buy product-card-vertical__buy-cancel"
      @click.prevent="setMode(true)"
    >
      <div class="d-button__text">Очистить корзину</div>
    </button>
    <button
      @click.prevent="setMode(false)"
      class="d-button d-button-primary d-button-primary-small d-button--sm-shadow product-card-vertical__buy"
    >
      <div class="d-button__text">Объединить товары</div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'checkBasketWindow',
  data() {
    return {}
  },
  emits: ['close', 'setMode'],
  components: {},
  props: {
    bask: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  mounted() {},
  computed: {
    allcost() {
      let summ = 0
      if (Object.keys(this.bask).length) {
        for (var i in this.bask) {
          summ = summ + this.bask[i].cart_data.cost
        }
      }
      return summ
    },
  },
  methods: {
    setMode(mode) {
      this.$emit('setMode', mode)
    },
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
.order__item-list {
  padding-bottom: 0;
}
.order__footer-content {
  padding-bottom: 50px;
  padding-top: 30px;
}
</style>
