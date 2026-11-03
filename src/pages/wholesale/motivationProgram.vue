<template>
  <section class="promotions wholesale-motivation__program" id="wholesale-motivation-program">
    <Toast />
    <Loader v-if="loading" />
    <div class="promotions__top">
      <Breadcrumbs />
    </div>
    <div class="promotions__header">
      <h1 class="d-title promotions__header-title">{{ pageTitle }}</h1>
      <div class="promotions__header-actions">
        <button
          type="button"
          class="d-button d-button-primary d-button-primary-small box-shadow-none"
          @click.prevent="saveDemo"
        >
          <i class="pi pi-save"></i>
          <span>Сохранить</span>
        </button>
      </div>
    </div>

    <div class="promotions__content">
      <div class="dart-row promotions__content-card-container">
        <div class="d-col d-col-xl-9 d-col-24">
          <div class="promotions__card">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-lines promotions__card-icon"></i>
                <p class="promotions__card-title">Контент</p>
              </div>
            </div>
            <div class="promotions__card-content">
              <div class="motivation-field">
                <label class="promotions__card-label" for="motivationName">Название</label>
                <input
                  id="motivationName"
                  v-model="form.name"
                  type="text"
                  class="motivation-input"
                  placeholder="Например: 'Вознаграждение 10% на все товары'"
                />
              </div>
              <div class="motivation-field">
                <label class="promotions__card-label" for="motivationDescription">Описание</label>
                <Editor
                  id="motivationDescription"
                  v-model="form.description"
                  editorStyle="height: 240px"
                  variant="simple"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="d-col d-col-xl-15 d-col-24">
          <div class="promotions__card">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-picture promotions__card-icon"></i>
                <p class="promotions__card-title">Баннер</p>
              </div>
            </div>
            <div class="promotions__card-content">
              <div class="motivation-banner">
                <input
                  ref="bannerInput"
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml"
                  class="motivation-hidden-input"
                  @change="onBannerSelected"
                />
                <button
                  type="button"
                  class="motivation-banner-upload"
                  @click.prevent="openBannerDialog"
                >
                  <img src="/icons/upload-cloud.svg" alt="" width="80" height="50" />
                  <span class="motivation-banner-upload-title">Перетащите файл в эту область</span>
                  <span class="motivation-banner-upload-text">
                    png, jpeg, svg. Размер файла не должен превышать 5 Мбайт
                  </span>
                </button>
                <div v-if="form.bannerUrl" class="motivation-banner-preview">
                  <img :src="form.bannerUrl" alt="Banner preview" />
                  <button
                    type="button"
                    class="d-icon-wrapper d-icon-wrapper--big motivation-banner-remove"
                    @click.prevent="removeBanner"
                  >
                    <i class="d-icon-trash"></i>
                  </button>
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
                <i class="d-icon-calendar3 promotions__card-icon"></i>
                <p class="promotions__card-title">Даты проведения</p>
              </div>
            </div>
            <div class="promotions__card-content">
              <div class="motivation-dates">
                <DatePicker
                  v-model="form.start_date"
                  dateFormat="dd.mm.yy"
                  placeholder="Дата начала"
                  :manualInput="false"
                  showIcon
                  class="motivation-datepicker"
                />
                <DatePicker
                  v-if="!form.nodeadline"
                  v-model="form.end_date"
                  dateFormat="dd.mm.yy"
                  placeholder="Дата окончания"
                  :manualInput="false"
                  :minDate="minEndDate"
                  showIcon
                  class="motivation-datepicker"
                />
              </div>
              <div class="d-field-wrapper motivation-switch">
                <label class="d-switch" for="motivationNoDeadline">
                  <input
                    id="motivationNoDeadline"
                    v-model="form.nodeadline"
                    type="checkbox"
                    class="d-switch__input"
                  />
                  <div class="d-switch__circle"></div>
                </label>
                <div class="d-switch__label-container">
                  <label for="motivationNoDeadline" class="d-switch__label">Бессрочная</label>
                  <p class="d-description">Программа будет без ограничения срока действия.</p>
                </div>
              </div>
              <p v-if="form.start_date && form.end_date && !form.nodeadline" class="motivation-hint">
                Период действия: {{ datesDays }} дн.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="dart-row promotions__content-card-container">
        <div class="d-col d-col-24">
          <div class="promotions__card products__card">
            <Loader v-if="productsLoading" />
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-cube promotions__card-icon"></i>
                <p class="promotions__card-title">Товары и вознаграждение</p>
              </div>
            </div>
            <div class="promotions__card-content">
              <ActionProducts
                rewardMode
                :productsSelected="selectedProductsPage"
                :productsAvailable="productsAvailable"
                :productsAvailablePage="1"
                :productsSelectedPage="productsPage"
                :perPage="perPage"
                @paginateProductsSelected="paginateProductsSelected"
                @paginateProductsAvailable="paginateProductsAvailable"
                @filterProductsSelected="filterProductsSelected"
                @filterProductsAvailable="filterProductsAvailable"
                @selectProduct="selectProduct"
                @deSelectProduct="deSelectProduct"
                @openFileDialog="openFileDialog"
                @settings="settings"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="dart-row promotions__content-card-container">
        <div class="d-col d-col-24">
          <div class="promotions__card products__card">
            <Loader v-if="collectionsLoading" />
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-check-list promotions__card-icon"></i>
                <p class="promotions__card-title">Коллекции</p>
              </div>
            </div>
            <div class="promotions__card-content">
              <ActionCollections
                rewardMode
                :collectionsAvailable="collectionsAvailable"
                :collections="collections"
                :perPage="perPage"
                @selectCollection="selectCollection"
                @deleteCollection="deleteCollection"
                @deleteCollectionProduct="deleteCollectionProduct"
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

    <teleport to="body">
      <customModal v-model="rewardModal" class="motivation-reward-modal">
        <template v-slot:title>Вознаграждение</template>
        <p class="motivation-reward-modal__text">
          Установите процент вознаграждения от РРЦ. В демо-режиме изменение применяется только на
          странице.
        </p>
        <div class="motivation-field">
          <label class="promotions__card-label">Процент вознаграждения</label>
                <InputNumber
                  v-model="rewardPercent"
                  :min="0"
                  :max="100"
                  :minFractionDigits="0"
                  :maxFractionDigits="2"
                  placeholder="Например, 10"
                  suffix=" %"
                  class="motivation-reward-modal__input"
                />
        </div>
        <div class="motivation-reward-modal__actions">
          <button
            type="button"
            class="d-button d-button-secondary d-button--no-shadow"
            @click.prevent="rewardModal = false"
          >
            Отменить
          </button>
          <button
            type="button"
            class="d-button d-button-primary d-button--no-shadow"
            @click.prevent="applyReward"
          >
            Применить
          </button>
        </div>
      </customModal>
    </teleport>
  </section>
</template>

<script>
import Toast from 'primevue/toast'
import Editor from 'primevue/editor'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import ActionProducts from '@/pages/wholesale/ui/motivationActionProducts.vue'
import ActionCollections from '@/pages/wholesale/ui/motivationActionCollections.vue'
import api from '@/shared/api/api'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'wholesaleMotivationProgram',
  components: {
    Toast,
    Editor,
    DatePicker,
    InputNumber,
    Breadcrumbs,
    Loader,
    customModal,
    ActionProducts,
    ActionCollections,
  },
  props: {
    program_id: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      loading: true,
      productsLoading: false,
      collectionsLoading: false,
      perPage: 10,
      perPageAvailable: 24,
      productsPage: 1,
      selectedFilter: '',
      allProducts: [],
      availableProducts: [],
      availableCollections: [],
      collections: {},
      rewardModal: false,
      rewardPercent: 0,
      rewardTarget: null,
      form: {
        name: '',
        description: '',
        start_date: null,
        end_date: null,
        nodeadline: false,
        banner: null,
        bannerUrl: '',
      },
      bannerObjectUrl: '',
    }
  },
  computed: {
    ...mapGetters({
      orgStores: 'org/orgStoresAll',
      motivations: 'wholesale/motivations',
    }),
    pageTitle() {
      return this.program_id ? 'Редактирование программы мотивации' : 'Создание программы мотивации'
    },
    storeIds() {
      const items = this.orgStores?.items || (Array.isArray(this.orgStores) ? this.orgStores : [])
      return items.map((store) => store.id)
    },
    minEndDate() {
      return this.form.start_date || new Date()
    },
    filteredSelectedProducts() {
      if (!this.selectedFilter) return this.allProducts
      const search = this.selectedFilter.toLowerCase()
      return this.allProducts.filter(
        (product) =>
          String(product.name || '')
            .toLowerCase()
            .includes(search) ||
          String(product.article || '')
            .toLowerCase()
            .includes(search),
      )
    },
    selectedProductsPage() {
      const start = (this.productsPage - 1) * this.perPage
      return {
        products: this.filteredSelectedProducts.slice(start, start + this.perPage),
        total: this.filteredSelectedProducts.length,
      }
    },
    productsAvailable() {
      return {
        products: this.availableProducts,
        total: this.availableProducts.length,
      }
    },
    collectionsAvailable() {
      return {
        items: this.availableCollections,
        total: this.availableCollections.length,
      }
    },
    datesDays() {
      if (!this.form.start_date || !this.form.end_date) return 0
      const start = new Date(this.form.start_date)
      const end = new Date(this.form.end_date)
      const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      return Math.max(diff + 1, 1)
    },
  },
  mounted() {
    if (this.program_id) this.loadProgram()
    this.getOrgStoresAll({ page: '', perpage: '', filters: {} }).then(() => {
      this.loadAvailableProducts('')
      this.loadAvailableCollections('')
      this.loading = false
    })
  },
  beforeUnmount() {
    if (this.bannerObjectUrl) {
      URL.revokeObjectURL(this.bannerObjectUrl)
    }
  },
  methods: {
    ...mapActions({
      getOrgStoresAll: 'org/getOrgStoresAll',
      getMotivations: 'wholesale/getMotivations',
    }),
    async loadProgram() {
      if (!this.motivations.length) {
        await this.getMotivations({ id: this.$route.params.id })
      }
      const program = this.motivations.find(
        (item) => String(item.id) === String(this.program_id),
      )
      if (!program) return
      this.form.name = program.label || program.name || ''
      this.form.description = program.description || ''
      this.form.start_date = this.parseDate(program.date_from)
      this.form.end_date = this.parseDate(program.date_to)
      this.form.nodeadline = !program.date_to
      this.form.bannerUrl = program.banner || ''
      this.bannerObjectUrl = ''
    },
    parseDate(value) {
      if (!value) return null
      if (value instanceof Date) return value
      const parts = String(value).split('.')
      if (parts.length === 3) {
        const [day, month, year] = parts.map(Number)
        if (day && month && year) return new Date(year, month - 1, day)
      }
      const date = new Date(value)
      return Number.isNaN(date.getTime()) ? null : date
    },
    async loadAvailableProducts(filter) {
      if (!this.storeIds.length) return
      this.productsLoading = true
      const response = await api.action.getAvailableProducts({
        id: this.$route.params.id,
        action: 'product/get',
        stores_ids: this.storeIds,
        filter: filter || '',
        filtersdata: null,
        page: 1,
        perpage: this.perPageAvailable,
        type: 1,
      })
      if (response && response !== 'technical error') {
        const data = response.data?.data || response.data || {}
        this.availableProducts = data.products || []
      }
      this.productsLoading = false
    },
    async loadAvailableCollections(filter) {
      if (!this.storeIds.length) return
      this.collectionsLoading = true
      const response = await api.action.getProductGroups({
        id: this.$route.params.id,
        action: 'get',
        store_id: this.storeIds,
        filter: filter || '',
      })
      if (response && response !== 'technical error') {
        const data = response.data?.data || response.data || {}
        this.availableCollections = data.items || []
      }
      this.collectionsLoading = false
    },
    async loadGroupProducts(groupId) {
      const collection = this.collections[groupId]
      if (!collection) return
      collection.loading = true
      const response = await api.action.getGroupProducts({
        id: this.$route.params.id,
        action: 'get/products',
        group_id: groupId,
        filter: collection.filter,
        page: collection.page,
        perpage: this.perPage,
        check: '',
        stores: this.storeIds,
      })
      if (response && response !== 'technical error') {
        const data = response.data?.data || response.data || {}
        collection.products = {
          items: data.items || [],
          total: data.total || 0,
        }
      }
      collection.loading = false
    },
    selectProduct(data) {
      if (!data || data.id === undefined) return
      const exists = this.allProducts.some(
        (product) => String(product.id) === String(data.id),
      )
      if (!exists) {
        this.allProducts.push({
          ...data,
          rewardPercent: 0,
        })
        this.productsPage = 1
      }
    },
    deSelectProduct(id) {
      this.allProducts = this.allProducts.filter(
        (product) => String(product.id) !== String(id),
      )
      if (this.productsPage > 1 && this.selectedProductsPage.products.length === 0) {
        this.productsPage -= 1
      }
    },
    paginateProductsSelected(data) {
      this.productsPage = data.page
    },
    paginateProductsAvailable() {},
    filterProductsSelected(data) {
      this.selectedFilter = data
      this.productsPage = 1
    },
    filterProductsAvailable(data) {
      this.loadAvailableProducts(data)
    },
    openFileDialog() {
      this.$toast.add({
        severity: 'info',
        summary: 'Демо-режим',
        detail: 'Загрузка товаров файлом будет доступна позже',
        life: 3000,
      })
    },
    selectCollection(data) {
      if (!data || data.id === undefined || this.collections[data.id]) return
      this.collections = {
        ...this.collections,
        [data.id]: {
          group: data,
          products: { items: [], total: 0 },
          page: 1,
          filter: '',
          rewardPercent: 0,
          loading: false,
        },
      }
      this.loadGroupProducts(data.id)
    },
    deleteCollection(id) {
      const next = { ...this.collections }
      delete next[id]
      this.collections = next
    },
    deleteCollectionProduct({ group_id, product_id }) {
      const collection = this.collections[group_id]
      if (!collection) return
      collection.products.items = collection.products.items.filter(
        (product) => String(product.id) !== String(product_id),
      )
      collection.products.total = Math.max(collection.products.total - 1, 0)
    },
    paginateGroupProduct(data) {
      if (!data.group_id || !this.collections[data.group_id]) return
      this.collections[data.group_id].page = data.page
      this.loadGroupProducts(data.group_id)
    },
    filterGroup(data) {
      this.loadAvailableCollections(data.filter)
    },
    filterGroupProductSelected(data) {
      const collection = this.collections[data.group_id]
      if (!collection) return
      collection.filter = data.filter
      collection.page = data.page
      this.loadGroupProducts(data.group_id)
    },
    findProduct(id) {
      return this.allProducts.find((product) => String(product.id) === String(id))
    },
    commonPercent(ids) {
      if (!ids.length) return null
      const percents = ids.map((id) => Number(this.findProduct(id)?.rewardPercent) || 0)
      const allEqual = percents.every((percent) => Number(percent) === Number(percents[0]))
      return allEqual ? Number(percents[0]) : null
    },
    settings(items, type) {
      if (type === 'group') {
        const groupId = items[0]
        const collection = this.collections[groupId]
        this.openReward({
          type: 'collection',
          groupId,
          percent: Number(collection?.rewardPercent) || 0,
        })
        return
      }
      if (type === 'all') {
        const ids = this.allProducts.map((product) => product.id)
        this.openReward({
          type: 'products',
          ids,
          percent: this.commonPercent(ids),
        })
        return
      }
      const ids = (items || []).map((item) => (item && item.id !== undefined ? item.id : item))
      this.openReward({
        type: 'products',
        ids,
        percent: this.commonPercent(ids),
      })
    },
    openReward(target) {
      this.rewardTarget = target
      this.rewardPercent = target.percent ?? null
      this.rewardModal = true
    },
    applyReward() {
      if (this.rewardPercent === null || this.rewardPercent === '') {
        this.$toast.add({
          severity: 'error',
          summary: 'Укажите процент',
          detail: 'Введите процент вознаграждения от РРЦ',
          life: 3000,
        })
        return
      }
      const percent = Math.min(Math.max(Number(this.rewardPercent) || 0, 0), 100)
      if (this.rewardTarget?.type === 'collection') {
        const collection = this.collections[this.rewardTarget.groupId]
        if (collection) collection.rewardPercent = percent
      } else if (this.rewardTarget?.type === 'products') {
        this.rewardTarget.ids.forEach((id) => {
          const product = this.findProduct(id)
          if (product) product.rewardPercent = percent
        })
      }
      this.rewardModal = false
      this.$toast.add({
        severity: 'success',
        summary: 'Вознаграждение установлено',
        detail: `Процент: ${percent}%`,
        life: 2500,
      })
    },
    openBannerDialog() {
      this.$refs.bannerInput?.click()
    },
    onBannerSelected(event) {
      const file = event.target.files?.[0]
      if (!file) return
      if (file.size > 5000000) {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Размер файла не должен превышать 5 Мбайт',
          life: 3000,
        })
        event.target.value = ''
        return
      }
      if (this.bannerObjectUrl) {
        URL.revokeObjectURL(this.bannerObjectUrl)
      }
      const bannerUrl = URL.createObjectURL(file)
      this.bannerObjectUrl = bannerUrl
      this.form.banner = file
      this.form.bannerUrl = bannerUrl
      event.target.value = ''
    },
    removeBanner() {
      if (this.bannerObjectUrl) {
        URL.revokeObjectURL(this.bannerObjectUrl)
      }
      this.bannerObjectUrl = ''
      this.form.banner = null
      this.form.bannerUrl = ''
    },
    saveDemo() {
      this.$toast.add({
        severity: 'info',
        summary: 'Демо-режим',
        detail: 'Данные не сохраняются и не отправляются на сервер',
        life: 3000,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.wholesale-motivation__program {
  padding-top: 40px;
}

.motivation-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.motivation-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  color: #282828;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #282828;
  }
}

.motivation-hidden-input {
  display: none;
}

.motivation-banner-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 200px;
  padding: 24px;
  text-align: center;
  background: #fafafa;
  border: 1px dashed #bdbdbd;
  border-radius: 8px;
  cursor: pointer;
}

.motivation-banner-upload-title {
  font-size: 16px;
  font-weight: 600;
  color: #282828;
}

.motivation-banner-upload-text {
  font-size: 13px;
  color: #757575;
}

.motivation-banner-preview {
  position: relative;
  margin-top: 16px;
  overflow: hidden;
  border-radius: 8px;

  img {
    display: block;
    width: 100%;
    max-height: 260px;
    object-fit: cover;
  }
}

.motivation-banner-remove {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #fff;
  border-radius: 50%;
}

.motivation-dates {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.motivation-datepicker {
  flex: 1 1 200px;
}

.motivation-switch {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.motivation-hint {
  margin-top: 16px;
  font-size: 14px;
  color: #494949;
}

:deep(.motivation-datepicker) {
  width: 100%;
}

:deep(.p-datepicker),
:deep(.p-inputnumber) {
  width: 100%;
}

.motivation-reward-modal__text {
  margin-bottom: 16px;
  color: #494949;
}

.motivation-reward-modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}
</style>
