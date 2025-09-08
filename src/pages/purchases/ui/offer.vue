<template>

  <!--Карточка товара -->
  <div class="product-card">
    <div class="product-card__content">
      <!-- Информация о товаре -->
      <div class="product-card__content-left">
        <!-- Шапка -->
        <div class="product-card__header">
          <!-- Продавец -->
          <div class="product-card__seller">
            <img :src="offer.store_image" :alt="offer.org.name" class="product-card__seller-image"
              v-if="offer.store_image" />
            <p class="product-card__seller-name">{{ offer.org.name }}</p>
            <!-- <button class="product-card__seller-button">
              <i class="d-icon-angle-rounded-bottom product-card__seller-button-icon"></i>
            </button>-->
          </div>
        </div>
        <!-- Главная информация -->
        <div class="product-card__info-container">
          <div class="product-card__info">
            <div class="product-card__image-container">
              <img :src="offerData.image" :alt="offerData.pagetitle" class="product-card__image" />
            </div>
            <div class="product-card__info-text">
              <p class="product-card__title">
                {{ offerData.pagetitle }}
              </p>
              <p class="product-card__article">Арт: {{ offerData.article }}</p>
            </div>
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
                за счет {{ offer.payer === '1' ? 'поставщика' : 'покупателя' }}
              </p>
            </div>
          </div>
          <!-- Элемент доп. информации -->
          <div class="product-card__stat">
            <i class="d-icon-cube product-card__stat-icon"></i>
            <div class="product-card__stat-content">
              <p class="product-card__stat-name">{{ offer.store_name }}</p>
              <p class="product-card__stat-description"></p>
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
        <!-- Для узкого экрана -->
        <div class="product-card__count product-card__count-min">
          <p class="product-card__count-value">
            <span class="product-card__count-label">В наличии: </span>
            <span v-if="offer.remains_abstract != offer.available">{{
              offer.remains_abstract
              }}</span>
            <span v-else>{{ offer.available }} шт</span>
          </p>
          <div class="d-divider d-divider--vertical product-card__count-divider" v-if="offer.requirement"></div>
          <div class="product-card__count-value" v-if="offer.requirement">
            <span class="product-card__count-label">Ваша потребность: </span>
            {{ Number(offer.requirement.count) }} шт
            <div v-if="offer.requirement" class="redder">
              <span v-if="Number(offer.requirement.count) > Number(offer.available)">Не хватает
                {{ Number(offer.requirement.count) - Number(offer.available) }} шт.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Информация о цене и количестве -->
      <div class="product-card__content-right">
        <!-- Цена -->
        <div class="product-card__price">
          <p class="product-card__price-value-discounted">
            {{ offer.price.toLocaleString('ru') }} ₽
          </p>
          <p class="product-card__price-value" v-if="offer.price > offer.min_price.price">
            {{ offer.min_price.price.toLocaleString('ru') }}
            <span class="product-card__price-value-suffix">₽</span>
            <span class="product-card__price-label">мин. цена</span>
          </p>
        </div>

        <!-- Купить -->
        <div class="product-card__basket-button"
          :class="{ 'basket-true': offer?.basket?.availability, 'loading-counter': this.fetchIds.indexOf(offer.key) != -1 }">
          <Counter @ElemCount="ElemCount" :min="0" :max="offer.max" :id="offer.remain_id" :store_id="offer.store_id"
            :index="index" :value="offer?.basket?.count" :step="offer?.multiplicity ? offer?.multiplicity : 1"
            :item="offer" />
          <button class="d-button d-button-primary d-button-primary-small d-button--sm-shadow product-card__buy"
            @click="addBasket(offer)">
            <i class="d-icon-cart product-card__buy-icon"></i>
            Купить
          </button>
        </div>

        <!-- Количество -->
        <div class="product-card__count">
          <p class="product-card__count-value">
            <span class="product-card__count-label">В наличии: </span>
            <span v-if="offer.remains_abstract != offer.available">{{
              offer.remains_abstract
              }}</span>
            <span v-else>{{ offer.available }} шт</span>
          </p>
          <div class="d-divider d-divider--vertical product-card__count-divider" v-if="offer.requirement"></div>
          <div class="product-card__count-value" v-if="offer.requirement">
            <span class="product-card__count-label">Ваша потребность: </span>
            {{ Number(offer.requirement.count) }} шт
            <div v-if="offer.requirement" class="redder">
              <span v-if="Number(offer.requirement.count) > Number(offer.available)">Не хватает
                {{ Number(offer.requirement.count) - Number(offer.available) }} шт.</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Нижняя часть карточки с информацией об акциях -->
    <div class="product-card__footer" v-if="offer.actions && offer.actions.length">
      <!-- Список акций -->
      <div class="product-card__promo-list">
        <div class="product-card__promo">
          Активные акции
          <div class="d-badge2 product-card__promo-badge">{{ activeActions }}</div>
        </div>
        <div class="product-card__promo">
          Акции без выполненных условий
          <div class="d-badge2 product-card__promo-badge">{{ otherActions }}</div>
        </div>
        <!--<div class="product-card__promo">
          Возможные акции
          <div class="d-badge2 product-card__promo-badge">20</div>
        </div>-->
      </div>
      <div class="d-divider d-divider--vertical product-card__footer-divider"></div>

      <!-- Кнопка: "Все акции" -->
      <button class="d-button d-button--sm-shadow d-button-tertiary d-button-tertiary-small product-card__promo-all"
        @click.prevent="showModal()">
        Все акции
      </button>
    </div>
  </div>
  <teleport to="body">
    <customModal v-model="this.modalActions" class="product-card-actions__modal">

      <div class="product-card-actions__modal-container">
        <div class="product-card-actions__modal-buttons">
          <button @click.prevent="modalActiveActions = true, modalOtherActions = false" v-if="activeActions > 0"
            :class="modalActiveActions ? 'product-card-actions__modal-button-active' : 'product-card-actions__modal-button'">
            Активные акции <div class="d-badge2 product-card__promo-badge">{{ activeActions }}</div>
          </button>
          <button class="product-card-actions__modal-button"
            @click.prevent="modalOtherActions = true, modalActiveActions = false" v-if="otherActions > 0"
            :class="modalOtherActions ? 'product-card-actions__modal-button-active' : 'product-card-actions__modal-button'">
            Акции без выполненных условий <div class="d-badge2 product-card__promo-badge">{{ otherActions }}</div>
          </button>
        </div>
        <div v-if="modalActiveActions">
          <div class="product-card-actions__modal-actions" v-for="(item, index) in activeActionsData" :key="index">
            <!--<router-link
                :to="{
                  name: 'purchasesAction',
                  params: { action_id:  },
                }"
              >-->
            <div class="product-card-actions__modal-actions-header"><i
                class="product-card-actions__modal-actions-header-icon d-icon-percent-rounded"></i>
              {{ item.type != 3 ? item.name : 'Индивидуальная скидка' }}
            </div>
            <!--</router-link>-->
            <div class="product-card-actions__modal-actions-content">
              <div class="product-card-actions__modal-actions-content-item" v-if="item.delay_type == 2">Под реализацию
              </div>
              <div class="product-card-actions__modal-actions-content-item" v-if="item.delay_type < 2">{{
                item.delay_type == 1 && item.delay > 0 ? Number(item.delay).toFixed(0) + ' дн. отсрочки' : 'Предоплата'
                }}</div>
              <div class="product-card-actions__modal-actions-content-item" v-if="item.percent > 0">{{ item.percent }}%
                Скидка</div>
              <div class="product-card-actions__modal-actions-content-item" v-if="item.delivery_type == 2">Бесплатная
                доставка</div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="product-card-actions__modal-actions" v-for="(item, index) in otherActionsData" :key="index">
            <div class="product-card-actions__modal-actions-header"><i
                class="product-card-actions__modal-actions-header-icon d-icon-percent-rounded"></i>
              {{ item.type != 3 ? item.name : 'Индивидуальная скидка' }}
            </div>
            <div class="product-card-actions__modal-actions-content">
              <div class="product-card-actions__modal-actions-content-item" v-if="item.delay_type == 2">Под реализацию
              </div>
              <div class="product-card-actions__modal-actions-content-item" v-if="item.delay_type < 2">{{
                item.delay_type == 1 && item.delay > 0 ? Number(item.delay).toFixed(0) + ' дн. отсрочки' : 'Предоплата'
                }}</div>
              <div class="product-card-actions__modal-actions-content-item" v-if="item.percent > 0">{{ item.percent }}%
                Скидка</div>
              <div class="product-card-actions__modal-actions-content-item" v-if="item.delivery_type == 2">Бесплатная
                доставка</div>
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
      activeActions: 0,
      otherActions: 0,
      modalActions: false,
      modalActiveActions: false,
      modalOtherActions: false,
      activeActionsData: [],
      otherActionsData: [],
      fetchIds: [],

    }
  },
  components: { customModal, Counter },
  emits: ['updateBasket'],
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
    ElemCount(object) {
      console.log(object)
      if (!this.fetchIds.includes(object.item.key)) {
        this.fetchIds.push(object.item.key)
      }
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
        const index = this.fetchIds.indexOf(object.item.product.key)
        if (index !== -1) {
          this.fetchIds.splice(index, 1) // Удаляем один элемент по индексу
        }
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
          // console.log(response)
          if (!response?.data?.data?.success && response?.data?.data?.message) {
            this.$toast.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: response?.data?.data?.message,
              life: 3000,
            })
          }
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
      const data = {
        org_id: item.org_id,
        store_id: item.store_id,
        id_remain: item.id,
        count: item.basket.count,
        actions: item.actions,
      }
      this.basketProductAdd(data).then(() => {
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
    }
  },
}
</script>
<style lang="scss">
.product-card {
  width: auto;
  padding-bottom: 6px;

  .product-card__basket-button{
    &.basket-true{
      .d-counter{
        display: flex;
      }
      .d-button{
        display: none;
      }
    }
    .d-counter{
      display: none;
    }
    .d-button{
      display: flex;
    }
  }

  .product-card__promo {
    min-width: auto;
  }

  .d-badge2 {
    min-width: auto;
  }

  .product-card__count {
    align-items: start;
  }

  .redder {
    display: block;
    text-align: right;
    font-style: normal;
    font-weight: 600;
    font-size: 9px;
    line-height: 12px;
    color: #f92c0d;
  }
}

.product-card__stat-content--horizontal {
  flex-direction: column;
}

.product-card-actions__modal-button-active {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  gap: 8px;
  background: #282828;
  border-radius: 35px;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #FBFBFB;
  height: 32px;
  border: 1px solid #282828;
}

.product-card-actions__modal .d-badge2 {
  width: 19px;
  max-width: 19px;
  min-width: 19px;
  height: 19px;
  max-height: 19px;
  min-height: 19px;
  border-radius: 19px;
  font-weight: 500;
  font-size: 12px;
  line-height: 123%;
  text-align: center;
  padding: 0 0 0 0;
}

.product-card-actions__modal-button-active .d-badge2 {
  background-color: #ededed;
  color: #282828;
}

.product-card-actions__modal-buttons {
  display: flex;
  justify-content: start;
  gap: 16px;
  margin-top: -24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #75757575;
}

.product-card-actions__modal-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  gap: 8px;
  background: #EDEDED;
  border-radius: 35px;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #282828;
  height: 32px;
  border: 1px solid #282828;
}

.product-card-actions__modal-button .d-badge2 {
  color: #ededed;
  background-color: #282828;
}

.product-card-actions__modal-actions {
  position: relative;
  width: calc(50% - 10px);
  height: auto;
  background: #EDEDED;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
  border-radius: 8px;
  margin-top: 21px;
  margin-bottom: 20px;
  padding: 0 11px 8px 0;
  position: relative;
  float: left;
}

.product-card-actions__modal-actions:nth-child(odd) {
  margin-right: 20px;
}

.product-card-actions__modal-actions-header {
  background: #FBFBFB;
  border-radius: 7px 0px 7px 0px;
  padding: 4px 9px;
  width: max-content;
  max-width: 80%;
  position: relative;
  font-weight: 500;
  font-size: 12px;
  line-height: 123%;
  color: #282828;
  display: flex;
  gap: 8px;
  align-items: center;
}

.product-card-actions__modal-actions-header:before {
  content: "";
  background-color: #FBFBFB;
  width: 10px;
  height: 10px;
  display: block;
  position: absolute;
  margin-top: 0px;
  margin-left: 0px;
  top: 0px;
  right: -10px;
}

.product-card-actions__modal-actions-header:after {
  content: "";
  background-color: #ededed;
  width: 10px;
  height: 10px;
  display: block;
  position: absolute;
  margin-top: 0px;
  margin-left: 0px;
  top: 0px;
  right: -10px;
  border-radius: 10px 0 0 0;
}

.product-card-actions__modal-actions-content {
  position: relative;
  padding: 8px 11px;
}

.product-card-actions__modal-actions-content:before {
  content: "";
  background-color: #FBFBFB;
  width: 10px;
  height: 10px;
  display: block;
  position: absolute;
  margin-top: 0px;
  margin-left: 0px;
  top: 0px;
  left: 0px;
}

.product-card-actions__modal-actions-content:after {
  content: "";
  background-color: #ededed;
  width: 10px;
  height: 10px;
  display: block;
  position: absolute;
  margin-top: 0px;
  margin-left: 0px;
  top: 0px;
  left: 0px;
  border-radius: 10px 0 0 0;
}

.product-card-actions__modal-actions-content-item {
  padding: 4px 10px;
  color: #282828;
  font-weight: 500;
  font-size: 12px;
  line-height: 123%;
  background: rgba(255, 255, 255, 0.55);
  border: 0.5px solid #757575;
  border-radius: 24px;
  width: max-content;
  margin-right: 8px;
  margin-bottom: 8px;
  float: left;
}

.product-card-actions__modal-actions-header-icon {
  width: 16px;
  height: 16px;
  font-size: 16px;
}

.product-card-actions__modal .modal-content {
  max-width: 890px;
}
.product-card__basket-button.basket-true{
  display:flex;
  justify-content: end;
  margin: 16px 20px 28px 0;
  width:100%;
}
.product-card__basket-button.basket-true .d-counter{
  background: #EDEDED;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
  border-radius: 35px;
  border: none;
}

@media (width>1280px){
    .product-card__basket-button.basket-true .d-counter, .product-card__buy{
      height: 32px;
      width: 167px;
      max-width: 167px;
    }
    .product-card__content-left{
      max-width: 380px;
    }
    .product-card__basket-button.basket-true .d-counter__button{
      width:39.5px;
      padding-inline: 13px;
      position:relative;
    }
    .product-card__basket-button.basket-true .d-counter__button-icon {
        color: #757575;
        font-size: 13px;
    }
    .product-card__basket-button.basket-true .d-counter__button:first-child:after{
      content:'';
      background-color: rgb(117 117 117 / 30%);
      width: 0.5px;
      height:13px;
      position:absolute;
      right:0;
      top:50%;
      transform: translate(-50%, -50%);
    }
    .product-card__basket-button.basket-true .d-counter__button:last-child:before{
      content:'';
      background-color: rgb(117 117 117 / 30%);
      width: 0.5px;
      height:13px;
      position:absolute;
      left:0;
      top:50%;
      transform: translate(-50%, -50%);
    }
}
@media (width <=1536px) {
  .product-card__price-value-discounted{
    font-size: 30px;
  }
}
@media (width <=1280px) {

    .product-card__basket-button.basket-true .d-counter, .product-card__buy{
      height: 24px;
      width: 103px;
      max-width: 103px;
    }
    .product-card__buy{
      min-height: 24px;
      font-size:10px;
    }
    .product-card__buy-icon {
        font-size: 13px;
    }
    .product-card__price-value-discounted {
        font-size: 24px;
    }
    .product-card__content-left{
      max-width: auto;
    }
    .product-card__basket-button.basket-true .d-counter__button{
      width:25.5px;
      padding-inline: 8px;
      position:relative;
    }
    .product-card__basket-button.basket-true .d-counter__button-icon {
        color: #757575;
        font-size: 8px;
    }
    .product-card__basket-button.basket-true .d-counter__button:first-child:after{
      content:'';
      background-color: rgb(117 117 117 / 30%);
      width: 0.5px;
      height:8px;
      position:absolute;
      right:0;
      top:50%;
      transform: translate(-50%, -50%);
    }
    .product-card__basket-button.basket-true .d-counter__button:last-child:before{
      content:'';
      background-color: rgb(117 117 117 / 30%);
      width: 0.5px;
      height:8px;
      position:absolute;
      left:0;
      top:50%;
      transform: translate(-50%, -50%);
    }
    .product-card__basket-button.basket-true .d-counter__input {
      font-size: 10px;
    }

}
@media (width <=1024px) {
  .product-card-actions__modal .modal-content {
    max-width: 80%;
  }
  .product-card__basket-button.basket-true .d-counter, .product-card__buy{
      height: 24px;
      width: 117px;
      max-width: 117px;
  }
  .product-card__price-value-discounted {
      font-size: 20px;
  }
  .product-card__basket-button.basket-true{
    margin: 16px 0px 28px 0;
  }
}

@media (width <=800px) {
  .product-card-actions__modal-button-active {
    font-size: 10px;
    height: 24px;
  }

  .product-card-actions__modal .d-badge2 {
    width: 14px;
    max-width: 14px;
    min-width: 14px;
    height: 14px;
    max-height: 14px;
    min-height: 14px;
    border-radius: 14px;
    font-size: 10px;
  }

  .product-card-actions__modal-button {
    font-size: 10px;
    height: 24px;
  }

  .product-card-actions__modal-actions {
    position: relative;
    width: 100%;
    height: auto;
    margin-bottom: 0px;
  }

  .product-card-actions__modal-actions:nth-child(odd) {
    margin-right: 0px;
  }

  .product-card-actions__modal-actions-header {
    font-size: 10px;
  }

  .product-card-actions__modal-actions-content-item {
    font-size: 9px;
  }

  .product-card-actions__modal-actions-header-icon {
    width: 10px;
    height: 10px;
    font-size: 10px;
  }


}

@media (width <=600px) {
  .product-card-actions__modal-button-active {
    font-size: 14px;
    height: 32px;
    width: calc(100% - 88px);
  }

  .product-card-actions__modal .d-badge2 {
    width: 19px;
    max-width: 19px;
    min-width: 19px;
    height: 19px;
    max-height: 19px;
    min-height: 19px;
    border-radius: 19px;
    font-size: 12px;
  }
  .product-card-actions__modal-buttons{
    margin-top:8px;
  }
  .product-card-actions__modal-button{
    font-size: 14px;
    height: 32px;
    width: calc(100% - 88px);
  }

  .product-card-actions__modal-actions {
    position: relative;
    width: 100%;
    height: auto;
    margin-bottom: 0px;
  }

  .product-card-actions__modal-actions:nth-child(odd) {
    margin-right: 0px;
  }
  .product-card-actions__modal-actions{
    margin-right: 0px;
    border-top: 0.5px solid #282828;
    border-bottom: 0.5px solid #282828;
    border-radius: 7px 0 0 0;
    background: transparent;
    box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
    backdrop-filter: blur(13.4px);
  }
  .product-card-actions__modal-actions-header:before,.product-card-actions__modal-actions-content:before {
    background-color: #282828;
  }
  .product-card-actions__modal-actions-header:after,.product-card-actions__modal-actions-content:after {
    background-color: #fff;
  }
  .product-card-actions__modal-actions-header{
    min-width: 262px;
    background-color: #282828;
    color: #FBFBFB;
    padding: 2px 44px
  }
  .product-card-actions__modal-actions-header{
    font-size: 12px;
  }
  .product-card-actions__modal-actions-content{
    padding: 13px 44px 16px;
  }

  .product-card-actions__modal-actions-content-item {
    font-size: 12px;
    background: #EDEDED;
    border: none;
  }

  .product-card-actions__modal-actions-header-icon {
    width: 16px;
    height: 16px;
    font-size: 16px;
  }

  .product-card-actions__modal .modal-content {
    max-width: 100%;
  }
  .product-card-actions__modal-buttons{
    flex-direction:column;
    justify-content: center;
    align-items: center;
    gap:16px;
  }
  .product-card-actions__modal .modal-content{
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .product-card-actions__modal .modal__title:before{
    content:'Акции';
    padding-left:44px;
  }
  .product-card-actions__modal-buttons{
    flex-direction:column;
    justify-content: center;
    align-items: center;
    gap:16px;
  }
  .product-card-actions__modal .modal-content{
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .product-card-actions__modal .modal__title:before{
    content:'Акции';
    padding-left:44px;
  }
  .product-card__basket-button.basket-true {
    margin: 16px 0px 0px 0;
  }
  .product-card__basket-button.basket-true .d-counter, .product-card__buy{
      height: 32px;
      width: 100px;
      max-width: 100px;
  }
  .product-card__price-value-discounted {
      font-size: 24px;
  }
  .product-card__stat-content--horizontal,.product-card__stat-content {
    flex-direction: column !important;
  }
}
@media (width <=320px) {
.products__header {
    gap: 16px;
    width: calc(28px + 100% + 28px);
    margin-left: -28px;
    padding-left: 28px;
    padding-right: 28px;
  }
  .products__stat {
    gap: 8px;
  }
  .products__header-right .d-divider--vertical {
    margin-inline: 8px;
  }
  .product-card__stat-list {
    width:100%;
    padding-right: 28px;
  }
  .product-card__stat-content--horizontal,.product-card__stat-content {
    flex-direction: row !important;
  }
  .product-card__content-right {
    margin-top: 0px;
    padding-right: 28px
  }
  .product-card__price{
    align-self: start;
    padding-left:28px;
  }
  .product-card__basket-button{
    margin-top: -36px !important;
  }
  .product-card__content, .product-card__stat-list {
    gap: 8px;
  }
  .product-card__buy {
    font-size: 1px;
    color:transparent;
    width:32px !important;
    max-width: 32px;
    min-width: 32px;
    aspect-ratio: 1;
    padding:6px;
  }
  .product-card__buy-icon {
    display:flex;
    font-size: 20px;
    color:#FBFBFB;
    position: absolute;

  }
  .product-card__buy:hover .product-card__buy-icon {
    color:#f92c0d;
  }
  .product-card__buy:hover{
    color:transparent;
  }
}
</style>
