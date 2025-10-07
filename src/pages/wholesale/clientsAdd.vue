<template>
  <div>
    <CreateOrgForm type="2">
      <template #title> Создание виртуальной организации </template>
    </CreateOrgForm>
  </div>
</template>
<script>
import CreateOrgForm from '../org/ui/CreateOrgForm.vue'

export default {
  name: 'clientsAdd',
  components: { CreateOrgForm },
}
</script>
<style></style>
