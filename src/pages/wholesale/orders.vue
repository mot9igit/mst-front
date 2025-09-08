<template>
  <section class="shipments wholesaleorders__content" id="shipments">
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
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'wholesaleOrders',
  components: { Breadcrumbs, BaseTable, Loader },
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
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text',
        },
      },
      table_data: {
        id: {
          label: 'Номер',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
        buyer: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
        },
        date: {
          label: 'Дата',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
        cost: {
          label: 'Сумма',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
        initiator: {
          label: 'Инициатор',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
        seller_name: {
          label: 'Поставщик',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
        seller_w_name: {
          label: 'Магазин/Склад',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
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
  content: '\e003';
  font-family: 'Iconly' !important;
  position: absolute;
  font-size: 16.8px;
  top: calc(50% - 8.4px);
  right: 20px;
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
