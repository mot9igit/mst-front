<template>
  <div>
    <div class="d-top">
      <a class="d-back d-top-back">
        <i class="d-icon-arrow d-back__icon d-top-back-icon"></i>
        <span class="d-back__text">Назад</span>
      </a>
      <Breadcrumbs />
    </div>
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
  </div>
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
        },
        buyer: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
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
        },
        ur_persone_name: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
        },
        seller_w_name: {
          label: 'Магазин/Склад',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
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
<style lang="scss"></style>
