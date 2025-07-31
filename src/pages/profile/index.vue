<template>
  <section class="profile" id="profile">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <a class="d-back d-top-back">
        <i class="d-icon-arrow d-back__icon d-top-back-icon"></i>
        <span class="d-back__text">Назад</span>
      </a>
      <ul class="d-breadcrumbs d-top-breadcrumbs">
        <li class="d-breadcrumbs__item d-top-breadcrumbs-item">
          <button class="d-breadcrumbs__button">МСТ</button>
        </li>
        <li class="d-breadcrumbs__item d-breadcrumbs__item--active d-top-breadcrumbs-item">
          <button class="d-breadcrumbs__button">Профиль пользователя</button>
        </li>
      </ul>
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
      <div class="profile__info-item">
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
    </div>

    <div class="profile__info2">
      <div class="profile__info-item profile__info-item--alt">
        <div class="profile__info-label-wrapper">
          <p class="profile__info-label">Логин</p>
          <p class="profile__info-label-description">Используется для входа в систему</p>
        </div>
        <div class="d-input d-input--light profile__info-input">
          <input
            type="text"
            placeholder="superStar"
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
          <p class="profile__info-label">Пароль</p>
          <p class="profile__info-label-description">Используется для входа в систему</p>
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
    </div>
  </section>
</template>
<script>
export default {
  name: 'userProfile',
}
</script>
<style lang="scss"></style>
