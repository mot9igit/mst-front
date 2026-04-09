<template>
  <Loader v-if="loading" />
  <teleport to="body" v-else>
    <customModal class="profile__info-modal" v-model="errorModalInfo" id="modallHash">
      <div class="profile__info-modal-success">
        <h3>Произошла ошибка!</h3>
        <p>Время ссылки истекло или ссылка является недействительной!</p>
      </div>
      <button
        type="button"
        href="#"
        class="d-button d-button-primary d-button-primary-small d-button--sm-shadow profile__info-button"
        @click.prevent="this.$router.push({ name: 'home' })"
      >
        Ок
      </button>
    </customModal>
  </teleport>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'profileRegisterHash',
  data() {
    return {
      errorModalInfo: false,
      loading: true,
    }
  },
  components: { Loader },
  methods: {
    ...mapActions({
      getSessionUser: 'user/getSessionUser',
      editUser: 'user/edit_profile',
      setUser: 'user/setUser',
    }),
  },
  async mounted() {
    console.log('Hash из параметров маршрута:', this.$route.params.hash)

    if (this.$route.params.hash) {
      try {
        const res = await this.editUser({
          action: 'profile/create',
          hash: this.$route.params.hash,
        })

        if (!res.data.data.success) {
          this.errorModalInfo = true
          this.loading = false
        } else {
          this.loading = false
          this.$router.push({ name: 'home' })
        }
      } catch (error) {
        this.errorModalInfo = true
      }
    } else {
      this.errorModalInfo = true
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
  },
  watch: {},
}
</script>

<style lang="scss"></style>
