<template>
    <Toast />

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
                  @click.prevent="windowClose()"
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

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import Toast from 'primevue/toast'
import InputOtp from 'primevue/inputotp';

export default {
  name: 'addVendorWindow',
  data(){
    return{
      form: {
        code: '',
      },
    }
  },
  props:{

  },
  emits: ['closeAddWindow', 'addVendor'],
  components: { Toast, InputOtp },
  methods: {
    ...mapActions({
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
            this.$emit('addVendor')
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
    windowClose(){
      this.$emit('closeAddWindow')
    }
  },
  mounted() {
    this.getOpts({
      page: 0,
      perpage: 0,
      filter: 0,
      filtersdata: 0,
    })
  },
  computed: {
    ...mapGetters({
      opts: 'purchases/opts',
    }),
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

  @media (width <=1024px){
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
    .clients-form__modal-main .p-inputotp-input{
      width: 23px;
      height: 33px;
    }
  }
</style>
