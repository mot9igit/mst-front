<template>
  <div>
    <FormSignUp v-if="this.isRegForm" @setRegForm="setRegForm"></FormSignUp>
    <FormSignIn v-if="!this.isRegForm" @setRegForm="setRegForm"></FormSignIn>
  </div>
</template>
<script>
import FormSignIn from './ui/sign-in.vue'
import FormSignUp from './ui/sign-up.vue'

export default {
  name: 'SignInPage',
  data() {
    return {
      organizations: [],
      isRegForm: false,
    }
  },
  components: { FormSignIn, FormSignUp },
  methods: {
    setRegForm(state) {
      this.isRegForm = state
    },
  },
}
</script>
<style lang="scss"></style>
