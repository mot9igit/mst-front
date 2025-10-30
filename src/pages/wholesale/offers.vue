<template>
  <section class="shipments wholesaleorders__content wholesaleoffers__content" id="shipments">
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
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'wholesaleOffers',
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
      },
      table_data: {
        id: {
          label: 'Номер',
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
          class: 'cell_centeralign',
        },
        date_end: {
          label: 'Дата окончания предложения',
          type: 'link',
          link_to: 'wholesaleOffer',
          link_params: {
            id: this.$route.params.id,
            offer_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
        store_name: {
          label: 'Склад поставщика',
          type: 'link',
          link_to: 'wholesaleOffer',
          link_params: {
            id: this.$route.params.id,
            offer_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
        from_org_name: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'wholesaleOffer',
          link_params: {
            id: this.$route.params.id,
            offer_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign nowrap',
        },
        initiator: {
          label: 'Инициатор',
          type: 'link',
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
          sort: true,
          class: 'cell_centeralign nowrap',
        },
        status_name: {
          label: 'Статус',
          type: 'status',
          sort: true,
          class: 'cell_centeralign',
        },
        actions: {
          label: 'Действия',
          type: 'actions',
          sort: false,
          available: {
            view: {
              icon: 'pi pi-eye',
              label: 'Просмотреть',
            },
            delete: {
              icon: 'pi pi-trash',
              label: 'Удалить',
            },
          },
        },
      },
    }
  },
  methods: {
    ...mapActions({
      getOffers: 'wholesale/getOffers',
      unsetOffers: 'wholesale/unsetOffers',
      deleteOffer: 'wholesale/deleteOffer',
    }),
    filter(data) {
      console.log(data)
      this.loading = true
      this.unsetOffers()
      this.page = 1
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
    viewOffer(data){
      this.$router.push({
        name: 'wholesaleOffer',
        params: {
          id: this.$route.params.id,
          offer_id: data.id
        }})
    },
    delOffer(data){
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
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      offers: 'wholesale/offers',
    }),
  },
  watch: {},
}
</script>
<style lang="scss">

</style>
