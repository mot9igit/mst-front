<template>
      <h3>Примененные акции</h3>
      <!--Шапка модального окна акций -->
      <div class="product-card-actions__modal-all-header">
        <div class="product-card-actions__modal-all-header-product-info">
          <!-- Изображение товара -->
          <div class="product-card__image-container">
            <img :src="product.image" :alt="product.pagetitle" class="product-card__image" />
          </div>

          <div class="product-card__info-text-container">
            <!-- Название и артикул товара -->
            <div class="product-card__info-text">
              <p class="product-card__title">
                {{ product.pagetitle }}
              </p>
              <p class="product-card__article">Арт: {{ product.article }}</p>
            </div>
            <!-- Продавец -->
            <div class="product-card__seller-cont">
              <div class="product-card__seller">
                <img
                  :src="orderInfo.seller_img"
                  class="product-card__seller-image"
                />
                <p class="product-card__seller-name">{{ orderInfo.seller_name }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Дополнительная информация -->
         <div class="product-card__stat-list-cont">
          <div class="product-card__stat-list">
                <!-- Элемент доп. информации -->
                <div class="product-card__stat">
                  <i class="d-icon-location product-card__stat-icon"></i>
                  <div class="product-card__stat-content">
                    <p class="product-card__stat-name">
                      Доставка: {{ orderInfo.delivery }} дн.
                    </p>
                  </div>
                </div>
                <!-- Элемент доп. информации -->
                <div class="product-card__stat">
                  <i class="d-icon-truck product-card__stat-icon"></i>
                  <div class="product-card__stat-content">
                    <p class="product-card__stat-name">Доставка</p>
                    <p class="product-card__stat-description">
                      за счет {{ orderInfo.payer == 1 ? 'поставщика' : 'покупателя' }}
                    </p>
                  </div>
                </div>

                <!-- Элемент доп. информации -->
                <div class="product-card__stat">
                  <i class="d-icon-wallet product-card__stat-icon"></i>
                  <div class="product-card__stat-content product-card__stat-content--horizontal">
                    <p class="product-card__stat-name">
                      {{ orderInfo.delay_type == 2 ? 'Под реал.' : 'Отсрочка' }}
                    </p>
                    <p class="product-card__stat-description" v-if="orderInfo.delay > 0">
                       {{ orderInfo.delay }} дней
                    </p>
                    <p class="product-card__stat-description" v-else>Предоплата</p>
                  </div>
                </div>


          </div>
        </div>

        <div class="product-card__price-container-all">
          <!-- Блок с ценой и акциями -->
            <div class="product-card__price-container">

              <!-- Цена товара -->
              <div class="product-card__price">
                <p class="product-card__price-value-discounted">
                  {{ product.price.toLocaleString('ru') }} ₽
                </p>
              </div>


            </div>
            <p class="product-card__p">{{ product.rrc_discount != "Без скидки от РРЦ" ? product.rrc_discount + " скидка от РРЦ" : product.rrc_discount}}</p>
            <!-- Количество -->
            <div class="product-card__count">
              <div class="product-card__count-value">

                <span>{{
                  product.count
                }} шт. в заказе</span>
              </div>
            </div>
        </div>
      </div>

      <!-- Фильтры
        <div class="product-card__info-filters">
          <button
            class='product-card-actions__modal-button-active'
          >
            Активные акции
            <div class="d-badge2 product-card__promo-badge">{{ colActiveActions }}</div>
          </button>
          <button
            class='product-card-actions__modal-button-active'
          >
            Акции без выполненных условий
            <div class="d-badge2 product-card__promo-badge">{{ colNoTriggerActions }}</div>
          </button>
          <button
            class='product-card-actions__modal-button'
          >
            Возможные акции
            <div class="d-badge2 product-card__promo-badge">{{ colNoActiveActions }}</div>
          </button>
        </div>-->

      <!-- Список акций -->
      <div class="product-card-actions__modal-all-content">

        <div class="product-card-actions__modal-all-item"
            v-for="(item, index) in actions"
            :key="index">
            <!-- Баннер -->
            <div class="product-card-actions__modal-all-item-image"><img :src="item.image.image"></div>

            <!--Акция включена, Акция выключена, Акция несовместима, Условия акции не выполнены -->
            <div class="product-card-actions__modal-all-item-action">
              <p class="product-card-actions__modal-all-item-action-label">
                <span>Акция применена:</span>
              </p>
              <div class="product-card-actions__modal-all-item-action-button">
                <div>
                <!--галочка-->
                  <i class="d-icon-check product-card__actions-icon-auto"></i>

                </div>

                <p>
                  {{ item.name }}
                </p>
              </div>

            </div>

            <!-- Описание -->
            <div class="product-card-actions__modal-all-item-descr">
              <p class="product-card-actions__modal-all-item-action-label">Описание:</p>
              <div v-html="item.description"></div>
            </div>

            <!-- Дополнительная информация -->
            <div class="product-card__stat-list-cont">
              <div class="product-card__stat-list">
                <div  v-if="item.percent > 0">
                  <i class="d-icon-percent-rounded product-card__buy-icon"></i>Скидка {{ item.percent }}%
                </div>
                <div
                  v-if="item.delivery_type == 2"
                >
                  <i class="d-icon-truck product-card__buy-icon"></i>Бесплатная доставка
                </div>
                <div
                  v-if="item.condition_min_sum > 0"
                >
                  <span class="product-card__icon-summ product-card__buy-icon">₽</span>
                  Мин. сумма - {{ parseInt(item.condition_min_sum) }} ₽
                </div>
                <div

                  v-if="item.condition_SKU > 0"
                >
                  <i class="d-icon-box-flat product-card__buy-icon"></i>Мин. кол-во SKU - {{ item.condition_SKU }} шт
                </div>
                <div

                  v-if="item.condition_min_count > 0"
                >
                  <i class="d-icon-box-flat product-card__buy-icon"></i>Мин. общее кол-во - {{ item.condition_min_count }} шт
                </div>
                <div
                  v-if="item.min_count > 1"
                >
                  <i class="d-icon-box-flat product-card__buy-icon"></i>Мин. кол-во - {{ item.min_count }} шт
                </div>
                <div

                  v-if="item.multiplicity > 1"
                >
                  <i class="d-icon-box-flat product-card__buy-icon"></i>Кратность - {{ item.multiplicity }} шт
                </div>
                <div

                  v-if="item.integration == 1"
                >
                  <i class="d-icon-shuffle product-card__buy-icon"></i>Интеграция с MachineStore
                </div>
              </div>
            </div>


            <!-- Кнопка подробнее -->
            <div class="product-card-actions__modal-all-item-href">
              <router-link
                target="_blank"
                :to="{
                  name: 'purchasesAction',
                  params: { action_id: item.action_id },
                }"
              >
              <button  class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small">
                  Подробнее
              </button>
              </router-link>
            </div>
        </div>

      </div>



</template>

<script>

export default {
  name: 'activeSalesWindow',
  data() {
    return {
      actions: []
    }
  },
  components: {  },
  emits: [],
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },
    orderInfo: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  mounted() {
    if(this.product.actions.length){
      for(var i in this.product.actions){
        if(this.product.actions[i].enabled == 1){
          this.actions.push(this.product.actions[i])
        }
      }
    }
  },
  computed: {},
  methods: {

  },
  watch: {
    product: function(newVal){
      if(newVal.actions.length){
        for(var i in newVal.actions){
          if(newVal.actions[i].enabled == 1){
            this.actions.push(newVal.actions[i])
          }
        }
      }else{
        this.actions = []
      }
    }
  }
}
</script>

<style lang="scss">

</style>
