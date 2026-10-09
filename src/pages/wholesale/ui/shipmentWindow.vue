<template>
  <div class="shipment-window">
    <!-- Заголовок -->
    <div class="shippings__modal-header">
      <h2 class="shippings__modal-header-title">
        <span v-if="mode === 0">Отгрузка №{{ ship?.id || '' }}</span>
        <span v-else-if="mode === 1">Редактирование отгрузки №{{ ship?.id || '' }}</span>
        <span v-else>Создание отгрузки</span>
      </h2>
      <div
        class="shippings__modal-header-actions"
        v-if="mode === 0 && (canEditShipment || canDeleteShipment)"
      >
        <i v-if="canEditShipment" class="d-icon-pen2" @click="handleEdit" style="cursor: pointer"></i>
        <div
          v-if="canEditShipment && canDeleteShipment"
          class="d-divider d-divider--big d-divider--vertical"
        ></div>
        <i v-if="canDeleteShipment" class="d-icon-trash" @click="handleDelete" style="cursor: pointer"></i>
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
            <div class="stores-cell">
              <div v-for="(store, index) in stores" :key="index" class="stores-cell__row">
                <span class="stores-cell__name">{{ storeName(store) }}</span
                ><span v-if="storeAddress(store)">, {{ storeAddress(store) }}</span>
              </div>
              <span v-if="!stores.length" class="stores-cell__empty">-</span>
            </div>
          </div>
        </div>
      </div>
      <div class="shipment-window__checkbox-row">
        <div class="shipment-window__checkbox">
          <Checkbox v-model="stopRedistribution" :binary="true" disabled />
          <span class="shipment-window__checkbox-text"
            >Отключить перераспределение заказов</span
          >
        </div>
        <button
          type="button"
          class="d-button d-button-secondary d-button--no-shadow shipment-window__codes-button"
          @click="handleOpenCodes"
        >
          <i class="d-icon-mail shipment-window__codes-icon"></i>
          <span>Коды заказов</span>
        </button>
      </div>
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
        <div class="shipment-window__field shipment-window__field--row2">
          <div class="shipment-window__checkbox">
            <Checkbox v-model="form.stop_redistribution" :binary="true" />
            <span class="shipment-window__checkbox-text"
              >Отключить перераспределение заказов</span
            >
          </div>
        </div>
        <div class="shipment-window__field shipment-window__field--row2">
          <button
            type="button"
            class="d-button d-button-secondary d-button--no-shadow shipment-window__codes-button"
            @click="handleOpenCodes"
          >
            <i class="d-icon-mail shipment-window__codes-icon"></i>
            <span>Коды заказов</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Блок 2: Склады отгрузки и заказы -->
    <div
      v-if="mode !== 2"
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
        :reorderable-rows="mode !== 0"
        @row-reorder="onParentReorder"
      >
        <Column>
          <template #body="{ data }">
            <div class="shipment-window__drag" data-pc-section="reorderablerowhandle">
              <div
                class="shipment-window__store-badge"
                :class="{ 'shipment-window__store-badge--recipient': isRecipient(data) }"
              >
                {{ pointLabel(data) }}
              </div>
              <div class="shipment-window__store-name">{{ data.name_short || data.name }}</div>
              <div class="shipment-window__store-address">Дата отгрузки: {{ ship?.date }}</div>
              <div class="shipment-window__store-address">
                {{ data.address_short || data.address || '-' }}
              </div>
            </div>

            <template v-if="data.orders?.length">
              <div class="shipment-window__orders-title">Заказы</div>
              <div class="shipment-window__orders">
                <div
                  v-for="order in data.orders"
                  :key="order.id"
                  class="shipment-window__order"
                  :style="orderStatusBorder(order)"
                >
                  <span class="shipment-window__order-id">№{{ order.id }}</span>
                  <span
                    v-if="order.order_status"
                    class="shipment-window__order-status"
                    :style="orderStatusStyle(order)"
                  >
                    {{ order.order_status.name ?? '—' }}
                  </span>
                  <span v-else class="shipment-window__order-status">
                    {{ order.status ?? '—' }}
                  </span>
                  <i
                    v-if="canMoveOrder(order)"
                    class="d-icon-refresh shipment-window__order-change"
                    @click.stop="handleChangeOrderDate(order)"
                  ></i>
                </div>
              </div>
            </template>
            <span v-else class="shipment-window__store-address">Заказов нет</span>
          </template>
        </Column>
      </DataTable>

      <div ref="line" class="shipment-window__line"></div>
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

    <CodeOrdersWindow
      :visible="showCodesModal"
      :emails="form.emails"
      @update:visible="showCodesModal = $event"
      @submit="handleSendCodes"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import DatePicker from 'primevue/datepicker'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'
import TreeSelect from '@/shared/ui/TreeSelectFilter.vue'
import CodeOrdersWindow from './codeOrdersWindow.vue'
import '@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css'

export default {
  name: 'ShipmentWindow',
  components: {
    DatePicker,
    DataTable,
    Column,
    Checkbox,
    TreeSelect,
    CodeOrdersWindow,
  },
  emits: ['editMode', 'deleteShip', 'cancel', 'submit', 'changeOrderDate'],
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
        stop_redistribution: false,
        emails: [],
      },
      locationTree: [],
      parents: [],
      showCodesModal: false,
    }
  },
  computed: {
    ...mapGetters({
      regions: 'addition/regions',
    }),
    canEditShipment() {
      return [1, 2].includes(Number(this.ship?.status))
    },
    canDeleteShipment() {
      return Number(this.ship?.status) !== 3
    },
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
    stores() {
      const table = this.ship?.table
      if (!table) return []
      const points = Array.isArray(table)
        ? table
        : typeof table === 'object'
          ? Object.values(table)
          : []
      return points.filter((store) => this.isSender(store))
    },
    stopRedistribution() {
      return !!this.ship?.stop_redistribution
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
      handler(val, old) {
        this.initTable()
        if ((val?.id ?? null) !== (old?.id ?? null)) {
          this.initForm()
        }
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
      sendShipmentCodes: 'wholesale/sendShipmentCodes',
    }),
    storeName(store) {
      if (!store) return ''
      if (typeof store === 'string') return store
      return store.org_name || store.name_short || store.name || ''
    },
    isSender(point) {
      if (!point || typeof point !== 'object') return false
      if (point.role) return point.role === 'sender'
      const label = String(point.role_label || point.label || '').toLowerCase()
      return /отправител|sender/.test(label)
    },
    storeAddress(store) {
      if (!store || typeof store === 'string') return ''
      return store.address || store.address_short || ''
    },
    handleOpenCodes() {
      this.form.emails = Array.isArray(this.ship?.emails) ? this.ship.emails.slice() : []
      this.showCodesModal = true
    },
    async handleSendCodes(payload) {
      const emails = Array.isArray(payload) ? payload : payload?.emails
      const generate = Array.isArray(payload) ? false : !!payload?.generate
      const shipment_id = this.ship?.id ?? null
      this.form.emails = Array.isArray(emails) ? emails.slice() : []
      try {
        await this.sendShipmentCodes({ shipment_id, emails, generate })
        this.$toast.add({
          severity: 'success',
          summary: 'Коды заказов',
          detail: 'Запрос на отправку кодов сформирован',
          life: 3000,
        })
      } catch {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось отправить коды заказов',
          life: 3000,
        })
      }
    },
    initTable() {
      const table = this.ship?.table
      this.parents = Array.isArray(table)
        ? table.map((point) => ({ ...point, orders: Array.isArray(point?.orders) ? point.orders : [] }))
        : []
    },
    onParentReorder(event) {
      this.parents = event.value
    },
    isRecipient(point) {
      if (!point) return false
      if (point.role) return point.role === 'receiver'
      const label = String(point.role_label || point.label || '').toLowerCase()
      return /получател|recipient/.test(label)
    },
    pointRole(point) {
      if (point?.role === 'sender' || point?.role === 'receiver') return point.role
      return this.isRecipient(point) ? 'receiver' : 'sender'
    },
    pointLabel(point) {
      if (point?.role_label || point?.label) return point.role_label || point.label
      return this.isRecipient(point) ? 'Получатель' : 'Отправитель'
    },
    bindDragGuards() {
      const root = this.$refs.parentTable?.$el
      if (!root) return
      const roots = [root, ...root.querySelectorAll('.shipment-window__table--child')]
      roots.forEach((el) => {
        if (!this.dragGuards.has(el)) {
          el.addEventListener('mousedown', (event) => {
            if (this.mode === 0) {
              const tr = event.target.closest('tr')
              if (tr && el.contains(tr)) tr.draggable = false
              return
            }
            const tr = event.target.closest('tr')
            if (tr && el.contains(tr)) tr.draggable = true
          })
          if (el !== root) {
            el.addEventListener('dragstart', (event) => {
              event.stopPropagation()
              this.childDragging = true
              const row = event.target?.closest ? event.target.closest('tr') : null
              if (row) row.draggable = false
              const parentTr = el.closest('tr')
              if (parentTr) parentTr.draggable = false
            })
            el.addEventListener('dragend', () => {
              this.childDragging = false
              root.querySelectorAll('tr').forEach((tr) => {
                tr.draggable = this.mode !== 0
              })
            })
          }
          this.dragGuards.add(el)
        }
        if (this.childDragging) return
        el.querySelectorAll('tr').forEach((tr) => {
          tr.draggable = this.mode !== 0
        })
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
    hexColor(value) {
      if (!value) return ''
      const color = String(value).trim()
      return color.startsWith('#') ? color : '#' + color
    },
    orderStatusStyle(order) {
      const status = order?.order_status
      if (!status) return {}
      const style = {}
      const background = this.hexColor(status.color)
      const text = this.hexColor(status.color_text)
      if (background) {
        style.backgroundColor = background
        style.borderColor = background
      }
      if (text) style.color = text
      return style
    },
    orderStatusBorder(order) {
      const border = this.hexColor(order?.order_status?.color)
      return border ? { borderColor: border } : {}
    },
    initForm() {
      if (this.mode === 0) return
      // Для редактирования/создания
      const dateTime = this.ship?.date_from || this.ship?.date_time || this.ship?.date
      this.form.dateTime = dateTime ? this.parseShipmentDateTime(dateTime) : null
      this.form.location = this.ship?.city_id || null
      this.form.stop_redistribution = !!this.ship?.stop_redistribution
      this.form.emails = Array.isArray(this.ship?.emails) ? this.ship.emails.slice() : []
    },
    parseShipmentDateTime(value) {
      if (!value) return null
      if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value
      }
      const s = String(value).trim()
      const m = s.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{1,2}):(\d{2})(?::(\d{2}))?)?/)
      if (!m) {
        const d = new Date(s)
        return Number.isNaN(d.getTime()) ? null : d
      }
      return new Date(
        Number(m[1]),
        Number(m[2]) - 1,
        Number(m[3]),
        Number(m[4] || 0),
        Number(m[5] || 0),
        Number(m[6] || 0),
      )
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
    buildTableOrder() {
      return (this.parents || [])
        .filter((p) => p?.id !== undefined && p?.id !== null && p?.id !== '')
        .map((p) => `${this.pointRole(p)}_${p.id}`)
    },
    canMoveOrder(order) {
      return this.mode !== 0 && order?.order_status?.api_key === 'buyer_accepted'
    },
    handleChangeOrderDate(order) {
      if (this.canMoveOrder(order)) {
        this.$emit('changeOrderDate', order)
      }
    },
    handleSubmit() {
      if (this.mode === 0) {
        this.$emit('cancel')
        return
      }
      this.v$.$touch()
      if (this.v$.$error) return
      this.$emit('submit', { ...this.form, table_order: this.buildTableOrder() })
    },
    resetForm() {
      this.form.dateTime = null
      this.form.location = null
      this.form.stop_redistribution = false
      this.form.emails = []
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
  padding-right: 24px;

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
        margin-bottom: 24px;
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
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
      }
    }

    &--stores {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 24px;
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

    .p-datatable-tbody > tr {
      background: none;
      background-color: transparent;
    }

    .p-datatable-tbody > tr > td {
      vertical-align: top;
      padding: 12px;
      overflow: visible;
      white-space: normal;
      border: none;
      background: none;
      background-color: transparent;
    }

    &--parent {
      margin-left: 5px;
    }

    &--child {
      margin: 12px -12px -12px;
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
    padding: 7px 12px;
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
    font-weight: 500;
    min-height: 24px;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    align-items: center;
  }

  &__order-change {
    cursor: pointer;
    font-size: 17px;
    color: #282828;
    -webkit-text-stroke: 0.4px currentColor;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &--row2 {
      justify-content: center;
      align-items: flex-start;
    }
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

  &__checkbox {
    display: flex;
    align-items: center;
    gap: 8px;

    .p-checkbox {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .p-checkbox-input {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      opacity: 1;
      border: 1px solid #757575;
      transition: all 0.2s ease;

      &:hover,
      &:checked {
        border-color: #f92c0d;
      }
    }

    .p-checkbox .p-checkbox-box {
      width: 20px;
      height: 20px;
      border-radius: 20px;
      border: none;
      background: transparent;
      margin: 2px;
      aspect-ratio: 1;
    }

    .p-checkbox-checked .p-checkbox-box {
      background: #f92c0d;

      svg {
        display: none;
      }
    }

    .p-checkbox.p-disabled {
      opacity: 1;

      .p-checkbox-box {
        background: transparent;
      }

      .p-checkbox-input {
        pointer-events: none;
        border-color: #757575;
      }
    }

    .p-checkbox.p-disabled.p-checkbox-checked .p-checkbox-box {
      background: #f92c0d;
    }

    .p-checkbox.p-disabled.p-checkbox-checked .p-checkbox-input {
      border-color: #f92c0d;
    }
  }

  &__checkbox-text {
    font-size: 14px;
    line-height: 18px;
    color: #282828;
  }

  &__checkbox-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  &__codes-button {
    width: auto;
    min-height: 40px;
    font-size: 14px;
    font-weight: 500;
  }

  &__field--row2 &__codes-button {
    align-self: flex-end;
  }

  &__codes-icon {
    font-size: 18px;
    line-height: 1;
  }

  .stores-cell {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .stores-cell__row {
    font-size: 14px;
    line-height: 18px;
    color: #282828;
  }

  .stores-cell__name {
    font-weight: 600;
  }

  .stores-cell__empty {
    color: #757575;
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
