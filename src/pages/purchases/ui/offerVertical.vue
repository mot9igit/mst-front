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
                  v-if="Object.keys(offer.actions).length > 0"
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
                      за счет {{ activeConflict?.payer == 1 ? 'поставщика' : 'покупателя' }}
                    </p>
                  </div>
                </div>

                <!-- Элемент доп. информации -->
                <div class="product-card__stat">
                  <i class="d-icon-wallet product-card__stat-icon"></i>
                  <div class="product-card__stat-content product-card__stat-content--horizontal">
                    <p class="product-card__stat-name">
                      {{ activeConflict?.delay_type == 2 ? 'Под реал.' : 'Отсрочка' }}
                    </p>
                    <p class="product-card__stat-description" v-if="activeConflict.delay > 0">
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
                <span v-if="this.activeConflict.actions_ids.includes(item.action_id) && (item.is_trigger == 1 && item.enabled == 0)">Условия акции не выполнены:</span>
                <span v-else-if="this.activeConflict.actions_ids.includes(item.action_id) && (item.is_trigger == 1 && item.enabled == 1)">Применена автоматически:</span>
                <span v-else-if="this.activeConflict.actions_ids.includes(item.action_id) && item.is_trigger == 0">Акция включена:</span>
                <span v-else-if="!this.activeConflict.actions_ids.includes(item.action_id) && this.offer.main_actions.includes(Number(item.action_id))">Акция несовместима:</span>
                <span v-else-if="!this.activeConflict.actions_ids.includes(item.action_id) && !this.offer.main_actions.includes(Number(item.action_id))">Акция выключена:</span>
              </p>
              <div class="product-card-actions__modal-all-item-action-button">
                <div>
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
                  <i class="d-icon-times product-card__actions-icon-cross"  v-if="!this.activeConflict.actions_ids.includes(item.action_id) && !this.offer.main_actions.includes(Number(item.action_id))"></i>
                  <!--галочка-->
                  <i class="d-icon-check product-card__actions-icon-auto" v-else-if="this.activeConflict.actions_ids.includes(item.action_id) && ((item.is_trigger == 1 && item.enabled == 1) || (item.is_trigger == 0))"></i>
                  <!--несовместима-->
                  <i class="d-icon-info product-card__actions-icon-info" v-else-if="!this.activeConflict.actions_ids.includes(item.action_id) && this.offer.main_actions.includes(Number(item.action_id))"></i>
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
    </customModal>
  </teleport>
</template>

<script>
import { mapActions } from 'vuex'
import customModal from '@/shared/ui/Modal.vue'
import Counter from '@/shared/ui/CounterNoAdd.vue'

export default {
  name: 'productOffer',
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
      basketProductAdd: 'basket/basketProductAdd',
      getBasket: 'basket/getBasket',
      basketClear: 'basket/basketClear',
      basketProductRemove: 'basket/basketProductRemove',
      basketProductUpdate: 'basket/basketProductUpdate',
    }),

    ElemCount(object) {
      console.log(object)
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
      if(this.modalActionsData && (Object.keys(this.modalActionsData).length > 1 || (Object.keys(this.modalActionsData).length = 1 && this.allOff))){
        this.modalActions = true
      }else{
        console.log('сразу в корзину')
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
        this.count = Object.keys(this.modalActionsData).length > 0 ? this.modalActionsData[0].min_count > 0 ? this.modalActionsData[0].min_count : 1 : 1
      }
    },
    checkAction(ind){
      if(this.mainActionsData[ind]){
        this.mainActionsData[ind] = false
        this.allOff = true
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
.product-card__vertical .products__list {
  grid-template-columns: repeat(4, 343px);
  align-items: flex-start;
  justify-content: start;
  gap:49px;
  margin-bottom: 52px;

}
.product-card__vertical .product-card__price-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #EDEDED;
  padding-bottom: 10px;
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
  z-index: 1;
  overflow: visible;
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
.product-card__vertical .product-card__seller,.product-card__vertical .product-card__seller--active-header{
  min-height: 26px;
}
.product-card__vertical .product-card__seller-image {
  margin-right: 8px;
  width: auto;
  height: 26px;
  aspect-ratio: auto;
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
.product-card__vertical .product-card__stat-description{
  color: #757575;
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
.product-card__vertical .product-card .product-card__count-value-require {
  padding: 4px 13.5px;
  background: #EDEDED;
  border-radius: 36px;
}
.product-card__vertical .product-card .redder {
  text-align: left;
  font-size: 10px;
  line-height: 14px;
}
.product-card__vertical .product-card__stat{
  min-height: 20px;
  display: flex;
  gap: 8px;
  align-items: center;
}
.product-card__vertical .product-card__count-label,
.product-card__vertical .product-card__count-label span,
.product-card__vertical .product-card__count-value{
  font-size: 12px;
  font-weight: 600;
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
.product-card__vertical .product-card__basket-button .d-counter__button-icon {
  color: #757575;
  font-size: 13px;
}
.product-card__vertical .product-card__basket-button .d-counter__button:first-child{
  border-right: 0.5px solid #75757534;
  height: auto;
}
.product-card__vertical .product-card__basket-button .d-counter__button:last-child{
  border-left: 0.5px solid #75757534;
  height: auto;
}
.product-card-vertical__buy{
  height: 32px;
  min-width: 164px;
  box-shadow: none;
  margin-left: 8px;
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
.product-card__vertical .product-card__buy-icon {
  font-size: 16px;
}
.product-card__vertical .product-card__basket-button {
  margin-top: 11px;
}
.product-card__seller--active{
  transition: 0.3s;
  position: absolute;
  background-color: #fff;
  width: calc(100% + 18px);
  top:-8px;
  left: - 9px;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
  padding: 8px 9px;
  min-height: 65px;
  z-index: 2;
  cursor: pointer;
}
.product-card__seller--active-header{
  display: flex;
  align-items: center;
}
.product-card__seller-button {
  margin-top: -2px;
}
.product-card__seller--active-header .product-card__seller-button{
  color: #F92C0D;
  transition: 0.3s;
  rotate: 180deg;
  padding-bottom: 5px;
}
.product-card__seller--active .product-card__seller-info{
  font-weight: 500;
  font-size: 12px;
  line-height: 123%;
  color: #757575;
  margin-top: 6px;
}
.product-card-actions__modal-all .modal-content {
  max-width: 1519px;
}
.product-card-actions__modal-all .modal__content{
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.product-card-actions__modal-all-header{
  display: grid;
  grid-template-columns: auto 294px auto;
  grid-template-rows: auto;
  gap: 69px;
}
.product-card-actions__modal-all-header-product-info{
  display: flex;
  gap: 20px;
  align-items: center;
}
.product-card-actions__modal-all h3{
  margin-top: -25px;
  margin-bottom: 32px;
}
.product-card-actions__modal-all .product-card__image-container {
  width: 113px;
  height: 113px;
  min-width: 113px;
  min-height: 113px;
  border-radius: 8px;
}
.product-card-actions__modal-all .product-card__image {
  object-fit: contain;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
.product-card-actions__modal-all .product-card__seller-button-icon {
  font-size: 10px;
  font-weight: 800;
}
.product-card-actions__modal-all .product-card__title {
  font-size: 20px;
  font-weight: 600;
}
.product-card-actions__modal-all .product-card__article {
  font-size: 16px;
  font-weight: 500;
  color:#757575;
}
.product-card-actions__modal-all .product-card__seller-image {
  margin-right: 8px;
  width: auto;
  height: 18px;
  aspect-ratio: auto;
}
.product-card-actions__modal-all .product-card__seller-name {
  font-size: 16px;
  font-weight: 700;
  margin-right: 8px;
}
.product-card-actions__modal-all .product-card__info-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.product-card-actions__modal-all .product-card__seller {
  cursor: pointer;
  padding-top: 8px;
}
.product-card-actions__modal-all .product-card__stat-list-cont{
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  max-width: 294px;
}
.product-card-actions__modal-all .product-card__stat-list {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
  padding: 12px 10px;
  background: #F4F4F4;
  border-radius: 8px;
}
.product-card-actions__modal-all .product-card__stat-content {
  flex-direction: row;
  gap: 4px;
}
.product-card-actions__modal-all .product-card__stat-description {
  width: max-content;
}
.product-card-actions__modal-all .product-card__info-text-container{
  width: fit-content;
}
.product-card-actions__modal-all .product-card__price-container-all{
  display: flex;
  gap: 2px;
  flex-direction: column;
  align-items: end;
  width: max-content;
}
.product-card-actions__modal-all .product-card__seller-cont{
  position: relative;
}
.product-card-actions__modal-all .product-card__seller--active {
  top: 0px;
  left: -9px;
}
.product-card-actions__modal-all .product-card__price {
  margin-right: 0px;
  margin-bottom: 0px;
}
.product-card-actions__modal-all .product-card__p, .product-card-actions__modal-all .product-card__count-value, .product-card-actions__modal-all .product-card__count-label{
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: right;
  color: #757575;
}
.product-card-actions__modal-all .product-card__count {
  display: flex;
  align-items: center;
  background-color: transparent;
  border-radius: 0;
  padding: 0px;
  min-width: max-content;
  height: auto;
}
.product-card-actions__modal-all .product-card__count:before, .product-card-actions__modal-all .product-card__count:after {
  display: none;
}
.product-card-actions__modal-all .product-card__basket-button{
  margin-top: 24px;
  gap: 16px;
}
.product-card-actions__modal-all .product-card .product-card__basket-button .d-counter,.product-card-actions__modal-all .product-card__basket-button:not(.basket-true) form {
  display: flex;
}
.product-card-actions__modal-all .product-card__basket-button{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:32px;
}
.product-card-actions__modal-all .product-card__basket-button .d-counter {
  background-color: #ededed;
  border: none;
  border-radius: 30px;
  overflow: hidden;
  height: 32px;
  max-width: 145px;
}
.product-card-actions__modal-all .product-card-actions__modal-all-item .product-card__stat-list-cont{
  width: 251px;
  max-width: 251px;
}
.product-card-actions__modal-all .product-card-actions__modal-all-item-action-button div:not(.d-switch){
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 8px;
}
.product-card-actions__modal-all .product-card__basket-button .d-counter__button-icon {
  color: #757575;
  font-size: 13px;
}
.product-card-actions__modal-all .product-card__basket-button .d-counter__button:first-child{
  border-right: 0.5px solid #75757534;
  height: auto;
}
.product-card-actions__modal-all .product-card__basket-button .d-counter__button:last-child{
  border-left: 0.5px solid #75757534;
  height: auto;
}
.product-card-actions__modal-all-item{
  display: grid;
  gap: 24px;
  background: #FBFBFB;
  border-radius: 16px;
  width: 100%;
  padding: 16px;
  grid-template-columns: 317fr 248fr 281fr 251fr 170fr;
}
.product-card-actions__modal-all-content{
  margin-top: 48px;
  display:flex;
  flex-direction: column;
  gap: 32px;
  overflow-y: scroll;
}
.product-card-actions__modal-all-item-image{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 317px;
  height: 100%;
}
.product-card-actions__modal-all-item-image img{
  height: 75px;
  width: auto;
  border-radius: 11px;
  object-fit: cover;
}
.product-card-actions__modal-all-item-href{
  display: flex;
  justify-content: end;
  align-items: center;
}
.product-card-actions__modal-all-item-action-label{
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #757575;
}
.product-card-actions__modal-all-item-action-button{
  display:flex;
  gap: 16px;
  align-items: center;
  margin-top: 22px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #282828;
}
.product-card-actions__modal-all-item-descr div{
  margin-top: 22px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #282828;
}
.product-card-actions__modal-all-content .product-card__stat-list {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #282828;
  margin-bottom: 0;
  width: 100%;
}
.product-card-actions__modal-all-content .product-card__stat-list .product-card__buy-icon{
  color: #757575;
  margin-right: 6px;
}
.product-card__icon-summ{
  width:18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  border: 0.5px solid #757575;
  font-size: 13px;
  font-weight: 400;
  float: left;
}
.product-card__actions-icon-cross{
  font-size: 15px;
  color: #F92C0D;
}
.product-card__actions-icon-auto{
  font-size: 18px;
  color: #97BC71;
}
.product-card__actions-icon-info{
  font-size: 18px;
  color: #F92C0D;
  font-weight: 600;
}
.product-card__vertical .d-button__text {
  gap: 8px
}
.product-item-vertical .products__header {
  margin-bottom: 48px;
}
.product-item-vertical {
  margin-bottom: 48px;
}
.product-item-vertical .products__header {
  padding: 0;
}
.product-card-actions__modal-all .product-card__stat-list .product-card__buy-icon {
  font-size: 16px;
  margin: 0;
}
.product-card-actions__modal-all .product-card__stat-list div{
  display: flex;
  gap: 8px;
  align-items: center;
}
.product-card__icon-summ {
  width: 13px;
  height: 13px;
  font-size: 10px !important;
  line-height: 15px;
}
.product-card__info-filters{
  display: flex;
  gap: 24px;
  margin-top: 40px;
}
.product-card__info-filters button{
  font-weight: 500;
}
.product-card__info-filters button .d-badge2{
  width:auto;
  min-width: auto;
}
.product-card__info-filters .product-card-actions__modal-button {
  border: none;
}
.product-card__vertical .product-card-noactive{
  opacity: 1;
  .product-card__header, .product-card__image-container{
    opacity: 0.3;
  }
  .product-card__price-value-discounted, .product-card__info-text, .product-card__count, .product-card__stat-cont {
    opacity: 0.1;
  }
  .product-card__basket-button{
    display:none;
  }
  .product-card__price-value-discounted.product-card__noavailable{
    opacity: 0.59;
  }
  .product-card__price-value-discounted{
    font-size: 20px;
    color: #757575;
  }
}
@media (width <=1736px) {
  .product-card__vertical .products__list {
    gap: inherit;
    margin-bottom: 40px;
  }
}
@media (width <=1636px) {
  .product-card__vertical .products__list {
    grid-template-columns: repeat(4, 304px);
    gap: inherit;
    margin-bottom: 40px;
  }
  .product-card__vertical .product-card{
    width: 304px;
  }
  .product-card-vertical__buy {
    min-width: 112px;
    padding-inline: 12px;
  }
}
@media (width <=1536px) {
  .product-card__vertical .products__list {
    gap: 16px;
  }
  .product-card__vertical .product-card__price-container{
    padding-bottom: 16px;
  }
  .product-card__vertical .product-card__info {
    display: flex;
    flex-direction: column;
    gap: 13px;
  }
  .product-card__vertical .product-card__content {
    display: flex;
    gap: 0px;
    background-color: #Fff;
    border-radius: 0px;
    padding: 0px;
  }
  .product-card__vertical .product-card__seller, .product-card__vertical .product-card__seller--active-header {
    min-height: 22px;
  }
  .product-card__vertical .product-card__seller-image {
    margin-right: 8px;
    width: auto;
    height: 22px;
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
    width: 144px;
    height: 144px;
    min-width: 144px;
    min-height: 144px;
    max-height: 144px;
  }
  .product-card__vertical .product-card__price-value-discounted {
    font-size: 20px;
  }
  .product-card-vertical__promo-all{
    font-size: 16px;
    line-height: 18px;
    gap: 4px;
  }
  .product-card-vertical__promo-all .red-badge{
    font-size: 10px;
    font-weight: 600;
    padding: 8.5px 7px;
    height: 16px;
    min-width: 16px;
  }
  .product-card-vertical__promo-all .product-card-vertical__seller-button-icon{
    font-weight: 500;
    font-size: 12px;
  }
  .product-card__vertical .product-card__title {
    font-size: 14px;
    font-weight: 500;
  }
  .product-card__vertical .product-card__article {
    margin-top: 8px;
    font-weight: 600;
    font-size: 10px;
    line-height: 100%;
  }
  .product-card__vertical .product-card__count-value-require, .product-card__vertical .product-card__count-value-require span{
    font-weight: 600;
    font-size: 10px !important;
  }
  .product-card__vertical .redder{
    font-size: 9px;
  }
  .product-card__vertical .product-card__stat-name, .product-card__vertical .product-card__stat-description {
    font-size: 10px;
  }
  .product-card__vertical .product-card__count {
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
  .product-card__vertical .product-card .product-card__count-value-require {
    padding: 4px 13.5px;
    background: #EDEDED;
    border-radius: 36px;
  }
  .product-card__vertical .product-card .redder {
    text-align: left;
    font-size: 10px;
    line-height: 14px;
  }
  .product-card__vertical .product-card__stat{
    min-height: 16px;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .product-card__vertical .product-card__count-label,
  .product-card__vertical .product-card__count-label span,
  .product-card__vertical .product-card__count-value{
    font-size: 12px;
    font-weight: 600;
  }
  .product-card__vertical .product-card__stat-list {
    gap: 8px;
    margin-bottom: 0px;
    padding: 8px 8px;
    border-radius: 8px;
  }
  .product-card__vertical .product-card__basket-button{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:32px;
  }
  .product-card__vertical .product-card__basket-button .d-counter {
    height: 32px;
    max-width: 127px;
  }
  .product-card__vertical .product-card__basket-button .d-counter__button-icon {
    color: #757575;
    font-size: 12px;
  }
  .product-card-vertical__buy{
    height: 32px;
    min-width: 145px;
    box-shadow: none;
  }
  .product-card-vertical__buy .d-button__text {
    font-size: 14px;
    font-weight: 500;
  }
  .product-card__vertical .product-card__buy-icon {
    font-size: 13px;
  }
  .product-card__vertical .d-button__text {
    gap: 9.5px
  }
  .product-card__vertical .d-counter__input {
    font-size: 14px;
  }
  .product-item-vertical .products__header {
    margin-bottom: 40px;
  }
  .product-item-vertical {
    margin-bottom: 40px;
  }
  //--- all actions ---//
  .product-card-actions__modal-all h3 {
    font-size: 16px;
    margin-top: -23px;
  }
  .product-card-actions__modal-all-header {
    grid-template-columns: auto 187px auto;
    gap: 24px;
  }
  .product-card-actions__modal-all .product-card__image-container {
    width: 97px;
    height: 97px;
    min-width: 97px;
    min-height: 97px;
  }
  .product-card-actions__modal-all .product-card__title {
    font-size: 16px;
  }
  .product-card-actions__modal-all .product-card__article {
    font-size: 12px;
  }
  .product-card-actions__modal-all .product-card__seller-image {
    height: 22px;
  }
  .product-card-actions__modal-all .product-card__seller-name {
    font-size: 14px;
    margin-right: 2px;
  }
  .product-card-actions__modal-all .product-card__stat-name, .product-card-actions__modal-all .product-card__stat-description {
    font-size: 10px;
  }
  .product-card-actions__modal-all .product-card__price-value-discounted {
    font-size: 24px;
  }
  .product-card-actions__modal-all .modal-content {
    max-width: 1152px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item {
    gap: 24px;
    grid-template-areas:
    "A A A A A   B B B B B  C C C C C C  E E E E"
    "A A A A A   B B B B B  C C C C C C  E E E E"
    "A A A A A   B B B B B  C C C C C C  G G G G";
    grid-template-columns: auto auto auto;
    gap: 8px 44px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-image{
    grid-area: A;
    width: 220px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-action{
    grid-area: B;
    width: 220px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-descr{
    grid-area: C;
    width: 251px;
  }
  .product-card-actions__modal-all-content .product-card__stat-list-cont{
    grid-area: E;
    width: 187px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-href{
    grid-area: G;
    width: 187px;
  }
  .product-card-actions__modal-all-item-image {
    width: 100%;
    height: 100%;
  }
  .product-card-actions__modal-all-item-image img {
    height: 52px;
  }
  .product-card-actions__modal-all-item-action-label {
    font-size: 9px;
    line-height: 12px;
  }
  .product-card-actions__modal-all-item-action-button {
    gap: 8px;
    margin-top: 16px;
    font-size: 10px;
    line-height: 12px;
  }
  .product-card-actions__modal-all-item-descr div {
    margin-top: 16px;
    font-size: 10px;
    line-height: 12px;
  }
  .product-card-actions__modal-all-content .product-card__stat-list {
    font-size: 10px;
    line-height: 12px;
  }
  .product-card-actions__modal-all .product-card__stat-list {
    gap: 8px;
    padding: 12px 8px;
    max-width: 187px;
  }
  .product-card-actions__modal-all .product-card__stat-list .product-card__buy-icon {
    font-size: 13px;
  }
  .product-card-actions__modal-all .product-card-actions__modal-all-item .product-card__stat-list-cont {
    width: 187px;
    max-width: 187px;
  }
  .product-card-actions__modal-all-item-href a, .product-card-actions__modal-all-item-href button{
    width: 100%;
  }
  .product-card-actions__modal-all-content {
    gap: 24px;
    margin-top: 40px;
  }
  .product-card-actions__modal-all .product-card__basket-button .d-counter__input {
    font-size: 14px;
  }
  //---    -----    ---//
  .product-card__vertical .product-card-noactive{
    .product-card__price-value-discounted{
      font-size: 16px;
      width: max-content;
    }
  }
}
@media (width <=1436px) {
  .product-card__vertical .products__list {
    grid-template-columns: repeat(3, 320px);
    gap: inherit;
    margin-bottom: 40px;
  }
  .product-card__vertical .product-card{
    width: 320px;
  }
}
@media (width <=1280px) {
  .product-card__vertical .products__list {
    display: grid !important;
    grid-template-columns: repeat(3, 320px);
    gap: inherit;
    margin-bottom: 40px;
  }
  .product-card__vertical .product-card{
    width: 320px;
    padding: 8px 16px;
  }
  .product-item-vertical .products__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    margin-bottom: 40px;
    background-color: transparent;
  }
  .product-card__vertical .products__list {
    gap: 24px;
  }
  .product-card__vertical .product-card__price-container{
    padding-bottom: 8px;
  }
  .product-card__vertical .product-card__info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .product-card__vertical .product-card__count{
    margin-top: 16px;
  }
  .product-card__stat-list{
    margin-top: 4px;
  }
  .product-card__vertical .product-card__content {
    display: flex;
    gap: 0px;
    background-color: #Fff;
    border-radius: 0px;
    padding: 0px;
  }
  .product-card__vertical .product-card__seller-name {
    font-size: 12px;
    font-weight: 700;
    margin-right: 8px;
  }
  .product-card__vertical .product-card__seller-button-icon {
    font-size: 10px;
    font-weight: 800;
  }
  .product-card__vertical .product-card__image-container {
    width: 144px;
    height: 144px;
    min-width: 144px;
    min-height: 144px;
    max-height: 144px;
  }
  .product-card__vertical .product-card__price-value-discounted {
    font-size: 20px;
  }
  .product-card-vertical__promo-all{
    font-size: 16px;
    line-height: 18px;
    gap: 4px;
  }
  .product-card-vertical__promo-all .red-badge{
    font-size: 10px;
    font-weight: 600;
    padding: 8.5px 7px;
    height: 16px;
    min-width: 16px;
  }
  .product-card-vertical__promo-all .product-card-vertical__seller-button-icon{
    font-weight: 500;
    font-size: 12px;
  }
  .product-card__vertical .product-card__title {
    font-size: 14px;
    font-weight: 500;
  }
  .product-card__vertical .product-card__article {
    margin-top: 8px;
    font-weight: 600;
    font-size: 10px;
    line-height: 100%;
  }
  .product-card__vertical .product-card__count-value-require, .product-card__vertical .product-card__count-value-require span{
    font-weight: 600;
    font-size: 10px !important;
  }
  .product-card__vertical .redder{
    font-size: 9px;
  }
  .product-card__vertical .product-card__stat-name, .product-card__vertical .product-card__stat-description {
    font-size: 10px;
  }
  .product-card__vertical .product-card__count {
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
  .product-card__vertical .product-card .product-card__count-value-require {
    padding: 4px 13.5px;
    background: #EDEDED;
    border-radius: 36px;
  }
  .product-card__vertical .product-card .redder {
    text-align: left;
    font-size: 10px;
    line-height: 14px;
  }
  .product-card__vertical .product-card__stat{
    min-height: 16px;
    display: flex;
    gap: 4px;
    align-items: center;
  }
  .product-card__vertical .product-card__count-label,
  .product-card__vertical .product-card__count-label span,
  .product-card__vertical .product-card__count-value{
    font-size: 10px;
    font-weight: 600;
  }
  .product-card__vertical .product-card__stat-list {
    gap: 8px;
    margin-bottom: 0px;
    padding: 8px 8px;
    border-radius: 8px;
  }
  .product-card__vertical .product-card__basket-button{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:24px;
  }
  .product-card__vertical .product-card__basket-button .d-counter {
    height: 24px;
    max-width: 127px;
  }
  .product-card__vertical .d-counter__input {
    font-size: 12px;
  }
  .product-card__vertical .product-card__basket-button .d-counter__button-icon {
    color: #757575;
    font-size: 12px;
  }
  .product-card-vertical__buy{
    height: 24px;
    max-height: 24px;
    min-height: 24px;
    min-width: 145px;
    box-shadow: none;
  }
  .product-card-vertical__buy .d-button__text {
    font-size: 12px;
    font-weight: 500;
  }
  .product-card__vertical .product-card__buy-icon {
    font-size: 13px;
  }
  .product-card__vertical .d-button__text {
    gap: 9.5px
  }
  .product-card__vertical .product-card__seller-image {
    height: 16px;
  }
  .product-item-vertical .products__header {
    margin-bottom: 24px;
  }
  .product-item-vertical {
    margin-bottom: 24px;
  }
  .product-item-vertical .products__header-left {
    gap: 16px;
  }
  .product-item-vertical .products__image-container {
    width: 48px;
    height: 48px;
    min-width: 48px;
    min-height: 48px;
  }
  .product-item-vertical .products__title{
    font-size: 14px;
    line-height: 100%;
  }
  .product-item-vertical .products__stat-label {
    font-size: 10px;
  }
  .product-item-vertical .products__stat-value {
    font-size: 14px;
    font-weight: 600;
  }
    //--- all actions ---//
  .product-card-actions__modal-all h3 {
    font-size: 14px;
    margin-top: -21px;
  }
  .product-card-actions__modal-all-header {
    grid-template-columns: auto 169px auto;
    gap: 24px;
  }
  .product-card-actions__modal-all .product-card__image-container {
    width: 80px;
    height: 80px;
    min-width: 80px;
    min-height: 80px;
  }
  .product-card-actions__modal-all .product-card__title {
    font-size: 14px;
  }
  .product-card-actions__modal-all .product-card__article {
    font-size: 12px;
  }
  .product-card-actions__modal-all .product-card__seller-image {
    height: 16px;
  }
  .product-card-actions__modal-all .product-card__seller-name {
    font-size: 12px;
    margin-right: 2px;
  }
  .product-card-actions__modal-all .product-card__stat-name, .product-card-actions__modal-all .product-card__stat-description {
    font-size: 9px;
  }
  .product-card-actions__modal-all .product-card__stat-list .product-card__stat-content {
    gap: 4px;
  }
  .product-card-actions__modal-all .product-card__price-value-discounted {
    font-size: 16px;
  }
  .product-card-actions__modal-all .product-card__p, .product-card-actions__modal-all .product-card__count-value, .product-card-actions__modal-all .product-card__count-label {
    font-size: 9px;
    line-height: 11px;
  }
  .product-card-actions__modal-all .product-card__basket-button {
    margin-top: 16px;
  }
  .product-card-actions__modal-all .modal-content {
    max-width: 1008px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item {
    grid-template-areas:
    "A A A A A   B B B B B  C C C C C C  E E E E"
    "A A A A A   B B B B B  C C C C C C  E E E E"
    "A A A A A   B B B B B  C C C C C C  G G G G";
    grid-template-columns: auto auto auto;
    gap: 8px 16px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-image{
    grid-area: A;
    width: 200px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-action{
    grid-area: B;
    width: 176px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-descr{
    grid-area: C;
    width: 281px;
  }
  .product-card-actions__modal-all-content .product-card__stat-list-cont{
    grid-area: E;
    width: 187px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-href{
    grid-area: G;
    width: 187px;
  }
  .product-card-actions__modal-all-item-image {
    width: 100%;
    height: 100%;
  }
  .product-card-actions__modal-all-item-image img {
    height: 52px;
  }
  .product-card-actions__modal-all-item-action-label {
    font-size: 9px;
    line-height: 12px;
  }
  .product-card-actions__modal-all-item-action-button {
    gap: 8px;
    margin-top: 16px;
    font-size: 10px;
    line-height: 12px;
  }
  .product-card-actions__modal-all-item-descr div {
    margin-top: 16px;
    font-size: 10px;
    line-height: 12px;
  }
  .product-card-actions__modal-all-content .product-card__stat-list {
    font-size: 10px;
    line-height: 12px;
  }
  .product-card-actions__modal-all .product-card__stat-list {
    gap: 8px;
    padding: 12px 8px;
    max-width: 187px;
  }
  .product-card-actions__modal-all .product-card__stat-list .product-card__buy-icon {
    font-size: 13px;
  }
  .product-card-actions__modal-all .product-card-actions__modal-all-item .product-card__stat-list-cont {
    width: 187px;
    max-width: 187px;
  }
  .product-card-actions__modal-all-item-href a, .product-card-actions__modal-all-item-href button{
    width: 100%;
  }
  .product-card-actions__modal-all-content {
    gap: 24px;
    margin-top: 32px;
  }
  .product-card-actions__modal-all-item-href button{
    font-size: 12px;
    height: 24px;
    min-height: 24px;
    max-height: 24px;
  }
  .product-card-actions__modal-all .product-card__basket-button .d-counter {
    height: 24px;
    max-width: 127px;
  }
  .product-card-actions__modal-all .product-card__basket-button .d-counter__input {
    font-size: 12px;
  }
  .product-card-actions__modal-all .product-card__basket-button {
    height: 24px;
  }
  //---    -----    ---//
  .product-card__vertical .product-card-noactive{
    .product-card__price-value-discounted{
      font-size: 16px;
      width: max-content;
    }
    .product-card__count{
      display:none;
    }
  }
}
@media (width <=1150px) {
  .product-card__vertical .products__list {
    grid-template-columns: repeat(2, 320px);
    gap: inherit;
    margin-bottom: 40px;
  }
  .product-card__vertical .product-card{
    width: 320px;
  }
}
@media (width <=1024px) {
  .product-card__vertical .products__list {
    display: flex !important;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 0px;
  }
  .product-card__vertical .product-card{
    width: 100%;
    padding: 16px;
  }
  .product-card__vertical .product-card__content-left{
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: start;
  }
  .product-card__vertical .product-card__header{
    margin-bottom: 0px;
    width: 100%;
  }
  .product-card__seller--active {
    width: calc(100% + 32px);
    top: -16px;
    left: -16px;
    padding: 16px;
  }
  .product-card__info-container{
    width:100%;
  }
  .product-card__vertical .product-card__info{
    display:grid !important;
    grid-template-areas:
    "A A A A A   B B B B B B B B   E E E E E E"
    "A A A A A   C C C C C C C C   E E E E E E"
    "A A A A A   D D D D D D D D   G G G G G G";
    gap: 0 24px !important;
    grid-template-rows: auto auto auto;
  }
  .product-card__vertical .product-card__image-container{
    grid-area: A;
    width: 176px;
    height: 100%;
    min-width: 130px;
    min-height: 130px;
    max-height: 100%;
  }
  .product-card__vertical .product-card__image-container img{
    width: 176px;
    height: 130px;
    min-width: 130px;
    min-height: 130px;
    max-height: 130px;
  }
  .product-card__vertical .product-card__price-container{
    grid-area: B;
    height: 24px;
    margin-bottom: 8px;
  }
  .product-card__vertical .product-card__info-text{
    grid-area: C;
    width:auto;
    max-width: 340px;
    overflow: hidden;
  }
  .product-card__vertical .product-card__basket-button{
    grid-area: D;
  }
  .product-card__vertical .product-card__stat-cont{
    grid-area: E;
    width: 100%;
    justify-items: end;
  }
  .product-card__vertical .product-card__stat-list{
    max-width: 209px;
    min-width: 209px;
  }
  .product-card__vertical .product-card__count{
    grid-area: G;
  }
  .product-item-vertical .products__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    margin-bottom: 32px;
    background-color: transparent;
  }
  .product-item-vertical {
    margin-bottom: 32px;
  }
  .product-item-vertical .products__image-container {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
  }
  .product-item-vertical .products__title{
    font-size: 12px;
    line-height: 100%;
  }
  .product-item-vertical .products__header-left {
    gap: 8px;
  }
  .product-item-vertical .products__stat-label {
    font-size: 9px;
  }
  .product-item-vertical .products__stat-divider {
    height: 16px;
  }
  .product-item-vertical .products__stat-value {
    font-size: 12px;
    font-weight: 600;
  }
  .product-card__vertical .products__list {
    gap: 24px;
  }
  .product-card__vertical .product-card__price-container{
    padding-bottom: 8px;
  }
  .product-card__vertical .product-card__info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .product-card__vertical .product-card__count{
    margin-top: 0px;
  }
  .product-card__stat-list{
    margin-top: 0px;
  }
  .product-card__vertical .product-card__content {
    display: flex;
    gap: 0px;
    background-color: #Fff;
    border-radius: 0px;
    padding: 0px;
  }
  .product-card__vertical .product-card__seller-name {
    font-size: 12px;
    font-weight: 700;
    margin-right: 8px;
  }
  .product-card__vertical .product-card__seller-button-icon {
    font-size: 10px;
    font-weight: 800;
  }
  .product-card__vertical .product-card__price-value-discounted {
    font-size: 16px;
  }
  .product-card-vertical__promo-all{
    font-size: 9px;
    line-height: 11px;
    gap: 4px;
  }
  .product-card-vertical__promo-all .red-badge{
    font-size: 9px;
    font-weight: 600;
    padding: 8.5px 6.5px;
    height: 16px;
    min-width: 16px;
  }
  .product-card-vertical__promo-all .product-card-vertical__seller-button-icon{
    font-weight: 500;
    font-size: 10px;
  }
  .product-card__info-text {
    gap: 0;
  }
  .product-card__vertical .product-card__title {
    font-size: 12px;
    line-height: 14px;
    font-weight: 500;
    overflow-wrap: break-word;
  }
  .product-card__vertical .product-card__article {
    margin-top: 8px;
    font-weight: 600;
    font-size: 12px;
    line-height: 100%;
  }
  .product-card__basket-button{
    max-width: 224px;
    margin-top: 16px !important;
  }
  .product-card__vertical .product-card__count-value-require, .product-card__vertical .product-card__count-value-require span{
    font-weight: 600;
    font-size: 10px !important;
  }
  .product-card__vertical .redder{
    font-size: 9px;
    position: relative;
    width: max-content;
    padding-left: 8px;
    border-left: 0.5px solid #7575754d;
  }
  .product-card__vertical .product-card__stat-name, .product-card__vertical .product-card__stat-description {
    font-size: 8px;
  }
  .product-card__vertical .product-card__count {
    padding: 0px;
    min-width: 100%;
    height: 24px;
  }
  .product-card__vertical .product-card__count:before,.product-card__vertical .product-card__count:after {
    display: none;
  }
  .product-card__vertical .product-card .product-card__count {
    height: 100%;
    flex-direction: column;
    align-items: end;
    justify-content: center;
  }
  .product-card__vertical .product-card .product-card__count .d-divider{
    display: none;
  }
  .product-card__vertical .product-card__count-value{
    display: flex;
    gap: 8px;
  }

  .product-card__vertical .product-card .product-card__count-value-require {
    padding: 4px 13.5px;
    background: #EDEDED;
    border-radius: 36px;
  }
  .product-card__vertical .product-card .redder {
    text-align: left;
    font-size: 10px;
    line-height: 14px;
  }
  .product-card__vertical .product-card__stat{
    min-height: 13px;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .product-card__vertical .product-card__count-label,
  .product-card__vertical .product-card__count-label span,
  .product-card__vertical .product-card__count-value{
    font-size: 10px;
    font-weight: 600;
  }
  .product-card__vertical .product-card__stat-list {
    gap: 8px;
    margin-bottom: 0px;
    padding: 8px;
    border-radius: 8px;
    height: min-content;
  }
  .product-card__vertical .product-card__basket-button{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:24px;
  }
  .product-card__vertical .product-card__basket-button .d-counter {
    height: 24px;
    max-width: 106px;
  }
  .product-card__vertical .d-counter__input {
    font-size: 10px;
  }
  .product-card__vertical .product-card__basket-button .d-counter__button-icon {
    color: #757575;
    font-size: 12px;
  }
  .product-card-vertical__buy{
    height: 24px;
    max-height: 24px;
    min-height: 24px;
    min-width: 102px;
    box-shadow: none;
  }
  .product-card-vertical__buy .d-button__text {
    font-size: 12px;
    font-weight: 500;
  }
  .product-card__vertical .product-card__buy-icon {
    font-size: 11px;
  }
  .product-card__vertical .d-button__text {
    gap: 8px;
    font-size: 10px;
  }
  .product-card__vertical .product-card .product-card__count {
    gap: 8px;
  }
  //--- all actions ---//
  .product-card-actions__modal-all h3 {
    font-size: 12px;
    margin-top: -21px;
    margin-bottom: 24px;
  }
  .product-card-actions__modal-all-header {
    grid-template-columns: auto 152px auto;
    gap: 24px;
  }
  .product-card-actions__modal-all .product-card__image-container {
    width: 54px;
    height: 54px;
    min-width: 54px;
    min-height: 54px;
  }
  .product-card-actions__modal-all .product-card__title {
    font-size: 12px;
    max-width: 199px;
  }
  .product-card-actions__modal-all .product-card__info-text {
    width: 190px;
    min-height: 0px;
  }
  .product-card-actions__modal-all .product-card__article {
    font-size: 10px;
  }
  .product-card-actions__modal-all .product-card__seller-image {
    height: 16px;
  }
  .product-card-actions__modal-all .product-card__seller-name {
    font-size: 12px;
    margin-right: 2px;
  }
  .product-card-actions__modal-all .product-card__stat-name, .product-card-actions__modal-all .product-card__stat-description {
    font-size: 9px;
  }
  .product-card-actions__modal-all .product-card__stat-list .product-card__stat-content {
    gap: 4px;
  }
  .product-card-actions__modal-all .product-card__price-value-discounted {
    font-size: 16px;
  }
  .product-card-actions__modal-all .product-card__p, .product-card-actions__modal-all .product-card__count-value, .product-card-actions__modal-all .product-card__count-label {
    font-size: 9px;
    line-height: 11px;
  }
  .product-card-actions__modal-all .product-card__basket-button {
    margin-top: 16px;
  }
  .product-card-actions__modal-all .modal-content {
    max-width: 752px;
  }

  .product-card-actions__modal-all-content .product-card-actions__modal-all-item {
    grid-template-areas:
    "A A A A A   B B B B B  C C C C C C  G G G G"
    "E E E E E   B B B B B  C C C C C C  G G G G";
    grid-template-columns: auto auto;
    gap: 8px 17px;
    padding:8px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-image{
    grid-area: A;
    width: 200px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-action{
    grid-area: B;
    width: 150px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-descr{
    grid-area: C;
    width: 170px;
  }
  .product-card-actions__modal-all-content .product-card__stat-list-cont{
    grid-area: E;
    width: 200px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-href{
    grid-area: G;
    width: 76px;
  }
  .product-card-actions__modal-all-item-image {
    width: 100%;
    height: 100%;
    justify-content: start;
  }
  .product-card-actions__modal-all-item-image img {
    height: 47px;
  }
  .product-card-actions__modal-all-item-action-label {
    font-size: 9px;
    line-height: 12px;
  }
  .product-card-actions__modal-all-item-action-button {
    gap: 8px;
    margin-top: 16px;
    font-size: 9px;
    line-height: 11px;
  }
  .product-card-actions__modal-all-item-descr div {
    margin-top: 16px;
    font-size: 9px;
    line-height: 11px;
  }
  .product-card-actions__modal-all-content .product-card__stat-list {
    font-size: 9px;
    line-height: 11px;
  }
  .product-card-actions__modal-all .product-card__stat-list {
    gap: 8px;
    padding: 12px 8px;
    max-width: 200px;
  }
  .product-card-actions__modal-all .product-card__stat-list .product-card__buy-icon {
    font-size: 13px;
  }
  .product-card-actions__modal-all .product-card-actions__modal-all-item .product-card__stat-list-cont {
    width: 200px;
    max-width: 200px;
  }
  .product-card-actions__modal-all-item-href a, .product-card-actions__modal-all-item-href button{
    width: 100%;
  }
  .product-card-actions__modal-all-content {
    gap: 16px;
    margin-top: 24px;
  }
  .product-card-actions__modal-all-item-href button{
    font-size: 10px;
    height: 24px;
    min-height: 24px;
    max-height: 24px;
  }
  .product-card-actions__modal-all .product-card__stat-description {
    width: fit-content;
  }
  .product-card-actions__modal-all .product-card-vertical__buy .d-button__text {
    font-size: 10px;
  }
  .product-card-actions__modal-all .product-card__buy-icon {
    font-size: 9px;
  }
  .product-card-actions__modal-all .d-button__text {
    gap: 8px;
  }
  .product-card__actions-icon-info, .product-card__actions-icon-auto,  {
    font-size: 16px;
  }
  .product-card__actions-icon-cross {
    font-size: 12px;
  }
  .product-card-actions__modal-all-header-product-info{
    gap: 8px;
  }
  .product-card-actions__modal-all .product-card__seller--active {
    width: calc(100% + 16px);
    top: 0px;
    left: -8px;
    padding: 8px;
  }
  .product-card-actions__modal-all .product-card__basket-button .d-counter__input {
    font-size: 10px;
  }
  .product-card-actions__modal-all .product-card__basket-button .d-counter__button-icon {
    font-size: 10px;
  }
  //---    -----    ---//
  .product-card__vertical .product-card-noactive{
    .product-card__price-value-discounted{
      font-size: 14px;
      width: max-content;
    }
  }
}
@media (width <= 890px) {
    .product-card__vertical .product-card__header,
    .product-card__vertical .product-card__info {
      padding-left: 0px;
    }
    .product-card__vertical .product-card {
      padding-bottom: 16px !important;
    }
    .product-card__vertical .product-card__buy-icon,
    .product-card__vertical .product-card__seller-button {
        display: flex;
    }
    .product-card__vertical .product-card__info-text {
        min-height: 16px;
    }
    .product-card__vertical .product-card__stat-list:before,
    .product-card__vertical .product-card__stat-list:after  {
      display: none;
    }
    .product-card__vertical .product-card__image-container img {
      width: 156px;
    }
    .product-card__vertical .product-card__image-container {
      width: 156px;
    }
    .product-card-actions__modal-all .product-card__buy-icon, .product-card-actions__modal-all-content .product-card__seller-button, .product-card__seller-button {
      display: flex !important;
    }
    
    .product-card__vertical .product-card-noactive{
      .product-card__price-value-discounted{
        margin-top: 0;
      }
    }
    
}
@media (width <=800px) {
  
  .product-card__vertical .product-card__image-container{
    width: 121px;
    min-width: 121px;
    min-height: 89px;
    align-items: start;
  }
  .product-card__vertical .product-card__image-container img{
    width: 121px;
    height: 89px;
    min-width: 121px;
    min-height: 89px;
    max-height: 89px;
  }
  .product-card__vertical .product-card__content-left{
    gap: 8px;
  }
  .products__top-wrapper{
    margin-bottom: 24px;
  }
  .product-item-vertical .products__header {
    margin-bottom: 32px;
  }
  .product-item-vertical {
    margin-bottom: 32px;
  }
  .product-item-vertical .products__image-container {
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
  }
  .product-item-vertical .products__title{
    font-size: 10px;
    line-height: 100%;
  }
  .product-item-vertical .products__stat-label {
    font-size: 8px;
    line-height: 100%;
  }
  .product-item-vertical .products__stat-value {
    font-size: 9px;
    font-weight: 600;
  }
  .product-item-vertical .products__stat{
    flex-direction: column;
    gap: 2px;
    align-items: start;
  }
  .product-item-vertical .product-card__header,
  .product-item-vertical .product-card__info {
    padding-left: 0px;
  }
  .product-card__vertical .product-card__info{
    grid-template-areas:
    "A A A A A   B B B B B B B B B B B   E E E E E E E E"
    "A A A A A   C C C C C C C C C C C   E E E E E E E E"
    "A A A A A   D D D D D D D D D D D   G G G G G G G G";
    gap: 0 16px !important;
    grid-template-rows: auto auto auto;
  }
  .product-card__vertical .product-card__stat-list{
    max-width: 189px;
    min-width: 189px;
  }
  .product-card__vertical .product-card__price-value-discounted {
    font-size: 12px;
  }
  .product-card__vertical .product-card__title {
    font-size: 10px;
    line-height: 12px;
  }
  .product-card__vertical .product-card__article {
    font-size: 10px;
    line-height: 100%;
  }
  .product-card__vertical .product-card__basket-button .d-counter__button-icon {
    font-size: 10px;
  }
  .product-card__stat-icon {
    font-size: 10px;
  }
  .product-card__vertical .product-card__stat {
    min-height: 10px;
  }
  .product-card__vertical .product-card .redder {
    font-size: 8px;
    line-height: 13px;
  }
  .product-card__vertical .product-card .product-card__count {
    margin-top: 8px;
    gap: 8px;
  }
  .product-card__vertical .product-card__count-value-require, .product-card__vertical .product-card__count-value-require span {
    font-size: 8px !important;
  }
  .product-card__vertical .product-card__basket-button .d-counter {
    width: 106px;
  }
    //--- all actions ---//
  .product-card-actions__modal-all h3 {
    font-size: 12px;
    margin-top: -21px;
    margin-bottom: 24px;
  }
  .product-card-actions__modal-all-header {
    grid-template-areas:
    "A A A  B B B B B B"
    "A A A  C C C C C C";
    grid-template-columns: auto auto;
    gap: 0 16px;
  }
  .product-card-actions__modal-all-header-product-info{
    grid-area: A;
  }
  .product-card-actions__modal-all-header .product-card__stat-list-cont{
    grid-area: C;
  }
  .product-card-actions__modal-all-header .product-card__price-container-all{
    grid-area: B;
  }
  .product-card-actions__modal-all .product-card__image-container {
    width: 60px;
    height: 60px;
    min-width: 60px;
    min-height: 60px;
  }
  .product-card-actions__modal-all-header .product-card__stat-list{
    width: 100%;
    max-width: 100%;
    background-color: transparent;
    border-top: 0.5px solid #ededed;
    border-radius: 0;
    display: block;
    padding: 5px 8px;
    margin: 0 0 0 0;
  }
  .product-card__stat-list::after, .product-card__stat-list::before{
    display: none;
  }
  .product-card-actions__modal-all .product-card__stat-list div:first-child {
    margin-right: 8px;
    float: left;
  }
  .product-card-actions__modal-all .product-card__stat-list div {
    height: 14px;
  }
  .product-card-actions__modal-all .product-card__price-container-all {
    margin-bottom: 4px;
    width: 100%;
  }
  .product-card-actions__modal-all .product-card__title {
    font-size: 12px;
  }
  .product-card-actions__modal-all .product-card__article {
    font-size: 10px;
  }
  .product-card-actions__modal-all .product-card__seller-image {
    height: 16px;
  }
  .product-card-actions__modal-all .product-card__seller-name {
    font-size: 12px;
    margin-right: 2px;
  }
  .product-card-actions__modal-all .product-card__stat-name, .product-card-actions__modal-all .product-card__stat-description {
    font-size: 9px;
  }
  .product-card-actions__modal-all .product-card__stat-list .product-card__stat-content {
    gap: 4px;
  }
  .product-card-actions__modal-all .product-card__price-value-discounted {
    font-size: 16px;
  }
  .product-card-actions__modal-all .product-card__p, .product-card-actions__modal-all .product-card__count-value, .product-card-actions__modal-all .product-card__count-label {
    font-size: 9px;
    line-height: 11px;
  }
  .product-card-actions__modal-all .product-card__basket-button {
    margin-top: 16px;
  }
  .product-card-actions__modal-all .modal-content {
    max-width: 632px;
  }

  .product-card-actions__modal-all-content .product-card-actions__modal-all-item {
    grid-template-areas:
    "A A A A A   E E E E   B B B B"
    "C C C C C   C C C C   C C C C"
    "G G G G G   G G G G   G G G G";
    grid-template-columns: auto auto auto;
    gap: 17px 27px;
    padding:8px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-image{
    grid-area: A;
    width: 200px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-action{
    grid-area: B;
    width: 161px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-descr{
    grid-area: C;
    width: 100%;
  }
  .product-card-actions__modal-all-content .product-card__stat-list-cont{
    grid-area: E;
    width: 143px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-href{
    grid-area: G;
    width: 100%;
    justify-content: center;
  }
  .product-card-actions__modal-all-item-image {
    width: 100%;
    height: 100%;
    justify-content: center;
  }
  .product-card-actions__modal-all-item-image img {
    height: 47px;
  }
  .product-card-actions__modal-all-item-action-label {
    font-size: 9px;
    line-height: 12px;
  }
  .product-card-actions__modal-all-item-action-button {
    gap: 8px;
    margin-top: 16px;
    font-size: 9px;
    line-height: 11px;
  }
  .product-card-actions__modal-all-item-descr div {
    margin-top: 16px;
    font-size: 9px;
    line-height: 11px;
  }
  .product-card-actions__modal-all-content .product-card__stat-list {
    font-size: 9px;
    line-height: 11px;
  }
  
  .product-card-actions__modal-all .product-card__stat-list .product-card__buy-icon {
    font-size: 13px;
  }
  .product-card-actions__modal-all .product-card-actions__modal-all-item .product-card__stat-list-cont {
    width: 143px;
    max-width: 143px;
  }
  .product-card-actions__modal-all-item-href a, .product-card-actions__modal-all-item-href button{
    width: 76px;
  }
  
  .product-card-actions__modal-all-content {
    gap: 16px;
    margin-top: 24px;
  }
  .product-card-actions__modal-all-item-href button{
    font-size: 10px;
    height: 24px;
    min-height: 24px;
    max-height: 24px;
  }
  .product-card-actions__modal-all .product-card__stat-description {
    width: fit-content;
  }
  .product-card-actions__modal-all .product-card-vertical__buy .d-button__text {
    font-size: 10px;
  }
  .product-card-actions__modal-all .product-card__buy-icon {
    font-size: 9px;
  }
  .product-card-actions__modal-all .d-button__text {
    gap: 8px;
  }
  .product-card__actions-icon-info, .product-card__actions-icon-auto,  {
    font-size: 16px;
  }
  .product-card__actions-icon-cross {
    font-size: 12px;
  }
  .product-card-actions__modal-all .modal-content {
    padding: 4px 24px 24px 24px;
  }
  .product-card-actions__modal-all-item-action-button,     .product-card-actions__modal-all-item-descr div {
    margin-top: 8px;
  }
  //---    -----    ---//
  .product-card__vertical .product-card-noactive .product-card__price-value-discounted {
    margin-top: 8px;
  }
  .product-card__vertical .product-card-noactive{
    .product-card__price-value-discounted{
      font-size: 12px !important;
    }
  }
}
@media (width <=780px) {
  .product-card__vertical .product-card__stat-list {
    max-width: 170px;
    min-width: 170px;
  }
  .product-card__vertical .product-card__image-container img {
    width: 100px;
    min-width: 100px;
  }
  .product-card__vertical .product-card__image-container {
    width: 100px;
    min-width: 100px;
  }
  .product-card__vertical .product-card__basket-button .d-counter {
    width: auto;
  }
  .product-card-vertical__buy {
    max-width: 102px;
    width: auto;
  }
}
@media (width <=700px) {
  .product-card__vertical .product-card__info{
    display:grid !important;
    grid-template-areas:
    "A A A A A   B B B B B B B B B   E E E E E E"
    "A A A A A   C C C C C C C C C   E E E E E E"
    "G G G G G   C C C C C C C C C   E E E E E E"
    "G G G G G   D D D D D D D D D   E E E E E E";
    gap: 0 16px !important;
    grid-template-rows: auto auto auto auto;
  }
  .product-card__vertical .product-card__stat-cont {
    align-items: center;
    height: 100%;
  }
  .product-card__vertical .product-card__stat-list {
    max-width: 126px;
    min-width: 126px;
    height: 100%;
    justify-content: center;
    background-color: transparent;
  }
  .product-card__vertical .product-card__stat-content {
    flex-direction: column !important;
    gap: 0px;
  }
  .product-card__vertical .product-card__stat {
    align-items: start;
    gap: 4px;
  }
  .product-card__vertical .product-card__stat-name, .product-card__vertical .product-card__stat-description {
    font-size: 6px;
  }
  .product-item-vertical .products__title {
    font-size: 8px;
  }
  .product-item-vertical .products__stat-value, .product-item-vertical .products__stat-value {
    font-size: 7px;
  }
  .product-item-vertical .products__stat-divider {
    margin-left: 8px;
    margin-right: 8px;
  }
  .product-item-vertical .products__header {
    margin-bottom: 24px;
  }
  .product-card__vertical .product-card{
    padding: 8px;
    padding-bottom: 8px !important;
  }
  .product-card__seller--active {
    width: calc(100% + 16px);
    top: -8px;
    left: -8px;
    padding: 8px;
  }
  .product-card__vertical .product-card__seller-image {
    height: 13px;
    margin-right: 4px;
  }
  .product-card__vertical .product-card__seller-name {
    font-size: 8px;
    font-weight: 700;
    margin-right: 0px;
  }
  .product-card__seller-button {
    width: 16px;
    height: 16px;
  }
  .product-card__vertical .product-card__seller-button-icon {
    font-size: 7px;
    font-weight: 800;
  }
  .product-card__seller--active .product-card__seller-info {
    font-size: 8px;
  }
  .product-card__vertical .product-card__image-container {
    width: 104px;
    min-width: 104px;
    min-height: 55px;
    align-items: start;
  }
  .product-card__vertical .product-card__image-container img {
    width: 104px;
    height: 55px;
    min-width: 104px;
    min-height: 55px;
    max-height: 55px;
  }
  .product-card__vertical .product-card .product-card__count {
    max-width: 104px;
    align-items: start;
    justify-content: end;
    padding-bottom: 12px;
  }
  .product-card__vertical .product-card__count-value{
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;
  }
  .product-card__vertical .product-card__count-label, .product-card__vertical .product-card__count-label span, .product-card__vertical .product-card__count-value {
    font-size: 5px;
    line-height: 8px;
    font-weight: 600;
  }
  .product-card__vertical .product-card .redder {
    font-size: 5px;
    line-height: 8px;
    padding: 0;
    border-left: none;
  }
  .product-card__vertical .product-card__count-value span:nth-child(2){
    position: absolute;
    top: 0;
    left: 29px;
    width: max-content;
  }
  .product-card__vertical .product-card .product-card__count-value-require {
    padding: 0;
    background: transparent;
    border-radius: 0px;
    font-size: 6px !important;
    flex-direction: row;
  }
  .product-card__vertical .product-card__count-value-require span {
    font-size: 6px !important;
  }
  .product-card__vertical .product-card .product-card__count {
    margin-top: 8px;
    gap: 4px;
  }
  .product-card-vertical__promo-all {
    font-size: 8px;
    line-height: 10px;
    gap: 4px;
  }
  .product-card-vertical__promo-all .red-badge {
    font-size: 8px;
    font-weight: 600;
    padding: 0px;
    height: 12px;
    min-width: 12px;
  }
  .product-card__vertical .product-card__title {
    font-size: 8px;
    line-height: 10px;
  }
  .product-card__vertical .product-card__article {
    font-size: 7px;
    line-height: 100%;
    margin-top: 4px;
  }
  .product-card__vertical .product-card__basket-button {
    height: 16px;
    flex-direction: row-reverse;
    width: 167px;
  }
  .product-card .product-card__basket-button .d-button {
    margin-left: 0;
    margin-right: 8px;
    height: 16px;
    max-height: 16px;
    min-height: 16px;
    max-width: 80px;
    min-width: 80px;
    width: 80px;
  }
  .product-card__vertical .d-button__text {
    gap: 4px;
    font-size: 8px;
  }
  .product-card__vertical .product-card__buy-icon {
    font-size: 8px;
  }
  .product-card__vertical .product-card__basket-button .d-counter {
    height: 16px;
    max-width: 83px;
  }
  .product-card__vertical .d-counter__input {
    font-size: 8px;
  }
  .product-card__vertical .product-card__basket-button .d-counter__button-icon {
    font-size: 7px;
  }
  .product-card-vertical__promo-all .product-card-vertical__seller-button-icon {
    font-weight: 500;
    font-size: 8px;
  }
      //--- all actions ---//
  .product-card-actions__modal-all h3 {
    font-size: 12px;
    margin-top: -21px;
    margin-bottom: 24px;
  }
  .product-card-actions__modal-all-header {
    grid-template-areas:
    "A A A  B B B B B B"
    "A A A  B B B B B B"
    "C C C  C C C C C C";
    grid-template-columns: auto auto;
    gap: 0 16px;
  }
  .product-card-actions__modal-all-header-product-info{
    grid-area: A;
  }
  .product-card-actions__modal-all-header .product-card__stat-list-cont{
    grid-area: C;
    width: 100%;
  }
  .product-card-actions__modal-all .product-card__stat-list-cont {
    max-width: 100%;
  }
  .product-card-actions__modal-all-header .product-card__price-container-all{
    grid-area: B;
  }
  .product-card-actions__modal-all .product-card__image-container {
    width: 48px;
    height: 48px;
    min-width: 48px;
    min-height: 48px;
  }
  .product-card-actions__modal-all-header .product-card__stat-list{
    display: flex;
    padding: 5px 0px;
    
  }
  .product-card__stat-list::after, .product-card__stat-list::before{
    display: none;
  }
  .product-card-actions__modal-all .product-card__stat-list div:first-child {
    margin-right: 8px;
    float: left;
  }
  .product-card-actions__modal-all .product-card__stat-list div {
    height: 14px;
  }
  .product-card-actions__modal-all .product-card__price-container-all {
    margin-bottom: 4px;
    width: 100%;
  }
  .product-card-actions__modal-all .product-card__title {
    font-size: 9px;
  }
  .product-card-actions__modal-all .product-card__article {
    font-size: 9px;
  }
  .product-card-actions__modal-all .product-card__seller-image {
    height: 16px;
  }
  .product-card-actions__modal-all .product-card__seller-name {
    font-size: 9px;
    margin-right: 2px;
  }
  .product-card-actions__modal-all .product-card__stat-name, .product-card-actions__modal-all .product-card__stat-description {
    font-size: 9px;
  }
  .product-card-actions__modal-all .product-card__stat-list .product-card__stat-content {
    gap: 4px;
  }
  .product-card-actions__modal-all .product-card__price-value-discounted {
    font-size: 12px;
  }
  .product-card-actions__modal-all .product-card__p, .product-card-actions__modal-all .product-card__count-value, .product-card-actions__modal-all .product-card__count-label {
    font-size: 8px;
    line-height: 10px;
  }
  .product-card-actions__modal-all .product-card__basket-button .d-counter {
    height: 16px;
    max-width: 83px;
  }
  .product-card-actions__modal-all .product-card__basket-button .product-card-vertical__buy{
    height: 16px;
    max-height: 16px;
    min-height: 16px;
    max-width: 76px; 
    min-width: 76px;
    padding-inline: 0;
  }
  .product-card-actions__modal-all .product-card__basket-button{
    flex-direction: row-reverse;
  }
  .product-card-actions__modal-all .product-card__basket-button {
    margin-top: 16px;
  }
  .product-card-actions__modal-all .modal-content {
    max-width: 572px;
  }
  .product-card-actions__modal-all .product-card__seller-button-icon {
    font-size: 8px;
  }

  .product-card-actions__modal-all-content .product-card-actions__modal-all-item {
    grid-template-areas:
    "A A A A A   E E E E   B B B B"
    "C C C C C   C C C C   C C C C"
    "G G G G G   G G G G   G G G G";
    grid-template-columns: auto auto auto;
    gap: 17px 27px;
    padding:8px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-image{
    grid-area: A;
    width: 200px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-action{
    grid-area: B;
    width: 161px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-descr{
    grid-area: C;
    width: 100%;
  }
  .product-card-actions__modal-all-content .product-card__stat-list-cont{
    grid-area: E;
    width: 143px;
  }
  .product-card-actions__modal-all-content .product-card-actions__modal-all-item-href{
    grid-area: G;
    width: 100%;
    justify-content: center;
  }
  .product-card-actions__modal-all-item-image {
    width: 100%;
    height: 100%;
    justify-content: center;
  }
  .product-card-actions__modal-all-item-image img {
    height: 47px;
  }
  .product-card-actions__modal-all-item-action-label {
    font-size: 9px;
    line-height: 12px;
  }
  .product-card-actions__modal-all-item-action-button {
    gap: 8px;
    margin-top: 16px;
    font-size: 9px;
    line-height: 11px;
  }
  .product-card-actions__modal-all-item-descr div {
    margin-top: 16px;
    font-size: 9px;
    line-height: 11px;
  }
  .product-card-actions__modal-all-content .product-card__stat-list {
    font-size: 9px;
    line-height: 11px;
  }
  
  .product-card-actions__modal-all .product-card__stat-list .product-card__buy-icon {
    font-size: 13px;
  }
  .product-card-actions__modal-all .product-card-actions__modal-all-item .product-card__stat-list-cont {
    width: 143px;
    max-width: 143px;
  }
  .product-card-actions__modal-all-item-href a, .product-card-actions__modal-all-item-href button{
    width: 76px;
  }
  
  .product-card-actions__modal-all-content {
    gap: 16px;
    margin-top: 24px;
  }
  .product-card-actions__modal-all-item-href button{
    font-size: 10px;
    height: 24px;
    min-height: 24px;
    max-height: 24px;
  }
  .product-card-actions__modal-all .product-card__stat-description {
    width: fit-content;
  }
  .product-card-actions__modal-all .product-card-vertical__buy .d-button__text {
    font-size: 8px;
  }
  .product-card-actions__modal-all .product-card__buy-icon {
    font-size: 8px;
  }
  .product-card-actions__modal-all .d-button__text {
    gap: 4px;
  }
  .product-card__actions-icon-info, .product-card__actions-icon-auto,  {
    font-size: 16px;
  }
  .product-card__actions-icon-cross {
    font-size: 12px;
  }
  .product-card-actions__modal-all .modal-content {
    padding: 4px 24px 24px 24px;
  }
  .product-card-actions__modal-all-item-action-button,     .product-card-actions__modal-all-item-descr div {
    margin-top: 8px;
  }
  //---    -----    ---//
}
@media (width <=600px) {
  .product-item-vertical .products__header {
    flex-direction: column;
    margin-left: 0;
    width: 100%;
    gap: 24px;
    margin-bottom: 64px;
  }
  .product-item-vertical .products__header-left {
    flex-direction: column;
    width: 100%;
    gap: 16px;
    align-items: start;
  }
  .products {
    padding-block: 140px;
  }
  .product-item-vertical .products__image-container {
    width: 100%;
    height: 124px;
    min-width: 100%;
    min-height: 124px;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .product-item-vertical .products__image-container img{
    width: auto;
    height: 124px;
    min-width: auto;
    min-height: 124px;
  }
  .product-item-vertical .products__title {
    font-size: 16px;
    line-height: 18px;
  }
  .product-item-vertical .products__header-right{
    width: 100%;
    justify-content: space-between;
  }
  .product-item-vertical .products__stat {
    flex-direction: column;
    gap: 8px;
    align-items: start;
  }
  .product-item-vertical .products__stat-value, .product-item-vertical .products__stat-value {
    font-size: 14px;
  }
  .product-item-vertical .products__stat-label {
    font-size: 12px;
    line-height: 100%;
  }
  .product-card__vertical .product-card {
    padding: 16px;
    padding-bottom: 16px !important;
  }
  .product-card__vertical .products__list {
    gap: 40px;
  }
  .product-item-vertical .product-card__header{
    height: 20px;
  }
  .product-card__vertical .product-card__seller-image {
    height: 16px;
    margin-right: 9px;
  }
  .product-card__vertical .product-card__seller-name {
    font-size: 14px;
    font-weight: 600;
    margin-right: 8px;
  }
  .product-card__seller--active {
    width: calc(100% + 32px);
    top: -16px;
    left: -16px;
    padding: 16px;
  }
  .product-card__seller--active .product-card__seller-info {
    font-size: 12px;
  }
  .product-card__vertical .product-card__seller, .product-card__vertical .product-card__seller--active-header {
    min-height: 20px;
  }
  .product-card__vertical .product-card__content-left {
    gap: 16px;
  }
  .product-card__vertical     .product-card__info-container {
    background: transparent;
    border-radius: 0;
    margin: 0;
    padding: 0;
  }
  .product-card__vertical .product-card__info {
    display: flex !important;
    gap: 8px !important;
  }
  .product-card__vertical .product-card__image-container{
    width: 100%;
    min-width: 100%;
    min-height: 198px;
    align-items: start;
    margin-bottom: 8px;
  }
  .product-card__vertical .product-card__image-container img{
    width: auto;
    height: 198px;
    min-width: auto;
    min-height: 198px;
    max-height: 198px;
  }
  .product-card__vertical .product-card__price-value-discounted {
    font-size: 20px;
  }
  .product-item-vertical {
    margin-bottom: 64px;
  }
  .product-card-vertical__promo-all {
    font-size: 14px;
    line-height: 16px;
    gap: 4px;
  }
  .product-card-vertical__promo-all .red-badge {
    font-size: 9px;
    font-weight: 600;
    padding: 0px;
    height: 16px;
    min-width: 16px;
  }
  .product-card-vertical__promo-all .product-card-vertical__seller-button-icon {
    font-weight: 500;
    font-size: 11px;
  }
  .product-card__vertical .product-card__price-container {
    padding-bottom: 12px;
    margin-bottom: 0;
  }
  .product-card__vertical .product-card__title {
    font-size: 16px;
    line-height: 24px;
  }
  .product-card__vertical .product-card__article {
    font-size: 12px;
    line-height: 123%;
    margin-top: 7px;
  }
  .product-card__vertical .product-card .product-card__count {
    max-width: 100%;
    align-items: start;
    justify-content: start;
    padding-bottom: 0px;
    margin-top: 8px;
  }
  .product-card__vertical .product-card__info-text {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    padding-bottom: 16px;
    border-bottom: 1px solid #EDEDED;;
  }
  .product-card__vertical .product-card__count-value{
    display: flex;
    flex-direction: row;
    gap: 4px;
    position: relative;
  }
  .product-card__vertical .product-card__count-value span:nth-child(2){
    position: relative;
    left: 0;
  }
  .product-card__vertical .product-card__count-label, .product-card__vertical .product-card__count-label span, .product-card__vertical .product-card__count-value {
    font-size: 12px;
    line-height: 14px;
    font-weight: 600;
  }
  .product-card__vertical .product-card .redder {
    font-size: 12px;
    line-height: 14px;
    padding-left: 12px;
    border-left: none;
  }
  .product-card__vertical .product-card .product-card__count {
    gap: 16px;
  }
  .product-card__vertical .product-card .product-card__count-value-require {
    padding: 4.5px 8px;
    background: #ededed;
    border-radius: 25px;
    font-size: 12px !important;
    flex-direction: row;
  }
  .product-card__vertical .product-card__count-value-require span {
    font-size: 12px !important;
  }
  .product-card__vertical .product-card__stat-cont {
    width: 100%;
    align-items: start;
    padding-top: 16px;
  }
  .product-card__vertical .product-card__stat-list {
    max-width: 100%;
    min-width: 100%;
    height: 100%;
    justify-content: start;
    background-color: #f4f4f4;
    padding: 12px 8px;
  }
  .product-card__vertical .product-card__stat {
    align-items: center;
    gap: 4px;
  }
  .product-card__stat-icon {
    font-size: 12px;
  }
  .product-card__vertical .product-card__stat-content {
    flex-direction: row !important;
    gap: 4px;
  }
  .product-card__vertical .product-card__stat-name, .product-card__vertical .product-card__stat-description {
    font-size: 10px;
  }
  .product-card__vertical .product-card__basket-button {
    height: auto;
    flex-direction: row;
    width: 100%;
    max-width: 100%;
  }
  .product-card__vertical .product-card__basket-button .d-counter {
    height: 32px;
    max-width: 168px;
    width: auto;
  }
  .product-card__vertical .product-card__basket-button .d-counter__button-icon {
    font-size: 12px;
  }
  .product-card__vertical .d-counter__input {
    font-size: 14px;
  }
  .product-card .product-card__basket-button .d-button {
    margin-left: 16px;
    margin-right: 0px;
    height: 32px;
    max-height: 32px;
    min-height: 32px;
    max-width: 168px;
    min-width: 168px;
    width: 168px;
  }
  .product-card__vertical .d-button__text {
    gap: 9.5px;
    font-size: 14px;
  }
  .product-card__vertical .product-card__buy-icon {
    font-size: 13px;
  }
  .product-card__vertical .product-card-noactive .product-card__price-value-discounted {
    font-size: 20px !important;
  }
}
@media (width <=320px) {
  .product-card__vertical   .product-card {
    padding-bottom: 16px !important;
    padding: 16px 24px;
    border-radius: 10px;
    width: calc(36px + 100% + 36px);
    min-width: calc(26px + 100% + 26px);
    max-width: calc(26px + 100% + 26px);
    margin-left: -22px;
  }
  .product-card__seller--active {
    width: calc(100% + 48px);
    top: -16px;
    left: -24px;
    padding: 16px 24px;
  }
  .product-card__price {
    align-self: auto;
    padding-left: 0px !important;
  }
  .product-card__vertical .product-card__price-container {
    height: auto;
  }
  .product-card__vertical .product-card__basket-button {
    margin-top: 16px !important;
  }
  .product-card__vertical .product-card__buy-icon {
    position: relative;
  }
  .product-card .product-card__basket-button .d-button {
    max-width: 131px;
    min-width: 131px;
    width: 131px;
  }
  .product-card__vertical .product-card-noactive .product-card__price-value-discounted {
    font-size: 20px !important;
    text-align: left;
  }
}
</style>
