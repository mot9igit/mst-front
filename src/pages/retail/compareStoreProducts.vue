<template>
  <section class="product-comparison" id="product-comparison">
    <div class="d-top">
      <breadcrumbs />
    </div>
    <h2>Сопоставление товаров склада</h2>
    <div class="warehouse-analysis__header-storeinfo">
      <div class="warehouse-analysis__header-storeinfo-logo">
        <img :src="orgStore.image" />
      </div>
      <div class="warehouse-analysis__header-storeinfo-info">
        <div class="warehouse-analysis__header-storeinfo-info-name">{{ orgStore.name_short }}</div>
        <div class="warehouse-analysis__header-storeinfo-info-address">
          <i class="d-icon-location"></i><span>{{ orgStore.address_short }}</span>
        </div>
      </div>
    </div>
    <Loader v-if="loading" />
    <!--  <div class="product-comparison__stats">
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
                        <div class="product-comparison__stats-item-value-container-mobile">
                          <p class="product-comparison__stats-item-value-label">на сумму</p>
                          <p class="product-comparison__stats-item-value">{{
                            Number(products.status[4]?.sum)?.toLocaleString("ru")
                          }} ₽</p>
                        </div>
											</div>
										</div>
									</div>
								</div>
							</div>-->
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
            <h3 class="product-comparison__brands-modal-header">
              Сопоставление по бренду {{ report_copo_details.vendor.name }} ({{
                report_copo_details.total
              }})
            </h3>
            <div class="warehouse-analysis__header-storeinfo">
              <div class="warehouse-analysis__header-storeinfo-logo">
                <img :src="orgStore.image" />
              </div>
              <div class="warehouse-analysis__header-storeinfo-info">
                <div class="warehouse-analysis__header-storeinfo-info-name">
                  {{ orgStore.name_short }}
                </div>
                <div class="warehouse-analysis__header-storeinfo-info-address">
                  <i class="d-icon-location"></i><span>{{ orgStore.address_short }}</span>
                </div>
              </div>
            </div>
            <div class="warehouse-analysis__description product-comparison__description">
              <p>
                На данной странице предоставлены товары бренда, найденые в вашем каталоге и статус
                сопоставления.
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
              <template v-slot:cell-slot> Ghb </template>
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
  name: 'RetailCompareStoreProducts',
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
      globalIsModal: [],
      chartData: null,
      chartDataMoney: null,
      chartDataHelpOne: null,
      chartDataHelpTwo: null,
      chartDataHelpThee: null,
      chartDataHelpFour: null,
      isModal: false,
      isModalBrand: false,
      statuses: [],
      chartOptions: {
        cutout: '75%',
      },
      chartOptionsMin: {
        cutout: '70%',
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
      filtersbrand: {
        instock: {
          name: 'В наличии',
          placeholder: 'В наличии',
          type: 'checkbox',
          values: 1,
        },
        name: {
          name: 'Бренд',
          placeholder: 'Бренд',
          type: 'text',
        },
      },
      table_data: {
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
        store_name: {
          label: 'Склад',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
        name: {
          label: 'Наименование',
          type: 'link',
          description: {
            type: 'field',
            key: 'catalog',
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
          label: 'Сумма товара, ₽',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
      },
      table_data_brand: {
        name: {
          label: 'Наименование',
          type: 'link_onclick',
          id: 'vendor_id',
          sort: true,
          class: 'cell_centeralign table_link',
        },
        find: {
          label: 'Найдено',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
        identified: {
          label: 'Сопоставлено',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
        cards: {
          label: 'Карточек создано',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
        percent_identified: {
          label: '% сопоставления',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
        vendor_price: {
          label: 'Сумма товара, ₽',
          type: 'text',
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
            key: 'catalog',
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
        },
      },
      filters_modal: {
        name: {
          name: 'Наименование товара, артикул',
          placeholder: 'Наименование товара, артикул',
          type: 'text',
        },
        status: {
          name: 'Статус',
          placeholder: 'Статус',
          type: 'dropdown',
          values: this.cardstatus,
        },
        instock: {
          name: 'В наличии',
          placeholder: 'В наличии',
          type: 'checkbox',
          values: 1,
        },
      },
    }
  },

  unmounted() {
    this.unsetReportCopo()
    this.unsetReportCopoDetails()
  },
  mounted() {
    this.getCardstatus()
    this.getData({
      page: this.page_brand,
      perpage: this.pagination_items_per_page,
    })
    this.getReportCopo({
      tabledata: this.table_data,
      page: this.page,
      perpage: this.pagination_items_per_page,
      store_id: this.$route.params.store_id,
    })
    this.getOrgStore().then(() => {
      //  this.chartDataHelpOne = this.setChartDataHelpOne();
      //	this.chartDataHelpTwo = this.setChartDataHelpTwo();
      //	this.chartDataHelpThee = this.setChartDataHelpTree();
      //	this.chartDataHelpFour = this.setChartDataHelpFour();
      this.getVendors()
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      orgStore: 'org/orgStore',
      vendors: 'addition/vendors',
      products: 'warehouse/products',
      report_copo: 'retail/report_copo',
      cardstatus: 'retail/cardstatus',
      report_copo_details: 'retail/report_copo_details',
    }),
  },
  methods: {
    ...mapActions({
      getOrgStore: 'org/getOrgStore',
      getVendors: 'addition/getVendors',
      getData: 'warehouse/getData',
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
            data: [this.orgStore?.products?.no_copo_percent, this.orgStore?.products?.copo_percent],
            backgroundColor: ['#ededed', '#4759af'],
            borderColor: ['#fbfbfb', '#4759af'],
            hoverBackgroundColor: ['#ededed', '#4759af'],
            borderWidth: 0.5,
            spacing: 2,
            rotation: 50,
          },
        ],
      }
    },
    setChartDataMoney() {
      return {
        datasets: [
          {
            data: [
              this.orgStore?.products.no_copo_money_percent,
              this.orgStore?.products.copo_money_percent,
            ],
            backgroundColor: ['#ededed', '#c4cae5'],
            borderColor: ['#fbfbfb', '#4759af'],
            hoverBackgroundColor: ['#ededed', '#c4cae5'],
            borderWidth: 0.5,
            spacing: 2,
            rotation: 50,
          },
        ],
      }
    },
    setChartDataHelpOne() {
      return {
        datasets: [
          {
            data: this.products?.status
              ? [
                  100 - (this.statuses[5].count / (this.statuses.total / 100)).toFixed(2),
                  (this.statuses[5].count / (this.statuses.total / 100)).toFixed(2),
                ]
              : [100, 0],
            backgroundColor: ['#ededed', '#c4cae5'],
            borderColor: ['#fbfbfb', '#4759af'],
            hoverBackgroundColor: ['#ededed', '#c4cae5'],
            borderWidth: 0.5,
            spacing: 2,
            rotation: 50,
          },
        ],
      }
    },
    setChartDataHelpTwo() {
      return {
        datasets: [
          {
            data: this.products?.status
              ? [
                  100 - (this.statuses[1].count / (this.statuses.total / 100)).toFixed(2),
                  (this.statuses[1].count / (this.statuses.total / 100)).toFixed(2),
                ]
              : [100, 0],
            backgroundColor: ['#ededed', '#cdf0a9'],
            borderColor: ['#fbfbfb', '#97bc71'],
            hoverBackgroundColor: ['#ededed', '#cdf0a9'],
            borderWidth: 0.5,
            spacing: 2,
            rotation: 50,
          },
        ],
      }
    },
    setChartDataHelpTree() {
      return {
        datasets: [
          {
            data: this.products?.status
              ? [
                  100 -
                    (this.products?.status[2]?.count / (this.products.status.total / 100)).toFixed(
                      2,
                    ),
                  (this.products?.status[2]?.count / (this.products.status.total / 100)).toFixed(2),
                ]
              : [100, 0],
            backgroundColor: ['#ededed', '#ffcec7'],
            borderColor: ['#fbfbfb', '#f92c0d'],
            hoverBackgroundColor: ['#ededed', '#ffcec7'],
            borderWidth: 0.5,
            spacing: 2,
            rotation: 50,
          },
        ],
      }
    },
    setChartDataHelpFour() {
      return {
        datasets: [
          {
            data: this.products?.status
              ? [
                  100 -
                    (this.products?.status[4]?.count / (this.products.status.total / 100)).toFixed(
                      2,
                    ),
                  (this.products?.status[4]?.count / (this.products.status.total / 100)).toFixed(2),
                ]
              : [100, 0],
            backgroundColor: ['#ededed', '#e2e2e2'],
            borderColor: ['#fbfbfb', '#757575'],
            hoverBackgroundColor: ['#ededed', '#e2e2e2'],
            borderWidth: 0.5,
            spacing: 2,
            rotation: 50,
          },
        ],
      }
    },
    filterbrand(data) {
      this.report_copo.total = -1
      this.getReportCopo(data)
    },
    paginatebrand(data) {
      this.report_copo.total = -1
      this.page_brand = data.page
      this.getReportCopo(data)
    },
    filtermodal(data) {
      ;(data.tabledata = this.table_data_modal), (data.brand_id = this.brand_id)
      this.getReportCopoDetails(data)
    },
    paginatemodal(data) {
      this.page_modal = data.page
      data.tabledata = this.table_data_modal
      data.brand_id = this.brand_id
      this.getReportCopoDetails(data)
    },
    brandClick(id) {
      this.loading = true
      this.brand_id = id
      this.page_modal = 1
      this.getReportCopoDetails({
        tabledata: this.table_data_modal,
        page: this.page_modal,
        perpage: this.pagination_items_per_page,
        brand_id: this.brand_id,
        store_id: this.$route.params.store_id,
      }).then(() => {
        this.modalBrand = true
        this.loading = false
      })
    },
  },
  watch: {
    cardstatus: function (newVal) {
      this.filters_modal.status.values = newVal
    },
    products: function (newVal) {
      this.statuses = newVal.status
    },
    orgStore: function (newVal) {
      //	const num = newVal.products.copo_percent;
      //	this.prods.copo_percent = num;
      //	this.chartData = this.setChartData();
      //	this.chartDataMoney = this.setChartDataMoney();
      //	this.prods.all = newVal.products.count;
      //	this.prods.copo =newVal.products.copo_count;
      //	this.prods.count_all = newVal.products.count_all;
      //	this.prods.summ = newVal.products.summ;
      //	this.prods.copo_money_percent = newVal.products.copo_money_percent;
      //	this.prods.no_copo_money_percent = newVal.products.no_copo_money_percent;
      //	this.prods.summ_copo = newVal.products.summ_copo;
      // this.chartDataHelpOne = this.setChartDataHelpOne();
      //	this.chartDataHelpTwo = this.setChartDataHelpTwo();
      //	this.chartDataHelpThee = this.setChartDataHelpTree();
      //	this.chartDataHelpFour = this.setChartDataHelpFour();
    },
  },
}
</script>
<style lang="scss">
.product-comparison .warehouse-analysis__header-storeinfo,
.product-comparison__brands-modal .warehouse-analysis__header-storeinfo {
  margin-top: 16px;
}
</style>
