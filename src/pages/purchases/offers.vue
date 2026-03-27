<template>
  <section
    class="shipments wholesaleorders__content myorders__content orders_table wholesaleoffers__content"
    id="shipments"
  >
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
      <MinTable
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
import MinTable from '@/shared/ui/tableMin/table.vue'

export default {
  name: 'purchasesOffers',
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
          placeholder: 'Искать в предложениях',
          type: 'text',
        },
        status: {
          name: 'Статус',
          placeholder: 'Фильтр по статусу',
          type: 'tree',
          values: this.offerStatuses,
        },
      },
      table_data: {
        id: {
          label: '№',
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
          sort_desc: 'Дата заказа от новых к старым',
          sort_asc: 'Дата заказа от старых к новым',
          class: 'cell_centeralign',
        },
        seller_name: {
          label: 'Поставщик',
          type: 'link',
          link_to: 'purchasesOffer',
          link_params: {
            id: this.$route.params.id,
            offer_id: 'id',
          },
          class: 'cell_centeralign',
          items: ['seller_name', 'seller_inn', 'seller_address'],
        },
        buyer_org_name: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'purchasesOffer',
          link_params: {
            id: this.$route.params.id,
            offer_id: 'id',
          },
          class: 'cell_centeralign',
          items: ['buyer_name', 'buyer_inn', 'buyer_address'],
        },
        initiator: {
          label: 'Инициатор',
          type: 'html',
          link_to: 'purchasesOffer',
          link_params: {
            id: this.$route.params.id,
            offer_id: 'id',
          },
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

          class: 'cell_centeralign nowrap',
        },
        status_name: {
          label: 'Статус',
          type: 'status',
          sort: true,
          sort_asc: 'Статус от новых к выполненным',
          sort_desc: 'Статус от выполненным к новым',
          class: 'cell_centeralign  cell_order-status',
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
      getOffers: 'purchases/getOffers',
      unsetOffers: 'purchases/unsetOffers',
      getOffersStatuses: 'purchases/getOffersStatuses',
    }),
    filter(data) {
      console.log(data)
      this.loading = true
      this.unsetOffers()
      this.page = 1
      if (data.filtersdata.status) {
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

<style lang="scss"></style>
