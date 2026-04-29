<template>
  <section class="warehouse-analysis" id="warehouse-analysis">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>

    <div class="warehouse-analysis__header">
      <h1 class="warehouse-analysis__header-title">Настройки складов</h1>

      <button
        class="d-button d-button-primary d-button--no-shadow warehouse-analysis__header-button"
        @click.prevent="this.modalAddStore = true"
      >
        <i class="d-icon-plus-flat warehouse-analysis__header-button-icon"></i>
        <span>Добавить склад</span>
      </button>
    </div>

    <Loader v-if="loading" />
    <div class="warehouse-analysis__table warehouse-settings__table">
      <BaseTable
        :items_data="orgStores.items"
        :total="orgStores.total"
        :table_data="this.table_stores"
        :filters="stores_filters"
        @filter="filter"
        @sort="filter"
        @paginate="paginate"
      />
    </div>

    <!-- <teleport to="body">
      <customModal v-model="this.modalAddStore" class="warehouse-analysis__modal">
        <div
          class="d-modal2 d-modal2--active warehouse-analysis__add-modal"
          data-modal2="testModal"
        >
          <button class="d-modal2__close warehouse-analysis__add-close" data-modal2-close>
            <i class="d-icon-times d-modal2__close-icon"></i>
          </button>
          <div class="d-modal2__header warehouse-analysis__add-header">
            <p class="d-modal2__title warehouse-analysis__add-title">Добавить склад</p>
            <p class="d-modal2__description warehouse-analysis__add-text">
              Для создания нового склада, введите нужную информации в поля.
            </p>
          </div>
          <div class="d-modal2__content">
            <div class="warehouse-analysis__add-content">
              <div
                class="d-field-wrapper d-field-wrapper--vertical d-field-wrapper--small warehouse-analysis__add-input-wrapper"
              >
                <label for="date" class="d-dropdown__label warehouse-analysis__add-input-label"
                  >Название склада</label
                >
                <div class="d-input d-input--light warehouse-analysis__add-input">
                  <input
                    type="text"
                    v-model="this.form.name"
                    placeholder="Например «Фин Пром Строй"
                    class="d-input__field warehouse-analysis__add-input-field"
                  />
                </div>
              </div>
              <div
                class="d-field-wrapper d-field-wrapper--vertical d-field-wrapper--small warehouse-analysis__add-input-wrapper"
              >
                <label for="date" class="d-dropdown__label warehouse-analysis__add-input-label"
                  >Адрес склада</label
                >
                <div class="d-input d-input--light warehouse-analysis__add-input">
                  <input
                    type="text"
                    v-model="this.form.adres"
                    placeholder="Москва, ул. Некрасова 56, офис 23"
                    class="d-input__field warehouse-analysis__add-input-field"
                  />
                </div>
              </div>
            </div>

            <div class="d-modal2__actions warehouse-analysis__add-actions">
              <button
                class="d-button d-button-secondary d-button-secondary-small box-shadow-none d-modal2__action-button warehouse-analysis__add-actions-button warehouse-analysis__add-actions-button--cancel"
                @click.prevent="this.modalAddStore = false"
              >
                <span>Отменить</span>
              </button>

              <button
                class="d-button d-button-primary d-button-primary-small box-shadow-none d-modal2__action-button warehouse-analysis__add-actions-button warehouse-analysis__add-actions-button--ok"
              >
                <span>Создать</span>
              </button>
            </div>
          </div>
        </div>
      </customModal>
    </teleport> -->

    <h2 class="warehouse-analysis__subtitle">Товары в пути</h2>

    <!-- <div class="warehouse-analysis__description">
      <p>
        Параметр
        <b class="warehouse-analysis__description-bold">«Дней с Out of stoсk»</b> расчитывается за
        последний календарный месяц.
      </p>
      <p>
        Фильтр <b class="warehouse-analysis__description-bold">«Категория товара»</b> и
        <b class="warehouse-analysis__description-bold">«Производитель»</b> работает только с теми
        остатками, с которыми произошло сопоставление с карточками товаров из нашего справочника.
      </p>
    </div>

    <BaseTable
      :items_data="productsData"
      :total="productsTotal"
      :pagination_items_per_page="this.pagination_items_per_page"
      :pagination_offset="this.pagination_offset"
      :page="this.page"
      :table_data="product_table_data"
      :filters="products_filters"
      @filter="filter"
      @sort="filter"
      @paginate="paginate"
      class="warehouse-analysis__products"
    >
    </BaseTable> -->
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import customModal from '@/shared/ui/Modal.vue'

export default {
  name: 'warehouseSettings',
  components: { Breadcrumbs, Loader, customModal, BaseTable },
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
        perpage: 1,
        filter: '',
        sort: '',
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
</style>
