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
      <form @submit.prevent="saveProfile()">
        <div class="lk-about__info-container">
          <div class="lk-about__info" v-for="(field, index) in this.form.orgData" :key="index">
            <!-- new here -->
            <div v-if="field.type === 'images_container'" class="lk-about__info-flex">
              <div class="lk-about__info-text-wrapper-flex">
                <div class="lk-about__info-text-wrapper-flex-item" v-for="(item, i) in field.name" :key="i">
                  <div class="lk-about__info-text-wrapper-flex-item-header">
                    <div class="lk-about__info-title-wrapper">
                      <p class="lk-about__info-title-label">{{ field.label[i] }}</p>
                      <p class="lk-about__info-title-description">{{ field.placeholder[i] }}</p>
                    </div>
                    <i class="d-icon-pen2 lk-about__info-text-wrapper-flex-item-icon" @click.prevent="openAdd(item)"></i>
                  </div>
                  <div class="lk-about__info-text-wrapper-flex-item-content">
                    <div class="lk-about__info-text-wrapper-flex-item-content-text" v-if="item == 'description'">
                      <div v-html="this.orgProfValues[item]"></div>
                    </div>
                    <div class="lk-about__info-text-wrapper-flex-item-content-image" v-else :class="'lk-about__info-text-wrapper-flex-item-content-image--'+item">
                      <img :src="this.orgProfValues[item]" v-if="this.orgProfValues[item]"/>
                      <div class="lk-about__info-text-wrapper-flex-item-content-image-noimg" v-else> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!---->
            <div class="lk-about__info-title-wrapper" v-else>
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

    <teleport to="body">
    <customModal v-model="this.modalAddData" class="lk-about-info__modal">
      <div class="lk-about-info__modal-add">
        <div class="lk-about-info__modal-add-header" v-if="modalAddDataStep == 1">
          <h2>{{ form.data.title }}</h2>
          <p>{{ form.data.text }}</p>
        </div>
        <div class="lk-about-info__modal-add-header" v-else>
          <h2>{{ form.data.title }}</h2>
          <p>Выбранная область будет показываться на вашей странице.</p>
          <p style="margin-top: -8px">Если изображение ориентировано неправильно, фотографию можно изменить</p>
        </div>
        <div class="lk-about-info__modal-add-content" v-if="modalAddDataStep == 1">
          <div class="lk-about-info__modal-add-content-dropzone" v-if="form.data.name != 'description'">
            <DropZone
                clickable="true"
                :maxFiles="Number(1)"
                :url="form.data.name == 'image' ? '/rest/file_upload.php?upload_org_avatar=avatar' : '/rest/file_upload.php?banner=banner'"
                :uploadOnDrop="true"
                :multipleUpload="false"
                :acceptedFiles="['png', 'jpeg', 'jpg', 'svg']"
                :parallelUpload="1"
                @sending="parseFile"
                v-bind="args"
                class="dart-dropzone"
            >
              <template v-slot:message>
                <div class="dart-dropzone__custom">
                  <i class="pi pi-cloud-upload"></i>
                  <b>Перетащите файл в эту область</b>
                  <p>Вы также можете загрузить файл, <span>нажав сюда</span></p>
                </div>
              </template>
            </DropZone>
          </div>
          <div class="lk-about-info__modal-add-content-editor" v-else>
            <Editor
              v-model="form.data.value"
              id="description"
              editorStyle="height: 248px"
              variant="simple"
            />
          </div>
        </div>
        <div class="lk-about-info__modal-add-content" v-else>
          <div class="lk-about-info__modal-add-content-center">          
            <Cropper 
            :pic="form.data.value.original_href ? form.data.value.original_href : form.data.value" 
            :options="form.data.options" 
            :presetMode="form.data.presetMode" 
            :class="'cropper_'+form.data.name"
            @cropData="cropData" />
</div>
          <div class="lk-about-info__modal-add-content-buttons" >
          <button class="lk-about-info__modal-add-content-buttons--change" @click.prevent="modalAddDataStep = 1, form.data.value = ''"><i class="d-icon d-icon-download"></i>Загрузить другое изображение</button>
          </div>
        
        </div>
        <div class="lk-about-info__modal-add-buttons">
          <button
            type="button"
            href="#"
            class="d-button d-button-primary d-button--sm-shadow lk-about-info__modal-add-buttons-button lk-about-info__modal-add-buttons-button--cancel"
            @click.prevent="((this.modalAddData = false), (this.form.data = {}))"
          >
            Отменить
          </button>
          <button
            type="button"
            href="#"
            class="d-button d-button-primary d-button--sm-shadow lk-about-info__modal-add-buttons-button"
            @click.prevent="saveData()"
            :disabled="!form.data.value"
          >
            Загрузить
          </button>
        </div>


			</div>
    </customModal>
    </teleport>
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
import Editor from 'primevue/editor'
import Cropper from '@/shared/ui/Cropper.vue'


export default {
  name: 'ProfileMain',
  components: { Breadcrumbs, Loader, Toast, customModal, Checkbox, DropZone, FileUpload, Editor, Cropper },
  data() {
    return {
      loading: false,
      showSaveButton: false,
      requisitesShow: true,
      modalRequisites: false,
      modalAddData: false,
      modalAddDataStep: 1,
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
          // {
          //   name: 'image',
          //   label: 'Логотип компании',
          //   placeholder: 'Отображается для покупателей',
          //   type: 'image',
          // },
          {
            name: ['image', 'banner', 'description'],
            label: ['Логотип компании', 'Баннер компании','Описание компании'],
            placeholder: ['Отображается для покупателей', 'Выводится на карточке поставщика','Показать клиенту, что он получит (скидку, подарок, бонус)'],
            modalTitle: ['Изменить логотип', 'Изменить баннер','Описание компании'],
            modalText: ['Загрузите логотип в формате jpg, png размером до 80х80 px', 'Загрузите логотип в формате jpg, png размером до 486х190 px','Вы можете отредактировать или изменить описание'],
            type: 'images_container',
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
        data: {}
      },
    }
  },
  mounted() {
    this.getOrgProfile().then(() => {
      if (this.orgprofile.warehouse == '0') {
        this.form.orgData.splice(2, 1)
      }
    })
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
      setOrgProfile: 'org/setOrgProfile',
      cropImage: 'addition/cropImage',
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
            // this.editOrgValues.image = res.data.files[0]
            // this.editOrgValues.upload_image = true
            this.modalAddDataStep = 2
            this.form.data.value = res.data.files[0]
            let presetWidth = ref(400)
            let presetHeight = ref(400)
            this.form.data.options = {
              viewMode: 1,
              dragMode: 'move',
              aspectRatio: presetWidth.value / presetHeight.value,
              cropBoxResizable: true,
            }
            this.form.data.presetMode = {
              mode: 'round',
              width: presetWidth.value,
              height: presetHeight.value,
            }
            
          }
          if (res.data.files[0].type === 'banner') {
            console.log('banner')
            // this.editOrgValues.image = res.data.files[0]
            // this.editOrgValues.upload_image = true
            this.modalAddDataStep = 2
            this.form.data.value = res.data.files[0]
            let presetWidth = ref(486)
            let presetHeight = ref(190)
            this.form.data.options = {
              viewMode: 1,
              dragMode: 'move',
              aspectRatio: presetWidth.value / presetHeight.value,
              cropBoxResizable: true,
            }
            this.form.data.presetMode = {
              mode: 'fixedSize',
              width: presetWidth.value,
              height: presetHeight.value,
            }
            
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
        banner: this.editOrgValues.banner,
        description: this.editOrgValues.description,
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
        this.loading = true
      	this.setOrgProfile({
      		data: {
      			name: this.editOrgValues.name,
            email: this.editOrgValues.email,
            phone: this.editOrgValues.phone,
            image: this.editOrgValues.image,
            image_data: this.editOrgValues.image_data,
            banner: this.editOrgValues.banner,
            banner_data: this.editOrgValues.banner_data,
            description: this.editOrgValues.description,
      		},
      	}).then((res) => {
      		this.$toast.add({
      			severity: "info",
      			summary: "Сохранено!",
      			detail: res.data.data.message,
      			life: 3000,
      		})
          this.getOrgProfile().then(() => {
            this.loading = false
          })
      	});
    },
    openAdd(i){
      this.modalAddDataStep = 1
      this.form.data = {}
      this.form.data.name = i
      let index = []
      for(var ind in this.form.orgData){
        if(this.form.orgData[ind].type == 'images_container'){
          index.push(ind)
          for(var indd in this.form.orgData[ind].name){
            if(this.form.orgData[ind].name[indd] == i){
              index.push(indd)
            }
          }
        }
      }
      this.form.data.value = this.orgProfValues[i]
      this.form.data.title = this.form.orgData[index[0]].modalTitle[index[1]]
      this.form.data.text = this.form.orgData[index[0]].modalText[index[1]]
      
      if(i != 'description' && this.form.data.value){
        this.modalAddDataStep = 2
        if(i == 'banner'){
            let presetWidth = ref(486)
            let presetHeight = ref(190)
            this.form.data.options = {
              viewMode: 1,
              dragMode: 'move',
              aspectRatio: presetWidth.value / presetHeight.value,
              cropBoxResizable: true,
            }
            this.form.data.presetMode = {
              mode: 'fixedSize',
              width: presetWidth.value,
              height: presetHeight.value,
            }
        }else{
          let presetWidth = ref(400)
            let presetHeight = ref(400)
            this.form.data.options = {
              viewMode: 1,
              dragMode: 'move',
              aspectRatio: presetWidth.value / presetHeight.value,
              cropBoxResizable: true,
            }
            this.form.data.presetMode = {
              mode: 'round',
              width: presetWidth.value,
              height: presetHeight.value,
            }
        }
      }
      this.modalAddData = true
    },
    cropData(data){
      this.form.data.cropper = data.detail
    },
    saveData(){
      if(this.form.data.name == 'description'){
        this.editOrgValues[this.form.data.name] = this.form.data.value
      }else{
        this.editOrgValues[this.form.data.name] = this.form.data.value.original_href
        this.editOrgValues[this.form.data.name + '_data'] = this.form.data.value
        this.loading = true
        this.cropImage({
          data: this.form.data
        }).then(() => {
          this.loading = false
        })
      }
      this.modalAddData = false
      this.modalAddDataStep = 1
      this.form.data = {}
      this.$toast.add({
        severity: 'info',
        summary: 'Изменения внесены!',
        detail: 'Не забудте сохранить изменения!',
        life: 3000,
      })
    }
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
.lk-about__info-flex{
  display: flex;
  width: 100%;
}
.lk-about__info-text-wrapper-flex{
  display: flex;
  align-items: start;
  gap:40px;
  width: 100%;
  flex-grow: 1;
  &-item{
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex-grow: 1;
    &-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .lk-about__info-title-wrapper{
        position: relative;
        width: max-content;
        padding-right: 16px;
        flex-grow: 1;
      }
      .lk-about__info-title-wrapper:after{
        content: '';
        position: absolute;
        top: calc(50% - 8px);
        right: 0;
        width: 0.5px;
        height: 16px;
        background-color: #75757575;
        display: block;
      }
      .lk-about__info-text-wrapper-flex-item-icon{
        width: 40px;
        height: 40px;
        padding-left: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    &-content-text{
      height: 84px;
      width: 501px;
      overflow: hidden;
      div{
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        color: #282828;
      }
    }
    &-content-image{
      display: flex;
      align-items: center;
      justify-content: center;
      &-noimg{
        width: 100%;
        height: 100%;
        background-color: #D9D9D9;
        background-image: url('/icons/camera-off.svg');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 28px;
      }
      &--image{
        width: 80px;
        height: 80px;
        aspect-ratio: 1;
        .lk-about__info-text-wrapper-flex-item-content-image-noimg{
          border-radius: 40px;
        }
        img{
          width: 80px;
          height: auto;
          border-radius: 40px;
        }
      }
      &--banner{
        width: fit-content;
        height: 97px;
        .lk-about__info-text-wrapper-flex-item-content-image-noimg{
          border-radius: 5px;
          width: 247px;
        }
        img{
          height: 97px;
          width: auto;
          border-radius: 5px;
        }
      }
    }
    &-icon{
      cursor: pointer;
    }
  }
}
.lk-about-info__modal{
  &-add{
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: -22px;
    &-header{
      display: flex;
      flex-direction: column;
      gap: 8px;
      h2{
        font-weight: 600;
        font-size: 20px;
        line-height: 26px;
        letter-spacing: -0.01em;
        color: #282828;
      }
      p{
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #757575;
      }
      
    }
    &-buttons{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      &-button {
        width: auto;
        margin: 0 !important;
        font-weight: 500;
        &--cancel{
          background: transparent;
          color: #282828;
          border: 1px solid #282828;
        }
        &--cancel:hover{
          background: #282828;
          color: #fff;
          border: 1px solid #282828;
        }
      }
      .d-button-primary:disabled {
          background-color: #EDEDED;
          color: #757575;
          font-weight: 500;
      }
    }
    &-content{
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
      &-center{
        width: 100%;
        display: flex;
        justify-content: center;
      }
      &-buttons{
        width: 100%;
        display: flex;
        justify-content: center;
        &--change{
          height: 40px;
          background: #EDEDED;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;
          color: #282828;
          padding: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }
      .dart-dropzone {
        
        border-radius: 6px;
        
      }
      .dropzone__item {
        display:none;
      }
    }
  }
}
@media(width<1280px){
  .lk-about__info-text-wrapper-flex{
    display: grid;
    grid-template-areas: 'A B'
                         'C C';
  }
}
@media(width<980px){
  .lk-about__info-text-wrapper-flex{
    display: flex;
    flex-direction: column;
    &-item:not(:last-child){
      padding-bottom: 24px;
      border-bottom: 1px solid #75757575;
    }
    &-item{
      width: 100%
    }
  }
}
@media(width<600px){
  .lk-about__info-text-wrapper-flex-item-content-text{
    width: auto;
    height: auto;
  }
  .lk-about__info-text-wrapper-flex-item-header .lk-about__info-title-wrapper {
    width: 150px
  }
}
</style>
