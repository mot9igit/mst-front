<template>
  <!-- Карточка товара -->
  <div class="product-card">
    <div class="product-card__content">
      <!-- Информация о товаре -->
      <div class="product-card__content-left">
        <!-- Шапка -->
        <div class="product-card__header">
          <!-- Продавец -->
          <div class="product-card__seller">
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
        <button
          class="d-button d-button-primary d-button-primary-small d-button--sm-shadow product-card__buy"
          @click="addBasket(offer)"
        >
          <i class="d-icon-cart product-card__buy-icon"></i>
          Купить
        </button>

        <!-- Количество -->
        <div class="product-card__count">
          <p class="product-card__count-value">
            <span class="product-card__count-label">В наличии:</span>
            <span v-if="offer.remains_abstract != offer.available">{{
              offer.remains_abstract
            }}</span>
            <span v-else>{{ offer.available }} шт</span>
          </p>
          <div class="d-divider d-divider--vertical product-card__count-divider"></div>
          <p class="product-card__count-value">
            <span class="product-card__count-label">Ваша потребность:</span>
            -4 шт
          </p>
        </div>
      </div>
    </div>

    <!-- Нижняя часть карточки с информацией об акциях -->
    <div class="product-card__footer">
      <!-- Список акций -->
      <div class="product-card__promo-list">
        <div class="product-card__promo">
          Активные акции
          <div class="d-badge2 product-card__promo-badge">4</div>
        </div>
        <div class="product-card__promo">
          Акции без выполненных условий
          <div class="d-badge2 product-card__promo-badge">6</div>
        </div>
        <div class="product-card__promo">
          Возможные акции
          <div class="d-badge2 product-card__promo-badge">20</div>
        </div>
      </div>
      <div class="d-divider d-divider--vertical product-card__footer-divider"></div>

      <!-- Кнопка: "Все акции" -->
      <button
        class="d-button d-button--sm-shadow d-button-tertiary d-button-tertiary-small product-card__promo-all"
      >
        Все акции
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'productOffer',
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
  computed: {},
  methods: {
    ...mapActions({
      basketProductAdd: 'basket/basketProductAdd',
    }),
    addBasket(item) {
      console.log(item)
      const data = {
        org_id: item.org_id,
        store_id: item.store_id,
        id_remain: item.id,
        count: item.basket.count,
        actions: item.actions,
      }
      this.basketProductAdd(data).then(() => {})

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
      this.$emit('updateBasket')
    },
  },
}
</script>
<style lang="scss">
.product-card {
  width: auto;
  .product-card__promo {
    min-width: auto;
  }
  .d-badge2 {
    min-width: auto;
  }
}
.product-card__stat-content--horizontal {
  flex-direction: column;
}
</style>
