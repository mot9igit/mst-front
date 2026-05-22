<template>
  <Toast />
  <section class="promo sale_page shipments order_content dashboard" id="promo">
    <Loader v-if="loading" />
    <!-- Верхушка страницы -->
    <div class="d-top">
      <breadcrumbs />
    </div>
    <div class="realization__header">
      <div class="realization__header-title">
        <h1 class="realization__header-title-h1">Отчет по реализации</h1>
      </div>
      <div class="realization__header-filters"></div>
    </div>

    <Tabs class="realization__tabs">
      <TabList class="d-tab2__container collection__tabs">
        <Tab class="d-tab2" :class="{ 'd-tab2--active': !tabException }" :value="tabException">
          <button class="collection__tabs-link" @click.prevent="tabException = false">
            <span>Процессинг</span>
          </button>
        </Tab>
        <Tab class="d-tab2" :class="{ 'd-tab2--active': tabException }" :value="tabException">
          <button class="collection__tabs-link" @click.prevent="tabException = true">
            <span>Отчет по клиентам</span>
          </button>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel v-if="!tabException">
          <div class="realization">
            <div class="realization__filters">
              <div
                v-for="(item, index) in filters_process"
                :key="index"
                class="realization__filters-item"
              >
                <div class="realization__filters-item-container" v-if="item.type == 'text'">
                  <label :for="item.name">{{ item.label }}</label>
                  <div class="p-inputtext__wrapper">
                    <InputText
                      :id="item.name"
                      :name="item.name"
                      v-model="form.filters_process[item.name]"
                      :placeholder="item.placeholder"
                      @update:modelValue="changeFilter()"
                    />
                  </div>
                </div>
                <div class="realization__filters-item-container" v-else-if="item.type == 'dates'">
                  <label :for="item.name">{{ item.label }}</label>
                  <DatePicker
                    v-model="form.filters_process[item.name]"
                    @hide="changeFilter()"
                    dateFormat="dd.mm.yy"
                    :placeholder="item.placeholder"
                    :manualInput="false"
                    :maxDate="date_now"
                    showIcon
                    showClear
                    iconDisplay="input"
                    selectionMode="range"
                    class="realization__filters-item-container-dates"
                    :id="item.name"
                    :name="item.name"
                  >
                    <template #footer>
                      <div class="realization__filters-item-container-dates-footer">
                        <button
                          class="d-button d-button-primary d-button-primary-small d-button-clear-dates"
                          @click.prevent="form.filters_process[item.name] = null"
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
                <div class="realization__filters-item-container" v-else-if="item.type == 'tree'">
                  <label :for="item.name">{{ item.label }}</label>
                  <TreeSelect
                    v-model="form.filters_process[item.name]"
                    :multiple="true"
                    :options="item.value"
                    :placeholder="item.placeholder"
                    valueFormat="id"
                    :limit="1"
                    :limitText="(count) => `и еще ${count}`"
                    @select="changeFilter"
                    @deselect="changeFilter"
                  />
                </div>
                <div class="realization__filters-item-container" v-else>{{ item.label }}</div>
              </div>
            </div>
            <div class="realization__badges">
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">Товаров на реализации:</div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">123123123 ₽</div>
                  <div class="realization__badges-item-values-value_col">за 12312 товара</div>
                </div>
              </div>
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">Продано товаров:</div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">123</div>
                  <div class="realization__badges-item-values-value_col"></div>
                </div>
              </div>
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">Выплачено:</div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">123123123 ₽</div>
                  <div class="realization__badges-item-values-value_col"></div>
                </div>
              </div>
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">
                  <span class="red-round-thing"></span>К выплате:
                </div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">123123123 ₽</div>
                  <div class="realization__badges-item-values-value_col"></div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel v-else>
          <div class="realization">
            <div class="realization__filters">
              <div
                v-for="(item, index) in filters_clients"
                :key="index"
                class="realization__filters-item"
              >
                <div class="realization__filters-item-container" v-if="item.type == 'text'">
                  <label :for="item.name">{{ item.label }}</label>
                  <div class="p-inputtext__wrapper">
                    <InputText
                      :id="item.name"
                      :name="item.name"
                      v-model="form.filters_clients[item.name]"
                      :placeholder="item.placeholder"
                      @update:modelValue="changeFilter()"
                    />
                  </div>
                </div>
                <div class="realization__filters-item-container" v-else-if="item.type == 'dates'">
                  <label :for="item.name">{{ item.label }}</label>
                  <DatePicker
                    v-model="form.filters_clients[item.name]"
                    @hide="changeFilter()"
                    dateFormat="dd.mm.yy"
                    :placeholder="item.placeholder"
                    :manualInput="false"
                    :maxDate="date_now"
                    showIcon
                    showClear
                    iconDisplay="input"
                    selectionMode="range"
                    class="realization__filters-item-container-dates"
                    :id="item.name"
                    :name="item.name"
                  >
                    <template #footer>
                      <div class="realization__filters-item-container-dates-footer">
                        <button
                          class="d-button d-button-primary d-button-primary-small d-button-clear-dates"
                          @click.prevent="form.filters_clients[item.name] = null"
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
                <div class="realization__filters-item-container" v-else-if="item.type == 'tree'">
                  <label :for="item.name">{{ item.label }}</label>
                  <TreeSelect
                    v-model="form.filters_clients[item.name]"
                    :multiple="true"
                    :options="item.value"
                    :placeholder="item.placeholder"
                    valueFormat="id"
                    :limit="1"
                    :limitText="(count) => `и еще ${count}`"
                    @select="changeFilter"
                    @deselect="changeFilter"
                  />
                </div>
                <div class="realization__filters-item-container" v-else-if="item.type == 'switch'">
                  <div class="realization__filters-item-container-switch">
                    <div
                      class="d-switch catalog-filter-switch"
                      @click="form.filters_clients[item.name] = !form.filters_clients[item.name]"
                    >
                      <input
                        type="checkbox"
                        binary="true"
                        class="d-switch__input"
                        v-model="form.filters_clients[item.name]"
                        :id="'catalog-' + index"
                      />
                      <div class="d-switch__circle"></div>
                    </div>
                    <label
                      :for="'catalog-' + index"
                      class="catalog-top_filters-label catalog-filter-switch-lable"
                      >{{ item.label }}
                    </label>
                  </div>
                </div>
                <div class="realization__filters-item-container" v-else>{{ item.label }}</div>
              </div>
            </div>
            <div class="realization__badges">
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">Товаров на реализации:</div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">123123123 ₽</div>
                  <div class="realization__badges-item-values-value_col">за 12312 товара</div>
                </div>
              </div>
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">Продано товаров:</div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">123</div>
                  <div class="realization__badges-item-values-value_col"></div>
                </div>
              </div>
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">Выплачено:</div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">123123123 ₽</div>
                  <div class="realization__badges-item-values-value_col"></div>
                </div>
              </div>
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">
                  <span class="red-round-thing"></span>К выплате:
                </div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">123123123 ₽</div>
                  <div class="realization__badges-item-values-value_col"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="realization__orders">
            <div class="realization__orders-item" v-for="(client, index) in orgOrders" :key="index">
              <div class="realization__orders-item-row">
                <div
                  class="realization__orders-item-cell"
                  v-for="(item, ind) in table_clients"
                  :key="ind"
                  :class="item.class"
                >
                  <div class="realization__orders-item-cell-title">{{ item.label }}</div>
                  <div class="realization__orders-item-cell-content">
                    <div class="realization__orders-item-cell-content-img" v-if="item.items">
                      <img
                        class="realization__orders-item-cell-content-img-image"
                        :src="client[item.items[0]]"
                      />
                    </div>
                    <div class="realization__orders-item-cell-content-lable">
                      {{ item.items ? client[item.items[1]] : client[ind] }}
                    </div>
                  </div>
                </div>
                <div class="realization__orders-item-cell">
                  <div class="realization__orders-item-cell-content">
                    <i
                      class="d-icon d-icon-angle-rounded-sm-top realization__orders-item-cell-content-icon"
                      :class="{ 'realization__orders-item-cell-content-icon': active[index] }"
                      @click.prevent="
                        index in active ? (active[index] = !active[index]) : (active[index] = true)
                      "
                    ></i>
                  </div>
                </div>
              </div>
              <div
                class="realization__orders-item-row realization__orders-item-row--table"
                v-if="active[index]"
              >
                Тут таблица
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <customModal v-model="modalMap">
      <YandexMap></YandexMap>
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
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import TreeSelect from '@zanmato/vue3-treeselect'
import '@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css'
import Slider from 'primevue/slider'
import YandexMap from '@/shared/ui/map/MapComplex.vue'
import Tabs from 'primevue/tabs'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import TabList from 'primevue/tablist'

export default {
  name: 'RealizationReport',
  components: {
    Loader,
    breadcrumbs,
    Toast,
    customModal,
    DatePicker,
    InputText,
    FloatLabel,
    Slider,
    TreeSelect,
    YandexMap,
    Tabs,
    TabPanels,
    TabPanel,
    TabList,
  },

  data() {
    return {
      loading: false,
      tabException: false,
      filters_process: [
        {
          name: 'period',
          type: 'dates',
          label: 'Период',
          placeholder: '-- --',
          value: '',
        },
        {
          name: 'clients',
          type: 'tree',
          label: 'Клиент',
          placeholder: 'Все',
          value: '',
        },
        {
          name: 'name',
          type: 'text',
          label: 'Товар',
          placeholder: 'Название или артикул',
          value: '',
        },
        {
          name: 'operation',
          type: 'tree',
          label: 'Операция',
          placeholder: 'Все',
          value: [
            {
              id: 1,
              key: 1,
              data: 'Поставка',
              label: 'Поставка',
            },
            {
              id: 2,
              key: 2,
              data: 'Продажа',
              label: 'Продажа',
            },
            {
              id: 3,
              key: 3,
              data: 'Выплата',
              label: 'Выплата',
            },
          ],
        },
        {
          name: 'order_id',
          type: 'text',
          label: 'Номер заказа',
          placeholder: 'Номер',
          value: '',
        },
      ],
      filters_clients: [
        {
          name: 'period',
          type: 'dates',
          label: 'Период',
          placeholder: '-- --',
          value: '',
        },
        {
          name: 'clients',
          type: 'tree',
          label: 'Клиент',
          placeholder: 'Все',
          value: '',
        },
        {
          name: 'region',
          type: 'tree',
          label: 'Регион клиента',
          placeholder: 'Все',
          value: '',
        },
        {
          name: 'order_id',
          type: 'text',
          label: 'Номер заказа',
          placeholder: 'Номер',
          value: '',
        },
        {
          name: 'debt',
          type: 'switch',
          label: 'Только с долгами',
          placeholder: 'Только с долгами',
          value: false,
        },
      ],
      table_process: {
        date: {
          label: 'Дата',
          type: 'text',
          class: 'cell_centeralign',
        },
        // seller_name: {
        //   label: 'Поставщик',
        //   type: 'text',
        //   class: 'cell_centeralign',
        // },
        buyer_name: {
          label: 'Клиент',
          type: 'text',
          class: 'cell_centeralign',
        },
        order_id: {
          label: 'Заказ',
          type: 'text',
          class: 'cell_centeralign',
        },
        name: {
          label: 'Товар',
          type: '',
          class: '',
          items: ['article', 'name'],
        },
        operation: {
          label: 'Операция',
          type: 'text',
          class: 'cell_centeralign',
        },
        operation_cost: {
          label: 'Цена поставки',
          type: 'text',
          class: 'cell_centeralign',
        },
        count: {
          label: 'Количество',
          type: 'text',
          class: 'cell_centeralign',
        },
        cost: {
          label: 'Сумма',
          type: 'text',
          class: 'cell_centeralign',
        },
      },
      table_clients: {
        seller_name: {
          label: 'Поставщик:',
          items: ['seller_image', 'seller_name'],
          class: 'seller--cell',
        },
        buyer_name: {
          label: 'Поставщик:',
          items: ['buyer_image', 'buyer_name'],
          class: 'buyer--cell',
        },
        all_cost: {
          label: 'Товаров на реализации:',
          class: 'cost--cell',
        },
        all_credit: {
          label: 'К выплате:',
          class: 'credit--cell',
        },
      },
      table_clients_orders: {
        order_id: {
          label: 'Заказ',
          type: 'text',
          class: 'cell_centeralign',
        },
        delivery_date: {
          label: 'Дата отгрузки',
          type: 'text',
          class: 'cell_centeralign',
        },
        cost: {
          label: 'Сумма заказа',
          type: 'text',
          class: 'cell_centeralign',
        },
        realization: {
          label: 'Объем реализации',
          type: '',
          class: '',
          items: ['saled_rub', 'saled_percent'],
        },
        dzkz: {
          label: 'Объем выплат',
          type: '',
          class: '',
          items: ['credit_summ', 'debet_summ'],
        },
        actions: {
          label: '',
          type: 'actions',
          sort: false,
          class: 'd-col-2 right-align',
          available: {
            view: {
              icon: 'd-icon-pen2',
              label: 'Подробнее',
            },
          },
        },
      },
      form: {
        filters_process: {
          period: [],
          clients: [],
          name: '',
          operation: [],
          order_id: [],
        },
        filters_clients: {
          period: [],
          clients: [],
          debt: false,
          region: [],
          order_id: [],
        },
      },
      active: {},
      modalMap: false,
      orgOrders: [
        {
          seller_name: '123123',
          buyer_name: '234234',
          seller_image: 'https://dev.mst.tools/assets/content/images/shops_logo/spo-logo.png',
          buyer_image: 'https://dev.mst.tools/assets/content/images/shops_logo/spo-logo.png',
          all_cost: '123123 ₽',
          all_credit: '1231 ₽',
          items: [
            {
              order_id: '121',
              delivery_date: '23.01.2026',
              cost: '5 678 ₽',
              saled_rub: '5 000 ₽',
              saled_percent: '90%',
              credit_summ: '5 678 ₽ (100%)',
              debet_summ: '5 000 ₽ (90%)',
            },
            {
              order_id: '122',
              delivery_date: '23.01.2026',
              cost: '5 678 ₽',
              saled_rub: '5 000 ₽',
              saled_percent: '90%',
              credit_summ: '5 678 ₽ (100%)',
              debet_summ: '5 000 ₽ (90%)',
            },
            {
              order_id: '123',
              delivery_date: '23.01.2026',
              cost: '5 678 ₽',
              saled_rub: '5 000 ₽',
              saled_percent: '90%',
              credit_summ: '5 678 ₽ (100%)',
              debet_summ: '5 000 ₽ (90%)',
            },
          ],
        },
        {
          seller_name: 'xcv',
          buyer_name: 'dsfg',
          seller_image: 'https://dev.mst.tools/assets/content/images/shops_logo/spo-logo.png',
          buyer_image: 'https://dev.mst.tools/assets/content/images/shops_logo/spo-logo.png',
          all_cost: '123123 ₽',
          all_credit: '1231 ₽',
          items: [
            {
              order_id: '121',
              delivery_date: '23.01.2026',
              cost: '5 678 ₽',
              saled_rub: '5 000 ₽',
              saled_percent: '90%',
              credit_summ: '5 678 ₽ (100%)',
              debet_summ: '5 000 ₽ (90%)',
            },
            {
              order_id: '122',
              delivery_date: '23.01.2026',
              cost: '5 678 ₽',
              saled_rub: '5 000 ₽',
              saled_percent: '90%',
              credit_summ: '5 678 ₽ (100%)',
              debet_summ: '5 000 ₽ (90%)',
            },
            {
              order_id: '123',
              delivery_date: '23.01.2026',
              cost: '5 678 ₽',
              saled_rub: '5 000 ₽',
              saled_percent: '90%',
              credit_summ: '5 678 ₽ (100%)',
              debet_summ: '5 000 ₽ (90%)',
            },
          ],
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      organizations: 'addition/organizations',
      regions: 'addition/regions',
    }),
  },
  mounted() {
    this.getRegions({ exclude: '', filter: '' })
    this.getOrganizations({ exclude: '', filter: '' })
  },
  methods: {
    ...mapActions({
      getOrganizations: 'addition/getOrganizations',
      getRegions: 'addition/getRegions',
    }),
    changeFilter() {
      console.log(this.filters)
    },
  },
  watch: {
    organizations: function (newVal) {
      if (newVal) {
        for (var i in this.filters_process) {
          if (this.filters_process[i].name == 'clients') {
            this.filters_process[i].value = newVal
          }
        }
        for (var ii in this.filters_clients) {
          if (this.filters_clients[ii].name == 'clients') {
            this.filters_clients[ii].value = newVal
          }
        }
      }
    },
    regions: function (newVal) {
      if (newVal) {
        for (var i in this.filters_clients) {
          if (this.filters_clients[i].name == 'region') {
            this.filters_clients[i].value = newVal
          }
        }
      }
    },
  },
}
</script>
<style lang="scss">
.realization__header {
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
.realization__tabs {
  .collection__tabs {
    margin-bottom: 24px;
  }
  .d-tab2__container {
    background-color: transparent;
    gap: 16px;
    border: none;
    padding: 0;
  }
  .p-tablist-tab-list {
    background-color: transparent;
    gap: 16px;
    border: none;
    .d-tab2 {
      background: #ededed;
      border-radius: 24px;

      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      height: 40px;
      color: #282828;
    }
    .d-tab2--active {
      background-color: #282828;
      color: #fff;
    }
  }
  .p-tabpanels {
    padding: 0;
  }
}

.realization {
  &__filters {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    gap: 36px 32px;
    align-items: end;
    &-item {
      width: 100%;
      height: auto;
      &-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
        .p-inputtext {
          width: 100%;
          font-size: 14px;
          line-height: 18px;
          color: #282828;
          background: #fff;
          padding-block: 10px;
          padding-inline: 16px 40px;
          border: 1px solid #75757575;
          border-radius: 40px;
          box-shadow: none;
          position: relative;
        }
        .p-inputtext__wrapper {
          position: relative;
          width: 100%;
          height: 40px;
        }

        .p-inputtext__wrapper:after {
          content: '\e01d';
          font-family: 'Iconly' !important;
          position: absolute;
          font-size: 14px;
          top: calc(50% - 7px);
          right: 21px;
        }
        .p-floatlabel:has(input.p-filled) label,
        .p-floatlabel:has(textarea.p-filled) label,
        .p-floatlabel:has(.p-inputwrapper-filled) label {
          color: #757575;
        }
        .p-inputtext:enabled:hover {
          border-color: #75757575;
        }
        .p-datepicker {
          width: 100%;
        }
        .p-inputtext::placeholder {
          color: #757575;
          font-weight: 500;
        }
        .p-datepicker-input-icon-container {
          color: #282828;
          svg {
            width: auto;
            height: 14px;
            padding-right: 8px;
          }
        }
        .vue3-treeselect {
          height: 40px;
          span {
            max-width: 130px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &__control {
            height: 40px;
            border: 1px solid #75757575;
            border-radius: 20px;
          }
          &__multi-value-item {
            background: #ededed;
            border: 1px solid transparent;
            border-radius: 20px;
            color: #282828;

            font-size: 12px;
            padding: 5px;
            vertical-align: middle;
          }
          &__value-remove {
            border-left: 1px solid #ededed;
            color: #282828;
          }
          &__limit-tip-text {
            color: #757575;
            font-weight: 400;
          }
          &__limit-tip {
            padding-top: 8px;
          }
          &__placeholder {
            padding-left: 9px;
            line-height: 40px;
            font-size: 14px;
            color: #757575;
            font-weight: 500;
          }
          &__control-arrow {
            color: #282828;
          }
        }
        .vue3-treeselect:not(.vue3-treeselect--disabled):not(.vue3-treeselect--focused)
          .vue3-treeselect__control:hover {
          border-color: #75757575;
        }

        .p-slider {
          height: 1px;
          min-height: 1px;
          max-height: 1px;
          width: 86%;
          margin-left: 7%;
          &-range {
            background-color: #f92c0d;
            height: 1px;
            min-height: 1px;
            max-height: 1px;
          }
        }
        label {
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          color: #757575;
        }
        &-switch {
          display: flex;
          align-items: center;
          gap: 16px;
          height: 40px;
        }
      }

      &-map_button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        background-color: #282828;
        color: #fff;
        font-size: 16px;
        line-height: 21px;
        box-shadow: none;
        border: 1px solid #282828;
        height: 40px;
        img {
          width: 16px;
          height: 16px;
        }
      }
      &-map_button:hover {
        background-color: transparent;
        color: #282828;
        img {
          filter: brightness(0.1);
        }
      }
    }
  }

  &__badges {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    gap: 24px;
    align-items: start;
    margin-top: 60px;
    &-item {
      width: 100%;
      background: #ededed;
      border-radius: 16px;
      padding: 32px;
      &-title {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #757575;
        display: flex;
        gap: 8px;
        align-items: center;
        .red-round-thing {
          width: 14px;
          height: 14px;
          border-radius: 14px;

          background: #ff715b;
        }
      }
      &-values {
        display: flex;
        gap: 16px;
        align-items: center;
        margin-top: 16px;
        &-value_rub {
          font-weight: 600;
          font-size: 24px;
          line-height: 31px;

          color: #282828;
        }
        &-value_col {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;

          color: #757575;
        }
      }
    }
  }
  &__orders {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-top: 64px;

    &-item {
      width: 100%;
      height: auto;
      min-height: 90px;
      background: #ededed;
      border-radius: 19px;
      padding: 16px 31px;
      transition: all 0.2s ease;

      &-row {
        display: flex;
        gap: 0;
        align-items: start;
        justify-content: space-between;
      }
      &-cell {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: start;
        justify-content: start;
        &-title {
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;

          color: #757575;
        }
        &-content {
          display: flex;
          gap: 16px;
          align-items: center;
          justify-content: start;
          &-img {
            width: 24px;
            height: 24px;
            aspect-ratio: 1;
          }
          &-lable {
            font-weight: 600;
            font-size: 16px;
            line-height: 21px;
            font-weight: 600;
            color: #282828;
          }
        }
      }
    }
  }
}
.realization__orders-item-row:first-child .realization__orders-item-cell:first-child {
  padding: 0 31px 0 0;
}
.realization__orders-item-row:first-child .realization__orders-item-cell:last-child {
  padding: 0 0 0 31px;
}
.realization__orders-item-row:first-child .realization__orders-item-cell {
  padding: 0 31px;
  position: relative;
}
.realization__orders-item-row:first-child .realization__orders-item-cell:not(:last-child):after {
  position: absolute;
  top: 50%;
  right: 0;
  translate: 0 -50%;
  width: 0.5px;
  height: 16px;
  background-color: rgba(117, 117, 117, 0.4588235294);
}
.realization__filters-item-container-dates-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  .d-button {
    width: 100%;
    box-shadow: none;
  }
}
</style>
