<template>
  <span
    class="info-tooltip"
    @mouseenter="isVisible = true"
    @mouseleave="isVisible = false"
  >
    <i class="d-icon-warning d-icon__show-info" />
    <div v-show="isVisible" class="info-tooltip__bubble">
      {{ text }}
    </div>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  text: string
}>()

const isVisible = ref(false)
</script>

<style scoped>
.info-tooltip {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.d-icon__show-info {
  cursor: help;
}

.info-tooltip__bubble {
  position: absolute;
  top: calc(100% + 16px);
  left: -16px;
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
  z-index: 1000;
  filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.14));
}

.info-tooltip__bubble::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 16px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #ffffff;
}
</style>
