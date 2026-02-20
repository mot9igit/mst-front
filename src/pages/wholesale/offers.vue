<template>
  <section
    class="shipments wholesaleorders__content myorders__content orders_table wholesaleoffers__content"
    id="shipments"
  >
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <h1 class="dart_mb-2">Мои предложения</h1>
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
      @viewElem="viewOffer"
      @deleteElem="delOffer"
    />
    <!-- <MinTable
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
    /> -->
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'
import MinTable from '@/shared/ui/tableMin/table.vue'

export default {
  name: 'wholesaleOffers',
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
          link_to: 'wholesaleOffer',
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
          link_to: 'wholesaleOffer',
          link_params: {
            id: this.$route.params.id,
            offer_id: 'id',
          },
          sort: true,
          sort_desc: 'Дата заказа от новых к старым',
          sort_asc: 'Дата заказа от старых к новым',
          class: 'cell_centeralign',
        },
        // date_end: {
        //   label: 'Дата окончания предложения',
        //   type: 'link',
        //   link_to: 'wholesaleOffer',
        //   link_params: {
        //     id: this.$route.params.id,
        //     offer_id: 'id',
        //   },
        //   sort: true,
        //   class: 'cell_centeralign',
        // },
        seller_name: {
          label: 'Поставщик',
          type: 'link',
          link_to: 'wholesaleOffer',
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
          link_to: 'wholesaleOffer',
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
          link_to: 'wholesaleOffer',
          link_params: {
            id: this.$route.params.id,
            offer_id: 'id',
          },
          class: 'cell_centeralign',
        },
        cost: {
          label: 'Сумма',
          type: 'link',
          link_to: 'wholesaleOffer',
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
          class: 'cell_centeralign',
        },
        comment: {
          label: 'Комментарий',
          type: 'prepare-html',

          class: 'cell_centeralign order-table_comment',
        },
        // actions: {
        //   label: 'Действия',
        //   type: 'actions',
        //   sort: false,
        //   available: {
        //     view: {
        //       icon: 'pi pi-eye',
        //       label: 'Просмотреть',
        //     },
        //     delete: {
        //       icon: 'pi pi-trash',
        //       label: 'Удалить',
        //     },
        //   },
        // },
      },
    }
  },
  methods: {
    ...mapActions({
      getOffers: 'wholesale/getOffers',
      unsetOffers: 'wholesale/unsetOffers',
      deleteOffer: 'wholesale/deleteOffer',
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
    viewOffer(data) {
      this.$router.push({
        name: 'wholesaleOffer',
        params: {
          id: this.$route.params.id,
          offer_id: data.id,
        },
      })
    },
    delOffer(data) {
      console.log(data)
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить предложение №' + data.id + '?',
        header: 'Удаление акции',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteOffer({ offer_id: data.id }).then((response) => {
            if (response.data.success) {
              this.$toast.add({
                severity: 'success',
                summary: 'Удаление прошло успешно',
                life: 3000,
              })
              this.loading = true
              this.getOffers({
                page: this.page,
                perpage: this.pagination_items_per_page,
              }).then(() => {
                this.loading = false
              })
            } else {
              this.$toast.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: 'Не удалось удалить предложение!',
                life: 3000,
              })
            }
          })
        },
        reject: () => {
          this.$toast.add({
            severity: 'error',
            summary: 'Удаление предложения',
            detail: 'Действие отклонено',
            life: 3000,
          })
        },
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
      offers: 'wholesale/offers',
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
.wholesaleoffers__content .vue3-treeselect__placeholder, .vue3-treeselect__single-value {
    font-size: 16px;
    line-height: 32px;
  }
@media (width <= 1580px){
  .wholesaleoffers__content .vue3-treeselect__placeholder, .vue3-treeselect__single-value {
    font-size: 16px;
    line-height: 32px;
  }
}
@media (width <= 1280px){
  .wholesaleoffers__content .vue3-treeselect__control{
    max-height: 30px;
    height: 30px;
  }
  .wholesaleoffers__content .vue3-treeselect__placeholder, .vue3-treeselect__single-value {
    font-size: 12px;
    line-height: 28px;
  }
}
@media (width <= 1024px){
  .wholesaleoffers__content .dart-form-group .vue3-treeselect .vue3-treeselect__control,.wholesaleoffers__content .vue3-treeselect__control{
    max-height: 24px;
    height: 24px;
  }
  .wholesaleoffers__content .dart-form-group .vue3-treeselect__multi-value-item {
    font-size: 8px;
  }
  .wholesaleoffers__content .vue3-treeselect__placeholder, .vue3-treeselect__single-value {
    font-size: 9px;
    line-height: 22px;
  }
}
</style>
