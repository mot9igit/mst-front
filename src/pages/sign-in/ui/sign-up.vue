<template>
  <Toast />
  <section class="dart_wrapper auth registration">
    <form class="auth__form registration__form" @submit.prevent="formSubmit" autocomplete="false">
      <a href="/" class="d-back registration__back" @click.prevent="this.setRegForm">
        <i class="d-icon-arrow d-back__icon"></i>
        <span class="d-back__text hidden-640">Назад</span>
      </a>
      <a href="/" class="auth__logo registration__logo">
        <picture>
          <source media="(max-width: 1920px)" srcset="/icons/logo-1920.svg" />
          <source media="(max-width: 800px)" srcset="/icons/logo-800.svg" />
          <source media="(max-width: 640px)" srcset="/icons/logo-640.svg" />
          <source media="(max-width: 400px)" srcset="/icons/logo-400.svg" />
          <source media="(max-width: 320px)" srcset="/icons/logo-320.svg" />
          <img src="/icons/logo-1920.svg" loading="lazy" width="368" height="79" />
        </picture>
      </a>

      <div class="registration__fields" v-if="!this.regIsSuccess">
        <div class="d-input__group">
          <div class="d-input__wrapper">
            <div class="d-input" :class="{ 'd-input--error': v$.form.login.$error }">
              <input
                type="text"
                placeholder="Логин"
                name="login"
                class="d-input__field"
                data-input-id="login"
                v-model="form.login"
                required
              />
              <button
                type="button"
                class="d-close d-input__button"
                data-input="clear"
                data-for-input="login"
              >
                <i class="d-icon-times d-close__icon"></i>
              </button>
            </div>
            <div v-if="v$.form.login.$error" class="d-input-error">
              <i class="d-icon-warning d-input-error__icon"></i>
              <span v-if="!v$.form.login.required" class="d-input-error__text"
                >Пожалуйста, введите логин.</span
              >
              <span v-else-if="v$.form.login.minLength" class="d-input-error__text"
                >Логин должен содержать минимум 3 символа.</span
              >
              <span v-else-if="v$.form.login.maxLength" class="d-input-error__text"
                >Логин должен содержать максимум 30 символов.</span
              >
            </div>
          </div>
          <div class="d-input__wrapper">
            <div class="d-input" :class="{ 'd-input--error': v$.form.password.$error }">
              <input
                :type="showPassword1 ? 'text' : 'password'"
                ref="passwordInput"
                placeholder="Пароль"
                name="password"
                class="d-input__field"
                data-input-id="password"
                v-model="form.password"
                autocomplete="new-password"
                required
              />
              <button
                type="button"
                class="d-show-alt d-input__button"
                data-input="show"
                data-for-input="password"
              >
                <i class="d-icon-eye d-show-alt__icon"></i>
              </button>
              <div
                class="d-show__wrapper d-input__button"
                data-input="hide"
                data-for-input="password"
              >
                <button type="button" class="d-show d-input__show">
                  <i class="d-icon-eye d-show__icon"></i>
                </button>
              </div>
            </div>
            <div v-if="v$.form.password.$error" class="d-input-error">
              <i class="d-icon-warning d-input-error__icon"></i>
              <span v-if="!v$.form.password.required" class="d-input-error__text"
                >Пожалуйста, введите пароль.</span
              >
              <span v-else-if="v$.form.password.minLength" class="d-input-error__text"
                >Пароль должен содержать минимум 6 символов.</span
              >
            </div>
          </div>
          <div class="d-input__wrapper">
            <div class="d-input" :class="{ 'd-input--error': v$.form.passwordConfirm.$error }">
              <input
                :type="showPassword2 ? 'text' : 'password'"
                placeholder="Подтверждение пароля"
                class="d-input__field"
                v-model="form.passwordConfirm"
                autocomplete="new-password"
                required
              />
              <button
                type="button"
                class="d-show-alt d-input__button"
                data-input="show"
                data-for-input="password"
              >
                <i class="d-icon-eye d-show-alt__icon"></i>
              </button>
              <div
                class="d-show__wrapper d-input__button"
                data-input="hide"
                data-for-input="password"
              >
                <button type="button" class="d-show d-input__show">
                  <i class="d-icon-eye d-show__icon"></i>
                </button>
              </div>
            </div>
            <div v-if="v$.form.passwordConfirm.$error" class="d-input-error">
              <i class="d-icon-warning d-input-error__icon"></i>
              <span class="d-input-error__text"
                >Пожалуйста, подтвердите пароль. Пароли должны совпадать.</span
              >
            </div>
          </div>
        </div>

        <fieldset class="d-input__group">
          <legend class="d-input__label">Данные контактного лица:</legend>
          <div class="d-input__wrapper">
            <div class="d-input" :class="{ 'd-input--error': v$.form.name.$error }">
              <input
                type="text"
                placeholder="ФИО контактного лица"
                name="contact_fio"
                v-model="form.name"
                class="d-input__field"
                data-input-id="contact_fio"
                required
              />
              <button
                type="button"
                class="d-close d-input__button"
                data-input="clear"
                data-for-input="contact_fio"
              >
                <i class="d-icon-times d-close__icon"></i>
              </button>
            </div>
            <div v-if="v$.form.name.$error" class="d-input-error">
              <i class="d-icon-warning d-input-error__icon"></i>
              <span v-if="!v$.form.name.required" class="d-input-error__text"
                >Пожалуйста, введите ФИО.</span
              >
              <span v-else-if="v$.form.name.minLength" class="d-input-error__text"
                >ФИО должно содержать минимум 3 символа.</span
              >
            </div>
          </div>
          <div class="d-input__wrapper">
            <div class="d-input" :class="{ 'd-input--error': v$.form.telephone.$error }">
              <input
                v-imask="mask"
                type="tel"
                placeholder="Телефон"
                name="phone"
                class="d-input__field"
                v-model="form.telephone"
                @input="form.telephone = normalizePhone(form.telephone)"
                required
              />
            </div>
            <div v-if="v$.form.telephone.$error" class="d-input-error">
              <i class="d-icon-warning d-input-error__icon"></i>
              <span v-if="!v$.form.telephone.required" class="d-input-error__text"
                >Пожалуйста, введите номер телефона.</span
              >
              <span v-else-if="v$.form.telephone.minLength" class="d-input-error__text"
                >Введите корректный номер телефона.</span
              >
            </div>
          </div>
          <div class="d-input__wrapper">
            <div class="d-input" :class="{ 'd-input--error': v$.form.email.$error }">
              <input
                type="email"
                placeholder="Email"
                name="email"
                class="d-input__field"
                v-model="form.email"
                required
              />
              <button
                type="button"
                class="d-close d-input__button"
                data-input="clear"
                data-for-input="email"
              >
                <i class="d-icon-times d-close__icon"></i>
              </button>
            </div>
            <div v-if="v$.form.email.$error" class="d-input-error">
              <i class="d-icon-warning d-input-error__icon"></i>
              <span v-if="!v$.form.email.required" class="d-input-error__text"
                >Пожалуйста, введите email.</span
              >
              <span v-else-if="v$.form.email.email" class="d-input-error__text"
                >Введите корректный email.</span
              >
            </div>
          </div>
        </fieldset>
      </div>
      <button type="submit" class="d-button d-button-primary box-shadow-none">
        Зарегистрироваться
      </button>
    </form>

    <div class="auth__footer">
      <div class="feedback visible-800">
        <div class="feedback__content">
          <p class="feedback__title">Не получается войти в ЛК?</p>
          <p class="feedback__text">
            Свяжитесь с нами через почту
            <a href="mailto:client.ms@yandex.ru" class="inline-block link">client.ms@yandex.ru </a>
            или по номеру телефона
            <a href="tel:88003501519" class="inline-block link">+7 (800) 350-15-19 </a>
          </p>
        </div>
      </div>
      <div class="copyright visible-800">
        <span class="copyright__text">© МСТ, {{ getYear }}</span>
      </div>
    </div>

    <div class="copyright hidden-800">
      <span class="copyright__text">© МСТ, {{ getYear }}</span>
    </div>

    <div class="feedback hidden-800">
      <div class="feedback__content">
        <p class="feedback__title">Не получается войти в ЛК?</p>
        <p class="feedback__text">
          Свяжитесь с нами через обратную связь, кликнув на кнопку, расположенную справа.
        </p>
      </div>

      <div class="feedback__button-wrapper">
        <button type="button" class="d-button d-button-primary d-button-rounded">
          <i class="d-icon-messages d-button-rounded__icon"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import FloatLabel from 'primevue/floatlabel'
import { required, minLength, maxLength, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export default {
  name: 'reg-form',
  data() {
    return {
      showPassword1: false,
      showPassword2: false,
      regIsSuccess: false,
      loading: false,
      form: {
        login: null,
        password: '',
        passwordConfirm: '',
        telephone: '',
        email: '',
        org: {
          name: '',
          inn: '',
          ogrn: '',
          opf: '',
        },
        contact: {},
        delivery_addresses: [{ value: '' }],
      },
      mask: {
        mask: '+{7} (000) 000-00-00',
        lazy: false,
      },
    }
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      form: {
        login: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(30),
        },
        password: {
          required,
          minLength: minLength(6),
        },
        passwordConfirm: {
          required,
        },
        telephone: {
          required,
          minLength: minLength(11), // Длина с кодом +7 (XXX) XXX-XX-XX
        },
        email: {
          required,
          email,
        },
        name: {
          required,
          minLength: minLength(3),
        },
      },
    }
  },
  components: {
    Toast,
    FloatLabel,
    InputText,
  },
  methods: {
    formSubmit() {
      this.v$.$touch() // Отмечаем все поля как проверенные
      if (this.v$.$invalid) {
        const errorMessage = this.getErrorMessages()
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: errorMessage,
          life: 3000,
        })
        return
      }
      if (this.form.password === this.form.passwordConfirm) {
        this.loading = true
        this.$load(async () => {
          const data = await this.$api.auth.register(this.form)
          if (data) {
            if (data === 'technical error') {
              this.$toast.add({
                severity: 'error',
                summary: 'Техническая ошибка',
                detail: 'Попробуйте позже.',
                life: 3000,
              })
              this.loading = false
              return
            }
            if (!data.data.success) {
              this.$toast.add({
                severity: 'error',
                summary: 'Ошибка!',
                detail: data.data.message,
                life: 3000,
              })
              this.loading = false
              this.goToErrorInput(data.data.message)
            } else {
              this.sendMetrik('register')
              this.regIsSuccess = true
            }
            this.loading = false
          }
        })
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка!',
          detail: 'Пароли не совпадают. Пожалуйста, убедитесь, что вы ввели их правильно.',
          life: 3000,
        })
        this.goToErrorInput('пароль')
      }
    },
    normalizePhone(phone) {
      return phone.replace(/[^0-9]/g, '') // Удалить все, кроме цифр
    },
    getErrorMessages() {
      if (this.v$.form.login.$error) {
        if (!this.v$.form.login.required) return 'Пожалуйста, введите логин.'
        if (this.v$.form.login.minLength) return 'Логин должен содержать минимум 3 символа.'
        if (this.v$.form.login.maxLength) return 'Логин должен содержать не более 30 символов.'
      }
      if (this.v$.form.password.$error) {
        if (!this.v$.form.password.required) return 'Пожалуйста, введите пароль.'
        if (this.v$.form.password.minLength) return 'Пароль должен содержать минимум 6 символов.'
      }
      if (this.v$.form.passwordConfirm.$error) {
        return 'Пожалуйста, подтвердите пароль. Пароли должны совпадать.'
      }
      if (this.v$.form.telephone.$error) {
        if (!this.v$.form.telephone.required) return 'Пожалуйста, введите номер телефона.'
        if (this.v$.form.telephone.minLength) return 'Введите корректный номер телефона.'
      }
      if (this.v$.form.email.$error) {
        if (!this.v$.form.email.required) return 'Пожалуйста, введите email.'
        if (this.v$.form.email.email) return 'Введите корректный email.'
      }
      if (this.v$.form.name.$error) {
        if (!this.v$.form.name.required) return 'Пожалуйста, введите ФИО.'
        if (this.v$.form.name.minLength) return 'ФИО должно содержать минимум 3 символа.'
      }
      return ''
    },
    togglePasswordVisibility1() {
      this.showPassword1 = !this.showPassword1
    },
    togglePasswordVisibility2() {
      this.showPassword2 = !this.showPassword2
    },
    setRegForm() {
      this.$emit('setRegForm', false)
    },
    setName(name) {
      this.form.name = name.value
    },
    goToErrorInput(errorMessage) {
      if (errorMessage.includes('логин')) {
        this.$refs.loginInput.focus()
        this.$refs.loginInput.parentElement.classList.add('error')
      } else if (errorMessage.includes('пароль')) {
        this.$refs.passwordInput.focus()
        this.$refs.passwordInput.parentElement.classList.add('error')
      }
    },
  },
  computed: {
    getYear() {
      return new Date().getFullYear()
    },
  },
}
</script>
