<template>
  <div class="d-modal2__header change-address__header">
    <div class="change-address__header-info">
      <i class="d-icon-location change-address__header-icon"></i>
      <p class="change-address__header-label">Активный склад:</p>
      <p class="change-address__header-value">
        {{
          orgBasketWarehouse?.name_short
            ? orgBasketWarehouse?.name_short
            : orgBasketWarehouse?.name
        }},
        {{
          orgBasketWarehouse?.address_short
            ? orgBasketWarehouse?.address_short
            : orgBasketWarehouse?.address
        }}
      </p>
    </div>
  </div>

  <div class="d-modal2__content change-address__content">
    <div class="change-address__content-content">
      <p class="change-address__content-title">Выбрать другой склад доставки:</p>
      <div class="change-address__content-list">
        <a
          href="#"
          class="change-address__content-list-item"
          v-for="store in orgStores.items"
          v-bind:key="store.id"
          @click.prevent="setWarehouse(store.id)"
        >
          <i class="d-icon-geo change-address__content-list-item-icon"></i>
          <p class="change-address__content-list-item-text">
            {{ store?.name_short ? store?.name_short : store?.name }},
            {{ store?.address_short ? store?.address_short : store?.address }}
          </p>
        </a>
      </div>
    </div>
    <!--
      <button class="d-button d-button--sm-shadow d-button-primary change-address__button">
        Ок
      </button>
      -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'changeAddressWindow',
  computed: {
    ...mapGetters({
      orgStores: 'org/orgStores',
      basketWarehouse: 'basket/basketWarehouse',
    }),
    orgBasketWarehouse() {
      return this.orgStores?.items?.find((el) => el.id == this.basketWarehouse)
    },
  },
  methods: {
    setWarehouse(id) {
      this.$emit('setWarehouse', id)
    },
  },
}
</script>
<style lang="scss" scoped>
.change-address__header-info {
  align-items: center;
}
.change-address__content-list-item {
  transition: all 0.2s ease;
  .change-address__content-list-item-text {
    transition: all 0.2s ease;
  }
  &:hover .change-address__content-list-item-text {
    transition: all 0.2s ease;
    color: #343434;
  }
}
.d-modal2__header,
.d-modal2__content {
  padding-left: 0;
  padding-right: 0;
}
</style>
