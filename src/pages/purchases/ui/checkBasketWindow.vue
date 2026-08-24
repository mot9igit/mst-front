<template>
  <h3>Выберите акции для товаров, добавленных свыше количества в комплекте</h3>
  <!--Шапка модального окна акций -->
  <div class="checkcart__item-list">
    <div v-for="(item, ind) in this.bask" :key="ind">
      <div v-for="(store, i) in item.data" :key="i">
        <div class="checkcart__item-header-left">
          <div class="d-badge2 d-badge2--fit checkcart__item-header-badge">
            <div class="checkcart__item-header-badge-image-container">
              <img
                :src="item.org_data.image"
                alt="МСТ"
                class="checkcart__item-header-badge-image"
              />
            </div>
            <p class="checkcart__item-header-badge-text">{{ item.org_data.name }}</p>
          </div>
          <div class="d-divider d-divider--vertical checkcart__item-header-divider"></div>
          <div class="checkcart__item-header-warehouse">
            <p class="checkcart__item-header-warehouse-label">
              Склад
              {{
                store.warehouse_data.selfname
                  ? store.warehouse_data.selfname
                  : store.warehouse_data.name_short
              }}
              #{{ store.warehouse_data.id }}: {{ store.warehouse_data.address_short }}
            </p>
          </div>
        </div>
        <div class="checkcart__item-header-list">
          <div v-for="(prod, ii) in store.data" :key="ii" class="checkcart__item-header-list-item">
            <img :src="prod.image" class="checkcart__item-header-list-item-image" />
            <div class="checkcart__item-header-list-item-title">
              <p class="checkcart__item-header-list-item-title-name">{{ prod.name }}</p>
              <p class="checkcart__item-header-list-item-title-article">{{ prod.article }}</p>
            </div>
            <div class="checkcart__item-header-list-item-count">{{ prod.count }}шт.</div>
            <div class="checkcart__item-header-list-item-cost">{{ prod.cost }}₽</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="checkcart__allcost">Сумма итого: {{ allcost }}</div>
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

<style lang="scss"></style>
