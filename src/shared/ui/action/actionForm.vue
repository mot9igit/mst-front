<template>
  <section class="promotions" id="promotions">
    <div class="promotions__top">
      <router-link :to="{ name: 'wholesalePrices', params: { id: $route.params.id } }" class="d-back promotions__top-back">
        <i class="d-icon-arrow d-back__icon"></i>
        <span class="d-back__text hidden-640">Назад</span>
      </router-link>
      <breadcrumbs />
    </div>

    <div class="promotions__header-back">
      <h1 class="d-title promotions__header-title" v-if="$route.params.action">Настройка акции № {{ $route.params.action }}</h1>
      <h1 class="d-title promotions__header-title" v-else>Создание акции</h1>
    </div>

    <div class="promotions__header">
      <h1 class="d-title promotions__header-title" v-if="$route.params.action">Настройка акции № {{ $route.params.action }}</h1>
      <h1 class="d-title promotions__header-title" v-else>Создание акции</h1>
      <div class="promotions__header-actions" v-if="$route.params.action">
        <label class="d-switch-button" for="enable-promotion">
          <div class="d-switch">
            <input
              type="checkbox"
              name="enable-promotion"
              id="enable-promotion"
              class="d-switch__input"
            />
            <div class="d-switch__circle"></div>
          </div>
          <span class="d-switch-button__text">Включить акцию</span>
        </label>
        <div class="d-divider d-divider--vertical"></div>
        <button class="d-icon-wrapper d-icon-wrapper--big">
          <i class="d-icon-copy promotions__icon"></i>
        </button>
        <div class="d-divider d-divider--vertical"></div>
        <button class="d-icon-wrapper d-icon-wrapper--big">
          <i class="d-icon-trash promotions__icon"></i>
        </button>
      </div>
    </div>

    <div class="promotions__info">
      <div class="promotions__info-title-container">
        <h2 class="promotions__info-title">Мастер создания акций</h2>
        <p class="promotions__info-description">Создайте акцию в несколько этапов</p>
      </div>

      <div class="d-progress hidden-1200">
        <p class="d-progress__label">Пройдено этапов:</p>
        <p class="d-progress__value">78%</p>
        <div class="d-progress__line"></div>
      </div>

      <div class="promotions__info-actions promotions__info-top-actions">
        <div class="promotions__info-additional">
          <label class="d-switch-button promotions__info-switch" for="enable-promotion2">
            <div class="d-switch">
              <input
                type="checkbox"
                name="enable-promotion2"
                id="enable-promotion2"
                class="d-switch__input promotions__info-switch-field"
              />
              <div class="d-switch__circle"></div>
            </div>
            <span class="d-switch-button__text promotions__info-switch-label">Включить акцию</span>
          </label>
          <div class="d-divider d-divider--vertical promotions__info-icon-divider"></div>
        </div>
        <div class="promotions__info-main-actions">
          <button class="d-icon-wrapper d-icon-wrapper--big promotions__info-edit">
            <i class="d-icon-pen2 promotions__icon"></i>
          </button>
          <div
            class="d-divider d-divider--vertical d-divider--white promotions__info-actions-divider"
          ></div>
          <div class="promotions__info-primary-actions">
            <div class="d-divider d-divider--vertical promotions__info-icon-divider"></div>
            <button class="d-icon-wrapper d-icon-wrapper--big promotions__info-add">
              <i class="d-icon-plus promotions__icon promotions__icon--plus"></i>
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
                <button class="promotions__card-button">
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
                  <p class="promotions__card-value promotions__card-value--bold">4+1 на дрели</p>
                </div>
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Описание акции:</span>
                  <p class="promotions__card-value">
                    При покупке 5-ти УШМ (с текущей скидкой клиента) вы получаете 25 дисков по
                    металлу бесплатно (выгода достигается за счет скидки на инструмент). При покупке
                    5-ти УШМ (с текущей скидкой клиента) вы получаете 25 дисков по металлу
                    бесплатно. УШМ (с текущей скидкой клиента) вы получаете 25 дисков по металлу
                    бесплатно (выгода достигается за счет скидки на инструмент). А тут я добавила
                    текста чтобы было так по количеству символов и еще тут...
                  </p>
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
                <button class="promotions__card-button">
                  <i class="d-icon-pen2 promotions__card-button-icon"></i>
                </button>
                <div class="d-divider d-divider--vertical promotions__card-header-divider"></div>
                <button class="promotions__card-button promotions__card-header-add">
                  <i class="d-icon-plus promotions__card-button-icon"></i>
                </button>
              </div>
            </div>
            <div class="promotions__card-content">
              <div class="promotions__card-banner-container">
                <div class="promotions__card-banner">
                  <div
                    class="d-message promotions__card-banner-message promotions__card-banner-message--banner"
                  >
                    <i class="d-icon-danger d-message__icon"></i>
                    <p class="d-message__text">Баннер не показывается в рекламе</p>
                  </div>
                  <img
                    src="/images/banner.png"
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
                    <div class="d-badge">Главная страница</div>
                    <div class="d-badge">Главная странница всех страниц</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dart-row promotions__content-card-container">
        <div class="d-col d-col-xl-9 d-col-24">
          <div class="promotions__card-container">
            <div class="promotions__card">
              <div class="promotions__card-header">
                <div class="promotions__card-header-left">
                  <i class="d-icon-truck promotions__card-icon"></i>
                  <p class="promotions__card-title">Условия акции</p>
                </div>
                <div class="promotions__info-actions">
                  <button class="promotions__card-button">
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
                  <div class="promotions__card-value-container d-md-full">
                    <span class="promotions__card-label">Оплата доставки:</span>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                    >
                      Доставка за счет покупателя
                    </p>
                  </div>
                  <div class="promotions__card-value-container d-md-full">
                    <span class="promotions__card-label">Срок доставки:</span>
                    <p
                      class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                    >
                      Рассчитывается ТК
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="promotions__card hidden-600">
              <div class="promotions__card-header">
                <div class="promotions__card-header-left">
                  <i class="d-icon-wallet promotions__card-icon"></i>
                  <p class="promotions__card-title">Условия оплаты</p>
                </div>
                <div class="promotions__info-actions">
                  <button class="promotions__card-button">
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
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label d-md-max-content">Под реализацию</span>
                      <p
                        class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value"
                      >
                        120 дней
                      </p>
                    </div>
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
                  </div>
                  <div class="d-fractions">
                    <div class="d-fractions__item">
                      <p class="d-fractions__item-text">Предоплата</p>
                      <div class="d-fractions__item-block" style="width: 36px"></div>
                      <p class="d-fractions__item-text d-fractions__item-text--bottom">20%</p>
                    </div>
                    <div class="d-fractions__item">
                      <p class="d-fractions__item-text">30 дней</p>
                      <div class="d-fractions__item-block" style="width: 32px"></div>
                      <p class="d-fractions__item-text d-fractions__item-text--bottom">30%</p>
                    </div>
                    <div class="d-fractions__item d-fractions__item--center">
                      <p class="d-fractions__item-text">145 дней</p>
                      <div class="d-fractions__item-block" style="width: 100px"></div>
                      <p class="d-fractions__item-text d-fractions__item-text--bottom">50%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-col d-col-xl-15 d-col-24">
          <div class="promotions__card">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-user-star promotions__card-icon"></i>
                <p class="promotions__card-title">Аудитория акции</p>
              </div>
              <div class="promotions__info-actions">
                <button class="promotions__card-button">
                  <i class="d-icon-pen2 promotions__card-button-icon"></i>
                </button>
                <div class="d-divider d-divider--vertical promotions__card-header-divider"></div>
                <button class="promotions__card-button promotions__card-header-add">
                  <i class="d-icon-plus promotions__card-button-icon"></i>
                </button>
              </div>
            </div>
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
            <div class="promotions__card-content">
              <div class="promotions__card-info promotions__card-info--fit mb-24 hidden-1200">
                <p class="promotions__card-info-text">
                  Скрыто у клиентов с индивидуальными условиями
                </p>
                <button class="promotions__card-info-button">
                  <i class="d-icon-info promotions__card-info-icon"></i>
                </button>
              </div>

              <div class="promotions__card-value-container">
                <span class="promotions__card-label promotions__card-audience-label"
                  >По географии</span
                >
                <div class="d-badge__container">
                  <div class="d-badge promotions__card-audience-badge">
                    <i
                      class="d-icon-toggles d-badge__icon promotions__card-audience-badge-icon"
                    ></i>
                    Все регионы
                  </div>
                </div>
              </div>

              <div class="d-divider d-divider--full promotions__card-audience-divider"></div>

              <div class="promotions__card-value-container">
                <span class="promotions__card-label promotions__card-audience-label"
                  >Типы компаний</span
                >
                <div class="d-badge__container">
                  <div class="d-badge promotions__card-audience-badge">
                    <i
                      class="d-icon-toggles d-badge__icon promotions__card-audience-badge-icon"
                    ></i>
                    Все регионы
                  </div>
                </div>
              </div>

              <div class="d-divider d-divider--full promotions__card-audience-divider"></div>

              <div class="promotions__card-value-container">
                <span class="promotions__card-label promotions__card-audience-label"
                  >Отдельные компании</span
                >
                <div class="d-badge__container">
                  <div class="d-badge promotions__card-audience-badge">
                    <div
                      class="d-badge__img-fallback promotions__card-audience-badge-fallback"
                    ></div>
                    КЛС-Трейд
                  </div>
                  <div class="d-badge promotions__card-audience-badge">
                    <div
                      class="d-badge__img-fallback promotions__card-audience-badge-fallback"
                    ></div>
                    КЛС-Трейд
                  </div>
                  <div class="d-badge promotions__card-audience-badge">
                    <img
                      src="/icons/spo-logo.svg"
                      alt=""
                      class="d-badge__img promotions__card-audience-badge-img"
                    />
                    Alteco
                  </div>
                  <div class="d-badge promotions__card-audience-badge">
                    <img
                      src="/icons/spo-logo.svg"
                      alt=""
                      class="d-badge__img promotions__card-audience-badge-img"
                    />
                    Alteco
                  </div>
                  <div class="d-badge promotions__card-audience-badge">
                    <div
                      class="d-badge__img-fallback promotions__card-audience-badge-fallback"
                    ></div>
                    КЛС-Трейд
                  </div>
                  <div class="d-badge promotions__card-audience-badge">
                    <i
                      class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"
                    ></i>
                    Члябинская область
                  </div>
                  <div class="d-badge promotions__card-audience-badge">
                    <img
                      src="/icons/spo-logo.svg"
                      alt=""
                      class="d-badge__img promotions__card-audience-badge-img"
                    />
                    Alteco
                  </div>
                  <div class="d-badge promotions__card-audience-badge">
                    <div
                      class="d-badge__img-fallback promotions__card-audience-badge-fallback"
                    ></div>
                    КЛС-Трейд
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dart-row promotions__content-card-container">
        <div class="d-col d-col-24">
          <div class="promotions__card">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-check-list promotions__card-icon"></i>
                <p class="promotions__card-title">Условия участия в акции</p>

                <div class="d-category__container ml-44 hidden-1200">
                  <div class="d-category">Негативная акция</div>
                  <div class="d-category">Акция доступна только в предложениях</div>
                </div>
              </div>
              <div class="promotions__card-header-right">
                <div
                  class="d-message promotions__card-message promotions__card-promo-conds-message hidden-800"
                >
                  <i class="d-icon-danger d-message__icon"></i>
                  <p class="d-message__text">Требуется интеграция склада</p>
                </div>

                <div class="d-divider d-divider--vertical d-divider--big hidden-1200"></div>

                <div class="promotions__info-actions">
                  <button class="promotions__card-button">
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
                <div class="d-badge d-badge--filled">Негативная акция</div>
                <div class="d-badge d-badge--filled">Акция доступна только в предложениях</div>
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
                      0 ₽
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
                      Любое
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
                        Минимально общее количество товаров
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
                      Любое
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
                            Совместима со всеми акциями
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
                            Складываются
                          </p>
                          <p
                            class="promotions__card-label promotions__card-label--big promotions__card-block-description promotions__card-block-description--full"
                          >
                            Процент скидки сложиться и отнимется от цены. Отсрочка сложится.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button class="d-button d-button-tertiary promotions__card-block-button">
                    <i class="d-icon-trade promotions__card-block-button-icon"></i>
                    Совместимость акций
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dart-row promotions__content-card-container">
        <div class="d-col d-col-24">
          <div class="promotions__card products__card">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-cube promotions__card-icon"></i>
                <p class="promotions__card-title">Товары и скидки</p>
              </div>
              <div class="promotions__info-actions">
                <button class="promotions__card-button">
                  <i class="d-icon-pen2 promotions__card-button-icon"></i>
                </button>
                <div class="d-divider d-divider--vertical promotions__card-header-divider"></div>
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
                  <div class="d-field-container d-field-container--vertical">
                    <div class="d-field-wrapper">
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
                    <div class="d-field-wrapper">
                      <label class="d-switch" for="warehouse2">
                        <input
                          type="checkbox"
                          name="warehouse2"
                          id="warehouse2"
                          class="d-switch__input"
                        />
                        <div class="d-switch__circle"></div>
                      </label>
                      <label for="warehouse2" class="d-switch__label"
                        >ООО МСТ, г Химки, ул, Ленинградская д. 29
                      </label>
                    </div>
                    <div class="d-field-wrapper">
                      <label class="d-switch" for="warehouse3">
                        <input
                          type="checkbox"
                          name="warehouse3"
                          id="warehouse3"
                          class="d-switch__input"
                        />
                        <div class="d-switch__circle"></div>
                      </label>
                      <label for="warehouse3" class="d-switch__label"
                        >ООО МСТ, г Химки, ул, Ленинградская д. 29
                      </label>
                    </div>
                  </div>
                  <div class="d-field-container d-field-container--vertical">
                    <div class="d-field-wrapper">
                      <label class="d-switch" for="warehouse4">
                        <input
                          type="checkbox"
                          name="warehouse4"
                          id="warehouse4"
                          class="d-switch__input"
                        />
                        <div class="d-switch__circle"></div>
                      </label>
                      <label for="warehouse4" class="d-switch__label"
                        >ООО МСТ, г Химки, ул, Ленинградская д. 29
                      </label>
                    </div>
                    <div class="d-field-wrapper">
                      <label class="d-switch" for="warehouse5">
                        <input
                          type="checkbox"
                          name="warehouse5"
                          id="warehouse5"
                          class="d-switch__input"
                        />
                        <div class="d-switch__circle"></div>
                      </label>
                      <label for="warehouse5" class="d-switch__label"
                        >ООО МСТ, г Химки, ул, Ленинградская д. 29
                      </label>
                    </div>
                    <div class="d-field-wrapper">
                      <label class="d-switch" for="warehouse6">
                        <input
                          type="checkbox"
                          name="warehouse6"
                          id="warehouse6"
                          class="d-switch__input"
                        />
                        <div class="d-switch__circle"></div>
                      </label>
                      <label for="warehouse6" class="d-switch__label"
                        >ООО МСТ, г Химки, ул, Ленинградская д. 29
                      </label>
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
                class="d-divider d-divider--full d-divider--semibold d-divider--black promotions__card-warehouse-divider"
              ></div>

              <div class="promotions__card-warehouse promotions__card-warehouse-header-container">
                <div class="promotions__card-value-container promotions__card-warehouse-header">
                  <p
                    class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-title promotions__card-warehouse-title"
                  >
                    Товары
                  </p>
                  <span
                    class="promotions__card-label promotions__card-label--big promotions__card-warehouse-label"
                    >Загрузите список товаров и установите скидки, которые получит клиент при
                    выполнении условий акции</span
                  >
                </div>
                <form class="d-search d-search--alt promotions__card-warehouse-search hidden-600">
                  <i
                    class="d-icon-search-big d-search__icon promotions__card-warehouse-search-icon"
                  ></i>
                  <input type="text" placeholder="Найти товар по артиклу" class="d-search__field" />
                  <button
                    type="button"
                    class="d-button d-button-primary d-button-primary-small box-shadow-none d-search__button"
                  >
                    <span class="hidden-800">Найти</span>
                    <i class="d-icon-search-big visible-800"></i>
                  </button>

                  <ul class="d-search__suggestions">
                    <!-- <li class="d-search__suggestion">Россия, Москва, Большой Предтеченский переулок, 13с4</li>
															<li class="d-search__suggestion">Россия, Москва, Большой Предтеченский переулок, 13с4</li>
															<li class="d-search__suggestion">Россия, Москва, Большой Предтеченский переулок, 13с4</li>
															<li class="d-search__suggestion">Россия, Москва, Большой Предтеченский переулок, 13с4</li> -->
                  </ul>
                </form>

                <button
                  class="d-button d-button-primary d-button-primary-small d-button--sm-shadow promotions__card-warehouse-settings-choose visible-600"
                >
                  <i class="d-icon-search-big"></i>
                  Добавить коллекцию
                </button>
              </div>

              <div class="d-table__wrapper promotions__card-products">
                <table class="d-table hidden-1200">
                  <thead class="d-table__head">
                    <tr class="d-table__row">
                      <th class="d-table__head-col">
                        <div class="flex-center">
                          <label class="d-radio d-radio--white" id="checkbox1">
                            <input
                              type="checkbox"
                              name="checkbox1"
                              id="checkbox1"
                              class="d-radio__input"
                            />
                          </label>
                        </div>
                      </th>
                      <th class="d-table__head-col" style="width: 20%">Товар</th>
                      <th class="d-table__head-col">РРЦ</th>
                      <th class="d-table__head-col">Скидка</th>
                      <th class="d-table__head-col">Тип ценообразования</th>
                      <th class="d-table__head-col">Цена со скидкой за шт.</th>
                      <th class="d-table__head-col">Минимальное количество</th>
                      <th class="d-table__head-col">Максимальное количество</th>
                      <th class="d-table__head-col">Кратность</th>
                      <th class="d-table__head-col">
                        <div class="flex-center">
                          <button class="d-icon-wrapper d-icon-wrapper--big d-icon-wrapper--white">
                            <i class="d-icon-trash d-table__icon"></i>
                          </button>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="d-table__body promotions__product-card">
                    <tr class="d-table__row">
                      <td class="d-table__col"></td>
                      <td class="d-table__col"></td>
                      <td class="d-table__col"></td>
                      <td class="d-table__col"></td>
                      <td class="d-table__col"></td>
                      <td class="d-table__col"></td>
                      <td class="d-table__col"></td>
                      <td class="d-table__col"></td>
                      <td class="d-table__col"></td>
                      <td class="d-table__col"></td>
                    </tr>
                    <tr class="d-table__row">
                      <td class="d-table__col">
                        <div class="flex-center">
                          <label class="d-radio d-radio--black" id="checkbox2">
                            <input
                              type="checkbox"
                              name="checkbox2"
                              id="checkbox2"
                              class="d-radio__input"
                            />
                          </label>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="product-table-card">
                          <p class="product-table-card__title">
                            Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                          </p>
                          <p class="product-table-card__article">Арт: 844337</p>
                          <div class="d-badge d-badge--small">
                            <img src="/icons/spo-logo.svg" alt="" class="d-badge__img" />
                            МСТ
                          </div>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="d-table__col-inner">
                          <p
                            class="promotions__card-text promotions__card-text--bold product-table-card__value"
                          >
                            2 500.00 ₽
                          </p>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center flex-center--vertical">
                          <p
                            class="promotions__card-text promotions__card-text--bold product-table-card__discount product-table-card__value"
                          >
                            30% ₽
                          </p>
                          <button
                            class="d-button d-button-tertiary d-button-tertiary-small product-table-card__discount-button"
                          >
                            <i class="d-icon-mixer product-table-card__discount-button-icon"></i>
                            Настроить
                          </button>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center flex-center--vertical">
                          <p class="promotions__card-text promotions__card-text--bold">Скидка</p>
                          <p class="product-table-card__text">по формуле</p>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <p
                            class="promotions__card-text promotions__card-text--bold product-table-card__value"
                          >
                            1 750.00 ₽
                          </p>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <div class="d-counter" data-counter="">
                            <button class="d-counter__button" data-counter-button="decrement">
                              <i class="d-icon-minus d-counter__button-icon"></i>
                            </button>
                            <input
                              class="d-counter__input"
                              type="text"
                              name="test-counter"
                              id="test-counter"
                              value="1"
                              data-counter-input=""
                            />
                            <button class="d-counter__button" data-counter-button="increment">
                              <i class="d-icon-plus d-counter__button-icon"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <div class="d-counter" data-counter="">
                            <button class="d-counter__button" data-counter-button="decrement">
                              <i class="d-icon-minus d-counter__button-icon"></i>
                            </button>
                            <input
                              class="d-counter__input"
                              type="text"
                              name="test-counter"
                              id="test-counter"
                              value="1"
                              data-counter-input=""
                            />
                            <button class="d-counter__button" data-counter-button="increment">
                              <i class="d-icon-plus d-counter__button-icon"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <div class="d-counter" data-counter="">
                            <button class="d-counter__button" data-counter-button="decrement">
                              <i class="d-icon-minus d-counter__button-icon"></i>
                            </button>
                            <input
                              class="d-counter__input"
                              type="text"
                              name="test-counter"
                              id="test-counter"
                              value="1"
                              data-counter-input=""
                            />
                            <button class="d-counter__button" data-counter-button="increment">
                              <i class="d-icon-plus d-counter__button-icon"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <button class="d-icon-wrapper d-icon-wrapper--big">
                            <i class="d-icon-trash d-table__icon"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr class="d-table__row">
                      <td class="d-table__col">
                        <div class="flex-center">
                          <label class="d-radio d-radio--black" id="checkbox2">
                            <input
                              type="checkbox"
                              name="checkbox2"
                              id="checkbox2"
                              class="d-radio__input"
                            />
                          </label>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="product-table-card">
                          <p class="product-table-card__title">
                            Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                          </p>
                          <p class="product-table-card__article">Арт: 844337</p>
                          <div class="d-badge d-badge--small">
                            <img src="/icons/spo-logo.svg" alt="" class="d-badge__img" />
                            МСТ
                          </div>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="d-table__col-inner">
                          <p
                            class="promotions__card-text promotions__card-text--bold product-table-card__value"
                          >
                            2 500.00 ₽
                          </p>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center flex-center--vertical">
                          <p
                            class="promotions__card-text promotions__card-text--bold product-table-card__discount product-table-card__value"
                          >
                            30% ₽
                          </p>
                          <button
                            class="d-button d-button-tertiary d-button-tertiary-small product-table-card__discount-button"
                          >
                            <i class="d-icon-mixer product-table-card__discount-button-icon"></i>
                            Настроить
                          </button>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center flex-center--vertical">
                          <p class="promotions__card-text promotions__card-text--bold">Скидка</p>
                          <p class="product-table-card__text">по формуле</p>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <p
                            class="promotions__card-text promotions__card-text--bold product-table-card__value"
                          >
                            1 750.00 ₽
                          </p>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <div class="d-counter" data-counter="">
                            <button class="d-counter__button" data-counter-button="decrement">
                              <i class="d-icon-minus d-counter__button-icon"></i>
                            </button>
                            <input
                              class="d-counter__input"
                              type="text"
                              name="test-counter"
                              id="test-counter"
                              value="1"
                              data-counter-input=""
                            />
                            <button class="d-counter__button" data-counter-button="increment">
                              <i class="d-icon-plus d-counter__button-icon"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <div class="d-counter" data-counter="">
                            <button class="d-counter__button" data-counter-button="decrement">
                              <i class="d-icon-minus d-counter__button-icon"></i>
                            </button>
                            <input
                              class="d-counter__input"
                              type="text"
                              name="test-counter"
                              id="test-counter"
                              value="1"
                              data-counter-input=""
                            />
                            <button class="d-counter__button" data-counter-button="increment">
                              <i class="d-icon-plus d-counter__button-icon"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <div class="d-counter" data-counter="">
                            <button class="d-counter__button" data-counter-button="decrement">
                              <i class="d-icon-minus d-counter__button-icon"></i>
                            </button>
                            <input
                              class="d-counter__input"
                              type="text"
                              name="test-counter"
                              id="test-counter"
                              value="1"
                              data-counter-input=""
                            />
                            <button class="d-counter__button" data-counter-button="increment">
                              <i class="d-icon-plus d-counter__button-icon"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <button class="d-icon-wrapper d-icon-wrapper--big">
                            <i class="d-icon-trash d-table__icon"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr class="d-table__row">
                      <td class="d-table__col">
                        <div class="flex-center">
                          <label class="d-radio d-radio--black" id="checkbox2">
                            <input
                              type="checkbox"
                              name="checkbox2"
                              id="checkbox2"
                              class="d-radio__input"
                            />
                          </label>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="product-table-card">
                          <p class="product-table-card__title">
                            Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                          </p>
                          <p class="product-table-card__article">Арт: 844337</p>
                          <div class="d-badge d-badge--small">
                            <img src="/icons/spo-logo.svg" alt="" class="d-badge__img" />
                            МСТ
                          </div>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="d-table__col-inner">
                          <p
                            class="promotions__card-text promotions__card-text--bold product-table-card__value"
                          >
                            2 500.00 ₽
                          </p>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center flex-center--vertical">
                          <p
                            class="promotions__card-text promotions__card-text--bold product-table-card__discount product-table-card__value"
                          >
                            30% ₽
                          </p>
                          <button
                            class="d-button d-button-tertiary d-button-tertiary-small product-table-card__discount-button"
                          >
                            <i class="d-icon-mixer product-table-card__discount-button-icon"></i>
                            Настроить
                          </button>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center flex-center--vertical">
                          <p class="promotions__card-text promotions__card-text--bold">Скидка</p>
                          <p class="product-table-card__text">по формуле</p>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <p
                            class="promotions__card-text promotions__card-text--bold product-table-card__value"
                          >
                            1 750.00 ₽
                          </p>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <div class="d-counter" data-counter="">
                            <button class="d-counter__button" data-counter-button="decrement">
                              <i class="d-icon-minus d-counter__button-icon"></i>
                            </button>
                            <input
                              class="d-counter__input"
                              type="text"
                              name="test-counter"
                              id="test-counter"
                              value="1"
                              data-counter-input=""
                            />
                            <button class="d-counter__button" data-counter-button="increment">
                              <i class="d-icon-plus d-counter__button-icon"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <div class="d-counter" data-counter="">
                            <button class="d-counter__button" data-counter-button="decrement">
                              <i class="d-icon-minus d-counter__button-icon"></i>
                            </button>
                            <input
                              class="d-counter__input"
                              type="text"
                              name="test-counter"
                              id="test-counter"
                              value="1"
                              data-counter-input=""
                            />
                            <button class="d-counter__button" data-counter-button="increment">
                              <i class="d-icon-plus d-counter__button-icon"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <div class="d-counter" data-counter="">
                            <button class="d-counter__button" data-counter-button="decrement">
                              <i class="d-icon-minus d-counter__button-icon"></i>
                            </button>
                            <input
                              class="d-counter__input"
                              type="text"
                              name="test-counter"
                              id="test-counter"
                              value="1"
                              data-counter-input=""
                            />
                            <button class="d-counter__button" data-counter-button="increment">
                              <i class="d-icon-plus d-counter__button-icon"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="d-table__col">
                        <div class="flex-center">
                          <button class="d-icon-wrapper d-icon-wrapper--big">
                            <i class="d-icon-trash d-table__icon"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="d-accordion visible-1200">
                  <div class="d-accordion__header">
                    <div class="d-product-list__header">
                      <div class="d-radio__wrapper d-product-list__all">
                        <label for="checkAll" class="d-radio__label">Выбрать все </label>
                        <label class="d-radio d-radio--white">
                          <input
                            type="checkbox"
                            name="checkAll"
                            id="checkAll"
                            class="d-radio__input"
                          />
                        </label>
                      </div>
                      <div
                        class="d-divider d-divider--vertical d-divider--light d-product-list__header-divider"
                      ></div>

                      <button
                        class="d-icon-wrapper d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--white d-product-list__header-button"
                      >
                        <i class="d-icon-angle-rounded-bottom"></i>
                      </button>
                    </div>
                  </div>
                  <div class="d-accordion__content">
                    <div class="d-product-list__content">
                      <div class="d-accordion d-product d-product--active">
                        <div class="d-accordion__header">
                          <div class="d-product__header">
                            <div class="d-product__header-content">
                              <img
                                src="/images/product2.svg"
                                alt=""
                                class="d-product__img"
                                width="50"
                                height="52"
                              />
                              <div class="d-product__header-info-container">
                                <div class="d-product__header-info">
                                  <div class="d-product__top">
                                    <div class="d-product__price">
                                      <p class="d-product__price-value">1 750.00 ₽</p>
                                      <div class="d-product__price-discount">30% ₽</div>
                                    </div>
                                    <div class="d-product__options">
                                      <div class="d-radio__wrapper d-product-list__all">
                                        <label class="d-radio d-radio--gray">
                                          <input
                                            type="checkbox"
                                            name="check1"
                                            id="check1"
                                            class="d-radio__input"
                                          />
                                        </label>
                                      </div>
                                      <div
                                        class="d-divider d-divider--vertical d-divider--black d-product-list__header-divider"
                                      ></div>
                                      <button
                                        class="d-icon-wrapper d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--gray d-product-list__header-button"
                                      >
                                        <i class="d-icon-angle-rounded-bottom"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <p class="d-product__title">
                                    Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                                  </p>
                                  <p class="d-product__article">Арт: 844337</p>
                                </div>
                                <div class="d-product__multiple">
                                  <p class="d-product__multiple-label">Кратность</p>
                                  <div class="d-counter" data-counter="">
                                    <button
                                      class="d-counter__button"
                                      data-counter-button="decrement"
                                    >
                                      <i class="d-icon-minus d-counter__button-icon"></i>
                                    </button>
                                    <input
                                      class="d-counter__input"
                                      type="text"
                                      name="test-counter"
                                      id="test-counter"
                                      value="1"
                                      data-counter-input=""
                                    />
                                    <button
                                      class="d-counter__button"
                                      data-counter-button="increment"
                                    >
                                      <i class="d-icon-plus d-counter__button-icon"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="d-accordion__content">
                          <div class="d-product__content">
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">РРЦ</p>
                              <div class="d-product__parameter-value">
                                <p class="d-product__price-text">1 750.00 ₽</p>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Скидка</p>
                              <div class="d-product__parameter-value">
                                <div class="d-product__parameter-value-inner">
                                  <p class="d-product__price-text">30% ₽</p>
                                  <div class="d-divider d-divider--vertical d-divider--black"></div>
                                  <div
                                    class="d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--black"
                                  >
                                    <i class="d-icon-mixer"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Тип ценообразования</p>
                              <div class="d-product__parameter-value">
                                <p class="d-product__parameter-text">
                                  <span class="d-product__parameter-strong">Скидка</span
                                  ><br class="visible-320" />
                                  по формуле
                                </p>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Цена с скидкой за шт.</p>
                              <div class="d-product__parameter-value">
                                <p class="d-product__price-text d-product__price-text--big">
                                  1 750.00 ₽
                                </p>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Минимальное количество</p>
                              <div class="d-product__parameter-value">
                                <div class="d-counter" data-counter="">
                                  <button class="d-counter__button" data-counter-button="decrement">
                                    <i class="d-icon-minus d-counter__button-icon"></i>
                                  </button>
                                  <input
                                    class="d-counter__input"
                                    type="text"
                                    name="test-counter"
                                    id="test-counter"
                                    value="1"
                                    data-counter-input=""
                                  />
                                  <button class="d-counter__button" data-counter-button="increment">
                                    <i class="d-icon-plus d-counter__button-icon"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Максимальное количество</p>
                              <div class="d-product__parameter-value">
                                <div class="d-counter" data-counter="">
                                  <button class="d-counter__button" data-counter-button="decrement">
                                    <i class="d-icon-minus d-counter__button-icon"></i>
                                  </button>
                                  <input
                                    class="d-counter__input"
                                    type="text"
                                    name="test-counter"
                                    id="test-counter"
                                    value="1"
                                    data-counter-input=""
                                  />
                                  <button class="d-counter__button" data-counter-button="increment">
                                    <i class="d-icon-plus d-counter__button-icon"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Кратность</p>
                              <div class="d-product__parameter-value">
                                <div class="d-counter" data-counter="">
                                  <button class="d-counter__button" data-counter-button="decrement">
                                    <i class="d-icon-minus d-counter__button-icon"></i>
                                  </button>
                                  <input
                                    class="d-counter__input"
                                    type="text"
                                    name="test-counter"
                                    id="test-counter"
                                    value="1"
                                    data-counter-input=""
                                  />
                                  <button class="d-counter__button" data-counter-button="increment">
                                    <i class="d-icon-plus d-counter__button-icon"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="d-accordion d-product">
                        <div class="d-accordion__header">
                          <div class="d-product__header">
                            <div class="d-product__header-content">
                              <img
                                src="/images/product2.svg"
                                alt=""
                                class="d-product__img"
                                width="50"
                                height="52"
                              />
                              <div class="d-product__header-info-container">
                                <div class="d-product__header-info">
                                  <div class="d-product__top">
                                    <div class="d-product__price">
                                      <p class="d-product__price-value">1 750.00 ₽</p>
                                      <div class="d-product__price-discount">30% ₽</div>
                                    </div>
                                    <div class="d-product__options">
                                      <div class="d-radio__wrapper d-product-list__all">
                                        <label class="d-radio d-radio--gray">
                                          <input
                                            type="checkbox"
                                            name="check1"
                                            id="check1"
                                            class="d-radio__input"
                                          />
                                        </label>
                                      </div>
                                      <div
                                        class="d-divider d-divider--vertical d-divider--black d-product-list__header-divider"
                                      ></div>
                                      <button
                                        class="d-icon-wrapper d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--gray d-product-list__header-button"
                                      >
                                        <i class="d-icon-angle-rounded-bottom"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <p class="d-product__title">
                                    Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                                  </p>
                                  <p class="d-product__article">Арт: 844337</p>
                                </div>
                                <div class="d-product__multiple">
                                  <p class="d-product__multiple-label">Кратность</p>
                                  <div class="d-counter" data-counter="">
                                    <button
                                      class="d-counter__button"
                                      data-counter-button="decrement"
                                    >
                                      <i class="d-icon-minus d-counter__button-icon"></i>
                                    </button>
                                    <input
                                      class="d-counter__input"
                                      type="text"
                                      name="test-counter"
                                      id="test-counter"
                                      value="1"
                                      data-counter-input=""
                                    />
                                    <button
                                      class="d-counter__button"
                                      data-counter-button="increment"
                                    >
                                      <i class="d-icon-plus d-counter__button-icon"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button class="d-product__delete">
                              <i class="d-icon-trash d-product__delete-icon"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="d-accordion d-product">
                        <div class="d-product__header">
                          <div class="d-product__header-content">
                            <img
                              src="/images/product2.svg"
                              alt=""
                              class="d-product__img"
                              width="50"
                              height="52"
                            />
                            <div class="d-product__header-info-container">
                              <div class="d-product__header-info">
                                <div class="d-product__top">
                                  <div class="d-product__price">
                                    <p class="d-product__price-value">1 750.00 ₽</p>
                                    <div class="d-product__price-discount">30% ₽</div>
                                  </div>
                                  <div class="d-product__options">
                                    <div class="d-radio__wrapper d-product-list__all">
                                      <label class="d-radio d-radio--gray">
                                        <input
                                          type="checkbox"
                                          name="check1"
                                          id="check1"
                                          class="d-radio__input"
                                        />
                                      </label>
                                    </div>
                                    <div
                                      class="d-divider d-divider--vertical d-divider--black d-product-list__header-divider"
                                    ></div>
                                    <button
                                      class="d-icon-wrapper d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--gray d-product-list__header-button"
                                    >
                                      <i class="d-icon-angle-rounded-bottom"></i>
                                    </button>
                                  </div>
                                </div>
                                <p class="d-product__title">
                                  Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                                </p>
                                <p class="d-product__article">Арт: 844337</p>
                              </div>
                              <div class="d-product__multiple">
                                <p class="d-product__multiple-label">Кратность</p>
                                <div class="d-counter" data-counter="">
                                  <button class="d-counter__button" data-counter-button="decrement">
                                    <i class="d-icon-minus d-counter__button-icon"></i>
                                  </button>
                                  <input
                                    class="d-counter__input"
                                    type="text"
                                    name="test-counter"
                                    id="test-counter"
                                    value="1"
                                    data-counter-input=""
                                  />
                                  <button class="d-counter__button" data-counter-button="increment">
                                    <i class="d-icon-plus d-counter__button-icon"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <button class="d-product__delete">
                            <i class="d-icon-trash d-product__delete-icon"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-table__footer">
                  <div class="d-table__footer-content">
                    <div class="d-table__footer-content-inner">
                      <div class="d-table__footer-left">
                        <div class="d-table__mark">Отмечено 0 из 3</div>
                        <div
                          class="d-divider d-divider--vertical d-divider--big d-divider--black hidden-800"
                        ></div>
                        <div class="d-field-wrapper d-table__footer-all">
                          <label class="d-switch" for="products1">
                            <input
                              type="checkbox"
                              name="products1"
                              id="products1"
                              class="d-switch__input"
                            />
                            <div class="d-switch__circle"></div>
                          </label>
                          <label for="products1" class="d-switch__label d-table__footer-all-label"
                            >Выбрать все элементы на всех страницах
                          </label>
                        </div>
                      </div>
                      <div class="d-table__footer-right">
                        <ul class="d-pagination d-table__footer-right-pagination">
                          <li class="d-pagination__item">1</li>
                          <li class="d-pagination__item">2</li>
                          <li class="d-pagination__item">3</li>
                          <li class="d-pagination__item d-pagination__item--active">4</li>
                          <li class="d-pagination__item">+</li>
                        </ul>
                        <button class="d-select hidden-1200">
                          <span class="d-select__title">Задать вручную</span>
                          <i class="d-icon-angle-rounded-bottom d-select__arrow"></i>
                        </button>
                        <button class="d-select d-select--squared visible-1200">
                          <span class="d-select__title">Задать вручную</span>
                          <i class="d-icon-angle-rounded-bottom d-select__arrow"></i>
                        </button>
                      </div>
                    </div>
                    <ul class="d-pagination d-table__footer-pagination">
                      <li class="d-pagination__item">1</li>
                      <li class="d-pagination__item">2</li>
                      <li class="d-pagination__item">3</li>
                      <li class="d-pagination__item d-pagination__item--active">4</li>
                      <li class="d-pagination__item">+</li>
                    </ul>
                  </div>

                  <div
                    class="d-field-container d-field-container--long d-table__footer-fields hidden-1200"
                  >
                    <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                      <label for="manual" class="d-dropdown__label">Массовые действия </label>
                      <div class="d-input d-input--light">
                        <input
                          type="text"
                          placeholder="Задать вручную"
                          name="manual"
                          class="d-input__field d-table__footer-input"
                          data-input-id="manual"
                          required=""
                        />
                        <button class="d-input__dropdown-button">
                          <i class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                      <label for="extra-charge" class="d-dropdown__label"
                        >Тип ценообразования
                      </label>
                      <div class="d-input d-input--light">
                        <input
                          type="text"
                          placeholder="Наценка"
                          name="extra-charge"
                          class="d-input__field d-table__footer-input"
                          data-input-id="extra-charge"
                          required=""
                        />
                        <button class="d-input__dropdown-button">
                          <i class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                      <label for="value" class="d-dropdown__label">Значение </label>
                      <div class="d-field-container d-field-container--long">
                        <div class="d-input d-input--light">
                          <input
                            type="text"
                            placeholder="0"
                            name="value"
                            class="d-input__field d-table__footer-input d-table__footer-input--value"
                            data-input-id="value"
                            required=""
                          />
                        </div>
                        <div class="d-input d-input--light">
                          <input
                            type="text"
                            placeholder="%"
                            name="value-type"
                            class="d-input__field d-table__footer-input d-table__footer-input--value-type"
                            data-input-id="value-type"
                            required=""
                          />
                          <button class="d-input__dropdown-button">
                            <i
                              class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                      <label for="test-dropdown" class="d-dropdown__label">От типа цены </label>
                      <div class="d-input d-input--light">
                        <input
                          type="text"
                          placeholder="Тип цен"
                          name="price-type"
                          class="d-input__field d-table__footer-input"
                          data-input-id="price-type"
                          required=""
                        />
                        <button class="d-input__dropdown-button">
                          <i class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"></i>
                        </button>
                      </div>
                    </div>

                    <button class="d-icon-wrapper d-icon-wrapper--big d-icon-wrapper--active">
                      <i class="d-icon-check"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="d-divider d-divider--black d-divider--full promotions__card-products-divider"
              ></div>

              <div class="promotions__card-warehouse">
                <div class="promotions__card-value-container promotions__card-warehouse-header">
                  <p
                    class="promotions__card-value promotions__card-value--bold promotions__card-block-title"
                  >
                    Коллекции
                  </p>
                  <span class="promotions__card-label"
                    >Загрузите список товаров и установите скидки, которые получит клиент при
                    выполнении условий акции</span
                  >
                </div>
                <button
                  class="d-button d-button-primary promotions__card-block-button promotions__card-collection-add hidden-1200"
                >
                  <i
                    class="d-icon-plus promotions__card-block-button-icon promotions__card-collection-add-icon"
                  ></i>
                  Добавить коллекцию
                </button>
                <form
                  class="d-search d-search--alt promotions__card-warehouse-search visible-1200 hidden-600"
                >
                  <i
                    class="d-icon-search-big d-search__icon promotions__card-warehouse-search-icon"
                  ></i>
                  <input type="text" placeholder="Найти коллекции" class="d-search__field" />
                  <button
                    type="button"
                    class="d-button d-button-primary d-button-primary-small box-shadow-none d-search__button"
                  >
                    <span class="hidden-800">Найти</span>
                    <i class="d-icon-search-big visible-800"></i>
                  </button>

                  <ul class="d-search__suggestions">
                    <!-- <li class="d-search__suggestion">Россия, Москва, Большой Предтеченский переулок, 13с4</li>
															<li class="d-search__suggestion">Россия, Москва, Большой Предтеченский переулок, 13с4</li>
															<li class="d-search__suggestion">Россия, Москва, Большой Предтеченский переулок, 13с4</li>
															<li class="d-search__suggestion">Россия, Москва, Большой Предтеченский переулок, 13с4</li> -->
                  </ul>
                </form>

                <button
                  class="d-button d-button-primary d-button-primary-small d-button--sm-shadow promotions__card-warehouse-settings-choose visible-600"
                >
                  <i class="d-icon-search-big"></i>
                  Добавить коллекцию
                </button>
              </div>
              <div class="promotions__card-collection-header hidden-1200">
                <h2 class="promotions__card-title">Коллекция “Купить слона”№345 43</h2>
                <div
                  class="d-divider d-divider--vertical promotions__card-collection-header-divider"
                ></div>
                <button class="d-icon-wrapper d-icon-wrapper--big">
                  <i class="d-icon-trash"></i>
                </button>
              </div>

              <div
                class="promotions__card-block-title-container promotions__card-collection-tabs-wrapper"
              >
                <div
                  class="promotions__card-label promotions__card-label--big promotions__card-collection-tabs-title visible-1200"
                >
                  Выберите коллекцию
                  <button
                    class="d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--gray promotions__card-collection-tabs-toggle"
                  >
                    <i
                      class="d-icon-angle-rounded-bottom promotions__card-collection-tabs-icon"
                    ></i>
                  </button>
                </div>
                <div class="d-tab__wrapper promotions__card-collection-tabs">
                  <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
                    <clipPath id="tab-clip-path">
                      <path
                        d="M1 0.852539V21.0004H5H10C6.85108 19.9505 5.39759 18 4 16C3.6506 15.5 2.95906 13.9504 3 13.5C3.05931 12.8476 3.01459 13.7033 3.15389 12C3.23568 11 3.1983 10.5046 2.96518 8.5C2.5 4.5 1.36169 1.68259 1 0.852539Z"
                      ></path>
                    </clipPath>
                  </svg>

                  <div class="d-tab__container">
                    <!-- NOTE: Порядок табов обратный -->
                    <button class="d-tab d-tab--more">
                      <div class="d-tab__more-content">+8 акций</div>
                      <div class="d-tab__crutch"></div>
                      <label for="test-radio1" class="d-radio d-tab__toggle">
                        <input
                          type="radio"
                          name="test-radios"
                          id="test-radio1"
                          class="d-radio__input"
                        />
                      </label>
                    </button>
                    <button class="d-tab">
                      Оснастка Интерскол (34332)
                      <div class="d-tab__crutch"></div>
                      <label for="test-radio1" class="d-radio d-tab__toggle">
                        <input
                          type="radio"
                          name="test-radios"
                          id="test-radio1"
                          class="d-radio__input"
                        />
                      </label>
                    </button>
                    <button class="d-tab">
                      Оснастка Интерскол (34332)
                      <div class="d-tab__crutch"></div>
                      <label for="test-radio1" class="d-radio d-tab__toggle">
                        <input
                          type="radio"
                          name="test-radios"
                          id="test-radio1"
                          class="d-radio__input"
                        />
                      </label>
                    </button>
                    <button class="d-tab">
                      Оснастка Интерскол (34332)
                      <div class="d-tab__crutch"></div>
                      <label for="test-radio1" class="d-radio d-tab__toggle">
                        <input
                          type="radio"
                          name="test-radios"
                          id="test-radio1"
                          class="d-radio__input"
                        />
                      </label>
                    </button>
                    <button class="d-tab">
                      Оснастка Интерскол (34332)
                      <div class="d-tab__crutch"></div>
                      <label for="test-radio1" class="d-radio d-tab__toggle">
                        <input
                          type="radio"
                          name="test-radios"
                          id="test-radio1"
                          class="d-radio__input"
                        />
                      </label>
                    </button>
                    <button class="d-tab d-tab--active">
                      Оснастка Интерскол (34332)
                      <div class="d-tab__crutch"></div>
                      <label for="test-radio1" class="d-radio d-tab__toggle">
                        <input
                          type="radio"
                          name="test-radios"
                          id="test-radio1"
                          class="d-radio__input"
                        />
                      </label>
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="d-field-container d-field-container--vertical d-field-container--long promotions__card-collection-search"
              >
                <p class="promotions__card-text">Поиск товаров по коллекции</p>
                <form class="d-search d-search--alt2">
                  <input
                    type="text"
                    placeholder="Название, артикул, бренд, тег, категория"
                    class="d-search__field"
                  />
                  <button type="submit" class="d-search__icon-button">
                    <i class="d-icon-search-big"></i>
                  </button>
                  <ul class="d-search__suggestions">
                    <!-- <li class="d-search__suggestion">
																Россия, Москва, Большой Предтеченский переулок, 13с4
															</li>
															<li class="d-search__suggestion">
																Россия, Москва, Большой Предтеченский переулок, 13с4
															</li>
															<li class="d-search__suggestion">
																Россия, Москва, Большой Предтеченский переулок, 13с4
															</li>
															<li class="d-search__suggestion">
																Россия, Москва, Большой Предтеченский переулок, 13с4
															</li> -->
                  </ul>
                </form>
              </div>

              <div class="d-table__container promotions__card-products">
                <div class="d-table__wrapper hidden-1200">
                  <div class="d-table__decoration-wrapper">
                    <div class="d-table__decoration"></div>
                  </div>

                  <table class="d-table d-table--decoration">
                    <thead class="d-table__head">
                      <tr class="d-table__row">
                        <th class="d-table__head-col d-table__head-col--big">
                          <div class="flex-center">
                            <label class="d-radio d-radio--white" id="checkbox1">
                              <input
                                type="checkbox"
                                name="checkbox1"
                                id="checkbox1"
                                class="d-radio__input"
                              />
                            </label>
                          </div>
                        </th>
                        <th class="d-table__head-col d-table__head-col--big" style="width: 20%">
                          Товар
                        </th>
                        <th class="d-table__head-col d-table__head-col--big">РРЦ</th>
                        <th class="d-table__head-col d-table__head-col--big">
                          Скидка
                          <button
                            class="d-button d-button-tertiary d-button-tertiary-small product-table-card__discount-button product-table-card__discount-button--table mt-4"
                          >
                            <i class="d-icon-mixer product-table-card__discount-button-icon"></i>
                            Настроить
                          </button>
                        </th>
                        <th class="d-table__head-col d-table__head-col--big">
                          Тип ценообразования
                        </th>
                        <th class="d-table__head-col d-table__head-col--big">
                          Цена со скидкой за шт.
                        </th>
                        <th class="d-table__head-col d-table__head-col--big">
                          Минимальное количество
                        </th>
                        <th class="d-table__head-col d-table__head-col--big">
                          Максимальное количество
                        </th>
                        <th class="d-table__head-col d-table__head-col--big">Кратность</th>
                        <th class="d-table__head-col d-table__head-col--big">
                          <div class="flex-center">
                            <button
                              class="d-icon-wrapper d-icon-wrapper--big d-icon-wrapper--white"
                            >
                              <i class="d-icon-trash d-table__icon"></i>
                            </button>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="d-table__body promotions__product-card">
                      <tr class="d-table__row">
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                      </tr>
                      <tr class="d-table__row">
                        <td class="d-table__col">
                          <div class="flex-center">
                            <label class="d-radio d-radio--black" id="checkbox2">
                              <input
                                type="checkbox"
                                name="checkbox2"
                                id="checkbox2"
                                class="d-radio__input"
                              />
                            </label>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="product-table-card">
                            <p class="product-table-card__title">
                              Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                            </p>
                            <p class="product-table-card__article">Арт: 844337</p>
                            <div class="d-badge d-badge--small">
                              <img src="/icons/spo-logo.svg" alt="" class="d-badge__img" />
                              МСТ
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="d-table__col-inner">
                            <p
                              class="promotions__card-text promotions__card-text--bold product-table-card__value"
                            >
                              2 500.00 ₽
                            </p>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center flex-center--vertical">
                            <p
                              class="promotions__card-text promotions__card-text--bold product-table-card__discount product-table-card__value"
                            >
                              30% ₽
                            </p>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center flex-center--vertical">
                            <p class="promotions__card-text promotions__card-text--bold">Скидка</p>
                            <p class="product-table-card__text">по формуле</p>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <p
                              class="promotions__card-text promotions__card-text--bold product-table-card__value"
                            >
                              1 750.00 ₽
                            </p>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <div class="d-counter" data-counter="">
                              <button class="d-counter__button" data-counter-button="decrement">
                                <i class="d-icon-minus d-counter__button-icon"></i>
                              </button>
                              <input
                                class="d-counter__input"
                                type="text"
                                name="test-counter"
                                id="test-counter"
                                value="1"
                                data-counter-input=""
                              />
                              <button class="d-counter__button" data-counter-button="increment">
                                <i class="d-icon-plus d-counter__button-icon"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <div class="d-counter" data-counter="">
                              <button class="d-counter__button" data-counter-button="decrement">
                                <i class="d-icon-minus d-counter__button-icon"></i>
                              </button>
                              <input
                                class="d-counter__input"
                                type="text"
                                name="test-counter"
                                id="test-counter"
                                value="1"
                                data-counter-input=""
                              />
                              <button class="d-counter__button" data-counter-button="increment">
                                <i class="d-icon-plus d-counter__button-icon"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <div class="d-counter" data-counter="">
                              <button class="d-counter__button" data-counter-button="decrement">
                                <i class="d-icon-minus d-counter__button-icon"></i>
                              </button>
                              <input
                                class="d-counter__input"
                                type="text"
                                name="test-counter"
                                id="test-counter"
                                value="1"
                                data-counter-input=""
                              />
                              <button class="d-counter__button" data-counter-button="increment">
                                <i class="d-icon-plus d-counter__button-icon"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <button class="d-icon-wrapper d-icon-wrapper--big">
                              <i class="d-icon-trash d-table__icon"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr class="d-table__row">
                        <td class="d-table__col">
                          <div class="flex-center">
                            <label class="d-radio d-radio--black" id="checkbox2">
                              <input
                                type="checkbox"
                                name="checkbox2"
                                id="checkbox2"
                                class="d-radio__input"
                              />
                            </label>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="product-table-card">
                            <p class="product-table-card__title">
                              Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                            </p>
                            <p class="product-table-card__article">Арт: 844337</p>
                            <div class="d-badge d-badge--small">
                              <img src="/icons/spo-logo.svg" alt="" class="d-badge__img" />
                              МСТ
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="d-table__col-inner">
                            <p
                              class="promotions__card-text promotions__card-text--bold product-table-card__value"
                            >
                              2 500.00 ₽
                            </p>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center flex-center--vertical">
                            <p
                              class="promotions__card-text promotions__card-text--bold product-table-card__discount product-table-card__value"
                            >
                              30% ₽
                            </p>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center flex-center--vertical">
                            <p class="promotions__card-text promotions__card-text--bold">Скидка</p>
                            <p class="product-table-card__text">по формуле</p>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <p
                              class="promotions__card-text promotions__card-text--bold product-table-card__value"
                            >
                              1 750.00 ₽
                            </p>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <div class="d-counter" data-counter="">
                              <button class="d-counter__button" data-counter-button="decrement">
                                <i class="d-icon-minus d-counter__button-icon"></i>
                              </button>
                              <input
                                class="d-counter__input"
                                type="text"
                                name="test-counter"
                                id="test-counter"
                                value="1"
                                data-counter-input=""
                              />
                              <button class="d-counter__button" data-counter-button="increment">
                                <i class="d-icon-plus d-counter__button-icon"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <div class="d-counter" data-counter="">
                              <button class="d-counter__button" data-counter-button="decrement">
                                <i class="d-icon-minus d-counter__button-icon"></i>
                              </button>
                              <input
                                class="d-counter__input"
                                type="text"
                                name="test-counter"
                                id="test-counter"
                                value="1"
                                data-counter-input=""
                              />
                              <button class="d-counter__button" data-counter-button="increment">
                                <i class="d-icon-plus d-counter__button-icon"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <div class="d-counter" data-counter="">
                              <button class="d-counter__button" data-counter-button="decrement">
                                <i class="d-icon-minus d-counter__button-icon"></i>
                              </button>
                              <input
                                class="d-counter__input"
                                type="text"
                                name="test-counter"
                                id="test-counter"
                                value="1"
                                data-counter-input=""
                              />
                              <button class="d-counter__button" data-counter-button="increment">
                                <i class="d-icon-plus d-counter__button-icon"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <button class="d-icon-wrapper d-icon-wrapper--big">
                              <i class="d-icon-trash d-table__icon"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="d-accordion visible-1200">
                  <div class="d-accordion__header">
                    <div class="d-product-list__header">
                      <div class="d-radio__wrapper d-product-list__all">
                        <label for="checkAll" class="d-radio__label">Выбрать все </label>
                        <label class="d-radio d-radio--white">
                          <input
                            type="checkbox"
                            name="checkAll"
                            id="checkAll"
                            class="d-radio__input"
                          />
                        </label>
                      </div>
                      <div
                        class="d-divider d-divider--vertical d-divider--light d-product-list__header-divider"
                      ></div>

                      <button
                        class="d-icon-wrapper d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--white d-product-list__header-button"
                      >
                        <i class="d-icon-angle-rounded-bottom"></i>
                      </button>
                    </div>
                  </div>
                  <div class="d-accordion__content">
                    <div class="d-product-list__content">
                      <div class="d-accordion d-product d-product--active">
                        <div class="d-product__header">
                          <div class="d-product__header-content">
                            <img
                              src="/images/product2.svg"
                              alt=""
                              class="d-product__img"
                              width="50"
                              height="52"
                            />
                            <div class="d-product__header-info-container">
                              <div class="d-product__header-info">
                                <div class="d-product__top">
                                  <div class="d-product__price">
                                    <p class="d-product__price-value">1 750.00 ₽</p>
                                    <div class="d-product__price-discount">30% ₽</div>
                                  </div>
                                  <div class="d-product__options">
                                    <div class="d-radio__wrapper d-product-list__all">
                                      <label class="d-radio d-radio--gray">
                                        <input
                                          type="checkbox"
                                          name="check1"
                                          id="check1"
                                          class="d-radio__input"
                                        />
                                      </label>
                                    </div>
                                    <div
                                      class="d-divider d-divider--vertical d-divider--black d-product-list__header-divider"
                                    ></div>
                                    <button
                                      class="d-icon-wrapper d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--gray d-product-list__header-button"
                                    >
                                      <i class="d-icon-angle-rounded-bottom"></i>
                                    </button>
                                  </div>
                                </div>
                                <p class="d-product__title">
                                  Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                                </p>
                                <p class="d-product__article">Арт: 844337</p>
                              </div>
                              <div class="d-product__multiple">
                                <p class="d-product__multiple-label">Кратность</p>
                                <div class="d-counter" data-counter="">
                                  <button class="d-counter__button" data-counter-button="decrement">
                                    <i class="d-icon-minus d-counter__button-icon"></i>
                                  </button>
                                  <input
                                    class="d-counter__input"
                                    type="text"
                                    name="test-counter"
                                    id="test-counter"
                                    value="1"
                                    data-counter-input=""
                                  />
                                  <button class="d-counter__button" data-counter-button="increment">
                                    <i class="d-icon-plus d-counter__button-icon"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <button class="d-product__delete">
                            <i class="d-icon-trash d-product__delete-icon"></i>
                          </button>
                        </div>
                        <div class="d-accordion__content">
                          <div class="d-product__content">
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">РРЦ</p>
                              <div class="d-product__parameter-value">
                                <p class="d-product__price-text">1 750.00 ₽</p>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Скидка</p>
                              <div class="d-product__parameter-value">
                                <div class="d-product__parameter-value-inner">
                                  <p class="d-product__price-text">30% ₽</p>
                                  <div class="d-divider d-divider--vertical d-divider--black"></div>
                                  <div
                                    class="d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--black"
                                  >
                                    <i class="d-icon-mixer"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Тип ценообразования</p>
                              <div class="d-product__parameter-value">
                                <p class="d-product__parameter-text">
                                  <span class="d-product__parameter-strong">Скидка</span
                                  ><br class="visible-320" />
                                  по формуле
                                </p>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Цена с скидкой за шт.</p>
                              <div class="d-product__parameter-value">
                                <p class="d-product__price-text d-product__price-text--big">
                                  1 750.00 ₽
                                </p>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Минимальное количество</p>
                              <div class="d-product__parameter-value">
                                <div class="d-counter" data-counter="">
                                  <button class="d-counter__button" data-counter-button="decrement">
                                    <i class="d-icon-minus d-counter__button-icon"></i>
                                  </button>
                                  <input
                                    class="d-counter__input"
                                    type="text"
                                    name="test-counter"
                                    id="test-counter"
                                    value="1"
                                    data-counter-input=""
                                  />
                                  <button class="d-counter__button" data-counter-button="increment">
                                    <i class="d-icon-plus d-counter__button-icon"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Максимальное количество</p>
                              <div class="d-product__parameter-value">
                                <div class="d-counter" data-counter="">
                                  <button class="d-counter__button" data-counter-button="decrement">
                                    <i class="d-icon-minus d-counter__button-icon"></i>
                                  </button>
                                  <input
                                    class="d-counter__input"
                                    type="text"
                                    name="test-counter"
                                    id="test-counter"
                                    value="1"
                                    data-counter-input=""
                                  />
                                  <button class="d-counter__button" data-counter-button="increment">
                                    <i class="d-icon-plus d-counter__button-icon"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Кратность</p>
                              <div class="d-product__parameter-value">
                                <div class="d-counter" data-counter="">
                                  <button class="d-counter__button" data-counter-button="decrement">
                                    <i class="d-icon-minus d-counter__button-icon"></i>
                                  </button>
                                  <input
                                    class="d-counter__input"
                                    type="text"
                                    name="test-counter"
                                    id="test-counter"
                                    value="1"
                                    data-counter-input=""
                                  />
                                  <button class="d-counter__button" data-counter-button="increment">
                                    <i class="d-icon-plus d-counter__button-icon"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="d-accordion d-product">
                        <div class="d-accordion__header">
                          <div class="d-product__header">
                            <div class="d-product__header-content">
                              <img
                                src="/images/product2.svg"
                                alt=""
                                class="d-product__img"
                                width="50"
                                height="52"
                              />
                              <div class="d-product__header-info-container">
                                <div class="d-product__header-info">
                                  <div class="d-product__top">
                                    <div class="d-product__price">
                                      <p class="d-product__price-value">1 750.00 ₽</p>
                                      <div class="d-product__price-discount">30% ₽</div>
                                    </div>
                                    <div class="d-product__options">
                                      <div class="d-radio__wrapper d-product-list__all">
                                        <label class="d-radio d-radio--gray">
                                          <input
                                            type="checkbox"
                                            name="check1"
                                            id="check1"
                                            class="d-radio__input"
                                          />
                                        </label>
                                      </div>
                                      <div
                                        class="d-divider d-divider--vertical d-divider--black d-product-list__header-divider"
                                      ></div>
                                      <button
                                        class="d-icon-wrapper d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--gray d-product-list__header-button"
                                      >
                                        <i class="d-icon-angle-rounded-bottom"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <p class="d-product__title">
                                    Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                                  </p>
                                  <p class="d-product__article">Арт: 844337</p>
                                </div>
                                <div class="d-product__multiple">
                                  <p class="d-product__multiple-label">Кратность</p>
                                  <div class="d-counter" data-counter="">
                                    <button
                                      class="d-counter__button"
                                      data-counter-button="decrement"
                                    >
                                      <i class="d-icon-minus d-counter__button-icon"></i>
                                    </button>
                                    <input
                                      class="d-counter__input"
                                      type="text"
                                      name="test-counter"
                                      id="test-counter"
                                      value="1"
                                      data-counter-input=""
                                    />
                                    <button
                                      class="d-counter__button"
                                      data-counter-button="increment"
                                    >
                                      <i class="d-icon-plus d-counter__button-icon"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button class="d-product__delete">
                              <i class="d-icon-trash d-product__delete-icon"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="d-accordion d-product">
                        <div class="d-accordion__header">
                          <div class="d-product__header">
                            <div class="d-product__header-content">
                              <img
                                src="/images/product2.svg"
                                alt=""
                                class="d-product__img"
                                width="50"
                                height="52"
                              />
                              <div class="d-product__header-info-container">
                                <div class="d-product__header-info">
                                  <div class="d-product__top">
                                    <div class="d-product__price">
                                      <p class="d-product__price-value">1 750.00 ₽</p>
                                      <div class="d-product__price-discount">30% ₽</div>
                                    </div>
                                    <div class="d-product__options">
                                      <div class="d-radio__wrapper d-product-list__all">
                                        <label class="d-radio d-radio--gray">
                                          <input
                                            type="checkbox"
                                            name="check1"
                                            id="check1"
                                            class="d-radio__input"
                                          />
                                        </label>
                                      </div>
                                      <div
                                        class="d-divider d-divider--vertical d-divider--black d-product-list__header-divider"
                                      ></div>
                                      <button
                                        class="d-icon-wrapper d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--gray d-product-list__header-button"
                                      >
                                        <i class="d-icon-angle-rounded-bottom"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <p class="d-product__title">
                                    Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                                  </p>
                                  <p class="d-product__article">Арт: 844337</p>
                                </div>
                                <div class="d-product__multiple">
                                  <p class="d-product__multiple-label">Кратность</p>
                                  <div class="d-counter" data-counter="">
                                    <button
                                      class="d-counter__button"
                                      data-counter-button="decrement"
                                    >
                                      <i class="d-icon-minus d-counter__button-icon"></i>
                                    </button>
                                    <input
                                      class="d-counter__input"
                                      type="text"
                                      name="test-counter"
                                      id="test-counter"
                                      value="1"
                                      data-counter-input=""
                                    />
                                    <button
                                      class="d-counter__button"
                                      data-counter-button="increment"
                                    >
                                      <i class="d-icon-plus d-counter__button-icon"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button class="d-product__delete">
                              <i class="d-icon-trash d-product__delete-icon"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-table__footer">
                  <div class="d-table__footer-content">
                    <div class="d-table__footer-content-inner">
                      <div class="d-table__footer-left">
                        <div class="d-table__mark">Отмечено 0 из 3</div>
                        <div
                          class="d-divider d-divider--vertical d-divider--big d-divider--black hidden-800"
                        ></div>
                        <div class="d-field-wrapper d-table__footer-all">
                          <label class="d-switch" for="products1">
                            <input
                              type="checkbox"
                              name="products1"
                              id="products1"
                              class="d-switch__input"
                            />
                            <div class="d-switch__circle"></div>
                          </label>
                          <label for="products1" class="d-switch__label d-table__footer-all-label"
                            >Выбрать все элементы на всех страницах
                          </label>
                        </div>
                      </div>
                      <div class="d-table__footer-right">
                        <ul class="d-pagination d-table__footer-right-pagination">
                          <li class="d-pagination__item">1</li>
                          <li class="d-pagination__item">2</li>
                          <li class="d-pagination__item">3</li>
                          <li class="d-pagination__item d-pagination__item--active">4</li>
                          <li class="d-pagination__item">+</li>
                        </ul>
                        <button class="d-select hidden-1200">
                          <span class="d-select__title">Задать вручную</span>
                          <i class="d-icon-angle-rounded-bottom d-select__arrow"></i>
                        </button>
                        <button class="d-select d-select--squared visible-1200">
                          <span class="d-select__title">Задать вручную</span>
                          <i class="d-icon-angle-rounded-bottom d-select__arrow"></i>
                        </button>
                      </div>
                    </div>
                    <ul class="d-pagination d-table__footer-pagination">
                      <li class="d-pagination__item">1</li>
                      <li class="d-pagination__item">2</li>
                      <li class="d-pagination__item">3</li>
                      <li class="d-pagination__item d-pagination__item--active">4</li>
                      <li class="d-pagination__item">+</li>
                    </ul>

                    <button
                      class="d-button d-button-secondary d-button-secondary-small d-button--sm-shadow d-table__mass"
                    >
                      Массовые действия
                      <i class="d-icon-plus d-table__mass-icon"></i>
                    </button>
                  </div>

                  <div
                    class="d-field-container d-field-container--long d-table__footer-fields hidden-1200"
                  >
                    <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                      <label for="manual" class="d-dropdown__label">Массовые действия </label>
                      <div class="d-input d-input--light">
                        <input
                          type="text"
                          placeholder="Задать вручную"
                          name="manual"
                          class="d-input__field d-table__footer-input"
                          data-input-id="manual"
                          required=""
                        />
                        <button class="d-input__dropdown-button">
                          <i class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                      <label for="extra-charge" class="d-dropdown__label"
                        >Тип ценообразования
                      </label>
                      <div class="d-input d-input--light">
                        <input
                          type="text"
                          placeholder="Наценка"
                          name="extra-charge"
                          class="d-input__field d-table__footer-input"
                          data-input-id="extra-charge"
                          required=""
                        />
                        <button class="d-input__dropdown-button">
                          <i class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                      <label for="value" class="d-dropdown__label">Значение </label>
                      <div class="d-field-container d-field-container--long">
                        <div class="d-input d-input--light">
                          <input
                            type="text"
                            placeholder="0"
                            name="value"
                            class="d-input__field d-table__footer-input d-table__footer-input--value"
                            data-input-id="value"
                            required=""
                          />
                        </div>
                        <div class="d-input d-input--light">
                          <input
                            type="text"
                            placeholder="%"
                            name="value-type"
                            class="d-input__field d-table__footer-input d-table__footer-input--value-type"
                            data-input-id="value-type"
                            required=""
                          />
                          <button class="d-input__dropdown-button">
                            <i
                              class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                      <label for="test-dropdown" class="d-dropdown__label">От типа цены </label>
                      <div class="d-input d-input--light">
                        <input
                          type="text"
                          placeholder="Тип цен"
                          name="price-type"
                          class="d-input__field d-table__footer-input"
                          data-input-id="price-type"
                          required=""
                        />
                        <button class="d-input__dropdown-button">
                          <i class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"></i>
                        </button>
                      </div>
                    </div>

                    <button class="d-icon-wrapper d-icon-wrapper--big d-icon-wrapper--active">
                      <i class="d-icon-check"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="d-divider d-divider--black d-divider--full promotions__card-products-divider"
              ></div>

              <div class="promotions__card-warehouse promotions__complects-header">
                <div class="promotions__card-value-container promotions__card-warehouse-header">
                  <p
                    class="promotions__card-value promotions__card-value--bold promotions__card-block-title"
                  >
                    Комлпекты
                  </p>
                  <span class="promotions__card-label"
                    >Добавьте товары, которые продаются комплектом, и настройте условия их
                    сочетания</span
                  >
                </div>

                <div class="promotions__complects-header-right">
                  <form class="d-search d-search--alt promotions__card-warehouse-search hidden-600">
                    <i
                      class="d-icon-search-big d-search__icon promotions__card-warehouse-search-icon"
                    ></i>
                    <input type="text" placeholder="Название или артикул" class="d-search__field" />
                    <button
                      type="button"
                      class="d-button d-button-primary d-button-primary-small box-shadow-none d-search__button"
                    >
                      <span class="hidden-800">Найти</span>
                      <i class="d-icon-search-big visible-800"></i>
                    </button>

                    <ul class="d-search__suggestions">
                      <!-- <li class="d-search__suggestion">Россия, Москва, Большой Предтеченский переулок, 13с4</li>
																<li class="d-search__suggestion">Россия, Москва, Большой Предтеченский переулок, 13с4</li>
																<li class="d-search__suggestion">Россия, Москва, Большой Предтеченский переулок, 13с4</li>
																<li class="d-search__suggestion">Россия, Москва, Большой Предтеченский переулок, 13с4</li> -->
                    </ul>
                  </form>

                  <div class="promotions__complects-search visible-600">
                    <button
                      class="d-button d-button-primary d-button-primary-small d-button--sm-shadow promotions__complects-header-search-button"
                    >
                      <i class="d-icon-search-big"></i>
                      Найти коллекцию
                    </button>
                    <div class="d-divider d-divider--vertical d-divider--full d-divider--big"></div>
                    <button
                      class="d-button d-button-secondary d-button-secondary-small d-button-rounded promotions__complects-add-button"
                    >
                      <i class="d-icon-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="promotions__card-block-title-container promotions__card-collection-tabs-wrapper promotions__complects-tabs-wrapper"
              >
                <span class="promotions__card-label promotions__card-label--big visible-1200"
                  >Выберите комплекты</span
                >
                <div class="d-tab__wrapper promotions__card-collection-tabs">
                  <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
                    <clipPath id="tab-clip-path">
                      <path
                        d="M1 0.852539V21.0004H5H10C6.85108 19.9505 5.39759 18 4 16C3.6506 15.5 2.95906 13.9504 3 13.5C3.05931 12.8476 3.01459 13.7033 3.15389 12C3.23568 11 3.1983 10.5046 2.96518 8.5C2.5 4.5 1.36169 1.68259 1 0.852539Z"
                      ></path>
                    </clipPath>
                  </svg>

                  <div class="d-tab__container">
                    <!-- NOTE: Порядок табов обратный -->
                    <button class="d-tab d-tab--more">
                      <div class="d-tab__more-content">+8 акций</div>
                      <div class="d-tab__crutch"></div>
                    </button>
                    <button class="d-tab">
                      Оснастка Интерскол (34332)
                      <div class="d-tab__crutch"></div>
                    </button>
                    <button class="d-tab">
                      Оснастка Интерскол (34332)
                      <div class="d-tab__crutch"></div>
                    </button>
                    <button class="d-tab">
                      Оснастка Интерскол (34332)
                      <div class="d-tab__crutch"></div>
                    </button>
                    <button class="d-tab">
                      Оснастка Интерскол (34332)
                      <div class="d-tab__crutch"></div>
                    </button>
                    <button class="d-tab d-tab--active">
                      Оснастка Интерскол (34332)
                      <div class="d-tab__crutch"></div>
                    </button>
                  </div>
                </div>
              </div>

              <div class="d-table__container promotions__card-products">
                <div class="d-table__wrapper hidden-1200">
                  <div class="d-table__decoration-wrapper">
                    <div class="d-table__decoration"></div>
                  </div>

                  <table class="d-table">
                    <thead class="d-table__head">
                      <tr class="d-table__row">
                        <th class="d-table__head-col">
                          <div class="flex-center">
                            <label class="d-radio d-radio--white" id="checkbox1">
                              <input
                                type="checkbox"
                                name="checkbox1"
                                id="checkbox1"
                                class="d-radio__input"
                              />
                            </label>
                          </div>
                        </th>
                        <th class="d-table__head-col" style="width: 20%">Товар</th>
                        <th class="d-table__head-col">РРЦ</th>
                        <th class="d-table__head-col">Скидка</th>
                        <th class="d-table__head-col">Тип ценообразования</th>
                        <th class="d-table__head-col">Цена со скидкой за шт.</th>
                        <th class="d-table__head-col">Минимальное количество</th>
                        <th class="d-table__head-col">Максимальное количество</th>
                        <th class="d-table__head-col">Кратность</th>
                        <th class="d-table__head-col">
                          <div class="flex-center">
                            <button
                              class="d-icon-wrapper d-icon-wrapper--big d-icon-wrapper--white"
                            >
                              <i class="d-icon-trash d-table__icon"></i>
                            </button>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="d-table__body promotions__product-card">
                      <tr class="d-table__row">
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                        <td class="d-table__col"></td>
                      </tr>
                      <tr class="d-table__row">
                        <td class="d-table__col">
                          <div class="flex-center">
                            <label class="d-radio d-radio--black" id="checkbox2">
                              <input
                                type="checkbox"
                                name="checkbox2"
                                id="checkbox2"
                                class="d-radio__input"
                              />
                            </label>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="product-table-card">
                            <p class="product-table-card__title">
                              Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                            </p>
                            <p class="product-table-card__article">Арт: 844337</p>
                            <div class="d-badge d-badge--small">
                              <img src="/icons/spo-logo.svg" alt="" class="d-badge__img" />
                              МСТ
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="d-table__col-inner">
                            <p
                              class="promotions__card-text promotions__card-text--bold product-table-card__value"
                            >
                              2 500.00 ₽
                            </p>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center flex-center--vertical">
                            <p
                              class="promotions__card-text promotions__card-text--bold product-table-card__discount product-table-card__value"
                            >
                              30% ₽
                            </p>
                            <button
                              class="d-button d-button-tertiary d-button-tertiary-small product-table-card__discount-button"
                            >
                              <i class="d-icon-mixer product-table-card__discount-button-icon"></i>
                              Настроить
                            </button>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center flex-center--vertical">
                            <p class="promotions__card-text promotions__card-text--bold">Скидка</p>
                            <p class="product-table-card__text">по формуле</p>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <p
                              class="promotions__card-text promotions__card-text--bold product-table-card__value"
                            >
                              1 750.00 ₽
                            </p>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <div class="d-counter" data-counter="">
                              <button class="d-counter__button" data-counter-button="decrement">
                                <i class="d-icon-minus d-counter__button-icon"></i>
                              </button>
                              <input
                                class="d-counter__input"
                                type="text"
                                name="test-counter"
                                id="test-counter"
                                value="1"
                                data-counter-input=""
                              />
                              <button class="d-counter__button" data-counter-button="increment">
                                <i class="d-icon-plus d-counter__button-icon"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <div class="d-counter" data-counter="">
                              <button class="d-counter__button" data-counter-button="decrement">
                                <i class="d-icon-minus d-counter__button-icon"></i>
                              </button>
                              <input
                                class="d-counter__input"
                                type="text"
                                name="test-counter"
                                id="test-counter"
                                value="1"
                                data-counter-input=""
                              />
                              <button class="d-counter__button" data-counter-button="increment">
                                <i class="d-icon-plus d-counter__button-icon"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <div class="d-counter" data-counter="">
                              <button class="d-counter__button" data-counter-button="decrement">
                                <i class="d-icon-minus d-counter__button-icon"></i>
                              </button>
                              <input
                                class="d-counter__input"
                                type="text"
                                name="test-counter"
                                id="test-counter"
                                value="1"
                                data-counter-input=""
                              />
                              <button class="d-counter__button" data-counter-button="increment">
                                <i class="d-icon-plus d-counter__button-icon"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <button class="d-icon-wrapper d-icon-wrapper--big">
                              <i class="d-icon-trash d-table__icon"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr class="d-table__row">
                        <td class="d-table__col">
                          <div class="flex-center">
                            <label class="d-radio d-radio--black" id="checkbox2">
                              <input
                                type="checkbox"
                                name="checkbox2"
                                id="checkbox2"
                                class="d-radio__input"
                              />
                            </label>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="product-table-card">
                            <p class="product-table-card__title">
                              Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                            </p>
                            <p class="product-table-card__article">Арт: 844337</p>
                            <div class="d-badge d-badge--small">
                              <img src="/icons/spo-logo.svg" alt="" class="d-badge__img" />
                              МСТ
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="d-table__col-inner">
                            <p
                              class="promotions__card-text promotions__card-text--bold product-table-card__value"
                            >
                              2 500.00 ₽
                            </p>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center flex-center--vertical">
                            <p
                              class="promotions__card-text promotions__card-text--bold product-table-card__discount product-table-card__value"
                            >
                              30% ₽
                            </p>
                            <button
                              class="d-button d-button-tertiary d-button-tertiary-small product-table-card__discount-button"
                            >
                              <i class="d-icon-mixer product-table-card__discount-button-icon"></i>
                              Настроить
                            </button>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center flex-center--vertical">
                            <p class="promotions__card-text promotions__card-text--bold">Скидка</p>
                            <p class="product-table-card__text">по формуле</p>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <p
                              class="promotions__card-text promotions__card-text--bold product-table-card__value"
                            >
                              1 750.00 ₽
                            </p>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <div class="d-counter" data-counter="">
                              <button class="d-counter__button" data-counter-button="decrement">
                                <i class="d-icon-minus d-counter__button-icon"></i>
                              </button>
                              <input
                                class="d-counter__input"
                                type="text"
                                name="test-counter"
                                id="test-counter"
                                value="1"
                                data-counter-input=""
                              />
                              <button class="d-counter__button" data-counter-button="increment">
                                <i class="d-icon-plus d-counter__button-icon"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <div class="d-counter" data-counter="">
                              <button class="d-counter__button" data-counter-button="decrement">
                                <i class="d-icon-minus d-counter__button-icon"></i>
                              </button>
                              <input
                                class="d-counter__input"
                                type="text"
                                name="test-counter"
                                id="test-counter"
                                value="1"
                                data-counter-input=""
                              />
                              <button class="d-counter__button" data-counter-button="increment">
                                <i class="d-icon-plus d-counter__button-icon"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <div class="d-counter" data-counter="">
                              <button class="d-counter__button" data-counter-button="decrement">
                                <i class="d-icon-minus d-counter__button-icon"></i>
                              </button>
                              <input
                                class="d-counter__input"
                                type="text"
                                name="test-counter"
                                id="test-counter"
                                value="1"
                                data-counter-input=""
                              />
                              <button class="d-counter__button" data-counter-button="increment">
                                <i class="d-icon-plus d-counter__button-icon"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="d-table__col">
                          <div class="flex-center">
                            <button class="d-icon-wrapper d-icon-wrapper--big">
                              <i class="d-icon-trash d-table__icon"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="d-accordion visible-1200">
                  <div class="d-accordion__header">
                    <div class="d-product-list__header">
                      <div class="d-radio__wrapper d-product-list__all">
                        <label for="checkAll" class="d-radio__label">Выбрать все </label>
                        <label class="d-radio d-radio--white">
                          <input
                            type="checkbox"
                            name="checkAll"
                            id="checkAll"
                            class="d-radio__input"
                          />
                        </label>
                      </div>
                      <div
                        class="d-divider d-divider--vertical d-divider--light d-product-list__header-divider"
                      ></div>

                      <button
                        class="d-icon-wrapper d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--white d-product-list__header-button"
                      >
                        <i class="d-icon-angle-rounded-bottom"></i>
                      </button>
                    </div>
                  </div>
                  <div class="d-accordion__content">
                    <div class="d-product-list__content">
                      <div class="d-accordion d-product d-product--active">
                        <div class="d-accordion__header">
                          <div class="d-product__header">
                            <div class="d-product__header-content">
                              <img
                                src="/images/product2.svg"
                                alt=""
                                class="d-product__img"
                                width="50"
                                height="52"
                              />
                              <div class="d-product__header-info-container">
                                <div class="d-product__header-info">
                                  <div class="d-product__top">
                                    <div class="d-product__price">
                                      <p class="d-product__price-value">1 750.00 ₽</p>
                                      <div class="d-product__price-discount">30% ₽</div>
                                    </div>
                                    <div class="d-product__options">
                                      <div class="d-radio__wrapper d-product-list__all">
                                        <label class="d-radio d-radio--gray">
                                          <input
                                            type="checkbox"
                                            name="check1"
                                            id="check1"
                                            class="d-radio__input"
                                          />
                                        </label>
                                      </div>
                                      <div
                                        class="d-divider d-divider--vertical d-divider--black d-product-list__header-divider"
                                      ></div>
                                      <button
                                        class="d-icon-wrapper d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--gray d-product-list__header-button"
                                      >
                                        <i class="d-icon-angle-rounded-bottom"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <p class="d-product__title">
                                    Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                                  </p>
                                  <p class="d-product__article">Арт: 844337</p>
                                </div>
                                <div class="d-product__multiple">
                                  <p class="d-product__multiple-label">Кратность</p>
                                  <div class="d-counter" data-counter="">
                                    <button
                                      class="d-counter__button"
                                      data-counter-button="decrement"
                                    >
                                      <i class="d-icon-minus d-counter__button-icon"></i>
                                    </button>
                                    <input
                                      class="d-counter__input"
                                      type="text"
                                      name="test-counter"
                                      id="test-counter"
                                      value="1"
                                      data-counter-input=""
                                    />
                                    <button
                                      class="d-counter__button"
                                      data-counter-button="increment"
                                    >
                                      <i class="d-icon-plus d-counter__button-icon"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button class="d-product__delete">
                              <i class="d-icon-trash d-product__delete-icon"></i>
                            </button>
                          </div>
                        </div>
                        <div class="d-accordion__content">
                          <div class="d-product__content">
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">РРЦ</p>
                              <div class="d-product__parameter-value">
                                <p class="d-product__price-text">1 750.00 ₽</p>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Скидка</p>
                              <div class="d-product__parameter-value">
                                <div class="d-product__parameter-value-inner">
                                  <p class="d-product__price-text">30% ₽</p>
                                  <div class="d-divider d-divider--vertical d-divider--black"></div>
                                  <div
                                    class="d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--black"
                                  >
                                    <i class="d-icon-mixer"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Тип ценообразования</p>
                              <div class="d-product__parameter-value">
                                <p class="d-product__parameter-text">
                                  <span class="d-product__parameter-strong">Скидка</span
                                  ><br class="visible-320" />
                                  по формуле
                                </p>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Цена с скидкой за шт.</p>
                              <div class="d-product__parameter-value">
                                <p class="d-product__price-text d-product__price-text--big">
                                  1 750.00 ₽
                                </p>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Минимальное количество</p>
                              <div class="d-product__parameter-value">
                                <div class="d-counter" data-counter="">
                                  <button class="d-counter__button" data-counter-button="decrement">
                                    <i class="d-icon-minus d-counter__button-icon"></i>
                                  </button>
                                  <input
                                    class="d-counter__input"
                                    type="text"
                                    name="test-counter"
                                    id="test-counter"
                                    value="1"
                                    data-counter-input=""
                                  />
                                  <button class="d-counter__button" data-counter-button="increment">
                                    <i class="d-icon-plus d-counter__button-icon"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Максимальное количество</p>
                              <div class="d-product__parameter-value">
                                <div class="d-counter" data-counter="">
                                  <button class="d-counter__button" data-counter-button="decrement">
                                    <i class="d-icon-minus d-counter__button-icon"></i>
                                  </button>
                                  <input
                                    class="d-counter__input"
                                    type="text"
                                    name="test-counter"
                                    id="test-counter"
                                    value="1"
                                    data-counter-input=""
                                  />
                                  <button class="d-counter__button" data-counter-button="increment">
                                    <i class="d-icon-plus d-counter__button-icon"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="d-product__parameter">
                              <p class="d-product__parameter-title">Кратность</p>
                              <div class="d-product__parameter-value">
                                <div class="d-counter" data-counter="">
                                  <button class="d-counter__button" data-counter-button="decrement">
                                    <i class="d-icon-minus d-counter__button-icon"></i>
                                  </button>
                                  <input
                                    class="d-counter__input"
                                    type="text"
                                    name="test-counter"
                                    id="test-counter"
                                    value="1"
                                    data-counter-input=""
                                  />
                                  <button class="d-counter__button" data-counter-button="increment">
                                    <i class="d-icon-plus d-counter__button-icon"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="d-accordion d-product">
                        <div class="d-accordion__header">
                          <div class="d-product__header">
                            <div class="d-product__header-content">
                              <img
                                src="/images/product2.svg"
                                alt=""
                                class="d-product__img"
                                width="50"
                                height="52"
                              />
                              <div class="d-product__header-info-container">
                                <div class="d-product__header-info">
                                  <div class="d-product__top">
                                    <div class="d-product__price">
                                      <p class="d-product__price-value">1 750.00 ₽</p>
                                      <div class="d-product__price-discount">30% ₽</div>
                                    </div>
                                    <div class="d-product__options">
                                      <div class="d-radio__wrapper d-product-list__all">
                                        <label class="d-radio d-radio--gray">
                                          <input
                                            type="checkbox"
                                            name="check1"
                                            id="check1"
                                            class="d-radio__input"
                                          />
                                        </label>
                                      </div>
                                      <div
                                        class="d-divider d-divider--vertical d-divider--black d-product-list__header-divider"
                                      ></div>
                                      <button
                                        class="d-icon-wrapper d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--gray d-product-list__header-button"
                                      >
                                        <i class="d-icon-angle-rounded-bottom"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <p class="d-product__title">
                                    Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                                  </p>
                                  <p class="d-product__article">Арт: 844337</p>
                                </div>
                                <div class="d-product__multiple">
                                  <p class="d-product__multiple-label">Кратность</p>
                                  <div class="d-counter" data-counter="">
                                    <button
                                      class="d-counter__button"
                                      data-counter-button="decrement"
                                    >
                                      <i class="d-icon-minus d-counter__button-icon"></i>
                                    </button>
                                    <input
                                      class="d-counter__input"
                                      type="text"
                                      name="test-counter"
                                      id="test-counter"
                                      value="1"
                                      data-counter-input=""
                                    />
                                    <button
                                      class="d-counter__button"
                                      data-counter-button="increment"
                                    >
                                      <i class="d-icon-plus d-counter__button-icon"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button class="d-product__delete">
                              <i class="d-icon-trash d-product__delete-icon"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="d-accordion d-product">
                        <div class="d-accordion__header">
                          <div class="d-product__header">
                            <div class="d-product__header-content">
                              <img
                                src="/images/product2.svg"
                                alt=""
                                class="d-product__img"
                                width="50"
                                height="52"
                              />
                              <div class="d-product__header-info">
                                <div class="d-product__price">
                                  <p class="d-product__price-value">1 750.00 ₽</p>
                                  <div class="d-product__price-discount">30% ₽</div>
                                </div>
                                <p class="d-product__title">
                                  Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                                </p>
                                <p class="d-product__article">Арт: 844337</p>
                              </div>
                            </div>
                            <div class="d-product__options">
                              <div class="d-radio__wrapper d-product-list__all">
                                <label class="d-radio d-radio--gray">
                                  <input
                                    type="checkbox"
                                    name="check1"
                                    id="check1"
                                    class="d-radio__input"
                                  />
                                </label>
                              </div>
                              <div
                                class="d-divider d-divider--vertical d-divider--black d-product-list__header-divider--long"
                              ></div>
                              <button
                                class="d-icon-wrapper d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--gray d-product-list__header-button"
                              >
                                <i class="d-icon-angle-rounded-bottom"></i>
                              </button>
                            </div>

                            <button class="d-product__delete">
                              <i class="d-icon-trash d-product__delete-icon"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-table__footer">
                  <div class="d-table__footer-content">
                    <div class="d-table__footer-content-inner">
                      <div class="d-table__footer-left">
                        <div class="d-table__mark">Отмечено 0 из 3</div>
                        <div
                          class="d-divider d-divider--vertical d-divider--big d-divider--black hidden-800"
                        ></div>
                        <div class="d-field-wrapper d-table__footer-all">
                          <label class="d-switch" for="products1">
                            <input
                              type="checkbox"
                              name="products1"
                              id="products1"
                              class="d-switch__input"
                            />
                            <div class="d-switch__circle"></div>
                          </label>
                          <label for="products1" class="d-switch__label d-table__footer-all-label"
                            >Выбрать все элементы на всех страницах
                          </label>
                        </div>
                      </div>
                      <div class="d-table__footer-right">
                        <ul class="d-pagination d-table__footer-right-pagination">
                          <li class="d-pagination__item">1</li>
                          <li class="d-pagination__item">2</li>
                          <li class="d-pagination__item">3</li>
                          <li class="d-pagination__item d-pagination__item--active">4</li>
                          <li class="d-pagination__item">+</li>
                        </ul>
                        <button class="d-select hidden-1200">
                          <span class="d-select__title">Задать вручную</span>
                          <i class="d-icon-angle-rounded-bottom d-select__arrow"></i>
                        </button>
                        <button class="d-select d-select--squared visible-1200">
                          <span class="d-select__title">Задать вручную</span>
                          <i class="d-icon-angle-rounded-bottom d-select__arrow"></i>
                        </button>
                      </div>
                    </div>
                    <ul class="d-pagination d-table__footer-pagination">
                      <li class="d-pagination__item">1</li>
                      <li class="d-pagination__item">2</li>
                      <li class="d-pagination__item">3</li>
                      <li class="d-pagination__item d-pagination__item--active">4</li>
                      <li class="d-pagination__item">+</li>
                    </ul>

                    <button
                      class="d-button d-button-secondary d-button-secondary-small d-button--sm-shadow d-table__mass"
                    >
                      Массовые действия
                      <i class="d-icon-plus d-table__mass-icon"></i>
                    </button>
                  </div>

                  <div
                    class="d-field-container d-field-container--long d-table__footer-fields hidden-1200"
                  >
                    <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                      <label for="manual" class="d-dropdown__label">Массовые действия </label>
                      <div class="d-input d-input--light">
                        <input
                          type="text"
                          placeholder="Задать вручную"
                          name="manual"
                          class="d-input__field d-table__footer-input"
                          data-input-id="manual"
                          required=""
                        />
                        <button class="d-input__dropdown-button">
                          <i class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                      <label for="extra-charge" class="d-dropdown__label"
                        >Тип ценообразования
                      </label>
                      <div class="d-input d-input--light">
                        <input
                          type="text"
                          placeholder="Наценка"
                          name="extra-charge"
                          class="d-input__field d-table__footer-input"
                          data-input-id="extra-charge"
                          required=""
                        />
                        <button class="d-input__dropdown-button">
                          <i class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                      <label for="value" class="d-dropdown__label">Значение </label>
                      <div class="d-field-container d-field-container--long">
                        <div class="d-input d-input--light">
                          <input
                            type="text"
                            placeholder="0"
                            name="value"
                            class="d-input__field d-table__footer-input d-table__footer-input--value"
                            data-input-id="value"
                            required=""
                          />
                        </div>
                        <div class="d-input d-input--light">
                          <input
                            type="text"
                            placeholder="%"
                            name="value-type"
                            class="d-input__field d-table__footer-input d-table__footer-input--value-type"
                            data-input-id="value-type"
                            required=""
                          />
                          <button class="d-input__dropdown-button">
                            <i
                              class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                      <label for="test-dropdown" class="d-dropdown__label">От типа цены </label>
                      <div class="d-input d-input--light">
                        <input
                          type="text"
                          placeholder="Тип цен"
                          name="price-type"
                          class="d-input__field d-table__footer-input"
                          data-input-id="price-type"
                          required=""
                        />
                        <button class="d-input__dropdown-button">
                          <i class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"></i>
                        </button>
                      </div>
                    </div>

                    <button class="d-icon-wrapper d-icon-wrapper--big d-icon-wrapper--active">
                      <i class="d-icon-check"></i>
                    </button>
                  </div>
                </div>
              </div>
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
              <p class="d-modal2__title promo-modal__header-title">
                Мастер создания акций
              </p>
              <p class="d-modal2__description promo-modal__header-description">
                Создайте акцию в несколько этапов
              </p>
            </div>
            <div class="d-divider d-divider--vertical d-divider--black promo-modal__header-divider"></div>
            <span class="d-button d-button-tertiary box-shadow-none promo-modal__header-button" v-if="masterStep == 1">
              <i class="d-icon-lines"></i>
              Контент акции
            </span>
            <span class="d-button d-button-tertiary box-shadow-none promo-modal__header-button" v-if="masterStep == 2">
              <i class="d-icon-calendar"></i>
              Даты проведения акции
            </span>
            <span class="d-button d-button-tertiary box-shadow-none promo-modal__header-button" v-if="masterStep == 3">
              <i class="d-icon-picture"></i>
              Баннер акции
            </span>
            <span class="d-button d-button-tertiary box-shadow-none promo-modal__header-button" v-if="masterStep == 4">
              <i class="d-icon-wallet"></i>
              Условия оплаты
            </span>
            <span class="d-button d-button-tertiary box-shadow-none promo-modal__header-button" v-if="masterStep == 5">
              <i class="d-icon-truck"></i>
              Условия доставки
            </span>
            <span class="d-button d-button-tertiary box-shadow-none promo-modal__header-button" v-if="masterStep == 6">
              <i class="d-icon-percent"></i>
              Условия участия в акции: Требования к заказу
            </span>
            <span class="d-button d-button-tertiary box-shadow-none promo-modal__header-button" v-if="masterStep == 7">
              <i class="d-icon-percent"></i>
              Условия участия в акции: Совместимость
            </span>
            <span class="d-button d-button-tertiary box-shadow-none promo-modal__header-button" v-if="masterStep == 8">
              <i class="d-icon-user-star"></i>
              Аудитория акции
            </span>
            <span class="d-button d-button-tertiary box-shadow-none promo-modal__header-button" v-if="masterStep == 9">
              <i class="d-icon-cube"></i>
              Товары и скидки: Склады
            </span>
            <span class="d-button d-button-tertiary box-shadow-none promo-modal__header-button" v-if="masterStep == 10">
              <i class="d-icon-cube"></i>
              Товары и скидки: Товары
            </span>
          </div>
          <div class="promo-modal__header-right">
            <div class="d-progress promo-modal__progress">
              <p class="d-progress__label promo-modal__progress-label">
                Пройдено {{ masterStep }} из 10 шагов
              </p>
              <div class="d-progress__line promo-modal__progress-line"></div>
            </div>
            <a href="#" @click.prevent="this.modals.master = false" class="d-modal2__close promo-modal__close">
              <i class="d-icon-times d-modal2__close-icon"></i>
            </a>
          </div>
        </div>
        <div class="d-modal2__content promo-modal__content">
          <section class="promo-master">
            <div class="promo-master__content">
              <div class="promo-master__content-left">
                <!-- 1 ЭТАП - Контент акции -->
                <div class="contents " id="promoContent"  v-if="masterStep == 1">
                  <p class="promo-master__title promo-master__title--sm-margin">
                    Контент акции
                  </p>
                  <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical promo-master__settings promo-master__settings--sm-margin">
                    <label for="dateStart" class="d-dropdown__label">Название акции
                    </label>
                    <div class="d-input d-input--light d-input--width-640 d-textarea promo-master__textarea">
                      <textarea rows="2" placeholder="Например: “4+1 на дрели” “4+1 на дрели” “4+1 на дрели” “4+1 на дрели” Например: “4+1 на дрели” “4+1 на дрели” “4+1 на дрели” “4+1 на дрели” " name="dateStart" class="d-input__field d-textarea__field"></textarea>
                    </div>
                  </div>
                  <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                    <label for="dateStart" class="d-dropdown__label">Описание акции
                    </label>
                    <div class="d-editor promo-master__editor">
                      <div class="d-editor__header">
                        <div class="d-input d-input--light d-editor__search">
                          <input type="text" class="d-input__field d-editor__search-field" placeholder="Placeholder text">
                          <div class="d-editor__text-tools">
                            <p class="d-editor__font-size">
                              00
                            </p>
                            <div class="d-editor__tool-container">
                              <button class="d-editor__tool">
                                <i class="d-icon-b d-editor__tool-icon"></i>
                              </button>
                              <button class="d-editor__tool">
                                <i class="d-icon-i d-editor__tool-icon"></i>
                              </button>
                              <button class="d-editor__tool">
                                <i class="d-icon-u d-editor__tool-icon"></i>
                              </button>
                            </div>
                            <div class="d-divider d-divider--vertical d-divider--gray d-divider--big d-divider--semibold d-divider--semi-full"></div>
                            <div class="d-editor__tool-container">
                              <button class="d-editor__tool">
                                <i class="d-icon-marker d-editor__tool-icon"></i>
                              </button>
                              <button class="d-editor__tool">
                                <i class="d-icon-a d-editor__tool-icon"></i>
                              </button>
                              <button class="d-editor__tool">
                                <i class="d-icon-upper-case d-editor__tool-icon"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="d-editor__tools">
                          <div class="d-editor__tool-container">
                            <button class="d-editor__tool">
                              <i class="d-icon-list2 d-editor__tool-icon"></i>
                            </button>
                            <button class="d-editor__tool">
                              <i class="d-icon-number-list d-editor__tool-icon"></i>
                            </button>
                          </div>
                          <div class="d-divider d-divider--vertical d-divider--gray d-divider--big d-divider--semibold d-divider--semi-full"></div>
                          <div class="d-editor__tool-container">
                            <button class="d-editor__tool">
                              <i class="d-icon-link d-editor__tool-icon"></i>
                            </button>
                            <button class="d-editor__tool">
                              <i class="d-icon-calendar2 d-editor__tool-icon"></i>
                            </button>
                            <button class="d-editor__tool">
                              <i class="d-icon-quote d-editor__tool-icon"></i>
                            </button>
                            <button class="d-editor__tool">
                              <i class="d-icon-grid d-editor__tool-icon"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <textarea class="d-editor__field" rows="5" placeholder="Например: “Известный европейский бренд 25 лет в России! Высокая маржинальность до 45%! Широкий ассортимент для любого сегмента рынка. Цены крупного опта при любом заказе! 100% контроль цен. Возврат денег за непроданный товар.&nbsp;Широкая рекламная поддержка.”"></textarea>
                    </div>
                  </div>
                </div>
                <!-- 2 ЭТАП Даты проведения акции -->
                <div class="contents" id="eventDates" v-if="masterStep == 2">
                  <p class="promo-master__title promo-master__title--sm-margin">
                    Даты проведения акции
                  </p>
                  <div class="d-field-container d-field-container--long">
                    <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                      <!-- TODO Вместо этого нужно будет переписать эти стили в компонент какой-нибудь либы, где есть инпут даты -->
                      <label for="dateStart" class="d-dropdown__label">Дата начала акции
                      </label>
                      <div class="d-input d-input--light">
                        <input type="text" placeholder="__ __" name="dateStart" class="d-input__field">
                        <button class="d-icon-wrapper d-input__calendar-button">
                          <i class="d-icon-calendar3"></i>
                        </button>
                      </div>
                    </div>
                    <div class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical">
                      <label for="dateStart" class="d-dropdown__label">Дата окончания акции
                      </label>
                      <div class="d-input d-input--light">
                        <input type="text" placeholder="__ __" name="dateStart" class="d-input__field">
                        <button class="d-icon-wrapper d-input__calendar-button">
                          <i class="d-icon-calendar3"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 3 ЭТАП Баннер акции -->
                <div class="contents" id="promoBanner" v-if="masterStep == 3">
                  <p class="promo-master__title">Баннер акции</p>
                  <div class="d-field-container d-field-container--vertical promo-master__upload-header">
                    <p class="promo-master__subtitle">
                      Загрузка баннера
                    </p>
                    <p class="d-text promo-master__description">
                      Загрузите изображение с разрешением
                      6824х1996, в формате png, jpeg, svg. Размер
                      изображения не должен превышать 5 Мбайт&nbsp;.
                    </p>
                  </div>
                  <label class="d-upload promo-master__upload" for="promo-upload">
                    <input type="file" name="promo-upload" id="promo-upload" class="d-upload__input">
                    <img src="/icons/upload-cloud.svg" alt="Upload icon" class="d-upload__icon" width="80" height="50">
                    <p class="d-upload__title">
                      Перетащите файл в эту область
                    </p>
                    <p class="d-upload__description">
                      Вы также можете загрузить файлы png, jpeg,
                      svg,
                      <a href="/" class="d-link d-upload__link">нажав сюда
                      </a>
                    </p>
                  </label>
                  <div class="d-field-container d-field-container--vertical promo-master__settings">
                    <p class="promo-master__subtitle">
                      Места размещения
                    </p>
                    <div class="d-radio__container d-radio__container--small promo-master__radio-container">
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label class="d-switch" for="test-switch">
                          <input type="checkbox" name="promoHome" id="promoHome" class="d-switch__input">
                          <div class="d-switch__circle"></div>
                        </label>
                        <label for="promoHome" class="d-switch__label">На главной странице закупок
                        </label>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label class="d-switch" for="promoInCart">
                          <input type="checkbox" name="promoInCart" id="promoInCart" class="d-switch__input">
                          <div class="d-switch__circle"></div>
                        </label>
                        <label for="promoInCart" class="d-switch__label">В корзине
                        </label>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label class="d-switch" for="promoInCatalog">
                          <input type="checkbox" name="promoInCatalog" id="promoInCatalog" class="d-switch__input">
                          <div class="d-switch__circle"></div>
                        </label>
                        <label for="promoInCatalog" class="d-switch__label">В каталоге
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 4 ЭТАП - Условия оплаты -->
                <div class="contents" id="paymentConditions"  v-if="masterStep == 4">
                  <p class="promo-master__title">Условия оплаты</p>
                  <div class="d-field-container d-field-container--vertical promo-master__settings">
                    <p class="promo-master__subtitle">
                      Настройка отсрочки платежа
                    </p>
                    <div class="d-radio__container d-radio__container--small">
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="deferred-payment1" class="d-radio">
                          <input type="radio" name="deferred-payment" id="deferred-payment1" class="d-radio__input">
                        </label>
                        <label for="deferred-payment1" class="d-radio__label promo-master__radio-label">Отсрочка (по умолчанию)
                        </label>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="deferred-payment2" class="d-radio">
                          <input type="radio" name="deferred-payment" id="deferred-payment2" class="d-radio__input">
                        </label>
                        <label for="deferred-payment2" class="d-radio__label promo-master__radio-label">Под реализацию
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="promotions__card promotions__card--small promo-master__card">
                    <div class="promotions__card-header promo-master__card-header">
                      <div class="promotions__card-header-left">
                        <p class="promotions__card-title">
                          Срок отсрочки платежа:
                          <span class="promotions__card-title-span">19 дней</span>
                        </p>
                      </div>
                      <button class="promotions__card-button" data-modal2-trigger="deferredPayment">
                        <i class="d-icon-pen2 promotions__card-button-icon"></i>
                      </button>
                    </div>
                    <div class="promotions__card-content promo-master__card-content">
                      <div class="promotions__card-values promo-master__card-values">
                        <p class="promotions__card-text promotions__card-text--bold promotions__card-text--small">
                          Срок отсрочки платежа:
                        </p>
                        <div class="d-field-container d-field-container--vertical">
                          <p class="promotions__card-text promotions__card-text--dark-gray promo-master__card-text">
                            — 90% через 10 дней после
                            отгрузки
                          </p>
                          <p class="promotions__card-text promotions__card-text--dark-gray promo-master__card-text">
                            — 10% через 100 дней после
                            отгрузки
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 5 ЭТАП - Условия доставки -->
                <div class="contents" id="deliveryConditions"  v-if="masterStep == 5">
                  <p class="promo-master__title">Условия доставки</p>
                  <div class="d-field-container d-field-container--vertical promo-master__settings promo-master__settings--sm-margin">
                    <p class="promo-master__subtitle">
                      Кто оплачивает доставку:
                    </p>
                    <div class="d-radio__container d-radio__container--small">
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="who-pay-delivery1" class="d-radio">
                          <input type="radio" name="who-pay-delivery" id="who-pay-delivery1" class="d-radio__input">
                        </label>
                        <label for="who-pay-delivery1" class="d-radio__label promo-master__radio-label">Поставщик
                        </label>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="who-pay-delivery2" class="d-radio">
                          <input type="radio" name="who-pay-delivery" id="who-pay-delivery2" class="d-radio__input">
                        </label>
                        <label for="who-pay-delivery2" class="d-radio__label promo-master__radio-label">Покупатель
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="d-field-container d-field-container--vertical promo-master__settings">
                    <p class="promo-master__subtitle">
                      Сроки отгрузки товаров
                    </p>
                    <div class="d-radio__container d-radio__container--small">
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="shipment-deadline1" class="d-radio">
                          <input type="radio" name="shipment-deadline" id="shipment-deadline1" class="d-radio__input">
                        </label>
                        <label for="shipment-deadline1" class="d-radio__label promo-master__radio-label">Определяется данными из отгрузок
                        </label>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="shipment-deadline2" class="d-radio">
                          <input type="radio" name="shipment-deadline" id="shipment-deadline2" class="d-radio__input">
                        </label>
                        <label for="shipment-deadline2" class="d-radio__label promo-master__radio-label">Определяется по расчету доставки ТК
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 6 ЭТАП - Условия участия в акции: Требования к заказу -->
                <div class="contents" id="promoConditionsRequirements"  v-if="masterStep == 6">
                  <p class="promo-master__title">
                    Условия участия в акции: требованя к заказу
                  </p>
                  <!-- Минимальная общая сумма заказа товаров акции -->
                  <div class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings promo-master__settings--sm-margin">
                    <div class="promo-master__subtitle-container">
                      <p class="promo-master__subtitle promo-master__subtitle--1200-small">
                        Минимальная общая сумма заказа товаров
                        акции
                      </p>
                      <p class="d-text promo-master__description">
                        Общая сумма товаров акции должна быть не
                        менее указанной суммы
                      </p>
                    </div>
                    <div class="d-input d-input--light d-input--width-280">
                      <input class="d-input__field" type="text" placeholder="0" name="dateStart" value="30 000 ₽">
                    </div>
                  </div>
                  <!-- Минимальное количество SKU акции -->
                  <div class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings promo-master__settings--sm-margin">
                    <div class="promo-master__subtitle-container">
                      <p class="promo-master__subtitle promo-master__subtitle--1200-small">
                        Минимальное количество SKU акции
                      </p>
                      <p class="d-text promo-master__description">
                        В заказе должно быть не менее заданного
                        количества SKU товаров акции
                      </p>
                    </div>
                    <div class="d-input d-input--light d-input--width-280">
                      <input class="d-input__field" type="text" placeholder="0" name="dateStart" value="2 SKU">
                    </div>
                  </div>
                  <!-- Минимальное общее количество товаров -->
                  <div class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings">
                    <div class="promo-master__subtitle-container">
                      <p class="promo-master__subtitle promo-master__subtitle--1200-small">
                        Минимальное общее количество товаров
                      </p>
                      <p class="d-text promo-master__description">
                        В заказе должно быть не менее заданного
                        общего количества товаров акции
                      </p>
                    </div>
                    <div class="d-input d-input--light d-input--width-280">
                      <input class="d-input__field" type="text" placeholder="Введите количество шт." name="dateStart">
                    </div>
                  </div>
                  <div class="d-radio__container d-radio__container d-radio__container--1200-vertical d-radio__container--1200-small">
                    <div class="d-radio__wrapper d-radio__wrapper--1200-start promo-master__radio-wrapper">
                      <label class="d-switch" for="negative-promo1">
                        <input type="checkbox" name="negative-promo1" id="negative-promo1" class="d-switch__input">
                        <div class="d-switch__circle"></div>
                      </label>
                      <div class="d-switch__label-container">
                        <label for="negative-promo1" class="d-switch__label d-switch__label--regular">Негативная акция
                        </label>
                        <p class="d-description">
                          Условия акции как ухудшают, так и
                          улучшают предложения, например,
                          увеличение цены при увеличении
                          отсрочки. Акция не будет применяться
                          автоматически, а потребует включения
                          покупателем.
                        </p>
                      </div>
                    </div>
                    <div class="d-radio__wrapper d-radio__wrapper--1200-start promo-master__radio-wrapper">
                      <label class="d-switch" for="negative-promo2">
                        <input type="checkbox" name="negative-promo2" id="negative-promo2" class="d-switch__input">
                        <div class="d-switch__circle"></div>
                      </label>
                      <div class="d-switch__label-container">
                        <label for="negative-promo2" class="d-switch__label d-switch__label--regular">Доступна только в Предложениях
                        </label>
                        <p class="d-description">
                          Акция будет видна только в прамках
                          предложения для магазинов, в
                          каталоге и в разделе «Акции
                          поставщиков» выводиться не будет.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 7 ЭТАП - Условия участия в акции: Совместимость -->
                <div class="contents" id="promoConditionsCompatibility" v-if="masterStep == 7">
                  <p class="promo-master__title">
                    Условия участия в акции: совместимость
                  </p>
                  <!-- Совместимость -->
                  <div class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings">
                    <div class="promo-master__subtitle-container">
                      <p class="promo-master__subtitle">
                        Совместимость
                      </p>
                      <p class="d-text promo-master__description">
                        С какими акциями может применяться
                        совместно
                      </p>
                    </div>
                    <div class="d-radio__container d-radio__container--small d-radio__container--vertical">
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="compatibility1" class="d-radio">
                          <input type="radio" name="compatibility" id="compatibility1" class="d-radio__input">
                        </label>
                        <label for="compatibility1" class="d-radio__label promo-master__radio-label">Совместима со всеми акциями
                        </label>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="compatibility2" class="d-radio">
                          <input type="radio" name="compatibility" id="compatibility2" class="d-radio__input">
                        </label>
                        <label for="compatibility2" class="d-radio__label promo-master__radio-label">Совместима только с выбранными
                          акциями
                        </label>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="compatibility3" class="d-radio">
                          <input type="radio" name="compatibility" id="compatibility3" class="d-radio__input">
                        </label>
                        <label for="compatibility3" class="d-radio__label promo-master__radio-label">Не совместима со всеми акциями
                        </label>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="compatibility4" class="d-radio">
                          <input type="radio" name="compatibility" id="compatibility4" class="d-radio__input">
                        </label>
                        <label for="compatibility4" class="d-radio__label promo-master__radio-label">Не совместима с выбранными акциями
                        </label>
                      </div>
                    </div>
                  </div>
                  <!-- Режим совместимости -->
                  <div class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings promo-master__settings--sm-margin">
                    <div class="promo-master__subtitle-container">
                      <p class="promo-master__subtitle">
                        Режим совместимости
                      </p>
                      <p class="d-text promo-master__description">
                        Как условия совместимых акций сочетаются
                      </p>
                    </div>
                    <div class="d-radio__container d-radio__container--big d-radio__container--1200-vertical d-radio__container--1200-tiny-small">
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="compatibilitymode1" class="d-radio">
                          <input type="radio" name="compatibilitymode" id="compatibilitymode1" class="d-radio__input">
                        </label>
                        <div class="d-radio__label-container">
                          <label for="compatibilit1" class="d-radio__label promo-master__radio-label">Складываются
                          </label>
                          <p class="d-description">
                            Проценты скидок сначала
                            сложатся, затем сумма<br>
                            процентов отнимется от цены.
                            Отсрочка сложится.
                          </p>
                        </div>
                      </div>
                      <div class="d-radio__wrapper promo-master__radio-wrapper">
                        <label for="compatibilitymode2" class="d-radio">
                          <input type="radio" name="compatibilitymode" id="compatibilitymode2" class="d-radio__input">
                        </label>
                        <div class="d-radio__label-container">
                          <label for="compatibilitymode2" class="d-radio__label promo-master__radio-label">Назначаются последовательно
                          </label>
                          <p class="d-description">
                            Скидки применяются по очереди.
                            Отсрочка сложится.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 8 ЭТАП - Аудитория акции -->
                <div class="contents" id="promoAudience" v-if="masterStep == 8">
                  <p class="promo-master__title promo-master__title--ms-margin">
                    Аудитория акции
                  </p>
                  <div class="d-button__container promo-master__actions promo-master__audience-button-container">
                    <button class="d-button d-button-primary d-button-primary-small d-button--sm-padding box-shadow-none promo-master__audience-button">
                      Аудитория акции
                    </button>
                    <button class="d-button d-button-secondary d-button-secondary-small d-button--sm-padding box-shadow-none promo-master__audience-button">
                      Исключения участников из акции
                    </button>
                  </div>
                  <!-- Участники акции -->
                  <div class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings promo-master__settings--sm-margin">
                    <div class="promo-master__subtitle-container">
                      <p class="promo-master__subtitle">
                        Участники акции
                      </p>
                      <p class="d-text promo-master__description">
                        Кому будет доступна акция
                      </p>
                    </div>
                  </div>
                  <div class="promo-master__audience-changes">
                    <!-- Участники по географии -->
                    <div class="d-field-container d-field-container--long d-field-container--vertical promo-master__settings">
                      <p class="promo-master__subtitle promo-master__subtitle--small">
                        Участники по географии
                      </p>
                      <div class="d-radio__container d-radio__container--small d-radio__container--vertical promo-master__audience-change">
                        <div class="d-field-wrapper">
                          <label class="d-switch" for="all-regions">
                            <input type="checkbox" name="all-regions" id="all-regions" class="d-switch__input">
                            <div class="d-switch__circle"></div>
                          </label>
                          <label for="all-regions" class="d-switch__label">Все регионы
                          </label>
                        </div>
                        <div class="d-field-wrapper">
                          <label class="d-switch" for="change-region">
                            <input type="checkbox" name="change-region" id="change-region" class="d-switch__input">
                            <div class="d-switch__circle"></div>
                          </label>
                          <label for="change-region" class="d-switch__label">Регионы по выбору
                          </label>
                        </div>
                      </div>
                    </div>
                    <!-- Участники по типу компании -->
                    <div class="d-field-container d-field-container--long d-field-container--vertical">
                      <p class="promo-master__subtitle promo-master__subtitle--small">
                        Участники по типу компании
                      </p>
                      <div class="d-radio__container d-radio__container--small d-radio__container--verticalpromo-master__settings promo-master__audience-change">
                        <div class="d-field-wrapper">
                          <label class="d-switch" for="shops">
                            <input type="checkbox" name="shops" id="shops" class="d-switch__input">
                            <div class="d-switch__circle"></div>
                          </label>
                          <label for="shops" class="d-switch__label">Магазины
                          </label>
                        </div>
                        <div class="d-field-wrapper">
                          <label class="d-switch" for="wholesale-company">
                            <input type="checkbox" name="wholesale-company" id="wholesale-company" class="d-switch__input">
                            <div class="d-switch__circle"></div>
                          </label>
                          <label for="wholesale-company" class="d-switch__label">Оптовые компании
                          </label>
                        </div>
                        <div class="d-field-wrapper">
                          <label class="d-switch" for="wholesale-company">
                            <input type="checkbox" name="wholesale-company" id="wholesale-company" class="d-switch__input">
                            <div class="d-switch__circle"></div>
                          </label>
                          <label for="wholesale-company" class="d-switch__label">Производители
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Поздравляем -->
                <div class="contents" id="congratulations" v-if="masterStep == 9">
                  <div class="promo-master__title-container">
                    <p class="promo-master__title promo-master__title--no-margin">
                      Поздравляем!<br>Вы создали акцию «Купи
                      слона»
                    </p>
                    <div class="d-description">
                      Вы прошли 10 из 10 шагов, а это значит, что
                      ваша акция будет максимально эффективной!
                    </div>
                  </div>
                  <div class="d-button__container d-button__container--small promo-master__actions">
                    <button class="d-button d-button-secondary d-button-secondary-small d-button--sm-padding d-button--sm-shadow">
                      Смотреть релиз акции
                    </button>
                    <button class="d-button d-button-primary d-button-primary-small d-button--sm-padding d-button--sm-shadow">
                      Включить акцию
                    </button>
                  </div>
                </div>
              </div>
              <div class="promo-master__content-right">
                <div class="promo-master__setting-container">
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--used">
                    <i class="d-icon-lines"></i>
                    Контент акции
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--used">
                    <i class="d-icon-calendar"></i>
                    Даты проведения акции
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--used">
                    <i class="d-icon-picture"></i>
                    Баннер акции
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting">
                    <i class="d-icon-wallet"></i>
                    Условия оплаты
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled" disabled="">
                    <i class="d-icon-truck"></i>
                    Условия доставки
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled" disabled="">
                    <i class="d-icon-percent"></i>
                    Условия участия в акции: Требования к заказу
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled" disabled="">
                    <i class="d-icon-percent"></i>
                    Условия участия в акции: Совместимость
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled" disabled="">
                    <i class="d-icon-user-star"></i>
                    Аудитория акции
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled" disabled="">
                    <i class="d-icon-cube"></i>
                    Товары и скидки: Склады
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled" disabled="">
                    <i class="d-icon-cube"></i>
                    Товары и скидки: Товары
                  </button>
                </div>
              </div>
            </div>

          </section>
        </div>
        <div class="promo-master__footer">
              <div class="promo-master__footer-actions">
                <button class="d-button d-button-secondary d-button-secondary-small box-shadow-none promo-master__action-button promo-master__action-button--back" v-if="masterStep > 1">
                  <i class="d-icon-arrow-left promo-master__action-button-icon"></i>
                  <span class="promo-master__action-button-text">Назад</span>
                </button>
                <button class="d-button d-button-secondary d-button-secondary-small box-shadow-none promo-master__action-button promo-master__action-button--next" v-if="masterStep < 9">
                  <span class="promo-master__action-button-text">Далее</span>
                  <i class="d-icon-arrow-right promo-master__action-button-icon"></i>
                </button>
              </div>
              <div class="promo-master__footer-content promo-master__footer-content--between">
                <!-- Универсальная секция для адаптив <1200px -->
                <div class="promo-master__info-block-wrapper visible-1200">
                  <div class="promo-master__info-block">
                    <i class="d-icon-message-status promo-master__info-block-icon"></i>
                    <p class="promo-master__info-block-text">
                      Отразите в названии суть акции.
                    </p>
                  </div>
                </div>
                <div class="promo-master__setting-container visible-1200 hidden-800">
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--used">
                    <i class="d-icon-lines"></i>
                    Контент акции
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--used">
                    <i class="d-icon-calendar"></i>
                    Даты проведения акции
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--used">
                    <i class="d-icon-picture"></i>
                    Баннер акции
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting">
                    <i class="d-icon-wallet"></i>
                    Условия оплаты
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled" disabled="">
                    <i class="d-icon-truck"></i>
                    Условия доставки
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled" disabled="">
                    <i class="d-icon-percent"></i>
                    Условия участия в акции: Требования к заказу
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled" disabled="">
                    <i class="d-icon-percent"></i>
                    Условия участия в акции: Совместимость
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled" disabled="">
                    <i class="d-icon-user-star"></i>
                    Аудитория акции
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled" disabled="">
                    <i class="d-icon-cube"></i>
                    Товары и скидки: Склады
                  </button>
                  <button class="d-button d-button-tertiary box-shadow-none promo-master__setting promo-master__setting--disabled" disabled="">
                    <i class="d-icon-cube"></i>
                    Товары и скидки: Товары
                  </button>
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
import { useVuelidate } from '@vuelidate/core'
import { mapActions, mapGetters } from 'vuex'
import { helpers, required } from '@vuelidate/validators'

export default {
  name: 'actionForm',
  components: { breadcrumbs, Loader, customModal },
  data() {
    return {
      loading: true,
      productLoading: false,
      complectLoading: false,
      productUploadLoading: false,
      productAvailablePage: 1,
      productSelectedPage: 1,
      complectAvailablePage: 1,
      complectSelectedPage: 1,
      selected_group: {},
      windowWidth: 1920,
      total_products: 0,
      per_page: 24,
      masterStep: 1,
      // Флаги окон
      modals: {
        master: false,
        modal_checking: false,
        add_group: false,
        error_product: false,
        view_actions: false,
        delay: false,
        price: false,
        price_step: 0,
        price_type: ''
      },
      // Склады Организации
      stores: [],
      // Регионы
      regions_all: [],
      // Организации
      all_organizations: [],
      // Места показа
      geo: [
          { name: 'Показывать всем', key: 0 },
          { name: 'По географии акции', key: 1 }
      ],
      // Рекламные места
      place: [],
      // Режим Совместимости Скидок
      compabilityMode: [
        { name: 'Применяется бóльшая', key: 0 },
        { name: 'Скидки складываются', key: 1 },
        { name: 'Скидки назначаются последовательно', key: 2 }
      ],
      // Плательщик Доставки
      paymentDelivery: [
        { name: 'Покупатель', key: 0 },
        { name: 'Поставщик', key: 1 }
      ],
      // Условия Акции
      condition: [
        { name: 'Без условий', key: 0 },
        { name: 'Задать условия', key: 1 }
      ],
      // Фильтр Организаций
      filter_organizations: {
        name: '',
        type: [1, 2]
      },
      // Данные отсрочки
      delayData: {
        delayPercentSum: 100,
        postponementPeriod: 0
      },
      type_formula: [
        { name: '₽', key: 0 },
        { name: '%', key: 1 }
      ],
      type_pricing: [
        {name: 'Наценка', key: 1, disabledkey: false},
        {name: 'Скидка', key: 2, disabledkey: false},
        {name: 'Фиксированая цена', key: 3, disabledkey: false}
      ],
      type_pricing_group: [
        {name: 'Наценка', key: 1},
        {name: 'Скидка', key: 2},
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
          original_href: ''
        },
        small: {
          original_href: ''
        },
        min: {
          original_href: ''
        },
        icon: {
          original_href: ''
        },
        file: {
          original_href: ''
        }
      },
      form: {
        name: '',
        description: '',
        client_id: 0,
        compatibilityDiscount: '1',
        actions: [],
        product_groups: {},
        compabilityMode: { name: 'Применяется бóльшая', key: 0 },
        paymentDelivery: { name: 'Покупатель', key: 0 },
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
        participantsType: '3',
        all_organizations_selected: {},
        regions: [],
        stores: 0,
        warehouses: 0,
        vendors: 0,
        store_id: [],
        dates: [],
        adv: {
          active: false,
          place_position: '',
          geo: '',
          files: {},
        },
      },
    }
  },
  mounted() {
    this.unsetAction().then(() => {
      this.getCatalogs()
      this.getRegions()
      this.getOrgStores()
      this.getActionAdvPlaces()
      if(this.$route.params.action){
        this.getAction().then(() => {
          this.loading = false
          if(this.form.store_id){
            const types = [1, 2]
            types.forEach(function(entry){
              this.getAvailableProducts({
                store_id: this.form.store_id,
                filter: '',
                page: this.product_available_page,
                perpage: this.per_page,
                type: entry
              })
              this.getAvailableComplects({
                store_id: this.form.store_id,
                filter: '',
                page: this.product_available_page,
                perpage: this.per_page,
                type: entry
              })
            })
            this.getProductGroups({
              store_id: this.form.store_id
            })
            this.getActiveActions()
          }
        })
      }else{
        this.modals.master = true
      }
    })
  },
  methods: {
    ...mapActions({
      getCatalogs: 'addition/getCatalogs',
      getRegions: 'addition/getRegions',
      getOrgStores: 'org/getOrgStores',
      getAction: 'action/getAction',
      unsetAction: 'action/unsetAction',
      getActionAdvPlaces: 'action/getActionAdvPlaces',
      getAvailableProducts: 'action/getAvailableProducts',
      getAvailableComplects: 'action/getAvailableComplects',
      getProductGroups: 'action/getProductGroups',
      getActiveActions: 'action/getActiveActions',
      getProductsPrices: 'action/getProductsPrices',
      getGroupProducts: 'action/getGroupProducts',
    }),
    updateStoreData() {
      if(this.form.store_id){
        this.product_loading = true
        this.complect_loading = true
        this.product_available_page = 1
        this.product_selected_page = 1
        this.complect_available_page = 1
        this.complect_selected_page = 1
        this.getProductsPrices({
          store_id: this.form.store_id
        })
        const types = [1, 2]
        types.forEach(function(entry){
          let pageProducts = 1
          let pageComplects = 1
          if(entry == 1){
            pageProducts = this.productsAvailablePage
            pageComplects = this.complectsSelectedPage
          }else{
            pageProducts = this.productsSelectedPage
            pageComplects = this.complectsSelectedPage
          }
          this.getAvailableProducts({
            store_id: this.form.store_id,
            filter: '',
            page: pageProducts,
            perpage: this.per_page,
            type: entry
          })
          this.getAvailableComplects({
            store_id: this.form.store_id,
            filter: '',
            page: pageComplects,
            perpage: this.per_page,
            type: entry
          })
        })
        this.getProductGroups({
          store_id: this.form.store_id
        })
        this.getActiveActions()
      }
    },
    updateGroups(id){
      console.log('updateGroups', this.form.product_groups[id])
      this.getGroupProducts({
        group_id: id,
        filter: this.form.product_groups[id].filter,
        page: this.form.product_groups[id].page,
        perpage: this.per_page
      }).then((res) => {
        this.form.product_groups[id].products = res.data
      })
    },
    paginateGroupProduct(data){
      if(data.object_id){
        this.form.product_groups[data.object_id].page = data.page
        this.updateGroups(data.object_id)
      }
    },
    filterGroupProductSelected(data){
      console.log(data)
      if(data.object_id){
        this.form.product_groups[data.object_id].filter = data.filter
        this.form.product_groups[data.object_id].page = data.page
        this.updateGroups(data.object_id)
      }
    },
    deleteGroup(id){
      this.form.product_groups = Object.fromEntries(
        Object.entries(this.form.product_groups)
          .filter(([key]) => key !== id.toString())
      );
    },
  },
  computed: {
    ...mapGetters({
      catalogs: 'addition/catalogs',
      regions: 'addition/regions',
      orgStores: 'org/orgStores',
      action: 'action/action',
      actionAdvPlaces: 'action/AdvPlaces',
      productsAvailable: 'action/productsAvailable',
      productsSelected: 'action/productsSelected',
      complectsAvailable: 'action/complectsAvailable',
      complectsSelected: 'action/complectsSelected',
      productGroups: 'action/productGroups',
      activeActions: 'action/activeActions',
      groupProducts: 'action/groupProducts',
    }),
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
    // Склады Организации
    orgStores: function (newVal) {
      this.stores = [];
      for (let i = 0; i < newVal.items.length; i++) {
          this.stores.push({ label: newVal.items[i].name, value: newVal.items[i].id });
      }
    },
    // Акция (редактирование)
    action: function (newVal) {
      if (this.$route.params.action) {
        console.log(newVal)
        this.form.action_id = newVal.id
        this.form.name = newVal.name
        this.form.description = newVal.description
        this.form.store_id = newVal.store_ids
        this.form.client_id = String(newVal.client_id)
        if (newVal.image) {
          this.files.max.original_href = newVal.image.image;
        }
        if (newVal.page_create) {
          this.form.adv.active = true
        }
        this.getActionAdvPlaces().then(() => {
          this.form.adv.place = []
          const places = newVal.page_places.split(',');
          Object.entries(this.place).forEach((value) => {
            places.forEach((pvalue) => {
              if(value.key == pvalue){
                this.form.adv.place.push(value)
              }
            })
          });
        });
        const dateto = new Date(newVal.date_to);
        const datefrom = new Date(newVal.date_from);
        this.form.dates = [datefrom, dateto];
        this.form.geo_action = this.geo[newVal.page_geo];
        this.form.position = newVal.page_place_position;
        this.form.hide_for_clients = Boolean(newVal.hide_for_clients)
        this.form.negative = Boolean(newVal.negative)
        this.form.offer = Boolean(newVal.offer)
        this.form.integration = Boolean(newVal.integration)
        this.form.stores = Boolean(newVal.available_stores)
        this.form.warehouses = Boolean(newVal.available_vendors)
        this.form.vendors = Boolean(newVal.integration)
        this.form.typeDelay = String(newVal.delay_type)
        this.form.delay = newVal.delay_graph
        this.form.conditionMinSum = newVal.condition_min_sum;
        this.form.regions = newVal.regions
        this.form.actions = newVal.big_sale_actions
        this.form.all_organizations_selected = newVal.organization
        this.form.postponementPeriod = newVal.delay
        this.form.participantsType = String(newVal.participants_type)
        this.form.compatibilityDiscount = String(newVal.compatibility_discount)
        if(newVal.condition_min_sum || newVal.condition_SKU || newVal.condition_min_count){
          Object.entries(this.condition).forEach((value) => {
            if(value.key == 1){
              this.form.condition = value
            }
          });
        }
        Object.entries(this.paymentDelivery).forEach((value) => {
          if(value.key == newVal.payer){
            this.form.paymentDelivery = value
          }
        });
        Object.entries(this.compabilityMode).forEach((value) => {
          if(value.key == newVal.compatibility_discount_mode){
            this.form.compabilityMode = value
          }
        });
        this.form.compatibilityDiscount = String(newVal.compatibility_discount)
        this.form.conditionMinSum = newVal.condition_min_sum;
        this.form.conditionMinCount = newVal.condition_SKU;
        this.form.conditionMinGeneralCount = newVal.condition_min_count;
        this.form.product_groups = newVal.product_groups
        this.updateStoreData()
        if(newVal.pg){
          this.updateGroups(newVal.pg)
        }
      }
    },
  }
}
</script>
<style lang="scss">
.promo-master-modal{
  .modal__content{
    padding: 0;
  }
  .modal-content{
    padding: 0;
  }
  .modal__close{
    display: none;
  }
  .promo-modal__header-title-container{
    padding: 40px 32px;
  }
  .promo-modal__content{
    padding: 40px 32px;
  }
  .promo-master__footer-actions{
    padding: 16px 40px;
  }
}
.dropzone__box {
  z-index: 1;
}
</style>
