<template>
  <Toast />
  <section class="promo" id="promo">
    <Loader v-if="loading" />
    <!-- Верхушка страницы -->
    <div class="d-top">
      <breadcrumbs />
    </div>

    <div
      class="promos__banners-item promos__banners-item--primary promos__banners-item--big promo__banner"
      v-if="sale?.image?.image"
    >
      <img
        :src="sale?.image?.image"
        :srcset="sale?.image?.image + ' 2x, ' + sale?.image?.image + ' 1x'"
        class="promos__banners-item-image"
        loading="lazy"
      />
      <div class="promos__banners-item-badges">
        <div class="promos__banners-item-badges-item">Реклама</div>
        <span class="promos__banners-item-badges-text">0+</span>
      </div>
    </div>

    <div class="promo__cards-wrap" v-if="sale">
      <div class="dart-row">
        <div class="d-col-md-8">
          <div class="promotions__card promotions__card--height">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-lines promotions__card-icon"></i>
                <p class="promotions__card-title">Контент акции</p>
              </div>
            </div>
            <div class="promotions__card-content">
              <div class="promotions__card-values">
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Название акции:</span>
                  <p class="promotions__card-value promotions__card-value--bold">
                    {{ sale?.name }}
                  </p>
                </div>
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Описание акции:</span>
                  <p class="promotions__card-value" v-html="sale?.description"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-col-md-16">
          <div class="promotions__card promo__cards-item">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-truck promotions__card-icon"></i>
                <p class="promotions__card-title">Условия доставки</p>
              </div>
            </div>
            <div
              class="promotions__card-content promo__cards-item-content promo__cards-item-content--small"
            >
              <div
                class="promotions__card-values promotions__card-promo-conds-content promo__cards-item-values promo__cards-item-values--delivery"
              >
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Оплата доставки:</span>
                  <p
                    class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                  >
                    Доставка за счет {{ sale.payer == '1' ? 'Поставщика' : 'Покупателя' }}
                  </p>
                </div>
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Срок доставки:</span>
                  <p
                    class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                  >
                    Рассчитывается ТК
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="promotions__card promo__cards-item">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-wallet promotions__card-icon"></i>
                <p class="promotions__card-title">Условия оплаты</p>
              </div>
            </div>
            <div
              class="promotions__card-content promo__cards-item-content promo__cards-item-content--small"
            >
              <div
                class="promotions__card-values promotions__card-values--md-long promo__cards-item-values"
              >
                <div class="promotions__card-info">
                  <div class="promotions__card-value-container">
                    <span
                      class="promotions__card-label d-md-max-content"
                      v-if="sale.delay_type < 2"
                      >{{
                        sale.delay_type == 1 && sale.delay_graph.lengh > 1
                          ? 'Отсрочка платежа'
                          : 'Предоплата'
                      }}</span
                    >
                    <span class="promotions__card-label d-md-max-content" v-else>{{
                      sale.delay_type == 2 ? 'Под реализацию' : 'Предоплата'
                    }}</span>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                    >
                      {{ sale.delay ? Number(sale.delay).toFixed(1) + ' дн' : 'Предоплата' }}
                    </p>
                  </div>
                </div>
                <div
                  class="d-fractions promo__cards-item-values-fractions"
                  v-if="sale.delay_type < 2"
                >
                  <div
                    class="d-fractions__item"
                    v-for="(delayGraph, index) in sale.delay_graph"
                    :key="index"
                    :style="'width: ' + Number(delayGraph.percent) + '%'"
                  >
                    <p class="d-fractions__item-text">
                      {{
                        Math.round(delayGraph.day) == 0
                          ? 'Предоплата'
                          : Math.round(delayGraph.day) + ' дн.'
                      }}
                    </p>
                    <div class="d-fractions__item-block"></div>
                    <p class="d-fractions__item-text d-fractions__item-text--bottom">
                      {{ Math.round(delayGraph.percent) }}%
                    </p>
                  </div>
                </div>
                <div class="d-fractions promo__cards-item-values-fractions" v-else>
                  <div class="d-fractions__item" style="width: 100%" v-if="sale.delay > 0">
                    <p class="d-fractions__item-text">Под реализацию</p>
                    <div class="d-fractions__item-block"></div>
                    <p class="d-fractions__item-text d-fractions__item-text--bottom">
                      {{ Math.round(sale.delay) }} дней
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="promotions__card promo__cards-item">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-calendar3 promotions__card-icon"></i>
                <p class="promotions__card-title">Даты акции</p>
              </div>
            </div>
            <div
              class="promotions__card-content promo__cards-item-content promo__cards-item-content--small"
            >
              <div
                class="promotions__card-values promotions__card-values--md-long promo__cards-item-values promo__cards-item-date-values"
              >
                <div class="promotions__card-info">
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label d-md-max-content"
                      >Срок проведения акции:</span
                    >
                    <div
                      class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value promo__cards-item-conds-value"
                    >
                      <div
                        class="promo__cards-item-conds-value-content"
                        v-if="
                          new Date(sale?.date_from).getTime() > 0 &&
                          new Date(sale?.date_to).getTime() > 0
                        "
                      >
                        <span
                          >с
                          {{ new Date(sale?.date_from).toLocaleString('ru', this.options) }}</span
                        >
                        <div
                          class="d-divider d-divider--vertical d-divider--no-margin promo__cards-item-conds-value-divider"
                        ></div>
                        <span
                          >до {{ new Date(sale?.date_to).toLocaleString('ru', this.options) }}</span
                        >
                      </div>
                      <p
                        class="promo__cards-item-conds-value-total"
                        v-if="
                          new Date(sale?.date_from).getTime() > 0 &&
                          new Date(sale?.date_to).getTime() > 0
                        "
                      >
                        {{ getDiffDays }} дн.
                      </p>
                      <p class="promo__cards-item-conds-value-total" v-else>Бессрочная</p>
                    </div>
                  </div>
                </div>
                <div
                  class="d-fractions promo__cards-item-values-fractions"
                  v-if="
                    new Date(sale?.date_from).getTime() > 0 && new Date(sale?.date_to).getTime() > 0
                  "
                >
                  <div class="d-fractions promo__cards-date-container">
                    <div
                      class="d-fractions__item d-fractions__item--center"
                      :style="'width:' + (getDiffDaysRemain * 100) / getDiffDays + '%'"
                    >
                      <div class="d-fractions__item-block"></div>
                      <p class="d-fractions__item-text d-fractions__item-text--bottom">
                        Осталось {{ getDiffDaysRemain }} дн.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="promo__cards-wrap">
      <div class="promotions__card promo__card">
        <div class="promotions__card-header">
          <div class="promotions__card-header-left">
            <i class="d-icon-check-list promotions__card-icon"></i>
            <p class="promotions__card-title">Условия участия в акции</p>
            <div class="d-category__container ml-44 hidden-1200">
              <div class="d-category" v-if="sale.offer">Доступно только в предложениях</div>
              <div class="d-category" v-if="sale.complect">Комплект</div>
            </div>
          </div>
        </div>
        <div class="promotions__card-content promotions__card-last">
          <div class="promotions__card-block-wrapper promo__card-block-wrapper">
            <div
              class="promotions__card-value-container promotions__card-block promo__card-block"
              v-for="(field, index_field) in sale_condition"
              :key="index_field"
            >
              <div class="promotions__card-block-inner promo__card-block-inner dart-row">
                <div class="d-col-md-10">
                  <span
                    class="promotions__card-label promotions__card-label--big"
                    v-if="field.name == 'condition_min_sum'"
                    >Требования к заказу</span
                  >
                  <p
                    class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-title"
                  >
                    {{ field.label }}
                  </p>
                </div>
                <div class="d-col-md-10">
                  <p
                    class="promotions__card-label promotions__card-label--big promotions__card-block-description promo__card-block-description"
                  >
                    {{ field.text }}
                  </p>
                </div>
                <div class="d-col-md-4">
                  <p
                    class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-value promo__card-block-value"
                  >
                    {{
                      sale[field.name] != undefined
                        ? sale[field.name] + ' ' + field.units
                        : '0 ' + field.units
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="sale_seeall-button" v-if="sale.complect > 0">
      <button
        @click.prevent="
          this.$router.push({ name: 'purchasesCatalogComplect', params: { action_id: sale.id } })
        "
        class="d-button d-button-primary d-button-primary-small d-button--sm-shadow product-card-vertical__buy"
      >
        <div class="d-button__text">Посмотреть все товары акции в каталоге</div>
      </button>
    </div>
    <div class="sale_seeall-button" v-if="sale.complect > 0 && salesProducts.no_available > 0">
      <p>
        В данный момент не все товары из комплекта есть в наличии, поэтому акция не может быть
        применена
      </p>
    </div> -->
    <BaseTable
      :items_data="salesProducts.items"
      :total="salesProducts.total"
      :pagination_items_per_page="this.pagination_items_per_page"
      :pagination_offset="this.pagination_offset"
      :page="this.page"
      :table_data="this.table_data"
      :filters="this.filters"
      @paginate="paginate"
      @viewElem="viewProduct"
    />
  </section>
</template>
<script>
import breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Toast from 'primevue/toast'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PurchasesAction',
  components: { Loader, breadcrumbs, Toast, BaseTable },
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25,
    },
    pagination_offset: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: false,
      page: 1,
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
      filters: {},
      table_data: {
        image: {
          label: 'Фото',
          type: 'image',
          class: 'cell_centeralign',
        },
        pagetitle: {
          label: 'Наименование',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
        price_rrc: {
          label: 'РРЦ, ₽',
          type: 'text',
          class: 'cell_centeralign',
        },
        sale: {
          label: 'Скидка от РРЦ, %',
          type: 'text',
          class: 'cell_centeralign',
        },
        // price: {
        //   label: 'Цена со скидкой за шт, ₽',
        //   type: 'text',
        //   class: 'cell_centeralign',
        // },
        min_count: {
          label: 'Минимальное количество',
          type: 'text',
          class: 'cell_centeralign',
        },
        multiplicity: {
          label: 'Кратность',
          type: 'text',
          class: 'cell_centeralign',
        },
        actions: {
          label: 'Действия',
          type: 'actions',
          sort: false,
          class: 'cell_centeralign',
          available: {
            view: {
              icon: 'pi pi-eye',
              label: 'Просмотреть',
            },
          },
        },
      },
      sale_condition: [
        {
          name: 'condition_min_sum',
          label: 'Минимальная общая сумма заказа товаров акции',
          text: 'Общая сумма товаров акции должна быть не менее указанной суммы',
          units: '₽',
        },
        {
          name: 'condition_SKU',
          label: 'Минимальное количество SKU акции',
          text: 'В заказе должно быть не менее заданного количества SKU товаров акции',
          units: '',
        },
        {
          name: 'condition_min_count',
          label: 'Минимальное общее количество товаров',
          text: 'В заказе должно быть не менее заданного общего количества товаров акции',
          units: 'шт',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      sale: 'sales/sale',
      salesProducts: 'sales/salesProducts',
    }),
    getDiffDays() {
      const date1 = new Date(this.sale.date_from)
      const date2 = new Date(this.sale.date_to)
      return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24))
    },
    getDiffDaysRemain() {
      const date1 = new Date()
      const date2 = new Date(this.sale.date_to)
      return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24))
    },
  },
  mounted() {
    this.getSales({
      actionId: this.$route.params.action_id,
      isAction: true,
    }).then((res) => {
      console.log('res', res)
      if (!res.data.success) {
        this.$toast.add({
          severity: 'info',
          summary: 'Ошибка',
          detail: 'У вас нет доступа к этой акции',
          life: 3000,
        })
        setTimeout(() => {
          this.$router.go(-1)
        }, 1000)
      } else {
        this.getSalesProducts({
          actionId: this.$route.params.action_id,
          view: 1,
          perpage: this.pagination_items_per_page,
          page: this.page,
        })
      }
    })
  },
  methods: {
    ...mapActions({
      getSales: 'sales/getSales',
      getSalesProducts: 'sales/getSalesProducts',
      unsetSelesProducts: 'sales/unsetSelesProducts',
    }),
    paginate(data) {
      this.loading = true
      this.unsetSelesProducts()
      this.page = data.page
      const sendData = {
        actionId: this.$route.params.action_id,
        perpage: this.pagination_items_per_page,
        page: this.page,
      }
      this.getSalesProducts(sendData).then(() => {
        this.loading = false
      })
    },
    viewProduct(item) {
      this.$router.push({
        name: 'purchasesCatalogSearch',
        params: { id: this.$route.params.id },
        query: { search: item.article },
      })
    },
  },
  watch: {},
}
</script>
<style lang="scss">
.promo__cards-wrap {
  & + .promo__cards-wrap {
    margin-top: 16px;
  }
  .dart-row {
    margin-left: 0;
    margin-right: 0;
  }
}
.promotions__card {
  height: auto;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
  &.promotions__card--height {
    height: 100%;
  }
  & + .promotions__card {
    margin-top: 16px;
  }
}
.promotions__card-header {
  border-radius: 12px 12px 0 0;
  border-bottom: 0.3px solid #75757575;
}
.promo__cards-item-values-fractions {
  width: 370px;
}
.d-fractions__item-text,
.d-fractions__item-text--bottom {
  text-align: center;
  width: 100%;
}
.promo__cards-item-values-fractions {
  gap: 20px;
}
.d-fractions__item-block {
  width: 100%;
}
.promo__cards-date-container {
  width: 100%;
  min-width: 300px;
}
.promo__card-block-value {
  width: 145px;
}
.promotions__card-last .promotions__card-block-inner {
  gap: 0;
}
.promotions__card-last .promo__card-block-title-container,
.promotions__card-last .promo__card-block-description,
.promotions__card-last .promo__card-block-value {
  width: auto;
}
.promo__cards-date-container .d-fractions__item {
  min-width: 70px;
}
@media (width <= 1200px) {
  .promo__card-block-description,
  .promo__cards-item-conds-value-total {
    font-size: 14px;
  }
  .promotions__card-header {
    border-radius: 6px 6px 0 0;
  }
  .promo__cards-item-date-values {
    flex-direction: column;
    gap: 12px;
  }
  .promo__cards-date-container .d-fractions__item {
    min-width: 100px;
  }
}
@media (width <= 800px) {
  .promo__cards-item-values {
    gap: 24px;
  }
  .promo__cards-date-container .d-fractions__item {
    min-width: 70px;
  }
  .promo__cards-item-date-values {
    flex-direction: row;
    gap: 12px;
  }
  .promo__cards-item-date-values .promo__cards-item-conds-value {
    gap: 12px;
  }
}
.promo-master__footer {
  position: fixed;
  bottom: 0;
  left: 0;
}
.promo-master__content {
  padding-bottom: 60px;
}
.promo-master {
  padding-top: 115px;
}
.promo-modal__header {
  position: absolute;
  z-index: 1001;
}
.promotions .promotions__card,
.promotions .promotions__card-container {
  height: 100%;
}
.sale_seeall-button {
  width: 100%;
  margin: 40px 0 24px;
  display: flex;
  justify-content: end;
  align-items: center;
}
.sale_seeall-button p {
  color: #757575;
  width: 35%;
}
</style>
