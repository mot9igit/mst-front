<template>
  <div>
    <div class="promotions__card-warehouse promotions__card-warehouse-header-container">
      <div class="promotions__card-value-container promotions__card-warehouse-header">
        <p
          class="promotions__card-value promotions__card-value--bold promotions__card-value--small promotions__card-block-title promotions__card-warehouse-title"
        >
          Товары
        </p>
        <span
          class="promotions__card-label promotions__card-label--big promotions__card-warehouse-label"
          >Загрузите список товаров и установите скидки, которые получит клиент при выполнении
          условий акции</span
        >
      </div>
      <form class="d-search d-search--alt promotions__card-warehouse-search hidden-600">
        <i class="d-icon-search-big d-search__icon promotions__card-warehouse-search-icon"></i>
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
                  <input type="checkbox" name="checkbox1" id="checkbox1" class="d-radio__input" />
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
  name: 'actionProducts',
}
</script>
<style lang="scss"></style>
