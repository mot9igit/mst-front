<template>
  <section class="products" id="products">
    <Loader v-if="loading" />
    <div class="products__top-wrapper" v-else>
      <div class="products__top">
        <!-- Левая часть верхушки страницы -->
        <div class="products__top-left">
          <breadcrumbs />
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
    <div
      class="catalog-top_button"
      v-if="
        !loading &&
        (this.$route.name == 'purchasesCatalogComplect' ||
          this.$route.name == 'purchasesCatalogRequirement')
      "
    >
      <h2 v-if="this.$route.name == 'purchasesCatalogComplect'" class="products__top-title">
        Товары по акции "{{ opt_products?.action?.name }}"
        <p>от {{ opt_products?.action?.org_name }}</p>
      </h2>
      <h2 v-if="this.$route.name == 'purchasesCatalogRequirement'" class="products__top-title">
        Товары из потребности "{{ opt_products?.name }}"
      </h2>
      <div
        class="catalog-top_button-cont"
        v-if="
          this.$route.name == 'purchasesCatalogRequirement' ||
          this.$route.name == 'purchasesCatalogComplect'
        "
      >
        <button
          class="d-button d-button-primary d-button-primary-small d-button--sm-shadow product-card-vertical__buy"
          :disabled="
            (this.$route.name == 'purchasesCatalogRequirement' &&
              opt_products?.total == opt_products?.total_no_available) ||
            (this.$route.name == 'purchasesCatalogComplect' && opt_products?.total_no_available > 0)
          "
          @click.prevent="addAll()"
        >
          <div class="d-button__text">
            <i class="d-icon-cart product-card__buy-icon"></i>
            Все в корзину
          </div>
        </button>
        <p
          v-if="
            opt_products.total_no_available > 0 && this.$route.name == 'purchasesCatalogComplect'
          "
        >
          В данный момент не все товары из комплекта есть в наличии, поэтому акция не может быть
          применена
        </p>
        <p
          v-if="
            opt_products.total_no_available > 0 &&
            this.$route.name == 'purchasesCatalogRequirement' &&
            opt_products?.total != opt_products?.total_no_available
          "
        >
          Обратите внимание, не все товары из потребности есть в наличии! В корзину попадут только
          товары, которые есть в наличии на данный момент
        </p>
        <p
          v-if="
            this.$route.name == 'purchasesCatalogRequirement' &&
            opt_products?.total == opt_products?.total_no_available
          "
        >
          В наличии нет товаров из потребности
        </p>
      </div>
    </div>

    <product
      v-for="item in opt_products.items"
      :key="item.id"
      :product="item"
      @updateBasket="updateBasket()"
      @updateCatalog="updateCatalog()"
      @counter="counter"
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
  </section>

  <customModal
    v-model="this.modalConflicts"
    class="product-card-actions__modal-all product-card-actions__modal-all-buy_all"
  >
    <allSalesWindow
      :offers="addItemsConflicts"
      :noconflicts="noconflicts"
      @windowClose="this.modalConflicts = false"
      @updateBasket="updateBasket()"
      @updateCatalog="updateCatalog()"
    />
  </customModal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Paginate from 'vuejs-paginate-next'
import Loader from '@/shared/ui/Loader.vue'
import product from './ui/product.vue'
import customModal from '@/shared/ui/Modal.vue'
import allSalesWindow from './ui/allSalesWindow.vue'

export default {
  name: 'purchasesCatalog',
  inject: ['catalogUpdater'],
  components: { breadcrumbs, Loader, Paginate, product, customModal, allSalesWindow },
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
      addItems: {},
      addItemsConflicts: {},
      noconflicts: {},
      modalConflicts: false,
    }
  },
  methods: {
    ...mapActions({
      getOptProducts: 'catalog/getOptProducts',
      getOfferOptProducts: 'offer/getOfferOptProducts',
      getBasket: 'basket/getBasket',
      getBasketOffer: 'offer/getBasketOffer',
      basketProductAdd: 'basket/basketProductAdd',
    }),

    updateBasket() {
      const data = {
        page: this.page,
        perpage: this.per_page,
      }
      if (
        this.$route.name == 'purchasesCatalogSearch' ||
        this.$route.name == 'purchasesCatalogSearchOffer'
      ) {
        data.search = this.$route.query.search
      }
      if (this.$route.name == 'purchasesCatalogComplect') {
        data.action_id = this.$route.params.action_id
      }
      if (this.$route.matched[5] && this.$route.matched[5].name == 'WholesaleClientsOffer') {
        this.getBasketOffer()
        data.search = this.$route.query.search
        this.getOfferOptProducts(data).then(() => {
          this.opt_products = this.optOfferProducts
          this.loading = false
        })
      } else {
        this.getBasket()
        this.getOptProducts(data).then(() => {
          this.opt_products = this.optProducts
          this.loading = false
        })
      }
    },
    updatePage(order_id) {
      let cart = {}
      this.order_id = order_id
      this.page = 1
      this.loading = true
      if (this.$route.matched[5] && this.$route.matched[5].name == 'WholesaleClientsOffer') {
        cart = this.basketOffer
      } else {
        cart = this.basket
      }
      const data = {
        page: this.page,
        perpage: this.per_page,
        filters: this.filters,
        basket: cart,
      }
      if (this.$route.name == 'purchasesCatalogSearch') {
        data.search = this.$route.query.search
      }
      if (this.$route.name == 'purchasesCatalogComplect') {
        data.action_id = this.$route.params.action_id
      }
      if (this.$route.matched[5] && this.$route.matched[5].name == 'WholesaleClientsOffer') {
        data.search = this.$route.query.search
        this.getOfferOptProducts(data).then(() => {
          this.opt_products = this.optOfferProducts
          this.loading = false
        })
      } else {
        this.getOptProducts(data).then(() => {
          this.opt_products = this.optProducts
          this.loading = false
        })
      }
    },
    pagClickCallback(pageNum) {
      let cart = {}
      this.page = pageNum
      this.loading = true
      if (this.$route.matched[5] && this.$route.matched[5].name == 'WholesaleClientsOffer') {
        cart = this.basketOffer
      } else {
        cart = this.basket
      }
      const data = {
        page: this.page,
        perpage: this.per_page,
        filters: this.filters,
        basket: cart,
      }
      if (this.$route.name == 'purchasesCatalogSearch') {
        data.search = this.$route.query.search
      }
      if (this.$route.name == 'purchasesCatalogComplect') {
        data.action_id = this.$route.params.action_id
      }
      if (this.$route.matched[5] && this.$route.matched[5].name == 'WholesaleClientsOffer') {
        data.search = this.$route.query.search
        this.getOfferOptProducts(data).then(() => {
          this.opt_products = this.optOfferProducts
          this.loading = false
        })
      } else {
        this.getOptProducts(data).then(() => {
          this.opt_products = this.optProducts
          this.loading = false
        })
      }

      const el = document.querySelector('.products__top-wrapper')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    updateCatalog() {
      this.loading = true
      const data = {
        page: this.page,
        perpage: this.per_page,
      }
      if (this.$route.name == 'purchasesCatalogSearch') {
        data.search = this.$route.query.search
      }
      if (this.$route.name == 'purchasesCatalogComplect') {
        data.action_id = this.$route.params.action_id
      }
      if (this.$route.matched[5] && this.$route.matched[5].name == 'WholesaleClientsOffer') {
        data.search = this.$route.query.search
        this.getOfferOptProducts(data).then(() => {
          this.opt_products = this.optOfferProducts
          this.loading = false
        })
      } else {
        this.getOptProducts(data).then(() => {
          this.opt_products = this.optProducts
          this.loading = false
        })
      }
    },
    addAll() {
      this.addItemsConflicts = {}
      this.noconflicts = {}
      for (var item in this.addItems) {
        if (
          this.addItems[item].item.price == 0 ||
          Number(this.addItems[item].item.remains_abstract) == 0
        ) {
          this.noconflicts[item] = this.addItems[item]
          this.noconflicts[item].count = 0
        } else {
          if (
            this.addItems[item].item.conflicts &&
            this.addItems[item].item.conflicts?.length > 1
          ) {
            this.addItemsConflicts[item] = this.addItems[item]
          } else {
            this.noconflicts[item] = this.addItems[item]
          }
        }
      }
      if (Object.keys(this.addItemsConflicts).length) {
        this.modalConflicts = true
      }
    },
    counter(obj) {
      let i = obj.item.remain_id
      this.addItems[i] = obj
    },
  },
  mounted() {
    const data = {
      page: this.page,
      perpage: this.per_page,
    }
    if (this.$route.name == 'purchasesCatalogSearch') {
      data.search = this.$route.query.search
    }
    if (this.$route.name == 'purchasesOfferCatalogRequirement') {
      data.req = this.$route.query.requirement_id
    }
    if (this.$route.name == 'purchasesCatalogComplect') {
      data.action_id = this.$route.params.action_id
    }
    if (this.$route.matched[5] && this.$route.matched[5].name == 'WholesaleClientsOffer') {
      data.search = this.$route.query.search
      this.getOfferOptProducts(data).then(() => {
        this.opt_products = this.optOfferProducts
        this.loading = false
      })
    } else {
      this.getOptProducts(data).then(() => {
        this.opt_products = this.optProducts
        this.loading = false
      })
    }
  },
  computed: {
    ...mapGetters({
      optProducts: 'catalog/optProducts',
      optOfferProducts: 'offer/optOfferProducts',
      orgActive: 'org/orgActive',
      optVendorsAvailable: 'org/optVendorsAvailable',
      optVendorsSelected: 'org/optVendorsSelected',
      basketWarehouse: 'basket/basketWarehouse',
      basketOfferWarehouse: 'offer/basketOfferWarehouse',
      basket: 'basket/basket',
      basketOffer: 'offer/basketOffer',
    }),
    pagesCount() {
      let pages = 1
      if (this.$route.matched[5] && this.$route.matched[5].name == 'WholesaleClientsOffer') {
        pages = Math.ceil(this.optOfferProducts.total / this.per_page)
      } else {
        pages = Math.ceil(this.optProducts.total / this.per_page)
      }
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
    optOfferProducts: function (newVal) {
      this.opt_products = newVal
    },
    optVendorsAvailable: function () {
      this.updatePage(0)
    },
    basketWarehouse: function () {
      this.updatePage(0)
    },
    basketOfferWarehouse: function () {
      this.updatePage(0)
    },
    orgActive: function () {
      this.updatePage(0)
    },
    catalogUpdater: function (newVal) {
      if (newVal) {
        this.updateCatalog()
      }
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
<style lang="scss">
.products__top-title {
  margin-bottom: 48px;
}
.catalog-top_button {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 24px;
}
.catalog-top_button h2 {
  max-width: 50%;
  font-weight: 600;
  font-size: 24px;
  line-height: 31px;
  color: #282828;
}
.catalog-top_button h2 p {
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: -0.01em;
  color: #757575;
}
.catalog-top_button-cont {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;
  gap: 16px;
}
.catalog-top_button-cont p {
  max-width: 80%;
  color: #757575;
  text-align: right;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.01em;
}
</style>
