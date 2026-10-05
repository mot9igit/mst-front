<template>
  <ConfirmDialog />
  <router-view></router-view>
</template>

<script>
import ConfirmDialog from 'primevue/confirmdialog'

export default {
  name: 'MST',
  components: { ConfirmDialog },
  created() {
    document.title = 'МС: Управление Продажами и Закупками'
  },
}
</script>

<style lang="scss">
.p-treeselect-label {
  max-width: 100%;
}
.p-treeselect-label.p-placeholder {
  color: #282828;
}
#app {
  width: 100%;
}
#analytics_app {
  width: 100%;
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
