<template>
  <Toast />
  <section class="promo sale_page shipments order_content dashboard" id="promo">
    <Loader v-if="loading" />
    <!-- Верхушка страницы -->
    <div class="d-top">
      <breadcrumbs />
    </div>
    <div class="dashboard__header">
      <div class="dashboard__header-title">
        <h1 class="dashboard__header-title-h1">
          Дашборд проекта [*придумайте название организации*]
        </h1>
        <p class="dashboard__header-title-text">
          Данный отчёт включает комплекс метрик, позволяющих оценить текущее развитие проекта,
          информация в нём обновляется автоматически в режиме реального времени
        </p>
      </div>
      <div class="dashboard__header-filters">
        <label class="dashboard__header-filters-label">Выбрать период:</label>
        <DatePicker
          v-model="this.filters.value"
          @hide="changeFilter()"
          dateFormat="dd.mm.yy"
          :placeholder="this.filters.placeholder"
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
                @click.prevent="this.filters.value = null"
              >
                Сбросить
              </button>
              <button
                class="d-button d-button-primary d-button-primary-small"
                @click.prevent="changeFilter()"
              >
                Готово
              </button>
            </div>
          </template>
        </DatePicker>
      </div>
    </div>

    <div class="dashboard__content">
      <div class="promo__cards-wrap">
        <div class="dart-row">
          <div class="d-col-md-12">
            <div class="promotions__card promotions__card--height">
              <div class="promotions__card-header">
                <div class="promotions__card-header-left">
                  <i class="d-icon-card-plus promotions__card-icon"></i>
                  <p class="promotions__card-title">Регистрации</p>
                </div>
              </div>
              <div class="promotions__card-content">
                <div class="promotions__card-values">
                  <div
                    class="promotions__card-value-container promotions__card-value-container--main"
                  >
                    <span class="promotions__card-label">Всего:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">234</p>
                      <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                    </div>
                  </div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Брендов:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">122</p>
                      <span class="promotions__card-badge promotions__card-badge-red">-2</span>
                    </div>
                  </div>
                  <div class="d-divider d-divider--vertical"></div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Оптовиков:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">34</p>
                      <span class="promotions__card-badge promotions__card-badge-null">0</span>
                    </div>
                  </div>
                  <div class="d-divider d-divider--vertical"></div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Оптовиков:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">135</p>
                      <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-col-md-12">
            <div class="promotions__card promotions__card--height">
              <div class="promotions__card-header">
                <div class="promotions__card-header-left">
                  <img class="d-icon-catalog d-icon" src="/icons/icon_integration.svg" />
                  <p class="promotions__card-title">Интеграции</p>
                </div>
              </div>
              <div class="promotions__card-content">
                <div class="promotions__card-values">
                  <div
                    class="promotions__card-value-container promotions__card-value-container--main"
                  >
                    <span class="promotions__card-label">Всего:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">234</p>
                      <span class="promotions__card-badge promotions__card-badge-null">0</span>
                    </div>
                  </div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Брендов:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">122</p>
                      <span class="promotions__card-badge promotions__card-badge-red">-2</span>
                    </div>
                  </div>
                  <div class="d-divider d-divider--vertical"></div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Оптовиков:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">34</p>
                      <span class="promotions__card-badge promotions__card-badge-null">0</span>
                    </div>
                  </div>
                  <div class="d-divider d-divider--vertical"></div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Оптовиков:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">135</p>
                      <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="promo__cards-wrap">
        <div class="dart-row">
          <div class="d-col-md-12">
            <div class="promotions__card promotions__card--height">
              <div class="promotions__card-header">
                <div class="promotions__card-header-left">
                  <img class="d-icon-catalog d-icon" src="/icons/icon_user_plus.svg" />
                  <p class="promotions__card-title">Подключение поставщиков</p>
                </div>
              </div>
              <div class="promotions__card-content">
                <div class="promotions__card-values-cont">
                  <div class="promotions__card-values">
                    <div
                      class="promotions__card-value-container promotions__card-value-container--main"
                    >
                      <span class="promotions__card-values-title">Подключили поставщика:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">234</p>
                        <span class="promotions__card-badge promotions__card-badge-red">-3</span>
                      </div>
                    </div>
                    <div class="promotions__card-value-container"></div>
                  </div>
                  <div class="promotions__card-values">
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">С поставщиками:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">122</p>
                        <span class="promotions__card-badge promotions__card-badge-red">-2</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Без поставщиков:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">34</p>
                        <span class="promotions__card-badge promotions__card-badge-null">0</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Бренды:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">135</p>
                        <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Оптовики:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">135</p>
                        <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Магазины:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">135</p>
                        <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="promotions__card-values-cont">
                  <div class="promotions__card-values">
                    <div
                      class="promotions__card-value-container promotions__card-value-container--main"
                    >
                      <span class="promotions__card-values-title">Подключили клиентов:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">234</p>
                        <span class="promotions__card-badge promotions__card-badge-red">-3</span>
                      </div>
                    </div>
                    <div class="promotions__card-value-container">
                      <button
                        class="promotions__card-value-container-button"
                        @click.prevent="
                          ((modalDashboard = true), (title = 'Подключение поставщиков'))
                        "
                      >
                        <span class="promotions__card-value-container-button-label">Еще</span>
                        <span class="promotions__card-value-container-button-badge">229</span>
                        <i
                          class="d-icon-arrow-right promotions__card-value-container-button-icon"
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div class="promotions__card-values">
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Организация1:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">122</p>
                        <span class="promotions__card-badge promotions__card-badge-red">-2</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Организация2:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">34</p>
                        <span class="promotions__card-badge promotions__card-badge-null">0</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Организация3:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">135</p>
                        <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Организация4:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">135</p>
                        <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Организация5:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">135</p>
                        <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Организация6:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">135</p>
                        <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-col-md-12">
            <div class="promotions__card promotions__card--height">
              <div class="promotions__card-header">
                <div class="promotions__card-header-left">
                  <i class="d-icon-cube promotions__card-icon"></i>
                  <p class="promotions__card-title">Заказы</p>
                </div>
              </div>
              <div class="promotions__card-content">
                <div class="promotions__card-values-cont">
                  <div class="promotions__card-values">
                    <div
                      class="promotions__card-value-container promotions__card-value-container--main"
                    >
                      <span class="promotions__card-values-title"
                        >Клиенты сделавшие заказ
                        <span class="promotions__card-values-title-grey">(впервые)</span>:</span
                      >
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">
                          234 <span class="promotions__card-values-title-grey">(233)</span>
                        </p>
                        <!-- <span class="promotions__card-badge promotions__card-badge-red">-3</span> -->
                      </div>
                    </div>
                    <div class="promotions__card-value-container">
                      <!-- <button class="promotions__card-value-container-button">
                        <span class="promotions__card-value-container-button-label">Еще</span>
                        <span class="promotions__card-value-container-button-badge">229</span>
                        <i
                          class="d-icon-arrow-right promotions__card-value-container-button-icon"
                        ></i>
                      </button> -->
                    </div>
                  </div>
                  <div class="promotions__card-values">
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Оптовики:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">122</p>
                        <span class="promotions__card-badge promotions__card-badge-red">-2</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Магазины:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">34</p>
                        <span class="promotions__card-badge promotions__card-badge-null">0</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Сумма:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">135</p>
                        <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Количество:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">135</p>
                        <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Без заказов:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">135</p>
                        <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="promotions__card-values-cont">
                  <div class="promotions__card-values">
                    <div
                      class="promotions__card-value-container promotions__card-value-container--main"
                    >
                      <span class="promotions__card-values-title">Получили заказы:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">234</p>
                        <!-- <span class="promotions__card-badge promotions__card-badge-red">-3</span> -->
                      </div>
                    </div>
                    <div class="promotions__card-value-container">
                      <button
                        class="promotions__card-value-container-button"
                        @click.prevent="((modalDashboard = true), (title = 'Заказы'))"
                      >
                        <span class="promotions__card-value-container-button-label">Еще</span>
                        <span class="promotions__card-value-container-button-badge">229</span>
                        <i
                          class="d-icon-arrow-right promotions__card-value-container-button-icon"
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div class="promotions__card-values">
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Без заказов:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">122</p>
                        <span class="promotions__card-badge promotions__card-badge-red">-2</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Организация2:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">34</p>
                        <span class="promotions__card-badge promotions__card-badge-null">0</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Организация3:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">135</p>
                        <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Организация4:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">135</p>
                        <span class="promotions__card-badge promotions__card-badge-green">+34</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <customModal v-model="modalDashboard">
      <modalDash :title="title" :tabs="tabs" @close="modalDashboard = false"></modalDash>
    </customModal>
  </section>
</template>
<script>
import breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Toast from 'primevue/toast'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import DatePicker from 'primevue/datepicker'
import { mapActions, mapGetters } from 'vuex'
import modalDash from './ui/modalDash.vue'

export default {
  name: 'DashBoard',
  components: { Loader, breadcrumbs, Toast, customModal, DatePicker, modalDash },

  data() {
    return {
      loading: false,
      filters: {
        value: '',
        placeholder: '-- --',
      },
      modalDashboard: false,
      title: '',
      tabs: {},
    }
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  methods: {
    ...mapActions({}),
    changeFilter() {
      console.log(this.filters.value)
    },
  },
  watch: {},
}
</script>
<style lang="scss">
.dashboard__header {
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 59px;
  &-title {
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-width: 687px;
    &-h1 {
      font-weight: 600;
      font-size: 24px;
      line-height: 31px;

      color: #282828;
    }
    &-text {
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;

      color: #757575;
    }
  }
  &-filters {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 16px;
    min-width: 384px;
    &-label {
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;

      color: #757575;
    }
  }
}
.dashboard {
  .p-datepicker {
    width: 100%;
  }
  .catalog-filters-dates.p-inputwrapper-focus.p-focus .p-inputtext {
    color: #fff;
    background: #282828 !important;
  }
  .catalog-filters-dates:not(.p-inputwrapper-focus) .p-inputtext {
    color: #282828 !important;
    background: #fff !important;
    border: 1px solid #75757575;
  }
  .catalog-filters-dates .p-inputtext {
    font-size: 14px;
    line-height: 18px;
    padding-block: 11px;
    padding-inline: 16px 22px;
    border: none;
    border-radius: 53px;
    box-shadow: none;
    cursor: pointer;
  }
  .catalog-filters-dates.p-inputwrapper-focus.p-focus .p-inputtext::placeholder {
    font-size: 14px;
    line-height: 18px;
    font-weight: 500;
    color: #fff;
  }
  .catalog-filters-dates .p-inputtext::placeholder {
    font-size: 14px;
    line-height: 18px;
    color: #282828;
    font-weight: 500;
  }
  .catalog-filters-dates.p-inputwrapper-focus.p-focus .p-datepicker-input-icon-container {
    color: #fff;
  }
  .catalog-filters-dates .p-datepicker-input-icon-container {
    color: #282828;
    padding-left: 14px;
    padding-right: 4px;
    display: flex;
    align-items: center;
    height: 16px;
  }
  .catalog-filters-dates .p-datepicker-input-icon-container .p-icon {
    width: 12px;
    height: 14px;
  }
  .catalog-filters-dates .p-datepicker-input-icon-container::before {
    content: '';
    width: 1px;
    height: 11px;
    background-color: #757575;
    display: block;
    position: absolute;
    top: 3px;
    left: 0;
  }

  .p-datepicker-day-selected-range {
    color: #fff !important;
  }
}
.catalog-filters-dates-overlay-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  padding: 8px 0;
}
.catalog-filters-dates-overlay-footer button {
  width: 100%;
  box-shadow: none;
}
.sale_page .dashboard__content {
  .d-divider {
    height: 8px;
  }
  .dart-row {
    margin-bottom: 40px;
    gap: 24px;
    .d-col-md-12 {
      width: calc(50% - 12px);
      padding: 0;
    }
  }
  .promo__cards-wrap {
    & + .promo__cards-wrap {
      margin-top: 16px;
    }
    .dart-row {
      margin-left: 0;
      margin-right: 0;
    }
  }

  .promotions__card {
    height: auto;
    box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);

    &.promotions__card--height {
      height: 100%;
    }
    & + .promotions__card {
      margin-top: 16px;
    }
    &-header {
      border-radius: 12px 12px 0 0;
      border-bottom: none;
      &-left {
        gap: 16px;
      }
      .promotions__card-icon {
        color: #757575;
        font-weight: 500;
        font-size: 19px;
      }
      .d-icon-catalog {
        width: auto;
        height: 19px;
      }
      .promotions__card-title {
        font-weight: 600;
        font-size: 20px;
        line-height: 26px;

        letter-spacing: -0.01em;
      }
    }

    &-content {
      .promotions__card-values {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 0;
        &-title {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;

          color: #282828;
          &-grey {
            color: #757575;
          }
        }
        .promotions__card-value-container {
          gap: 8px;
          &-item {
            display: flex;
          }
          &-button {
            padding: 9px 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background-color: #ededed;
            border-radius: 23px;
            height: 40px;
            min-height: 40px;
            max-height: 40px;
            transition: all 0.2s ease;
            &-label {
              font-weight: 500;
              font-size: 16px;
              line-height: 21px;
              color: #282828;
              transition: all 0.2s ease;
            }
            &-badge {
              background-color: transparent;
              border: 1px solid #282828;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 2px 8px;
              font-weight: 400;
              font-size: 16px;
              line-height: 16px;
              color: #282828;
              border-radius: 20px;
              transition: all 0.2s ease;
            }
            &-icon {
              font-size: 16px;
              width: 16px;
              height: 16px;
              color: #282828;
              transition: all 0.2s ease;
            }
          }
          &-button:hover {
            background-color: #282828;
          }
          &-button:hover .promotions__card-value-container-button-label {
            color: #fff;
          }
          &-button:hover .promotions__card-value-container-button-badge {
            background-color: #fff;
            border: 1px solid #282828;
          }
          &-button:hover .promotions__card-value-container-button-icon {
            color: #fff;
          }
          .promotions__card-label {
            color: #757575;
            font-size: 14px;
            margin-bottom: 0px;
            font-weight: 400;
            line-height: 18px;
          }
          .promotions__card-value {
            font-weight: 600;
            font-size: 16px;
            line-height: 21px;
            color: #282828;
          }
          .promotions__card-badge {
            padding: 1.5px 0;
            border-radius: 0px;
            font-weight: 500;
            font-size: 14px;
            line-height: 18px;
          }
          .promotions__card-value-container-item {
            align-items: center;
            gap: 16px;
          }
          .promotions__card-badge-green {
            background-color: transparent;
            color: #549d15;
          }
          .promotions__card-badge-null {
            background-color: transparent;
            color: #bb7900;
          }
          .promotions__card-badge-red {
            background-color: transparent;
            color: #f92c0d;
          }
        }
        .promotions__card-value-container--main {
          .promotions__card-value {
            font-weight: 600;
            font-size: 32px;
            line-height: 42px;
            letter-spacing: -0.01em;
            color: #282828;
          }
          .promotions__card-badge {
            padding: 0px 8px;
            border-radius: 30px;
            font-weight: 500;
            font-size: 14px;
            line-height: 18px;
          }
          .promotions__card-value-container-item {
            align-items: start;
            gap: 8px;
          }
          .promotions__card-badge-green {
            background-color: #e7f9d4;
            color: #549d15;
          }
          .promotions__card-badge-null {
            background-color: #f9efcb;
            color: #bb7900;
          }
          .promotions__card-badge-red {
            background-color: #fde1dd;
            color: #f92c0d;
          }
        }
      }
      .promotions__card-values-cont {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      .promotions__card-values-cont:not(:first-child) {
        border-top: 0.5px solid #75757575;
        margin-top: 32px;
        padding-top: 22px;
      }
    }
  }
}

@media (width <= 1200px) {
  .promo__card-block-description,
  .promo__cards-item-conds-value-total {
    font-size: 14px;
  }
  .promotions__card-header {
    border-radius: 6px 6px 0 0;
  }
  .promo__cards-item-date-values {
    flex-direction: column;
    gap: 12px;
  }
  .promo__cards-date-container .d-fractions__item {
    min-width: 100px;
  }
}
@media (width <= 800px) {
  .promo__cards-item-values {
    gap: 24px;
  }
  .promo__cards-date-container .d-fractions__item {
    min-width: 70px;
  }
  .promo__cards-item-date-values {
    flex-direction: row;
    gap: 12px;
  }
  .promo__cards-item-date-values .promo__cards-item-conds-value {
    gap: 12px;
  }
}
.promo-master__footer {
  position: fixed;
  bottom: 0;
  left: 0;
}
.promo-master__content {
  padding-bottom: 60px;
}
.promo-master {
  padding-top: 115px;
}
.promo-modal__header {
  position: absolute;
  z-index: 1001;
}
.promotions .promotions__card,
.promotions .promotions__card-container {
  height: 100%;
}
.sale_seeall-button {
  width: 100%;
  margin: 40px 0 24px;
  display: flex;
  justify-content: end;
  align-items: center;
}
.sale_seeall-button p {
  color: #757575;
  width: 35%;
}
@media (width <= 780px) {
  .promo .v-table {
    display: block;
  }
}
</style>
