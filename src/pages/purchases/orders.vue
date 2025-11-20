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
          name: 'Поиск',
          placeholder: 'Поиск',
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
          items: ['seller_name', 'seller_inn', 'seller_address'],
        },
        // seller_w_name: {
        //   label: 'Магазин/Склад продавца',
        //   type: 'link',
        //   link_to: 'purchasesOrder',
        //   link_params: {
        //     id: this.$route.params.id,
        //     order_id: 'id',
        //   },
        //   class: 'cell_centeralign',
        // },
        ur_persone_name: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'purchasesOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
          items: ['ur_persone_name', 'buyer_address'],
        },
        // buyer_store: {
        //   label: 'Магазин/Склад покупателя',
        //   type: 'link',
        //   link_to: 'purchasesOrder',
        //   link_params: {
        //     id: this.$route.params.id,
        //     order_id: 'id',
        //   },
        //   class: 'cell_centeralign',
        // },
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
          items: ['initiator', 'initiator_user_name'],
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
          class: 'cell_centeralign nowrap',
        },
        status: {
          label: 'Статус',
          type: 'status',
          sort: true,
          class: 'cell_centeralign cell_order-status',
        },
        comment: {
          label: 'Комментарий',
          type: 'prepare-html',
          sort: false,
          class: 'cell_centeralign order-table_comment',
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
.cell_org-data .multyitem_cell {
  width: fit-content;
  padding: 0;
  margin: 0;
  display: inline-block;
  margin-right: 3px;
}
.cell_org-data .multyitem_cell:first-child::after {
  content: ',';
  position: relative;
}

.cell_initiatior-data .multyitem_cell {
  display: block;
}
.cell_initiatior-data .multyitem_cell:last-child span::before {
  content: '(';
  position: relative;
}
.cell_initiatior-data .multyitem_cell:last-child span::after {
  content: ')';
  position: relative;
}
.cell_data-label{
  display: none;
}
@media (width <= 1536px) {
  .shipments h1{
    font-size: 20px;
  }
  .shipments .d-table__col {
    font-size: 12px;
  }
}
@media (width <= 1280px) {
  .shipments h1{
    font-size: 16px;
  }
  .shipments .d-table__col {
    font-size: 10px;
  }
  .shipments .d-table__head-col {
    font-size: 12px;
  }
  .shipments .p-inputtext{
    padding-block: 7px;
    font-size: 12px;
  }
  .shipments .p-floatlabel label {
    font-size: 12px;
  }
  .shipments  .form_input_group:after {
    top: calc(50% - 10.4px) !important;
    right: 20px !important;
  }
  .shipments .dart-row {
      margin-top: -24px !important;
  }
  .cell_order-status span{
    font-size:10px !important;
  }
  .shipments .d-top-order-container-buttons button{
    height: 32px;
    max-height: 32px;
    min-height: 32px;
  }
  .shipments button span{
    font-size: 14px;
  }

}
@media (width <= 1024px) {

  .shipments .d-table__col {
    font-size: 9px;
  }
  .shipments .d-table__head-col {
    font-size: 10px;
  }
  .shipments .p-inputtext{
    padding-block: 5px;
    font-size: 9px;
  }
  .shipments .p-floatlabel label {
    font-size: 9px;
  }
  .shipments  .form_input_group:after {
    top: calc(50% - 6.4px) !important;
    right: 16px !important;
    font-size:12px !important;
  }
  .shipments .dart-row {
      margin-top: -24px !important;
  }
  .cell_order-status span{
    font-size:9px !important;
    color: #282828
  }
  .shipments  .dart-mb-1 {
      margin-bottom: 32px !important;
  }
  .myorders__content .d-table__head-col:last-child span{
    display: none;
  }
  .myorders__content .d-table__head-col:last-child::before{
    display: none;
  }
  .myorders__content .d-table__col:last-child{
    display: flex;
    justify-content: start;
    align-items: end;
    position:absolute;
    bottom:0;
    left: 0;
    width: auto;
    height: 58px;
  }
  .myorders__content .d-table__row:first-child .d-table__col:last-child{
    margin-top:58px;
  }
  .cell_data-label{
    display:block;
    color:#757575;
  }
  .myorders__content .d-table__col:last-child:before{
    display: none;
  }
  .myorders__content .d-table-html-text{
    text-align: left;
    height: 58px;
    display: flex;
    flex-direction: column;
    gap:8px;
    align-items: start;
    justify-content: end;
    padding-left: 10px;
  }
  .myorders__content .d-table__row-padding .d-table__col:not(:last-child), .myorders__content .d-table__row-padding.d-table__row:first-child .d-table__col{
    padding-bottom: 68px;
  }
  .myorders__content .d-table__row-padding.d-table__row:first-child .d-table__col:last-child {
    bottom: -58px;
    padding-bottom: 68px;
  }
  .d-table__row-padding .d-table__col:not(:first-child)::before {
    top: 31% !important;
  }
  .d-table__row-padding.d-table__row:first-child .d-table__col:not(:first-child)::before {
    top: 31% !important;
  }
  .shipments .order-card__ordercomment-container{
    font-size: 10px;
  }
  .shipments .d-top-order-container-buttons button{
    height: 24px;
    max-height: 24px;
    min-height: 24px;
  }
  .shipments button span{
    font-size: 12px;
  }
  .order-card__repeat .item-list-item-icon {
    font-size: 14px !important;
  }
}
@media (width <= 800px) {
  .shipments .d-top-order-container{
    flex-direction: column;
    align-items: start;
  }
   .shipments .d-top-order-container-buttons button, .shipments .d-badge2{
    height: 20px;
    max-height: 20px;
    min-height: 20px;
  }
  .shipments button span{
    font-size: 10px;
  }
  .d-top-order-container-info{
    margin-top: 28px;
  }
}
@media (width <= 600px) {
  .d-top-order-container-right{
    width:100%;
  }
  .d-top-order-container-buttons{
    flex-direction: column;
  }
  .shipments .d-top-order-container-buttons button, .shipments .d-badge2{
    height: 32px;
    max-height: 32px;
    min-height: 32px;
    width: 100%;
  }
  .shipments button span{
    font-size: 14px;
  }
}
</style>
