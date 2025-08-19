<template>
  <section class="profile" id="profile">
    <Toast/>
    <!-- Верхушка страницы -->


    <Loader v-if="loading"/>

    <h1 class="profile__title">Профиль пользователя</h1>

    <form @submit.prevent="editProfileInfo">
      <div class="profile__info">

        <div class="profile__info-item" v-for="(field, index_field) in profile_info" :key="index_field">
          <div class="profile__info-label-wrapper">
            <p class="profile__info-label">{{ field.lable }}</p>
            <p class="profile__info-label-description">{{ field.text }}</p>
          </div>
          <div class="profile__info-input-wrapper">
            <div class="d-input d-input--light profile__info-input">

              <input
                v-if="field.name === 'phone'"
                type="text"
                v-model="this.getUserInfo[field.name]"
                :placeholder="field.placeholder"
                :name="field.name"
                class="d-input__field profile__info-input-field"
                @input="formatPhone"
              />
              <input
              v-else
                type="text"
                v-model="this.getUserInfo[field.name]"
                :placeholder="field.placeholder"
                :name="field.name"
                class="d-input__field profile__info-input-field"
              />

            </div>
            <div class="d-input-error" v-if="field.name === 'phone' && errors.phone != ''">
                <i class="d-icon-warning d-input-error__icon"></i>
                <span class="d-input-error__text">
                  {{ errors.phone }}
                </span>
            </div>
          </div>
        </div>

        <div class="profile__flex">

          <button
            type="submit"
            href="#"
            class="d-button d-button-primary d-button-primary-small d-button--sm-shadow profile__submit-button"
          >
            Сохранить
          </button>
        </div>
      </div>
    </form>

    <form @submit.prevent="editProfileData">
      <div class="profile__info2">
        <div class="profile__info-item profile__info-item--alt" v-for="(field, index_field) in profile_data" :key="index_field">
          <div class="profile__info-label-wrapper">
            <p class="profile__info-label">{{ field.lable }}</p>
            <p class="profile__info-label-description">{{ field.text }}</p>
          </div>
          <div class="profile__info-input-wrapper">
            <div class="d-input d-input--light profile__info-input">
              <input
                type="text"
                v-model="this.getUserData[field.name]"
                :placeholder="field.placeholder"
                :name="field.name"
                @input="errors[field.name] = ''"
                class="d-input__field profile__info-input-field"
              />
            </div>
            <div class="d-input-error" v-if="errors[field.name] != ''">
                <i class="d-icon-warning d-input-error__icon"></i>
                <span class="d-input-error__text">
                  {{ errors[field.name] }}
                </span>
            </div>
          </div>
        </div>
        <div class="profile__flex">
          <p class="profile__info-label-description">* Редактирование нужно будет подтвердить по вашей почте</p>
          <button
            type="submit"
            href="#"
            class="d-button d-button-primary d-button-primary-small d-button--sm-shadow profile__submit-button"
          >
            Сохранить изменения
          </button>
        </div>
      </div>
    </form>

    <teleport to="body">
      <customModal v-model="this.modalEditProfile" class="profile__info-modal">
        <div class="profile__info-modal-success" v-if="successModalInfo">
          <h2>Изменения сохранены!</h2>
          <p>Ваши настройки были успешно применены.</p>
        </div>
        <div class="profile__info-modal-success" v-else>
          <h3>На вашу почту {{ getUser.profile.email }} отправлено письмо!</h3>
          <p>Пожалуйста, откройте его и следуйте инструкциям для подтверждения редактирования.
            Если письмо не пришло, проверьте папку «Спам» или подождите несколько минут.</p>
        </div>
        <button
          type="button"
          href="#"
          class="d-button d-button-primary d-button-primary-small d-button--sm-shadow profile__info-button"
          @click.prevent="this.modalEditProfile = false"
        >
              Ок
        </button>
      </customModal>
    </teleport>

  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import Toast from 'primevue/toast'


export default {
  name: 'userProfile',
  components: { Loader, customModal, Toast },
  data() {
    return {
      modalEditProfile: false,
      successModalInfo: true,
      loading: false,
      editFields: {},
      getUserData: {
        username: '',
        email: '',
        newpassw: '',
        newpassw_again: '',
      },
      profile_data: [
        {
          name: 'username',
          lable: 'Логин',
          text: 'Используется для входа в систему',
          placeholder: 'Введите новое имя пользователя',
        },
        {
          name: 'email',
          lable: 'Личный email',
          text: 'Виден только коллегам, используется для востановления пароля',
          placeholder: 'Введите новый email',
        },
        {
          name: 'newpassw',
          lable: 'Новый пароль',
          text: 'Установить новый пароль для входа в систему',
          placeholder: 'Введите новый пароль',
        },
        {
          name: 'newpassw_again',
          lable: 'Новый пароль',
          text: 'Введите новый пароль повторно',
          placeholder: 'Пароли должны совпадать',
        },
      ],
      getUserInfo: {
        fullname: '',
        phone: '',
      },
      profile_info: [
        {
          name: 'fullname',
          lable: 'ФИО',
          text: 'Ваши фамилия, имя и отчество',
          placeholder: 'Введите ваши ФИО',
        },
        {
          name: 'phone',
          lable: 'Личный телефон',
          text: 'Виден только коллегам',
          placeholder: 'Введите ваш личный номер телефона',
        },
      ],
      errors: {
        phone:'',
        username:'',
        email:'',
        newpassw:'',
        newpassw_again:'',
      },
    }
  },
  mounted() {
    this.getSessionUser()
     if (this.$route.query.update === 'true') {
        //Обновляем профиль
        this.getSessionUser().then(() => {
          this.$router.replace({ query: { ...this.$route.query, update: undefined } });
        })
      }
  },
  methods: {
    ...mapActions({
      editUser: 'user/edit_profile',
      getSessionUser: 'user/getSessionUser',

    }),
    formatPhone(event) {
      let value = event.target.value.replace(/\D/g, ""); // Удаляем все нецифровые символы
      this.errorPhone = ''
      if (value.length > 11) {
        value = value.slice(0, 11); // Ограничиваем ввод до 11 цифр
      }
      // Форматируем номер по маске: +X (XXX) XXX-XX-XX
      let formatted = "+";
      if (value.length > 0) formatted += value[0];
      if (value.length > 1) formatted += " (" + value.substring(1, 4);
      if (value.length > 4) formatted += ") " + value.substring(4, 7);
      if (value.length > 7) formatted += "-" + value.substring(7, 9);
      if (value.length > 9) formatted += "-" + value.substring(9, 11);
      this.getUserInfo.phone = formatted;
    },
    formatPhoneInput(value) {
      value.replace(/\D/g, ""); // Удаляем все нецифровые символы
      let formatted = "";
      formatted += value[0];
      formatted += value[1];
      formatted += " (" + value.substring(2, 5);
      formatted += ") " + value.substring(5, 8);
      formatted += "-" + value.substring(8, 10);
      formatted += "-" + value.substring(10, 12);
      return formatted;
    },
    validatePhone(phone) {
      const regex = /^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
      return regex.test(phone);
    },
    formatPhoneNumber(phone) {
      return phone.replace(/\D/g, ''); // Удаляет все нецифровые символы
    },
    async editProfileInfo(){
      let newFIO = this.getUserInfo.fullname
      let newPhone = this.getUserInfo.phone
      let oldFIO = this.getUser.profile.fullname
      let oldPhone = this.formatPhoneInput(this.getUser.profile.phone)
      if (!this.validatePhone(newPhone)) {
        this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Некорректный номер телефона', life: 3000 });
        this.errors.phone = 'Введите корректный номер телефона'
        return
      } else{
        if(oldPhone != newPhone){
          this.editFields.phone = this.formatPhoneNumber(newPhone)
        }
        if(oldFIO != newFIO){
          this.editFields.fullname = newFIO
        }
        if(Object.keys(this.editFields).length != 0){
          this.editUser({
            action: 'profile/edit',
            form: this.editFields,
            }).then((res) => {
            if(!res.data.success){
              this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: res.data.message, life: 3000 });
            } else {
              this.modalEditProfile = true
              this.successModalInfo = true
              this.editFields = {}
            }
          })
        }else{
          this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Вы не внесли никаких изменений', life: 3000 });
        }
      }
    },

    validateLogin(login) {
      const regex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
      return regex.test(login);
    },
    validateEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    },

    async editProfileData(){
      let newUsername = this.getUserData.username
      let newEmail = this.getUserData.email
      let newPassword = this.getUserData.newpassw
      let newPasswordAgain = this.getUserData.newpassw_again
      let isEditUser = ''
      if(newUsername != this.getUser.username){
        if (!this.validateLogin(newUsername)) {
          this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Некорректный логин', life: 3000 });
          this.errors.username = 'Введите корректный логин, состоящий из латинских букв, цифр и спец.символов'

        } else{
          this.editFields.username = newUsername
        }
      }
      if(newEmail != this.getUser.profile.email){
          if (!this.validateEmail(newEmail)) {
            this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Некорректный email', life: 3000 });
            this.errors.email = 'Введите корректный email'

          } else{
            this.editFields.email = newEmail
          }
      }
      if (newPassword != '') {
            if (newPassword.length < 6) {
              this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Некорректный пароль', life: 3000 });
              this.errors.newpassw = 'Пароль должен содержать минимум 6 символов'

            } else{
              if(newPassword != newPasswordAgain){
                this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Некорректно введен пароль повторно', life: 3000 });
                this.errors.newpassw_again = 'Пароли не совпадают'

              }else{
                this.editFields.password = newPassword
              }

            }
      }
      if(Object.keys(this.editFields).length != 0){
          isEditUser = this.errors.newpassw + this.errors.newpassw_again + this.errors.email + this.errors.username
          if(isEditUser === ''){
            this.editUser({
              action: 'profile/edit',
              form: this.editFields,
              }).then((res) => {
              if(!res.data.success){
                this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: res.data.message, life: 3000 });
              } else {
                this.modalEditProfile = true
                this.successModalInfo = false
                this.editFields = {}
                this.getSessionUser()

              }
            })
          }else{
            this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Одно или несколько полей заполнено некорректно', life: 3000 });
          }
        }else{
          this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Вы не внесли никаких изменений', life: 3000 });
        }
    },
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
    }),
  },
  watch: {
    getUser: function(newVal){
      this.getUserData.username = newVal.username
      this.getUserData.email = newVal.profile.email
      this.getUserInfo.fullname = newVal.profile.fullname
      this.getUserInfo.phone = this.formatPhoneInput(newVal.profile.phone)
    }
  },



}
</script>
<style lang="scss">
.profile__flex{
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  gap: 10px;
}
.profile__submit-button {
  font-size: 16px;
  padding: 8px 28px;
  height: 40px;
}
.profile__info2 {
  margin-bottom: 80px
}
.profile__info-input:after {
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
.profile__info-modal .modal-content{
  max-width: 700px;
}
.profile__info-modal-success{
  display: flex;
  flex-direction: column;
  gap:24px;
  justify-content: space-around;
  align-items: center;
  padding: 40px;
}
.profile__info-modal .profile__info-button{
  margin:0 auto;
}
.profile__info-input-wrapper{
  display: flex;
  flex-direction: column;
  width:100%;
}
.profile__info-input-wrapper .d-input-error{
  width:auto
}
</style>
