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
  <div class="clients-modal__content clients__card-container" v-else>
    <div class="clients__card" v-for="(item, i) in dilerClients.items" :key="i">
      <div class="clients__card-info">
            <div class="clients__card-info-image-container">
              <img :src="item.image" alt="" class="clients__card-info-image" />
            </div>
            <div class="clients__card-info-content">
              <p class="clients__card-info-title">{{ item.name }}</p>
              <div class="clients__card-info-address">
                <i class="d-icon-location clients__card-info-address-icon"></i>
                <span>{{
                  item.req?.fact_address != '' ? item.req?.fact_address : 'адрес не указан'
                }}</span>
              </div>
              <div class="clients__card-info--flex">
                <div class="clients__card-info-title clients__card-info-title-type">
                  {{ item.org_type }}
                </div>
              </div>
            </div>
      </div>
      <div
        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
      ></div>
      <div class="clients__card-info">
        <p class="clients__card-inn-label">ИНН:</p>
        <p class="clients__card-inn-value">
          {{ item.req?.inn != '' ? item.req?.inn : 'не указан' }}
        </p>
      </div>
      <div
       
        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
      ></div>
      <div class="clients__card-info clients-modal__content--column">
        <a :href="'tel:' + item.phone.replace(/[^+\d]/g, '')" class="clients__card-contact">
          <i class="d-icon-telephone clients__card-contact-icon"></i>
          <span>{{ item.phone }}</span>
        </a>
        <a :href="'mailto:' + item.email" class="clients__card-contact">
          <i class="d-icon-mail2 clients__card-contact-icon"></i>
          <span>{{ item.email }}</span>
        </a>
      </div>
      <div
        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
      ></div>
      <div class="clients__card-info">
        <div
          class="clients__card-vendor"
          v-if="item.owner_id > 0"
        >
          Создан поставщиком
        </div>
        <img
          src="/icons/org_api_integration.svg"
          class="clients__card-vendor--integration"
          title="Интегрирован"
          v-if="item.api_integration == 1"
        />
      </div>
      <div
        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
      ></div>
      <div class="clients__card-info">
        <button
                @click.prevent="createOffer(item)"
                class="d-button d-button-primary d-button--sm-shadow clients__card-offer"
                v-if="item.owner_id == 0 || (item.owner_id != 0 && item.store_id)"
              >
                <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                Предложение
              </button>
      </div>
      <div
        :class="{'opacity--divider' : item.owner_id == 0}"
        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
      ></div>
      <div class="clients__card-info">
        <button
                class="clients__card-action"
                @click.prevent="this.$emit('editVirtual', item)"
                v-if="item.owner_id > 0"
              >
                <i class="d-icon-pen2"></i>
              </button>
      </div>
    </div>

  </div>

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
  emits: ['editVirtual', 'goToOffer'],
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
      isVendor: 'org/isVendor'
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
        diler_id: this.diler.id,
        filter: this.filterText,
        filtersdata: toRaw(this.filterValues),
      }).then(() => {
        this.loading = false
      })
    },
    createOffer(data) {
      console.log(data)
      this.isVendor({
        from_org_id: data.id,
        diler_id: this.diler.id
      }).then((res) => {
        if(res.data.data.success){
          if(res.data.data.data.length){
            this.$toast.add({
                severity: 'success',
                summary: 'Клиент успешно добавлен!',
                detail: res.data.data.message,
                life: 3000,
            })
          }
          this.$emit('goToOffer', data)
        }else{
          this.$toast.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: res.data.data.message,
              life: 3000,
            })
        }
        
        
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
    .clients-modal__filters-input-container .d-input{
      border-radius: 20px;
    }
    .d-divider{
      margin: 0;
    }
    .catalog-filters-dates {
      padding-left: 0;
    }
    .catalog-filters-dates:before {
      display: none;
    }
  }
  &__content{
    margin-top: 54px;
    .clients__card{
      display: grid;
      gap: 20px;
      grid-template-columns: 24% 1px 12% 1px 20% 1px 12% 1px 13% 1px 40px;
      &-info-address span {
          max-width: 200px;
      }
      &-info-content {
          padding-right: 0px;
      }
    }
    .clients__card-vendor {
        margin-left: 0px;
    }
    .d-divider{
      margin:0;
    }
    .opacity--divider{
      opacity: 0;
    }
    &--column{
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: start;
      justify-content: center;
    }
  }
}
</style>
