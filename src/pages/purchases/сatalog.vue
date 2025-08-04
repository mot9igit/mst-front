<template>
  <Loader v-if="loading" />
  <div class="products__top-wrapper" v-else>
    <div class="products__top">
      <!-- Левая часть верхушки страницы -->
      <div class="products__top-left">
        <a class="d-back promotions__top-back products__back">
          <i class="d-icon-arrow d-back__icon"></i>
          <span class="d-back__text hidden-640">Назад</span>
        </a>
        <breadcrumbs/>
      </div>
      <!-- Правая часть верхушки страницы -->
      <div class="products__top-right">
        <!--
        <button
          class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small products__top-button"
          data-show-hide="balanceForecast"
        >
          Прогноз остатков
          <i class="d-icon-mixer products__top-button-icon"></i>
        </button>
        <button
          class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small products__top-button products__top-button--filter"
          data-show-hide="filter"
        >
          Фильтр
          <i class="d-icon-angle-rounded-bottom products__top-button-icon"></i>
        </button>
        -->
      </div>
    </div>

    <!-- Прогноз остатков -->
    <!-- При натягивании верстки эту обертку удалить ↓↓↓ -->
    <div class="hidden" id="balanceForecast">
      <div class="products__forecast">
        <!-- Радио: Добавлять в корзину кол-во из потребности -->
        <div class="d-radio__wrapper d-radio__wrapper--align-start d-radio__wrapper--fit">
          <label for="addNeed" class="d-radio">
            <input type="radio" name="addNeed" id="addNeed" class="d-radio__input" />
          </label>
          <div class="d-switch__label-container">
            <label for="addNeed" class="d-radio__label"
              >Добавлять в корзину кол-во из потребности
            </label>
            <p class="d-description">
              При включенном условии, нажимая на кнопку «В корзину», вы будете добавлять в корзину
              количество товара из расчётной потребности.
            </p>
          </div>
        </div>

        <!-- Радио: Отрицательный прогноз остатков -->
        <div class="d-radio__wrapper d-radio__wrapper--align-start d-radio__wrapper--fit">
          <label for="negativeForecast" class="d-radio">
            <input
              type="radio"
              name="negativeForecast"
              id="negativeForecast"
              class="d-radio__input"
            />
          </label>
          <label for="negativeForecast" class="d-radio__label"
            >Отрицательный прогноз остатков
          </label>
        </div>

        <!-- Поле: Кол-во дней для прогноза остатков -->
        <div class="d-field__wrapper d-field__wrapper--align-start d-field__wrapper--fit">
          <label for="numberForecast" class="d-field__label"
            >Кол-во дней для прогноза остатков
          </label>
          <div class="d-field">
            <input type="text" name="numberForecast" id="numberForecast" class="d-field__input" />

            <span class="d-field__suffix">дней</span>
          </div>
        </div>

        <!-- Поле: Кол-во месяцев для расчета скорости продаж -->
        <div class="d-field__wrapper d-field__wrapper--align-start d-field__wrapper--fit">
          <label for="numberMonths" class="d-field__label"
            >Кол-во месяцев для расчета скорости продаж
          </label>
          <div class="d-field">
            <input type="text" name="numberMonths" id="numberMonths" class="d-field__input" />

            <span class="d-field__suffix">мес.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Фильтры -->
    <!-- При натягивании верстки эту обертку удалить ↓↓↓ -->
    <div class="hidden" id="filter">
      <div class="products__filter">
        <!-- Радио: Только товары склада покупателя -->
        <div class="d-radio__wrapper d-radio__wrapper--align-start d-radio__wrapper--fit">
          <label for="onlyBuyerWarehouse" class="d-radio">
            <input
              type="radio"
              name="onlyBuyerWarehouse"
              id="onlyBuyerWarehouse"
              class="d-radio__input"
            />
          </label>
          <label for="onlyBuyerWarehouse" class="d-radio__label"
            >Только товары склада покупателя
          </label>
        </div>

        <!-- Радио: Только товары с продажами -->
        <div class="d-radio__wrapper d-radio__wrapper--align-start d-radio__wrapper--fit">
          <label for="onlyWithSales" class="d-radio">
            <input type="radio" name="onlyWithSales" id="onlyWithSales" class="d-radio__input" />
          </label>
          <label for="onlyWithSales" class="d-radio__label">Только товары с продажами </label>
        </div>
      </div>
    </div>
  </div>
  <product
    v-for="item in opt_products.items"
    :key="item.id"
    :product="item"
    @updateBasket="updateBasket()"
  />
  <div class="d-pagination-wrap" v-if="pagesCount > 1">
    <paginate
      :page-count="pagesCount"
      :click-handler="pagClickCallback"
      :prev-text="'Пред'"
      :next-text="'След'"
      :container-class="'d-pagination d-table__footer-right-pagination'"
      :page-class="'d-pagination__item'"
      :active-class="'d-pagination__item--active'"
      :initialPage="this.page"
      :forcePage="this.page"
    >
    </paginate>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Paginate from 'vuejs-paginate-next'
import Loader from '@/shared/ui/Loader.vue'
import product from './ui/product.vue'

export default {
  name: 'purchasesCatalog',
  components: { breadcrumbs, Loader, Paginate, product },
  props: {
    id: {
      type: String,
      default: '',
    },
    category_id: {
      type: String,
      default: '',
    },
    search: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      filters: {},
      show_order: false,
      show_filters: false,
      loading: true,
      loading_elems: [],
      reloading: false,
      opt_products: {},
      order_id: 0,
      page: 1,
      per_page: 25,
      filter: [
        {
          type: 'checkbox',
          key: 'negative',
          label: 'Отрицательный прогноз остатков',
          value: false,
        },
        {
          type: 'number',
          key: 'days_forecast',
          label: 'Кол-во дней для прогноза остатков',
          value: 5,
          min: 1,
          max: 30,
        },
        {
          type: 'number',
          key: 'months',
          label: 'Кол-во месяцев для расчета',
          value: 1,
          min: 1,
          max: 12,
        },
        {
          type: 'checkbox',
          key: 'only_warehouse',
          label: 'Только товары склада покупателя',
          value: false,
        },
        {
          type: 'checkbox',
          key: 'only_purchases',
          label: 'Только товары с продажами',
          value: false,
        },
      ],
    }
  },
  methods: {
    ...mapActions({
      getOptProducts: 'catalog/getOptProducts',
      getBasket: 'basket/getBasket',
    }),
    updateBasket() {
      this.getBasket()
    },
    updatePage(order_id) {
      this.order_id = order_id
      this.page = 1
      this.loading = true
      const data = {
        page: this.page,
        perpage: this.per_page,
        filters: this.filters,
        basket: this.basket,
      }
      if (this.$route.name == 'purchasesCatalogSearch') {
        data.search = this.$route.params.search
      }
      this.getOptProducts(data).then(() => {
        this.opt_products = this.optProducts
        this.loading = false
      })
    },
    pagClickCallback(pageNum) {
      this.page = pageNum
      this.loading = true
      const data = {
        page: this.page,
        perpage: this.per_page,
        filters: this.filters,
        basket: this.basket,
      }
      if (this.$route.name == 'purchasesCatalogSearch') {
        data.search = this.$route.params.search
      }
      this.getOptProducts(data).then(() => {
        this.opt_products = this.optProducts
        this.loading = false
      })

      const el = document.querySelector('.products__top-wrapper')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
  },
  mounted() {
    const data = {
      page: this.page,
      perpage: this.per_page,
    }
    if (this.$route.name == 'purchasesCatalogSearch') {
      data.search = this.$route.params.search
    }
    this.getOptProducts(data).then(() => {
      this.opt_products = this.optProducts
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      optProducts: 'catalog/optProducts',
    }),
    pagesCount() {
      let pages = Math.ceil(this.optProducts.total / this.per_page)
      if (pages === 0) {
        pages = 1
      }
      return pages
    },
  },
  watch: {
    optProducts: function (newVal) {
      this.opt_products = newVal
    },
    $route() {
      this.updatePage(0)
      // if (this.$route.params.warehouse_id) {
      // 	this.get_opt_warehouse().then((this.opt_warehouse = this.optwarehouse));
      // }
    },
  },
}
</script>
<style lang="scss"></style>
