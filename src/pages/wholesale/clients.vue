<template>
  <section class="shipments" id="shipments">
    <Toast />
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>

    <div class="clients__header">
      <div class="dart-row">
        <div class="d-col-lg-12">
          <div class="clients__header-title-wrapper">
            <h1 class="clients__header-title">
              Мои клиенты (<span v-if="dilers.total > -1">{{ dilers.total }}</span
              ><span v-else>0</span>)
            </h1>
          </div>
          <p class="clients__header-description">
            Доступные организации, которые являются вашими клиентами
          </p>
        </div>
        <div class="d-col-lg-12 d-flex d-flex-end">
          <router-link
            :to="{
              name: 'WholesaleClientsAdd',
              params: {
                id: this.$route.params.id,
              },
            }"
            class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
          >
            <i class="d-icon-plus-flat clients__filters-create-icon"></i>
            Новый клиент
          </router-link>
        </div>
      </div>
    </div>

    <div class="clients__filters">
      <div class="clients__filters-left">
        <div
          class="clients__filters-input-container"
          v-for="(ffilter, i) in filtersInputs"
          :key="i"
        >
          <div class="d-input d-input--light clients__filters-input" v-if="ffilter.type == 'text'">
            <input
              type="text"
              :id="ffilter.name"
              :placeholder="ffilter.placeholder"
              :name="i"
              class="d-input__field clients__filters-input-field"
              v-model="filterText"
              @input="setFilter('filter')"
            />

            <div class="d-input__actions clients__filters-input-actions">
              <button class="d-icon-wrapper clients__filters-input-button">
                <i class="d-icon-search-big"></i>
              </button>
            </div>
          </div>
          <div class="dart-form-group clients__filters-tree-group" v-if="ffilter.type == 'tree'">
            <label :for="'tree_' + i" v-if="ffilter.label" class="treeselect-filter-label">{{
              ffilter.label
            }}</label>
            <TreeSelect
              v-model="filterValues[i]"
              :multiple="true"
              :options="ffilter.values"
              :placeholder="ffilter.placeholder"
              valueFormat="id"
              :limit="1"
              :limitText="(count) => `и еще ${count}`"
              :id="'tree_' + i"
              @select="setFilter"
              @deselect="setFilter"
            />
          </div>
        </div>
      </div>
      <div class="clients__filters-left">
        <div
          class="clients__filters-input-container"
          v-for="(ffilter, i) in filtersToggles"
          :key="i"
        >
          <div
            class="d-input d-input--light clients__filters-input clients__filters-input-multiselect"
            v-if="ffilter.type == 'multiselect'"
          >
            <div class="dart-form-group">
              <MultiSelect
                v-model="filterValues[i]"
                :options="ffilter.values"
                :optionLabel="ffilter.optionLabel ? ffilter.optionLabel : 'name'"
                :optionValue="ffilter.optionValue ? ffilter.optionValue : 'id'"
                :placeholder="ffilter.placeholder"
                filter
                :maxSelectedLabels="ffilter.values.length"
                class="d-input__field clients__filters-multiselect-field"
                @change="setFilter"
              />
            </div>

            <div class="d-input__actions clients__filters-input-actions">
              <button class="d-icon-wrapper clients__filters-input-button">
                <i class="d-icon-search-big"></i>
              </button>
              <div
                class="d-divider d-divider--vertical d-input__actions-divider clients__filters-input-actions-divider"
              ></div>
              <!--<button class="d-icon-wrapper clients__filters-input-button">
                  <i class="d-icon-angle-rounded-bottom-bold"></i>
                </button>-->
            </div>
          </div>
          <div
            class="d-radio__wrapper clients__filters-radio-wrapper"
            v-if="ffilter.type == 'checkbox'"
          >
            <label for="vendorCreated" class="p-checkbox p-component">
              <Checkbox
                :inputId="'input' + i"
                :name="i"
                value="1"
                v-model="filterValues[i]"
                @change="setFilter"
                class="p-radio-input clients__filters-radio-input"
              />
            </label>
            <label
              for="vendorCreated"
              class="d-radio__label clients__filters-radio-label"
              v-if="ffilter.type == 'checkbox'"
            >
              {{ ffilter.name }}
            </label>
          </div>
          <div
            class="d-radio__wrapper clients__filters-radio-wrapper"
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
    </div>
    <Loader v-if="loading" />
    <div class="clients__card-container">
      <div class="clients__card dart-row" v-for="(item, index) in dilers.items" :key="index">
        <div class="clients__card-left d-col-14">
          <div class="clients__card-info d-col-6 clients__devider">
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
                <div
                  class="clients__card-info-title clients__card-info-title-type"
                  v-if="item.is_diller"
                >
                  Дилер
                </div>
              </div>
              <button
                class="d-button d-button-primary d-button--sm-shadow clients__card-offer--clients"
                v-if="item.count_clients"
                @click.prevent="showClients(item)"
              >
                Клиенты дилера ({{ item.count_clients }})<i
                  class="d-icon-arrow-right clients__card-offer-icon"
                ></i>
              </button>
            </div>
          </div>

          <div class="clients__card-data d-col-9 clients__devider">
            <div class="clients__card-inn d-col-10 clients__devider">
              <p class="clients__card-inn-label">ИНН:</p>
              <p class="clients__card-inn-value">
                {{ item.req?.inn != '' ? item.req?.inn : 'не указан' }}
              </p>
            </div>

            <div class="clients__card-contact-container d-col-14">
              <a :href="'tel:' + item.phone.replace(/[^+\d]/g, '')" class="clients__card-contact">
                <i class="d-icon-telephone clients__card-contact-icon"></i>
                <span>{{ item.phone }}</span>
              </a>
              <a :href="'mailto:' + item.email" class="clients__card-contact">
                <i class="d-icon-mail2 clients__card-contact-icon"></i>
                <span>{{ item.email }}</span>
              </a>
            </div>
          </div>
        </div>
        <div class="clients__card-top">
          <div class="clients__card-info">
            <div class="clients__card-info-image-container">
              <img :src="item.image" alt="" class="clients__card-info-image" />
            </div>
            <div class="clients__card-info-content">
              <div class="clients__card-info-content-flex">
                <p class="clients__card-info-title">{{ item.name }}</p>
                <div class="clients__card-info--flex">
                  <div class="clients__card-info-title clients__card-info-title-type">
                    {{ item.org_type }}
                  </div>
                  <div
                    class="clients__card-info-title clients__card-info-title-type"
                    v-if="item.is_diller"
                  >
                    Дилер
                  </div>
                </div>
                <button
                  class="d-button d-button-primary d-button--sm-shadow clients__card-offer--clients"
                  v-if="item.count_clients"
                  @click.prevent="showClients(item)"
                >
                  Клиенты дилера ({{ item.count_clients }})<i
                    class="d-icon-arrow-right clients__card-offer-icon"
                  ></i>
                </button>
              </div>

              <div class="clients__card-info-address">
                <i class="d-icon-location clients__card-info-address-icon"></i>
                <span>{{
                  item.req?.fact_address != '' ? item.req?.fact_address : 'адрес не указан'
                }}</span>
              </div>
            </div>
          </div>

          <div class="clients__card-top-right">
            <div class="clients__card-top-right-top">
              <button
                @click.prevent="createOffer(item)"
                v-if="item.owner_id == 0 || (item.owner_id != 0 && item.store_id)"
                class="d-button d-button-primary d-button--sm-shadow clients__card-offer"
              >
                <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                Предложение
              </button>

              <div class="clients__card-action-container">
                <button
                  class="clients__card-action"
                  @click.prevent="editClient(item)"
                  v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id"
                >
                  <i class="d-icon-pen2"></i>
                </button>
                <div
                  class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
                  v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id"
                ></div>
                <button
                  class="clients__card-action"
                  v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id"
                  @click.prevent="modalDeleteShow(item)"
                >
                  <i class="d-icon-trash"></i>
                </button>
              </div>
            </div>
            <div class="clients__card-vendor-wrapper">
              <div
                class="clients__card-vendor"
                v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id"
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
          </div>
        </div>
        <div class="clients__card-bottom">
          <div class="clients__card-bottom-left">
            <div class="clients__card-contact-container">
              <a :href="'tel:' + item.phone.replace(/[^+\d]/g, '')" class="clients__card-contact">
                <i class="d-icon-telephone clients__card-contact-icon"></i>
                <span>{{ item.phone }}</span>
              </a>
              <a :href="'mailto:' + item.email" class="clients__card-contact">
                <i class="d-icon-mail2 clients__card-contact-icon"></i>
                <span>{{ item.email }}</span>
              </a>
            </div>
            <div class="clients__card-inn">
              <p class="clients__card-inn-label">ИНН:</p>
              <p class="clients__card-inn-value">
                {{ item.req?.inn != '' ? item.req?.inn : 'не указан' }}
              </p>
            </div>
          </div>

          <div class="clients__card-price-container" v-if="Object.keys(item.debts).length != 0">
            <div class="clients__card-price" v-if="item.debts?.debet != null">
              <span class="clients__card-price-label">ДЗ:</span>
              <span class="clients__card-price-value">{{ item.debts?.debet }} ₽</span>
            </div>
            <div class="clients__card-price" v-if="item.debts?.credit != null">
              <span class="clients__card-price-label">КЗ:</span>
              <span class="clients__card-price-value">{{ item.debts?.credit }} ₽</span>
            </div>
            <!--<div class="clients__card-price clients__card-price--secondary">
              <span class="clients__card-price-label">ПЗД:</span>
              <span class="clients__card-price-value">3 200 000 ₽</span>
            </div>-->
          </div>
        </div>
        <div class="clients__card-right d-col-10">
          <div class="clients__card-right-left d-col-14 clients__devider">
            <div
              class="clients__card-price-container d-col-12 clients__devider"
              v-if="Object.keys(item.debts).length != 0"
            >
              <div class="clients__card-price" v-if="item.debts?.debet != null">
                <span class="clients__card-price-label">ДЗ:</span>
                <span class="clients__card-price-value">{{ item.debts?.debet }} ₽</span>
              </div>
              <div class="clients__card-price" v-if="item.debts?.credit != null">
                <span class="clients__card-price-label">КЗ:</span>
                <span class="clients__card-price-value">{{ item.debts?.credit }} ₽</span>
              </div>
              <!--<div class="clients__card-price clients__card-price--secondary">
              <span class="clients__card-price-label">ПЗД:</span>
              <span class="clients__card-price-value">3 200 000 ₽</span>
            </div>-->
            </div>

            <div class="d-col-12 clients__card-vendor-container">
              <span
                class="clients__card-vendor"
                v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id"
                >Создан поставщиком</span
              >
              <img
                src="/icons/org_api_integration.svg"
                class="clients__card-vendor--integration"
                v-if="item.api_integration == 1"
                title="Интегрирован"
              />
            </div>
          </div>
          <div class="clients__card-right-right d-col-10">
            <div class="d-col-18">
              <!--  clients__devider"
            >-->

              <button
                @click.prevent="createOffer(item)"
                class="d-button d-button-primary d-button--sm-shadow clients__card-offer"
                v-if="item.owner_id == 0 || (item.owner_id != 0 && item.store_id)"
              >
                <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                Предложение
              </button>
            </div>
            <div class="clients__card-action-container">
              <button
                class="clients__card-action"
                @click.prevent="editClient(item)"
                v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id"
              >
                <i class="d-icon-pen2"></i>
              </button>
              <div
                class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
                v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id"
              ></div>
              <button
                class="clients__card-action"
                v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id"
                @click.prevent="modalDeleteShow(item)"
              >
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="clients__paginate d-pagination-wrap" v-if="countPages > 1">
        <paginate
          :page-count="countPages"
          :click-handler="pagClickCallback"
          :prev-text="'Пред'"
          :next-text="'След'"
          :container-class="'d-pagination d-table__footer-right-pagination'"
          :page-class="'d-pagination__item'"
          :active-class="'d-pagination__item--active'"
          :initialPage="this.page"
          :forcePage="this.page"
        >
        </paginate>
      </div>
    </div>
    <teleport to="body">
      <customModal v-model="this.modalDelete">
        <div class="clients-form__modal">
          <div class="clients-info__value-container">
            <h2>Подтверждение удаления клиента</h2>
            <div class="clients-info__label">
              <i class="d-icon-warning"></i>Вы уверены, что хотите удалить клиента
              {{ modalDeleteObj.name }} с ID {{ modalDeleteObj.id }}?
            </div>
            <div class="clients-button__container">
              <button
                type="button"
                href="#"
                class="d-button d-button d-button-primary d-button-primary-small d-button--sm-shadow clients-info__button"
                @click.prevent="deleteClient(modalDeleteObj)"
              >
                Да
              </button>
              <button
                type="button"
                href="#"
                class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__docs clients-info__button"
                @click.prevent="this.modalDelete = false"
              >
                Нет
              </button>
            </div>
          </div>
        </div>
      </customModal>
      <customModal v-model="this.modalDilerClients" class="modal_diler_clients">
        <dilerClients :diler="modalData" @goToOffer="createOffer" @editVirtual="editClient"/>
      </customModal>
    </teleport>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Paginate from 'vuejs-paginate-next'
import Loader from '@/shared/ui/Loader.vue'
import Checkbox from 'primevue/checkbox'
import { toRaw } from 'vue'
import { MultiSelect } from 'primevue'
import customModal from '@/shared/ui/Modal.vue'
import Toast from 'primevue/toast'
import DatePicker from 'primevue/datepicker'
import TreeSelect from '@/shared/ui/TreeSelectFilter.vue'
import '@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css'
import dilerClients from './ui/dilerClients.vue'

export default {
  name: 'WholesaleClients',
  components: {
    Breadcrumbs,
    Loader,
    DatePicker,
    Paginate,
    Checkbox,
    MultiSelect,
    customModal,
    Toast,
    TreeSelect,
    dilerClients,
  },
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25,
    },
    pagination_offset: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: true,
      page: 1,
      modalDelete: false,
      modalDeleteObj: {},
      filterText: '',
      filterValues: { deliveries: true },
      countPages: 0,
      localItems: [],
      filters: {
        manager: {
          name: 'Сотрудник',
          placeholder: 'Сотрудник',
          type: 'tree',
          value: '',
        },
        name: {
          name: 'Название организации или инн',
          placeholder: 'Название организации или инн',
          type: 'text',
        },
        /*
        initiator_user: {
          name: 'Менеджер',
          placeholder: 'Выберите менеджера',
          type: 'multiselect',
          values: [],
        },
        */
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
      modalData: {},
      modalDilerClients: false,
    }
  },
  methods: {
    ...mapActions({
      getDilers: 'wholesale/getDilers',
      unsetDilers: 'wholesale/unsetDilers',
      getManagers: 'wholesale/getManagers',
      getStores: 'wholesale/getStores',
      deleteOrgProfile: 'wholesale/deleteOrgProfile',
      createOfferExtended: 'offer/createOfferExtended',
      activateVirtualStore: 'org/activateVirtualStore',
      getFilterManagers: 'addition/getManagers',
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
              page: 1,
              perpage: this.pagination_items_per_page,
            })
          })
        }
      } else {
        this.$nextTick(() => {
          this.filter({
            filter: this.filterText,
            filtersdata: toRaw(this.filterValues),
            page: 1,
            perpage: this.pagination_items_per_page,
          })
        })
      }
    },
    filter() {
      this.loading = true
      this.unsetDilers()
      this.page = 1
      this.getDilers({
        filter: this.filterText,
        filtersdata: toRaw(this.filterValues),
        page: 1,
        perpage: this.pagination_items_per_page,
      }).then(() => {
        this.loading = false
      })
    },
    pagClickCallback(pageNum) {
      this.paginate({
        filter: this.filterText,
        filtersdata: toRaw(this.filterValues),
        page: pageNum,
        perpage: this.pagination_items_per_page,
      })

      const el = document.querySelector('.clients__card-container')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    paginate(data) {
      this.loading = true
      this.unsetDilers()
      this.page = data.page
      this.getDilers(data).then(() => {
        this.loading = false
      })
    },
    modalDeleteShow(obj) {
      this.modalDeleteObj = obj
      this.modalDelete = true
    },
    editClient(data) {
      this.$router.push({
        name: 'WholesaleClientsEdit',
        params: { id: this.$route.params.id, client_id: data.id },
      })
    },
    createOffer(data) {
      if (data.store_active == 0) {
        this.activateVirtualStore({
          store_id: data.store_id,
        })
      }
      this.createOfferExtended({
        id: data.id,
      }).then(() => {
        const url = this.$router.resolve({
          name: 'WholesaleClientsOffer',
          params: { id: this.$route.params.id, id_org_from: data.id },
        }).href
        window.open(url, '_blank')
      })
    },
    deleteClient(data) {
      this.loading = true
      this.unsetDilers()
      this.$load(async () => {
        const requestdata = {
          client_id: data.id,
        }
        await this.deleteOrgProfile(requestdata)
          .then((result) => {
            this.filterText = ''
            if (result.data.success === false) {
              this.$toast.add({
                severity: 'error',
                summary: 'Ошибка!',
                detail: result.data.message,
                life: 3000,
              })
              this.getDilers(data)
            } else {
              this.$toast.add({
                severity: 'success',
                summary: 'Организация удалена',
                detail: 'Удаление организации клиента с ID ' + data.id + ' произошло успешно!',
                life: 3000,
              })
              this.getDilers(data)
              this.modalDelete = false
            }
          })
          .catch((result) => {
            console.log(result)
          })
      })
      this.loading = false
    },
    showClients(item) {
      this.modalData = item
      this.modalDilerClients = true
    },
  },
  mounted() {
    this.getDilers({
      type: 1,
      page: this.page,
      perpage: this.pagination_items_per_page,
      filtersdata: { deliveries: true },
    }).then(() => {
      if (this.dilers) {
        if (Object.prototype.hasOwnProperty.call(this.dilers, 'items')) {
          this.stores.items = this.dilers.items
        } else {
          this.stores.items = []
        }
        if (Object.prototype.hasOwnProperty.call(this.dilers, 'total')) {
          this.stores.total = this.dilers.total
        } else {
          this.stores.total = 0
        }
        this.filters.deliveries.values = true
        this.loading = false
      }
    })
    this.getManagers({
      id: this.$route.params.id,
      filter: '',
      page: '',
      perpage: '',
    })
    this.getStores({
      id: this.$route.params.id,
    })
    this.getFilterManagers().then(() => {
      this.filters.manager.values = this.filter_managers
    })
  },
  computed: {
    ...mapGetters({
      dilers: 'wholesale/dilers',
      managers: 'wholesale/managers',
      stores: 'wholesale/stores',
      filter_managers: 'addition/managers',
    }),
    filtersInputs() {
      const res = {}
      for (const key in this.filters) {
        const type = this.filters[key].type
        if (type === 'text' || type === 'tree') {
          res[key] = this.filters[key]
        }
      }
      return res
    },
    filtersToggles() {
      const res = {}
      for (const key in this.filters) {
        const type = this.filters[key].type
        if (
          type === 'switch' ||
          type === 'checkbox' ||
          type === 'datepicker' ||
          type === 'multiselect'
        ) {
          res[key] = this.filters[key]
        }
      }
      return res
    },
  },
  watch: {
    //managers: function (newVal, oldVal) {
    //  this.filters.manager.values = newVal
    //},
    dilers: function () {
      this.countPages = Math.ceil(this.dilers.total / this.pagination_items_per_page)
      if (this.countPages === 0) {
        this.countPages = 1
      }
    },
    modalDelete: function (newVal) {
      if (newVal === false) {
        this.modalDeleteObj = {}
      }
    },
    filter_managers: function (newVal) {
      this.filters.manager.values = newVal
    },
  },
}
</script>
<style lang="scss">
.clients__card-right-right.d-col-10 {
  padding-right: 0;
}
.catalog-filters-dates {
  position: relative;
  padding-left: 24px;
}
.catalog-filters-dates.p-inputwrapper-focus.p-focus .p-inputtext {
  color: #fff;
  background: #282828 !important;
}
.catalog-filters-dates:not(.p-inputwrapper-focus) .p-inputtext {
  color: #282828 !important;
  background: #ededed !important;
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
  font-weight: 400;
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
.catalog-top_purch-filters .catalog-top_filters-item:before {
  display: none;
}
.p-datepicker-day-selected-range {
  color: #fff !important;
}
.catalog-filters-dates:before {
  content: '';
  width: 1px;
  height: 16px;
  background-color: #757575;
  display: block;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 0;
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
.clients__filters {
  flex-direction: column;
  gap: 24px;
}
.clients__filters > .clients__filters-left:first-child {
  display: flex;
  flex-direction: row;
  flex: 0 0 auto;
  width: auto;
  align-self: flex-end;
  justify-content: flex-end;
}
.clients__filters > .clients__filters-left:first-child .clients__filters-input-container {
  width: 400px;
  max-width: 400px;
}
.clients__filters-tree-group {
  display: flex;
  flex-direction: column;
  .vue3-treeselect {
    border-radius: 20px;
    .vue3-treeselect__control {
      border-radius: 20px;
    }
  }
}
.clients__card-offer--clients {
  gap: 8px;
  font-size: 14px;
  line-height: 18px;
  padding: 7px 16px;
  width: max-content;
  height: 32px;
  min-height: 32px;
  max-height: 32px;
  margin-top: 8px;
  .clients__card-offer-icon {
    width: 16px;
    height: 18px;
    font-size: 11px;
  }
}
.modal_diler_clients .modal-content {
  min-width: 85%;
}
.clients__filters-input-container .dart-form-group{
  margin-bottom: 0;
}
@media (width<1580px) {
  .clients__card-offer--clients {
    gap: 8px;
    font-size: 12px;
    line-height: 18px;
    padding: 7px 16px;
    width: max-content;
    height: 32px;
    min-height: 32px;
    max-height: 32px;
    margin-top: 8px;
    .clients__card-offer-icon {
      width: 16px;
      height: 18px;
      font-size: 10px;
    }
  }
}
@media (width>1280px) {
  .clients__card-vendor--integration {
    width: 100%;
    height: 20px;
    margin: 0 auto;
    position: relative;
  }
  .clients__filters-tree-group .dart-form-group .vue3-treeselect .vue3-treeselect__control {
    height: 37px;
  }
  .clients__filters-tree-group .vue3-treeselect__placeholder {
    font-size: 14px;
    font-weight: 400;
    color: #757575;
    line-height: 37px;
    padding-left: 12px;
  }
}
@media (width<=1280px) and (width>1024px) {
  .clients__card-right-right.d-col-10 .d-col-18 .clients__card-offer {
    float: right;
  }
  .clients__card-right-left.d-col-14.clients__devider {
    align-items: center;
  }
  .clients__card-vendor--integration {
    width: auto;
    height: 18px;
  }
}
@media (width<=1280px) {
  .clients__header .dart-row {
    margin-top: 0 !important;
  }
  .clients__filters-create {
    height: 32px;
    min-height: 32px;
    font-size: 14px;
  }
  .clients__filters-create-icon {
    font-size: 12px;
    width: 12px;
  }
  .clients__filters-input-container .d-radio__wrapper {
    gap: 8px;
  }
  .catalog-filter-switch-lable {
    font-size: 12px;
    line-height: 14px;
  }
  .clients__filters-left {
    align-items: center;
  }
  .clients__filters > .clients__filters-left:first-child .clients__filters-input-container {
    width: 264px;
  }
  .dart-form-group .vue3-treeselect__multi-value-item {
    background: #ededed;
    border: 1px solid transparent;
    border-radius: 2px;
    color: #757575;
    cursor: default;
    display: inline-table;
    font-size: 10px;
    padding: 2px 0;
    vertical-align: top;
  }
  .vue3-treeselect__multi-value-label {
    padding-right: 5px;
    -webkit-user-select: none;
    user-select: none;
    white-space: nowrap;
    max-width: 116px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .vue3-treeselect__limit-tip-text {
    color: #bdbdbd;
    cursor: default;
    display: block;
    font-size: 10px;
    font-weight: 600;
    margin: 2px 0;
    padding: 1px 0;
  }
  .dart-form-group .vue3-treeselect .vue3-treeselect__control {
    background: #fff;
    border: 1px solid rgba(117, 117, 117, 0.4588235294);
    border-radius: 20px;
    display: table;
    height: 32px;
  }
  .vue3-treeselect__placeholder {
    font-size: 9px;
  }
  .vue3-treeselect__placeholder,
  .vue3-treeselect__single-value {
    bottom: 0;
    left: 0;
    line-height: 30px;
  }
  .clients__card-offer--clients {
    gap: 4px;
    font-size: 9px;
    line-height: 18px;
    padding: 3px 8px;
    width: max-content;
    height: 24px;
    min-height: 24px;
    max-height: 24px;
    margin-top: 8px;
    .clients__card-offer-icon {
      width: 8px;
      height: 18px;
      font-size: 8px;
    }
  }
}
@media (width<=1140px) {
  .catalog-filter-switch-lable {
    font-size: 10px;
    line-height: 12px;
  }
  .catalog-filters-dates {
    padding-left: 16px;
    max-height: 32px;
  }
}
@media (width<=1024px) {
  .clients__card-vendor-wrapper {
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .clients__card-vendor--integration {
    width: auto;
    height: 18px;

    position: relative;
  }
  .clients__card-action-container {
    //display: none;
  }
  .clients__filters-create {
    font-size: 10px;
    font-weight: 400;
    margin-top: 3px;
    padding: 4px 12px;
    height: 24px;
    min-height: 24px;
    gap: 8px;
  }
  .clients__filters-create-icon {
    font-size: 8px;
    width: 14px;
    height: 14px;
  }
  .clients__filters-input {
    --d-input-padding: 8px 9px;
    font-size: 10px;
    font-weight: 400;
    height: 24px;
  }
  .dart-form-group .vue3-treeselect .vue3-treeselect__control {
    height: 24px;
  }
  .vue3-treeselect__placeholder,
  .vue3-treeselect__single-value {
    bottom: 0;
    left: 0;
    line-height: 24px;
  }
  .clients__filters-radio-wrapper .d-switch {
    --d-switch-width: 25px;
    --d-switch-height: 14px;
    --d-switch-thumb-width: 10px;
  }
  .catalog-filter-switch-lable {
    font-size: 8px;
    line-height: 10px;
  }
  .clients__filters-input-container .d-radio__wrapper {
    gap: 6px;
  }
  .clients__filters-left {
    gap: 10px;
  }
  .catalog-filters-dates .p-datepicker-input-icon-container .p-icon {
    width: 10px;
    height: 10px;
  }
  .catalog-filters-dates {
    padding-left: 8px;
    max-height: 24px;
  }
  .catalog-filters-dates.p-inputwrapper-focus.p-focus .p-inputtext::placeholder,
  .catalog-filters-dates .p-inputtext::placeholder {
    font-size: 10px;
  }
  .catalog-filters-dates .p-inputtext {
    font-size: 10px;
    line-height: 10px;
  }
  .clients__card-offer--clients {
    gap: 4px;
    font-size: 10px;
    line-height: 18px;
    padding: 1px 8px;
    width: max-content;
    height: 20px;
    min-height: 20px;
    max-height: 20px;
    margin-top: 0px;
    font-weight: 400;
    white-space: nowrap;
    .clients__card-offer-icon {
      width: 10px;
      height: 18px;
      font-size: 8px;
    }
  }
}
@media (width<=991px) {
  .clients__header .dart-row .d-col-lg-12 {
    width: 50% !important;
  }
}
@media (width<=860px) {
  .clients__filters-left {
    flex-wrap: wrap;
    gap: 10px;
  }
}
@media (width<=600px) {
  .clients__filters > .clients__filters-left:first-child {
    flex-direction: column;
    align-items: stretch;
  }
  .clients__filters > .clients__filters-left:first-child .clients__filters-input-container {
    width: 100%;
  }
  .clients__filters > .clients__filters-left:first-child .clients__filters-input {
    width: 100% !important;
  }
  .clients__card-vendor--integration {
    width: auto;
    height: 24px;
    position: relative;
  }
  .clients__filters-left {
    display: grid;
    grid-template-areas:
      'A A A'
      'B C D'
      'E F G';
  }
  .clients__card-right-right.d-col-10 {
    justify-content: center !important;
  }
  .clients__card-right-right.d-col-10 .d-col-18 .clients__card-offer {
    margin: 0 auto;
  }
  .clients__card-action-container {
    display: flex;
    position: absolute;
    top: 16px;
    right: 44px;
  }
  .clients__card-right-right.d-col-10,
  .clients__card-right.d-col-10 {
    position: static;
  }
  .clients__card.dart-row {
    position: relative;
  }
  .clients__card-offer--clients {
    gap: 8px;
    font-size: 12px;
    line-height: 18px;
    padding: 6px 16px;
    width: max-content;
    height: 24px;
    min-height: 24px;
    max-height: 24px;
    margin-top: 0px;
    font-weight: 400;
    white-space: nowrap;
    .clients__card-offer-icon {
      width: 12px;
      height: 18px;
      font-size: 12px;
    }
  }
}
.clients__filters-input-container .d-input,
.clients__filters-input-container .d-input__field {
  border-radius: 20px !important;
  overflow: hidden !important;
}
.clients__filters-input .d-input__field::placeholder {
  font-weight: 400;
}
.clients__card-info--flex {
  display: flex;
  gap: 8px;
}
</style>
