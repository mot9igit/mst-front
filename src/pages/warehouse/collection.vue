<template>
  <section class="collection" id="collection">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>

    <div class="collection__header">
      <div class="dart-row">
        <div class="d-col-md-12">
          <h1 class="collection__header-title" v-if="this.$route.params.collection_id">
            Редактирование коллекции {{ collectionData.name }}
          </h1>
          <h1 class="collection__header-title" v-else>Создание коллекции</h1>
        </div>
        <div class="d-col-md-12 d-flex d-flex-end">
          <a
            href="#"
            @click.prevent="saveCollection()"
            class="d-button d-button-primary d-button--sm-shadow d-button-wholesaleprices"
            :class="{ 'd-button--loading': loading }"
            :disabled="loading"
          >
            <span class="d-button__text">
              <i class="pi pi-save"></i> <span>Сохранить Коллекцию</span>
            </span>
          </a>
        </div>
      </div>
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
      <div class="collection__block">
        <div class="collection__block-title-wrapper">
          <p class="collection__block-title">Склад</p>
          <p class="collection__block-title-description">
            Выберите Склад, к которой будет привязана коллекция товаров
          </p>
        </div>
        <SelectInput
          @change="updateStore"
          class="w-full"
          v-model="this.collectionData.store_id"
          :options="this.stores"
          optionLabel="label"
          optionValue="value"
          placeholder="Выберите склад"
        />
      </div>

      <Tabs v-if="this.collectionData.store_id">
        <TabList class="d-tab2__container collection__tabs">
          <Tab class="d-tab2" :class="{ 'd-tab2--active': !tabException }" :value="tabException">
            <button class="collection__tabs-link" @click.prevent="tabException = false">
              <span>Добавленные товары</span>
              <span class="collection__tabs-badge">{{
                this.collectionBuild.totalAll > 0 ? this.collectionBuild.totalAll : 0
              }}</span>
            </button>
          </Tab>
          <Tab class="d-tab2" :class="{ 'd-tab2--active': tabException }" :value="tabException">
            <button class="collection__tabs-link" @click.prevent="tabException = true">
              <span>Исключения</span>
              <span class="collection__tabs-badge">{{
                this.collectionBuildExclude.totalAll > 0 ? this.collectionBuildExclude.totalAll : 0
              }}</span>
            </button>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel v-if="!tabException">
            <div class="collection__block collection__block--alt">
              <div class="collection__block-inner">
                <div class="collection__block-title-wrapper">
                  <p class="collection__block-title">Выберите условие добавления товаров</p>
                </div>
                <div class="collection__block-conditions">
                  <TabList
                    v-for="(item, index) in tabs"
                    :key="index"
                    class="collection__block-radio-container"
                  >
                    <Tab
                      :value="item.value"
                      class="d-radio__wrapper collection__block-radio-wrapper"
                    >
                      <label :for="index" class="d-radio collection__block-radio">
                        <input
                          type="radio"
                          :name="index"
                          :id="index"
                          class="d-radio__input collection__block-radio-input"
                          :value="item.value"
                          v-model="this.collectionData.type"
                        />
                      </label>
                      <label :for="index" class="d-radio__label collection__block-radio-label"
                        >{{ item.title }}
                      </label>
                    </Tab>
                  </TabList>
                </div>
              </div>

              <TabPanel v-if="this.collectionData.type == 1">
                <div class="collection__block-conditions-category">
                  <div class="collection__block-conditions-category-content">
                    <div class="collection__block-title-wrapper">
                      <p class="collection__block-title">&nbsp;</p>
                    </div>
                    <div class="d-radio__wrapper collection__block-radio-wrapper">
                      <Checkbox
                        v-model="this.collectionData.update"
                        :binary="true"
                        inputId="tonew'"
                        name="tonew"
                        value="false"
                      />
                      <label for="tonew" class="d-radio__label collection__block-radio-label"
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
                        <i
                          class="d-icon-plus-flat collection__block-conditions-add-button-icon"
                        ></i>
                        <span>Добавить условие</span>
                      </button>
                    </div>
                  </div>
                  <div
                    class="collection__block-conditions-category-content"
                    v-for="(item, index) in this.collectionData.terms.include"
                    :key="index"
                  >
                    <div class="collection__block-title-wrapper">
                      <p class="collection__block-title">
                        Условие:
                        {{
                          item.term == '1'
                            ? 'Категории'
                            : item.term == '2'
                              ? 'Категории системы интеграции'
                              : item.term == '3'
                                ? 'Теги'
                                : 'Бренды'
                        }}
                      </p>
                    </div>
                    <div
                      class="collection__block-conditions-category-actions"
                      v-if="item.term == '1'"
                    >
                      <TreeSelect
                        :key="this.updateKey"
                        @change="updateBuild"
                        selectionMode="checkbox"
                        v-model="collectionData.terms.include[index].value"
                        :options="this.catalogs"
                        placeholder="Выберите категории"
                      />
                      <div
                        class="d-divider d-divider--vertical d-divider--no-margi collection__block-conditions-category-actions-divider"
                      ></div>
                      <button
                        class="collection__block-conditions-category-actions-button"
                        @click.prevent="deleteTerms(index)"
                      >
                        <i class="d-icon-trash"></i>
                      </button>
                    </div>
                    <div
                      class="collection__block-conditions-category-actions"
                      v-if="item.term == '2'"
                    >
                      <TreeSelect
                        :key="this.updateKey"
                        @change="updateBuild"
                        selectionMode="checkbox"
                        v-model="collectionData.terms.include[index].value"
                        :options="this.out_catalogs"
                        placeholder="Выберите категории"
                      />
                      <div
                        class="d-divider d-divider--vertical d-divider--no-margi collection__block-conditions-category-actions-divider"
                      ></div>
                      <button
                        class="collection__block-conditions-category-actions-button"
                        @click.prevent="deleteTerms(index)"
                      >
                        <i class="d-icon-trash"></i>
                      </button>
                    </div>
                    <div
                      class="collection__block-conditions-category-actions"
                      v-if="item.term == '3'"
                    >
                      <MultiSelect
                        v-model="collectionData.terms.include[index].value"
                        :options="tags"
                        option-label="label"
                        option-value="value"
                        placeholder="Выберите теги"
                        filter
                        display="chip"
                        @change="updateBuild"
                      />
                      <div
                        class="d-divider d-divider--vertical d-divider--no-margi collection__block-conditions-category-actions-divider"
                      ></div>
                      <button
                        class="collection__block-conditions-category-actions-button"
                        @click.prevent="deleteTerms(index)"
                      >
                        <i class="d-icon-trash"></i>
                      </button>
                    </div>
                    <div
                      class="collection__block-conditions-category-actions"
                      v-if="item.term == '4'"
                    >
                      <MultiSelect
                        v-model="collectionData.terms.include[index].value"
                        :options="this.our_vendors"
                        option-label="name"
                        option-value="id"
                        placeholder="Выберите бренды"
                        filter
                        display="chip"
                        @change="updateBuild"
                      />
                      <div
                        class="d-divider d-divider--vertical d-divider--no-margi collection__block-conditions-category-actions-divider"
                      ></div>
                      <button
                        class="collection__block-conditions-category-actions-button"
                        @click.prevent="deleteTerms(index)"
                      >
                        <i class="d-icon-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel v-if="this.collectionData.type == 2">
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
                        <button
                          class="collection__files-list-item-actions-delete"
                          @click.prevent="deleteFile()"
                        >
                          <i class="d-icon-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <DropZone
                  v-else
                  class="d-upload collection__upload"
                  :maxFiles="Number(1)"
                  url="/rest/file_upload.php?upload_groups=xlsx"
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
                      <b class="d-upload__title collection__upload-title"
                        >Перетащите файл в эту область</b
                      >
                      <p class="d-upload__description collection__upload-description">
                        Вы также можете загрузить файл,
                        <span class="d-link d-upload__link collection__upload-link"
                          >нажав сюда</span
                        >
                      </p>
                    </div>
                  </template>
                </DropZone>
              </TabPanel>

              <div class="products-collection-wrapper">
                <Loader v-if="productLoading" />
                <BaseTable
                  :items_data="this.collectionBuild.items"
                  :total="this.collectionBuild.total"
                  :pagination_items_per_page="this.pagination_items_per_page"
                  :pagination_offset="this.pagination_offset"
                  :page="this.page"
                  :table_data="this.table_data"
                  :filters="this.filters"
                  @deleteElem="deleteElem"
                  @filter="filterCollection"
                  @sort="filterCollection"
                  @paginate="paginate"
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel v-else>
            <div class="collection__block collection__block--alt">
              <div class="collection__block-inner">
                <div class="collection__block-title-wrapper">
                  <p class="collection__block-title">Выберите условие исключения товаров</p>
                </div>
                <div class="collection__block-conditions">
                  <TabList
                    v-for="(item, index) in tabs"
                    :key="index"
                    class="collection__block-radio-container"
                  >
                    <Tab
                      :value="item.value"
                      class="d-radio__wrapper collection__block-radio-wrapper"
                      v-if="item.value != 3"
                    >
                      <label :for="index" class="d-radio collection__block-radio">
                        <input
                          type="radio"
                          :name="index"
                          :id="index"
                          class="d-radio__input collection__block-radio-input"
                          :value="item.value"
                          v-model="this.collectionData.typeExclude"
                        />
                      </label>
                      <label :for="index" class="d-radio__label collection__block-radio-label"
                        >{{ item.title }}
                      </label>
                    </Tab>
                  </TabList>
                </div>
              </div>

              <TabPanel v-if="this.collectionData.typeExclude == 1">
                <div class="collection__block-conditions-category">
                  <div class="collection__block-conditions-category-content">
                    <div class="collection__block-title-wrapper">
                      <p class="collection__block-title">&nbsp;</p>
                    </div>
                    <div class="d-radio__wrapper collection__block-radio-wrapper">
                      <button
                        class="d-button d-button-primary d-button--no-shadow collection__block-conditions-add-button"
                        @click.prevent="openChooseConditionsModal()"
                      >
                        <i
                          class="d-icon-plus-flat collection__block-conditions-add-button-icon"
                        ></i>
                        <span>Добавить условие</span>
                      </button>
                    </div>
                  </div>
                  <div
                    class="collection__block-conditions-category-content"
                    v-for="(item, index) in this.collectionData.terms.exclude"
                    :key="index"
                  >
                    <div class="collection__block-title-wrapper">
                      <p class="collection__block-title">
                        Условие:
                        {{
                          item.term == '1'
                            ? 'Категории'
                            : item.term == '2'
                              ? 'Категории системы интеграции'
                              : item.term == '3'
                                ? 'Теги'
                                : 'Бренды'
                        }}
                      </p>
                    </div>
                    <div
                      class="collection__block-conditions-category-actions"
                      v-if="item.term == '1'"
                    >
                      <TreeSelect
                        :key="this.updateKey"
                        @change="updateBuild"
                        selectionMode="checkbox"
                        v-model="collectionData.terms.exclude[index].value"
                        :options="this.catalogs"
                        placeholder="Выберите категории"
                      />
                      <div
                        class="d-divider d-divider--vertical d-divider--no-margi collection__block-conditions-category-actions-divider"
                      ></div>
                      <button
                        class="collection__block-conditions-category-actions-button"
                        @click.prevent="deleteTerms(index)"
                      >
                        <i class="d-icon-trash"></i>
                      </button>
                    </div>
                    <div
                      class="collection__block-conditions-category-actions"
                      v-if="item.term == '2'"
                    >
                      <TreeSelect
                        :key="this.updateKey"
                        @change="updateBuild"
                        selectionMode="checkbox"
                        v-model="collectionData.terms.exclude[index].value"
                        :options="this.out_catalogs"
                        placeholder="Выберите категории"
                      />
                      <div
                        class="d-divider d-divider--vertical d-divider--no-margi collection__block-conditions-category-actions-divider"
                      ></div>
                      <button
                        class="collection__block-conditions-category-actions-button"
                        @click.prevent="deleteTerms(index)"
                      >
                        <i class="d-icon-trash"></i>
                      </button>
                    </div>
                    <div
                      class="collection__block-conditions-category-actions"
                      v-if="item.term == '3'"
                    >
                      <MultiSelect
                        v-model="collectionData.terms.exclude[index].value"
                        :options="tags"
                        option-label="label"
                        option-value="value"
                        placeholder="Выберите теги"
                        filter
                        display="chip"
                        @change="updateBuild"
                      />
                      <div
                        class="d-divider d-divider--vertical d-divider--no-margi collection__block-conditions-category-actions-divider"
                      ></div>
                      <button
                        class="collection__block-conditions-category-actions-button"
                        @click.prevent="deleteTerms(index)"
                      >
                        <i class="d-icon-trash"></i>
                      </button>
                    </div>
                    <div
                      class="collection__block-conditions-category-actions"
                      v-if="item.term == '4'"
                    >
                      <MultiSelect
                        v-model="collectionData.terms.exclude[index].value"
                        :options="this.our_vendors"
                        option-label="name"
                        option-value="id"
                        placeholder="Выберите бренды"
                        filter
                        display="chip"
                        @change="updateBuild"
                      />
                      <div
                        class="d-divider d-divider--vertical d-divider--no-margi collection__block-conditions-category-actions-divider"
                      ></div>
                      <button
                        class="collection__block-conditions-category-actions-button"
                        @click.prevent="deleteTerms(index)"
                      >
                        <i class="d-icon-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel v-if="this.collectionData.typeExclude == 2">
                <div class="collection__files" v-if="filesExclude && !showDropZoneExclude">
                  <div class="collection__files-header">
                    <p class="collection__files-header-title">Загруженные файлы:</p>

                    <button
                      class="d-button d-button-primary d-button-primary-small d-button--no-shadow collection__files-header-button"
                      @click.prevent="this.showDropZoneExclude = true"
                    >
                      <i class="d-icon-download collection__files-header-button-icon"></i>
                      <span>Загрузить файл</span>
                    </button>
                  </div>

                  <div class="collection__files-list">
                    <div class="collection__files-list-item">
                      <div class="collection__files-list-item-title-wrapper">
                        <i class="d-icon-excel collection__files-list-item-title-icon"></i>
                        <p class="collection__files-list-item-title">{{ filesExclude.name }}</p>
                      </div>

                      <div class="collection__files-list-item-actions">
                        <a
                          :href="filesExclude.original_href"
                          target="_blank"
                          class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow collection__files-list-item-actions-button"
                        >
                          Смотреть файл
                        </a>
                        <div
                          class="d-divider d-divider--vertical d-divider--no-margin collection__files-list-item-actions-divider"
                        ></div>
                        <button
                          class="collection__files-list-item-actions-delete"
                          @click.prevent="deleteFileExclude()"
                        >
                          <i class="d-icon-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <DropZone
                  v-else
                  class="d-upload collection__upload"
                  :maxFiles="Number(1)"
                  url="/rest/file_upload.php?upload_groups=xlsx"
                  :uploadOnDrop="true"
                  :multipleUpload="true"
                  :acceptedFiles="['xlsx', 'xlsx']"
                  :parallelUpload="1"
                  @sending="parseFileExclude"
                  v-bind="args"
                >
                  <template v-slot:message>
                    <div class="collection__upload-title-wrapper">
                      <i class="pi pi-cloud-upload"></i>
                      <b class="d-upload__title collection__upload-title"
                        >Перетащите файл в эту область</b
                      >
                      <p class="d-upload__description collection__upload-description">
                        Вы также можете загрузить файл,
                        <span class="d-link d-upload__link collection__upload-link"
                          >нажав сюда</span
                        >
                      </p>
                    </div>
                  </template>
                </DropZone>
              </TabPanel>
              <div class="products-collection-wrapper">
                <Loader v-if="productLoading" />
                <BaseTable
                  :items_data="this.collectionBuildExclude.items"
                  :total="this.collectionBuildExclude.total"
                  :pagination_items_per_page="this.pagination_items_per_page"
                  :pagination_offset="this.pagination_offset"
                  :page="this.pageExclude"
                  :table_data="this.table_data"
                  :filters="this.filters"
                  @deleteElem="deleteElem"
                  @filter="filterCollectionExclude"
                  @sort="filterCollectionExclude"
                  @paginate="paginateExclude"
                />
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    <teleport to="body">
      <customModal v-model="this.chooseConditionsModal" class="collection__modal">
        <h2>Выберите тип условия</h2>
        <div class="chips">
          <div
            class="chip"
            v-for="(item, index) in termsChips"
            :key="index"
            :class="{ 'collection__modal-chip-active': item.active === true }"
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
            class="d-button d-button-primary d-button--sm-shadow collection__modal-cansel"
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
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'
import MultiSelect from 'primevue/multiselect'
import SelectInput from 'primevue/select'
import Checkbox from 'primevue/checkbox'
import TreeSelect from 'primevue/treeselect'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import customModal from '@/shared/ui/Modal.vue'
import DropZone from 'dropzone-vue'
import BaseTable from '@/shared/ui/table/table.vue'

export default {
  name: 'WarehouseCollection',
  components: {
    Breadcrumbs,
    Loader,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    customModal,
    DropZone,
    SelectInput,
    Checkbox,
    MultiSelect,
    TreeSelect,
    BaseTable,
  },
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25,
    },
    pagination_offset: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: true,
      productLoading: false,
      collectionData: {
        name: '',
        description: '',
        store_id: 0,
        update: false,
        terms: {
          include: [],
          exclude: [],
        },
        type: 1,
        typeExclude: 1,
        file: [],
        fileExclude: [],
      },
      tabException: false,
      type: 1,
      term: '1',
      chooseConditionsModal: false,
      tabs: {
        terms: {
          value: 1,
          title: 'Задать условие',
        },
        file: {
          value: 2,
          title: 'Загрузить файлом',
        },
        // products: {
        //   value: 3,
        //   title: 'Все товары',
        // },
      },
      termsChips: [
        { name: 'Категории', active: false, placeholder: 'Выберите категории', key: 'categories' },
        {
          name: 'Категории системы интеграции',
          active: false,
          placeholder: 'Выберите категории системы интеграции',
          key: 'out_categories',
        },
        { name: 'Теги', active: false, placeholder: 'Выберите теги', key: 'tags' },
        { name: 'Бренды', active: false, placeholder: 'Выберите бренды', key: 'brands' },
      ],
      tags: [],
      catalog_our: [],
      catalog: [],
      products: {},
      selected: {},
      total: 0,
      page: 1,
      pageExclude: 1,
      ids: [],
      black_list: {},
      updateKey: 0,
      files: null,
      filesExclude: null,
      showDropZone: false,
      showDropZoneExclude: false,
      filter: '',
      filterExclude: '',
      filters: {
        name: {
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text',
        },
      },
      table_data: {
        remain_id: {
          label: 'ID',
          type: 'text',
          class: 'cell_centeralign',
        },
        article: {
          label: 'Артикул',
          type: 'text',
          class: 'cell_centeralign',
        },
        name: {
          label: 'Наименование',
          type: 'text',
        },
        brand: {
          label: 'Бренд',
          type: 'text',
          class: 'cell_centeralign',
        },
        category: {
          label: 'Категория',
          type: 'text',
          class: 'cell_centeralign',
        },
        tags: {
          label: 'Теги',
          type: 'text',
          class: 'cell_centeralign',
        },
        // actions: {
        //   label: 'Действия',
        //   type: 'actions',
        //   sort: false,
        //   class: 'cell_centeralign',
        //   available: {
        //     delete: {
        //       icon: 'pi pi-trash',
        //       label: 'Удалить',
        //     },
        //   },
        // },
      },
    }
  },
  methods: {
    ...mapActions({
      getCollection: 'warehouse/getCollection',
      setCollection: 'warehouse/setCollection',
      unsetCollection: 'warehouse/unsetCollection',
      buildCollection: 'warehouse/buildCollection',
      clearCollectionData: 'warehouse/clearCollectionData',
      toggleProductCollection: 'warehouse/toggleProductCollection',
      getOrgStores: 'org/getOrgStores',
      getOurVendors: 'addition/getOurVendors',
      getCatalogs: 'addition/getCatalogs',
      getOutCatalogs: 'addition/getOutCatalogs',
      getTags: 'addition/getTags',
    }),
    openChooseConditionsModal() {
      for (let i = 0; i < this.termsChips.length; ++i) {
        if (i === 0) {
          this.termsChips[i].active = true
        } else {
          this.termsChips[i].active = false
        }
      }
      this.chooseConditionsModal = true
    },
    activeChip(index) {
      for (let i = 0; i < this.termsChips.length; ++i) {
        if (i != index) {
          this.termsChips[i].active = false
        } else {
          if (this.termsChips[index].active == false) {
            this.termsChips[index].active = true
          } else {
            this.termsChips[index].active = false
          }
        }
      }
    },
    addTerms() {
      let mode = 'include'
      if (this.tabException) {
        mode = 'exclude'
      }
      for (let i = 0; i < this.termsChips.length; ++i) {
        if (this.termsChips[i].active == true) {
          this.collectionData.terms[mode].push({
            term: i + 1,
            placeholder: this.termsChips[i].placeholder,
            key: this.termsChips[i].key,
            value: [],
          })
        }
      }
      this.chooseConditionsModal = false
    },
    deleteTerms(index) {
      let mode = 'include'
      if (this.tabException) {
        mode = 'exclude'
      }
      this.collectionData.terms[mode].splice(index, 1)
      this.updateBuild()
    },
    parseFile(files, xhr) {
      const callback = (e) => {
        const res = JSON.parse(e)
        if (res.data.files[0].name) {
          this.files = res.data.files[0]
          this.collectionData.file = this.files.name
          this.showDropZone = false
          this.page = 1
          this.updateBuild()
        }
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          callback(xhr.response)
        }
      }
    },
    parseFileExclude(files, xhr) {
      const callback = (e) => {
        const res = JSON.parse(e)
        if (res.data.files[0].name) {
          this.filesExclude = res.data.files[0]
          this.collectionData.fileExclude = this.filesExclude.name
          this.showDropZoneExclude = false
          this.page = 1
          this.updateBuild()
        }
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          callback(xhr.response)
        }
      }
    },
    deleteFile() {
      this.files = null
      this.showDropZone = true
      this.collectionData.file = ''
      this.updateBuild()
    },
    deleteFileExclude() {
      this.filesExclude = null
      this.collectionData.fileExclude = ''
      this.showDropZoneExclude = true
      this.updateBuild()
    },
    updateStore() {
      this.getTags({
        store_id: this.collectionData.store_id,
      })
      this.getOutCatalogs({
        store_id: this.collectionData.store_id,
      })
      this.getOurVendors({
        store_id: this.collectionData.store_id,
      })
      this.page = 1
      this.updateBuild()
    },
    updateBuild() {
      this.productLoading = true
      // Выбранные товары
      this.buildCollection({
        typeData: 1,
        store_id: this.collectionData.store_id,
        terms: this.collectionData.terms,
        page: this.page,
        perpage: this.pagination_items_per_page,
        filter: this.filter,
        type: this.collectionData.type,
        typeExclude: this.collectionData.typeExclude,
        file: this.collectionData.file,
        fileExclude: this.collectionData.fileExclude,
      }).then(() => {
        // Исключения
        this.buildCollection({
          typeData: 2,
          store_id: this.collectionData.store_id,
          terms: this.collectionData.terms,
          page: this.pageExclude,
          perpage: this.pagination_items_per_page,
          filter: this.filterExclude,
          type: this.collectionData.type,
          typeExclude: this.collectionData.typeExclude,
          file: this.collectionData.file,
          fileExclude: this.collectionData.fileExclude,
        }).then(() => {
          this.productLoading = false
        })
      })
    },
    filterCollection(data) {
      this.productLoading = true
      this.page = 1
      this.buildCollection({
        typeData: 1,
        store_id: this.collectionData.store_id,
        terms: this.collectionData.terms,
        page: this.page,
        perpage: this.pagination_items_per_page,
        filter: data.filter,
        type: this.collectionData.type,
        typeExclude: this.collectionData.typeExclude,
        file: this.collectionData.file,
        fileExclude: this.collectionData.fileExclude,
      }).then(() => {
        this.productLoading = false
      })
    },
    filterCollectionExclude(data) {
      this.productLoading = true
      this.pageExclude = 1
      this.buildCollection({
        typeData: 2,
        store_id: this.collectionData.store_id,
        terms: this.collectionData.terms,
        page: this.pageExclude,
        perpage: this.pagination_items_per_page,
        filter: data.filter,
        type: this.collectionData.type,
        typeExclude: this.collectionData.typeExclude,
        file: this.collectionData.file,
        fileExclude: this.collectionData.fileExclude,
      }).then(() => {
        this.productLoading = false
      })
    },
    paginate(data) {
      this.productLoading = true
      this.page = data.page
      this.buildCollection({
        typeData: 1,
        store_id: this.collectionData.store_id,
        terms: this.collectionData.terms,
        page: this.page,
        perpage: this.pagination_items_per_page,
        filter: data.filter,
        type: this.collectionData.type,
        typeExclude: this.collectionData.typeExclude,
        file: this.collectionData.file,
        fileExclude: this.collectionData.fileExclude,
      }).then(() => {
        this.productLoading = false
      })
    },
    paginateExclude(data) {
      this.productLoading = true
      this.pageExclude = data.page
      this.buildCollection({
        typeData: 2,
        store_id: this.collectionData.store_id,
        terms: this.collectionData.terms,
        page: this.pageExclude,
        perpage: this.pagination_items_per_page,
        filter: data.filter,
        type: this.collectionData.type,
        typeExclude: this.collectionData.typeExclude,
        file: this.collectionData.file,
        fileExclude: this.collectionData.fileExclude,
      }).then(() => {
        this.productLoading = false
      })
    },
    saveCollection() {
      this.loading = true
      const data = {
        store_id: this.collectionData.store_id,
        terms: this.collectionData.terms,
        type: this.collectionData.type,
        typeExclude: this.collectionData.typeExclude,
        name: this.collectionData.name,
        description: this.collectionData.description,
        file: this.collectionData.file,
        fileExclude: this.collectionData.fileExclude,
        update: this.collectionData.update,
      }
      this.setCollection(data)
        .then(() => {
          this.loading = false
          this.$router.push({ name: 'WarehouseCollections', params: { id: this.$route.params.id } })
        })
        .catch((result) => {
          console.log(result)
        })
    },
    deleteElem(item) {
      let mode = 'include'
      if (this.tabException) {
        mode = 'exclude'
      }
      const data = {
        mode: mode,
        remain_id: item.remain_id,
      }
      this.productLoading = true
      this.toggleProductCollection(data).then(() => {
        this.updateBuild().then(() => {
          this.productLoading = false
        })
      })
    },
  },
  mounted() {
    this.getOrgStores().then(() => {
      this.getCatalogs()
      this.clearCollectionData().then(() => {
        if (this.$route.params.collection_id) {
          this.getCollection({
            collection_id: this.$route.params.collection_id,
          }).then(() => {
            this.updateStore()
            this.updateBuild()
            this.loading = false
          })
        } else {
          this.loading = false
        }
      })
    })
  },
  computed: {
    ...mapGetters({
      groupTags: 'addition/tags',
      catalogs: 'addition/catalogs',
      out_catalogs: 'addition/out_catalogs',
      our_vendors: 'addition/our_vendors',
      collection: 'warehouse/collection',
      collectionBuild: 'warehouse/collectionBuild',
      collectionBuildExclude: 'warehouse/collectionBuildExclude',
      orgStores: 'org/orgStores',
    }),
  },
  watch: {
    collection: function (newVal) {
      // console.log(newVal)
      this.collectionData.name = newVal.name
      this.collectionData.description = newVal.description
      this.collectionData.store_id = newVal.store_id
      this.collectionData.update = newVal.update
      this.collectionData.type = newVal.type
      this.collectionData.terms = newVal.properties.terms
      this.collectionData.typeExclude = newVal.type_exclude
      if (newVal.file) {
        this.files = newVal.file
        this.collectionData.file = newVal.file.name
      }
      if (newVal.file_exclude) {
        this.filesExclude = newVal.file_exclude
        this.collectionData.fileExclude = newVal.file_exclude.name
      }
    },
    'collectionData.store_id': function (newVal) {
      if (newVal) {
        this.updateStore()
      }
    },
    'collectionData.type': function (newVal) {
      if (newVal == 1) {
        this.deleteFile()
      }
    },
    'collectionData.typeExclude': function (newVal) {
      if (newVal == 1) {
        this.deleteFileExclude()
      }
    },
    orgStores: function (newVal) {
      this.stores = []
      for (let i = 0; i < newVal.items.length; i++) {
        this.stores.push({ label: newVal.items[i].name, value: Number(newVal.items[i].id) })
      }
    },
    groupTags: function (newVal) {
      this.tags = newVal.map((tag) => ({ label: tag, value: tag }))
    },
  },
}
</script>
<style lang="scss">
.products-collection-wrapper {
  width: 100%;
  position: relative;
}

.collection__block-conditions-category-actions .p-multiselect {
  width: 100%;
  max-width: 300px;
}

.collection__block-conditions-category-actions .p-treeselect {
  width: 100%;
  max-width: 400px;
}

.collection__block {
  gap: 54px;
}
.collection__block-title-wrapper {
  max-width: 348px;
}
.collection__block-inner {
  gap: 54px;
}
.d-tab2--active {
  font-weight: 500;
}
.collection__block-container .p-tablist-tab-list {
  background: none;
  border: none;
}
.collection__block-container .p-tabpanels {
  padding: 0 0 0 0 !important;
}
.collection__block-conditions {
  flex-direction: row;
}
.collection__block-radio-container {
  width: auto;
}
.collection__block--alt {
  gap: 16px;
}
.collection__modal .modal-content {
  max-width: 764px;
  padding-bottom: 16px;
}
.collection__modal h2 {
  margin-top: -24px;
  margin-bottom: 32px;
}
.collection__modal .chip {
  background: #ededed;
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
.collection__modal .chip.collection__modal-chip-active {
  background: #f92c0d;
  color: #ededed;
}
.collection__modal .chip button {
  width: 100%;
  min-width: 100%;
  padding: 10px 24px;
}
.collection__modal-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 38px;
}
.collection__modal-buttons button {
  max-width: 100px;
  min-width: 100px;
}
.collection__modal-cansel {
  background: #fbfbfb;
  border: 1px solid #282828;
  color: #282828;
}
.collection__modal-cansel:hover {
  background: #282828;
  color: #fbfbfb;
}
.collection__block .p-tabpanel {
  width: 100%;
  min-width: 100%;
}
.collection__upload-title-wrapper i {
  font-size: 40px;
  color: #75757575;
}
.collection__search {
  margin-top: 32px;
  padding: 1px 2px 2px 0px;
}
.d-table__wrapper {
  width: 100%;
}
</style>
