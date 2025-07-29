<template>
  <div>
    <h2>Заказы</h2>
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import BaseTable from '@/shared/ui/table/table.vue'

export default {
  name: 'RetailOrders',
  components: { BaseTable },
  data() {
    return {
      page: 1,
      filters: {
        name: {
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text',
        },
      },
      table_data: {
        num: {
          label: 'Номер',
          type: 'link',
          link_to: 'retailOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
        },
        customer: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'retailOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
        },
        createdon: {
          label: 'Дата',
          type: 'link',
          link_to: 'retailOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
        },
        status: {
          label: 'Статус',
          type: 'status',
        },
        cost: {
          label: 'Сумма',
          type: 'link',
          link_to: 'retailOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
        },
        delivery: {
          label: 'Доставка',
          type: 'link',
          link_to: 'retailOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
        },
        payment: {
          label: 'Оплата',
          type: 'link',
          link_to: 'retailOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
        },
        store: {
          label: 'Магазин/Склад',
          type: 'link',
          link_to: 'retailOrder',
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
      getOrders: 'retail/getOrders',
    }),
    filter(data) {
      this.getOrders(data)
    },
    paginate(data) {
      console.log(data)
      this.getOrders(data)
    },
  },
  mounted() {
    this.getOrders({
      page: this.page,
      perpage: this.pagination_items_per_page,
    })
  },
  computed: {
    ...mapGetters({
      orders: 'retail/orders',
    }),
  },
  watch: {},
}
</script>
<style lang="scss"></style>
