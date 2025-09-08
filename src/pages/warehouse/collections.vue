<template>
  <section class="collection" id="collection">
    <ConfirmDialog />
    <Toast />
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>

    <div class="collection__header">
      <h1 class="collection__header-title">Мои коллекции</h1>
    </div>

    <div class="collection__block-container">
      <Loader v-if="loading" />
      <BaseTable
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
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'

export default {
  name: 'WarehouseProducts',
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
      page: 1,
      filter: {
        name: '',
      },
      table_data: {
        id: {
          label: 'Номер',
          type: 'text',
        },
        name: {
          label: 'Наименование',
          type: 'link',
          link_to: 'warehouseCollectionEdit',
          link_params: {
            id: this.$route.params.id,
            group_id: 'id',
          },
          sort: true,
        },
        store_name: {
          label: 'Склад',
          type: 'text',
        },
        description: {
          label: 'Описание',
          type: 'text',
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
      getCollection: 'warehouse/getCollection',
      setCollection: 'warehouse/setCollection',
    }),
  },
  computed: {
    ...mapGetters({
      collections: 'warehouse/collections',
    }),
  },
}
</script>
<style lang="scss"></style>
