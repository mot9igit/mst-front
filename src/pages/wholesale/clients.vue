<template>
  <section class="shipments" id="shipments">
    <Toast />
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>

    <div class="clients__header">
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

    <div class="clients__filters">
      <div class="clients__filters-left">
        <div class="clients__filters-input-container" v-for="(ffilter, i) in filters" :key="i">
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
        </div>
        <div
          class="d-radio__wrapper clients__filters-radio-wrapper"
          v-for="(ffilter, i) in filters"
          :key="i"
        >
          <label
            for="vendorCreated"
            class="p-checkbox p-component"
            v-if="ffilter.type == 'checkbox'"
          >
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
            >Созданные поставщиком
          </label>
        </div>
      </div>

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
    <Loader v-if="loading" />
    <div class="clients__card-container">
      <div class="clients__card dart-row" v-for="(item, index) in dilers.items" :key="index">
        <div class="clients__card-left d-col-15">
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
              <img src="/icons/spo-logo.svg" alt="" class="clients__card-info-image" />
            </div>
            <div class="clients__card-info-content">
              <p class="clients__card-info-title">{{ item.name }}</p>
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
              <!--
              <button class="d-button d-button-primary d-button--sm-shadow clients__card-offer">
                <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                Предложение
              </button>
              -->
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
        <div class="clients__card-right d-col-9">
          <div class="clients__card-right-left d-col-21 clients__devider">
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
            </div>
          </div>
          <div class="clients__card-right-right d-col-3">
            <!--<div
              class="d-col-18 clients__devider"
            >

              <button class="d-button d-button-primary d-button--sm-shadow clients__card-offer">
                <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                Предложение
              </button>

            </div> -->
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
      <div class="clients__paginate" v-if="countPages > 1">
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

export default {
  name: 'WholesaleClients',
  components: { Breadcrumbs, Loader, Paginate, Checkbox, MultiSelect, customModal, Toast },
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
      filterValues: {},
      countPages: 0,
      localItems: [],
      filters: {
        name: {
          name: 'Название организации',
          placeholder: 'Введите название организации',
          type: 'text',
        },
        /*
        manager: {
          name: 'Менеджер',
          placeholder: 'Выберите менеджера',
          type: 'multiselect',
          values: [],
        },
        */
        our: {
          name: 'Созданные поставщиком',
          placeholder: 'Созданные поставщиком',
          type: 'checkbox',
          values: 1,
        },
      },
    }
  },
  methods: {
    ...mapActions({
      getDilers: 'wholesale/getDilers',
      unsetDilers: 'wholesale/unsetDilers',
      getManagers: 'wholesale/getManagers',
      getStores: 'wholesale/getStores',
      deleteOrgProfile: 'wholesale/deleteOrgProfile',
    }),
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
        this.filter({
          filter: this.filterText,
          filtersdata: toRaw(this.filterValues),
          page: 1,
          perpage: this.pagination_items_per_page,
        })
      }
    },
    filter(data) {
      this.loading = true
      this.unsetDilers()
      this.page = 1
      this.getDilers(data).then(() => {
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
  },
  mounted() {
    this.getDilers({
      type: 1,
      page: this.page,
      perpage: this.pagination_items_per_page,
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
        this.loading = false
      }
    })
    this.getManagers({
      id: this.$route.params.id,
    })
    this.getStores({
      id: this.$route.params.id,
    })
  },
  computed: {
    ...mapGetters({
      dilers: 'wholesale/dilers',
      managers: 'wholesale/managers',
      stores: 'wholesale/stores',
    }),
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
  },
}
</script>
<style lang="scss">
.clients__card,
.clients__card-data,
.clients__card-right,
.clients__card-right-left,
.clients__card-right-right {
  gap: 0;
}
.clients__card-info-content {
  padding-right: 12px;
}
.clients__card-inn {
  padding-right: 12px;
  padding-left: 12px;
}
.clients__card-contact-container {
  padding-right: 12px;
  padding-left: 20px;
}
.clients__devider:before {
  content: '';
  position: absolute;
  top: calc(50% - 10px);
  right: 0;

  width: 0.5px;
  height: 20px;
  background-color: #75757575;
}
.clients__filters-input select {
  width: 100%;
}
.clients__filters-radio-wrapper
  .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover)
  .p-checkbox-box,
.clients__filters-radio-wrapper .p-checkbox-checked .p-checkbox-box,
.p-multiselect-overlay
  .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover)
  .p-checkbox-box,
.p-multiselect-overlay .p-checkbox-checked .p-checkbox-box {
  border-color: rgba(249, 44, 13, 1);
  background: rgba(249, 44, 13, 1);
}
.clients__filters-input-actions .d-icon-wrapper:hover,
.clients__filters-input-actions .d-icon-wrapper--active {
  background-color: transparent;
  box-shadow: none;
  color: var(--d-icon-wrapper-color-hover);
}
.clients__filters-input-actions button:first-child {
  cursor: default;
}
.clients__filters-input .p-multiselect {
  background: transparent;
  border: none;
}
.clients__filters-input-multiselect .clients__filters-input-actions {
  position: absolute;
  right: 20px;
}
.clients__filters-input-multiselect .p-multiselect-label {
  padding-right: 35px;
  padding-left: 0;
}
.clients__filters-input-multiselect .p-multiselect-dropdown {
  color: #757575;
}
.clients__filters-input .dart-form-group {
  width: 100%;
}
.clients__filters-input {
  max-width: 350px;
}
.page-item .page-link {
  cursor: pointer;
}
.clients__card-right-right .clients__card-action-container {
  justify-content: end;
}
.clients-form__modal .modal-content {
  max-width: 700px;
}
.clients-info__label {
  display: flex;
  align-items: center;
  margin: 40px 0;
  gap: 12px;
}
.clients-button__container {
  display: flex;
  align-items: center;
  gap: 20px;
}
.clients-button__container .clients-info__button {
  min-width: 150px;
}
.clients__card-price {
  margin-left: -8px;
}
.clients__card-vendor {
  margin-left: 12px;
}
@media (width <= 1536px) {
  .clients__card .clients__card-inn:first-child::before {
    display: none;
  }
}
@media (width <= 1280px) {
  .clients__devider:before {
    display: none;
  }
  .clients__card-vendor {
    margin-left: 170px;
  }
  .clients__card-price-container .clients__card-price:nth-child(2) {
    margin-left: 8px;
  }
}
@media (width <= 1024px) {
  .clients__card-top-right-top {
    justify-content: end;
  }
  .clients__card-vendor {
    margin-left: 0px;
  }
}
@media (width <= 600px) {
  .clients__card-bottom .clients__card-price-container {
    display: none;
  }
  .clients__card-right-left {
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding-right: 0px;
    padding-left: 0px;
  }
  .clients__card-right-left .d-col-12 {
    width: 100%;
    padding-right: 0px;
    padding-left: 0px;
  }
  .clients__card-price {
    font-size: 10px;
    padding: 4px 8px;
    height: 24px;
  }
  .clients__card-price-container {
    justify-content: space-between;
  }
  .clients__card-price {
    margin-left: 0px;
    margin-right: 0px;
    min-width: calc(50% - 4px);
    justify-content: center;
  }
  .clients__card-price-container .clients__card-price:nth-child(2) {
    margin-left: 0px;
  }
  .clients__card-right-right {
    width: 100%;
  }
}
</style>
