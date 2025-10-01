<template>
  <CreateOrgForm type="1">
    <template #title> Создание организации </template>
  </CreateOrgForm>
</template>
<script>
import CreateOrgForm from './ui/CreateOrgForm.vue'
export default {
  name: 'OrgAdd',
  components: { CreateOrgForm },
}
</script>
<style lang="scss"></style>
