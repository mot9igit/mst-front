<template>
  <section class="shipments wholesaleprices" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <div class="dart-row">
      <div class="d-col-md-12">
        <h1 class="dart-mb-2">Оптовые цены</h1>
      </div>
      <div class="d-col-md-12 d-flex d-flex-end">
        <router-link
          :to="{ name: 'wholesaleSaleNew', params: { id: this.$route.params.id } }"
          class="d-button d-button-primary d-button--sm-shadow d-button-wholesaleprices"
        >
          <i class="d-icon-plus-flat clients__card-offer-icon"></i>
          Создать Акцию
        </router-link>
      </div>
    </div>

    <Loader v-if="loading" />
    <BaseTable
      v-else
      :items_data="sales.items"
      :total="sales.total"
      :pagination_items_per_page="this.pagination_items_per_page"
      :pagination_offset="this.pagination_offset"
      :page="this.page"
      :table_data="this.getTableData"
      :filters="this.filters"
      @filter="filter"
      @sort="filter"
      @paginate="paginate"
      @editElem="editElem"
      @approveElem="approveElem"
      @deleteElem="deleteElem"
    />
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'WholesalePrices',
  components: { Loader, Breadcrumbs, BaseTable },
  data() {
    return {
      loading: false,
      windowWidth: 1920,
      page: 1,
      filters: {
        name: {
          name: 'Наименование',
          placeholder: 'Наименование',
          type: 'text',
        },
      },
      table_data: {
        id: {
          label: 'Номер',
          type: 'text',
          class: 'cell_centeralign',
        },
        image: {
          label: 'Баннер',
          type: 'image',
          baseurl: false,
          class: 'cell_centeralign',
        },
        name: {
          label: 'Наименование',
          type: 'link',
          // TODO
          link_to: 'wholesaleSale',
          link_params: {
            id: this.$route.params.id,
            action: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
        store_name: {
          label: 'Склад',
          type: 'text',
          class: 'cell_centeralign',
        },
        date_from: {
          label: 'Действует с',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
        date_to: {
          label: 'Действует до',
          type: 'text',
          sort: true,
          class: 'cell_centeralign',
        },
        active: {
          label: 'Активно',
          type: 'boolean',
          class: 'cell_centeralign',
        },
        actions: {
          label: 'Действия',
          type: 'actions',
          sort: false,
          available: {
            edit: {
              icon: 'pi pi-pencil',
              label: 'Редактировать',
            },
            approve: {
              icon: 'pi pi-power-off',
              label: 'Включить',
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
  mounted() {
    this.getSales({
      page: this.page,
      perpage: this.pagination_items_per_page,
      type: 1,
    })
  },
  computed: {
    ...mapGetters({
      sales: 'sales/sales',
    }),
    getTableData() {
      if (this.windowWidth <= 480) {
        return {
          name: this.table_data.name,
          store_name: this.table_data.store_name,
          active: this.table_data.active,
          actions: this.table_data.actions,
        }
      }

      return this.table_data
    },
  },
  methods: {
    ...mapActions({
      getSales: 'sales/getSales',
      toggleAction: 'action/toggleAction',
      delAction: 'action/delAction',
    }),
    paginate(data) {
      this.page = data.page
      data.type = 1
      this.getSales(data)
    },
    filter(data) {
      data.type = 1
      this.page = 1
      this.getSales(data)
    },
    editElem(item) {
      this.$router.push({
        name: 'wholesaleSale',
        params: { id: this.$route.params.id, action: item.id },
      })
    },
    approveElem(item) {
      let header = ''
      let message = ''
      if (item.active == '1') {
        header = 'Подтверждение отключения'
        message = 'Вы уверены, что хотите отключить Акцию с ID ' + item.id + '?'
      } else {
        header = 'Подтверждение включения'
        message = 'Вы уверены, что хотите включить Акцию с ID ' + item.id + '?'
      }
      this.$confirm.require({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.toggleAction({ action_id: item.id }).then((response) => {
            if (response.data.data.status) {
              this.$toast.add({
                severity: 'success',
                summary: 'Действие произведено успешно',
                life: 3000,
              })
              this.getSales({
                page: this.page,
                perpage: this.pagination_items_per_page,
                type: 1,
              })
            } else {
              this.$toast.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: response.data.data.message,
                life: 3000,
              })
            }
          })
        },
        reject: () => {
          this.$toast.add({
            severity: 'error',
            summary: header,
            detail: 'Действие отклонено',
            life: 3000,
          })
        },
      })
    },
    deleteElem(item) {
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить Акцию с ID ' + item.id + '?',
        header: 'Удаление акции',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.delAction({ action_id: item.id }).then((response) => {
            console.log(response)
            if (response.data.data.status) {
              this.$toast.add({
                severity: 'success',
                summary: 'Удаление прошло успешно',
                life: 3000,
              })
              this.getSales({
                page: this.page,
                perpage: this.pagination_items_per_page,
                type: 1,
              })
            } else {
              this.$toast.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: response.data.data.message,
                life: 3000,
              })
            }
          })
        },
        reject: () => {
          this.$toast.add({
            severity: 'error',
            summary: 'Удаление акции',
            detail: 'Действие отклонено',
            life: 3000,
          })
        },
      })
    },
  },
}
</script>
<style lang="scss">
.d-flex {
  display: flex;
}
.d-flex-end {
  justify-content: end;
}
.d-inline-block {
  display: inline-block;
  width: auto;
}
.promotions__card-collection-tabs-wrapper {
  overflow: hidden;
}
.d-button-wholesaleprices {
  width: auto;
}
</style>
