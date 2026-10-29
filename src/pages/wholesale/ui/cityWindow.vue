<template>
  <div class="city-window">
    <div class="shippings__modal-header">
      <h2 class="shippings__modal-header-title">
        <span v-if="mode === 0">Город {{ cityName }}</span>
        <span v-else-if="mode === 1">Редактирование города</span>
        <span v-else>Добавление города, доступного для отгрузок МС Экспресс</span>
      </h2>
      <div class="shippings__modal-header-actions" v-if="mode === 0">
        <i class="d-icon-pen2" @click="handleEdit" style="cursor: pointer"></i>
        <div class="d-divider d-divider--big d-divider--vertical"></div>
        <i class="d-icon-trash" @click="handleDelete" style="cursor: pointer"></i>
      </div>
    </div>

    <!-- Просмотр -->
    <div v-if="mode === 0" class="city-window__block">
      <div class="city-window__field">
        <label class="city-window__label">Город</label>
        <div class="city-window__value">{{ cityName }}</div>
      </div>
      <div class="city-window__field">
        <label class="city-window__label">Период создания отгрузок</label>
        <div class="city-window__value">{{ periodText }}</div>
      </div>
      <div class="city-window__field">
        <label class="city-window__label">Дни недели</label>
        <div class="city-window__value">{{ weekdaysText || '-' }}</div>
      </div>
    </div>

    <!-- Редактирование/Создание -->
    <div v-else class="city-window__block">
      <div class="city-window__field city-window__field--city">
        <label class="city-window__label">Город</label>
        <div
          class="dart-form-group dart-form-tree-group"
          :class="{ 'd-input--error': errors.city }"
        >
          <TreeSelect
            v-model="form.city_id"
            :multiple="false"
            :disable-branch-nodes="true"
            :options="locationTree"
            valueFormat="id"
            append-to-body
            :z-index="99999"
            :placeholder="'Введите область, регион и город'"
            class="city-window__treeselect"
          />
        </div>
        <div v-if="errors.city" class="d-input-error">
          <i class="d-icon-warning d-input-error__icon"></i>
          <span class="d-input-error__text">Пожалуйста, выберите город</span>
        </div>
      </div>

      <div class="city-window__dates">
        <div class="city-window__field">
          <label class="city-window__label">Дата начала создания отгрузок</label>
          <div
            class="dart-form-group catalog-dates-filter-group"
            :class="{ 'd-input--error': errors.date_from }"
          >
            <DatePicker
              v-model="form.date_from"
              dateFormat="dd.mm.yy"
              hourFormat="24"
              showTime
              :placeholder="'Выберите дату и время начала'"
              :manualInput="false"
              showIcon
              showClear
              iconDisplay="input"
              class="catalog-filters-dates city-window__datepicker"
            />
          </div>
          <div v-if="errors.date_from" class="d-input-error">
            <i class="d-icon-warning d-input-error__icon"></i>
            <span class="d-input-error__text">Пожалуйста, выберите дату начала</span>
          </div>
        </div>

        <div class="city-window__date-column">
          <div class="city-window__field">
            <label class="city-window__label">Дата окончания создания отгрузок</label>
            <div
              class="dart-form-group catalog-dates-filter-group"
              :class="{ 'd-input--error': errors.date_to }"
            >
              <DatePicker
                v-model="form.date_to"
                dateFormat="dd.mm.yy"
                :placeholder="'Выберите дату окончания'"
                :manualInput="false"
                :minDate="form.date_from"
                :disabled="form.indefinite"
                showIcon
                showClear
                iconDisplay="input"
                class="catalog-filters-dates city-window__datepicker"
              />
            </div>
            <div v-if="errors.date_to" class="d-input-error">
              <i class="d-icon-warning d-input-error__icon"></i>
              <span class="d-input-error__text">Пожалуйста, выберите дату окончания</span>
            </div>
          </div>

          <div class="d-radio__wrapper city-window__switch">
            <label class="d-switch" for="city-indefinite">
              <input
                type="checkbox"
                name="city-indefinite"
                id="city-indefinite"
                v-model="form.indefinite"
                class="d-switch__input"
              />
              <div class="d-switch__circle"></div>
            </label>
            <div class="d-switch__label-container">
              <label for="city-indefinite" class="d-switch__label d-switch__label--regular"
                >Бессрочно</label
              >
              <p class="d-description">
                Отгрузки будут создаваться без ограничения срока действия.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="city-window__field">
        <label class="city-window__label">Дни недели</label>
        <div class="city-window__weekdays">
          <label v-for="day in weekdays" :key="day.value" class="city-window__weekday">
            <Checkbox v-model="form.weekdays" :value="day.value" />
            <span>{{ day.label }}</span>
          </label>
        </div>
      </div>
    </div>

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
        :disabled="submitting"
        @click="mode === 0 ? $emit('cancel') : handleSubmit()"
      >
        {{ mode === 0 ? 'Закрыть' : submitting ? 'Сохранение...' : 'Сохранить' }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DatePicker from 'primevue/datepicker'
import Checkbox from 'primevue/checkbox'
import TreeSelect from '@/shared/ui/TreeSelectFilter.vue'
import '@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css'
import {
  WEEKDAYS,
  normalizeWeekdays,
  weekdaysLabel,
  parseCityDate,
  formatCityDate,
  formatCityDateValue,
  formatCityDateTimeValue,
} from '../cityUtils'

export default {
  name: 'CityWindow',
  components: {
    DatePicker,
    Checkbox,
    TreeSelect,
  },
  emits: ['editMode', 'deleteCity', 'cancel', 'submit'],
  props: {
    city: {
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
        id: null,
        city_id: null,
        city_name: '',
        date_from: null,
        date_to: null,
        indefinite: false,
        weekdays: [],
        active: 1,
      },
      locationTree: [],
      citiesFlat: [],
      errors: {
        city: false,
        date_from: false,
        date_to: false,
      },
      weekdays: WEEKDAYS,
      submitting: false,
    }
  },
  computed: {
    ...mapGetters({
      regions: 'addition/regions',
    }),
    cityName() {
      return (
        this.form.city_name ||
        this.city?.city_name ||
        this.city?.name ||
        this.findCityLabel(this.city?.city_id) ||
        '-'
      )
    },
    periodText() {
      const source = this.mode === 0 ? this.city : this.form
      if (source?.indefinite) return 'Бессрочно'
      return `${formatCityDate(source?.date_from)} — ${formatCityDate(source?.date_to)}`
    },
    weekdaysText() {
      const source = this.mode === 0 ? this.city : this.form
      return weekdaysLabel(source?.weekdays)
    },
  },
  watch: {
    city: {
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
    'form.indefinite'(value) {
      if (value) {
        this.form.date_to = null
        this.errors.date_to = false
      }
    },
    'form.city_id'(value) {
      if (value) this.errors.city = false
    },
    'form.date_from'(value) {
      if (value) this.errors.date_from = false
    },
    'form.date_to'(value) {
      if (value) this.errors.date_to = false
    },
  },
  mounted() {
    this.initForm()
    this.loadLocations()
  },
  methods: {
    ...mapActions({
      getRegions: 'addition/getRegions',
      createShippingCity: 'logistic/createShippingCity',
    }),
    initForm() {
      const city = this.city || {}
      const sourceWeekdays = city.weekdays ?? city.days ?? city.repeat_days
      const allWeekdays = WEEKDAYS.map((day) => day.value)
      this.form = {
        id: city.id ?? null,
        city_id: 'city_' + city.slShipCities_city,
        city_name: city.city_name ?? city.name ?? '',
        date_from: parseCityDate(city.slShipCities_date_from),
        date_to: parseCityDate(city.slShipCities_date_to),
        indefinite: parseCityDate(city.slShipCities_date_to) != null ? true : false,
        weekdays:
          sourceWeekdays === undefined || sourceWeekdays === null
            ? this.mode === 2
              ? allWeekdays
              : []
            : normalizeWeekdays(sourceWeekdays),
        active: city.active ?? 1,
      }
      this.errors = {
        city: false,
        date_from: false,
        date_to: false,
      }
    },
    loadLocations() {
      this.getRegions({ exclude: [], filter: '' }).then(() => {
        this.locationTree = this.mapRegions(this.regions)
        this.citiesFlat = this.flattenTree(this.locationTree)
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
    flattenTree(nodes) {
      const result = []
      ;(nodes || []).forEach((node) => {
        result.push({ id: node.id, label: node.label })
        if (node.children) {
          result.push(...this.flattenTree(node.children))
        }
      })
      return result
    },
    findCityLabel(id) {
      if (id === null || id === undefined || id === '') return ''
      const found = this.citiesFlat.find((item) => String(item.id) === String(id))
      return found?.label || ''
    },
    handleEdit() {
      this.$emit('editMode')
    },
    handleDelete() {
      this.$emit('deleteCity', this.city)
    },
    handleCancel() {
      this.initForm()
      this.$emit('cancel')
    },
    async handleSubmit() {
      this.errors = {
        city: !this.form.city_id,
        date_from: !this.form.date_from,
        date_to: !this.form.indefinite && !this.form.date_to,
      }
      if (this.errors.city || this.errors.date_from || this.errors.date_to) return
      const payload = {
        id: this.form.id,
        city_id: this.form.city_id,
        city_name: this.findCityLabel(this.form.city_id) || this.form.city_name,
        date_from: formatCityDateTimeValue(this.form.date_from),
        date_to: this.form.indefinite ? null : formatCityDateValue(this.form.date_to),
        indefinite: this.form.indefinite,
        weekdays: [...this.form.weekdays].sort((a, b) => a - b),
        active: this.form.active,
      }
      if (this.mode === 2) {
        this.submitting = true
        try {
          const response = await this.createShippingCity({ form: payload })
          const result = response?.data
          if (result?.success) {
            this.$toast.add({
              severity: 'success',
              summary: 'Город добавлен',
              detail: result.message || 'Город для автоматического создания отгрузок сохранён',
              life: 3000,
            })
            this.$emit('submit', payload)
          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: result?.message || 'Не удалось создать город',
              life: 3000,
            })
          }
        } catch (error) {
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: error?.response?.data?.message || error?.message || 'Не удалось создать город',
            life: 3000,
          })
        } finally {
          this.submitting = false
        }
        return
      }
      this.$emit('submit', payload)
    },
  },
}
</script>

<style lang="scss">
.city-window {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-right: 24px;

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
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &--city {
      width: calc(50% - 12px);
    }
  }

  &__dates {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }

  &__date-column {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__label {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #757575;
  }

  &__value {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #282828;
  }

  &__datepicker {
    width: 100%;
  }

  &__switch {
    align-items: flex-start;
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

    &.p-disabled,
    &.p-disabled .p-inputtext,
    .p-inputtext:disabled {
      background: #ffffff !important;
      opacity: 1 !important;
      color: #9e9e9e !important;
      cursor: not-allowed;
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

  &__weekdays {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  &__weekday {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #282828;
    cursor: pointer;
  }

  @media (width <= 768px) {
    &__field--city {
      width: 100%;
    }

    &__dates {
      grid-template-columns: 1fr;
    }
  }
}
</style>
