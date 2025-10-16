<template>
  <!-- Верхушка страницы -->
    <div class="d-top d-top-clients">
      <Breadcrumbs />
    </div>
  <div>
    <CreateOrgForm type="2">
      <template #title> Создание виртуальной организации </template>
    </CreateOrgForm>
  </div>
</template>
<script>
import CreateOrgForm from '../org/ui/CreateOrgForm.vue'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'

export default {
  name: 'clientsAdd',
  components: { CreateOrgForm, Breadcrumbs },
}
</script>
<style>
.d-top-clients{
  margin-top:40px;
}
</style>
