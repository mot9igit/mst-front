<template>
  <Toast />
  <section class="promotions" id="promotions">
    <Loader v-if="loading" />
    <div class="promotions__top">
      <breadcrumbs />
    </div>

    <div class="promotions__header-back">
      <h1 class="d-title promotions__header-title" v-if="$route.params.action">
        Настройка акции № {{ $route.params.action }}
      </h1>
      <h1 class="d-title promotions__header-title" v-else>Создание акции</h1>
    </div>

    <div class="promotions__header">
      <h1 class="d-title promotions__header-title" v-if="$route.params.action">
        Настройка акции № {{ $route.params.action }}
      </h1>
      <h1 class="d-title promotions__header-title" v-else>Создание акции</h1>
      <div class="promotions__header-actions" v-if="$route.params.action">
        <label class="d-switch-button" for="enable-promotion">
          <div class="d-switch">
            <input
              type="checkbox"
              name="enable-promotion"
              id="enable-promotion"
              class="d-switch__input"
              v-model="this.form.active"
            />
            <div class="d-switch__circle"></div>
          </div>
          <span class="d-switch-button__text">{{
            this.form.active ? 'Выключить акцию' : 'Включить акцию'
          }}</span>
        </label>
        <!--
        <div class="d-divider d-divider--vertical"></div>
        <button class="d-icon-wrapper d-icon-wrapper--big">
          <i class="d-icon-copy promotions__icon"></i>
        </button>
        <div class="d-divider d-divider--vertical"></div>
        <button class="d-icon-wrapper d-icon-wrapper--big">
          <i class="d-icon-trash promotions__icon"></i>
        </button>
        -->
      </div>
    </div>

    <div class="promotions__info">
      <div class="promotions__info-title-container">
        <h2 class="promotions__info-title">Мастер создания акций</h2>
        <p class="promotions__info-description">Создайте акцию в несколько этапов</p>
      </div>

      <!--
      <div class="d-progress hidden-1200">
        <p class="d-progress__label">Пройдено этапов:</p>
        <p class="d-progress__value">78%</p>
        <div class="d-progress__line"></div>
      </div>
      -->

      <div class="promotions__info-actions promotions__info-top-actions">
        <div class="promotions__info-additional">
          <label class="d-switch-button promotions__info-switch" for="enable-promotion2">
            <div class="d-switch">
              <input
                type="checkbox"
                name="enable-promotion2"
                id="enable-promotion2"
                class="d-switch__input promotions__info-switch-field"
                v-model="this.form.active"
              />
              <div class="d-switch__circle"></div>
            </div>
            <span class="d-switch-button__text promotions__info-switch-label">{{
              this.form.active ? 'Выключить акцию' : 'Включить акцию'
            }}</span>
          </label>
          <div class="d-divider d-divider--vertical promotions__info-icon-divider"></div>
        </div>
        <div class="promotions__info-main-actions">
          <button
            class="d-icon-wrapper d-icon-wrapper--big promotions__info-edit"
            @click.prevent="this.modals.master = true"
          >
            <i class="d-icon-pen2 promotions__icon"></i>
          </button>
          <div
            class="d-divider d-divider--vertical d-divider--white promotions__info-actions-divider"
          ></div>
          <div class="promotions__info-primary-actions">
            <div class="d-divider d-divider--vertical promotions__info-icon-divider"></div>
            <button
              class="d-icon-wrapper d-icon-wrapper--big promotions__info-add"
              @click.prevent="formSubmit()"
            >
              <i
                class="pi pi-save promotions__icon promotions__icon--plus"
                v-if="$route.params.action"
              ></i>
              <i class="d-icon-plus promotions__icon promotions__icon--plus" v-else></i>
            </button>
          </div>
          <div class="promotions__info-additional-actions">
            <div class="d-divider d-divider--vertical promotions__info-icon-divider"></div>
            <button class="d-icon-wrapper d-icon-wrapper--big promotions__info-edit">
              <i class="d-icon-copy promotions__icon"></i>
            </button>
            <div
              class="d-divider d-divider--vertical d-divider--white promotions__info-actions-divider"
            ></div>
            <div class="d-divider d-divider--vertical promotions__info-icon-divider"></div>
            <button class="d-icon-wrapper d-icon-wrapper--big promotions__info-edit">
              <i class="d-icon-trash promotions__icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="promotions__content">
      <div class="dart-row promotions__content-card-container">
        <div class="d-col d-col-xl-9 d-col-24">
          <div class="promotions__card promotions__card--collapsed promotions__card--first">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-lines promotions__card-icon"></i>
                <p class="promotions__card-title">Контент акции</p>
              </div>
              <div class="promotions__info-actions">
                <button class="promotions__card-button" @click.prevent="openStep(1)">
                  <i class="d-icon-pen2 promotions__card-button-icon"></i>
                </button>
                <div class="d-divider d-divider--vertical promotions__card-header-divider"></div>
                <button class="promotions__card-button promotions__card-header-add">
                  <i class="d-icon-plus promotions__card-button-icon"></i>
                </button>
              </div>
            </div>
            <div class="promotions__card-content">
              <div class="promotions__card-values">
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Название акции:</span>
                  <p class="promotions__card-value promotions__card-value--bold">
                    {{ this.form.name }}
                  </p>
                </div>
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Описание акции:</span>
                  <p class="promotions__card-value" v-html="this.form.description"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-col d-col-xl-15 d-col-24">
          <div class="promotions__card">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-picture promotions__card-icon"></i>
                <p class="promotions__card-title">Баннер акции</p>
              </div>
              <div class="promotions__info-actions">
                <button class="promotions__card-button" @click.prevent="openStep(3)">
                  <i class="d-icon-pen2 promotions__card-button-icon"></i>
                </button>
                <div class="d-divider d-divider--vertical promotions__card-header-divider"></div>
                <button class="promotions__card-button promotions__card-header-add">
                  <i class="d-icon-plus promotions__card-button-icon"></i>
                </button>
              </div>
            </div>
            <div class="promotions__card-content" v-if="this.form.adv.files.max.original_href">
              <div class="promotions__card-banner-container">
                <div class="promotions__card-banner">
                  <!-- <div
                    class="d-message promotions__card-banner-message promotions__card-banner-message--banner"
                  >
                    <i class="d-icon-danger d-message__icon"></i>
                    <p class="d-message__text">Баннер не показывается в рекламе</p>
                  </div>
                -->
                  <img
                    :src="this.form.adv.files.max.original_href"
                    alt="Banner image"
                    class="promotions__card-banner-img"
                  />
                </div>
                <div class="promotions__card-value-container">
                  <div
                    class="d-message promotions__card-banner-message promotions__card-banner-message--content"
                  >
                    <i
                      class="d-icon-danger d-message__icon promotions__card-banner-message-icon"
                    ></i>
                    <p class="d-message__text promotions__card-banner-message-text">
                      Баннер не показывается в рекламе
                    </p>
                  </div>
                  <span class="promotions__card-label promotions__card-banner-label"
                    >Места размещения баннера:</span
                  >
                  <div class="d-badge__container">
                    <template v-for="(v, i) in this.form.adv.place" :key="i">
                      <div class="d-badge" v-if="v">
                        {{ this.actionAdvPages.filter((item) => item.code == i)[0]?.name }}
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <div class="promotions__card-content" v-else>
              <div class="promotions__card__no-banner">
                <div>
                  <i class="d-icon-picture"></i>
                  <span>Добавьте баннер <br />в мастере настройки акции</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dart-row promotions__content-card-container">
        <div class="d-col d-col-xl-12 d-col-24">
          <div class="promotions__card-container">
            <div class="promotions__card">
              <div class="promotions__card-header">
                <div class="promotions__card-header-left">
                  <i class="d-icon-truck promotions__card-icon"></i>
                  <p class="promotions__card-title">Условия доставки</p>
                </div>
                <div class="promotions__info-actions">
                  <button class="promotions__card-button" @click.prevent="openStep(5)">
                    <i class="d-icon-pen2 promotions__card-button-icon"></i>
                  </button>
                  <div class="d-divider d-divider--vertical promotions__card-header-divider"></div>
                  <button class="promotions__card-button promotions__card-header-add">
                    <i class="d-icon-plus promotions__card-button-icon"></i>
                  </button>
                </div>
              </div>
              <div class="promotions__card-content">
                <div
                  class="promotions__card-values promotions__card-values--md-horizontal promotions__card-promo-conds-content"
                >
                  <div class="promotions__card-value-container d-md-full" v-if="type == 1">
                    <span class="promotions__card-label">Оплата доставки:</span>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                    >
                      {{
                        this.form.paymentDelivery == 0
                          ? 'Доставка за счет Покупателя'
                          : 'Доставка за счет Продавца'
                      }}
                    </p>
                  </div>
                  <div class="promotions__card-value-container d-md-full" v-if="type == 2">
                    <span class="promotions__card-label">Оплата доставки:</span>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                    >
                      {{
                        this.form.typeDelivery == 1
                          ? 'Покупатель оплачивает доставку'
                          : 'Поставщик компенсирует доставку'
                      }}
                    </p>
                  </div>
                  <div v-if="type == 2 && this.form.typeDelivery == 2">
                    <p>
                      Процент скидки от стоимости товара, который поставщик выделяет для компенсации
                      доставки: <b>{{ this.form.typeDeliveryPercent }}%</b>
                    </p>
                  </div>
                  <div class="promotions__card-value-container d-md-full" v-if="type == 1">
                    <span class="promotions__card-label">Срок доставки:</span>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                    >
                      {{
                        this.form.paymentTime == 0
                          ? 'Определяется по расчету доставки ТК'
                          : 'Определяется данными из отгрузок'
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-col d-col-xl-12 d-col-24">
          <div class="promotions__card">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-wallet promotions__card-icon"></i>
                <p class="promotions__card-title">Условия оплаты</p>
              </div>
              <div class="promotions__info-actions">
                <button class="promotions__card-button" @click.prevent="openStep(4)">
                  <i class="d-icon-pen2 promotions__card-button-icon"></i>
                </button>
                <div class="d-divider d-divider--vertical promotions__card-header-divider"></div>
                <button class="promotions__card-button promotions__card-header-add">
                  <i class="d-icon-plus promotions__card-button-icon"></i>
                </button>
              </div>
            </div>
            <div class="promotions__card-content">
              <div
                class="promotions__card-values promotions__card-values--md-horizontal promotions__card-values--md-long"
                v-if="type == 1"
              >
                <div class="promotions__card-info">
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label d-md-max-content">{{
                      this.form.typeDelay == 1 ? 'Отсрочка платежа' : 'Под реализацию'
                    }}</span>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                    >
                      {{ this.form.postponementPeriod }} дн.
                    </p>
                  </div>
                  <!--
                  <div class="d-tooltip__container">
                    <button class="promotions__card-info-button hidden-1200">
                      <i class="d-icon-info promotions__card-info-icon"></i>
                    </button>

                    <div class="d-tooltip d-tooltip--right">
                      <div class="d-tooltip__content">
                        <span>Тут надо прописать текст о чем говорит эта иконка.</span>
                      </div>
                    </div>
                  </div>
                  -->
                </div>
                <div class="d-fractions" v-if="this.form.typeDelay == 1">
                  <div
                    class="d-fractions__item"
                    v-for="(item, index) in this.form.delay"
                    :key="index"
                    :style="'width: ' + item.percent + '%'"
                  >
                    <p class="d-fractions__item-text" v-if="item.day == 0">Предоплата</p>
                    <p class="d-fractions__item-text" v-else>{{ item.day }} дн.</p>
                    <div
                      class="d-fractions__item-block"
                      :style="'width: ' + item.percent + '%'"
                    ></div>
                    <p class="d-fractions__item-text d-fractions__item-text--bottom">
                      {{ item.percent }}%
                    </p>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="promotions__card-value-container d-md-full" v-if="type == 2">
                  <span class="promotions__card-label">Условия оплаты:</span>
                  <p
                    class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                  >
                    {{
                      this.form.typePay == 1
                        ? 'Покупатель оплачивает товар при заказе'
                        : 'Предоставление рассрочки на 6 месяцев покупателю, за счет поставщика'
                    }}
                  </p>
                </div>
                <div class="dart-mt-1" v-if="this.form.typePay == 2">
                  <p>
                    Процент скидки от стоимости товара, который поставщик выделяет для компенсации
                    рассрочки: <b>{{ this.form.typePayPercent }}%</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-col d-col-xl-8 d-col-24"></div>
      </div>
      <div class="dart-row promotions__content-card-container">
        <div class="d-col d-col-xl-12 d-col-24">
          <div class="promotions__card promotions__card-dates">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-calendar3 promotions__card-icon"></i>
                <p class="promotions__card-title">Даты проведения акции</p>
              </div>
              <div class="promotions__info-actions">
                <button class="promotions__card-button" @click.prevent="openStep(2)">
                  <i class="d-icon-pen2 promotions__card-button-icon"></i>
                </button>
                <div class="d-divider d-divider--vertical promotions__card-header-divider"></div>
                <button class="promotions__card-button promotions__card-header-add">
                  <i class="d-icon-plus promotions__card-button-icon"></i>
                </button>
              </div>
            </div>
            <div class="promotions__card-content">
              <div
                class="promotions__card-values promotions__card-values--md-horizontal promotions__card-values--md-long"
              >
                <div class="promotions__card-info">
                  <div class="promotions__card-value-container" v-if="this.form.dates.length == 2">
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                    >
                      <span
                        >с
                        {{
                          this.form.dates[0].toLocaleString(undefined, {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                        }}
                      </span>
                      <span
                        >по
                        {{
                          this.form.dates[1].toLocaleString(undefined, {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                        }}</span
                      >
                    </p>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                    >
                      {{ datesDays }} дн.
                    </p>
                  </div>
                  <div class="promotions__card-value-container" v-else>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                    >
                      Не указано
                    </p>
                  </div>
                </div>
                <div class="d-fractions d-fractions-dates" v-if="this.form.dates.length == 2">
                  <div class="d-fractions__item">
                    <div
                      class="d-fractions__item-block"
                      :style="'width: ' + datesPercent + '%'"
                    ></div>
                    <p class="d-fractions__item-text d-fractions__item-text--bottom">
                      Осталось {{ datesDaysAvailable }} дн.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-col d-col-xl-12 d-col-24">
          <div class="promotions__card">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-user-star promotions__card-icon"></i>
                <p class="promotions__card-title">Аудитория акции</p>
              </div>
              <div class="promotions__info-actions">
                <button class="promotions__card-button" @click.prevent="openStep(8)">
                  <i class="d-icon-pen2 promotions__card-button-icon"></i>
                </button>
                <div class="d-divider d-divider--vertical promotions__card-header-divider"></div>
                <button class="promotions__card-button promotions__card-header-add">
                  <i class="d-icon-plus promotions__card-button-icon"></i>
                </button>
              </div>
            </div>
            <!--
            <div class="promotions__card-note">
              <p class="promotions__card-note-label">
                Скрыто у клиентов с индивидуальными условиями
              </p>
              <div class="d-tooltip__container">
                <button class="promotions__card-note-info">
                  <i class="d-icon-info promotions__card-info-icon"></i>
                </button>

                <div class="d-tooltip d-tooltip--left">
                  <div class="d-tooltip__content">
                    <span>Тут надо прописать текст о чем говорит эта иконка.</span>
                  </div>
                </div>
              </div>
            </div>
            -->
            <div class="promotions__card-content">
              <!--
              <div class="promotions__card-info promotions__card-info--fit mb-24 hidden-1200">
                <p class="promotions__card-info-text">
                  Скрыто у клиентов с индивидуальными условиями
                </p>
                <button class="promotions__card-info-button">
                  <i class="d-icon-info promotions__card-info-icon"></i>
                </button>
              </div>
              -->

              <div class="promotions__card-value-container">
                <span class="promotions__card-label promotions__card-audience-label"
                  >По географии</span
                >
                <div class="d-badge__container" v-if="this.form.regions">
                  <div
                    class="d-badge promotions__card-audience-badge"
                    v-for="region in this.form.regions"
                    :key="region.code"
                  >
                    <i
                      class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"
                    ></i>
                    {{ region.name }}
                  </div>
                </div>
                <div class="d-badge__container" v-else>
                  <div class="d-badge promotions__card-audience-badge">
                    <i
                      class="d-icon-toggles d-badge__icon promotions__card-audience-badge-icon"
                    ></i>
                    Все регионы
                  </div>
                </div>
              </div>

              <div
                class="d-divider d-divider--full promotions__card-audience-divider"
                v-if="type == 1"
              ></div>

              <div class="promotions__card-value-container" v-if="type == 1">
                <span class="promotions__card-label promotions__card-audience-label"
                  >Типы компаний</span
                >
                <div
                  class="d-badge__container"
                  v-if="this.form.stores || this.form.warehouses || this.form.vendors"
                >
                  <div class="d-badge promotions__card-audience-badge" v-if="this.form.stores">
                    <i
                      class="d-icon-toggles d-badge__icon promotions__card-audience-badge-icon"
                    ></i>
                    Магазины
                  </div>
                  <div class="d-badge promotions__card-audience-badge" v-if="this.form.warehouses">
                    <i
                      class="d-icon-toggles d-badge__icon promotions__card-audience-badge-icon"
                    ></i>
                    Оптовые компании
                  </div>
                  <div class="d-badge promotions__card-audience-badge" v-if="this.form.vendors">
                    <i
                      class="d-icon-toggles d-badge__icon promotions__card-audience-badge-icon"
                    ></i>
                    Производители
                  </div>
                </div>
                <div class="d-badge__container" v-else>
                  <div class="d-badge promotions__card-audience-badge">
                    <i
                      class="d-icon-toggles d-badge__icon promotions__card-audience-badge-icon"
                    ></i>
                    Все компании
                  </div>
                </div>
              </div>

              <div
                class="d-divider d-divider--full promotions__card-audience-divider"
                v-if="type == 1"
              ></div>

              <div
                class="promotions__card-value-container"
                v-if="type == 1 && this.form.all_organizations_selected"
              >
                <span class="promotions__card-label promotions__card-audience-label"
                  >Отдельные компании</span
                >
                <div class="d-badge__container" v-if="this.form.all_organizations_selected?.length">
                  <div
                    class="d-badge promotions__card-audience-badge"
                    v-for="company in this.form.all_organizations_selected"
                    :key="company.code"
                  >
                    <div
                      class="d-badge__img-fallback promotions__card-audience-badge-fallback"
                    ></div>
                    {{ company.name }}
                  </div>
                </div>
                <div class="d-badge__container" v-else>
                  <div class="d-badge promotions__card-audience-badge">
                    <i
                      class="d-icon-toggles d-badge__icon promotions__card-audience-badge-icon"
                    ></i>
                    Все компании
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dart-row promotions__content-card-container" v-if="type == 1">
        <div class="d-col d-col-24">
          <div class="promotions__card">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-check-list promotions__card-icon"></i>
                <p class="promotions__card-title">Условия участия в акции</p>

                <div class="d-category__container ml-44 hidden-1200">
                  <div class="d-category" v-if="this.form.negative">Негативная акция</div>
                  <div class="d-category" v-if="this.form.offer">
                    Акция доступна только в предложениях
                  </div>
                </div>
              </div>
              <div class="promotions__card-header-right">
                <!--
                <div
                  class="d-message promotions__card-message promotions__card-promo-conds-message hidden-800"
                >
                  <i class="d-icon-danger d-message__icon"></i>
                  <p class="d-message__text">Требуется интеграция склада</p>
                </div>
                -->

                <div class="d-divider d-divider--vertical d-divider--big hidden-1200"></div>

                <div class="promotions__info-actions">
                  <button class="promotions__card-button" @click.prevent="openStep(6)">
                    <i class="d-icon-pen2 promotions__card-button-icon"></i>
                  </button>
                  <div class="d-divider d-divider--vertical promotions__card-header-divider"></div>
                  <button class="promotions__card-button promotions__card-header-add">
                    <i class="d-icon-plus promotions__card-button-icon"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="promotions__card-content">
              <div
                class="d-badge__container d-badge__container--long promotions__card-promo-conds-badges visible-1200 hidden-600"
              >
                <div class="d-badge d-badge--filled" v-if="this.form.negative">
                  Негативная акция
                </div>
                <div class="d-badge d-badge--filled" v-if="this.form.offer">
                  Акция доступна только в предложениях
                </div>
              </div>
              <div class="promotions__card-block-wrapper">
                <div class="promotions__card-value-container promotions__card-block">
                  <span class="promotions__card-label hidden-1200">Требования к заказу</span>
                  <div class="promotions__card-block-inner">
                    <div class="promotions__card-block-title-container">
                      <span
                        class="promotions__card-label promotions__card-label--big visible-1200 hidden-600"
                        >Требования к заказу</span
                      >
                      <p
                        class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-title"
                      >
                        Минимальная общая сумма заказа товаров акции
                      </p>
                    </div>
                    <p
                      class="promotions__card-label promotions__card-label--big promotions__card-block-description"
                    >
                      Общая сумма товаров акции должна быть не менее указанной суммы.
                    </p>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-value"
                    >
                      {{ this.form.conditionMinSum }} ₽
                    </p>
                  </div>
                </div>

                <div
                  class="d-divider d-divider--vertical d-divider--full promotions__card-block-divider hidden-1200"
                ></div>
                <div
                  class="d-divider d-divider--full promotions__card-block-divider visible-1200"
                ></div>

                <div class="promotions__card-value-container promotions__card-block">
                  <span class="promotions__card-label hidden-1200">&nbsp;</span>
                  <div class="promotions__card-block-inner">
                    <div class="promotions__card-block-title-container">
                      <p
                        class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-title"
                      >
                        Минимальное количество SKU акции
                      </p>
                    </div>
                    <p
                      class="promotions__card-label promotions__card-label--big promotions__card-block-description"
                    >
                      В заказе должно быть не менее заданного количества SKU товаров акции.
                    </p>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-value"
                    >
                      {{ this.form.conditionMinCount ? this.form.conditionMinCount : 'Любое' }}
                    </p>
                  </div>
                </div>

                <div
                  class="d-divider d-divider--vertical d-divider--full promotions__card-block-divider hidden-1200"
                ></div>
                <div
                  class="d-divider d-divider--full promotions__card-block-divider visible-1200"
                ></div>

                <div class="promotions__card-value-container promotions__card-block">
                  <span class="promotions__card-label hidden-1200">&nbsp;</span>
                  <div class="promotions__card-block-inner">
                    <div class="promotions__card-block-title-container">
                      <p
                        class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-title"
                      >
                        Минимальное общее количество товаров
                      </p>
                    </div>
                    <p
                      class="promotions__card-label promotions__card-label--big promotions__card-block-description"
                    >
                      В заказе должно быть не менее заданного общего количества товаров акции.
                    </p>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-value"
                    >
                      {{
                        this.form.conditionMinGeneralCount
                          ? this.form.conditionMinGeneralCount
                          : 'Любое'
                      }}
                    </p>
                  </div>
                </div>

                <div
                  class="d-divider d-divider--vertical d-divider--full promotions__card-block-divider hidden-1200"
                ></div>
                <div
                  class="d-divider d-divider--full promotions__card-block-divider promotions__card-block-divider--320-bold visible-1200"
                ></div>

                <div class="promotions__card-block-container">
                  <div
                    class="promotions__card-block-wrapper promotions__card-block-wrapper--row promotions__card-block-wrapper--full"
                  >
                    <div class="promotions__card-value-container promotions__card-block">
                      <span class="promotions__card-label hidden-1200">&nbsp;</span>
                      <div class="promotions__card-block-container">
                        <div
                          class="promotions__card-block-inner promotions__card-block-inner--small grow-0"
                        >
                          <p
                            class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-title"
                          >
                            Совместимость
                          </p>
                          <p
                            class="promotions__card-label promotions__card-label--big promotions__card-block-description promotions__card-block-description--full"
                          >
                            С какой акцией может применяться совместно
                          </p>
                        </div>
                        <div
                          class="promotions__card-block-inner promotions__card-block-inner--small"
                        >
                          <p
                            class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-title"
                          >
                            {{
                              this.form.compatibilityDiscount == 1
                                ? 'Совместима со всеми акциями'
                                : ''
                            }}
                            {{
                              this.form.compatibilityDiscount == 2
                                ? 'Не совместима со всеми акциями'
                                : ''
                            }}
                            {{
                              this.form.compatibilityDiscount == 3
                                ? 'Не совместима с выбранными акциями'
                                : ''
                            }}
                            {{
                              this.form.compatibilityDiscount == 4
                                ? 'Совместима с выбранными акциями'
                                : ''
                            }}
                          </p>
                          <p
                            class="promotions__card-label promotions__card-block-description hidden-600"
                          ></p>
                        </div>
                      </div>
                    </div>

                    <div
                      class="d-divider d-divider--vertical d-divider--full promotions__card-block-divider promotions__card-block-divider--vertical"
                    ></div>

                    <div class="promotions__card-value-container promotions__card-block">
                      <span class="promotions__card-label hidden-1200">&nbsp;</span>
                      <div class="promotions__card-block-container">
                        <div
                          class="promotions__card-block-inner promotions__card-block-inner--small grow-0"
                        >
                          <p
                            class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-title"
                          >
                            Режим совместимости
                          </p>
                          <p
                            class="promotions__card-label promotions__card-label--big promotions__card-block-description promotions__card-block-description--full"
                          >
                            Как условия акций сочетаются
                          </p>
                        </div>
                        <div
                          class="promotions__card-block-inner promotions__card-block-inner--small"
                        >
                          <p
                            class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-title"
                          >
                            {{ this.form.compabilityMode == 0 ? 'Применяется бóльшая' : '' }}
                            {{ this.form.compabilityMode == 1 ? 'Складываются' : '' }}
                            {{
                              this.form.compabilityMode == 2 ? 'Назначаются последовательно' : ''
                            }}
                          </p>
                          <p
                            class="promotions__card-label promotions__card-label--big promotions__card-block-description promotions__card-block-description--full"
                          >
                            {{
                              this.form.compabilityMode == 0
                                ? 'Будет применена бóльшая скидка и отсрочка'
                                : ''
                            }}
                            {{
                              this.form.compabilityMode == 1
                                ? 'Проценты скидок сначала сложатся, затем сумма процентов отнимется от цены. Отсрочка сложится.'
                                : ''
                            }}
                            {{
                              this.form.compabilityMode == 2
                                ? 'Скидки применяются по очереди. Отсрочка сложится.'
                                : ''
                            }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    class="d-button d-button-tertiary promotions__card-block-button"
                    @click.prevent="openStep(7)"
                  >
                    <i class="d-icon-trade promotions__card-block-button-icon"></i>
                    Совместимость акций
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dart-row promotions__content-card-container" ref="warehouseProducts">
        <div class="d-col d-col-24">
          <div class="promotions__card products__card">
            <Loader v-if="this.productLoading" />
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-cube promotions__card-icon"></i>
                <p class="promotions__card-title">Товары и скидки</p>
              </div>
              <div class="promotions__info-actions">
                <button class="promotions__card-button promotions__card-header-add">
                  <i class="d-icon-plus promotions__card-button-icon"></i>
                </button>
              </div>
            </div>
            <div
              class="promotions__card-content products__card-content promotions__card-content--no-x-padding"
            >
              <div class="promotions__card-warehouse">
                <div class="promotions__card-value-container promotions__card-warehouse-header">
                  <p
                    class="promotions__card-value promotions__card-value--small promotions__card-value--bold promotions__card-block-title promotions__card-warehouse-title"
                  >
                    Склады
                  </p>
                  <span
                    class="promotions__card-label promotions__card-label--big promotions__card-warehouse-label"
                    >Укажите склады, на товары которых распространяется акция</span
                  >
                </div>
                <div class="promotions__card-warehouse-settings hidden-1200">
                  <div class="dart-row">
                    <div
                      class="d-col-md-12 d-col-24"
                      v-for="store in this.orgStores.items"
                      :key="store.id"
                    >
                      <div class="d-field-wrapper dart-mb-1">
                        <label class="d-switch" :for="'warehouse' + store.id">
                          <input
                            type="checkbox"
                            :name="'warehouse' + store.id"
                            :id="'warehouse' + store.id"
                            class="d-switch__input"
                            v-model="this.form.store_id"
                            :value="store.id"
                          />
                          <div class="d-switch__circle"></div>
                        </label>
                        <label :for="'warehouse' + store.id" class="d-switch__label"
                          >{{ store.name_short ? store.name_short : store.name }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="promotions__card-warehouse-settings visible-1200">
                  <div class="d-field-wrapper promotions__card-warehouse-settings-all">
                    <label class="d-switch" for="warehouse1">
                      <input
                        type="checkbox"
                        name="warehouse1"
                        id="warehouse1"
                        class="d-switch__input"
                      />
                      <div class="d-switch__circle"></div>
                    </label>
                    <label for="warehouse1" class="d-switch__label">Все склады </label>
                  </div>
                  <button
                    class="d-button d-button-primary d-button-primary-small d-button--sm-shadow promotions__card-warehouse-settings-choose"
                  >
                    <i class="d-icon-plus"></i>
                    Выбрать склад
                  </button>
                </div>
              </div>
              <div
                v-if="this.form.store_id?.length"
                class="d-divider d-divider--full d-divider--semibold d-divider--black promotions__card-warehouse-divider"
              ></div>
              <ActionProducts
                v-if="this.form.store_id?.length"
                :productsSelected="productsSelectedIn"
                :productsAvailable="productsAvailable"
                :productsAvailablePage="productsAvailablePage"
                :productsSelectedPage="productsSelectedPage"
                :perPage="this.per_page"
                @changeMinCount="changeMinCount"
                @changeMultiplicity="changeMultiplicity"
                @paginateProductsSelected="paginateProductsSelected"
                @paginateProductsAvailable="paginateProductsAvailable"
                @filterProductsSelected="filterProductsSelected"
                @filterProductsAvailable="filterProductsAvailable"
                @selectProduct="selectProduct"
                @deSelectProduct="deSelectProduct"
                @openFileDialog="openFileDialog"
                @settings="settings"
              />
              <div
                v-if="this.form.store_id?.length"
                class="d-divider d-divider--black d-divider--full promotions__card-products-divider"
              ></div>

              <ActionCollections
                v-if="this.form.store_id?.length"
                :collectionsAvailable="productGroups"
                :collections="this.form.product_groups"
                :perPage="this.per_page"
                @selectCollection="selectCollection"
                @deleteCollection="deleteCollection"
                @paginateGroup="paginateGroupProduct"
                @filterGroup="filterGroup"
                @filterGroupProduct="filterGroupProductSelected"
                @settings="settings"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- МАСТЕР СОЗДАНИЯ АКЦИЙ -->
    <teleport to="body">
      <customModal v-model="this.modals.master" class="promo-master-modal">
        <div class="promo-modal__header">
          <div class="promo-modal__header-left">
            <div class="d-modal2__header promo-modal__header-title-container">
              <p class="d-modal2__title promo-modal__header-title">Мастер создания акций</p>
              <p class="d-modal2__description promo-modal__header-description">
                Создайте акцию в несколько этапов
              </p>
            </div>
            <div
              class="d-divider d-divider--vertical d-divider--black promo-modal__header-divider"
            ></div>
            <span
              class="d-button d-button-tertiary box-shadow-none promo-modal__header-button"
              v-if="masterStep == 1"
            >
              <i class="d-icon-lines"></i>
              Контент акции
            </span>
            <span
              class="d-button d-button-tertiary box-shadow-none promo-modal__header-button"
              v-if="masterStep == 2"
            >
              <i class="d-icon-calendar"></i>
              Даты проведения акции
            </span>
            <span
              class="d-button d-button-tertiary box-shadow-none promo-modal__header-button"
              v-if="masterStep == 3"
            >
              <i class="d-icon-picture"></i>
              Баннер акции
            </span>
            <span
              class="d-button d-button-tertiary box-shadow-none promo-modal__header-button"
              v-if="masterStep == 4"
            >
              <i class="d-icon-wallet"></i>
              Условия оплаты
            </span>
            <span
              class="d-button d-button-tertiary box-shadow-none promo-modal__header-button"
              v-if="masterStep == 5"
            >
              <i class="d-icon-truck"></i>
              Условия доставки
            </span>
            <span
              class="d-button d-button-tertiary box-shadow-none promo-modal__header-button"
              v-if="masterStep == 6"
            >
              <i class="d-icon-percent"></i>
              Условия участия в акции: Требования к заказу
            </span>
            <span
              class="d-button d-button-tertiary box-shadow-none promo-modal__header-button"
              v-if="masterStep == 7"
            >
              <i class="d-icon-percent"></i>
              Условия участия в акции: Совместимость
            </span>
            <span
              class="d-button d-button-tertiary box-shadow-none promo-modal__header-button"
              v-if="masterStep == 8"
            >
              <i class="d-icon-user-star"></i>
              Аудитория акции
            </span>
            <span
              class="d-button d-button-tertiary box-shadow-none promo-modal__header-button"
              v-if="masterStep == 9"
            >
              <i class="d-icon-cube"></i>
              Товары и скидки: Склады
            </span>
            <span
              class="d-button d-button-tertiary box-shadow-none promo-modal__header-button"
              v-if="masterStep == 10"
            >
              <i class="d-icon-cube"></i>
              Товары и скидки: Товары
            </span>
          </div>
          <div class="promo-modal__header-right">
            <!--
            <div class="d-progress promo-modal__progress">
              <p class="d-progress__label promo-modal__progress-label">
                Пройдено {{ this.visibleMasterSteps.length }} из 10 шагов
              </p>
              <div class="d-progress__line promo-modal__progress-line"></div>
            </div>
            -->
            <a
              href="#"
              @click.prevent="this.modals.master = false"
              class="d-modal2__close promo-modal__close"
            >
              <i class="d-icon-times d-modal2__close-icon"></i>
            </a>
          </div>
        </div>
        <div class="d-modal2__content promo-modal__content">
          <div class="promo-master">
            <div class="promo-master__content">
              <div class="promo-master__content-left">
                <!-- 1 ЭТАП - Контент акции -->
                <div class="contents" id="promoContent" v-if="masterStep == 1">
                  <p class="promo-master__title promo-master__title--sm-margin">Контент акции</p>
                  <div
                    class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical promo-master__settings promo-master__settings--sm-margin"
                  >
                    <label for="actionName" class="d-dropdown__label">Название акции </label>
                    <div
                      class="d-input d-input--light d-input--width-640 d-textarea promo-master__textarea"
                    >
                      <input
                        v-model="this.form.name"
                        placeholder="Например: '4+1 на дрели'"
                        name="actionName"
                        class="d-input__field"
                      />
                    </div>
                  </div>
                  <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                    <label for="dateStart" class="d-dropdown__label">Описание акции </label>
                    <Editor
                      api-key="6rm0whw8wmdnboh5ygnqkezf3b797nz9ufxilvttbxq8mgl1"
                      language_url="../../../src/locales/tiny/ru.js"
                      :language_load="true"
                      v-model="this.form.description"
                      initial-value="<b>Подзаголовок акции</b>
                      <br>
                      <p><span style='text-decoration: underline'>Перечислить все выгодные условия:</span> скидки, подарки, бонусы, возможность выиграть приз и т.д.</p>
                      <p><span style='text-decoration: underline'>Выделить ключевые преимущества:</span> чем ваша акция лучше, чем у конкурентов?</p>
                      <p><span style='text-decoration: underline'>Указать, для кого она предназначена:</span> для всех, для определенной возрастной группы, для постоянных клиентов и т.д.</p>"
                      :init="{
                        plugins: [
                          'advlist',
                          'autolink',
                          'lists',
                          'link',
                          'image',
                          'charmap',
                          'preview',
                          'anchor',
                          'searchreplace',
                          'visualblocks',
                          'code',
                          'fullscreen',
                          'insertdatetime',
                          'media',
                          'table',
                          'help',
                          'wordcount',
                        ],
                        toolbar:
                          'undo redo | ' +
                          'bold italic underline backcolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                        content_style:
                          'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                        menu: {
                          file: {
                            title: 'Файл',
                            items:
                              'newdocument restoredraft | preview | importword exportpdf exportword | deleteallconversations',
                          },
                          edit: {
                            title: 'Редактировать',
                            items:
                              'undo redo | cut copy paste pastetext | selectall | searchreplace',
                          },
                          view: { title: 'View', items: '' },
                          insert: {
                            title: 'Вставить',
                            items:
                              'image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime',
                          },
                          format: {
                            title: 'Форматирование',
                            items:
                              'bold italic underline strikethrough superscript subscript | align lineheight | forecolor | language | removeformat',
                          },
                          tools: { title: 'Tools', items: '' },
                          table: {
                            title: 'Таблица',
                            items:
                              'inserttable | cell row column | advtablesort | tableprops deletetable',
                          },
                          help: { title: 'Help', items: '' },
                        },
                      }"
                    />
                  </div>
                </div>
                <!-- 2 ЭТАП Даты проведения акции -->
                <div class="contents" id="eventDates" v-if="masterStep == 2">
                  <p class="promo-master__title promo-master__title--sm-margin">
                    Даты проведения акции
                  </p>
                  <div class="d-field-container d-field-container--long">
                    <div
                      class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical promo-master__dates"
                    >
                      <!--<DatePicker
                        v-model="this.form.dates"
                        dateFormat="dd.mm.yy"
                        selectionMode="range"
                        placeholder="Выберите даты"
                        :manualInput="false"
                        showIcon
                      />-->
                      <DatePicker
                        v-model="this.form.start_date"
                        dateFormat="dd.mm.yy"
                        placeholder="Выберите дату начала"
                        :manualInput="false"
                        :maxDate="dateStart"
                        showIcon
                      />
                      <DatePicker
                        v-model="this.form.end_date"
                        dateFormat="dd.mm.yy"
                        placeholder="Выберите дату окончания"
                        :manualInput="false"
                        :minDate="dateTomorrow"
                        showIcon
                      />
                    </div>
                  </div>
                </div>
                <!-- 3 ЭТАП Баннер акции -->
                <div class="contents" id="promoBanner" v-if="masterStep == 3">
                  <p class="promo-master__title">Баннер акции</p>
                  <div class="dart-row">
                    <div class="d-col-24 d-col-md-12">
                      <div class="banner-wrap">
                        <div
                          class="d-field-container d-field-container--vertical promo-master__upload-header"
                        >
                          <p class="promo-master__subtitle">Большой баннер</p>
                          <p class="d-text promo-master__description">
                            Загрузите изображение с разрешением 6824х1996, в формате png, jpeg, svg.
                            Размер изображения не должен превышать 5 Мбайт&nbsp;.
                          </p>
                        </div>
                        <DropZone
                          v-if="!this.upload_product"
                          class=""
                          :maxFiles="Number(1)"
                          :maxFileSize="5000000"
                          url="/rest/file_upload.php?banner=max"
                          :uploadOnDrop="true"
                          :multipleUpload="true"
                          :acceptedFiles="['png', 'jpeg', 'jpg', 'svg']"
                          :parallelUpload="1"
                          @sending="parseFileBanner"
                          @uploaded="uploadedFile"
                          @removedFile="deselectFileBannerAll"
                          v-bind="args"
                        >
                          <template v-slot:message>
                            <div class="d-upload promo-master__upload">
                              <img
                                src="/icons/upload-cloud.svg"
                                alt="Upload icon"
                                class="d-upload__icon"
                                width="80"
                                height="50"
                              />
                              <p class="d-upload__title">Перетащите файл в эту область</p>
                              <p class="d-upload__description">
                                Вы также можете загрузить файлы png, jpeg, svg,
                                <span class="d-link d-upload__link">нажав сюда</span>
                              </p>
                            </div>
                          </template>
                        </DropZone>
                        <div
                          class="upload-banner__image"
                          v-if="this.form.adv.files.max.original_href"
                        >
                          <img :src="this.form.adv.files.max.original_href" />
                        </div>
                      </div>
                    </div>
                    <div class="d-col-24 d-col-md-12">
                      <div class="banner-wrap" v-if="type == 2">
                        <div
                          class="d-field-container d-field-container--vertical promo-master__upload-header"
                        >
                          <p class="promo-master__subtitle">Малый баннер</p>
                          <p class="d-text promo-master__description">
                            Загрузить изображение нужно размером не менее 324х161, соблюдая
                            пропорции. Размер изображения не должен превышать 5 Мбайт.
                          </p>
                        </div>
                        <DropZone
                          v-if="!this.upload_product"
                          class=""
                          :maxFiles="Number(1)"
                          :maxFileSize="5000000"
                          url="/rest/file_upload.php?banner=min"
                          :uploadOnDrop="true"
                          :multipleUpload="true"
                          :acceptedFiles="['png', 'jpeg', 'jpg', 'svg']"
                          :parallelUpload="1"
                          @sending="parseFileBanner"
                          @uploaded="uploadedFile"
                          @removedFile="deselectFileBannerAll"
                          v-bind="args"
                        >
                          <template v-slot:message>
                            <div class="d-upload promo-master__upload">
                              <img
                                src="/icons/upload-cloud.svg"
                                alt="Upload icon"
                                class="d-upload__icon"
                                width="80"
                                height="50"
                              />
                              <p class="d-upload__title">Перетащите файл в эту область</p>
                              <p class="d-upload__description">
                                Вы также можете загрузить файлы png, jpeg, svg,
                                <span class="d-link d-upload__link">нажав сюда</span>
                              </p>
                            </div>
                          </template>
                        </DropZone>
                        <div class="upload-banner__image">
                          <img
                            :src="this.files?.min?.original_href"
                            v-if="this.files?.min?.original_href"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="d-col-24 d-col-md-12">
                      <div class="banner-wrap" v-if="type == 2">
                        <div
                          class="d-field-container d-field-container--vertical promo-master__upload-header"
                        >
                          <p class="promo-master__subtitle">Квадратный баннер</p>
                          <p class="d-text promo-master__description">
                            Загрузить изображение нужно размером не менее 459х459, соблюдая
                            пропорции. Размер изображения не должен превышать 5 Мбайт.
                          </p>
                        </div>
                        <DropZone
                          v-if="!this.upload_product"
                          class=""
                          :maxFiles="Number(1)"
                          :maxFileSize="5000000"
                          url="/rest/file_upload.php?banner=small"
                          :uploadOnDrop="true"
                          :multipleUpload="true"
                          :acceptedFiles="['png', 'jpeg', 'jpg', 'svg']"
                          :parallelUpload="1"
                          @sending="parseFileBanner"
                          @uploaded="uploadedFile"
                          @removedFile="deselectFileBannerAll"
                          v-bind="args"
                        >
                          <template v-slot:message>
                            <div class="d-upload promo-master__upload">
                              <img
                                src="/icons/upload-cloud.svg"
                                alt="Upload icon"
                                class="d-upload__icon"
                                width="80"
                                height="50"
                              />
                              <p class="d-upload__title">Перетащите файл в эту область</p>
                              <p class="d-upload__description">
                                Вы также можете загрузить файлы png, jpeg, svg,
                                <span class="d-link d-upload__link">нажав сюда</span>
                              </p>
                            </div>
                          </template>
                        </DropZone>
                        <div class="upload-banner__image">
                          <img
                            :src="this.files?.small?.original_href"
                            v-if="this.files?.small?.original_href"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-field-container d-field-container--vertical promo-master__settings">
                    <p class="promo-master__subtitle">Места размещения</p>
                    <div class="dart-row promo-master__radio-container dart-mt-1">
                      <div class="d-col-12" v-for="(item, key) in this.actionAdvPages" :key="key">
                        <div class="d-radio__wrapper promo-master__radio-wrapper dart-mb-1">
                          <label class="d-switch" :for="'place_' + item.code">
                            <input
                              type="checkbox"
                              :name="'place_' + item.code"
                              :id="'place_' + item.code"
                              class="d-switch__input"
                              v-model="this.form.adv.place[item.code]"
                            />
                            <div class="d-switch__circle"></div>
                          </label>
                          <label :for="'place_' + item.code" class="d-switch__label"
                            >{{ item.name }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 4 ЭТАП - Условия оплаты -->
                <div class="contents" id="paymentConditions" v-if="masterStep == 4">
                  <p class="promo-master__title">Условия оплаты</p>
                  <div class="d-field-container d-field-container--vertical promo-master__settings">
                    <p class="promo-master__subtitle">Настройка отсрочки платежа</p>
                    <div class="d-radio__container d-radio__container--small" v-if="type == 2">
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="deferred-payment-1" class="d-radio">
                          <input
                            type="radio"
                            name="deferred-payment"
                            id="deferred-payment-1"
                            v-model="this.form.typePay"
                            value="1"
                            class="d-radio__input"
                          />
                        </label>
                        <label
                          for="deferred-payment-1"
                          class="d-radio__label promo-master__radio-label"
                          >Покупатель оплачивает товар при заказе
                        </label>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="deferred-payment-2" class="d-radio">
                          <input
                            type="radio"
                            name="deferred-payment"
                            id="deferred-payment-2"
                            v-model="this.form.typePay"
                            value="2"
                            class="d-radio__input"
                          />
                        </label>
                        <label
                          for="deferred-payment-2"
                          class="d-radio__label promo-master__radio-label"
                          >Предоставление рассрочки на 6 месяцев покупателю, за счет поставщика
                        </label>
                      </div>
                    </div>
                    <div class="d-radio__container d-radio__container--small" v-if="type == 1">
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="deferred-payment-1" class="d-radio">
                          <input
                            type="radio"
                            name="deferred-payment"
                            id="deferred-payment-1"
                            v-model="this.form.typeDelay"
                            value="1"
                            class="d-radio__input"
                          />
                        </label>
                        <label
                          for="deferred-payment-1"
                          class="d-radio__label promo-master__radio-label"
                          >Отсрочка (по умолчанию)
                        </label>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="deferred-payment-2" class="d-radio">
                          <input
                            type="radio"
                            name="deferred-payment"
                            id="deferred-payment-2"
                            v-model="this.form.typeDelay"
                            value="2"
                            class="d-radio__input"
                          />
                        </label>
                        <label
                          for="deferred-payment-2"
                          class="d-radio__label promo-master__radio-label"
                          >Под реализацию
                        </label>
                      </div>
                    </div>
                  </div>
                  <div v-if="type == 1">
                    <div
                      class="promotions__card promotions__card--small promo-master__card"
                      v-if="this.form.typeDelay == 1"
                    >
                      <div class="promotions__card-header promo-master__card-header">
                        <div class="promotions__card-header-left">
                          <p class="promotions__card-title">
                            Срок отсрочки платежа:
                            <span class="promotions__card-title-span"
                              >{{ this.form.postponementPeriod }} дн.</span
                            >
                          </p>
                        </div>
                        <a
                          href="#"
                          @click.prevent="this.modals.delay = true"
                          class="promotions__card-button"
                        >
                          <i class="d-icon-pen2 promotions__card-button-icon"></i>
                        </a>
                      </div>
                      <div class="promotions__card-content promo-master__card-content">
                        <div class="promotions__card-values promo-master__card-values">
                          <p
                            class="promotions__card-text promotions__card-text--bold promotions__card-text--small"
                          >
                            График платежей:
                          </p>
                          <div class="d-field-container d-field-container--vertical">
                            <p
                              class="promotions__card-text promotions__card-text--dark-gray promo-master__card-text"
                              v-for="(item, index) in this.form.delay"
                              :key="index"
                            >
                              — {{ item.percent }}% через {{ item.day }} дн. после отгрузки
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <div class="d-input d-input--light d-input--width-280">
                        <input
                          class="d-input__field"
                          type="text"
                          placeholder="0"
                          name="dateStart"
                          v-model="this.form.postponementPeriod"
                        />
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div v-if="this.form.typePay == '2'">
                      <label for="typeDelayPercent"
                        >Процент скидки от стоимости товара, который поставщик выделяет для
                        компенсации рассрочки:</label
                      >
                      <div class="dart-mt-1">
                        <InputNumber
                          v-model="this.form.typePayPercent"
                          id="typeDelayPercent"
                          inputId="horizontal-buttons"
                          :step="0.1"
                          min="0"
                          max="100"
                          suffix=" %"
                          incrementButtonIcon="pi pi-plus"
                          decrementButtonIcon="pi pi-minus"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 5 ЭТАП - Условия доставки -->
                <div class="contents" id="deliveryConditions" v-if="masterStep == 5">
                  <p class="promo-master__title">Условия доставки</p>
                  <div
                    class="d-field-container d-field-container--vertical promo-master__settings promo-master__settings--sm-margin"
                    v-if="type == 1"
                  >
                    <p class="promo-master__subtitle">Кто оплачивает доставку:</p>
                    <div class="d-radio__container d-radio__container--small">
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="who-pay-delivery-1" class="d-radio">
                          <input
                            type="radio"
                            name="who-pay-delivery"
                            id="who-pay-delivery-1"
                            class="d-radio__input"
                            value="1"
                            v-model="this.form.paymentDelivery"
                          />
                        </label>
                        <label
                          for="who-pay-delivery-1"
                          class="d-radio__label promo-master__radio-label"
                          >Поставщик
                        </label>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="who-pay-delivery-2" class="d-radio">
                          <input
                            type="radio"
                            name="who-pay-delivery"
                            id="who-pay-delivery-2"
                            class="d-radio__input"
                            value="0"
                            v-model="this.form.paymentDelivery"
                          />
                        </label>
                        <label
                          for="who-pay-delivery-2"
                          class="d-radio__label promo-master__radio-label"
                          >Покупатель
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    class="d-field-container d-field-container--vertical promo-master__settings"
                    v-if="type == 1"
                  >
                    <p class="promo-master__subtitle">Сроки отгрузки товаров</p>
                    <div class="d-radio__container d-radio__container--small">
                      <!--  <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="shipment-deadline-1" class="d-radio">
                          <input
                            type="radio"
                            name="shipment-deadline"
                            id="shipment-deadline-1"
                            class="d-radio__input"
                            value="1"
                            v-model="this.form.paymentTime"
                          />
                        </label>
                        <label
                          for="shipment-deadline-1"
                          class="d-radio__label promo-master__radio-label"
                          >Определяется данными из отгрузок
                        </label>
                      </div>-->
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="shipment-deadline-2" class="d-radio">
                          <input
                            type="radio"
                            name="shipment-deadline"
                            id="shipment-deadline-2"
                            class="d-radio__input"
                            value="0"
                            v-model="this.form.paymentTime"
                          />
                        </label>
                        <label
                          for="shipment-deadline-2"
                          class="d-radio__label promo-master__radio-label"
                          >Определяется по расчету доставки ТК
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="d-radio__container d-radio__container--small" v-if="type == 2">
                    <div class="d-radio__wrapper promo-master__radio-wrapper">
                      <label for="deferred-payment-1" class="d-radio">
                        <input
                          type="radio"
                          name="deferred-payment"
                          id="deferred-payment-1"
                          v-model="this.form.typeDelivery"
                          value="1"
                          class="d-radio__input"
                        />
                      </label>
                      <label
                        for="deferred-payment-1"
                        class="d-radio__label promo-master__radio-label"
                        >Покупатель оплачивает доставку
                      </label>
                    </div>
                    <div class="d-radio__wrapper promo-master__radio-wrapper">
                      <label for="deferred-payment-2" class="d-radio">
                        <input
                          type="radio"
                          name="deferred-payment"
                          id="deferred-payment-2"
                          v-model="this.form.typeDelivery"
                          value="2"
                          class="d-radio__input"
                        />
                      </label>
                      <label
                        for="deferred-payment-2"
                        class="d-radio__label promo-master__radio-label"
                        >Поставщик компенсирует доставку
                      </label>
                    </div>
                  </div>
                  <div class="dart-mt-1" v-if="type == 2 && this.form.typeDelivery == 2">
                    <label for="typeDelayPercent"
                      >Процент скидки от стоимости товара, который поставщик выделяет для
                      компенсации рассрочки:</label
                    >
                    <div class="dart-mt-1">
                      <InputNumber
                        v-model="this.form.typeDeliveryPercent"
                        id="typeDelayPercent"
                        inputId="horizontal-buttons"
                        :step="0.1"
                        min="0"
                        max="100"
                        suffix=" %"
                        incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </div>
                </div>
                <!-- 6 ЭТАП - Условия участия в акции: Требования к заказу -->
                <div class="contents" id="promoConditionsRequirements" v-if="masterStep == 6">
                  <p class="promo-master__title">Условия участия в акции: требования к заказу</p>
                  <!-- Минимальная общая сумма заказа товаров акции -->
                  <div
                    class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings promo-master__settings--sm-margin"
                  >
                    <div class="promo-master__subtitle-container">
                      <p class="promo-master__subtitle promo-master__subtitle--1200-small">
                        Минимальная общая сумма заказа товаров акции
                      </p>
                      <p class="d-text promo-master__description">
                        Общая сумма товаров акции должна быть не менее указанной суммы
                      </p>
                    </div>
                    <div class="d-input--width-280">
                      <InputNumber
                        v-model="this.form.conditionMinSum"
                        id="conditionMinSum"
                        inputId="horizontal-buttons"
                        :step="1"
                        min="0"
                        max="99999999"
                        suffix=" ₽"
                        incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </div>
                  <!-- Минимальное количество SKU акции -->
                  <div
                    class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings promo-master__settings--sm-margin"
                  >
                    <div class="promo-master__subtitle-container">
                      <p class="promo-master__subtitle promo-master__subtitle--1200-small">
                        Минимальное количество SKU акции
                      </p>
                      <p class="d-text promo-master__description">
                        В заказе должно быть не менее заданного количества SKU товаров акции
                      </p>
                    </div>
                    <div class="d-input--width-280">
                      <InputNumber
                        v-model="this.form.conditionMinCount"
                        id="conditionMinCount"
                        inputId="horizontal-buttons"
                        :step="1"
                        min="0"
                        max="999999"
                        suffix=" шт"
                        incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </div>
                  <!-- Минимальное общее количество товаров -->
                  <div
                    class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings"
                  >
                    <div class="promo-master__subtitle-container">
                      <p class="promo-master__subtitle promo-master__subtitle--1200-small">
                        Минимальное общее количество товаров
                      </p>
                      <p class="d-text promo-master__description">
                        В заказе должно быть не менее заданного общего количества товаров акции
                      </p>
                    </div>
                    <div class="d-input--width-280">
                      <InputNumber
                        v-model="this.form.conditionMinGeneralCount"
                        id="conditionMinGeneralCount"
                        inputId="horizontal-buttons"
                        :step="1"
                        min="0"
                        max="999999"
                        suffix=" шт"
                        incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </div>
                  <div
                    class="d-radio__container d-radio__container d-radio__container--1200-vertical d-radio__container--1200-small"
                  >
                    <div
                      class="d-radio__wrapper d-radio__wrapper--1200-start promo-master__radio-wrapper"
                    >
                      <label class="d-switch" for="negative-promo1">
                        <input
                          type="checkbox"
                          name="negative-promo1"
                          v-model="this.form.negative"
                          id="negative-promo1"
                          class="d-switch__input"
                        />
                        <div class="d-switch__circle"></div>
                      </label>
                      <div class="d-switch__label-container">
                        <label
                          for="negative-promo1"
                          class="d-switch__label d-switch__label--regular"
                          >Негативная акция
                        </label>
                        <p class="d-description">
                          Условия акции как ухудшают, так и улучшают предложения, например,
                          увеличение цены при увеличении отсрочки. Акция не будет применяться
                          автоматически, а потребует включения покупателем.
                        </p>
                      </div>
                    </div>
                    <!--<div
                      class="d-radio__wrapper d-radio__wrapper--1200-start promo-master__radio-wrapper"
                    >
                      <label class="d-switch" for="negative-promo2">
                        <input
                          type="checkbox"
                          name="negative-promo2"
                          id="negative-promo2"
                          v-model="this.form.offer"
                          class="d-switch__input"
                        />
                        <div class="d-switch__circle"></div>
                      </label>
                      <div class="d-switch__label-container">
                        <label
                          for="negative-promo2"
                          class="d-switch__label d-switch__label--regular"
                          >Доступна только в Предложениях
                        </label>
                        <p class="d-description">
                          Акция будет видна только в рамках предложения для магазинов, в каталоге и
                          в разделе «Акции поставщиков» выводиться не будет.
                        </p>
                      </div>
                    </div>-->
                  </div>
                </div>
                <!-- 7 ЭТАП - Условия участия в акции: Совместимость -->
                <div class="contents" id="promoConditionsCompatibility" v-if="masterStep == 7">
                  <p class="promo-master__title">Условия участия в акции: совместимость</p>
                  <!-- Совместимость -->
                  <div
                    class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings"
                  >
                    <div class="promo-master__subtitle-container">
                      <p class="promo-master__subtitle">Совместимость</p>
                      <p class="d-text promo-master__description">
                        С какими акциями может применяться совместно
                      </p>
                    </div>
                    <div
                      class="d-radio__container d-radio__container--small d-radio__container--vertical"
                    >
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="compatibility1" class="d-radio">
                          <input
                            type="radio"
                            name="compatibility"
                            id="compatibility1"
                            value="1"
                            class="d-radio__input"
                            v-model="this.form.compatibilityDiscount"
                          />
                        </label>
                        <label for="compatibility1" class="d-radio__label promo-master__radio-label"
                          >Совместима со всеми акциями
                        </label>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="compatibility2" class="d-radio">
                          <input
                            type="radio"
                            name="compatibility"
                            id="compatibility2"
                            class="d-radio__input"
                            value="4"
                            v-model="this.form.compatibilityDiscount"
                          />
                        </label>
                        <label for="compatibility2" class="d-radio__label promo-master__radio-label"
                          >Совместима только с выбранными акциями
                        </label>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="compatibility3" class="d-radio">
                          <input
                            type="radio"
                            name="compatibility"
                            id="compatibility3"
                            value="2"
                            v-model="this.form.compatibilityDiscount"
                            class="d-radio__input"
                          />
                        </label>
                        <label for="compatibility3" class="d-radio__label promo-master__radio-label"
                          >Не совместима со всеми акциями
                        </label>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="compatibility4" class="d-radio">
                          <input
                            type="radio"
                            name="compatibility"
                            id="compatibility4"
                            class="d-radio__input"
                            value="3"
                            v-model="this.form.compatibilityDiscount"
                          />
                        </label>
                        <label for="compatibility4" class="d-radio__label promo-master__radio-label"
                          >Не совместима с выбранными акциями
                        </label>
                      </div>
                      <div
                        class="dart-form-group dart-mt-1"
                        v-if="
                          (this.form.compatibilityDiscount == 3 ||
                            this.form.compatibilityDiscount == 4) &&
                          this.type != 2
                        "
                      >
                        <label class="d-text promo-master__description"
                          >Выберите акции из списка</label
                        >
                        <MultiSelect
                          :key="new Date().getMilliseconds()"
                          filter
                          v-model="this.form.actions"
                          display="chip"
                          :options="this.allAction"
                          optionLabel="name"
                          placeholder="Выберите из списка"
                          class="w-full dart-mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- Режим совместимости -->
                  <div
                    class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings promo-master__settings--sm-margin"
                    v-if="this.form.compatibilityDiscount != 2"
                  >
                    <div class="promo-master__subtitle-container">
                      <p class="promo-master__subtitle">Режим совместимости</p>
                      <p class="d-text promo-master__description">
                        Как условия совместимых акций сочетаются
                      </p>
                    </div>
                    <div
                      class="d-radio__container d-radio__container--big d-radio__container--1200-vertical d-radio__container--1200-tiny-small"
                    >
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="compatibilitymode0" class="d-radio">
                          <input
                            type="radio"
                            name="compatibilitymode"
                            id="compatibilitymode0"
                            class="d-radio__input"
                            value="0"
                            v-model="this.form.compabilityMode"
                          />
                        </label>
                        <div class="d-switch__label-container">
                          <label
                            for="compatibilitymode0"
                            class="d-switch__label d-switch__label--regular"
                            >Применяется бóльшая
                          </label>
                          <p class="d-description">Будет применена бóльшая скидка и отсрочка</p>
                        </div>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="compatibilitymode1" class="d-radio">
                          <input
                            type="radio"
                            name="compatibilitymode"
                            id="compatibilitymode1"
                            class="d-radio__input"
                            value="1"
                            v-model="this.form.compabilityMode"
                          />
                        </label>
                        <div class="d-switch__label-container">
                          <label
                            for="compatibilitymode1"
                            class="d-switch__label d-switch__label--regular"
                            >Складываются
                          </label>
                          <p class="d-description">
                            Проценты скидок сначала сложатся, затем сумма<br />
                            процентов отнимется от цены. Отсрочка сложится.
                          </p>
                        </div>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="compatibilitymode2" class="d-radio">
                          <input
                            type="radio"
                            name="compatibilitymode"
                            id="compatibilitymode2"
                            class="d-radio__input"
                            value="2"
                            v-model="this.form.compabilityMode"
                          />
                        </label>
                        <div class="d-switch__label-container">
                          <label
                            for="compatibilitymode2"
                            class="d-switch__label d-switch__label--regular"
                            >Назначаются последовательно
                          </label>
                          <p class="d-description">
                            Скидки применяются по очереди. Отсрочка сложится.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 8 ЭТАП - Аудитория акции -->
                <div class="contents" id="promoAudience" v-if="masterStep == 8">
                  <p class="promo-master__title promo-master__title--ms-margin">Аудитория акции</p>
                  <div
                    class="d-radio__container d-radio__container-vertical d-radio__container--big d-radio__container--1200-vertical d-radio__container--1200-tiny-small"
                  >
                    <div class="d-radio__wrapper promo-master__radio-wrapper">
                      <label for="participantsType3" class="d-radio">
                        <input
                          type="radio"
                          name="participantsType"
                          id="participantsType3"
                          class="d-radio__input"
                          value="3"
                          v-model="this.form.participantsType"
                        />
                      </label>
                      <div class="d-radio__label-container">
                        <label
                          for="participantsType3"
                          class="d-radio__label promo-master__radio-label"
                          >Неограниченный круг участников
                        </label>
                      </div>
                    </div>
                    <div class="d-radio__wrapper promo-master__radio-wrapper">
                      <label for="participantsType2" class="d-radio">
                        <input
                          type="radio"
                          name="compatibilitymode"
                          id="participantsType2"
                          class="d-radio__input"
                          value="2"
                          v-model="this.form.participantsType"
                        />
                      </label>
                      <div class="d-radio__label-container">
                        <label
                          for="participantsType2"
                          class="d-radio__label promo-master__radio-label"
                          >Исключить регион/участников показа
                        </label>
                      </div>
                    </div>
                    <div class="d-radio__wrapper promo-master__radio-wrapper">
                      <label for="participantsType1" class="d-radio">
                        <input
                          type="radio"
                          name="compatibilitymode"
                          id="participantsType1"
                          class="d-radio__input"
                          value="1"
                          v-model="this.form.participantsType"
                        />
                      </label>
                      <div class="d-radio__label-container">
                        <label
                          for="participantsType1"
                          class="d-radio__label promo-master__radio-label"
                          >Выбрать регион/участников показа
                        </label>
                      </div>
                    </div>
                  </div>
                  <!-- Участники акции -->
                  <div v-if="this.form.participantsType != 3" class="dart-mt-2">
                    <div
                      class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings promo-master__settings--sm-margin"
                    >
                      <div class="promo-master__subtitle-container">
                        <p class="promo-master__subtitle">Участники акции</p>
                        <p class="d-text promo-master__description">
                          По умолчанию акция доступна всем без исключения.
                        </p>
                      </div>
                    </div>
                    <div class="promo-master__audience-changes">
                      <!-- Участники по географии -->
                      <div
                        class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings"
                      >
                        <p class="promo-master__subtitle promo-master__subtitle--small">
                          Участники по географии
                        </p>
                        <div>
                          <button
                            class="d-button d-button-primary d-button--no-shadow d-button--width-auto"
                            @click.prevent="((this.modals.regions = true), resolveRegTemp())"
                          >
                            <i class="d-icon-plus"></i>
                            <span>Выбрать регионы</span>
                          </button>
                          <div class="chips">
                            <div
                              class="chip"
                              v-for="(item, index) in this.form.regions"
                              :key="item.code"
                            >
                              <i
                                class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"
                              ></i>
                              <span>{{ item.name }}</span>
                              <a href="#" class="chip-close" @click.prevent="regionDel(index)"></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings"
                      >
                        <p class="promo-master__subtitle promo-master__subtitle--small">
                          Отдельные компании
                        </p>
                        <div>
                          <button
                            class="d-button d-button-primary d-button--no-shadow d-button--width-auto"
                            @click.prevent="this.modals.organization = true"
                          >
                            <i class="d-icon-plus"></i>
                            <span>Выбрать организации</span>
                          </button>
                          <div class="chips">
                            <div
                              class="chip"
                              v-for="(item, index) in this.form.all_organizations_selected"
                              :key="item.code"
                            >
                              <img
                                v-if="item.image"
                                :src="item.image"
                                :alt="item.name"
                                class="chip-img"
                              />
                              <span v-else class="chip-img"></span>
                              <span>{{ item.name }}</span>
                              <a href="#" class="chip-close" @click.prevent="orgDel(index)"></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Участники по типу компании -->
                      <div
                        class="d-field-container d-field-container--long d-field-container--vertical"
                        v-if="type == 1"
                      >
                        <p class="promo-master__subtitle promo-master__subtitle--small">
                          Участники по типу компании
                        </p>
                        <div
                          class="d-radio__container d-radio__container--small d-radio__container--verticalpromo-master__settings promo-master__audience-change"
                        >
                          <div class="d-field-wrapper">
                            <label class="d-switch" for="actionShops">
                              <input
                                type="checkbox"
                                name="shops"
                                id="actionShops"
                                class="d-switch__input"
                                v-model="this.form.stores"
                              />
                              <div class="d-switch__circle"></div>
                            </label>
                            <label for="actionShops" class="d-switch__label">Магазины </label>
                          </div>
                          <div class="d-field-wrapper">
                            <label class="d-switch" for="actionWholesale">
                              <input
                                type="checkbox"
                                name="actionWholesale"
                                id="actionWholesale"
                                class="d-switch__input"
                                v-model="this.form.warehouses"
                              />
                              <div class="d-switch__circle"></div>
                            </label>
                            <label for="actionWholesale" class="d-switch__label"
                              >Оптовые компании
                            </label>
                          </div>
                          <div class="d-field-wrapper">
                            <label class="d-switch" for="actionVendors">
                              <input
                                type="checkbox"
                                name="actionVendors"
                                id="actionVendors"
                                class="d-switch__input"
                                v-model="this.form.vendors"
                              />
                              <div class="d-switch__circle"></div>
                            </label>
                            <label for="actionVendors" class="d-switch__label"
                              >Производители
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Поздравляем -->
                <div class="contents" id="congratulations" v-if="masterStep == 9">
                  <div class="promo-master__title-container">
                    <p class="promo-master__title promo-master__title--no-margin">
                      Поздравляем!<br />Вы почти настроили Акцию
                    </p>
                    <div class="d-description">
                      Сейчас система переместит вас в разде "Товары и скидки", где вы сможете
                      выбрать склад и добавить товары в Акцию.
                    </div>
                  </div>
                </div>
                <!-- Поздравляем -->
                <div class="contents" id="congratulations" v-if="masterStep == 11">
                  <div class="promo-master__title-container">
                    <p class="promo-master__title promo-master__title--no-margin">
                      Поздравляем!<br />Вы создали акцию «Купи слона»
                    </p>
                    <div class="d-description">
                      Вы прошли много шагов, а это значит, что ваша акция будет максимально
                      эффективной!
                    </div>
                  </div>
                  <div class="d-button__container d-button__container--small promo-master__actions">
                    <!--
                    <button
                      class="d-button d-button-secondary d-button-secondary-small d-button--sm-padding d-button--sm-shadow"
                    >
                      Смотреть релиз акции
                    </button>
                    -->
                    <button
                      class="d-button d-button-primary d-button-primary-small d-button--sm-padding d-button--sm-shadow"
                    >
                      Включить акцию
                    </button>
                  </div>
                </div>
              </div>
              <div class="promo-master__content-right">
                <div class="promo-master__setting-container">
                  <button
                    @click.prevent="openStep(1)"
                    class="d-button d-button-tertiary box-shadow-none promo-master__setting"
                    :class="{
                      'promo-master__setting--used': this.isUsed(1),
                      'promo-master__setting--disabled': this.isEDisabled(1),
                    }"
                  >
                    <i class="d-icon-lines"></i>
                    Контент акции
                  </button>
                  <button
                    @click.prevent="openStep(2)"
                    class="d-button d-button-tertiary box-shadow-none promo-master__setting"
                    :class="{
                      'promo-master__setting--used': this.isUsed(2),
                      'promo-master__setting--disabled': this.isEDisabled(2),
                    }"
                  >
                    <i class="d-icon-calendar"></i>
                    Даты проведения акции
                  </button>
                  <button
                    @click.prevent="openStep(3)"
                    class="d-button d-button-tertiary box-shadow-none promo-master__setting"
                    :class="{
                      'promo-master__setting--used': this.isUsed(3),
                      'promo-master__setting--disabled': this.isEDisabled(3),
                    }"
                  >
                    <i class="d-icon-picture"></i>
                    Баннер акции
                  </button>
                  <button
                    @click.prevent="openStep(4)"
                    class="d-button d-button-tertiary box-shadow-none promo-master__setting"
                    :class="{
                      'promo-master__setting--used': this.isUsed(4),
                      'promo-master__setting--disabled': this.isEDisabled(4),
                    }"
                  >
                    <i class="d-icon-wallet"></i>
                    Условия оплаты
                  </button>
                  <button
                    @click.prevent="openStep(5)"
                    class="d-button d-button-tertiary box-shadow-none promo-master__setting"
                    :class="{
                      'promo-master__setting--used': this.isUsed(5),
                      'promo-master__setting--disabled': this.isEDisabled(5),
                    }"
                  >
                    <i class="d-icon-truck"></i>
                    Условия доставки
                  </button>
                  <button
                    v-if="type == 1"
                    @click.prevent="openStep(6)"
                    class="d-button d-button-tertiary box-shadow-none promo-master__setting"
                    :class="{
                      'promo-master__setting--used': this.isUsed(6),
                      'promo-master__setting--disabled': this.isEDisabled(6),
                    }"
                  >
                    <i class="d-icon-percent"></i>
                    Условия участия в акции: Требования к заказу
                  </button>
                  <button
                    v-if="type == 1"
                    @click.prevent="openStep(7)"
                    class="d-button d-button-tertiary box-shadow-none promo-master__setting"
                    :class="{
                      'promo-master__setting--used': this.isUsed(7),
                      'promo-master__setting--disabled': this.isEDisabled(7),
                    }"
                  >
                    <i class="d-icon-percent"></i>
                    Условия участия в акции: Совместимость
                  </button>
                  <button
                    @click.prevent="openStep(8)"
                    class="d-button d-button-tertiary box-shadow-none promo-master__setting"
                    :class="{
                      'promo-master__setting--used': this.isUsed(8),
                      'promo-master__setting--disabled': this.isEDisabled(8),
                    }"
                  >
                    <i class="d-icon-user-star"></i>
                    Аудитория акции
                  </button>
                  <button
                    @click.prevent="openStep(9)"
                    class="d-button d-button-tertiary box-shadow-none promo-master__setting"
                    :class="{
                      'promo-master__setting--used': this.isUsed(9),
                      'promo-master__setting--disabled': this.isEDisabled(9),
                    }"
                  >
                    <i class="d-icon-cube"></i>
                    Товары и скидки: Склады
                  </button>
                  <button
                    @click.prevent="openStep(10)"
                    class="d-button d-button-tertiary box-shadow-none promo-master__setting"
                    :class="{
                      'promo-master__setting--used': this.isUsed(10),
                      'promo-master__setting--disabled': this.isEDisabled(10),
                    }"
                  >
                    <i class="d-icon-cube"></i>
                    Товары и скидки: Товары
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="promo-master__footer">
          <div class="promo-master__footer-actions">
            <button
              class="d-button d-button-secondary d-button-secondary-small box-shadow-none promo-master__action-button promo-master__action-button--back"
              v-if="masterStep > 1"
              @click.prevent="masterStepDec()"
            >
              <i class="d-icon-arrow-left promo-master__action-button-icon"></i>
              <span class="promo-master__action-button-text">Назад</span>
            </button>
            <span v-else></span>
            <button
              class="d-button d-button-secondary d-button-secondary-small box-shadow-none promo-master__action-button promo-master__action-button--next"
              v-if="masterStep < 9"
              @click.prevent="masterStepInc()"
            >
              <span class="promo-master__action-button-text">Далее</span>
              <i class="d-icon-arrow-right promo-master__action-button-icon"></i>
            </button>
            <button
              class="d-button d-button-primary d-button-primary-small box-shadow-none"
              v-if="masterStep > 8"
              @click.prevent="
                () => {
                  this.modals.master = false
                  this.masterStep = 8
                }
              "
            >
              <span class="promo-master__action-button-text">Ок</span>
            </button>
          </div>
          <!--
          <div class="promo-master__footer-content promo-master__footer-content--between">
            <div class="promo-master__info-block-wrapper visible-1200">
              <div class="promo-master__info-block">
                <i class="d-icon-message-status promo-master__info-block-icon"></i>
                <p class="promo-master__info-block-text">Отразите в названии суть акции.</p>
              </div>
            </div>
            <div class="promo-master__setting-container visible-1200 hidden-800">
              <button
                class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--used"
              >
                <i class="d-icon-lines"></i>
                Контент акции
              </button>
              <button
                class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--used"
              >
                <i class="d-icon-calendar"></i>
                Даты проведения акции
              </button>
              <button
                class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--used"
              >
                <i class="d-icon-picture"></i>
                Баннер акции
              </button>
              <button class="d-button d-button-tertiary box-shadow-none promo-master__setting">
                <i class="d-icon-wallet"></i>
                Условия оплаты
              </button>
              <button
                class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled"
                disabled=""
              >
                <i class="d-icon-truck"></i>
                Условия доставки
              </button>
              <button
                class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled"
                disabled=""
              >
                <i class="d-icon-percent"></i>
                Условия участия в акции: Требования к заказу
              </button>
              <button
                class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled"
                disabled=""
              >
                <i class="d-icon-percent"></i>
                Условия участия в акции: Совместимость
              </button>
              <button
                class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled"
                disabled=""
              >
                <i class="d-icon-user-star"></i>
                Аудитория акции
              </button>
              <button
                class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled"
                disabled=""
              >
                <i class="d-icon-cube"></i>
                Товары и скидки: Склады
              </button>
              <button
                class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled"
                disabled=""
              >
                <i class="d-icon-cube"></i>
                Товары и скидки: Товары
              </button>
            </div>
          </div>
          -->
        </div>
      </customModal>
      <customModal v-model="this.modals.delay" class="delay-window" @beforeClose="delayModalClose">
        <template v-slot:title>Настройка отсрочки платежа</template>
        <div>
          <div class="deferred-payment" v-for="(item, index) in this.form.delay" :key="index">
            <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
              <label for="test-dropdown" class="d-dropdown__label">Процент от суммы заказа </label>
              <div class="d-input d-input--light">
                <InputNumber
                  v-model="this.form.delay[index].percent"
                  inputId="horizontal-buttons"
                  :step="0.1"
                  min="0"
                  max="100"
                  suffix=" %"
                  @update:modelValue="delayUpdate"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                />
              </div>
            </div>
            <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
              <label for="test-dropdown" class="d-dropdown__label"
                >Срок отсрочки платежа в календ. днях
              </label>
              <div class="d-input d-input--light">
                <InputNumber
                  v-model="this.form.delay[index].day"
                  inputId="horizontal-buttons"
                  :step="0.1"
                  min="0"
                  @update:modelValue="delayUpdate"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                />
              </div>
            </div>
          </div>
          <div class="d-modal2__actions d-modal2__actions-start">
            <a
              href="#"
              class="d-button d-button-tertiary d-button-rounded d-button--sm-shadow"
              @click.prevent="addDelayItem()"
            >
              <div class="d-icon-plus"></div>
            </a>
            <a
              href="#"
              class="d-button d-button-tertiary d-button-rounded d-button--sm-shadow"
              @click="removeDelayItem()"
              v-if="this.form.delay.length > 1"
            >
              <div class="d-icon-minus"></div>
            </a>
          </div>
          <div class="d-modal2__actions">
            <button
              class="d-button d-button-primary d-button-primary-small box-shadow-none d-modal2__action-button"
              :class="{
                'kenots-button-stop':
                  delayData.delayPercentSum > 100 || delayData.delayPercentSum < 100,
              }"
              @click="delaySubmit"
            >
              Ок
            </button>
          </div>
        </div>
      </customModal>
      <customModal v-model="this.modals.productsFile" class="productsFileWindow">
        <template v-slot:title>Загрузите товары файлом</template>
        <div>
          <a
            :href="site_url_prefix + '/assets/files/files/examples/ExampleLoadingProducts.xlsx'"
            class="d-button d-button-tertiary d-button-tertiary-small d-button--no-shadow"
            target="_blank"
          >
            <i class="d-icon-download"></i> Скачать шаблон файла</a
          >
          <DropZone
            v-if="!this.upload_product"
            class="dropzone dart-mt-1"
            :maxFiles="Number(1)"
            url="/rest/file_upload.php?upload_products=xlsx"
            :uploadOnDrop="true"
            :multipleUpload="true"
            :acceptedFiles="['xlsx', 'xlsx']"
            :parallelUpload="1"
            @sending="parseFile"
            @removedFile="deselectProductAll"
            v-bind="args"
          >
            <template v-slot:message>
              <div class="d-upload promo-master__upload">
                <img
                  src="/icons/upload-cloud.svg"
                  alt="Upload icon"
                  class="d-upload__icon"
                  width="80"
                  height="50"
                />
                <p class="d-upload__title">Перетащите файл в эту область</p>
                <p class="d-upload__description">
                  Вы также можете загрузить файлы xlsx,
                  <span class="d-link d-upload__link">нажав сюда</span>
                </p>
              </div>
            </template>
          </DropZone>
          <div class="dart-upload-xlsx" v-if="this.upload_product">
            <div class="dart-upload-xlsx__file">
              <!-- <img src="../../../public/img/files/xls.png" alt=""> -->
              <a targer="_blank" :href="files?.xlsx?.original_href">{{ files?.xlsx?.name }}</a>
            </div>
            <div class="dart-upload-xlsx__info">
              <p>Загружено товаров: {{ Object.keys(this.upload_selected).length }} шт</p>
              <p>
                Всего товаров:
                {{ Object.keys(this.upload_selected).length + upload_error.length }} шт
              </p>
              <div
                class="dart-link-blue"
                v-if="upload_error.length"
                @click="this.modals.error_product = true"
              >
                Список незагруженных товаров
              </div>
            </div>
          </div>
          <div class="d-modal2__actions">
            <button
              class="d-button d-button-primary d-button-primary-small box-shadow-none d-modal2__action-button"
              @click="this.modals.productsFile = false"
            >
              Ок
            </button>
          </div>
        </div>
      </customModal>
      <customModal
        v-model="this.modals.price"
        class="productsSettingsWindow"
        @close="resetDiscountFormula"
      >
        <template v-slot:title>{{
          this.productsSelected.length > 1 ? 'Массовые действия' : 'Настройка цены'
        }}</template>
        <div class="dart-modal-price">
          <div
            class="dart-alert dart-alert-info"
            v-if="this.modals.typePrice != 3 && this.modals.priceStep == 1"
          >
            Если у товара не будет задан выбранный тип цен, скидка будет рассчитана от розничной
            цены.
          </div>
          <div
            class="product-dart-card"
            v-if="this.productsSelected.length == 1 && this.modals.priceType != 'group'"
          >
            <img :src="this.productsSelected[0].image" />
            <div class="product-dart-card__text">
              <p>{{ this.productsSelected[0].name }}</p>
              <span>{{ this.productsSelected[0].article }}</span>
            </div>
          </div>
          <div class="dart-method-edit-flex dart-mt-1" v-if="this.modals.priceStep == 0">
            <div class="d-flex align-items-center gap-1 mt-3">
              <RadioButton
                v-model="this.modals.typePrice"
                inputId="type_price-1"
                name="type_pricing"
                value="1"
              />
              <label for="type_price-1" class="ml-2 radioLabel">Задать вручную</label>
            </div>
            <div class="d-flex align-items-center gap-1 mt-3">
              <RadioButton
                v-model="this.modals.typePrice"
                inputId="type_price-2"
                name="type_pricing"
                value="2"
              />
              <label for="type_price-2" class="ml-2 radioLabel">Тип цен</label>
            </div>
            <div class="flex align-items-center gap-1 mt-3" v-if="this.productsSelected.length > 1">
              <RadioButton
                v-model="this.modals.typePrice"
                inputId="type_price-3"
                name="type_pricing"
                value="3"
              />
              <label for="type_price-3" class="ml-2 radioLabel">Кратность</label>
            </div>
          </div>
          <div
            v-if="this.modals.priceStep == 1 && this.modals.typePrice == 1"
            class="dart-row dart-mt-1"
          >
            <div class="dart-widget d-col-6">
              <p>Тип ценообразования</p>
              <InputSelect
                @change="resetDiscount()"
                v-model="this.productsSelectedData.type_pricing"
                :options="this.type_pricing"
                optionDisabled="disabledkey"
                optionLabel="name"
                class="w-full md:w-14rem"
              />
            </div>
            <div
              class="dart-widget d-col-6"
              v-if="this.productsSelectedData.type_pricing?.key != 3"
            >
              <p>От типа цены</p>
              <InputSelect
                @change="updateFormula()"
                v-model="this.productsSelectedData.type_price"
                :options="this.productsPrices"
                optionLabel="name"
                class="w-full md:w-14rem"
              />
            </div>
            <div class="d-col-12">
              <div class="dart-row">
                <div class="dart-widget d-col-12">
                  <p>Значение</p>
                  <InputNumber
                    v-model="this.productsSelectedData.sale_value"
                    inputId="horizontal-buttons"
                    :step="0.1"
                    :min="Number(0)"
                    @update:modelValue="updateFormula()"
                    incrementButtonIcon="pi pi-plus"
                    decrementButtonIcon="pi pi-minus"
                  />
                </div>
                <div class="dart-widget d-col-12">
                  <p>&nbsp;</p>
                  <InputSelect
                    @change="updateFormula()"
                    :disabled="this.productsSelectedData.type_pricing?.key == 3"
                    v-model="this.productsSelectedData.type_formula"
                    :options="this.type_formula"
                    optionLabel="name"
                    class="w-full md:w-14rem"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="this.modals.priceStep == 1 && this.modals.typePrice == 2"
            class="dart-row dart-mt-1"
          >
            <div class="dart-widget d-col-12">
              <p>Тип цены</p>
              <InputSelect
                @change="updateFormula()"
                v-model="this.productsSelectedData.type_price"
                :options="this.productsPrices"
                optionLabel="name"
                class="w-full md:w-14rem"
              />
            </div>
          </div>

          <div
            v-if="this.modals.priceStep == 1 && this.modals.typePrice == 3"
            class="dart-row dart-mt-1"
          >
            <div class="dart-widget d-col-12">
              <p>Кратность</p>
              <InputNumber
                v-model="this.productsSelectedData.multiplicity"
                inputId="horizontal-buttons"
                :step="1"
                :min="Number(1)"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
              />
            </div>
          </div>

          <div
            class="dart-info-line"
            v-if="
              this.modals.priceStep != 0 &&
              this.productsSelected.length == 1 &&
              this.modals.priceType != 'group'
            "
          >
            <p>РРЦ: {{ this.productsSelected[0].price ?? '—' }} ₽</p>
            <p>
              Скидка от РРЦ:
              {{ this.productsSelected[0]?.save_data.sale }} %
            </p>
            <p>
              Цена со скидой:
              {{
                this.productsSelected[0]?.save_data.new_price
                  ? this.productsSelected[0]?.save_data.new_price
                  : this.productsSelected[0]?.price
              }}
              ₽
            </p>
          </div>

          <div
            v-if="
              this.productsSelectedData.type_pricing?.key == 3 &&
              this.modals.priceStep != 0 &&
              this.productsSelected.length == 1
            "
          >
            <div class="dart-alert dart-alert-info dart-mt-1">
              Цена будет всегда оставаться неизменной, даже при изменении типов цен, РРЦ и любых
              других параметров товара.
            </div>
          </div>

          <div class="dart-modal-price__button dart-modal-price__flex dart-mt-1">
            <span v-if="this.modals.priceStep == 0"></span>
            <div
              v-if="this.modals.priceStep != 0"
              class="d-button d-button-secondary d-button--no-shadow"
              @click="this.modals.priceStep = 0"
            >
              Назад
            </div>
            <div class="d-button d-button-primary d-button--no-shadow" @click="closeDialogPrice">
              {{ this.modals.priceStep == 0 ? 'Далее' : 'Готово' }}
            </div>
          </div>
        </div>
      </customModal>
      <customModal v-model="this.modals.regions" class="select-window">
        <template v-slot:title>Выбрать регионы</template>
        <div class="regions-container">
          <div class="regions">
            <form class="d-search d-search--alt">
              <div>
                <i
                  class="d-icon-search-big d-search__icon promotions__card-warehouse-search-icon"
                ></i>
                <input
                  type="text"
                  placeholder="Найти регион"
                  class="d-search__field"
                  v-model="search.region"
                  @focus="search.regionSuggestionsShow = true"
                  @blur="unActivateRegion()"
                  @keypress.enter.prevent=""
                />
              </div>

              <ul class="d-search__suggestions" v-if="this.search.regionSuggestionsShow">
                <li
                  class="d-search__suggestion"
                  v-for="suggestion in regions_all"
                  :key="suggestion.code"
                >
                  <a
                    href="#"
                    class="d-search__suggestion-card"
                    @click.prevent="
                      () => {
                        this.regionSelect(suggestion)
                      }
                    "
                  >
                    <img
                      :src="suggestion.image"
                      alt=""
                      class="d-search__suggestion-card__img"
                      v-if="suggestion.image"
                    />
                    <div class="d-search__suggestion-card__content">
                      <span class="d-search__suggestion-card__title">{{ suggestion.name }}</span>
                    </div>
                  </a>
                </li>
              </ul>
            </form>
            <div class="chips">
              <!--<div class="chip" v-for="(item, index) in this.form.regions" :key="item.code">-->
              <div class="chip" v-for="(item, index) in this.form.regionsTemp" :key="item.code">
                <i class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"></i>
                <span>{{ item.name }}</span>
                <a href="#" class="chip-close" @click.prevent="regionTempDel(index)"></a>
              </div>
            </div>
          </div>
          <div class="regions-submit">
            <button
              class="d-button d-button-primary d-button-primary-small d-button--sm-shadow d-ib"
              type="button"
              @click.prevent="setRegions()"
            >
              Добавить
            </button>
          </div>
        </div>
      </customModal>
      <customModal v-model="this.modals.organization" class="select-window">
        <template v-slot:title>Выбрать организации</template>
        <div>
          <div class="regions">
            <form class="d-search d-search--alt">
              <i class="d-icon-search-big d-search__icon"></i>
              <input
                type="text"
                placeholder="Найти организацию"
                class="d-search__field"
                v-model="search.organization"
                @focus="search.organizationSuggestionsShow = true"
                @blur="unActivateOrganization()"
              />
              <ul class="d-search__suggestions" v-if="this.search.organizationSuggestionsShow">
                <li
                  class="d-search__suggestion"
                  v-for="suggestion in organizations"
                  :key="suggestion.code"
                >
                  <a
                    href="#"
                    class="d-search__suggestion-card"
                    @click.prevent="orgSelect(suggestion)"
                  >
                    <img
                      :src="suggestion.image"
                      alt=""
                      class="d-search__suggestion-card__img"
                      v-if="suggestion.image"
                    />
                    <div class="d-search__suggestion-card__content">
                      <span class="d-search__suggestion-card__title">{{ suggestion.name }}</span>
                    </div>
                  </a>
                </li>
              </ul>
            </form>
            <div class="chips">
              <div
                class="chip"
                v-for="(item, index) in this.form.all_organizations_selected"
                :key="item.code"
              >
                <img v-if="item.image" :src="item.image" :alt="item.name" class="chip-img" />
                <span v-else class="chip-img"></span>
                <span>{{ item.name }}</span>
                <a href="#" class="chip-close" @click.prevent="orgDel(index)"></a>
              </div>
            </div>
          </div>
        </div>
      </customModal>
    </teleport>
  </section>
</template>
<script>
import breadcrumbs from '../breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import DropZone from 'dropzone-vue'
import Editor from '@tinymce/tinymce-vue'
import Toast from 'primevue/toast'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import MultiSelect from 'primevue/multiselect'
import RadioButton from 'primevue/radiobutton'
import InputSelect from 'primevue/select'
import { useVuelidate } from '@vuelidate/core'
import { mapActions, mapGetters } from 'vuex'
import { helpers, required } from '@vuelidate/validators'
import ActionProducts from './actionProducts.vue'
import ActionCollections from './actionCollections.vue'

export default {
  name: 'actionForm',
  components: {
    breadcrumbs,
    Toast,
    Editor,
    InputNumber,
    DropZone,
    DatePicker,
    Loader,
    MultiSelect,
    InputSelect,
    RadioButton,
    customModal,
    ActionProducts,
    ActionCollections,
  },
  props: {
    type: {
      type: String,
      default: '2', // 1 - розница, 2 - опт
    },
  },
  data() {
    return {
      loading: false,
      productLoading: false,
      complectLoading: false,
      productUploadLoading: false,
      productsAvailablePage: 1,
      productsSelectedPage: 1,
      complectAvailablePage: 1,
      complectSelectedPage: 1,
      selected_group: {},
      windowWidth: 1920,
      total_products: 0,
      per_page: 24,
      per_page_small: 5,
      masterStep: 0,
      visibleMasterSteps: [],
      stopDate: undefined,
      // Флаги окон
      modals: {
        master: false,
        modal_checking: false,
        add_group: false,
        error_product: false,
        view_actions: false,
        delay: false,
        price: false,
        priceStep: 0,
        priceType: '',
        productsFile: false,
        region: false,
        organization: false,
      },
      // Поиск
      search: {
        region: '',
        regionSuggestionsShow: false,
        organization: '',
        organizationSuggestionsShow: false,
      },
      // Доступные товары
      products: [],
      productsSelected: [],
      productsSelectedData: {},
      // Склады Организации
      stores: [],
      // Регионы
      regions_all: [],
      // Организации
      all_organizations: [],
      // Места показа
      geo: [
        { name: 'Показывать всем', key: 0 },
        { name: 'По географии акции', key: 1 },
      ],
      // Рекламные места
      places: [],
      // Режим Совместимости Скидок
      compabilityMode: [
        { name: 'Применяется бóльшая', key: 0 },
        { name: 'Скидки складываются', key: 1 },
        { name: 'Скидки назначаются последовательно', key: 2 },
      ],
      // Плательщик Доставки
      paymentDelivery: [
        { name: 'Покупатель', key: 0 },
        { name: 'Поставщик', key: 1 },
      ],
      // Условия Акции
      condition: [
        { name: 'Без условий', key: 0 },
        { name: 'Задать условия', key: 1 },
      ],
      // Фильтр Организаций
      filter_organizations: {
        name: '',
        type: [1, 2],
      },
      // Данные отсрочки
      delayData: {
        delayPercentSum: 100,
        postponementPeriod: 0,
      },
      type_formula: [
        { name: '₽', key: 0 },
        { name: '%', key: 1 },
      ],
      type_pricing: [
        { name: 'Наценка', key: 1, disabledkey: false },
        { name: 'Скидка', key: 2, disabledkey: false },
        { name: 'Фиксированая цена', key: 3, disabledkey: false },
      ],
      type_pricing_group: [
        { name: 'Наценка', key: 1 },
        { name: 'Скидка', key: 2 },
      ],
      prices: {},
      // Акции для выбора совместимости
      allAction: {},
      // Файлы
      upload_product: false,
      upload_selected: [],
      upload_error: [],
      files: {
        max: {
          original_href: '',
        },
        small: {
          original_href: '',
        },
        min: {
          original_href: '',
        },
        icon: {
          original_href: '',
        },
        file: {
          original_href: '',
        },
      },
      form: {
        name: '',
        description: '',
        client_id: 0,
        compatibilityDiscount: 1,
        actions: [],
        product_groups: {},
        compabilityMode: 0,
        paymentDelivery: 0,
        paymentTime: 0,
        typePay: '1',
        typePayPercent: 15,
        typeDelivery: '1',
        typeDeliveryPercent: 15,
        typeDelay: '1',
        delay: [
          {
            percent: 100,
            day: 0,
          },
        ],
        postponementPeriod: 0,
        condition: { name: 'Скидка без условий', key: 0 },
        conditionMinSum: 0,
        conditionMinCount: 0,
        conditionMinGeneralCount: 0,
        hide_for_clients: 0,
        negative: 0,
        offer: 0,
        integration: 0,
        delayfix: 1,
        participantsType: 3,
        all_organizations_selected: [],
        regions: [],
        regionsTemp: [],
        stores: true,
        warehouses: true,
        vendors: true,
        store_id: [],
        dates: [],
        start_date: '',
        end_date: '',
        adv: {
          active: false,
          place: {},
          place_position: '',
          geo: '',
          files: {
            max: {
              original_href: '',
            },
            small: {
              original_href: '',
            },
            min: {
              original_href: '',
            },
            icon: {
              original_href: '',
            },
            file: {
              original_href: '',
            },
          },
        },
      },
    }
  },
  mounted() {
    this.unsetAction().then(() => {
      this.masterStepInc()
      this.getCatalogs()
      // Берем географию
      this.getRegions({ exclude: [], filter: '' }).then(() => {
        this.regions_all = this.regions.map(function (el) {
          return { name: el.label, code: el.key }
        })
      })
      this.getOrganizations({ exclude: [], filter: '' }).then(() => {
        this.organizations_all = this.organizations.map(function (el) {
          return { name: el.name, code: el.id }
        })
      })
      this.getOrgStores()
      this.getAllActions()
      this.getActionAdvPages({ type: this.type })
      if (this.$route.params.action) {
        this.getAction().then(() => {
          this.loading = false
          if (this.form.store_id) {
            this.getAvailableProducts({
              store_id: this.form.store_id,
              filter: '',
              page: 1,
              perpage: this.per_page_small,
              type: 1,
            }).then(() => {
              this.getAvailableProducts({
                store_id: this.form.store_id,
                filter: '',
                page: 1,
                perpage: this.per_page,
                type: 2,
              }).then(() => {
                this.productLoading = false
              })
            })
            this.getProductGroups({
              store_id: this.form.store_id,
              filter: '',
            })
            this.getActiveActions()
          }
        })
      } else {
        this.modals.master = true
      }
    })
  },
  methods: {
    ...mapActions({
      getCatalogs: 'addition/getCatalogs',
      getRegions: 'addition/getRegions',
      getOrganizations: 'addition/getOrganizations',
      getOrgStores: 'org/getOrgStores',
      getAction: 'action/getAction',
      setAction: 'action/setAction',
      unsetAction: 'action/unsetAction',
      getActionAdvPlaces: 'action/getActionAdvPlaces',
      getActionAdvPages: 'action/getActionAdvPages',
      getAllActions: 'action/getAllActions',
      getAvailableProducts: 'action/getAvailableProducts',
      getAvailableComplects: 'action/getAvailableComplects',
      getProductGroups: 'action/getProductGroups',
      getActiveActions: 'action/getActiveActions',
      getProductsPrices: 'action/getProductsPrices',
      getGroupProducts: 'action/getGroupProducts',
      setSelectedProduct: 'action/setSelectedProduct',
      setDeselectedProduct: 'action/setDeselectedProduct',
      uploadProductsFile: 'action/uploadProductsFile',
      setSelectedProductData: 'action/setSelectedProductData',
    }),
    addDelayItem() {
      this.form.delay.push({ percent: 0, day: 0 })
      this.delayUpdate()
    },
    removeDelayItem() {
      this.form.delay.pop()
      this.delayUpdate()
    },
    uploadedFile(file) {
      console.log(file)
    },
    updateProductList() {
      this.productLoading = true
      this.getAvailableProducts({
        store_id: this.form.store_id,
        filter: '',
        page: 1,
        perpage: this.per_page_small,
        type: 1,
      }).then(() => {
        this.getAvailableProducts({
          store_id: this.form.store_id,
          filter: '',
          page: 1,
          perpage: this.per_page,
          type: 2,
        }).then(() => {
          this.productLoading = false
        })
      })
    },
    parseFile(files, xhr) {
      this.productUploadLoading = true
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.response) {
            const response = JSON.parse(xhr.response)
            this.uploadProductsFile({
              file: response.data.files[0].original,
              store_id: this.form.store_id,
            }).then((res) => {
              this.productUploadLoading = false
              this.upload_product = true
              this.upload_selected = []
              this.upload_error = []
              const productsList = res.data.data
              for (let i = 1; i < Object.keys(productsList).length; i++) {
                const tempProduct = productsList[Object.keys(productsList)[i]]
                if (!tempProduct.error) {
                  this.upload_selected.push(tempProduct.A)
                } else {
                  this.upload_error.push(tempProduct.A)
                }
              }
              this.updateProductList()
            })
            this.$toast.add({
              severity: 'info',
              summary: 'Файл загружен',
              detail: 'Файл был успешно загружен',
              life: 3000,
            })
          }
        }
      }
    },
    parseFileBanner(files, xhr) {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.response) {
            console.log(xhr.response)
            const response = JSON.parse(xhr.response)
            console.log(response)
            if (Object.prototype.hasOwnProperty.call(response.data, 'files')) {
              // перечень загруженных файлов
              if (response.data.files[0].type_banner === 'max') {
                this.form.adv.files.max = response.data.files[0]
              }
              if (response.data.files[0].type_banner === 'min') {
                this.form.adv.files.min = response.data.files[0]
              }
              if (response.data.files[0].type_banner === 'icon') {
                this.form.adv.files.icon = response.data.files[0]
              }
              if (response.data.files[0].type_banner === 'small') {
                this.form.adv.files.small = response.data.files[0]
              }
              if (response.data.files[0].type_banner === 'file') {
                this.form.adv.files.file = response.data.files[0]
              }
            }
          }
          this.$toast.add({
            severity: 'info',
            summary: 'Файлы загружены',
            detail: 'Файл был успешно загружен',
            life: 3000,
          })
        }
      }
    },
    deselectFileBannerAll() {
      console.log('deselect')
    },
    delayUpdate() {
      this.delayData.delayPercentSum = 0
      this.delayData.postponementPeriod = 0
      for (let i = 0; i < this.form.delay.length; i++) {
        if (this.form.delay[i].percent > 0) {
          this.delayData.delayPercentSum += Number(this.form.delay[i].percent)
        } else {
          this.delayData.delayPercentSum += 100
        }
        this.delayData.postponementPeriod =
          this.delayData.postponementPeriod +
          this.form.delay[i].day * (this.form.delay[i].percent / 100)
        this.form.postponementPeriod = this.delayData.postponementPeriod
      }
    },
    delayModalClose(e) {
      if (this.delayData.delayPercentSum != 100) {
        e.stop()
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Сумма процентов должна составлять 100%',
          life: 3000,
        })
      }
    },
    delaySubmit() {
      if (this.delayData.delayPercentSum == 100) {
        this.modals.delay = false
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Сумма процентов должна составлять 100%',
          life: 3000,
        })
      }
    },
    updateStoreData() {
      if (this.form.store_id) {
        this.product_loading = true
        this.complect_loading = true
        this.product_available_page = 1
        this.product_selected_page = 1
        this.complect_available_page = 1
        this.complect_selected_page = 1
        this.getProductsPrices({
          store_id: this.form.store_id,
        })
        this.updateProductList()
        this.getProductGroups({
          store_id: this.form.store_id,
          filter: '',
        })
        this.getActiveActions()
      }
    },
    updateGroups(id) {
      console.log('updateGroups', this.form.product_groups[id])
      this.getGroupProducts({
        group_id: id,
        filter: this.form.product_groups[id].filter,
        page: this.form.product_groups[id].page,
        perpage: this.per_page,
      }).then((res) => {
        this.form.product_groups[id].products = res.data
      })
    },
    paginateGroupProduct(data) {
      console.log(data)
      if (data.group_id) {
        this.form.product_groups[data.group_id].page = data.page
        this.updateGroups(data.group_id)
      }
    },
    filterGroupProductSelected(data) {
      if (data.group_id) {
        this.form.product_groups[data.group_id].filter = data.filter
        this.form.product_groups[data.group_id].page = data.page
        this.updateGroups(data.group_id)
      }
    },
    filterGroup(data) {
      console.log(data)
      this.getProductGroups({
        store_id: this.form.store_id,
        filter: data.filter,
      })
    },
    deleteCollection(id) {
      this.form.product_groups = Object.fromEntries(
        Object.entries(this.form.product_groups).filter(([key]) => key !== id.toString()),
      )
    },
    isUsed(number) {
      const data = this.visibleMasterSteps.find((element) => element === number)
      if (typeof data != 'undefined' && number != this.masterStep) {
        return true
      } else {
        return false
      }
    },
    isEDisabled(number) {
      const data = this.visibleMasterSteps.find((element) => element === number)
      if (typeof data == 'undefined' && number != this.masterStep) {
        return true
      } else {
        return false
      }
    },
    masterStepInc() {
      const data = this.visibleMasterSteps.find((element) => element === this.masterStep)
      if (typeof data == 'undefined') {
        this.visibleMasterSteps.push(this.masterStep)
      }
      if (this.masterStep <= 10) {
        this.masterStep++
        if (this.masterStep > 8 && this.masterStep < 11) {
          this.slideToProducts()
        }
        if (this.type == 2) {
          if (this.masterStep == 6 || this.masterStep == 7) {
            this.masterStep = 8
          }
        }
      }
    },
    masterStepDec() {
      const data = this.visibleMasterSteps.find((element) => element === this.masterStep)
      if (typeof data == 'undefined') {
        this.visibleMasterSteps.push(this.masterStep)
      }
      if (this.masterStep > 1) {
        this.masterStep--
        if (this.type == 2) {
          if (this.masterStep == 6 || this.masterStep == 7) {
            this.masterStep = 5
          }
        }
      }
    },
    slideToProducts() {
      this.modals.master = false
      setTimeout(() => {
        this.visibleMasterSteps.push(9)
        this.visibleMasterSteps.push(10)
        this.masterStep = 8
        const refVar = 'warehouseProducts'
        this.$refs[refVar].scrollIntoView({ behavior: 'smooth' })
      }, 1000)
    },
    openStep(step) {
      this.masterStep = step
      const data = this.visibleMasterSteps.find((element) => element === this.masterStep)
      if (typeof data == 'undefined') {
        this.visibleMasterSteps.push(this.masterStep)
      }
      this.modals.master = true
      if (this.type == 2) {
        if (this.masterStep == 6 || this.masterStep == 7) {
          this.masterStep = 8
        }
      }
      if (this.masterStep > 8 && this.masterStep < 11) {
        this.slideToProducts()
      }
    },
    deSelectProduct(id) {
      this.setDeselectedProduct(id).then(() => {
        this.updateProductList()
      })
    },
    selectProduct(data) {
      this.productLoading = true
      this.setSelectedProduct(data.id).then(() => {
        this.updateProductList()
      })
    },
    selectCollection(data) {
      if (data.id) {
        console.log(data.id)
        this.form.product_groups[data.id] = {
          group: data,
          page: 1,
          search: '',
          typePricing: null,
          prices: null,
          price: 'key',
          saleValue: 0,
          typeFormul: null,
        }
        this.updateGroups(data.id)
        this.selected_group = {}
      }
    },
    paginateProductsSelected(data) {
      this.productLoading = true
      this.productsSelectedPage = data.page
      this.getAvailableProducts({
        store_id: this.form.store_id,
        filter: '',
        page: data.page,
        perpage: this.per_page,
        type: 2,
      }).then(() => {
        this.productLoading = false
      })
    },
    openFileDialog() {
      this.modals.productsFile = true
    },
    paginateProductsAvailable(data) {
      console.log(data)
    },
    filterProductsSelected(data) {
      console.log(data)
    },
    filterProductsAvailable(data) {
      this.productLoading = true
      this.getAvailableProducts({
        store_id: this.form.store_id,
        filter: data,
        page: 1,
        perpage: this.per_page_small,
        type: 1,
      }).then(() => {
        this.getAvailableProducts({
          store_id: this.form.store_id,
          filter: '',
          page: 1,
          perpage: this.per_page,
          type: 2,
        }).then(() => {
          this.productLoading = false
        })
      })
    },
    settings(items, type) {
      // console.log(items)
      this.modals.priceType = type
      this.productsSelected = items
      this.modals.price_step = 0
      if (type == 'group') {
        Object.entries(this.type_pricing).forEach((entry) => {
          const [key, value] = entry
          if (value.key == 3) {
            this.type_pricing[key].disabledkey = true
          }
        })
      }
      this.modals.price = true
      if (items.length == 1 && type != 'group') {
        // Если источник = Файл, устанавливаем фиксированную цену
        if (items[0].save_data.source == 2) {
          this.modals.priceType = '1'
          this.modals.priceStep = 1
          Object.entries(this.typePricing).forEach((value) => {
            if (value.key == 3) {
              this.productsSelectedData.type_pricing = value
            }
          })
          Object.entries(this.typeFormula).forEach((value) => {
            if (value.key == 0) {
              this.productsSelectedData.type_formula = value
            }
          })
          this.productsSelectedData.sale_value = Number(items[0].save_data.new_price)
        }
      }
    },
    resetDiscountFormula() {
      this.modals.typePrice == ''
      this.modals.priceStep = 0
      this.productsSelectedData = {}
      Object.entries(this.type_pricing).forEach((entry) => {
        const [key, value] = entry
        if (value.key == 3) {
          this.type_pricing[key].disabledkey = false
        }
      })
    },
    changeMinCount(data) {
      this.productsSelectedData.min_count = data.value
      this.productsSelected = []
      this.productsSelected.push(data.item)
      const sendData = {
        type: 'items',
        products: this.productsSelected,
        data: this.productsSelectedData,
      }
      this.setSelectedProductData(sendData).then(() => {
        this.resetDiscountFormula()
        this.updateStoreData()
      })
    },
    changeMultiplicity(data) {
      this.productsSelectedData.multiplicity = data.value
      this.productsSelected = []
      this.productsSelected.push(data.item)
      const sendData = {
        type: 'items',
        products: this.productsSelected,
        data: this.productsSelectedData,
      }
      this.setSelectedProductData(sendData).then(() => {
        this.resetDiscountFormula()
        this.updateStoreData()
      })
    },
    updateFormula() {
      if (this.productsSelected.length == 1 && this.modals.priceType != 'group') {
        var base_price = this.productsSelected[0].price
        var rrc_price = this.productsSelected[0].price
        // Если указан тип цены меняем базовую стоимость
        // console.log(this.productsSelectedData)
        // console.log(this.productsSelected[0].save_data.prices)
        // console.log(base_price)
        if (this.productsSelectedData.type_price?.guid) {
          Object.entries(this.productsSelected[0].save_data.prices).forEach((val) => {
            const [k, value] = val
            console.log(value + ' == ' + this.productsSelectedData.type_price?.guid)
            if (value.guid == this.productsSelectedData.type_price?.guid) {
              base_price = value.price
            }
          })
        }
        // console.log(base_price)
        if (this.modals.typePrice == 2) {
          this.productsSelected[0].save_data.new_price = base_price
          if (base_price < rrc_price) {
            this.productsSelected[0].save_data.sale =
              ((rrc_price - this.productsSelected[0].save_data.new_price) / rrc_price) * 100
          } else {
            this.productsSelected[0].save_data.sale = 0
          }
        }
        if (this.modals.typePrice == 1) {
          if (
            this.productsSelectedData.type_pricing &&
            this.productsSelectedData.sale_value &&
            this.productsSelectedData.type_formula
          ) {
            // Наценка
            if (this.productsSelectedData.type_pricing?.key == 1) {
              // Рубли
              if (this.productsSelectedData.type_formula?.key == 0) {
                this.productsSelected[0].save_data.new_price =
                  base_price + this.productsSelectedData.sale_value
                this.productsSelected[0].save_data.sale =
                  ((rrc_price - this.productsSelected[0].save_data.new_price) / rrc_price) * 100
              }
              // Проценты
              if (this.productsSelectedData.type_formula?.key == 1) {
                const koeff = (100 + Number(this.productsSelectedData.sale_value)) * 0.01
                this.productsSelected[0].save_data.new_price = Number(base_price * koeff).toFixed(2)
                this.productsSelected[0].save_data.sale =
                  ((rrc_price - this.productsSelected[0].save_data.new_price) / rrc_price) * 100
              }
            }
            // Скидка
            if (this.productsSelectedData.type_pricing?.key == 2) {
              // Рубли
              if (this.productsSelectedData.type_formula?.key == 0) {
                this.productsSelected[0].save_data.new_price =
                  base_price - this.productsSelectedData.sale_value
                this.productsSelected[0].save_data.sale =
                  ((rrc_price - this.productsSelected[0].save_data.new_price) / rrc_price) * 100
              }
              // Проценты
              if (this.productsSelectedData.type_formula?.key == 1) {
                const koeff = (100 - Number(this.productsSelectedData.sale_value)) * 0.01
                this.productsSelected[0].save_data.new_price = Number(base_price * koeff).toFixed(2)
                this.productsSelected[0].save_data.sale =
                  ((rrc_price - this.productsSelected[0].save_data.new_price) / rrc_price) * 100
              }
            }
            // Фиксированная
            if (this.productsSelectedData.type_pricing?.key == 3) {
              this.productsSelected[0].save_data.new_price = this.productsSelectedData.sale_value
              this.productsSelected[0].save_data.sale =
                ((rrc_price - this.productsSelected[0].save_data.new_price) / rrc_price) * 100
            }
          } else {
            this.productsSelected[0].save_data.new_price = base_price
            this.productsSelected[0].save_data.sale = 0
          }
        }
        this.productsSelected[0].save_data.sale = Number(
          this.productsSelected[0].save_data.sale,
        ).toFixed(2)
      }
    },
    closeDialogPriceBtn() {
      ;(this.modals.priceType = ''), (this.productsSelectedData = {})
    },
    closeDialogPrice() {
      if (this.modals.priceStep === 0) {
        this.modals.priceStep = 1
      } else {
        this.modals.priceStep = 0
        this.modals.price = false
        Object.entries(this.type_pricing).forEach((entry) => {
          const [key, value] = entry
          if (value.key == 3) {
            this.type_pricing[key].disabledkey = false
          }
        })
        const data = {
          type: this.modals.priceType,
          products: this.productsSelected,
          data: this.productsSelectedData,
        }
        this.setSelectedProductData(data).then(() => {
          this.resetDiscountFormula()
          this.updateStoreData()
          if (this.modals.priceType == 'group') {
            this.updateGroups(this.productsSelected[0])
          }
        })
      }
    },
    resetDiscount() {
      this.productsSelectedData.type_price = {}
      this.productsSelectedData.type_formula = {}
      this.productsSelectedData.sale_value = null
    },
    filterOrganizations(value) {
      console.log(value)
    },
    async formSubmit() {
      this.loading = true
      const validationResult = await this.v$.$validate()
      if (!validationResult) {
        this.loading = false
        this.$toast.add({
          severity: 'error',
          summary: 'Проверьте заполненные данные',
          detail: 'Проверьте корректно ли вы заполнили данные Акции',
          life: 3000,
        })
        return
      }
      const save_data = this.form
      save_data.type = this.type
      this.setAction(save_data).then(() => {
        this.loading = false
        if (this.type == 1) {
          this.$router.push({ name: 'wholesalePrices', params: { id: this.$route.params.id } })
        }
        if (this.type == 2) {
          this.$router.push({ name: 'retailActions', params: { id: this.$route.params.id } })
        }
      })
    },
    unActivateOrganization() {
      setTimeout(() => (this.search.organizationSuggestionsShow = false), 250)
    },
    unActivateRegion() {
      setTimeout(() => (this.search.regionSuggestionsShow = false), 250)
    },
    regionTempDel(index) {
      this.form.regionsTemp.splice(index, 1)
      this.getRegions({ exclude: this.form.regionsTemp, filter: '' }).then(() => {
        this.regions_all = this.regions.map(function (el) {
          return { name: el.label, code: el.key }
        })
      })
    },
    regionDel(index) {
      this.form.regions.splice(index, 1)
      this.form.regionsTemp = this.form.regions
      this.getRegions({ exclude: this.form.regionsTemp, filter: '' }).then(() => {
        this.regions_all = this.regions.map(function (el) {
          return { name: el.label, code: el.key }
        })
      })
    },
    orgDel(index) {
      this.form.all_organizations_selected.splice(index, 1)
    },
    regionSelect(item) {
      console.log(item)
      this.form.regionsTemp.push(item)
      // Берем географию
      this.getRegions({ exclude: this.form.regionsTemp, filter: '' }).then(() => {
        this.regions_all = this.regions.map(function (el) {
          return { name: el.label, code: el.key }
        })
      })
      this.search.region = ''
    },
    setRegions() {
      this.form.regions = []
      for (let index = 0; index < this.form.regionsTemp.length; index++) {
        this.form.regions.push(this.form.regionsTemp[index])
      }
      this.modals.regions = false
    },
    resolveRegTemp() {
      this.form.regionsTemp = []
      for (let index = 0; index < this.form.regions.length; index++) {
        this.form.regionsTemp.push(this.form.regions[index])
      }
      this.getRegions({ exclude: this.form.regionsTemp, filter: '' }).then(() => {
        this.regions_all = this.regions.map(function (el) {
          return { name: el.label, code: el.key }
        })
      })
    },
    orgSelect(item) {
      console.log(item)
      this.form.all_organizations_selected.push(item)
      this.getOrganizations({ exclude: this.form.all_organizations_selected, filter: '' }).then(
        () => {
          this.organizations_all = this.organizations.map(function (el) {
            return { name: el.name, code: el.id }
          })
        },
      )
    },
    debounce(func, delay) {
      clearTimeout(this.searchPTimer)
      this.searchPTimer = setTimeout(func, delay)
    },
  },
  computed: {
    ...mapGetters({
      catalogs: 'addition/catalogs',
      regions: 'addition/regions',
      organizations: 'addition/organizations',
      orgStores: 'org/orgStores',
      action: 'action/action',
      actionAdvPages: 'action/actionAdvPages',
      actionAdvPlaces: 'action/actionAdvPlaces',
      productsAvailable: 'action/productsAvailable',
      productsSelectedIn: 'action/productsSelected',
      complectsAvailable: 'action/complectsAvailable',
      complectsSelected: 'action/complectsSelected',
      productGroups: 'action/productGroups',
      productsPrices: 'action/productsPrices',
      activeActions: 'action/activeActions',
      groupProducts: 'action/groupProducts',
      allActions: 'action/allActions',
    }),
    datesPercent() {
      if (this.form.dates.length == 2) {
        const dateFrom = this.form.dates[0]
        const dateTo = this.form.dates[1]
        let diffTime = 0
        let diffTimeAll = dateTo.getTime() - dateFrom.getTime()
        const today = new Date()
        if (today > dateFrom) {
          if (today > dateTo) {
            return 100
          } else {
            diffTime = dateTo.getTime() - today.getTime()
          }
        } else {
          return 10
        }
        return 100 - Math.ceil((diffTime / diffTimeAll) * 100)
      } else {
        return 0
      }
    },
    datesDays() {
      if (this.form.dates.length == 2) {
        const dateFrom = this.form.dates[0]
        const dateTo = this.form.dates[1]
        let diffTime = dateTo.getTime() - dateFrom.getTime()
        return Math.ceil(diffTime / (1000 * 3600 * 24))
      } else {
        return 0
      }
    },
    datesDaysAvailable() {
      if (this.form.dates.length == 2) {
        const dateFrom = this.form.dates[0]
        const dateTo = this.form.dates[1]
        const today = new Date()
        if (today > dateFrom) {
          if (today > dateTo) {
            return 0
          } else {
            let diffTime = dateTo.getTime() - today.getTime()
            return Math.ceil(diffTime / (1000 * 3600 * 24))
          }
        } else {
          let diffTime = dateTo.getTime() - dateFrom.getTime()
          return Math.ceil(diffTime / (1000 * 3600 * 24))
        }
      } else {
        return 0
      }
    },
    dateTomorrow() {
      const dateSt = this.form.dates[0]
      const today = new Date()
      const tomorrow = new Date(today.getTime() + 1000 * 24 * 3600)
      if (!dateSt) {
        return tomorrow
      } else {
        const dayStop = new Date(dateSt.getTime() + 1000 * 24 * 3600)
        if (dayStop < tomorrow) {
          return tomorrow
        } else {
          return dayStop
        }
      }
    },
    dateStart() {
      const dateTo = this.form.dates[1]
      if (dateTo) {
        const stopDate = new Date(dateTo.getTime() - 1000 * 24 * 3600)
        return stopDate
      } else {
        return undefined
      }
    },
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      form: {
        name: {
          required: helpers.withMessage('Заполните наименование', required),
        },
        store_id: {
          required: helpers.withMessage('Выберите склад', () => this.form.store_id?.length > 0),
        },
        dates: {
          required: helpers.withMessage(
            'Заполните даты проведения',
            () => this.form.dates?.length > 0,
          ),
        },
      },
    }
  },
  watch: {
    'form.start_date': function (newVal) {
      console.log(newVal + ' ' + this.form.start_date + ' ' + this.form.end_date)
      console.log(this.form.dates)
      if (this.form.end_date) {
        if (newVal < this.form.end_date) {
          this.form.dates[0] = newVal
        } else {
          this.form.start_date = new Date()
          this.form.dates[0] = new Date()
        }
      } else {
        this.form.dates[0] = newVal
        this.dateTomorrow = new Date(newVal.getTime() + 1000 * 24 * 3600)
      }
    },
    'form.end_date': function (newVal) {
      this.form.dates[1] = newVal
      console.log(newVal + ' ' + this.form.start_date + ' ' + this.form.end_date)
      console.log(this.form.dates)
      if (newVal < this.form.start_date || !this.form.start_date) {
        this.form.start_date = new Date()
        this.form.dates[0] = new Date()
      }
    },
    'form.typeDelay': function (newVal) {
      if(newVal == 2){
        this.form.postponementPeriod = 0
        this.form.delay = []
      }else{
        this.form.postponementPeriod = 0
      }
    },
    // Склады Организации
    orgStores: function (newVal) {
      this.stores = []
      for (let i = 0; i < newVal.items.length; i++) {
        this.stores.push({ label: newVal.items[i].name, value: newVal.items[i].id })
      }
    },
    actionAdvPlaces: function (newVal) {
      this.places = newVal
    },
    'form.store_id': function (newVal) {
      this.updateProductList()
      this.getProductsPrices({ store_id: newVal })
      this.getProductGroups({
        store_id: newVal,
        filter: '',
      })
    },
    // Акция (редактирование)
    action: function (newVal) {
      if (this.$route.params.action) {
        console.log(newVal)
        this.form.action_id = newVal.id
        this.form.name = newVal.name
        this.form.active = newVal.active
        this.form.description = newVal.description
        this.form.store_id = newVal.store_ids
        this.form.client_id = String(newVal.client_id)
        if (newVal.image) {
          this.form.adv.files.max.original_href = newVal.image.image
        }
        if (newVal.page_create) {
          this.form.adv.active = true
        }
        this.getActionAdvPages({ type: this.type }).then(() => {
          this.form.adv.place = []
          if (newVal.page_places) {
            const places = newVal.page_places.split(',')
            Object.entries(places).forEach((value) => {
              const [kk, vv] = value
              this.actionAdvPages.forEach((pvalue) => {
                if (vv == pvalue.code) {
                  this.form.adv.place[vv] = true
                }
              })
            })
          }
        })
        const dateto = new Date(newVal.date_to)
        const datefrom = new Date(newVal.date_from)
        this.form.dates = [datefrom, dateto]
        this.form.start_date = datefrom
        this.form.end_date = dateto
        this.form.geo_action = this.geo[newVal.page_geo]
        this.form.position = newVal.page_place_position
        this.form.hide_for_clients = Boolean(newVal.hide_for_clients)
        this.form.negative = Boolean(newVal.negative)
        this.form.offer = Boolean(newVal.offer)
        this.form.integration = Boolean(newVal.integration)
        this.form.stores = Boolean(newVal.available_stores)
        this.form.warehouses = Boolean(newVal.available_opt)
        this.form.vendors = Boolean(newVal.available_vendors)
        this.form.typePay = String(newVal.pay_type)
        this.form.typePayPercent = newVal.pay_type_percent ? String(newVal.pay_type_percent) : 0
        this.form.typeDelivery = String(newVal.delivery_type)
        this.form.typeDeliveryPercent = Number(newVal.delivery_type_percent)
        this.form.typeDelay = String(newVal.delay_type)
        this.form.delay = newVal.delay_graph
        this.form.conditionMinSum = newVal.condition_min_sum
        this.form.regions = newVal.regions
        //if(this.form.regions.length && !this.form.regionsTemp.length){
        //  this.form.regionsTemp = this.form.regions
        //}
        this.form.actions = newVal.big_sale_actions
        this.form.all_organizations_selected = newVal.all_organizations_selected
        this.form.postponementPeriod = newVal.delay
        this.form.participantsType = String(newVal.participants_type)
        this.form.compatibilityDiscount = String(newVal.compatibility_discount)
        if (newVal.condition_min_sum || newVal.condition_SKU || newVal.condition_min_count) {
          Object.entries(this.condition).forEach((value) => {
            if (value.key == 1) {
              this.form.condition = value
            }
          })
        }
        this.form.paymentDelivery = newVal.payer
        this.form.compabilityMode = newVal.compatibility_discount_mode
        this.form.compatibilityDiscount = String(newVal.compatibility_discount)
        this.form.conditionMinSum = newVal.condition_min_sum
        this.form.conditionMinCount = newVal.condition_SKU
        this.form.conditionMinGeneralCount = newVal.condition_min_count
        this.form.product_groups = newVal.product_groups
        // Берем географию
        this.getRegions({ exclude: this.form.regionsTemp, filter: '' }).then(() => {
          this.regions_all = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
        this.getOrganizations({ exclude: this.form.all_organizations_selected, filter: '' }).then(
          () => {
            this.organizations_all = this.organizations.map(function (el) {
              return { name: el.name, code: el.id }
            })
          },
        )
        this.updateStoreData()
        if (newVal.pg) {
          this.updateGroups(newVal.pg)
        }
      }
    },
    allActions: function (newVal) {
      this.allAction = []
      this.allAction = newVal.items.map(function (el) {
        return { name: el.name, code: el.id }
      })
    },
    regions: function (newVal) {
      this.regions_all = newVal.map(function (el) {
        return { name: el.label, code: el.key }
      })
    },
    organizations: function (newVal) {
      this.all_organizations = newVal.map(function (el) {
        return { name: el.name, code: el.id, image: el.image }
      })
    },
    'search.region': function (newVal, oldVal) {
      if (newVal.length < 3 && oldVal.length < newVal.length) {
        return
      }
      if (newVal.length < 3) {
        newVal = ''
      }
      this.debounce(() => {
        this.getRegions({ exclude: this.form.regionsTemp, filter: newVal }).then(() => {
          this.regions_all = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }, 300)
    },
    'search.organization': function (newVal, oldVal) {
      if (newVal.length < 3 && oldVal.length < newVal.length) {
        return
      }
      if (newVal.length < 3) {
        newVal = ''
      }
      this.debounce(() => {
        this.getOrganizations({
          exclude: this.form.all_organizations_selected,
          filter: newVal,
        }).then(() => {
          this.all_organizations = this.organizations.map(function (el) {
            return { name: el.name, code: el.id }
          })
        })
      }, 300)
    },
  },
}
</script>
<style lang="scss">
.promotions__card__no-banner {
  padding: 32px 32px;
  border-radius: 3px;
  background: #ededed;
  display: flex;
  justify-content: center;
  div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  i {
    font-size: 65px;
    color: #757575;
  }
  span {
    display: inline-block;
    padding-left: 24px;
    font-size: 20px;
    font-weight: 600;
    color: #757575;
  }
}
.select-window {
  .modal-content {
    min-height: 400px;
    .regions {
      padding: 0 15px;
    }
  }
  .d-search--alt {
    padding: 0 2px;
    .d-search__icon {
      display: none;
      position: absolute;
      top: 5px;
      left: 0;
      z-index: 4;
    }
    .d-search__field {
      border-radius: 5px;
    }
    .d-search__suggestions {
      position: absolute;
      overflow-y: auto;
      max-height: 250px;
      .d-search__suggestion {
        align-items: center;
        display: flex;
        a {
          display: flex;
          width: 100%;
        }
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }
      }
    }
  }
}
body {
  .chips {
    display: block;
    margin-left: -4px;
    margin-right: -4px;
    .chip {
      display: inline-block;
      padding: 5px 32px 5px 12px;
      border: 1px solid #282828;
      border-radius: 24px;
      position: relative;
      margin: 8px 4px;
      vertical-align: middle;
      font-size: 0;
      & > * {
        vertical-align: middle;
        font-size: 16px;
        line-height: 1.3;
      }
      span {
        font-size: 14px;
        font-weight: 500;
        color: #282828;
      }
      span.chip-img {
        background: #282828;
      }
      .chip-img {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 8px;
        border-radius: 50%;
      }
      i {
        display: inline-block;
        margin-right: 8px;
      }
      .chip-close {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 12px;
        top: 50%;
        transform: translate(0, -50%);
        &::before {
          content: '';
          display: inline-block;
          width: 15px;
          height: 1px;
          background: #282828;
          transform: rotate(45deg);
          position: absolute;
          top: 50%;
          right: 0;
        }
        &::after {
          content: '';
          display: inline-block;
          width: 15px;
          height: 1px;
          background: #282828;
          transform: rotate(-45deg);
          position: absolute;
          top: 50%;
          right: 0;
        }
      }
    }
  }
  .d-input--width-280 {
    & > * {
      width: 100%;
    }
  }
  .tox-tinymce {
    border-radius: 5px;
  }
  .d-description {
    font-size: 16px;
  }
  .promo-modal__header-right {
    padding: 32px;
  }
  .p-tabpanels {
    color: #282828;
  }
  .d-radio__container-vertical {
    flex-direction: column;
    gap: 12px;
  }
  .promotions__info {
    border-radius: 12px;
  }
  .d-badge {
    background-color: #ededed;
    border: 1px solid #ededed;
  }
  .product-table-card__discount-button {
    display: flex;
    margin: 5px auto 0;
  }
  .promotions__card-label {
    margin-bottom: 8px;
  }
  .promotions__card-block-inner {
    width: 100%;
  }
  .d-fractions {
    flex: inline-flex;
    flex-wrap: wrap;
    .d-fractions__item {
      &:first-child {
        justify-items: flex-start;
      }
      &:last-child {
        align-items: start;
      }
      .d-fractions__item-text,
      .d-fractions__item-text--bottom {
        text-align: left;
      }
    }
  }
  .promo-master__setting {
    text-align: left;
  }
  .promotions__card {
    .promotions__card-warehouse-header-container {
      position: relative;
      z-index: 2;
    }
    .d-search {
      z-index: 1;
      .d-search__field {
        padding: 7px 100px 7px 45px;
      }
    }
    .d-search--alt .d-search__icon {
      position: absolute;
      z-index: 8;
      top: 50%;
      left: 16px;
      margin: 0;
      transform: translate(0, -14px);
    }
    .d-search .d-search__button {
      height: auto;
      min-height: auto;
      max-height: auto;
      top: 50%;
      right: 4px;
      transform: translate(0, -47%);
    }
  }
}
.promotions__card-dates {
  .promotions__card-value-container {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .promotions__card-value {
    span {
      display: inline-block;
      &:nth-child(2) {
        position: relative;
        margin-left: 16px;
        padding-left: 16px;
        &::before {
          content: '';
          display: inline-block;
          height: 17px;
          top: 50%;
          left: 0;
          position: absolute;
          background: #757575;
          width: 1px;
          transform: translate(0, -50%);
        }
      }
    }
  }
  .d-fractions.d-fractions-dates {
    .d-fractions__item {
      width: 100%;
      &:last-child {
        align-items: start;
      }
    }
  }
}

.d-modal2__actions-start {
  justify-content: flex-start;
  margin-bottom: 15px;
}
.productsFileWindow {
  .modal-content {
    max-width: 600px;
  }
}
.productsSettingsWindow {
  .modal-content {
    max-width: 800px;
  }
}
.delay-window {
  .vfm__content {
    backdrop-filter: none;
  }
  .modal__close {
    top: 10px;
  }
  .modal-content {
    background: transparent;
    box-shadow: none;
    border: none;
    width: 100%;
    max-width: 600px;
  }
}
.promo-master-modal {
  .modal__title {
    display: none;
  }
  .modal__content {
    padding: 0;
  }
  .modal-content {
    padding: 128px 0 68px 0;
    position: relative;
    .promo-master {
      padding-top: 0;
    }
    .promo-modal__header {
      position: absolute;
      top: 0;
      z-index: 1001;
      left: 0;
      right: 0;
    }
    .promo-master__footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      .promo-master__footer-actions {
        margin-bottom: 0;
      }
    }
  }
  .modal__close {
    display: none;
  }
  .promo-modal__header-title-container {
    padding: 40px 32px;
  }
  .promo-modal__content {
    padding: 40px 32px;
  }
  .promo-master__footer-actions {
    padding: 16px 40px;
  }
  .dropzone__item {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: block;
      background: rgba(0, 0, 0, 0.5);
    }
    .gg-close {
      position: absolute;
      top: 15px;
      right: 20px;
      cursor: pointer;
      &::before {
        content: '';
        width: 1px;
        height: 15px;
        transform: rotate(-45deg);
        background: #fff;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
      }
      &::after {
        content: '';
        width: 1px;
        height: 15px;
        transform: rotate(45deg);
        background: #fff;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    img {
      display: block;
      margin-bottom: 24px;
    }
    .dropzone__progress {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .dropzone__details {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      top: 50%;
      transform: translate(0, -50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      color: #fff;
    }
  }
}
.tox-tinymce {
  width: 100%;
  border: 0.2px solid #757575;
  border-bottom-width: 2px;
  border-radius: 6px;
  box-shadow: 0px 32px 64px 0px none;
}
.dropzone__box {
  z-index: 1;
}

.dart-modal-price__button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .d-button {
    display: inline-block;
    width: auto;
  }
}

.product-dart-card {
  max-width: 400px;
  display: flex;
  gap: 8px;
  img {
    width: 38px;
    height: 38px !important;
    object-fit: contain;
    border-radius: 5px;
    margin: 0;
  }
  &__text {
    display: flex;
    flex-direction: column;
    margin: 0;
    p {
      margin: 0 0 8px;
      font-size: 14px;
      font-weight: 400;
      color: #282828;
      line-height: 1;
      text-align: left;
    }
    span {
      font-size: 14px;
      font-weight: 400;
      color: #adadad;
      line-height: 1;
      text-align: left;
    }
  }
}
.dart-method-edit-flex {
  display: flex;
  gap: 40px;
}

.dart-info-line {
  display: flex;
  padding: 12px 16px;
  background: #f8f7f5;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-top: 8px;
  p {
    color: #a0a0a0;
    font-size: 12px;
    margin: 0;
  }
}

.d-flex {
  display: flex !important;
}

.align-items-center {
  align-items: center !important;
}

.gap-1 {
  gap: 8px !important;
}

.dart-widget {
  .p-component {
    max-width: 100%;
  }
  p {
    font-size: 12px;
  }
}

.dart-alert {
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.dart-alert-primary {
  color: #084298;
  background-color: #cfe2ff;
  border-color: #b6d4fe;
}

.dart-alert-info {
  color: #055160;
  background-color: #cff4fc;
  border-color: #b6effb;
}

.dart-alert-error {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
}

.dart-alert-success {
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;
}

.dart-alert-warning {
  color: #664d03;
  background-color: #fff3cd;
  border-color: #ffecb5;
}

.p-ink {
  display: none;
}

.promo-master__dates {
  flex-direction: row;
  gap: 40px;
}
.regions {
  min-height: 230px;
}
.regions-container {
  display: flex;
  flex-direction: column;
}
.regions-submit {
  display: flex;
  justify-content: center;
}
</style>
