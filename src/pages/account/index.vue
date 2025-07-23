<template>
  <ProfileSidebar
  :active-sidebar="getactive"></ProfileSidebar>
  <div class="content">
    <ProfileHeader></ProfileHeader>
    <main class="main">
      <router-view> </router-view>
    </main>
  </div>
</template>
<script>
import ProfileSidebar from './ui/sidebar.vue'
import ProfileHeader from './ui/header.vue'
import router from '@/router'

export default {
  name: 'UserAccount',
  components: { ProfileSidebar, ProfileHeader },
  computed: {
    getactive(){
      return localStorage.getItem('storedsidebarToggle')
    }
  },
}
</script>
<style>
.content {
  background-color: #ededed;
}
</style>
