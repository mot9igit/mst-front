<template>
  <section class="collection" id="collection">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <div class="collection__header">
      <div class="dart-row">
        <div class="d-col-md-12">
          <h1 class="dart-mb-2 collection__header-title">Мои коллекции</h1>
        </div>
        <div class="d-col-md-12 d-flex d-flex-end">
          <router-link
            :to="{ name: 'WarehouseCollectionNew', params: { id: this.$route.params.id } }"
            class="d-button d-button-primary d-button--sm-shadow d-button-wholesaleprices"
          >
            <i class="d-icon-plus-flat clients__card-offer-icon"></i>
            Создать Коллекцию
          </router-link>
        </div>
      </div>
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
        @editElem="editElem"
        @deleteElem="deleteElem"
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
      deleteCollection: 'warehouse/deleteCollection',
      unsetCollections: 'warehouse/unsetCollections',
    }),
    filter(data) {
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
    editElem(item) {
      this.$router.push({
        name: 'WarehouseCollection',
        params: { id: this.$route.params.id, collection_id: item.id },
      })
    },
    deleteElem(item) {
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить Коллекцию с ID ' + item.id + '?',
        header: 'Удаление коллекции',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading = true
          this.deleteCollection({ group_id: item.id }).then((response) => {
            if (response.data.data.status) {
              this.$toast.add({
                severity: 'success',
                summary: 'Удаление прошло успешно',
                life: 3000,
              })
              this.page = 1
              this.getCollections({
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
            summary: 'Удаление коллекции',
            detail: 'Действие отклонено',
            life: 3000,
          })
        },
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
    collections: function (newVal) {
      this.collects = newVal.items
      this.total = newVal.total
    },
  },
}
</script>
<style lang="scss"></style>
