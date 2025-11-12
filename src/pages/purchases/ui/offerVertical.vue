<template>
  <!--Карточка товара -->
  <div
    class="product-card"
    :class="{ 'product-card-noactive': offer.requirement && offer.available == 0 }"
  >
    <div class="product-card__content">
      <!-- Информация о товаре -->
      <div class="product-card__content-left">
        <!-- Шапка -->
        <div class="product-card__header">
          <!-- Продавец -->

          <div class="product-card__seller" @click="this.seller_info = true">
            <img
              :src="offer.store_image"
              :alt="offer.org.name"
              class="product-card__seller-image"
              v-if="offer.store_image"
            />
            <p class="product-card__seller-name">{{ offer.org.name }}</p>
            <button class="product-card__seller-button">
              <i class="d-icon-angle-rounded-bottom product-card__seller-button-icon"></i>
            </button>
          </div>
          <div class="product-card__seller--active" @click="this.seller_info = false" v-if="this.seller_info">
            <div class="product-card__seller--active-header">
              <img
              :src="offer.store_image"
              :alt="offer.org.name"
              class="product-card__seller-image"
              v-if="offer.store_image"
            />
            <p class="product-card__seller-name">{{ offer.org.name }}</p>
            <button class="product-card__seller-button">
              <i class="d-icon-angle-rounded-bottom product-card__seller-button-icon"></i>
            </button>
            </div>
            <p class="product-card__seller-info">
              {{ offer.org.name }} ИНН {{ offer.org_inn ? offer.org_inn : '-' }}
            </p>
          </div>

          <!-- Сделать всплывающую информацию о продавце -->
        </div>
        <!-- Главная информация -->
        <div class="product-card__info-container">
          <div class="product-card__info">
            <!-- Изображение товара -->
            <div class="product-card__image-container">
              <img :src="offerData.image" :alt="offerData.pagetitle" class="product-card__image" />
            </div>
            <!-- Блок с ценой и акциями -->
            <div class="product-card__price-container">
              <!-- Если нет в наличии -->
              <div class="product-card__price" v-if="offer.requirement && offer.available == 0">
                <p class="product-card__price-value-discounted product-card__noavailable">
                  Нет в наличии
                </p>
              </div>
              <!-- Цена товара -->
              <div class="product-card__price" v-else>
                <p class="product-card__price-value-discounted">
                  {{ offer.price.toLocaleString('ru') }} ₽
                </p>
                <p class="product-card__price-value" v-if="offer.price > offer.min_price.price">
                  {{ offer.min_price.price.toLocaleString('ru') }}
                  <span class="product-card__price-value-suffix">₽</span>
                  <span class="product-card__price-label">мин. цена</span>
                </p>
              </div>
              <!-- Кнопка: "Все акции" -->
                <button
                  v-if="offer.actions"
                  class="product-card-vertical__promo-all"
                  @click.prevent="showModal()"
                >
                  Все акции <span class="red-badge">{{ offer.actions.length }}</span>
                  <i class="d-icon-arrow-right product-card-vertical__seller-button-icon"></i>
                </button>

            </div>
            <!-- Название и артикул товара -->
            <div class="product-card__info-text">
              <p class="product-card__title">
                {{ offerData.pagetitle }}
              </p>
              <p class="product-card__article">Арт: {{ offerData.article }}</p>
            </div>

            <!-- Количество -->
            <div class="product-card__count">
              <div class="product-card__count-value">
                <span class="product-card__count-label">В наличии: </span>
                <span v-if="offer.remains_abstract != offer.available">{{
                  offer.remains_abstract
                }}</span>
                <span v-else>{{ offer.available }} шт</span>
                <div v-if="offer.requirement" class="redder">
                  <span v-if="Number(offer.requirement.count) > Number(offer.available)"
                    >Не хватает
                    {{ Number(offer.requirement.count) - Number(offer.available) }} шт.</span
                  >
                </div>
              </div>
              <div
                class="d-divider d-divider--vertical product-card__count-divider"
                v-if="offer.requirement"
              ></div>
              <div class="product-card__count-value" v-if="offer.requirement">
                <span class="product-card__count-label">Ваша потребность: </span>
                {{ Number(offer.requirement.count) }} шт

              </div>
            </div>
            <!-- Дополнительная информация -->
            <div class="product-card__stat-list">
              <!-- Элемент доп. информации -->
              <div class="product-card__stat">
                <i class="d-icon-location product-card__stat-icon"></i>
                <div class="product-card__stat-content">
                  <p class="product-card__stat-name">
                    {{ offer.delivery }} дн. ({{
                      new Date(offer.delivery_day).toLocaleString('ru', {
                        month: '2-digit',
                        day: '2-digit',
                        year: '2-digit',
                      })
                    }})
                  </p>
                  <p class="product-card__stat-description">{{ offer.store_city }}</p>
                </div>
              </div>
              <!-- Элемент доп. информации -->
              <div class="product-card__stat">
                <i class="d-icon-truck product-card__stat-icon"></i>
                <div class="product-card__stat-content">
                  <p class="product-card__stat-name">Доставка</p>
                  <p class="product-card__stat-description">
                    за счет {{ offer.payer == 1 ? 'поставщика' : 'покупателя' }}
                  </p>
                </div>
              </div>

              <!-- Элемент доп. информации -->
              <div class="product-card__stat">
                <i class="d-icon-wallet product-card__stat-icon"></i>
                <div class="product-card__stat-content product-card__stat-content--horizontal">
                  <p class="product-card__stat-name">
                    {{ offer.delay_type == 2 ? 'Под реал.' : 'Отсрочка' }}
                  </p>
                  <p class="product-card__stat-description" v-if="offer.delay">
                    платежа {{ offer.delay }} дней
                  </p>
                  <p class="product-card__stat-description" v-else>Предоплата</p>
                </div>
              </div>


            </div>
            <!-- Купить -->
              <div
                class="product-card__basket-button"
                v-if="!offer.requirement || (offer.requirement && offer.available > 0)"
                :class="{
                  'loading-counter': this.loading,
                }"
              >
                <Counter
                  @ElemCount="ElemCount"
                  :min="0"
                  :max="Number(offer.max)"
                  :id="Number(offer.remain_id)"
                  :store_id="Number(offer.store_id)"
                  :index="Number(offer.remain_id)"
                  :value="Number(offer?.basket?.count)"
                  :step="offer?.multiplicity ? Number(offer?.multiplicity) : 1"
                  :item="offer"
                  :key="new Date().getTime() + '_' + Number(offer.remain_id)"
                />
                <button
                  class="d-button d-button-primary d-button-primary-small d-button--sm-shadow product-card-vertical__buy"
                  :class="{ 'd-button--loading': this.loading }"

                >
                  <div class="d-button__text">
                    <i class="d-icon-cart product-card__buy-icon"></i>
                    В корзину
                  </div>
                </button>
              </div>
          </div>
        </div>


      </div>


    </div>


  </div>
  <teleport to="body">
    <customModal
      v-model="this.modalMultiplicityRemain"
      class="product-not-available product-multiplicity-not-available"
    >
      <img src="/images/icons_milen/outOfStock2.png" alt="" />
      <b>У нас нет столько товаров :(</b>
      <p>
        Извините, но количество данного товара меньше, чем заявленная кратность по Акции. Если вы
        все же хотите купить этот товар, воспользуйтесь одним из соседних предложений.
      </p>
      <button
        class="d-button d-button-primary d-button-primary-small"
        @click="this.modalMultiplicityRemain = false"
      >
        Понятно
      </button>
    </customModal>
    <customModal v-model="this.modalActions" class="product-card-actions__modal">
      <div class="product-card-actions__modal-container">
        <div class="product-card-actions__modal-buttons">
          <button
            @click.prevent="((modalActiveActions = true), (modalOtherActions = false))"
            v-if="activeActions > 0"
            :class="
              modalActiveActions
                ? 'product-card-actions__modal-button-active'
                : 'product-card-actions__modal-button'
            "
          >
            Активные акции
            <div class="d-badge2 product-card__promo-badge">{{ activeActions }}</div>
          </button>
          <button
            @click.prevent="((modalOtherActions = true), (modalActiveActions = false))"
            v-if="otherActions > 0"
            :class="
              modalOtherActions
                ? 'product-card-actions__modal-button-active'
                : 'product-card-actions__modal-button'
            "
          >
            Акции без выполненных условий
            <div class="d-badge2 product-card__promo-badge">{{ otherActions }}</div>
          </button>
        </div>
        <div v-if="modalActiveActions">
          <div
            class="product-card-actions__modal-actions"
            v-for="(item, index) in activeActionsData"
            :key="index"
          >
            <router-link
              :to="{
                name: 'purchasesAction',
                params: { action_id: item.action_id },
              }"
            >
              <div class="product-card-actions__modal-actions-header">
                <i
                  class="product-card-actions__modal-actions-header-icon d-icon-percent-rounded"
                ></i>
                {{ item.type != 3 ? item.name : 'Индивидуальная скидка' }}
              </div>
            </router-link>
            <div class="product-card-actions__modal-actions-content">
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.delay_type == 2"
              >
                Под реализацию
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.delay_type < 2"
              >
                {{
                  item.delay_type == 1 && item.delay > 0
                    ? Number(item.delay).toFixed(0) + ' дн. отсрочки'
                    : 'Предоплата'
                }}
              </div>
              <div class="product-card-actions__modal-actions-content-item" v-if="item.percent > 0">
                {{ item.percent }}% Скидка
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.delivery_type == 2"
              >
                Бесплатная доставка
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.condition_min_sum > 0"
              >
                Минимальная общая сумма заказа - {{ item.condition_min_sum }} ₽
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.condition_SKU > 0"
              >
                Минимальное количество SKU акции - {{ item.condition_SKU }} шт
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.condition_min_count > 0"
              >
                Минимальное общее количество товаров - {{ item.condition_min_count }} шт
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.min_count > 1"
              >
                Минимальное количество товаров - {{ item.min_count }} шт
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.multiplicity > 1"
              >
                Кратность - {{ item.multiplicity }} шт
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.integration == 1"
              >
                Интеграция с MachineStore
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div
            class="product-card-actions__modal-actions"
            v-for="(item, index) in otherActionsData"
            :key="index"
          >
            <router-link
              :to="{
                name: 'purchasesAction',
                params: { action_id: item.action_id },
              }"
            >
              <div class="product-card-actions__modal-actions-header">
                <i
                  class="product-card-actions__modal-actions-header-icon d-icon-percent-rounded"
                ></i>
                {{ item.type != 3 ? item.name : 'Индивидуальная скидка' }}
              </div>
            </router-link>
            <div class="product-card-actions__modal-actions-content">
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.delay_type == 2"
              >
                Под реализацию
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.delay_type < 2"
              >
                {{
                  item.delay_type == 1 && item.delay > 0
                    ? Number(item.delay).toFixed(0) + ' дн. отсрочки'
                    : 'Предоплата'
                }}
              </div>
              <div class="product-card-actions__modal-actions-content-item" v-if="item.percent > 0">
                {{ item.percent }}% Скидка
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.delivery_type == 2"
              >
                Бесплатная доставка
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.condition_min_sum > 0"
              >
                Минимальная общая сумма заказа - {{ item.condition_min_sum }} ₽
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.condition_SKU > 0"
              >
                Минимальное количество SKU акции - {{ item.condition_SKU }} шт
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.condition_min_count > 0"
              >
                Минимальное общее количество товаров - {{ item.condition_min_count }} шт
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.min_count > 1"
              >
                Минимальное количество товаров - {{ item.min_count }} шт
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.multiplicity > 1"
              >
                Кратность - {{ item.multiplicity }} шт
              </div>
              <div
                class="product-card-actions__modal-actions-content-item"
                v-if="item.integration == 1"
              >
                Интеграция с MachineStore
              </div>
            </div>
          </div>
        </div>
      </div>
    </customModal>
  </teleport>
</template>
<script>
import { mapActions } from 'vuex'
import customModal from '@/shared/ui/Modal.vue'
import Counter from '@/shared/ui/Counter.vue'

export default {
  name: 'productOffer',
  data() {
    return {
      loading: false,
      activeActions: 0,
      otherActions: 0,
      modalActions: false,
      modalActiveActions: false,
      modalOtherActions: false,
      modalMultiplicityRemain: false,
      activeActionsData: [],
      otherActionsData: [],
      fetchIds: [],
      seller_info: false,
    }
  },
  components: { customModal, Counter },
  emits: ['updateBasket', 'updateCatalog'],
  props: {
    offer: {
      type: Object,
      default: () => {
        return {}
      },
    },
    offerData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  mounted() {
    this.getActiveActions()
  },
  computed: {},
  methods: {
    ...mapActions({
      basketProductAdd: 'basket/basketProductAdd',
      getBasket: 'basket/getBasket',
      basketClear: 'basket/basketClear',
      basketProductRemove: 'basket/basketProductRemove',
      basketProductUpdate: 'basket/basketProductUpdate',
    }),
    clearBasketProduct(org_id, store_id, key, product) {
      this.loading = true
      const data = {
        org_id: org_id,
        store_id: store_id,
        key: key,
        product: product,
      }
      this.basketProductRemove(data).then((response) => {
        this.$emit('updateBasket')
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
      if (object.value == object.min) {
        this.clearBasketProduct(
          object.item.org_id,
          object.item.store_id,
          object.item.key,
          object.item,
        )
        return
      }
      if (object.value > Number(object.max)) {
        this.modal_remain = true
      } else {
        this.loading = true
        const data = {
          org_id: object.item.org_id,
          store_id: object.item.store_id,
          id_remain: object.id,
          count: object.value,
          key: object.item.key,
          actions: object.item.actions,
        }
        this.basketProductUpdate(data).then((response) => {
          this.loading = false
          if (!response?.data?.data?.success && response?.data?.data?.message) {
            this.$toast.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: response?.data?.data?.message,
              life: 3000,
            })
          }
          this.$emit('updateCatalog')
          this.$emit('updateBasket')
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
                    name: object.item.name, // Название товара
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
    showModal() {
      this.modalActions = true
      if (this.activeActions != 0) {
        this.modalActiveActions = true
        this.modalOtherActions = false
      } else {
        this.modalActiveActions = false
        this.modalOtherActions = true
      }
    },
    addBasket(item) {
      this.loading = true
      if (Number(item?.multiplicity) > 1) {
        if (Number(item?.multiplicity) > Number(item.available)) {
          this.modalMultiplicityRemain = true
          this.loading = false
          return false
        }
      }
      const data = {
        org_id: item.org_id,
        store_id: item.store_id,
        id_remain: item.id,
        count: item.basket.count,
        actions: item.actions,
      }
      this.basketProductAdd(data).then(() => {
        this.loading = false
        this.$emit('updateBasket')
      })

      // Убедитесь, что dataLayer существует
      window.dataLayer = window.dataLayer || []

      // Отправка данных в dataLayer
      window.dataLayer.push({
        ecommerce: {
          currencyCode: 'RUB', // Валюта
          add: {
            products: [
              {
                id: item.id, // ID товара
                name: item.name, // Название товара
                price: item.price, // Цена товара
                category: item.catalog, // Категория товара
                quantity: item.basket.count, // Количество товара
              },
            ],
          },
        },
      })
    },
    getActiveActions() {
      for (var i in this.offer.actions) {
        if (this.offer.actions[i].enabled === 1) {
          this.activeActions++
          this.activeActionsData.push(this.offer.actions[i])
        } else {
          this.otherActions++
          this.otherActionsData.push(this.offer.actions[i])
        }
      }
    },
  },
}
</script>
<style lang="scss">
@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}

.product-card__vertical .products__list {
  display: flex;
  align-items: flex-start;
  justify-content: start;
  gap: 49px;
  margin-bottom: 52px;

}
.product-card__vertical .product-card__price-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.product-card__vertical .product-card__info {
  display: flex;
  flex-direction: column;
  gap: 13px;
}
.product-card__vertical .product-card{
  width: 343px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: none;
  padding: 8px 9px;
}
.product-card__vertical .product-card__content {
    display: flex;
    gap: 0px;
    background-color: #Fff;
    border-radius: 0px;
    padding: 0px;
}
.product-card__vertical .product-card__seller-name {
    font-size: 16px;
    font-weight: 700;
    margin-right: 8px;
}
.product-card__vertical .product-card__seller-button-icon {
    font-size: 10px;
    font-weight: 800;
}
.product-card__vertical .product-card__image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0px;
    overflow: hidden;
    aspect-ratio: 16/9;
    width: 163px;
    height: 163px;
    min-width: 163px;
    min-height: 163px;
    max-height: 163px;
    margin: 0 auto;
}
.product-card__vertical .product-card__price-value-discounted {
    font-size: 24px;
    font-weight: 700;
}
.product-card__vertical .product-card__price {
    margin-right: 16px;
    margin-bottom: 0px;
}
.product-card-vertical__promo-all{
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #282828;
  display: flex;
  gap: 4px;
  align-items: center;
}
.product-card-vertical__promo-all .red-badge{
  background-color: #F92C0D;
  color:#fff;
  font-size: 12px;
  font-weight: 600;
  padding: 1px 5px;
  height: 16px;
  min-width: 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-card-vertical__promo-all .product-card-vertical__seller-button-icon{
  color: #F92C0D;
  font-weight: 500;
  font-size: 12px;
}
.product-card__vertical .product-card__title {
    font-size: 14px;
    font-weight: 500;
}
.product-card__vertical .product-card__article {
    margin-top: 9px;
    font-weight: 500;
    font-size: 12px;
    line-height: 123%;
    color: #757575;
}
.product-card__vertical .product-card__count {
    display: flex;
    align-items: center;
    background-color: transparent;
    border-radius: 0;
    padding: 0px;
    min-width: 100%;
    height: 24px;
}
.product-card__vertical .product-card__count:before,.product-card__vertical .product-card__count:after {
    display: none;
}
.product-card__vertical .product-card .product-card__count {
    align-items: center;
    justify-content: space-between;
}
.product-card__vertical .product-card .product-card__count-value:last-child {
  padding: 4px 13.5px;
  background: #EDEDED;
  border-radius: 36px;
}
.product-card__vertical .product-card .redder {
    text-align: left;
    font-size: 10px;
    line-height: 14px;
}
.product-card__vertical .product-card__stat-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 0px;
    width: 100%;
    padding: 12px 10px;
    background: #F4F4F4;
    border-radius: 8px;
}
.product-card__vertical .product-card__stat-content {
    flex-direction: row;
    gap: 4px
}
.product-card__vertical .product-card__image {
    object-fit: contain;
    width: 100%;
    height: 100%;
    border-radius: 8px;
}
.product-card__vertical .product-card .product-card__basket-button .d-counter,.product-card__vertical .product-card__basket-button:not(.basket-true) form {
    display: flex;
}
.product-card__basket-button{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:32px;
}
.product-card__basket-button .d-counter {

    background-color: #ededed;
    border: none;
    border-radius: 30px;
    overflow: hidden;
    height: 32px;
    max-width: 145px;
}
.product-card__basket-button .d-counter__button-icon {
    color: #757575;
    font-size: 13px;
}
.product-card__basket-button .d-counter__button:first-child{
  border-right: 0.5px solid #75757534;
  height: auto;
}
.product-card__basket-button .d-counter__button:last-child{
  border-left: 0.5px solid #75757534;
  height: auto;
}
.product-card-vertical__buy{
  height: 32px;
  min-width: 164px;
}
.product-card-vertical__buy .d-button__text {
    font-size: 16px;
    font-weight: 500;
}
.product-card__vertical .product-card__info-container {
    margin-bottom: 0;
}
.product-card__seller{
  cursor:pointer;
}
.product-card__vertical .product-card__header{
  position: relative;

}

.product-card__seller--active{
    transition: 0.4s;
    position: absolute;
    background-color: #fff;
    width: calc(100% + 18px);
    top:-8px;
    left: - 9px;
    box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
    border-radius: 10px;
    padding: 8px 9px;
    min-height: 65px;
}
.product-card__seller--active-header{
    display: flex;
    align-items: center;
}
.product-card__seller--active-header .product-card__seller-button{
  color: #F92C0D;
  transition: 0.4s;
  rotate: 180deg;

}

@media (width>1280px) {

}
@media (width <=1536px) {

}
@media (width <=1280px) {

}
@media (width <=1024px) {

}

@media (width <=800px) {

}

@media (width <=600px) {

}
@media (width <=320px) {

}
</style>
