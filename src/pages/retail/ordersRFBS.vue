<template>
  <section class="shipments retailorders__content rfbs_content" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>

    <h1>Заказы RFBS</h1>
    <Loader v-if="loading" />
    <BaseTable
      v-else
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
  name: 'RetailOrdersRFBS',
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
      table_data: {
        num: {
          label: 'Номер',
          type: 'link',
          link_to: 'retailOrderRFBS',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },

          class: 'cell_centeralign',
        },
        customer: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'retailOrderRFBS',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
        },
        createdon: {
          label: 'Дата',
          type: 'link',
          link_to: 'retailOrderRFBS',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },

          class: 'cell_centeralign',
        },
        status: {
          label: 'Статус',
          type: 'status',
          class: 'cell_centeralign',
        },
        cost: {
          label: 'Сумма',
          type: 'link',
          link_to: 'retailOrderRFBS',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign nowrap',
        },
        delivery: {
          label: 'Доставка',
          type: 'link',
          link_to: 'retailOrderRFBS',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
        },
        store: {
          label: 'Магазин/Склад',
          type: 'image_link',
          link_to: 'retailOrderRFBS',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
        },
        org_id: {
          label: 'Продавец',
          type: 'image_link',
          link_to: 'retailOrderRFBS',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
        },
      },
      filters: {
        // status_id: {
        //   name: 'Статус',
        //   placeholder: 'Статус',
        //   type: 'round_select',
        //   //values: this.orders.statuses,
        // },
        store_id: {
          name: 'Склад',
          placeholder: 'Склад',
          type: 'tree',
          values: this.stores,
        },
        // delivery: {
        //   name: 'Доставка',
        //   placeholder: 'Доставка',
        //   type: 'round_select',
        //   // values: this.orders.deliveries,
        // },
      },
    }
  },
  methods: {
    ...mapActions({
      getOrders: 'retail/getOrders',
      unsetOrders: 'retail/unsetOrders',
      getRetailStores: 'retail/getRetailStores',
    }),
    filter(data) {
      console.log(data)
      this.loading = true
      this.unsetOrders()
      this.page = 1
      data.type = 'RFBS'
      this.getOrders(data).then(() => {
        this.loading = false
      })
    },
    paginate(data) {
      this.loading = true
      this.unsetOrders()
      this.page = data.page
      data.type = 'RFBS'
      this.getOrders(data).then(() => {
        this.loading = false
      })
    },
  },
  mounted() {
    this.getRetailStores().then(() => {
      setTimeout(() => {
        this.loading = false
      }, 5000)
    })
    this.getOrders({
      page: this.page,
      perpage: this.pagination_items_per_page,
      type: 'RFBS',
    }).then(() => {
      setTimeout(() => {
        this.loading = false
      }, 500)
    })
  },
  computed: {
    ...mapGetters({
      orders: 'retail/orders',
      stores: 'retail/stores',
    }),
  },
  watch: {},
}
</script>
<style lang="scss">
.rfbs_content.retailorders__content.retailorders__content .v-table {
  margin-top: 0px;
}
</style>
