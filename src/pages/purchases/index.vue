<template>
  <section class="promos" id="promos">
    <Toast />
    <div class="promos__header">
      <h1 class="promos__header-title">Акции</h1>
      <!--
        <button class="d-select promos__header-select">
          <span class="d-select__title">Акции по брендам</span>
          <i class="d-icon-angle-rounded-bottom-bold d-select__arrow promos__header-select-icon"></i>
        </button>
      -->
    </div>
    <div v-if="opts.total > 0">
    <div class="promos__banners" v-if="salesBanners.count > 0">
      <div class="dart-row promos__banners-row">
        <div class="d-col-24">
          <Swiper :slides-per-view="1" :space-between="10" :pagination="{ clickable: true }">
            <template v-for="n in getCount" :key="n">
              <SwiperSlide v-if="n < 4">
                <router-link
                  :to="{
                    name: 'purchasesAction',
                    params: { action_id: salesBanners.items[n - 1].action_id },
                  }"
                  v-if="n < 5"
                  class="promos__banners-item promos__banners-item--primary promos__banners-item--big"
                >
                  <img
                    class="promos__banners-item-image"
                    :src="salesBanners.items[n - 1].image.image"
                    :srcset="
                      salesBanners.items[n - 1].image.image +
                      ' 2x, ' +
                      salesBanners.items[n - 1].image.image +
                      ' 1x'
                    "
                    alt=""
                    loading="lazy"
                  />
                  <div class="promos__banners-item-badges">
                    <div class="promos__banners-item-badges-item">Реклама</div>
                    <span class="promos__banners-item-badges-text">0+</span>
                  </div>
                </router-link>
              </SwiperSlide>
            </template>
          </Swiper>
        </div>
      </div>
      <div class="dart-row promos__banners-row" v-if="getCount > 4">
        <template v-for="n in getCount" :key="n">
          <div class="d-col-24 d-col-sm-12" v-if="n > 4 && n < 7">
            <div class="promos__banners-item promos__banners-item--primary">
              <router-link
                :to="{
                  name: 'purchasesAction',
                  params: { action_id: salesBanners.items[n - 1].action_id },
                }"
              >
                <img
                  class="promos__banners-item-image"
                  :src="salesBanners.items[n - 1].image.thumb_medium"
                  :srcset="
                    salesBanners.items[n - 1].image.image +
                    ' 2x, ' +
                    salesBanners.items[n - 1].image.thumb_medium +
                    ' 1x'
                  "
                  alt=""
                  loading="lazy"
                />
                <!--
                <div class="promos__banners-item-badges">
                  <div class="promos__banners-item-badges-item">
                    Реклама
                  </div>
                  <span class="promos__banners-item-badges-text">0+</span>
                </div>
                -->
              </router-link>
            </div>
          </div>
        </template>
      </div>
      <div class="dart-row promos__banners-row promos__banners-row--small" v-if="getCount > 6">
        <template v-for="n in getCount" :key="n">
          <div class="d-col-8">
            <div
              class="promos__banners-item promos__banners-item--primary promos__banners-item--small"
            >
              <router-link
                :to="{
                  name: 'purchasesAction',
                  params: { action_id: salesBanners.items[n - 1].action_id },
                }"
              >
                <img
                  class="promos__banners-item-image"
                  :src="salesBanners.items[n - 1].image.thumb_medium"
                  :srcset="
                    salesBanners.items[n - 1].image.image +
                    ' 2x, ' +
                    salesBanners.items[n - 1].image.thumb_medium +
                    ' 1x'
                  "
                  alt=""
                  loading="lazy"
                />
                <!--
                <div class="promos__banners-item-badges">
                  <div class="promos__banners-item-badges-item">
                    Реклама
                  </div>
                  <span class="promos__banners-item-badges-text">0+</span>
                </div>
                -->
              </router-link>
            </div>
          </div>
        </template>
      </div>
    </div>
    </div>
    <div v-else class="promos__novendors">
      <div class="promos__novendors-text">
        <p>Вы пока не добавили ни одного поставщика.</p>
        <p>Подключить поставщика можно в разделе
          <router-link
              :to="{name: 'purchasesVendors', params: { id: this.$route.params.id }}"
            >
            Закупки - Мои поставщики
          </router-link>
          или</p>

      </div>
      <button
        type="button"
        href="#"
        class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
        @click.prevent="this.modalAdd = true"
      >
        <i class="d-icon-plus-flat clients__filters-create-icon"></i>Добавить поставщика
      </button>
      <teleport to="body" v-if="this.modalAdd === true">
        <customModal v-model="this.modalAdd" class="clients-form__modal-main">
          <div class="clients-info__value-container">
            <h2>Добавление поставщика</h2>
            <div class="clients-info__label">Обратитесь к своему поставщику за кодом</div>
            <form
              class="clients-form__modal"
              @submit.prevent="formAddVendor()"
              :class="{ 'd-input--error': v$.form.code.$error }"
            >
              <InputOtp
                class="clients-form__modal-numbers"
                :class="{ 'd-input--error': v$.form.code.$error }"
                :length="6"
                v-model="form.code"
                integerOnly
              />
              <div v-if="v$.form.code.$error" class="d-input-error">
                <i class="d-icon-warning d-input-error__icon"></i>
                <span v-if="v$.form.code.required" class="d-input-error__text"
                  >Пожалуйста, введите код поставщика</span
                >
              </div>
              <div class="clients-form__modal-buttons">
                <button
                  type="button"
                  href="#"
                  class="d-button d-button-primary d-button--sm-shadow  clients__filters-create clients__filters-cansel"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  href="#"
                  class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
                >
                  Ok
                </button>
              </div>

            </form>
          </div>
        </customModal>
      </teleport>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'
import customModal from '@/shared/ui/Modal.vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import Toast from 'primevue/toast'
import InputOtp from 'primevue/inputotp';

SwiperCore.use([Pagination])

export default {
  name: 'purchasesMain',
  data(){
    return{
      modalAdd: false,
      form: {
        code: '',
      },
    }
  },
  components: { Swiper, SwiperSlide, customModal, Toast, InputOtp },
  mounted() {
    this.getSalesBanners()
    this.getOpts({
      page: 0,
      perpage: 0,
      filter: 0,
      filtersdata: 0,
    })
  },
  methods: {
    ...mapActions({
      getSalesBanners: 'sales/getSalesBanners',
      getOpts: 'purchases/getOpts',
      setNewOrgProfile: 'purchases/setNewOrgProfile',
    }),
    formAddVendor() {
      this.v$.$touch()
      this.$load(async () => {
        await this.setNewOrgProfile({
          code: this.form.code,
        }).then((res) => {
          // console.log(res)
          if (res.data.data.success) {
            this.$toast.add({
              severity: 'success',
              summary: 'Поставщик успешно добавлен!',
              detail: res.data.data.message,
              life: 3000,
            })
            this.getOpts({
              page: 0,
              perpage: 0,
              filter: 0,
              filtersdata: 0,
            })
            this.modalAdd = false
          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: res.data.data.message,
              life: 3000,
            })
          }
        })
      })
    },
  },
  computed: {
    ...mapGetters({
      salesBanners: 'sales/salesBanners',
      opts: 'purchases/opts',
    }),
    getCount() {
      return this.salesBanners.count
    },
  },
  watch: {
    salesBanners: function () {
      // console.log(newVal)
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'))
      }, 500)
    },
    $route: {
      handler: function () {
        if (this.$route.params.id) {
          this.getSalesBanners()
        }
      },
    },
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      form: {
        code: {
          required,
        },
      },
    }
  },
}
</script>
<style lang="scss">
.promos {
  width: 100%;
  overflow: hidden;
}
.swiper-wrapper {
  box-sizing: border-box;
}
.swiper-pagination {
  display: flex;
  align-items: center;
  gap: 16px;
  position: absolute;
  bottom: 16px;
  left: 50%;
  translate: -50% 0;
  z-index: 2;
  .swiper-pagination-bullet {
    cursor: pointer;
    background-color: #282828;
    border-radius: 26px;
    opacity: 0.5;
    width: 40px;
    height: 4px;
    &.swiper-pagination-bullet-active {
      opacity: 1;
    }
  }
}

.promos__banners-row--small > div {
  margin-bottom: 16px;
}
.promos__banners-item {
  display: block;
  width: 100%;
  height: 100% !important;
  &.promos__banners-item--primary {
    background: transparent;
  }
  .promos__banners-item-image {
    width: 100%;
    display: block;
    border-radius: 13px;
    overflow: hidden;
  }
}

  .promos__novendors{
    width:100%;
    height: calc(100vh - var(--header-height) - 250px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }
  .promos__novendors-text{
    font-weight: 400;
    font-size: 24px;
    line-height: 31px;
    text-align: center;
    color: #757575;
    opacity: 0.92;
  }
  .promos__novendors-text a:hover{
    color: #F92C0D;
  }
  .clients-form__modal-main .clients-info__value-container{
    margin-top: -20px;
  }
  .clients-form__modal-main .clients-info__value-container h2{
    font-size: 20px;
  }
  .clients-form__modal-main .modal-content {
    max-width: 660px;
  }
  .clients-form__modal-main .clients-info__label{
    margin: 8px 0 34px;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #757575;
  }
  .clients-form__modal-main .clients-form__modal{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 34px;
  }
  .clients-form__modal-main .p-inputotp {
    gap: 24px;
  }
  .clients-form__modal-main .p-inputotp-input{
    width: 50px;
    height: 60px;
  }
  .clients-form__modal-main .p-inputtext{
    font-weight: 600;
    font-size: 24px;
    line-height: 31px;
    color: #28282894;
  }
  .clients-form__modal-main .d-input-error{
    justify-content: center;
    margin-top:-24px
  }
  .clients-form__modal-main .clients__filters-cansel{
    background-color: transparent;
    border: 1px solid #282828;
    color:#282828;
  }
  .clients-form__modal-main .clients__filters-cansel:hover{
    background-color: #282828;
    border: 1px solid #282828;
    color:#ededed;
  }
  .clients-form__modal-main .clients-form__modal-buttons{
    display: flex;
    gap: 16px;
  }
  .clients-form__modal-main .clients__filters-create{
    min-width: 112px;
  }
  @media (width <=1536px){
    .promos__novendors-text{
      font-size: 20px;
      line-height: 26px;
    }
  }
  @media (width <=1280px){
    .promos__novendors{
      gap: 16px;
      height: calc(100vh - var(--header-height) - 150px);

    }
    .promos__novendors-text{
      font-size: 18px;
      line-height: 22px;
    }
  }
  @media (width <=1024px){
    .promos__novendors{
      gap: 8px;
    }
    .promos__novendors-text{
      font-size: 10px;
      line-height: 12px;
    }
    .clients-form__modal-main .clients-info__label{
      margin: 8px 0 16px;
    }
    .clients-form__modal-main .clients-info__value-container h2{
      font-size: 12px;
    }
    .clients-form__modal-main .clients-info__label{
      font-size: 10px;
    }
    .clients-form__modal-main .clients-form__modal{
      gap: 16px;
    }
    .clients-form__modal-main .p-inputotp {
      gap: 16px;
    }
    .clients-form__modal-main .p-inputotp-input{
      width: 40px;
      height: 50px;
    }
    .clients-form__modal-main .p-inputtext{
      font-size: 20px;
      line-height: 24px;
    }
    .clients-form__modal-main .d-input-error{
      margin-top:-8px
    }
  }
  @media (width <=800px){
    .promos__novendors-text{
      font-size: 8px;
      line-height: 12px;
    }
    .clients-form__modal-main .modal-content {
      max-width:80%;
    }
    .clients-form__modal-main .clients-info__label{
      margin: 8px 0 8px;
    }
    .clients-form__modal-main .clients-info__value-container h2{
      font-size: 9px;
    }
    .clients-form__modal-main .clients-info__label{
      font-size: 8px;
    }
    .clients-form__modal-main .clients-form__modal{
      gap: 8px;
    }
    .clients-form__modal-main .p-inputotp {
      gap: 8px;
    }
    .clients-form__modal-main .p-inputotp-input{
      width: 30px;
      height: 40px;
    }
    .clients-form__modal-main .p-inputtext{
      font-size: 10px;
      line-height: 14px;
    }
    .clients-form__modal-main .d-input-error{
      margin-top:0px
    }
  }
  @media (width <=600px){
    .promos__novendors{
      gap: 16px;
      padding: 0 44px;
      height: calc(100vh - var(--header-height) - 75px - var(--sidebar-height));
    }
    .promos__novendors-text{
      font-size: 14px;
      line-height: 20px;
    }
    .clients-form__modal-main .clients-info__value-container h2{
      font-size: 16px;
    }
    .clients-form__modal-main .modal-content {
      max-width: 100%;
    }
    .clients-form__modal-main .clients-info__label{
      margin: 8px 0 34px;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: #757575;
    }
    .clients-form__modal-main .clients-form__modal{
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      gap: 34px;
    }
    .clients-form__modal-main .p-inputotp {
      gap: 16x;
    }
    .clients-form__modal-main .p-inputotp-input{
      width: 50px;
      height: 60px;
    }
    .clients-form__modal-main .p-inputtext{
      font-size: 24px;
      line-height: 31px;
    }

    .clients-form__modal-main .clients-form__modal{
      height: calc(100vh - 190px);
    }
    .clients-form__modal-main .p-inputotp, .clients-form__modal-main .clients-form__modal-buttons {
      justify-content: space-between;
      width:100%;
    }
    .clients-form__modal-main .d-input-error{
      margin-top:-24px
    }
    .clients-form__modal-main .clients-form__modal-buttons{
      flex-direction:column-reverse;
    }
    .clients-form__modal-main .clients__filters-create {
        min-width: 100%;
    }
  }
  @media (width <=440px){
    .clients-form__modal-main .p-inputotp-input{
      width: 33px;
      height: 43px;
    }

  }
  @media (width <=320px){
    .promos__novendors{
      padding: 0 30px;
      width: 100%;
    }
    .clients-form__modal-main .p-inputotp-input{
      width: 23px;
      height: 33px;
    }

  }

</style>
