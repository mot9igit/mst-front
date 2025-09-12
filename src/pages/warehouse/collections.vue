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
    <Loader v-if="loading" />
    <div class="collection__block-container">
      <BaseTable
        :items_data="this.collects"
        :total="this.total"
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
      loading: true,
      page: 1,
      collects: {},
      total: 0,
      filters: {
        name: {
          name: 'Искать в коллекциях',
          placeholder: 'Искать в коллекциях',
          type: 'text',
        },
      },
      table_data: {
        id: {
          label: 'Номер',
          type: 'link',
          link_to: 'WarehouseCollection',
          link_params: {
            id: this.$route.params.id,
            collection_id: 'id',
          },
          class: 'cell_centeralign',
        },
        name: {
          label: 'Наименование',
          type: 'link',
          link_to: 'WarehouseCollection',
          link_params: {
            id: this.$route.params.id,
            collection_id: 'id',
          },
          sort: true,
          class: 'cell_centeralign',
        },
        store_name: {
          label: 'Склад',
          type: 'link',
          link_to: 'WarehouseCollection',
          link_params: {
            id: this.$route.params.id,
            collection_id: 'id',
          },
          class: 'cell_centeralign',
        },
        description: {
          label: 'Описание',
          type: 'link',
          link_to: 'WarehouseCollection',
          link_params: {
            id: this.$route.params.id,
            collection_id: 'id',
          },
          class: 'cell_centeralign',
        },
        actions: {
          label: 'Действия',
          type: 'actions',
          sort: false,
          class: 'cell_centeralign',
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
      getCollections: 'warehouse/getCollections',
      unsetCollections: 'warehouse/unsetCollections',
    }),
    filter(data) {
      console.log(data)
      this.loading = true
      this.unsetCollections()
      this.page = 1
      this.getCollections(data).then(() => {
        this.loading = false
      })
    },
    paginate(data) {
      this.loading = true
      this.unsetCollections()
      this.page = data.page
      this.getCollections(data).then(() => {
        this.loading = false
      })
    },
  },
  computed: {
    ...mapGetters({
      collections: 'warehouse/collections',
    }),
  },
  mounted() {
    this.getCollections({
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
        this.loading = false
      })
  },
  watch: {
    collections: function(newVal){
      this.collects = newVal.items
      this.total = newVal.total
    }
  },

}
</script>
<style lang="scss"></style>
