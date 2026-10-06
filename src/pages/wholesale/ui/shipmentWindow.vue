<template>
  <div class="shipment-window">
    <!-- Заголовок -->
    <div class="shippings__modal-header">
      <h2 class="shippings__modal-header-title">
        <span v-if="mode === 0">Отгрузка №{{ ship?.id || '' }}</span>
        <span v-else-if="mode === 1">Редактирование отгрузки №{{ ship?.id || '' }}</span>
        <span v-else>Создание отгрузки</span>
      </h2>
      <div class="shippings__modal-header-actions" v-if="mode === 0">
        <i class="d-icon-pen2" @click="handleEdit" style="cursor: pointer"></i>
        <div class="d-divider d-divider--big d-divider--vertical"></div>
        <i class="d-icon-trash" @click="handleDelete" style="cursor: pointer"></i>
      </div>
    </div>

    <!-- Блок 1: Информация об отгрузке -->
    <!-- Просмотр -->
    <div v-if="mode === 0" class="shipment-window__block shipment-window__block--view">
      <div class="shipment-window__columns">
        <div class="shipment-window__column">
          <div class="shipment-window__field">
            <label class="shipment-window__label">Дата отправления машины</label>
            <div class="shipment-window__value">{{ ship?.date || '-' }}</div>
          </div>
          <div class="shipment-window__field">
            <label class="shipment-window__label">Статус</label>
            <div class="shipment-window__status-wrapper">
              <div
                v-if="ship?.status_name || ship?.status"
                class="cell--status"
                :style="statusStyle"
                :class="statusClass"
              >
                {{ ship?.status_name || ship?.status }}
              </div>
              <div v-else class="shipment-window__value">-</div>
            </div>
          </div>
        </div>
        <div class="shipment-window__column">
          <div class="shipment-window__field">
            <label class="shipment-window__label">Склад отгрузки</label>
            <div
              class="shipment-window__value"
              :class="{ 'shipment-window__value--empty': !storesValue }"
            >
              {{ storesValue || '-' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Блок 2: Склады отгрузки и заказы -->
    <div
      v-if="mode === 0"
      ref="storesBlock"
      class="shipment-window__block shipment-window__block--stores"
    >
      <div class="shipment-window__stores-title">Маршрут</div>

      <div v-if="!parents.length" class="shipment-window__value">Нет данных</div>

      <DataTable
        v-else
        ref="parentTable"
        :value="parents"
        data-key="id"
        :show-headers="false"
        class="shipment-window__table shipment-window__table--parent"
        @row-reorder="onParentReorder"
      >
        <Column>
          <template #body="{ data }">
            <div class="shipment-window__drag" data-pc-section="reorderablerowhandle">
              <div class="shipment-window__store-badge">Отправитель</div>
              <div class="shipment-window__store-name">{{ data.name_short || data.name }}</div>
              <div class="shipment-window__store-address">Дата отгрузки: {{ ship?.date }}</div>
              <div class="shipment-window__store-address">
                {{ data.address_short || data.address || '-' }}
              </div>
            </div>

            <DataTable
              :value="data.stores"
              data-key="id"
              :show-headers="false"
              class="shipment-window__table shipment-window__table--child"
              @row-reorder="onChildReorder($event, data)"
            >
              <template #empty>
                <span class="shipment-window__store-address">Склады-получатели не указаны</span>
              </template>
              <Column>
                <template #body="{ data: store }">
                  <div class="shipment-window__drag" data-pc-section="reorderablerowhandle">
                    <div
                      class="shipment-window__store-badge shipment-window__store-badge--recipient"
                    >
                      Получатель
                    </div>
                    <div class="shipment-window__store-name">
                      {{ store.name_short || store.name }}
                    </div>
                    <div class="shipment-window__store-address">
                      Дата отгрузки: {{ ship?.date }}
                    </div>
                    <div class="shipment-window__store-address">
                      {{}} {{ store.address_short || store.address || '-' }}
                    </div>
                  </div>

                  <template v-if="store.orders?.length">
                    <div class="shipment-window__orders-title">Заказы</div>
                    <div class="shipment-window__orders">
                      <div
                        v-for="order in store.orders"
                        :key="order.id"
                        class="shipment-window__order"
                      >
                        <span class="shipment-window__order-id">№{{ order.id }}</span>
                        <span class="shipment-window__order-status">{{ order.status ?? '—' }}</span>
                      </div>
                    </div>
                  </template>
                  <span v-else class="shipment-window__store-address">Заказов нет</span>
                </template>
              </Column>
            </DataTable>
          </template>
        </Column>
      </DataTable>

      <div ref="line" class="shipment-window__line"></div>
    </div>

    <!-- Редактирование/Создание -->
    <div v-if="mode !== 0" class="shipment-window__block shipment-window__block--edit">
      <div class="shipment-window__form">
        <div class="shipment-window__field">
          <label class="shipment-window__label">Дата и время отгрузки</label>
          <div
            class="dart-form-group catalog-dates-filter-group"
            :class="{ 'd-input--error': v$.form.dateTime.$error }"
          >
            <DatePicker
              v-model="form.dateTime"
              dateFormat="dd.mm.yy"
              :placeholder="'Выберите дату и время'"
              :manualInput="false"
              showIcon
              showClear
              iconDisplay="input"
              class="catalog-filters-dates shipment-window__datepicker"
              :showTime="true"
              hourFormat="24"
            />
          </div>
          <div v-if="v$.form.dateTime.$error" class="d-input-error">
            <i class="d-icon-warning d-input-error__icon"></i>
            <span v-if="v$.form.dateTime.required" class="d-input-error__text"
              >Пожалуйста, выберите дату и время</span
            >
          </div>
        </div>
        <div class="shipment-window__field">
          <label class="shipment-window__label">Город</label>
          <div
            class="dart-form-group dart-form-tree-group"
            :class="{ 'd-input--error': v$.form.location.$error }"
          >
            <TreeSelect
              v-model="form.location"
              :multiple="false"
              :disable-branch-nodes="true"
              :options="locationTree"
              valueFormat="id"
              append-to-body
              :z-index="99999"
              :placeholder="'Введите область, регион и город'"
              @select="onLocationSelect"
              @deselect="onLocationDeselect"
              class="shipment-window__treeselect"
            />
          </div>
          <div v-if="v$.form.location.$error" class="d-input-error">
            <i class="d-icon-warning d-input-error__icon"></i>
            <span v-if="v$.form.location.required" class="d-input-error__text"
              >Пожалуйста, выберите регион</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Кнопки -->
    <div class="collection__modal-buttons">
      <button
        v-if="mode !== 0"
        type="button"
        class="d-button d-button-primary d-button--sm-shadow collection__modal-cansel"
        @click="handleCancel"
      >
        Отмена
      </button>
      <button
        type="button"
        class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
        @click="handleSubmit"
      >
        Ок
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import DatePicker from 'primevue/datepicker'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import TreeSelect from '@/shared/ui/TreeSelectFilter.vue'
import '@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css'

export default {
  name: 'ShipmentWindow',
  components: {
    DatePicker,
    DataTable,
    Column,
    TreeSelect,
  },
  emits: ['editMode', 'deleteShip', 'cancel', 'submit'],
  props: {
    ship: {
      type: Object,
      default: () => ({}),
    },
    mode: {
      type: Number,
      default: 0, // 0 - просмотр, 1 - редактирование, 2 - создание
    },
  },
  data() {
    return {
      form: {
        dateTime: null,
        location: null,
      },
      locationTree: [],
      parents: [],
    }
  },
  computed: {
    ...mapGetters({
      regions: 'addition/regions',
    }),
    statusStyle() {
      if (this.ship?.status_color) {
        return 'background-color: #' + this.ship.status_color
      }
      return ''
    },
    statusClass() {
      if (this.ship?.status_key) {
        return 'cell--status-' + this.ship.status_key
      }
      return ''
    },
    storesValue() {
      const stores = this.ship?.stores
      if (stores === null || stores === undefined || stores === '') {
        return this.ship?.store || ''
      }
      if (Array.isArray(stores)) {
        return stores
          .map((s) => this.storeName(s))
          .filter(Boolean)
          .join(', ')
      }
      if (typeof stores === 'object') {
        return (
          this.storeName(stores) ||
          Object.values(stores)
            .map((s) => this.storeName(s))
            .filter(Boolean)
            .join(', ')
        )
      }
      return this.storeName(stores)
    },
  },
  setup() {
    return { v$: useVuelidate() }
  },
  created() {
    this.dragGuards = new WeakSet()
  },
  mounted() {
    this.initForm()
    this.initTable()
    this.loadLocations()
    this.bindDragGuards()
    this.updateLine()
    this.bindLineObserver()
    window.addEventListener('resize', this.updateLine)
  },
  updated() {
    this.bindDragGuards()
    this.updateLine()
    this.bindLineObserver()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateLine)
    if (this.lineObserver) this.lineObserver.disconnect()
  },
  watch: {
    ship: {
      handler() {
        this.initForm()
        this.initTable()
      },
      deep: true,
    },
    mode: {
      handler() {
        this.initForm()
      },
    },
  },
  methods: {
    ...mapActions({
      getRegions: 'addition/getRegions',
    }),
    storeName(store) {
      if (store === null || store === undefined) return ''
      if (typeof store === 'string' || typeof store === 'number') return String(store)
      if (typeof store === 'object') {
        const keys = ['selfname', 'name_short', 'name', 'store_name', 'title', 'label', 'store']
        for (const key of keys) {
          if (store[key]) return String(store[key])
        }
      }
      return ''
    },
    initTable() {
      const table = this.ship?.table
      if (!table || typeof table !== 'object') {
        this.parents = []
        return
      }
      this.parents = Object.values(table).map((parent) => ({
        ...parent,
        stores:
          parent?.stores && typeof parent.stores === 'object' ? Object.values(parent.stores) : [],
      }))
    },
    onParentReorder(event) {
      this.parents = event.value
    },
    onChildReorder(event, parent) {
      parent.stores = event.value
    },
    bindDragGuards() {
      const root = this.$refs.parentTable?.$el
      if (!root) return
      const roots = [root, ...root.querySelectorAll('.shipment-window__table--child')]
      roots.forEach((el) => {
        if (this.dragGuards.has(el)) return
        el.addEventListener('mousedown', (event) => {
          const tr = event.target.closest('tr')
          if (tr && el.contains(tr)) tr.draggable = true
        })
        if (el !== root) {
          el.addEventListener('dragstart', (event) => event.stopPropagation())
        }
        this.dragGuards.add(el)
      })
    },
    updateLine() {
      const block = this.$refs.storesBlock
      const line = this.$refs.line
      if (!block || !line) return
      const badges = block.querySelectorAll('.shipment-window__store-badge')
      if (badges.length < 2) {
        line.style.height = '0px'
        return
      }
      const blockRect = block.getBoundingClientRect()
      const firstRect = badges[0].getBoundingClientRect()
      const lastRect = badges[badges.length - 1].getBoundingClientRect()
      const td = badges[0].closest('td')
      const top = firstRect.top - blockRect.top + firstRect.height / 2
      const bottom = lastRect.top - blockRect.top + lastRect.height / 2
      if (td) line.style.left = `${td.getBoundingClientRect().left - blockRect.left}px`
      line.style.top = `${top}px`
      line.style.height = `${Math.max(0, bottom - top)}px`
    },
    bindLineObserver() {
      if (typeof ResizeObserver === 'undefined') return
      const block = this.$refs.storesBlock
      if (!block || this.lineObserved === block) return
      if (this.lineObserver) {
        this.lineObserver.disconnect()
      } else {
        this.lineObserver = new ResizeObserver(() => this.updateLine())
      }
      this.lineObserver.observe(block)
      this.lineObserved = block
    },
    formatDateTime(value) {
      if (!value) return '—'
      const [date, time] = String(value).split(' ')
      const [year, month, day] = date.split('-')
      if (!year || !month || !day) return String(value)
      return `${day}.${month}.${year}${time ? ' ' + time.slice(0, 5) : ''}`
    },
    formatCost(value) {
      const cost = Number(value)
      return Number.isFinite(cost) ? cost.toFixed(2) + ' ₽' : '—'
    },
    initForm() {
      if (this.mode === 0) return
      // Для редактирования/создания
      const dateTime = this.ship?.date_from || this.ship?.date_time || this.ship?.date
      this.form.dateTime = dateTime ? new Date(dateTime) : null
      this.form.location = this.ship?.city_id || null
    },
    loadLocations() {
      this.getRegions({ exclude: [], filter: '' }).then(() => {
        this.locationTree = this.mapRegions(this.regions)
      })
    },
    mapRegions(nodes) {
      return (nodes || []).map((el) => {
        const children = el.children && el.children.length ? this.mapRegions(el.children) : []
        return {
          id: el.key,
          label: el.label,
          children: children.length ? children : undefined,
        }
      })
    },
    onLocationSelect() {
      // Можно добавить обработку
    },
    onLocationDeselect() {
      // Можно добавить обработку
    },
    handleEdit() {
      this.$emit('editMode')
    },
    handleDelete() {
      this.$emit('deleteShip', this.ship)
    },
    handleCancel() {
      this.resetForm()
      this.$emit('cancel')
    },
    handleSubmit() {
      this.v$.$touch()
      if (this.v$.$error) return
      this.$emit('submit', { ...this.form })
    },
    resetForm() {
      this.form.dateTime = null
      this.form.location = null
      this.v$.$reset()
    },
  },
  validations() {
    return {
      form: {
        dateTime: { required },
        location: { required },
      },
    }
  },
}
</script>

<style lang="scss">
.shipment-window {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -24px;
  }

  .shippings__modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -24px;

    &-title {
      font-weight: 600;
      font-size: 20px;
      line-height: 26px;
      letter-spacing: -0.01em;
      color: #282828;
    }

    &-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-right: 24px;

      i {
        width: 16px;
        height: 16px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #282828;
      }

      .d-divider {
        margin: 0;
        height: 8px;
      }
    }
  }

  &__block {
    &--view {
      .shipment-window__columns {
        display: flex;
        gap: 32px;
        align-items: flex-start;
        justify-content: flex-start;
        padding-bottom: 45px;
        margin-bottom: 16px;
      }

      .shipment-window__column {
        flex: 1 1 50%;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
    }

    &--edit {
      .shipment-window__form {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
    }

    &--stores {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }

  &__line {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 0;
    background: repeating-linear-gradient(to bottom, #282828 0 5px, transparent 5px 11px);
    pointer-events: none;
  }

  &__stores-title {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #282828;
  }

  &__table {
    font-size: 14px;

    .p-datatable-table {
      width: 100%;
      &-container {
        overflow: visible !important;
      }
    }

    .p-datatable-tbody > tr > td {
      vertical-align: top;
      padding: 12px;
      overflow: visible;
      white-space: normal;
    }

    &--parent {
      margin-left: 5px;
    }

    &--child {
      margin: 12px -12px -12px;
      .p-datatable-tbody > tr {
        background: none;
        background-color: transparent;
      }
      .p-datatable-tbody > tr > td {
        background: none;
        background-color: transparent;
      }
    }
  }

  &__drag {
    cursor: grab;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &:active {
      cursor: grabbing;
    }
  }

  &__store-badge {
    position: relative;
    display: inline-block;
    width: max-content;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    color: #282828;
    background: #ededed;
    border-radius: 20px;
    padding: 7px 10px;
    margin-bottom: 8px;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -16.5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #282828;
      transform: translateY(-50%);
    }
  }

  &__store-name {
    font-weight: 600;
    color: #282828;
    font-size: 20px;
    line-height: 26px;
  }

  &__store-address {
    font-size: 16px;
    line-height: 21px;
    color: #757575;
  }

  &__orders-title {
    font-size: 16px;
    line-height: 21px;
    color: #757575;
    margin-top: 24px;
  }

  &__orders {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 16px;
    min-width: 320px;
  }

  &__order {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 14px;
    color: #282828;
    border: 1px solid #75757575;
    border-radius: 30px;
    padding: 8px 12px;
  }

  &__order-id {
    font-weight: 600;
  }

  &__order-status {
    min-width: 26px;
    padding: 1px 6px;
    border: 1px solid #282828;
    border-radius: 20px;
    text-align: center;
    font-size: 12px;
    line-height: 15px;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__label {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #757575;
  }

  &__value {
    font-size: 14px;
    line-height: 18px;
    color: #282828;

    &--empty {
      min-height: 40px;
    }
  }

  &__status-wrapper {
    display: flex;
    align-items: center;
  }

  .catalog-dates-filter-group .catalog-filters-dates {
    width: 100%;
    max-width: 100%;
    height: 40px;
    border-radius: 30px !important;
    background: #ffffff !important;
    border: 1px solid #75757575 !important;
    padding: 0 !important;

    &::before {
      display: none !important;
    }

    &.p-inputwrapper-focus .p-inputtext,
    &.p-inputwrapper-focus.p-focus .p-inputtext,
    &:not(.p-inputwrapper-focus) .p-inputtext,
    .p-inputtext {
      width: 100%;
      min-width: 100%;
      height: 100% !important;
      border-radius: 30px !important;
      background: #ffffff !important;
      color: #282828 !important;
      border: none !important;
      box-shadow: none !important;
      padding-block: 0 !important;
      padding-inline: 12px 22px !important;
    }

    .p-datepicker-input-icon-container {
      color: #282828 !important;
      height: 16px !important;
    }

    .p-datepicker-trigger {
      background: transparent !important;
      border: none !important;
    }
  }

  .dart-form-tree-group .vue3-treeselect {
    width: 100%;
    height: 40px;

    .vue3-treeselect__control {
      width: 100%;
      height: 40px;
      background: #fff;
      border: 1px solid #75757575;
      border-radius: 30px;
      box-shadow: none;
      outline: none;
    }

    .vue3-treeselect__placeholder,
    .vue3-treeselect__single-value {
      padding-left: 12px;
      line-height: 40px;
      font-size: 14px;
      color: #282828;
    }

    .vue3-treeselect__control-arrow {
      color: #282828;
    }

    .vue3-treeselect__control-arrow-container {
      padding-right: 4px;
    }
  }

  .dart-form-tree-group
    .vue3-treeselect:not(.vue3-treeselect--disabled):not(.vue3-treeselect--focused)
    .vue3-treeselect__control:hover {
    border-color: #75757575;
    box-shadow: none;
  }

  .p-datepicker {
    display: flex;
    max-width: 100%;
  }
}

.shipment-window .cell--status {
  font-size: 12px;
  line-height: 14px;
  padding: 3px 9px;
  font-weight: 600;
  border-radius: 41px;
  display: inline-block;
  color: #282828;
}
</style>
