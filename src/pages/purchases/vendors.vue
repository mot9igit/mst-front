<template>
  <section class="clients" id="clients">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <a class="d-back d-top-back">
        <i class="d-icon-arrow d-back__icon d-top-back-icon"></i>
        <span class="d-back__text">Назад</span>
      </a>
      <ul class="d-breadcrumbs d-top-breadcrumbs">
        <li class="d-breadcrumbs__item d-top-breadcrumbs-item">
          <button class="d-breadcrumbs__button">Оптовые цены</button>
        </li>
        <li class="d-breadcrumbs__item d-top-breadcrumbs-item">
          <button class="d-breadcrumbs__button">Акции</button>
        </li>
        <li class="d-breadcrumbs__item d-breadcrumbs__item--active d-top-breadcrumbs-item">
          <button class="d-breadcrumbs__button">Насторойка акции</button>
        </li>
      </ul>
    </div>

    <div class="clients__header">
      <div class="clients__header-title-wrapper">
        <h1 class="clients__header-title">Мои поставщики (28)</h1>
      </div>
      <p class="clients__header-description">
        Доступные организации, которые являются вашими поставщиками
      </p>
    </div>

    <div class="clients__filters">
      <div class="clients__filters-left">
        <div class="clients__filters-input-container">
          <div class="d-input d-input--light clients__filters-input">
            <input
              type="text"
              placeholder="Введите название организации"
              name="orgName"
              class="d-input__field clients__filters-input-field"
            />
            <div class="d-input__actions clients__filters-input-actions">
              <button class="d-icon-wrapper clients__filters-input-button">
                <i class="d-icon-search-big"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <button class="d-button d-button-primary clients__filters-create">
        <i class="d-icon-plus-flat clients__filters-create-icon"></i>
        Новый Поставщик
      </button>
    </div>

    <div class="clients__card-container">
      <div class="clients__card">
        <div class="clients__card-left">
          <div class="clients__card-info">
            <div class="clients__card-info-image-container">
              <img src="/icons/spo-logo.svg" alt="" class="clients__card-info-image" />
            </div>
            <div class="clients__card-info-content">
              <p class="clients__card-info-title">Спец Проф Оборудование</p>
              <div class="clients__card-info-address">
                <i class="d-icon-location clients__card-info-address-icon"></i>
                <span>г. Екатеринбург, Предельная улица, 57к3</span>
              </div>
            </div>
          </div>

          <div class="d-divider d-divider--vertical clients__card-divider"></div>
          <div class="clients__card-data">
            <div class="clients__card-inn">
              <p class="clients__card-inn-label">ИНН:</p>
              <p class="clients__card-inn-value">6771453803</p>
            </div>
            <div
              class="d-divider d-divider--vertical clients__card-divider clients__card-data-divider"
            ></div>
            <div class="clients__card-contact-container">
              <a href="tel:+70000000000" class="clients__card-contact">
                <i class="d-icon-telephone clients__card-contact-icon"></i>
                <span>+7 (000) 000-00-00</span>
              </a>
              <a href="mailto:andreev@tk-tehnolorg.ru" class="clients__card-contact">
                <i class="d-icon-mail2 clients__card-contact-icon"></i>
                <span>andreev@tk-tehnolorg.ru</span>
              </a>
            </div>
          </div>
        </div>

        <div class="clients__card-right">
          <div class="clients__card-right-left">
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-price-container">
              <div class="clients__card-price">
                <span class="clients__card-price-label">ДЗ:</span>
                <span class="clients__card-price-value">5 500 000 ₽</span>
              </div>
              <div class="clients__card-price clients__card-price--secondary">
                <span class="clients__card-price-label">ПЗД:</span>
                <span class="clients__card-price-value">3 200 000 ₽</span>
              </div>
            </div>
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-vendor">Создан поставщиком</div>
          </div>
          <div class="clients__card-right-right">
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <button class="d-button d-button-primary clients__card-offer">
              <i class="d-icon-plus-flat clients__card-offer-icon"></i>
              Предложение
            </button>
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-action-container">
              <button class="clients__card-action">
                <i class="d-icon-pen2"></i>
              </button>
              <div
                class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
              ></div>
              <button class="clients__card-action">
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="clients__card-top">
          <div class="clients__card-info">
            <div class="clients__card-info-image-container">
              <img src="/icons/spo-logo.svg" alt="" class="clients__card-info-image" />
            </div>
            <div class="clients__card-info-content">
              <p class="clients__card-info-title">Спец Проф Оборудование</p>
              <div class="clients__card-info-address">
                <i class="d-icon-location clients__card-info-address-icon"></i>
                <span>г. Екатеринбург, Предельная улица, 57к3</span>
              </div>
            </div>
          </div>

          <div class="clients__card-top-right">
            <div class="clients__card-top-right-top">
              <button class="d-button d-button-primary clients__card-offer">
                <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                Предложение
              </button>
              <div class="clients__card-action-container">
                <button class="clients__card-action">
                  <i class="d-icon-pen2"></i>
                </button>
                <div
                  class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
                ></div>
                <button class="clients__card-action">
                  <i class="d-icon-trash"></i>
                </button>
              </div>
            </div>
            <div class="clients__card-vendor-wrapper">
              <div class="clients__card-vendor">Создан поставщиком</div>
            </div>
          </div>
        </div>

        <div class="clients__card-bottom">
          <div class="clients__card-bottom-left">
            <div class="clients__card-contact-container">
              <a href="tel:+70000000000" class="clients__card-contact">
                <i class="d-icon-telephone clients__card-contact-icon"></i>
                <span>+7 (000) 000-00-00</span>
              </a>
              <a href="mailto:andreev@tk-tehnolorg.ru" class="clients__card-contact">
                <i class="d-icon-mail2 clients__card-contact-icon"></i>
                <span>andreev@tk-tehnolorg.ru</span>
              </a>
            </div>
            <div class="clients__card-inn">
              <p class="clients__card-inn-label">ИНН:</p>
              <p class="clients__card-inn-value">6771453803</p>
            </div>
          </div>

          <div class="clients__card-price-container">
            <div class="clients__card-price">
              <span class="clients__card-price-label">ДЗ:</span>
              <span class="clients__card-price-value">5 500 000 ₽</span>
            </div>
            <div class="clients__card-price clients__card-price--secondary">
              <span class="clients__card-price-label">ПЗД:</span>
              <span class="clients__card-price-value">3 200 000 ₽</span>
            </div>
          </div>
        </div>
      </div>
      <div class="clients__card">
        <div class="clients__card-left">
          <div class="clients__card-info">
            <div class="clients__card-info-image-container">
              <img src="/icons/spo-logo.svg" alt="" class="clients__card-info-image" />
            </div>
            <div class="clients__card-info-content">
              <p class="clients__card-info-title">Спец Проф Оборудование</p>
              <div class="clients__card-info-address">
                <i class="d-icon-location clients__card-info-address-icon"></i>
                <span>г. Екатеринбург, Предельная улица, 57к3</span>
              </div>
            </div>
          </div>

          <div class="d-divider d-divider--vertical clients__card-divider"></div>
          <div class="clients__card-data">
            <div class="clients__card-inn">
              <p class="clients__card-inn-label">ИНН:</p>
              <p class="clients__card-inn-value">6771453803</p>
            </div>
            <div
              class="d-divider d-divider--vertical clients__card-divider clients__card-data-divider"
            ></div>
            <div class="clients__card-contact-container">
              <a href="tel:+70000000000" class="clients__card-contact">
                <i class="d-icon-telephone clients__card-contact-icon"></i>
                <span>+7 (000) 000-00-00</span>
              </a>
              <a href="mailto:andreev@tk-tehnolorg.ru" class="clients__card-contact">
                <i class="d-icon-mail2 clients__card-contact-icon"></i>
                <span>andreev@tk-tehnolorg.ru</span>
              </a>
            </div>
          </div>
        </div>

        <div class="clients__card-right">
          <div class="clients__card-right-left">
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-price-container">
              <div class="clients__card-price">
                <span class="clients__card-price-label">ДЗ:</span>
                <span class="clients__card-price-value">5 500 000 ₽</span>
              </div>
              <div class="clients__card-price clients__card-price--secondary">
                <span class="clients__card-price-label">ПЗД:</span>
                <span class="clients__card-price-value">3 200 000 ₽</span>
              </div>
            </div>
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-vendor">Создан поставщиком</div>
          </div>
          <div class="clients__card-right-right">
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <button class="d-button d-button-primary clients__card-offer">
              <i class="d-icon-plus-flat clients__card-offer-icon"></i>
              Предложение
            </button>
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-action-container">
              <button class="clients__card-action">
                <i class="d-icon-pen2"></i>
              </button>
              <div
                class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
              ></div>
              <button class="clients__card-action">
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="clients__card-top">
          <div class="clients__card-info">
            <div class="clients__card-info-image-container">
              <img src="/icons/spo-logo.svg" alt="" class="clients__card-info-image" />
            </div>
            <div class="clients__card-info-content">
              <p class="clients__card-info-title">Спец Проф Оборудование</p>
              <div class="clients__card-info-address">
                <i class="d-icon-location clients__card-info-address-icon"></i>
                <span>г. Екатеринбург, Предельная улица, 57к3</span>
              </div>
            </div>
          </div>

          <div class="clients__card-top-right">
            <div class="clients__card-top-right-top">
              <button class="d-button d-button-primary clients__card-offer">
                <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                Предложение
              </button>
              <div class="clients__card-action-container">
                <button class="clients__card-action">
                  <i class="d-icon-pen2"></i>
                </button>
                <div
                  class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
                ></div>
                <button class="clients__card-action">
                  <i class="d-icon-trash"></i>
                </button>
              </div>
            </div>
            <div class="clients__card-vendor-wrapper">
              <div class="clients__card-vendor">Создан поставщиком</div>
            </div>
          </div>
        </div>

        <div class="clients__card-bottom">
          <div class="clients__card-bottom-left">
            <div class="clients__card-contact-container">
              <a href="tel:+70000000000" class="clients__card-contact">
                <i class="d-icon-telephone clients__card-contact-icon"></i>
                <span>+7 (000) 000-00-00</span>
              </a>
              <a href="mailto:andreev@tk-tehnolorg.ru" class="clients__card-contact">
                <i class="d-icon-mail2 clients__card-contact-icon"></i>
                <span>andreev@tk-tehnolorg.ru</span>
              </a>
            </div>
            <div class="clients__card-inn">
              <p class="clients__card-inn-label">ИНН:</p>
              <p class="clients__card-inn-value">6771453803</p>
            </div>
          </div>

          <div class="clients__card-price-container">
            <div class="clients__card-price">
              <span class="clients__card-price-label">ДЗ:</span>
              <span class="clients__card-price-value">5 500 000 ₽</span>
            </div>
            <div class="clients__card-price clients__card-price--secondary">
              <span class="clients__card-price-label">ПЗД:</span>
              <span class="clients__card-price-value">3 200 000 ₽</span>
            </div>
          </div>
        </div>
      </div>
      <div class="clients__card">
        <div class="clients__card-left">
          <div class="clients__card-info">
            <div class="clients__card-info-image-container">
              <img src="/icons/spo-logo.svg" alt="" class="clients__card-info-image" />
            </div>
            <div class="clients__card-info-content">
              <p class="clients__card-info-title">Спец Проф Оборудование</p>
              <div class="clients__card-info-address">
                <i class="d-icon-location clients__card-info-address-icon"></i>
                <span>г. Екатеринбург, Предельная улица, 57к3</span>
              </div>
            </div>
          </div>

          <div class="d-divider d-divider--vertical clients__card-divider"></div>
          <div class="clients__card-data">
            <div class="clients__card-inn">
              <p class="clients__card-inn-label">ИНН:</p>
              <p class="clients__card-inn-value">6771453803</p>
            </div>
            <div
              class="d-divider d-divider--vertical clients__card-divider clients__card-data-divider"
            ></div>
            <div class="clients__card-contact-container">
              <a href="tel:+70000000000" class="clients__card-contact">
                <i class="d-icon-telephone clients__card-contact-icon"></i>
                <span>+7 (000) 000-00-00</span>
              </a>
              <a href="mailto:andreev@tk-tehnolorg.ru" class="clients__card-contact">
                <i class="d-icon-mail2 clients__card-contact-icon"></i>
                <span>andreev@tk-tehnolorg.ru</span>
              </a>
            </div>
          </div>
        </div>

        <div class="clients__card-right">
          <div class="clients__card-right-left">
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-price-container">
              <div class="clients__card-price">
                <span class="clients__card-price-label">ДЗ:</span>
                <span class="clients__card-price-value">5 500 000 ₽</span>
              </div>
              <div class="clients__card-price clients__card-price--secondary">
                <span class="clients__card-price-label">ПЗД:</span>
                <span class="clients__card-price-value">3 200 000 ₽</span>
              </div>
            </div>
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-vendor">Создан поставщиком</div>
          </div>
          <div class="clients__card-right-right">
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <button class="d-button d-button-primary clients__card-offer">
              <i class="d-icon-plus-flat clients__card-offer-icon"></i>
              Предложение
            </button>
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-action-container">
              <button class="clients__card-action">
                <i class="d-icon-pen2"></i>
              </button>
              <div
                class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
              ></div>
              <button class="clients__card-action">
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="clients__card-top">
          <div class="clients__card-info">
            <div class="clients__card-info-image-container">
              <img src="/icons/spo-logo.svg" alt="" class="clients__card-info-image" />
            </div>
            <div class="clients__card-info-content">
              <p class="clients__card-info-title">Спец Проф Оборудование</p>
              <div class="clients__card-info-address">
                <i class="d-icon-location clients__card-info-address-icon"></i>
                <span>г. Екатеринбург, Предельная улица, 57к3</span>
              </div>
            </div>
          </div>

          <div class="clients__card-top-right">
            <div class="clients__card-top-right-top">
              <button class="d-button d-button-primary clients__card-offer">
                <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                Предложение
              </button>
              <div class="clients__card-action-container">
                <button class="clients__card-action">
                  <i class="d-icon-pen2"></i>
                </button>
                <div
                  class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
                ></div>
                <button class="clients__card-action">
                  <i class="d-icon-trash"></i>
                </button>
              </div>
            </div>
            <div class="clients__card-vendor-wrapper">
              <div class="clients__card-vendor">Создан поставщиком</div>
            </div>
          </div>
        </div>

        <div class="clients__card-bottom">
          <div class="clients__card-bottom-left">
            <div class="clients__card-contact-container">
              <a href="tel:+70000000000" class="clients__card-contact">
                <i class="d-icon-telephone clients__card-contact-icon"></i>
                <span>+7 (000) 000-00-00</span>
              </a>
              <a href="mailto:andreev@tk-tehnolorg.ru" class="clients__card-contact">
                <i class="d-icon-mail2 clients__card-contact-icon"></i>
                <span>andreev@tk-tehnolorg.ru</span>
              </a>
            </div>
            <div class="clients__card-inn">
              <p class="clients__card-inn-label">ИНН:</p>
              <p class="clients__card-inn-value">6771453803</p>
            </div>
          </div>

          <div class="clients__card-price-container">
            <div class="clients__card-price">
              <span class="clients__card-price-label">ДЗ:</span>
              <span class="clients__card-price-value">5 500 000 ₽</span>
            </div>
            <div class="clients__card-price clients__card-price--secondary">
              <span class="clients__card-price-label">ПЗД:</span>
              <span class="clients__card-price-value">3 200 000 ₽</span>
            </div>
          </div>
        </div>
      </div>
      <div class="clients__card">
        <div class="clients__card-left">
          <div class="clients__card-info">
            <div class="clients__card-info-image-container">
              <img src="/icons/spo-logo.svg" alt="" class="clients__card-info-image" />
            </div>
            <div class="clients__card-info-content">
              <p class="clients__card-info-title">Спец Проф Оборудование</p>
              <div class="clients__card-info-address">
                <i class="d-icon-location clients__card-info-address-icon"></i>
                <span>г. Екатеринбург, Предельная улица, 57к3</span>
              </div>
            </div>
          </div>

          <div class="d-divider d-divider--vertical clients__card-divider"></div>
          <div class="clients__card-data">
            <div class="clients__card-inn">
              <p class="clients__card-inn-label">ИНН:</p>
              <p class="clients__card-inn-value">6771453803</p>
            </div>
            <div
              class="d-divider d-divider--vertical clients__card-divider clients__card-data-divider"
            ></div>
            <div class="clients__card-contact-container">
              <a href="tel:+70000000000" class="clients__card-contact">
                <i class="d-icon-telephone clients__card-contact-icon"></i>
                <span>+7 (000) 000-00-00</span>
              </a>
              <a href="mailto:andreev@tk-tehnolorg.ru" class="clients__card-contact">
                <i class="d-icon-mail2 clients__card-contact-icon"></i>
                <span>andreev@tk-tehnolorg.ru</span>
              </a>
            </div>
          </div>
        </div>

        <div class="clients__card-right">
          <div class="clients__card-right-left">
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-price-container">
              <div class="clients__card-price">
                <span class="clients__card-price-label">ДЗ:</span>
                <span class="clients__card-price-value">5 500 000 ₽</span>
              </div>
              <div class="clients__card-price clients__card-price--secondary">
                <span class="clients__card-price-label">ПЗД:</span>
                <span class="clients__card-price-value">3 200 000 ₽</span>
              </div>
            </div>
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-vendor">Создан поставщиком</div>
          </div>
          <div class="clients__card-right-right">
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <button class="d-button d-button-primary clients__card-offer">
              <i class="d-icon-plus-flat clients__card-offer-icon"></i>
              Предложение
            </button>
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-action-container">
              <button class="clients__card-action">
                <i class="d-icon-pen2"></i>
              </button>
              <div
                class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
              ></div>
              <button class="clients__card-action">
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="clients__card-top">
          <div class="clients__card-info">
            <div class="clients__card-info-image-container">
              <img src="/icons/spo-logo.svg" alt="" class="clients__card-info-image" />
            </div>
            <div class="clients__card-info-content">
              <p class="clients__card-info-title">Спец Проф Оборудование</p>
              <div class="clients__card-info-address">
                <i class="d-icon-location clients__card-info-address-icon"></i>
                <span>г. Екатеринбург, Предельная улица, 57к3</span>
              </div>
            </div>
          </div>

          <div class="clients__card-top-right">
            <div class="clients__card-top-right-top">
              <button class="d-button d-button-primary clients__card-offer">
                <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                Предложение
              </button>
              <div class="clients__card-action-container">
                <button class="clients__card-action">
                  <i class="d-icon-pen2"></i>
                </button>
                <div
                  class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
                ></div>
                <button class="clients__card-action">
                  <i class="d-icon-trash"></i>
                </button>
              </div>
            </div>
            <div class="clients__card-vendor-wrapper">
              <div class="clients__card-vendor">Создан поставщиком</div>
            </div>
          </div>
        </div>

        <div class="clients__card-bottom">
          <div class="clients__card-bottom-left">
            <div class="clients__card-contact-container">
              <a href="tel:+70000000000" class="clients__card-contact">
                <i class="d-icon-telephone clients__card-contact-icon"></i>
                <span>+7 (000) 000-00-00</span>
              </a>
              <a href="mailto:andreev@tk-tehnolorg.ru" class="clients__card-contact">
                <i class="d-icon-mail2 clients__card-contact-icon"></i>
                <span>andreev@tk-tehnolorg.ru</span>
              </a>
            </div>
            <div class="clients__card-inn">
              <p class="clients__card-inn-label">ИНН:</p>
              <p class="clients__card-inn-value">6771453803</p>
            </div>
          </div>

          <div class="clients__card-price-container">
            <div class="clients__card-price">
              <span class="clients__card-price-label">ДЗ:</span>
              <span class="clients__card-price-value">5 500 000 ₽</span>
            </div>
            <div class="clients__card-price clients__card-price--secondary">
              <span class="clients__card-price-label">ПЗД:</span>
              <span class="clients__card-price-value">3 200 000 ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'purchasesVendors',
}
</script>
<style lang="scss"></style>
