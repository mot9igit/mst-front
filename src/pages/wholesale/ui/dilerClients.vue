<template>
  <h2 class="clients-modal__title promos__header-title">
    Клиенты дилера
    <div class="d-badge2 d-badge2--fit order__item-header-badge">
      <div class="order__item-header-badge-image-container">
        <img :src="diler?.image" :alt="diler?.name" class="order__item-header-badge-image" />
      </div>
      <p class="order__item-header-badge-text">{{ diler?.name }}</p>
    </div>
  </h2>
  <div class="clients-modal__filters">
    <div class="clients-modal__filters-input-container" v-for="(ffilter, i) in filters" :key="i">
      <div
        class="d-input d-input--light clients-modal__filters-input"
        v-if="ffilter.type == 'text'"
      >
        <input
          type="text"
          :id="ffilter.name"
          :placeholder="ffilter.placeholder"
          :name="i"
          class="d-input__field clients-modal__filters-input-field"
          v-model="filterText"
          @input="setFilter('filter')"
        />

        <div class="d-input__actions clients-modal__filters-input-actions">
          <button class="d-icon-wrapper clients-modal__filters-input-button">
            <i class="d-icon-search-big"></i>
          </button>
        </div>
      </div>
      <div
        v-if="ffilter.type == 'text' || ffilter.type == 'datepicker'"
        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
      ></div>
      <div
        class="d-radio__wrapper clients-modal__filters-radio-wrapper"
        v-if="ffilter.type == 'switch'"
      >
        <div class="d-switch catalog-filter-switch" @click="setFilterSwitch(i)">
          <input
            type="checkbox"
            binary="true"
            class="d-switch__input"
            v-model="filterValues[i]"
            :id="'catalog-' + i"
          />
          <div class="d-switch__circle"></div>
        </div>
        <label
          :for="'catalog-' + i"
          class="catalog-top_filters-label"
          :class="{
            'catalog-top_filters-label--active': filterValues[i],
            'catalog-filter-switch-lable': ffilter.type == 'switch',
          }"
          >{{ ffilter.placeholder }}
        </label>
      </div>
      <DatePicker
        v-if="ffilter.type == 'datepicker'"
        v-model="filterValues[i]"
        @hide="setFilter"
        dateFormat="dd.mm.yy"
        :placeholder="ffilter.placeholder"
        :manualInput="false"
        :maxDate="date_now"
        showIcon
        showClear
        iconDisplay="input"
        selectionMode="range"
        class="catalog-filters-dates"
      >
        <template #footer>
          <div class="catalog-filters-dates-overlay-footer">
            <button
              class="d-button d-button-primary d-button-primary-small d-button-clear-dates"
              @click.prevent="filterValues[i] = null"
            >
              Сбросить
            </button>
            <button
              class="d-button d-button-primary d-button-primary-small"
              @click.prevent="setFilter"
            >
              Готово
            </button>
          </div>
        </template>
      </DatePicker>
    </div>
  </div>
  <Loader v-if="loading" />
  hello!
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import { toRaw } from 'vue'
import DatePicker from 'primevue/datepicker'

export default {
  name: 'dilerClientsWindow',
  data() {
    return {
      loading: true,
      filters: {
        name: {
          name: 'Название организации или инн',
          placeholder: 'Название организации или инн',
          type: 'text',
        },
        sales: {
          name: 'Только с продажами',
          placeholder: 'Только с продажами',
          type: 'switch',
          values: 1,
        },
        outOfStock: {
          name: 'Out of stock',
          placeholder: 'Out of stock',
          type: 'switch',
          values: 1,
        },
        deliveries: {
          name: 'Учитывать товары в заказе',
          placeholder: 'Учитывать товары в заказе',
          values: 1,
          type: 'switch',
        },
        integrated: {
          name: 'Интегрированные',
          placeholder: 'Интегрированные',
          type: 'switch',
          values: 1,
        },
        our: {
          name: 'Созданные поставщиком',
          placeholder: 'Созданные поставщиком',
          type: 'switch',
          values: 1,
        },
        dates: {
          name: 'Продажи за период',
          placeholder: 'Продажи за период',
          value: null,
          type: 'datepicker',
        },
      },
      filterValues: {},
    }
  },
  props: {
    diler: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  emits: ['closeWindow', 'goToOffer'],
  components: { Loader, DatePicker },
  mounted() {
    this.getDilerClients({
      diler_id: this.diler.id,
    }).then(() => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      dilerClients: 'org/dilerClients',
    }),
  },
  methods: {
    ...mapActions({
      getDilerClients: 'org/getDilerClients',
      unsetDilerClients: 'org/unsetDilerClients',
    }),
    setFilterSwitch(index) {
      console.log(index)
      var find = false
      if (index != 'dates') {
        for (var i in this.filterValues) {
          if (i == index) {
            find = true
            if (this.filterValues[index]) {
              this.filterValues[index] = false
            } else {
              this.filterValues[index] = true
            }
          }
        }
        if (!find) {
          this.filterValues[index] = true
        }
        this.filter()
      }
    },
    setFilter(type = '0') {
      if (type === 'filter') {
        if (this.filterText.length >= 3 || this.filterText.length === 0) {
          setTimeout(() => {
            this.filter({
              filter: this.filterText,
              filtersdata: toRaw(this.filterValues),
            })
          })
        }
      } else {
        this.$nextTick(() => {
          this.filter({
            filter: this.filterText,
            filtersdata: toRaw(this.filterValues),
          })
        })
      }
    },
    filter() {
      this.loading = true
      this.unsetDilerClients()
      this.page = 1
      this.getDilerClients({
        filter: this.filterText,
        filtersdata: toRaw(this.filterValues),
      }).then(() => {
        this.loading = false
      })
    },
  },
  watch: {},
}
</script>
<style lang="scss">
.clients-modal {
  &__title {
    margin-bottom: 40px;
  }
  &__filters {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 15px;
    &-input-container {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .catalog-filters-dates {
      padding-left: 0;
    }
    .catalog-filters-dates:before {
      display: none;
    }
  }
}
</style>
