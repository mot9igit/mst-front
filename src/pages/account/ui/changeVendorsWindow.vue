<template>
  <div class="d-sheet__overlay vendor-change__sheet-overlay" :class="{ active: active }">
    <div class="d-sheet__wrapper vendor-change__sheet-wrapper">
      <div class="d-sheet d-sheet--active vendor-change__sheet" data-sheet="vendor-change">
        <div class="d-sheet__content vendor-change">
          <!-- Яндекс карта -->
          <div class="vendor-change__map">
            <div class="yandex-map vendor-change__map-image">
              <yandex-map v-model="map" :settings="mapSettings" height="100%">
                <yandex-map-default-features-layer />
                <yandex-map-default-scheme-layer />
                <yandex-map-clusterer grid-size="64" zoom-on-cluster-click>
                  <yandex-map-marker
                    v-for="item in optVendors.available"
                    :key="item.id"
                    position="top left-center"
                    :settings="{
                      coordinates: item.mapcoordinates,
                    }"
                    @click="checkVendor(item.id)"
                  >
                    <div class="marker">
                      <img :src="item.image" :alt="item.name" />
                    </div>
                  </yandex-map-marker>
                </yandex-map-clusterer>
              </yandex-map>
            </div>
          </div>

          <div class="vendor-change__content">
            <!-- Заголовок модалки -->
            <div class="vendor-change__title-container">
              <h3 class="vendor-change__title">Выбора поставщиков</h3>
              <button class="vendor-change__close-button" @click.prevent="close()">
                <i class="d-icon-times vendor-change__close-button-icon"></i>
                <i class="d-icon-angle-rounded-left vendor-change__title-back"></i>
              </button>
            </div>

            <!-- Выбранные поставщики -->
            <div class="vendor-change__block vendor-change__selected">
              <p class="vendor-change__block-title vendor-change__selected-title">
                Выбранные поставщики
              </p>

              <div class="vendor-change__selected-list">
                <!-- Карточка выбранного поставщика -->
                <div class="vendor-change__selected-item">
                  <!-- Верхушка -->
                  <div class="vendor-change__selected-item-header">
                    <div class="vendor-change__selected-item-title-container">
                      <div class="vendor-change__selected-item-image-container">
                        <img
                          src="/icons/spo-logo.svg"
                          alt=""
                          class="vendor-change__selected-item-image"
                        />
                      </div>
                      <p class="vendor-change__selected-item-title">Спец Проф Оборудование</p>
                    </div>

                    <button class="vendor-change__selected-item-delete-button">
                      <i class="d-icon-trash vendor-change__selected-item-delete-icon"></i>
                    </button>
                  </div>

                  <!-- Контент с данными -->
                  <div class="vendor-change__selected-item-content">
                    <div class="vendor-change__selected-item-data">
                      <i class="d-icon-location vendor-change__selected-item-data-icon"></i>
                      <p class="vendor-change__selected-item-data-text">
                        г. Екатеринбург, ул. Предельная, 57/3
                      </p>
                    </div>

                    <div class="vendor-change__selected-item-data-container">
                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-phone vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                      </div>

                      <div
                        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                      ></div>

                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                      </div>
                    </div>
                  </div>

                  <!-- Данные склада -->
                  <div class="vendor-change__selected-item-footer">
                    <div class="d-radio__wrapper vendor-change__selected-item-radio-wrapper">
                      <label for="warehouse1" class="d-radio vendor-change__selected-item-radio">
                        <input
                          type="checkbox"
                          name="warehouse1"
                          id="warehouse1"
                          class="d-radio__input"
                        />
                      </label>
                      <label
                        for="warehouse1"
                        class="d-radio__label vendor-change__selected-item-radio-label"
                        >Склад #48, г. Екатеринбург, ул. Предельная, 57/3
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Карточка выбранного поставщика -->
                <div class="vendor-change__selected-item">
                  <!-- Верхушка -->
                  <div class="vendor-change__selected-item-header">
                    <div class="vendor-change__selected-item-title-container">
                      <div class="vendor-change__selected-item-image-container">
                        <img
                          src="/icons/spo-logo.svg"
                          alt=""
                          class="vendor-change__selected-item-image"
                        />
                      </div>
                      <p class="vendor-change__selected-item-title">Спец Проф Оборудование</p>
                    </div>

                    <button class="vendor-change__selected-item-delete-button">
                      <i class="d-icon-trash vendor-change__selected-item-delete-icon"></i>
                    </button>
                  </div>

                  <!-- Контент с данными -->
                  <div class="vendor-change__selected-item-content">
                    <div class="vendor-change__selected-item-data">
                      <i class="d-icon-location vendor-change__selected-item-data-icon"></i>
                      <p class="vendor-change__selected-item-data-text">
                        г. Екатеринбург, ул. Предельная, 57/3
                      </p>
                    </div>

                    <div class="vendor-change__selected-item-data-container">
                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-phone vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                      </div>

                      <div
                        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                      ></div>

                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                      </div>
                    </div>
                  </div>

                  <!-- Данные склада -->
                  <div class="vendor-change__selected-item-footer">
                    <div class="d-radio__wrapper vendor-change__selected-item-radio-wrapper">
                      <label for="warehouse1" class="d-radio vendor-change__selected-item-radio">
                        <input
                          type="checkbox"
                          name="warehouse1"
                          id="warehouse1"
                          class="d-radio__input"
                        />
                      </label>
                      <label
                        for="warehouse1"
                        class="d-radio__label vendor-change__selected-item-radio-label"
                        >Склад #48, г. Екатеринбург, ул. Предельная, 57/3
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Карточка выбранного поставщика -->
                <div class="vendor-change__selected-item">
                  <!-- Верхушка -->
                  <div class="vendor-change__selected-item-header">
                    <div class="vendor-change__selected-item-title-container">
                      <div class="vendor-change__selected-item-image-container">
                        <img
                          src="/icons/spo-logo.svg"
                          alt=""
                          class="vendor-change__selected-item-image"
                        />
                      </div>
                      <p class="vendor-change__selected-item-title">Спец Проф Оборудование</p>
                    </div>

                    <button class="vendor-change__selected-item-delete-button">
                      <i class="d-icon-trash vendor-change__selected-item-delete-icon"></i>
                    </button>
                  </div>

                  <!-- Контент с данными -->
                  <div class="vendor-change__selected-item-content">
                    <div class="vendor-change__selected-item-data">
                      <i class="d-icon-location vendor-change__selected-item-data-icon"></i>
                      <p class="vendor-change__selected-item-data-text">
                        г. Екатеринбург, ул. Предельная, 57/3
                      </p>
                    </div>

                    <div class="vendor-change__selected-item-data-container">
                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-phone vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                      </div>

                      <div
                        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                      ></div>

                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                      </div>
                    </div>
                  </div>

                  <!-- Данные склада -->
                  <div class="vendor-change__selected-item-footer">
                    <div class="d-radio__wrapper vendor-change__selected-item-radio-wrapper">
                      <label for="warehouse1" class="d-radio vendor-change__selected-item-radio">
                        <input
                          type="checkbox"
                          name="warehouse1"
                          id="warehouse1"
                          class="d-radio__input"
                        />
                      </label>
                      <label
                        for="warehouse1"
                        class="d-radio__label vendor-change__selected-item-radio-label"
                        >Склад #48, г. Екатеринбург, ул. Предельная, 57/3
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Карточка выбранного поставщика -->
                <div class="vendor-change__selected-item">
                  <!-- Верхушка -->
                  <div class="vendor-change__selected-item-header">
                    <div class="vendor-change__selected-item-title-container">
                      <div class="vendor-change__selected-item-image-container">
                        <img
                          src="/icons/spo-logo.svg"
                          alt=""
                          class="vendor-change__selected-item-image"
                        />
                      </div>
                      <p class="vendor-change__selected-item-title">Спец Проф Оборудование</p>
                    </div>

                    <button class="vendor-change__selected-item-delete-button">
                      <i class="d-icon-trash vendor-change__selected-item-delete-icon"></i>
                    </button>
                  </div>

                  <!-- Контент с данными -->
                  <div class="vendor-change__selected-item-content">
                    <div class="vendor-change__selected-item-data">
                      <i class="d-icon-location vendor-change__selected-item-data-icon"></i>
                      <p class="vendor-change__selected-item-data-text">
                        г. Екатеринбург, ул. Предельная, 57/3
                      </p>
                    </div>

                    <div class="vendor-change__selected-item-data-container">
                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-phone vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                      </div>

                      <div
                        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                      ></div>

                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                      </div>
                    </div>
                  </div>

                  <!-- Данные склада -->
                  <div class="vendor-change__selected-item-footer">
                    <div class="d-radio__wrapper vendor-change__selected-item-radio-wrapper">
                      <label for="warehouse1" class="d-radio vendor-change__selected-item-radio">
                        <input
                          type="checkbox"
                          name="warehouse1"
                          id="warehouse1"
                          class="d-radio__input"
                        />
                      </label>
                      <label
                        for="warehouse1"
                        class="d-radio__label vendor-change__selected-item-radio-label"
                        >Склад #48, г. Екатеринбург, ул. Предельная, 57/3
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Карточка выбранного поставщика -->
                <div class="vendor-change__selected-item">
                  <!-- Верхушка -->
                  <div class="vendor-change__selected-item-header">
                    <div class="vendor-change__selected-item-title-container">
                      <div class="vendor-change__selected-item-image-container">
                        <img
                          src="/icons/spo-logo.svg"
                          alt=""
                          class="vendor-change__selected-item-image"
                        />
                      </div>
                      <p class="vendor-change__selected-item-title">Спец Проф Оборудование</p>
                    </div>

                    <button class="vendor-change__selected-item-delete-button">
                      <i class="d-icon-trash vendor-change__selected-item-delete-icon"></i>
                    </button>
                  </div>

                  <!-- Контент с данными -->
                  <div class="vendor-change__selected-item-content">
                    <div class="vendor-change__selected-item-data">
                      <i class="d-icon-location vendor-change__selected-item-data-icon"></i>
                      <p class="vendor-change__selected-item-data-text">
                        г. Екатеринбург, ул. Предельная, 57/3
                      </p>
                    </div>

                    <div class="vendor-change__selected-item-data-container">
                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-phone vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                      </div>

                      <div
                        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                      ></div>

                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                      </div>
                    </div>
                  </div>

                  <!-- Данные склада -->
                  <div class="vendor-change__selected-item-footer">
                    <div class="d-radio__wrapper vendor-change__selected-item-radio-wrapper">
                      <label for="warehouse1" class="d-radio vendor-change__selected-item-radio">
                        <input
                          type="checkbox"
                          name="warehouse1"
                          id="warehouse1"
                          class="d-radio__input"
                        />
                      </label>
                      <label
                        for="warehouse1"
                        class="d-radio__label vendor-change__selected-item-radio-label"
                        >Склад #48, г. Екатеринбург, ул. Предельная, 57/3
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Карточка выбранного поставщика -->
                <div class="vendor-change__selected-item">
                  <!-- Верхушка -->
                  <div class="vendor-change__selected-item-header">
                    <div class="vendor-change__selected-item-title-container">
                      <div class="vendor-change__selected-item-image-container">
                        <img
                          src="/icons/spo-logo.svg"
                          alt=""
                          class="vendor-change__selected-item-image"
                        />
                      </div>
                      <p class="vendor-change__selected-item-title">Спец Проф Оборудование</p>
                    </div>

                    <button class="vendor-change__selected-item-delete-button">
                      <i class="d-icon-trash vendor-change__selected-item-delete-icon"></i>
                    </button>
                  </div>

                  <!-- Контент с данными -->
                  <div class="vendor-change__selected-item-content">
                    <div class="vendor-change__selected-item-data">
                      <i class="d-icon-location vendor-change__selected-item-data-icon"></i>
                      <p class="vendor-change__selected-item-data-text">
                        г. Екатеринбург, ул. Предельная, 57/3
                      </p>
                    </div>

                    <div class="vendor-change__selected-item-data-container">
                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-phone vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                      </div>

                      <div
                        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                      ></div>

                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                      </div>
                    </div>
                  </div>

                  <!-- Данные склада -->
                  <div class="vendor-change__selected-item-footer">
                    <div class="d-radio__wrapper vendor-change__selected-item-radio-wrapper">
                      <label for="warehouse1" class="d-radio vendor-change__selected-item-radio">
                        <input
                          type="checkbox"
                          name="warehouse1"
                          id="warehouse1"
                          class="d-radio__input"
                        />
                      </label>
                      <label
                        for="warehouse1"
                        class="d-radio__label vendor-change__selected-item-radio-label"
                        >Склад #48, г. Екатеринбург, ул. Предельная, 57/3
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button class="d-button d-button-primary vendor-change__more">
              <span>Еще +8</span>
              <i class="d-icon-angle-rounded-right vendor-change__more-icon"></i>
            </button>

            <!-- Список подключенных поставщиков -->
            <p
              class="vendor-change__block-title vendor-change__connected-title vendor-change__connected-title--1280"
            >
              Список подключенных поставщиков
            </p>
            <div class="vendor-change__block vendor-change__connected">
              <!-- Заголовок -->
              <p class="vendor-change__block-title vendor-change__connected-title">
                Список подключенных поставщиков
              </p>

              <!-- Поиск -->
              <form class="d-search d-search--alt vendor-change__connected-search">
                <input
                  type="text"
                  placeholder="Найти по адресу или наименованию склада / поставщика"
                  class="d-search__field vendor-change__connected-search-field"
                />
                <button
                  type="button"
                  class="d-button d-button-primary d-button-primary-small d-search__button box-shadow-none vendor-change__connected-search-button"
                >
                  <i
                    class="d-icon-search-big header__icon-button-icon vendor-change__connected-search-button-icon"
                  ></i>
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
													</li> -->
                </ul>
              </form>

              <!-- Список -->
              <div class="vendor-change__selected-list">
                <!-- Карточка подключенного поставщика -->
                <div class="vendor-change__connected-item">
                  <!-- Выбор -->
                  <label for="warehouse1" class="d-radio vendor-change__connected-item-radio">
                    <input
                      type="checkbox"
                      name="warehouse1"
                      id="warehouse1"
                      class="d-radio__input"
                    />
                  </label>

                  <div class="vendor-change__connected-item-content">
                    <!-- Верхушка -->
                    <div class="vendor-change__selected-item-header">
                      <div
                        class="vendor-change__selected-item-title-container vendor-change__connected-item-title-container"
                      >
                        <div class="vendor-change__selected-item-image-container">
                          <img
                            src="/icons/spo-logo.svg"
                            alt=""
                            class="vendor-change__selected-item-image"
                          />
                        </div>
                        <p
                          class="vendor-change__selected-item-title vendor-change__connected-item-title"
                        >
                          Спец Проф Оборудование
                        </p>
                      </div>
                    </div>

                    <!-- Контент с данными -->
                    <div class="vendor-change__selected-item-content">
                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-location vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">
                          г. Екатеринбург, ул. Предельная, 57/3
                        </p>
                      </div>
                      <div class="vendor-change__selected-item-data-container">
                        <div class="vendor-change__selected-item-data">
                          <i class="d-icon-phone vendor-change__selected-item-data-icon"></i>
                          <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                        </div>
                        <div
                          class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                        ></div>

                        <div class="vendor-change__selected-item-data">
                          <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                          <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Карточка подключенного поставщика -->
                <div class="vendor-change__connected-item">
                  <!-- Выбор -->
                  <label for="warehouse1" class="d-radio vendor-change__connected-item-radio">
                    <input
                      type="checkbox"
                      name="warehouse1"
                      id="warehouse1"
                      class="d-radio__input"
                    />
                  </label>

                  <div class="vendor-change__connected-item-content">
                    <!-- Верхушка -->
                    <div class="vendor-change__selected-item-header">
                      <div
                        class="vendor-change__selected-item-title-container vendor-change__connected-item-title-container"
                      >
                        <div class="vendor-change__selected-item-image-container">
                          <img
                            src="/icons/spo-logo.svg"
                            alt=""
                            class="vendor-change__selected-item-image"
                          />
                        </div>
                        <p
                          class="vendor-change__selected-item-title vendor-change__connected-item-title"
                        >
                          Спец Проф Оборудование
                        </p>
                      </div>
                    </div>

                    <!-- Контент с данными -->
                    <div class="vendor-change__selected-item-content">
                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-location vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">
                          г. Екатеринбург, ул. Предельная, 57/3
                        </p>
                      </div>
                      <div class="vendor-change__selected-item-data-container">
                        <div class="vendor-change__selected-item-data">
                          <i class="d-icon-phone vendor-change__selected-item-data-icon"></i>
                          <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                        </div>
                        <div
                          class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                        ></div>

                        <div class="vendor-change__selected-item-data">
                          <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                          <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Карточка подключенного поставщика -->
                <div class="vendor-change__connected-item">
                  <!-- Выбор -->
                  <label for="warehouse1" class="d-radio vendor-change__connected-item-radio">
                    <input
                      type="checkbox"
                      name="warehouse1"
                      id="warehouse1"
                      class="d-radio__input"
                    />
                  </label>

                  <div class="vendor-change__connected-item-content">
                    <!-- Верхушка -->
                    <div class="vendor-change__selected-item-header">
                      <div
                        class="vendor-change__selected-item-title-container vendor-change__connected-item-title-container"
                      >
                        <div class="vendor-change__selected-item-image-container">
                          <img
                            src="/icons/spo-logo.svg"
                            alt=""
                            class="vendor-change__selected-item-image"
                          />
                        </div>
                        <p
                          class="vendor-change__selected-item-title vendor-change__connected-item-title"
                        >
                          Спец Проф Оборудование
                        </p>
                      </div>
                    </div>

                    <!-- Контент с данными -->
                    <div class="vendor-change__selected-item-content">
                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-location vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">
                          г. Екатеринбург, ул. Предельная, 57/3
                        </p>
                      </div>
                      <div class="vendor-change__selected-item-data-container">
                        <div class="vendor-change__selected-item-data">
                          <i class="d-icon-phone vendor-change__selected-item-data-icon"></i>
                          <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                        </div>
                        <div
                          class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                        ></div>

                        <div class="vendor-change__selected-item-data">
                          <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                          <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Карточка подключенного поставщика -->
                <div class="vendor-change__connected-item">
                  <!-- Выбор -->
                  <label for="warehouse1" class="d-radio vendor-change__connected-item-radio">
                    <input
                      type="checkbox"
                      name="warehouse1"
                      id="warehouse1"
                      class="d-radio__input"
                    />
                  </label>

                  <div class="vendor-change__connected-item-content">
                    <!-- Верхушка -->
                    <div class="vendor-change__selected-item-header">
                      <div
                        class="vendor-change__selected-item-title-container vendor-change__connected-item-title-container"
                      >
                        <div class="vendor-change__selected-item-image-container">
                          <img
                            src="/icons/spo-logo.svg"
                            alt=""
                            class="vendor-change__selected-item-image"
                          />
                        </div>
                        <p
                          class="vendor-change__selected-item-title vendor-change__connected-item-title"
                        >
                          Спец Проф Оборудование
                        </p>
                      </div>
                    </div>

                    <!-- Контент с данными -->
                    <div class="vendor-change__selected-item-content">
                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-location vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">
                          г. Екатеринбург, ул. Предельная, 57/3
                        </p>
                      </div>
                      <div class="vendor-change__selected-item-data-container">
                        <div class="vendor-change__selected-item-data">
                          <i class="d-icon-phone vendor-change__selected-item-data-icon"></i>
                          <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                        </div>
                        <div
                          class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                        ></div>

                        <div class="vendor-change__selected-item-data">
                          <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                          <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Карточка подключенного поставщика -->
                <div class="vendor-change__connected-item">
                  <!-- Выбор -->
                  <label for="warehouse1" class="d-radio vendor-change__connected-item-radio">
                    <input
                      type="checkbox"
                      name="warehouse1"
                      id="warehouse1"
                      class="d-radio__input"
                    />
                  </label>

                  <div class="vendor-change__connected-item-content">
                    <!-- Верхушка -->
                    <div class="vendor-change__selected-item-header">
                      <div
                        class="vendor-change__selected-item-title-container vendor-change__connected-item-title-container"
                      >
                        <div class="vendor-change__selected-item-image-container">
                          <img
                            src="/icons/spo-logo.svg"
                            alt=""
                            class="vendor-change__selected-item-image"
                          />
                        </div>
                        <p
                          class="vendor-change__selected-item-title vendor-change__connected-item-title"
                        >
                          Спец Проф Оборудование
                        </p>
                      </div>
                    </div>

                    <!-- Контент с данными -->
                    <div class="vendor-change__selected-item-content">
                      <div class="vendor-change__selected-item-data">
                        <i class="d-icon-location vendor-change__selected-item-data-icon"></i>
                        <p class="vendor-change__selected-item-data-text">
                          г. Екатеринбург, ул. Предельная, 57/3
                        </p>
                      </div>
                      <div class="vendor-change__selected-item-data-container">
                        <div class="vendor-change__selected-item-data">
                          <i class="d-icon-phone vendor-change__selected-item-data-icon"></i>
                          <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                        </div>
                        <div
                          class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
                        ></div>

                        <div class="vendor-change__selected-item-data">
                          <i class="d-icon-mail vendor-change__selected-item-data-icon"></i>
                          <p class="vendor-change__selected-item-data-text">+ 7 (000) 000-00-00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button class="d-button d-button-primary vendor-change__more">
              <span>Еще +8</span>
              <i class="d-icon-angle-rounded-right vendor-change__more-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { shallowRef } from 'vue'
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
  YandexMapClusterer,
} from 'vue-yandex-maps'
import { mapGetters } from 'vuex'

export default {
  name: 'changeVendorsWindow',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    YandexMap,
    YandexMapDefaultSchemeLayer,
    YandexMapDefaultFeaturesLayer,
    YandexMapMarker,
    YandexMapClusterer,
  },
  data() {
    return {
      map: shallowRef(null),
      mapSettings: {
        location: {
          center: [37.420365, 55.903302],
          zoom: 9,
        },
      },
      multisupplier: true,
    }
  },
  computed: {
    ...mapGetters(['optVendors']),
    avLength() {
      return Object.keys(this.items.available).length
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss">
.d-sheet__overlay {
  transition: all 0.2s ease;
  left: auto;
  left: 3333px;
  &.active {
    left: 0;
    transition: all 0.2s ease;
  }
}
</style>
