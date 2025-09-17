<template>
  <section class="warehouse-analysis" id="warehouse-analysis">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>

    <div class="warehouse-analysis__header">
      <h1 class="warehouse-analysis__header-title">Анализ склада</h1>
    </div>
    <div class="warehouse-analysis__header-storeinfo">
        <div class="warehouse-analysis__header-storeinfo-logo">
          <img :src="storeImage" />
        </div>
        <div class="warehouse-analysis__header-storeinfo-info">
          <div class="warehouse-analysis__header-storeinfo-info-name">{{ storeName }}</div>
          <div class="warehouse-analysis__header-storeinfo-info-address"><i class="d-icon-location"></i><span>{{ storeAddress }}</span></div>
        </div>
    </div>
    <Loader v-if="loading" />



    <div class="warehouse-analysis__description">
      <p>
        Параметр
        <b class="warehouse-analysis__description-bold">«Дней с Out of stoсk»</b> расчитывается за
        последний календарный месяц.
      </p>
      <p>
        Фильтр <b class="warehouse-analysis__description-bold">«Категория товара»</b> и
        <b class="warehouse-analysis__description-bold">«Производитель»</b> работает только с теми
        остатками, с которыми произошло сопоставление с карточками товаров из нашего справочника.
      </p>
    </div>



           <BaseTable
                :items_data="productsData"
                :total="productsTotal"
                :pagination_items_per_page="this.pagination_items_per_page"
                :pagination_offset="this.pagination_offset"
                :page="this.page"
                :table_data="product_table_data"
                :filters="products_filters"
                @filter="filter"
                @sort="filter"
                @paginate="paginate"
                class="warehouse-analysis__products"

            >
            </BaseTable>

  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'
import BaseTable from '@/shared/ui/table/table.vue'

export default {
  name: 'reviewStore',
components: { Breadcrumbs, Loader, BaseTable },
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
      loading: true,
      productsData: [],
      productsTotal: 0,
      storeName: '',
      storeImage: null,
      storeAddress: '',
      products_filters: {
          name: {
            name: 'Наименование, артикул',
            placeholder: 'Наименование, артикул',
            type: 'text'
          },
          no_motion: {
            name: 'Дней без движения',
            placeholder: 'Дней без движения',
            type: 'number',
            step: 10
          },
          vendor: {
            name: 'Производитель',
            placeholder: 'Выберите производителя',
            type: 'dropdown',
            values: this.getvendors
          },
          catalog: {
            name: 'Категория товара',
            placeholder: 'Выберите категорию',
            type: 'tree',
            values: this.getcatalog
          },
          minuses: {
            name: 'Только отрицательные значения',
            placeholder: 'Только отрицательные значения',
            type: 'checkbox'
          },
          instock: {
            name: 'Только в наличии',
            placeholder: 'Только в наличии',
            type: 'checkbox'
          }
        },
        product_table_data: {
          image: {
            label: 'Фото',
            type: 'image',
            class: 'cell_centeralign',
          },
          article: {
            label: 'Артикул',
            type: 'text',
            sort: true,
            class: 'cell_centeralign',
          },
          name: {
            label: 'Наименование',
            type: 'text',
            sort: true,
            class: 'cell_centeralign',
          },
          price: {
            label: 'Цена товара',
            type: 'text',
            sort: true,
            class: 'cell_centeralign',
          },
          available: {
            label: 'Остаток сейчас',
            type: 'text',
            sort: true,
            class: 'cell_centeralign',
          },
          sales_30: {
            label: 'Продаж за 30 дней',
            type: 'text',
            sort: true,
            class: 'cell_centeralign',
          },
          purchase_speed: {
            label: 'Скорость продажи шт/день',
            type: 'text',
            sort: true,
            class: 'cell_centeralign',
          },
          out_of_stock_days: {
            label: 'Дней с Out Of Stock',
            type: 'text',
            sort: true,
            class: 'cell_centeralign',
          },
          remains_history: {
            label: 'Изменение остатков',
            type: 'gist',
            sort: false,
            class: 'cell_centeralign',
          },
          no_money: {
            label: 'Упущенная выручка',
            type: 'text',
            sort: true,
            class: 'cell_centeralign',
          },
          forecast_all: {
            label: 'Прогноз остатков на завтра / 7 дней',
            type: 'text',
            sort: true,
            class: 'cell_centeralign',
          }
        },
        page: 1,
        avg_info: {
          remains: 0,
          no_money: 0,
          sales_speed: 0
        },
		}
  },
  mounted() {
    this.getOrgStore()
    this.getData({
          page: this.page,
          perpage: this.pagination_items_per_page,
        }).then(() => {
          this.loading = false
          this.getVendors()
          this.getCatalogs()
        })
  },
  computed: {
    ...mapGetters({
      orgStore: 'org/orgStore',
      vendors: 'addition/vendors',
      catalogs: 'addition/catalogs',
      products: 'warehouse/products'
    })
  },
  methods: {
    ...mapActions({
      getOrgStore: 'org/getOrgStore',
      getVendors: 'addition/getVendors',
      getCatalogs: 'addition/getCatalogs',
      getData: 'warehouse/getData'
    }),
    filter (data) {
        this.page = 1
        data.owner_id = this.$route.params.id
        data.id = this.$route.params.id
        this.loading = true
        this.getData(data).then(() => {
          this.avg_info.remains = this.products.avg_info?.remains
          this.avg_info.no_money = this.products.avg_info.no_money
          this.avg_info.sales_speed = this.products.avg_info.sales_speed
          this.loading = false
        })
      },
      paginate (data) {
        this.page = data.page
        data.owner_id = this.$route.params.id
        data.id = this.$route.params.id
        this.loading = true
        this.getData(data).then(() => {
          this.avg_info.remains = this.products.avg_info?.remains
          this.avg_info.no_money = this.products.avg_info.no_money
          this.avg_info.sales_speed = this.products.avg_info.sales_speed
          this.loading = false
        })
      }
  },
  watch: {
    products: function(newVal){
      this.productsData = newVal.products
      this.productsTotal = newVal.total
      if (typeof newVal === 'object') {
          this.avg_info.remains = newVal.avg_info?.remains
          if (Object.prototype.hasOwnProperty.call(newVal.avg_info, 'no_money')) {
            this.avg_info.no_money = newVal.avg_info.no_money
          } else {
            this.avg_info.no_money = 0
          }
          if (Object.prototype.hasOwnProperty.call(newVal.avg_info, 'sales_speed')) {
            this.avg_info.sales_speed = newVal.avg_info.sales_speed
          } else {
            this.avg_info.sales_speed = 0
          }
        } else {
          this.avg_info.remains = 0
          this.avg_info.no_money = 0
          this.avg_info.sales_speed = 0
        }
    },
    vendors: function(newVal) {
      this.products_filters.vendor.values = newVal
    },
    catalogs: function(newVal) {
      this.products_filters.catalog.values = newVal
    },
    orgStore: function(newVal) {

          this.storeName = newVal.name_short
          this.storeImage = newVal.image
          this.storeAddress = newVal.address

    }
  }
}
</script>
<style lang="scss">
.warehouse-analysis__header-storeinfo{
  display:flex;
  width:auto;
  gap: 8px;
  align-items: start;
  margin-bottom: 40px;
}
.warehouse-analysis__header-storeinfo-logo, .warehouse-analysis__header-storeinfo-logo img{
  height: 32px;
  width:auto;
}
.warehouse-analysis__header-storeinfo-info{
  display:flex;
  flex-direction: column;
  gap: 8px;
}
.warehouse-analysis__header-storeinfo-info-name{
  font-weight: 600;
  font-size: 24px;
  line-height: 31px;
  color: #282828;
}
.warehouse-analysis__header-storeinfo-info-address{
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: -0.01em;
  color: #757575;
}

</style>
