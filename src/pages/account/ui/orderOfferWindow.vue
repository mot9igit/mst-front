<template>
  <Toast />
  <div class="d-sheet__overlay order__sheet-overlay" :class="{ active: active }">
    <div class="d-sheet__wrapper order__sheet-wrapper offer__sheet-wrapper">
      <div
        class="d-sheet d-sheet--active order__sheet"
        :class="{ order: order }"
        data-sheet="order"
      >
        <Loader v-if="this.loading"></Loader>
        <div class="d-sheet__content order" v-if="!order">
          <!-- Шапка -->
          <div class="order__header">
            <h3 class="order__header-title">Оформление предложения</h3>
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
          <div class="order__item-list" v-if="Object.keys(basketStore).length > 1">
            <div v-for="(org, org_id) in basketStore.data" :key="org_id">
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
                        <p class="order__item-header-warehouse-label">Склад #{{ warehouse_id }}</p>
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
                      <a
                        href="#"
                        class="order__item-header-delete"
                        @click.prevent="
                          () => {
                            this.showClearBasketModal = true
                            this.id_clear_org = org.org_data.id
                            this.id_clear_store = warehouse_id
                          }
                        "
                      >
                        <i class="d-icon-trash"></i>
                      </a>
                    </div>
                  </div>
                  <div class="order__item-header-bottom">
                    <div class="order__item-header-address">
                      <i class="d-icon-location-flat order__item-header-icon"></i>
                      <p class="order__item-header-address-label">Адрес доставки&nbsp;</p>
                      <p class="order__item-header-address-value">
                        {{
                          basketStore.store_data.name_short
                            ? basketStore.store_data.name_short
                            : basketStore.store_data.name
                        }},
                        {{
                          basketStore.store_data.address_short
                            ? basketStore.store_data.address_short
                            : basketStore.store_data.address
                        }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="d-divider d-divider--full d-divider--big order__item-divider"></div>
                <div
                  class="order__item-content"
                  :class="{ 'order__item-noactive': product.count > Number(product.available) }"
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
                      <span class="order__item-product-price" v-if="product.cost > 0"
                        >{{ product.cost.toLocaleString('ru') }} ₽</span
                      >
                      <div class="order__item-product-price-rrc">
                        <p v-if="product.prices.rrc_discount > 0">
                          -{{ product.prices.rrc_discount.toLocaleString('ru') }}% от РРЦ
                        </p>
                        <p v-else class="cart-no-discount">Без скидки от РРЦ</p>
                        <p v-if="product.price > 0">
                          {{ product.price.toLocaleString('ru') }} ₽ за ед.
                        </p>
                      </div>
                      <Counter
                        :classPrefix="'order__item-product'"
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
                    </div>
                    <a
                      href="#"
                      class="cart__item-header-button"
                      @click="
                        clearBasketProduct(org.org_data.id, warehouse_id, product_key, product)
                      "
                    >
                      <i class="d-icon-trash"></i>
                    </a>
                  </div>
                  <div class="order__item-price">
                    <Counter
                      :classPrefix="'order__item-product'"
                      @ElemCount="ElemCount"
                      :item="{ basketOffer, product }"
                      :mini="true"
                      :min="0"
                      :max="Number(product?.available)"
                      :value="Number(product?.count)"
                      :step="Number(product?.multiplicity ? product?.multiplicity : 1)"
                      :id="Number(product?.remain_id)"
                      :key="new Date().getTime() + '_1_' + product?.key"
                    />
                    <div class="order__item-product-price nowrap">
                      <p v-if="product.cost > 0">{{ product.cost.toLocaleString('ru') }} ₽</p>
                      <div class="order__item-product-price-rrc">
                        <p v-if="product.cost.rrc_discount > 0">
                          -{{ product.prices.rrc_discount.toLocaleString('ru') }}% от РРЦ
                        </p>
                        <p v-else class="cart-no-discount">Без скидки от РРЦ</p>
                        <p v-if="product.price > 0">
                          {{ product.price.toLocaleString('ru') }} ₽ за ед.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="cart__item-sales"
                    v-if="
                      (product.action?.length && !product.triggers.length) ||
                      (product.action?.length &&
                        product.triggers.length &&
                        org.cart_data.enabled.length &&
                        product.triggers.filter((item) => org.cart_data.enabled?.includes(item))
                          .length)
                    "
                  >
                    <button
                      class="cart__item-sales-label"
                      @click.prevent="salesActive(product.key)"
                      :class="{ 'cart__item-sales-label-open': sales_active[product.key] == true }"
                    >
                      Примененные акции<i
                        class="d-icon-angle-rounded-bottom product-card__seller-button-icon"
                        :class="{
                          'product-card__seller-button-icon-open':
                            sales_active[product.key] == true,
                        }"
                      ></i>
                    </button>
                    <div
                      class="cart__item-sales-container"
                      v-if="sales_active[product.key] == true"
                    >
                      <div
                        class="cart__item-sales-item"
                        v-for="(sale, ind) in product.action"
                        :key="ind"
                      >
                        <!-- <a class="cart__item-sales-item-name" :href="'/' + $route.params.id + '/purchases/actions/' + sale.id" tagret="_blank">{{ sale.name }}</a> -->
                        <router-link
                          v-if="sale.enabled == 1"
                          target="_blank"
                          :to="{
                            name: 'purchasesAction',
                            params: { action_id: sale.action_id },
                          }"
                        >
                          <p class="cart__item-sales-item-name">{{ sale.name }}</p>
                        </router-link>
                        <p class="cart__item-sales-item-values" v-if="sale.enabled == 1">
                          <span class="cart__item-sales-item-value" v-if="sale.type != 3"
                            >Индивидуальная скидка</span
                          >
                          <span class="cart__item-sales-item-value" v-if="sale.percent_num > 0"
                            >{{ sale.percent_num }}% Скидка</span
                          >
                          <span class="cart__item-sales-item-value" v-if="sale.delay_type == 2"
                            >Под реализацию</span
                          >
                          <span class="cart__item-sales-item-value" v-if="sale.delay_type < 2"
                            >{{
                              sale.delay_type == 1 && sale.delay > 0
                                ? Number(sale.delay).toFixed(0) + ' дн. отсрочки'
                                : 'Предоплата'
                            }}
                          </span>
                          <span class="cart__item-sales-item-value" v-if="sale.delivery_type == 2"
                            >Бесплатная доставка</span
                          >
                          <span
                            class="cart__item-sales-item-value"
                            v-if="sale.condition_min_sum > 0"
                            >Мин. общ. сумма - {{ sale.condition_min_sum }} ₽</span
                          >
                          <span class="cart__item-sales-item-value" v-if="sale.condition_SKU > 0"
                            >Мин. кол-во SKU - {{ sale.condition_SKU }} шт</span
                          >
                          <span
                            class="cart__item-sales-item-value"
                            v-if="sale.condition_min_count > 0"
                            >Мин. общ. кол-во товаров - {{ sale.condition_min_count }} шт</span
                          >
                          <span class="cart__item-sales-item-value" v-if="sale.min_count > 1"
                            >Мин. кол-во товаров - {{ sale.min_count }} шт</span
                          >
                          <span class="cart__item-sales-item-value" v-if="sale.multiplicity > 1"
                            >Кратность - {{ sale.multiplicity }} шт</span
                          >
                          <span class="cart__item-sales-item-value" v-if="sale.integration == 1"
                            >Интеграция с MachineStore</span
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="order__item-content-bottom">
                  <div class="order__item-content-bottom-left">
                    <div
                      class="order__item-prop"
                      v-if="org?.cart_data?.delay_type == 1 && org?.cart_data?.delay == 0"
                    >
                      <p class="order__item-prop-label">Предоплата</p>
                    </div>
                    <div class="order__item-prop" v-else>
                      <p class="order__item-prop-label">
                        {{
                          org?.cart_data?.delay_type == 1
                            ? 'Отсрочка:&nbsp;'
                            : 'Под реализацию:&nbsp;'
                        }}
                      </p>
                      <p class="order__item-prop-value">{{ org?.cart_data?.delay }} дней</p>
                    </div>
                    <div class="d-divider d-divider--vertical order__item-prop-divider"></div>
                    <div class="order__item-prop">
                      <p class="order__item-prop-label">Оплата доставки:&nbsp;</p>
                      <p class="order__item-prop-value">
                        {{ org?.cart_data?.payer == 1 ? 'Поставщик' : 'Покупатель' }}
                      </p>
                    </div>
                  </div>
                  <div class="order__item-content-bottom-right">
                    <!--
                      <div
                        class="d-divider d-divider--vertical order__item-content-bottom-right-divider"
                      ></div>
                      <button class="order__item-upload">
                        <i class="d-icon-upload2"></i>
                      </button>
                      -->
                  </div>
                </div>
                <div class="order__item-footer">
                  <!--
                    <div
                      class="d-divider d-divider--vertical order__item-content-bottom-right-divider"
                    ></div>
                    <button class="order__item-upload">
                      <i class="d-icon-upload2"></i>
                    </button>
                    -->
                </div>
              </div>
            </div>
          </div>

          <!-- Итого -->
          <div class="order__footer" v-if="Object.keys(this.basketStore).length > 1">
            <div class="d-divider d-divider--full order__footer-divider"></div>
            <!-- <div class="order__footer-content order__footer-content-date">
              <div class="order__footer-left">
                <p class="order__footer-label-date">Укажите дату окончания действия предложения</p>
              </div>
              <div class="order__footer-right">
                <form class="order__footer-right">
                    <DatePicker
                      v-model="this.form.end_date"
                      dateFormat="dd.mm.yy"
                      placeholder="Выберите дату окончания"
                      :manualInput="false"
                      :minDate="now"
                      @value-change="this.error = false"
                      showIcon
                    />
                    <div v-if="error" class="d-input-error d-input-error-right">
                      <i class="d-icon-warning d-input-error__icon"></i>
                      <span class="d-input-error__text"
                        >Выберите дату окончания!</span
                      >
                    </div>
                </form>

              </div>

            </div> -->
            <div class="order__footer-content">
              <div class="order__footer-left">
                <p class="order__footer-label">Итого</p>
              </div>
              <div class="order__footer-right">
                <p class="order__footer-value">
                  {{ this.basketStore.cart_data.cost.toLocaleString('ru') }} ₽
                </p>
                <div class="order__footer-actions">
                  <button
                    class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__footer-actions-buy"
                    @click.prevent="
                      () => {
                        if (this.basketOffer?.cart_data?.not_available) {
                          this.showChangedCount = true
                          this.showChangedId = 'all'
                        } else {
                          offerCreate('all')
                        }
                      }
                    "
                  >
                    Отправить предложение
                  </button>
                  <!--
                    <div class="d-divider d-divider--vertical order__footer-actions-divider"></div>
                    <button class="order__footer-actions-upload">
                      <i class="d-icon-upload2"></i>
                    </button>
                  -->
                </div>
              </div>

              <div class="order__footer-top">
                <p class="order__footer-label">Итого</p>
                <p class="order__footer-value">
                  {{ this.basketStore.cart_data.cost.toLocaleString('ru') }} ₽
                </p>
              </div>
              <div class="order__footer-bottom">
                <div class="order__footer-actions">
                  <button
                    class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__footer-actions-buy"
                    @click.prevent="
                      () => {
                        if (this.basketStore?.cart_data?.not_available) {
                          this.showChangedCount = true
                          this.showChangedId = 'all'
                        } else {
                          offerCreate('all')
                        }
                      }
                    "
                  >
                    Отправить предложение
                  </button>
                  <!--
                  <div class="d-divider d-divider--vertical order__footer-actions-divider"></div>
                  <button class="order__footer-actions-upload">
                    <i class="d-icon-upload2"></i>
                  </button>
                  -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order" v-else>
          <div class="order__header">
            <h3 class="order__header-title">Заказ #{{ order }} оформлен!</h3>
            <button class="order__header-close" @click.prevent="close()">
              <i class="d-icon-times-flat"></i>
            </button>
          </div>
          <div class="order__orders">
            <p>В ближайшее время с Вами свяжутся наши менеджеры.</p>
            <img class="k-order-img" src="/images/order.png" alt="" />
          </div>
        </div>
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
    <customModal v-model="this.showChangedCount" class="clear_cart cart_not-avialable">
      <h3>На складе не хватает товара</h3>
      <p>
        Пока вы формировали предложение, у Поставщиков изменилось количество товаров на складе. Мы
        внесли изменения в ваше предложение в соответствии с остатками продукции на складах. Вам
        необходимо проверить предложение и отправить его снова.
      </p>
      <div class="basket-change__info">
        <div class="basket-change__h2">Нет на складе:</div>
        <div class="basket-change__products">
          <div v-for="warehouse in this.basketOffer.data" v-bind:key="warehouse.store_data.id">
            <div v-for="org in warehouse.data" v-bind:key="org.org_data.id">
              <div v-for="store in org.data" v-bind:key="store.warehouse_data.id">
                <div v-for="(item, p_key) in store.data" v-bind:key="p_key">
                  <div
                    class="basket-change__product"
                    v-if="Number(item.available) - item.count < 0"
                  >
                    <div class="basket-change__product-left">
                      <img :src="item.image" alt="" />
                      <div class="basket-change__product-info">
                        <div class="basket-change__product-name">{{ item.name }}</div>
                        <div class="basket-change__product-article">{{ item.article }}</div>
                      </div>
                    </div>
                    <div class="basket-change__product-right">
                      <span class="basket-change__product-right-label">В наличии:</span>
                      <span class="basket-change__product-right-value"
                        >{{ item.available }} шт из {{ item.count }} шт</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="basket-change__buttons">
        <div
          class="d-button d-button-primary d-button-primary-small"
          @click="this.showChangedCount = false"
        >
          Проверить предложение
        </div>
        <div
          class="d-button d-button-primary d-button-primary-small"
          @click.prevent="
            () => {
              offerCreate()
              this.showChangedCount = false
            }
          "
        >
          Оформить с изменениями
        </div>
      </div>
    </customModal>
  </teleport>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import Counter from '@/shared/ui/Counter.vue'
import Toast from 'primevue/toast'

export default {
  name: 'orderOfferWindow',
  emits: ['close', 'catalogUpdate', 'offerSubmit'],
  components: { Loader, customModal, Counter, Toast },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      showClearBasketModal: false,
      showChangedCount: false,
      showChangedId: '',
      basketStore: {},
      fetchIds: [],
      id_clear_org: 0,
      id_clear_store: 0,
      order: '',
      form: {
        end_date: null,
      },
      error: false,
      now: '',
      sales_active: {},
    }
  },
  computed: {
    ...mapGetters({
      basketOffer: 'offer/basketOffer',
      basketOfferWarehouse: 'offer/basketOfferWarehouse',
    }),
  },
  methods: {
    ...mapActions({
      getBasketOffer: 'offer/getBasketOffer',
      basketOfferClear: 'offer/basketOfferClear',
      basketOfferProductRemove: 'offer/basketOfferProductRemove',
      basketOfferProductUpdate: 'offer/basketOfferProductUpdate',
      offerSubmit: 'offer/offerSubmit',
    }),
    salesActive(key) {
      if (key in this.sales_active) {
        this.sales_active[key] = !this.sales_active[key]
      } else {
        this.sales_active[key] = true
      }
    },
    close() {
      this.$emit('close')
    },
    clearCart() {
      this.loading = true
      this.showClearBasketModal = false
      this.basketOfferClear({ org_id: this.id_clear_org, store_id: this.id_clear_store }).then(
        () => {
          this.id_clear_org = 0
          this.$emit('catalogUpdate')
          this.updateBasket()
        },
      )
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
        this.$emit('catalogUpdate')
      })
    },
    offerCreate() {
      //  if(this.form.end_date == null) {
      //    this.error = true
      //    this.$toast.add({ severity: 'error', summary: "Ошибка", detail: "Укажите дату окончания предложения", life: 3000 });
      //    return
      //  }else{
      this.loading = true
      let date = this.form.end_date

      this.offerSubmit({ date_end: date }).then((res) => {
        if (res.data.success) {
          this.loading = false
          //       // this.$route.push({
          //       //   // на предложения
          //       // });
          this.$toast.add({
            severity: 'success',
            summary: 'Предложение создано',
            detail: 'Вы успешно отправили предложение!',
            life: 3000,
          })
          // this.id_clear_org = this.$route.params.id_org_from
          // this.id_clear_store = this.basketOfferWarehouse
          // this.clearCart({ org_id: this.id_clear_org, store_id: this.id_clear_store })
          this.getBasketOffer()
          this.$emit('offerSubmit')
          this.$emit('close')
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Произошла ошибка! Попробуйте оформить предложение позже!',
            life: 3000,
          })
          return
        }
      })
      //  }
    },
  },
  mounted() {
    document.addEventListener('click', (event) => {
      if (
        !event.target.closest('.order__sheet') &&
        !event.target.closest('.order-card__modal-comment') &&
        !event.target.closest('.header__cart') &&
        this.active === true
      ) {
        this.$emit('close')
      }
    })
    this.now = new Date()
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
    basketStore(newVal) {
      if (Object.keys(newVal).length) {
        this.loading = false
      } else {
        this.loading = false
        if (!this.order) {
          this.$emit('close')
        }
        this.$emit('catalogUpdate')
      }
    },
    basketOffer(newVal) {
      if (Object.keys(this.basketOffer).length > 1) {
        if (
          Object.prototype.hasOwnProperty.call(newVal.data, this.basketOfferWarehouse) &&
          this.basketOfferWarehouse
        ) {
          this.basketStore = newVal.data[this.basketOfferWarehouse]
          this.order = ''
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
.order__footer-content-date {
  margin-bottom: 20px;
}
.order__footer-label-date {
  color: #757575;
  font-size: 16px;
  font-weight: 500;
  max-width: 300px;
}
.d-input-error-right {
  justify-content: flex-end;
  margin-top: -10px;
}
.offer__sheet-wrapper .order__footer-divider {
  --d-divider-margin: 16px 48px;
}
.offer__sheet-wrapper .order__item-list {
  padding-bottom: 150px;
}
.offer__sheet-wrapper .order__item {
  margin-bottom: 40px;
}
</style>
