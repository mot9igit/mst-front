<template>
  <ProfileSidebar></ProfileSidebar>
  <div class="content">
    <ProfileHeader
      v-if="this.$route.params.id"
      @toggleCatalog="toggleCatalog"
      @toggleVendor="toggleVendor"
    ></ProfileHeader>

    <main class="main">
      <router-view> </router-view>
      <changeVendorsWindow :active="this.toggleVendors" @close="changeVendorsWindowClose" />
    </main>
  </div>
  <ProfileCatalogMenu :active="toggleMenu" />
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ProfileSidebar from './ui/sidebar.vue'
import ProfileHeader from './ui/header.vue'
import ProfileCatalogMenu from './ui/catalogMenu.vue'
import changeVendorsWindow from './ui/changeVendorsWindow.vue'

export default {
  name: 'UserAccount',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      toggleMenu: false,
      toggleVendors: false,
    }
  },
  mounted() {
    this.getSessionUser()
    this.updateInfo()
  },
  computed: {
    ...mapGetters({
      orgs: 'orgs',
      optVendors: 'optVendors',
    }),
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser',
      deleteUser: 'user/deleteUser',
      getSessionUser: 'user/getSessionUser',
      getOrg: 'getOrg',
      getOptVendors: 'getOptVendors',
    }),
    toggleCatalog() {
      this.toggleMenu = !this.toggleMenu
    },
    toggleVendor() {
      this.toggleVendors = !this.toggleVendors
    },
    changeVendorsWindowClose() {
      this.toggleVendors = false
    },
    updateInfo() {
      const data = {
        action: 'get/orgs',
      }
      this.getOrg(data).then((response) => {
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
          this.getOptVendors().then(() => {})
          if (this.$route.name == 'account') {
            this.$router.push({ name: 'purchases', params: { id: response.data.data[i].id } })
          }
        }
      })
    },
  },
  watch: {
    '$route.params.id': function () {
      this.updateInfo()
    },
  },
  components: { ProfileSidebar, ProfileHeader, ProfileCatalogMenu, changeVendorsWindow },
}
</script>
<style>
header button,
aside button {
  color: #282828;
}
.content {
  background-color: #ededed;
}

</style>
