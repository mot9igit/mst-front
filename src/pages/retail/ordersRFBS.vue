<template>
  <section class="shipments retailorders__content rfbs_content" id="shipments">
    <div class="orders__content">
      <div class="d-top">
        <Breadcrumbs />
      </div>
      <h1>Заказы RFBS</h1>
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
    </div>
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
      filters: {
        status_id: {
          name: 'Статус',
          placeholder: 'Статус',
          type: 'round_tree',
          values: this.statuses,
        },
        store_id: {
          name: 'Склад',
          placeholder: 'Склад',
          type: 'round_tree',
          values: [
            {
              id: '53',
              name: '№53 МСТ',
              data: '№53 МСТ',
              label: '№53 МСТ',
              key: '53',
              image: 'https://dev.mst.tools/assets/content/about-1.jpg',
            },

            {
              id: '49',
              name: '№49 Alteco',
              data: '№49 Alteco',
              label: '№49 Alteco',
              key: '49',
              image: 'https://dev.mst.tools/assets/content/about-1.jpg',
            },
            {
              id: '84',
              name: '№84 КЛС-Трейд',
              data: '№84 КЛС-Трейд',
              label: '№84 КЛС-Трейд',
              key: '84',
              image: 'https://dev.mst.tools/assets/content/about-1.jpg',
            },
            {
              id: '87',
              name: '№87 Майтол Рус',
              data: '№87 Майтол Рус',
              label: '№87 Майтол Рус',
              key: '87',
              image: 'https://dev.mst.tools/assets/content/about-1.jpg',
            },
            {
              id: '512',
              name: '№512 МСТ || Челябинск',
              data: '№512 МСТ || Челябинск',
              label: '№512 МСТ || Челябинск',
              key: '512',
              image: 'https://dev.mst.tools/assets/content/about-1.jpg',
            },
          ],
        },
        delivery: {
          name: 'Доставка',
          placeholder: 'Доставка',
          type: 'round_tree',
          values: [
            {
              id: '1',
              name: null,
              data: 'Самовывоз',
              label: 'Самовывоз',
              key: '1',
              image: null,
            },
            {
              id: '2',
              name: null,
              data: 'Курьером до квартиры',
              label: 'Курьером до квартиры',
              key: '2',
              image: '',
            },
            {
              id: '3',
              name: null,
              data: 'Доставка в пункт выдачи',
              label: 'Доставка в пункт выдачи',
              key: '3',
              image: '',
            },
            {
              id: '4',
              name: null,
              data: 'Экспресс доставка',
              label: 'Экспресс доставка',
              key: '4',
              image: '',
            },
          ],
        },
      },
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
          type: 'link',
          link_to: 'retailOrderRFBS',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
        },
        rfbs_name: {
          label: 'Источник',
          type: 'img_link',
          link_to: 'retailOrderRFBS',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
          image: 'rfbs_img',
        },
        store_name: {
          label: 'Продавец',
          type: 'img_link',
          link_to: 'retailOrderRFBS',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
          image: 'store_img',
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      stores: 'retail/stores',
      orders: 'retail/orders',
      deliveries: 'retail/deliveries',
      statuses: 'retail/statuses',
    }),
  },
  mounted() {
    this.getRetailStores()
    this.getRetailDeliveries()
    this.getRetailStatuses()
    this.getOrders({
      page: this.page,
      perpage: this.pagination_items_per_page,
      type: 'RFBS',
    }).then(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions({
      getOrders: 'retail/getOrders',
      unsetOrders: 'retail/unsetOrders',
      getRetailStores: 'retail/getRetailStores',
      getRetailDeliveries: 'retail/getRetailDeliveries',
      getRetailStatuses: 'retail/getRetailStatuses',
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

  watch: {},
}
</script>
<style lang="scss">
.rfbs_content.retailorders__content.retailorders__content .v-table {
  margin-top: 0px;
}
.orders__content .dart-form-group {
  display: flex;
  justify-content: end;
}
.orders__content .d-col-xl-6 {
  width: auto !important;
}
</style>
