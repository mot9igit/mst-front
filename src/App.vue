<template>
  <div id="analytics_app">
    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'MST',
  created() {
    document.title = 'MST Аналитика'
  },
}
</script>

<style lang="scss">
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
