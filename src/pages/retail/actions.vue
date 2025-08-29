<template>
  <section class="shipments retail__sales" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <div class="dart-row">
      <div class="d-col-md-12">
        <h1 class="dart-mb-2">Розничные акции</h1>
      </div>
      <div class="d-col-md-12 d-flex d-flex-end">
        <router-link
          :to="{ name: 'retailSaleNew', params: { id: this.$route.params.id } }"
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
      :table_data="this.table_data"
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
import Loader from '@/shared/ui/Loader.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import { toRaw } from 'vue'

export default {
  name: 'RetailActions',
  components: { Breadcrumbs, Loader, BaseTable },
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
      filterText: '',
      filterValues: {},
      countPages: 0,
      retailSales: [],
      filters: {
        name: {
          name: 'Введите название акции',
          placeholder: 'Введите название акции',
          type: 'text',
        },
      },
      table_data: {
        id: {
          label: 'Номер',
          type: 'text',
          class: 'cell_value-center',
        },
        image: {
          label: 'Баннер',
          type: 'image',
          baseurl: false,
          class: 'cell_value-center',
        },
        name: {
          label: 'Название',
          type: 'link',
          // TODO
          link_to: 'retailSale',
          link_params: {
            id: this.$route.params.id,
            action: 'id',
          },
          sort: true,
          class: 'cell_value-center',
        },
        date_from: {
          label: 'Действует с',
          type: 'text',
          sort: true,
          class: 'cell_value-center',
        },
        date_to: {
          label: 'Действует до',
          type: 'text',
          sort: true,
          class: 'cell_value-center',
        },
        //status: {
        //  label: "Статус",
        //	type: "status",
        //},
        active: {
          label: 'Активно',
          type: 'boolean',
          class: 'cell_value-center',
        },
        store_name: {
          label: 'Склад',
          type: 'text',
          class: 'cell_value-center',
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
  methods: {
    ...mapActions({
      getSales: 'retail/getSales',
      unsetSales: 'retail/unsetSales',
      toggleAction: 'action/toggleAction',
      delAction: 'action/delAction',
    }),
    setFilter(type = '0') {
      if (type === 'filter') {
        if (this.filterText.length >= 3 || this.filterText.length === 0) {
          setTimeout(() => {
            this.filter({
              filter: this.filterText,
              filtersdata: toRaw(this.filterValues),
              page: 1,
              perpage: this.pagination_items_per_page,
            })
          })
        }
      } else {
        this.filter({
          filter: this.filterText,
          filtersdata: toRaw(this.filterValues),
          page: 1,
          perpage: this.pagination_items_per_page,
        })
      }
    },
    filter(data) {
      this.loading = true
      this.unsetSales()
      this.page = 1
      this.getSales(data).then(() => {
        this.loading = false
      })
    },
    paginate(data) {
      this.loading = true
      this.unsetDilers()
      this.page = data.page
      this.getDilers(data).then(() => {
        this.loading = false
      })
    },
    editElem(item) {
      this.$router.push({
        name: 'retailSale',
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
  mounted() {
    this.getSales({
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      sales: 'retail/sales',
    }),
  },
  watch: {
    sales: function (newVal) {
      this.countPages = Math.ceil(this.sales.total / this.pagination_items_per_page)
      if (this.countPages === 0) {
        this.countPages = 1
      }
      this.retailSales = newVal.items
    },
  },
}
</script>
<style lang="scss">
.retail__sales-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0 40px;
}
.retail__sales-top .form_input_group:after {
  content: '\e003';
  font-family: 'Iconly' !important;
  position: absolute;
  font-size: 16.8px;
  top: calc(50% - 8.4px);
  right: 20px;
}
.retail__sales-top .p-inputtext {
  width: 100%;
}
.retail__sales-top .p-inputtext {
  padding-right: 40px;
  box-shadow: none;
  border: 0.2px solid #75757575;
}
.retail__sales-top .p-inputtext:enabled:focus {
  border-color: #f92c0d;
}
.retail__sales-top .p-floatlabel:has(input:focus) label,
.retail__sales-top .p-floatlabel:has(input:-webkit-autofill) label,
.retail__sales-top .p-floatlabel:has(textarea:focus) label,
.retail__sales-top .p-floatlabel:has(.p-inputwrapper-focus) label {
  color: #f92c0d;
}
.retail__sales-top .d-table__col,
.retail__sales-top .d-table__row:first-child > .d-table__col {
  padding: 16px;
}
.retail__sales-button {
  font-size: 16px;
}
.retail__sales .img_abs img {
  max-width: 170px;
  max-height: 46px;
  object-fit: contain;
  margin: 0 auto;
}
.retail__sales .cell_value-center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 100%;
}
.cell_status_green {
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 15px;
  white-space: nowrap;
  background-color: #cdf0a9;
  margin: 0 auto;
  text-align: center;
  display: block;
}
.cell_active {
  height: 18px;
  width: 18px;
  //rotate: 135deg;
}
.cell_active:before {
  content: '\e04c';
  font-family: 'Iconly';
  position: relative;
  display: block;
  margin-top: 1px;
  margin-bottom: 0px;
  margin-left: -4px;
  margin-right: 0px;
  font-size: 9px;
}
.d-table__head {
  .d-table__row:first-child .d-table__head-col:nth-child(n + 9)::before,
  .d-table__row:first-child .d-table__col:nth-child(n + 9)::before {
    display: none;
  }
}
</style>
