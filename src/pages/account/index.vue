<template>
  <ProfileSidebar></ProfileSidebar>
  <div class="content">
    <ProfileHeader v-if="this.$route.params.id" @toggleCatalog="toggleCatalog"></ProfileHeader>
    <main class="main">
      <router-view> </router-view>
    </main>
  </div>
  <ProfileCatalogMenu :active="toggleMenu"/>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ProfileSidebar from './ui/sidebar.vue'
import ProfileHeader from './ui/header.vue'
import ProfileCatalogMenu from './ui/catalogMenu.vue'

export default {
  name: 'UserAccount',
  data () {
    return{
      toggleMenu: false
    }
  },
  mounted() {
    this.getSessionUser()
    const data = {
      action: 'get/orgs',
    }
    this.org_get_from_api(data).then((response) => {
      if (response != undefined) {
        const org = localStorage.getItem('global.organization')
        let i = 0
        if (org) {
          const orgs = response.data.data
          orgs.forEach((element, index) => {
            if (element.id == org) {
              i = index
            }
          })
        }
        if (this.$route.name == 'account') {
          this.$router.push({ name: 'purchases', params: { id: response.data.data[i].id } })
        }
      }
    })
  },
  computed: {
    ...mapGetters({
      orgs: 'orgs',
    }),
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser',
      deleteUser: 'user/deleteUser',
      getSessionUser: 'user/getSessionUser',
      org_get_from_api: 'org_get_from_api',
    }),
    toggleCatalog(){
      console.log(this.toggleMenu)
      this.toggleMenu = !this.toggleMenu
      console.log(this.toggleMenu)
    }

  },
  components: { ProfileSidebar, ProfileHeader, ProfileCatalogMenu },
}
</script>
<style>
.content {
  background-color: #ededed;
}
</style>
