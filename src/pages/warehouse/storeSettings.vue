<template>
  <section class="warehouse-analysis" id="warehouse-analysis">
    <Toast />
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <Loader v-if="loading" />
    <div class="warehouse-analysis__header">
      <div class="lk-staff-edit__header-left">
        <h1>Настройки склада</h1>
      </div>

      <div class="lk-staff-edit__header-right">
        <div class="lk-staff-edit__header-buttom">
          <button
            class="d-button d-button-primary d-button--no-shadow lk-staff__header-button"
            @click.prevent="saveSettings()"
          >
            <i class="d-icon-plus-flat lk-staff__header-button-icon"></i>
            Сохранить
          </button>
        </div>
      </div>
    </div>
    <div class="warehouse-analysis__header-storeinfo">
      <div class="warehouse-analysis__header-storeinfo-info">
        <div
          class="warehouse-analysis__header-storeinfo-info-name warehouse-settings__header-storeinfo-info-name"
        >
          №{{ storeSettings.id }} {{ storeSettings.name_short }}
        </div>
        <div
          class="warehouse-analysis__header-storeinfo-info-address warehouse-settings__header-storeinfo-info-address"
        >
          <i class="d-icon-location"></i><span>{{ storeSettings.address }}</span>
        </div>
      </div>
    </div>
    <div class="warehouse-settings-cont">
      <div class="warehouse-settings-cont-item">
        <div class="order-card__orderinfo-grid-lable">Интеграция</div>
        <div class="order-card__orderinfo-grid-text">
          <div class="store_status" :class="storeSettings.integration_class">
            <div class="round-status">
              <i class="d-icon-check"></i>
            </div>
            <span>{{ storeSettings.integration_check }}</span>
          </div>
        </div>
      </div>
      <div class="warehouse-settings-cont-item">
        <div class="order-card__orderinfo-grid-lable">Тип склада</div>
        <div class="order-card__orderinfo-grid-text">{{ storeSettings.store_type }}</div>
      </div>
      <div class="warehouse-settings-cont-item">
        <div class="order-card__orderinfo-grid-lable">Видимость</div>
        <div class="warehouse-settings-cont-item-flex">
          <div class="order-card__orderinfo-grid-text">{{ storeSettings.visible }}</div>
          <i
            class="d-icon-pen2 warehouse-settings-cont-item-button"
            :class="{ 'warehouse-settings-cont-item-button--active': view_form }"
            @click.prevent="view_form = !view_form"
          ></i>
        </div>
      </div>
      <div class="warehouse-settings-cont-item">
        <router-link
          target="_blank"
          :to="{
            name: 'warehouseReviewStore',
            params: {
              id: this.$route.params.id,
              order_id: this.edit,
            },
          }"
        >
          <button
            class="d-button d-button-primary d-button-primary-small d-button--sm-shadow warehouse-settings-button"
          >
            Посмотреть товары
          </button>
        </router-link>
      </div>
    </div>
    <div v-if="view_form" class="warehouse-settings-form">
      <div class="contents" id="promoAudience">
        <h2 class="warehouse-settings-form-title">Видимость</h2>
        <p class="promo-master__title promo-master__title--ms-margin">Аудитория</p>
        <div
          class="d-radio__container d-radio__container-vertical d-radio__container--big d-radio__container--1200-vertical d-radio__container--1200-tiny-small"
        >
          <div class="d-radio__wrapper promo-master__radio-wrapper">
            <label for="participantsType0" class="d-radio">
              <input
                type="radio"
                name="participantsType"
                id="participantsType0"
                class="d-radio__input"
                value="0"
                v-model="this.form.participantsType"
              />
            </label>
            <div class="d-radio__label-container">
              <label for="participantsType0" class="d-radio__label promo-master__radio-label"
                >Неограниченный круг участников
              </label>
            </div>
          </div>
          <div class="d-radio__wrapper promo-master__radio-wrapper">
            <label for="participantsType2" class="d-radio">
              <input
                type="radio"
                name="compatibilitymode"
                id="participantsType2"
                class="d-radio__input"
                value="2"
                v-model="this.form.participantsType"
              />
            </label>
            <div class="d-radio__label-container">
              <label for="participantsType2" class="d-radio__label promo-master__radio-label"
                >Исключить регион/участников показа
              </label>
            </div>
          </div>
          <div class="d-radio__wrapper promo-master__radio-wrapper">
            <label for="participantsType3" class="d-radio">
              <input
                type="radio"
                name="compatibilitymode"
                id="participantsType3"
                class="d-radio__input"
                value="3"
                v-model="this.form.participantsType"
              />
            </label>
            <div class="d-radio__label-container">
              <label for="participantsType3" class="d-radio__label promo-master__radio-label"
                >Выбрать регион/участников показа
              </label>
            </div>
          </div>
          <div class="d-radio__wrapper promo-master__radio-wrapper">
            <label for="participantsType1" class="d-radio">
              <input
                type="radio"
                name="compatibilitymode"
                id="participantsType1"
                class="d-radio__input"
                value="1"
                v-model="this.form.participantsType"
              />
            </label>
            <div class="d-radio__label-container">
              <label for="participantsType1" class="d-radio__label promo-master__radio-label"
                >Скрыть для всех
              </label>
            </div>
          </div>
        </div>
        <!-- Участники -->
        <div v-if="this.form.participantsType > 1" class="dart-mt-2">
          <div
            class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings promo-master__settings--sm-margin"
          >
            <div class="promo-master__subtitle-container">
              <p class="promo-master__subtitle">Участники</p>
            </div>
          </div>
          <div class="promo-master__audience-changes">
            <!-- Участники по географии -->
            <div
              class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings"
            >
              <p class="promo-master__subtitle promo-master__subtitle--small">
                Участники по географии
              </p>
              <div>
                <button
                  class="d-button d-button-primary d-button--no-shadow d-button--width-auto"
                  @click.prevent="((this.modals.region = true), resolveRegTemp())"
                >
                  <i class="d-icon-plus"></i>
                  <span>Выбрать регионы</span>
                </button>
                <div class="chips" v-if="this.form.participantsType == 3">
                  <div class="chip" v-for="(item, index) in this.form.regions" :key="item.code">
                    <i
                      class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"
                    ></i>
                    <span>{{ item.name }}</span>
                    <a href="#" class="chip-close" @click.prevent="regionDel(index)"></a>
                  </div>
                </div>
                <div class="chips" v-else-if="this.form.participantsType == 2">
                  <div
                    class="chip"
                    v-for="(item, index) in this.form.regions_iskl"
                    :key="item.code"
                  >
                    <i
                      class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"
                    ></i>
                    <span>{{ item.name }}</span>
                    <a href="#" class="chip-close" @click.prevent="regionDel(index)"></a>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings"
            >
              <p class="promo-master__subtitle promo-master__subtitle--small">Отдельные компании</p>
              <div>
                <button
                  class="d-button d-button-primary d-button--no-shadow d-button--width-auto"
                  @click.prevent="this.modals.organization = true"
                >
                  <i class="d-icon-plus"></i>
                  <span>Выбрать организации</span>
                </button>
                <div class="chips" v-if="this.form.participantsType == 3">
                  <div
                    class="chip"
                    v-for="(item, index) in this.form.all_organizations_selected"
                    :key="item.code"
                  >
                    <img v-if="item.image" :src="item.image" :alt="item.name" class="chip-img" />
                    <span v-else class="chip-img"></span>
                    <span>{{ item.name }}</span>
                    <a href="#" class="chip-close" @click.prevent="orgDel(index)"></a>
                  </div>
                </div>
                <div class="chips" v-else-if="this.form.participantsType == 2">
                  <div
                    class="chip"
                    v-for="(item, index) in this.form.all_organizations_selected_iskl"
                    :key="item.code"
                  >
                    <img v-if="item.image" :src="item.image" :alt="item.name" class="chip-img" />
                    <span v-else class="chip-img"></span>
                    <span>{{ item.name }}</span>
                    <a href="#" class="chip-close" @click.prevent="orgDel(index)"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <customModal v-model="this.modals.region" class="select-window">
      <template v-slot:title>Выбрать регионы</template>
      <div class="regions-container">
        <div class="regions">
          <form class="d-search d-search--alt">
            <div>
              <i
                class="d-icon-search-big d-search__icon promotions__card-warehouse-search-icon"
              ></i>
              <input
                type="text"
                placeholder="Найти регион"
                class="d-search__field"
                v-if="this.form.participantsType == '3'"
                v-model="search.region"
                @focus="search.regionSuggestionsShow = true"
                @blur="unActivateRegion()"
                @keypress.enter.prevent=""
              />
              <input
                type="text"
                placeholder="Найти регион"
                class="d-search__field"
                v-if="this.form.participantsType == '2'"
                v-model="search.region_iskl"
                @focus="search.regionSuggestionsShow_iskl = true"
                @blur="unActivateRegion()"
                @keypress.enter.prevent=""
              />
            </div>

            <ul
              class="d-search__suggestions"
              v-if="this.search.regionSuggestionsShow && this.form.participantsType == 3"
            >
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
                      this.regionSelect(suggestion)
                    }
                  "
                >
                  <img
                    :src="suggestion.image"
                    alt=""
                    class="d-search__suggestion-card__img"
                    v-if="suggestion.image"
                  />
                  <div class="d-search__suggestion-card__content">
                    <span class="d-search__suggestion-card__title">{{ suggestion.name }}</span>
                  </div>
                </a>
              </li>
            </ul>
            <ul
              class="d-search__suggestions"
              v-else-if="this.search.regionSuggestionsShow_iskl && this.form.participantsType == 2"
            >
              <li
                class="d-search__suggestion"
                v-for="suggestion in regions_all_iskl"
                :key="suggestion.code"
              >
                <a
                  href="#"
                  class="d-search__suggestion-card"
                  @click.prevent="
                    () => {
                      this.regionSelect(suggestion)
                    }
                  "
                >
                  <img
                    :src="suggestion.image"
                    alt=""
                    class="d-search__suggestion-card__img"
                    v-if="suggestion.image"
                  />
                  <div class="d-search__suggestion-card__content">
                    <span class="d-search__suggestion-card__title">{{ suggestion.name }}</span>
                  </div>
                </a>
              </li>
            </ul>
          </form>
          <div class="chips" v-if="this.form.participantsType == 2">
            <!--<div class="chip" v-for="(item, index) in this.form.regions" :key="item.code">-->
            <div class="chip" v-for="(item, index) in this.form.regionsTemp_iskl" :key="item.code">
              <i class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"></i>
              <span>{{ item.name }}</span>
              <a href="#" class="chip-close" @click.prevent="regionTempDel(index)"></a>
            </div>
          </div>
          <div class="chips" v-else-if="this.form.participantsType == 3">
            <!--<div class="chip" v-for="(item, index) in this.form.regions" :key="item.code">-->
            <div class="chip" v-for="(item, index) in this.form.regionsTemp" :key="item.code">
              <i class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"></i>
              <span>{{ item.name }}</span>
              <a href="#" class="chip-close" @click.prevent="regionTempDel(index)"></a>
            </div>
          </div>
        </div>
        <div class="regions-submit">
          <button
            class="d-button d-button-primary d-button-primary-small d-button--sm-shadow d-ib"
            type="button"
            @click.prevent="setRegions()"
          >
            Добавить
          </button>
        </div>
      </div>
    </customModal>
    <customModal v-model="this.modals.organization" class="select-window">
      <template v-slot:title>Выбрать организации</template>
      <div class="regions-container">
        <div class="regions">
          <form class="d-search d-search--alt">
            <div>
              <i
                class="d-icon-search-big d-search__icon promotions__card-warehouse-search-icon"
              ></i>
              <input
                type="text"
                placeholder="Найти организацию"
                class="d-search__field"
                v-if="this.form.participantsType == '3'"
                v-model="search.organization"
                @focus="search.organizationSuggestionsShow = true"
                @blur="unActivateOrganization()"
                @keypress.enter.prevent=""
              />
              <input
                type="text"
                placeholder="Найти организацию"
                class="d-search__field"
                v-if="this.form.participantsType == '2'"
                v-model="search.organization_iskl"
                @focus="search.organizationSuggestionsShow_iskl = true"
                @blur="unActivateOrganization()"
                @keypress.enter.prevent=""
              />
            </div>

            <ul class="d-search__suggestions" v-if="this.search.organizationSuggestionsShow">
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
                      this.orgSelect(suggestion)
                    }
                  "
                >
                  <img
                    :src="suggestion.image"
                    alt=""
                    class="d-search__suggestion-card__img"
                    v-if="suggestion.image"
                  />
                  <div class="d-search__suggestion-card__content">
                    <span class="d-search__suggestion-card__title">{{ suggestion.name }}</span>
                  </div>
                </a>
              </li>
            </ul>

            <ul
              class="d-search__suggestions"
              v-else-if="this.search.organizationSuggestionsShow_iskl"
            >
              <li
                class="d-search__suggestion"
                v-for="suggestion in organizations_all_iskl"
                :key="suggestion.code"
              >
                <a
                  href="#"
                  class="d-search__suggestion-card"
                  @click.prevent="
                    () => {
                      this.orgSelect(suggestion)
                    }
                  "
                >
                  <img
                    :src="suggestion.image"
                    alt=""
                    class="d-search__suggestion-card__img"
                    v-if="suggestion.image"
                  />
                  <div class="d-search__suggestion-card__content">
                    <span class="d-search__suggestion-card__title">{{ suggestion.name }}</span>
                  </div>
                </a>
              </li>
            </ul>
          </form>
          <div class="chips" v-if="this.form.participantsType == 3">
            <!--<div class="chip" v-for="(item, index) in this.form.regions" :key="item.code">-->
            <div class="chip" v-for="(item, index) in this.form.orgsTemp" :key="item.code">
              <img v-if="item.image" :src="item.image" :alt="item.name" class="chip-img" /><span
                v-else
                class="chip-img"
              ></span>
              <span>{{ item.name }}</span>
              <a href="#" class="chip-close" @click.prevent="orgTempDel(index)"></a>
            </div>
          </div>
          <div class="chips" v-else>
            <!--<div class="chip" v-for="(item, index) in this.form.regions" :key="item.code">-->
            <div class="chip" v-for="(item, index) in this.form.orgsTemp_iskl" :key="item.code">
              <img v-if="item.image" :src="item.image" :alt="item.name" class="chip-img" /><span
                v-else
                class="chip-img"
              ></span>
              <span>{{ item.name }}</span>
              <a href="#" class="chip-close" @click.prevent="orgTempDel(index)"></a>
            </div>
          </div>
        </div>
        <div class="regions-submit">
          <button
            class="d-button d-button-primary d-button-primary-small d-button--sm-shadow d-ib"
            type="button"
            @click.prevent="setOrgs()"
          >
            Добавить
          </button>
        </div>
      </div>
    </customModal>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import Toast from 'primevue/toast'

export default {
  name: 'warehouseStoreSettings',
  components: { Breadcrumbs, Loader, Toast, customModal },
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
      view_form: false,
      form: {
        participantsType: 0,
        regionsTemp: [],
        orgsTemp: [],
        all_organizations_selected: [],
        regions: [],
        regionsTemp_iskl: [],
        orgsTemp_iskl: [],
        all_organizations_selected_iskl: [],
        regions_iskl: [],
      },
      regions_all: {},
      organizations_all: {},
      regions_all_iskl: {},
      organizations_all_iskl: {},
      modals: {
        region: false,
        organization: false,
      },
      // Поиск
      search: {
        region: '',
        regionSuggestionsShow: false,
        organization: '',
        organizationSuggestionsShow: false,
        region_iskl: '',
        regionSuggestionsShow_iskl: false,
        organization_iskl: '',
        organizationSuggestionsShow_iskl: false,
      },
    }
  },
  mounted() {
    this.getStoreSettings().then(() => {
      // Берем географию
      this.getRegions({ exclude: [], filter: '' }).then(() => {
        this.regions_all = this.regions.map(function (el) {
          return { name: el.label, code: el.key }
        })
        this.regions_all_iskl = this.regions.map(function (el) {
          return { name: el.label, code: el.key }
        })
      })
      this.getOrganizations({ exclude: [], filter: '' }).then(() => {
        this.organizations_all = this.organizations.map(function (el) {
          return { name: el.name, code: el.id, image: el.image }
        })
        this.organizations_all_iskl = this.organizations.map(function (el) {
          return { name: el.name, code: el.id, image: el.image }
        })
      })
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      storeSettings: 'org/storeSettings',
      regions: 'addition/regions',
      organizations: 'addition/organizations',
    }),
  },
  methods: {
    ...mapActions({
      getStoreSettings: 'org/getStoreSettings',
      getRegions: 'addition/getRegions',
      getOrganizations: 'addition/getOrganizations',
      setStoreVisible: 'org/setStoreVisible',
    }),
    unActivateOrganization() {
      if (this.form.participantsType == 3) {
        setTimeout(() => (this.search.organizationSuggestionsShow = false), 250)
      } else {
        setTimeout(() => (this.search.organizationSuggestionsShow_iskl = false), 250)
      }
    },
    unActivateRegion() {
      if (this.form.participantsType == 3) {
        setTimeout(() => (this.search.regionSuggestionsShow = false), 250)
      }
      {
        setTimeout(() => (this.search.regionSuggestionsShow_iskl = false), 250)
      }
    },
    regionTempDel(index) {
      if (this.form.participantsType == 3) {
        this.form.regionsTemp.splice(index, 1)
        this.getRegions({ exclude: this.form.regionsTemp, filter: '' }).then(() => {
          this.regions_all = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      } else {
        this.form.regionsTemp_iskl.splice(index, 1)
        this.getRegions({ exclude: this.form.regionsTemp_iskl, filter: '' }).then(() => {
          this.regions_all_iskl = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }
    },
    regionDel(index) {
      if (this.form.participantsType == 3) {
        this.form.regions.splice(index, 1)
        this.form.regionsTemp = this.form.regions
        this.getRegions({ exclude: this.form.regionsTemp, filter: '' }).then(() => {
          this.regions_all = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      } else {
        this.form.regions_iskl.splice(index, 1)
        this.form.regionsTemp_iskl = this.form.regions_iskl
        this.getRegions({ exclude: this.form.regionsTemp_iskl, filter: '' }).then(() => {
          this.regions_all_iskl = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }
    },
    regionSelect(item) {
      console.log(item)
      if (this.form.participantsType == 3) {
        this.form.regionsTemp.push(item)
        // Берем географию
        this.getRegions({ exclude: this.form.regionsTemp, filter: '' }).then(() => {
          this.regions_all = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
        this.search.region = ''
      } else {
        this.form.regionsTemp_iskl.push(item)
        // Берем географию
        this.getRegions({ exclude: this.form.regionsTemp_iskl, filter: '' }).then(() => {
          this.regions_all_iskl = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
        this.search.region_iskl = ''
      }
    },
    setRegions() {
      if (this.form.participantsType == 3) {
        this.form.regions = []
        for (let index = 0; index < this.form.regionsTemp.length; index++) {
          this.form.regions.push(this.form.regionsTemp[index])
        }
      } else {
        this.form.regions_iskl = []
        for (let index = 0; index < this.form.regionsTemp_iskl.length; index++) {
          this.form.regions_iskl.push(this.form.regionsTemp_iskl[index])
        }
      }
      this.modals.region = false
    },
    resolveRegTemp() {
      if (this.form.participantsType == 3) {
        this.form.regionsTemp = []
        for (let index = 0; index < this.form.regions.length; index++) {
          this.form.regionsTemp.push(this.form.regions[index])
        }
        this.getRegions({ exclude: this.form.regionsTemp, filter: '' }).then(() => {
          this.regions_all = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      } else {
        this.form.regionsTemp_iskl = []
        for (let index = 0; index < this.form.regions_iskl.length; index++) {
          this.form.regionsTemp_iskl.push(this.form.regions_iskl[index])
        }
        this.getRegions({ exclude: this.form.regionsTemp_iskl, filter: '' }).then(() => {
          this.regions_all_iskl = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }
    },
    orgTempDel(index) {
      if (this.form.participantsType == 3) {
        this.form.orgsTemp.splice(index, 1)
        this.getOrganizations({ exclude: this.form.orgsTemp, filter: '' }).then(() => {
          this.organizations_all = this.organizations.map(function (el) {
            return { name: el.name, code: el.id, image: el.image }
          })
        })
      } else {
        this.form.orgsTemp_iskl.splice(index, 1)
        this.getOrganizations({ exclude: this.form.orgsTemp_iskl, filter: '' }).then(() => {
          this.organizations_all_iskl = this.organizations.map(function (el) {
            return { name: el.name, code: el.id, image: el.image }
          })
        })
      }
    },
    orgDel(index) {
      if (this.form.participantsType == 3) {
        this.form.all_organizations_selected.splice(index, 1)
        this.form.orgsTemp = this.form.all_organizations_selected
        this.getOrganizations({ exclude: this.form.orgsTemp, filter: '' }).then(() => {
          this.organizations_all = this.organizations.map(function (el) {
            return { name: el.name, code: el.id, image: el.image }
          })
        })
      } else {
        this.form.all_organizations_selected_iskl.splice(index, 1)
        this.form.orgsTemp_iskl = this.form.all_organizations_selected_iskl
        this.getOrganizations({ exclude: this.form.orgsTemp_iskl, filter: '' }).then(() => {
          this.organizations_all_iskl = this.organizations.map(function (el) {
            return { name: el.name, code: el.id, image: el.image }
          })
        })
      }
    },
    orgSelect(item) {
      console.log(item)
      if (this.form.participantsType == 3) {
        this.form.orgsTemp.push(item)
        // Берем географию
        this.getOrganizations({ exclude: this.form.orgsTemp, filter: '' }).then(() => {
          this.organizations_all = this.organizations.map(function (el) {
            return { name: el.name, code: el.id, image: el.image }
          })
        })
        this.search.organization = ''
      } else {
        this.form.orgsTemp_iskl.push(item)
        // Берем географию
        this.getOrganizations({ exclude: this.form.orgsTemp_iskl, filter: '' }).then(() => {
          this.organizations_all_iskl = this.organizations.map(function (el) {
            return { name: el.name, code: el.id, image: el.image }
          })
        })
        this.search.organization_iskl = ''
      }
    },
    setOrgs() {
      if (this.form.participantsType == 3) {
        this.form.all_organizations_selected = []
        for (let index = 0; index < this.form.orgsTemp.length; index++) {
          this.form.all_organizations_selected.push(this.form.orgsTemp[index])
        }
      } else {
        this.form.all_organizations_selected_iskl = []
        for (let index = 0; index < this.form.orgsTemp_iskl.length; index++) {
          this.form.all_organizations_selected_iskl.push(this.form.orgsTemp_iskl[index])
        }
      }
      this.modals.organization = false
    },
    resolveOrgTemp() {
      if (this.form.participantsType == 3) {
        this.form.orgsTemp = []
        for (let index = 0; index < this.form.all_organizations_selected.length; index++) {
          this.form.orgsTemp.push(this.form.all_organizations_selected[index])
        }
        this.getOrganizations({ exclude: this.form.orgsTemp, filter: '' }).then(() => {
          this.organizations_all = this.organizations.map(function (el) {
            return { name: el.name, code: el.id, image: el.image }
          })
        })
      } else {
        this.form.orgsTemp_iskl = []
        for (let index = 0; index < this.form.all_organizations_selected_iskl.length; index++) {
          this.form.orgsTemp_iskl.push(this.form.all_organizations_selected_iskl[index])
        }
        this.getOrganizations({ exclude: this.form.orgsTemp_iskl, filter: '' }).then(() => {
          this.organizations_all_iskl = this.organizations.map(function (el) {
            return { name: el.name, code: el.id, image: el.image }
          })
        })
      }
    },

    debounce(func, delay) {
      clearTimeout(this.searchPTimer)
      this.searchPTimer = setTimeout(func, delay)
    },
    saveSettings() {
      this.loading = true
      let data = {}
      if (this.form.participantsType < 2) {
        data.orgs = null
        data.orgs_iskl = null
        data.regs = null
        data.regs_iskl = null
      } else {
        data.orgs = this.form.all_organizations_selected
        data.orgs_iskl = this.form.all_organizations_selected_iskl
        data.regs = this.form.regions
        data.regs_iskl = this.form.regions_iskl
      }
      data.mode = this.form.participantsType
      this.setStoreVisible({ form: data }).then((res) => {
        if (res.data.data.success) {
          this.$toast.add({
            severity: 'success',
            summary: 'Настройка склада!',
            detail: 'Видимость склада настроена успешно',
            life: 3000,
          })
          this.form = {
            participantsType: 0,
            regionsTemp: [],
            orgsTemp: [],
            all_organizations_selected: [],
            regions: [],
            regionsTemp_iskl: [],
            orgsTemp_iskl: [],
            all_organizations_selected_iskl: [],
            regions_iskl: [],
          }
          this.getStoreSettings()
          this.view_form = false
          this.loading = false
        } else {
          this.loading = false
          this.$toast.add({
            severity: 'error',
            summary: 'Настройка склада!',
            detail: 'Произошла ошибка',
            life: 3000,
          })
        }
      })
    },
  },
  watch: {
    storeSettings: function (newVal) {
      if (Object.keys(newVal).length) {
        this.form.participantsType = newVal.visible_mode
        if (Number(newVal.visible_mode) > 1) {
          this.form.regions = newVal.visible_incl.regs
          this.form.regions_iskl = newVal.visible_iskl.regs
          this.form.all_organizations_selected = newVal.visible_incl.orgs
          this.form.all_organizations_selected_iskl = newVal.visible_iskl.orgs
        }
      }
    },
    regions: function (newVal) {
      this.regions_all = newVal.map(function (el) {
        return { name: el.label, code: el.key }
      })
      this.regions_all_iskl = newVal.map(function (el) {
        return { name: el.label, code: el.key }
      })
    },
    organizations: function (newVal) {
      this.all_organizations = newVal.map(function (el) {
        return { name: el.name, code: el.id, image: el.image }
      })
      this.all_organizations_iskl = newVal.map(function (el) {
        return { name: el.name, code: el.id, image: el.image }
      })
    },

    'search.organizationSuggestionsShow': function (newVal) {
      if (newVal) {
        this.search.organizationSuggestionsShow_iskl = false
      }
    },
    'search.organizationSuggestionsShow_iskl': function (newVal) {
      if (newVal) {
        this.search.organizationSuggestionsShow = false
      }
    },
    'search.regionSuggestionsShow': function (newVal) {
      if (newVal) {
        this.search.regionSuggestionsShow_iskl = false
      }
    },
    'search.regionSuggestionsShow_iskl': function (newVal) {
      if (newVal) {
        this.search.regionSuggestionsShow = false
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
        this.getRegions({ exclude: this.form.regionsTemp, filter: newVal }).then(() => {
          this.regions_all = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }, 300)
    },
    'search.organization': function (newVal, oldVal) {
      if (newVal.length < 3 && oldVal.length < newVal.length) {
        return
      }
      if (newVal.length < 3) {
        newVal = ''
      }
      this.debounce(() => {
        this.getOrganizations({
          exclude: this.form.all_organizations_selected,
          filter: newVal,
        }).then(() => {
          this.organizations_all = this.organizations.map(function (el) {
            return { name: el.name, code: el.id, image: el.image }
          })
        })
      }, 300)
    },
    'search.region_iskl': function (newVal, oldVal) {
      if (newVal.length < 3 && oldVal.length < newVal.length) {
        return
      }
      if (newVal.length < 3) {
        newVal = ''
      }
      this.debounce(() => {
        this.getRegions({ exclude: this.form.regionsTemp_iskl, filter: newVal }).then(() => {
          this.regions_all_iskl = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }, 300)
    },
    'search.organization_iskl': function (newVal, oldVal) {
      if (newVal.length < 3 && oldVal.length < newVal.length) {
        return
      }
      if (newVal.length < 3) {
        newVal = ''
      }
      this.debounce(() => {
        this.getOrganizations({
          exclude: this.form.all_organizations_selected_iskl,
          filter: newVal,
        }).then(() => {
          this.organizations_all_iskl = this.organizations.map(function (el) {
            return { name: el.name, code: el.id, image: el.image }
          })
        })
      }, 300)
    },
  },
}
</script>
<style lang="scss">
.warehouse-settings-table h3 {
  font-size: 22px;
}
.warehouse-settings-table .lk-about__info {
  border-bottom: none;
}
.warehouse-settings-table.lk-staff-edit__table {
  border-bottom: 0.5px solid #75757575;
  padding-bottom: 8px;
}
.warehouse-settings-table .p-datepicker {
  width: 100%;
}
.warehouse-settings-cont {
  display: grid;
  grid-template-columns: auto auto auto 242px;
  grid-template-rows: auto;
  width: 100%;
  min-width: 100%;
  padding-bottom: 32px;
}
.warehouse-settings-cont .store_status {
  margin: 0 0 0 0;
}
.warehouse-settings-cont-item {
  position: relative;
}
.warehouse-settings-cont-item:not(:first-child),
.warehouse-settings-cont-item:not(:last-child) {
  padding: 0 40px;
}
.warehouse-settings-cont-item:first-child {
  padding: 0 40px 0 0;
}
.warehouse-settings-cont-item:last-child {
  padding: 0 0 0 40px;
  display: flex;
  align-items: center;
}
.warehouse-settings-cont-item:not(:last-child):after {
  content: '';
  position: absolute;
  top: calc(50% - 12px);
  right: 0;
  width: 1px;
  height: 24px;
  background-color: #75757575;
}
.warehouse-settings-cont-item-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.warehouse-settings-cont-item-button {
  width: 32px;
  min-width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ededed;
  cursor: pointer;
  border-radius: 32px;
}
.warehouse-settings-cont-item-button--active {
  background-color: #282828;
  color: #fff;
}
.warehouse-settings-cont-item-button:hover {
  box-shadow: 0px 4px 13.4px 0px rgba(0, 0, 0, 0.2588235294);
}
.warehouse-settings-button {
  font-size: 14px;
  font-weight: 500;
}
.warehouse-settings-form {
  width: 100%;
  border-top: 1px solid #75757575;
  padding-top: 48px;
}
.warehouse-settings-form .warehouse-settings-form-title {
  margin-bottom: 40px;
  font-weight: 600;
  font-size: 24px;
  line-height: 31px;
}
.warehouse-settings-form .promo-master__title {
  font-size: 20px;
  line-height: 26px;
}
body .warehouse-settings-form .d-radio__container-vertical {
  flex-direction: row;
}
.warehouse-settings-form .promo-master__audience-changes {
  display: flex;
  gap: 24px;
}
.warehouse-settings-form .promo-master__settings {
  width: 50%;
}
.regions .d-search__suggestion-card__img {
  width: 50px !important;
}
.promotions__card {
  .promotions__card-warehouse-header-container {
    position: relative;
    z-index: 2;
  }
  .d-search {
    z-index: 1;
    .d-search__field {
      padding: 7px 100px 7px 45px !important;
    }
  }
  .d-search--alt .d-search__icon {
    position: absolute;
    z-index: 8;
    top: 50%;
    left: 16px;
    margin: 0;
    transform: translate(0, -14px);
  }
  .d-search .d-search__button {
    height: auto;
    min-height: auto;
    max-height: auto;
    top: 50%;
    right: 4px;
    transform: translate(0, -47%);
  }
}
.d-search--alt {
  padding: 0 2px;
  .d-search__icon {
    display: none;
    position: absolute;
    top: 5px;
    left: 0;
    z-index: 4;
  }
  .d-search__field {
    border-radius: 5px;
  }
  .d-search__suggestions {
    position: absolute;
    overflow-y: auto;
    max-height: 250px;
    .d-search__suggestion {
      align-items: center;
      display: flex;
      a {
        display: flex;
        width: 100%;
      }
      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
    }
  }
}
.select-window {
  .modal-content {
    min-height: 400px;
    .regions {
      padding: 0 15px;
    }
  }
  .regions-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .regions {
    min-height: 300px;
  }
}
.regions-submit {
  display: flex;
  justify-content: center;
}
.chips {
  margin-top: 16px;
}
span.chip-img {
  background: #282828;
}
.chip-img {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: 50%;
}
</style>
