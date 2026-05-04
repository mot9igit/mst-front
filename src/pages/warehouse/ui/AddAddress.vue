<template>
  <div class="std-auth__input-container">
    <div class="warehouse-settings__modal-address">
      <div class="warehouse-settings__modal-address-item">
        <MapObject
          ref="mapRef"
          class="std-auth__map"
          v-model="address.value"
          :coordinates="coordinates"
          @setMapAddress="mapAddress = $event"
        />
      </div>
      <div class="warehouse-settings__modal-address-item">
        <div class="d-modal2__header warehouse-analysis__add-header">
          <p class="d-modal2__title warehouse-analysis__add-title">Создание склада</p>
        </div>
        <div
          class="d-field-wrapper d-field-wrapper--vertical d-field-wrapper--small warehouse-analysis__add-input-wrapper"
        >
          <label for="date" class="d-dropdown__label warehouse-analysis__add-input-label"
            >Адрес доставки</label
          >
          <Autocomplete
            v-model="address.value"
            placeholder="Адрес доставки"
            name="address"
            :class="'warehouse-settings__modal-address-input'"
            type="address"
            selectionType="single"
            @setSelection="setSelection"
            @input="error.address = false"
          />

          <div v-if="error.address" class="d-input-error">
            <i class="d-icon-warning d-input-error__icon"></i
            ><span class="d-input-error__text">Пожалуйста, введите адрес доставки</span>
          </div>
        </div>
        <div
          class="d-field-wrapper d-field-wrapper--vertical d-field-wrapper--small warehouse-analysis__add-input-wrapper"
        >
          <label for="date" class="d-dropdown__label warehouse-analysis__add-input-label"
            >Название склада</label
          >

          <input
            type="text"
            v-model="this.name.value"
            placeholder="Введите название склада"
            class="warehouse-settings__modal-address-input"
            @input="error.name = false"
          />

          <div v-if="error.name" class="d-input-error">
            <i class="d-icon-warning d-input-error__icon"></i
            ><span class="d-input-error__text">Пожалуйста, введите название склада</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-modal2__actions warehouse-analysis__add-actions">
    <button
      class="d-button d-button-secondary d-button-secondary-small box-shadow-none d-modal2__action-button warehouse-analysis__add-actions-button warehouse-analysis__add-actions-button--cancel"
      @click.prevent="closeModal()"
    >
      <span>Отменить</span>
    </button>

    <button
      class="d-button d-button-primary d-button-primary-small box-shadow-none d-modal2__action-button warehouse-analysis__add-actions-button warehouse-analysis__add-actions-button--ok"
      @click.prevent="this.createStoreSubmit()"
    >
      <span>Создать</span>
    </button>
  </div>
</template>

<script>
import axios from 'axios'
import Autocomplete from '@/shared/ui/Autocomplete.vue'
import MapObject from '@/shared/ui/map/MapStore.vue'
import { mapActions } from 'vuex'

export default {
  name: 'AddAddress',
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {}
      },
    },
    inputClasses: {
      type: String,
      default: '',
    },
    value: {},
  },
  emits: ['close', 'refresh'],
  data() {
    return {
      address: this.modelValue || { value: '' }, // Инициализация, если modelValue отсутствует
      mapAddress: this.modelValue || { value: '' },
      coordinates: '',
      name: { value: '' },
      error: {
        name: false,
        address: false,
      },
    }
  },

  components: {
    Autocomplete,
    MapObject,
  },
  methods: {
    ...mapActions({
      createStore: 'org/createStore',
    }),
    setSelection(address) {
      this.$emit('update:modelValue', address)
      this.address.value = address.value
      this.setCoordinates()
    },
    async setCoordinates() {
      if (!this.address?.value) return

      const addressForSearch = this.address?.value?.split(' ').join('+')

      const response = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=49c7c097-7e8d-4926-9f6b-5b9fe5bca22c&geocode=${addressForSearch}&format=json`,
      )

      if (response.status !== 200) return

      this.coordinates =
        response.data?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos?.split(
          ' ',
        )
      this.updateCoordinates(response.data)
    },
    updateCoordinates(coordinates) {
      this.$refs.mapRef?.updateCoordinates(coordinates)
    },
    async getAddress(address) {
      const response = await axios.post(
        'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        {
          query: address?.value,
        },
        {
          headers: {
            Authorization: 'Token 57e34da6a00a320cbf9cb7b3f9fe2d51bdcbf9e5',
          },
        },
      )

      const firstAddress = await response?.data?.suggestions[0]
      this.$emit('update:modelValue', firstAddress)
    },
    async createStoreSubmit() {
      let result = true
      this.error.name = false
      this.error.address = false

      if (!this.name.value) {
        this.error.name = true
        if (!this.address.value) {
          this.error.address = true
        }
        result = false
      } else {
        if (!this.address.value) {
          this.error.address = true
          result = false
        }
      }

      if (!result) {
        this.$toast.add({
          severity: 'error',
          summary: 'Заполните все данные!',
          detail: 'Поля обязательны для заполнения',
          life: 3000,
        })
        return
      } else {
        this.loading = true
        const sendData = {
          form: {
            name: this.name.value,
            address: this.address.value,
          },
        }
        const response = await this.createStore(sendData)
        this.loading = false
        if (response.data.data.success) {
          if (response.data.data.data?.id) {
            this.$toast.add({
              severity: 'success',
              summary: 'Успешно!',
              detail: 'Склад #' + response.data.data.data.id + ' успешно сохранен!',
              life: 3000,
            })
            this.$emit('refresh')
          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Ошибка!',
              detail: 'Не удалось создать склад',
              life: 3000,
            })
            this.$emit('close')
          }
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка!',
            detail: 'Не удалось создать склад',
            life: 3000,
          })
          this.$emit('close')
        }
      }
    },
    closeModal() {
      this.address.value = ''
      this.mapAddress.value = ''
      this.coordinates = ''
      this.name.value = ''
      this.error.name = false
      this.error.address = false
      this.$emit('close')
    },
  },
  mounted() {
    setTimeout(() => this.setCoordinates(), 500)
  },
  watch: {
    mapAddress: {
      handler(newVal) {
        if (newVal) this.getAddress(newVal)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.warehouse-settings__modal-address {
  display: flex;
  gap: 32px;
  position: relative;
}
.warehouse-settings__modal-address-item:first-child {
  width: 398px;
  height: 665px;
}
.warehouse-settings__modal-address-item {
  width: 100%;
}
.warehouse-settings__modal-address-item:last-child {
  margin-right: 64px;
}
.warehouse-analysis__add-input-wrapper {
  margin-bottom: 24px;
}
.warehouse-settings__modal-address-input,
.warehouse-settings__modal-address-input .autocomplete__input {
  height: 40px;
  border: 0.2px solid #75757575;
  border-radius: 6px;
  width: 100%;
  padding: 11px 16px;
  background-color: #fff !important;
}
.warehouse-analysis__add-actions {
  margin-top: 32px;
}
</style>
