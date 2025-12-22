<template>
  <!--Карточка товара -->
  <div
    class="product-card"
    :class="{ 'product-card-noactive': offer.available == 0 }"
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
              {{ offer.org_fullname }} ИНН {{ offer.org_inn ? offer.org_inn : '-' }}
            </p>
          </div>
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
              <!-- Цена товара -->
              <div class="product-card__price">
                <p class="product-card__price-value-discounted" v-if="pricePrefix == true || (Object.keys(modalActionsData).length == 1 && allOff == true)">
                  от {{ offer.min_price.price.toLocaleString('ru') }} ₽
                </p>
                <p class="product-card__price-value-discounted" v-else>
                  {{ offer.price.toLocaleString('ru') }} ₽
                </p>

              </div>
              <!-- Кнопка: "Все акции" -->
                <button
                  v-if="Object.keys(offer.actions).length > 0 && offer.available > 0"
                  class="product-card-vertical__promo-all"
                  @click.prevent="modalActions = true"
                >
                  Все акции <span class="red-badge">{{ Object.keys(offer.actions).length }}</span>
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
              <div class="product-card__count-value product-card__count-value-require" v-if="offer.requirement">
                <span class="product-card__count-label">Ваша потребность: </span>
                -{{ Number(offer.requirement.count) }} шт

              </div>
            </div>
            <!-- Дополнительная информация -->
            <div class="product-card__stat-cont">
              <div class="product-card__stat-list">
                <!-- Элемент доп. информации -->
                <div class="product-card__stat">
                  <i class="d-icon-location product-card__stat-icon"></i>
                  <div class="product-card__stat-content" v-if="offer.available > 0">
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
                  <div v-else><p class="product-card__stat-description">-</p></div>
                </div>
                <!-- Элемент доп. информации -->
                <div class="product-card__stat">
                  <i class="d-icon-truck product-card__stat-icon"></i>
                  <div class="product-card__stat-content" v-if="!deliveryPrefix">
                    <p class="product-card__stat-name">Доставка</p>
                    <p class="product-card__stat-description" >
                      за счет {{ offer.payer == 1 ? 'поставщика' : 'покупателя' }}
                    </p>
                  </div>
                  <div class="product-card__stat-content" v-else>
                    <p class="product-card__stat-name">Возможно: доставка</p>
                    <p class="product-card__stat-description" >
                      за счет поставщика
                    </p>
                  </div>
                </div>

                <!-- Элемент доп. информации -->
                <div class="product-card__stat">
                  <i class="d-icon-wallet product-card__stat-icon"></i>
                  <div class="product-card__stat-content product-card__stat-content--horizontal" v-if="delayPrefix == ''">
                    <p class="product-card__stat-name">
                      {{ offer.delay_type == 2 ? 'Под реал.' : 'Отсрочка' }}
                    </p>
                    <p class="product-card__stat-description" v-if="offer.delay">
                      платежа {{ offer.delay }} дней
                    </p>
                    <p class="product-card__stat-description" v-else>Предоплата</p>
                  </div>
                  <div class="product-card__stat-content product-card__stat-content--horizontal" v-else>
                    <p class="product-card__stat-name">
                      Возможно: {{ delayPrefix }}
                    </p>
                    <p class="product-card__stat-description">
                      {{ delayDays }} дней
                    </p>
                  </div>
                </div>

              </div>
            </div>
            <!-- Купить -->
             <!-- Если нет в наличии -->
             <div class="product-card__price__noavailable" v-if="offer.available == 0">
                <p class="product-card__price-value-discounted product-card__noavailable">
                  Нет в наличии
                </p>
              </div>
              <div
                class="product-card__basket-button"
                v-else
                :class="{
                  'loading-counter': this.loading,
                }"
              >
                <Counter
                  @ElemCount="ElemCount"
                  :min="Object.keys(modalActionsData).length > 0 ? Number(modalActionsData[0].min_count) : 1"
                  :max="Number(offer.max)"
                  :id="Number(offer.remain_id)"
                  :store_id="Number(offer.store_id)"
                  :index="Number(offer.remain_id)"
                  :value="count"
                  :step="Object.keys(modalActionsData).length == 1 && allOff == false && Number(modalActionsData[0].multiplicity) > 1 ? Number(modalActionsData[0].multiplicity) : 1"
                  :item="offer"
                  :key="new Date().getTime() + '_' + Number(offer.remain_id)"
                />
                <button
                  @click.prevent="addBasket(offer, count)"
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
    <customModal v-model="this.modalActions" class="product-card-actions__modal-all">
      <h3>Все акции</h3>
      <!--Шапка модального окна акций -->
      <div class="product-card-actions__modal-all-header">
        <div class="product-card-actions__modal-all-header-product-info">
          <!-- Изображение товара -->
          <div class="product-card__image-container">
            <img :src="offerData.image" :alt="offerData.pagetitle" class="product-card__image" />
          </div>

          <div class="product-card__info-text-container">
            <!-- Название и артикул товара -->
            <div class="product-card__info-text">
              <p class="product-card__title">
                {{ offerData.pagetitle }}
              </p>
              <p class="product-card__article">Арт: {{ offerData.article }}</p>
            </div>
            <!-- Продавец -->
            <div class="product-card__seller-cont">
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
                  {{ offer.org_fullname }} ИНН {{ offer.org_inn ? offer.org_inn : '-' }}
                </p>
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
                      за счет {{ !allOff && activeConflict?.payer == 1 ? 'поставщика' : 'покупателя' }}
                    </p>
                  </div>
                </div>

                <!-- Элемент доп. информации -->
                <div class="product-card__stat">
                  <i class="d-icon-wallet product-card__stat-icon"></i>
                  <div class="product-card__stat-content product-card__stat-content--horizontal">
                    <p class="product-card__stat-name">
                      {{ !allOff && activeConflict?.delay_type == 2 ? 'Под реал.' : 'Отсрочка' }}
                    </p>
                    <p class="product-card__stat-description" v-if="!allOff && activeConflict.delay > 0">
                       {{ activeConflict.delay }} дней
                    </p>
                    <p class="product-card__stat-description" v-else>Предоплата</p>
                  </div>
                </div>


          </div>
        </div>

        <div class="product-card__price-container-all">
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
                  {{ allOff == true ? offer.prices.rrc : activeConflict.price.toLocaleString('ru') }} ₽
                </p>
              </div>


            </div>
            <p class="product-card__p">Цена с учетом примененных акций</p>
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
              <div class="product-card__count-value product-card__count-value-require" v-if="offer.requirement">
                <span class="product-card__count-label">Ваша потребность: </span>
                {{ Number(offer.requirement.count) }} шт

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
                  :min="allOff == false ? Number(activeConflict.min_count) > 0 ? Number(activeConflict.min_count) : 1 : 1"
                  :max="Number(offer.max)"
                  :id="Number(offer.remain_id)"
                  :store_id="Number(offer.store_id)"
                  :index="Number(offer.remain_id)"
                  :value="count"
                  :step="allOff == false ? Number(activeConflict?.multiplicity)>1 ? Number(activeConflict?.multiplicity) : 1 : 1"
                  :item="offer"
                  :key="new Date().getTime() + '_' + Number(offer.remain_id)"
                />
                <button
                  class="d-button d-button-primary d-button-primary-small d-button--sm-shadow product-card-vertical__buy"
                  :class="{ 'd-button--loading': this.loading }"
                  @click.prevent="addBasketAllSales(offer, count)"
                >
                  <div class="d-button__text">
                    <i class="d-icon-cart product-card__buy-icon"></i>
                    В корзину
                  </div>
                </button>
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
      <div class="product-card-actions__modal-all-content" v-if="this.activeConflict">

        <div class="product-card-actions__modal-all-item"
            v-for="(item, index) in offer.actions"
            :key="index">
            <!-- Баннер -->
            <div class="product-card-actions__modal-all-item-image"><img :src="item.image.image"></div>

            <!--Акция включена, Акция выключена, Акция несовместима, Условия акции не выполнены -->
            <div class="product-card-actions__modal-all-item-action">
              <p class="product-card-actions__modal-all-item-action-label">
                <span v-if="(item.is_trigger == 1 && item.enabled == 0 && !Object.keys(this.mainActionsData).includes(item.action_id)) || (!this.activeConflict?.actions_ids?.includes(item.action_id) && !Object.keys(this.mainActionsData).includes(item.action_id))">Условия акции не выполнены:</span>
                <span v-else-if="(this.activeConflict?.actions_ids?.includes(item.action_id) && item.is_trigger == 0 && !Object.keys(this.mainActionsData).includes(item.action_id)) || (this.activeConflict?.actions_ids?.includes(item.action_id) && item.is_trigger == 1 && item.enabled == 1 && !Object.keys(this.mainActionsData).includes(item.action_id))">Применена автоматически:</span>
                <span v-else-if="this.mainActionsData[item.action_id] == true">Акция включена:</span>
                <span v-else-if="this.mainActionsData[item.action_id] == false && !allOff">Акция несовместима:</span>
                <span v-else-if="this.mainActionsData[item.action_id] == false && allOff">Акция выключена:</span>
              </p>
              <div class="product-card-actions__modal-all-item-action-button">
                <div>
                  <!--несовместима-->
                  <i class="d-icon-info product-card__actions-icon-info" v-if="this.mainActionsData[item.action_id] == false && !allOff"></i>
                  <div class="d-switch"
                  @click.prevent="checkAction(Number(item.action_id))"
                  v-if="this.offer.main_actions.includes(Number(item.action_id))">
                    <input
                      type="checkbox"
                      :name="Number(item.action_id)"
                      :id="Number(item.action_id)"
                      binary="true"
                      class="d-switch__input"
                      v-model="mainActionsData[Number(item.action_id)]"
                    />
                    <div class="d-switch__circle"></div>
                  </div>
                  <!--крест-->
                  <i class="d-icon-times product-card__actions-icon-cross"  v-else-if="!this.activeConflict?.actions_ids?.includes(item.action_id) && !this.offer.main_actions.includes(Number(item.action_id))"></i>
                  <!--галочка-->
                  <i class="d-icon-check product-card__actions-icon-auto" v-else-if="this.activeConflict?.actions_ids?.includes(item.action_id) && ((item.is_trigger == 1 && item.enabled == 1) || (item.is_trigger == 0))"></i>

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
                  <i class="d-icon-percent-rounded product-card__buy-icon"></i>Скидка {{ item.percent_num }}%
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
    </customModal>
  </teleport>
</template>
<script>
import { mapActions } from 'vuex'
import customModal from '@/shared/ui/Modal.vue'
import Counter from '@/shared/ui/CounterNoAdd.vue'

export default {
  name: 'productOfferOffer',
  data() {
    return {
      loading: false,
      modalActions: false,
      modalActiveActions: false,
      seller_info: false,
      modalMultiplicityRemain: false,
      modalActionsData: {},
      mainActionsData: {},
      allOff: false,
      pricePrefix: false,
      deliveryPrefix: false,
      delayPrefix: '',
      delayDays: 0,
      count: 1,
      activeConflict: {},
      colActiveActions: 0,
      colNoActiveActions: 0,
      colNoTriggerActions: 0,
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
        if(Object.keys(this.offer).length){
      this.modalActionsData = this.offer.conflicts
      if(this.modalActionsData){
        this.count = Number(this.modalActionsData[0].min_count) > 0 ? Number(this.modalActionsData[0].min_count) : 1

      }

      if(this.modalActionsData && Object.keys(this.modalActionsData).length == 1){
        this.count = Number(this.modalActionsData[0].multiplicity)
      }
      if(this.modalActionsData && Object.keys(this.modalActionsData).length > 1){
        let col = Object.keys(this.modalActionsData).length
        let payer = false
        let active = Object.keys(this.offer.actions).length
        let real = 0;
        let delay = 0;
        for(var i in this.modalActionsData){
          if((this.modalActionsData[i].active == true ) || this.modalActionsData[i].price == this.offer.prices.rrc){
            col--
          }
          let actions = this.modalActionsData[i].actions
          for(var ii in actions){
            if(actions[ii].payer == 1){
              payer = true
            }
            if(actions[ii].delay_type == 2){
              if(Number(actions[ii].delay)>real){
                real = Number(actions[ii].delay)
              }
            }
            if(actions[ii].delay_type == 1){
              if(Number(actions[ii].delay)>delay){
                delay = Number(actions[ii].delay)
              }
            }
          }

        }
        if(col > 0){
          this.pricePrefix = true
        }
        if(payer == true){
          this.deliveryPrefix = true
        }
        if(real > 0 || delay > 0){
          if(real > 0){
            this.delayPrefix = 'под реализацию'
            this.delayDays = real
          }else{
            this.delayPrefix = 'отсрочка'
            this.delayDays = delay
          }
        }
      }
    }
    if(Object.keys(this.offer).length){
      for(var ic in this.offer.conflicts){
        if(this.offer.conflicts[ic].active){
          this.activeConflict = this.offer.conflicts[ic]
        }
      }
      if(this.activeConflict.actions_ids){
        let item = JSON.parse(JSON.stringify(this.activeConflict.actions_ids))
        for(var iitem in item){
          item[iitem] = Number(item[iitem])
        }
        for(var ima in this.offer.main_actions){
          if(item.includes(Number(this.offer.main_actions[ima]))){
            this.mainActionsData[this.offer.main_actions[ima]] = true
          }else{
            this.mainActionsData[this.offer.main_actions[ima]] = false
          }
        }
      }
    }
  },
  computed: {},
  methods: {
    ...mapActions({
      basketOfferProductAdd: 'offer/basketOfferProductAdd',
      getOfferBasket: 'offer/getOfferBasket',
      basketOfferClear: 'offer/basketOfferClear',
      basketOfferProductRemove: 'offer/basketOfferProductRemove',
      basketOfferProductUpdate: 'offer/basketOfferProductUpdate',
    }),

    ElemCount(object) {
      if (object.value == object.min) {
        this.count = object.value
         return
       }
      if (object.value > Number(object.max)) {
         this.modal_remain = true
       } else {
        this.count = object.value
       }
       if (object.value < object.min) {
        this.count = Number(this.activeConflict.multiplicity) > 1 ? Number(this.activeConflict.multiplicity) : 1
         return
       }
    },

    addBasket(item, count) {
            if(this.modalActionsData && (Object.keys(this.modalActionsData).length > 1 || (Object.keys(this.modalActionsData).length == 1 && this.allOff))){
        this.modalActions = true
      }else{
        this.loading = true
        let conf = {}
        if(!this.allOff){
          conf = this.activeConflict?.actions
        }
        const data = {
          org_id: item.org_id,
          store_id: item.store_id,
          id_remain: item.id,
          count: count,
          key: item.key,
          actions: conf,
        }
        this.basketOfferProductAdd(data).then((response) => {
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
        this.count = Object.keys(this.modalActionsData).length > 0 ? this.modalActionsData[0].min_count > 0 ? this.modalActionsData[0].min_count : 1 : 1
      }
    },
    addBasketAllSales(item, count) {
        this.loading = true
        let conf = {}
        if(!this.allOff){
          conf = this.activeConflict.actions
          item.price = this.activeConflict.price
          item.payer = this.activeConflict.payer ? this.activeConflict.payer : 0
          item.delay = this.activeConflict.delay ? this.activeConflict.delay : 0
          item.delay_type = this.activeConflict.delay_type ? this.activeConflict.delay_type : 1
        }
        const data = {
          org_id: item.org_id,
          store_id: item.store_id,
          id_remain: item.id,
          count: count,
          key: item.key,
          actions: conf,
        }
        this.basketOfferProductAdd(data).then((response) => {
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
        this.count = Object.keys(this.modalActionsData).length > 0 ? this.modalActionsData[0].min_count > 0 ? this.modalActionsData[0].min_count : 1 : 1

    },
    checkAction(ind){
      if(this.mainActionsData[ind]){
        this.mainActionsData[ind] = false
        this.allOff = true
        this.activeConflict = {}
      }else{
        for (var ii in this.mainActionsData){
          if(ii == ind){
            this.mainActionsData[ii] = true
            this.allOff = false
            // выставляем новый активный конфликт
            for (var ic in this.offer.conflicts){
              if(this.offer.conflicts[ic] !== undefined){
                if(this.offer.conflicts[ic].actions_ids.includes(ii)){
                  this.activeConflict = this.offer.conflicts[ic]

                  if(Number(this.activeConflict.multiplicity) > 1){
                    this.count = Number(this.activeConflict.multiplicity)
                  }
                }
              }
            }
          }else{
            this.mainActionsData[ii] = false
          }
        }
      }
    },
  },
  watch: {
    offer: function(newVal) {
      this.modalActionsData = newVal.conflicts;
    },
    modalActions: function(newVal){
      if(newVal == false){
        if(this.modalActionsData && Object.keys(this.modalActionsData).length == 1 && !this.allOff){
          this.count = Number(this.modalActionsData[0].multiplicity)
        }else{
          this.count = Number(this.modalActionsData[0].min_count) > 0 ? Number(this.modalActionsData[0].min_count) : 1
        }

      }
    },

  }
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
.product-multiplicity-not-available .modal-content {
  width: 100%;
  max-width: 500px;
}
.product-card__basket-button:not(.basket-true) form {
  display: none;
}

.basket-true .product-card__buy {
  display: none;
}

.loading-counter form {
  position: relative;
  display: block;
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 35px;
    background: #ededed;
    z-index: 3;
  }
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 2px solid transparent;
    border-top-color: #343434;
    border-radius: 50%;
    z-index: 4;
    animation: button-loading-spinner 1s ease infinite;
  }
}

.d-button__text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.2s;
}

.d-button--loading {
  position: relative;
  .d-button__text {
    visibility: hidden;
    opacity: 0;
  }
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: button-loading-spinner 1s ease infinite;
  }
}

.product-card {
  width: auto;
  padding-bottom: 6px;

  .product-card__basket-button {
    &.basket-true {
      .d-counter {
        display: flex;
      }
      .d-button {
        display: none;
      }
    }
    .d-counter {
      display: none;
    }
    .d-button {
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
  color: #fbfbfb;
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
  background: #ededed;
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
  background: #ededed;
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
  background: #fbfbfb;
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
  content: '';
  background-color: #fbfbfb;
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
  content: '';
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
  content: '';
  background-color: #fbfbfb;
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
  content: '';
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
.product-card__basket-button.basket-true {
  display: flex;
  justify-content: end;
  margin: 16px 20px 28px 0;
  width: 100%;
}
.product-card__basket-button.basket-true .d-counter {
  background: #ededed;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
  border-radius: 35px;
  border: none;
}
.product-card-noactive {
  opacity: 0.5;
}
.product-card-noactive .product-card__footer {
  display: none;
}

@media (width>1280px) {
  .product-card__basket-button.basket-true .d-counter,
  .product-card__buy {
    height: 32px;
    width: 167px;
    max-width: 167px;
  }
  .product-card__content-left {
    max-width: 380px;
  }
  .product-card__basket-button.basket-true .d-counter__button {
    width: 39.5px;
    padding-inline: 13px;
    position: relative;
  }
  .product-card__basket-button.basket-true .d-counter__button-icon {
    color: #757575;
    font-size: 13px;
  }
  .product-card__basket-button.basket-true .d-counter__button:first-child:after {
    content: '';
    background-color: rgb(117 117 117 / 30%);
    width: 0.5px;
    height: 13px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .product-card__basket-button.basket-true .d-counter__button:last-child:before {
    content: '';
    background-color: rgb(117 117 117 / 30%);
    width: 0.5px;
    height: 13px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
@media (width <=1536px) {
  .product-card__price-value-discounted {
    font-size: 30px;
  }
}
@media (width <=1280px) {
  .product-card__basket-button.basket-true .d-counter,
  .product-card__buy {
    height: 24px;
    width: 103px;
    max-width: 103px;
  }
  .product-card__buy {
    min-height: 24px;
    font-size: 10px;
  }
  .product-card__buy-icon {
    font-size: 13px;
  }
  .product-card__price-value-discounted {
    font-size: 24px;
  }
  .product-card__content-left {
    max-width: auto;
  }
  .product-card__basket-button.basket-true .d-counter__button {
    width: 25.5px;
    padding-inline: 8px;
    position: relative;
  }
  .product-card__basket-button.basket-true .d-counter__button-icon {
    color: #757575;
    font-size: 8px;
  }
  .product-card__basket-button.basket-true .d-counter__button:first-child:after {
    content: '';
    background-color: rgb(117 117 117 / 30%);
    width: 0.5px;
    height: 8px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .product-card__basket-button.basket-true .d-counter__button:last-child:before {
    content: '';
    background-color: rgb(117 117 117 / 30%);
    width: 0.5px;
    height: 8px;
    position: absolute;
    left: 0;
    top: 50%;
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
  .product-card__basket-button.basket-true .d-counter,
  .product-card__buy {
    height: 24px;
    width: 117px;
    max-width: 117px;
  }
  .product-card__price-value-discounted {
    font-size: 20px;
  }
  .product-card__basket-button.basket-true {
    margin: 16px 18px 28px 0;
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
  .product-card-actions__modal-buttons {
    margin-top: 8px;
  }
  .product-card-actions__modal-button {
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
  .product-card-actions__modal-actions {
    margin-right: 0px;
    border-top: 0.5px solid #282828;
    border-bottom: 0.5px solid #282828;
    border-radius: 7px 0 0 0;
    background: transparent;
    box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
    backdrop-filter: blur(13.4px);
  }
  .product-card-actions__modal-actions-header:before,
  .product-card-actions__modal-actions-content:before {
    background-color: #282828;
  }
  .product-card-actions__modal-actions-header:after,
  .product-card-actions__modal-actions-content:after {
    background-color: #fff;
  }
  .product-card-actions__modal-actions-header {
    min-width: 262px;
    background-color: #282828;
    color: #fbfbfb;
    padding: 2px 44px;
  }
  .product-card-actions__modal-actions-header {
    font-size: 12px;
  }
  .product-card-actions__modal-actions-content {
    padding: 13px 44px 16px;
  }

  .product-card-actions__modal-actions-content-item {
    font-size: 12px;
    background: #ededed;
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
  .product-card-actions__modal-buttons {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
  .product-card-actions__modal .modal-content {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .product-card-actions__modal .modal__title:before {
    content: 'Акции';
    padding-left: 44px;
  }
  .product-card-actions__modal-buttons {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
  .product-card-actions__modal .modal-content {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .product-card-actions__modal .modal__title:before {
    content: 'Акции';
    padding-left: 44px;
  }
  .product-card__basket-button.basket-true {
    margin: 16px 0px 0px 0;
  }
  .product-card__basket-button.basket-true .d-counter,
  .product-card__buy {
    height: 32px;
    width: 100px;
    max-width: 100px;
  }
  .product-card__price-value-discounted {
    font-size: 24px;
  }
  .product-card__stat-content--horizontal,
  .product-card__stat-content {
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
    width: 100%;
    padding-right: 28px;
  }
  .product-card__stat-content--horizontal,
  .product-card__stat-content {
    flex-direction: row !important;
  }
  .product-card__content-right {
    margin-top: 0px;
    padding-right: 28px;
  }
  .product-card__price {
    align-self: start;
    padding-left: 28px;
  }
  .product-card__basket-button {
    margin-top: -36px !important;
  }
  .product-card__content,
  .product-card__stat-list {
    gap: 8px;
  }
  .product-card__buy {
    font-size: 1px;
    color: transparent;
    width: 32px !important;
    max-width: 32px;
    min-width: 32px;
    aspect-ratio: 1;
    padding: 6px;
  }
  .product-card__buy-icon {
    display: flex;
    font-size: 20px;
    color: #fbfbfb;
    position: absolute;
  }
  .product-card__buy:hover .product-card__buy-icon {
    color: #f92c0d;
  }
  .product-card__buy:hover {
    color: transparent;
  }
}
</style>
