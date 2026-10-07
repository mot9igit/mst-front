<template>
  <div class="change-order-date">
    <div class="change-order-date__header">
      <h2 class="change-order-date__title">
        Изменить дату отправления заказа №{{ order?.id }}
      </h2>
    </div>

    <div class="change-order-date__field">
      <label class="change-order-date__label">Новая дата отправления</label>

      <div
        v-if="dates.length"
        class="dart-form-group catalog-dates-filter-group"
        :class="{ 'd-input--error': error }"
      >
        <DatePicker
          ref="datepicker"
          v-model="date"
          date-format="dd.mm.yy"
          placeholder="Выберите дату"
          :manual-input="false"
          show-icon
          icon-display="input"
          class="catalog-filters-dates change-order-date__datepicker"
          :min-date="minDate"
          :max-date="maxDate"
          :disabled-dates="disabledDates"
          :base-z-index="11000"
          panel-class="change-order-date__panel"
          @date-select="error = ''"
          @clear-click="error = ''"
        />
      </div>

      <div v-if="error" class="d-input-error">
        <i class="d-icon-warning d-input-error__icon"></i>
        <span class="d-input-error__text">{{ error }}</span>
      </div>

      <p v-if="!dates.length" class="change-order-date__empty">
        В этом городе нет других запланированных отгрузок
      </p>
    </div>

    <div class="collection__modal-buttons change-order-date__buttons">
      <button
        type="button"
        class="d-button d-button-primary d-button--sm-shadow collection__modal-cansel"
        @click="$emit('cancel')"
      >
        Отмена
      </button>
      <button
        type="button"
        class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
        :disabled="!dates.length"
        @click="submit"
      >
        Ок
      </button>
    </div>
  </div>
</template>

<script>
import DatePicker from 'primevue/datepicker'

const MAX_RANGE_DAYS = 400

function dayKey(d) {
  return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()
}

function parseDate(value) {
  if (!value) return null
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }
  const s = String(value).trim()
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  m = s.match(/^(\d{2})\.(\d{2})\.(\d{4})/)
  if (m) return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]))
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? null : d
}

export default {
  name: 'ChangeOrderDateWindow',
  components: { DatePicker },
  emits: ['cancel', 'submit'],
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
    dates: {
      type: Array,
      default: () => [],
    },
    currentDate: {
      type: [String, Date],
      default: null,
    },
  },
  data() {
    return {
      date: null,
      error: '',
      openTimer: null,
    }
  },
  computed: {
    sortedDates() {
      return this.dates
        .filter((d) => d instanceof Date && !Number.isNaN(d.getTime()))
        .slice()
        .sort((a, b) => a - b)
    },
    minDate() {
      return this.sortedDates[0] || null
    },
    maxDate() {
      return this.sortedDates[this.sortedDates.length - 1] || null
    },
    disabledDates() {
      if (!this.minDate || !this.maxDate) return []
      const allowed = new Set(this.sortedDates.map(dayKey))
      const list = []
      const cur = new Date(this.minDate)
      let guard = 0
      while (cur <= this.maxDate && guard < MAX_RANGE_DAYS) {
        if (!allowed.has(dayKey(cur))) {
          list.push(new Date(cur))
        }
        cur.setDate(cur.getDate() + 1)
        guard++
      }
      return list
    },
    parsedCurrentDate() {
      return parseDate(this.currentDate)
    },
  },
  watch: {
    dates: {
      handler() {
        this.applyInitialDate()
      },
      deep: true,
    },
    currentDate() {
      this.applyInitialDate()
    },
  },
  mounted() {
    this.applyInitialDate()
    this.$nextTick(() => this.openPicker())
    this.openTimer = setTimeout(() => this.openPicker(), 300)
  },
  beforeUnmount() {
    clearTimeout(this.openTimer)
  },
  methods: {
    applyInitialDate() {
      const d = this.parsedCurrentDate
      const allowed = new Set(this.sortedDates.map(dayKey))
      if (d && allowed.has(dayKey(d))) {
        this.date = d
      } else if (!d || !this.dates.some((x) => dayKey(x) === dayKey(d))) {
        this.date = null
      }
      this.error = ''
    },
    openPicker() {
      const picker = this.$refs.datepicker
      if (!picker) return
      const input = picker.$el?.querySelector('input')
      if (input && document.activeElement !== input) {
        input.focus({ preventScroll: true })
      }
      if (!picker.overlayVisible) {
        picker.overlayVisible = true
      }
    },
    submit() {
      if (!this.dates.length) return
      if (!this.date) {
        this.error = 'Пожалуйста, выберите дату'
        return
      }
      this.$emit('submit', new Date(this.date))
    },
  },
}
</script>

<style lang="scss">
.change-order-date {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -24px;
  }

  &__title {
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: -0.01em;
    color: #282828;
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
    color: #282828;
  }

  &__empty {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #757575;
  }

  &__buttons {
    justify-content: flex-end;
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

  .d-input--error .catalog-filters-dates {
    border-color: #f92c0d !important;
  }

  .p-datepicker {
    display: flex;
    max-width: 100%;
  }
}

.change-order-date__panel {
  .p-datepicker-day:not(.p-disabled):not(.p-datepicker-day-selected) {
    color: #f92c0d;
    font-weight: 600;
    background: rgba(249, 44, 13, 0.08);
    border: 1px solid rgba(249, 44, 13, 0.35);
    border-radius: 50%;

    &:hover {
      background: #f92c0d;
      border-color: #f92c0d;
      color: #ffffff;
    }
  }

  .p-disabled,
  .p-datepicker-day.p-disabled {
    color: rgba(117, 117, 117, 0.45);
    font-weight: 400;
    background: transparent;
    border-color: transparent;
    text-decoration: line-through;
  }
}
</style>
