<template>

  <form class="form-signin" @submit.prevent="formSubmit" v-if="!message">

    <input
      type="text"
      name="username"
      class="modal__input"
      placeholder="Логин или email"
      required=""
      v-model="form.email"
    />
    <button class="d-button d-button-primary" type="submit">
      Восстановить
    </button>
  </form>
  <div class="message" v-else>
    <p>{{ message }}</p>
  </div>

</template>

<script>
export default {
  name: 'formForgot',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      message: '',
    }
  },
  methods: {
    formSubmit() {
      this.forgotPass()
    },
    forgotPass() {
      this.$load(async () => {
        const data = await this.$api.auth.signIn({
          username: this.form.email,
          password: this.form.password,
        })
        this.message = data.data.message
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.message {
  font-size: 16px;
  color: #282828;
}
.d-button{
  width:50%;
  margin:30px auto 0px;
}
</style>
