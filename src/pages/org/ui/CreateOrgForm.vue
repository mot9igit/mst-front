<template>
  <div class="create-org-form">
    <PreLoader v-if="loading"></PreLoader>
    <form action="#" @submit.prevent="formSubmit" autocomplete="off">
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
      <div class="create-org-form__wrap">
        <!-- <div class="dart-alert dart-alert-info">Вы можете изменить только данные контактного лица и логотип организации.</div> -->
        <div class="dart-form-group">
          <span>Логотип</span>
          <DropZone
            v-if="!this.orgprofile.image"
            class="d-upload collection__upload"
            :maxFiles="Number(1)"
            :url="'/rest/file_upload.php?upload_org_avatar=avatar'"
            :uploadOnDrop="true"
            :multipleUpload="true"
            :acceptedFiles="['image/*']"
            :parallelUpload="1"
            @sending="parseFile"
            v-bind="args"
          >
            <template v-slot:message>
              <div class="collection__upload-title-wrapper">
                <i class="pi pi-cloud-upload"></i>
                <b class="d-upload__title collection__upload-title"
                  >Перетащите файл в эту область</b
                >
                <p class="d-upload__description collection__upload-description">
                  Вы также можете загрузить файл,
                  <span class="d-link d-upload__link collection__upload-link">нажав сюда</span>
                </p>
              </div>
            </template>
          </DropZone>
          <div class="lk-about__info-image-wrapper" v-else>
            <FileUpload
              name="avatar[]"
              :url="'/rest/file_upload.php?upload_org_avatar=avatar'"
              @upload="onUpload"
              :auto="true"
              :multiple="false"
              accept="image/*"
              :maxFileSize="1000000"
            >
              <template #header="{ chooseCallback }">
                <img
                  :src="
                    orgprofile.upload_image
                      ? this.orgprofile.image.original_href
                      : this.orgprofile.image
                  "
                  alt=""
                  class="lk-about__info-image"
                />
                <i class="d-icon-pen2" @click.prevent="chooseCallback()"></i>
              </template>
            </FileUpload>
          </div>
        </div>
        <div class="dart-form-group">
          <span>Данные контактного лица</span>
          <div class="dart-input-group" v-for="(field, index) in form.fields.contacts" :key="index">
            <!-- <label for="">{{ field.label }}</label> -->
            <input
              type="text"
              v-model="this.orgprofile[field.name]"
              class="dart-form-control"
              :name="field.name"
              :placeholder="field.placeholder"
              :class="{
                error: v$.orgprofile[field.name].$errors.length,
              }"
            />
            <span
              class="error_desc"
              v-for="error of v$.orgprofile[field.name].$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </span>
          </div>
        </div>
        <div class="dart-form-group">
          <span>Данные компании</span>
          <div
            class="dart-input-group"
            :class="{
              error: v$.form.company.inn.$errors.length,
            }"
          >
            <Autocomplete
              name="inn"
              class="dart-form-control"
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
          <div
            class="dart-input-group"
            :class="{
              error: v$.form.company.data.value.$errors.length,
            }"
          >
            <input
              type="text"
              v-model="this.form.company.data.value"
              class="dart-form-control"
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
            class="dart-input-group"
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
          <div class="create-org-form__actions-container">
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
      </div>
    </form>
    <teleport to="body">
      <customModal
        v-model="this.modalSuccess"
        class="product-not-available product-multiplicity-not-available"
      >
        <span class="dart-modal-title">
          <b>Компания создана</b>
        </span>
        <p>
          Компания создана, но не подтверждена. <br />
          Для подтверждения вашего статуса и личности, менеджер свяжется с компанией по ее публичным
          контактом в течение одного рабочего дня.
        </p>
        <button
          class="d-button d-button-primary d-button-primary-small"
          @click="
            () => {
              this.modalSuccess = false
              if (this.orgId) {
                this.$router.push({
                  name: 'organizationIndexPage',
                  params: { id: this.orgId },
                })
              }
            }
          "
        >
          Ок
        </button>
      </customModal>
    </teleport>
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
import FileUpload from 'primevue/fileupload'
import { mapActions, mapGetters } from 'vuex'
import customModal from '@/shared/ui/Modal.vue'

export default {
  name: 'CreateOrgForm',
  components: { PreLoader, DropZone, AddAddress, Autocomplete, FileUpload, customModal },
  props: {
    type: {
      type: String,
      default: '1', // 1 - своя, 2 - виртуальная
    },
  },
  data() {
    return {
      args: {},
      orgId: 0,
      modalSuccess: false,
      loading: false,
      client_id: 0,
      orgprofile: {
        image: '',
        contact: '',
        phone: '',
        email: '',
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
  computed: {
    ...mapGetters({
      virtOrg: 'wholesale/virtOrg',
    }),
  },
  methods: {
    ...mapActions({
      createOrg: 'org/create',
      editOrg: 'org/edit',
      orgVirtualProfile: 'wholesale/orgVirtualProfile',
      unsetVirtualProfile: 'wholesale/unsetVirtualProfile',
    }),
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
    async formSubmit() {
      const result = await this.v$.$validate()
      // const result = true;
      if (!result) {
        console.log(result)
      } else {
        this.loading = true
        const sendData = {
          form: this.form,
          orgprofile: this.orgprofile,
          type: this.type,
          client_id: this.client_id,
        }
        const response = await this.createOrg(sendData)
        this.loading = false
        if (response.data.data.success) {
          if (response.data.data.data?.org?.id || response.data.data.data.organization?.id) {
            if (response.data.data.data?.org?.id) {
              this.$toast.add({
                severity: 'success',
                summary: 'Организация успешно сохранена!',
                detail: 'Сейчас Вы будете перенаправлены в личный кабинет Организации',
                life: 3000,
              })
              this.orgId = response.data.data.data?.org?.id
              this.modalSuccess = true
            } else {
              this.$toast.add({
                severity: 'success',
                summary: 'Организация успешно сохранена!',
                detail: 'Сейчас Вы будете перенаправлены на страницу Клиентов',
                life: 3000,
              })
              this.$router.push({
                name: 'wholesaleClients',
                params: { id: this.$route.params.id },
              })
            }
          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Ошибка при создании Организации!',
              detail: 'Непредвиденная ошибка при создании Организации',
              life: 3000,
            })
          }
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка!',
            detail: response.data.data.message,
            life: 3000,
          })
        }
      }
    },
  },
  mounted() {
    if (this.$route.params.client_id) {
      this.client_id = this.$route.params.client_id
      this.orgVirtualProfile({
        client_id: this.client_id,
      })
    }
  },
  watch: {
    virtOrg: function (newVal) {
      console.log(newVal)
      this.orgprofile = newVal
      this.form.company.inn = newVal.requisites['0'].inn
      this.form.company.data.value = newVal.requisites['0'].name
      if (newVal.warehouses) {
        const array1 = newVal.warehouses
        array1.forEach((element, index) => {
          if (index == 0) {
            this.form.company.warehouses[0].address.value = element.address
            this.form.company.warehouses[0].address.coordinats = element.coordinats
            this.form.company.warehouses[0].id = element.id
          } else {
            const newWarehouse = {
              address: {
                value: element.address,
                coordinats: element.coordinats,
              },
              id: element.id,
            }
            this.form.company.warehouses.push(newWarehouse)
          }
        })
      }
    },
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      orgprofile: {
        contact: {
          required: helpers.withMessage('Поле обязательно для заполнения', () => {
            return this.orgprofile.contact
          }),
        },
        email: {
          required: helpers.withMessage('Поле обязательно для заполнения', () => {
            return this.orgprofile.email
          }),
        },
        phone: {
          required: helpers.withMessage('Поле обязательно для заполнения', () => {
            return this.orgprofile.phone
          }),
        },
      },
      form: {
        company: {
          inn: {
            required: helpers.withMessage('Поле обязательно для заполнения', () => {
              return this.form.company.inn
            }),
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
.dart-modal-title {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
  color: #282828;
  display: block;
  margin-bottom: 8px;
}
.sticky-element {
  position: sticky;
  z-index: 10;
  top: 0;
  padding: 12px 0;
  background: #fafafa;
}
.create-org-form {
  position: relative;
  padding: 64px 0;
  .create-org-form__wrap {
    margin-top: 24px;
    max-width: 600px;
  }
  .create-org-form__actions-container {
    display: flex;
    gap: 12px;
  }
}
.title-h1 {
  font-size: 32px;
  font-weight: 600;
}
.dart-form-group {
  margin-bottom: 24px;
  & > span {
    display: block;
    font-size: 18px;
    margin-bottom: 20px;
  }
}
.dart-input-group {
  margin-bottom: 12px;
}
.std-auth__map {
  margin-top: 12px;
  border-radius: 5px;
  overflow: hidden;
}
.error-message,
.error_desc {
  display: block;
  padding: 5px 0;
  color: #f00;
  font-size: 12px;
}
</style>
