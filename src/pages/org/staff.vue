<template>
  <section class="lk-staff lk-staff__all" id="lk-staff">
    <!-- Верхушка страницы -->
    <Toast />
    <div class="d-top">
      <breadcrumbs />
    </div>
    <Loader v-if="loading" />
    <Tabs class="lk-staff-tabs">
      <TabList class="lk-staff-tabs-tabs">
        <div class="d-tab2" :class="{ 'd-tab2--active': tabException == 0 }" :value="0">
          <button class="collection__tabs-link" @click.prevent="tabException = 0">
            Сотрудники
          </button>
        </div>
        <div class="d-tab2" :class="{ 'd-tab2--active': tabException == 1 }" :value="1">
          <button class="collection__tabs-link" @click.prevent="tabException = 1">
            <span class="promotions__card-values-title">Отчет по ТП</span>
          </button>
        </div>
      </TabList>

      <TabPanels>
        <TabPanel v-if="tabException == 0">
          <div class="lk-staff__header">
            <router-link
              :to="{
                name: 'profileStuffCreate',
                params: {
                  id: this.$route.params.id,
                },
              }"
              class="d-button d-button-primary d-button--no-shadow lk-staff__header-button"
            >
              <i class="d-icon-plus-flat lk-staff__header-button-icon"></i>
              Новый сотрудник
            </router-link>
          </div>

          <BoxTable
            :items_data="managers.items"
            :total="managers.total"
            :pagination_items_per_page="this.pagination_items_per_page"
            :pagination_offset="this.pagination_offset"
            :page="this.page"
            :table_data="this.table_data"
            :filters="this.filters"
            @filter="filter"
            @paginate="paginate"
            @editElem="editElem"
            @deleteElem="deleteElem"
          />
        </TabPanel>
        <TabPanel v-else class="lk-staff--panel">
          <BaseTable
            :items_data="init_orders.orders"
            :total="init_orders.total"
            :pagination_items_per_page="this.pagination_items_per_page_orders"
            :pagination_offset="this.pagination_offset"
            :page="this.pageOrders"
            :table_data="this.table_data_orders"
            :filters="this.filters_orders"
            @filter="filterOrder"
            @sort="filterOrder"
            @paginate="paginateOrder"
            @download="downloadOrd"
          />
          <MinTable
            :items_data="init_orders.orders"
            :total="init_orders.total"
            :pagination_items_per_page="this.pagination_items_per_page_orders"
            :pagination_offset="this.pagination_offset"
            :page="this.pageOrders"
            :table_data="this.table_data_orders"
            :filters="this.filters_orders"
            @filter="filterOrder"
            @sort="filterOrder"
            @paginate="paginateOrder"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'
import BoxTable from '@/shared/ui/boxtable/table.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Toast from 'primevue/toast'
import Tabs from 'primevue/tabs'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import TabList from 'primevue/tablist'

export default {
  name: 'ProfileStaff',
  components: {
    Breadcrumbs,
    Loader,
    BoxTable,
    Toast,
    Tabs,
    TabPanels,
    TabPanel,
    TabList,
    BaseTable,
  },
  data() {
    return {
      page: 1,
      pageOrders: 1,
      loading: true,
      tabException: 0,
      table_data: {
        name: {
          label: '',
          type: 'text',
          class: 'lk__card-bold d-col-3',
        },
        phone: {
          label: 'Рабочий телефон',
          type: 'text',
          icon: 'd-icon-telephone lk-staff__card-contact-icon',
          class: 'd-col-4',
          link: 'tel:',
        },
        email: {
          label: 'Рабочий email',
          type: 'text',
          icon: 'd-icon-mail2 lk-staff__card-contact-icon',
          class: 'd-col-5',
          link: 'mailto:',
        },
        operator: {
          label: 'Оператор клиентов',
          type: 'text',
          class: 'd-col-5',
        },
        operator_s: {
          label: 'Оператор поставщиков',
          type: 'text',
          class: 'd-col-5',
        },
        actions: {
          label: 'Действия',
          type: 'actions',
          sort: false,
          class: 'd-col-2 right-align',
          available: {
            edit: {
              icon: 'd-icon-pen2',
              label: 'Редактировать',
            },
            delete: {
              icon: 'd-icon-user-times',
              label: 'Удалить',
            },
          },
        },
      },
      filters: {
        name: {
          name: 'Поиск сотрудника',
          placeholder: 'Поиск сотрудника',
          type: 'text',
        },
      },
      filters_orders: {
        initiator_user: {
          name: 'Сотрудник',
          placeholder: 'Все',
          label: 'Сотрудник',
          type: 'tree',
          value: '',
        },
        name: {
          name: 'Искать в заказах',
          placeholder: 'Искать в заказах',
          type: 'text',
        },
        button: {
          type: 'download',
        },
      },
      table_data_orders: {
        id: {
          label: '№',
          type: 'link_all',
          link_to: 'WholesaleOrderInitiator',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },

          class: 'cell_centeralign',
        },
        date: {
          label: 'Дата создания',
          type: 'link',
          link_to: 'WholesaleOrderInitiator',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
          sort_desc: 'Дата заказа от новых к старым',
          sort_asc: 'Дата заказа от старых к новым',
          class: 'cell_centeralign',
        },
        seller_address: {
          label: 'Поставщик',
          type: 'link',
          link_to: 'WholesaleOrderInitiator',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
          items: ['seller_name', 'seller_inn', 'seller_address'],
        },
        buyer_name: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'WholesaleOrderInitiator',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          class: 'cell_centeralign',
          items: ['buyer_name', 'buyer_inn', 'buyer_address'],
        },

        // buyer_store: {
        //   label: 'Магазин/Склад покупателя',
        //   type: 'link',
        //   link_to: 'wholesaleOrder',
        //   link_params: {
        //     id: this.$route.params.id,
        //     order_id: 'id',
        //   },
        //   class: 'cell_centeralign',
        // },

        initiator: {
          label: 'Инициатор',
          type: 'html',
          link_to: 'WholesaleOrderInitiator',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },

          class: 'cell_centeralign',
        },
        // seller_w_name: {
        //   label: 'Магазин/Склад продавца',
        //   type: 'link',
        //   link_to: 'wholesaleOrder',
        //   link_params: {
        //     id: this.$route.params.id,
        //     order_id: 'id',
        //   },
        //   class: 'cell_centeralign',
        // },
        cost: {
          label: 'Сумма',
          type: 'link',
          link_to: 'WholesaleOrderInitiator',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },

          class: 'cell_centeralign nowrap',
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
      request_filter: {},
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
    pagination_items_per_page_orders: {
      type: Number,
      default: 25,
    },
  },
  mounted() {
    this.getManagers({
      id: this.$route.params.id,
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.getInitOrders({
        page: this.pageOrders,
        perpage: this.pagination_items_per_page_orders,
        filter: null,
        sort: null,
      })
      this.getFilterManagers().then(() => {
        this.filters_orders.initiator_user.values = this.filter_managers
      })
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      managers: 'wholesale/managers',
      init_orders: 'wholesale/init_orders',
      filter_managers: 'addition/managers',
    }),
  },
  methods: {
    ...mapActions({
      getManagers: 'wholesale/getManagers',
      getFilterManagers: 'addition/getManagers',
      deleteManager: 'org/deleteManager',
      getInitOrders: 'wholesale/getInitOrders',
      unsetInitOrders: 'wholesale/unsetInitOrders',
      downloadOrders: 'wholesale/downloadOrders',
    }),
    filter(data) {
      this.loading = true
      this.page = 1
      this.getManagers(data).then(() => {
        this.loading = false
      })
    },
    paginate(data) {
      this.loading = true
      this.page = data.page
      this.getManagers(data).then(() => {
        this.loading = false
      })
    },
    filterOrder(data) {
      console.log(data)
      this.loading = true
      this.unsetInitOrders()
      this.pageOrders = 1
      this.getInitOrders(data).then(() => {
        this.loading = false
        this.request_filter = data
      })
    },
    paginateOrder(data) {
      this.loading = true
      this.unsetInitOrders()
      this.pageOrders = data.page
      this.getInitOrders(data).then(() => {
        this.loading = false
      })
    },
    editElem(item) {
      this.$router.push({
        name: 'profileStuffEdit',
        params: { id: this.$route.params.id, manager_id: item.id },
      })
    },
    deleteElem(item) {
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить сотрудника с ID ' + item.id + '?',
        header: 'Удаление сотрудника',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading = true
          this.deleteManager({ manager_id: item.id }).then((response) => {
            if (response.data.data.success) {
              this.$toast.add({
                severity: 'success',
                summary: 'Удаление прошло успешно',
                life: 3000,
              })
              this.page = 1
              this.getManagers({
                page: this.page,
                perpage: this.pagination_items_per_page,
              }).then(() => {
                this.loading = false
              })
            } else {
              this.loading = false
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
            summary: 'Удаление сотрудника',
            detail: 'Действие отклонено',
            life: 3000,
          })
        },
      })
    },
    downloadOrd() {
      this.downloadOrders({
        filter: this.request_filter,
        mode: 'initiator',
      }).then((response) => {
        if (response.data.data.filename) {
          this.loading = false
          let loc = response.data.data.filename
          var downloadLink = document.createElement('a')
          downloadLink.href = loc
          downloadLink.setAttribute('download', loc)
          downloadLink.setAttribute('target', '_blank')
          //console.log(downloadLink)
          downloadLink.click()
        } else {
          this.loading = false
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Не удалось скачать отчет!',
            life: 3000,
          })
        }
      })
    },
  },
  watch: {
    filter_managers: function (newVal) {
      this.filters_orders.initiator_user.values = newVal
    },
  },
}
</script>

<style lang="scss">
.organization h1 {
  margin-bottom: 40px;
}
.lk__card-bold {
  font-weight: 600;
}
.right-align {
  align-items: end;
}
.lk-staff .p-button-text.p-button-secondary {
  color: #282828;
}
.lk-staff .p-button-text.p-button-secondary:not(:disabled):hover {
  background: transparent;
  border-color: transparent;
  color: #282828;
}
.lk-staff .p-button-text.p-button-secondary i {
  font-size: 20px;
}
.lk-staff__all .lk-staff__header {
  justify-content: end !important;
  width: 100%;
}
.lk-staff__all .p-inputtext {
  width: 100%;
}
.lk-staff__all .form_input_group:after {
  content: '\e003';
  font-family: 'Iconly' !important;
  position: absolute;
  font-size: 16.8px;
  top: calc(50% - 8.4px);
  right: 20px;
}
.lk-staff__all .p-inputtext {
  padding-right: 40px;
  box-shadow: none;
  border: 0.2px solid #75757575;
}
.lk-staff__all .d-table__wrapper {
  margin-top: 40px;
}
.lk-staff__all .v-box-table {
  margin-top: -80px;
}
.lk-staff__all .clients__card-container .cell_value a {
  display: flex;
}
.lk-staff__card-contact-container:nth-child(3) .cell_value {
  overflow: hidden;
}
.lk-staff--panel {
  .dart-row {
    justify-content: end;
    align-items: end !important;
    .p-inputtext,
    .vue3-treeselect__control {
      border-radius: 20px;
    }
    .dart-form-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .vue3-treeselect__placeholder,
    .vue3-treeselect__single-value {
      padding-left: 8px;
      line-height: 37px;
    }
    .vue3-treeselect__placeholder,
    .p-floatlabel label {
      color: #757575;
    }
    .d-col-xl-6.d-col-md-4:last-child {
      width: 56px;
      padding-right: 20px;
    }
  }
}
@media (width <= 1280px) {
  .lk-staff .clients__card {
    flex-direction: row;
    align-items: center;
  }
  .clients__card {
    position: relative;
  }
  .lk-staff .d-col-xl-6.d-col-md-4 {
    min-width: 25%;
    width: 25%;
  }
  .lk-staff__card-contact-container {
    font-size: 14px;
  }
  .lk-staff .p-button-text.p-button-secondary i {
    font-size: 14px;
  }
  .lk-staff .p-button-text.p-button-secondary {
    width: 30px;
  }
}
@media (width <= 1024px) {
  .lk-staff .d-col-xl-6.d-col-md-4 {
    min-width: 30%;
    width: 30%;
  }
  .lk-staff__card-contact-container {
    font-size: 10px;
  }
  .lk-staff .p-button-text.p-button-secondary i {
    font-size: 10px;
  }
  .lk-staff .p-button-text.p-button-secondary {
    width: 20px;
  }
  .lk-staff__card-contact-label {
    font-size: 11px;
  }
  .lk-staff .p-floatlabel label {
    font-size: 11px;
  }
  .organization h1 {
    font-size: 16px;
  }
  .lk-staff__header-button {
    font-size: 14px;
    font-weight: 500;
    padding: 6px 12px;
    height: 32px;
    width: fit-content;
  }
  .lk-staff__card-contact-icon {
    font-size: 12px;
  }
}
@media (width <= 800px) {
  .lk-staff .d-col-xl-6.d-col-md-4 {
    min-width: 30%;
    width: 30%;
  }
  .lk-staff__card-contact-container {
    font-size: 8px;
  }
  .lk-staff .p-button-text.p-button-secondary i {
    font-size: 8px;
  }
  .lk-staff .p-button-text.p-button-secondary {
    width: 10px;
  }
  .lk-staff__card-contact-label {
    font-size: 8px;
  }
  .lk-staff .p-floatlabel label {
    font-size: 8px;
  }
  .organization h1 {
    font-size: 12px;
  }
  .lk-staff__header-button {
    font-size: 10px;
    font-weight: 500;
    padding: 3px 8px;
    height: 24px;
    width: fit-content;
  }
  .lk-staff__card-contact-icon {
    font-size: 9px;
  }
  .lk-staff__card-contact-container.lk-staff__card-contact-container.d-col-3:first-child:first-child {
    width: 10%;
  }
  .lk-staff__card-contact-container.d-col-4 {
    width: 20%;
  }
  .lk-staff__card-contact-container.d-col-5 {
    width: 20%;
  }
  .lk-staff__card-contact-container.d-col-2 {
    width: 10%;
  }
  .lk-staff .p-inputtext {
    padding-block: 2px;
  }
  .lk-staff__all .form_input_group:after {
    top: calc(50% - 5.5px);
    font-size: 11px;
  }
  .lk-staff__all .v-box-table {
    margin-top: -65px;
  }
  .lk-staff__header-button-icon {
    font-size: 10px;
    width: 12px;
    height: 12px;
  }
}
@media (width <= 750px) {
  .lk-staff {
    margin-top: 140px;
  }
  .organization h1 {
    font-size: 16px;
  }
  .lk-staff__card-contact-value {
    display: block;
    width: max-content;
    position: relative;
    max-width: 100%;
  }
  .lk-staff__card-contact-icon {
    float: left;
  }
  .lk-staff__card-contact-container:not(:first-child):before {
    display: none;
  }
  .lk-staff__all .lk-staff__header {
    justify-content: start !important;
    width: 100%;
  }
  .lk-staff__header-button {
    width: 100%;
  }
  .lk-staff__header-button-icon {
    font-size: 16px;
    width: 16px;
    height: 16px;
  }
  .lk-staff__header-button {
    font-size: 16px;
    font-weight: 500;
    padding: 6px 8px;
    height: 32px;
    width: 100%;
  }
  .lk-staff__all .v-box-table {
    margin-top: 0px;
  }
  .lk-staff .d-col-xl-6.d-col-md-4 {
    min-width: 100%;
    width: 100%;
  }
  .lk-staff .p-inputtext {
    padding-block: 8px;
  }
  .lk-staff .p-floatlabel label {
    font-size: 14px;
  }
  .lk-staff__all .form_input_group:after {
    top: calc(50% - 7px);
    font-size: 14px;
  }
  .lk-staff .d-table__wrapper {
    width: calc(100% + 88px);
    margin-left: -44px;
    padding-bottom: 40px;
  }
  .lk-staff .clients__card {
    flex-direction: column;
    gap: 8px;
    align-items: start;
  }
  .lk-staff__card-contact-container {
    width: 100%;
    padding: 0 44px !important;
  }
  .lk-staff__card-contact-container.d-col-5:first-child {
    width: 100%;
  }
  .lk-staff__card-contact-container.d-col-5 {
    width: 100%;
  }
  .lk-staff__card-contact-container.d-col-2 {
    width: 100%;
  }
  .lk-staff__card-contact-container {
    font-size: 14px;
  }
  .lk-staff__card-contact-icon {
    font-size: 14px;
  }
  .lk-staff__card-contact-label {
    font-size: 14px;
  }
  .lk-staff .p-button-text.p-button-secondary i {
    font-size: 14px;
  }
  .lk-staff .p-button-text.p-button-secondary {
    width: 30px;
  }
}
</style>
