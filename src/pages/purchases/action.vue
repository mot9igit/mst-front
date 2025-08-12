<template>
  <Toast />
  <section class="promo" id="promo">
    <Loader v-if="loading" />
    <!-- Верхушка страницы -->
    <div class="d-top">
      <router-link
        :to="{ name: 'purchases', params: { id: this.$route.params.id } }"
        class="d-back d-top-back"
      >
        <i class="d-icon-arrow d-back__icon d-top-back-icon"></i>
        <span class="d-back__text">Назад</span>
      </router-link>
      <breadcrumbs />
    </div>

    <div
      class="promos__banners-item promos__banners-item--primary promos__banners-item--big promo__banner"
      v-if="sale"
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
                  <p class="promotions__card-value">{{ sale?.description }}</p>
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
                    Доставка за счет {{ sale.payer === '1' ? 'Поставщика' : 'Покупателя' }}
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
                    <span class="promotions__card-label d-md-max-content">{{
                      sale.delay_type == 1 ? 'Отсрочка платежа' : 'Под реализацию'
                    }}</span>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                    >
                      {{ sale.delay ? Number(sale.delay).toFixed(1) + ' дн' : 'Предоплата' }}
                    </p>
                  </div>
                </div>
                <div class="d-fractions promo__cards-item-values-fractions">
                  <div class="d-fractions__item">
                    <p class="d-fractions__item-text">Предоплата</p>
                    <div class="d-fractions__item-block" style="width: 36px"></div>
                    <p class="d-fractions__item-text d-fractions__item-text--bottom">20%</p>
                  </div>
                  <div class="d-fractions__item">
                    <p class="d-fractions__item-text">30 дней</p>
                    <div class="d-fractions__item-block" style="width: 32px"></div>
                    <p class="d-fractions__item-text d-fractions__item-text--bottom">30%</p>
                  </div>
                  <div class="d-fractions__item d-fractions__item--center">
                    <p class="d-fractions__item-text">145 дней</p>
                    <div class="d-fractions__item-block" style="width: 100px"></div>
                    <p class="d-fractions__item-text d-fractions__item-text--bottom">50%</p>
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
                class="promotions__card-values promotions__card-values--md-long promo__cards-item-values"
              >
                <div class="dart-row">
                  <div class="d-col-md-18">
                    <div class="promotions__card-info">
                      <div class="promotions__card-value-container">
                        <span class="promotions__card-label d-md-max-content"
                          >Срок проведения акции:</span
                        >
                        <div
                          class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value promo__cards-item-conds-value"
                        >
                          <div class="promo__cards-item-conds-value-content">
                            <span
                              >с
                              {{
                                new Date(sale?.date_from).toLocaleString('ru', this.options)
                              }}</span
                            >
                            <div
                              class="d-divider d-divider--vertical d-divider--no-margin promo__cards-item-conds-value-divider"
                            ></div>
                            <span
                              >до
                              {{ new Date(sale?.date_to).toLocaleString('ru', this.options) }}</span
                            >
                          </div>
                          <p class="promo__cards-item-conds-value-total">{{ getDiffDays }} дн.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-col-md-6">
                    <div class="d-fractions">
                      <div class="d-fractions__item d-fractions__item--center">
                        <div class="d-fractions__item-block" style="width: 150px"></div>
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
    </div>
    <div class="promo__cards-wrap">
      <div class="dart-row">
        <div class="d-col-md-24">
          <div class="promotions__card promo__card">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-check-list promotions__card-icon"></i>
                <p class="promotions__card-title">Условия участия в акции</p>
              </div>
            </div>
            <div class="promotions__card-content">
              <div class="promotions__card-block-wrapper promo__card-block-wrapper">
                <div
                  class="promotions__card-value-container promotions__card-block promo__card-block"
                >
                  <div class="promotions__card-block-inner promo__card-block-inner">
                    <div
                      class="promotions__card-block-title-container promo__card-block-title-container"
                    >
                      <span class="promotions__card-label promotions__card-label--big"
                        >Требования к заказу</span
                      >
                      <p
                        class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-title"
                      >
                        Минимальная общая сумма заказа товаров акции
                      </p>
                    </div>
                    <p
                      class="promotions__card-label promotions__card-label--big promotions__card-block-description promo__card-block-description"
                    >
                      Общая сумма товаров акции должна быть не менее указанной суммы.
                    </p>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-value promo__card-block-value"
                    >
                      0 ₽
                    </p>
                  </div>
                </div>

                <div
                  class="promotions__card-value-container promotions__card-block promo__card-block"
                >
                  <div class="promotions__card-block-inner promo__card-block-inner">
                    <div
                      class="promotions__card-block-title-container promo__card-block-title-container"
                    >
                      <p
                        class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-title"
                      >
                        Минимальное количество SKU акции
                      </p>
                    </div>
                    <p
                      class="promotions__card-label promotions__card-label--big promotions__card-block-description promo__card-block-description"
                    >
                      В заказе должно быть не менее заданного количества SKU товаров акции.
                    </p>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-value promo__card-block-value"
                    >
                      Любое
                    </p>
                  </div>
                </div>

                <div
                  class="promotions__card-value-container promotions__card-block promo__card-block"
                >
                  <div class="promotions__card-block-inner promo__card-block-inner">
                    <div
                      class="promotions__card-block-title-container promo__card-block-title-container"
                    >
                      <p
                        class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-title"
                      >
                        Минимально общее количество товаров
                      </p>
                    </div>
                    <p
                      class="promotions__card-label promotions__card-label--big promotions__card-block-description promo__card-block-description"
                    >
                      В заказе должно быть не менее заданного общего количества товаров акции.
                    </p>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-value promo__card-block-value"
                    >
                      Любое
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        },
        pagetitle: {
          label: 'Наименование',
          type: 'link',
          link_to: 'purchasesCatalogSearch',
          link_params: {
            id: this.$route.params.id,
            search: 'pagetitle',
          },
          sort: true,
        },
        price_rrc: {
          label: 'РРЦ',
          type: 'text',
        },
        price: {
          label: 'Цена со скидкой',
          type: 'text',
        },
        actions: {
          label: 'Действия',
          type: 'actions',
          sort: false,
          available: {
            view: {
              icon: 'pi pi-eye',
              label: 'Просмотреть',
            },
          },
        },
      },
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
        params: { id: this.$route.params.id, search: item.pagetitle },
      })
    },
  },
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
  &.promotions__card--height {
    height: 100%;
  }
  & + .promotions__card {
    margin-top: 16px;
  }
}
</style>
