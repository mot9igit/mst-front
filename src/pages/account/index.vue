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
import { mapActions, mapGetters } from 'vuex'
import ProfileSidebar from './ui/sidebar.vue'
import ProfileHeader from './ui/header.vue'
import router from '@/router'

export default {
  name: 'UserAccount',
  mounted() {
    const data = {
      action: 'get/orgs',
    }
    this.org_get_from_api(data)
  },
  computed: {
    ...mapGetters({
      orgs: 'orgs',
    }),
  },
  methods: {
    ...mapActions({
      org_get_from_api: 'org_get_from_api',
    }),
  },
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
