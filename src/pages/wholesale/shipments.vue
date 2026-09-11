<template>
  <section class="shippings" id="shippings">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <breadcrumbs />
      <Toast />
    </div>

    <!-- Шапка страницы -->

    <h1 class="shippings__header">
      <span>Мои отгрузки</span>
      <div class="d-divider d-divider--vertical shippings__header-title-divider"></div>
      <span>Отгрузки ({{ shippings.total_way }})</span>
    </h1>

    <div class="shippings__header-button">
      <button
        class="d-button d-button-primary d-button-primary-small box-shadow-none shippings__header-button--create"
        @click.prevent=""
      >
        <i class="d-icon-plus-flat clients__card-offer-icon"></i>
        <span>Добавить отгрузку</span>
      </button>
    </div>
    <Loader v-if="loading" />
    <div class="shippings__content" v-else>
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
        <modalShipmentForm
          :ship="modalShippingData"
          :mode="mode"
          @editShip="editShip"
          @editMode="mode = 1"
          @deleteShip="delShipping"
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
import Toast from 'primevue/toast'
import customModal from '@/shared/ui/Modal.vue'
import modalShipmentForm from './ui/modalShipmentForm.vue'

export default {
  name: 'WholesaleShipments',
  components: { breadcrumbs, Loader, BaseTable, Toast, customModal, modalShipmentForm },
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
      page: 1,
      modalShipping: false,
      modalShippingData: {},
      mode: 0,
      filters: {
        dates: {
          name: 'Дата',
          placeholder: 'Выберите диапазон дат',
          value: null,
          type: 'datepicker',
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
        store: {
          label: 'Склад',
          type: 'text',
          class: 'cell_centeralign',
          //items: ['seller_name', 'seller_inn', 'seller_address', 'owner_label'],
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
    this.getShippings().then(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions({
      getShippings: 'wholesale/getShippings',
    }),
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
    editShip(data) {
      console.log(data)
    },
    delShipping(data) {
      console.log(data)
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
  }
}
</style>
