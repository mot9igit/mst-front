<template>
  <section class="collection" id="collection">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>

    <div class="collection__header">
      <h1 class="collection__header-title">Мои коллекции</h1>
    </div>

    <div class="collection__block-container">
      <div class="collection__block">
        <div class="collection__block-title-wrapper">
          <p class="collection__block-title">Наименование коллекции</p>
          <p class="collection__block-title-description">
            Введите наименование, которое будет отражать смысл вашей коллекции
          </p>
        </div>
        <div class="d-input d-input--light collection__block-input">
          <input
            type="text"
            placeholder="Основная продукция Интерскол"
            name="date"
            class="d-input__field collection__block-input-field"
          />
          <div class="d-input__actions">
            <div class="d-divider d-divider--vertical d-input__actions-divider"></div>
            <button class="d-icon-wrapper collection__block-input-button">
              <i class="d-icon-pen2"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="collection__block">
        <div class="collection__block-title-wrapper">
          <p class="collection__block-title">Описание коллекции</p>
          <p class="collection__block-title-description">
            Введите описание. Заполняйте его для себя, если необходимо
          </p>
        </div>
        <div class="d-input d-input--light collection__block-input">
          <input
            type="text"
            placeholder="Основная продукция Интерскол"
            name="date"
            class="d-input__field collection__block-input-field"
          />
          <div class="d-input__actions">
            <div class="d-divider d-divider--vertical d-input__actions-divider"></div>
            <button class="d-icon-wrapper collection__block-input-button">
              <i class="d-icon-pen2"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="collection__block collection__block--alt">
        <div class="collection__block-inner">
          <div class="collection__block-title-wrapper">
            <p class="collection__block-title">Выберите условие добавления товаров</p>
          </div>
          <div class="collection__block-conditions">
            <div class="collection__block-radio-container">
              <div class="d-radio__wrapper collection__block-radio-wrapper">
                <label for="test-radio1" class="d-radio collection__block-radio">
                  <input
                    type="radio"
                    name="test-radios"
                    id="test-radio1"
                    class="d-radio__input collection__block-radio-input"
                    checked
                  />
                </label>
                <label for="test-radio1" class="d-radio__label collection__block-radio-label"
                  >Задать условие</label
                >
              </div>
              <div class="d-radio__wrapper collection__block-radio-wrapper">
                <label for="test-radio2" class="d-radio collection__block-radio">
                  <input
                    type="radio"
                    name="test-radios"
                    id="test-radio2"
                    class="d-radio__input collection__block-radio-input"
                  />
                </label>
                <label for="test-radio2" class="d-radio__label collection__block-radio-label"
                  >Загрузить файлом</label
                >
              </div>
              <div class="d-radio__wrapper collection__block-radio-wrapper">
                <label for="test-radio3" class="d-radio collection__block-radio">
                  <input
                    type="radio"
                    name="test-radios"
                    id="test-radio3"
                    class="d-radio__input collection__block-radio-input"
                  />
                </label>
                <label for="test-radio3" class="d-radio__label collection__block-radio-label"
                  >Все товары</label
                >
              </div>
            </div>
            <div class="collection__block-conditions-add">
              <div class="d-radio__wrapper collection__block-radio-wrapper">
                <label for="test-radio4" class="d-radio collection__block-radio">
                  <input
                    type="checkbox"
                    name="test-radios2"
                    id="test-radio4"
                    class="d-radio__input collection__block-radio-input"
                  />
                </label>
                <label for="test-radio4" class="d-radio__label collection__block-radio-label"
                  >Загрузить файлом</label
                >
              </div>
              <button
                class="d-button d-button-primary d-button--no-shadow collection__block-conditions-add-button"
                data-modal2-trigger="chooseConditions"
              >
                <i class="d-icon-plus-flat collection__block-conditions-add-button-icon"></i>
                <span>Добавить условие</span>
              </button>
            </div>
          </div>
        </div>

        <div class="collection__block-conditions-category">
          <div class="collection__block-conditions-category-content">
            <div class="collection__block-title-wrapper">
              <p class="collection__block-title">&nbsp;</p>
            </div>
            <div class="d-radio__wrapper collection__block-radio-wrapper">
              <label for="test-radio4" class="d-radio collection__block-radio">
                <input
                  type="checkbox"
                  name="test-radios2"
                  id="test-radio4"
                  class="d-radio__input collection__block-radio-input"
                />
              </label>
              <label for="test-radio4" class="d-radio__label collection__block-radio-label"
                >Применять условия к новым товарам</label
              >
            </div>
          </div>

          <div class="collection__block-conditions-category-content">
            <div class="collection__block-title-wrapper">
              <p class="collection__block-title">Условие: Категории</p>
            </div>

            <div class="collection__block-conditions-category-actions">
              <div class="d-input d-input--light collection__block-input">
                <input
                  type="text"
                  placeholder="Основная продукция Интерскол"
                  name="date"
                  class="d-input__field collection__block-input-field"
                />
                <div class="d-input__actions">
                  <div class="d-divider d-divider--vertical d-input__actions-divider"></div>
                  <button class="d-icon-wrapper collection__block-input-button">
                    <i class="d-icon-angle-rounded-bottom-bold"></i>
                  </button>
                </div>
              </div>
              <div
                class="d-divider d-divider--vertical d-divider--no-margi collection__block-conditions-category-actions-divider"
              ></div>
              <button class="collection__block-conditions-category-actions-button">
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="collection__files">
          <div class="collection__files-header">
            <p class="collection__files-header-title">Загруженные файлы:</p>

            <button
              class="d-button d-button-primary d-button-primary-small d-button--no-shadow collection__files-header-button"
            >
              <i class="d-icon-download collection__files-header-button-icon"></i>
              <span>Загрузить файл</span>
            </button>
          </div>

          <div class="collection__files-list">
            <div class="collection__files-list-item">
              <div class="collection__files-list-item-title-wrapper">
                <i class="d-icon-excel collection__files-list-item-title-icon"></i>
                <p class="collection__files-list-item-title">Товар 2345.xl</p>
              </div>

              <div class="collection__files-list-item-actions">
                <button
                  class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow collection__files-list-item-actions-button"
                >
                  Смотреть файл
                </button>
                <div
                  class="d-divider d-divider--vertical d-divider--no-margin collection__files-list-item-actions-divider"
                ></div>
                <button class="collection__files-list-item-actions-delete">
                  <i class="d-icon-trash"></i>
                </button>
              </div>
            </div>
            <div class="collection__files-list-item">
              <div class="collection__files-list-item-title-wrapper">
                <i class="d-icon-excel collection__files-list-item-title-icon"></i>
                <p class="collection__files-list-item-title">Товар 2345.xl</p>
              </div>

              <div class="collection__files-list-item-actions">
                <button
                  class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow collection__files-list-item-actions-button"
                >
                  Смотреть файл
                </button>
                <div
                  class="d-divider d-divider--vertical d-divider--no-margin collection__files-list-item-actions-divider"
                ></div>
                <button class="collection__files-list-item-actions-delete">
                  <i class="d-icon-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <label class="d-upload collection__upload" for="promo-upload">
          <input type="file" name="promo-upload" id="promo-upload" class="d-upload__input" />
          <img
            src="/icons/upload-cloud.svg"
            alt=""
            class="d-upload__icon collection__upload-icon"
            width="80"
            height="50"
          />
          <div class="collection__upload-title-wrapper">
            <p class="d-upload__title collection__upload-title">Перетащите файл в эту область</p>
            <p class="d-upload__description collection__upload-description">
              Вы также можете загрузить файлы word, exel, и все такое,
              <a href="/" class="d-link d-upload__link collection__upload-link"> нажав сюда</a>
            </p>
          </div>
        </label>
      </div>
    </div>

    <ul class="d-tab2__container collection__tabs">
      <li class="d-tab2 d-tab2--active">
        <a href="/views/lk/about/index.html" class="collection__tabs-link">
          <span>Исключения</span>
          <span class="collection__tabs-badge">8</span>
        </a>
      </li>
      <li class="d-tab2">
        <a href="/views/lk/staff/index.html" class="collection__tabs-link">
          <span>Добавленные товары</span>
          <span class="collection__tabs-badge">8</span>
        </a>
      </li>
    </ul>

    <form class="d-search collection__search">
      <input
        type="text"
        placeholder="Найти товар по названию или артикулу"
        class="d-search__field collection__search-field"
      />
      <button
        type="submit"
        class="d-button d-button-primary d-button-primary-small box-shadow-none d-search__button collection__search-button"
      >
        Найти
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

    <div class="d-table__wrapper promotions__card-products">
      <table class="d-table d-table--head-col-divider collection__table">
        <thead class="d-table__head collection__table-head">
          <tr class="d-table__row collection__table-hrow">
            <th class="d-table__head-col collection__table-hcol">
              <div class="flex-center">
                <label class="d-radio d-radio--white" id="checkbox1">
                  <input type="checkbox" name="checkbox1" id="checkbox1" class="d-radio__input" />
                </label>
              </div>
            </th>
            <th class="d-table__head-col collection__table-hcol">Товар</th>
            <th class="d-table__head-col collection__table-hcol">Тип добавления</th>
            <th class="d-table__head-col collection__table-hcol">Бренд</th>
            <th class="d-table__head-col collection__table-hcol">Категория</th>
            <th class="d-table__head-col collection__table-hcol">Тег</th>
            <th class="d-table__head-col collection__table-hcol">
              <div class="flex-center">
                <button class="d-icon-wrapper d-icon-wrapper--big d-icon-wrapper--white">
                  <i class="d-icon-trash d-table__icon"></i>
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="d-table__body">
          <tr class="d-table__row">
            <td class="d-table__col collection__table-col"></td>
            <td class="d-table__col collection__table-col"></td>
            <td class="d-table__col collection__table-col"></td>
            <td class="d-table__col collection__table-col"></td>
            <td class="d-table__col collection__table-col"></td>
            <td class="d-table__col collection__table-col"></td>
            <td class="d-table__col collection__table-col"></td>
          </tr>
          <tr class="d-table__row">
            <td class="d-table__col collection__table-col">
              <div class="flex-center">
                <label class="d-radio d-radio--black" id="checkbox2">
                  <input type="checkbox" name="checkbox2" id="checkbox2" class="d-radio__input" />
                </label>
              </div>
            </td>
            <td class="d-table__col collection__table-col">
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
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner">Файлом</div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner">Интерскол</div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner"></div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner"></div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="flex-center">
                <button class="d-icon-wrapper d-icon-wrapper--big">
                  <i class="d-icon-trash d-table__icon"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr class="d-table__row">
            <td class="d-table__col collection__table-col">
              <div class="flex-center">
                <label class="d-radio d-radio--black" id="checkbox2">
                  <input type="checkbox" name="checkbox2" id="checkbox2" class="d-radio__input" />
                </label>
              </div>
            </td>
            <td class="d-table__col collection__table-col">
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
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner">Файлом</div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner">Интерскол</div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner"></div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner"></div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="flex-center">
                <button class="d-icon-wrapper d-icon-wrapper--big">
                  <i class="d-icon-trash d-table__icon"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr class="d-table__row">
            <td class="d-table__col collection__table-col">
              <div class="flex-center">
                <label class="d-radio d-radio--black" id="checkbox2">
                  <input type="checkbox" name="checkbox2" id="checkbox2" class="d-radio__input" />
                </label>
              </div>
            </td>
            <td class="d-table__col collection__table-col">
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
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner">Файлом</div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner">Интерскол</div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner"></div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner"></div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="flex-center">
                <button class="d-icon-wrapper d-icon-wrapper--big">
                  <i class="d-icon-trash d-table__icon"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr class="d-table__row">
            <td class="d-table__col collection__table-col">
              <div class="flex-center">
                <label class="d-radio d-radio--black" id="checkbox2">
                  <input type="checkbox" name="checkbox2" id="checkbox2" class="d-radio__input" />
                </label>
              </div>
            </td>
            <td class="d-table__col collection__table-col">
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
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner">Файлом</div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner">Интерскол</div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner"></div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="d-table__col-inner"></div>
            </td>
            <td class="d-table__col collection__table-col">
              <div class="flex-center">
                <button class="d-icon-wrapper d-icon-wrapper--big">
                  <i class="d-icon-trash d-table__icon"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

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
        </div>

        <div class="d-field-container d-field-container--long d-table__footer-fields">
          <div
            class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical collection__field-wrapper"
          >
            <label for="manual" class="d-dropdown__label">Массовые действия </label>
            <div class="d-input d-input--light">
              <input
                type="text"
                placeholder="Задать вручную"
                name="manual"
                class="d-input__field d-table__footer-input"
                data-input-id="manual"
                required
              />
              <button class="d-input__dropdown-button">
                <i class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"></i>
              </button>
            </div>
          </div>
          <div
            class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical collection__field-wrapper"
          >
            <label for="extra-charge" class="d-dropdown__label">Тип ценообразования </label>
            <div class="d-input d-input--light">
              <input
                type="text"
                placeholder="Наценка"
                name="extra-charge"
                class="d-input__field d-table__footer-input"
                data-input-id="extra-charge"
                required
              />
              <button class="d-input__dropdown-button">
                <i class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"></i>
              </button>
            </div>
          </div>
          <div
            class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical collection__field-wrapper collection__field-wrapper--fit"
          >
            <label for="value" class="d-dropdown__label">Значение </label>
            <div class="d-field-container d-field-container--long">
              <div class="d-input d-input--light">
                <input
                  type="text"
                  placeholder="0"
                  name="value"
                  class="d-input__field d-table__footer-input d-table__footer-input--value"
                  data-input-id="value"
                  required
                />
              </div>
              <div class="d-input d-input--light">
                <input
                  type="text"
                  placeholder="%"
                  name="value-type"
                  class="d-input__field d-table__footer-input d-table__footer-input--value-type"
                  data-input-id="value-type"
                  required
                />
                <button class="d-input__dropdown-button">
                  <i class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"></i>
                </button>
              </div>
            </div>
          </div>
          <div
            class="d-field-wrapper d-field-wrapper--small d-field-wrapper--vertical collection__field-wrapper"
          >
            <label for="test-dropdown" class="d-dropdown__label">От типа цены </label>
            <div class="d-input d-input--light">
              <input
                type="text"
                placeholder="Тип цен"
                name="price-type"
                class="d-input__field d-table__footer-input"
                data-input-id="price-type"
                required
              />
              <button class="d-input__dropdown-button">
                <i class="d-icon-angle-rounded-bottom d-input__dropdown-button-icon"></i>
              </button>
            </div>
          </div>

          <button
            class="d-icon-wrapper d-icon-wrapper--big d-icon-wrapper--active collection__check"
          >
            <i class="d-icon-check"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'

export default {
  name: 'WarehouseCollection',
  components: { Breadcrumbs },
}
</script>
<style lang="scss"></style>
