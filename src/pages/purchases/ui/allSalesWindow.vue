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
              :src="item.item.data.image"
              :alt="item.item.data.pagetitle"
              class="product-card__image"
            />
          </div>

          <div class="product-card__info-text-container">
            <!-- Название и артикул товара -->
            <div class="product-card__info-text">
              <p class="product-card__title">
                {{ item.item.data.pagetitle }}
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
                  allOff[remain_id] == true
                    ? (item.item.prices.rrc * counts[remain_id].count).toLocaleString('ru')
                    : (activeConflict[remain_id]?.price * counts[remain_id].count).toLocaleString(
                        'ru',
                      )
                }}
                ₽
              </p>
            </div>
          </div>
          <p class="product-card__p">
            {{
              allOff[remain_id] == true || activeConflict[remain_id].prices.rrc_discount == 0
                ? 'Без скидки от РРЦ'
                : '-' + activeConflict[remain_id]?.prices.rrc_discount + '% от РРЦ'
            }}
          </p>
          <p class="product-card__p">
            {{
              allOff[remain_id] == true
                ? item.item.prices.rrc.toLocaleString('ru')
                : activeConflict[remain_id]?.price.toLocaleString('ru')
            }}
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
              <span class="product-card__count-label">Ваша потребность: </span>
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
              <span
                v-if="
                  (sale.is_trigger == 1 &&
                    sale.enabled == 0 &&
                    !Object.keys(this.mainActionsData[remain_id]).includes(sale.action_id)) ||
                  (!this.activeConflict[remain_id]?.actions_ids?.includes(sale.action_id) &&
                    !Object.keys(this.mainActionsData[remain_id]).includes(sale.action_id)) ||
                  (this.mainActionsData[remain_id][sale.action_id] == true &&
                    Object.keys(this.mainActionsData[remain_id]).length == 1 &&
                    sale.is_trigger == 1 &&
                    sale.enabled == 0)
                "
                >Условия акции не выполнены:</span
              >
              <span
                v-else-if="
                  (this.activeConflict[remain_id]?.actions_ids?.includes(sale.action_id) &&
                    sale.is_trigger == 0 &&
                    !Object.keys(this.mainActionsData[remain_id]).includes(sale.action_id)) ||
                  (this.activeConflict[remain_id]?.actions_ids?.includes(sale.action_id) &&
                    sale.is_trigger == 1 &&
                    sale.enabled == 1 &&
                    !Object.keys(this.mainActionsData[remain_id]).includes(sale.action_id)) ||
                  (this.mainActionsData[remain_id][sale.action_id] == true &&
                    Object.keys(this.mainActionsData[remain_id]).length == 1 &&
                    sale.is_trigger == 1 &&
                    sale.enabled == 1)
                "
                >Применена автоматически:</span
              >
              <span v-else-if="this.mainActionsData[remain_id][sale.action_id] == true"
                >Акция включена:</span
              >
              <span
                v-else-if="
                  this.mainActionsData[remain_id][sale.action_id] == false && !allOff[remain_id]
                "
                >Акция несовместима:</span
              >
              <span
                v-else-if="
                  this.mainActionsData[remain_id][sale.action_id] == false && allOff[remain_id]
                "
                >Акция выключена:</span
              >
            </p>
            <div class="product-card-actions__modal-all-item-action-button">
              <div>
                <div
                  class="d-switch"
                  @click.prevent="checkAction(Number(sale.action_id), remain_id)"
                  v-if="
                    (item.item.main_actions.includes(Number(sale.action_id)) &&
                      sale.is_trigger == 0) ||
                    (item.item.main_actions.includes(Number(sale.action_id)) &&
                      sale.is_trigger == 1 &&
                      Object.keys(this.mainActionsData[remain_id]).length > 1)
                  "
                >
                  <input
                    type="checkbox"
                    :name="Number(sale.action_id)"
                    :id="Number(sale.action_id)"
                    binary="true"
                    class="d-switch__input"
                    v-model="mainActionsData[remain_id][Number(sale.action_id)]"
                  />
                  <div class="d-switch__circle">
                    <!--несовместима-->
                    <div
                      class="product-card__actions-icon-info"
                      v-if="
                        this.mainActionsData[remain_id][sale.action_id] == false &&
                        !allOff[remain_id]
                      "
                    >
                      !
                    </div>
                  </div>
                </div>
                <!--крест-->
                <i
                  class="d-icon-times product-card__actions-icon-cross"
                  v-else-if="
                    (!this.activeConflict[remain_id]?.actions_ids?.includes(sale.action_id) &&
                      !item.item.main_actions.includes(Number(sale.action_id))) ||
                    (sale.is_trigger == 1 && sale.enabled == 0) ||
                    (this.mainActionsData[remain_id][sale.action_id] == true &&
                      Object.keys(this.mainActionsData[remain_id]).length == 1 &&
                      sale.is_trigger == 1 &&
                      sale.enabled == 0)
                  "
                ></i>
                <!--галочка-->
                <i
                  class="d-icon-check product-card__actions-icon-auto"
                  v-else-if="
                    (this.activeConflict[remain_id]?.actions_ids?.includes(sale.action_id) &&
                      ((sale.is_trigger == 1 && sale.enabled == 1) || sale.is_trigger == 0)) ||
                    (this.mainActionsData[remain_id][sale.action_id] == true &&
                      Object.keys(this.mainActionsData[remain_id]).length == 1 &&
                      sale.is_trigger == 1 &&
                      sale.enabled == 1)
                  "
                ></i>
              </div>
              <p>
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
              <div v-if="sale.percent_num > 0">
                <i class="d-icon-percent-rounded product-card__buy-icon"></i>Скидка
                {{ sale.percent_num }}%
              </div>

              <div v-if="sale.payer == 1">
                <i class="d-icon-truck product-card__buy-icon"></i>Бесплатная доставка
              </div>
              <div v-if="sale.delay_type == 2 && sale.delay > 0">
                <i class="d-icon-box-flat product-card__buy-icon"></i>Под реал. {{ sale.delay }}дн.
              </div>
              <div v-if="sale.condition_min_sum > 0">
                <span class="product-card__icon-summ product-card__buy-icon">₽</span>
                Мин. сумма - {{ parseInt(sale.condition_min_sum) }} ₽
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
      :class="{ 'd-button--loading': this.loading }"
    >
      <div class="d-button__text">
        <i class="d-icon-cart product-card__buy-icon"></i>
        В корзину
      </div>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Counter from '@/shared/ui/CounterNoAdd.vue'
import Loader from '@/shared/ui/Loader.vue'

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
    }
  },
  emits: ['windowClose', 'updateCatalog', 'updateBasket'],
  components: { Counter, Loader },
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
  },
  mounted() {
    this.setValues().then(() => {
      this.loading = false
    })
  },
  computed: {},
  methods: {
    ...mapActions({
      basketProductAdd: 'basket/basketProductAdd',
    }),
    async setValues() {
      if (Object.keys(this.offers).length) {
        for (var r_id in this.offers) {
          // собираем конфликты
          this.modalActionsData[r_id] = this.offers[r_id].item.conflicts
          // выбираем активный конфликт
          let conf = this.modalActionsData[r_id]
          for (var ic in conf) {
            if (conf[ic].active) {
              this.activeConflict[r_id] = conf[ic]
            }
          }
          // проставляем состояние окошка информации о продавце
          this.seller_info[r_id] = false
          // проставляем количество из каунтеров в данный момент
          this.counts[r_id] = { count: this.offers[r_id].count }
          // проставляем состояние переключателей (первый включен)
          this.allOff[r_id] = false
          // собираем массив главных акций и устанавливаем активную
          if (this.activeConflict[r_id]?.actions_ids) {
            let item = JSON.parse(JSON.stringify(this.activeConflict[r_id].actions_ids))
            for (var iitem in item) {
              item[iitem] = Number(item[iitem])
            }

            let act_ids = this.offers[r_id].item.main_actions
            let data = {}
            for (var ima in act_ids) {
              data[act_ids[ima]] = false
              if (item.includes(Number(act_ids[ima]))) {
                data[act_ids[ima]] = true
              } else {
                data[act_ids[ima]] = false
              }
              this.mainActionsData[r_id] = data
            }
          }
          // устанавливаем минимальное количество, количество и кратность в зависимости от того, какая акция выбрана
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
            this.$route.matched[5].name == 'purchasesCatalogRequirement'
          ) {
            if (this.step == 1) {
              this.counts[r_id].count_min > Number(this.offers[r_id].item.count)
                ? (this.counts[r_id].count = this.counts[r_id].count_min)
                : (this.counts[r_id].count = Number(this.offers[r_id].item.count))
            } else {
              this.counts[r_id].count < Number(this.offers[r_id].item.count)
                ? (this.counts[r_id].count = Number(this.offers[r_id].item.count))
                : ''
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
      let data = {}
      for (var r_id in this.offers) {
        let conf = {}
        let item = this.offers[r_id].item
        if (!this.allOff[r_id]) {
          conf = this.activeConflict[r_id].actions
          item.price = this.activeConflict[r_id].price
          item.payer = this.activeConflict[r_id].payer ? this.activeConflict[r_id].payer : 0
          item.delay = this.activeConflict[r_id].delay ? this.activeConflict[r_id].delay : 0
          item.delay_type = this.activeConflict[r_id].delay_type
            ? this.activeConflict[r_id].delay_type
            : 1
        }
        data[r_id] = {
          org_id: item.org_id,
          store_id: item.store_id,
          id_remain: r_id,
          count: this.counts[r_id].count,
          key: item.key,
          actions: conf,
        }
        // this.basketProductAdd(data).then((response) => {
        //   this.loading = false
        //   if (!response?.data?.data?.success && response?.data?.data?.message) {
        //     this.$toast.add({
        //       severity: 'error',
        //       summary: 'Ошибка',
        //       detail: response?.data?.data?.message,
        //       life: 3000,
        //     })
        //   }
        //   this.$emit('updateCatalog')
        //   this.$emit('updateBasket')
        // })
      }
      for (var rem_id in this.noconflicts) {
        let conf = {}
        if (this.noconflicts[rem_id].count > 0) {
          let item = this.noconflicts[rem_id].item
          if (item.conflicts && item.conflicts.length == 1) {
            conf = item.conflicts[0].actions
            item.price = item.conflicts[0].price
            item.payer = item.conflicts[0].payer ? item.conflicts[0].payer : 0
            item.delay = item.conflicts[0].delay ? item.conflicts[0].delay : 0
            item.delay_type = item.conflicts[0].delay_type ? item.conflicts[0].delay_type : 1
          }

          data[rem_id] = {
            org_id: item.org_id,
            store_id: item.store_id,
            id_remain: rem_id,
            count: this.noconflicts[rem_id].count,
            key: item.key,
            actions: conf,
          }
        }

        this.addBasketOne(data).then((res) => {
          console.log(res)
          if (res.error < res.total) {
            this.$toast.add({
              severity: 'success',
              summary: 'Выполнено',
              detail: 'Добавлено в корзину ' + res.success + ' товаров из ' + res.total,
              life: 3000,
            })
            this.loading = false

            this.$emit('updateCatalog')
            this.$emit('updateBasket')
          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: 'Ошибка добавления в корзину',
              life: 3000,
            })
          }
          this.loading = false
          this.$emit('updateCatalog')
          this.$emit('updateBasket')
          this.$emit('windowClose')
        })
      }
    },
    async addBasketOne(data) {
      let error = 0
      let success = 0
      let total = Object.keys(data).length
      for (var r_id in data) {
        this.basketProductAdd(data[r_id]).then((response) => {
          if (response.data.data.success) {
            success++
          } else {
            error++
          }
        })
      }
      return { total: total, error: error, success: success }
    },
    checkAction(ind, r_id) {
      let data = this.mainActionsData[r_id]
      if (data[ind]) {
        this.mainActionsData[r_id][ind] = false
        this.allOff[r_id] = true
        // потребность
        if (
          this.$route.matched[5] &&
          this.$route.matched[5].name == 'purchasesCatalogRequirement'
        ) {
          this.counts[r_id].count = Number(this.offers[r_id].item.count)
        } else {
          this.counts[r_id].count = 1
        }
        this.activeConflict[r_id] = {}
      } else {
        for (var ii in this.mainActionsData[r_id]) {
          if (ii == ind) {
            this.mainActionsData[r_id][ii] = true
            this.allOff[r_id] = false
            // выставляем новый активный конфликт
            for (var ic in this.offers[r_id].item.conflicts) {
              if (this.offers[r_id].item.conflicts[ic] !== undefined) {
                if (this.offers[r_id].item.conflicts[ic].actions_ids.includes(ii)) {
                  this.activeConflict[r_id] = this.offers[r_id].item.conflicts[ic]

                  if (
                    Number(this.activeConflict[r_id].multiplicity) >
                      Number(this.activeConflict[r_id].min_count) &&
                    Number(this.activeConflict[r_id].multiplicity) > 1
                  ) {
                    this.counts[r_id].count = Number(this.activeConflict.multiplicity)
                    this.counts[r_id].step = Number(this.activeConflict.multiplicity)
                    this.counts[r_id].count_min = Number(this.activeConflict.multiplicity)
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
                    this.$route.matched[5].name == 'purchasesCatalogRequirement'
                  ) {
                    if (this.counts[r_id].step == 1) {
                      this.counts[r_id].count_min > Number(this.offers[r_id].item.count)
                        ? (this.counts[r_id].count = this.counts[r_id].count_min)
                        : (this.counts[r_id].count = Number(this.offers[r_id].item.count))
                    } else {
                      this.counts[r_id].count < Number(this.offers[r_id].item.count)
                        ? (this.counts[r_id].count = Number(this.offers[r_id].item.count))
                        : ''
                    }
                  }
                }
              }
            }
          } else {
            this.mainActionsData[r_id][ii] = false
          }
        }
      }
    },
  },
  watch: {
    offers: function (newVal) {
      for (var r_id in newVal) {
        this.modalActionsData[r_id] = newVal[r_id].item.conflicts
      }
    },
  },
}
</script>

<style lang="scss">
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
  font-weight: 600;
  color: #282828;
}
.product-card-actions__modal-all-buy_all .redder {
  color: #f92c0d;
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
.product-card-actions__modal-all-buy_all .product-card__count-value-require,
.product-card-actions__modal-all-buy_all .product-card__count-value-require span {
  font-weight: 600;
  color: #282828;
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
</style>
