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
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text',
        },
      },
      table_data: {
				id: {
					label: "№",
					type: "link",
					link_to: "purchasesOrder",
					link_params: {
						id: this.$route.params.id,
						order_id: "id",
					},
					sort: true,
				},
				date: {
					label: "Дата создания",
					type: "link",
          link_to: "purchasesOrder",
					link_params: {
						id: this.$route.params.id,
						order_id: "id",
					},
					sort: true,
				},
				cost: {
					label: "Сумма",
					type: "link",
          link_to: "purchasesOrder",
					link_params: {
						id: this.$route.params.id,
						order_id: "id",
					},
					sort: true,
				},
				payer: {
					label: "Оплата доставки",
					type: "link",
          link_to: "purchasesOrder",
					link_params: {
						id: this.$route.params.id,
						order_id: "id",
					},
					sort: true,
				},
				seller_name: {
					label: "Поставщик",
					type: "link",
          link_to: "purchasesOrder",
					link_params: {
						id: this.$route.params.id,
						order_id: "id",
					},
					sort: true,
				},
				seller_address: {
					label: "Склад Поставщика",
					type: "link",
          link_to: "purchasesOrder",
					link_params: {
						id: this.$route.params.id,
						order_id: "id",
					},
					sort: true,
				},
				ur_persone_name: {
					label: "Покупатель",
					type: "link",
          link_to: "purchasesOrder",
					link_params: {
						id: this.$route.params.id,
						order_id: "id",
					},
					sort: true,
				},
				initiator: {
					label: "Инициатор",
					type: "link",
          link_to: "purchasesOrder",
					link_params: {
						id: this.$route.params.id,
						order_id: "id",
					},
					sort: true,
				},
				delay: {
					label: "Отсрочка",
					type: "link",
          link_to: "purchasesOrder",
					link_params: {
						id: this.$route.params.id,
						order_id: "id",
					},
					sort: true,
				}
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
