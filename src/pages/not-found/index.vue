<template>
  <div class="not-found">
    <h1>Запрашиваемая вами страница не найдена</h1>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #282828;
  h1 {
    color: #ffffff;
    font-size: 70px;
    margin-bottom: 20px;
  }
}
</style>
