<template>
  <section class="wholesale-motivation__program" id="wholesale-motivation-program">
    <Toast />
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <h1 class="dart_mb-2">
      {{ program_id ? 'Редактирование программы мотивации' : 'Создание программы мотивации' }}
    </h1>
    <div class="wholesale-motivation-program__placeholder">
      <div class="wholesale-motivation-program__placeholder-spinner"></div>
      <p class="wholesale-motivation-program__placeholder-title">Раздел в разработке</p>
      <p class="wholesale-motivation-program__placeholder-text">
        {{
          program_id
            ? `Редактирование программы №${program_id} скоро будет доступно.`
            : 'Создание программы скоро станет доступно.'
        }}
      </p>
    </div>
  </section>
</template>
<script>
import Toast from 'primevue/toast'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'

export default {
  name: 'wholesaleMotivationProgram',
  components: { Toast, Breadcrumbs },
  props: {
    program_id: {
      type: [Number, String],
      default: null,
    },
  },
}
</script>
<style lang="scss" scoped>
.wholesale-motivation__program {
  padding-top: 40px;
}

.wholesale-motivation-program__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 320px;
  padding: 32px;
  text-align: center;

  &-icon {
    font-size: 42px;
    color: #bdbdbd;
  }

  &-spinner {
    width: 48px;
    height: 48px;
    margin-bottom: 8px;
    border: 4px solid #e0e0e0;
    border-top-color: #282828;
    border-radius: 50%;
    animation: wholesale-motivation-program__spin 0.8s linear infinite;
  }

  &-title {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    line-height: 28px;
    color: #282828;
  }

  &-text {
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    color: #757575;
  }
}

@keyframes wholesale-motivation-program__spin {
  to {
    transform: rotate(360deg);
  }
}
</style>