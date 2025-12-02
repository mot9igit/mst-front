<template>
  <section class="shipments" id="shipments">
    <div class="myorders__content orders_table">
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
       <MinTable
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
import MinTable from '@/shared/ui/tableMin/table.vue'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'purchasesOrders',
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
          link_to: 'purchasesOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
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
          sort_desc: 'Дата заказа от новых к старым',
          sort_asc: 'Дата заказа от старых к новым',
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
          class: 'cell_centeralign',
          items: ['seller_name', 'seller_inn', 'seller_address'],
        },
        buyer_name: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'purchasesOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
          items: ['buyer_name', 'buyer_inn', 'buyer_address'],
        },
        initiator: {
          label: 'Инициатор',
          type: 'html',
          link_to: 'purchasesOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
          items: ['initiator'],
        },
        cost: {
          label: 'Сумма',
          type: 'link',
          link_to: 'purchasesOrder',
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
  content: '\e01d';
  font-family: 'Iconly' !important;
  position: absolute;
  font-size: 16.8px;
  top: calc(50% - 8.4px);
  right: 20px;
  color: #757575;
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
//--фиксированная ширина для колонок
.orders_table .d-table__col:first-child{
  width: 5%;
  min-width: 5%;
  max-width: 5%;
}
.orders_table .d-table__col:nth-child(2){
  width: 7%;
  min-width: 7%;
  max-width: 7%;
}
.orders_table .d-table__col:nth-child(3),.orders_table .d-table__col:nth-child(4){
  width: 18%;
  min-width: 18%;
  max-width: 18%;
}
.orders_table .d-table__col:nth-child(4){
  width: 16%;
  min-width: 16%;
  max-width: 16%;
}
.orders_table .d-table__col:nth-child(5){
  width: 12%;
  min-width: 12%;
  max-width: 12%;
}
.orders_table .d-table__col:nth-child(6){
  width: 10%;
  min-width: 10%;
  max-width: 10%;
}
.orders_table .d-table__col:last-child{
  width: 22%;
  min-width: 22%;
  max-width: 22%;
}
//
.d-top-order-container-buttons button{
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  margin: 0 0 0 0;
  box-shadow: none;
}
.cell_order-status div{
  white-space: pre-wrap;
  width: fit-content;
  margin: 0 auto;
}
.cell_order-status .cell--status{
  font-size: 14px;
  line-height:16px;
  padding: 4px 12px;
}
.orders_table .v-table-min{
  display: none;
}
@media (width <= 3000px) {
  .shipments  .d-top-order-container {
    align-items: end;
    min-height: 0;
    height: auto;
    padding-bottom: 22.5px;
  }
  .d-top-order-container-info h3{
    margin: 24px 0;
  }
  .order-card__orderinfo-grid-text-down-min {
    font-size: 14px;
    font-weight: 300;
  }
  .d-top-order-container-info h3{
    margin-top: 24px;
    margin-bottom: 24px;
  }
  .shipments .dart-mb-1 {
    margin-bottom: 0;
  }
}
@media (width <= 1536px) {
  .shipments h1{
    font-size: 20px;
  }
  .shipments .d-table__col {
    font-size: 12px;
  }
  .cell_order-status .cell--status{
    font-size: 12px;
    line-height:14px;
    padding: 2px 12px;
  }
  //--фиксированная ширина для колонок
    .orders_table .d-table__col:first-child{
      width: 4%;
      min-width: 4%;
      max-width: 4%;
    }
    .orders_table .d-table__col:nth-child(2){
      width: 6%;
      min-width: 6%;
      max-width: 6%;
    }
    .orders_table .d-table__col:nth-child(3),.orders_table .d-table__col:nth-child(4){
      width: 15%;
      min-width: 15%;
      max-width: 15%;
    }
    .orders_table .d-table__col:nth-child(4){
      width: 18%;
      min-width: 18%;
      max-width: 18%;
    }
    .orders_table .d-table__col:nth-child(5){
      width: 13%;
      min-width: 13%;
      max-width: 13%;
    }
    .orders_table .d-table__col:nth-child(6){
      width: 13%;
      min-width: 13%;
      max-width: 13%;
    }
    .orders_table .d-table__col:last-child{
      width: 16%;
      min-width: 16%;
      max-width: 16%;
    }
//
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
  .cell_order-status .cell--status{
    font-size: 10px;
    line-height:11px;
    padding: 4px 8px;
  }
  //--фиксированная ширина для колонок
    .orders_table .d-table__col:first-child{
      width: 3%;
      min-width: 3%;
      max-width: 3%;
    }
    .orders_table .d-table__col:nth-child(2){
      width: 5%;
      min-width: 5%;
      max-width: 5%;
    }
    .orders_table .d-table__col:nth-child(3),.orders_table .d-table__col:nth-child(4){
      width: 14%;
      min-width: 14%;
      max-width: 14%;
    }
    .orders_table .d-table__col:nth-child(4){
      width: 14%;
      min-width: 14%;
      max-width: 14%;
    }
    .orders_table .d-table__col:nth-child(5){
      width: 8%;
      min-width: 8%;
      max-width: 8%;
    }
    .orders_table .d-table__col:nth-child(6){
      width: 9%;
      min-width: 9%;
      max-width: 9%;
    }
    .orders_table .d-table__col:last-child{
      width: 33%;
      min-width: 33%;
      max-width: 33%;
    }
  //  
  .d-table__footer-right-pagination {
    display: flex;
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
  .cell_order-status .cell--status{
    font-size: 8px;
    line-height:9px;
    padding: 2px 6.5px;
  }
  //--фиксированная ширина для колонок
    .orders_table .d-table__col:first-child{
      width: 2%;
      min-width: 2%;
      max-width: 2%;
    }
    .orders_table .d-table__col:nth-child(2){
      width: 4%;
      min-width: 4%;
      max-width: 4%;
    }
    .orders_table .d-table__col:nth-child(3),.orders_table .d-table__col:nth-child(4){
      width: 15%;
      min-width: 15%;
      max-width: 15%;
    }
    .orders_table .d-table__col:nth-child(4){
      width: 15%;
      min-width: 15%;
      max-width: 15%;
    }
    .orders_table .d-table__col:nth-child(5){
      width: 8%;
      min-width: 8%;
      max-width: 8%;
    }
    .orders_table .d-table__col:nth-child(6){
      width: 8%;
      min-width: 8%;
      max-width: 8%;
    }
    .orders_table .d-table__col:last-child{
      width: 33%;
      min-width: 33%;
      max-width: 33%;
    }
//
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
  @media (width <= 850px) {
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
  //--фиксированная ширина для колонок
    .orders_table .d-table__col:first-child{
      width: auto;
      min-width: auto;
      max-width: auto;
    }
    .orders_table .d-table__col:nth-child(2){
      width: auto;
      min-width: auto;
      max-width: auto;
    }
    .orders_table .d-table__col:nth-child(3),.orders_table .d-table__col:nth-child(4){
      width: auto;
      min-width: auto;
      max-width: auto;
    }
    .orders_table .d-table__col:nth-child(4){
      width: auto;
      min-width: auto;
      max-width: auto;
    }
    .orders_table .d-table__col:nth-child(5){
      width: auto;
      min-width: auto;
      max-width: auto;
    }
    .orders_table .d-table__col:nth-child(6){
      width: auto;
      min-width: auto;
      max-width: auto;
    }
    .orders_table .d-table__col:last-child{
      width: 80%;
      min-width: 80%;
      max-width: 80%;
    }
    .orders_table .d-table__head-col:nth-child(7){
        padding-right: 0 !important;
    }
    .orders_table .d-table__head-col:last-child{
        padding-left: 0 !important;
        padding-right: 24px !important;
    }
//
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
}
@media (width <= 700px) {
  .orders_table .v-table-min{
    display: block;
  }
  .orders_table .v-table{
    display: none;
  }
  /* .v-table-min .cell_value .multyitem_cell:first-child{
    float: left;
    width: max-content;
    margin-right: 4px;
  } */
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
  .shipments h1 {
    font-size: 14px;
  }
  .v-table-min .dart-row{
    margin-bottom: 16px !important;
  }
  .v-table-min .d-col-xl-6.d-col-md-4{
    padding: 0;
  }
  .shipments .v-table-min .p-inputtext {
    padding-block: 11.6px;
    font-size: 12px;
  }
  .shipments .v-table-min .p-floatlabel label {
    font-size: 12px;
    color:#757575;
  }
  .shipments .v-table-min .form_input_group:after {
    top: calc(50% - 6.4px);
    right: 16px;
    font-size: 12px;
  }
  .d-table-min{
    width: calc(100% + 16px);
    margin-left: 0px;
  }
  .d-table-min .d-table-min__row{
    padding: 24px 16px;
  }
  .orders_table .d-table__wrapper {
    width: calc(100% + 32px);
    margin-left: -16px;
    overflow: visible;
  }
  .d-table-min__header{
    padding-bottom: 8px;
  }
  .d-table-min__col-id {
    font-size: 16px;
    line-height: 21px;
  }
  .d-table-min__row .d-table-min__col-simple{
    padding-bottom: 8px;
  }
  .d-table-min__row .d-table-min__col-simple:nth-child(2) {
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 8px;
    border-top: 1px solid #75757575;
    padding-top: 12px;
  }
  .d-table-min__row .d-table-min__col-simple {
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 8px;
    border-top: 1px solid #75757575;
    padding-top: 12px;
  }
  .cell_value-label {
    width: 100%;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }
  .d-table-min__row .item_cell, .d-table-min__row .multyitem_cell {
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    width: 100%;
    text-align: left;
  }
  .d-table-min__col-simple-html .item_cell, .d-table-min__col-comment .item_cell{
    font-weight: 400 !important;
  }
  .d-table-min__col-status span {
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    padding: 3px 7.5px;
    border-radius: 20px;
  }
  
  .d-table-min__head{
    width: calc(100% - 34px);
    margin: 0 0 0 16px;
    height: 40px;
  }
  .d-table-min__row-sort{
    width: 100%;
  }
  .d-table-min__row-sort-label{
    width: 100%;
    justify-content: space-between;
    padding: 16px 16px 16px 12px;
    box-shadow: none;
    border: 0.2px solid rgba(117, 117, 117, 0.4588235294);
    border-radius: 6px;
    height: 40px;
  }
  .d-table-min__row-sort-label {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #757575;
    background: #ffffff;
  }
  .d-table-min__row-sort-list {
    gap: 16px;
    padding: 12px 16px;
    position: absolute;
    width: 100%;
    max-width: calc(100% - 16px);
    height: auto;
    right: 0px;
    top: 40px;
    background: #FFF;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    z-index: 10;
  }
  .d-table-min__row-sort-list-item label {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #757575;
  }
  .d-table-min__head-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
