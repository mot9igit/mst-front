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
                  <div class="realization__badges-item-values-value_rub">
                    {{ realization.total_remains_cost }} ₽
                  </div>
                  <div class="realization__badges-item-values-value_col">
                    за {{ realization.total_remains }} тов.
                  </div>
                </div>
              </div>
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">Продано товаров:</div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">
                    {{ realization.total_orders }}
                  </div>
                  <div class="realization__badges-item-values-value_col"></div>
                </div>
              </div>
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">Выплачено:</div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">
                    {{ realization.total_payed }} ₽
                  </div>
                  <div class="realization__badges-item-values-value_col"></div>
                </div>
              </div>
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">
                  <span class="red-round-thing"></span>К выплате:
                </div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">
                    {{ realization.total_debt }} ₽
                  </div>
                  <div class="realization__badges-item-values-value_col"></div>
                </div>
              </div>
            </div>
            <div class="realization__process-table">
              <BaseTable
                :items_data="realization_process.processes"
                :total="realization_process.total"
                :table_data="table_process"
                :pagination_items_per_page="this.pagination_items_per_page_process"
                :pagination_offset="this.pagination_offset_process"
                :page="this.pageProcess"
                @paginate="paginateProcess"
              ></BaseTable>
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
                      @update:modelValue="changeFilterClients()"
                    />
                  </div>
                </div>
                <div class="realization__filters-item-container" v-else-if="item.type == 'dates'">
                  <label :for="item.name">{{ item.label }}</label>
                  <DatePicker
                    v-model="form.filters_clients[item.name]"
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
                          @click.prevent="changeFilterClients()"
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
                    @select="changeFilterClients()"
                    @deselect="changeFilterClients()"
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
            <div class="realization__badges" v-if="realization.clients">
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">Товаров на реализации:</div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">
                    {{ realization.total_remains_cost }} ₽
                  </div>
                  <div class="realization__badges-item-values-value_col">
                    за {{ realization.total_remains }} тов.
                  </div>
                </div>
              </div>
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">Продано товаров:</div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">
                    {{ realization.total_orders }}
                  </div>
                  <div class="realization__badges-item-values-value_col"></div>
                </div>
              </div>
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">Выплачено:</div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">
                    {{ realization.total_payed }} ₽
                  </div>
                  <div class="realization__badges-item-values-value_col"></div>
                </div>
              </div>
              <div class="realization__badges-item">
                <div class="realization__badges-item-title">
                  <span class="red-round-thing"></span>К выплате:
                </div>
                <div class="realization__badges-item-values">
                  <div class="realization__badges-item-values-value_rub">
                    {{ realization.total_debt }} ₽
                  </div>
                  <div class="realization__badges-item-values-value_col"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="realization__orders" v-if="realization.clients">
            <div
              class="realization__orders-item"
              v-for="(client, index) in realization.clients"
              :key="index"
            >
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
                      :class="{
                        'realization__orders-item-cell-content-icon--active': active[index],
                      }"
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
                <BaseTable
                  :items_data="client.items"
                  :total="client.total"
                  :table_data="table_clients_orders"
                  @viewElem="showModalOrder"
                  :pagination_items_per_page="this.pagination_items_per_page_orders"
                  :pagination_offset="this.pagination_offset_orders"
                  :page="this.pageOrders"
                  @paginate="paginateOrders"
                ></BaseTable>
              </div>
            </div>
          </div>
          <div v-else class="realization__nofound">
            <div class="dart-alert dart-alert-info">Ничего не найдено</div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <customModal v-model="modalOrder">
      <div class="realization__modal" v-if="this.modalOrderData">
        <div class="realization__modal-header">
          <div class="realization__modal-header-title">Заказ {{ modalOrderData.order_id }}</div>
          <div class="realization__modal-header-date">
            Дата отгрузки: {{ modalOrderData.delivery_date }}
          </div>
        </div>
        <div class="realization__modal-top">
          <div class="realization__modal-top-item">
            <div class="realization__modal-top-item-title">Товаров на реализации:</div>
            <div class="realization__modal-top-item-cont">
              <div class="realization__modal-top-item-cont-value">
                {{ modalOrderData.total_real_rub }}
              </div>
              <div class="realization__modal-top-item-cont-label">
                {{ modalOrderData.total_real_col }} тов.
              </div>
            </div>
          </div>
          <div class="realization__modal-top-item">
            <div class="realization__modal-top-item-title">К выплате:</div>
            <div class="realization__modal-top-item-cont">
              <div class="realization__modal-top-item-cont-value">
                {{ modalOrderData.debet }}
              </div>
              <div class="realization__modal-top-item-cont-label">
                {{ modalOrderData.debet_col }} тов.
              </div>
            </div>
          </div>
        </div>
        <div class="realization__modal-table">
          <BaseTable
            :items_data="modalOrderData.products"
            :total="modalOrderData.total"
            :table_data="table_clients_products"
            :pagination_items_per_page="this.pagination_items_per_page_products"
            :pagination_offset="this.pagination_offset_products"
            :page="this.pageProducts"
            @paginate="paginateProducts"
          ></BaseTable>
        </div>
        <div class="realization__modal-button">
          <button
            type="button"
            href="#"
            class="d-button d-button-primary d-button--sm-shadow"
            @click.prevent="((modalOrder = false), (modalOrderData = {}))"
          >
            Ok
          </button>
        </div>
      </div>
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
import TreeSelect from '@zanmato/vue3-treeselect'
import '@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css'
import Tabs from 'primevue/tabs'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import TabList from 'primevue/tablist'
import BaseTable from '@/shared/ui/table/table.vue'

export default {
  name: 'RealizationReport',
  components: {
    Loader,
    breadcrumbs,
    Toast,
    customModal,
    DatePicker,
    InputText,
    TreeSelect,
    Tabs,
    TabPanels,
    TabPanel,
    TabList,
    BaseTable,
  },

  data() {
    return {
      loading: true,
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
          type: 'text-product-items',
          class: 'cell_centeralign',
          items: ['article', 'name'],
        },
        operation: {
          label: 'Операция',
          type: 'text',
          class: 'cell_centeralign nowrap',
        },
        operation_cost: {
          label: 'Цена поставки',
          type: 'text',
          class: 'cell_centeralign nowrap',
        },
        count: {
          label: 'Количество',
          type: 'text',
          class: 'cell_centeralign',
        },
        cost: {
          label: 'Сумма',
          type: 'text',
          class: 'cell_centeralign nowrap',
        },
      },
      table_clients: {
        seller_name: {
          label: 'Поставщик:',
          items: ['seller_image', 'seller_name'],
          class: 'seller--cell',
        },
        buyer_name: {
          label: 'Покупатель:',
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
          class: 'cell_centeralign nowrap',
        },
        realization: {
          label: 'Объем реализации',
          type: 'text-items',
          class: 'cell_centeralign nowrap',
          items: ['saled_rub', 'saled_percent'],
        },
        dzkz: {
          label: 'Объем выплат',
          type: 'text-dzkz-items',
          class: 'cell_centeralign nowrap',
          items: ['credit_summ', 'debet_summ'],
        },
        actions: {
          label: '',
          type: 'actions',
          sort: false,
          class: 'cell_centeralign realization-orders-table-button',
          available: {
            view: {
              icon: 'd-icon-arrow-right',
              label: 'Подробнее',
              show_label: true,
            },
          },
        },
      },
      table_clients_products: {
        image: {
          label: 'Фото',
          type: 'image',
          class: 'cell_centeralign',
        },
        name: {
          label: 'Наименование',
          type: 'text',
          class: 'cell_centeralign',
        },
        article: {
          label: 'Артикул',
          type: 'text',
          class: 'cell_centeralign',
        },
        count: {
          label: 'Количество',
          type: 'text',
          class: 'cell_centeralign',
        },
        price: {
          label: 'Цена',
          type: 'text',
          class: 'cell_centeralign nowrap',
        },
        cost: {
          label: 'Сумма',
          type: 'text',
          class: 'cell_centeralign nowrap',
        },
        saled: {
          label: 'Продано',
          type: 'text',
          class: 'cell_centeralign',
        },
        no_saled: {
          label: 'Остаток',
          type: 'text',
          class: 'cell_centeralign',
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
      pageProcess: 1,
      pageOrders: 1,
      pageProducts: 1,
      modalOrder: false,
      modalOrderData: {},

      // подставные данные, удалить
      processOrders: {
        total: 7,
        items: [
          {
            date: '10.05.2025',
            buyer_name: '220 вольт',
            name: '672.1.0.00 Безударная дрель ИНТЕРСКОЛ Д-10/420ЭР ',
            operation: 'Все',
            order_id: '123',
            operation_cost: '1000 ₽',
            count: '3',
            cost: '3000 ₽',
          },
          {
            date: '10.05.2025',
            buyer_name: '220 вольт',
            name: '672.1.0.00 Безударная дрель ИНТЕРСКОЛ Д-10/420ЭР ',
            operation: 'Все',
            order_id: '123',
            operation_cost: '1000 ₽',
            count: '3',
            cost: '3000 ₽',
          },
          {
            date: '10.05.2025',
            buyer_name: '220 вольт',
            name: '672.1.0.00 Безударная дрель ИНТЕРСКОЛ Д-10/420ЭР ',
            operation: 'Все',
            order_id: '123',
            operation_cost: '1000 ₽',
            count: '3',
            cost: '3000 ₽',
          },
          {
            date: '10.05.2025',
            buyer_name: '220 вольт',
            name: '672.1.0.00 Безударная дрель ИНТЕРСКОЛ Д-10/420ЭР ',
            operation: 'Все',
            order_id: '123',
            operation_cost: '1000 ₽',
            count: '3',
            cost: '3000 ₽',
          },
          {
            date: '10.05.2025',
            buyer_name: '220 вольт',
            name: '672.1.0.00 Безударная дрель ИНТЕРСКОЛ Д-10/420ЭР ',
            operation: 'Все',
            order_id: '123',
            operation_cost: '1000 ₽',
            count: '3',
            cost: '3000 ₽',
          },
          {
            date: '10.05.2025',
            buyer_name: '220 вольт',
            name: '672.1.0.00 Безударная дрель ИНТЕРСКОЛ Д-10/420ЭР ',
            operation: 'Все',
            order_id: '123',
            operation_cost: '1000 ₽',
            count: '3',
            cost: '3000 ₽',
          },
          {
            date: '10.05.2025',
            buyer_name: '220 вольт',
            name: '672.1.0.00 Безударная дрель ИНТЕРСКОЛ Д-10/420ЭР ',
            operation: 'Все',
            order_id: '123',
            operation_cost: '1000 ₽',
            count: '3',
            cost: '3000 ₽',
          },
        ],
      },
    }
  },
  props: {
    pagination_items_per_page_process: {
      type: Number,
      default: 50,
    },
    pagination_offset_process: {
      type: Number,
      default: 0,
    },
    pagination_items_per_page_orders: {
      type: Number,
      default: 25,
    },
    pagination_offset_orders: {
      type: Number,
      default: 0,
    },
    pagination_items_per_page_products: {
      type: Number,
      default: 50,
    },
    pagination_offset_products: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      organizations: 'addition/organizations',
      regions: 'addition/regions',
      realization: 'org/realization',
      realization_process: 'org/realization_process',
    }),
  },
  mounted() {
    this.getRegions({ exclude: '', filter: '' })
    this.getOrganizations({ exclude: '', filter: '', ids: [169, 20, 225] })
    this.getRealizationProccess({
      filters: this.form.filters_process,
      pageProcess: this.pageProcess,
      perpageProcess: this.pagination_items_per_page_process,
    }).then(() => {
      this.getRealization({
        filters: this.form.filters_clients,
        pageOrders: this.pageOrders,
        perpageOrders: this.pagination_items_per_page_orders,
        pageProducts: this.pageProducts,
        perpageProducts: this.pagination_items_per_page_products,
      }).then(() => {
        this.loading = false
      })
    })
  },
  methods: {
    ...mapActions({
      getOrganizations: 'addition/getOrganizations',
      getRegions: 'addition/getRegions',
      getRealization: 'org/getRealization',
      getRealizationProccess: 'org/getRealizationProcess',
    }),
    changeFilter() {
      this.loading = true
      setTimeout(() => {
        this.getRealizationProccess({ filters: this.form.filters_process }).then(() => {
          this.loading = false
        })
      }, 500)
    },
    changeFilterClients() {
      this.loading = true
      setTimeout(() => {
        this.getRealization({ filters: this.form.filters_clients }).then(() => {
          this.loading = false
        })
      }, 500)
    },
    showModalOrder(data) {
      this.modalOrderData = data
      this.modalOrder = true
    },
    paginateOrders(data) {
      this.loading = true
      //this.unsetOffers()
      this.pageOrders = data.page
      data.filters = this.filters_clients
      data.pageProducts = 1
      data.perpageOrders = this.pagination_items_per_page_orders
      data.perpageProducts = this.pagination_items_per_page_products
      data.pageOrders = data.page
      this.getRealization(data).then(() => {
        this.loading = false
      })
    },
    paginateProducts(data) {
      this.loading = true
      //this.unsetOffers()
      this.paginateProducts = data.page
      this.getRealization(data).then(() => {
        this.loading = false
      })
    },
    paginateProcess(data) {
      this.loading = true
      //this.unsetOffers()
      this.pageProcess = data.page
      this.getRealizationProccess({
        filters: this.form.filters_process,
        pageProcess: this.pageProcess,
        perpageProcess: this.pagination_items_per_page_process,
      }).then(() => {
        this.loading = false
      })
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
  &__process-table {
    .dart-mb-1 {
      margin-bottom: 0;
    }
    margin-top: 64px;
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
      display: flex;
      flex-direction: column;
      gap: 40px;

      &-row {
        display: flex;
        gap: 0;
        align-items: start;
        justify-content: space-between;
        &--table {
          flex-grow: 1;
          .v-table {
            width: 100%;
            .realization-orders-table-button .kenostButton {
              background-color: #3e3e3e !important;
              color: #fff;
              border-radius: 20px;
              padding: 5px 16px !important;
              font-size: 16px;
              line-height: 21px;
              border: 1px solid #3e3e3e;
              box-shadow: none;
              gap: 8px;
              i {
                font-size: 14px;
              }
            }
            .realization-orders-table-button .kenostButton:hover {
              background-color: transparent !important;
              color: #3e3e3e;
              border: 1px solid #3e3e3e;
            }
          }
        }
      }
      &-cell {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: start;
        justify-content: start;
        position: relative;

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
          &-icon {
            font-size: 24px;
            cursor: pointer;
            color: #282828;
            transition: all 0.2s ease;
            &--active {
              color: #f92c0d;
              transform: rotate(180deg);
            }
          }
        }
      }
      &-cell:not(:last-child) {
        flex-grow: 1;
      }
      &-cell:not(:last-child):after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        translate: 0 -50%;
        width: 0.5px;
        height: 16px;
        background-color: #75757575;
      }
      &-cell:last-child {
        align-self: center;
      }
      .seller--cell,
      .buyer--cell,
      .credit--cell,
      .cost--cell {
        width: calc(20% - 6px);
      }
    }
  }
  &__modal {
    display: flex;
    flex-direction: column;
    gap: 40px;
    &-header {
      display: flex;
      flex-direction: column;
      gap: 8px;
      &-title {
        font-weight: 600;
        font-size: 24px;
        line-height: 31px;
        color: #282828;
      }
      &-date {
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        color: #757575;
      }
    }
    &-top {
      display: flex;
      align-items: start;
      gap: 64px;
      &-item {
        min-width: 295px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        &-title {
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          color: #757575;
        }
        &-cont {
          display: flex;
          align-items: center;
          gap: 16px;
          &-value {
            font-weight: 600;
            font-size: 16px;
            line-height: 21px;
            color: #282828;
          }
          &-label {
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: #a3a3a3;
          }
        }
      }
    }
    &-table {
      margin: 24px 0 40px;
      .dart-mb-1 {
        margin-bottom: 0;
      }
    }
    &-button {
      display: flex;
      justify-content: center;
      .d-button {
        max-width: 91px;

        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
      }
    }
  }
  &__nofound {
    margin-top: 80px;
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
