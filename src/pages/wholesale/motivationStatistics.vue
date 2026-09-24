<template>
  <section class="promo sale_page program" id="program">
    <div class="d-top">
      <breadcrumbs />
    </div>
    <Loader v-if="loading" />

    <div
      class="promos__banners-item promos__banners-item--primary promos__banners-item--big promo__banner program__banner"
      v-if="program"
    >
      <img
        :src="program.banner"
        class="promos__banners-item-image"
        loading="lazy"
      />
      <div class="promos__banners-item-badges">
        <div class="promos__banners-item-badges-item">Программа мотивации</div>
        <span class="promos__banners-item-badges-text">0+</span>
      </div>
    </div>

    <Tabs v-model="tabException" class="program__tabs">
      <TabList class="program__tabs-tabs">
        <div class="d-tab2" :class="{ 'd-tab2--active': tabException == 0 }" :value="0">
          <button class="collection__tabs-link" @click.prevent="tabException = 0">
            <span>Статистика</span>
          </button>
        </div>
        <div class="d-tab2" :class="{ 'd-tab2--active': tabException == 1 }" :value="1">
          <button class="collection__tabs-link" @click.prevent="tabException = 1">
            <span>Информация</span>
          </button>
        </div>
      </TabList>

      <TabPanels>
        <TabPanel v-if="tabException == 0">
          <div class="program__stats-title" v-if="program">Статистика программы {{ program.label }}</div>
          <div class="program__stats">
            <div class="product-comparison__stats">
              <div class="product-comparison__stats-top" v-if="prods.all">
                <div class="product-comparison__stats-block">
                  <p class="product-comparison__stats-block-title">Баланс</p>
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
                      <p class="product-comparison__stats-block-percent">Планируемый остаток {{ $filters.round(prods.copo_money_percent) }}%</p>
                      <div class="product-comparison__stats-block-progress product-comparison__stats-block-progress--primary">
                        <div class="product-comparison__stats-block-progress-header">
                          <p class="product-comparison__stats-block-progress-title">На счете</p>
                          <p class="product-comparison__stats-block-progress-value">{{ prods.summ.toLocaleString('ru-RU') }}</p>
                        </div>
                        <div class="product-comparison__stats-block-progress-line">
                          <div class="product-comparison__stats-block-progress-line-pink"></div>
                        </div>
                      </div>
                      <div class="product-comparison__stats-block-progress product-comparison__stats-block-progress--secondary">
                        <div class="product-comparison__stats-block-progress-header">
                          <p class="product-comparison__stats-block-progress-title">К выплате</p>
                          <p class="product-comparison__stats-block-progress-value">{{ prods.summ_copo.toLocaleString('ru-RU') }}</p>
                        </div>
                        <div class="product-comparison__stats-block-progress-line">
                          <div class="product-comparison__stats-block-progress-line-purple" :style="'width: ' + prods.copo_money_percent + '%;'"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="product-comparison__stats-block">
                  <p class="product-comparison__stats-block-title">Бюджет</p>
                  <div class="product-comparison__stats-block-content">
                    <div>
                      <Chart
                        type="doughnut"
                        :data="chartDataBudget"
                        :options="chartOptions"
                        class="product-comparison__stats-block-image"
                      />
                      <!-- <p class="product-comparison__stats-block-percent-mobile">{{ $filters.round(prods.budget_remain_percent) }}%</p>-->
                    </div>
                    <div class="product-comparison__stats-block-info">
                      <!--<p class="product-comparison__stats-block-percent">{{ $filters.round(prods.budget_remain_percent) }}%</p>-->
                      <div class="product-comparison__stats-block-progress product-comparison__stats-block-progress--primary">
                        <div class="product-comparison__stats-block-progress-header">
                          <p class="product-comparison__stats-block-progress-title">Выплачено</p>
                          <p class="product-comparison__stats-block-progress-value">{{ prods.budget_paid.toLocaleString('ru-RU') }}</p>
                        </div>
                        <div class="product-comparison__stats-block-progress-line">
                          <div class="product-comparison__stats-block-progress-line-pink"></div>
                        </div>
                      </div>
                      <div class="product-comparison__stats-block-progress product-comparison__stats-block-progress--primary">
                        <div class="product-comparison__stats-block-progress-header">
                          <p class="product-comparison__stats-block-progress-title">Товаров на сумму</p>
                          <p class="product-comparison__stats-block-progress-value">{{ prods.summ.toLocaleString('ru-RU') }}</p>
                        </div>
                        <div class="product-comparison__stats-block-progress-line">
                          <div class="product-comparison__stats-block-progress-line-pink"></div>
                        </div>
                      </div>
                      <div class="product-comparison__stats-block-progress product-comparison__stats-block-progress--secondary">
                        <div class="product-comparison__stats-block-progress-header">
                          <p class="product-comparison__stats-block-progress-title">Товаров сопоставлено на сумму</p>
                          <p class="product-comparison__stats-block-progress-value">{{ prods.summ_copo.toLocaleString('ru-RU') }}</p>
                        </div>
                        <div class="product-comparison__stats-block-progress-line">
                          <div class="product-comparison__stats-block-progress-line-purple" :style="'width: ' + prods.copo_money_percent + '%;'"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="product-comparison__stats-bottom" v-if="products.status">
                <div
                  class="product-comparison__stats-item"
                  :class="'product-comparison__stats-item--' + statsItem.key"
                  v-for="statsItem in statsItems"
                  :key="statsItem.key"
                >
                  <div class="product-comparison__stats-item-header">
                    <div class="product-comparison__stats-item-header-left">
                      <p class="product-comparison__stats-item-title">{{ statsItem.label }}</p>
                      <div class="d-badge2 d-badge2--fit product-comparison__stats-item-badge">{{
                        statsItem.count?.toLocaleString('ru')
                      }}</div>
                    </div>
                    <div class="product-comparison__stats-item-value-container">
                      <p class="product-comparison__stats-item-value-label">на сумму</p>
                      <p class="product-comparison__stats-item-value">{{
                        Number(statsItem.sum)?.toLocaleString('ru')
                      }} ₽</p>
                    </div>
                  </div>
                  <div class="product-comparison__stats-item-content">
                    <Chart
                      type="doughnut"
                      :data="statsItem.chartData"
                      :options="chartOptionsMin"
                      class="product-comparison__stats-item-image"
                    />
                    <div class="product-comparison__stats-item-info">
                      <p class="product-comparison__stats-item-percent">{{ statsItem.percent }}%</p>
                      <p class="product-comparison__stats-item-description">от общего количества чеков</p>
                      <div class="product-comparison__stats-item-value-container-mobile">
                        <p class="product-comparison__stats-item-value-label">на сумму</p>
                        <p class="product-comparison__stats-item-value">{{
                          Number(statsItem.sum)?.toLocaleString('ru')
                        }} ₽</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="program__transactions" v-if="transactions.length">
            <div class="program__transactions-title">Операции</div>
            <div class="program__transactions-filters">
              <div class="program__transactions-search">
                <input type="text" v-model="filterStore" placeholder="Магазин" />
                <button
                  type="button"
                  class="program__transactions-search-icon"
                  aria-label="Поиск по магазину"
                >
                  <i class="d-icon-search-big"></i>
                </button>
              </div>
              <div class="program__transactions-search">
                <input type="text" v-model="filterParticipant" placeholder="Участник" />
                <button
                  type="button"
                  class="program__transactions-search-icon"
                  aria-label="Поиск по участнику"
                >
                  <i class="d-icon-search-big"></i>
                </button>
              </div>
              <div class="dart-form-group program__transactions-status-filter">
                <TreeSelectFilter
                  v-model="filterStatuses"
                  :multiple="true"
                  :options="statusTreeOptions"
                  valueFormat="id"
                  :limit="1"
                  :limitText="(count) => `и еще ${count}`"
                  placeholder="Статус"
                />
              </div>
              <button
                type="button"
                class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small program__transactions-excel"
                title="Скачать в Excel"
                @click.prevent="saveExcel()"
              >
                <i class="d-icon d-icon-upload2"></i>
              </button>
            </div>
            <BaseTable
              :items_data="displayTransactions"
              :total="displayTransactions.length"
              :pagination_items_per_page="25"
              :table_data="transactionsTable"
              :show_filter="false"
            />
          </div>
        </TabPanel>
        <TabPanel v-if="tabException == 1" class="program__tab-info">
          <div class="program__grid" v-if="program">
            <div class="promotions__card program__grid-descr">
              <div class="promotions__card-header">
                <div class="promotions__card-header-left">
                  <i class="d-icon-lines promotions__card-icon"></i>
                  <p class="promotions__card-title">Описание</p>
                </div>
              </div>
              <div class="promotions__card-content">
                <div class="promotions__card-values">
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Название программы:</span>
                    <p class="promotions__card-value promotions__card-value--bold">
                      {{ program.label }}
                    </p>
                  </div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Описание программы:</span>
                    <p class="promotions__card-value" v-html="program.description"></p>
                  </div>
                </div>
              </div>
            </div>

            <div class="promotions__card">
              <div class="promotions__card-header">
                <div class="promotions__card-header-left">
                  <i class="d-icon-company promotions__card-icon"></i>
                  <p class="promotions__card-title">Организатор</p>
                </div>
              </div>
              <div class="promotions__card-content promo__cards-item-content promo__cards-item-content--small">
                <div class="promotions__card-values promotions__card-values--md-long promo__cards-item-values">
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Организатор:</span>
                    <p class="d-badge2 d-badge2--fit order__item-header-badge program__card-badge">
                      <span class="order__item-header-badge-image-container">
                        <img :src="program.image" class="order__item-header-badge-image" :alt="program.name" />
                      </span>
                      <span class="order__item-header-badge-text">{{ program.name }}</span>
                    </p>
                  </div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Исполнитель:</span>
                    <p class="d-badge2 d-badge2--fit order__item-header-badge program__card-badge program__card-badge--executor">
                      <span class="order__item-header-badge-image-container">
                        <img src="/images/favicon/favicon - light.png" class="order__item-header-badge-image" alt="ООО «МС»" />
                      </span>
                      <span class="order__item-header-badge-text">ООО «МС»</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="promotions__card">
              <div class="promotions__card-header">
                <div class="promotions__card-header-left">
                  <i class="d-icon-calendar3 promotions__card-icon"></i>
                  <p class="promotions__card-title">Даты проведения</p>
                </div>
              </div>
              <div class="promotions__card-content promo__cards-item-content promo__cards-item-content--small">
                <div class="promotions__card-values promotions__card-values--md-long promo__cards-item-values promo__cards-item-date-values">
                  <div class="promotions__card-info">
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label d-md-max-content">Срок проведения:</span>
                      <div class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value promo__cards-item-conds-value">
                        <div class="promo__cards-item-conds-value-content">
                          <span>с {{ programDates.from }}</span>
                          <div class="d-divider d-divider--vertical d-divider--no-margin promo__cards-item-conds-value-divider"></div>
                          <span>до {{ programDates.to }}</span>
                        </div>
                        <p class="promo__cards-item-conds-value-total">{{ programDates.days }} дн.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="program__products-title" v-if="program">Товары</div>

          <BaseTable
            v-if="program"
            class="program__table"
            :items_data="programProducts"
            :total="programProducts.length"
            :table_data="programTableData"
            :pagination_items_per_page="100"
            :show_filter="false"
          />

          <div class="program__empty" v-if="!loading && !program">Программа не найдена</div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Chart from 'primevue/chart'
import TreeSelectFilter from '@/shared/ui/TreeSelectFilter.vue'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'wholesaleMotivationStatistics',
  components: {
    breadcrumbs,
    BaseTable,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    Chart,
    TreeSelectFilter,
    Loader,
  },
  props: {
    program_id: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      tabException: 0,
      loading: true,
      chartOptions: {
        cutout: '75%',
      },
      chartOptionsMin: {
        cutout: '70%',
      },
prods: {
        copo_percent: 64.13,
        copo_money_percent: 92.6,
        all: 184,
        copo: 118,
        summ: 894120,
        summ_copo: 25901,
        budget_paid: 893108,
        budget_total: 894120,
        budget_remain_percent: 75.71,
      },
      products: {
        total: 801,
        status: {
          checking: { count: 31, sum:10400 },
          ready: { count: 127, sum: 25901 },
          paid: { count: 637, sum: 893108 },
          rejected: { count: 6, sum: 894 },
        },
      },
      programDates: {
        from: '1 октября 2026 г.',
        to: '31 декабря 2026 г.',
        days: 92,
      },
      filterStore: '',
      filterParticipant: '',
      filterStatuses: [],
      statusTreeOptions: [
        { id: 'checking', label: 'На проверке' },
        { id: 'ready', label: 'Зачислен' },
        { id: 'paid', label: 'Выплачен' },
        { id: 'rejected', label: 'Отклонен' },
      ],
      transactionsBase: [
        {
          id: 1,
          date: '23.09.2026',
          participant: 'Иванов А.С.',
          sum: '2 380 ₽',
          status_name: 'На проверке',
          status_color: 'C4CAE5',
          status_key: 'checking',
          check: '9286000100012341',
          store: 'АвтоТрек «Дзержинского»',
        },
        {
          id: 2,
          date: '23.09.2026',
          participant: 'Петров В.Н.',
          sum: '1 120 ₽',
          status_name: 'Зачислен',
          status_color: 'CDF0A9',
          status_key: 'ready',
          check: '9286000100012342',
          store: 'АвтоТрек «Мира»',
        },
        {
          id: 3,
          date: '22.09.2026',
          participant: 'Смирнова О.И.',
          sum: '3 560 ₽',
          status_name: 'Выплачен',
          status_color: 'BBFF00',
          status_key: 'paid',
          check: '9286000100012343',
          store: 'AutoParts «Центральный»',
        },
        {
          id: 4,
          date: '21.09.2026',
          participant: 'Козлов Д.М.',
          sum: '560 ₽',
          status_name: 'Отклонен',
          status_color: 'FF4400',
          status_key: 'rejected',
          check: '9286000100012344',
          store: 'АвтоТрек «Ленина»',
        },
        {
          id: 5,
          date: '21.09.2026',
          participant: 'Николаев А.А.',
          sum: '1 890 ₽',
          status_name: 'На проверке',
          status_color: 'C4CAE5',
          status_key: 'checking',
          check: '9286000100012345',
          store: 'АвтоТрек «Дзержинского»',
        },
        {
          id: 6,
          date: '20.09.2026',
          participant: 'Федорова Е.П.',
          sum: '700 ₽',
          status_name: 'Выплачен',
          status_color: 'BBFF00',
          status_key: 'paid',
          check: '9286000100012346',
          store: 'AutoParts «Северный»',
        },
        {
          id: 7,
          date: '19.09.2026',
          participant: 'Морозов И.В.',
          sum: '2 905 ₽',
          status_name: 'Зачислен',
          status_color: 'CDF0A9',
          status_key: 'ready',
          check: '9286000100012347',
          store: 'АвтоТрек «Мира»',
        },
        {
          id: 8,
          date: '18.09.2026',
          participant: 'Соколова Т.В.',
          sum: '480 ₽',
          status_name: 'Выплачен',
          status_color: 'BBFF00',
          status_key: 'paid',
          check: '9286000100012348',
          store: 'АвтоТрек «Ленина»',
        },
        {
          id: 9,
          date: '17.09.2026',
          participant: 'Белов С.Г.',
          sum: '1 340 ₽',
          status_name: 'Отклонен',
          status_color: 'FF4400',
          status_key: 'rejected',
          check: '9286000100012349',
          store: 'AutoParts «Центральный»',
        },
        {
          id: 10,
          date: '16.09.2026',
          participant: 'Гусев К.Н.',
          sum: '2 150 ₽',
          status_name: 'На проверке',
          status_color: 'C4CAE5',
          status_key: 'checking',
          check: '9286000100023450',
          store: 'АвтоТрек «Дзержинского»',
        },
        {
          id: 11,
          date: '15.09.2026',
          participant: 'Волков П.И.',
          sum: '640 ₽',
          status_name: 'Выплачен',
          status_color: 'BBFF00',
          status_key: 'paid',
          check: '9286000100023451',
          store: 'АвтоТрек «Мира»',
        },
        {
          id: 12,
          date: '14.09.2026',
          participant: 'Орлова А.М.',
          sum: '980 ₽',
          status_name: 'Зачислен',
          status_color: 'CDF0A9',
          status_key: 'ready',
          check: '9286000100023452',
          store: 'AutoParts «Северный»',
        },
      ],
      storesByBrand: {
        Трек: [
          'АвтоТрек «Дзержинского»',
          'АвтоТрек «Мира»',
          'АвтоТрек «Ленина»',
          'AutoParts «Центральный»',
          'AutoParts «Северный»',
        ],
        Интерскол: [
          'СтройМастер «Южный»',
          'Электроинструмент Центр',
          'СтройДом «Кольцевая»',
          'МастерTool «Промышленный»',
          'СтройБаза «Северная»',
          'ТехноСтрой «Монтажный»',
        ],
        default: ['Торговая точка'],
      },
      transactionsTable: {
        date: {
          label: 'Дата',
          type: 'text',
        },
        participant: {
          label: 'Участник',
          type: 'text',
        },
        sum: {
          label: 'Сумма к получению',
          type: 'text',
        },
        products: {
          label: 'Товары',
          type: 'html',
        },
        check: {
          label: 'Чек',
          type: 'text',
        },
        store: {
          label: 'Магазин',
          type: 'text',
        },
        status: {
          label: 'Статус',
          type: 'status',
        },
      },
      programTableData: {
        image: {
          label: 'Фото',
          type: 'image',
        },
        name: {
          label: 'Товар',
          type: 'text',
          description: { type: 'field', key: 'article' },
        },
        price_rrc: {
          label: 'РРЦ',
          type: 'text',
        },
        reward: {
          label: 'Вознаграждение',
          type: 'text',
        },
      },
    }
  },
  created() {
    this.getMotivations({ id: this.$route.params.id }).then(() => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      motivations: 'wholesale/motivations',
    }),
    chartDataMoney() {
      return {
        datasets: [
          {
            data: [100 - this.prods.copo_money_percent, this.prods.copo_money_percent],
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
    chartDataBudget() {
      return {
        datasets: [
          {
            data: [100 - this.prods.budget_remain_percent, this.prods.budget_remain_percent],
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
    statsItems() {
      const list = [
        { key: 'checking', label: 'На проверке', color: '#C4CAE5' },
        { key: 'ready', label: 'Зачислен', color: '#CDF0A9' },
        { key: 'paid', label: 'Выплачен', color: '#BBFF00' },
        { key: 'rejected', label: 'Отклонен', color: '#FF4400' },
      ]
      return list.map((item) => {
        const total = this.products.total || 0
        const count = this.products.status[item.key]?.count || 0
        const percent = total ? (count / (total / 100)).toFixed(2) : (0).toFixed(2)
        return {
          ...item,
          count,
          sum: this.products.status[item.key]?.sum || 0,
          percent,
          chartData: this.minChartData(item.color, percent),
        }
      })
    },
    transactions() {
      if (!this.program) return []
      const brand = this.program?.name
      const fingerprint =
        JSON.stringify((this.program.products || []).map((product) => [
          product.article,
          product.name,
          product.price,
        ])) + `:${this.program.percent || 0}:${brand || ''}`
      const cacheKey = `wholesale.motivation.transactions.${this.program.id}`
      const cached = this.readCache(cacheKey)
      if (cached && cached.fingerprint === fingerprint) {
        return cached.items
      }
      const items = this.transactionsBase.map((record) => {
        const { products, sum } = this.randomTransaction()
        return {
          ...record,
          store: this.randomStore(brand),
          products,
          sum: sum || record.sum,
        }
      })
      this.writeCache(cacheKey, { fingerprint, items })
      return items
    },
    filteredTransactions() {
      return this.transactions.filter((item) => {
        const storeOk =
          !this.filterStore ||
          item.store.toLowerCase().includes(this.filterStore.toLowerCase())
        const participantOk =
          !this.filterParticipant ||
          item.participant.toLowerCase().includes(this.filterParticipant.toLowerCase())
        const statusOk =
          !this.filterStatuses.length || this.filterStatuses.includes(item.status_key)
        return storeOk && participantOk && statusOk
      })
    },
    displayTransactions() {
      return this.filteredTransactions.slice(0, 25)
    },
    program() {
      const id = Number(this.program_id) || Number(this.$route.params.program_id)
      return this.motivations.find((item) => item.id === id)
    },
    programProducts() {
      if (!this.program) return []
      const source = this.program.products || []
      const percent = this.program.percent || 0
      return source.map((item) => ({
        id: item.id,
        image: item.image,
        name: item.name,
        article: item.article,
        price_rrc: new Intl.NumberFormat('ru-RU').format(item.price),
        reward: new Intl.NumberFormat('ru-RU').format(Math.round((item.price * percent) / 100)),
      }))
    },
  },
  methods: {
    ...mapActions({
      getMotivations: 'wholesale/getMotivations',
    }),
    randomStore(brand) {
      const stores = this.storesByBrand[brand] || this.storesByBrand.default
      return stores[Math.floor(Math.random() * stores.length)]
    },
    escapeCell(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
    },
    saveExcel() {
      const head = ['Дата', 'Участник', 'Сумма к получению', 'Товары', 'Чек', 'Магазин', 'Статус']
      const headHtml = head.map((cell) => `<th>${this.escapeCell(cell)}</th>`).join('')
      const rowsHtml = this.filteredTransactions
        .map(
          (item) =>
            `<tr>${[
              item.date,
              item.participant,
              item.sum,
              String(item.products || '').replace(/<[^>]+>/g, '\n'),
              item.check,
              item.store,
              item.status_name,
            ]
              .map((cell) => `<td>${this.escapeCell(cell)}</td>`)
              .join('')}</tr>`,
        )
        .join('')
      const html =
        `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">` +
        `<head><meta charset="utf-8" /></head><body><table><thead><tr>${headHtml}</tr></thead><tbody>${rowsHtml}</tbody></table></body></html>`
      const blob = new Blob(['\ufeff' + html], { type: 'application/vnd.ms-excel' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `Операции_${this.program.label || 'по программе'}.xls`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    },
    randomTransaction() {
      const percent = this.program?.percent || 0
      const all = this.program?.products || []
      if (!all.length) return { products: '', sum: '' }
      const count = 1 + Math.floor(Math.random() * Math.min(3, all.length))
      const picked = all.slice().sort(() => Math.random() - 0.5).slice(0, count)
      const products = picked
        .map((product) => `<div>${product.article}, "${product.name}" - 1 шт.</div>`)
        .join('')
      const sum = picked.reduce(
        (acc, product) => acc + Math.round((product.price * percent) / 100),
        0,
      )
      return { products, sum: new Intl.NumberFormat('ru-RU').format(sum) + ' ₽' }
    },
    readCache(key) {
      try {
        return JSON.parse(localStorage.getItem(key))
      } catch {
        return null
      }
    },
    writeCache(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch {
        // localStorage может быть недоступен
      }
    },
    minChartData(color, percent) {
      const p = Number(percent) || 0
      return {
        datasets: [
          {
            data: [100 - p, p],
            backgroundColor: ['#ededed', color],
            borderColor: ['#fbfbfb', color],
            hoverBackgroundColor: ['#ededed', color],
            borderWidth: 0.5,
            spacing: 2,
            rotation: 50,
          },
        ],
      }
    },
  },
}
</script>
<style lang="scss">
.program {
  &__tab-info {
    padding-top: 40px;
  }

  &__tabs {
    margin-top: 24px;

    .p-tabpanels {
      background-color: transparent;
    }

    &-tabs {
      .p-tablist-tab-list {
        background-color: transparent;
        gap: 8px;
        border: none;
      }

      .collection__tabs-link {
        padding: 0;
        font: inherit;
        color: inherit;
      }
    }
  }

  &__banner {
    max-height: 360px;
    overflow: hidden;

    .promos__banners-item-image {
      max-height: 360px;
      object-fit: cover;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto auto;
    gap: 16px;
    align-items: stretch;

    .promotions__card {
      height: auto;
      margin-top: 0 !important;

      &-content {
        height: 100%;
      }
    }

    &-descr {
      grid-row: 1 / 3;
    }
  }

  &__products-title {
    margin: 48px 0 24px;
    padding-left: 4px;
    font-size: 22px;
    font-weight: 600;
    line-height: 28px;
    color: #282828;
  }

  &__table {
    margin-top: 0;

    .d-table__head-col,
    .d-table__col {
      text-align: center;
    }

    .cell_value {
      justify-content: center;
    }

    .cell_description {
      font-size: 12px;
      font-weight: 300;
      color: #757575;
      text-align: center;
    }

    .img_abs {
      display: flex;
      justify-content: center;
    }
  }

  &__card-badge {
    background: #ededed;
    color: #282828;
    padding: 3px 12px;
    min-width: 0;
    gap: 8px;

    &--executor {
      justify-content: flex-start;
      margin-right: auto;
    }

    .order__item-header-badge-image-container {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .order__item-header-badge-image {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      object-fit: cover;
    }

    .order__item-header-badge-text {
      font-weight: 700;
      font-size: 15px;
      line-height: 20px;
      color: #282828;
    }
  }

  &__empty {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #757575;
    padding-top: 40px;
  }

  @media (width < 800px) {
    &__grid {
      grid-template-columns: 1fr;

      &-descr {
        grid-row: auto;
      }
    }
  }

  &__stats {
    padding-top: 40px;
  }

  &__stats-title {
    margin-top: 40px;
    margin-bottom: 24px;
    padding-left: 4px;
    font-size: 22px;
    font-weight: 600;
    line-height: 28px;
    color: #282828;
  }

  &__transactions {
    margin-top: 48px;

    &-title {
      margin-bottom: 24px;
      padding-left: 4px;
      font-size: 22px;
      font-weight: 600;
      line-height: 28px;
      color: #282828;
    }

    &-filters {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 12px;
      margin-bottom: 24px;
    }

    &-search {
      display: flex;
      align-items: center;
      width: 300px;
      max-width: 100%;
      height: 40px;
      padding: 0 4px 0 16px;
      background-color: #fff;
      border: 1px solid #d1d1d1;
      border-radius: 30px;

      input {
        flex: 1 1 0;
        min-width: 0;
        height: 100%;
        border: none;
        outline: none;
        background: transparent;
        color: #282828;
        font: inherit;
        font-size: 14px;

        &::placeholder {
          color: #757575;
        }
      }

      &-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        flex-shrink: 0;
        border: none;
        background: transparent;
        color: #757575;
        font-size: 15px;
        cursor: pointer;
      }
    }

    &-excel {
      align-self: center;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border-radius: 50%;
    }

    &-status-filter {
      width: 300px;
      max-width: 100%;

      .vue3-treeselect .vue3-treeselect__control {
        background: #fff;
        border: 1px solid #d1d1d1;
        border-radius: 30px;
        height: 40px;
        min-height: 40px;
        padding-left: 16px;
        padding-right: 8px;
      }

      .vue3-treeselect .vue3-treeselect__placeholder {
        line-height: 38px;
        color: #757575;
      }
    }

    .d-table {
      &__head-col,
      &__col {
        text-align: center;
      }

      &__row {
        > .d-table__head-col,
        > .d-table__col {
          &:nth-child(3) {
            width: 120px;
          }

          &:nth-child(7) {
            width: 220px;
          }
        }
      }

      &__col {
        .cell_value {
          justify-content: center;
        }

        .cell--status {
          margin: 0 auto;
        }

        .store-item_cell,
        .multyitem_cell,
        .d-table-html {
          text-align: center;
        }
      }
    }
  }
}

.product-comparison__stats {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &-top {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @media (width <= 900px) {
      grid-template-columns: 1fr;
    }
  }

  &-block {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 13.2px -5px rgba(0, 0, 0, 0.41);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &-title {
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;
      color: #282828;
    }

    &-content {
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;

      > div:first-child {
        position: relative;
        width: 190px;
        height: 190px;
      }
    }

    &-image {
      width: 190px;
      height: 190px;
    }

    &-percent {
      font-weight: 600;
      font-size: 22px;
      line-height: 40px;
      color: #282828;
      text-align: left;

      &-mobile {
        display: none;
      }
    }

    &-info {
      flex: 1;
      min-width: 200px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &-progress {
      display: flex;
      flex-direction: column;
      gap: 8px;

      &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }

      &-title {
        font-size: 14px;
        line-height: 18px;
        color: #757575;
      }

      &-value {
        font-weight: 600;
        font-size: 18px;
        line-height: 24px;
        color: #282828;
        white-space: nowrap;
      }

      &-line {
        height: 12px;
        border-radius: 6px;
        background: #ededed;
        overflow: hidden;

        &-pink {
          width: 100%;
          height: 100%;
          background: #f92c0d;
          border-radius: 6px;
        }

        &-red {
          width: 100%;
          height: 100%;
          background: #f92c0d;
          border-radius: 6px;
        }

        &-purple {
          height: 100%;
          background: #4759af;
          border-radius: 6px;
        }

        &-purple-dark {
          height: 100%;
          background: #28316b;
          border-radius: 6px;
        }
      }
    }
  }

  &-bottom {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;

    @media (width <= 1200px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (width <= 560px) {
      grid-template-columns: 1fr;
    }
  }

  &-item {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 13.2px -5px rgba(0, 0, 0, 0.41);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    &-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin: -24px -24px 0;
      min-height: 58px;
    }

    &-header-left {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    &-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #282828;
    }

    &-badge {
      align-self: flex-start;
      background: #ededed;
      border-radius: 41px;
      padding: 3px 12px;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      color: #282828;
    }

    &-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    &-image {
      width: 120px;
      height: 120px;
      flex-shrink: 0;
    }

    &-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    &-percent {
      font-weight: 600;
      font-size: 24px;
      line-height: 30px;
      color: #282828;
    }

    &-description {
      font-size: 14px;
      line-height: 18px;
      color: #757575;
    }

    &-value-container {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;

      &-mobile {
        display: none;
        flex-direction: column;
        gap: 4px;
      }
    }

    &-value-label {
      font-size: 14px;
      line-height: 18px;
      color: #757575;
    }

    &-value {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #282828;
      white-space: nowrap;
    }

    &--checking {
      .product-comparison__stats-item-badge {
        background: #c4cae5;
        color: #282828;
      }

      .product-comparison__stats-item-header {
        border-bottom: 1px solid #c4cae5;
      }
    }

    &--ready {
      .product-comparison__stats-item-badge {
        background: #cdf0a9;
        color: #282828;
      }

      .product-comparison__stats-item-header {
        border-bottom: 1px solid #cdf0a9;
      }
    }

    &--paid {
      .product-comparison__stats-item-badge {
        background: #bbff00;
        color: #282828;
      }

      .product-comparison__stats-item-header {
        border-bottom: 1px solid #bbff00;
      }
    }

    &--rejected {
      .product-comparison__stats-item-badge {
        background: #ff4400;
        color: #fff;
      }

      .product-comparison__stats-item-header {
        border-bottom: 1px solid #ff4400;
      }
    }
  }

  @media (width <= 560px) {
    &-block {
      &-content {
        justify-content: center;
      }

      &-percent {
        &-mobile {
          display: block;
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 20px;
          line-height: 26px;
          color: #282828;
        }
      }

      &-percent {
        display: none;
      }
    }

    &-item {
      &-value-container {
        display: none;

        &-mobile {
          display: flex;
        }
      }

      &-content {
        align-items: flex-start;
      }

      &-percent {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
}
</style>