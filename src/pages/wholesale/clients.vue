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
        <h1 class="clients__header-title">Мои клиенты ({{ dilers.total }})</h1>
      </div>
      <p class="clients__header-description">
        Доступные организации, которые являются вашими клиентами
      </p>
    </div>

    <div class="clients__filters">
      <div class="clients__filters-left">
        <div class="clients__filters-input-container">
          <div class="d-input d-input--light clients__filters-input">
            <input
              type="text"
              placeholder="Введите название организации"
              name="orgName"
              class="d-input__field clients__filters-input-field"
            />
            <div class="d-input__actions clients__filters-input-actions">
              <button class="d-icon-wrapper clients__filters-input-button">
                <i class="d-icon-search-big"></i>
              </button>
            </div>
          </div>
          <div class="d-input d-input--light clients__filters-input">
            <input
              type="text"
              placeholder="Найдите менеджера"
              name="date"
              class="d-input__field clients__filters-input-field"
            />
            <div class="d-input__actions clients__filters-input-actions">
              <button class="d-icon-wrapper clients__filters-input-button">
                <i class="d-icon-search-big"></i>
              </button>
              <div
                class="d-divider d-divider--vertical d-input__actions-divider clients__filters-input-actions-divider"
              ></div>
              <button class="d-icon-wrapper clients__filters-input-button">
                <i class="d-icon-angle-rounded-bottom-bold"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="d-radio__wrapper clients__filters-radio-wrapper">
          <label for="vendorCreated" class="d-radio clients__filters-radio">
            <input
              type="checkbox"
              name="test-radios"
              id="vendorCreated"
              class="d-radio__input clients__filters-radio-input"
            />
          </label>

          <label for="vendorCreated" class="d-radio__label clients__filters-radio-label"
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

            <div class="clients__card-contact-container d-col-15" :class="item.credit.deb_summ > 0 || item.credit.deb_summ_expired > 0 ? 'clients__devider' : ''">
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
          <div class="clients__card-right-left d-col-3" :class="item.credit.deb_summ > 0 || item.credit.deb_summ_expired > 0 ? 'clients__devider' : ''">
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

            <div class="clients__card-vendor" v-if="item.credit.deb_summ > 0 || item.credit.deb_summ_expired > 0">Создан поставщиком</div>
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
              <div class="clients__card-vendor" v-if="item.credit.deb_summ > 0 || item.credit.deb_summ_expired > 0">Создан поставщиком</div>
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
      <div class="clients__paginate" v-if="pagesCount > 1"></div>
      <paginate
          :page-count="pagesCount"
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
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Paginate from 'vuejs-paginate-next'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'WholesaleClients',
  components: { Breadcrumbs, Loader, Paginate },
props: {
    pagination_items_per_page: {
      type: Number,
      default: 5,
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
      filters: {
        name: {
          name: 'Название организации',
          placeholder: 'Введите название организации',
          type: 'text',
        },
        manager: {
          name: 'Менеджер',
          placeholder: 'Найдите менеджера',
          type: 'text',
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
    filter(data) {
      console.log(data)
      this.loading = true
      this.unsetDilers()
      this.page = 1
      this.getDilers(data).then(() => {
      this.loading = false
      })
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
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.loading = false
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
    pagesCount() {
      let pages = Math.ceil(this.dilers.total / this.pagination_items_per_page)
      if (pages === 0) {
        pages = 1
      }
      return pages
    },
  },
  watch: {},
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
@media (width <= 1280px) {
.clients__devider:before{
  display:none;
}
}
</style>
