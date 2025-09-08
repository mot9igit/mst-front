<template>
  <section class="shipments" id="shipments">
    <div class="myorders__content">
      <div class="d-top">
        <Breadcrumbs />
      </div>
      <h1>Мои заказы</h1>
      <Loader v-if="loading" />
      <BaseTable
        :items_data="optorders.orders"
        :total="optorders.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        @filter="filter"
        @sort="filter"
        @paginate="paginate"
      />
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'purchasesOrders',
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
          name: 'Искать в заказах',
          placeholder: 'Искать в заказах',
          type: 'text',
        },
      },
      table_data: {
        id: {
          label: '№',
          type: 'link',
          link_to: 'purchasesOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
        date: {
          label: 'Дата создания',
          type: 'link',
          link_to: 'purchasesOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
        seller_address: {
          label: 'Поставщик',
          type: 'link',
          link_to: 'purchasesOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign cell_org-data',
          items: ['seller_name','seller_inn','seller_address'],
        },
        ur_persone_name: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'purchasesOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign  cell_org-data',
          items: ['ur_persone_name','buyer_address'],
        },
        initiator: {
          label: 'Инициатор',
          type: 'link',
          link_to: 'purchasesOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign cell_initiatior-data',
          items: ['initiator','initiator_user_name'],
        },
        cost: {
          label: 'Сумма',
          type: 'link',
          link_to: 'purchasesOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
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
    }
  },
  methods: {
    ...mapActions({
      getOptOrders: 'purchases/getOptOrders',
      unsetOptOrders: 'purchases/unsetOptOrders',
    }),
    filter(data) {
      console.log(data)
      this.loading = true
      this.unsetOptOrders()
      this.page = 1
      this.getOptOrders(data).then(() => {
        this.loading = false
      })
    },
    paginate(data) {
      this.loading = true
      this.unsetOptOrders()
      this.page = data.page
      this.getOptOrders(data).then(() => {
        this.loading = false
      })
    },
  },
  mounted() {
    this.getOptOrders({
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      optorders: 'purchases/optorders',
    }),
  },
  watch: {},
}
</script>

<style lang="scss">
.myorders__content .dart-row {
  justify-content: end;
  margin-top: -39px;
}
.myorders__content .dart-mb-1 {
  margin-bottom: 40px;
}
.myorders__content .p-inputtext {
  width: 100%;
}
.myorders__content .form_input_group:after {
  content: '\e003';
  font-family: 'Iconly' !important;
  position: absolute;
  font-size: 16.8px;
  top: calc(50% - 8.4px);
  right: 20px;
}
.myorders__content .p-inputtext {
  padding-right: 40px;
  box-shadow: none;
  border: 0.2px solid #75757575;
}
.myorders__content .p-inputtext:enabled:focus {
  border-color: #f92c0d;
}
.myorders__content .p-floatlabel:has(input:focus) label,
.myorders__content .p-floatlabel:has(input:-webkit-autofill) label,
.myorders__content .p-floatlabel:has(textarea:focus) label,
.myorders__content .p-floatlabel:has(.p-inputwrapper-focus) label {
  color: #f92c0d;
}
.myorders__content .d-table__col,
.myorders__content .d-table__row:first-child > .d-table__col {
  padding: 16px;
}
.cell_org-data .multyitem_cell{
  width:fit-content;
  padding: 0;
  margin: 0;
  display: inline-block;
  margin-right: 3px;
}
 .cell_org-data .multyitem_cell:first-child::after{
  content:',';
  position: relative;
}
.cell_initiatior-data .multyitem_cell{
  display:block;
}
.cell_initiatior-data .multyitem_cell:last-child span::before{
  content: '(';
  position: relative;
}
.cell_initiatior-data .multyitem_cell:last-child span::after{
  content: ')';
  position: relative;
}

</style>
