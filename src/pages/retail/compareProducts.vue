<template>
  <section class="product-comparison" id="product-comparison">
    <div class="d-top">
      <breadcrumbs />
    </div>
    <h2>Сопоставление товаров</h2>
    <Loader v-if="loading" />
    <div class="product-comparison__stats">
								<div class="product-comparison__stats-top" v-if="prods.all">
									<div class="product-comparison__stats-block">
										<p class="product-comparison__stats-block-title">Сопоставление товаров по стоимости</p>
										<div class="product-comparison__stats-block-content">
											<div>
                      <Chart
                        type="doughnut"
                        :data="chartDataMoney"
                        :options="chartOptions"
                        class="product-comparison__stats-block-image"
                      />
                        <p class="product-comparison__stats-block-percent-mobile">{{ $filters.round(prods.copo_money_percent) }}%</p>
                      </div>
											<div class="product-comparison__stats-block-info">
												<p class="product-comparison__stats-block-percent">{{ $filters.round(prods.copo_money_percent) }}%</p>
												<div class="product-comparison__stats-block-progress product-comparison__stats-block-progress--primary">
													<div class="product-comparison__stats-block-progress-header">
														<p class="product-comparison__stats-block-progress-title">Товаров на сумму</p>
														<p class="product-comparison__stats-block-progress-value">{{ prods.summ }}</p>
													</div>
													<div class="product-comparison__stats-block-progress-line">
                            <div class="product-comparison__stats-block-progress-line-pink"></div>
                          </div>

												</div>
												<div class="product-comparison__stats-block-progress product-comparison__stats-block-progress--secondary">
													<div class="product-comparison__stats-block-progress-header">
														<p class="product-comparison__stats-block-progress-title">Товаров сопоставлено на сумму</p>
														<p class="product-comparison__stats-block-progress-value">{{ prods.summ_copo }}</p>
													</div>
													<div class="product-comparison__stats-block-progress-line">
                            <div class="product-comparison__stats-block-progress-line-purple" :style="'width: ' + prods.copo_money_percent + '%;'"></div>
                          </div>
												</div>
											</div>
										</div>
									</div>
									<div class="product-comparison__stats-block">
										<p class="product-comparison__stats-block-title">Сопоставленных товаров</p>
										<div class="product-comparison__stats-block-content">
                      <div>
                      <Chart
                        type="doughnut"
                        :data="chartData"
                        :options="chartOptions"
                        class="product-comparison__stats-block-image"
                      />
                      <p class="product-comparison__stats-block-percent-mobile">{{ $filters.round(prods.copo_percent) }}%</p>
                      </div>
											<div class="product-comparison__stats-block-info">
												<p class="product-comparison__stats-block-percent">{{ $filters.round(prods.copo_percent) }}%</p>
												<div class="product-comparison__stats-block-progress product-comparison__stats-block-progress--solid product-comparison__stats-block-progress--primary">
													<div class="product-comparison__stats-block-progress-header">
														<p class="product-comparison__stats-block-progress-title">Товаров всего</p>
														<p class="product-comparison__stats-block-progress-value">{{ prods.all }}</p>
													</div>
													<div class="product-comparison__stats-block-progress-line">
                            <div class="product-comparison__stats-block-progress-line-red"></div>
                          </div>
												</div>
												<div
													class="product-comparison__stats-block-progress product-comparison__stats-block-progress--solid product-comparison__stats-block-progress--secondary"
												>
													<div class="product-comparison__stats-block-progress-header">
														<p class="product-comparison__stats-block-progress-title">Товаров сопоставлено</p>
														<p class="product-comparison__stats-block-progress-value">{{ prods.copo }}</p>
													</div>
													<div class="product-comparison__stats-block-progress-line">
                            <div class="product-comparison__stats-block-progress-line-purple-dark" :style="'width: ' + prods.copo_percent + '%;'"></div>
                          </div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="product-comparison__stats-bottom"  v-if="products.status">
									<div class="product-comparison__stats-item product-comparison__stats-item--blue">
										<div class="product-comparison__stats-item-header">
											<div class="product-comparison__stats-item-header-left">
												<p class="product-comparison__stats-item-title">Укажите цену</p>
												<div class="d-badge2 d-badge2--fit product-comparison__stats-item-badge">
                          {{ products.status[5]?.count?.toLocaleString("ru") }}
                        </div>

											</div>
										</div>

										<div class="product-comparison__stats-item-content">
                      <Chart
                        type="doughnut"
                        :data="chartDataHelpOne"
                        :options="chartOptionsMin"
                        class="product-comparison__stats-item-image w-full md:w-5rem "
                      />
											<div class="product-comparison__stats-item-info">
												<p class="product-comparison__stats-item-percent">{{
                          (
                            this.products.status[5]?.count /
                            (this.products.status.total / 100)
                          ).toFixed(2)
                        }} %</p>
												<p class="product-comparison__stats-item-description">от общего сопоставления</p>
                        <div class="product-comparison__stats-item-value-container-mobile">

                        </div>
											</div>
										</div>
									</div>
									<div class="product-comparison__stats-item product-comparison__stats-item--green">
										<div class="product-comparison__stats-item-header">
											<div class="product-comparison__stats-item-header-left">
												<p class="product-comparison__stats-item-title">Нет бренда</p>
												<div class="d-badge2 d-badge2--fit product-comparison__stats-item-badge">{{
                          products.status[1]?.count?.toLocaleString("ru")
                        }}</div>
											</div>

											<div class="product-comparison__stats-item-value-container">
												<p class="product-comparison__stats-item-value-label">на сумму</p>
												<p class="product-comparison__stats-item-value">{{
											Number(products.status[1]?.sum)?.toLocaleString("ru")
										}} ₽</p>
											</div>
										</div>

										<div class="product-comparison__stats-item-content">
                      <Chart
                        type="doughnut"
                        :data="chartDataHelpTwo"
                        :options="chartOptionsMin"
                        class="product-comparison__stats-item-image"
                      />
											<div class="product-comparison__stats-item-info">
												<p class="product-comparison__stats-item-percent">{{
											(
												this.products.status[1]?.count /
												(this.products.status.total / 100)
											).toFixed(2)
										}}%</p>
												<p class="product-comparison__stats-item-description">от общего сопоставления</p>
                        <div class="product-comparison__stats-item-value-container-mobile">
                          <p class="product-comparison__stats-item-value-label">на сумму</p>
                          <p class="product-comparison__stats-item-value">{{
                            Number(products.status[1]?.sum)?.toLocaleString("ru")
                          }} ₽</p>
                        </div>
											</div>
										</div>
									</div>
									<div class="product-comparison__stats-item product-comparison__stats-item--red">
										<div class="product-comparison__stats-item-header">
											<div class="product-comparison__stats-item-header-left">
												<p class="product-comparison__stats-item-title">Нет артикула</p>
												<div class="d-badge2 d-badge2--fit product-comparison__stats-item-badge">{{
                          products.status[2]?.count?.toLocaleString("ru")
                        }}</div>
											</div>

											<div class="product-comparison__stats-item-value-container">
												<p class="product-comparison__stats-item-value-label">на сумму</p>
												<p class="product-comparison__stats-item-value">{{
											Number(products.status[2]?.sum)?.toLocaleString("ru")
										}} ₽</p>
											</div>
										</div>

										<div class="product-comparison__stats-item-content">
											<Chart
                        type="doughnut"
                        :data="chartDataHelpThee"
                        :options="chartOptionsMin"
                        class="product-comparison__stats-item-image"
                      />
											<div class="product-comparison__stats-item-info">
												<p class="product-comparison__stats-item-percent">{{
											(
												this.products.status[2]?.count /
												(this.products.status.total / 100)
											).toFixed(2)
										}}%</p>
												<p class="product-comparison__stats-item-description">от общего сопоставления</p>
                        <div class="product-comparison__stats-item-value-container-mobile">
                          <p class="product-comparison__stats-item-value-label">на сумму</p>
                          <p class="product-comparison__stats-item-value">{{
                            Number(products.status[2]?.sum)?.toLocaleString("ru")
                          }} ₽</p>
                        </div>
											</div>
										</div>
									</div>
									<div class="product-comparison__stats-item product-comparison__stats-item--gray">
										<div class="product-comparison__stats-item-header">
											<div class="product-comparison__stats-item-header-left">
												<p class="product-comparison__stats-item-title">Нет карточки</p>
												<div class="d-badge2 d-badge2--fit product-comparison__stats-item-badge">{{
										products.status[4]?.count?.toLocaleString("ru")
									}}</div>
											</div>

											<div class="product-comparison__stats-item-value-container">
												<p class="product-comparison__stats-item-value-label">на сумму</p>
												<p class="product-comparison__stats-item-value">{{
											Number(products.status[4]?.sum)?.toLocaleString("ru")
										}} ₽</p>
											</div>
										</div>

										<div class="product-comparison__stats-item-content">
											<Chart
                        type="doughnut"
                        :data="chartDataHelpFour"
                        :options="chartOptionsMin"
                        class="product-comparison__stats-item-image"
                      />
											<div class="product-comparison__stats-item-info">
												<p class="product-comparison__stats-item-percent">{{
                          (
                            this.products.status[4]?.count /
                            (this.products.status.total / 100)
                          ).toFixed(2)
                        }}%</p>
												<p class="product-comparison__stats-item-description">от общего сопоставления</p>
                        <div class="product-comparison__stats-item-value-container-mobile" v-if="Number(products.status[4]?.sum)>0">
                          <p class="product-comparison__stats-item-value-label">на сумму</p>
                          <p class="product-comparison__stats-item-value">{{
                            Number(products.status[4]?.sum)?.toLocaleString("ru")
                          }} ₽</p>
                        </div>
											</div>
										</div>
									</div>
								</div>
							</div>

    <h2>Склады ({{ orgStores.total }})</h2>
    <div class="warehouse-analysis__table product-comparison__stores">
      <BaseTable
        :items_data="orgStores.items"
        :total="orgStores.total"
        :table_data="this.table_stores"

      />
    </div>
    <h2>Сопоставление по брендам</h2>
    <div class="product-comparison__brands">
      <BaseTable
              :items_data="report_copo.items"
              :total="report_copo.total"
              :pagination_items_per_page="this.pagination_items_per_page"
              :pagination_offset="this.pagination_offset"
              :page="this.page_brand"
              :table_data="this.table_data_brand"
              :filters="this.filtersbrand"
              @filter="filterbrand"
              @sort="filterbrand"
              @paginate="paginatebrand"
              @actionCell="brandClick"
            >
      </BaseTable>

      <Teleport to="body">
        <customModal class="product-comparison__brands-modal" v-model="this.modalBrand">
          <div class="product-comparison__brands-modal-header-fixed">
            <h3 class="product-comparison__brands-modal-header">Сопоставление по бренду {{ report_copo_details.vendor.name }} ({{report_copo_details.total}})</h3>
            <div class="warehouse-analysis__description product-comparison__description">
              <p>
                На данной странице предоставлены товары бренда, найденые в вашем каталоге и статус сопоставления.
              </p>
            </div>
          </div>
          <div class="product-comparison__brands-modal-content">
          <BaseTable
              :items_data="report_copo_details.items"
              :total="report_copo_details.total"
              :pagination_items_per_page="this.pagination_items_per_page"
              :pagination_offset="this.pagination_offset"
              :page="this.page_modal"
              :table_data="this.table_data_modal"
              :filters="this.filters_modal"
              @filter="filtermodal"
              @sort="filtermodal"
              @paginate="paginatemodal"
            >
            </BaseTable>
          </div>
        </customModal>
      </Teleport>

    </div>
  </section>
</template>
<script>
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import customModal from '@/shared/ui/Modal.vue'
import Chart from 'primevue/chart'

export default {
  name: 'RetailCompareProducts',
  components: { Breadcrumbs, Loader, customModal, BaseTable, Chart },
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
			chartData: null,
			chartDataMoney: null,
			chartDataHelpOne: null,
			chartDataHelpTwo: null,
			chartDataHelpThee: null,
			chartDataHelpFour: null,
			isModalBrand: false,
      statuses: [],
			chartOptions: {
			cutout: "75%",
			},
      chartOptionsMin: {
			cutout: "70%",
			},
      brand_id: null,
      modalBrand: false,
			prods: {
				copo_percent: 0,
				all: 0,
				copo: 0,
				count_all: 0,
				summ: 0,
			},
			page: 1,
			page_brand: 1,
			page_modal: 1,
			table_stores: {
        name: {
          label: 'Название / Адрес',
          type: 'link',
          link_to: 'retailCompareStoreProducts',
          link_params: {
              id: this.$route.params.id,
              store_id: 'id',
          },
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
      filtersbrand: {
				instock: {
					name: "В наличии",
					placeholder: "В наличии",
					type: "checkbox",
					values: 1,
				},
        name: {
					name: "Наименование товара, артикул",
					placeholder: "Наименование товара, артикул",
					type: "text",
				},

			},
      table_data: {
				image: {
					label: "Фото",
					type: "image",
          class: 'cell_centeralign',
				},
				article: {
					label: "Артикул",
					type: "text",
					sort: true,
          class: 'cell_centeralign',
				},
				store_name: {
					label: "Склад",
					type: "text",
					sort: true,
          class: 'cell_centeralign',
				},
				name: {
					label: "Наименование",
					type: "link",
					//link_to: "org_product",
					//link_params: {
					//	id: this.$route.params.id,
					//	store_id: "store_id",
					//	product_id: "id",
					//},
					description: {
						type: "field",
						key: "catalog",
					},
					sort: true,
          class: 'cell_centeralign',
				},
				price: {
					label: "Розничная цена",
					type: "text",
					sort: true,
          class: 'cell_centeralign',
				},
				remains: {
					label: "Фактическое наличие",
					type: "text",
					sort: true,
          class: 'cell_centeralign',
				},
				reserved: {
					label: "Резерв",
					type: "text",
					sort: true,
          class: 'cell_centeralign',
				},
				available: {
					label: "Доступно для продажи",
					type: "text",
					sort: true,
          class: 'cell_centeralign',
				},
				sales: {
					label: "Продаж за все время",
					type: "text",
					sort: true,
          class: 'cell_centeralign',
				},
				/*
        price_rrc: {
          label: 'Цена, РРЦ',
          type: 'text',
          sort: true
        },
        price_rrc_delta: {
          label: 'РРЦ дельта',
          type: 'text',
          sort: true
        },
        */
				summ: {
					label: "Сумма товара, ₽",
					type: "text",
					sort: true,
          class: 'cell_centeralign',
				},
			},
      table_data_brand: {
				name: {
					label: "Наименование",
					type: "link_onclick",
          id: 'vendor_id',
					sort: true,
          class: 'cell_centeralign table_link',
				},
				find: {
					label: "Найдено",
					type: "text",
					sort: true,
          class: 'cell_centeralign',
				},
				identified: {
					label: "Сопоставлено",
					type: "text",
					sort: true,
          class: 'cell_centeralign',
				},
				cards: {
					label: "Карточек создано",
					type: "text",
					sort: true,
          class: 'cell_centeralign',
				},
				percent_identified: {
					label: "% сопоставления",
					type: "text",
					sort: true,
          class: 'cell_centeralign',
				},
				vendor_price: {
					label: "Сумма товара, ₽",
					type: "text",
					sort: true,
          class: 'cell_centeralign',
				},
			},
      table_data_modal: {
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
          description: {
            type: 'field',
            key: 'catalog'
          },
          sort: true,
          class: 'cell_centeralign',
        },
        price: {
          label: 'Розничная цена',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
        remains: {
          label: 'Фактическое наличие',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
        reserved: {
          label: 'Резерв',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
        available: {
          label: 'Доступно для продажи',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
        sales: {
          label: 'Продаж за все время',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
        summ: {
          label: 'Сумма',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
        status: {
          label: 'Статус',
          type: 'status',
          sort: true,
          class: 'cell_centeralign',
        }
      },
      filters_modal: {
        name: {
          name: 'Наименование товара, артикул',
          placeholder: 'Наименование товара, артикул',
          type: 'text'
        },
        status: {
          name: 'Статус',
          placeholder: 'Статус',
          type: 'dropdown',
          values: this.cardstatus
        },
        instock: {
          name: 'В наличии',
          placeholder: 'В наличии',
          type: 'checkbox',
          values: 1
        }
      },
		}
  },

  unmounted() {
		this.unsetReportCopo();
    this.unsetReportCopoDetails();
	},
  mounted() {
    this.getOrgStores()
    this.getCardstatus()
    this.getData({
			page: this.page,
			perpage: this.pagination_items_per_page,
    })
    this.getReportCopo({
      tabledata: this.table_data,
			page: this.page_brand,
			perpage: this.pagination_items_per_page,
    })
    this.getOrganization().then(() => {
      this.chartData = this.setChartData();
			this.chartDataMoney = this.setChartDataMoney();
			this.chartDataHelpOne = this.setChartDataHelpOne();
			this.chartDataHelpTwo = this.setChartDataHelpTwo();
			this.chartDataHelpThee = this.setChartDataHelpTree();
			this.chartDataHelpFour = this.setChartDataHelpFour();
			const num = this.organization.products.copo_percent;
			this.prods.copo_percent = num;
			this.prods.all = this.organization.products.count;
			this.prods.copo = this.organization.products.copo_count;
			this.prods.count_all = this.organization.products.count_all;
			this.prods.summ = this.organization.products.summ;
			this.prods.copo_money_percent = this.organization.products.copo_money_percent;
			this.prods.no_copo_money_percent = this.organization.products.no_copo_money_percent;
			this.prods.summ_copo = this.organization.products.summ_copo;
			// orders.summ && orders.count
			// this.dilers.summ = this.organization.dilers.summ
			// this.dilers.count = this.organization.dilers.count
			// this.distr.summ = this.organization.distr.summ
			// this.distr.count = this.organization.distr.count
			// this.shipment.total = this.organization.shipment.total
			// this.shipment.items = this.organization.shipment.items
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      orgStores: 'org/orgStores',
      products: 'warehouse/products',
      organization: 'retail/organization',
      report_copo: 'retail/report_copo',
      cardstatus: 'retail/cardstatus',
      report_copo_details: 'retail/report_copo_details',
    }),
  },
  methods: {
    ...mapActions({
      getOrgStores: 'org/getOrgStores',
      getData: 'warehouse/getData',
      getOrganization: 'retail/getOrganization',
      getReportCopo: 'retail/getReportCopo',
      getCardstatus: 'retail/getCardstatus',
      unsetReportCopo: 'retail/unsetReportCopo',
      getReportCopoDetails: 'retail/getReportCopoDetails',
      unsetReportCopoDetails: 'retail/unsetReportCopoDetails',
    }),
    setChartData() {
			return {
				datasets: [
					{
						data: [
              this.organization.products.no_copo_percent,
							this.organization.products.copo_percent,
						],
						backgroundColor: ["#ededed", "#4759af"],
            borderColor: ["#fbfbfb", "#4759af"],
						hoverBackgroundColor: ["#ededed", "#4759af"],
            borderWidth: 0.5,
            spacing: 2,
            rotation: 50,
					},
				],
			};
		},
		setChartDataMoney() {
			return {
				datasets: [
					{
						data: [
							this.organization.products.no_copo_money_percent,
              this.organization.products.copo_money_percent,
						],
						backgroundColor: ["#ededed", "#c4cae5"],
            borderColor: ["#fbfbfb", "#4759af"],
						hoverBackgroundColor: ["#ededed", "#c4cae5"],
            borderWidth: 0.5,
            spacing: 2,
            rotation: 50,
					},

				],

			};
		},
		setChartDataHelpOne() {
			return {
				datasets: [
					{
						data:  [
                100 -	(	this.statuses[5].count / (this.statuses.total / 100) ).toFixed(2),
								(	this.statuses[5].count /	(this.statuses.total / 100)).toFixed(2)
							  ],
						backgroundColor: ["#ededed", "#c4cae5"],
            borderColor: ["#fbfbfb", "#4759af"],
						hoverBackgroundColor: ["#ededed", "#c4cae5"],
            borderWidth: 0.5,
            spacing: 2,
            rotation: 50,
					},
				],
			};
		},
		setChartDataHelpTwo() {
			return {
				datasets: [
					{
						data: [
									100 -
										(
											this.statuses[1].count /
											(this.statuses.total / 100)
										).toFixed(2),
                    (
										this.statuses[1].count /
										(this.statuses.total / 100)
									).toFixed(2),
							  ],
						backgroundColor: ["#ededed", "#cdf0a9"],
            borderColor: ["#fbfbfb", "#97bc71"],
						hoverBackgroundColor: ["#ededed", "#cdf0a9"],
            borderWidth: 0.5,
            spacing: 2,
            rotation: 50,
					},
				],
			};
		},
		setChartDataHelpTree() {
			return {
				datasets: [
					{
						data: this.products?.status
							? [
									100 -
										(
											this.products?.status[2]?.count /
											(this.products.status.total / 100)
										).toFixed(2),
                    (
										this.products?.status[2]?.count /
										(this.products.status.total / 100)
									).toFixed(2),
							  ]
							: [100, 0],
						backgroundColor: ["#ededed", "#ffcec7"],
            borderColor: ["#fbfbfb", "#f92c0d"],
						hoverBackgroundColor: ["#ededed", "#ffcec7"],
            borderWidth: 0.5,
            spacing: 2,
            rotation: 50,
					},
				],
			};
		},
		setChartDataHelpFour() {
			return {
				datasets: [
					{
						data: this.products?.status
							? [
									100 -
										(
											this.products?.status[4]?.count /
											(this.products.status.total / 100)
										).toFixed(2),
                    (
										this.products?.status[4]?.count /
										(this.products.status.total / 100)
									).toFixed(2),
							  ]
							: [100, 0],
						backgroundColor: ["#ededed", "#e2e2e2"],
            borderColor: ["#fbfbfb", "#757575"],
						hoverBackgroundColor: ["#ededed", "#e2e2e2"],
            borderWidth: 0.5,
            spacing: 2,
            rotation: 50,
					},
				],
			};
		},
		filter(data) {
			this.products.total = -1;
			this.getData(data);
		},
		filterbrand(data) {
			this.report_copo.total = -1;
			this.getReportCopo(data);
		},
		paginate(data) {
			this.products.total = -1;
			this.page = data.page;
			this.getData(data);
		},
		paginatebrand(data) {
			this.report_copo.total = -1;
			this.page_brand = data.page;
			this.getReportCopo(data);
		},
    filtermodal(data) {
      data.tabledata = this.table_data_modal,
      data.brand_id = this.brand_id
      this.getReportCopoDetails(data)
    },
    paginatemodal(data) {
      this.page_modal = data.page
      data.tabledata = this.table_data_modal
      data.brand_id = this.brand_id
      this.getReportCopoDetails(data)
    },
    brandClick(id){
      this.loading = true
      this.brand_id = id
      this.page_modal = 1
      this.getReportCopoDetails({
        tabledata: this.table_data_modal,
        page: this.page_modal,
        perpage: this.pagination_items_per_page,
        brand_id: this.brand_id
      }).then(() => {
      this.modalBrand = true
      this.loading = false
    })
    }
  },
  watch: {
    cardstatus: function (newVal) {
			this.filters_modal.status.values = newVal;
		},
    products: function (newVal) {
      this.statuses = newVal.status
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
.product-comparison__brands{
  margin-top: 40px;
}
.product-comparison__brands .flex{
  display: flex;
}
.product-comparison__brands .dart-form-group label{
  font-size: 16px;
  color: #757575;
}
.product-comparison__brands .p-floatlabel label, .product-comparison__brands .p-inputtext::placeholder, .product-comparison__brands .p-placeholder{
  font-size: 14px;
  color: #757575;
}
.product-comparison__brands .d-col-xl-6:first-child{
  max-width: max-content;
  padding-right: 24px;
}
.product-comparison__brands .p-inputtext{
  width: 100%;
}
.product-comparison__brands .form_input_group:after {
  content: '\e003';
  font-family: 'Iconly' !important;
  position: absolute;
  font-size: 16.8px;
  top: calc(50% - 8.4px);
  right: 30px;
}
.product-comparison__brands .d-table__wrapper{
  margin-top: 40px;
}
.product-comparison__brands .d-table__col {
    padding: 20px 8px;
}
.product-comparison__brands .d-table__row:first-child > .d-table__col {
    padding-top: 20px;
}
.product-comparison__stats-block-image{
  height: 135px;
  width: 135px;
}
.product-comparison__stats-block-progress-line:before{
  display: none;
}
.product-comparison__stats-block-progress-line-pink,.product-comparison__stats-block-progress-line-red{
  content: "";
    background-color: var(--line-color);
    border: 0.5px solid var(--line-border-color);
    border-radius: 30px;
    position: absolute;
    top: 50%;
    left: 0;
    translate: 0 -50%;
    width: 100%;
    height: 8px;
}
.product-comparison__stats-block-progress-line-purple,.product-comparison__stats-block-progress-line-purple-dark{
  content: "";
    background-color: var(--line-color);
    border: 0.5px solid var(--line-border-color);
    border-radius: 30px;
    position: absolute;
    top: 50%;
    left: 0;
    translate: 0 -50%;
    height: 8px;
}
.product-comparison__stats-item .product-comparison__stats-item-badge{
    --d-badge2-size: 18px;
    --d-badge2-bg-color: var(--stats-item-color) !important;
    --d-badge2-color: #ededed;
}
.product-comparison__stats-item .d-badge2{
  background: var(--d-badge2-bg-color);
}
.product-comparison__stats-item .d-badge2--fit {
    border-radius: 24px;
    aspect-ratio: unset;
    width: -moz-fit-content;
    width: fit-content;
    min-width: -moz-fit-content;
    min-width: fit-content;
    height: -moz-fit-content;
    height: fit-content;
    padding: 3px 7px 2px;
}
.product-comparison__stats-item-image{
  width: 100px;
  height: 100px;
}
.product-comparison__stats-block-image canvas{
  margin-top: -5px;
}
.product-comparison__stats-item-title, .product-comparison__stats-item-value{
    width: max-content;
}
.product-comparison__stats-item-header {
    min-height: 52px;
    height: auto;
}
.product-comparison__stats-bottom {
  align-items: end;
}
.product-comparison__brands-modal .modal-content{
  max-width: 85%;
}
.product-comparison__brands-modal .modal__content{
  overflow-x: hidden;
}
.product-comparison__brands-modal-header h3{
  font-size: 20px;
}
.product-comparison__description{
  margin-top: 16px;
}
.product-comparison__brands-modal .p-inputtext, .product-comparison__brands-modal .p-select{
  width:100%;
}
.product-comparison__brands-modal .p-checkbox{
  margin-right:16px;
}
.product-comparison__brands-modal label{
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #757575;
}
.product-comparison__brands-modal .p-floatlabel label, .product-comparison__brands-modal .p-inputtext::placeholder, .product-comparison__brands-modal .p-placeholder{
  font-size: 14px;
  color: #757575;
}
.product-comparison__brands-modal .d-col-xl-6:nth-child(2){
  padding-left: 32px;
  padding-right: 32px;
}
.product-comparison__brands-modal .d-table__wrapper{
  margin-top: 40px;
}
.product-comparison__brands-modal .form_input_group:after {
  content: '\e003';
  font-family: 'Iconly' !important;
  position: absolute;
  font-size: 16.8px;
  top: calc(50% - 8.4px);
  right: 30px;
}
.product-comparison__stats-block-percent-mobile{
  display:none;
}
@media (width >1536px) {
  .product-comparison__stats-item-value-container-mobile{
    display: none;
  }
}
@media (width <=1536px) {
  .product-comparison h2{
    font-size: 20px;
  }
  .product-comparison__stats-item-value-container{
    display: none;
  }
  .product-comparison__stats-bottom {
      align-items: start;
  }
  .product-comparison__stats-item-content {
    align-items: start;
    padding: 16px 16px;
    gap:12px;
  }
  .product-comparison__stats-item-image {
    width: 70px;
    height: 70px;
  }
  .product-comparison__stats-item-percent {
    font-size: 20px;
  }
  .product-comparison__stats-item-description, .product-comparison__stats-item-title {
    font-size: 14px;
    line-height: 18px;
  }
  .product-comparison__stats-item-value-container-mobile{
    display: flex;
    gap: 8px;
    align-items: center;
    min-height: 21px;
    margin-left: -78px;
    margin-top: 18px;
  }
  .product-comparison__stats-item-value{
    color:#757575;
  }
  .product-comparison__stats-item-header {
    padding: 6px 16px;
    height: 30px;
    min-height: 30px;
  }
  .product-comparison__stats-item .d-badge2--fit {
    padding: 0px 5px;
    height: 24px;
  }
  .product-comparison__stats-item .d-badge2 {
    font-size: 12px;
    min-width: 24px;
  }
  .product-comparison__stats-item-image canvas{
    margin-top:-10px;
  }
}
@media (width <=1280px) {
  .product-comparison__stats-block-content {
    gap: 24px;
  }
  .product-comparison__stats-block-title {
    font-size: 14px;
  }
  .product-comparison__stats-block {
    padding: 24px;
  }
  .product-comparison__stats-block-image {
    height: 95px;
    width: 95px;
  }
  .product-comparison__stats-block-percent {
    font-size: 16px;
  }
  .product-comparison__stats-block-info {
    gap: 8px;
  }
  .product-comparison__stats-block-progress--secondary{
    margin-top:8px;
  }
  .product-comparison__stats-item-title {
    font-size: 12px;
    line-height: 16px;
  }
  .product-comparison__stats-item .d-badge2--fit {
    padding: 0px 6px;
    height:18px;
  }
  .product-comparison__stats-item .d-badge2 {
    font-size: 10px;
    min-width: 18px;
    min-height:18px;
  }
  .product-comparison__stats-item-image {
    width: 55px;
    height: 55px;
  }
  .product-comparison__stats-item-image canvas{
    margin-top:-10px;
  }
  .product-comparison__stats-item-percent {
    font-size: 16px;
  }
  .product-comparison__stats-item-description {
    font-size: 9px;
    line-height: 11px;
  }
  .product-comparison__stats-item-value-label {
    font-size: 10px;
  }
 .product-comparison__stats-item-value-container-mobile {
    min-height: 16px;
    margin-left: -73px;
    margin-top: 18px;
  }
  .product-comparison__stats-item-value {
    font-size: 12px;
  }
  .product-comparison__stats-item-percent{
    margin-top:4px;
  }
  .product-comparison h2 {
    font-size: 16px;
  }
}
@media (width <=1024px) {
  .product-comparison__stats-item-percent{
    margin-top:0px;
  }
  .product-comparison__stats-item-value-container-mobile {
    margin-left: -62px;
    margin-top: 10px;
  }
}
@media (width <=890px) {
  .product-comparison__stats-top {
    gap: 8px;
  }
  .product-comparison__stats-block {
    padding: 16px;
  }
  .product-comparison__stats {
    margin-top: 24px;
  }
  .product-comparison__stats {
    gap: 24px;
    margin-bottom: 24px;
  }
  .product-comparison__stats-top{
    align-items: start;
  }
  .product-comparison__stats-block {
    min-width:calc(50% - 4px);
    min-height:100%;
  }
  .product-comparison__stats-block-title {
    font-size: 9px;
  }
  .product-comparison__stats-block-image {
    height: 60px;
    width: 60px;
  }
  .product-comparison__stats-block-percent {
    font-size: 9px;
  }
  .product-comparison__stats-block-progress-title, .product-comparison__stats-block-progress-value {
    font-size: 7px;
  }
  .product-comparison__stats-block-progress-line-purple, .product-comparison__stats-block-progress-line-purple-dark,.product-comparison__stats-block-progress-line-pink, .product-comparison__stats-block-progress-line-red{
    height:4px;
  }
  .product-comparison__stats-block-progress--secondary {
    margin-top: 2px;
  }
  .product-comparison__stats-bottom{
    display: block;
  }
  .product-comparison__stats-item{
    width: calc(50% - 4px);
    float: left;
    margin-bottom: 8px;
  }
  .product-comparison__stats-item:nth-child(odd){
    margin-right: 8px;
  }
  .product-comparison__stats-item-value-container-mobile{
    display: none;
  }
  .product-comparison__stats-item-value-container{
    display: flex;
  }
  .product-comparison__stats-item-title {
    font-size: 9px;
    line-height: 11px;
  }
  .product-comparison__stats-item .d-badge2 {
    font-size: 9px;
  }
  .product-comparison__stats-item .d-badge2--fit {
    padding: 0px 3px;
    height:14px;
  }
  .product-comparison__stats-item .d-badge2 {
    min-width: 14px;
    min-height: 14px;
  }
  .product-comparison__stats-item-value-container{
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
  .product-comparison__stats-item-value-label {
    font-size: 8px;
  }
  .product-comparison__stats-item-value {
    font-size: 9px;
  }
  .product-comparison__stats-item-header {
    padding: 6px 16px;
    height: 22px;
    min-height: 22px;
  }
  .product-comparison__stats-item-content {
    align-items: start;
    justify-content: start;
    padding: 16px 16px;
    gap: 16px;
  }
  .product-comparison__stats-item-info{
    margin-top: 4px;
  }
  .product-comparison__stats-block-content {
    gap: 12px;
  }
  .product-comparison__stats-block-progress-value{
    text-align: right;
  }
  .product-comparison__stats-item-content {
    padding: 8px 16px 0px;
  }
  .product-comparison h2 {
    font-size: 14px;
  }
}
@media (width <=600px) {
  .product-comparison{
    margin-top: 130px;
  }
  .product-comparison h2 {
    font-size: 16px;
  }
  .product-comparison__stats{
    width: calc(44px + 100% + 44px);
    margin-left: -44px;
  }
  .product-comparison__stats-top{
    flex-direction: column;
    gap:24px;
  }
  .product-comparison__stats-block{
    width:100%;
    background: #FBFBFB;
    box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
    border-radius: 6px;
    padding:0;
  }
  .product-comparison__stats-block-title{
    padding:7px 44px;
    text-align: left;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    border-bottom: 0.5px solid #75757575;
  }
  .product-comparison__stats-block-content{
    padding-left: 44px;
    padding-right: 44px;
    padding-bottom: 24px;
    align-items: center;
  }
  .product-comparison__stats-block-percent-mobile{
    display:block;
    width:100%;
    text-align: center;
    margin-top: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    color: #282828;
  }
  .product-comparison__stats-block-percent{
    display:none;
  }
  .product-comparison__stats-block-image {
    height: 74px;
    width: 74px;
    margin-top:-10px;
  }
  .product-comparison__stats-block-progress-header {
    flex-direction: column;
    align-items: start;
    gap:4px;
  }
  .product-comparison__stats-block-progress-title{
    font-size: 10px;
  }
  .product-comparison__stats-block-progress-value {
    font-size: 12px;
  }
  .product-comparison__stats-item:nth-child(odd) {
    margin-right: 0px;
  }
  .product-comparison__stats-item {
    width: 100%;
    float: none;
    margin-bottom: 0px;
  }
  .product-comparison__stats-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
  .product-comparison__stats-item-header {
    padding: 7px 44px;
    height: 32px;
    min-height: 32px;
  }
  .product-comparison__stats-item-title {
    font-size: 14px;
    line-height: 18px;
  }
  .product-comparison__stats-item .d-badge2--fit {
    padding: 2px 3px 0;
    height:18px;
  }
  .product-comparison__stats-item .d-badge2 {
    min-width: 18px;
    min-height: 18px;
    font-size: 14px;
    font-weight: 400;
  }
  .product-comparison__stats-item-content {
    padding: 8px 44px 0px;
  }
  .product-comparison__stats-block-image, .product-comparison__stats-item-image {
    height: 74px;
    width: 74px;
  }
  .product-comparison__stats-item-value-container{
    display:none;
  }
  .product-comparison__stats-item-value-container-mobile{
    display:flex;
    margin-left: 0;
  }
  .product-comparison__stats-item-percent {
    font-size: 12px;
  }
  .product-comparison__stats-item-description {
    font-size: 10px;
    line-height: 11px;
  }
  .product-comparison__stats-item-value-label {
    font-size: 10px;
    font-weight:600;
  }
  .product-comparison__stats-item-value-label::after {
    content:':';
  }
  .product-comparison__stats-item-value{
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    color: #757575;
  }
  .product-comparison__stats-item-value-container-mobile {
    margin-top: 6px;
  }
}
@media (width <=320px) {
  .product-comparison__stats{
    width: calc(28px + 100% + 28px);
    margin-left: -28px;
  }
  .product-comparison__stats-block-title{
    padding:7px 28px;
  }
  .product-comparison__stats-block-content{
    padding-left: 28px;
    padding-right: 28px;
  }
  .product-comparison__stats-item-header {
    padding: 7px 28px;
  }
.product-comparison__stats-item-content {
    padding: 8px 28px 0px;
  }
}
</style>
