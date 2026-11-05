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
                <div class="motivation-dates__field">
                  <DatePicker
                    v-model="form.start_date"
                    dateFormat="dd.mm.yy"
                    placeholder="Дата начала"
                    :manualInput="false"
                    showIcon
                    class="motivation-datepicker"
                  />
                </div>
                <div class="motivation-dates__field">
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
                </div>
              </div>
              <p
                v-if="form.start_date && form.end_date && !form.nodeadline"
                class="motivation-hint"
              >
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
          Установите процент вознаграждения от РРЦ или фиксированную сумму в рублях
        </p>
        <div class="d-radio__container d-radio__container--small motivation-reward-modal__types">
          <div class="d-radio__wrapper">
            <label class="d-radio" for="rewardTypePercent">
              <input
                id="rewardTypePercent"
                v-model="rewardType"
                type="radio"
                name="rewardType"
                value="percent"
                class="d-radio__input"
              />
            </label>
            <label class="d-radio__label" for="rewardTypePercent">Процент от РРЦ</label>
          </div>
          <div class="d-radio__wrapper">
            <label class="d-radio" for="rewardTypeFixed">
              <input
                id="rewardTypeFixed"
                v-model="rewardType"
                type="radio"
                name="rewardType"
                value="fixed"
                class="d-radio__input"
              />
            </label>
            <label class="d-radio__label" for="rewardTypeFixed">Фиксированная сумма, ₽</label>
          </div>
        </div>
        <div class="motivation-field">
          <label class="promotions__card-label">
            {{ rewardType === 'percent' ? 'Процент вознаграждения' : 'Сумма вознаграждения' }}
          </label>
          <InputNumber
            v-model="rewardValue"
            :min="0"
            :max="rewardType === 'percent' ? 100 : undefined"
            :minFractionDigits="0"
            :maxFractionDigits="2"
            :placeholder="rewardType === 'percent' ? 'Например, 10' : 'Например, 500'"
            :suffix="rewardType === 'percent' ? ' %' : ' ₽'"
            class="motivation-reward-modal__input"
          />
        </div>
        <div class="motivation-reward-modal__actions">
          <button
            type="button"
            class="d-button d-button--no-shadow motivation-reward-modal__cancel"
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
      rewardType: 'percent',
      rewardValue: 0,
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
    draftStorageKey() {
      return `wholesale-motivation-program:${this.program_id || 'new'}`
    },
  },
  mounted() {
    this.loadLocalDraft()
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
    loadLocalDraft() {
      let draft = null
      try {
        const raw = localStorage.getItem(this.draftStorageKey)
        draft = raw ? JSON.parse(raw) : null
      } catch {
        draft = null
      }
      if (Array.isArray(draft?.products)) {
        this.allProducts = draft.products.map((product) => ({
          ...product,
          rewardType: this.normalizeRewardType(product.rewardType),
          rewardValue: Number(product.rewardValue) || 0,
        }))
      }
      if (Array.isArray(draft?.collections)) {
        this.collections = draft.collections.reduce((result, collection) => {
          const groupId = collection?.group?.id
          if (groupId === undefined || groupId === null) return result
          const items = Array.isArray(collection.products)
            ? collection.products
            : collection.products?.items || []
          result[groupId] = {
            group: collection.group,
            products: {
              items,
              total: collection.products?.total ?? items.length,
            },
            page: 1,
            filter: '',
            rewardType: this.normalizeRewardType(collection.rewardType),
            rewardValue: Number(collection.rewardValue) || 0,
            loading: false,
          }
          return result
        }, {})
      }
    },
    async loadProgram() {
      if (!this.motivations.length) {
        await this.getMotivations({ id: this.$route.params.id })
      }
      const program = this.motivations.find((item) => String(item.id) === String(this.program_id))
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
      const exists = this.allProducts.some((product) => String(product.id) === String(data.id))
      if (!exists) {
        this.allProducts.push({
          ...data,
          rewardType: 'percent',
          rewardValue: 0,
        })
        this.productsPage = 1
      }
    },
    deSelectProduct(id) {
      this.allProducts = this.allProducts.filter((product) => String(product.id) !== String(id))
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
          rewardType: 'percent',
          rewardValue: 0,
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
    normalizeRewardType(value) {
      return value === 'fixed' ? 'fixed' : 'percent'
    },
    rewardOf(item) {
      return {
        type: this.normalizeRewardType(item?.rewardType),
        value: Number(item?.rewardValue) || 0,
      }
    },
    commonReward(items) {
      if (!items.length) return { type: 'percent', value: null }
      const rewards = items.map((item) => this.rewardOf(item))
      const first = rewards[0]
      const allEqual = rewards.every(
        (reward) => reward.type === first.type && Number(reward.value) === Number(first.value),
      )
      return {
        type: first.type,
        value: allEqual ? first.value : null,
      }
    },
    settings(items, type) {
      if (type === 'group') {
        const groupId = items[0]
        const collection = this.collections[groupId]
        const reward = this.rewardOf(collection)
        this.openReward({
          type: 'collection',
          groupId,
          rewardType: reward.type,
          rewardValue: reward.value,
        })
        return
      }
      const ids =
        type === 'all'
          ? this.allProducts.map((product) => product.id)
          : (items || []).map((item) => (item && item.id !== undefined ? item.id : item))
      const products = ids.map((id) => this.findProduct(id)).filter(Boolean)
      const reward = this.commonReward(products)
      this.openReward({
        type: 'products',
        ids,
        rewardType: reward.type,
        rewardValue: reward.value,
      })
    },
    openReward(target) {
      this.rewardTarget = target
      this.rewardType = this.normalizeRewardType(target.rewardType)
      this.rewardValue = target.rewardValue ?? null
      this.rewardModal = true
    },
    applyReward() {
      const isPercent = this.rewardType === 'percent'
      if (this.rewardValue === null || this.rewardValue === '') {
        this.$toast.add({
          severity: 'error',
          summary: isPercent ? 'Укажите процент' : 'Укажите сумму',
          detail: isPercent
            ? 'Введите процент вознаграждения от РРЦ'
            : 'Введите сумму вознаграждения в рублях',
          life: 3000,
        })
        return
      }
      let value = Math.max(Number(this.rewardValue) || 0, 0)
      if (isPercent) value = Math.min(value, 100)
      const rewardType = isPercent ? 'percent' : 'fixed'
      if (this.rewardTarget?.type === 'collection') {
        const collection = this.collections[this.rewardTarget.groupId]
        if (collection) {
          collection.rewardType = rewardType
          collection.rewardValue = value
        }
      } else if (this.rewardTarget?.type === 'products') {
        this.rewardTarget.ids.forEach((id) => {
          const product = this.findProduct(id)
          if (product) {
            product.rewardType = rewardType
            product.rewardValue = value
          }
        })
      }
      this.rewardModal = false
      this.$toast.add({
        severity: 'success',
        summary: 'Вознаграждение установлено',
        detail: isPercent ? `Процент: ${value}%` : `Сумма: ${value.toFixed(2)} ₽`,
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
    async getCollectionProductsForSave(collection) {
      const current = collection.products || { items: [], total: 0 }
      const loaded = current.items || []
      let total = Number(current.total) || loaded.length
      if (!total || loaded.length >= total) return current
      try {
        const items = []
        const itemKeys = new Set()
        const perPage = Math.max(this.perPage, 100)
        let page = 1

        while (items.length < total && page <= 100) {
          const response = await api.action.getGroupProducts({
            id: this.$route.params.id,
            action: 'get/products',
            group_id: collection.group?.id,
            filter: '',
            page,
            perpage: perPage,
            check: '',
            stores: this.storeIds,
          })
          if (!response || response === 'technical error') break

          const data = response.data?.data || response.data || {}
          const batch = Array.isArray(data.items) ? data.items : []
          if (!batch.length) break

          const previousLength = items.length
          batch.forEach((item) => {
            const key = `${item.id ?? ''}:${item.article ?? ''}:${item.name ?? ''}`
            if (!itemKeys.has(key)) {
              itemKeys.add(key)
              items.push(item)
            }
          })

          total = Number(data.total) || total
          if (items.length === previousLength) break
          page += 1
        }

        if (items.length > loaded.length) {
          return {
            items,
            total,
          }
        }
      } catch {
        return current
      }
      return current
    },
    async saveDemo() {
      const collections = await Promise.all(
        Object.values(this.collections).map(async (collection) => ({
          group: collection.group,
          products: await this.getCollectionProductsForSave(collection),
          rewardType: this.normalizeRewardType(collection.rewardType),
          rewardValue: Number(collection.rewardValue) || 0,
        })),
      )
      const payload = {
        id: this.program_id,
        name: this.form.name,
        description: this.form.description,
        start_date: this.form.start_date,
        end_date: this.form.end_date,
        nodeadline: this.form.nodeadline,
        bannerUrl: this.form.bannerUrl,
        products: this.allProducts.map((product) => ({
          ...product,
          rewardType: this.normalizeRewardType(product.rewardType),
          rewardValue: Number(product.rewardValue) || 0,
        })),
        collections,
        savedAt: new Date().toISOString(),
      }
      try {
        localStorage.setItem(this.draftStorageKey, JSON.stringify(payload))
        this.$toast.add({
          severity: 'success',
          summary: 'Сохранено',
          detail: 'Данные сохранены локально',
          life: 3000,
        })
      } catch {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка сохранения',
          detail: 'Не удалось сохранить данные локально',
          life: 3000,
        })
      }
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 16px;
  margin-bottom: 20px;
}

.motivation-dates__field {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.motivation-datepicker {
  width: 100%;
}

.motivation-switch {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

@media (width <=600px) {
  .motivation-dates {
    grid-template-columns: 1fr;
  }
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

:deep(.motivation-reward-modal__input.p-inputnumber) {
  max-width: 220px;
}

.motivation-reward-modal__text {
  margin-bottom: 16px;
  color: #494949;
}

.motivation-reward-modal__types {
  display: flex;
  flex-wrap: nowrap;
  gap: 24px;
  margin-bottom: 16px;
}

.motivation-reward-modal__types .d-radio__wrapper {
  width: auto;
}

@media (width <=600px) {
  .motivation-reward-modal__types {
    flex-wrap: wrap;
    gap: 12px;
  }
}

.motivation-reward-modal__actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.motivation-reward-modal__actions .d-button {
  width: max-content;
}

.motivation-reward-modal__cancel {
  background-color: #ffffff;
  border-color: #282828;
  color: #282828;

  &:hover {
    background-color: #282828;
    border-color: #282828;
    color: #ffffff;
  }

  &:active {
    background-color: #282828;
    border-color: #282828;
    color: #ffffff;
  }
}

:global(.motivation-reward-modal .modal-content) {
  max-width: 560px;
}
</style>
