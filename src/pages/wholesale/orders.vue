<template>
  <section class="shipments wholesaleorders__content myorders__content orders_table" id="shipments">
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

export default {
  name: 'wholesaleOrders',
  components: { Breadcrumbs, BaseTable, Loader, MinTable },
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
          placeholder: 'Поиск',
          type: 'text',
        },
      },
      table_data: {
        id: {
          label: '№',
          type: 'link',
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
          items: ['seller_name', 'seller_inn', 'seller_address'],
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
          items: ['buyer_name', 'buyer_inn', 'buyer_address'],
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
    }),
    filter(data) {
      console.log(data)
      this.loading = true
      this.unsetOrders()
      this.page = 1
      this.getOrders(data).then(() => {
        this.loading = false
      })
    },
    paginate(data) {
      this.loading = true
      this.unsetOrders()
      this.page = data.page
      this.getOrders(data).then(() => {
        this.loading = false
      })
    },
  },
  mounted() {
    this.getOrders({
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      orders: 'wholesale/orders',
    }),
  },
  watch: {},
}
</script>
<style lang="scss">
.wholesaleorders__content .dart-row {
  justify-content: end;
  margin-top: -39px;
}
.wholesaleorders__content .dart-mb-1 {
  margin-bottom: 40px;
}
.wholesaleorders__content .p-inputtext {
  width: 100%;
}
.wholesaleorders__content .form_input_group:after {
  content: '\e01d';
  font-family: 'Iconly' !important;
  position: absolute;
  font-size: 16.8px;
  top: calc(50% - 8.4px);
  right: 20px;
  color: #757575;
}
.wholesaleorders__content .p-inputtext {
  padding-right: 40px;
  box-shadow: none;
  border: 0.2px solid #75757575;
}
.wholesaleorders__content .p-inputtext:enabled:focus {
  border-color: #f92c0d;
}
.wholesaleorders__content .p-floatlabel:has(input:focus) label,
.wholesaleorders__content .p-floatlabel:has(input:-webkit-autofill) label,
.wholesaleorders__content .p-floatlabel:has(textarea:focus) label,
.wholesaleorders__content .p-floatlabel:has(.p-inputwrapper-focus) label {
  color: #f92c0d;
}
.wholesaleorders__content .d-table__col,
.wholesaleorders__content .d-table__row:first-child > .d-table__col {
  padding: 16px;
}

</style>
