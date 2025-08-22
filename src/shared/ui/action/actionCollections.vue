<template>
  <div>
    <div class="promotions__card-warehouse">
      <div class="promotions__card-value-container promotions__card-warehouse-header">
        <p class="promotions__card-value promotions__card-value--bold promotions__card-block-title">
          Коллекции
        </p>
        <span class="promotions__card-label"
          >Загрузите список товаров и установите скидки, которые получит клиент при выполнении
          условий акции</span
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
        <i class="d-icon-search-big d-search__icon promotions__card-warehouse-search-icon"></i>
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
      <div class="d-divider d-divider--vertical promotions__card-collection-header-divider"></div>
      <button class="d-icon-wrapper d-icon-wrapper--big">
        <i class="d-icon-trash"></i>
      </button>
    </div>

    <div class="promotions__card-block-title-container promotions__card-collection-tabs-wrapper">
      <div
        class="promotions__card-label promotions__card-label--big promotions__card-collection-tabs-title visible-1200"
      >
        Выберите коллекцию
        <button
          class="d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--gray promotions__card-collection-tabs-toggle"
        >
          <i class="d-icon-angle-rounded-bottom promotions__card-collection-tabs-icon"></i>
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
              <input type="radio" name="test-radios" id="test-radio1" class="d-radio__input" />
            </label>
          </button>
          <button class="d-tab">
            Оснастка Интерскол (34332)
            <div class="d-tab__crutch"></div>
            <label for="test-radio1" class="d-radio d-tab__toggle">
              <input type="radio" name="test-radios" id="test-radio1" class="d-radio__input" />
            </label>
          </button>
          <button class="d-tab">
            Оснастка Интерскол (34332)
            <div class="d-tab__crutch"></div>
            <label for="test-radio1" class="d-radio d-tab__toggle">
              <input type="radio" name="test-radios" id="test-radio1" class="d-radio__input" />
            </label>
          </button>
          <button class="d-tab">
            Оснастка Интерскол (34332)
            <div class="d-tab__crutch"></div>
            <label for="test-radio1" class="d-radio d-tab__toggle">
              <input type="radio" name="test-radios" id="test-radio1" class="d-radio__input" />
            </label>
          </button>
          <button class="d-tab">
            Оснастка Интерскол (34332)
            <div class="d-tab__crutch"></div>
            <label for="test-radio1" class="d-radio d-tab__toggle">
              <input type="radio" name="test-radios" id="test-radio1" class="d-radio__input" />
            </label>
          </button>
          <button class="d-tab d-tab--active">
            Оснастка Интерскол (34332)
            <div class="d-tab__crutch"></div>
            <label for="test-radio1" class="d-radio d-tab__toggle">
              <input type="radio" name="test-radios" id="test-radio1" class="d-radio__input" />
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
                    <input type="checkbox" name="checkbox1" id="checkbox1" class="d-radio__input" />
                  </label>
                </div>
              </th>
              <th class="d-table__head-col d-table__head-col--big" style="width: 20%">Товар</th>
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
              <th class="d-table__head-col d-table__head-col--big">Тип ценообразования</th>
              <th class="d-table__head-col d-table__head-col--big">Цена со скидкой за шт.</th>
              <th class="d-table__head-col d-table__head-col--big">Минимальное количество</th>
              <th class="d-table__head-col d-table__head-col--big">Максимальное количество</th>
              <th class="d-table__head-col d-table__head-col--big">Кратность</th>
              <th class="d-table__head-col d-table__head-col--big">
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
                    <input type="checkbox" name="checkbox2" id="checkbox2" class="d-radio__input" />
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
                    <input type="checkbox" name="checkbox2" id="checkbox2" class="d-radio__input" />
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
                <input type="checkbox" name="checkAll" id="checkAll" class="d-radio__input" />
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
                        <div class="d-icon-wrapper d-icon-wrapper--no-hover d-icon-wrapper--black">
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
                      <p class="d-product__price-text d-product__price-text--big">1 750.00 ₽</p>
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
                  <input type="checkbox" name="products1" id="products1" class="d-switch__input" />
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

        <div class="d-field-container d-field-container--long d-table__footer-fields hidden-1200">
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
            <label for="extra-charge" class="d-dropdown__label">Тип ценообразования </label>
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
                  <i class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"></i>
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
</template>
<script>
export default {
  name: 'actionCollections',
}
</script>
<style lang="scss"></style>
