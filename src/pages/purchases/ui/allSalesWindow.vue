<template>
  <h3>Разрешите конфликты акций</h3>
  <!--Шапка модального окна акций -->
  <Loader v-if="loading" />
  <div v-else>
    <div
      v-for="(item, remain_id) in offers"
      :key="remain_id"
      class="product-card-actions__modal-all-header-product-container"
    >
      <div class="product-card-actions__modal-all-header">
        <div class="product-card-actions__modal-all-header-product-info">
          <!-- Изображение товара -->
          <div class="product-card__image-container">
            <img
              :src="item.item?.data?.image"
              :alt="item.item?.data?.pagetitle"
              class="product-card__image"
            />
          </div>

          <div class="product-card__info-text-container">
            <!-- Название и артикул товара -->
            <div class="product-card__info-text">
              <p class="product-card__title">
                {{ item.item?.data?.pagetitle }}
              </p>
              <p class="product-card__article">Арт: {{ item.item.article }}</p>
            </div>
            <!-- Продавец -->
            <div class="product-card__seller-cont">
              <div class="product-card__seller" @click="this.seller_info[remain_id] = true">
                <img
                  :src="item.item.store_image"
                  :alt="item.item.org.name"
                  class="product-card__seller-image"
                  v-if="item.item.store_image"
                />
                <p class="product-card__seller-name">{{ item.item.org.name }}</p>
                <button class="product-card__seller-button">
                  <i class="d-icon-angle-rounded-bottom product-card__seller-button-icon"></i>
                </button>
              </div>
              <div
                class="product-card__seller--active"
                @click="this.seller_info[remain_id] = false"
                v-if="this.seller_info[remain_id]"
              >
                <div class="product-card__seller--active-header">
                  <img
                    :src="item.item.store_image"
                    :alt="item.item.org.name"
                    class="product-card__seller-image"
                    v-if="item.item.store_image"
                  />
                  <p class="product-card__seller-name">{{ item.item.org.name }}</p>
                  <button class="product-card__seller-button">
                    <i class="d-icon-angle-rounded-bottom product-card__seller-button-icon"></i>
                  </button>
                </div>
                <p class="product-card__seller-info">
                  {{ item.item.org_fullname }} ИНН {{ item.item.org_inn ? item.item.org_inn : '-' }}
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
                  {{ item.item.delivery }} дн. ({{
                    new Date(item.item.delivery_day).toLocaleString('ru', {
                      month: '2-digit',
                      day: '2-digit',
                      year: '2-digit',
                    })
                  }})
                </p>
                <p class="product-card__stat-description">{{ item.item.store_city }}</p>
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
                {{
                  (
                    activeConflict[remain_id]?.prices.price * counts[remain_id].count
                  ).toLocaleString('ru')
                }}
                ₽
              </p>
            </div>
          </div>
          <p class="product-card__p">
            {{
              activeConflict[remain_id].prices.discount_percent > 0
                ? '-' + activeConflict[remain_id]?.prices.discount_percent + '% от РРЦ'
                : '+' + activeConflict[remain_id]?.prices.discount_percent * -1 + '% от РРЦ'
            }}
          </p>
          <p class="product-card__p">
            {{ activeConflict[remain_id]?.prices.price.toLocaleString('ru') }}
            ₽ цена за ед.
          </p>
          <!-- Количество -->
          <div class="product-card__count">
            <div class="product-card__count-value">
              <span class="product-card__count-label"
                >В наличии:
                <span v-if="item.item.remains_abstract != item.item.available">{{
                  item.item.remains_abstract
                }}</span>
                <span v-else>{{ item.item.available }} шт</span></span
              >
              <div v-if="item.item.requirement" class="redder">
                <span v-if="Number(item.item.requirement.count) > Number(item.item.available)"
                  >Не хватает
                  {{ Number(item.item.requirement.count) - Number(item.item.available) }} шт.</span
                >
              </div>
            </div>
            <div
              class="d-divider d-divider--vertical product-card__count-divider"
              v-if="item.item.requirement"
            ></div>
            <div
              class="product-card__count-value product-card__count-value-require"
              v-if="item.item.requirement"
            >
              <span class="product-card__count-label">Потребность: </span>
              {{ Number(item.item.requirement.count) }} шт
            </div>
          </div>
          <!-- Купить -->
          <div
            class="product-card__basket-button"
            v-if="!item.item.requirement || (item.item.requirement && item.item.available > 0)"
            :class="{
              'loading-counter': this.loading,
            }"
          >
            <Counter
              @ElemCount="ElemCount"
              :min="counts[remain_id].count_min"
              :max="Number(item.item.max)"
              :id="Number(remain_id)"
              :store_id="Number(item.item.store_id)"
              :index="Number(remain_id)"
              :value="counts[remain_id].count"
              :step="counts[remain_id].step"
              :item="item.item"
              :key="new Date().getTime() + '_' + Number(remain_id)"
            />
            <!-- <button
            class="d-button d-button-primary d-button-primary-small d-button--sm-shadow product-card-vertical__buy"
            :class="{ 'd-button--loading': this.loading }"
            @click.prevent="addBasketAllSales(item, counts[remain_id].count)"
          >
            <div class="d-button__text">
              <i class="d-icon-cart product-card__buy-icon"></i>
              В корзину
            </div>
          </button> -->
          </div>
        </div>
      </div>

      <!-- Список акций -->
      <div class="product-card-actions__modal-all-content" v-if="this.activeConflict[remain_id]">
        <div
          class="product-card-actions__modal-all-item"
          v-for="(sale, index) in item.item.actions"
          :key="index"
        >
          <!-- Баннер -->
          <div class="product-card-actions__modal-all-item-image">
            <img :src="sale.image.image" />
          </div>

          <!--Акция включена, Акция выключена, Акция несовместима, Условия акции не выполнены -->
          <div class="product-card-actions__modal-all-item-action">
            <p class="product-card-actions__modal-all-item-action-label">
              <span v-if="sale.is_trigger == 1 && sale.enabled == 0"
                >Условия акции не выполнены:</span
              >

              <span
                v-else-if="
                  !this.activeConflict[remain_id]?.incompatibility.includes(
                    Number(sale.action_id),
                  ) &&
                  this.activeConflict[remain_id]?.action_ids &&
                  (this.activeConflict[remain_id]?.action_ids.includes(Number(sale.action_id)) ||
                    this.activeConflict[remain_id]?.action_ids.includes(sale.action_id)) &&
                  ((sale.is_trigger == 1 && sale.enabled == 1) || sale.is_trigger == 0) &&
                  Number(this.active_index[remain_id]) != Number(sale.action_id)
                "
                >Применена автоматически:</span
              >
              <span v-else-if="Number(this.active_index[remain_id]) == Number(sale.action_id)"
                >Акция включена:</span
              >
              <span
                v-else-if="
                  this.activeConflict[remain_id].incompatibility.includes(Number(sale.action_id)) &&
                  !allOff[remain_id]
                "
                >Акция несовместима:</span
              >
              <!-- <span v-else-if="allOff[remain_id]">Акция выключена:</span> -->
            </p>
            <div class="product-card-actions__modal-all-item-action-button">
              <div>
                <div
                  class="d-switch"
                  @click.prevent="checkAction(Number(sale.action_id), remain_id)"
                  v-if="
                    this.activeConflict[remain_id].incompatibility.includes(Number(sale.action_id))
                  "
                >
                  <input
                    type="checkbox"
                    :name="Number(sale.action_id)"
                    :id="Number(sale.action_id)"
                    binary="true"
                    class="d-switch__input"
                  />
                  <div class="d-switch__circle">
                    <!--несовместима-->
                    <div
                      class="product-card__actions-icon-info"
                      v-if="
                        this.activeConflict[remain_id].incompatibility.includes(
                          Number(sale.action_id),
                        ) && !allOff[remain_id]
                      "
                    >
                      !
                    </div>
                  </div>
                </div>
                <!--крест-->
                <i
                  class="d-icon-times product-card__actions-icon-cross"
                  v-else-if="sale.is_trigger == 1 && sale.enabled == 0"
                ></i>
                <!--галочка-->
                <i
                  class="d-icon-check product-card__actions-icon-auto"
                  v-else-if="
                    (this.activeConflict[remain_id].action_ids.includes(Number(sale.action_id)) &&
                      sale.is_trigger == 1 &&
                      sale.enabled == 1) ||
                    sale.is_trigger == 0 ||
                    this.active_index[remain_id] == sale.action_id
                  "
                ></i>
              </div>
              <p>
                {{ sale.action_id }} ----
                {{ sale.name }}
              </p>
            </div>
          </div>

          <!-- Описание -->
          <div class="product-card-actions__modal-all-item-descr">
            <p class="product-card-actions__modal-all-item-action-label">Описание:</p>
            <div v-html="sale.description"></div>
          </div>

          <!-- Дополнительная информация -->
          <div class="product-card__stat-list-cont">
            <div class="product-card__stat-list">
              <div v-if="sale.complect > 0" class="d-category">Комплект</div>
              <div v-if="sale.prices.discount_percent != 0">
                <i class="d-icon-percent-rounded product-card__buy-icon"></i
                ><span v-if="sale.prices.pricing_type == 1">Наценка</span
                ><span v-else>Скидка</span> {{ Math.abs(sale.prices.discount_percent) }}%
              </div>
              <div v-if="sale.payer == 2">
                <i class="d-icon-truck product-card__buy-icon"></i>Доставка по согласованию
              </div>

              <div v-if="sale.payer == 1">
                <i class="d-icon-truck product-card__buy-icon"></i>Бесплатная доставка
              </div>
              <div v-if="sale.delay_type == 2 && sale.delay > 0">
                <i class="d-icon-box-flat product-card__buy-icon"></i>Под реал. {{ sale.delay }}дн.
              </div>
              <div v-if="sale.condition_min_sum > 0">
                <span class="product-card__icon-summ product-card__buy-icon">₽</span>
                Мин. сумма - {{ parseInt(sale.condition_min_sum).toLocaleString('ru') }} ₽
              </div>
              <div v-if="sale.condition_SKU > 0">
                <i class="d-icon-box-flat product-card__buy-icon"></i>Мин. кол-во SKU -
                {{ sale.condition_SKU }} шт
              </div>
              <div v-if="sale.condition_min_count > 0">
                <i class="d-icon-box-flat product-card__buy-icon"></i>Мин. общее кол-во -
                {{ sale.condition_min_count }} шт
              </div>
              <div v-if="sale.min_count > 1">
                <i class="d-icon-box-flat product-card__buy-icon"></i>Мин. кол-во -
                {{ sale.min_count }} шт
              </div>
              <div v-if="sale.multiplicity > 1">
                <i class="d-icon-box-flat product-card__buy-icon"></i>Кратность -
                {{ sale.multiplicity }} шт
              </div>
              <div v-if="sale.integration == 1">
                <i class="d-icon-shuffle product-card__buy-icon"></i>Интеграция с МС
              </div>
              <div v-if="item.condition_orders > 0">
                <i class="d-icon-cart product-card__buy-icon"></i>На
                {{ item.condition_orders }} заказов
              </div>
            </div>
          </div>

          <!-- Кнопка подробнее -->
          <div class="product-card-actions__modal-all-item-href">
            <router-link
              target="_blank"
              :to="{
                name: 'purchasesAction',
                params: { action_id: sale.action_id },
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
    </div>
  </div>
  <div class="product-card-actions__modal-all-buttons">
    <button
      type="button"
      href="#"
      class="d-button d-button-primary d-button-primary-small d-button--sm-shadow product-card-vertical__buy-cancel product-card-vertical__buy"
      @click.prevent="this.$emit('windowClose')"
    >
      <div class="d-button__text">Отмена</div>
    </button>
    <button
      @click.prevent="addBasketAll()"
      class="d-button d-button-primary d-button-primary-small d-button--sm-shadow product-card-vertical__buy"
    >
      <div class="d-button__text">
        <i class="d-icon-cart product-card__buy-icon"></i>
        В корзину
      </div>
    </button>
  </div>
  <customModal v-model="this.modalAll" class="product-card-actions__modal-all-confirm">
    <h3>Конфликт акций</h3>
    <p>Применить акцию "{{ editNow.name }}" ко всем товарам?</p>
    <div class="product-card-actions__modal-all-buttons">
      <button
        type="button"
        href="#"
        class="d-button d-button-primary d-button-primary-small d-button--sm-shadow product-card-vertical__buy-cancel product-card-vertical__buy"
        @click.prevent="checkAll()"
      >
        <div class="d-button__text">Применить ко всем</div>
      </button>
      <button
        @click.prevent="(checkOne(editNow.action_id, editNow.remain_id), (this.modalAll = false))"
        class="d-button d-button-primary d-button-primary-small d-button--sm-shadow product-card-vertical__buy"
      >
        <div class="d-button__text">Применить к одному</div>
      </button>
    </div>
  </customModal>
  <customModal
    v-model="this.modalAfterComplect"
    class="product-card-actions__modal-all product-card-actions__modal-all-buy_all"
  >
    <simpleSalesWindow
      :all_offers="afterComplect"
      @close="((afterComplect = {}), (modalAfterComplect = false), (saveData = {}))"
      @select="addBasketAfterComplect"
    />
  </customModal>
</template>

<script>
import { toRaw } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import Counter from '@/shared/ui/CounterNoAdd.vue'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import simpleSalesWindow from './simpleSalesWindow.vue'

export default {
  name: 'allSalesWindow',
  data() {
    return {
      loading: true,
      seller_info: {},
      modalActionsData: {},
      mainActionsData: {},
      allOff: {},
      counts: {},
      activeConflict: {},
      editNow: {},
      modalAll: false,
      actionsRemains: {},
      checked: {},

      errors: '',
      afterComplect: {},
      modalAfterComplect: false,
      saveData: {},
      active_index: {},
    }
  },
  emits: ['windowClose', 'updateCatalog', 'updateBasket', 'toggleOrder', 'toggleOrderOffer'],
  components: { Counter, Loader, customModal, simpleSalesWindow },
  props: {
    offers: {
      type: Object,
      default: () => {
        return {}
      },
    },
    noconflicts: {
      type: Object,
      default: () => {
        return {}
      },
    },
    complect: {
      type: Object,
      default: () => {
        return {}
      },
    },
    complects_avalable: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    if (this.addAllBeforeWindow == true) {
      this.addBasketAll()
    }
    this.setValues().then(() => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      basketOfferWarehouse: 'offer/basketOfferWarehouse',
    }),
  },
  methods: {
    ...mapActions({
      basketProductAdd: 'basket/basketProductAdd',
      basketOfferProductAdd: 'offer/basketOfferProductAdd',
      basketProductAddAll: 'basket/basketProductAddAll',
    }),
    async setValues() {
      if (Object.keys(this.offers).length) {
        for (var r_id in this.offers) {
          // собираем конфликты
          this.modalActionsData[r_id] = this.offers[r_id].item.actions
          // выставляем активный конфликт
          let data = {}
          for (var action_item in this.offers[r_id].item.actions) {
            // console.log(this.offer.actions[action_item])
            if (this.offers[r_id].item.actions[action_item].relations?.active) {
              this.activeConflict[r_id] = this.offers[r_id].item.actions[action_item].relations
              this.active_index[r_id] = Number(this.activeConflict[r_id].action_ids[0])
            }
            // собираем массив акций и устанавливаем их активными или неактивными
            if (
              !Object.prototype.hasOwnProperty.call(
                data,
                this.offers[r_id].item.actions[action_item].action_id,
              )
            ) {
              data[this.offers[r_id].item.actions[action_item].action_id] = Boolean(
                this.offers[r_id].item.actions[action_item].relations.active,
              )
            }
          }
          this.mainActionsData[r_id] = data
          // проставляем состояние окошка информации о продавце
          this.seller_info[r_id] = false
          // проставляем количество из каунтеров в данный момент
          this.counts[r_id] = { count: this.offers[r_id].count }
          // проставляем состояние переключателей (все НЕ выключены)
          this.allOff[r_id] = false

          // формируем массив action_id: remain_ids
          let mains = this.mainActionsData[r_id]
          for (var act in mains) {
            if (!this.actionsRemains[act]) {
              this.actionsRemains[act] = r_id
            } else {
              this.actionsRemains[act] = this.actionsRemains[act] + '/' + r_id
            }
          }
          //формируем массив продуктов с отмеченными акциями
          this.checked[r_id] = true
          //устанавливаем минимальное количество, количество и кратность в зависимости от того, какая акция выбрана
          if (
            Number(this.activeConflict[r_id].multiplicity) >
              Number(this.activeConflict[r_id].min_count) &&
            Number(this.activeConflict[r_id].multiplicity) > 1
          ) {
            this.counts[r_id].count = Number(this.activeConflict[r_id].multiplicity)
            this.counts[r_id].step = Number(this.activeConflict[r_id].multiplicity)
            this.counts[r_id].count_min = Number(this.activeConflict[r_id].multiplicity)
          } else {
            if (
              Number(this.activeConflict[r_id].multiplicity) <=
                Number(this.activeConflict[r_id].min_count) &&
              Number(this.activeConflict[r_id].multiplicity) > 1
            ) {
              if (
                !(
                  Number(this.activeConflict[r_id].min_count) %
                  Number(this.activeConflict[r_id].multiplicity)
                )
              ) {
                this.counts[r_id].count = Number(this.activeConflict[r_id].min_count)
                this.counts[r_id].step = Number(this.activeConflict[r_id].multiplicity)
                this.counts[r_id].count_min = Number(this.activeConflict[r_id].min_count)
              } else {
                this.counts[r_id].count =
                  Number(this.activeConflict[r_id].min_count) +
                  Number(this.activeConflict[r_id].multiplicity) -
                  (Number(this.activeConflict[r_id].min_count) %
                    Number(this.activeConflict[r_id].multiplicity))
                this.counts[r_id].step = Number(this.activeConflict[r_id].multiplicity)
                this.counts[r_id].count_min = this.counts[r_id].count
              }
            } else {
              this.counts[r_id].count =
                Number(this.activeConflict[r_id].min_count) > 0
                  ? Number(this.activeConflict[r_id].min_count)
                  : 1
              this.counts[r_id].step = 1
              this.counts[r_id].count_min = this.counts[r_id].count
            }
          }
          // потребность
          if (
            this.$route.matched[5] &&
            (this.$route.name == 'purchasesCatalogRequirement' ||
              this.$route.name == 'purchasesOfferCatalogRequirement' ||
              this.$route.name == 'purchasesCatalogComplect')
          ) {
            if (this.counts[r_id].step == 1) {
              this.counts[r_id].count_min > Number(this.offers[r_id].count)
                ? (this.counts[r_id].count = this.counts[r_id].count_min)
                : (this.counts[r_id].count = Number(this.offers[r_id].count))
            } else {
              if (this.counts[r_id].count < Number(this.offers[r_id].count)) {
                this.counts[r_id].count = Number(this.offers[r_id].count)
              }
            }
          }
        }
      }
    },
    ElemCount(object) {
      console.log(object)
      let r_id = object.id
      if (object.value == object.min) {
        this.counts[r_id].count = object.value
        return
      }
      if (object.value > Number(object.max)) {
        this.modal_remain = true
      } else {
        this.counts[r_id].count = object.value
      }
      if (object.value < object.min) {
        this.counts[r_id].count = this.counts[r_id].count_min
        return
      }
    },
    addBasketAll() {
      this.loading = true
      this.errors = ''
      this.afterComplect = {}
      // проверяем, все ли товары хотят положить в корзину с нашей акцией c комплектом
      // if(this.$route.matched[5].name == 'purchasesCatalogComplect'){

      //   let col_complect = Object.keys(this.complect).length

      //   for(var k in this.offers){
      //     if(this.activeConflict[k].actions_ids.includes(this.$route.params.action_id)){
      //       col_complect--
      //     }
      //   }
      //   if (this.noconflicts.length) {
      //     for (var rem_id in this.noconflicts) {
      //       if(this.noconflicts[rem_id].item.conflicts && this.noconflicts[rem_id].item.conflicts[0].actions_ids.includes(this.$route.params.action_id)){
      //         col_complect--
      //       }
      //     }
      //   }
      //     // если все товары есть в наличии и все кладут с акцией с комплектом, нужнo проверить, какие товары кладутся
      //   // свыше указанного количества в комплекте

      //   if(col_complect == 0 && this.complects_avalable > 0){
      //     // проверяем, сколько комплектов кладет пользователь
      //     let cols_offers = {}
      //     for(var r_id in this.offers){
      //       cols_offers[r_id] = parseInt(this.counts[r_id].count / this.complect[r_id])
      //     }
      //     if (this.noconflicts.length) {
      //       for (var r_id in this.noconflicts) {
      //         cols_offers[r_id] = parseInt(this.noconflicts[r_id].count / this.complect[r_id])
      //       }
      //     }
      //     //по всем товарам выбираем минимальное количество комплектов
      //       let min = Math.min.apply(null, Object.keys(cols_offers).map(function ( key ) { return cols_offers[key]; }))
      //       if(min > this.complects_avalable){
      //         min = this.complects_avalable
      //       }
      //       console.log(min)
      //       //формируем массив товаров, которые кладем в корзину с другими акциями
      //       for(var r_id in this.offers){
      //         if(this.complect[r_id] * min < this.counts[r_id].count){
      //           this.afterComplect[r_id] = this.offers[r_id]
      //           this.afterComplect[r_id].count = this.counts[r_id].count - this.complect[r_id] * min
      //         }
      //       }
      //       if (this.noconflicts.length) {
      //         for(var r_id in this.noconflicts){
      //           if(this.complect[r_id] * min < this.noconflicts[r_id].count){
      //             this.afterComplect[r_id] = this.noconflicts[r_id]
      //             this.afterComplect[r_id].count = this.noconflicts[r_id].count - this.complect[r_id] * min
      //           }
      //         }
      //       }
      //   }
      // }

      let data = {}
      if (Object.keys(this.offers).length) {
        for (var r_id in this.offers) {
          let conf = {}
          let item = this.offers[r_id].item

          conf = this.activeConflict[r_id]

          item.price = conf.price
          item.payer = conf.payer ? conf.payer : 0
          item.delay = conf.delay ? conf.delay : 0
          item.delay_type = conf.delay_type ? conf.delay_type : 1

          // let col = 0
          // if(this.afterComplect.length && r_id in this.afterComplect){
          //   col = this.counts[r_id].count - this.afterComplect[r_id].count
          // }else{
          let col = this.counts[r_id].count
          //}
          data[r_id] = {
            org_id: item.org_id,
            store_id: item.store_id,
            id_remain: r_id,
            count: col,
            key: item.key,
            actions: conf.action_ids,
            cart_store: this.basketOfferWarehouse,
          }
        }
      }
      console.log(this.noconflicts)
      if (Object.keys(this.noconflicts).length) {
        for (r_id in this.noconflicts) {
          let conf = {}
          if (this.noconflicts[r_id].count > 0) {
            //let conf = {}
            let item = toRaw(this.noconflicts[r_id].item)
            // console.log(item.actions)
            let actions = item.actions
            console.log(actions.length)
            if (Object.keys(actions).length) {
              for (var action_item in actions) {
                if (actions[action_item].relations?.active) {
                  conf = actions[action_item].relations
                }
              }
              // console.log(conf)
              item.price = conf.price
              item.payer = conf.payer ? conf.payer : 0
              item.delay = conf.delay ? conf.delay : 0
              item.delay_type = conf.delay_type ? conf.delay_type : 1
            } else {
              // console.log(this.noconflicts[r_id].item)
            }
            // let col = 0
            // if(this.afterComplect.length && r_id in this.afterComplect){
            //   col = this.noconflicts[r_id].count - this.afterComplect[r_id].count
            // }else{
            let col = this.noconflicts[r_id].count
            //}
            data[r_id] = {
              org_id: item.org_id,
              store_id: item.store_id,
              id_remain: r_id,
              count: col,
              key: item.key,
              actions: conf.action_ids,
              cart_store: this.basketOfferWarehouse,
            }
          }
        }
      }

      //if(!Object.keys(this.afterComplect).length){
      //console.log(data)
      // this.addBasketOne(data).then(() => {
      //   setTimeout(() => {
      //     this.afterAddBasket()
      //   }, 500)
      // })
      // }else{
      //   this.loading = false
      //   this.saveData = data
      //   this.modalAfterComplect = true
      // }
      //this.$emit('windowClose')
      console.log(data)
      this.basketProductAddAll({ items: data, cart_store: this.basketOfferWarehouse }).then(
        (res) => {
          if (res.data) {
            this.errors = res.data.data
            if (this.errors == '') {
              this.$toast.add({
                severity: 'success',
                summary: 'Выполнено!',
                detail: 'Товары добавлены в корзину',
                life: 3000,
              })
            } else {
              this.$toast.add({
                severity: 'secondary',
                summary: 'Товары добавлены в корзину!',
                detail: this.errors,
                life: 3000,
              })
            }
            // if (this.$route.name == 'purchasesCatalogRequirement') {
            //   this.$emit('toggleOrder')
            // }
            // if (this.$route.name == 'purchasesOfferCatalogRequirement') {
            //   this.$emit('toggleOrderOffer')
            // }

            // this.loading = false
            // this.updateCatalog()
            // this.updateBasket()
            this.afterAddBasket()
          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: 'Не удалось положить товары в корзину',
              life: 3000,
            })
            this.loading = false
            this.updateCatalog()
            this.updateBasket()
            this.$emit('windowClose')
          }
        },
      )
    },
    addBasketAfterComplect(data) {
      this.loading = true
      this.addBasketOne(this.saveData).then(() => {
        this.addBasketOne(data).then(() => {
          setTimeout(() => {
            this.afterAddBasket()
          }, 500)
        })
      })
    },
    afterAddBasket() {
      // if (this.errors == '') {
      //   this.$toast.add({
      //     severity: 'success',
      //     summary: 'Выполнено',
      //     detail: 'Товары добавлены в корзину',
      //     life: 3000,
      //   })
      // } else {
      //   this.$toast.add({
      //     severity: 'error',
      //     summary: 'Ошибка',
      //     detail: 'Не все товары были добавлены в корзину: ' + this.errors,
      //     life: 3000,
      //   })
      // }
      this.loading = false

      this.$emit('updateCatalog')
      this.$emit('updateBasket')

      if (this.$route.name == 'purchasesCatalogRequirement') {
        this.$emit('toggleOrder')
      }
      if (this.$route.name == 'purchasesOfferCatalogRequirement') {
        this.$emit('toggleOrderOffer')
      }
      this.$emit('windowClose')
    },
    async addBasketOne(data) {
      for (var r_id in data) {
        if (this.$route.name == 'purchasesOfferCatalogRequirement') {
          this.basketOfferProductAdd(data[r_id]).then((response) => {
            if (!response?.data?.data?.success && response?.data?.data?.message) {
              if (!this.errors.includes(response?.data?.data?.message)) {
                if (this.errors.length > 0) {
                  this.errors = this.errors + ', '
                }
                this.errors = this.errors + response?.data?.data?.message
              }
            }
          })
        } else {
          this.basketProductAdd(data[r_id]).then((response) => {
            if (!response?.data?.data?.success && response?.data?.data?.message) {
              if (!this.errors.includes(response?.data?.data?.message)) {
                if (this.errors.length > 0) {
                  this.errors = this.errors + ', '
                }
                this.errors = this.errors + response?.data?.data?.message
              }
            }
          })
        }
      }
    },

    checkAction(ind, r_id) {
      for (var i in this.offers[r_id].item.actions) {
        if (this.offers[r_id].item.actions[i].action_id == ind) {
          this.editNow = this.offers[r_id].item.actions[i]
          //console.log(this.editNow)
        }
      }
      let r_ids = this.actionsRemains[ind].split('/')
      let c = 0
      for (var k in r_ids) {
        if (this.mainActionsData[r_ids[k]][ind] == false && r_ids[k] != r_id) {
          c++
        }
      }
      if (c > 0) {
        this.modalAll = true
      } else {
        this.checkOne(ind, r_id)
      }
    },
    checkAll() {
      let action_id = this.editNow.action_id
      let remain_ids = this.actionsRemains[action_id].split('/')
      for (var r_id in remain_ids) {
        this.checkOne(action_id, remain_ids[r_id])
      }
      this.modalAll = false
    },
    checkOne(ind, r_id) {
      //console.log(r_id)
      this.active_index[r_id] = ind
      var aactions = []
      for (let ii in this.offers[r_id].item.actions) {
        if (this.offers[r_id].item.actions[ii].relations?.active == 1) {
          this.offers[r_id].item.actions[ii].relations?.active == 0
        }
        if (this.offers[r_id].item.actions[ii].action_id == ind) {
          // console.log(this.offer.actions[ii])
          if (this.offers[r_id].item.actions[ii].relations?.action_ids) {
            aactions = this.offers[r_id].item.actions[ii].relations?.action_ids
          } else {
            aactions.push(ind)
          }
          this.activeConflict[r_id] = this.offers[r_id].item.actions[ii].relations
        }
      }

      for (var k in this.mainActionsData[r_id]) {
        if (aactions.includes(Number(k))) {
          this.mainActionsData[r_id][k] = true
        } else {
          this.mainActionsData[r_id][k] = false
        }
      }

      for (let ii in this.offers[r_id].item.actions) {
        if (aactions.includes(this.offers[r_id].item.actions[ii].action_id)) {
          this.offers[r_id].item.actions[ii].relations?.active == 1
        }
      }

      //console.log(this.mainActionsData[r_id])
      //устанавливаем минимальное количество, количество и кратность в зависимости от того, какая акция выбрана
      if (
        Number(this.activeConflict[r_id].multiplicity) >
          Number(this.activeConflict[r_id].min_count) &&
        Number(this.activeConflict[r_id].multiplicity) > 1
      ) {
        this.counts[r_id].count = Number(this.activeConflict[r_id].multiplicity)
        this.counts[r_id].step = Number(this.activeConflict[r_id].multiplicity)
        this.counts[r_id].count_min = Number(this.activeConflict[r_id].multiplicity)
      } else {
        if (
          Number(this.activeConflict[r_id].multiplicity) <=
            Number(this.activeConflict[r_id].min_count) &&
          Number(this.activeConflict[r_id].multiplicity) > 1
        ) {
          if (
            !(
              Number(this.activeConflict[r_id].min_count) %
              Number(this.activeConflict[r_id].multiplicity)
            )
          ) {
            this.counts[r_id].count = Number(this.activeConflict[r_id].min_count)
            this.counts[r_id].step = Number(this.activeConflict[r_id].multiplicity)
            this.counts[r_id].count_min = Number(this.activeConflict[r_id].min_count)
          } else {
            this.counts[r_id].count =
              Number(this.activeConflict[r_id].min_count) +
              Number(this.activeConflict[r_id].multiplicity) -
              (Number(this.activeConflict[r_id].min_count) %
                Number(this.activeConflict[r_id].multiplicity))
            this.counts[r_id].step = Number(this.activeConflict[r_id].multiplicity)
            this.counts[r_id].count_min = this.counts[r_id].count
          }
        } else {
          this.counts[r_id].count =
            Number(this.activeConflict[r_id].min_count) > 0
              ? Number(this.activeConflict[r_id].min_count)
              : 1
          this.counts[r_id].step = 1
          this.counts[r_id].count_min = this.counts[r_id].count
        }
      }
      // потребность
      if (
        this.$route.matched[5] &&
        (this.$route.name == 'purchasesCatalogRequirement' ||
          this.$route.name == 'purchasesOfferCatalogRequirement' ||
          this.$route.name == 'purchasesCatalogComplect')
      ) {
        if (this.counts[r_id].step == 1) {
          this.counts[r_id].count_min > Number(this.offers[r_id].count)
            ? (this.counts[r_id].count = this.counts[r_id].count_min)
            : (this.counts[r_id].count = Number(this.offers[r_id].count))
        } else {
          if (this.counts[r_id].count < Number(this.offers[r_id].count)) {
            this.counts[r_id].count = Number(this.offers[r_id].count)
          }
        }
      }
    },
  },

  watch: {
    offers: function () {
      this.setValues()
    },
  },
}
</script>

<style lang="scss">
.product-card-actions__modal-all-buy_all .modal__content {
  min-height: 90%;
}
.product-card-actions__modal-all-buy_all
  .product-card-actions__modal-all-header-product-container:first-child {
  border-bottom: 1px solid #75757575;
  padding: 0 0 40px 0;
}
.product-card-actions__modal-all-buy_all .product-card-actions__modal-all-header-product-container {
  border-bottom: 1px solid #75757575;
  padding: 40px 0;
}
.product-card-actions__modal-all-buy_all
  .product-card-actions__modal-all-header-product-container:last-child {
  border-bottom: none;
  padding: 40px 0 80px 0;
}
.product-card-actions__modal-all-buy_all .modal__content {
  overflow-y: scroll;
}
.product-card-actions__modal-all-buy_all .product-card-actions__modal-all-content {
  overflow-y: hidden;
}
.product-card-actions__modal-all-buy_all .product-card__count-label {
  font-weight: 400;
  color: #757575;
}
.product-card-actions__modal-all-buy_all .redder {
  color: #f92c0d;
}
.product-card-actions__modal-all-buy_all .product-card__count-value-require,
.product-card-actions__modal-all-buy_all .product-card__count-value-require span {
  font-weight: 500;
  color: #282828;
}
.product-card-actions__modal-all-buy_all .product-card__count-label,
.product-card-actions__modal-all-buy_all .redder,
.product-card-actions__modal-all-buy_all .product-card__count-value-require,
.product-card-actions__modal-all-buy_all .product-card__count-value-require span {
  font-size: 16px;
}
.product-card-actions__modal-all-buy_all .product-card__count-value-require {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  gap: 4px;
  background: #ededed;
  border-radius: 36px;
}
.product-card-actions__modal-all-buttons {
  display: flex;
  justify-content: center;
  gap: 24px;
  align-items: center;
  margin-right: 20px;
  padding: 24px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #ffffffb5;
  backdrop-filter: blur(17.5px);
}
.product-card-vertical__buy-cancel {
  width: max-content;
  color: #282828;
  background-color: #ffffff;
  border: 1px solid #282828;
}
.product-card-vertical__buy-cancel .d-button__text {
  font-weight: 500;
}
.product-card-vertical__buy-cancel:hover {
  color: #fff;
  background-color: #282828;
  border: 1px solid #282828;
}
.product-card-actions__modal-all-buy_all .product-card__count {
  padding-top: 8px;
}
.product-card-actions__modal-all-confirm h3 {
  margin-top: -21px;
  margin-bottom: 8px;
}
.product-card-actions__modal-all-confirm .product-card-actions__modal-all-buttons {
  position: relative;
  padding-bottom: 0;
}
.product-card-actions__modal-all-confirm .modal__content {
  padding-bottom: 0;
}
@media (width <=1280px) {
  .product-card-actions__modal-all-buy_all .product-card__count {
    padding-top: 4px;
  }
  .product-card-actions__modal-all-buy_all .product-card__count-label,
  .product-card-actions__modal-all-buy_all .redder,
  .product-card-actions__modal-all-buy_all .product-card__count-value-require,
  .product-card-actions__modal-all-buy_all .product-card__count-value-require span {
    font-size: 9px;
  }
}
@media (width <=700px) {
  .product-card-actions__modal-all-buy_all .product-card__count-label,
  .product-card-actions__modal-all-buy_all .redder,
  .product-card-actions__modal-all-buy_all .product-card__count-value-require,
  .product-card-actions__modal-all-buy_all .product-card__count-value-require span {
    font-size: 8px;
  }
}
@media (width <=600px) {
  .product-card-actions__modal-all-buy_all .product-card__count-label,
  .product-card-actions__modal-all-buy_all .redder,
  .product-card-actions__modal-all-buy_all .product-card__count-value-require,
  .product-card-actions__modal-all-buy_all .product-card__count-value-require span {
    font-size: 12px;
  }
}
</style>
