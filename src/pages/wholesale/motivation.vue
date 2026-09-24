<template>
  <section class="shipments wholesaleprices" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <div class="dart-row wholesale-motivation__header">
      <div class="d-col-md-24 wholesale-motivation__header-inner">
        <h1 class="dart-mb-0 wholesale-motivation__title">Программы мотивации</h1>
        <div class="wholesale-motivation__tools">
          <div class="wholesale-motivation__search">
            <input
              type="text"
              v-model="filterName"
              placeholder="Поиск по наименованию"
              @input="page = 1"
            />
            <button type="button" class="wholesale-motivation__search-icon" aria-label="Поиск">
              <i class="d-icon-search-big"></i>
            </button>
          </div>
          <button
            type="button"
            class="d-button d-button-primary d-button--sm-shadow wholesale-motivation__create"
            title="Создать программу"
            @click.prevent="createProgram()"
          >
            <i class="d-icon-plus-flat"></i>
            <span>Создать программу</span>
          </button>
        </div>
      </div>
    </div>
    <Loader v-if="loading" />
    <BaseTable
      :items_data="programs"
      :total="programs.length"
      :pagination_items_per_page="this.pagination_items_per_page"
      :pagination_offset="this.pagination_offset"
      :page="this.page"
      :table_data="table_data"
      :filters="this.filters"
      :show_filter="false"
      @filter="filter"
      @sort="filter"
      @paginate="paginate"
      @editElem="editElem"
      @viewElem="viewElem"
      @approveElem="approveElem"
    />
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'WholesaleMotivation',
  components: { Loader, Breadcrumbs, BaseTable },
  data() {
    return {
      loading: false,
      page: 1,
      filterName: '',
      sortField: '',
      sortDir: 1,
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
        banner: {
          label: 'Баннер',
          type: 'image',
          baseurl: false,
          class: 'cell_centeralign',
        },
        label: {
          label: 'Наименование',
          type: 'link',
          link_to: 'wholesaleMotivationProgram',
          link_params: {
            id: this.$route.params.id,
            program_id: 'id',
          },
          new_tab: true,
          sort: true,
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
          type: 'boolean_active',
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
            view: {
              icon: 'pi pi-chart-bar',
              label: 'Просмотр',
            },
            approve: {
              icon: 'pi pi-power-off',
              label: 'Включить',
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
  created() {
    this.loading = true
    this.getMotivations({ id: this.$route.params.id }).then(() => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      motivations: 'wholesale/motivations',
    }),
    programs() {
      let items = this.motivations.slice()
      if (this.filterName) {
        items = items.filter((item) =>
          item.label.toLowerCase().includes(this.filterName.toLowerCase()),
        )
      }
      if (this.sortField && this.sortDir) {
        items = [...items].sort((a, b) => {
          const left = a[this.sortField]
          const right = b[this.sortField]
          if (left == null) return 1
          if (right == null) return -1
          if (typeof left === 'number' && typeof right === 'number') {
            return (left - right) * this.sortDir
          }
          return String(left).localeCompare(String(right)) * this.sortDir
        })
      }
      return items
    },
  },
  methods: {
    ...mapActions({
      getMotivations: 'wholesale/getMotivations',
    }),
    paginate(data) {
      this.page = data.page
    },
    createProgram() {
      const url = this.$router.resolve({
        name: 'wholesaleMotivationCreate',
        params: { id: this.$route.params.id },
      }).href
      window.open(url, '_blank')
    },
    filter(data) {
      this.loading = true
      this.page = 1
      this.filterName = data.filter || ''
      const sort = data.sort || {}
      const sortKeys = Object.keys(sort)
      if (sortKeys.length) {
        const key = +sortKeys[0]
        const field = Object.keys(this.table_data)[key]
        this.sortField = field
        this.sortDir = sort[key].dir === 'ASC' ? 1 : -1
      }
      this.$nextTick(() => {
        this.loading = false
      })
    },
    editElem(item) {
      const url = this.$router.resolve({
        name: 'wholesaleMotivationProgram',
        params: { id: this.$route.params.id, program_id: item.id },
      }).href
      window.open(url, '_blank')
    },
    viewElem(item) {
      const url = this.$router.resolve({
        name: 'wholesaleMotivationStatistics',
        params: { id: this.$route.params.id, program_id: item.id },
      }).href
      window.open(url, '_blank')
    },
    approveElem(item) {
      const turnOn = item.active == 0
      const header = turnOn ? 'Подтверждение включения' : 'Подтверждение отключения'
      const message =
        'Вы уверены, что хотите ' + (turnOn ? 'включить' : 'отключить') + ' Программу мотивации с ID ' + item.id + '?'
      this.$confirm.require({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const program = this.motivations.find((p) => p.id === item.id)
          if (program) {
            program.active = turnOn ? 1 : 0
            this.$toast.add({
              severity: 'success',
              summary: 'Действие произведено успешно',
              life: 3000,
            })
          }
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
  },
}
</script>
<style lang="scss" scoped>
.wholesale-motivation__header {
  width: 100%;

  &-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    padding-bottom: 32px;
  }
}

.wholesale-motivation__title {
  margin: 0;
}

.wholesale-motivation__tools {
  display: flex;
  align-items: center;
  gap: 16px;
}

.wholesale-motivation__create {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wholesale-motivation__search {
  display: flex;
  align-items: center;
  width: 300px;
  max-width: 100%;
  height: 40px;
  padding: 0 4px 0 16px;
  background-color: #ffffff;
  border: 1px solid #d1d1d1;
  border-radius: 30px;

  input {
    flex: 1 1 0;
    min-width: 0;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: #282828;
    font: inherit;
    font-size: 14px;

    &::placeholder {
      color: #757575;
    }
  }

  &-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border: none;
    background: transparent;
    color: #757575;
    font-size: 15px;
    cursor: pointer;
  }
}

@media (width <= 768px) {
  .wholesale-motivation__header-inner {
    flex-wrap: wrap;
  }

  .wholesale-motivation__tools {
    flex-wrap: wrap;
    width: 100%;
  }

  .wholesale-motivation__search {
    width: 100%;
  }
}
</style>