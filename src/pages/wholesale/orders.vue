<template>
  <section class="shipments wholesaleorders__content myorders__content orders_table" id="shipments">
    <Toast />
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <h1 class="dart_mb-2">Оптовые заказы</h1>
    <Loader v-if="loading" />
    <BaseTable
      :items_data="orders.orders"
      :total="orders.total"
      :pagination_items_per_page="this.pagination_items_per_page"
      :pagination_offset="this.pagination_offset"
      :page="this.page"
      :table_data="this.table_data"
      :filters="this.filters"
      @filter="filter"
      @sort="filter"
      @paginate="paginate"
      @download="downloadOrd"
    />
    <MinTable
      :items_data="orders.orders"
      :total="orders.total"
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
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import MinTable from '@/shared/ui/tableMin/table.vue'
import Loader from '@/shared/ui/Loader.vue'
import Toast from 'primevue/toast'

export default {
  name: 'wholesaleOrders',
  components: { Breadcrumbs, BaseTable, Loader, MinTable, Toast },
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
        initiator_user: {
          name: 'Сотрудник',
          placeholder: 'Сотрудник',
          label: '',
          type: 'tree',
          value: '',
        },
        name: {
          name: 'Поиск',
          placeholder: 'Поиск',
          type: 'text',
        },
        dates: {
          name: 'Заказы за период',
          placeholder: 'Заказы за период',
          value: null,
          type: 'datepicker',
        },
        button: {
          type: 'download',
        },
      },
      request_filter: {},
      table_data: {
        id: {
          label: '№',
          type: 'link_all',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },

          class: 'cell_centeralign',
        },
        date: {
          label: 'Дата создания',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
          sort_desc: 'Дата заказа от новых к старым',
          sort_asc: 'Дата заказа от старых к новым',
          class: 'cell_centeralign',
        },
        seller_address: {
          label: 'Поставщик',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
          items: ['seller_name', 'seller_inn', 'seller_address', 'owner_label'],
        },
        buyer_name: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
          items: ['buyer_name', 'buyer_inn', 'buyer_address', 'buyer_owner'],
        },

        // buyer_store: {
        //   label: 'Магазин/Склад покупателя',
        //   type: 'link',
        //   link_to: 'wholesaleOrder',
        //   link_params: {
        //     id: this.$route.params.id,
        //     order_id: 'id',
        //   },
        //   class: 'cell_centeralign',
        // },

        initiator: {
          label: 'Инициатор',
          type: 'html',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },

          class: 'cell_centeralign',
        },

        // seller_w_name: {
        //   label: 'Магазин/Склад продавца',
        //   type: 'link',
        //   link_to: 'wholesaleOrder',
        //   link_params: {
        //     id: this.$route.params.id,
        //     order_id: 'id',
        //   },
        //   class: 'cell_centeralign',
        // },
        cost: {
          label: 'Сумма',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },

          class: 'cell_centeralign nowrap',
        },
        status: {
          label: 'Статус',
          type: 'status',
          sort: true,
          sort_asc: 'Статус от новых к выполненным',
          sort_desc: 'Статус от выполненным к новым',
          class: 'cell_centeralign cell_order-status',
        },
        comment: {
          label: 'Комментарий',
          type: 'prepare-html',

          class: 'cell_centeralign order-table_comment',
        },
      },
    }
  },
  methods: {
    ...mapActions({
      getOrders: 'wholesale/getOrders',
      unsetOrders: 'wholesale/unsetOrders',
      downloadOrders: 'wholesale/downloadOrders',
      getFilterManagers: 'addition/getManagers',
    }),
    addDillersFilter() {
      if (this.orgActive?.type == 3 && !this.filters.dillers_orders) {
        this.filters = {
          dillers_orders: {
            name: 'Показать заказы к дилерам',
            placeholder: 'Показать заказы к дилерам',
            label: 'Показать заказы к дилерам',
            type: 'switch',
            value: false,
          },
          ...this.filters,
        }
      }
    },
    filter(data) {
      console.log(data)
      this.loading = true
      this.unsetOrders()
      this.page = 1
      const requestData = this.normalizeFilters(data)
      this.getOrders(requestData).then(() => {
        this.loading = false
        this.request_filter = requestData
      })
    },
    paginate(data) {
      this.loading = true
      this.unsetOrders()
      this.page = data.page
      this.getOrders(this.normalizeFilters(data)).then(() => {
        this.loading = false
      })
    },
    normalizeFilters(data) {
      if (!data || !data.filtersdata || !data.filtersdata.dates) {
        return data
      }
      const normalized = {
        ...data,
        filtersdata: {
          ...data.filtersdata,
          dates: data.filtersdata.dates.map((d) =>
            d ? new Date(d.getTime() - d.getTimezoneOffset() * 60000) : d,
          ),
        },
      }
      return normalized
    },
    downloadOrd() {
      this.downloadOrders({
        filter: this.request_filter,
        mode: 'seller',
      }).then((response) => {
        if (response.data.data.filename) {
          this.loading = false
          let loc = response.data.data.filename
          var downloadLink = document.createElement('a')
          downloadLink.href = loc
          downloadLink.setAttribute('download', loc)
          downloadLink.setAttribute('target', '_blank')
          downloadLink.click()
        } else {
          this.loading = false
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Не удалось скачать отчет!',
            life: 3000,
          })
        }
      })
    },
  },
  mounted() {
    this.addDillersFilter()
    this.getOrders({
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.loading = false
    })
    this.getFilterManagers().then(() => {
      this.filters.initiator_user.values = this.filter_managers
    })
  },
  computed: {
    ...mapGetters({
      orders: 'wholesale/orders',
      filter_managers: 'addition/managers',
      orgActive: 'org/orgActive',
    }),
  },
  watch: {
    filter_managers: function (newVal) {
      this.filters.initiator_user.values = newVal
    },
    orgActive: function () {
      this.addDillersFilter()
    },
  },
}
</script>
<style lang="scss">
.wholesaleorders__content .dart-row {
  align-items: flex-end !important;
  .dart-form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .p-inputtext,
  .vue3-treeselect__control {
    border-radius: 20px;
  }
}
.wholesaleorders__content .vue3-treeselect__placeholder,
.wholesaleorders__content .vue3-treeselect__single-value {
  bottom: 0;
  left: 0;
  line-height: 35px;
  overflow: hidden;
  padding-left: 7px;
  padding-right: 5px;
  pointer-events: none;
  position: absolute;
  right: 0;
  text-overflow: ellipsis;
  top: 0px;
  user-select: none;
  white-space: nowrap;
}
.wholesaleorders__content .dart-row .d-col-xl-6.d-col-md-4:not(.d-col-w-auto) {
  width: 17%;
}
.wholesaleorders__content .catalog-dates-filter-group .catalog-filters-dates {
  position: relative;
  padding-left: 16px;
}
.wholesaleorders__content .dart-row .vue3-treeselect__control,
.wholesaleorders__content .catalog-dates-filter-group .catalog-filters-dates .p-inputtext {
  height: 40px;
  min-height: 40px;
}
.wholesaleorders__content .download-button {
  height: 40px;
  width: 40px;
}
@media (width <= 1280px) {
  .wholesaleorders__content .dart-row .dart-form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .wholesaleorders__content .dart-row .d-col-xl-6.d-col-md-4:not(.d-col-w-auto) {
    width: 17% !important;
  }
  .wholesaleorders__content .dart-row .d-col-xl-6.d-col-md-4.d-col-w-auto {
    width: auto !important;
    flex: 0 0 auto;
  }
  .wholesaleorders__content .treeselect-filter-label {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }
  .wholesaleorders__content .dart-row .vue3-treeselect__control,
  .wholesaleorders__content .catalog-dates-filter-group .catalog-filters-dates .p-inputtext {
    height: 32px;
    min-height: 32px;
    font-size: 12px;
  }
  .wholesaleorders__content .vue3-treeselect__placeholder,
  .wholesaleorders__content .vue3-treeselect__single-value {
    font-size: 12px;
  }
  .wholesaleorders__content
    .catalog-dates-filter-group
    .catalog-filters-dates
    .p-inputtext::placeholder {
    font-size: 12px;
  }
  .wholesaleorders__content .download-button {
    height: 32px;
    width: 32px;
    i {
      font-size: 14px;
    }
  }
}
@media (width > 600px) and (width <= 1024px) {
  .wholesaleorders__content .dart-row .vue3-treeselect__control,
  .wholesaleorders__content .catalog-dates-filter-group .catalog-filters-dates .p-inputtext {
    height: 24px;
    min-height: 24px;
  }
  .wholesaleorders__content .download-button {
    height: 24px;
    width: 24px;
  }
}
@media (width <= 1024px) {
  .wholesaleorders__content .dart-row .vue3-treeselect__control,
  .wholesaleorders__content .catalog-dates-filter-group .catalog-filters-dates .p-inputtext {
    font-size: 9px;
  }
  .wholesaleorders__content .vue3-treeselect__placeholder,
  .wholesaleorders__content .vue3-treeselect__single-value {
    font-size: 9px;
  }
  .wholesaleorders__content
    .catalog-dates-filter-group
    .catalog-filters-dates
    .p-inputtext::placeholder {
    font-size: 9px;
  }
}
@media (width <= 770px) {
  .wholesaleorders__content .dart-row.dart-mb-1 {
    display: none;
  }
}
</style>
