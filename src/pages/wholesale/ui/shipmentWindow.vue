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
            <div class="shipment-window__value shipment-window__value--empty">
              <!-- Пока свободное место -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Редактирование/Создание -->
    <div v-else class="shipment-window__block shipment-window__block--edit">
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
    <div v-if="mode !== 0" class="collection__modal-buttons">
      <button
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
import TreeSelect from '@/shared/ui/TreeSelectFilter.vue'
import '@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css'

export default {
  name: 'ShipmentWindow',
  components: {
    DatePicker,
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
  },
  setup() {
    return { v$: useVuelidate() }
  },
  mounted() {
    this.initForm()
    this.loadLocations()
  },
  watch: {
    ship: {
      handler() {
        this.initForm()
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
}
</style>
