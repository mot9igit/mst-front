<template>
  <section class="clients" id="clients">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <a class="d-back d-top-back">
        <i class="d-icon-arrow d-back__icon d-top-back-icon"></i>
        <span class="d-back__text">Назад</span>
      </a>
      <Breadcrumbs />
    </div>

    <div class="clients__header">
      <div class="clients__header-title-wrapper">
        <h1 class="clients__header-title">Мои клиенты (<span v-if="dilers.total > -1">{{ dilers.total }}</span
					><span v-else>0</span>)</h1>
      </div>
      <p class="clients__header-description">
        Доступные организации, которые являются вашими клиентами
      </p>
    </div>

    <div class="clients__filters">
      <div class="clients__filters-left">
        <div class="clients__filters-input-container"  v-for="(ffilter, i) in filters" :key="i">
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
            <!---->
            <div class="d-input__actions clients__filters-input-actions">
              <button class="d-icon-wrapper clients__filters-input-button" >
                <i class="d-icon-search-big"></i>
              </button>
            </div>
          </div>
          <div class="d-input d-input--light clients__filters-input clients__filters-input-multiselect"  v-if="ffilter.type == 'dropdown'">
            <div class="dart-form-group" v-if="ffilter.type == 'dropdown'">
              <MultiSelect v-model="filterValues[i]" :options="ffilter.values" optionLabel="name" filter :placeholder="ffilter.placeholder"
    :maxSelectedLabels="ffilter.values.length" class="d-input__field clients__filters-multiselect-field" @change="setFilter"/>
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
        <div class="d-radio__wrapper clients__filters-radio-wrapper"   v-for="(ffilter, i) in filters" :key="i"  >
          <label for="vendorCreated" class="p-checkbox p-component" v-if="ffilter.type == 'checkbox'">

            <Checkbox
              :inputId="'input' + i"
              :name="i"
              value="1"
              v-model="filterValues[i]"
              @change="setFilter"
              class="p-radio-input clients__filters-radio-input"
            />

          </label>
          <label for="vendorCreated" class="d-radio__label clients__filters-radio-label"  v-if="ffilter.type == 'checkbox'"
            >Созданные поставщиком
          </label>
        </div>
      </div>

      <button class="d-button d-button-primary d-button--sm-shadow clients__filters-create">
        <i class="d-icon-plus-flat clients__filters-create-icon"></i>
        Новый клиент
      </button>
    </div>
    <Loader v-if="loading" />
    <div class="clients__card-container" v-else>
      <div class="clients__card dart-row" v-for="(item, index) in dilers.items" :key="index">
        <div class="clients__card-left d-col-16">
          <div class="clients__card-info  d-col-7 clients__devider">
            <div class="clients__card-info-image-container">
              <img :src="item.image" alt="" class="clients__card-info-image" />
            </div>
            <div class="clients__card-info-content">
              <p class="clients__card-info-title">{{ item.name }}</p>
              <div class="clients__card-info-address">
                <i class="d-icon-location clients__card-info-address-icon"></i>
                <span>{{ item.req?.fact_address}}</span>
              </div>
            </div>
          </div>

          <div class="clients__card-data  d-col-7">

            <div class="clients__card-inn d-col-9 clients__devider">
              <p class="clients__card-inn-label">ИНН:</p>
              <p class="clients__card-inn-value">{{ item.req?.inn }}</p>
            </div>

            <div class="clients__card-contact-container d-col-15" :class="item.owner_id > 0 && item.owner_id == this.$route.params.id ? 'clients__devider' : ''">
              <a :href="'tel:' + item.phone.replace(/[^+\d]/g, '')" class="clients__card-contact">
                <i class="d-icon-telephone clients__card-contact-icon"></i>
                <span>{{ item.phone }}</span>
              </a>
              <a :href="'mailto:'+item.email" class="clients__card-contact">
                <i class="d-icon-mail2 clients__card-contact-icon"></i>
                <span>{{ item.email }}</span>
              </a>
            </div>
          </div>
        </div>

        <div class="clients__card-right d-col-8">
          <div class="clients__card-right-left d-col-3" :class="item.owner_id > 0 && item.owner_id == this.$route.params.id ? 'clients__devider' : ''">
             <!--<div class="d-divider d-divider--vertical clients__card-divider"></div>
           <div class="clients__card-price-container">
              <div class="clients__card-price">
                <span class="clients__card-price-label">ДЗ:</span>
                <span class="clients__card-price-value">5 500 000 ₽</span>
              </div>
              <div class="clients__card-price clients__card-price--secondary">
                <span class="clients__card-price-label">ПЗД:</span>
                <span class="clients__card-price-value">3 200 000 ₽</span>
              </div>
            </div>-->

            <div class="clients__card-vendor" v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id">Создан поставщиком</div>
          </div>
          <div class="clients__card-right-right d-col-7">
            <div class="d-col-18 clients__devider">
            <button class="d-button d-button-primary d-button--sm-shadow clients__card-offer">
              <i class="d-icon-plus-flat clients__card-offer-icon"></i>
              Предложение
            </button>
            </div>
            <div class="clients__card-action-container d-col-6">
              <button class="clients__card-action">
                <i class="d-icon-pen2"></i>
              </button>
              <div
                class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
              ></div>
              <button class="clients__card-action">
                <i class="d-icon-trash"></i>
              </button>
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
                <span>{{ item.req?.fact_address}}</span>
              </div>
            </div>
          </div>

          <div class="clients__card-top-right">
            <div class="clients__card-top-right-top">
              <button class="d-button d-button-primary d-button--sm-shadow clients__card-offer">
                <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                Предложение
              </button>
              <div class="clients__card-action-container">
                <button class="clients__card-action">
                  <i class="d-icon-pen2"></i>
                </button>
                <div
                  class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
                ></div>
                <button class="clients__card-action">
                  <i class="d-icon-trash"></i>
                </button>
              </div>
            </div>
            <div class="clients__card-vendor-wrapper">
              <div class="clients__card-vendor" v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id">Создан поставщиком</div>
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
              <a :href="'mailto:'+item.email" class="clients__card-contact">
                <i class="d-icon-mail2 clients__card-contact-icon"></i>
                <span>{{ item.email }}</span>
              </a>
            </div>
            <div class="clients__card-inn">
              <p class="clients__card-inn-label">ИНН:</p>
              <p class="clients__card-inn-value">{{ item.req?.inn }}</p>
            </div>
          </div>

          <!--<div class="clients__card-price-container">
            <div class="clients__card-price">
              <span class="clients__card-price-label">ДЗ:</span>
              <span class="clients__card-price-value">5 500 000 ₽</span>
            </div>
            <div class="clients__card-price clients__card-price--secondary">
              <span class="clients__card-price-label">ПЗД:</span>
              <span class="clients__card-price-value">3 200 000 ₽</span>
            </div>
          </div>-->
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
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Paginate from 'vuejs-paginate-next'
import Loader from '@/shared/ui/Loader.vue'
import Checkbox from 'primevue/checkbox'
import { toRaw } from 'vue'
import  { MultiSelect } from 'primevue'

export default {
  name: 'WholesaleClients',
  components: { Breadcrumbs, Loader, Paginate, Checkbox, MultiSelect },
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
        manager: {
          name: 'Менеджер',
          placeholder: 'Выберите менеджера',
          type: 'dropdown',
          values: []
        },
        our: {
					name: 'Созданные поставщиком',
					placeholder: 'Созданные поставщиком',
					type: 'checkbox',
					values: 1
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
      console.log(pageNum)
      this.paginate({

        filter: this.filterText,
        filtersdata: toRaw(this.filterValue),
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
    

  },
  mounted() {
    this.getDilers({
			type: 1,
			page: this.page,
			perpage: this.pagination_items_per_page
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
		});
    this.getStores({
			id: this.$route.params.id,
		});
  },
  computed: {
    ...mapGetters({
      dilers: 'wholesale/dilers',
      managers: 'wholesale/managers',
      stores: 'wholesale/stores',
    }),
    
    
  },
  watch: {
    managers: function (newVal, oldVal) {
			this.filters.manager.values = newVal
		},
    dilers: function (newVal, oldVal) {
			this.countPages = Math.ceil(this.dilers.total / this.pagination_items_per_page)
      if (this.countPages === 0) {
        this.countPages = 1
      }
      
		}
  },
}
</script>
<style lang="scss">
.clients__card, .clients__card-data, .clients__card-right, .clients__card-right-left, .clients__card-right-right  {
    gap: 0;
}
.clients__card-info-content{
  padding-right:12px;
}
.clients__card-inn{
  padding-right:12px;
  padding-left:12px;
}
.clients__card-contact-container{
  padding-right:12px;
  padding-left:20px;
}
.clients__devider:before{
    content: '';
    position: absolute;
    top: calc(50% - 10px);
    right: 0;

    width: 0.5px;
    height: 20px;
    background-color: #75757575;
}
.clients__filters-input select{
  width: 100%;

}
.clients__filters-radio-wrapper .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box,
.clients__filters-radio-wrapper .p-checkbox-checked .p-checkbox-box, .p-multiselect-overlay .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box,
.p-multiselect-overlay .p-checkbox-checked .p-checkbox-box {
  border-color: rgba(249, 44, 13, 1);
  background: rgba(249, 44, 13, 1);
}
.clients__filters-input-actions .d-icon-wrapper:hover, .clients__filters-input-actions .d-icon-wrapper--active {
    background-color: transparent;
    box-shadow: none;
    color: var(--d-icon-wrapper-color-hover);
}
.clients__filters-input-actions button:first-child{
  cursor:default;
}
.clients__filters-input .p-multiselect {
    background: transparent;
    border: none;
}
.clients__filters-input-multiselect .clients__filters-input-actions{
    position: absolute;
    right: 20px;
}
.clients__filters-input-multiselect .p-multiselect-label {
    padding-right: 35px;
}
.clients__filters-input .dart-form-group{
  width:100%;
}
@media (width <= 1280px) {
.clients__devider:before{
  display:none;
}
}
</style>
