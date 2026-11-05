<template>
  <span class="info-tooltip" @mouseenter="isVisible = true" @mouseleave="isVisible = false">
    <i class="d-icon-warning d-icon__show-info" />
    <div v-show="isVisible" class="info-tooltip__bubble">
      <span class="info-tooltip__text">{{ text }}</span>
      <button
        v-if="copyable"
        type="button"
        class="info-tooltip__copy"
        :title="copied ? 'Скопировано' : 'Скопировать'"
        :aria-label="copied ? 'Скопировано' : 'Скопировать'"
        @click.stop="copyText"
      >
        <i class="d-icon-copy" />
      </button>
    </div>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    text: string
    copyable?: boolean
  }>(),
  {
    copyable: false,
  },
)

const isVisible = ref(false)
const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | undefined

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(props.text)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = props.text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }

  copied.value = true
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<style scoped>
.info-tooltip {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.d-icon__show-info {
  cursor: help;
  color: rgba(117, 117, 117, 0.4);
}

.info-tooltip__bubble {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: max-content;
  max-width: 317px;
  padding: 9px 12px;
  background-color: #ffffff;
  border-radius: 7px;
  color: #757575;
  font-size: 14px;
  line-height: 18px;
  white-space: normal;
  word-wrap: break-word;
  z-index: 10000;
  filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.14));
}

.info-tooltip__text {
  user-select: text;
}

.info-tooltip__copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  padding: 0;
  border: none;
  background-color: transparent;
  color: #757575;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.2s;
}

.info-tooltip__copy:hover {
  color: #282828;
}

.info-tooltip__bubble::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #ffffff;
}

.info-tooltip__bubble::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  height: 10px;
}
</style>
