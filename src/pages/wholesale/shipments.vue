<template>
  <section class="shippings" id="shippings">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <breadcrumbs />
    </div>

    <!-- Шапка страницы -->

    <h1 class="shippings__header">
      <span>Мои отгрузки</span>
      <div class="d-divider d-divider--vertical shippings__header-title-divider"></div>
      <span>Отгрузки ({{ shippings.total_way ?? 0 }})</span>
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
    <teleport to="body">
      <customModal v-model="this.modalShipping" class="shippings__modal">
        <ShipmentWindow
          :ship="modalShippingData"
          :mode="mode"
          @editMode="mode = 1"
          @deleteShip="delShipping"
          @cancel="modalShipping = false"
          @submit="editShip"
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
import ShipmentWindow from './ui/shipmentWindow.vue'

export default {
  name: 'WholesaleShipments',
  components: { breadcrumbs, Loader, BaseTable, customModal, ShipmentWindow },
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
      page: 1,
      request_filter: null,
      modalShipping: false,
      modalShippingData: {},
      mode: 0,
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
            },
            delete: {
              icon: 'pi pi-trash',
              label: 'Удалить',
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
      this.mode = 1
      this.modalShipping = true
      this.modalShippingData = data
    },
    createShipping() {
      this.mode = 2
      this.modalShipping = true
      this.modalShippingData = {}
    },
    async editShip(data) {
      const dateTime = data?.dateTime
      const date = dateTime
        ? new Date(dateTime.getTime() - dateTime.getTimezoneOffset() * 60000)
        : null

      const form = {
        date: date,
        location: data?.location ?? null,
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
      } catch (e) {
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
    async delShipping(data) {
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
          } catch (e) {
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
.shippings {
  display: flex;
  flex-direction: column;
  gap: 49px;
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
    margin-top: -89px;
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
