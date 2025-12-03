<template>
  <Toast/>
  <div class="d-sheet__overlay order__sheet-overlay" :class="{ active: active }">
    <div class="d-sheet__wrapper order__sheet-wrapper">
      <div
        class="d-sheet d-sheet--active order__sheet"
        :class="{ order: order }"
        data-sheet="order"
      >
        <Loader v-if="this.loading"></Loader>
        <div class="d-sheet__content order" v-if="!order">
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
          <div class="order__item-list" v-if="Object.keys(basketStore).length > 1">
            <div v-for="(org, org_id) in basketStore.data" :key="org_id">
              <div
                class="order__item"
                v-for="(warehouse, warehouse_id) in org.data"
                :key="warehouse_id"
              >
              <div class="mst__alert blue" v-if="warehouse.type == 'order' && warehouse.data">
                <router-link
                  :to="{
                    name: 'purchasesOrder',
                    params: {
                      id: this.$route.params.id,
                      order_id: warehouse.id,
                    },
                  }">
                В данный момент вы редактируете "Заказ #{{ warehouse.id }}"
                </router-link>
              </div>
              <div class="mst__alert blue" v-if="warehouse.type == 'offer' && warehouse.data">
                <router-link
                  :to="{
                    name: 'purchasesOffer',
                    params: {
                      id: this.$route.params.id,
                      offer_id: warehouse.id,
                    },
                  }">
                В данный момент вы редактируете "Предложение #{{ warehouse.id }}"
                 </router-link>
              </div>
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
                        <p class="order__item-header-warehouse-label">Склад #{{ warehouse_id }}:</p>
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
                      <p class="order__item-header-address-label">Адрес доставки:&nbsp;</p>
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
                      <span class="order__item-product-price nowrap"
                        >{{ product.cost.toLocaleString('ru') }} ₽</span
                      >
                      <div class="order__item-product-price-rrc">
                        <p v-if="product.prices.rrc_discount > 0">-{{ product.prices.rrc_discount.toLocaleString('ru') }}% от РРЦ</p>
                        <p v-else class="cart-no-discount">Без скидки от РРЦ</p>
                        <p>{{ product.price.toLocaleString('ru') }} ₽ за ед.</p>
                      </div>
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
                      :item="{ basket, product }"
                      :mini="true"
                      :min="0"
                      :max="Number(product?.available)"
                      :value="Number(product?.count)"
                      :step="Number(product?.multiplicity ? product?.multiplicity : 1)"
                      :id="Number(product?.remain_id)"
                      :key="new Date().getTime() + '_1_' + product?.key"
                    />
                    <span class="order__item-product-price nowrap"
                      >{{ product.price.toLocaleString('ru') }} ₽</span
                    >
                  </div>
                </div>
                <div class="order__item-content-comment">
                  <button  class="d-button d-button-quaternary d-button-quaternary-small order__item-content-comment-add"
                    @click.prevent="modalComment = true, modalCommentOrg = org_id, modalCommentStore = warehouse_id, modalCommentText = ''"
                    v-if="!warehouse.comment"
                    >
                      Добавить комментарий
                      <i class="d-icon-plus"></i>
                  </button>
                  <div class="order__item-content-description-container" v-else>
                    <div class="order__item-content-description-header">
                      <p class="order__item-prop-label order__item-comment-weight">Комментарий:</p>
                      <div class="order__item-content-description-actions">
                        <button class="order__item-content-description-actions-button"
                          @click.prevent="modalComment = true, modalCommentOrg = org_id, modalCommentStore = warehouse_id, modalCommentText = warehouse.comment">
                          <i class="d-icon-pen2"></i>
                        </button>
                        <div class="d-divider d-divider--vertical"></div>
                        <button class="order__item-content-description-actions-button"
                        @click.prevent="modalCommentDelete = true, modalCommentOrg = org_id, modalCommentStore = warehouse_id">
                          <i class="d-icon-trash"></i>
                        </button>
                      </div>
                    </div>
                    <div class="order__item-prop-value order__item-comment-weight order--comment">{{ prepareComment(warehouse.comment) }}</div>
                  </div>

                </div>
                <div class="order__item-content-bottom">
                  <div class="order__item-content-bottom-left">
                    <div
                      class="order__item-prop"
                      v-if="org?.cart_data?.delay_type == 1 && org?.cart_data?.delay == 0"
                    ><p class="order__item-prop-label">Отсрочка:&nbsp;</p>
                      <p class="order__item-prop-value">Предоплата</p>
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

                    <button  v-if="warehouse.type == 'order'"
                      class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__item-buy"
                      @click.prevent="
                        () => {
                          if (org?.cart_data?.not_available) {
                            this.showChangedCount = true
                            this.showChangedId = org.org_data.id
                          } else {
                            orderSubmit(org.org_data.id, warehouse_id, 0)
                          }
                        }
                      "
                    >
                      Изменить заказ
                    </button>
                    <button  v-else
                      class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__item-buy"
                      @click.prevent="
                        () => {
                          if (org?.cart_data?.not_available) {
                            this.showChangedCount = true
                            this.showChangedId = org.org_data.id
                          } else {
                            orderSubmit(org.org_data.id, warehouse_id)
                          }
                        }
                      "
                    >
                      Оформить заказ
                    </button>
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
                  <button
                    class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__item-buy"
                    @click.prevent="
                      () => {
                        if (org?.cart_data?.not_available) {
                          this.showChangedCount = true
                          this.showChangedId = org.org_data.id
                        } else {
                          orderSubmit(org.org_data.id, warehouse_id)
                        }
                      }
                    "
                  >
                    Оформить заказ

                    <span class="order__item-buy-value"
                      >{{ org.cart_data.cost.toLocaleString('ru') }} ₽</span
                    >
                  </button>
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
                        if (this.basket?.cart_data?.not_available) {
                          this.showChangedCount = true
                          this.showChangedId = 'all'
                        } else {
                          orderSubmit('all')
                        }
                      }
                    "
                  >
                    Оформить все заказы
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
                          orderSubmit('all', 0)
                        }
                      }
                    "
                  >
                    Оформить все заказы
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
    <customModal v-model="modalComment" class="order-card__modal-comment">
        <h3>Введите комментарий к заказу</h3>
        <Editor
          v-model="this.modalCommentText"
          id="description"
          editorStyle="height: 248px"
          variant="simple"
          @text-change="this.error = ''"
        />
        <div v-if="error != ''" class="d-input-error vendor-change-error">
                    <i class="d-icon-warning d-input-error__icon"></i>
                    <span class="d-input-error__text">{{ error }}</span>
                  </div>
        <div class="order-card__modal-buttons">
          <button
            type="button"
            href="#"
            class="d-button d-button-primary d-button--sm-shadow order-card__modal-buttons-cancel"
            @click.prevent="modalCommentText = '', modalComment = false"
          >
            Отмена
          </button>
          <button class="d-button d-button-primary d-button-primary-small d-button--sm-shadow"
            @click.prevent="saveComment">
            Сохранить
          </button>
        </div>

    </customModal>
    <customModal v-model="modalCommentDelete" class="order-card__modal-comment order-card__modal-comment-del">
        <h3>Удалить комментарий?</h3>

        <div class="order-card__modal-buttons">
          <button
            type="button"
            href="#"
            class="d-button d-button-primary d-button--sm-shadow order-card__modal-buttons-cancel"
            @click.prevent="modalCommentDelete = false"
          >
            Отмена
          </button>
          <button class="d-button d-button-primary d-button-primary-small d-button--sm-shadow"
            @click.prevent="deleteComment">
            Удалить
          </button>
        </div>

    </customModal>
    <customModal v-model="this.showClearBasketModal" class="clear_cart">
      <b>Вы уверены, что хотите очистить корзину?</b>
      <p>Это действие невозможно будет отменить</p>
      <button class="d-button d-button-primary d-button-primary-small" @click="this.clearCart()">
        Да, очистить!
      </button>
    </customModal>
    <customModal v-model="this.showChangedCount" class="clear_cart">
      <b>На складе не хватает товара</b>
      <p>
        Пока вы формировали заказ, у Поставщиков изменилось количество товаров на складе. Мы внесли
        изменения в ваш заказ в соответствии с остатками продукции на складах. Вам необходимо
        проверить заказ и отправить его снова.
      </p>
      <div class="basket-change__info">
        <div class="basket-change__h2">Нет на складе:</div>
        <div class="basket-change__products">
          <div v-for="warehouse in this.basket.data" v-bind:key="warehouse.store_data.id">
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
                      Нет в наличии: <br />
                      {{ item.available }} шт. <span>из {{ item.count }} шт</span>
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
          Проверить заказ
        </div>
        <div
          class="d-button d-button-primary d-button-primary-small"
          @click.prevent="
            () => {
              orderSubmit(this.showChangedId)
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
import Editor from 'primevue/editor'
import Toast from 'primevue/toast'

export default {
  name: 'orderWindow',
  emits: ['close', 'catalogUpdate', 'orderSubmit'],
  components: { Loader, customModal, Counter, Editor, Toast },
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
      modalComment: false,
      modalCommentOrg: 0,
      modalCommentStore: 0,
      modalCommentText: '',
      error: '',
      modalCommentDelete: false,
    }
  },
  computed: {
    ...mapGetters({
      basket: 'basket/basket',
      basketWarehouse: 'basket/basketWarehouse',
    }),
  },
  methods: {
    ...mapActions({
      getBasket: 'basket/getBasket',
      basketClear: 'basket/basketClear',
      basketProductRemove: 'basket/basketProductRemove',
      basketProductUpdate: 'basket/basketProductUpdate',
      orderSubmitApi: 'basket/orderSubmit',
      setBasketComment: 'basket/setBasketComment',
    }),
    close() {
      this.$emit('close')
    },
    clearCart() {
      this.loading = true
      this.showClearBasketModal = false
      this.basketClear({ org_id: this.id_clear_org, store_id: this.id_clear_store }).then(() => {
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
        this.$emit('catalogUpdate')
      })
    },
    async orderSubmit(orgId, warehouse_id) {
      this.loading = true
      this.getBasket().then((response) => {
        // console.log(response.data?.data?.data)
        if (response.data?.data?.data?.cart_data?.not_available) {
          this.loading = false
          this.showChangedCount = true
          this.showChangedId = orgId
        } else {
          // orderSubmitApi
          this.orderSubmitApi({ orgId: orgId, warehouse_id: warehouse_id }).then((response) => {
            let arr = []
            console.log(response)
            let res = response.data?.data
            let products = res.products
            let nums = res.nums
            console.log(res)
            for (var key in products) {
              const product = products[key]
              arr.push({
                id: product.id_remain,
                name: product.name,
                price: product.price,
                quantity: product.count,
              })
            }

            window.dataLayer = window.dataLayer || []

            window.dataLayer.push({
              ecommerce: {
                currencyCode: 'RUB',
                purchase: {
                  actionField: {
                    id: 'TRX987',
                  },
                  products: arr,
                },
              },
            })
            this.$emit('orderSubmit', nums.join(', '))
            this.order = nums.join(', ')
            this.getBasket()
            this.loading = false
          })
        }
      })
    },
    saveComment(){
      if(this.modalCommentText != '' && this.modalCommentText != '<p></p>'){
        this.loading = true
        this.setBasketComment({
        store_id: this.basketWarehouse,
        org_id: this.modalCommentOrg,
        org_store: this.modalCommentStore,
        comment: this.modalCommentText,
        set: 'set'
      }).then((res) => {
        if(res.data.success){
          this.$toast.add({
              severity: 'success',
              summary: 'Успешно!',
              detail: 'Комментарий успешно обновлен!',
              life: 3000,
            })
            this.error = ''
            this.modalCommentText = ''
            this.modalCommentOrg = 0
            this.modalCommentStore = 0
            this.modalComment = false
            this.getBasket()
            this.loading = false
        }else{
          this.$toast.add({
          severity: 'error',
          summary: 'Произошла ошибка!',
          detail: 'Комментарий не обновлен! Попробуйте добавить комментарий еще раз',
          life: 3000,
        })
        this.loading = false
        }
      })
      }else{
        this.error = 'Введите комментарий!'
        return
      }

    },
    prepareComment(code){
      let new_string = code.replace(/<(.|\n)*?>/g, '')
      new_string = new_string.replace(/\&nbsp;/g, ' ')
      new_string = new_string.replace(/\n/g, ' ')
      if(new_string.length > 120){
        new_string = new_string.substring(0,120)+"..."
      }
      return new_string
    },
    deleteComment(){
        this.loading = true
        this.setBasketComment({
          store_id: this.basketWarehouse,
          org_id: this.modalCommentOrg,
          org_store: this.modalCommentStore,
          comment: '',
          set: 'unset'
        }).then((res) => {
          if(res.data.success){
            this.$toast.add({
                severity: 'success',
                summary: 'Успешно!',
                detail: 'Комментарий успешно удален!',
                life: 3000,
              })
              this.error = ''
              this.modalCommentText = ''
              this.modalCommentOrg = 0
              this.modalCommentStore = 0
              this.modalComment = false
              this.modalCommentDelete = false
              this.getBasket()
              this.loading = false
          }else{
            this.$toast.add({
              severity: 'error',
              summary: 'Произошла ошибка!',
              detail: 'Комментарий не удален! Попробуйте еще раз',
              life: 3000,
            })
            this.loading = false
          }
        })
    }
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
        if (!this.order) {
          this.$emit('close')
        }
        this.$emit('catalogUpdate')
      }
    },
    basket(newVal) {
      if (Object.keys(this.basket).length > 1) {
        if (
          Object.prototype.hasOwnProperty.call(newVal.data, this.basketWarehouse) &&
          this.basketWarehouse
        ) {
          this.basketStore = newVal.data[this.basketWarehouse]
          this.order = ''
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
.order__item-list {
  padding-bottom: 200px;
}
.order__item-header-delete {
  display: inline-block;
}
.clear_cart {
  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    text-align: center;
  }
  .d-button {
    box-shadow: none;
    display: inline-block;
  }
  b {
    margin: 15px 0;
    display: block;
  }
  p {
    margin-bottom: 10px;
  }
}
.order__item {
  background-color: #f7f7f7;
  box-shadow: none;

  .d-badge2 {
    background: #ededed;
  }
  .order__item-product {
    width: 80%;
  }
  .order__item-content {
    & + .order__item-content {
      margin-top: 24px;
    }
  }
  .order__item-content-bottom {
    margin-top: 24px;
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
  .order__list-order-edit{

    border-radius: 24px 24px 0 0;
    border-bottom: 1px solid #75757575;
    color: #282828;
    font-size: 18px;
    font-weight: 600;
    padding: 8px 0px 12px;
    margin-bottom: 12px;
  }

}
  .order__item-content-comment{
    margin-top: 24px;

  }
  .order__item-content-description-container{
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .order__item-comment-weight{
    font-weight: 400;
  }
  .order__item-content-description-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .order__item-content-description-actions{
    display: flex;
  }
  .order__item-content-description-actions-button{
    color: #757575;
  }
  .order__item-content .cart__item-header-button {
    font-size: 16px;
  }
  .order__item-content-comment-add{
    font-weight: 500;
    font-size: 12px;
    line-height: 123%;
    height: 24px;
    min-height: 24px;
    max-height: 24px;
    padding: 4px 8px;
    gap: 8px;
  }
  .order__item-content-comment-add i{
    font-size: 10px;
  }
  .order-card__modal-comment .modal-content h3{
    margin-top: -24px;
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 24px;
    line-height: 31px;
  }
  .order-card__modal-comment .modal-content .order-card__modal-buttons{
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: center;
    margin-top: 56px;
  }
  .order-card__modal-comment .modal-content .order-card__modal-buttons .d-button{
    height: 38px;
    min-height: 38px;
    max-height: 38px;
    min-width: 91px;
    padding: 10px 19px;
    font-size: 14px;
    font-weight: 500;
  }
  .order-card__modal-buttons-cancel{
    background-color: #fff;
    border: 1px solid #282828;
    color: #282828;
    width: 91px;
  }
  .order-card__modal-buttons-cancel:hover{
    background-color: #282828;
    border: 1px solid #282828;
    color: #fff;
  }
  .order-card__modal-comment .modal-content{
    padding-bottom: 0;
  }
  .order-card__modal-comment-del .modal-content {
        max-width: 656px;
  }
  .order--comment{
    width: 100%;
    position: relative;
    word-wrap: break-word;
    text-wrap: wrap;
    white-space: pre-wrap; /* css-3 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    overflow-wrap: break-word;
    overflow: hidden;
  }
.product-card__basket-button.basket-true .d-counter {
    background: #ededed;
    box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
    border-radius: 35px;
    border: none;
}
.order__footer-divider{
    margin-top: 0;
    margin-bottom: 35px;
}
.order__footer {
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(11.4px);
    padding: 0 32px 32px;
}
.order__item-buy {
    height: 32px;
    min-height: 32px;
}
.order__item-list {
    padding-bottom: 120px;
}
.order .d-divider {
    background-color: #75757575 !important;
}
.order__item .order__item-header-warehouse {
    flex-direction: row;
    gap: 4px;
    align-items: flex-start;
    text-align: left;
}
.order__header {
    margin-bottom: 40px;
}

.order__item-header-delete {
  color: #757575;
}
.order__item-list {
  gap: 40px;
}
.order__item-content-comment-add{
  box-shadow: none;
}
.order__item-content-top-right {
  width: max-content;
  align-items: end;
}
.order__item-content-top-right form{
  display: flex;
  justify-content: end;
}
.order__item-product-price-rrc{
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: end;
  gap: 4px;
  margin-bottom: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #757575;
}
.order__item-product-price-rrc p{
  text-align: right;
}
.cart-no-discount{
  font-size: 12px;
  line-height: 12px;
}
.order__item-product{
        display:flex;
        align-items: center;
    }
@media (width <= 1920px) {
    .order {
        padding: 32px;
    }

}
@media (width > 1536px) {
    .order__item-product-counter .d-counter{
        height: 30px;
        width: 124px;
        max-width: 124px;
    }
    .order__item-product-counter .d-counter__button:first-child:after {
        content: "";
        background-color: rgba(117, 117, 117, 0.3);
        width: 0.5px;
        height: 13px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .order__item-product-counter .d-counter__button:last-child:before {
        content: "";
        background-color: rgba(117, 117, 117, 0.3);
        width: 0.5px;
        height: 13px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .order__item-product-counter .d-counter__button-icon {
        color: #282828;
        font-size: 10px;
    }
    .order__item-product-counter .d-counter__button {
        width: 20px;
        padding-inline: 13px;
        position: relative;
    }
    .order__item-product-counter {
        background-color: #ededed;
        border: none;
        max-width: 124px;
        height: 30px;
    }
    .order__item-product-price {
        text-align: right;
        font-size: 24px;
        width: max-content;
    }
}
@media (width <= 1536px) {
    .order__header-title {
        font-size: 20px;
    }
    .order__item .order__item-product-title {
        max-width: 440px;
    }
    .order__sheet {
        width: 814px;
    }
    .order__item-product-counter .d-counter{
        height: 24px;
        width: 121px;
        max-width: 121px;
    }
    .order__item-prop-label, .order__item-prop-value {
        font-size: 14px;
        font-weight: 500;
    }
    .order__item-prop-divider {
        display: block;
    }
    .order__item-buy {
        font-size: 16px;
    }
    .order__item-content-bottom-left {
        align-items: flex-start;
        gap: 4px;
        flex-direction: row;
    }
    .order__item-product-counter .d-counter__button:first-child:after {
        content: "";
        background-color: rgba(117, 117, 117, 0.3);
        width: 0.5px;
        height: 13px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .order__item-product-counter .d-counter__button:last-child:before {
        content: "";
        background-color: rgba(117, 117, 117, 0.3);
        width: 0.5px;
        height: 13px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .order__item-product-counter .d-counter__button-icon {
        color: #282828;
        font-size: 10px;
    }
    .order__item-product-counter .d-counter__button {
        width: 20px;
        padding-inline: 13px;
        position: relative;
    }
    .order__item-product-counter {
        background-color: #ededed;
        border: none;
        max-width: 121px;
        height: 24px;
    }
    .order__item-product-price {
        text-align: right;
        font-size: 20px;
    }

}
@media (width <= 1280px) {
    .order__header-title {
        font-size: 14px;
    }
    .order__item .order__item-product-title {
        max-width: 266px;
    }
    .order__sheet {
        width: 622px;
    }
    .order__item-content-top-right {
        align-items: end;
    }
    .order__item-prop-label, .order__item-prop-value {
        font-size: 14px;
        font-weight: 500;
    }
    .order__item-prop-divider {
        display: block;
    }
    .cart__item-header-button {
        display: block;
    }
    .order__item-content .cart__item-header-button {
        font-size: 14px;
    }
    .order__item-header-delete {
        font-size: 14px;
        aspect-ratio: 1;
        width: 20px;
        height: 20px;
    }
    .order__item-buy,.order__footer-actions-buy {
        font-size: 10px;
        font-weight: 600;
        padding: 4px 16px;
        height: 24px;
        min-height: 24px;
    }
    .order__item-content-bottom-left {
        align-items: flex-start;
        gap: 4px;
        flex-direction: row;
    }
    .order__item-product-price {
        text-align: right;
        font-size: 16px;
    }
    .order__item-content-description-actions {
        font-size:14px;
    }
    .order__item-header-warehouse-label,.order__item-header-warehouse-value {
        font-size: 12px;
    }
    .order__item-header-address-label, .order__item-header-address-value {
        font-size: 14px;
    }
    .order__item-product-image-container {
        aspect-ratio: 1;
        width: 40px;
        height: 40px;
    }
    .order__item-product-title, .order__item-product-article {
        font-size: 12px;
    }
    .order__item-prop-label, .order__item-prop-value {
        font-size: 10px;
        font-weight: 500;
    }
    .order__footer-label{
        font-size: 14px;
    }
    .order__footer-value {
        font-size: 16px;
    }
    .order__footer {
        padding: 0 16px 16px;
    }
    .order {
        padding: 16px;
    }
    .order__header {
        margin-bottom: 24px;
    }
    .order__footer-divider{
        margin-top: 0;
        margin-bottom: 16px;
    }
    .order__item-content-comment-add {
      height: 24px;
      font-size: 10px;
    }

}
@media (width <= 1024px) {
    .order__header-title {
        font-size: 14px;
    }
    .order__item .order__item-product-title {
        max-width: 292px;
    }
    .order__sheet {
        width: 622px;
    }
    .order__item-content-top-right {
        align-items: end;
    }
    .order__item-prop-label, .order__item-prop-value {
        font-size: 14px;
        font-weight: 500;
    }
    .order__item-prop-divider {
        display: block;
    }
    .cart__item-header-button {
        display: block;
    }
    .order__item-content .cart__item-header-button {
        font-size: 14px;
    }
    .order__item-header-delete {
        font-size: 14px;
        aspect-ratio: 1;
        width: 20px;
        height: 20px;
    }
    .order__item-buy,.order__footer-actions-buy {
        font-size: 10px;
        font-weight: 600;
        padding: 4px 16px;
        height: 24px;
        min-height: 24px;
    }
    .order__item-content-bottom-left {
        align-items: flex-start;
        gap: 4px;
        flex-direction: row;
    }
    .order__item-product-price {
        text-align: right;
        font-size: 16px;
    }
    .order__item-content-description-actions {
        font-size:14px;
    }
    .order__item-header-warehouse-label,.order__item-header-warehouse-value {
        font-size: 10px;
    }
    .order__item-header-address-label, .order__item-header-address-value {
        font-size: 10px;
    }
    .order__item-product-image-container {
        aspect-ratio: 1;
        width: 40px;
        height: 40px;
    }
    .order__item-product-title, .order__item-product-article {
        font-size: 12px;
    }
    .order__item-prop-label, .order__item-prop-value {
        font-size: 10px;
        font-weight: 500;
    }
    .order__footer-label{
        font-size: 14px;
    }
    .order__footer-value {
        font-size: 16px;
    }
    .order__footer {
        padding: 0 16px 16px;
    }
    .order {
        padding: 16px;
    }
    .order__item-header-badge-image-container {
        width: 18px;
        height: 18px;
    }
    .order__item-product-price {
        font-size: 14px;
        font-weight: 600;
    }
    .order__item-product-counter{
      width: 121px;
    }
    .order__footer-divider{
        margin-top: 0;
        margin-bottom: 24px;
    }
}
@media (width <= 800px){
  .order__sheet {
    width: 90%;
    min-height: 70%;
  }
  .order__header{
    border-bottom: none;
  }
  .order__header-title {
    font-size: 10px;
  }
  .order__header {
    margin-bottom: 8px;
  }
  .order__item-list {
    gap: 16px;
  }
  .order__item {
    margin-bottom: 0px;
  }
  .order__item-header-badge-text {
    font-size: 8px;
  }
  .order__item-header-badge-image-container {
    width: 12px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .order__item-header-badge {
    padding: 2px 8px;
    height: 16px;
    max-height: 16px;
    min-height: 16px !important;
  }
  .order__item-header-warehouse-label, .order__item-header-warehouse-value {
    font-size: 8px;
  }
  .order__item-header-delete,.cart__item-header-button {
    font-size: 10px !important;
    width: 14px;
    height: 14px;
    display: flex;
    justify-content: end;
  }
  .order__item-header-address-label, .order__item-header-address-value {
    font-size: 8px;
  }
  .order__item-header {
    gap: 9px;
  }
  .order__item-content{
    padding: 8px 0;
    border-top: 0.5px solid #75757575; 
  }
  .order__item .order__item-content + .order__item-content {
    margin-top: 0px;
  }
  .order__item-product-image-container {
    width: 38px;
    height: 100%;
  }
  .order__item-product-title, .order__item-product-article {
    font-size: 9px;
  }
  .order__item-product-price {
    font-size: 10px;
    font-weight: 600;
  }
  .order__item-product-price-rrc {
    gap: 2px;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    margin-bottom: 4px;
  }
  .order__item-product-counter {
    width: 90px;
  }
  .order__item-product-counter {
    max-width: 90px;
    height: 16px;
  }
  .d-counter__input {
    font-size: 9px;
  }
  .order__item-product-counter .d-counter__button-icon {
    font-size: 6px;
  }
  .order__item-product-counter .d-counter__button {
    padding-inline: 7px;
  }
  .order__item-content-comment {
    margin-top: 8px;
  }
  .order__item-content-comment-add {
    height: 24px;
    font-size: 9px;
  }
  .order__item-content-comment-add i {
    font-size: 9px;
  }
  .order__item .order__item-content-bottom {
    margin-top: 30px;
  }
  .order__item-prop-label, .order__item-prop-value {
    font-size: 9px;
  }
  .order__item-content-bottom-left {
    align-items: center;
  }
  .order__item-content-bottom-left .d-divider{
    height: 8px;
  }
  .order__item-buy, .order__footer-actions-buy {
    font-size: 9px;
  }
  .order__footer {
    padding: 0;
  }
  .order__footer-label {
    font-size: 10px;
  }
  .order__footer-value {
    font-size: 10px;
  }
  .mst__alert {
    font-size: 9px;
    line-height: 11px;
    padding: 8px;
  }
  .order__item-content-description-actions {
    font-size: 10px;
    align-items: center;
  }
  .order__item-content-description-actions .d-divider{
    height: 7px;
  }
  .order__item-content-description-container {
    gap: 10px;
  }
  .order__footer-divider {
    margin-top: 0;
    margin-bottom: 16px;
  }
  .order__footer-right {
    gap: 8px;
  }
}
@media (width <= 600px) {
  .order__item-content-description-container{
    padding: 0 0px 16px;
  }
  .order__item-content-comment {
    margin: 0 24px 16px;
  }
  .order__item-content-comment button{
    width:100%;

  }
}
</style>
