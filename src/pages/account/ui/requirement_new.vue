<template>
  <div class="reqirements">
    <ConfirmDialog />
    <Toast />
    <teleport to="body">
      <customModal v-model="modals.requirements" @cancel="cancel" class="need-modal">
        <template v-slot:title>Потребности</template>

        <div>
          <Loader v-if="loading" />
          <!-- <div class="need__notice need-vendor__notice">
            Обратите внимание! Здесь отображаются только те потребности, которые привязаны к Складу
            доставки.
          </div> -->
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
      <customModal v-model="modals.createRequirement" class="need-modal-create">
        <template v-slot:title>Загрузка потребности</template>
        <!-- <div class="need__notice need-vendor__notice">
          Обратите внимание! Данная потребность будет привязана к складу доставки.
        </div> -->
        <form @submit.prevent="formRequirementsSubmit" :class="{ loading: loading }">
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
            v-if="!no_av_items.length"
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
      <customModal v-model="modals.requirementsView" class="need-modal-view">
        <template v-slot:title>Выберите поставщика и склады</template>
        <div class="need__notice need-vendor__notice">
          Для формирования заказа выберите поставщика, список складов и один основной склад —
          система сначала возьмёт товар оттуда, а при нехватке — с ближайших по сроку доставки.
        </div>
        <form @submit.prevent="formRequirementsViewSubmit" :class="{ loading: loading }">
          <div
            class="dart-form-group dart-mb-2"
            :class="{
              error: this.formRequirementsView.error,
            }"
          >
            <!--:options="!offer ? this.optVendorsSelected.items : this.vendorOfferSelected.items"-->
            <SelectInput
              v-model="this.formRequirementsView.warehouse"
              :options="this.vendors"
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
                  v-model="store.active"
                  :binary="true"
                  :inputId="'store-' + store.id"
                  :name="'store-' + store.id"
                  value="false"
                  @change="changeStores(store.id, store.active)"
                />
                <label
                  :for="'store-' + store.id"
                  class="d-radio__label need-vendor__radio-label dart-ml-1"
                  >Склад {{ store.name_short }} #{{ store.id }}, {{ store.address }}</label
                >
                <div class="d-radio__wrapper lk-staff-edit__operator-radio-wrapper">
                  <Checkbox
                    v-model="store.main_role"
                    :binary="true"
                    @change="changeStoresMains(store.id, store.main_role)"
                    value="false"
                  />
                  <label class="d-radio__label vendor-change__selected-item-radio-label">
                    Основной
                  </label>
                </div>
              </div>
              <div
                v-if="this.formRequirementsView.warehouse.shipments"
                class="d-radio__wrapper need-vendor__radio-wrapper dart-mt-1"
              >
                <Checkbox
                  v-model="this.formRequirementsView.warehouse.shipments.active"
                  :binary="true"
                  :inputId="'ship-' + formRequirementsView.warehouse"
                  :name="'ship-' + formRequirementsView.warehouse"
                  value="false"
                />
                <label
                  :for="'ship-' + formRequirementsView.warehouse"
                  class="d-radio__label need-vendor__radio-label dart-ml-1"
                  >Товары в пути</label
                >
              </div>
            </div>
          </div>
          <div class="d-col-24 text-center">
            <button
              :disabled="disabled"
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
  emits: ['closeWindow', 'clearItems'],
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
    offer: {
      type: Boolean,
      default: false,
    },
    no_av_items: {
      type: String,
      default: '',
    },
    createR: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      args: {},
      vendors: {},
      disabled: true,
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
      shipments: false,
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
      vendorOfferSelected: 'offer/vendorOfferSelected',
      reqCounts: 'requirements/reqCounts',
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
      getReqCounts: 'requirements/getReqCounts',
      getOptVendorsOfferSelected: 'offer/getOptVendorsOfferSelected',
    }),
    cancel() {
      this.$emit('closeWindow')
      this.$emit('clearItems')
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
              if (!this.offer) {
                this.$router.push({
                  name: 'purchasesCatalogRequirement',
                  params: { requirement_id: this.formRequirementsView.requirement.id + '_req' },
                  query: { timestamp: Date.now() },
                })
              } else {
                this.$router.push({
                  name: 'purchasesOfferCatalogRequirement',
                  params: { requirement_id: this.formRequirementsView.requirement.id + '_req' },
                  query: { timestamp: Date.now() },
                })
              }

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
        if (this.no_av_items != null || Object.keys(this.createR).length) {
          data.no_av_items = this.reqCounts.no_av_items
        }
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
            this.modals.requirement = true
            this.$emit('clearItems')
            this.formRequirements.name = ''
            this.formRequirements.file = ''
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
    changeStores(id, active) {
      if (active === true) {
        let count = this.formRequirementsView.warehouse.stores.length
        let flag = this.formRequirementsView.warehouse.stores.length
        for (var i in this.formRequirementsView.warehouse.stores) {
          if (this.formRequirementsView.warehouse.stores[i].active === true) {
            count--
          }
          if (this.formRequirementsView.warehouse.stores[i].main_role === false) {
            flag--
          }
        }
        for (var ii in this.formRequirementsView.warehouse.stores) {
          if (
            this.formRequirementsView.warehouse.stores[ii].id == id &&
            count == this.formRequirementsView.warehouse.stores.length - 1 &&
            flag == 0
          ) {
            this.formRequirementsView.warehouse.stores[ii].main_role = true
          }
        }
      } else {
        for (var iii in this.formRequirementsView.warehouse.stores) {
          if (this.formRequirementsView.warehouse.stores[iii].id == id) {
            this.formRequirementsView.warehouse.stores[iii].main_role = false
          }
        }
      }
      this.setEnabled()
    },
    changeStoresMains(id, active) {
      if (active === true) {
        for (var i in this.formRequirementsView.warehouse.stores) {
          if (this.formRequirementsView.warehouse.stores[i].id == id) {
            this.formRequirementsView.warehouse.stores[i].main_role = true
            this.formRequirementsView.warehouse.stores[i].active = true
            this.disabled = false
          } else {
            this.formRequirementsView.warehouse.stores[i].main_role = false
          }
        }
      }
      this.setEnabled()
    },
    setEnabled() {
      this.disabled = true
      for (var i in this.formRequirementsView.warehouse.stores) {
        if (
          this.formRequirementsView.warehouse.stores[i].active &&
          this.formRequirementsView.warehouse.stores[i].main_role
        ) {
          this.disabled = false
        }
      }
    },
  },
  watch: {
    requirementsModal: function (newVal) {
      if (newVal) this.modals.requirements = true
    },
    'modals.requirements': function (newVal) {
      if (!newVal) {
        this.$emit('closeWindow')
        this.$emit('clearItems')
      }
    },
    'modals.requirementsView': function (newVal) {
      if (newVal === true) {
        if (this.$route.matched[6] && this.$route.matched[6].name == 'WholesaleClientsOffer') {
          this.vendors = JSON.parse(JSON.stringify(this.vendorOfferSelected.items.filter(item => item.show == true)))
          for (var o in this.vendors) {
            this.vendors[o].stores = this.vendors[o].stores.filter((s) => s.target_id === '0')
          }
        } else {
          this.vendors = this.optVendorsSelected.items
        }
        for (var i in this.vendors) {
          for (var ii in this.vendors[i].stores) {
            this.vendors[i].stores[ii].active = false
            this.vendors[i].stores[ii].main_role = false
          }
        }
      }
    },
    'formRequirementsView.warehouse': function (newVal) {
      let id = newVal.id
      if (id in this.optVendorsSelected.shipments) {
        newVal.shipments = this.optVendorsSelected.shipments[id]
        newVal.shipments.active = false
      }
    },
    no_av_items: function (newVal) {
      if (newVal.length) {
        this.getReqCounts({ req: newVal }).then(() => (this.modals.createRequirement = true))
      } else {
        this.formRequirements.no_av_items = {}
      }
    },
    createR: function (newVal) {
      if (Object.keys(newVal).length) {
        let r_n = newVal.id + '_req'
        this.modals.requirementsView = true
        this.loading = true
        this.getReqCounts({ req: r_n }).then((res) => {
          if (res.data.success) {
            this.formRequirements.name = newVal.name + ' №' + newVal.id + ' / *Отсутствуют*'
            this.$load(async () => {
              let data = this.formRequirements
              data.no_av_items = this.reqCounts.no_av_items
              await this.setRequirement(data).then((response) => {
                if (response.data.success) {
                  this.$toast.add({
                    severity: 'success',
                    summary: 'Потребность успешно создана!',
                    detail: response.data.message,
                    life: 3000,
                  })
                  let new_req = response.data.data.requirement
                  new_req.warehouse = []

                  this.unsetRequirements()
                  this.getRequirements({
                    filter: '',
                    page: 1,
                    perpage: this.pagination_items_per_page,
                  }).then((res) => {
                    if (res.data.success) {
                      this.viewReq(new_req)
                      this.formRequirements.name = ''
                      this.formRequirements.file = ''

                      this.loading = false
                      this.$emit('clearItems')
                    } else {
                      this.$toast.add({
                        severity: 'error',
                        summary: 'Ошибка создания потребности',
                        detail: response.data.message,
                        life: 3000,
                      })
                      this.loading = false
                    }
                  })
                } else {
                  this.$toast.add({
                    severity: 'error',
                    summary: 'Ошибка создания потребности',
                    detail: response.data.message,
                    life: 3000,
                  })
                  this.loading = false
                }
              })
            })
          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: 'Не удалось найти недостающие товары!',
              life: 3000,
            })
            this.loading = false
          }
        })
      } else {
        this.formRequirements.no_av_items = {}
      }
    },
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    let all = {
      formRequirements: {
        name: {
          required: helpers.withMessage('Заполните наименование', required),
        },
        file: {
          required: helpers.withMessage('Файл обязателен для заполнения', required),
        },
      },
    }
    let name_only = {
      formRequirements: {
        name: {
          required: helpers.withMessage('Заполните наименование', required),
        },
      },
    }
    return this.$route.matched[5] &&
      this.$route.matched[5].name != 'WholesaleClientsOffer' &&
      (this.no_av_items.length || Object.keys(this.createR).length)
      ? name_only
      : all
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
.need__notice {
  border-radius: 16px;
  padding: 16px 24px;
  font-size: 16px;
  line-height: 21px;
  margin-top: 8px;
  margin-bottom: 40px;
}
.need-vendor__notice {
  background: #f2f2f2;
}
.dart-dropzone {
  border: 2px dashed #e2e2e2 !important;
  padding: 15px 15px;
  margin-top: 10px;
  border-radius: 6px;
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
      margin-top: 22px;
    }
    p {
      color: #a0a0a0;
      font-size: 14px;
      margin: 0;
      span {
        color: #f92c0d;
        text-decoration: underline;
      }
    }
  }
}
.need-modal-view {
  .p-select {
    border-radius: 20px;
    border: 1px solid #75757575;
    .p-select-label {
      padding: 11px 24px;

      font-weight: 400;
      font-size: 14px;
      line-height: 18px;

      color: #282828;
    }
    .p-select-label.p-placeholder {
      color: #757575;
    }
  }
  .p-checkbox-box {
    border-color: #757575;
  }
  .p-checkbox,
  .p-checkbox-input,
  .p-checkbox-box {
    width: 24px;
    min-width: 24px;
    height: 24px;
  }
  .p-checkbox-checked .p-checkbox-box {
    border-color: #f92c0d;
  }
  .need-vendor__radio-label.dart-ml-1 {
    min-width: 45%;
    width: 45%;
    max-width: 45%;
    font-size: 16px;
    line-height: 21px;
    margin-right: 48px;
  }
  .lk-staff-edit__operator-radio-wrapper {
    margin-bottom: 0px;
    .p-checkbox-box {
      border-radius: 20px;
    }
    .p-checkbox-checked .p-checkbox-box {
      border-color: #f92c0d;
      background-color: #fff;
      color: #f92c0d;
    }
    .p-checkbox-checked .p-checkbox-icon {
      color: transparent;
      background-color: #f92c0d;
      border-radius: 10px;
      width: 20px;
      height: 20px;
    }
    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
      background: #fff;
      border-color: var(--p-checkbox-checked-hover-border-color);
    }
    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
      color: #f92c0d;
    }
  }
}
@media (min-width: 1536px) and (max-width: 1920px) {
  .need-modal,
  .need-modal-create,
  .need-modal-view {
    .modal__title {
      font-size: 24px;
      line-height: 31px;
    }
  }
}
</style>
