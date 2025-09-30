<template>
  <div class="create-org-form">
    <PreLoader v-if="loading"></PreLoader>
    <form action="#" @submit.prevent="formChangeSimple" autocomplete="off">
      <div class="profile-content__title sticky-element">
        <h1 class="title-h1"><slot name="title">Создание Организации</slot></h1>
        <div class="buttons_container">
          <button
            type="submit"
            class="dart-btn dart-btn-primary btn-padding"
            :disabled="this.loading"
          >
            Сохранить
          </button>
        </div>
      </div>
      <!-- <div class="dart-alert dart-alert-info">Вы можете изменить только данные контактного лица и логотип организации.</div> -->
      <div class="dart-form-group mb-5 std-create-clients__logo-container">
        <span class="ktitle">Логотип</span>
        <DropZone
          v-if="!this.orgprofile.image"
          class="kenost-dropzone"
          :maxFiles="Number(1)"
          url="/rest/file_upload.php?upload_org_avatar=avatar"
          :uploadOnDrop="true"
          :multipleUpload="true"
          :acceptedFiles="['image/*']"
          :parallelUpload="1"
          @sending="parseFile"
          v-bind="args"
        >
          <template v-slot:message>
            <div class="kenost-dropzone__custom hidden-mobile-l">
              <i class="pi pi-cloud-upload"></i>
              <b>Перетащите файл в эту область</b>
              <p>Вы также можете загрузить файл, <span>нажав сюда</span></p>
            </div>

            <div class="kenost-dropzone__custom visible-mobile-l">
              <i class="pi pi-cloud-upload"></i>
              <b>Загрузите файл сюда</b>
              <span class="kenost-dropzone__link">Открыть</span>
            </div>
          </template>
        </DropZone>
      </div>
      <div class="dart-form-group mb-4 std-create-clients__data-container">
        <span class="ktitle mb-3">Данные контактного лица</span>
        <div class="kenost-form-grid">
          <div
            class="dart-form-group w-50"
            v-for="(field, index) in form.fields.contacts"
            :key="index"
          >
            <!-- <label for="">{{ field.label }}</label> -->
            <input
              type="text"
              v-model="this.orgprofile[field.name]"
              class="dart-form-control std-create-clients__input"
              :name="field.name"
              :placeholder="field.placeholder"
            />
            <!-- <span
                            class="error_desc"
                            v-for="error of v$.orgprofile[field.name].$errors"
                            :key="error.$uid"
                        >
                            {{ error.$message }}
                        </span> -->
          </div>
        </div>
      </div>
      <div class="dart-form-group mb-4 std-create-clients__data">
        <span class="ktitle mb-3">Данные компании</span>
        <div class="kenost-form-grid">
          <div
            class="form_input_group dart-form-group w-50"
            :class="{
              error: v$.form.company.data.value.$errors.length,
            }"
          >
            <input
              type="text"
              v-model="this.form.company.data.value"
              class="dart-form-control std-create-clients__input"
              placeholder="Наименование организации"
            />
            <span
              class="error_desc"
              v-for="error of v$.form.company.data.value.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </span>
          </div>
          <div
            class="form_input_group dart-form-group w-50"
            :class="{
              error: v$.form.company.inn.$errors.length,
            }"
          >
            <Autocomplete
              name="inn"
              class="dart-form-control std-create-clients__input"
              type="company"
              selectionType="single"
              placeholder="ИНН"
              required
              v-model="form.company.inn"
              @setSelection="form.company.data = $event"
            />
            <span class="error_desc" v-for="error of v$.form.company.inn.$errors" :key="error.$uid">
              {{ error.$message }}
            </span>
          </div>
        </div>

        <div
          class="form_input_group dart-form-group w-50"
          v-for="(warehouse, index) in this.form.company.warehouses"
          :key="index"
          :class="{
            error: v$.form.company.warehouses.$errors.length,
          }"
        >
          <AddAddress
            :key="index"
            :index="index"
            :value="this.form.company.warehouses[index].address"
            v-model="this.form.company.warehouses[index].address"
            class="std-create-clients__add-address"
          />
          <span
            class="error_desc"
            v-for="error of v$.form.company.warehouses.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </span>
        </div>
        <div class="std-auth__actions-container">
          <button
            v-if="this.form.company.warehouses.length > 1"
            class="d-button d-button-secondary d-button--no-shadow"
            type="button"
            @click="() => this.form.company.warehouses.pop()"
          >
            <span>Удалить</span>
          </button>
          <button
            class="d-button d-button-primary d-button--no-shadow"
            :disabled="this.loading"
            type="button"
            @click="() => this.form.company.warehouses.push({ value: '' })"
          >
            <i v-if="this.loading" class="pi pi-spin pi-spinner" style="font-size: 14px"></i>
            <span>Добавить адрес</span>
            <i class="pi pi-plus"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import PreLoader from '@/shared/ui/Loader.vue'
import DropZone from 'dropzone-vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { helpers } from '@vuelidate/validators'
import AddAddress from './AddAddress.vue'
import Autocomplete from '@/shared/ui/Autocomplete.vue'

export default {
  name: 'CreateOrgForm',
  components: { PreLoader, DropZone, AddAddress, Autocomplete },
  data() {
    return {
      loading: false,
      orgprofile: {
        image: '',
      },
      form: {
        fields: {
          contacts: [
            {
              name: 'contact',
              label: 'ФИО (контактного лица)',
              placeholder: 'Иванов Иван Иванович',
              type: 'text',
              readonly: 0,
            },
            {
              name: 'phone',
              label: 'Телефон (контактного лица)',
              placeholder: '+79991234567',
              type: 'text',
              readonly: 0,
            },
            {
              name: 'email',
              label: 'E-mail (контактного лица)',
              placeholder: 'mail@site.ru',
              type: 'text',
              readonly: 0,
            },
          ],
        },
        company: {
          data: { value: '' },
          inn: '',
          warehouses: [
            {
              address: {
                value: '',
              },
            },
          ],
          register: false,
        },
      },
    }
  },
  methods: {
    onUpload(data) {
      if (data.xhr.response) {
        const response = JSON.parse(data.xhr.response)
        if (Object.prototype.hasOwnProperty.call(response.data, 'files')) {
          // перечень загруженныйх файлов

          if (response.data.files[0].type === 'avatar') {
            this.orgprofile.image = response.data.files[0]
            this.orgprofile.upload_image = true
          }
        }
      }
      this.$toast.add({
        severity: 'info',
        summary: 'Логотип успешно загружен!',
        detail: 'Не забудьте сохранить изменения',
        life: 3000,
      })
    },
    parseFile(files, xhr) {
      const callback = (e) => {
        const res = JSON.parse(e)
        if (res.success) {
          if (res.data.files[0].type === 'avatar') {
            this.orgprofile.image = res.data.files[0]
            this.orgprofile.upload_image = true
          }
        }
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          callback(xhr.response)
        }
      }
    },
  },
  mounted() {},
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      form: {
        company: {
          inn: {
            required,
          },
          data: {
            value: {
              required,
            },
          },
          warehouses: {
            required: helpers.withMessage('Выберите хотя бы один адрес', () => {
              return (
                this.form.company.warehouses.length &&
                this.form.company.warehouses[0].address.value != ''
              )
            }),
          },
        },
      },
    }
  },
}
</script>
<style lang="scss">
.create-org-form {
  position: relative;
  padding: 64px 0;
}
.title-h1 {
  font-size: 32px;
  font-weight: 600;
}
</style>
