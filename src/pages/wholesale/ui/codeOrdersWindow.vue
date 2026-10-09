<template>
  <customModal v-model="modalVisible" class="code-orders__modal">
    <div class="code-orders">
      <div class="code-orders__title">Коды заказов</div>
      <div class="code-orders__text">
        Введите емейл для выдачи кодов к заказам из отгрузки
      </div>

      <div class="code-orders__list">
        <div v-for="(email, index) in localEmails" :key="index" class="code-orders__row">
          <input
            v-model="localEmails[index]"
            type="email"
            autocomplete="email"
            class="code-orders__input"
            :class="{ 'code-orders__input--error': errors[index] }"
            :placeholder="'Введите email'"
            @input="onInput(index)"
          />
          <i
            class="d-icon-trash code-orders__remove"
            :aria-label="'Удалить email'"
            @click="removeRow(index)"
          ></i>
        </div>
      </div>

      <button type="button" class="code-orders__add" @click="addRow">
        <i class="d-icon-plus-flat"></i>
        <span>Добавить email</span>
      </button>

      <div v-if="errorText" class="code-orders__error">{{ errorText }}</div>

      <div class="code-orders__checkbox">
        <Checkbox v-model="generate" :binary="true" />
        <span class="code-orders__checkbox-text">Сгенерировать новые коды</span>
      </div>

      <div class="collection__modal-buttons">
        <button
          type="button"
          class="d-button d-button-primary d-button--sm-shadow collection__modal-cansel"
          @click="handleCancel"
        >
          Отмена
        </button>
        <button
          type="button"
          class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
          @click="handleSubmit"
        >
          Выслать
        </button>
      </div>
    </div>
  </customModal>
</template>

<script>
import Checkbox from 'primevue/checkbox'
import customModal from '@/shared/ui/Modal.vue'

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default {
  name: 'CodeOrdersWindow',
  components: { customModal, Checkbox },
  emits: ['update:visible', 'submit'],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    emails: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      localEmails: [],
      errors: [],
      errorText: '',
      generate: false,
    }
  },
  computed: {
    modalVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      },
    },
  },
  watch: {
    visible: {
      handler(val) {
        if (!val) return
        this.seedEmails()
      },
      immediate: true,
    },
    emails: {
      handler() {
        if (this.visible) this.seedEmails()
      },
    },
  },
  methods: {
    seedEmails() {
      this.localEmails = Array.isArray(this.emails) ? this.emails.slice() : []
      if (!this.localEmails.length) this.localEmails.push('')
      this.errors = this.localEmails.map(() => false)
      this.errorText = ''
      this.generate = false
    },
    cleanEmails() {
      return this.localEmails
        .map((email) => String(email || '').trim())
        .filter((email) => email !== '')
    },
    onInput(index) {
      this.errors[index] = false
      this.errorText = ''
    },
    addRow() {
      this.localEmails.push('')
      this.errors.push(false)
      this.errorText = ''
    },
    removeRow(index) {
      this.localEmails.splice(index, 1)
      this.errors.splice(index, 1)
      if (!this.localEmails.length) {
        this.localEmails.push('')
        this.errors.push(false)
      }
      this.errorText = ''
    },
    handleCancel() {
      this.$emit('update:visible', false)
    },
    handleSubmit() {
      const cleaned = this.cleanEmails()
      if (!cleaned.length) {
        this.errorText = 'Введите хотя бы один email'
        return
      }
      const invalid = this.localEmails.findIndex((email) => {
        const value = String(email || '').trim()
        return value !== '' && !EMAIL_REGEXP.test(value)
      })
      if (invalid !== -1) {
        this.errors[invalid] = true
        this.errorText = 'Проверьте правильность введенных email-адресов'
        return
      }
      this.$emit('submit', { emails: cleaned, generate: this.generate })
      this.$emit('update:visible', false)
    },
  },
}
</script>

<style lang="scss">
.code-orders__modal .modal-content {
  max-width: 500px;
}

.code-orders {
  display: flex;
  flex-direction: column;

  &__title {
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: -0.01em;
    color: #282828;
  }

  &__text {
    margin-top: 8px;
    font-size: 14px;
    line-height: 18px;
    color: #757575;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__input {
    flex: 1;
    height: 40px;
    padding: 0 20px;
    border: 1px solid #75757575;
    border-radius: 30px;
    background: #ffffff;
    font-size: 14px;
    line-height: 18px;
    color: #282828;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #f92c0d;
    }

    &::placeholder {
      color: #757575;
    }

    &--error {
      border-color: #f92c0d;
    }
  }

  &__remove {
    flex-shrink: 0;
    font-size: 16px;
    color: #757575;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #f92c0d;
    }
  }

  &__add {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 4px;
    margin-top: 12px;
    padding: 0;
    border: none;
    background: transparent;
    font-size: 14px;
    font-weight: 500;
    color: #f92c0d;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    i {
      font-size: 14px;
    }
  }

  &__error {
    margin-top: 12px;
    font-size: 13px;
    line-height: 16px;
    color: #f92c0d;
  }

  &__checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;

    .p-checkbox {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .p-checkbox-input {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      opacity: 1;
      border: 1px solid #757575;
      transition: all 0.2s ease;

      &:hover,
      &:checked {
        border-color: #f92c0d;
      }
    }

    .p-checkbox .p-checkbox-box {
      width: 20px;
      height: 20px;
      border-radius: 20px;
      border: none;
      background: transparent;
      margin: 2px;
      aspect-ratio: 1;
    }

    .p-checkbox-checked .p-checkbox-box {
      background: #f92c0d;

      svg {
        display: none;
      }
    }
  }

  &__checkbox-text {
    font-size: 14px;
    line-height: 18px;
    color: #282828;
  }
}
</style>