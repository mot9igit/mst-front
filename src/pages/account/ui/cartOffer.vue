<template>
  <div class="cart" :class="{ 'cart--active': active }">
    <button class="cart__header" @click.prevent="toggleCart()">
      <div class="cart__header-left">
        <i class="d-icon-cart cart__header-icon"></i>
        <p class="cart__header-title">
          Корзина
          <span class="cart-badge">{{
            basketStore.cart_data?.sku_count ? basketStore.cart_data.sku_count : 0
          }}</span>
        </p>
      </div>
      <i class="d-icon-angle-rounded-sm-top cart__header-toggle cart__header-toggle--arrow"></i>
      <i class="d-icon-times cart__header-toggle cart__header-toggle--close"></i>
    </button>
    <div class="cart__content">
      <Loader v-if="loading" />
      <div class="cart__tools cart__tools--desktop" v-if="Object.keys(basketStore).length > 1">
        <!--
          <button
            class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small cart__tools-button"
          >
            <i class="d-icon-catalog cart__tools-button-icon"></i>
            Показать в каталоге
          </button>
          -->
        <button
          class="cart__clear-button"
          @click.prevent="
            () => {
              this.showClearBasketModal = true
            }
          "
        >
          <span>Очистить все</span>
          <div class="d-divider d-divider--vertical cart__clear-divider"></div>
          <i class="d-icon-trash cart__clear-button-icon"></i>
        </button>
      </div>

      <div class="cart__tools cart__tools--mobile" v-if="Object.keys(basketStore).length > 1">
        <div class="cart__tools-button-wrapper">
          <button
            class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small cart__tools-button"
          >
            <i class="d-icon-catalog cart__tools-button-icon"></i>
            Показать в каталоге
          </button>
        </div>

        <div class="cart__tools-bottom">
          <p class="cart__tools-products">
            {{ basketStore.cart_data?.sku_count ? basketStore.cart_data.sku_count : 0 }} тов.
          </p>

          <button
            class="cart__clear-button"
            @click.prevent="
              () => {
                this.showClearBasketModal = true
              }
            "
          >
            <span>Очистить все</span>
            <div class="d-divider d-divider--vertical cart__clear-divider"></div>
            <i class="d-icon-trash cart__clear-button-icon"></i>
          </button>
        </div>
      </div>
      <div class="product-list">
        <div class="cart__list" v-if="Object.keys(basketStore).length > 1">
          <div class="dart-mb-1" v-for="(org, index) in basketStore.data" :key="index">
            <div v-for="(store, store_index) in org.data" :key="store_index">
              <div
                class="cart__item dart-mb-1"
                v-for="(product, product_index) in store.data"
                :key="product_index"
              >
                <div class="cart__item-header">
                  <div class="cart__item-badge">
                    <img :src="org.org_data.image" alt="" class="cart__item-badge-image" />
                    {{ org.org_data.name }}, {{ store.warehouse_data.address_short }}
                  </div>
                  <a
                    href="#"
                    class="cart__item-header-button"
                    @click="
                      clearBasketProduct(
                        org.org_data.id,
                        store.warehouse_data.id,
                        product_index,
                        product,
                      )
                    "
                  >
                    <i class="d-icon-trash"></i>
                  </a>
                </div>

                <p class="cart__item-title">{{ product.name }}</p>
                <p class="cart__item-article">Арт: {{ product.article }}</p>

                <div class="cart__item-sales" v-if="(product.action && !product.triggers) || (product.action && product.triggers && org.cart_data.enabled && product.triggers.filter(item => org.cart_data.enabled?.includes(item)))">
                  <button class="cart__item-sales-label" @click.prevent="salesActive(product.key)" :class="{'cart__item-sales-label-open' : sales_active[product.key] == true}">Примененные акции<i class="d-icon-angle-rounded-bottom product-card__seller-button-icon" :class="{'product-card__seller-button-icon-open' : sales_active[product.key] == true}"></i></button>
                  <div class="cart__item-sales-container" v-if="sales_active[product.key] == true">
                    <div class="cart__item-sales-item" v-for="(sale, ind) in product.action" :key="ind">
                      <router-link
                        target="_blank"
                        :to="{
                          name: 'purchasesAction',
                          params: { action_id: sale.action_id },
                        }"
                      >
                      <p class="cart__item-sales-item-name">{{ sale.name }}</p>
                      </router-link>
                      <p class="cart__item-sales-item-values">
                        <span class="cart__item-sales-item-value" v-if="sale.type != 3">Индивидуальная скидка</span>
                        <span class="cart__item-sales-item-value" v-if="sale.percent > 0">{{ sale.percent }}% Скидка</span>
                        <span class="cart__item-sales-item-value" v-if="sale.delay_type == 2">Под реализацию</span>
                        <span class="cart__item-sales-item-value" v-if="sale.delay_type < 2">{{sale.delay_type == 1 && sale.delay > 0
                          ? Number(sale.delay).toFixed(0) + ' дн. отсрочки'
                          : 'Предоплата'}}
                        </span>
                        <span class="cart__item-sales-item-value" v-if="sale.delivery_type == 2">Бесплатная доставка</span>
                        <span class="cart__item-sales-item-value" v-if="sale.condition_min_sum > 0">Мин. общ. сумма - {{ sale.condition_min_sum }} ₽</span>
                        <span class="cart__item-sales-item-value" v-if="sale.condition_SKU > 0">Мин. кол-во SKU - {{ sale.condition_SKU }} шт</span>
                        <span class="cart__item-sales-item-value" v-if="sale.condition_min_count > 0">Мин. общ. кол-во товаров - {{ sale.condition_min_count }} шт</span>
                        <span class="cart__item-sales-item-value" v-if="sale.min_count > 1">Мин. кол-во товаров - {{ sale.min_count }} шт</span>
                        <span class="cart__item-sales-item-value" v-if="sale.multiplicity > 1">Кратность - {{ sale.multiplicity }} шт</span>
                        <span class="cart__item-sales-item-value" v-if="sale.integration == 1">Интеграция с MachineStore</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="cart__item-footer">
                  <Counter
                    :classPrefix="'cart__item'"
                    @ElemCount="ElemCount"
                    :item="{ basketOffer, product }"
                    :mini="true"
                    :min="0"
                    :max="Number(product?.available)"
                    :value="Number(product?.count)"
                    :step="Number(product?.multiplicity ? product?.multiplicity : 1)"
                    :id="Number(product?.remain_id)"
                    :key="new Date().getTime() + '_' + product?.key"
                  />

                  <span class="cart__item-footer-value">
                    {{ product.price.toLocaleString('ru') }} ₽
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart__list text-center" v-else>
          <span>Корзина пуста</span>
        </div>
      </div>
      <div class="cart__list">
        <button
          v-if="Object.keys(basketStore).length"
          class="d-button d-button-primary d-button-primary-small cart__buy"
          @click.prevent="toggleOrder"
        >
          <span> Перейти к предложению </span>
          <span> {{ basketStore.cart_data.cost.toLocaleString('ru') }} ₽ </span>
        </button>
      </div>
    </div>
  </div>
  <teleport to="body">
    <customModal v-model="this.showClearBasketModal" class="clear_cart">
      <b>Вы уверены, что хотите очистить корзину?</b>
      <p>Это действие невозможно будет отменить</p>
      <button class="d-button d-button-primary d-button-primary-small" @click="this.clearCart()">
        Да, очистить!
      </button>
    </customModal>
    <customModal v-model="this.salesModal" class="sales_cart">
      <h3>Внимание, отключение акций!</h3>
      <p>Акция: {{ saleOff }} будет отключена</p>
      <div class="sales_cart-buttons">
        <button
          type="button"
          class="d-button d-button-primary d-button--sm-shadow order-card__modal-buttons-cancel"
          @click.prevent=""
          >
          Отмена
        </button>
        <button class="d-button d-button-primary d-button-primary-small d-button--sm-shadow"
          @click.prevent="">
          Принять
        </button>
      </div>

    </customModal>
  </teleport>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import Counter from '@/shared/ui/Counter.vue'

export default {
  name: 'ProfileCartOffer',
  emits: ['toggleCart', 'toggleOrderOffer', 'basketUpdate', 'catalogUpdate'],
  components: { Loader, customModal, Counter },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: true,
      showClearBasketModal: false,
      basketStore: {},
      fetchIds: [],
      sales_active: {},
      salesModal: false,
    }
  },
  methods: {
    ...mapActions({
      getBasketOffer: 'offer/getBasketOffer',
      basketOfferClear: 'offer/basketOfferClear',
      basketOfferProductRemove: 'offer/basketOfferProductRemove',
      basketOfferProductUpdate: 'offer/basketOfferProductUpdate',
    }),
    salesActive(key){
      if(key in this.sales_active){
        this.sales_active[key] = !this.sales_active[key]
      }else{
        this.sales_active[key] = true
      }
    },
    toggleCart() {
      this.$emit('toggleCart')
    },
    toggleOrder() {
      this.$emit('toggleOrderOffer')
    },
    clearCart() {
      this.loading = true
      this.showClearBasketModal = false
      this.basketOfferClear({ org_id: this.id_clear_org }).then(() => {
        this.id_clear_org = 0
        this.$emit('catalogUpdate')
        this.updateBasket()
      })
    },
    clearBasketProduct(org_id, store_id, key, product) {
      this.loading = true
      const data = {
        org_id: org_id,
        store_id: store_id,
        key: key,
        product: product,
      }
      this.basketOfferProductRemove(data).then((response) => {
        this.$emit('catalogUpdate')
        this.loading = true
        this.updateBasket()
        if (!response?.data?.data?.success && response?.data?.data?.message) {
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: response?.data?.data?.message,
            life: 3000,
          })
        }
        this.loading = false
      })

      // Убедитесь, что dataLayer существует
      window.dataLayer = window.dataLayer || []

      // Отправка данных в dataLayer
      window.dataLayer.push({
        ecommerce: {
          currencyCode: 'RUB', // Валюта
          remove: {
            products: [
              {
                id: product.remain_id, // ID товара
                name: product.name, // Название товара
                price: product.price, // Цена товара
                quantity: product.count, // Количество товара
              },
            ],
          },
        },
      })
    },
    ElemCount(object) {
      if (!this.fetchIds.includes(object.item.product.key)) {
        this.fetchIds.push(object.item.product.key)
      }
      if (object.value == object.min) {
        this.clearBasketProduct(
          object.item.product.org_id,
          object.item.product.store_id,
          object.item.product.key,
          object.item.product,
        )
        return
      }
      if (object.value > Number(object.max)) {
        this.modal_remain = true

        const index = this.fetchIds.indexOf(object.item.product.key)
        if (index !== -1) {
          this.fetchIds.splice(index, 1) // Удаляем один элемент по индексу
          console.log(object)
        }
      } else {
        this.loading = true
        const data = {
          org_id: object.item.product.org_id,
          store_id: object.item.product.store_id,
          id_remain: object.id,
          count: object.value,
          key: object.item.product.key,
          actions: object.item.product.actions,
        }
        this.basketOfferProductUpdate(data).then((response) => {
          // console.log(response)
          if (!response?.data?.data?.success && response?.data?.data?.message) {
            this.$toast.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: response?.data?.data?.message,
              life: 3000,
            })
          }
          this.$emit('catalogUpdate')
          this.updateBasket()
        })
        if (Number(object.value) != object.old_value) {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            ecommerce: {
              currencyCode: 'RUB', // Валюта
              add: {
                products: [
                  {
                    id: object.id, // ID товара
                    name: object.item.product.name, // Название товара
                    price: object.item.basketOffer.price, // Цена товара
                    quantity: object.value, // Количество товара
                  },
                ],
              },
            },
          })
        }
      }
    },
    updateBasket() {
      this.loading = true
      this.getBasketOffer().then(() => {
        this.loading = false
      })
    },
  },
  computed: {
    ...mapGetters({
      basketOffer: 'offer/basketOffer',
      basketOfferWarehouse: 'offer/basketOfferWarehouse',
    }),
  },
  mounted() {
    this.getBasketOffer().then(() => {
      this.loading = false
    })
    if (Object.keys(this.basketOffer).length > 1) {
      if (
        Object.prototype.hasOwnProperty.call(this.basketOffer.data, this.basketOfferWarehouse) &&
        this.basketOfferWarehouse
      ) {
        this.basketStore = this.basketOffer[this.basketOfferWarehouse]
      } else {
        this.basketStore = {}
      }
    } else {
      this.basketStore = {}
    }
  },
  watch: {
    // basketStore(newVal) {
    //   if (Object.keys(newVal).length) {
    //     this.loading = false
    //   } else {
    //     this.loading = false
    //   }
    // },
    basketOffer(newVal) {
      if (Object.keys(this.basketOffer).length > 1) {
        if (
          Object.prototype.hasOwnProperty.call(newVal.data, this.basketOfferWarehouse) &&
          this.basketOfferWarehouse
        ) {
          this.basketStore = newVal.data[this.basketOfferWarehouse]
        } else {
          this.basketStore = {}
        }
      } else {
        this.basketStore = {}
      }
    },
    basketOfferWarehouse(newVal) {
      if (Object.keys(this.basketOffer).length > 1 && newVal > 0) {
        if (Object.prototype.hasOwnProperty.call(this.basketOffer.data, newVal)) {
          this.basketStore = this.basketOffer.data[newVal]
        } else {
          this.basketStore = {}
        }
      } else {
        this.basketStore = {}
      }
    },
  },
}
</script>
<style lang="scss">
.cart {
  z-index: 2;
  .cart__header-title {
    position: relative;
    .cart-badge {
      position: absolute;
      top: -3px;
      right: -20px;
      display: inline-block;
      width: 20px;
      height: 20px;
      font-size: 10px;
      line-height: 20px;
      text-align: center;
      background: #f92c0d;
      color: #fff;
      border-radius: 50%;
    }
  }
  .cart__item-header-button {
    display: inline-block;
  }
  .cart_wrap {
    position: relative;
  }
  .cart__content {
    position: relative;
    .product-list {
      max-height: 70%;
      overflow-y: auto;
    }
  }
  .cart__buy {
    width: 100%;
  }
  .cart__item-badge {
    height: auto;
    min-height: 21px;
  }
}
</style>
