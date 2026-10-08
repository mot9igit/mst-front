<template>
  <section class="shipments logistics__content" id="logistics">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <h1 class="logistics__header">Логистика</h1>
    <div class="logistics__search">
      <div class="logistics__search-input">
        <InputText v-model="search" @update:modelValue="onSearch" placeholder="Поиск" />
        <i class="pi pi-search"></i>
      </div>
    </div>
    <Loader v-if="loading" />
    <BaseTable
      :items_data="orders.items"
      :total="orders.total"
      :pagination_items_per_page="this.pagination_items_per_page"
      :pagination_offset="this.pagination_offset"
      :page="this.page"
      :table_data="this.table_data"
      :show_filter="false"
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
import InputText from 'primevue/inputtext'

export default {
  name: 'LogisticsDelivery',
  components: { Breadcrumbs, BaseTable, Loader, InputText },
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
      search: '',
      searchTimer: null,
      request_filter: {},
      table_data: {
        order_num: {
          label: '№',
          type: 'link_all',
          link_to: 'logisticsOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'order_num',
          },
          class: 'cell_centeralign',
        },
        shipping_date: {
          label: 'Дата получения/отправки',
          type: 'link',
          link_to: 'logisticsOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'order_num',
          },
          sort: true,
          sort_desc: 'Дата от новых к старым',
          sort_asc: 'Дата от старых к новым',
          class: 'cell_centeralign',
        },
        seller_address: {
          label: 'Поставщик',
          type: 'link',
          link_to: 'logisticsOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'order_num',
          },
          class: 'cell_centeralign',
          items: ['seller_name', 'seller_inn', 'seller_address', 'owner_label'],
        },
        buyer_name: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'logisticsOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'order_num',
          },
          class: 'cell_centeralign',
          items: ['buyer_name', 'buyer_inn', 'buyer_address', 'buyer_owner'],
        },
        type: {
          label: 'Заказ/Отгрузка',
          type: 'text',
          class: 'cell_centeralign',
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
  computed: {
    ...mapGetters({
      orders: 'logistic/orders',
    }),
  },
  methods: {
    ...mapActions({
      getOrders: 'logistic/getOrders',
      unsetOrders: 'logistic/unsetOrders',
    }),
    filter(data) {
      this.loading = true
      this.unsetOrders()
      this.page = 1
      const requestData = this.normalizeFilters({
        ...data,
        filter: this.search,
      })
      this.getOrders(requestData).then(() => {
        this.loading = false
        this.request_filter = requestData
      })
    },
    paginate(data) {
      this.loading = true
      this.unsetOrders()
      this.page = data.page
      this.getOrders(
        this.normalizeFilters({
          ...data,
          filter: this.search,
        }),
      ).then(() => {
        this.loading = false
      })
    },
    onSearch() {
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => {
        this.filter({
          filter: this.search,
          filtersdata: {},
          sort: {},
          page: 1,
          perpage: this.pagination_items_per_page,
        })
      }, 300)
    },
    normalizeFilters(data) {
      if (!data || !data.filtersdata || !data.filtersdata.dates) {
        return data
      }
      return {
        ...data,
        filtersdata: {
          ...data.filtersdata,
          dates: data.filtersdata.dates.map((d) =>
            d ? new Date(d.getTime() - d.getTimezoneOffset() * 60000) : d,
          ),
        },
      }
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
}
</script>

<style lang="scss">
.logistics__content {
  padding-block: 40px;
}

.logistics__header {
  margin: 0 0 12px;
}

.logistics__search {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}

.logistics__search-input {
  position: relative;
  width: 260px;

  .p-inputtext {
    width: 100%;
    height: 40px;
    border-radius: 999px;
    padding: 0 18px;
    padding-right: 44px;
    border: 1px solid #d5d5d5;
  }

  .pi-search {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #757575;
    font-size: 14px;
    pointer-events: none;
  }
}
</style>
