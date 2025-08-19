<template>
  <div class="reqirements">
    <ConfirmDialog />
    <Toast />
    <teleport to="body">
      <customModal v-model="modals.requirements" @cancel="cancel">
        <template v-slot:title>Потребности</template>
        <div>
          <Loader v-if="loading" />
          <div class="need__notice need-vendor__notice">
            Обратите внимание! Здесь отображаются только те потребности, которые привязаны к Складу
            доставки.
          </div>
          <BaseTable
            :filters="this.filters"
            :items_data="requirements.items"
            :total="requirements.total"
            :pagination_items_per_page="this.pagination_items_per_page"
            :pagination_offset="this.pagination_offset"
            :page="this.page"
            :table_data="this.table_data"
            title="Потребности"
            @filter="filterRequirements"
            @paginate="paginateRequirements"
            @viewElem="viewReq"
            @deleteElem="deleteReq"
          >
            <template v-slot:button>
              <a
                href="#"
                class="d-button d-button-primary d-button-primary-small d-button--sm-shadow"
                @click.prevent="
                  () => {
                    this.modals.createRequirement = !this.modals.createRequirement
                  }
                "
                >Создать</a
              >
            </template>
          </BaseTable>
        </div>
      </customModal>
      <customModal v-model="modals.createRequirement">
        <template v-slot:title>Загрузка потребности</template>
        <form @submit.prevent="formRequirementsSubmit" :class="{ loading: loading }">
          <div class="need__notice need-vendor__notice">
            Обратите внимание! Данная потребность будет привязана к складу доставки.
          </div>
          <div
            class="dart-form-group dart-mb-2"
            :class="{
              error: v$.formRequirements.name.$errors.length,
            }"
          >
            <div class="need-create__subtitle-container">
              <span class="need__subtitle need-create__subtitle"> Наименование потребности </span>
              <p class="need-create__description">
                Введите наименование, которое будет отражать смысл вашей потребности.
              </p>
            </div>
            <div class="d-input d-input--light need-create__input">
              <input
                v-model="this.formRequirements.name"
                type="text"
                placeholder="Укажите наименование потребности"
                name="need"
                class="d-input__field need-create__input-field"
              />
            </div>
            <span
              class="error_desc"
              v-for="error of v$.formRequirements.name.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </span>
          </div>
          <div
            class="dart-form-group dart-mb-2"
            :class="{
              error: v$.formRequirements.file.$errors.length,
            }"
          >
            <DropZone
              class="dart-dropzone"
              :maxFiles="Number(1)"
              url="/rest/file_upload.php?upload_products=xlsx"
              :uploadOnDrop="true"
              :multipleUpload="true"
              :acceptedFiles="['xlsx', 'xlsx']"
              :parallelUpload="1"
              @sending="parseFile"
              v-bind="args"
            >
              <template v-slot:message>
                <div class="dart-dropzone__custom">
                  <i class="pi pi-cloud-upload"></i>
                  <b>Перетащите файл в эту область</b>
                  <p>Вы также можете загрузить файл, <span>нажав сюда</span></p>
                </div>
              </template>
            </DropZone>
            <span
              class="error_desc"
              v-for="error of v$.formRequirements.file.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </span>
            <div class="desc-block dart-mt-1 dart-mb-1">
              <a
                :href="
                  site_url_prefix + '/assets/files/files/examples/ExampleLoadingRequirement.xlsx'
                "
                class="btn-txt mt-2"
                target="_blank"
              >
                <i class="pi pi-download"></i> Скачать шаблон файла</a
              >
            </div>
          </div>
          <div class="d-col-24 text-center">
            <button
              class="d-button d-button-primary d-button-primary-small d-button--sm-shadow d-ib"
              type="submit"
            >
              Создать потребность
            </button>
          </div>
        </form>
      </customModal>
      <customModal v-model="modals.requirementsView">
        <template v-slot:title>Выберите Поставщика</template>
        <form @submit.prevent="formRequirementsViewSubmit" :class="{ loading: loading }">
          <div class="need__notice need-vendor__notice">
            Для того, чтобы посмотреть предложения согласно Вашей Потребности, необходимо выбрать
            Поставщика для просмотра.
          </div>
          <div
            class="dart-form-group dart-mb-2"
            :class="{
              error: this.formRequirementsView.error,
            }"
          >
            <SelectInput
              v-model="this.formRequirementsView.warehouse"
              :options="this.optVendorsSelected.items"
              optionLabel="name"
              placeholder="Выберите поставщика"
              class="w-full md:w-14rem"
            />
            <span class="error_desc" v-if="this.formRequirementsView.error">
              Выберите поставщика
            </span>
            <div v-if="this.formRequirementsView.warehouse" class="mt-4">
              <!-- {{ this.form_requirements_view.warehouse }} -->
              <div
                v-for="store in this.formRequirementsView.warehouse.stores"
                :key="store.id"
                class="d-radio__wrapper need-vendor__radio-wrapper dart-mt-1"
              >
                <Checkbox
                  @change="changeStores(item.id, store.id, store.active)"
                  v-model="store.active"
                  :binary="true"
                  :inputId="'store-' + store.id"
                  :name="'store-' + store.id"
                  value="true"
                />
                <label
                  :for="'store-' + store.id"
                  class="d-radio__label need-vendor__radio-label dart-ml-1"
                  >Склад #{{ store.id }}, {{ store.address }}</label
                >
              </div>
            </div>
          </div>
          <div class="d-col-24 text-center">
            <button
              class="d-button d-button-primary d-button-primary-small d-button--sm-shadow d-ib"
              type="submit"
            >
              Просмотреть предложения
            </button>
          </div>
        </form>
      </customModal>
    </teleport>
  </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import DropZone from 'dropzone-vue'
import customModal from '@/shared/ui/Modal.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import SelectInput from 'primevue/select'
import Checkbox from 'primevue/checkbox'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'requirementWindow',
  components: {
    Loader,
    customModal,
    BaseTable,
    ConfirmDialog,
    Toast,
    DropZone,
    SelectInput,
    Checkbox,
  },
  emits: ['closeWindow'],
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 24,
    },
    pagination_offset: {
      type: Number,
      default: 0,
    },
    requirementsModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      args: {},
      modals: {
        requirements: this.requirementsModal,
        createRequirement: false,
        requirementsView: false,
        address: false,
      },
      formRequirements: {
        name: '',
        file: '',
      },
      formRequirementsView: {
        requirement: {},
        warehouse: {},
        error: false,
      },
      page: 1,
      table_data: {
        id: {
          label: '№',
          type: 'text',
        },
        name: {
          label: 'Наименование',
          type: 'text',
        },
        type: {
          label: 'Тип',
          type: 'text',
        },
        actions: {
          label: 'Действия',
          type: 'actions',
          sort: false,
          available: {
            view: {
              icon: 'pi pi-eye',
              label: 'Просмотреть',
            },
            delete: {
              icon: 'pi pi-trash',
              label: 'Удалить',
            },
          },
        },
      },
      filters: {
        name: {
          name: 'Наименование',
          placeholder: 'Наименование',
          type: 'text',
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      requirements: 'requirements/requirements',
      optVendorsSelected: 'org/optVendorsSelected',
    }),
  },
  mounted() {
    this.getRequirements({
      filter: '',
      page: this.page,
      perpage: this.pagination_items_per_page,
    })
  },
  methods: {
    ...mapActions({
      getRequirements: 'requirements/getRequirements',
      setRequirement: 'requirements/setRequirement',
      setRequirementWarehouse: 'requirements/setRequirementWarehouse',
      unsetRequirements: 'requirements/unsetRequirements',
      removeRequirements: 'requirements/removeRequirements',
    }),
    cancel() {
      this.$emit('closeWindow')
    },
    formRequirementsViewSubmit() {
      if (this.formRequirementsView.warehouse.length == 0) {
        this.formRequirementsView.error = true
      } else {
        this.formRequirementsView.error = false
      }
      if (!this.formRequirementsView.error) {
        this.$load(async () => {
          await this.setRequirementWarehouse(this.formRequirementsView).then((response) => {
            if (response.data.success) {
              this.$toast.add({
                severity: 'success',
                summary: 'Поставщик установлен!',
                detail: response.data.message,
                life: 3000,
              })
              this.$router.push({
                name: 'purchasesCatalogRequirement',
                params: { requirement_id: this.formRequirementsView.requirement.id + '_req' },
                query: { timestamp: Date.now() },
              })
              this.modals.requirements = false
              this.modals.requirementsView = false
            } else {
              this.$toast.add({
                severity: 'error',
                summary: 'Ошибка сохранения Поставщика',
                detail: response.data.message,
                life: 3000,
              })
            }
          })
        })
      }
    },
    async formRequirementsSubmit() {
      const validationResult = await this.v$.$validate()
      if (!validationResult) {
        console.log('validation failed')
        return
      }
      this.$load(async () => {
        this.loading = true
        let data = this.formRequirements
        await this.setRequirement(data).then((response) => {
          if (response.data.success) {
            this.$toast.add({
              severity: 'success',
              summary: 'Потребность успешно создана!',
              detail: response.data.message,
              life: 3000,
            })
            this.modals.createRequirement = false
            this.loading = false
            this.unsetRequirements()
            this.getRequirements({
              filter: '',
              page: 1,
              perpage: this.pagination_items_per_page,
            })
          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Ошибка создания потребности',
              detail: response.data.message,
              life: 3000,
            })
          }
        })
      })
    },
    parseFile(files, xhr) {
      console.log(files)
      console.log(xhr)
      const callback = (e) => {
        const res = JSON.parse(e)
        console.log(res)
        if (res.data.files[0].name) {
          this.formRequirements.file = res.data.files[0]
        }
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          callback(xhr.response)
        }
      }
    },
    viewReq(data) {
      this.modals.requirementsView = true
      this.formRequirementsView.requirement = data
      if (data.warehouse) {
        this.formRequirementsView.warehouse = data.warehouse
      }
    },
    deleteReq(data) {
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить Потребность с ID ' + data.id + '?',
        header: 'Подтверждение удаления',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading = true
          this.unsetRequirements()
          this.$load(async () => {
            await this.removeRequirements({
              requirements: data,
            })
              .then((response) => {
                if (response.data.success) {
                  this.$toast.add({
                    severity: 'success',
                    summary: 'Потребность удалена',
                    detail: 'Удаление Потребности ID ' + data.id + ' произошло успешно!',
                    life: 3000,
                  })
                  this.getRequirements({
                    filter: '',
                    page: 1,
                    perpage: this.pagination_items_per_page,
                  })
                } else {
                  this.$toast.add({
                    severity: 'error',
                    summary: 'Ошибка удаления Потребности',
                    detail:
                      'При удаление Потребности ID ' +
                      data.id +
                      ' произошла ошибка! ' +
                      response.data.message,
                    life: 3000,
                  })
                }
              })
              .catch((result) => {
                console.log(result)
              })
          })
          this.loading = false
        },
        reject: () => {
          this.$toast.add({
            severity: 'error',
            summary: 'Удаление Потребности',
            detail: 'Удаление Потребности отклонено',
            life: 3000,
          })
        },
      })
    },
    filterRequirements(data) {
      this.loading = true
      const sendData = {
        filter: data.filter,
        page: 1,
        perpage: this.pagination_items_per_page,
      }
      this.getRequirements(sendData)
      this.loading = false
    },
    paginateRequirements(data) {
      this.loading = true
      this.page = data.page
      this.getRequirements(data)
      this.loading = false
    },
  },
  watch: {
    requirementsModal: function (newVal) {
      if (newVal) this.modals.requirements = true
    },
    'modals.requirements': function (newVal) {
      if (!newVal) this.$emit('closeWindow')
    },
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      formRequirements: {
        name: {
          required: helpers.withMessage('Заполните наименование', required),
        },
        file: {
          required: helpers.withMessage('Файл обязателен для заполнения', required),
        },
      },
    }
  },
}
</script>
<style lang="scss">
.p-select-overlay {
  z-index: 1010 !important;
}
.need-create__input {
  margin-bottom: 0 !important;
}
.error_desc {
  padding: 12px 0;
  font-size: 12px;
  color: #f00;
  width: 100%;
  display: block;
}
.btn-txt {
  display: inline-block;
  padding: 3px 0;
  vertical-align: middle;
  &:hover {
    color: #f92c0d;
  }
}
.d-ib {
  display: inline-block;
}
.modal__content {
  & > div {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
}
.need-vendor__notice {
  background: #ededed;
  color: #757575;
}
.dart-dropzone {
  border: 2px dashed #e2e2e2 !important;
  padding: 15px 15px;
  margin-top: 10px;
  & .dart-dropzone__custom {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    & i {
      font-size: 72px !important;
      color: #e2e2e2;
    }
    b {
      font-size: 14px;
      margin-top: 18px;
    }
    p {
      color: #a0a0a0;
      font-size: 14px;
      margin: 0;
      span {
        color: #1874cf;
        text-decoration: underline;
      }
    }
  }
}
</style>
