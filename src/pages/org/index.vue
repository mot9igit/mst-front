<template>
  <section class="lk-about" id="lk-about">
    <!-- Верхушка страницы -->
    <Toast />
    <div class="d-top">
      <breadcrumbs />
    </div>

    <h1>О компании</h1>
    <div v-if="this.orgProfValues.verified == 0" class="warehouse-analysis__description">
      <p>
        Компания создана, но не подтверждена. Для подтверждения вашего статуса и личности, менеджер
        свяжется с компанией по ее публичным контактом в течение одного рабочего дня.
      </p>
    </div>
    <Loader v-if="loading" />
    <div v-else>
      <form @submit.prevent="editOrgProfData()">
        <div class="lk-about__info-container">
          <div class="lk-about__info" v-for="(field, index) in this.form.orgData" :key="index">
            <div class="lk-about__info-title-wrapper">
              <p class="lk-about__info-title-label">{{ field.label }}</p>
              <p class="lk-about__info-title-description">{{ field.placeholder }}</p>
            </div>
            <!--:class="{ error: vEditOrgData.editOrgValues[field.name].$errors.length }"

            :value="this.orgprofile[field.name]"-->
            <div v-if="field.type === 'input'" class="d-input--cont">
              <div
                class="d-input d-input--light lk-about__info-input"
                :class="{ error: vEditOrgData.editOrgValues[field.name].$errors.length }"
              >
                <input
                  type="text"
                  v-model="this.orgProfValues[field.name]"
                  :name="field.name"
                  class="d-input__field lk-about__info-input-field"
                />
              </div>
              <div
                class="d-input-error"
                v-for="(error, index) of vEditOrgData.editOrgValues[field.name].$errors"
                :key="index"
              >
                <i class="d-icon-warning d-input-error__icon"></i>
                <span class="d-input-error__text">
                  {{ error.$message }}
                </span>
              </div>
            </div>
            <div v-if="field.type === 'image'">
              <DropZone
                v-if="!this.orgprofile.image"
                class="lk-about__dropzone"
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
                  <div class="lk-about__dropzone-custom">
                    <i class="d-icon-upload-cloud d-input__icon"></i>
                    <b>Перетащите файл в эту область</b>
                    <p>Вы также можете загрузить файл, <span>нажав сюда</span></p>
                  </div>
                </template>
              </DropZone>
              <div class="lk-about__info-image-wrapper" v-else>
                <FileUpload
                  name="avatar[]"
                  url="/rest/file_upload.php?upload_org_avatar=avatar"
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
            <div class="lk-about__info-text-wrapper" v-if="field.type === 'text'">
              <p class="lk-about__info-text">{{ this.orgprofile[field.name] }}</p>
            </div>

            <router-link
              :to="{ name: 'OrgAdd' }"
              v-if="field.name == 'name'"
              type="button"
              class="d-button d-button-quaternary d-button--no-shadow lk-about__info-button"
            >
              <i class="d-icon-plus-flat lk-about__info-button-icon"></i>
              <span>Добавить компанию</span>
            </router-link>
          </div>
        </div>
        <div class="lk-about__submit-container">
          <button
            type="submit"
            href="#"
            class="d-button d-button-primary d-button-primary-small d-button--sm-shadow lk-about__submit-button"
          >
            Сохранить изменения
          </button>
        </div>
      </form>

      <div
        class="lk-about__block lk-about__block--requisites"
        v-for="(requisit, index) in orgprofile.requisites"
        :key="requisit.id"
      >
        <div class="lk-about__block-header">
          <div class="lk-about__block-header-title-wrapper">
            <p class="lk-about__block-header-title">Реквизиты</p>
            <p class="lk-about__block-header-title-description">
              Вы можете подать запрос на изменение или добавление реквизитов. Самостоятельно
              изменить их нельзя.
            </p>
          </div>
          <button
            class="d-button d-button-tertiary d-button-tertiary-small d-button--no-shadow lk-about__block-header-button"
            @click.prevent="showModals(index)"
          >
            Подать запрос
          </button>
        </div>

        <p class="lk-about__block-subtitle">Реквизиты {{ requisit.name }}</p>

        <div class="lk-about__block-table">
          <div class="lk-about__block-table-row">
            <div
              class="lk-about__block-table-col"
              v-for="(field, index_field) in this.form.requisit"
              :key="index + '_' + index_field"
            >
              <p class="lk-about__block-table-label">{{ field.label }}</p>
              <p class="lk-about__block-table-value">
                {{
                  requisit[field.name] != '' && requisit[field.name] != undefined
                    ? requisit[field.name]
                    : '-'
                }}
              </p>
            </div>
          </div>
        </div>

        <div class="d-radio__wrapper lk-about__block-radio-wrapper">
          <Checkbox
            v-model="requisit.marketplace"
            :inputId="marketplace + '_' + index"
            value="1"
            disabled
          />
          <label :for="marketplace + '_' + index"> Реквизиты для Маркетплейса </label>
        </div>
      </div>

      <div class="lk-about__flexend" v-if="requisitesShow === false">
        <button
          class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
          @click.prevent="requisitesShow = !requisitesShow"
        >
          <i class="d-icon-plus lk-about__block-header-button-icon"></i>
          Показать банковские реквизиты
        </button>
      </div>
      <div class="lk-about__block" v-else>
        <div class="lk-about__block-header">
          <div class="lk-about__block-header-title-wrapper">
            <p class="lk-about__block-header-title">Банковские реквизиты</p>
          </div>
          <button
            class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
            @click.prevent="requisitesShow = !requisitesShow"
          >
            <i class="d-icon-minus lk-about__block-header-button-icon"></i>
            Скрыть банковские реквизиты
          </button>
        </div>
        <div v-for="requisit in orgprofile.requisites" :key="requisit.id">
          <div class="lk-about__block-table" v-for="(bank, index) in requisit.banks" :key="index">
            <div class="lk-about__block-table-row">
              <div
                class="lk-about__block-table-col"
                v-for="(field, index_field) in this.form.bank"
                :key="index + '_' + index_field"
              >
                <p class="lk-about__block-table-label">{{ field.label }}</p>
                <p class="lk-about__block-table-value">
                  {{
                    bank[field.name] != '' && bank[field.name] != undefined ? bank[field.name] : '-'
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <teleport to="body">
      <customModal v-model="this.modalRequisites" class="lk-about-form__modal">
        <div class="lk-about-info__value-container-modal">
          <form
            class="lk-about-info__value-container-modal"
            @submit.prevent="addRequisit"
            v-if="newReqModalForm"
          >
            <div class="lk-about-top-modal">
              <h3>Запрос на добавление реквизитов</h3>
              <button
                class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
                @click.prevent="((newReqModalForm = false), (editReqModalForm = true))"
              >
                <i class="d-icon-pen2 lk-about__block-header-button-icon"></i>
                Редактировать реквизиты
              </button>
            </div>

            <div
              class="lk-about__block lk-about__block--requisites lk-about-info__value-container-modal lk-about-info__value-container-modal-grid"
            >
              <div class="lk-about__block-table">
                <div class="lk-about__block-table-row">
                  <div
                    class="lk-about__block-table-col"
                    v-for="(field, index_field) in this.form.requisit"
                    :key="index + '_' + index_field"
                    :name="field.name"
                    :class="{ error: vAddRequisites.newRequisit[field.name].$errors.length }"
                  >
                    <p class="lk-about__block-table-label">{{ field.label }}</p>
                    <input
                      type="text"
                      class="dart-form-control d-input__field lk-about__info-input-field"
                      :name="field.name"
                      :placeholder="field.placeholder"
                      v-model="this.newRequisit[field.name]"
                    />
                    <div
                      class="d-input-error"
                      v-for="(error, index) of vAddRequisites.newRequisit[field.name].$errors"
                      :key="index"
                    >
                      <i class="d-icon-warning d-input-error__icon"></i>
                      <span class="d-input-error__text">
                        {{ error.$message }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-radio__wrapper lk-about__block-radio-wrapper">
                <label for="new-requisit-marketplace" class="d-radio lk-about__block-radio">
                  <Checkbox
                    v-model="this.newRequisit.marketplace"
                    inputId="new-requisit-marketplace"
                    name="new-requisit-marketplace"
                    value="1"
                  />
                </label>

                <label
                  for="new-requisit-marketplace"
                  class="d-radio__label lk-about__block-radio-label"
                  >Реквизиты для маркетплейса
                </label>
              </div>
            </div>

            <div
              class="lk-about__block lk-about-info__value-container-modal-grid"
              v-if="addRequisitShow"
            >
              <div
                v-for="(bank, index_req) in this.newRequisit.banks"
                :key="index_req"
                class="lk-about__block-table-modal"
              >
                <div class="lk-about__block-table lk-about__block-table-modal-bank">
                  <div
                    class="lk-about__block-table lk-about__block-table-modal-bank lk-about__block-table-modal-bank-del"
                  >
                    <h4>Банковские реквизиты ({{ index_req + 1 }})</h4>
                    <div class="lk-about__block-delete">
                      <button
                        class="lk-about__card-action"
                        @click.prevent="deleteBankRequisit(index_req)"
                      >
                        <i class="d-icon-trash"></i>
                      </button>
                    </div>
                  </div>
                  <div class="lk-about__block-table-row">
                    <div
                      class="lk-about__block-table-col"
                      v-for="(field, index_field) in this.form.bank"
                      :key="index_req + '_' + index_field"
                      :class="{
                        error:
                          vAddRequisites.newRequisit.banks.$each.$response.$errors?.[index_req]?.[
                            field.name
                          ].length,
                      }"
                    >
                      <p class="lk-about__block-table-label">{{ field.label }}</p>
                      <input
                        v-model="bank[field.name]"
                        class="dart-form-control"
                        :name="field.name"
                        :placeholder="field.placeholder"
                        type="text"
                      />
                      <div
                        class="d-input-error"
                        v-for="(error, index) of vAddRequisites.newRequisit.banks.$each.$response
                          .$errors?.[index_req]?.[field.name]"
                        :key="index"
                      >
                        <i class="d-icon-warning d-input-error__icon"></i>
                        <span class="d-input-error__text">
                          {{ error.$message }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lk-about__flexend">
              <button
                class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
                @click.prevent="addBankRequisit()"
              >
                <i class="d-icon-plus lk-about__block-header-button-icon"></i>
                Банковские реквизиты
              </button>
            </div>
            <div class="lk-about__flexcenter">
              <button
                type="submit"
                href="#"
                class="d-button d-button-primary d-button-primary-small d-button--sm-shadow lk-about-info__button"
              >
                Отправить запрос
              </button>
            </div>
          </form>

          <form
            class="lk-about-info__value-container-modal"
            @submit.prevent="editRequisit"
            v-if="editReqModalForm"
          >
            <div class="lk-about-top-modal">
              <h3>Запрос на редактирование реквизитов</h3>
              <button
                class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
                @click.prevent="((newReqModalForm = true), (editReqModalForm = false))"
              >
                <i class="d-icon-plus lk-about__block-header-button-icon"></i>
                Добавить реквизиты
              </button>
            </div>

            <div
              class="lk-about__block lk-about__block--requisites lk-about-info__value-container-modal"
            >
              <div class="lk-about__block-table">
                <div class="lk-about__block-table-row">
                  <div
                    class="lk-about__block-table-col"
                    v-for="(field, index) in form.requisit"
                    :key="index"
                    :class="{
                      error:
                        vEditRequisites.orgProfValues.requisites.$each.$response.$errors[
                          this.requisitEditIndex
                        ]?.[field.name]?.length,
                    }"
                  >
                    <p class="lk-about__block-table-label">{{ field.label }}</p>
                    <input
                      type="text"
                      class="dart-form-control d-input__field lk-about__info-input-field"
                      v-model="this.orgProfValues.requisites[this.requisitEditIndex][field.name]"
                      :name="field.name"
                      :placeholder="field.placeholder"
                    />
                    <div
                      class="d-input-error"
                      v-for="(error, index) of vEditRequisites.orgProfValues.requisites.$each
                        .$response.$errors[this.requisitEditIndex]?.[field.name]"
                      :key="index"
                    >
                      <i class="d-icon-warning d-input-error__icon"></i>
                      <span class="d-input-error__text">
                        {{ error.$message }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-radio__wrapper lk-about__block-radio-wrapper">
                <label for="edit-requisit-marketplace" class="d-radio lk-about__block-radio">
                  <Checkbox
                    v-model="this.orgProfValues.requisites[this.requisitEditIndex].marketplace"
                    inputId="edit-requisit-marketplace"
                    name="edit-requisit-marketplace"
                    value="1"
                  />
                </label>
                <label
                  for="edit-requisit-marketplace"
                  class="d-radio__label lk-about__block-radio-label"
                  >Реквизиты для маркетплейса
                </label>
              </div>
            </div>

            <div class="lk-about__block">
              <div
                v-for="(bank, index_req) in this.orgProfValues.requisites[this.requisitEditIndex]
                  .banks"
                :key="index_req"
                class="lk-about__block-table-modal"
              >
                <div class="lk-about__block-table lk-about__block-table-modal-bank">
                  <div
                    class="lk-about__block-table lk-about__block-table-modal-bank lk-about__block-table-modal-bank-del"
                  >
                    <h4>Банковские реквизиты ({{ index_req + 1 }})</h4>
                    <div class="lk-about__block-delete">
                      <button
                        class="lk-about__card-action"
                        @click.prevent="deleteBankRequisitEdit(index_req)"
                      >
                        <i class="d-icon-trash"></i>
                      </button>
                    </div>
                  </div>
                  <div class="lk-about__block-table-row">
                    <div
                      class="lk-about__block-table-col"
                      v-for="(field, index_field) in this.form.bank"
                      :key="index_req + '_' + index_field"
                      :class="{
                        error:
                          vEditRequisites.orgProfValues.requisites.$each.$response.$errors[
                            this.requisitEditIndex
                          ]?.banks[this.requisitEditIndex]?.$response.$errors[index_req][field.name]
                            ?.length,
                      }"
                    >
                      <p class="lk-about__block-table-label">{{ field.label }}</p>
                      <input
                        v-model="bank[field.name]"
                        class="dart-form-control"
                        :name="field.name"
                        :placeholder="field.placeholder"
                        type="text"
                      />
                      <div
                        class="d-input-error"
                        v-for="(error, index) of vEditRequisites.orgProfValues.requisites.$each
                          .$response.$errors[this.requisitEditIndex]?.banks[this.requisitEditIndex]
                          ?.$response.$errors[index_req][field.name]"
                        :key="index"
                      >
                        <i class="d-icon-warning d-input-error__icon"></i>
                        <span class="d-input-error__text">
                          {{ error.$message }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="lk-about__flexend">
              <button
                class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
                @click.prevent="addBankRequisitEdit()"
              >
                <i class="d-icon-plus lk-about__block-header-button-icon"></i>
                Банковские реквизиты
              </button>
            </div>
            <div class="lk-about__flexcenter">
              <button
                type="submit"
                href="#"
                class="d-button d-button-primary d-button-primary-small d-button--sm-shadow lk-about-info__button"
              >
                Отправить запрос
              </button>
            </div>
          </form>

          <div class="lk-about-info__value-container-modal success-modal" v-if="successMessage">
            <h2>{{ successMessageText }}</h2>
            <button
              type="button"
              href="#"
              class="d-button d-button-primary d-button-primary-small d-button--sm-shadow lk-about-info__button"
              @click.prevent="this.modalRequisites = false"
            >
              Ок
            </button>
          </div>
        </div>
      </customModal>
    </teleport>

    <!--  <teleport to="body">
    <customModal v-model="this.modalAddCompany" class="lk-about-form__modal">
      <div class="lk-about-info__value-container">
        <h2>Добавить компанию</h2>
        <form class="lk-about-form__modal"  @submit.prevent="">
        <button
						type="submit"
						href="#"
						class="d-button d-button-primary d-button-primary-small d-button--sm-shadow lk-about-info__button"
				>
          Добавить
        </button>
      </form>
			</div>
    </customModal>
    </teleport>-->
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'
import { helpers, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import Toast from 'primevue/toast'
import customModal from '@/shared/ui/Modal.vue'
import { ref } from 'vue'
import Checkbox from 'primevue/checkbox'
import DropZone from 'dropzone-vue'
import FileUpload from 'primevue/fileupload'

export default {
  name: 'ProfileMain',
  components: { Breadcrumbs, Loader, Toast, customModal, Checkbox, DropZone, FileUpload },
  data() {
    return {
      loading: false,
      showSaveButton: false,
      requisitesShow: true,
      modalRequisites: false,
      modalAddCompany: false,
      addRequisitShow: false,
      newReqModalForm: false,
      editReqModalForm: true,
      successMessage: false,
      orgProfTmp: {},
      editOrgValues: {},
      successMessageText: '',
      requisitEditIndex: 0,
      form: {
        orgData: [
          {
            name: 'name',
            label: 'Название компании',
            placeholder: 'Отображается для покупателей',
            type: 'input',
          },
          {
            name: 'image',
            label: 'Логотип компании',
            placeholder: 'Отображается для покупателей',
            type: 'image',
          },
          {
            name: 'code',
            label: 'Код поставщика',
            placeholder:
              'Данный код необходим вашим клиентам для подключения к вашему каталогу в МС: Управление продажами и закупками',
            type: 'text',
          },
          {
            name: 'phone',
            label: 'Телефон компании',
            placeholder: 'Отображается для покупателей',
            type: 'input',
          },
          {
            name: 'email',
            label: 'Email компании',
            placeholder: 'Отображается для покупателей',
            type: 'input',
          },
        ],
        bank: [
          {
            name: 'bank_bik',
            label: 'БИК',
            placeholder: '12345678',
            type: 'text',
            readonly: 1,
          },
          {
            name: 'bank_name',
            label: 'Банк',
            placeholder: 'ПАО "Сбербанк"',
            type: 'text',
            readonly: 1,
          },
          {
            name: 'bank_number',
            label: 'Расчетный счет',
            placeholder: '7785612544545',
            type: 'text',
            readonly: 1,
          },
          {
            name: 'bank_knumber',
            label: 'Корреспондентский счет',
            placeholder: '7785612544545',
            type: 'text',
            readonly: 1,
          },
        ],
        requisit: [
          {
            name: 'name',
            label: 'Наименования юридического лица',
            placeholder: 'ООО "Магазин"',
            type: 'text',
            readonly: 1,
          },
          {
            name: 'inn',
            label: 'ИНН',
            placeholder: '77856974123',
            type: 'text',
            readonly: 1,
          },
          {
            name: 'ogrn',
            label: 'ОГРН',
            placeholder: '77856974123',
            type: 'text',
            readonly: 1,
          },
          {
            name: 'kpp',
            label: 'КПП',
            placeholder: '77856974123',
            type: 'text',
            readonly: 1,
          },
          {
            name: 'ur_address',
            label: 'Адрес',
            placeholder: 'г. Москва, Большая Никитская улица, 10',
            type: 'text',
            readonly: 1,
          },
          {
            name: 'fact_address',
            label: 'Фактический адрес',
            placeholder: 'г. Москва, Большая Никитская улица, 10',
            type: 'text',
            readonly: 1,
          },
        ],
      },
    }
  },
  mounted() {
    this.getOrgProfile()
  },
  setup() {
    const addRequisitesRules = {
      newRequisit: {
        name: {
          required: helpers.withMessage('Заполните наименование юр. лица', required),
        },
        inn: {
          pattern: helpers.withMessage('ИНН должен содержать 10 или 12 цифр', (value) =>
            /^[0-9]{10}$|^[0-9]{12}$/.test(value),
          ),
        },
        ogrn: {
          pattern: helpers.withMessage('ОГРН должен содержать 13 цифр', (value) =>
            /^[0-9]{13}$/.test(value),
          ),
        },
        kpp: {
          pattern: helpers.withMessage('КПП должен содержать 9 цифр', (value) =>
            /^[0-9]{9}$/.test(value),
          ),
        },
        ur_address: {
          required: helpers.withMessage('Заполните юридический адрес', required),
        },
        fact_address: {
          required: helpers.withMessage('Заполните фактический адрес', required),
        },
        banks: {
          $each: helpers.forEach({
            bank_bik: {
              pattern: helpers.withMessage('БИК должен содержать 9 цифр', (value) =>
                /^[0-9]{9}$/.test(value),
              ),
            },
            bank_name: {
              required: helpers.withMessage('Заполните название банка', required),
            },
            bank_number: {
              pattern: helpers.withMessage('Расчетный счет должен содержать 20 цифр', (value) =>
                /^[0-9]{20}$/.test(value),
              ),
            },
            bank_knumber: {
              pattern: helpers.withMessage('К/С должен содержать 20 цифр', (value) =>
                /^[0-9]{20}$/.test(value),
              ),
            },
          }),
        },
      },
    }

    const editRequisitesRules = {
      orgProfValues: {
        requisites: {
          $each: helpers.forEach({
            name: {
              required: helpers.withMessage('Заполните наименование юр. лица', required),
            },
            inn: {
              pattern: helpers.withMessage('ИНН должен содержать 10 или 12 цифр', (value) =>
                /^[0-9]{10}$|^[0-9]{12}$/.test(value),
              ),
            },
            ogrn: {
              pattern: helpers.withMessage('ОГРН должен содержать 13 цифр', (value) =>
                /^[0-9]{13}$/.test(value),
              ),
            },
            kpp: {
              pattern: helpers.withMessage('КПП должен содержать 9 цифр', (value) =>
                /^[0-9]{9}$/.test(value),
              ),
            },
            ur_address: {
              required: helpers.withMessage('Заполните юридический адрес', required),
            },
            fact_address: {
              required: helpers.withMessage('Заполните фактический адрес', required),
            },
            banks: {
              $each: helpers.forEach({
                bank_bik: {
                  pattern: helpers.withMessage('БИК должен содержать 9 цифр', (value) =>
                    /^[0-9]{9}$/.test(value),
                  ),
                },
                bank_name: {
                  required: helpers.withMessage('Заполните название банка', required),
                },
                bank_number: {
                  pattern: helpers.withMessage('Расчетный счет должен содержать 20 цифр', (value) =>
                    /^[0-9]{20}$/.test(value),
                  ),
                },
                bank_knumber: {
                  pattern: helpers.withMessage('К/С должен содержать 20 цифр', (value) =>
                    /^[0-9]{20}$/.test(value),
                  ),
                },
              }),
            },
          }),
        },
      },
    }

    const editOrgRules = {
      editOrgValues: {
        name: {
          required: helpers.withMessage('Заполните наименование организации', required),
        },
        phone: {
          pattern: helpers.withMessage('Введите корректный номер телефона', (value) =>
            /(?:\+|\d)[\d\-() ]{9,}\d/g.test(value),
          ),
        },
        email: {
          pattern: helpers.withMessage('Введите корректный email', (value) =>
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
          ),
        },
      },
    }

    const newRequisit = ref({
      name: '',
      inn: '',
      ogrn: '',
      kpp: '',
      ur_address: '',
      fact_address: '',
      marketplace: [],
      banks: [],
    })

    const addRequisitesData = ref({
      newRequisit: newRequisit,
    })

    const orgProfValues = ref([])

    const editRequisitesData = ref({
      orgProfValues: orgProfValues,
    })

    const editOrgValues = ref({})

    const editOrgData = ref({
      editOrgValues: editOrgValues,
    })

    const vAddRequisites = useVuelidate(addRequisitesRules, addRequisitesData)
    const vEditRequisites = useVuelidate(editRequisitesRules, editRequisitesData)
    const vEditOrgData = useVuelidate(editOrgRules, editOrgData)

    return {
      vAddRequisites,
      vEditRequisites,
      vEditOrgData,
      newRequisit,
      orgProfValues,
      editOrgValues,
    }
  },
  methods: {
    ...mapActions({
      getOrgProfile: 'org/getOrgProfile',
      editOrgProfile: 'org/editOrgProfile',
    }),
    showModals(index) {
      if (this.modalRequisites === false && this.successMessage === true) {
        this.successMessage = false
        this.editReqModalForm = true
      }
      ;(this.modalRequisites = true), (this.requisitEditIndex = index)
    },
    onUpload(data) {
      if (data.xhr.response) {
        const response = JSON.parse(data.xhr.response)
        if (Object.prototype.hasOwnProperty.call(response.data, 'files')) {
          if (response.data.files[0].type === 'avatar') {
            console.log('avatar')
            this.editOrgValues.image = response.data.files[0]
            this.editOrgValues.upload_image = true
          }
        }
      }
      this.$toast.add({
        severity: 'info',
        summary: 'Логотип успешно загружен!',
        detail: 'Не забудте сохранить изменения',
        life: 3000,
      })
    },
    parseFile(files, xhr) {
      const callback = (e) => {
        const res = JSON.parse(e)
        if (res.success) {
          if (res.data.files[0].type === 'avatar') {
            console.log('avatar')
            this.editOrgValues.image = res.data.files[0]
            this.editOrgValues.upload_image = true
          }
        }
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          callback(xhr.response)
        }
      }
    },
    addBankRequisit() {
      this.addRequisitShow = true
      this.newRequisit.banks.push({
        bank_bik: '',
        bank_name: '',
        bank_number: '',
        bank_knumber: '',
      })
    },
    addBankRequisitEdit() {
      this.addRequisitShow = true
      this.orgProfValues.requisites[this.requisitEditIndex].banks.push({
        bank_bik: '',
        bank_name: '',
        bank_number: '',
        bank_knumber: '',
      })
    },

    deleteBankRequisit(index) {
      const array = Array.from(this.newRequisit.banks)
      delete array[index]
      const newArray = []
      for (let i = 0; i < array.length; i++) {
        if (array[i]) {
          newArray.push(array[i])
        }
      }
      this.newRequisit.banks = newArray
    },
    deleteBankRequisitEdit(index) {
      const array = Array.from(this.orgProfValues.requisites[this.requisitEditIndex].banks)
      delete array[index]
      const newArray = []
      for (let i = 0; i < array.length; i++) {
        if (array[i]) {
          newArray.push(array[i])
        }
      }
      this.orgProfValues.requisites[this.requisitEditIndex].banks = newArray
    },
    async editRequisit() {
      const validationResult = await this.vEditRequisites.$validate()
      console.log('Validation result', validationResult)
      if (!validationResult) {
        return
      }

      const data = this.orgProfValues.requisites[this.requisitEditIndex]
      data.org_name = this.orgprofile.name
      if (data.marketplace.length > 0 && data.marketplace !== false) {
        data.marketplace = true
      } else {
        data.marketplace = false
      }
      await this.editOrgProfile({
        data: data,
      }).then((res) => {
        if (res.data.data.status) {
          this.editReqModalForm = false
          this.successMessage = true
          this.successMessageText =
            'Заявка на изменение реквизитов успешно отправлена! Менеджер свяжется с вами в ближайшее время!'
          this.getOrgProfile()
        }
        this.$toast.add({
          severity: 'info',
          summary: 'Заявка успешно отправлена!',
          detail: res.data.message,
          life: 3000,
        })
      })
    },

    async editOrgProfData() {
      const validationResult = await this.vEditOrgData.$validate()
      console.log('Validation result', validationResult)
      if (!validationResult) {
        return
      }

      const data = {
        name: this.editOrgValues.name,
        email: this.editOrgValues.email,
        phone: this.editOrgValues.phone,
        image: this.editOrgValues.image,
      }
      data.org_name = this.orgprofile.name
      await this.editOrgProfile({
        data: data,
      }).then((res) => {
        if (res.data.data.status) {
          this.modalRequisites = true
          this.editReqModalForm = false
          this.newReqModalForm = false
          this.successMessage = true
          this.successMessageText =
            'Заявка на изменение данных организации успешно отправлена! Менеджер свяжется с вами в ближайшее время!'
          this.getOrgProfile()
        }
        this.$toast.add({
          severity: 'info',
          summary: 'Заявка успешно отправлена!',
          detail: res.data.message,
          life: 3000,
        })
      })
    },

    async addRequisit() {
      const validationResult = await this.vAddRequisites.$validate()
      console.log('Validation result', validationResult)
      if (!validationResult) {
        return
      }

      const data = this.newRequisit
      data.org_name = this.orgprofile.name
      if (data.marketplace.length > 0) {
        data.marketplace = true
      } else {
        data.marketplace = false
      }
      await this.editOrgProfile({
        data: data,
      }).then((res) => {
        if (res.data.data.status) {
          this.newReqModalForm = false
          this.successMessage = true
          this.successMessageText =
            'Заявка на добавление реквизитов успешно отправлена! Менеджер свяжется с вами в ближайшее время!'
          this.newRequisit = {
            name: '',
            inn: '',
            ogrn: '',
            kpp: '',
            ur_address: '',
            fact_address: '',
            marketplace: [],
            banks: [],
          }
        }
        this.$toast.add({
          severity: 'info',
          summary: 'Заявка успешно отправлена!',
          detail: res.data.message,
          life: 3000,
        })
      })
    },
    saveProfile() {
      //	this.getOrgProfile({
      //		action: "set/org/profile",
      //		id: router.currentRoute._value.params.id,
      //		data: {
      //			managers: this.managers,
      //			image: this.orgProfValues.image,
      //			upload_image: this.orgProfValues.upload_image,
      //		},
      //	}).then((res) => {
      //		this.$toast.add({
      //			severity: "info",
      //			summary: "Сохранено!",
      //			detail: res.data.data.message,
      //			life: 3000,
      //		});
      //	});
    },
  },
  computed: {
    ...mapGetters({
      orgprofile: 'org/orgprofile',
    }),
  },
  watch: {
    orgprofile: function (newVal) {
      this.orgProfTmp = newVal
      this.orgProfValues = this.orgProfTmp
      this.editOrgValues = this.orgProfTmp
    },
  },
}
</script>

<style lang="scss">
.lk-about h1 {
  margin-bottom: 40px;
}
.lk-about__block {
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
}
.modal__content .lk-about__block {
  box-shadow: none;
}
.lk-about__submit-container {
  display: flex;
  justify-content: end;
  margin-bottom: 60px;
}
.lk-about__submit-button {
  font-size: 16px;
  padding: 8px 28px;
  height: 40px;
}
.lk-about__info-input:after {
  content: '\e031';
  font-family: 'Iconly';
  position: relative;
  display: block;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 9px;
  font-size: 18px;
}
.lk-about__info {
  border-bottom: 0.5px solid #75757575;
}
.lk-about__info-image-wrapper .p-fileupload,
.lk-about__info .dropzone__item-thumbnail img {
  width: 70px;
  height: 70px;
  min-width: 70px;
  min-height: 70px;
  object-fit: cover;
  display: block;
  cursor: pointer;
  background-color: transparent;
  border: none;
  transition: all 0.2s ease;
  border-radius: 35px;
}
.lk-about__info-image-wrapper .p-fileupload-header img {
  height: 70px;
  width: 70px;
  min-width: 70px;
  min-height: 70px;
  object-fit: cover;
  transition: all 0.2s ease;
  border-radius: 35px;
}
.lk-about__info-image-wrapper .p-fileupload-file {
  padding: 0;
}
.lk-about__info-image-wrapper .p-fileupload-file-info,
.lk-about__info-image-wrapper .p-badge-success,
.lk-about__info-image-wrapper .p-fileupload-file-actions {
  display: none;
}
.lk-about__info-image-wrapper .p-fileupload .p-fileupload-header {
  padding: 0 0 0 0;
}
.lk-about__info-image-wrapper .p-fileupload .p-fileupload-header {
  height: 70px;
}
.lk-about__info-image-wrapper .p-fileupload .p-fileupload-header img {
  height: 70px;
  width: 70px;
  object-fit: cover;
}
.lk-about__info-image-wrapper .p-fileupload .p-fileupload-header:hover i {
  opacity: 1;
}
.lk-about__info-image-wrapper .p-fileupload .p-fileupload-header i {
  opacity: 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
  left: -85px;
  background-color: #fafafadb;
  min-width: 80px;
  width: 80px;
  height: 80px;
  font-size: 18px;
  transition: all 0.2s ease;
}
.lk-about__info-image-wrapper .p-fileupload-file-list {
  display: none;
}
.lk-about__flexend {
  display: flex;
  justify-content: end;
  padding: 24px;
}
.lk-about__flexcenter {
  display: flex;
  justify-content: center;
  padding: 0px 24px 0 24px;
  margin-top: -34px;
}
.lk-about__block-table-row {
  display: block;
  border: none;
}
.lk-about__block-table-col {
  width: 50%;
  float: left;
  border-bottom: 0.5px solid #75757575;
  padding: 24px 20px 24px 0;
}
.lk-about__block-table-col:nth-last-child(2),
.lk-about__block-table-col:last-child {
  border-bottom: none;
}
.lk-about__block-table-row {
  border-bottom: 0.5px solid #75757575;
}
.lk-about-info__value-container-modal .lk-about__info-input-field,
.lk-about-info__value-container-modal .lk-about__info-input-field:focus,
.lk-about__block-table-modal-bank .dart-form-control,
.lk-about__block-table-modal-bank .dart-form-control:focus {
  background-color: transparent;
  color: #282828;
  padding: 11px;
  padding-right: 0;
  width: 100%;
  height: 43px;
  border: 1px solid #757575;
  display: block;
  float: none;
}
.lk-about-info__value-container-modal .lk-about__block-table-row,
.lk-about-info__value-container-modal .lk-about__block-table-col {
  border: none;
  border-bottom: none;
}
.lk-about-info__value-container-modal .lk-about__block-table-col {
  width: calc(50% - 20px);
  padding-bottom: 0px;
}

.lk-about-info__value-container-modal .lk-about__block-table-col:nth-child(even) {
  margin-left: 28px;
}

.lk-about-info__value-container-modal .lk-about__block {
  padding-top: 0;
  background-color: transparent;
  display: flex;
}
.lk-about-info__value-container-modal .d-button-primary-small {
  font-size: 16px;
}
.lk-about-info__value-container-modal .lk-about__block-table-modal {
  width: 100%;
  margin-top: 0px;
}
.lk-about__block-delete {
  padding-top: 0px;
  margin-right: 5px;
}
.lk-about-top-modal {
  display: flex;
  justify-content: space-between;
  margin: 16px 16px 16px 0;
  width: 100%;
}
.lk-about-top-modal .lk-about__block-header-button--hide {
  font-size: 16px;
  margin-right: 20px;
}
.lk-about-info__value-container-modal .lk-about__block-table-col {
  gap: 8px;
}
.lk-about-info__value-container-modal .lk-about__block-table,
.lk-about-info__value-container-modal .lk-about__block--requisites {
  margin-bottom: 0px;
}
.lk-about-info__value-container-modal .lk-about__flexend {
  padding: 0 24px;
}
.lk-about__block-table-modal-bank-del {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-right: 25px;
}
.lk-about__block-table-modal .lk-about__block-table {
  gap: 0;
}
.lk-about-info__value-container-modal-grid .lk-about__block-table-col {
  min-height: 95px;
  padding-top: 0;
}
.lk-about-info__value-container-modal-grid .lk-about__block-table-col .d-input-error {
  margin-top: -5px;
}
.success-modal {
  padding: 100px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 50px;
}
.success-modal h2 {
  text-align: center;
  font-size: 28px;
}
.d-input--cont {
  width: 100%;
}
.lk-about__dropzone-custom {
  min-width: 400px;
  height: 90px;
  background-color: #ffffffb0;
  border: 0.5px dashed #75757575;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  flex-direction: column;
  gap: 5px;
}
.lk-about__dropzone-custom .d-input__icon {
  font-size: 22px;
  color: #75757575;
}
.lk-about__dropzone-custom b {
  font-size: 14px;
}
.lk-about__dropzone-custom p {
  font-size: 12px;
  color: #757575;
}
.lk-about__dropzone-custom p span {
  font-size: 12px;
  color: #f92c0d;
  cursor: pointer;
  text-decoration: underline;
}
.lk-about__info .dropzone__item.dropzone--has-thumbnail {
  max-height: 90px;
  display: flex;
  flex-direction: column;
}
.lk-about__info .dropzone__item-thumbnail {
  max-height: 90px;
}
.lk-about__info .dropzone__item-controls,
.lk-about__info .dropzone__progress,
.lk-about__info .dropzone__success-mark,
.lk-about__info .dropzone__details {
  display: none;
}
.lk-about__block-header-button {
  white-space: nowrap;
}
@media (width <=1280px) {
  .lk-about__info-title-label,
  .lk-about__block-subtitle,
  .lk-about__block-header-title,
  .lk-about h1,
  .lk-about-top-modal h3 {
    font-size: 14px;
  }
  .lk-about__info-title-description,
  .lk-about__info-input,
  .lk-about__info-text,
  .lk-about__block-header-title-description {
    font-size: 12px;
  }
  .lk-about__block-header-button,
  .lk-about__info-button,
  .lk-about__block-header-button,
  .lk-about__submit-button,
  .lk-about__block-header-button--hide.lk-about-info__button {
    font-size: 14px;
    padding: 8px 29px;
    height: 34px;
  }
  .lk-about-info__value-container-modal .lk-about__info-input-field,
  .lk-about-info__value-container-modal .lk-about__info-input-field:focus,
  .lk-about__block-table-modal-bank .dart-form-control,
  .lk-about__block-table-modal-bank .dart-form-control:focus {
    height: 34px;
    font-size: 12px;
  }
  .lk-about-info__value-container-modal-grid .lk-about__block-table-col {
    min-height: 80px;
  }
}
@media (width <=1024px) {
  .lk-about__block-table-col {
    min-height: 130px;
  }
  .lk-about__info-title-wrapper {
    width: 220px;
  }
  .lk-about-form__modal .lk-about__block-table-col {
    padding: 8px 20px 8px 0;
  }
  .lk-about-form__modal .lk-about__block-table-col {
    min-height: auto;
  }
}
@media (width <=800px) {
  .lk-about__info-title-label,
  .lk-about__block-subtitle,
  .lk-about__block-header-title,
  .lk-about h1,
  .lk-about-top-modal h3,
  .lk-about__block-header-button-icon {
    font-size: 10px;
  }
  .lk-about__info-title-description,
  .lk-about__info-input,
  .lk-about__info-text,
  .lk-about__block-header-title-description,
  .lk-about__block-table-label,
  .lk-about__block-table-value,
  .lk-about__block-radio-label {
    font-size: 9px;
  }
  .lk-about__block-header-button,
  .lk-about__info-button,
  .lk-about__block-header-button,
  .lk-about__submit-button,
  .lk-about__block-header-button--hide,
  .lk-about-info__button {
    font-size: 10px;
    padding: 5.5px 18.5px;
    height: 24px;
  }
  .lk-about__flexcenter {
    margin-top: -25px;
  }
  .lk-about-info__value-container-modal .lk-about__info-input-field,
  .lk-about-info__value-container-modal .lk-about__info-input-field:focus,
  .lk-about__block-table-modal-bank .dart-form-control,
  .lk-about__block-table-modal-bank .dart-form-control:focus {
    height: 24px;
    font-size: 9px;
  }
  .lk-about-info__value-container-modal-grid .lk-about__block-table-col {
    min-height: 65px;
  }
  .lk-about-form__modal .d-input-error__text {
    font-size: 9px;
  }
  .lk-about__info-container .d-input {
    width: auto;
  }
  .lk-about__info {
    gap: 19px;
  }
  .lk-about__info-title-wrapper {
    width: 150px;
  }
  .lk-about__block-table-col {
    min-height: auto;
    padding: 8px 10px 8px 0;
  }
  .lk-about__block-table-row {
    padding-bottom: 8px;
  }
  .lk-about__block-table-col {
    padding: 8px 20px 8px 0;
  }
}
@media (width <=600px) {
  .lk-about {
    padding-top: 110px;
  }
  .lk-about__info-title-label,
  .lk-about__block-subtitle,
  .lk-about__block-header-title,
  .lk-about h1,
  .lk-about-top-modal h3 {
    font-size: 14px;
  }
  .lk-about__info-title-description,
  .lk-about__info-input,
  .lk-about__info-text,
  .lk-about__block-header-title-description,
  .lk-about__block-table-label,
  .lk-about__block-table-value,
  .lk-about__block-radio-label,
  .lk-about-info__value-container-modal .lk-about__info-input-field,
  .lk-about-info__value-container-modal .lk-about__info-input-field:focus,
  .lk-about__block-table-modal-bank .dart-form-control,
  .lk-about__block-table-modal-bank .dart-form-control:focus {
    font-size: 12px;
  }
  .lk-about__block-header-button,
  .lk-about__info-button,
  .lk-about__block-header-button,
  .lk-about__submit-button,
  .lk-about__block-header-button--hide {
    font-size: 14px;
    padding: 7px 20px;
    height: 32px;
    width: 100%;
  }
  .lk-about__info {
    flex-direction: column;
  }
  .lk-about__info-title-wrapper {
    width: 100%;
  }
  .lk-about__info-input:after {
    font-size: 14px;
  }
  .lk-about__info-input .d-input__field,
  .lk-about__info-input {
    height: 40px;
  }
  .lk-about__info {
    gap: 16px;
  }
  .lk-about__info {
    padding-bottom: 16px;
  }
  .lk-about__info-container {
    gap: 16px;
  }
  .lk-about__info-image-wrapper {
    display: flex;
    justify-content: center;
  }
  .lk-about__block {
    width: calc(44px + 100% + 44px);
    margin-left: -44px;
    padding: 16px 44px;
  }
  .lk-about__block-header {
    flex-direction: column;
  }
  .lk-about__block-table-col {
    width: 100%;
    float: none;

    padding: 16px 0;
    gap: 6px;
  }
  .lk-about__block-table-col:nth-last-child(2) {
    border-bottom: 0.5px solid rgba(117, 117, 117, 0.4588235294);
  }
  .lk-about__block-table {
    margin-bottom: 16px;
  }
  .lk-about__block-header {
    align-items: start;
  }
  .lk-about__block--requisites {
    margin-bottom: 16px;
  }
  .lk-about__flexend {
    padding: 0;
  }
  .lk-about__block-header-button--hide,
  .lk-about__info-button,
  .lk-about__submit-button,
  .lk-about__block-header-button {
    box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
  }
  .lk-about-top-modal {
    flex-direction: column-reverse;
  }
  .lk-about-form__modal .modal__title {
    margin-top: 0px;
  }
  .lk-about-form__modal .modal__content {
    padding-top: 0;
  }
  .lk-about-top-modal {
    margin: 20px 16px 16px 0;
    width: 100%;
    padding-right: 24px;
    gap: 24px;
  }
  .lk-about-info__value-container-modal .lk-about__block-table-col {
    width: calc(100% - 20px);
    padding-bottom: 8px;
  }
  .lk-about-info__value-container-modal .lk-about__info-input-field,
  .lk-about-info__value-container-modal .lk-about__info-input-field:focus,
  .lk-about__block-table-modal-bank .dart-form-control,
  .lk-about__block-table-modal-bank .dart-form-control:focus {
    padding: 11px;
    padding-right: 0;
    width: 100%;
    height: 40px;
    border: 1px solid #75757575;
  }
  .lk-about-info__value-container-modal .lk-about__block-table-col:nth-child(even) {
    margin-left: 0px;
  }
  .lk-about-info__value-container-modal .lk-about__block-table-col:nth-last-child(2) {
    border-bottom: none;
  }
  .lk-about-info__value-container-modal .lk-about__block-table-modal-bank {
    padding-top: 16px;
  }
  .lk-about-info__value-container-modal .lk-about__block-delete .lk-about__card-action {
    display: flex;
    align-items: center;
  }
  .lk-about-info__value-container-modal .lk-about__block-table-modal-bank-del {
    margin-right: 25px;
  }
  .lk-about-info__value-container-modal .lk-about__block-delete {
    padding-top: 0px;
  }
  .lk-about-info__value-container-modal .lk-about__card-action {
    font-size: 16px;
    width: 24px;
    height: 24px;
    color: #282828;
  }
  .lk-about-info__value-container-modal .lk-about__flexend {
    padding: 0 25px 0 0;
    width: 100%;
  }
  .lk-about__flexcenter {
    margin-top: 24px;
  }
}
</style>
