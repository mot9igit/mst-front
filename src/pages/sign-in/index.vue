<template>
  <FormSignUp v-if="this.isRegForm" @setRegForm="setRegForm" :settings="settings"></FormSignUp>
  <FormSignIn v-if="!this.isRegForm" @setRegForm="setRegForm"></FormSignIn>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import FormSignIn from './ui/sign-in.vue'
import FormSignUp from './ui/sign-up.vue'

export default {
  name: 'SignInPage',
  data() {
    return {
      organizations: [],
      isRegForm: false,
      settings: null,
    }
  },
  components: { FormSignIn, FormSignUp },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
    }),
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser',
      deleteUser: 'user/deleteUser',
      getSessionUser: 'user/getSessionUser',
    }),
    setRegForm(state) {
      this.isRegForm = state
      this.$cookies.remove('analytics_register')
    },
  },
  async mounted() {
    if (Object.keys(this.$cookies.get('analytics_register')).length) {
      this.isRegForm = true
      this.settings = this.$cookies.get('analytics_register')
    }
    if (localStorage.getItem('user') !== null && localStorage.getItem('user') != 0) {
      this.setUser(JSON.parse(localStorage.getItem('user')))
    } else {
      // TODO: сделать запрос на проверку сессии
      const user = await this.getSessionUser()
      localStorage.setItem('user', JSON.stringify(user))
      this.$store.dispatch('user/setUser', user)
    }
    if (this.getUser) {
      this.$router.push({ name: 'account' })
    } else {
      this.deleteUser()
      this.$router.push({ name: 'home' })
    }
  },
}
</script>
<style lang="scss"></style>
