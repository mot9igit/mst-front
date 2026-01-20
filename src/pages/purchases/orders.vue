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

<style lang="scss"></style>
