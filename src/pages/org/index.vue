<template>
  <section class="lk-about" id="lk-about">
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
        <li class="d-breadcrumbs__item d-top-breadcrumbs-item d-breadcrumbs__item--active">
          <button class="d-breadcrumbs__button">О компании</button>
        </li>
      </ul>
    </div>

    <ul class="d-tab2__container lk-about__tabs">
      <li class="d-tab2 d-tab2--active">
        <a href="/views/lk/about/index.html">О компании</a>
      </li>
      <li class="d-tab2">
        <a href="/views/lk/staff/index.html">Сотрудники</a>
      </li>
      <li class="d-tab2">
        <a href="/views/lk/access/index.html">Права доступа</a>
      </li>
    </ul>

    <div class="lk-about__info-container">
      <div class="lk-about__info">
        <div class="lk-about__info-title-wrapper">
          <p class="lk-about__info-title-label">Название компании</p>
          <p class="lk-about__info-title-description">Отображается для покупателей</p>
        </div>

        <div class="d-input d-input--light lk-about__info-input">
          <input
            type="text"
            placeholder="Название компании"
            value="Веселая болгарочка"
            name="date"
            class="d-input__field lk-about__info-input-field"
          />
          <div class="d-input__actions">
            <div class="d-divider d-divider--vertical d-input__actions-divider"></div>
            <button class="d-icon-wrapper lk-about__info-input-button">
              <i class="d-icon-pen2"></i>
            </button>
          </div>
        </div>

        <button
          type="button"
          class="d-button d-button-quaternary d-button--no-shadow lk-about__info-button"
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

        <div class="lk-about__info-image-wrapper">
          <img src="/images/lebedev.svg" alt="" class="lk-about__info-image" />
        </div>
      </div>

      <div class="lk-about__info">
        <div class="lk-about__info-title-wrapper">
          <p class="lk-about__info-title-label">Код поставщика</p>
          <p class="lk-about__info-title-description">
            Данный необходим вашим клиентам, для подключения к вашему каталогу в МС: Закупки
          </p>
        </div>

        <div class="lk-about__info-text-wrapper">
          <p class="lk-about__info-text">436 686</p>
        </div>
      </div>

      <div class="lk-about__info">
        <div class="lk-about__info-title-wrapper">
          <p class="lk-about__info-title-label">Телефон компании</p>
          <p class="lk-about__info-title-description">Отображается для покупателей</p>
        </div>

        <div class="d-input d-input--light lk-about__info-input">
          <input
            type="tel"
            placeholder="Телефон компании"
            value="+7 (000) 000-00-00"
            name="date"
            class="d-input__field lk-about__info-input-field"
          />
          <div class="d-input__actions">
            <div class="d-divider d-divider--vertical d-input__actions-divider"></div>
            <button class="d-icon-wrapper lk-about__info-input-button">
              <i class="d-icon-pen2"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="lk-about__info">
        <div class="lk-about__info-title-wrapper">
          <p class="lk-about__info-title-label">Email компании</p>
          <p class="lk-about__info-title-description">Отображается для покупателей</p>
        </div>

        <div class="d-input d-input--light lk-about__info-input">
          <input
            type="email"
            placeholder="Email компании"
            value="andreev@tk-tehnolorg.ru"
            name="date"
            class="d-input__field lk-about__info-input-field"
          />
          <div class="d-input__actions">
            <div class="d-divider d-divider--vertical d-input__actions-divider"></div>
            <button class="d-icon-wrapper lk-about__info-input-button">
              <i class="d-icon-pen2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

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
        >
          Подать запрос
        </button>
      </div>

      <p class="lk-about__block-subtitle">Реквизиты ООО «МСТ»</p>

      <div class="lk-about__block-table">
        <div class="lk-about__block-table-row">
          <div class="lk-about__block-table-col">
            <p class="lk-about__block-table-label">Наименования юридического лица</p>
            <p class="lk-about__block-table-value">ООО «МСТ»</p>
          </div>
          <div class="lk-about__block-table-col">
            <p class="lk-about__block-table-label">ИНН</p>
            <p class="lk-about__block-table-value">3466432124</p>
          </div>
        </div>
        <div class="lk-about__block-table-row">
          <div class="lk-about__block-table-col">
            <p class="lk-about__block-table-label">ОГРН</p>
            <p class="lk-about__block-table-value">3466432124</p>
          </div>
          <div class="lk-about__block-table-col">
            <p class="lk-about__block-table-label">КПП</p>
            <p class="lk-about__block-table-value">3466432124</p>
          </div>
        </div>
        <div class="lk-about__block-table-row">
          <div class="lk-about__block-table-col">
            <p class="lk-about__block-table-label">Юридический адрес</p>
            <p class="lk-about__block-table-value">43455, Москва, Флотская ул. дом 5, этаж 5</p>
          </div>
          <div class="lk-about__block-table-col">
            <p class="lk-about__block-table-label">Фактический адрес</p>
            <p class="lk-about__block-table-value">43455, Москва, Флотская ул. дом 5, этаж 5</p>
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

    <div class="lk-about__block">
      <div class="lk-about__block-header">
        <div class="lk-about__block-header-title-wrapper">
          <p class="lk-about__block-header-title">Банковские реквизиты</p>
        </div>
        <button
          class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
        >
          <i class="d-icon-minus lk-about__block-header-button-icon"></i>
          Скрыть банковские реквизиты
        </button>
      </div>

      <div class="lk-about__block-table">
        <div class="lk-about__block-table-row">
          <div class="lk-about__block-table-col">
            <p class="lk-about__block-table-label">БИК</p>
            <p class="lk-about__block-table-value">45354354356</p>
          </div>
          <div class="lk-about__block-table-col">
            <p class="lk-about__block-table-label">БАНК</p>
            <p class="lk-about__block-table-value">ФИЛИАЛ БАНКА ВТБ</p>
          </div>
        </div>
        <div class="lk-about__block-table-row">
          <div class="lk-about__block-table-col">
            <p class="lk-about__block-table-label">Расчетный счет</p>
            <p class="lk-about__block-table-value">3466432124</p>
          </div>
          <div class="lk-about__block-table-col">
            <p class="lk-about__block-table-label">Корреспондентыный счет</p>
            <p class="lk-about__block-table-value">3466432124</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProfileMain',
}
</script>

<style lang="scss" scoped></style>
