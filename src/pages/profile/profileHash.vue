<template>
    <Loader v-if="loading" />
    <teleport to="body" v-else>
     <customModal class="profile__info-modal" v-model="modalEditProfile" id="modallHash">
        <div class="profile__info-modal-success" v-if="successModalInfo">
          <h2>Изменения сохранены!</h2>
          <p>Ваши настройки были успешно применены.</p>
        </div>
        <div class="profile__info-modal-success" v-if="errorModalInfo">
          <h3>Произошла ошибка!</h3>
          <p>Изменения не были применены.</p>

          </div>
        <button
          type="button"
          href="#"
          class="d-button d-button-primary d-button-primary-small d-button--sm-shadow profile__info-button"
          @click.prevent="redirectToProfile()"
        >
              Ок
        </button>
      </customModal>
    </teleport>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'

export default {
  name: 'profileHash',
	data() {
		return {
      modalEditProfile: true,
      successModalInfo: false,
      errorModalInfo: false,
      loading: true,
		};
	},
  components: { customModal, Loader },
	methods: {
		...mapActions({
			setUser: 'user/setUser',
			deleteUser: 'user/deleteUser',
			getSessionUser: 'user/getSessionUser',
			getOrg: 'org/getOrg',
      editUser: 'user/edit_profile'
		}),
    redirectToProfile(){
      this.$router.push({ name: "profile" })
    },
	},
	async mounted() {

    document.addEventListener('click', event => {
      if (!event.target.closest('.vfm__content') || event.target.closest('.modal__close')) {
        this.redirectToProfile()
      }
     })

		console.log("Hash из параметров маршрута:", this.$route.params.hash);

		if (this.$route.params.hash) {
			try {
				const res = await this.editUser({
					action: 'profile/edit/confirm',
					hash: this.$route.params.hash
				});

				if (!res.data.data.success) {
          this.modalEditProfile = true
          this.successModalInfo = false
          this.errorModalInfo = true
          this.loading = false
					//this.$router.push({ name: "profile" });
				}else{
          this.modalEditProfile = true
          this.errorModalInfo = false
          this.successModalInfo = true
          this.loading = false
          //this.$router.push({ name: "profile" });
        }

			} catch (error) {
				this.$router.push({ name: "profile" });
			}
		} else {
			this.$router.push({ name: "profile" });
		}
	},
	computed: {
		...mapGetters({
            getUser: 'user/getUser',
            orgs: 'org/orgs',
        })
    },
	watch: {
		getUser: function (newVal, oldVal) {
            this.login = newVal.username
        }
	}
};
</script>

<style lang="scss"></style>
