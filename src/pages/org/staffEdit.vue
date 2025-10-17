<template>
  <div>
    <StaffForm />
  </div>
</template>

<script>
import StaffForm from './ui/staffForm.vue'

export default {
  name: 'ProfileStaffEdit',
  components: { StaffForm },
}
</script>

<style lang="scss">
.lk-staff-create__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}
.lk-staff-edit__operator-search:after {
  content: '\e01d';
  font-family: 'Iconly';
  position: relative;
  display: block;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 9px;
  font-size: 18px;
}

.lk-staff-edit__regions .d-search .d-search__suggestions {
  top: 36px;
  left: 2px;
  padding: 20px 4px 10px 4px !important;
  //z-index: 0;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
  background: #ededed;
  max-height: 500px;
  overflow-y: scroll;
  width: fit-content;
  min-width: 560px;
}
.lk-staff-edit__regions:first-child .lk-staff-edit__operator-search {
  z-index: 6;
}
.lk-staff-edit__regions:first-child .d-search .d-search__suggestions {
  z-index: 5;
}
.lk-staff-edit__regions:nth-child(2) .lk-staff-edit__operator-search {
  z-index: 4;
}
.lk-staff-edit__regions:nth-child(2) .d-search .d-search__suggestions {
  z-index: 3;
}
.lk-staff-edit__regions:last-child .lk-staff-edit__operator-search {
  z-index: 2;
}
.lk-staff-edit__regions:last-child .d-search .d-search__suggestions {
  z-index: 1;
}
.lk-staff-edit__regions .chips {
  margin: 20px 0 16px;
}
.lk-staff-edit__regions-cont {
  padding-bottom: 40px;
  border-bottom: 0.5px solid rgba(117, 117, 117, 0.4588235294);
}
.lk-staff-edit__operator-notifications-wrapper {
  padding-top: 32px;
}
</style>
