<template>
  <section class="shipments" id="shipments">
    <div class="myorders__content">
      <div class="d-top">
        <Breadcrumbs />
      </div>
      <h1>Предложения</h1>
      <Loader v-if="loading" />
      <BaseTable
        :items_data="offers.items"
        :total="offers.total"
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
  name: 'purchasesOffers',
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
          placeholder: 'Искать в предложениях',
          type: 'text',
        },
        status: {
          name: 'Статус',
          placeholder: 'Фильтр по статусу',
          type: 'dropdown',
          values: this.offerStatuses,
        },
      },
      table_data: {
        id: {
          label: 'Номер',
          type: 'link',
          link_to: 'purchasesOffer',
          link_params: {
            id: this.$route.params.id,
            offer_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
        date: {
          label: 'Дата создания',
          type: 'link',
          link_to: 'purchasesOffer',
          link_params: {
            id: this.$route.params.id,
            offer_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
        // date_end: {
        //   label: 'Дата окончания предложения',
        //   type: 'link',
        //   link_to: 'purchasesOffer',
        //   link_params: {
        //     id: this.$route.params.id,
        //     offer_id: 'id',
        //   },
        //   sort: true,
        //   class: 'cell_centeralign',
        // },
        initiator: {
          label: 'Инициатор',
          type: 'link',
          link_to: 'purchasesOffer',
          link_params: {
            id: this.$route.params.id,
            offer_id: 'id',
          },
          class: 'cell_centeralign',
        },
        from_org_name: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'purchasesOffer',
          link_params: {
            id: this.$route.params.id,
            offer_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign nowrap',
        },
        store_name: {
          label: 'Склад покупателя',
          type: 'link',
          link_to: 'purchasesOffer',
          link_params: {
            id: this.$route.params.id,
            offer_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
        cost: {
          label: 'Сумма',
          type: 'link',
          link_to: 'purchasesOffer',
          link_params: {
            id: this.$route.params.id,
            offer_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign nowrap',
        },
        status_name: {
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
      getOffers: 'purchases/getOffers',
      unsetOffers: 'purchases/unsetOffers',
      getOffersStatuses: 'purchases/getOffersStatuses',
    }),
    filter(data) {
      console.log(data)
      this.loading = true
      this.unsetOffers()
      this.page = 1
      if(data.filtersdata.status){
        data.filterstatus = data.filtersdata.status
      }
      this.getOffers(data).then(() => {
        this.loading = false
      })
    },
    paginate(data) {
      this.loading = true
      this.unsetOffers()
      this.page = data.page
      this.getOffers(data).then(() => {
        this.loading = false
      })
    },
  },
  mounted() {
    this.getOffers({
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.getOffersStatuses()
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      offers: 'purchases/offers',
      offerStatuses: 'purchases/offerStatuses',
    }),
  },
  watch: {
    offerStatuses: function (newVal) {
      this.filters.status.values = newVal
    },
  },
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
.myorders__content .dart-form-group, .wholesaleoffers__content .dart-form-group{
  margin-bottom: 0;
}
.myorders__content .p-select, .wholesaleoffers__content .p-select{
  min-width:100%;
}
</style>
