<template>
  <section class="warehouse-analysis" id="warehouse-analysis">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>

    <div class="warehouse-analysis__header">
      <h1 class="warehouse-analysis__header-title">Анализ склада</h1>

    <!--  <button
        class="d-button d-button-primary d-button--no-shadow warehouse-analysis__header-button"
        @click.prevent="this.modalAddStore = true"
      >
        <i class="d-icon-plus-flat warehouse-analysis__header-button-icon"></i>
        <span>Добавить склад</span>
      </button>-->

    </div>

    <Loader v-if="loading" />
    <div class="warehouse-analysis__table">
      <BaseTable
        :items_data="orgStores.items"
        :total="orgStores.total"
        :table_data="this.table_stores"

      />
    </div>

    <teleport to="body">
      <customModal v-model="this.modalAddStore" class="warehouse-analysis__modal">

								<div class="d-modal2 d-modal2--active warehouse-analysis__add-modal" data-modal2="testModal">
									<button class="d-modal2__close warehouse-analysis__add-close" data-modal2-close>
										<i class="d-icon-times d-modal2__close-icon"></i>
									</button>
									<div class="d-modal2__header warehouse-analysis__add-header">
										<p class="d-modal2__title warehouse-analysis__add-title">Добавить склад</p>
										<p class="d-modal2__description warehouse-analysis__add-text">Для создания нового склада, введите нужную информации в поля.</p>
									</div>
									<div class="d-modal2__content">
										<div class="warehouse-analysis__add-content">
											<div class="d-field-wrapper d-field-wrapper--vertical d-field-wrapper--small warehouse-analysis__add-input-wrapper">
												<label for="date" class="d-dropdown__label warehouse-analysis__add-input-label">Название склада</label>
												<div class="d-input d-input--light warehouse-analysis__add-input">

                          <input
                            type="text"
                            v-model="this.form.name"
                            placeholder="Например «Фин Пром Строй"
                            class="d-input__field warehouse-analysis__add-input-field"
                          />

												</div>
											</div>
											<div class="d-field-wrapper d-field-wrapper--vertical d-field-wrapper--small warehouse-analysis__add-input-wrapper">
												<label for="date" class="d-dropdown__label warehouse-analysis__add-input-label">Адрес склада</label>
												<div class="d-input d-input--light warehouse-analysis__add-input">

                          <input
                            type="text"
                            v-model="this.form.adres"
                            placeholder="Москва, ул. Некрасова 56, офис 23"
                            class="d-input__field warehouse-analysis__add-input-field"
                          />

												</div>
											</div>
										</div>

										<div class="d-modal2__actions warehouse-analysis__add-actions">
											<button
												class="d-button d-button-secondary d-button-secondary-small box-shadow-none d-modal2__action-button warehouse-analysis__add-actions-button warehouse-analysis__add-actions-button--cancel"
                        @click.prevent="this.modalAddStore = false"
                        >
												<span>Отменить</span>
											</button>

											<button
												class="d-button d-button-primary d-button-primary-small box-shadow-none d-modal2__action-button warehouse-analysis__add-actions-button warehouse-analysis__add-actions-button--ok"
											>
												<span>Создать</span>
											</button>
										</div>
									</div>
								</div>

      </customModal>
    </teleport>

    <h2 class="warehouse-analysis__subtitle">Анализ ассортимента</h2>

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
import customModal from '@/shared/ui/Modal.vue'

export default {
  name: 'WarehouseReview',
  components: { Breadcrumbs, Loader, customModal, BaseTable },
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
      modalAddStore: false,
      productsData: [],
      productsTotal: 0,
      color: '#757575',
			table_stores: {
        name: {
          label: 'Название',
          type: 'link',
          link_to: 'warehouseReviewStore',
          link_params: {
              id: this.$route.params.id,
              store_id: 'id',
          },
          class: 'cell_review-stores-name',
          items: ['name_short','address'],
        },
				integration_check: {
					label: "Интеграция",
					type: "text",
          class: 'cell_centeralign cell_review-stores-active',
				},
        store_type: {
					label: "Тип склада",
					type: "text",
          class: 'cell_centeralign cell_review-stores-active',
				},
        //actions: {
        //  label: '',
        //  type: 'actions',
        //  sort: false,
        //  available: {
        //    delete: {
        //      icon: 'pi pi-trash',
        //      label: 'Удалить',
        //    },
        //  },
        //  class: 'cell_rightalign cell_review-stores-trash',
        //},
      },
      form: {
        name: '',
        adres: '',
      },
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
    this.getOrgStores().then(() => {
      this.loading = false
    })


    this.getData({
          page: this.page,
          perpage: this.pagination_items_per_page,
        }).then(() => {
          this.getVendors()
          this.getCatalogs()
        })
  },
  computed: {
    ...mapGetters({
      orgStores: 'org/orgStores',
      vendors: 'addition/vendors',
      catalogs: 'addition/catalogs',
      products: 'warehouse/products'
    })
  },
  methods: {
    ...mapActions({
      getOrgStores: 'org/getOrgStores',
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
    }
  }
}
</script>
<style lang="scss">
/* восстановить, если появляется возможность удалить склад
.warehouse-analysis__table .d-table__head .d-table__head-col:last-child:before{
  display:none;
}*/
.warehouse-analysis__table .d-table__head .d-table__head-col:nth-child(2),.warehouse-analysis__table .d-table__row .d-table__col:nth-child(2){
  min-width: 40%;
  width: 40%;
}
.warehouse-analysis__table .d-table__row .d-table__col:first-child a{
  display: flex;
  align-items: center;
  gap: 0;
}
.warehouse-analysis__table .d-table__row .d-table__col:first-child a .multyitem_cell:first-child{
  font-size: 16px;
  font-weight: 600;
  padding-right: 32px;
  width: 35%;
  position:relative;
}

.warehouse-analysis__table .d-table__row .d-table__col:first-child a .multyitem_cell:last-child{
  color: #757575;
  font-size: 14px;
  font-weight: 400;
  width: 60%;
  padding-left: 52px;
  position:relative;
}
.warehouse-analysis__table .d-table__row .d-table__col:first-child a .multyitem_cell:first-child::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    translate: 0 -50%;
    width: 0.5px;
    height: var(--d-table-col-divider-height);
    background-color: rgba(117, 117, 117, 0.4588235294);
}
.warehouse-analysis__table .d-table__row .d-table__col:first-child a .multyitem_cell:last-child::before {
  content: '\e00b';
  font-family: 'Iconly';
  position: absolute;
  font-size: 13px;
  width: 16px;
  height: 16px;
  top: calc(50% - 8px);
  left: 32px;

}
.cell_review-stores-active .cell__success,.cell_review-stores-active .cell__error{
  font-size: 16px;
  font-weight: 500;
  color: #282828;
}
.cell_rightalign{
  text-align: right;
}
.warehouse-analysis__table .d-table__body .d-table__row{
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.2588235294);
  background-clip: padding-box;
}
.warehouse-analysis__table .d-table__body .d-table__row .d-table__col{
  padding-top: 19px;
  padding-bottom: 19px;
}
.warehouse-analysis__table  tbody .d-table__row:first-child::after, .warehouse-analysis__table  tbody .d-table__row::after{
  display:none;
}
.warehouse-analysis__table  .d-table {
  border-collapse: separate;
  border-spacing: 0 16px;
}
.warehouse-analysis__table .d-table__body .d-table__row .d-table__col{
    border: 5px solid #fff;
}
.warehouse-analysis__table .d-table__body .d-table__row .d-table__col:first-child {
    border-radius: 12px 0 0 12px ;
}
.warehouse-analysis__table .d-table__body .d-table__row .d-table__col:last-child {
    border-radius: 0 12px 12px 0;
}
.warehouse-analysis__table .d-table__head-col:first-child, .warehouse-analysis__table .d-table__col:first-child {
    padding-left: 16px;
}
.cell_review-stores-trash{
  margin-left:10px;
}
.warehouse-analysis__add-actions .d-button-secondary {
    background-color: #fff;
    border: 1px solid #282828;
    color: #282828;
}
.warehouse-analysis__add-actions .d-button-secondary:hover {
    background-color:#282828;
    border: 1px solid #282828;
    color:  #fff;
}
.warehouse-analysis__products .dart-row .d-col-xl-6:last-child,.warehouse-analysis__products .dart-row .d-col-xl-6:nth-last-child(2){
  margin-top: 16px;
}
.warehouse-analysis__products .p-inputtext, .warehouse-analysis__products .p-inputnumber, .warehouse-analysis__products .p-select{
  width: 100%;
}
.warehouse-analysis__products .dart-row .d-col-xl-6:nth-child(-n+3){
  padding-right:20px;
}
.warehouse-analysis__products .dart-row .d-col-xl-6:nth-child(2),.warehouse-analysis__products .dart-row .d-col-xl-6:nth-child(3),.warehouse-analysis__products .dart-row .d-col-xl-6:nth-child(4),
.warehouse-analysis__products .dart-row .d-col-xl-6:nth-child(6){
  padding-left:20px;
}
.warehouse-analysis__products .p-checkbox{
  margin-right: 16px;
}
.warehouse-analysis__products .dart-form-group label{
  font-size: 16px;
  color: #757575;
}
.warehouse-analysis__products .p-floatlabel label, .warehouse-analysis__products .p-inputtext::placeholder, .warehouse-analysis__products .p-placeholder{
  font-size: 14px;
  color: #757575;
}
.warehouse-analysis__products .form_input_group:after {
  content: '\e003';
  font-family: 'Iconly' !important;
  position: absolute;
  font-size: 16.8px;
  top: calc(50% - 8.4px);
  right: 30px;
}
.warehouse-analysis__products .dart-form-group > span {
    display: inline-flex;
    font-size: 14px;
    margin-bottom: 0px;
}
.warehouse-analysis__products .dart-align-items-center {
    -ms-flex-align: start !important;
    align-items: start !important;
}
</style>
