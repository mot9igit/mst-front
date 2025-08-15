<template>
  <section class="profile" id="profile">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <breadcrumbs />
    </div>


    <h1 class="profile__title">Профиль пользователя</h1>

    <div class="profile__info">
      <div class="profile__info-item">
        <div class="profile__info-label-wrapper">
          <p class="profile__info-label">Имя</p>
          <p class="profile__info-label-description"></p>
        </div>
        <div class="d-input d-input--light profile__info-input">
          <input
            type="text"
            placeholder="Игнатий"
            name="date"
            class="d-input__field profile__info-input-field"
          />
          <div class="d-input__actions profile__input-actions">
            <div
              class="d-divider d-divider--vertical d-divider--no-margin profile__input-actions-divider"
            ></div>
            <button class="d-icon-wrapper profile__info-input-button">
              <i class="d-icon-pen2"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="profile__info-item">
        <div class="profile__info-label-wrapper">
          <p class="profile__info-label">Отчество</p>
          <p class="profile__info-label-description"></p>
        </div>
        <div class="d-input d-input--light profile__info-input">
          <input
            type="text"
            placeholder="Игнатий"
            name="date"
            class="d-input__field profile__info-input-field"
          />
          <div class="d-input__actions profile__input-actions">
            <div
              class="d-divider d-divider--vertical d-divider--no-margin profile__input-actions-divider"
            ></div>
            <button class="d-icon-wrapper profile__info-input-button">
              <i class="d-icon-pen2"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="profile__info-item">
        <div class="profile__info-label-wrapper">
          <p class="profile__info-label">Фамилия</p>
          <p class="profile__info-label-description"></p>
        </div>
        <div class="d-input d-input--light profile__info-input">
          <input
            type="text"
            placeholder="Игнатий"
            name="date"
            class="d-input__field profile__info-input-field"
          />
          <div class="d-input__actions profile__input-actions">
            <div
              class="d-divider d-divider--vertical d-divider--no-margin profile__input-actions-divider"
            ></div>
            <button class="d-icon-wrapper profile__info-input-button">
              <i class="d-icon-pen2"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="profile__info-item">
        <div class="profile__info-label-wrapper">
          <p class="profile__info-label">Личный телефон</p>
          <p class="profile__info-label-description">Виден только коллегам</p>
        </div>
        <div class="d-input d-input--light profile__info-input">
          <input
            type="text"
            placeholder="+7 (000) 000-00-00"
            name="date"
            class="d-input__field profile__info-input-field"
          />
          <div class="d-input__actions profile__input-actions">
            <div
              class="d-divider d-divider--vertical d-divider--no-margin profile__input-actions-divider"
            ></div>
            <button class="d-icon-wrapper profile__info-input-button">
              <i class="d-icon-pen2"></i>
            </button>
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

    <div class="profile__info2">
      <div class="profile__info-item profile__info-item--alt" v-for="(field, index_field) in profile_main_data" :key="index_field">
        <div class="profile__info-label-wrapper">
          <p class="profile__info-label">{{ field.lable }}</p>
          <p class="profile__info-label-description">{{ field.text }}</p>
        </div>
        <div class="d-input d-input--light profile__info-input">
          <input
            type="text"
            v-model="this.getUserData[field.name]"
            :placeholder="field.placeholder"
            name="date"
            class="d-input__field profile__info-input-field"
          />
          <div class="d-input__actions profile__input-actions">
            <div
              class="d-divider d-divider--vertical d-divider--no-margin profile__input-actions-divider"
            ></div>
            <button class="d-icon-wrapper profile__info-input-button">
              <i class="d-icon-pen2"></i>
            </button>
          </div>
        </div>
      </div>
      <!--<div class="profile__info-item  profile__info-item--alt">
        <div class="profile__info-label-wrapper">
          <p class="profile__info-label">Личный email</p>
          <p class="profile__info-label-description">
            Виден только коллегам, используется для востановления пароля
          </p>
        </div>
        <div class="d-input d-input--light profile__info-input">
          <input
            type="text"
            placeholder="superStar@mst.tools"
            name="date"
            class="d-input__field profile__info-input-field"
          />
          <div class="d-input__actions profile__input-actions">
            <div
              class="d-divider d-divider--vertical d-divider--no-margin profile__input-actions-divider"
            ></div>
            <button class="d-icon-wrapper profile__info-input-button">
              <i class="d-icon-pen2"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="profile__info-item profile__info-item--alt">
        <div class="profile__info-label-wrapper">
          <p class="profile__info-label">Новый пароль</p>
          <p class="profile__info-label-description">Установить новый пароль для входа в систему</p>
        </div>
        <div class="d-input d-input--light profile__info-input">
          <input
            type="text"
            placeholder="hbz1MOdv7y"
            name="date"
            class="d-input__field profile__info-input-field"
          />
          <div class="d-input__actions profile__input-actions">
            <div
              class="d-divider d-divider--vertical d-divider--no-margin profile__input-actions-divider"
            ></div>
            <button class="d-icon-wrapper profile__info-input-button">
              <i class="d-icon-pen2"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="profile__info-item profile__info-item--alt">
        <div class="profile__info-label-wrapper">
          <p class="profile__info-label">Новый пароль</p>
          <p class="profile__info-label-description">Введите новый пароль повторно</p>
        </div>
        <div class="d-input d-input--light profile__info-input">
          <input
            type="text"
            placeholder="hbz1MOdv7y"
            name="date"
            class="d-input__field profile__info-input-field"
          />
          <div class="d-input__actions profile__input-actions">
            <div
              class="d-divider d-divider--vertical d-divider--no-margin profile__input-actions-divider"
            ></div>
            <button class="d-icon-wrapper profile__info-input-button">
              <i class="d-icon-pen2"></i>
            </button>
          </div>
        </div>
      </div>
      -->
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
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import { email } from '@vuelidate/validators'


export default {
  name: 'userProfile',
  components: { breadcrumbs, Loader },
  data() {
    return {
      getUserData: {
        username: '',
        email: '',
        newpassw: '',
        newpassw_again: '',
      },
      profile_main_data: [
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
      ]
    }
  },
  methods: {
    ...mapActions({
			getSessionUser: 'user/getSessionUser',
		}),
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
    }
  }
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
</style>
