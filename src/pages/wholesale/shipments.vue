<template>
  <section class="shippings" id="shippings">
    <Toast />
    <!-- Верхушка страницы -->
    <div class="d-top">
      <breadcrumbs />
    </div>

    <Tabs v-model="activeTab" class="shippings__tabs">
      <TabList class="d-tab2__container shippings__tabs-list">
        <div class="d-tab2" :class="{ 'd-tab2--active': activeTab == 0 }" :value="0">
          <button class="collection__tabs-link" @click.prevent="activeTab = 0">
            <span>Города МС Экспресс</span>
          </button>
        </div>
        <div class="d-tab2" :class="{ 'd-tab2--active': activeTab == 1 }" :value="1">
          <button class="collection__tabs-link" @click.prevent="activeTab = 1">
            <span>МС Экспресс</span>
          </button>
        </div>
        <div class="d-tab2" :class="{ 'd-tab2--active': activeTab == 2 }" :value="2">
          <button class="collection__tabs-link" @click.prevent="activeTab = 2">
            <span>МС Логистика Х5</span>
          </button>
        </div>
      </TabList>

      <TabPanels>
        <TabPanel v-if="activeTab == 0">
          <h1 class="shippings__header">
            <span>Города МС Экспресс</span>
          </h1>
          <div class="shippings__header-button">
            <button
              class="d-button d-button-primary d-button-primary-small box-shadow-none shippings__header-button--create"
              @click.prevent="createCity"
            >
              <i class="d-icon-plus-flat clients__card-offer-icon"></i>
              <span>Добавить город</span>
            </button>
          </div>
          <Loader v-if="loading" />
          <div class="shippings__content">
            <BaseTable
              :items_data="shippings.ship_cities || []"
              :total="shippings.ship_cities?.length || 0"
              :pagination_items_per_page="pagination_items_per_page"
              :page="1"
              :show_filter="false"
              :table_data="cities_table_data"
              @viewElem="showCity"
              @editElem="editCity"
              @deleteElem="deleteCity"
              @approveElem="activateCity"
            />
          </div>
        </TabPanel>
        <TabPanel v-if="activeTab == 1">
          <h1 class="shippings__header">
            <span>Отгрузки МС Экспресс</span>
          </h1>
          <div class="shippings__header-button">
            <button
              class="d-button d-button-primary d-button-primary-small box-shadow-none shippings__header-button--create"
              @click.prevent="createShipping"
            >
              <i class="d-icon-plus-flat clients__card-offer-icon"></i>
              <span>Добавить отгрузку</span>
            </button>
          </div>
          <Loader v-if="loading || actionLoading" />
          <div class="shippings__content">
            <BaseTable
              :items_data="shippings.shipment"
              :total="shippings.total"
              :pagination_items_per_page="this.pagination_items_per_page"
              :pagination_offset="this.pagination_offset"
              :page="this.page"
              :table_data="this.table_data"
              :filters="this.filters"
              @filter="filter"
              @sort="filter"
              @paginate="paginate"
              @viewElem="showShipping"
              @editElem="editShipping"
              @deleteElem="delShipping"
            />
          </div>
        </TabPanel>
        <TabPanel v-if="activeTab == 2"></TabPanel>
      </TabPanels>
    </Tabs>
    <teleport to="body">
      <customModal v-model="this.modalShipping" class="shippings__modal">
        <Loader v-if="actionLoading" />
        <ShipmentWindow
          :ship="modalShippingData"
          :mode="mode"
          @editMode="mode = 1"
          @deleteShip="delShipping"
          @cancel="modalShipping = false"
          @submit="editShip"
          @changeOrderDate="onChangeOrderDate"
        />
      </customModal>
      <customModal
        v-model="this.modalOrderDate"
        class="shippings__modal shippings__order-date-modal"
      >
        <Loader v-if="actionLoading" />
        <ChangeOrderDateWindow
          :order="orderDateOrder"
          :dates="orderDateDates"
          :current-date="modalShippingData?.date"
          @cancel="modalOrderDate = false"
          @submit="submitOrderDate"
        />
      </customModal>
      <customModal v-model="modalCity" class="shippings__modal">
        <CityWindow
          :city="cityData"
          :mode="cityMode"
          @editMode="cityMode = 1"
          @deleteCity="deleteCity"
          @cancel="modalCity = false"
          @submit="submitCity"
        />
      </customModal>
    </teleport>
  </section>
</template>
<script>
import breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import { mapActions, mapGetters } from 'vuex'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import Toast from 'primevue/toast'
import ShipmentWindow from './ui/shipmentWindow.vue'
import ChangeOrderDateWindow from './ui/changeOrderDateWindow.vue'
import CityWindow from './ui/cityWindow.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'

function parseShipmentDate(value) {
  if (!value) return null
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }
  const s = String(value).trim()
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  m = s.match(/^(\d{2})\.(\d{2})\.(\d{4})/)
  if (m) return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]))
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? null : d
}

function formatShipmentDate(value) {
  const d = value instanceof Date ? value : new Date(value)
  if (!value || Number.isNaN(d.getTime())) return null
  const pad = (n) => String(n).padStart(2, '0')
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    ` ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  )
}

export default {
  name: 'WholesaleShipments',
  components: {
    breadcrumbs,
    Loader,
    BaseTable,
    customModal,
    Toast,
    ShipmentWindow,
    ChangeOrderDateWindow,
    CityWindow,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
  },
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
      actionLoading: false,
      activeTab: 1,
      page: 1,
      request_filter: null,
      modalShipping: false,
      modalShippingData: {},
      modalOrderDate: false,
      orderDateOrder: {},
      mode: 0,
      modalCity: false,
      cityData: {},
      cityMode: 0,
      cities_table_data: {
        id: {
          label: '№',
          type: 'text',
          class: 'cell_centeralign',
        },
        city_name: {
          label: 'Город',
          type: 'text',
          class: 'cell_centeralign',
        },
        period: {
          label: 'Период',
          type: 'text',
          class: 'cell_centeralign',
        },
        week_days_str: {
          label: 'Дни недели',
          type: 'text',
          class: 'cell_centeralign',
        },
        active: {
          label: 'Активен',
          type: 'boolean_active',
          class: 'cell_centeralign',
        },
        actions: {
          label: 'Действия',
          type: 'actions',
          sort: false,
          class: 'cell_centeralign',
          available: {
            approve: {
              icon: 'pi pi-power-off',
              label: 'Активировать / Деактивировать',
            },

            edit: {
              icon: 'pi pi-pencil',
              label: 'Редактировать',
            },
            delete: {
              icon: 'pi pi-trash',
              label: 'Удалить',
            },
          },
        },
      },
      filters: {
        dates: {
          name: 'Дата',
          placeholder: 'Выберите диапазон дат',
          value: null,
          type: 'datepicker',
          maxDate: null,
        },
        name: {
          name: 'Поиск',
          placeholder: 'Поиск по складу или маршруту',
          type: 'text',
        },
      },
      table_data: {
        id: {
          label: 'Номер отгруки',
          type: 'text',
          class: 'cell_centeralign',
        },
        stores: {
          label: 'Склад',
          type: 'stores',
          class: 'cell_centeralign',
        },
        date: {
          label: 'Дата',
          type: 'text',
          class: 'cell_centeralign',
        },
        way: {
          label: 'Маршрут',
          type: 'text',
          class: 'cell_centeralign',
        },
        orders: {
          label: 'Заказы',
          type: 'text',
          class: 'cell_centeralign',
        },
        status: {
          label: 'Статус',
          type: 'status',
          class: 'cell_centeralign cell_order-status',
        },
        actions: {
          label: '',
          type: 'actions',
          sort: false,
          class: 'cell_centeralign',
          available: {
            view: {
              icon: 'pi pi-eye',
              label: 'Посмотреть',
            },
            edit: {
              icon: 'pi pi-pencil',
              label: 'Редактировать',
              link: 'status',
              link_values: [1, 2],
            },
            delete: {
              icon: 'pi pi-trash',
              label: 'Удалить',
              link: 'status',
              link_exclude: [3],
            },
          },
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      shippings: 'wholesale/shippings',
    }),
    orderDateDates() {
      const rows = this.shippings?.shipment || []
      const current = this.modalShippingData || {}
      const city = current.city_id
      const seen = new Set()
      const result = []
      rows.forEach((row) => {
        if (!row) return
        if (Number(row.status) !== 1 && Number(row.status) !== 2) return
        if (
          row.id !== current.id &&
          city !== null &&
          city !== undefined &&
          row.city_id !== null &&
          row.city_id !== undefined &&
          String(row.city_id) !== String(city)
        ) {
          return
        }
        const d = parseShipmentDate(row.date)
        if (!d) return
        const key = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()
        if (seen.has(key)) return
        seen.add(key)
        result.push(d)
      })
      return result.sort((a, b) => a - b)
    },
  },
  mounted() {
    this.getShippings({
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.loading = false
      this.request_filter = {
        page: this.page,
        perpage: this.pagination_items_per_page,
      }
    })
  },
  methods: {
    ...mapActions({
      getShippings: 'wholesale/getShippings',
      unsetShippings: 'wholesale/unsetShippings',
      saveShipping: 'wholesale/saveShipping',
      deleteShipping: 'wholesale/deleteShipping',
      changeOrderDate: 'wholesale/changeOrderDate',
      setCityActive: 'logistic/setCityActive',
      deleteLogisticCity: 'logistic/deleteLogisticCity',
    }),
    filter(data) {
      this.loading = true
      this.unsetShippings()
      this.page = 1
      const requestData = this.normalizeFilters(data)
      this.getShippings(requestData).then(() => {
        this.loading = false
        this.request_filter = requestData
      })
    },
    paginate(data) {
      this.loading = true
      this.unsetShippings()
      this.page = data.page
      const requestData = this.normalizeFilters(data)
      this.getShippings(requestData).then(() => {
        this.loading = false
        this.request_filter = requestData
      })
    },
    normalizeFilters(data) {
      if (!data || !data.filtersdata || !data.filtersdata.dates) {
        return data
      }
      return {
        ...data,
        filtersdata: {
          ...data.filtersdata,
          dates: data.filtersdata.dates.map((d) =>
            d ? new Date(d.getTime() - d.getTimezoneOffset() * 60000) : d,
          ),
        },
      }
    },
    showShipping(data) {
      this.mode = 0
      this.modalShipping = true
      this.modalShippingData = data
    },
    editShipping(data) {
      if (![1, 2].includes(Number(data?.status))) return
      this.mode = 1
      this.modalShipping = true
      this.modalShippingData = data
    },
    createShipping() {
      this.mode = 2
      this.modalShipping = true
      this.modalShippingData = {}
    },
    openCityModal(city, mode) {
      this.cityMode = mode
      this.cityData = city ? { ...city } : {}
      this.modalCity = true
    },
    showCity(city) {
      this.openCityModal(city, 0)
    },
    editCity(city) {
      this.openCityModal(city, 1)
    },
    createCity() {
      this.openCityModal(null, 2)
    },
    submitCity(form) {
      if (this.cityMode === 2) {
        this.modalCity = false
        this.loading = true
        const requestData = this.request_filter || {
          page: this.page,
          perpage: this.pagination_items_per_page,
        }
        this.getShippings(requestData).finally(() => {
          this.loading = false
        })
        return
      }
      const list = this.shippings?.ship_cities || []
      const index = list.findIndex((city) => String(city.id) === String(form.id))
      if (index !== -1) {
        list.splice(index, 1, { ...list[index], ...form })
      }
      this.modalCity = false
    },

    activateCity(city) {
      this.loading = true
      this.setCityActive({ city_id: city.id }).then(() => {
        const requestData = this.request_filter || {
          page: this.page,
          perpage: this.pagination_items_per_page,
        }
        this.getShippings(requestData).finally(() => {
          this.loading = false
        })
      })
    },

    deleteCity(city) {
      this.$confirm.require({
        message: 'Вы действительно хотите удалить город ' + (city?.city_name || '') + '?',
        header: 'Удаление города',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading = true
          this.deleteLogisticCity({ city_id: city.id }).then(() => {
            const requestData = this.request_filter || {
              page: this.page,
              perpage: this.pagination_items_per_page,
            }
            this.getShippings(requestData).finally(() => {
              this.loading = false
            })
          })
          this.modalCity = false
        },
      })
    },
    async editShip(data) {
      const dateTime = data?.dateTime
      const date = dateTime ? formatShipmentDate(dateTime) : null

      const form = {
        date: date,
        location: data?.location ?? null,
        stop_redistribution: !!data?.stop_redistribution,
      }

      if (data?.table_order) {
        form.table_order = data.table_order
      }

      const shipment_id = this.mode === 1 ? this.modalShippingData?.id : null

      this.actionLoading = true
      try {
        const response = await this.saveShipping({ shipment_id, form })
        if (response && response !== 'technical error') {
          this.modalShipping = false
          this.modalShippingData = {}
          await this.getShippings(this.request_filter)
          this.$toast.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Отгрузка сохранена',
            life: 3000,
          })
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Не удалось сохранить отгрузку',
            life: 3000,
          })
        }
      } catch {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось сохранить отгрузку',
          life: 3000,
        })
      } finally {
        this.actionLoading = false
      }
    },
    onChangeOrderDate(order) {
      this.orderDateOrder = order || {}
      this.modalOrderDate = true
    },
    async submitOrderDate(date) {
      if (this.orderDateOrder?.order_status?.api_key !== 'buyer_accepted') return
      const order_id = this.orderDateOrder?.id
      const from_shipment_id = this.modalShippingData?.id
      if (!order_id || !from_shipment_id) {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось определить заказ или отгрузку',
          life: 3000,
        })
        return
      }
      const rows = this.shippings?.shipment || []
      const current = this.modalShippingData
      const sameDay = (value) => {
        const d = parseShipmentDate(value)
        return (
          !!d &&
          d.getFullYear() === date.getFullYear() &&
          d.getMonth() === date.getMonth() &&
          d.getDate() === date.getDate()
        )
      }
      const isSameCity = (row) => {
        if (
          current.city_id !== null &&
          current.city_id !== undefined &&
          row.city_id !== null &&
          row.city_id !== undefined &&
          String(row.city_id) !== String(current.city_id)
        ) {
          return false
        }
        return true
      }
      const target =
        rows.find(
          (row) => row && row.id !== from_shipment_id && isSameCity(row) && sameDay(row.date),
        ) ||
        rows.find((row) => row && row.id === from_shipment_id && sameDay(row.date)) ||
        null
      const dateString =
        date.getFullYear() +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(date.getDate()).padStart(2, '0')

      if (target && String(target.id) === String(from_shipment_id)) {
        this.modalOrderDate = false
        this.$toast.add({
          severity: 'info',
          summary: 'Информация',
          detail: 'Дата отправления заказа №' + order_id + ' уже указана',
          life: 3000,
        })
        return
      }

      this.actionLoading = true
      try {
        const response = await this.changeOrderDate({
          order_id,
          from_shipment_id,
          to_shipment_id: target ? target.id : null,
          date: dateString,
        })
        if (response && response !== 'technical error') {
          this.modalOrderDate = false
          await this.getShippings(this.request_filter)
          const updated = (this.shippings?.shipment || []).find(
            (row) => row && row.id === from_shipment_id,
          )
          if (updated) {
            this.modalShippingData = updated
          }
          this.$toast.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Дата отправления заказа №' + order_id + ' изменена',
            life: 3000,
          })
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Не удалось изменить дату отправления заказа',
            life: 3000,
          })
        }
      } catch {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось изменить дату отправления заказа',
          life: 3000,
        })
      } finally {
        this.actionLoading = false
      }
    },
    async delShipping(data) {
      if (Number(data?.status) === 3) return
      const shipping_id = data?.id
      if (!shipping_id) {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось определить ID отгрузки',
          life: 3000,
        })
        return
      }
      this.$confirm.require({
        message: 'Вы действительно хотите удалить отгрузку №' + shipping_id + '?',
        header: 'Удаление отгрузки',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          this.actionLoading = true
          try {
            const response = await this.deleteShipping({ shipping_id })
            if (response && response !== 'technical error') {
              this.modalShipping = false
              this.modalShippingData = {}
              await this.getShippings(this.request_filter)
              this.$toast.add({
                severity: 'success',
                summary: 'Успешно',
                detail: 'Отгрузка удалена',
                life: 3000,
              })
            } else {
              this.$toast.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: 'Не удалось удалить отгрузку',
                life: 3000,
              })
            }
          } catch {
            this.$toast.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: 'Не удалось удалить отгрузку',
              life: 3000,
            })
          } finally {
            this.actionLoading = false
          }
        },
      })
    },
  },
}
</script>
<style lang="scss">
.shippings__order-date-modal .modal-content {
  max-width: 500px;
}
.shippings {
  padding-block: 40px;
  display: flex;
  flex-direction: column;
  gap: 49px;
  &__tabs {
    width: 100%;
    .p-tabpanels {
      padding: 0;
      margin-top: 32px;
      background-color: transparent;
    }
    &-list {
      width: max-content;
      .p-tablist-tab-list {
        background-color: transparent;
        border: none;
        gap: 8px;
      }
      .collection__tabs-link {
        padding: 0;
        font: inherit;
        color: inherit;
      }
    }
  }
  &__header {
    display: flex;
    gap: 16px;
    align-items: center;
    span {
      font-weight: 600;
      font-size: 32px;
      line-height: 42px;
      letter-spacing: -0.01em;
    }
    .d-divider {
      height: 24px;
    }
    &-button {
      width: 100%;
      display: flex;
      justify-content: end;
      &--create {
        height: 40px;
        max-height: 40px;
        min-height: 40px;
        z-index: 10;
        font-size: 16px;
        i {
          font-size: 15px;
        }
      }
    }
  }
  &__content {
    margin-top: 24px;
    .dart-mb-1 {
      margin-bottom: 49px;
      .p-datepicker {
        display: flex;
        max-width: 100%;
      }
      .catalog-dates-filter-group .catalog-filters-dates {
        padding: 0;
      }
      .catalog-dates-filter-group .catalog-filters-dates:before {
        display: none;
      }
      .p-inputtext {
        width: 100%;
        min-width: 100%;
        border-radius: 20px;
      }
      .p-floatlabel label {
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #757575;
      }
      .p-floatlabel:has(input:focus) label {
        color: #f92c0d;
      }
    }
    .cell--status {
      color: #282828;
    }
    .form_input_group.d-search {
      &::after {
        content: '\e003';
        font-family: 'Iconly' !important;
        position: absolute;
        font-size: 16.8px;
        top: calc(50% - 8.4px);
        right: 20px;
        color: #757575;
        pointer-events: none;
      }
      .p-inputtext {
        padding-right: 44px;
      }
    }
  }
}
</style>
