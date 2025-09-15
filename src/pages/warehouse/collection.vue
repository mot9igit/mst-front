<template>
  <section class="collection" id="collection">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>

    <div class="collection__header">
      <h1 class="collection__header-title">Мои коллекции</h1>
    </div>
    <Loader v-if="loading" />
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
            v-model="collectionData.name"
          />
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
            v-model="collectionData.description"
          />
        </div>
      </div>

      <Tabs>
        <TabList class="d-tab2__container collection__tabs">
          <Tab class="d-tab2" :class="{'d-tab2--active' : tabException}" :value="tabException">
            <button
              class="collection__tabs-link"
              @click.prevent="tabException = true"
              >
                <span>Исключения</span>
                <span class="collection__tabs-badge">8</span>
            </button>
          </Tab>
          <Tab class="d-tab2" :class="{'d-tab2--active' : !tabException}" :value="tabException">
            <button
          class="collection__tabs-link"
          @click.prevent="tabException = false"
          >
            <span>Добавленные товары</span>
            <span class="collection__tabs-badge">8</span>
          </button>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel v-if="tabException">

              <div class="collection__block collection__block--alt">
                <div class="collection__block-inner">
                  <div class="collection__block-title-wrapper">
                    <p class="collection__block-title">Выберите условие добавления товаров</p>
                  </div>
                  <div class="collection__block-conditions">
                    <TabList v-for="(item, index) in tabs" :key="index" class="collection__block-radio-container">

                      <Tab :value="item.value" class="d-radio__wrapper collection__block-radio-wrapper">
                        <label :for="index" class="d-radio collection__block-radio">
                          <input
                            type="radio"
                            :name="index"
                            :id="index"
                            class="d-radio__input collection__block-radio-input"
                            :value="item.value"
                            v-model="this.type"
                          />
                        </label>
                        <label :for="index" class="d-radio__label collection__block-radio-label"
                          >{{ item.title }}
                      </label>
                      </Tab>

                    </TabList>
                  </div>
                </div>

                <TabPanel v-if="type == 1">
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
                        <p class="collection__block-title">&nbsp;</p>
                      </div>
                      <div class="d-radio__wrapper collection__block-radio-wrapper">
                        <button
                            class="d-button d-button-primary d-button--no-shadow collection__block-conditions-add-button"
                            @click.prevent="openChooseConditionsModal()"
                          >
                          <i class="d-icon-plus-flat collection__block-conditions-add-button-icon"></i>
                          <span>Добавить условие</span>
                        </button>
                      </div>
                    </div>

                    <teleport to="body">
                      <customModal v-model="this.chooseConditionsModal" class="collection__modal" >
                        <h2>Выберите тип условия</h2>
                        <div class="chips">
                          <div class="chip" v-for="(item, index) in termsChips" :key="index"
                          :class="{'collection__modal-chip-active' : item.active === true}"
                          >
                            <button class="collection__modal-chips" @click.prevent="activeChip(index)">
                              {{ item.name }}
                            </button>
                          </div>
                        </div>
                        <div class="collection__modal-buttons">
                         <button
                            type="button"
                            href="#"
                            class="d-button d-button-primary d-button--sm-shadow  collection__modal-cansel"
                            @click.prevent="this.chooseConditionsModal = false"
                          >
                            Отмена
                          </button>
                          <button
                            type="button"
                            href="#"
                            class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
                            @click.prevent="addTerms()"
                          >
                            Ok
                          </button>
                        </div>

                      </customModal>
                    </teleport>

                    <div class="collection__block-conditions-category-content" v-for="(item, index) in this.termsData" :key="index">
                      <div class="collection__block-title-wrapper">
                        <p class="collection__block-title">Условие: {{ item.term == "1" ? "Категории" : item.term == "2" ? "Категории системы интеграции" : item.term == "3" ? "Теги" : "Бренды" }}</p>
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
                        <button class="collection__block-conditions-category-actions-button" @click.prevent="deleteTerms(index)">
                          <i class="d-icon-trash"></i>
                        </button>
                      </div>
                    </div>

                  </div>
                </TabPanel>

                <TabPanel v-if="type == 2">
                  <div class="collection__files" v-if="files && !showDropZone">
                    <div class="collection__files-header">
                      <p class="collection__files-header-title">Загруженные файлы:</p>

                      <button
                        class="d-button d-button-primary d-button-primary-small d-button--no-shadow collection__files-header-button"
                        @click.prevent="this.showDropZone = true"
                      >
                        <i class="d-icon-download collection__files-header-button-icon"></i>
                        <span>Загрузить файл</span>
                      </button>
                    </div>

                    <div class="collection__files-list">
                      <div class="collection__files-list-item">
                        <div class="collection__files-list-item-title-wrapper">
                          <i class="d-icon-excel collection__files-list-item-title-icon"></i>
                          <p class="collection__files-list-item-title">{{ files.name }}</p>
                        </div>

                        <div class="collection__files-list-item-actions">
                          <a
                          :href="files.original_href"
                          target="_blank"
                            class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow collection__files-list-item-actions-button"
                          >
                            Смотреть файл
                        </a>
                          <div
                            class="d-divider d-divider--vertical d-divider--no-margin collection__files-list-item-actions-divider"
                          ></div>
                          <button class="collection__files-list-item-actions-delete" @click.prevent="deleteFile()">
                            <i class="d-icon-trash"></i>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>


                  <DropZone v-else
                    class="d-upload collection__upload"
                    :maxFiles="Number(1)"
                    url="/rest/file_upload.php?upload_products=xlsx"
                    :uploadOnDrop="true"
                    :multipleUpload="true"
                    :acceptedFiles="['xlsx', 'xlsx']"
                    :parallelUpload="1"
                    @sending="parseFile"
                    v-bind="args"
                  >
                  <template v-slot:message>
                    <div class="collection__upload-title-wrapper">
                      <i class="pi pi-cloud-upload"></i>
                      <b class="d-upload__title collection__upload-title">Перетащите файл в эту область</b>
                      <p class="d-upload__description collection__upload-description">Вы также можете загрузить файл,
                        <span class="d-link d-upload__link collection__upload-link">нажав сюда</span></p>
                    </div>
                  </template>
                </DropZone>



                </TabPanel>

                <TabPanel v-if="type == 3">

                </TabPanel>



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


              </div>

          </TabPanel>

          <TabPanel v-else>



          </TabPanel>

        </TabPanels>
      </Tabs>






    </div>




  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue';
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist';
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import customModal from '@/shared/ui/Modal.vue'
import DropZone from 'dropzone-vue';
import BaseTable from '@/shared/ui/table/table.vue'

export default {
  name: 'WarehouseCollection',
  components: { Breadcrumbs, Loader, Tabs, TabList, TabPanels, TabPanel, customModal, DropZone, BaseTable },
  data() {
    return {
      loading: true,
      collectionData: [],
      tabException: true,
      type: 1,
      terms: [],
      term: '1',
      chooseConditionsModal: false,
      tabs: {
        terms:{
          value: 1,
          title: 'Задать условие',

        },
        file:{
          value: 2,
          title: 'Загрузить файлом',
        },
        products:{
          value: 3,
          title: 'Все товары',
        },
      },
      termsChips: [
        {name:'Категории', active: false, placeholder: 'Выберите категории',},
        {name:'Категории системы интеграции', active: false, placeholder: 'Выберите категории системы интеграции',},
        {name:'Теги', active: false, placeholder: 'Выберите теги',},
        {name:'Бренды', active: false, placeholder: 'Выберите бренды',},
      ],
      termsData: [],
      apply: [],
      tags: [],
      vendors: [],
      catalog_our: [],
      catalog: [],
      kenost_table: [],
      products: {},
      selected: {},
      global_kenost_table: [],
      kenost_table_all: [],
      total: 0,
      ids: [],
      filter: {
        name: ""
      },
      black_list: {},
      updateKey: 0,
      files: null,
      showDropZone: false,
    }
  },
  methods: {
    ...mapActions({
      getCollection: 'warehouse/getCollection',
      unsetCollection: 'warehouse/unsetCollection',
    }),
    openChooseConditionsModal(){
      for(let i = 0; i < this.termsChips.length; ++i){
        if(i === 0){
          this.termsChips[i].active = true
        }else{
          this.termsChips[i].active = false
        }
      }
      this.chooseConditionsModal = true
    },
    activeChip(index){
      for(let i = 0; i < this.termsChips.length; ++i){
        if(i != index){
          this.termsChips[i].active = false
        }else{
          if(this.termsChips[index].active == false){
            this.termsChips[index].active = true
          }else{
            this.termsChips[index].active = false
          }
        }
      }
    },
    addTerms(){
      for(let i = 0; i < this.termsChips.length; ++i){
        if( this.termsChips[i].active == true){
          this.termsData.push({
          term: i+1,
          placeholder: this.termsChips[i].placeholder,
          tags: [],
          vendors: [],
          catalog: [],
          catalog_our: [],
        })

        this.term = "1",
        this.apply = []
        }
      }
      this.chooseConditionsModal = false;
    },
    deleteTerms(index){
      this.termsData.splice(index, 1);
      //this.updateBuild()
    },
    parseFile(files, xhr) {
      console.log(files)
      console.log(xhr)
      const callback = (e) => {
        const res = JSON.parse(e)
        console.log(res)
        if (res.data.files[0].name) {
          this.files = res.data.files[0]
          this.showDropZone = false
        }
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          callback(xhr.response)
        }
      }
    },
    deleteFile(){
      this.files = null
      this.showDropZone = true
      console.log('234')
    }
  },
  mounted() {
    this.getCollection({
      collection_id: this.$route.params.collection_id,
    }).then(() => (this.loading = false))
  },
  computed: {
    ...mapGetters({
      collection: 'warehouse/collection',
    }),
  },
  watch: {
    collection: function(newVal){
      this.collectionData = newVal
    }
  },
}
</script>
<style lang="scss">
.collection__block {
    gap: 54px;
  }
.collection__block-title-wrapper {
    max-width: 348px;
}
.collection__block-inner{
  gap: 54px;
}
.d-tab2--active{
  font-weight: 500;
}
.collection__block-container .p-tablist-tab-list {
    background: none;
    border: none;
}
.collection__block-container .p-tabpanels {
  padding: 0 0 0 0 !important;
}
.collection__block-conditions{
  flex-direction: row;
}
.collection__block-radio-container {
  width: auto;
}
.collection__block--alt{
  gap: 16px;
}
.collection__modal .modal-content {
  max-width: 764px;
  padding-bottom: 16px;
}
.collection__modal h2{
  margin-top: -24px;
  margin-bottom: 32px;
}
.collection__modal .chip {
  background: #EDEDED;
  border-radius: 30px;
  border: none !important;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #282828;
  padding: 0px !important;
  margin: 0 16px 0 0 !important;
  transition: all 0.2s ease;
}
.collection__modal .chips {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.collection__modal .chip.collection__modal-chip-active{
  background: #f92c0d;
  color: #EDEDED;
}
.collection__modal .chip button{
  width: 100%;
  min-width: 100%;
  padding: 10px 24px;
}
.collection__modal-buttons{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 38px;
}
.collection__modal-buttons button{
  max-width: 100px;
  min-width: 100px;
}
.collection__modal-cansel{
  background: #FBFBFB;
  border: 1px solid #282828;
  color: #282828;
}
.collection__modal-cansel:hover{
  background:#282828 ;
  color: #FBFBFB;
}
.collection__block .p-tabpanel{
  width: 100%;
  min-width:100%;
}
.collection__upload-title-wrapper i{
  font-size: 40px;
  color:#75757575;
}
.collection__search{
  margin-top: 32px;
  padding: 1px 2px 2px 0px;
}
.d-table__wrapper {
    width: 100%;
}
</style>
