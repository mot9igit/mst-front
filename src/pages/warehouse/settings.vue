<template>
  <section class="warehouse-analysis" id="warehouse-analysis">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <Toast></Toast>

    <div class="warehouse-analysis__header">
      <h1 class="warehouse-analysis__header-title">Настройки складов</h1>

      <button
        class="d-button d-button-primary d-button--no-shadow warehouse-analysis__header-button"
        @click.prevent="this.modalAddStore = true"
      >
        <i class="d-icon-plus-flat warehouse-analysis__header-button-icon"></i>
        <span>Создать склад</span>
      </button>
    </div>

    <Loader v-if="loading" />
    <div class="warehouse-analysis__table warehouse-settings__table">
      <BaseTable
        :items_data="orgStores.items"
        :total="orgStores.total"
        :table_data="this.table_stores"
        :filters="stores_filters"
        :pagination_items_per_page="this.pagination_items_per_page"
        :page="this.page"
        @filter="filter"
        @sort="filter"
        @paginate="paginate"
      />
    </div>

    <teleport to="body">
      <customModal v-model="this.modalAddStore" class="warehouse-settings__modal">
        <form class="d-modal2 d-modal2--active warehouse-settings__modal-content" action="#">
          <div class="d-modal2__content">
            <div class="warehouse-analysis__add-content">
              <div
                class="d-field-wrapper d-field-wrapper--vertical d-field-wrapper--small warehouse-analysis__add-input-wrapper"
              >
                <div class="dart-input-group">
                  <AddAddress
                    key="newWarehouseAddress"
                    index="newWarehouseAddress"
                    :value="this.form"
                    v-model="this.form"
                    class="std-create-clients__add-address"
                    @close="this.modalAddStore = false"
                    @refresh="refreshList()"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </customModal>
    </teleport>

    <h2 class="warehouse-analysis__subtitle">Товары в пути</h2>
    <div class="warehouse-analysis__table warehouse-settings__table">
      <BaseTable
        :items_data="shipments.items"
        :total="shipments.total"
        :table_data="this.table_shipments"
        :filters="shipments_filters"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        @filter="filterShip"
        @sort="filterShip"
        @paginate="paginateShip"
      >
      </BaseTable>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import customModal from '@/shared/ui/Modal.vue'
import AddAddress from './ui/AddAddress.vue'
import Toast from 'primevue/toast'

export default {
  name: 'warehouseSettings',
  components: { Breadcrumbs, Loader, BaseTable, customModal, AddAddress, Toast },
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 10,
    },
    pagination_offset: {
      type: Number,
      default: 0,
    },
    pagination_items_per_page_ship: {
      type: Number,
      default: 25,
    },
    pagination_offset_ship: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: true,
      modalAddStore: false,
      productsData: [],
      productsTotal: 0,
      color: '#757575',
      table_stores: {
        name: {
          label: 'Название / Адрес',
          type: 'link_settings_store',
          link_to: 'warehouseStoreSettings',
          link_params: {
            id: this.$route.params.id,
            store_id: 'id',
          },
          class: 'cell_settings-stores-name',
          items: ['id', 'name_short', 'address'],
        },
        store_type: {
          label: 'Тип / Видимость',
          type: 'link',
          link_to: 'warehouseStoreSettings',
          link_params: {
            id: this.$route.params.id,
            store_id: 'id',
          },
          class: 'cell_centeralign cell_review-stores-active',
          items: ['store_type', 'visible'],
        },
        integration_check: {
          label: 'Интеграция',
          type: 'link_status',
          link_to: 'warehouseStoreSettings',
          link_params: {
            id: this.$route.params.id,
            store_id: 'id',
          },
          class: 'cell_centeralign cell_review-stores-active',
          check_class: 'integration_class',
        },
        //actions: {
        //  label: '',
        //  type: 'actions',
        //  sort: false,
        //  available: {
        //    delete: {
        //      icon: 'pi pi-trash',
        //      label: 'Удалить',
        //    },
        //  },
        //  class: 'cell_rightalign cell_review-stores-trash',
        //},
      },
      stores_filters: {
        type: {
          name: 'Тип склада',
          placeholder: 'Тип склада',
          type: 'tree',
          values: {},
        },
        integration: {
          name: 'Интеграция',
          placeholder: 'Интеграция',
          type: 'tree',
          values: {},
        },
        name: {
          name: 'Поиск',
          placeholder: 'Поиск',
          type: 'text',
          value: '',
        },
      },
      page: 1,
      pageShip: 1,
      table_shipments: {
        name: {
          label: 'Название / Адрес',
          type: 'link_settings_store',
          link_to: 'warehouseShipmentSettings',
          link_params: {
            id: this.$route.params.id,
            ship_id: 'id',
          },
          class: 'cell_settings-stores-name',
          items: ['id', 'name', 'address'],
        },
        visible: {
          label: 'Видимость',
          type: 'link',
          link_to: 'warehouseShipmentSettings',
          link_params: {
            id: this.$route.params.id,
            ship_id: 'id',
          },
          class: 'cell_centeralign',
        },
        date: {
          label: 'Дата поступления',
          type: 'link',
          link_to: 'warehouseShipmentSettings',
          link_params: {
            id: this.$route.params.id,
            ship_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
      },
      shipments_filters: {
        name: {
          name: 'Поиск',
          placeholder: 'Поиск',
          type: 'text',
        },
      },
      form: {
        name: '',
        address: '',
      },
      error: '',
    }
  },
  mounted() {
    this.getOrgStores({
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.stores_filters.type.values = this.orgStores.types
      this.stores_filters.integration.values = this.orgStores.integrations
      this.getOrgShipments({
        page: 1,
      })
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      orgStores: 'org/orgStores',
      shipments: 'org/shipments',
    }),
  },
  methods: {
    ...mapActions({
      getOrgStores: 'org/getOrgStores',
      unsetOrgStores: 'org/unsetOrgStores',
      getOrgShipments: 'org/getOrgShipments',
      unsetOrgShipments: 'org/unsetOrgShipments',
    }),
    filter(data) {
      this.loading = true
      this.unsetOrgStores()
      this.page = 1
      console.log(data)
      this.stores_filters.name.value = data.filter
      this.stores_filters.type.value = data.filtersdata?.type
      this.stores_filters.integration.value = data.filtersdata?.integration
      this.getOrgStores({
        page: this.page,
        perpage: this.pagination_items_per_page,
        filters: this.stores_filters,
      }).then(() => {
        this.loading = false
      })
    },
    paginate(data) {
      this.loading = true
      this.unsetOrgStores()
      this.page = data.page

      this.getOrgStores({
        page: this.page,
        perpage: this.pagination_items_per_page,
        filters: this.stores_filters,
      }).then(() => {
        this.loading = false
      })
    },
    filterShip(data) {
      this.loading = true
      this.unsetOrgShipments()
      this.page = 1
      console.log(data)
      this.getOrgShipments({
        page: this.pageShip,
        perpage: this.pagination_items_per_page_ship,
        filter: data.filter,
        sort: data.sort,
      }).then(() => {
        this.loading = false
      })
    },
    paginateShip(data) {
      this.loading = true
      this.unsetOrgShipments()
      this.page = data.page
      this.getOrgStores({
        page: this.pageShip,
        perpage: this.pagination_items_per_page_ship,
        filter: data.filter,
        sort: data.sort,
      }).then(() => {
        this.loading = false
      })
    },
    refreshList() {
      this.loading = true
      this.modalAddStore = false
      this.getOrgStores({
        page: this.page,
        perpage: this.pagination_items_per_page,
      }).then(() => {
        this.stores_filters.type.values = this.orgStores.types
        this.stores_filters.integration.values = this.orgStores.integrations
        this.getOrgShipments({
          page: 1,
        })
        this.loading = false
      })
    },
  },
  watch: {
    orgStores: function (newVal) {
      this.stores_filters.type.values = newVal.types
      this.stores_filters.integration.values = newVal.integrations
    },
  },
}
</script>
<style lang="scss">
.warehouse-settings__table .dart-row {
  justify-content: end;
}
.warehouse-settings__table .p-inputtext {
  width: 100%;
}
.warehouse-settings__table .d-col-xl-6:last-child {
  min-width: 429px;
}
.warehouse-settings__table .form_input_group:after {
  content: '\e01d';
  font-family: 'Iconly' !important;
  position: absolute;
  font-size: 16.8px;
  top: calc(50% - 8.4px);
  right: 20px;
}
.warehouse-settings__modal {
  width: 100%;
  height: auto;
  padding: 0;

  .d-modal2__content {
    padding: 0;
    gap: 32px;
  }
  .d-modal2__header {
    padding: 0;
    line-height: 31px;
    margin-bottom: 40.5px;
  }

  .dart-input-group {
    width: 100%;

    .std-auth__map {
      margin: 0px;
      min-width: 398px;
      ymaps3 {
        border-radius: 13px;
      }
    }
  }
}
</style>
