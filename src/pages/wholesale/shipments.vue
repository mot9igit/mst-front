<template>
  <section class="shipments shipments-main" id="shipments">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <breadcrumbs />
      <Toast />
    </div>

    <!-- Шапка страницы -->
    <div class="shipments__header">
      <h1 class="shipments__header-title">
        <div class="shipments__header-title-wrapper">
          <i class="d-icon-angle-rounded-left shipments__header-title-icon"></i>
          <span>Мои отгрузки</span>
        </div>
        <div class="d-divider d-divider--vertical shipments__header-title-divider"></div>
        <span>Отгрузки (1)</span>
      </h1>
    </div>
    <Loader v-if="loading" />
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
    />
  </section>
</template>
<script>
import breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import { mapActions, mapGetters } from 'vuex'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'
import Toast from 'primevue/toast'

export default {
  name: 'WholesaleShipments',
  components: { breadcrumbs, Loader, BaseTable, Toast },
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
      filters: {
        name: {
          name: 'Поиск',
          placeholder: 'Поиск по складу или маршруту',
          type: 'text',
        },
        dates: {
          name: 'Дата',
          placeholder: 'Выберите диапазон дат',
          value: null,
          type: 'datepicker',
        },
        // button: {
        //   type: 'download',
        // },
      },
      request_filter: {},
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
            edit: {
              icon: 'pi pi-pencil',
              label: 'Редактировать',
            },
            approve: {
              icon: 'pi pi-power-off',
              label: 'Включить',
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
  },
}
</script>
<style lang="scss"></style>
