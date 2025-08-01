<template>
  <div class="d-sheet__overlay order__sheet-overlay" :class="{ active: active }">
    <div class="d-sheet__wrapper order__sheet-wrapper">
      <div class="d-sheet d-sheet--active order__sheet" data-sheet="order">
        <Loader v-if="this.loading"></Loader>
        <div class="d-sheet__content order">
          <!-- Шапка -->
          <div class="order__header">
            <h3 class="order__header-title">Оформление заказа</h3>
            <button class="order__header-close" @click.prevent="close()">
              <i class="d-icon-times-flat"></i>
            </button>
          </div>

          <!-- Информация о плательщике -->
          <!--
          <div class="order__info">
            <div class="order__info-left">
              <div class="order__info-item">
                <p class="order__info-item-label">
                  Ваше юридическое лицо для заказа:&nbsp;
                  <span class="order__info-item-value">ООО «МСТ»</span>
                </p>
              </div>
              <div class="order__info-item">
                <p class="order__info-item-label">
                  ИНН:&nbsp;
                  <span class="order__info-item-value">7743255403</span>
                </p>
              </div>
            </div>
            <div class="order__info-right">
              <button class="order__info-edit">
                <i class="d-icon-pen2"></i>
              </button>
            </div>
          </div>
          -->
          <!-- Список товаров -->
          <div class="order__item-list" v-if="Object.keys(this.basket).length > 1">
            {{ console.log(this.basket) }}
            <div v-for="(store, store_id) in this.basket.data" :key="store_id">
              <div v-for="(org, org_id) in store.data" :key="org_id">
                <div
                  class="order__item"
                  v-for="(warehouse, warehouse_id) in org.data"
                  :key="warehouse_id"
                >
                  <div class="order__item-header">
                    <div class="order__item-header-top">
                      <div class="order__item-header-left">
                        <div class="d-badge2 d-badge2--fit order__item-header-badge">
                          <div class="order__item-header-badge-image-container">
                            <img
                              :src="org.org_data.image"
                              :alt="org.org_data.name"
                              class="order__item-header-badge-image"
                            />
                          </div>
                          <p class="order__item-header-badge-text">{{ org.org_data.name }}</p>
                        </div>
                        <div class="d-divider d-divider--vertical order__item-header-divider"></div>
                        <div class="order__item-header-warehouse">
                          <p class="order__item-header-warehouse-label">
                            Склад #{{ warehouse_id }}
                          </p>
                          <p class="order__item-header-warehouse-value">
                            {{
                              warehouse.warehouse_data.address_short
                                ? warehouse.warehouse_data.address_short
                                : warehouse.warehouse_data.address
                            }}
                          </p>
                        </div>
                      </div>
                      <div class="order__item-header-right">
                        <button class="order__item-header-delete">
                          <i class="d-icon-trash"></i>
                        </button>
                      </div>
                    </div>
                    <div class="order__item-header-bottom">
                      <div class="order__item-header-address">
                        <i class="d-icon-location-flat order__item-header-icon"></i>
                        <p class="order__item-header-address-label">Адрес доставки&nbsp;</p>
                        <p class="order__item-header-address-value">
                          {{
                            store.store_data.name_short
                              ? store.store_data.name_short
                              : store.store_data.name
                          }},
                          {{
                            store.store_data.address_short
                              ? store.store_data.address_short
                              : store.store_data.address
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="d-divider d-divider--full d-divider--big order__item-divider"></div>
                  <div
                    class="order__item-content"
                    v-for="(product, product_key) in warehouse.data"
                    :key="product_key"
                  >
                    <div class="order__item-content-top">
                      <div class="order__item-product">
                        <div class="order__item-product-image-container">
                          <img
                            :src="product.image"
                            :alt="product.name"
                            class="order__item-product-image"
                          />
                        </div>
                        <div class="order__item-product-content">
                          <p class="order__item-product-title">
                            {{ product.name }}
                          </p>
                          <div class="order__item-product-additional">
                            <p class="order__item-product-article">Арт: {{ product.article }}</p>
                            <!-- <div class="order__item-product-discount">Скидка 27%</div> -->
                          </div>
                        </div>
                      </div>
                      <div class="order__item-content-top-right">
                        <span class="order__item-product-price"
                          >{{ product.price.toLocaleString('ru') }} ₽</span
                        >
                        <Counter
                          :classPrefix="'order__item-product'"
                          @ElemCount="ElemCount"
                          :item="{ basket, product }"
                          :mini="true"
                          :min="0"
                          :max="Number(product?.available)"
                          :value="Number(product?.count)"
                          :step="Number(product?.multiplicity ? product?.multiplicity : 1)"
                          :id="Number(product?.remain_id)"
                          :key="product?.key"
                        />
                      </div>
                    </div>
                    <div class="order__item-content-bottom">
                      <div class="order__item-content-bottom-left">
                        <div class="order__item-prop">
                          <p class="order__item-prop-label">Отсрочка:&nbsp;</p>
                          <p class="order__item-prop-value">Предоплата</p>
                        </div>
                        <div class="d-divider d-divider--vertical order__item-prop-divider"></div>
                        <div class="order__item-prop">
                          <p class="order__item-prop-label">Оплата доставки:&nbsp;</p>
                          <p class="order__item-prop-value">Покупатель</p>
                        </div>
                      </div>
                      <div class="order__item-content-bottom-right">
                        <button
                          class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__item-buy"
                        >
                          Отправить заказ
                        </button>
                        <div
                          class="d-divider d-divider--vertical order__item-content-bottom-right-divider"
                        ></div>
                        <button class="order__item-upload">
                          <i class="d-icon-upload2"></i>
                        </button>
                      </div>
                    </div>
                    <div class="order__item-price">
                      <Counter
                        :classPrefix="'order__item-product'"
                        @ElemCount="ElemCount"
                        :item="{ basket, product }"
                        :mini="true"
                        :min="0"
                        :max="Number(product?.available)"
                        :value="Number(product?.count)"
                        :step="Number(product?.multiplicity ? product?.multiplicity : 1)"
                        :id="Number(product?.remain_id)"
                        :key="product?.key"
                      />
                      <span class="order__item-product-price"
                        >{{ product.price.toLocaleString('ru') }} ₽</span
                      >
                    </div>
                  </div>
                  <div class="order__item-footer">
                    <button
                      class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__item-buy"
                    >
                      Отправить заказ

                      <span class="order__item-buy-value"
                        >{{ org.cart_data.cost.toLocaleString('ru') }} ₽</span
                      >
                    </button>
                    <div
                      class="d-divider d-divider--vertical order__item-content-bottom-right-divider"
                    ></div>
                    <button class="order__item-upload">
                      <i class="d-icon-upload2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Итого -->
          <div class="order__footer" v-if="Object.keys(this.basket).length > 1">
            <div class="d-divider d-divider--full order__footer-divider"></div>

            <div class="order__footer-content">
              <div class="order__footer-left">
                <p class="order__footer-label">Итого</p>
              </div>
              <div class="order__footer-right">
                <p class="order__footer-value">
                  {{ this.basket.cart_data.cost.toLocaleString('ru') }} ₽
                </p>
                <div class="order__footer-actions">
                  <button
                    class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__footer-actions-buy"
                  >
                    Оформить все заказы
                  </button>
                  <div class="d-divider d-divider--vertical order__footer-actions-divider"></div>
                  <button class="order__footer-actions-upload">
                    <i class="d-icon-upload2"></i>
                  </button>
                </div>
              </div>

              <div class="order__footer-top">
                <p class="order__footer-label">Итого</p>
                <p class="order__footer-value">
                  {{ this.basket.cart_data.cost.toLocaleString('ru') }} ₽
                </p>
              </div>
              <div class="order__footer-bottom">
                <div class="order__footer-actions">
                  <button
                    class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__footer-actions-buy"
                  >
                    Оформить все заказы
                  </button>
                  <div class="d-divider d-divider--vertical order__footer-actions-divider"></div>
                  <button class="order__footer-actions-upload">
                    <i class="d-icon-upload2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import Counter from '@/shared/ui/Counter.vue'

export default {
  name: 'orderWindow',
  emits: ['close', 'catalogUpdate'],
  components: { Loader, Counter },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      fetchIds: [],
    }
  },
  computed: {
    ...mapGetters({
      basket: 'basket/basket',
    }),
  },
  methods: {
    ...mapActions({
      getBasket: 'basket/getBasket',
      basketProductRemove: 'basket/basketProductRemove',
      basketProductUpdate: 'basket/basketProductUpdate',
    }),
    close() {
      this.$emit('close')
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
}
</script>
<style lang="scss">
.order__item {
  .d-badge2 {
    background: #ededed;
  }
  .order__item-header-badge-image {
    border-radius: 50%;
  }
  .order__item-header-badge-text {
    background: #ededed;
  }
  .order__item-header-warehouse {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  .order__item-product-title {
    max-width: 500px;
  }
}
</style>
