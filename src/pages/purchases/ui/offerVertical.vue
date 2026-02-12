<template>
  <!--Карточка товара -->
  <div class="product-card" :class="{ 'product-card-noactive': offer.available == 0 }">
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
          <div
            class="product-card__seller--active"
            @click="this.seller_info = false"
            v-if="this.seller_info"
          >
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
              <div
                class="product-card__price"
                v-if="
                  this.$route.name == 'purchasesCatalogComplect' &&
                  offer.min_price?.price_complect > 0
                "
              >
                <p class="product-card__price-value-discounted">
                  от {{ offer.min_price?.price_complect.toLocaleString('ru') }} ₽
                </p>
              </div>
              <div class="product-card__price" v-else>
                <p
                  class="product-card__price-value-discounted"
                  v-if="
                    pricePrefix == true ||
                    (Object.keys(modalActionsData).length == 1 && allOff == true)
                  "
                >
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
                <span v-if="offer.remains_abstract && offer.remains_abstract != offer.available">{{
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
              <div
                class="product-card__count-value product-card__count-value-require"
                v-if="offer.requirement"
              >
                <span class="product-card__count-label"><span>Ваша потребность</span>: </span>
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
                    <p class="product-card__stat-description">
                      за счет {{ offer.payer == 1 ? 'поставщика' : 'покупателя' }}
                    </p>
                  </div>
                  <div class="product-card__stat-content" v-else>
                    <p class="product-card__stat-name">Возможно: доставка</p>
                    <p class="product-card__stat-description">за счет поставщика</p>
                  </div>
                </div>

                <!-- Элемент доп. информации -->
                <div class="product-card__stat">
                  <i class="d-icon-wallet product-card__stat-icon"></i>
                  <div
                    class="product-card__stat-content product-card__stat-content--horizontal"
                    v-if="delayPrefix == ''"
                  >
                    <p class="product-card__stat-name">
                      {{ offer.delay_type == 2 ? 'Под реал.' : 'Отсрочка' }}
                    </p>
                    <p class="product-card__stat-description" v-if="offer.delay">
                      платежа {{ offer.delay }} дней
                    </p>
                    <p class="product-card__stat-description" v-else>Предоплата</p>
                  </div>
                  <div
                    class="product-card__stat-content product-card__stat-content--horizontal"
                    v-else
                  >
                    <p class="product-card__stat-name">Возможно: {{ delayPrefix }}</p>
                    <p class="product-card__stat-description">{{ delayDays }} дней</p>
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
                :min="count_min"
                :max="Number(offer.max)"
                :id="Number(offer.remain_id)"
                :store_id="Number(offer.store_id)"
                :index="Number(offer.remain_id)"
                :value="count"
                :step="step"
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
              <div
                class="product-card__seller--active"
                @click="this.seller_info = false"
                v-if="this.seller_info"
              >
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
            <!-- Элемент доп. информации
                <div class="product-card__stat">
                  <i class="d-icon-truck product-card__stat-icon"></i>
                  <div class="product-card__stat-content">
                    <p class="product-card__stat-name">Доставка</p>
                    <p class="product-card__stat-description">
                      за счет {{ !allOff && activeConflict?.payer == 1 ? 'поставщика' : 'покупателя' }}
                    </p>
                  </div>
                </div>-->

            <!-- Элемент доп. информации
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
                </div>-->
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
                {{
                  allOff == true
                    ? (offer.prices.rrc * count).toLocaleString('ru')
                    : (activeConflict.price * count).toLocaleString('ru')
                }}
                ₽
              </p>
            </div>
          </div>
          <p class="product-card__p">
            {{
              allOff == true || activeConflict.prices.rrc_discount == 0
                ? 'Без скидки от РРЦ'
                : '-' + activeConflict.prices.rrc_discount + '% от РРЦ'
            }}
          </p>
          <p class="product-card__p">
            {{
              allOff == true
                ? offer.prices.rrc.toLocaleString('ru')
                : activeConflict.price.toLocaleString('ru')
            }}
            ₽ цена за ед.
          </p>
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
            <div
              class="product-card__count-value product-card__count-value-require"
              v-if="offer.requirement"
            >
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
              :min="count_min"
              :max="Number(offer.max)"
              :id="Number(offer.remain_id)"
              :store_id="Number(offer.store_id)"
              :index="Number(offer.remain_id)"
              :value="count"
              :step="step"
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
        <div
          class="product-card-actions__modal-all-item"
          v-for="(item, index) in offer.actions"
          :key="index"
        >
          <!-- Баннер -->
          <div class="product-card-actions__modal-all-item-image">
            <img :src="item.image.image" />
          </div>

          <!--Акция включена, Акция выключена, Акция несовместима, Условия акции не выполнены -->
          <div class="product-card-actions__modal-all-item-action">
            <p class="product-card-actions__modal-all-item-action-label">
              <span
                v-if="
                  (item.is_trigger == 1 &&
                    item.enabled == 0 &&
                    !Object.keys(this.mainActionsData).includes(item.action_id)) ||
                  (!this.activeConflict?.actions_ids?.includes(item.action_id) &&
                    !Object.keys(this.mainActionsData).includes(item.action_id)) ||
                  (this.mainActionsData[item.action_id] == true &&
                    Object.keys(this.mainActionsData).length == 1 &&
                    item.is_trigger == 1 &&
                    item.enabled == 0)
                "
                >Условия акции не выполнены:</span
              >
              <span
                v-else-if="
                  (this.activeConflict?.actions_ids?.includes(item.action_id) &&
                    item.is_trigger == 0 &&
                    !Object.keys(this.mainActionsData).includes(item.action_id)) ||
                  (this.activeConflict?.actions_ids?.includes(item.action_id) &&
                    item.is_trigger == 1 &&
                    item.enabled == 1 &&
                    !Object.keys(this.mainActionsData).includes(item.action_id)) ||
                  (this.mainActionsData[item.action_id] == true &&
                    Object.keys(this.mainActionsData).length == 1 &&
                    item.is_trigger == 1 &&
                    item.enabled == 1)
                "
                >Применена автоматически:</span
              >
              <span v-else-if="this.mainActionsData[item.action_id] == true">Акция включена:</span>
              <span v-else-if="this.mainActionsData[item.action_id] == false && !allOff"
                >Акция несовместима:</span
              >
              <span v-else-if="this.mainActionsData[item.action_id] == false && allOff"
                >Акция выключена:</span
              >
            </p>
            <div class="product-card-actions__modal-all-item-action-button">
              <div>
                <div
                  class="d-switch"
                  @click.prevent="checkAction(Number(item.action_id))"
                  v-if="
                    (this.offer.main_actions.includes(Number(item.action_id)) &&
                      item.is_trigger == 0) ||
                    (this.offer.main_actions.includes(Number(item.action_id)) &&
                      item.is_trigger == 1 &&
                      Object.keys(this.mainActionsData).length > 1)
                  "
                >
                  <input
                    type="checkbox"
                    :name="Number(item.action_id)"
                    :id="Number(item.action_id)"
                    binary="true"
                    class="d-switch__input"
                    v-model="mainActionsData[Number(item.action_id)]"
                  />
                  <div class="d-switch__circle">
                    <!--несовместима-->
                    <div
                      class="product-card__actions-icon-info"
                      v-if="this.mainActionsData[item.action_id] == false && !allOff"
                    >
                      !
                    </div>
                  </div>
                </div>
                <!--крест-->
                <i
                  class="d-icon-times product-card__actions-icon-cross"
                  v-else-if="
                    (!this.activeConflict?.actions_ids?.includes(item.action_id) &&
                      !this.offer.main_actions.includes(Number(item.action_id))) ||
                    (item.is_trigger == 1 && item.enabled == 0) ||
                    (this.mainActionsData[item.action_id] == true &&
                      Object.keys(this.mainActionsData).length == 1 &&
                      item.is_trigger == 1 &&
                      item.enabled == 0)
                  "
                ></i>
                <!--галочка-->
                <i
                  class="d-icon-check product-card__actions-icon-auto"
                  v-else-if="
                    (this.activeConflict?.actions_ids?.includes(item.action_id) &&
                      ((item.is_trigger == 1 && item.enabled == 1) || item.is_trigger == 0)) ||
                    (this.mainActionsData[item.action_id] == true &&
                      Object.keys(this.mainActionsData).length == 1 &&
                      item.is_trigger == 1 &&
                      item.enabled == 1)
                  "
                ></i>
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
              <div v-if="item.complect > 0" class="d-category">Комплект</div>
              <div v-if="item.percent_num > 0">
                <i class="d-icon-percent-rounded product-card__buy-icon"></i>Скидка
                {{ item.percent_num }}%
              </div>

              <div v-if="item.payer == 1">
                <i class="d-icon-truck product-card__buy-icon"></i>Бесплатная доставка
              </div>
              <div v-if="item.delay_type == 2 && item.delay > 0">
                <i class="d-icon-box-flat product-card__buy-icon"></i>Под реал. {{ item.delay }}дн.
              </div>
              <div v-if="item.condition_min_sum > 0">
                <span class="product-card__icon-summ product-card__buy-icon">₽</span>
                Мин. сумма - {{ parseInt(item.condition_min_sum) }} ₽
              </div>
              <div v-if="item.condition_SKU > 0">
                <i class="d-icon-box-flat product-card__buy-icon"></i>Мин. кол-во SKU -
                {{ item.condition_SKU }} шт
              </div>
              <div v-if="item.condition_min_count > 0">
                <i class="d-icon-box-flat product-card__buy-icon"></i>Мин. общее кол-во -
                {{ item.condition_min_count }} шт
              </div>
              <div v-if="item.min_count > 1">
                <i class="d-icon-box-flat product-card__buy-icon"></i>Мин. кол-во -
                {{ item.min_count }} шт
              </div>
              <div v-if="item.multiplicity > 1">
                <i class="d-icon-box-flat product-card__buy-icon"></i>Кратность -
                {{ item.multiplicity }} шт
              </div>
              <div v-if="item.integration == 1">
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
              <button
                class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small"
              >
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
      count_min: 1,
      step: 1,
      activeConflict: {},
      colActiveActions: 0,
      colNoActiveActions: 0,
      colNoTriggerActions: 0,
    }
  },
  components: { customModal, Counter },
  emits: ['updateBasket', 'updateCatalog', 'counter'],
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
    if (Object.keys(this.offer).length) {
      this.modalActionsData = this.offer.conflicts

      if (this.modalActionsData && Object.keys(this.modalActionsData).length > 1) {
        let col = Object.keys(this.modalActionsData).length
        let payer = false
        //let active = Object.keys(this.offer.actions).length
        let real = 0
        let delay = 0
        for (var i in this.modalActionsData) {
          if (
            this.modalActionsData[i].active == true ||
            this.modalActionsData[i].price == this.offer.prices.rrc
          ) {
            col--
          }
          let actions = this.modalActionsData[i].actions
          for (var ii in actions) {
            if (actions[ii].payer == 1) {
              payer = true
            }
            if (actions[ii].delay_type == 2) {
              if (Number(actions[ii].delay) > real) {
                real = Number(actions[ii].delay)
              }
            }
            if (actions[ii].delay_type == 1) {
              if (Number(actions[ii].delay) > delay) {
                delay = Number(actions[ii].delay)
              }
            }
          }
        }
        if (col > 0) {
          this.pricePrefix = true
        }
        if (payer == true) {
          this.deliveryPrefix = true
        }
        if (real > 0 || delay > 0) {
          if (real > 0) {
            this.delayPrefix = 'под реализацию'
            this.delayDays = real
          } else {
            this.delayPrefix = 'отсрочка'
            this.delayDays = delay
          }
        }
      }
    }
    if (Object.keys(this.offer).length) {
      for (var ic in this.offer.conflicts) {
        if (this.offer.conflicts[ic].active) {
          this.activeConflict = this.offer.conflicts[ic]
        }
      }
      if (this.activeConflict.actions_ids) {
        let item = JSON.parse(JSON.stringify(this.activeConflict.actions_ids))
        for (var iitem in item) {
          item[iitem] = Number(item[iitem])
        }
        for (var ima in this.offer.main_actions) {
          if (item.includes(Number(this.offer.main_actions[ima]))) {
            this.mainActionsData[this.offer.main_actions[ima]] = true
          } else {
            this.mainActionsData[this.offer.main_actions[ima]] = false
          }
        }

        if (
          Number(this.activeConflict.multiplicity) > Number(this.activeConflict.min_count) &&
          Number(this.activeConflict.multiplicity) > 1
        ) {
          this.count = Number(this.activeConflict.multiplicity)
          this.step = Number(this.activeConflict.multiplicity)
          this.count_min = Number(this.activeConflict.multiplicity)
        } else {
          if (
            Number(this.activeConflict.multiplicity) <= Number(this.activeConflict.min_count) &&
            Number(this.activeConflict.multiplicity) > 1
          ) {
            if (
              !(Number(this.activeConflict.min_count) % Number(this.activeConflict.multiplicity))
            ) {
              this.count = Number(this.activeConflict.min_count)
              this.step = Number(this.activeConflict.multiplicity)
              this.count_min = Number(this.activeConflict.min_count)
            } else {
              this.count =
                Number(this.activeConflict.min_count) +
                Number(this.activeConflict.multiplicity) -
                (Number(this.activeConflict.min_count) % Number(this.activeConflict.multiplicity))
              this.step = Number(this.activeConflict.multiplicity)
              this.count_min = this.count
            }
          } else {
            this.count =
              Number(this.activeConflict.min_count) > 0 ? Number(this.activeConflict.min_count) : 1
            this.step = 1
            this.count_min = this.count
          }
        }

        // потребность

        if (
          this.$route.matched[5] &&
          this.$route.matched[5].name == 'purchasesCatalogRequirement'
        ) {
          if (this.step == 1) {
            this.count_min > Number(this.offer.count)
              ? (this.count = this.count_min)
              : (this.count = Number(this.offer.count))
          } else {
            if (this.count < Number(this.offer.count)) {
              this.count = Number(this.offer.count)
            }
          }
          let obj = { item: this.offer, count: this.count }
          obj.item.data = this.offerData
          this.$emit('counter', obj)
        }
      } else {
        if (
          this.$route.matched[5] &&
          this.$route.matched[5].name == 'purchasesCatalogRequirement'
        ) {
          this.count = Number(this.offer.count)
          let obj = { item: this.offer, count: this.count }
          obj.item.data = this.offerData
          this.$emit('counter', obj)
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
      if (object.value == object.min) {
        this.count = object.value
        if (
          this.$route.matched[5] &&
          this.$route.matched[5].name == 'purchasesCatalogRequirement'
        ) {
          let obj = { item: this.offer, count: this.count }
          obj.item.data = this.offerData
          this.$emit('counter', obj)
        }
        return
      }
      if (object.value > Number(object.max)) {
        this.modal_remain = true
      } else {
        this.count = object.value
        if (
          this.$route.matched[5] &&
          this.$route.matched[5].name == 'purchasesCatalogRequirement'
        ) {
          let obj = { item: this.offer, count: this.count }
          obj.item.data = this.offerData
          this.$emit('counter', obj)
        }
      }
      if (object.value < object.min) {
        this.count = this.count_min
        if (
          this.$route.matched[5] &&
          this.$route.matched[5].name == 'purchasesCatalogRequirement'
        ) {
          let obj = { item: this.offer, count: this.count }
          obj.item.data = this.offerData
          this.$emit('counter', obj)
        }
        return
      }
    },

    addBasket(item, count) {
      if (
        this.modalActionsData &&
        (Object.keys(this.modalActionsData).length > 1 ||
          (Object.keys(this.modalActionsData).length == 1 && this.allOff))
      ) {
        this.modalActions = true
      } else {
        this.loading = true
        let conf = {}
        if (!this.allOff) {
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
        this.basketProductAdd(data).then((response) => {
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
        this.count = this.min_count
      }
    },
    addBasketAllSales(item, count) {
      this.loading = true
      let conf = {}
      if (!this.allOff) {
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
      this.basketProductAdd(data).then((response) => {
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
      if (
        Number(this.activeConflict.multiplicity) > Number(this.activeConflict.min_count) &&
        Number(this.activeConflict.multiplicity) > 1
      ) {
        this.count = Number(this.activeConflict.multiplicity)
        this.step = Number(this.activeConflict.multiplicity)
        this.count_min = Number(this.activeConflict.multiplicity)
      } else {
        if (
          Number(this.activeConflict.multiplicity) <= Number(this.activeConflict.min_count) &&
          Number(this.activeConflict.multiplicity) > 1
        ) {
          if (!(Number(this.activeConflict.min_count) % Number(this.activeConflict.multiplicity))) {
            this.count = Number(this.activeConflict.min_count)
            this.step = Number(this.activeConflict.multiplicity)
            this.count_min = Number(this.activeConflict.min_count)
          } else {
            this.count =
              Number(this.activeConflict.min_count) +
              Number(this.activeConflict.multiplicity) -
              (Number(this.activeConflict.min_count) % Number(this.activeConflict.multiplicity))
            this.step = Number(this.activeConflict.multiplicity)
            this.count_min = this.count
          }
        } else {
          this.count =
            Number(this.activeConflict.min_count) > 0 ? Number(this.activeConflict.min_count) : 1
          this.step = 1
          this.count_min = this.count
        }
      }
      // потребность
      if (this.$route.matched[5] && this.$route.matched[5].name == 'purchasesCatalogRequirement') {
        if (this.step == 1) {
          this.count_min > Number(this.offer.count)
            ? (this.count = this.count_min)
            : (this.count = Number(this.offer.count))
        } else {
          this.count < Number(this.offer.count) ? (this.count = Number(this.offer.count)) : ''
        }
        let obj = { item: this.offer, count: this.count }
        obj.item.data = this.offerData
        this.$emit('counter', obj)
      }
    },
    checkAction(ind) {
      if (this.mainActionsData[ind]) {
        this.mainActionsData[ind] = false
        this.allOff = true
        // потребность
        if (
          this.$route.matched[5] &&
          this.$route.matched[5].name == 'purchasesCatalogRequirement'
        ) {
          this.count = Number(this.offer.count)
          let obj = { item: this.offer, count: this.count }
          obj.item.data = this.offerData
          this.$emit('counter', obj)
        } else {
          this.count = 1
        }
        this.activeConflict = {}
      } else {
        for (var ii in this.mainActionsData) {
          if (ii == ind) {
            this.mainActionsData[ii] = true
            this.allOff = false
            // выставляем новый активный конфликт
            for (var ic in this.offer.conflicts) {
              if (this.offer.conflicts[ic] !== undefined) {
                if (this.offer.conflicts[ic].actions_ids.includes(ii)) {
                  this.activeConflict = this.offer.conflicts[ic]

                  if (
                    Number(this.activeConflict.multiplicity) >
                      Number(this.activeConflict.min_count) &&
                    Number(this.activeConflict.multiplicity) > 1
                  ) {
                    this.count = Number(this.activeConflict.multiplicity)
                    this.step = Number(this.activeConflict.multiplicity)
                    this.count_min = Number(this.activeConflict.multiplicity)
                  } else {
                    if (
                      Number(this.activeConflict.multiplicity) <=
                        Number(this.activeConflict.min_count) &&
                      Number(this.activeConflict.multiplicity) > 1
                    ) {
                      if (
                        !(
                          Number(this.activeConflict.min_count) %
                          Number(this.activeConflict.multiplicity)
                        )
                      ) {
                        this.count = Number(this.activeConflict.min_count)
                        this.step = Number(this.activeConflict.multiplicity)
                        this.count_min = Number(this.activeConflict.min_count)
                      } else {
                        this.count =
                          Number(this.activeConflict.min_count) +
                          Number(this.activeConflict.multiplicity) -
                          (Number(this.activeConflict.min_count) %
                            Number(this.activeConflict.multiplicity))
                        this.step = Number(this.activeConflict.multiplicity)
                        this.count_min = this.count
                      }
                    } else {
                      this.count =
                        Number(this.activeConflict.min_count) > 0
                          ? Number(this.activeConflict.min_count)
                          : 1
                      this.step = 1
                      this.count_min = this.count
                    }
                  }
                  // потребность
                  if (
                    this.$route.matched[5] &&
                    this.$route.matched[5].name == 'purchasesCatalogRequirement'
                  ) {
                    if (this.step == 1) {
                      this.count_min > Number(this.offer.count)
                        ? (this.count = this.count_min)
                        : (this.count = Number(this.offer.count))
                    } else {
                      this.count < Number(this.offer.count)
                        ? (this.count = Number(this.offer.count))
                        : ''
                    }
                    let obj = { item: this.offer, count: this.count }
                    obj.item.data = this.offerData
                    this.$emit('counter', obj)
                  }
                }
              }
            }
          } else {
            this.mainActionsData[ii] = false
          }
        }
      }
    },
  },
  watch: {
    offer: function (newVal) {
      this.modalActionsData = newVal.conflicts
    },
    modalActions: function (newVal) {
      if (newVal == false) {
        if (!this.allOff) {
          if (
            Number(this.activeConflict.multiplicity) <= 1 ||
            Number(this.activeConflict.min_count) <= 1
          ) {
            // потребность
            if (
              this.$route.matched[5] &&
              this.$route.matched[5].name == 'purchasesCatalogRequirement'
            ) {
              this.count = Number(this.offer.count)
              let obj = { item: this.offer, count: this.count }
              obj.item.data = this.offerData
              this.$emit('counter', obj)
            } else {
              this.count = 1
            }
          }
        } else {
          // потребность
          if (
            this.$route.matched[5] &&
            this.$route.matched[5].name == 'purchasesCatalogRequirement'
          ) {
            this.count = Number(this.offer.count)
            let obj = { item: this.offer, count: this.count }
            obj.item.data = this.offerData
            this.$emit('counter', obj)
          } else {
            this.count = 1
          }
        }
      }
    },
  },
}
</script>

<style lang="scss"></style>
