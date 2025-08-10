<template>
  <section class="lk-about" id="lk-about">
    <!-- Верхушка страницы -->
     <Toast />
    <div class="d-top">
      <a class="d-back d-top-back">
        <i class="d-icon-arrow d-back__icon d-top-back-icon"></i>
        <span class="d-back__text">Назад</span>
      </a>
      <breadcrumbs/>
    </div>

  <!--  <ul class="d-tab2__container lk-about__tabs">
      <li class="d-tab2 d-tab2--active">
        <a href="/views/lk/about/index.html">О компании</a>
      </li>
      <li class="d-tab2">
        <a href="/views/lk/staff/index.html">Сотрудники</a>
      </li>
      <li class="d-tab2">
        <a href="/views/lk/access/index.html">Права доступа</a>
      </li>
    </ul>-->

     <h1>О компании</h1>

     <Loader v-if="loading" />
     <div v-else>
      <form @submit.prevent="changeOrgProfile()">
      <div class="lk-about__info-container" >
        <div class="lk-about__info">
          <div class="lk-about__info-title-wrapper">
            <p class="lk-about__info-title-label">Название компании</p>
            <p class="lk-about__info-title-description">Отображается для покупателей</p>
          </div>

          <div class="d-input d-input--light lk-about__info-input" :class="{ 'd-input--error': v$.form.nameEntered.$error }">
            <input
              type="text"
              placeholder="Название компании"
              :value="orgprofile.name"
              :v-model="form.nameEntered"
              name="name"
              class="d-input__field lk-about__info-input-field"
              @input="this.showSaveButton = true"
            />
            <div v-if="v$.form.nameEntered.$error" class="d-input-error">
              <i class="d-icon-warning d-input-error__icon"></i>
              <span v-if="v$.form.nameEntered.required" class="d-input-error__text"
                >Пожалуйста, введите название организации</span
              >
            </div>
          </div>
          <button  
            type="button"
            class="d-button d-button-quaternary d-button--no-shadow lk-about__info-button"
            @click.prevent="this.modalAddCompany = true"
          >
            <i class="d-icon-plus-flat lk-about__info-button-icon"></i>
            <span>Добавить компанию</span>
          </button>
        </div>
        <div class="lk-about__info">
          <div class="lk-about__info-title-wrapper">
            <p class="lk-about__info-title-label">Логотип компании</p>
            <p class="lk-about__info-title-description">Отображается для покупателей</p>
          </div>

          <div class="lk-about__info-image-wrapper" v-if="orgprofile.image != ''">
            <img :src="orgprofile.image" alt="" class="lk-about__info-image" />
        </div>
          
        </div>
        <div class="lk-about__info">
          <div class="lk-about__info-title-wrapper">
            <p class="lk-about__info-title-label">Код поставщика</p>
            <p class="lk-about__info-title-description">Данный необходим вашим клиентам, для подключения к вашему каталогу в МС: Закупки</p>
          </div>

          <div class="lk-about__info-text-wrapper">
            <p class="lk-about__info-text">{{ orgprofile.id }}</p>
          </div>
          
        </div>
        <div class="lk-about__info">
          <div class="lk-about__info-title-wrapper">
            <p class="lk-about__info-title-label">Телефон компании</p>
            <p class="lk-about__info-title-description">Отображается для покупателей</p>
          </div>

          <div class="d-input d-input--light lk-about__info-input" :class="{ 'd-input--error': v$.form.phoneEntered.$error }">
            <input
              type="text"
              placeholder="Телефон компании"
              :value="orgprofile.phone"
              :v-model="form.phoneEntered"
              name="phone"
              class="d-input__field lk-about__info-input-field"
              @input="this.showSaveButton = true"
            />
            <div v-if="v$.form.phoneEntered.$error" class="d-input-error">
              <i class="d-icon-warning d-input-error__icon"></i>
              <span v-if="v$.form.phoneEntered.required" class="d-input-error__text"
                >Пожалуйста, введите телефон организации</span
              >
            </div>
          </div>
        </div>
        <div class="lk-about__info">
          <div class="lk-about__info-title-wrapper">
            <p class="lk-about__info-title-label">Email компании</p>
            <p class="lk-about__info-title-description">Отображается для покупателей</p>
          </div>

          <div class="d-input d-input--light lk-about__info-input" :class="{ 'd-input--error': v$.form.emailEntered.$error }">
            <input
              type="text"
              placeholder="Email компании"
              :value="orgprofile.email"
              :v-model="form.emailEntered"
              name="name"
              class="d-input__field lk-about__info-input-field"
              @input="this.showSaveButton = true"
            />
            <div v-if="v$.form.emailEntered.$error" class="d-input-error">
              <i class="d-icon-warning d-input-error__icon"></i>
              <span v-if="v$.form.emailEntered.required" class="d-input-error__text"
                >Пожалуйста, введите email организации</span
              >
            </div>
          </div>
        </div> 
      </div>
      <div class="lk-about__submit-container">
        <button
						type="submit"
						href="#"
						class="d-button d-button-primary d-button-primary-small d-button--sm-shadow lk-about__submit-button"
            v-if="showSaveButton === true"
				>
          Сохранить изменения
        </button>
      </div>
      </form>
    <div class="lk-about__block lk-about__block--requisites">
      <div class="lk-about__block-header">
        <div class="lk-about__block-header-title-wrapper">
          <p class="lk-about__block-header-title">Реквизиты</p>
          <p class="lk-about__block-header-title-description">
            Вы можете подать запрос на изменение или добавление реквизитов. Самостоятельно изменить
            их нельзя.
          </p>
        </div>
        <button
          class="d-button d-button-tertiary d-button-tertiary-small d-button--no-shadow lk-about__block-header-button"
          @click.prevent="this.modalRequisites = true"
        >
          Подать запрос
        </button>
      </div>

      <p class="lk-about__block-subtitle">Реквизиты {{ orgRequisites.name.value }}</p>

      <div class="lk-about__block-table" >
        <div class="lk-about__block-table-row" >
          <div class="lk-about__block-table-col" v-for="(reqv, index) in orgRequisites" :key="index">
            <p class="lk-about__block-table-label">{{ reqv.name }}</p>
            <p class="lk-about__block-table-value">{{ reqv.value != '' ? reqv.value : '-' }}</p>
          </div>
        </div>
      </div>

      <div class="d-radio__wrapper lk-about__block-radio-wrapper">
        <label for="forMarketplace" class="d-radio lk-about__block-radio">
          <input
            type="checkbox"
            name="forMarketplace"
            id="forMarketplace"
            class="d-radio__input lk-about__block-radio-input"
          />
        </label>

        <label for="forMarketplace" class="d-radio__label lk-about__block-radio-label"
          >Реквизиты для маркетплейса
        </label>
      </div>
    </div>

    <div class="lk-about__flexend" v-if="requisitesShow === false">
      <button
          class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
          @click.prevent="requisitesShow = !requisitesShow">
          <i class="d-icon-plus lk-about__block-header-button-icon"></i>
          Показать банковские реквизиты
        </button>
    </div>
    <div class="lk-about__block" v-else>
      <div class="lk-about__block-header">
        <div class="lk-about__block-header-title-wrapper">
          <p class="lk-about__block-header-title">Банковские реквизиты</p>
        </div>
        <button
          class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
          @click.prevent="requisitesShow = !requisitesShow">
          <i class="d-icon-minus lk-about__block-header-button-icon"></i>
          Скрыть банковские реквизиты
        </button>
      </div>

      <div class="lk-about__block-table">
        <div class="lk-about__block-table-row">
          <div class="lk-about__block-table-col" v-for="(bank, index) in orgBankRequisites" :key="index">
            <p class="lk-about__block-table-label">{{ bank.name }}</p>
            <p class="lk-about__block-table-value">{{ bank.value != '' && bank.value != undefined ? bank.value : '-' }}</p>
          </div>
        </div>
      </div>
    </div>



    </div>

    <teleport to="body">
    <customModal v-model="this.modalRequisites" class="lk-about-form__modal">
      <div class="lk-about-info__value-container">
        <h2>Запрос на добавление/изменение реквизитов</h2>
        <form class="lk-about-form__modal"  @submit.prevent="">
          

        <div class="lk-about__block-table" >
          <div class="lk-about__block-table-row" >
            <div class="lk-about__block-table-col" v-for="(reqv, index) in orgRequisites" :key="index">
              <p class="lk-about__block-table-label">{{ reqv.name }}</p>
              <input
              type="text"
              :v-model="index"
              class="d-input__field lk-about__info-input-field"
              >
            </div>
          </div>
        </div>

        <div class="d-radio__wrapper lk-about__block-radio-wrapper">
          <label for="forMarketplace" class="d-radio lk-about__block-radio">
            <input
              type="checkbox"
              name="forMarketplaceNew"
              id="forMarketplaceNew"
              class="d-radio__input lk-about__block-radio-input"
            />
          </label>

          <label for="forMarketplace" class="d-radio__label lk-about__block-radio-label"
            >Реквизиты для маркетплейса
          </label>
        </div>

        <div class="lk-about__flexend" v-if="requisitesShow === false">
      <button
          class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
          @click.prevent="requisitesShow = !requisitesShow">
          <i class="d-icon-plus lk-about__block-header-button-icon"></i>
          Добавить банковские реквизиты
        </button>
        </div>

        <div class="lk-about__block" v-else>
          <div class="lk-about__block-header">
            <div class="lk-about__block-header-title-wrapper">
              <p class="lk-about__block-header-title">Банковские реквизиты</p>
            </div>
            <button
              class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
              @click.prevent="requisitesShow = !requisitesShow">
              <i class="d-icon-minus lk-about__block-header-button-icon"></i>
              Скрыть банковские реквизиты
            </button>
          </div>

          <div class="lk-about__block-table">
            <div class="lk-about__block-table-row">
              <div class="lk-about__block-table-col" v-for="(bank, index) in orgBankRequisites" :key="index">
                <p class="lk-about__block-table-label">{{ bank.name }}</p>
                <input
                type="text"
                :v-model="index"
                class="d-input__field lk-about__info-input-field"
                >
              </div>
            </div>
          </div>
        </div>

        <button
						type="submit"
						href="#"
						class="d-button d-button-primary d-button-primary-small d-button--sm-shadow lk-about-info__button"
				>
          Отправить запрос
        </button>
      </form>
			</div>
    </customModal>
    </teleport>

    <teleport to="body">
    <customModal v-model="this.modalAddCompany" class="lk-about-form__modal">
      <div class="lk-about-info__value-container">
        <h2>Добавить компанию</h2>
        <form class="lk-about-form__modal"  @submit.prevent="">
        <button
						type="submit"
						href="#"
						class="d-button d-button-primary d-button-primary-small d-button--sm-shadow lk-about-info__button"
				>
          Добавить
        </button>
      </form>
			</div>
    </customModal>
    </teleport>

  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import InputText from 'primevue/inputtext'
import { toRaw } from 'vue'
import Toast from "primevue/toast";
import customModal from '@/shared/ui/Modal.vue'


export default {
  name: 'ProfileMain',
  components: { Breadcrumbs, Loader, InputText, Toast, customModal },
  data(){
    return {
      loading: false,
      showSaveButton: false,
      requisitesShow: true,
      orgReqValues: [],
      orgBankValues: [],
      modalRequisites: false,
      modalAddCompany: false,
      form: {
        nameEntered: '',
        phoneEntered: '',
        emailEntered: '',
      },
      orgRequisites: {
        name: {
          name: 'Наименования юридического лица',
          value: '',
        },
        inn: {
          name: 'ИНН',
          value: '',
        },
        ogrn:{
          name: 'ОГРН',
          value: '',
        },
        kpp: {
          name: 'КПП',
          value: '',
        },
        ur_address: {
          name: 'Юридический адрес',
          value: '',
        },
        fact_address: {
          name: 'Фактический адрес',
          value: '',
        },
      },
      orgBankRequisites: {
        bank_bik: {
          name: 'БИК',
          value: '',
        },
        bank_name: {
          name: 'БАНК',
          value: '',
        },
        bank_number:{
          name: 'Расчетный счет',
          value: '',
        },
        bank_knumber: {
          name: 'Корреспондентыный счет',
          value: '',
        },
      },
      
    }
  },
  mounted(){
    this.getOrgProfile({
      action: "get/org/profile",
      id: this.$route.params.id,
    });
  },
   methods: {
    ...mapActions({
      getOrgProfile: 'org/getOrgProfile',
    }),
    changeOrgProfile(){
      this.v$.$touch()
     
    }
  },
  computed: {
    ...mapGetters({
      orgprofile: 'org/orgprofile'
    }),
  },
  watch: {
    orgprofile: function (newVal) {
      this.showSaveButton=false
      this.orgReqValues = newVal.requisites[0]
      this.orgBankValues = this.orgReqValues.banks[0] != undefined ? this.orgReqValues.banks[0] : this.orgBankValues
      
        this.orgRequisites.name.value = this.orgReqValues.name
        this.orgRequisites.inn.value = this.orgReqValues.inn
        this.orgRequisites.ogrn.value = this.orgReqValues.ogrn
        this.orgRequisites.kpp.value = this.orgReqValues.kpp
        this.orgRequisites.ur_address.value = this.orgReqValues.ur_address
        this.orgRequisites.fact_address.value = this.orgReqValues.fact_address
      
        this.orgBankRequisites.bank_bik.value = this.orgBankValues.bank_bik
        this.orgBankRequisites.bank_name.value = this.orgBankValues.bank_name
        this.orgBankRequisites.bank_number.value = this.orgBankValues.bank_number
        this.orgBankRequisites.bank_knumber.value = this.orgBankValues.bank_knumber
            
    },
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      form: {
        nameEntered: {
          required,
        },
        phoneEntered: {
          required,
        },
        emailEntered: {
          required,
        },
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  h1 {
    margin-bottom: 40px;
  }
  .lk-about__submit-container{
    display: flex;
    justify-content: end;
    margin-bottom: 60px;
  }
  .lk-about__submit-button{
    font-size: 16px;
    padding: 8px 28px;
    height: 40px;
  }
  .lk-about__info-input:after{
    content: '\e031';
    font-family: 'Iconly';
    position: relative;
    display: block;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 9px;
    font-size: 18px;
}
.lk-about__info {
    border-bottom: 0.5px solid #75757575;
}
.lk-about__info-image-wrapper{
  height: 45px;
}
.lk-about__flexend{
  display: flex;
  justify-content: end;
  padding: 24px;
}
.lk-about__block-table-row{
  display: block;
  border:none;
}
.lk-about__block-table-col{
  width:50%;
  float: left;
  border-bottom: 0.5px solid #75757575;
  padding:24px 0;
}
</style>
