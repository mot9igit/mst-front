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

              <div class="mst__alert blue center_alert" v-if="store.type == 'order' && store.data">
                <router-link
                  :to="{
                    name: 'purchasesOrder',
                    params: {
                      id: this.$route.params.id,
                      order_id: store.id,
                    },
                  }">
                В данный момент вы редактируете "Заказ #{{ store.id }}"
                </router-link>
              </div>
              <div class="mst__alert blue center_alert" v-if="store.type == 'offer' && store.data">
                <router-link
                  :to="{
                    name: 'purchasesOffer',
                    params: {
                      id: this.$route.params.id,
                      offer_id: store.id,
                    },
                  }">
                В данный момент вы редактируете "Предложение #{{ store.id }}"
                 </router-link>
              </div>
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

                <div class="cart__item-footer">
                  <Counter
                    :classPrefix="'cart__item'"
                    @ElemCount="ElemCount"
                    :item="{ basket, product }"
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
          <span> Перейти к заказу </span>
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
  </teleport>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import Counter from '@/shared/ui/Counter.vue'




export default {
  name: 'ProfileCart',
  emits: ['toggleCart', 'toggleOrder', 'basketUpdate', 'catalogUpdate'],
  components: { Loader, customModal, Counter},

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

    }
  },
  methods: {
    ...mapActions({
      getBasket: 'basket/getBasket',
      basketClear: 'basket/basketClear',
      basketProductRemove: 'basket/basketProductRemove',
      basketProductUpdate: 'basket/basketProductUpdate',
    }),
    toggleCart() {
      this.$emit('toggleCart')
    },
    toggleOrder() {
      this.$emit('toggleOrder')
    },
    clearCart() {
      this.loading = true
      this.showClearBasketModal = false
      this.basketClear({ org_id: this.id_clear_org }).then(() => {
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
      this.basketProductRemove(data).then((response) => {
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
        this.basketProductUpdate(data).then((response) => {
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
                    price: object.item.basket.price, // Цена товара
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
      this.getBasket().then(() => {
        this.loading = false
      })
    },
  },
  computed: {
    ...mapGetters({
      basket: 'basket/basket',
      basketWarehouse: 'basket/basketWarehouse',
    }),
  },
  mounted() {
    this.getBasket().then(() => {
      this.loading = false
    })
    if (Object.keys(this.basket).length > 1) {
      if (
        Object.prototype.hasOwnProperty.call(this.basket.data, this.basketWarehouse) &&
        this.basketWarehouse
      ) {
        this.basketStore = this.basket[this.basketWarehouse]
      } else {
        this.basketStore = {}
      }
    } else {
      this.basketStore = {}
    }
  },
  watch: {
    basketStore(newVal) {
      if (Object.keys(newVal).length) {
        this.loading = false
      } else {
        this.loading = false
      }
    },
    basket(newVal) {
      if (Object.keys(this.basket).length > 1) {
        if (
          Object.prototype.hasOwnProperty.call(newVal.data, this.basketWarehouse) &&
          this.basketWarehouse
        ) {
          this.basketStore = newVal.data[this.basketWarehouse]
        } else {
          this.basketStore = {}
        }
      } else {
        this.basketStore = {}
      }
    },
    basketWarehouse(newVal) {
      if (Object.keys(this.basket).length > 1 && newVal > 0) {
        if (Object.prototype.hasOwnProperty.call(this.basket.data, newVal)) {
          this.basketStore = this.basket.data[newVal]
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
  .cart__list-order-edit{
    background-color: #ededed;
    border-radius: 24px 24px 0 0;
    border-bottom: 1px solid #75757575;
    color: #282828;
    font-size: 14px;
    font-weight: 600;
    padding: 12px 8px 8px;
    text-align: center;
  }
}
</style>
