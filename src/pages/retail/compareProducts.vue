<template>
  <section class="product-comparison" id="product-comparison">
    <div class="d-top">
      <breadcrumbs />
    </div>
    <h2>Сопоставление товаров</h2>
    <Loader v-if="loading" />
    <div class="product-comparison__stats">
								<div class="product-comparison__stats-top">
									<div class="product-comparison__stats-block">
										<p class="product-comparison__stats-block-title">Сопоставление товаров по стоимости</p>
										<div class="product-comparison__stats-block-content">
											<img src="/icons/donuts/donut-blue.svg" alt="" class="product-comparison__stats-block-image" />
											<div class="product-comparison__stats-block-info">
												<p class="product-comparison__stats-block-percent">80.54%</p>
												<div class="product-comparison__stats-block-progress product-comparison__stats-block-progress--primary">
													<div class="product-comparison__stats-block-progress-header">
														<p class="product-comparison__stats-block-progress-title">Товаров на сумму</p>
														<p class="product-comparison__stats-block-progress-value">2 123 432 434,45</p>
													</div>
													<div class="product-comparison__stats-block-progress-line"></div>
												</div>
												<div class="product-comparison__stats-block-progress product-comparison__stats-block-progress--secondary">
													<div class="product-comparison__stats-block-progress-header">
														<p class="product-comparison__stats-block-progress-title">Товаров на сумму</p>
														<p class="product-comparison__stats-block-progress-value">2 123 432 434,45</p>
													</div>
													<div class="product-comparison__stats-block-progress-line"></div>
												</div>
											</div>
										</div>
									</div>
									<div class="product-comparison__stats-block">
										<p class="product-comparison__stats-block-title">Сопоставление товаров по стоимости</p>
										<div class="product-comparison__stats-block-content">
											<img src="/icons/donuts/donut-solid-blue.svg" alt="" class="product-comparison__stats-block-image" />
											<div class="product-comparison__stats-block-info">
												<p class="product-comparison__stats-block-percent">80.54%</p>
												<div class="product-comparison__stats-block-progress product-comparison__stats-block-progress--solid product-comparison__stats-block-progress--primary">
													<div class="product-comparison__stats-block-progress-header">
														<p class="product-comparison__stats-block-progress-title">Товаров на сумму</p>
														<p class="product-comparison__stats-block-progress-value">2 123 432 434,45</p>
													</div>
													<div class="product-comparison__stats-block-progress-line"></div>
												</div>
												<div
													class="product-comparison__stats-block-progress product-comparison__stats-block-progress--solid product-comparison__stats-block-progress--secondary"
												>
													<div class="product-comparison__stats-block-progress-header">
														<p class="product-comparison__stats-block-progress-title">Товаров на сумму</p>
														<p class="product-comparison__stats-block-progress-value">2 123 432 434,45</p>
													</div>
													<div class="product-comparison__stats-block-progress-line"></div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="product-comparison__stats-bottom">
									<div class="product-comparison__stats-item product-comparison__stats-item--blue">
										<div class="product-comparison__stats-item-header">
											<div class="product-comparison__stats-item-header-left">
												<p class="product-comparison__stats-item-title">Укажите цену</p>
												<div class="d-badge2 d-badge2--fit product-comparison__stats-item-badge">0</div>
											</div>
										</div>

										<div class="product-comparison__stats-item-content">
											<img src="/icons/donuts/donut-blue.svg" alt="" class="product-comparison__stats-item-image" />
											<div class="product-comparison__stats-item-info">
												<p class="product-comparison__stats-item-percent">0.00%</p>
												<p class="product-comparison__stats-item-description">от общего сопоставления</p>
											</div>
										</div>
									</div>
									<div class="product-comparison__stats-item product-comparison__stats-item--green">
										<div class="product-comparison__stats-item-header">
											<div class="product-comparison__stats-item-header-left">
												<p class="product-comparison__stats-item-title">Нет бренда</p>
												<div class="d-badge2 d-badge2--fit product-comparison__stats-item-badge">3456</div>
											</div>

											<div class="product-comparison__stats-item-value-container">
												<p class="product-comparison__stats-item-value-label">на сумму</p>
												<p class="product-comparison__stats-item-value">10 106 705 ₽</p>
											</div>
										</div>

										<div class="product-comparison__stats-item-content">
											<img src="/icons/donuts/donut-green.svg" alt="" class="product-comparison__stats-item-image" />
											<div class="product-comparison__stats-item-info">
												<p class="product-comparison__stats-item-percent">0.00%</p>
												<p class="product-comparison__stats-item-description">от общего сопоставления</p>
											</div>
										</div>
									</div>
									<div class="product-comparison__stats-item product-comparison__stats-item--red">
										<div class="product-comparison__stats-item-header">
											<div class="product-comparison__stats-item-header-left">
												<p class="product-comparison__stats-item-title">Нет артикула</p>
												<div class="d-badge2 d-badge2--fit product-comparison__stats-item-badge">67</div>
											</div>

											<div class="product-comparison__stats-item-value-container">
												<p class="product-comparison__stats-item-value-label">на сумму</p>
												<p class="product-comparison__stats-item-value">0 ₽</p>
											</div>
										</div>

										<div class="product-comparison__stats-item-content">
											<img src="/icons/donuts/donut-red.svg" alt="" class="product-comparison__stats-item-image" />
											<div class="product-comparison__stats-item-info">
												<p class="product-comparison__stats-item-percent">0.00%</p>
												<p class="product-comparison__stats-item-description">от общего сопоставления</p>
											</div>
										</div>
									</div>
									<div class="product-comparison__stats-item product-comparison__stats-item--gray">
										<div class="product-comparison__stats-item-header">
											<div class="product-comparison__stats-item-header-left">
												<p class="product-comparison__stats-item-title">Нет карточки</p>
												<div class="d-badge2 d-badge2--fit product-comparison__stats-item-badge">67</div>
											</div>

											<div class="product-comparison__stats-item-value-container">
												<p class="product-comparison__stats-item-value-label">на сумму</p>
												<p class="product-comparison__stats-item-value">34 434 544 654 ₽</p>
											</div>
										</div>

										<div class="product-comparison__stats-item-content">
											<img src="/icons/donuts/donut-gray.svg" alt="" class="product-comparison__stats-item-image" />
											<div class="product-comparison__stats-item-info">
												<p class="product-comparison__stats-item-percent">0.00%</p>
												<p class="product-comparison__stats-item-description">от общего сопоставления</p>
											</div>
										</div>
									</div>
								</div>
							</div>
    <div class="warehouse-analysis__table product-comparison__stores">
      <BaseTable
        :items_data="orgStores.items"
        :total="orgStores.total"
        :table_data="this.table_stores"

      />
    </div>


  </section>
</template>
<script>
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import customModal from '@/shared/ui/Modal.vue'

export default {
  name: 'RetailCompareProducts',
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
          label: 'Название / Адрес',
          type: 'link',
          class: 'cell_comparison-stores-name',
          items_incl_img: ['image','name_short','address'],
        },
				active: {
					label: "Активно",
					type: "boolean_active",
          class: 'cell_centeralign cell_review-stores-active',
				},
				remains: {
					label: "Кол-во товаров, шт.",
					type: "text",
          class: 'cell_centeralign',
				},
        //perc_summ: {
				//	label: "% сопоставленных товаров по стоимости",
				//	type: "text",
				//},
        //perc_col: {
				//	label: "% сопоставленных товаров по количеству",
				//	type: "text",
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
    this.getOrganization()
    this.getReportCopo({
      tabledata: '',
			page: 1,
			perpage: 1,
    })
    this.getData({
          page: this.page,
          perpage: this.pagination_items_per_page,
        }).then(() => {
          this.getVendors()
          this.getCatalogs()
        })
    this.getCardstatus()
    this.getMSProducts({
      tabledata: '',
			page: 1,
			perpage: 1,
    })
  },
  computed: {
    ...mapGetters({
      orgStores: 'org/orgStores',
      vendors: 'addition/vendors',
      catalogs: 'addition/catalogs',
      products: 'warehouse/products',
      organization: 'retail/organization',
      report_copo: 'retail/report_copo',
      cardstatus: 'retail/cardstatus',
      msproducts: 'retail/msproducts',
    })
  },
  methods: {
    ...mapActions({
      getOrgStores: 'org/getOrgStores',
      getVendors: 'addition/getVendors',
      getCatalogs: 'addition/getCatalogs',
      getData: 'warehouse/getData',
      getOrganization: 'retail/getOrganization',
      getReportCopo: 'retail/getReportCopo',
      getCardstatus: 'retail/getCardstatus',
      getMSProducts: 'retail/getMSProducts',
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
.product-comparison__stats{
  margin-top: 40px;
}

.d-table2 {
  --d-table2-col-gap: 28px;

  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  &__header {
    display: flex;
    align-items: center;
    gap: var(--d-table2-col-gap);

    background-color: #282828;
    border-radius: 30px;

    padding: 4px 16px;
    height: 48px;
  }

  &__th {
    display: flex;
    justify-content: center;
    align-items: center;

    color: #fbfbfb;
    font-size: 14px;
    font-weight: 400;
    text-align: center;

    position: relative;
    width: 100%;

    &:not(:last-child) {
      padding-right: var(--d-table2-col-gap);

      &::after {
        content: '';

        background-color: #ffffff;

        position: absolute;
        top: 50%;
        right: 0;
        translate: 0 -50%;
        opacity: 0.5;

        height: 20px;
        width: 0.5px;
      }
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: var(--d-table2-col-gap);

    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0px 4px 13.4px -5px #00000042;
    padding: 16px;
  }

  &__col {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    width: 100%;

    &:not(:last-child) {
      padding-right: var(--d-table2-col-gap);

      &::after {
        content: '';

        background-color: #757575;

        position: absolute;
        top: 50%;
        right: 0;
        translate: 0 -50%;
        opacity: 0.5;

        height: 20px;
        width: 0.5px;
      }
    }
  }

  &__info {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
    width: 100%;

    &-header {
      display: flex;
      align-items: center;
      gap: 8px;

      &-image {
        object-fit: contain;
        width: 100%;
        height: 100%;

        &-wrapper {
          width: 32px;
          height: 32px;
        }
      }

      &-title {
        font-size: 16px;
        font-weight: 600;
      }
    }

    &-address {
      display: flex;
      align-items: center;
      gap: 8px;

      color: #757575;
      font-size: 14px;
      font-weight: 400;

      &-icon {
        font-size: 13px;
      }
    }
  }

}
.product-comparison__stores.warehouse-analysis__table .d-table__head .d-table__head-col:nth-child(2),.product-comparison__stores.warehouse-analysis__table .d-table__row .d-table__col:nth-child(2){
  min-width: auto;
  width: auto;
}
</style>
