<template>
  <CreateOrgForm>
    <template #title> Создание организации </template>
  </CreateOrgForm>
  <div class="org-register">
    <div class="warehouse-analysis__description">
      <p>
        К сожалению, пока нельзя создать Организацию самостоятельно. Мы упорно работаем над этим
        функционалом, и в ближайшее время он обязательно появится!
      </p>
    </div>
  </div>
</template>
<script>
import CreateOrgForm from './ui/CreateOrgForm.vue'
export default {
  name: 'OrgAdd',
  components: { CreateOrgForm },
}
</script>
<style lang="scss">
.org-register {
  position: relative;
  min-height: 100vh;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
