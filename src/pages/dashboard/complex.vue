<template>
  <Toast />
  <section class="promo sale_page shipments order_content dashboard" id="promo">
    <Loader v-if="loading" />
    <!-- Верхушка страницы -->
    <div class="d-top">
      <breadcrumbs />
    </div>
    <div class="dashboard__header">
      <div class="dashboard__header-title">
        <h1 class="dashboard__header-title-h1">Комплексный анализ</h1>
        <p class="dashboard__header-title-text">
          Анализ проводится c использованием данных, консолидированных от интегрированных компаний
        </p>
      </div>
      <div class="dashboard__header-filters"></div>
    </div>
    <div class="complex-analysis">
      <div class="complex-analysis__filters">
        <div v-for="(item, index) in filters" :key="index" class="complex-analysis__filters-item">
          <div class="complex-analysis__filters-item-container" v-if="item.type == 'text'">
            <FloatLabel class="search-floatlabel">
              <InputText
                :id="item.name"
                :name="item.name"
                v-model="form[item.name]"
                @update:modelValue="changeFilter()"
              />
              <label :for="item.name">{{ item.label }}</label>
            </FloatLabel>
          </div>
          <div class="complex-analysis__filters-item-container" v-else-if="item.type == 'dates'">
            <DatePicker
              v-model="form[item.name]"
              @hide="changeFilter()"
              dateFormat="dd.mm.yy"
              :placeholder="item.label"
              :manualInput="false"
              :maxDate="date_now"
              showIcon
              showClear
              iconDisplay="input"
              selectionMode="range"
              class="complex-analysis__filters-item-container-dates"
              :id="item.name"
              :name="item.name"
            >
              <template #footer>
                <div class="complex-analysis__filters-item-container-dates-footer">
                  <button
                    class="d-button d-button-primary d-button-primary-small d-button-clear-dates"
                    @click.prevent="form[item.name] = null"
                  >
                    Сбросить
                  </button>
                  <button
                    class="d-button d-button-primary d-button-primary-small"
                    @click.prevent="changeFilter()"
                  >
                    Готово
                  </button>
                </div>
              </template>
            </DatePicker>
          </div>
          <div class="complex-analysis__filters-item-container" v-else-if="item.type == 'tree'">
            <TreeSelect
              v-model="form[item.name]"
              :multiple="true"
              :options="item.value"
              :placeholder="item.label"
              valueFormat="id"
              :limit="1"
              :limitText="(count) => `и еще ${count}`"
              @select="changeFilter"
              @deselect="changeFilter"
            />
          </div>
          <div class="complex-analysis__filters-item-container" v-else-if="item.type == 'range'">
            <FloatLabel
              ><InputText
                :id="item.name"
                :name="item.name"
                v-model="form[item.name + '_string']"
                @input="changeFilter()"
              />
              <label :for="item.name">{{ item.label }}</label>
            </FloatLabel>
            <Slider
              v-model="form[item.name]"
              range
              class="w-56"
              :min="item.value.min"
              :max="item.value.max"
              @slideend="changeFilter()"
            />
          </div>
          <div class="complex-analysis__filters-item-container" v-else>{{ item.label }}</div>
        </div>
        <!-- <div class="complex-analysis__filters-item"></div>
        <div class="complex-analysis__filters-item">
          <button
            class="d-button complex-analysis__filters-item-map_button"
            @click.prevent="modalMap = true"
          >
            <img class="d-icon-catalog d-icon" src="/icons/icon_arrows.svg" /> Развернуть карту
          </button>
        </div> -->
      </div>
      <div class="complex-analysis__badges">
        <div class="complex-analysis__badges-item">
          <div class="complex-analysis__badges-item-title">Остатки (общее):</div>
          <div class="complex-analysis__badges-item-values">
            <div class="complex-analysis__badges-item-values-value_rub">
              {{ complex.total_remains_price }} ₽
            </div>
            <div class="complex-analysis__badges-item-values-value_col">
              {{ complex.total_remains }} шт.
            </div>
          </div>
        </div>
        <div class="complex-analysis__badges-item">
          <div class="complex-analysis__badges-item-title">Продажи (общее):</div>
          <div class="complex-analysis__badges-item-values">
            <div class="complex-analysis__badges-item-values-value_rub">
              {{ complex.total_sales_price }} ₽
            </div>
            <div class="complex-analysis__badges-item-values-value_col">
              {{ complex.total_sales }} шт.
            </div>
          </div>
        </div>
        <div class="complex-analysis__badges-item">
          <div class="complex-analysis__badges-item-title">Упущенная выручка (общее):</div>
          <div class="complex-analysis__badges-item-values">
            <div class="complex-analysis__badges-item-values-value_rub">
              {{ complex.total_lost_revenue_price }} ₽
            </div>
            <div class="complex-analysis__badges-item-values-value_col">
              {{ complex.total_lost_revenue }} шт.
            </div>
          </div>
        </div>
      </div>
      <div class="complex-analysis__tables">
        <div class="complex-analysis__tables-item">
          <BaseTable
            :items_data="complex.sales"
            :total="complex.sales_total"
            :table_data="table_stores"
            :pagination_items_per_page="this.pagination_items_per_page_stores"
            :pagination_offset="this.pagination_offset_stores"
            :page="this.pageStores"
            @paginate="paginateStores"
          ></BaseTable>
        </div>
        <div class="complex-analysis__tables-item">
          <BaseTable
            :items_data="complex.data"
            :total="complex.total"
            :table_data="table_products"
            :pagination_items_per_page="this.pagination_items_per_page_products"
            :pagination_offset="this.pagination_offset_products"
            :page="this.pageProducts"
            @paginate="paginateProducts"
          ></BaseTable>
        </div>
      </div>
    </div>

    <customModal v-model="modalMap">
      <YandexMap></YandexMap>
    </customModal>
  </section>
</template>
<script>
import breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Toast from 'primevue/toast'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import DatePicker from 'primevue/datepicker'
import { mapActions, mapGetters } from 'vuex'
import BaseTable from '@/shared/ui/table/table.vue'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import TreeSelect from '@zanmato/vue3-treeselect'
import '@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css'
import Slider from 'primevue/slider'
import YandexMap from '@/shared/ui/map/MapComplex.vue'

export default {
  name: 'ComplexAnalysis',
  components: {
    Loader,
    breadcrumbs,
    Toast,
    customModal,
    DatePicker,
    InputText,
    FloatLabel,
    Slider,
    TreeSelect,
    YandexMap,
    BaseTable,
  },

  data() {
    return {
      loading: true,
      pageStores: 1,
      pageProducts: 1,
      filters: [
        {
          name: 'name',
          type: 'text',
          label: 'Название товара или артикул',
          value: '',
        },
        {
          name: 'period',
          type: 'dates',
          label: 'Период выборки',
          value: '',
        },
        // {
        //   name: 'category',
        //   type: 'tree',
        //   label: 'Категории',
        //   value: '',
        // },
        // {
        //   name: 'brand',
        //   type: 'tree',
        //   label: 'Бренд',
        //   value: '',
        // },
        {
          name: 'out_of_stock',
          type: 'range',
          label: 'Out of stock',
          value: {
            min: 0,
            max: 365,
          },
        },
        // {
        //   name: 'store',
        //   type: 'tree',
        //   label: 'Магазин',
        //   value: '',
        // },
        // {
        //   name: 'region',
        //   type: 'tree',
        //   label: 'Регион',
        //   value: '',
        // },
        {
          name: 'lost_revenue',
          type: 'range',
          label: 'Упущенная выручка',
          value: {
            min: 0,
            max: 500000,
          },
        },
        {
          name: 'sales_col',
          type: 'range',
          label: 'Продажи в штуках',
          value: {
            min: 0,
            max: 500,
          },
        },
        {
          name: 'sales_rub',
          type: 'range',
          label: 'Продажи в рублях',
          value: {
            min: 0,
            max: 500000,
          },
        },
        {
          name: 'remains',
          type: 'range',
          label: 'Остатки',
          value: {
            min: 0,
            max: 500000,
          },
        },
        {
          name: 'sales_speed',
          type: 'range',
          label: 'Скорость продаж',
          value: {
            min: 0,
            max: 500000,
          },
        },
        {
          name: 'price',
          type: 'range',
          label: 'Цена',
          value: {
            min: 0,
            max: 500000,
          },
        },
      ],
      table_stores: {
        name: {
          label: 'Торговые точки / Склады',
          type: 'text-store-items',
          class: '',
          items: ['name', 'address'],
        },
        remains: {
          label: 'Остатки в шт',
          type: 'text',
          class: 'cell_centeralign',
        },
        remains_price: {
          label: 'Остатки в ₽',
          type: 'text',
          class: 'cell_centeralign',
        },
        out_of_stock: {
          label: 'Out of stock',
          type: 'text',
          class: 'cell_centeralign',
        },
        sales: {
          label: 'Продажи в шт',
          type: 'text',
          class: 'cell_centeralign',
        },
        sales_price: {
          label: 'Продажи в ₽',
          type: 'text',
          class: 'cell_centeralign',
        },
        lost_items: {
          label: 'Упущенные продажи в шт',
          type: 'text',
          class: 'cell_centeralign',
        },
        lost_revenue: {
          label: 'Упущенные продажи в ₽',
          type: 'text',
          class: 'cell_centeralign',
        },
        speed: {
          label: 'Скорость продаж',
          type: 'text',
          class: 'cell_centeralign',
        },
        price: {
          label: 'Цена в ₽',
          type: 'text',
          class: 'cell_centeralign',
        },
      },
      table_products: {
        name: {
          label: 'Товары',
          type: 'text-store-items',
          class: '',
          items: ['name', 'article'],
        },
        remains: {
          label: 'Остатки в шт',
          type: 'text',
          class: 'cell_centeralign',
        },
        remains_price: {
          label: 'Остатки в ₽',
          type: 'text',
          class: 'cell_centeralign',
        },
        out_of_stock: {
          label: 'Out of stock',
          type: 'text',
          class: 'cell_centeralign',
        },
        sales: {
          label: 'Продажи в шт',
          type: 'text',
          class: 'cell_centeralign',
        },
        sales_price: {
          label: 'Продажи в ₽',
          type: 'text',
          class: 'cell_centeralign',
        },
        lost_items: {
          label: 'Упущенные продажи в шт',
          type: 'text',
          class: 'cell_centeralign',
        },
        lost_revenue: {
          label: 'Упущенные продажи в ₽',
          type: 'text',
          class: 'cell_centeralign',
        },
        speed: {
          label: 'Скорость продаж',
          type: 'text',
          class: 'cell_centeralign',
        },
        price: {
          label: 'Цена в ₽',
          type: 'text',
          class: 'cell_centeralign',
        },
      },
      form: {
        name: '',
        period: [],
        category: [],
        brand: [],
        out_of_stock: [],
        store: [],
        region: [],
        lost_revenue: [],
        sales_col: [],
        sales_rub: [],
        remains: [],
        sales_speed: [],
        price: [],
        lost_revenue_string: '',
        sales_col_string: '',
        sales_rub_string: '',
        remains_string: '',
        sales_speed_string: '',
        price_string: '',
        out_of_stock_string: '',
      },
      modalMap: false,
    }
  },
  props: {
    pagination_items_per_page_stores: {
      type: Number,
      default: 50,
    },
    pagination_offset_stores: {
      type: Number,
      default: 0,
    },
    pagination_items_per_page_products: {
      type: Number,
      default: 50,
    },
    pagination_offset_products: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      // catalogs: 'addition/catalogs',
      // vendors: 'addition/vendors',
      // clients: 'org/clients',
      // regions: 'addition/regions',
      complex: 'org/complex',
    }),
  },
  mounted() {
    console.log('1')
    // this.getRegions({ exclude: '', filter: '' })
    // this.getCatalogs()
    // this.getVendors()
    // this.getClients()
    this.getComplex({ filters: this.form }).then(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions({
      // getCatalogs: 'addition/getCatalogs',
      // getVendors: 'addition/getVendors',
      // getClients: 'org/getClientsStores',
      // getRegions: 'addition/getRegions',
      getComplex: 'org/getComplex',
    }),
    changeFilter() {
      this.loading = true
      this.getComplex({ filters: this.form }).then(() => {
        this.loading = false
      })
    },
    paginateStores(data) {
      this.loading = true
      //this.unsetOffers()
      this.pageStores = data.page
      //this.getOffers(data).then(() => {
      this.loading = false
      //})
    },
    paginateProducts(data) {
      this.loading = true
      //this.unsetOffers()
      this.paginateProducts = data.page
      //this.getOffers(data).then(() => {
      this.loading = false
      //})
    },
  },
  watch: {
    catalogs: function (newVal) {
      if (newVal) {
        for (var i in this.filters) {
          if (this.filters[i].name == 'category') {
            this.filters[i].value = newVal
          }
        }
      }
    },
    vendors: function (newVal) {
      if (newVal) {
        for (var i in this.filters) {
          if (this.filters[i].name == 'brand') {
            this.filters[i].value = newVal
          }
        }
      }
    },
    clients: function (newVal) {
      if (newVal) {
        for (var i in this.filters) {
          if (this.filters[i].name == 'store') {
            this.filters[i].value = newVal
          }
        }
      }
    },
    regions: function (newVal) {
      if (newVal) {
        for (var i in this.filters) {
          if (this.filters[i].name == 'region') {
            this.filters[i].value = newVal
          }
        }
      }
    },
    'form.out_of_stock': function (newVal) {
      this.form.out_of_stock_string = newVal[0] + ' дн. - ' + newVal[1] + ' дн.'
    },
    'form.lost_revenue': function (newVal) {
      this.form.lost_revenue_string = newVal[0] + ' ₽ - ' + newVal[1] + ' ₽'
    },
    'form.sales_col': function (newVal) {
      this.form.sales_col_string = newVal[0] + ' шт. - ' + newVal[1] + ' шт.'
    },
    'form.sales_rub': function (newVal) {
      this.form.sales_rub_string = newVal[0] + ' ₽ - ' + newVal[1] + ' ₽'
    },
    'form.remains': function (newVal) {
      this.form.remains_string = newVal[0] + ' шт. - ' + newVal[1] + ' шт.'
    },
    'form.sales_speed': function (newVal) {
      this.form.sales_speed_string = newVal[0] + ' - ' + newVal[1]
    },
    'form.price': function (newVal) {
      this.form.price_string = newVal[0] + ' ₽ - ' + newVal[1] + ' ₽'
    },
  },
}
</script>
<style lang="scss">
.dashboard__header {
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 59px;
  &-title {
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-width: 687px;
    &-h1 {
      font-weight: 600;
      font-size: 24px;
      line-height: 31px;

      color: #282828;
    }
    &-text {
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;

      color: #757575;
    }
  }
  &-filters {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 16px;
    min-width: 384px;
    &-label {
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;

      color: #757575;
    }
  }
}
.complex-analysis {
  &__filters {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    gap: 36px 32px;
    align-items: start;
    &-item {
      width: 100%;
      height: 40px;
      &-container {
        position: relative;
        width: 100%;
        height: 100%;
        .p-inputtext {
          width: 100%;
          font-size: 14px;
          line-height: 18px;
          color: #282828;
          background: #fff;
          padding-block: 10px;
          padding-inline: 16px 40px;
          border: 1px solid #75757575;
          border-radius: 40px;
          box-shadow: none;
        }
        .p-floatlabel label {
          font-size: 14px;
          color: #757575;

          inset-inline-start: 16px;
        }
        .p-floatlabel.search-floatlabel:after {
          content: '\e01d';
          font-family: 'Iconly' !important;
          position: absolute;
          font-size: 14px;
          top: calc(50% - 7px);
          right: 21px;
        }
        .p-floatlabel:has(input.p-filled) label,
        .p-floatlabel:has(textarea.p-filled) label,
        .p-floatlabel:has(.p-inputwrapper-filled) label {
          color: #757575;
        }
        .p-inputtext:enabled:hover {
          border-color: #75757575;
        }
        .p-datepicker {
          width: 100%;
        }
        .p-inputtext::placeholder {
          color: #757575;
          font-weight: 500;
        }
        .p-datepicker-input-icon-container {
          color: #282828;
          svg {
            width: auto;
            height: 14px;
            padding-right: 8px;
          }
        }
        .vue3-treeselect {
          height: 40px;
          span {
            max-width: 130px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &__control {
            height: 40px;
            border: 1px solid #75757575;
            border-radius: 20px;
          }
          &__multi-value-item {
            background: #ededed;
            border: 1px solid transparent;
            border-radius: 20px;
            color: #282828;

            font-size: 12px;
            padding: 5px;
            vertical-align: middle;
          }
          &__value-remove {
            border-left: 1px solid #ededed;
            color: #282828;
          }
          &__limit-tip-text {
            color: #757575;
            font-weight: 400;
          }
          &__limit-tip {
            padding-top: 8px;
          }
          &__placeholder {
            padding-left: 9px;
            line-height: 40px;
            font-size: 14px;
            color: #757575;
            font-weight: 500;
          }
          &__control-arrow {
            color: #282828;
          }
        }
        .vue3-treeselect:not(.vue3-treeselect--disabled):not(.vue3-treeselect--focused)
          .vue3-treeselect__control:hover {
          border-color: #75757575;
        }

        .p-slider {
          height: 1px;
          min-height: 1px;
          max-height: 1px;
          width: 86%;
          margin-left: 7%;
          &-range {
            background-color: #f92c0d;
            height: 1px;
            min-height: 1px;
            max-height: 1px;
          }
        }
      }

      &-map_button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        background-color: #282828;
        color: #fff;
        font-size: 16px;
        line-height: 21px;
        box-shadow: none;
        border: 1px solid #282828;
        height: 40px;
        img {
          width: 16px;
          height: 16px;
        }
      }
      &-map_button:hover {
        background-color: transparent;
        color: #282828;
        img {
          filter: brightness(0.1);
        }
      }
    }
  }
  &__badges {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 24px;
    align-items: start;
    margin-top: 60px;
    &-item {
      width: 100%;
      background: #f2f2f2;
      border-radius: 16px;
      padding: 32px;
      &-title {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #757575;
      }
      &-values {
        display: flex;
        gap: 16px;
        align-items: center;
        margin-top: 16px;
        &-value_rub {
          font-weight: 600;
          font-size: 24px;
          line-height: 31px;

          color: #282828;
        }
        &-value_col {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;

          color: #757575;
        }
      }
    }
  }
  &__tables {
    .dart-mb-1 {
      margin-bottom: 0;
    }
    display: flex;
    flex-direction: column;
    gap: 64px;
    margin-top: 80px;
  }
}

.complex-analysis__filters-item-container-dates-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  .d-button {
    width: 100%;
    box-shadow: none;
  }
}
</style>
