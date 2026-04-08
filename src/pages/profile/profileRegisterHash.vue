<template>
  <Loader v-if="loading" />
  hello world!
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'profileRegisterHash',
  data() {
    return {
      modalEditProfile: true,
      successModalInfo: false,
      errorModalInfo: false,
      loading: true,
    }
  },
  components: { Loader },
  methods: {
    ...mapActions({
      setUser: 'user/setUser',
      deleteUser: 'user/deleteUser',
      getSessionUser: 'user/getSessionUser',
      getOrg: 'org/getOrg',
      editUser: 'user/edit_profile',
    }),
    redirectToMain() {
      this.$router.push({ name: 'home', hash: this.$route.params.hash })
    },
  },
  async mounted() {
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.vfm__content') || event.target.closest('.modal__close')) {
        this.redirectToMain()
      }
    })

    console.log('Hash из параметров маршрута:', this.$route.params.hash)

    if (this.$route.params.hash) {
      try {
        const res = await this.editUser({
          action: 'profile/edit/confirm',
          hash: this.$route.params.hash,
        })

        if (!res.data.data.success) {
          this.modalEditProfile = true
          this.successModalInfo = false
          this.errorModalInfo = true
          this.loading = false
          //this.$router.push({ name: "profile" });
        } else {
          this.modalEditProfile = true
          this.errorModalInfo = false
          this.successModalInfo = true
          this.loading = false
          //this.$router.push({ name: "profile" });
        }
      } catch (error) {
        this.$router.push({ name: 'profile' })
      }
    } else {
      this.$router.push({ name: 'profile' })
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      orgs: 'org/orgs',
    }),
  },
  watch: {},
}
</script>

<style lang="scss"></style>
