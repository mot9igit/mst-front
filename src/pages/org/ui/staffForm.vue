<template>
  <section class="lk-staff" id="lk-staff">
    <!-- Верхушка страницы -->
    <Toast />
    <div class="d-top">
      <breadcrumbs />
    </div>

    <Loader v-if="loading" />

    <form @submit.prevent="submitStaff()">
      <div class="lk-staff-create__header">
        <div class="lk-staff-edit__header-left">
          <h1 v-if="$route.params.manager_id">Редактирование сотрудника {{ manager.name }}</h1>
          <h1 v-else>Создание нового сотрудника</h1>
        </div>

        <div class="lk-staff-edit__header-right">
          <div class="lk-staff-edit__header-buttom">
            <button
              class="d-button d-button-primary d-button--no-shadow lk-staff__header-button"
              type="submit"
            >
              <i class="d-icon-plus-flat lk-staff__header-button-icon"></i>
              Сохранить
            </button>
          </div>
        </div>
      </div>

      <div class="lk-staff-edit__table">
        <div class="lk-about__info" v-for="(field, index) in tableData" :key="index">
          <div class="lk-about__info-title-wrapper">
            <p class="lk-staff-edit__table-label">{{ field.label }}:</p>
          </div>

          <div class="d-input--cont">
            <div class="d-input d-input--light lk-about__info-input">
              <input
                v-if="field.name === 'phone'"
                type="text"
                v-model="form[field.name]"
                :placeholder="field.placeholder"
                :name="field.name"
                class="d-input__field lk-about__info-input-field"
                @input="formatPhone"
                @focus="errors[field.name] = ''"
              />
              <input
                v-else
                type="text"
                v-model="form[field.name]"
                :placeholder="field.placeholder"
                :name="field.name"
                class="d-input__field lk-about__info-input-field"
                @focus="errors[field.name] = ''"
              />
            </div>
            <div class="d-input-error" v-if="errors[field.name]">
              <i class="d-icon-warning d-input-error__icon"></i>
              <span class="d-input-error__text">
                {{ errors[field.name] }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="lk-staff-edit__operator">
        <div class="d-radio__wrapper lk-staff-edit__operator-radio-wrapper">
          <div class="d-radio__wrapper lk-staff-edit__operator-radio-wrapper">
            <Checkbox v-model="form.operator" :binary="true" />
            <label class="d-radio__label vendor-change__selected-item-radio-label">
              Оператор 1C
            </label>
          </div>
        </div>
      </div>

      <Tabs class="lk-staff-edit__operator">
        <TabList class="lk-staff-edit__operator">
          <div class="d-tab2" :class="{ 'd-tab2--active': tab == 0 }" :value="0">
            <button class="collection__tabs-link" @click.prevent="tab = 0">
              <span>Ответственный за клиентов</span>
            </button>
          </div>
          <!-- <div class="d-tab2" :class="{ 'd-tab2--active': tab == 1 }" :value="1">
            <button class="collection__tabs-link" @click.prevent="tab = 1">
              <span>Ответственный за поставщиков</span>
            </button>
          </div> -->
        </TabList>

        <TabPanels>
          <TabPanel v-if="tab == 0">
            <div class="lk-staff-edit__operator">
              <div class="d-radio__wrapper lk-staff-edit__operator-radio-wrapper">
                <div class="d-radio__wrapper lk-staff-edit__operator-radio-wrapper">
                  <Checkbox v-model="form.global" :binary="true" />
                  <label class="d-radio__label vendor-change__selected-item-radio-label">
                    Неограниченный круг клиентов
                  </label>
                </div>
              </div>
              <div v-if="!form.global" class="lk-staff-edit__regions-cont">
                <div class="lk-staff-edit__regions">
                  <div class="chips">
                    <div class="chip" v-for="(item, index) in this.form.region" :key="item.code">
                      <i
                        class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"
                      ></i>
                      <span>{{ item.name }}</span>
                      <a href="#" class="chip-close" @click.prevent="regionDel(index, tab)"></a>
                    </div>
                  </div>

                  <form class="d-search d-search--alt">
                    <div class="d-input d-input--light lk-staff-edit__operator-search">
                      <input
                        type="text"
                        placeholder="Поиск региона"
                        class="d-input__field lk-staff-edit__operator-search-field"
                        v-model="search.region"
                        @focus="search.regionSuggestionsShow = true"
                        @blur="unActivateRegion()"
                        @keypress.enter.prevent=""
                      />
                    </div>

                    <ul class="d-search__suggestions" v-if="this.search.regionSuggestionsShow">
                      <li
                        class="d-search__suggestion"
                        v-for="suggestion in regions_all"
                        :key="suggestion.code"
                      >
                        <a
                          href="#"
                          class="d-search__suggestion-card"
                          @click.prevent="
                            () => {
                              this.regionSelect(suggestion, tab)
                            }
                          "
                        >
                          <div class="d-search__suggestion-card__content">
                            <span class="d-search__suggestion-card__title">{{
                              suggestion.name
                            }}</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </form>
                </div>

                <div class="lk-staff-edit__regions">
                  <div class="chips">
                    <div class="chip" v-for="(item, index) in this.form.city" :key="item.code">
                      <i
                        class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"
                      ></i>
                      <span>{{ item.name }}</span>
                      <a href="#" class="chip-close" @click.prevent="cityDel(index, tab)"></a>
                    </div>
                  </div>

                  <form class="d-search d-search--alt">
                    <div class="d-input d-input--light lk-staff-edit__operator-search">
                      <input
                        type="text"
                        placeholder="Поиск города"
                        class="d-input__field lk-staff-edit__operator-search-field"
                        v-model="search.city"
                        @focus="search.citySuggestionsShow = true"
                        @blur="unActivateCity()"
                        @keypress.enter.prevent=""
                      />
                    </div>

                    <ul class="d-search__suggestions" v-if="this.search.citySuggestionsShow">
                      <li
                        class="d-search__suggestion"
                        v-for="suggestion in city_all"
                        :key="suggestion.code"
                      >
                        <a
                          href="#"
                          class="d-search__suggestion-card"
                          @click.prevent="
                            () => {
                              this.citySelect(suggestion, tab)
                            }
                          "
                        >
                          <div class="d-search__suggestion-card__content">
                            <span class="d-search__suggestion-card__title">{{
                              suggestion.name
                            }}</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </form>
                </div>

                <div class="lk-staff-edit__regions">
                  <div class="chips">
                    <div class="chip" v-for="(item, index) in this.form.org" :key="item.code">
                      <i
                        class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"
                      ></i>
                      <span>{{ item.name }}</span>
                      <a href="#" class="chip-close" @click.prevent="orgDel(index, tab)"></a>
                    </div>
                  </div>

                  <form class="d-search d-search--alt">
                    <div class="d-input d-input--light lk-staff-edit__operator-search">
                      <input
                        type="text"
                        placeholder="Поиск организаций"
                        class="d-input__field lk-staff-edit__operator-search-field"
                        v-model="search.org"
                        @focus="search.orgSuggestionsShow = true"
                        @blur="unActivateOrg()"
                        @keypress.enter.prevent=""
                      />
                    </div>

                    <ul class="d-search__suggestions" v-if="this.search.orgSuggestionsShow">
                      <li
                        class="d-search__suggestion"
                        v-for="suggestion in organizations_all"
                        :key="suggestion.code"
                      >
                        <a
                          href="#"
                          class="d-search__suggestion-card"
                          @click.prevent="
                            () => {
                              this.orgSelect(suggestion, tab)
                            }
                          "
                        >
                          <div class="d-search__suggestion-card__content">
                            <span class="d-search__suggestion-card__title">{{
                              suggestion.name
                            }}</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </form>
                </div>

                <!--<div class="lk-staff-edit__operator-address-wrapper">
          <p class="lk-staff-edit__operator-address">
            <i
            class="d-icon-location lk-staff-edit__operator-address-icon"
            ></i>
            <span>УрФО, Москва, ООО “Стин”, Пром хрень снаб</span>
          </p>
          <div class="lk-staff-edit__operator-address-actions">
            <div class="d-divider d-divider--vertical lk-staff-edit__operator-address-actions-divider"></div>
              <button class="lk-staff-edit__operator-address-actions-button">
              <i class="d-icon-pen2"></i>
              </button>
            </div>
        </div>-->
              </div>
            </div>

            <div class="lk-staff-edit__operator-notifications-wrapper">
              <p class="lk-staff-edit__operator-title">Подписка на уведомления:</p>
              <div
                class="d-radio__wrapper lk-staff-edit__operator-radio-wrapper"
                v-for="(type, index) in notifications_types.items"
                :key="index"
              >
                <Checkbox
                  v-model="form.notifications_types"
                  :binary="false"
                  :inputId="type.id"
                  :name="type.id"
                  :value="type.id"
                />
                <label
                  :for="type.id"
                  class="d-radio__label vendor-change__selected-item-radio-label"
                >
                  {{ type.name }}
                </label>
              </div>
            </div>
          </TabPanel>
          <!-- <TabPanel v-else>
            <div class="lk-staff-edit__operator">
              <div class="d-radio__wrapper lk-staff-edit__operator-radio-wrapper">
                <div class="d-radio__wrapper lk-staff-edit__operator-radio-wrapper">
                  <Checkbox v-model="form.global_responsible" :binary="true" />
                  <label class="d-radio__label vendor-change__selected-item-radio-label">
                    Неограниченный круг клиентов
                  </label>
                </div>
              </div>
              <div v-if="!form.global_responsible" class="lk-staff-edit__regions-cont">
                <div class="lk-staff-edit__regions">
                  <div class="chips">
                    <div
                      class="chip"
                      v-for="(item, index) in this.form.region_responsible"
                      :key="item.code"
                    >
                      <i
                        class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"
                      ></i>
                      <span>{{ item.name }}</span>
                      <a href="#" class="chip-close" @click.prevent="regionDel(index, tab)"></a>
                    </div>
                  </div>

                  <form class="d-search d-search--alt">
                    <div class="d-input d-input--light lk-staff-edit__operator-search">
                      <input
                        type="text"
                        placeholder="Поиск региона"
                        class="d-input__field lk-staff-edit__operator-search-field"
                        v-model="search.region_responsible"
                        @focus="search.regionSuggestionsShow_responsible = true"
                        @blur="unActivateRegion()"
                        @keypress.enter.prevent=""
                      />
                    </div>

                    <ul
                      class="d-search__suggestions"
                      v-if="this.search.regionSuggestionsShow_responsible"
                    >
                      <li
                        class="d-search__suggestion"
                        v-for="suggestion in regions_all_responsible"
                        :key="suggestion.code"
                      >
                        <a
                          href="#"
                          class="d-search__suggestion-card"
                          @click.prevent="
                            () => {
                              this.regionSelect(suggestion, tab)
                            }
                          "
                        >
                          <div class="d-search__suggestion-card__content">
                            <span class="d-search__suggestion-card__title">{{
                              suggestion.name
                            }}</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </form>
                </div>

                <div class="lk-staff-edit__regions">
                  <div class="chips">
                    <div
                      class="chip"
                      v-for="(item, index) in this.form.city_responsible"
                      :key="item.code"
                    >
                      <i
                        class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"
                      ></i>
                      <span>{{ item.name }}</span>
                      <a href="#" class="chip-close" @click.prevent="cityDel(index, tab)"></a>
                    </div>
                  </div>

                  <form class="d-search d-search--alt">
                    <div class="d-input d-input--light lk-staff-edit__operator-search">
                      <input
                        type="text"
                        placeholder="Поиск города"
                        class="d-input__field lk-staff-edit__operator-search-field"
                        v-model="search.city_responsible"
                        @focus="search.citySuggestionsShow_responsible = true"
                        @blur="unActivateCity()"
                        @keypress.enter.prevent=""
                      />
                    </div>

                    <ul
                      class="d-search__suggestions"
                      v-if="this.search.citySuggestionsShow_responsible"
                    >
                      <li
                        class="d-search__suggestion"
                        v-for="suggestion in city_all_responsible"
                        :key="suggestion.code"
                      >
                        <a
                          href="#"
                          class="d-search__suggestion-card"
                          @click.prevent="
                            () => {
                              this.citySelect(suggestion, tab)
                            }
                          "
                        >
                          <div class="d-search__suggestion-card__content">
                            <span class="d-search__suggestion-card__title">{{
                              suggestion.name
                            }}</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </form>
                </div>

                <div class="lk-staff-edit__regions">
                  <div class="chips">
                    <div
                      class="chip"
                      v-for="(item, index) in this.form.org_responsible"
                      :key="item.code"
                    >
                      <i
                        class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"
                      ></i>
                      <span>{{ item.name }}</span>
                      <a href="#" class="chip-close" @click.prevent="orgDel(index, tab)"></a>
                    </div>
                  </div>

                  <form class="d-search d-search--alt">
                    <div class="d-input d-input--light lk-staff-edit__operator-search">
                      <input
                        type="text"
                        placeholder="Поиск организаций"
                        class="d-input__field lk-staff-edit__operator-search-field"
                        v-model="search.org_responsible"
                        @focus="search.orgSuggestionsShow_responsible = true"
                        @blur="unActivateOrg()"
                        @keypress.enter.prevent=""
                      />
                    </div>

                    <ul
                      class="d-search__suggestions"
                      v-if="this.search.orgSuggestionsShow_responsible"
                    >
                      <li
                        class="d-search__suggestion"
                        v-for="suggestion in organizations_all_responsible"
                        :key="suggestion.code"
                      >
                        <a
                          href="#"
                          class="d-search__suggestion-card"
                          @click.prevent="
                            () => {
                              this.orgSelect(suggestion, tab)
                            }
                          "
                        >
                          <div class="d-search__suggestion-card__content">
                            <span class="d-search__suggestion-card__title">{{
                              suggestion.name
                            }}</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </form>
                </div> -->

          <!--<div class="lk-staff-edit__operator-address-wrapper">
          <p class="lk-staff-edit__operator-address">
            <i
            class="d-icon-location lk-staff-edit__operator-address-icon"
            ></i>
            <span>УрФО, Москва, ООО “Стин”, Пром хрень снаб</span>
          </p>
          <div class="lk-staff-edit__operator-address-actions">
            <div class="d-divider d-divider--vertical lk-staff-edit__operator-address-actions-divider"></div>
              <button class="lk-staff-edit__operator-address-actions-button">
              <i class="d-icon-pen2"></i>
              </button>
            </div>
        </div>-->
          <!-- </div>
            </div>

            <div class="lk-staff-edit__operator-notifications-wrapper">
              <p class="lk-staff-edit__operator-title">Подписка на уведомления:</p>
              <div
                class="d-radio__wrapper lk-staff-edit__operator-radio-wrapper"
                v-for="(type, index) in notifications_types.items"
                :key="index"
              >
                <Checkbox
                  v-model="form.notifications_types"
                  :binary="false"
                  :inputId="type.id"
                  :name="type.id"
                  :value="type.id"
                />
                <label
                  :for="type.id"
                  class="d-radio__label vendor-change__selected-item-radio-label"
                >
                  {{ type.name }}
                </label>
              </div>
            </div>
          </TabPanel> -->
        </TabPanels>
      </Tabs>
    </form>
  </section>
</template>

<script>
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'
import { mapActions, mapGetters } from 'vuex'
import Toast from 'primevue/toast'
import Checkbox from 'primevue/checkbox'
import Tabs from 'primevue/tabs'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import TabList from 'primevue/tablist'

export default {
  name: 'ProfileStaffForm',
  components: { Breadcrumbs, Loader, Toast, Checkbox, Tabs, TabPanels, TabPanel, TabList },
  data() {
    return {
      loading: true,
      regions_all: [],
      city_all: [],
      organizations_all: [],
      regions_all_responsible: [],
      city_all_responsible: [],
      organizations_all_responsible: [],
      tab: 0,
      tableData: [
        {
          name: 'name',
          label: 'ФИО сотрудника',
          placeholder: 'Введите ФИО сотрудника',
        },
        {
          name: 'phone',
          label: 'Рабочий телефон',
          placeholder: 'Введите рабочий телефон',
        },
        {
          name: 'email',
          label: 'Рабочий email',
          placeholder: 'Введите рабочий email',
        },
      ],
      form: {
        name: '',
        email: '',
        phone: '',
        region: [],
        city: [],
        org: [],
        global: false,
        region_responsible: [],
        city_responsible: [],
        org_responsible: [],
        global_responsible: false,
        operator: false,
        notifications_types: [],
      },
      search: {
        city: '',
        citySuggestionsShow: false,
        region: '',
        regionSuggestionsShow: false,
        org: '',
        orgSuggestionsShow: false,
        city_responsible: '',
        citySuggestionsShow_responsible: false,
        region_responsible: '',
        regionSuggestionsShow_responsible: false,
        org_responsible: '',
        orgSuggestionsShow_responsible: false,
      },
      errors: {
        name: '',
        phone: '',
        email: '',
      },
    }
  },
  mounted() {
    if (this.$route.params.manager_id) {
      this.getManager({
        manager_id: this.$route.params.manager_id,
      }).then(() => {
        this.form = this.manager
        this.getRegions({ exclude: this.form.region, filter: '' }).then(() => {
          this.regions_all = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
          this.regions_all_responsible = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
        this.getCities({ exclude: [], filter: '' }).then(() => {
          this.city_all = this.cities.map(function (el) {
            return { name: el.label, code: el.key }
          })
          this.cities_all_responsible = this.cities.map(function (el) {
            return { name: el.label, code: el.key }
          })
          this.loading = false
        })
        this.getOrganizations({ exclude: [], filter: '' }).then(() => {
          this.organizations_all = this.organizations.map(function (el) {
            return { name: el.name, code: el.id }
          })
          this.organizations_all_responsible = this.organizations.map(function (el) {
            return { name: el.name, code: el.id }
          })
        })
        this.getNotificationsTypes().then(() => {
          // this.form.notifications_types = []
        })
      })
    } else {
      this.getRegions({ exclude: this.form.region, filter: '' }).then(() => {
        this.regions_all = this.regions.map(function (el) {
          return { name: el.label, code: el.key }
        })
        this.regions_all_responsible = this.regions.map(function (el) {
          return { name: el.label, code: el.key }
        })
      })
      this.getCities({ exclude: [], filter: '' }).then(() => {
        this.city_all = this.cities.map(function (el) {
          return { name: el.label, code: el.key }
        })
        this.city_all_responsible = this.cities.map(function (el) {
          return { name: el.label, code: el.key }
        })
        this.loading = false
      })
      this.getOrganizations({ exclude: [], filter: '' }).then(() => {
        this.organizations_all = this.organizations.map(function (el) {
          return { name: el.name, code: el.id }
        })
        this.organizations_all_responsible = this.organizations.map(function (el) {
          return { name: el.name, code: el.id }
        })
      })
      this.getNotificationsTypes().then(() => {
        this.form.notifications_types = []
        for (let i = 0; i < this.notifications_types.items.length; i++) {
          this.form.notifications_types.push(this.notifications_types.items[i].id)
        }
      })
    }
  },
  methods: {
    ...mapActions({
      getRegions: 'addition/getRegions',
      getCities: 'addition/getCities',
      getOrganizations: 'addition/getOrganizations',
      getManager: 'org/getManager',
      setManager: 'org/setManager',
      getNotificationsTypes: 'notifications/getNotificationsTypes',
    }),
    regionSelect(item, tab) {
      if (tab == 0) {
        this.form.region.push(item)
        // Берем географию
        this.getRegions({ exclude: this.form.region, filter: '' }).then(() => {
          this.regions_all = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
        this.search.region = ''
      } else {
        this.form.region_responsible.push(item)
        // Берем географию
        this.getRegions({ exclude: this.form.region_responsible, filter: '' }).then(() => {
          this.regions_all_responsible = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
        this.search.region_responsible = ''
      }
    },
    unActivateRegion() {
      setTimeout(() => {
        this.search.regionSuggestionsShow = false
        this.search.regionSuggestionsShow_responsible = false
      }, 250)
    },
    regionDel(index, tab) {
      if (tab == 0) {
        this.form.region.splice(index, 1)
        this.getRegions({ exclude: this.form.region, filter: '' }).then(() => {
          this.regions_all = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      } else {
        this.form.region_responsible.splice(index, 1)
        this.getRegions({ exclude: this.form.region_responsible, filter: '' }).then(() => {
          this.regions_all_responsible = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }
    },
    citySelect(item, tab) {
      if (tab == 0) {
        this.form.city.push(item)
        // Берем географию
        this.getCities({ exclude: this.form.city, filter: '' }).then(() => {
          this.city_all = this.cities.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
        this.search.city = ''
      } else {
        this.form.city_responsible.push(item)
        // Берем географию
        this.getCities({ exclude: this.form.city_responsible, filter: '' }).then(() => {
          this.city_all_responsible = this.cities.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
        this.search.city_responsible = ''
      }
    },
    unActivateCity() {
      setTimeout(() => {
        this.search.citySuggestionsShow = false
        this.search.citySuggestionsShow_responsible = false
      }, 250)
    },
    cityDel(index, tab) {
      if (tab == 0) {
        this.form.city.splice(index, 1)
        this.getCities({ exclude: this.form.city, filter: '' }).then(() => {
          this.city_all = this.cities.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      } else {
        this.form.city_responsible.splice(index, 1)
        this.getCities({ exclude: this.form.city_responsible, filter: '' }).then(() => {
          this.city_all_responsible = this.cities.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }
    },
    orgSelect(item, tab) {
      if (tab == 0) {
        this.form.org.push(item)
        // Берем географию
        this.getOrganizations({ exclude: this.form.org, filter: '' }).then(() => {
          this.organizations_all = this.organizations.map(function (el) {
            return { name: el.name, code: el.id }
          })
        })
        this.search.org = ''
      } else {
        this.form.org_responsible.push(item)
        // Берем географию
        this.getOrganizations({ exclude: this.form.org_responsible, filter: '' }).then(() => {
          this.organizations_all_responsible = this.organizations.map(function (el) {
            return { name: el.name, code: el.id }
          })
        })
        this.search.org_responsible = ''
      }
    },
    unActivateOrg() {
      setTimeout(() => {
        this.search.orgSuggestionsShow = false
        this.search.orgSuggestionsShow_responsible = false
      }, 250)
    },
    orgDel(index, tab) {
      if (tab == 0) {
        this.form.org.splice(index, 1)
        this.getOrganizations({ exclude: this.form.org, filter: '' }).then(() => {
          this.organizations_all = this.organizations.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      } else {
        this.form.org_responsible.splice(index, 1)
        this.getOrganizations({ exclude: this.form.org_responsible, filter: '' }).then(() => {
          this.organizations_all_responsible = this.organizations.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }
    },
    debounce(func, delay) {
      clearTimeout(this.searchPTimer)
      this.searchPTimer = setTimeout(func, delay)
    },
    formatPhone(event) {
      let value = event.target.value.replace(/\D/g, '') // Удаляем все нецифровые символы
      this.errors.phone = ''
      if (value.length > 11) {
        value = value.slice(0, 11) // Ограничиваем ввод до 11 цифр
      }
      // Форматируем номер по маске: +X (XXX) XXX-XX-XX
      let formatted = '+'
      if (value.length > 0) formatted += value[0]
      if (value.length > 1) formatted += ' (' + value.substring(1, 4)
      if (value.length > 4) formatted += ') ' + value.substring(4, 7)
      if (value.length > 7) formatted += '-' + value.substring(7, 9)
      if (value.length > 9) formatted += '-' + value.substring(9, 11)
      this.form.phone = formatted
    },
    formatPhoneInput(value) {
      value.replace(/\D/g, '') // Удаляем все нецифровые символы
      let formatted = ''
      formatted += value[0]
      formatted += value[1]
      formatted += ' (' + value.substring(2, 5)
      formatted += ') ' + value.substring(5, 8)
      formatted += '-' + value.substring(8, 10)
      formatted += '-' + value.substring(10, 12)
      return formatted
    },
    validatePhone(phone) {
      const regex = /^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/
      return regex.test(phone)
    },
    validateEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return regex.test(email)
    },
    submitStaff() {
      this.loading = true
      let error = 0
      //let phone = this.formatPhoneInput(this.form.phone)
      if (!this.validatePhone(this.form.phone)) {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Некорректный номер телефона',
          life: 3000,
        })
        this.errors.phone = 'Введите корректный номер телефона'
        error++
      }
      if (this.form.name == '') {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Укажите ФИО сотрудника',
          life: 3000,
        })
        this.errors.name = 'Введите ФИО сотрудника'
        error++
      }
      if (!this.validateEmail(this.form.email)) {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Укажите Email сотрудника',
          life: 3000,
        })
        this.errors.email = 'Введите корректный Email сотрудника'
        error++
      }
      if (error > 0) {
        this.loading = false
        return
      } else {
        this.setManager({
          data: this.form,
        }).then(() => {
          if (this.$route.params.manager_id) {
            this.$toast.add({
              severity: 'success',
              summary: 'Сотрудник отредактирован!',
              detail: 'Вы успешно отредактировали сотрудника',
              life: 3000,
            })
            this.getManager({
              manager_id: this.$route.params.manager_id,
            }).then(() => {
              this.loading = false
            })
          } else {
            this.loading = false
            this.$toast.add({
              severity: 'success',
              summary: 'Сотрудник создан!',
              detail: 'Вы успешно добавили нового сотрудника',
              life: 3000,
            })
            this.$router.push({ name: 'profileStuff', params: { id: this.$route.params.id } })
          }
        })
      }
    },
  },
  computed: {
    ...mapGetters({
      regions: 'addition/regions',
      cities: 'addition/cities',
      organizations: 'addition/organizations',
      notifications_types: 'notifications/notifications_types',
      manager: 'org/manager',
    }),
  },
  watch: {
    manager: function (newVal) {
      this.form = newVal
      this.getRegions({ exclude: this.form.region, filter: '' }).then(() => {
        this.regions_all = this.regions.map(function (el) {
          return { name: el.label, code: el.key }
        })
        this.regions_all_responsible = this.regions.map(function (el) {
          return { name: el.label, code: el.key }
        })
      })
      this.getCities({ exclude: this.form.city, filter: '' }).then(() => {
        this.city_all = this.cities.map(function (el) {
          return { name: el.label, code: el.key }
        })
        this.city_all_responsible = this.cities.map(function (el) {
          return { name: el.label, code: el.key }
        })
        this.loading = false
      })
      this.getOrganizations({ exclude: this.form.org, filter: '' }).then(() => {
        this.organizations_all = this.organizations.map(function (el) {
          return { name: el.name, code: el.id }
        })
        this.organizations_all_responsible = this.organizations.map(function (el) {
          return { name: el.name, code: el.id }
        })
      })
    },
    regions: function (newVal) {
      this.regions_all = newVal.map(function (el) {
        return { name: el.label, code: el.key }
      })
      this.regions_all_responsible = newVal.map(function (el) {
        return { name: el.label, code: el.key }
      })
    },
    cities: function (newVal) {
      this.city_all = newVal.map(function (el) {
        return { name: el.label, code: el.key }
      })
      this.city_all_responsible = newVal.map(function (el) {
        return { name: el.label, code: el.key }
      })
    },
    organizations: function (newVal) {
      this.organizations_all = newVal.map(function (el) {
        return { name: el.name, code: el.id, image: el.image }
      })
      this.organizations_all_responsible = newVal.map(function (el) {
        return { name: el.name, code: el.id, image: el.image }
      })
    },
    notifications_types: function (newVal) {
      if (!this.$route.params.manager_id) {
        this.form.notifications_types = []
        for (let i = 0; i < newVal.items.length; i++) {
          this.form.notifications_types.push(newVal.items[i].id)
        }
      }
    },
    'search.region': function (newVal, oldVal) {
      if (newVal.length < 3 && oldVal.length < newVal.length) {
        return
      }
      if (newVal.length < 3) {
        newVal = ''
      }
      this.debounce(() => {
        this.getRegions({ exclude: this.form.region, filter: newVal }).then(() => {
          this.regions_all = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }, 300)
    },
    'search.city': function (newVal, oldVal) {
      if (newVal.length < 3 && oldVal.length < newVal.length) {
        return
      }
      if (newVal.length < 3) {
        newVal = ''
      }
      this.debounce(() => {
        this.getCities({ exclude: this.form.city, filter: newVal }).then(() => {
          this.city_all = this.cities.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }, 300)
    },
    'search.org': function (newVal, oldVal) {
      if (newVal.length < 3 && oldVal.length < newVal.length) {
        return
      }
      if (newVal.length < 3) {
        newVal = ''
      }
      this.debounce(() => {
        this.getOrganizations({ exclude: this.form.org, filter: newVal }).then(() => {
          this.organizations_all = this.organizations.map(function (el) {
            return { name: el.name, code: el.id }
          })
        })
      }, 300)
    },
    'search.region_responsible': function (newVal, oldVal) {
      if (newVal.length < 3 && oldVal.length < newVal.length) {
        return
      }
      if (newVal.length < 3) {
        newVal = ''
      }
      this.debounce(() => {
        this.getRegions({ exclude: this.form.region_responsible, filter: newVal }).then(() => {
          this.regions_all_responsible = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }, 300)
    },
    'search.city_responsible': function (newVal, oldVal) {
      if (newVal.length < 3 && oldVal.length < newVal.length) {
        return
      }
      if (newVal.length < 3) {
        newVal = ''
      }
      this.debounce(() => {
        this.getCities({ exclude: this.form.city_responsible, filter: newVal }).then(() => {
          this.city_all_responsible = this.cities.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }, 300)
    },
    'search.org_responsible': function (newVal, oldVal) {
      if (newVal.length < 3 && oldVal.length < newVal.length) {
        return
      }
      if (newVal.length < 3) {
        newVal = ''
      }
      this.debounce(() => {
        this.getOrganizations({ exclude: this.form.org_responsible, filter: newVal }).then(() => {
          this.organizations_all_responsible = this.organizations.map(function (el) {
            return { name: el.name, code: el.id }
          })
        })
      }, 300)
    },
  },
}
</script>

<style lang="scss">
.p-tablist-tab-list {
  background-color: transparent;
  border: none;
  padding: 40px 0 24px;
}
.p-tablist-tab-list {
  gap: 24px;
}
.p-tabpanels {
  background-color: transparent;
}
</style>
