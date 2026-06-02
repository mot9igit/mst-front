<template>
  <div v-if="tabs" class="dashboard--tabs">
    <div class="dashboard-modal_header-left">
      <h2>{{ title }}</h2>
      <p>Выберите промежутки дат, чтобы отобразить в поиске</p>
    </div>

    <Tabs class="product-modal__info-content">
      <div class="dashboard-modal_header">
        <TabList class="product-modal__info-tabs" v-if="mode == 'orders'">
          <div class="d-tab2" :class="{ 'd-tab2--active': tabException == 0 }" :value="0">
            <button class="collection__tabs-link" @click.prevent="tabException = 0">
              <span class="promotions__card-values-title"
                >Клиенты сделавшие заказ
                <span class="promotions__card-values-title-grey">(впервые)</span>:</span
              >
            </button>
          </div>
          <div class="d-tab2" :class="{ 'd-tab2--active': tabException == 1 }" :value="1">
            <button class="collection__tabs-link" @click.prevent="tabException = 1">
              <span class="promotions__card-values-title">Получили заказы:</span>
            </button>
          </div>
        </TabList>

        <TabList class="product-modal__info-tabs" v-else>
          <div class="d-tab2" :class="{ 'd-tab2--active': tabException == 0 }" :value="0">
            <button class="collection__tabs-link" @click.prevent="tabException = 0">
              <span class="promotions__card-values-title">Подключили поставщика:</span>
            </button>
          </div>
          <div class="d-tab2" :class="{ 'd-tab2--active': tabException == 1 }" :value="1">
            <button class="collection__tabs-link" @click.prevent="tabException = 1">
              <span class="promotions__card-values-title">Подключили клиентов:</span>
            </button>
          </div>
        </TabList>

        <div class="dashboard__header-filters">
          <label class="dashboard__header-filters-label">Выбрать период:</label>
          <DatePicker
            v-model="this.filters.value"
            @hide="changeFilter()"
            dateFormat="dd.mm.yy"
            :placeholder="this.filters.placeholder"
            :manualInput="false"
            :maxDate="date_now"
            showIcon
            showClear
            iconDisplay="input"
            selectionMode="range"
            class="catalog-filters-dates"
          >
            <template #footer>
              <div class="catalog-filters-dates-overlay-footer">
                <button
                  class="d-button d-button-primary d-button-primary-small d-button-clear-dates"
                  @click.prevent="this.filters.value = null"
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
      </div>

      <TabPanels>
        <TabPanel v-if="tabException == 0 && mode == 'orders'">
          <div class="promotions__card-values-cont">
            <div class="promotions__card-values">
              <div class="promotions__card-value-container promotions__card-value-container--main">
                <div class="promotions__card-value-container-item">
                  <p class="promotions__card-value">
                    {{ tabs.org_now }}
                    <span class="promotions__card-values-title-grey">({{ tabs.total_new }})</span>
                  </p>
                </div>
              </div>
              <div class="promotions__card-value-container"></div>
            </div>
            <div class="promotions__card-values">
              <div class="promotions__card-value-container">
                <span class="promotions__card-label">Оптовики:</span>
                <div class="promotions__card-value-container-item">
                  <p class="promotions__card-value">
                    {{ tabs.warehouse_now }}
                  </p>
                  <span
                    class="promotions__card-badge"
                    :class="{
                      'promotions__card-badge-green': Number(tabs.warehouse_prev) > 0,
                      'promotions__card-badge-red': Number(tabs.warehouse_prev) < 0,
                      'promotions__card-badge-null': Number(tabs.warehouse_prev) == 0,
                    }"
                    >{{
                      Number(tabs.warehouse_prev) > 0
                        ? '+' + tabs.warehouse_prev
                        : tabs.warehouse_prev
                    }}</span
                  >
                </div>
              </div>
              <div class="d-divider d-divider--vertical"></div>
              <div class="promotions__card-value-container">
                <span class="promotions__card-label">Магазины:</span>
                <div class="promotions__card-value-container-item">
                  <p class="promotions__card-value">
                    {{ tabs.store_now }}
                  </p>
                  <span
                    class="promotions__card-badge"
                    :class="{
                      'promotions__card-badge-green': Number(tabs.store_prev) > 0,
                      'promotions__card-badge-red': Number(tabs.store_prev) < 0,
                      'promotions__card-badge-null': Number(tabs.store_prev) == 0,
                    }"
                    >{{
                      Number(tabs.store_prev) > 0 ? '+' + tabs.store_prev : tabs.store_prev
                    }}</span
                  >
                </div>
              </div>
              <div class="d-divider d-divider--vertical"></div>
              <div class="promotions__card-value-container">
                <span class="promotions__card-label">Сумма:</span>
                <div class="promotions__card-value-container-item">
                  <p class="promotions__card-value">{{ tabs.cost_now }}</p>
                  <span
                    class="promotions__card-badge"
                    :class="{
                      'promotions__card-badge-green': Number(tabs.cost_prev_number) > 0,
                      'promotions__card-badge-red': Number(tabs.cost_prev_number) < 0,
                      'promotions__card-badge-null': Number(tabs.cost_prev_number) == 0,
                    }"
                    >{{
                      Number(tabs.cost_prev_number) > 0 ? '+' + tabs.cost_prev : tabs.cost_prev
                    }}</span
                  >
                </div>
              </div>
              <div class="d-divider d-divider--vertical"></div>
              <div class="promotions__card-value-container">
                <span class="promotions__card-label">Количество:</span>
                <div class="promotions__card-value-container-item">
                  <p class="promotions__card-value">
                    {{ tabs.total_now }}
                  </p>
                  <span
                    class="promotions__card-badge"
                    :class="{
                      'promotions__card-badge-green': Number(tabs.total_prev) > 0,
                      'promotions__card-badge-red': Number(tabs.total_prev) < 0,
                      'promotions__card-badge-null': Number(tabs.total_prev) == 0,
                    }"
                    >{{
                      Number(tabs.total_prev) > 0 ? '+' + tabs.total_prev : tabs.total_prev
                    }}</span
                  >
                </div>
              </div>
              <div class="d-divider d-divider--vertical"></div>
              <div class="promotions__card-value-container">
                <span class="promotions__card-label">Без заказов:</span>
                <div class="promotions__card-value-container-item">
                  <p class="promotions__card-value">
                    {{ tabs.org_noorder_now }}
                  </p>
                  <span
                    class="promotions__card-badge"
                    :class="{
                      'promotions__card-badge-green': Number(tabs.org_noorder_prev) > 0,
                      'promotions__card-badge-red': Number(tabs.org_noorder_prev) < 0,
                      'promotions__card-badge-null': Number(tabs.org_noorder_prev) == 0,
                    }"
                    >{{
                      Number(tabs.org_noorder_prev) > 0
                        ? '+' + tabs.org_noorder_prev
                        : tabs.org_noorder_prev
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel v-if="tabException == 1 && mode == 'orders'">
          <div class="promotions__card-values-cont">
            <div class="promotions__card-values">
              <div class="promotions__card-value-container promotions__card-value-container--main">
                <div class="promotions__card-value-container-item">
                  <p class="promotions__card-value">
                    {{ tabs.org_seller_now }}
                  </p>
                  <!-- <span class="promotions__card-badge promotions__card-badge-red">-3</span> -->
                </div>
              </div>
              <div class="promotions__card-value-container"></div>
            </div>
            <div class="promotions__card-values">
              <div
                class="promotions__card-values-contt"
                v-for="(item, ind) in tabs.orgs.items"
                :key="ind"
              >
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">{{ item.name }}:</span>
                  <div class="promotions__card-value-container-item">
                    <p class="promotions__card-value">{{ item.count_now }}</p>
                    <span
                      class="promotions__card-badge"
                      :class="{
                        'promotions__card-badge-green': Number(item.count_prev) > 0,
                        'promotions__card-badge-red': Number(item.count_prev) < 0,
                        'promotions__card-badge-null': Number(item.count_prev) == 0,
                      }"
                      >{{
                        Number(item.count_prev) > 0 ? '+' + item.count_prev : item.count_prev
                      }}</span
                    >
                  </div>
                </div>
                <div
                  class="d-divider d-divider--vertical"
                  v-if="ind < Object.keys(tabs.orgs.items).length - 1"
                ></div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel v-if="tabException == 0 && mode == 'connection'">
          <div class="promotions__card-values-cont">
            <div class="promotions__card-values">
              <div class="promotions__card-value-container promotions__card-value-container--main">
                <div class="promotions__card-value-container-item">
                  <p class="promotions__card-value">
                    {{ tabs.total_now }}
                  </p>
                  <span
                    class="promotions__card-badge"
                    :class="{
                      'promotions__card-badge-green': Number(tabs.total_prev) > 0,
                      'promotions__card-badge-red': Number(tabs.total_prev) < 0,
                      'promotions__card-badge-null': Number(tabs.total_prev) == 0,
                    }"
                    >{{
                      Number(tabs.total_prev) > 0 ? '+' + tabs.total_prev : tabs.total_prev
                    }}</span
                  >
                </div>
              </div>
              <div class="promotions__card-value-container"></div>
            </div>
            <div class="promotions__card-values">
              <div class="promotions__card-value-container">
                <span class="promotions__card-label">С поставщиками:</span>
                <div class="promotions__card-value-container-item">
                  <p class="promotions__card-value">
                    {{ tabs.have_now }}
                  </p>
                  <span
                    class="promotions__card-badge"
                    :class="{
                      'promotions__card-badge-green': Number(tabs.have_prev) > 0,
                      'promotions__card-badge-red': Number(tabs.have_prev) < 0,
                      'promotions__card-badge-null': Number(tabs.have_prev) == 0,
                    }"
                    >{{ Number(tabs.have_prev) > 0 ? '+' + tabs.have_prev : tabs.have_prev }}</span
                  >
                </div>
              </div>
              <div class="d-divider d-divider--vertical"></div>
              <div class="promotions__card-value-container">
                <span class="promotions__card-label">Без поставщиков:</span>
                <div class="promotions__card-value-container-item">
                  <p class="promotions__card-value">
                    {{ tabs.nohave_now }}
                  </p>
                  <!-- <span class="promotions__card-badge promotions__card-badge-null">0</span> -->
                </div>
              </div>
              <div class="d-divider d-divider--vertical"></div>
              <div class="promotions__card-value-container">
                <span class="promotions__card-label">Бренды:</span>
                <div class="promotions__card-value-container-item">
                  <p class="promotions__card-value">
                    {{ tabs.vendor_now }}
                  </p>
                  <span
                    class="promotions__card-badge"
                    :class="{
                      'promotions__card-badge-green': Number(tabs.vendor_prev) > 0,
                      'promotions__card-badge-red': Number(tabs.vendor_prev) < 0,
                      'promotions__card-badge-null': Number(tabs.vendor_prev) == 0,
                    }"
                    >{{
                      Number(tabs.vendor_prev) > 0 ? '+' + tabs.vendor_prev : tabs.vendor_prev
                    }}</span
                  >
                </div>
              </div>
              <div class="d-divider d-divider--vertical"></div>
              <div class="promotions__card-value-container">
                <span class="promotions__card-label">Оптовики:</span>
                <div class="promotions__card-value-container-item">
                  <p class="promotions__card-value">
                    {{ tabs.warehouse_now }}
                  </p>
                  <span
                    class="promotions__card-badge"
                    :class="{
                      'promotions__card-badge-green': Number(tabs.warehouse_prev) > 0,
                      'promotions__card-badge-red': Number(tabs.warehouse_prev) < 0,
                      'promotions__card-badge-null': Number(tabs.warehouse_prev) == 0,
                    }"
                    >{{
                      Number(tabs.warehouse_prev) > 0
                        ? '+' + tabs.warehouse_prev
                        : tabs.warehouse_prev
                    }}</span
                  >
                </div>
              </div>
              <div class="d-divider d-divider--vertical"></div>
              <div class="promotions__card-value-container">
                <span class="promotions__card-label">Магазины:</span>
                <div class="promotions__card-value-container-item">
                  <p class="promotions__card-value">
                    {{ tabs.store_now }}
                  </p>
                  <span
                    class="promotions__card-badge"
                    :class="{
                      'promotions__card-badge-green': Number(tabs.store_prev) > 0,
                      'promotions__card-badge-red': Number(tabs.store_prev) < 0,
                      'promotions__card-badge-null': Number(tabs.store_prev) == 0,
                    }"
                    >{{
                      Number(tabs.store_prev) > 0 ? '+' + tabs.store_prev : tabs.store_prev
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel v-if="tabException == 1 && mode == 'connection'">
          <div class="promotions__card-values-cont">
            <div class="promotions__card-values">
              <div class="promotions__card-value-container promotions__card-value-container--main">
                <div class="promotions__card-value-container-item">
                  <p class="promotions__card-value">
                    {{ tabs.total_now }}
                  </p>
                  <span
                    class="promotions__card-badge"
                    :class="{
                      'promotions__card-badge-green': Number(tabs.total_prev) > 0,
                      'promotions__card-badge-red': Number(tabs.total_prev) < 0,
                      'promotions__card-badge-null': Number(tabs.total_prev) == 0,
                    }"
                    >{{
                      Number(tabs.total_prev) > 0 ? '+' + tabs.total_prev : tabs.total_prev
                    }}</span
                  >
                </div>
              </div>
              <div class="promotions__card-value-container"></div>
            </div>
            <div class="promotions__card-values">
              <div
                class="promotions__card-values-contt"
                v-for="(item, ind) in tabs.orgs.items"
                :key="ind"
              >
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">{{ item.name }}:</span>
                  <div class="promotions__card-value-container-item">
                    <p class="promotions__card-value">{{ item.count_now }}</p>
                    <span
                      class="promotions__card-badge"
                      :class="{
                        'promotions__card-badge-green': Number(item.count_prev) > 0,
                        'promotions__card-badge-red': Number(item.count_prev) < 0,
                        'promotions__card-badge-null': Number(item.count_prev) == 0,
                      }"
                      >{{
                        Number(item.count_prev) > 0 ? '+' + item.count_prev : item.count_prev
                      }}</span
                    >
                  </div>
                </div>
                <div
                  class="d-divider d-divider--vertical"
                  v-if="ind < Object.keys(tabs.orgs.items).length - 1"
                ></div>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script>
import Tabs from 'primevue/tabs'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import TabList from 'primevue/tablist'
import DatePicker from 'primevue/datepicker'

export default {
  name: 'modalDash',
  data() {
    return {
      tabException: 0,
      filters: {},
    }
  },
  emits: ['setDates'],
  components: { Tabs, TabPanels, TabPanel, TabList, DatePicker },
  props: {
    tabs: {
      type: Object,
      default: () => {
        return {}
      },
    },
    filtersModal: {
      type: Object,
      default: () => {
        return {}
      },
    },
    title: {
      type: String,
      default: 'Дашборд',
    },
    mode: {
      type: String,
      default: '',
    },
  },
  mounted() {
    if (Object.keys(this.filtersModal).length) {
      this.filters = this.filtersModal
    }
  },
  computed: {},
  methods: {
    changeFilter() {
      this.$emit('setDates', this.filters.value)
    },
  },
  watch: {
    filtersModal: function (newVal) {
      this.filters = newVal
    },
  },
}
</script>

<style lang="scss">
.dashboard-modal_header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  .dashboard__header-filters {
    .p-datepicker {
      width: 100%;
    }
    .catalog-filters-dates.p-inputwrapper-focus.p-focus .p-inputtext {
      color: #fff;
      background: #282828 !important;
    }
    .catalog-filters-dates:not(.p-inputwrapper-focus) .p-inputtext {
      color: #282828 !important;
      background: #fff !important;
      border: 1px solid #75757575;
    }
    .catalog-filters-dates .p-inputtext {
      font-size: 14px;
      line-height: 18px;
      padding-block: 11px;
      padding-inline: 16px 22px;
      border: none;
      border-radius: 53px;
      box-shadow: none;
      cursor: pointer;
    }
    .catalog-filters-dates.p-inputwrapper-focus.p-focus .p-inputtext::placeholder {
      font-size: 14px;
      line-height: 18px;
      font-weight: 500;
      color: #fff;
    }
    .catalog-filters-dates .p-inputtext::placeholder {
      font-size: 14px;
      line-height: 18px;
      color: #282828;
      font-weight: 500;
    }
    .catalog-filters-dates.p-inputwrapper-focus.p-focus .p-datepicker-input-icon-container {
      color: #fff;
    }
    .catalog-filters-dates .p-datepicker-input-icon-container {
      color: #282828;
      padding-left: 14px;
      padding-right: 4px;
      display: flex;
      align-items: center;
      height: 16px;
    }
    .catalog-filters-dates .p-datepicker-input-icon-container .p-icon {
      width: 12px;
      height: 14px;
    }
    .catalog-filters-dates .p-datepicker-input-icon-container::before {
      content: '';
      width: 1px;
      height: 11px;
      background-color: #757575;
      display: block;
      position: absolute;
      top: 3px;
      left: 0;
    }

    .p-datepicker-day-selected-range {
      color: #fff !important;
    }
  }
  .p-tablist {
    flex-grow: 1;
    &-next-button {
      display: none;
    }
    &-content {
      .p-tablist-tab-list {
        background: transparent;
        border-style: solid;
        border-color: transparent;
        border-width: 0px;
        gap: 16px;
      }
      .d-tab2 {
        background-color: #ededed;
        color: #282828;
        height: 40px;
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        padding: 9.5px 16px;
      }
      .d-tab2--active {
        background-color: #282828;
        color: #fff;
      }
    }
  }
}
.dashboard--tabs .p-tabpanels {
  background: transparent;
  padding: 64px 0;
  outline: 0 none;
}
.dashboard-modal_header-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
  h2 {
    font-weight: 600;
    font-size: 24px;
    line-height: 31px;
    color: #282828;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #757575;
  }
}

.catalog-filters-dates-overlay-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  padding: 8px 0;
}
.catalog-filters-dates-overlay-footer button {
  width: 100%;
  box-shadow: none;
}
.promotions__card-values-cont {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .promotions__card-values {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0;
    &-contt {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-grow: 1;
      .d-divider {
        margin: 0 12px;
      }
    }
    &-title {
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;

      color: #282828;
      &-grey {
        color: #757575;
      }
    }
    .promotions__card-value-container {
      gap: 8px;
      &-item {
        display: flex;
      }
      &-button {
        padding: 9px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background-color: #ededed;
        border-radius: 23px;
        height: 40px;
        min-height: 40px;
        max-height: 40px;
        transition: all 0.2s ease;
        &-label {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;
          color: #282828;
          transition: all 0.2s ease;
        }
        &-badge {
          background-color: transparent;
          border: 1px solid #282828;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0px 8px;
          font-weight: 400;
          font-size: 16px;
          line-height: 21px;
          color: #282828;
          border-radius: 20px;
          transition: all 0.2s ease;
        }
        &-icon {
          font-size: 16px;
          width: 16px;
          height: 16px;
          color: #282828;
          transition: all 0.2s ease;
        }
      }
      &-button:hover {
        background-color: #282828;
      }
      &-button:hover .promotions__card-value-container-button-label {
        color: #fff;
      }
      &-button:hover .promotions__card-value-container-button-badge {
        background-color: #fff;
        border: 1px solid #282828;
      }
      &-button:hover .promotions__card-value-container-button-icon {
        color: #fff;
      }
      .promotions__card-label {
        color: #757575;
        font-size: 14px;
        margin-bottom: 0px;
        font-weight: 400;
        line-height: 18px;
      }
      .promotions__card-value {
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        color: #282828;
      }
      .promotions__card-badge {
        padding: 1.5px 0;
        border-radius: 0px;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
      }
      .promotions__card-value-container-item {
        align-items: center;
        gap: 16px;
      }
      .promotions__card-badge-green {
        background-color: transparent;
        color: #549d15;
      }
      .promotions__card-badge-null {
        background-color: transparent;
        color: #bb7900;
      }
      .promotions__card-badge-red {
        background-color: transparent;
        color: #f92c0d;
      }
    }
    .promotions__card-value-container--main {
      .promotions__card-value {
        font-weight: 600;
        font-size: 32px;
        line-height: 42px;
        letter-spacing: -0.01em;
        color: #282828;
      }
      .promotions__card-badge {
        padding: 0px 8px;
        border-radius: 30px;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
      }
      .promotions__card-value-container-item {
        align-items: start;
        gap: 8px;
      }
      .promotions__card-badge-green {
        background-color: #e7f9d4;
        color: #549d15;
      }
      .promotions__card-badge-null {
        background-color: #f9efcb;
        color: #bb7900;
      }
      .promotions__card-badge-red {
        background-color: #fde1dd;
        color: #f92c0d;
      }
    }
  }
  .promotions__card-values-cont {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .promotions__card-values-cont:not(:first-child) {
    border-top: 0.5px solid #75757575;
    margin-top: 32px;
    padding-top: 22px;
  }
}
</style>
