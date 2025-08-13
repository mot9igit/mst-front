<template>
  <section class="lk-about" id="lk-about">
    <!-- Верхушка страницы -->
     <Toast />
    <div class="d-top">
      <a class="d-back d-top-back">
        <i class="d-icon-arrow d-back__icon d-top-back-icon"></i>
        <span class="d-back__text">Назад</span>
      </a>
      <breadcrumbs/>
    </div>

  <!--  <ul class="d-tab2__container lk-about__tabs">
      <li class="d-tab2 d-tab2--active">
        <a href="/views/lk/about/index.html">О компании</a>
      </li>
      <li class="d-tab2">
        <a href="/views/lk/staff/index.html">Сотрудники</a>
      </li>
      <li class="d-tab2">
        <a href="/views/lk/access/index.html">Права доступа</a>
      </li>
    </ul>-->

     <h1>О компании</h1>

     <Loader v-if="loading" />
     <div v-else>
      <form @submit.prevent="">
      <div class="lk-about__info-container" >
        <div class="lk-about__info" v-for="(field, index_field) in this.form.orgData" :key="orgprofile.id + '_' + index_field">
          <div class="lk-about__info-title-wrapper">
            <p class="lk-about__info-title-label">{{ field.label }}</p>
            <p class="lk-about__info-title-description">{{ field.placeholder }}</p>


          </div>

            <div class="d-input d-input--light lk-about__info-input" v-if="field.type === 'input'">
              <input
                type="text"
                :v-model="orgprofile[field.name]"
                :value="this.orgprofile[field.name]"
                :name="field.name"
                class="d-input__field lk-about__info-input-field"
              />
            </div>
            <div class="lk-about__info-image-wrapper" v-if="field.type === 'image'">
              <img :src="this.orgprofile[field.name]" alt="" class="lk-about__info-image"  v-if="this.orgprofile[field.name] != ''"/>
            </div>
            <div class="lk-about__info-text-wrapper"  v-if="field.type === 'text'">
              <p class="lk-about__info-text">{{ this.orgprofile[field.name] }}</p>
            </div>



          <button v-if="field.name == 'name'"
            type="button"
            class="d-button d-button-quaternary d-button--no-shadow lk-about__info-button"

          >
            <i class="d-icon-plus-flat lk-about__info-button-icon"></i>
            <span>Добавить компанию</span>
          </button>

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

      <div class="lk-about__block lk-about__block--requisites" v-for="(requisit, index) in orgprofile.requisites" :key="requisit.id">
        <div class="lk-about__block-header">
          <div class="lk-about__block-header-title-wrapper">
            <p class="lk-about__block-header-title">Реквизиты</p>
            <p class="lk-about__block-header-title-description">
              Вы можете подать запрос на изменение или добавление реквизитов. Самостоятельно изменить
              их нельзя.
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

        <div class="lk-about__block-table" >
          <div class="lk-about__block-table-row">
            <div class="lk-about__block-table-col" v-for="(field, index_field) in this.form.requisit"	:key="index + '_' + index_field">
              <p class="lk-about__block-table-label">{{ field.label }}</p>
              <p class="lk-about__block-table-value">{{ requisit[field.name] != '' &&  requisit[field.name] != undefined ? requisit[field.name] : '-'}}</p>
            </div>
          </div>
        </div>

        <div class="d-radio__wrapper lk-about__block-radio-wrapper" v-if="requisit.marketplace == '1'">
          <label for="forMarketplace" class="p-checkbox p-component">
            <div class="p-checkbox p-component p-checkbox-checked" data-pc-name="checkbox" pc17="" data-pc-section="root" data-p-checked="true" data-p-disabled="false"
            data-p="checked">
            <input id="edit-requisit-marketplace" type="checkbox" class="p-checkbox-input"
            name="edit-requisit-marketplace" checked="" data-pc-section="input" value="1">
            <div class="p-checkbox-box" data-pc-section="box" data-p="checked"><svg width="14"
              height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="p-icon p-checkbox-icon" aria-hidden="true" data-pc-section="icon" data-p="checked">
              <path d="M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827
              11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221
              7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416
              0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266
              6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689
              2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123
              3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z"
              fill="currentColor"></path></svg></div></div>

          </label>

          <label for="forMarketplace" class="d-radio__label lk-about__block-radio-label"
            >Реквизиты для маркетплейса
          </label>
        </div>



      </div>

      <div class="lk-about__flexend" v-if="requisitesShow === false">
        <button
            class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
            @click.prevent="requisitesShow = !requisitesShow">
            <i class="d-icon-plus lk-about__block-header-button-icon"></i>
            Показать банковские реквизиты
          </button>
      </div>
      <div class="lk-about__block" v-else>
        <div class="lk-about__block-header" >
          <div class="lk-about__block-header-title-wrapper">
            <p class="lk-about__block-header-title">Банковские реквизиты</p>
          </div>
          <button
            class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
            @click.prevent="requisitesShow = !requisitesShow">
            <i class="d-icon-minus lk-about__block-header-button-icon"></i>
            Скрыть банковские реквизиты
          </button>
        </div>
        <div  v-for="(requisit, index) in orgprofile.requisites" :key="requisit.id">
          <div class="lk-about__block-table" v-for="(bank, index) in requisit.banks" :key="index">

              <div class="lk-about__block-table-row" >
                <div class="lk-about__block-table-col" v-for="(field, index_field) in this.form.bank" :key="index + '_' + index_field">
                  <p class="lk-about__block-table-label">{{ field.label }}</p>
                  <p class="lk-about__block-table-value">{{ bank[field.name] != '' && bank[field.name] != undefined ? bank[field.name] : '-' }}</p>
                </div>
              </div>

            </div>
        </div>
      </div>



    </div>

    <teleport to="body">
    <customModal v-model="this.modalRequisites" class="lk-about-form__modal">
      <div class="lk-about-info__value-container-modal">

        <form class="lk-about-info__value-container-modal"  @submit.prevent="addRequisit" v-if="newReqModalForm">
          <div class="lk-about-top-modal">
          <h3>Запрос на добавление реквизитов</h3>
          <button
                class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
                @click.prevent="newReqModalForm = false, editReqModalForm = true">
                <i class="d-icon-pen2 lk-about__block-header-button-icon"></i>
                Редактировать реквизиты
              </button>
          </div>

          <div class="lk-about__block lk-about__block--requisites lk-about-info__value-container-modal lk-about-info__value-container-modal-grid">
            <div class="lk-about__block-table" >
              <div class="lk-about__block-table-row">
                <div class="lk-about__block-table-col"
                  v-for="(field, index_field) in this.form.requisit"	:key="index + '_' + index_field"
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
                  <div class="d-input-error"
                  v-for="error of vAddRequisites.newRequisit[field.name].$errors"
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
                <Checkbox v-model="this.newRequisit.marketplace" inputId="new-requisit-marketplace" name="new-requisit-marketplace" value="1" />

              </label>

              <label for="new-requisit-marketplace" class="d-radio__label lk-about__block-radio-label"
                >Реквизиты для маркетплейса
              </label>
            </div>
          </div>


          <div class="lk-about__block  lk-about-info__value-container-modal-grid" v-if="addRequisitShow">

            <div  v-for="(bank, index_req) in this.newRequisit.banks" :key="index_req" class="lk-about__block-table-modal">
              <div class="lk-about__block-table lk-about__block-table-modal-bank" >
                  <div class="lk-about__block-table lk-about__block-table-modal-bank lk-about__block-table-modal-bank-del">
                    <h4>Банковские реквизиты ({{ index_req + 1 }})</h4>
                    <div class="lk-about__block-delete">
                    <button class="clients__card-action"  @click.prevent="deleteBankRequisit(index_req)">
                      <i class="d-icon-trash"></i>
                    </button>
                  </div>
                  </div>
                  <div class="lk-about__block-table-row">
                    <div class="lk-about__block-table-col"
                      v-for="(field, index_field) in this.form.bank" :key="index_req + '_' + index_field"
                      :class="{ error: vAddRequisites.newRequisit.banks.$each.$response.$errors?.[index_req]?.[field.name].length }"
                    >
                      <p class="lk-about__block-table-label">{{ field.label }}</p>
                      <input
                      v-model="bank[field.name]"
                      class="dart-form-control"
									    :name="field.name"
                      :placeholder="field.placeholder"
                      type="text"
                       />
                      <div class="d-input-error"
                      v-for="error of vAddRequisites.newRequisit.banks.$each.$response.$errors?.[index_req]?.[field.name]"
                      >
                        <i class="d-icon-warning d-input-error__icon"></i>
                        <span
                           class="d-input-error__text">
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
                @click.prevent="addBankRequisit()">
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

        <form class="lk-about-info__value-container-modal"  @submit.prevent="editRequisit" v-if="editReqModalForm">
            <div class="lk-about-top-modal">
            <h3>Запрос на редактирование реквизитов</h3>
            <button
                  class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
                  @click.prevent="newReqModalForm = true, editReqModalForm = false">
                  <i class="d-icon-plus lk-about__block-header-button-icon"></i>
                  Добавить реквизиты
                </button>
            </div>

            <div class="lk-about__block lk-about__block--requisites lk-about-info__value-container-modal" >
              <div class="lk-about__block-table" >
                <div class="lk-about__block-table-row">
                  <div class="lk-about__block-table-col" v-for="(field, index) in form.requisit" :key="index"
                  :class="{ error: vEditRequisites.orgProfValues.requisites.$each.$response.$errors[this.requisitEditIndex]?.[field.name]?.length }">
                    <p class="lk-about__block-table-label">{{ field.label }}</p>
                    <input
                    type="text"
                    class="dart-form-control d-input__field lk-about__info-input-field"
                    v-model="this.orgProfValues.requisites[this.requisitEditIndex][field.name]"
                    :name="field.name"
                    :placeholder="field.placeholder"
                    />
                    <div class="d-input-error"
                    v-for="error of vEditRequisites.orgProfValues.requisites.$each.$response.$errors[this.requisitEditIndex]?.[field.name]"
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
                  <Checkbox v-model="this.orgProfValues.requisites[this.requisitEditIndex].marketplace
							" inputId="edit-requisit-marketplace" name="edit-requisit-marketplace" value="1" />

                </label>
                <label for="edit-requisit-marketplace" class="d-radio__label lk-about__block-radio-label"
                  >Реквизиты для маркетплейса
                </label>
              </div>
            </div>


            <div class="lk-about__block">

              <div  v-for="(bank, index_req) in this.orgProfValues.requisites[this.requisitEditIndex].banks" :key="index_req" class="lk-about__block-table-modal">
                <div class="lk-about__block-table lk-about__block-table-modal-bank" >
                    <div class="lk-about__block-table lk-about__block-table-modal-bank lk-about__block-table-modal-bank-del">
                      <h4>Банковские реквизиты ({{ index_req + 1 }})</h4>
                      <div class="lk-about__block-delete">
                      <button class="clients__card-action"  @click.prevent="deleteBankRequisitEdit(index_req)">
                        <i class="d-icon-trash"></i>
                      </button>
                    </div>
                    </div>
                    <div class="lk-about__block-table-row">
                      <div class="lk-about__block-table-col" v-for="(field, index_field) in this.form.bank" :key="index_req + '_' + index_field"
                      :class="{ error: vEditRequisites.orgProfValues.requisites.$each.$response.$errors[this.requisitEditIndex]?.banks[this.requisitEditIndex]?.$response.$errors[index_req][field.name]?.length }">
                        <p class="lk-about__block-table-label">{{ field.label }}</p>
                        <input
                        v-model="bank[field.name]"
                        class="dart-form-control"
                        :name="field.name"
                        :placeholder="field.placeholder"
                        type="text"
                        />
                        <div class="d-input-error"
                        v-for="error of vEditRequisites.orgProfValues.requisites.$each.$response.$errors[this.requisitEditIndex]?.banks[this.requisitEditIndex]?.$response.$errors[index_req][field.name]"
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
                  @click.prevent="addBankRequisitEdit()">
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
import { helpers, required } from "@vuelidate/validators";
import useVuelidate from '@vuelidate/core'
import Toast from "primevue/toast";
import customModal from '@/shared/ui/Modal.vue'
import { ref, shallowRef } from "vue";
import { Checkbox } from 'primevue'


export default {
  name: 'ProfileMain',
  components: { Breadcrumbs, Loader, Toast, customModal, Checkbox },
  data(){
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
      successMessageText: '',
			requisitEditIndex: 0,
      form: {
        orgData: [
          {
						name: "name",
						label: "Название компании",
						placeholder: "Отображается для покупателей",
						type: "input",

					},
					{
						name: "image",
						label: "Логотип компании",
						placeholder: 'Отображается для покупателей',
						type: "image",

					},
          {
						name: "id",
						label: "Код поставщика",
						placeholder: "Данный необходим вашим клиентам, для подключения к вашему каталогу в МС: Закупки",
						type: "text",

					},
					{
						name: "phone",
						label: "Телефон компании",
						placeholder: 'Отображается для покупателей',
						type: "input",

					},
          {
						name: "email",
						label: "Email компании",
						placeholder: "Отображается для покупателей",
						type: "input",

					},
        ],
				bank: [
					{
						name: "bank_bik",
						label: "БИК",
						placeholder: "12345678",
						type: "text",
						readonly: 1,
					},
					{
						name: "bank_name",
						label: "Банк",
						placeholder: 'ПАО "Сбербанк"',
						type: "text",
						readonly: 1,
					},
					{
						name: "bank_number",
						label: "Расчетный счет",
						placeholder: "7785612544545",
						type: "text",
						readonly: 1,
					},
					{
						name: "bank_knumber",
						label: "Корреспондентский счет",
						placeholder: "7785612544545",
						type: "text",
						readonly: 1,
					},
				],
				requisit: [
					{
						name: "name",
						label: "Наименования юридического лица",
						placeholder: 'ООО "Магазин"',
						type: "text",
						readonly: 1,
					},
					{
						name: "inn",
						label: "ИНН",
						placeholder: "77856974123",
						type: "text",
						readonly: 1,
					},
					{
						name: "ogrn",
						label: "ОГРН",
						placeholder: "77856974123",
						type: "text",
						readonly: 1,
					},
					{
						name: "kpp",
						label: "КПП",
						placeholder: "77856974123",
						type: "text",
						readonly: 1,
					},
					{
						name: "ur_address",
						label: "Адрес",
						placeholder: "г. Москва, Большая Никитская улица, 10",
						type: "text",
						readonly: 1,
					},
					{
						name: "fact_address",
						label: "Фактический адрес",
						placeholder: "г. Москва, Большая Никитская улица, 10",
						type: "text",
						readonly: 1,
					},
				],
			},
    }
  },
  mounted(){
    this.getOrgProfile();

  },
  setup() {
		const addRequisitesRules = {
			newRequisit: {
				name: {
					required: helpers.withMessage("Заполните наименование юр. лица", required),
				},
				inn: {
					pattern: helpers.withMessage("ИНН должен содержать 10 или 12 цифр", (value) => /^[0-9]{10}$|^[0-9]{12}$/.test(value)),
				},
				ogrn: {
					pattern: helpers.withMessage("ОГРН должен содержать 13 цифр", (value) => /^[0-9]{13}$/.test(value)),
				},
				kpp: {
					pattern: helpers.withMessage("КПП должен содержать 9 цифр", (value) => /^[0-9]{9}$/.test(value)),
				},
				ur_address: {
					required: helpers.withMessage("Заполните юридический адрес", required),
				},
				fact_address: {
					required: helpers.withMessage("Заполните фактический адрес", required),
				},
				banks: {
					$each: helpers.forEach({
						bank_bik: {
							pattern: helpers.withMessage("БИК должен содержать 9 цифр", (value) => /^[0-9]{9}$/.test(value)),
						},
						bank_name: {
							required: helpers.withMessage("Заполните название банка", required),
						},
						bank_number: {
							pattern: helpers.withMessage("Расчетный счет должен содержать 20 цифр", (value) => /^[0-9]{20}$/.test(value)),
						},
						bank_knumber: {
							pattern: helpers.withMessage("К/С должен содержать 20 цифр", (value) => /^[0-9]{20}$/.test(value)),
						}
					})
				}
			},
		}

		const editRequisitesRules = {
			orgProfValues: {
				requisites: {
					$each: helpers.forEach({
						name: {
							required: helpers.withMessage("Заполните наименование юр. лица", required),
						},
						inn: {
							pattern: helpers.withMessage("ИНН должен содержать 10 или 12 цифр", (value) => /^[0-9]{10}$|^[0-9]{12}$/.test(value)),
						},
						ogrn: {
							pattern: helpers.withMessage("ОГРН должен содержать 13 цифр", (value) => /^[0-9]{13}$/.test(value)),
						},
						kpp: {
							pattern: helpers.withMessage("КПП должен содержать 9 цифр", (value) => /^[0-9]{9}$/.test(value)),
						},
						ur_address: {
							required: helpers.withMessage("Заполните юридический адрес", required),
						},
						fact_address: {
							required: helpers.withMessage("Заполните фактический адрес", required),
						},
						banks: {
							$each: helpers.forEach({
								bank_bik: {
									pattern: helpers.withMessage("БИК должен содержать 9 цифр", (value) => /^[0-9]{9}$/.test(value)),
								},
								bank_name: {
									required: helpers.withMessage("Заполните название банка", required),
								},
								bank_number: {
									pattern: helpers.withMessage("Расчетный счет должен содержать 20 цифр", (value) => /^[0-9]{20}$/.test(value)),
								},
								bank_knumber: {
									pattern: helpers.withMessage("К/С должен содержать 20 цифр", (value) => /^[0-9]{20}$/.test(value)),
								}
							})
						}
					})
				}
			}
		}

    //const editOrgRules = {
		//	newOrgData: {

		//			$each: helpers.forEach({
		//				name: {
		//					required: helpers.withMessage("Заполните наименование организации", required),
		//				},
     //       phone: {
		//					required: helpers.withMessage("Укажите телефон организации", required),
		//				},
     //       email: {
		//					required: helpers.withMessage("Укажите email организации", required),
		//				},
		//			})
		//		}

		//}

    //const newOrgInfo = ref({
		//	name: "",
		//	phone: "",
		//	email: "",
		//	image: "",
		//})

		const newRequisit = ref({
			name: "",
			inn: "",
			ogrn: "",
			kpp: "",
			ur_address: "",
			fact_address: "",
			marketplace: [],
			banks: [],
		})

		const addRequisitesData = ref({
			newRequisit: newRequisit
		});

    //const addOrgData = ref({
		//	newOrgData: newOrgData
		//});

		const orgProfValues = shallowRef([]);

		const editRequisitesData = ref({
			orgProfValues: orgProfValues
		});

		const vAddRequisites = useVuelidate(addRequisitesRules, addRequisitesData);
		const vEditRequisites = useVuelidate(editRequisitesRules, editRequisitesData);

		return {
			vAddRequisites,
			vEditRequisites,
			newRequisit,
			orgProfValues
		}
	},
  methods: {
    ...mapActions({
      getOrgProfile: 'org/getOrgProfile',
      editOrgProfile: 'org/editOrgProfile',
    }),
    showModals(index){
      if(this.modalRequisites === false && this.successMessage === true){
        this.successMessage = false
        this.editReqModalForm = true
      }
      this.modalRequisites = true,
      this.requisitEditIndex = index
    },
    onUpload(data) {
		//	if (data.xhr.response) {
		//		const response = JSON.parse(data.xhr.response);
		//		if (Object.prototype.hasOwnProperty.call(response.data, "files")) {
					// перечень загруженныйх файлов

		//			if (response.data.files[0].type === "avatar") {
		//				this.orgProfValues.image = response.data.files[0];
		//				this.orgProfValues.upload_image = true;
		//			}
		//		}
		//	}
		//	this.$toast.add({
		//		severity: "info",
		//		summary: "Логотип успешно загружен!",
		//		detail: "Не забудте сохранить изменения",
		//		life: 3000,
		//	});
		},
		parseFile(files, xhr, formData) {
		//	const callback = (e) => {
		//		const res = JSON.parse(e);
		//		if (res.success) {
		//			if (res.data.files[0].type === "avatar") {
		//				this.orgProfValues.image = res.data.files[0];
		//				this.orgProfValues.upload_image = true;
		//			}
		//		}
		//	};

		//	xhr.onreadystatechange = () => {
		//		if (xhr.readyState === 4) {
		//			callback(xhr.response);
		//		}
		//	};
		},
		addBankRequisit() {
      this.addRequisitShow = true
			this.newRequisit.banks.push({
				bank_bik: "",
				bank_name: "",
				bank_number: "",
				bank_knumber: "",
			});
		},
		addBankRequisitEdit() {
      this.addRequisitShow = true
			this.orgProfValues.requisites[this.requisitEditIndex].banks.push({
				bank_bik: "",
				bank_name: "",
				bank_number: "",
				bank_knumber: "",
			});
		},
		deleteBankRequisit(index) {
			const array = Array.from(this.newRequisit.banks);
			delete array[index];
			const newArray = [];
			for (let i = 0; i < array.length; i++) {
				if (array[i]) {
					newArray.push(array[i]);
				}
			}
			this.newRequisit.banks = newArray;
		},

		deleteBankRequisitEdit(index) {
			const array = Array.from(
				this.orgProfValues.requisites[this.requisitEditIndex].banks
			);
			delete array[index];
			const newArray = [];
			for (let i = 0; i < array.length; i++) {
				if (array[i]) {
					newArray.push(array[i]);
				}
			}
			this.orgProfValues.requisites[this.requisitEditIndex].banks = newArray;
		},

		async editRequisit() {
			const validationResult = await this.vEditRequisites.$validate();
			console.log("Validation result", validationResult);
			if (!validationResult) {
				return;
			}

			const data = this.orgProfValues.requisites[this.requisitEditIndex];
			data.org_name = this.orgprofile.name;
			if (data.marketplace.length > 0 && data.marketplace !== false) {
				data.marketplace = true;
			} else {
				data.marketplace = false;
			}
			await this.editOrgProfile({
				data: data,
			}).then((res) => {
				if (res.data.data.status) {
					this.editReqModalForm = false
					this.successMessage = true
          this.successMessageText = 'Заявка на изменение реквизитов успешно отправлена! Менеджер свяжется с вами в ближайшее время!'
					this.getOrgProfile();
				}
				this.$toast.add({
					severity: "info",
					summary: "Заявка успешно отправлена!",
					detail: res.data.message,
					life: 3000,
				});
			});
		},
		async addRequisit() {
			const validationResult = await this.vAddRequisites.$validate();
			console.log("Validation result", validationResult);
			if (!validationResult) {
				return;
			}

			const data = this.newRequisit;
			data.org_name = this.orgprofile.name;
			if (data.marketplace.length > 0) {
				data.marketplace = true;
			} else {
				data.marketplace = false;
			}
			await this.editOrgProfile({
				data: data,
			}).then((res) => {
				if (res.data.data.status) {
          this.newReqModalForm = false
					this.successMessage = true
          this.successMessageText = 'Заявка на добавление реквизитов успешно отправлена! Менеджер свяжется с вами в ближайшее время!'
					this.newRequisit = {
						name: "",
						inn: "",
						ogrn: "",
						kpp: "",
						ur_address: "",
						fact_address: "",
						marketplace: [],
						banks: [],
					};
				}
				this.$toast.add({
					severity: "info",
					summary: "Заявка успешно отправлена!",
					detail: res.data.message,
					life: 3000,
				});
			});
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
      orgprofile: 'org/orgprofile'
    }),
  },
  watch: {
    orgprofile: function (newVal) {
      this.orgProfTmp = newVal
      this.orgProfValues = this.orgProfTmp
    },

  },

}
</script>

<style lang="scss" >
  h1 {
    margin-bottom: 40px;
  }

  .lk-about__submit-container{
    display: flex;
    justify-content: end;
    margin-bottom: 60px;
  }
  .lk-about__submit-button{
    font-size: 16px;
    padding: 8px 28px;
    height: 40px;
  }
  .lk-about__info-input:after{
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
.lk-about__info-image-wrapper{
  height: 45px;
}
.lk-about__flexend{
  display: flex;
  justify-content: end;
  padding: 24px;
}
.lk-about__flexcenter{
  display: flex;
  justify-content: center;
  padding: 0px 24px 0 24px;
  margin-top: -34px;
}
.lk-about__block-table-row{
  display: block;
  border:none;
}
.lk-about__block-table-col{
  width:50%;
  float: left;
  border-bottom: 0.5px solid #75757575;
  padding:24px 0;
}
.lk-about-info__value-container-modal .lk-about__info-input-field,.lk-about-info__value-container-modal .lk-about__info-input-field:focus,
.lk-about__block-table-modal-bank .dart-form-control, .lk-about__block-table-modal-bank .dart-form-control:focus{
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
.lk-about-info__value-container-modal .lk-about__block-table-row, .lk-about-info__value-container-modal .lk-about__block-table-col{
  border:none;
  border-bottom: none;
}
.lk-about-info__value-container-modal .lk-about__block-table-col{
  width: calc(50% - 20px);
  padding-bottom: 0px;
}

.lk-about-info__value-container-modal .lk-about__block-table-col:nth-child(even){
  margin-left: 28px;
}

.lk-about-info__value-container-modal .lk-about__block{
  padding-top: 0;
  background-color: transparent;
  display: flex;
}
.lk-about-info__value-container-modal .d-button-primary-small{
    font-size: 16px;
}
.lk-about-info__value-container-modal .lk-about__block-table-modal{
  width:100%;
  margin-top:0px;
}
.lk-about__block-delete{
  padding-top: 24px;
}
.lk-about-top-modal{
  display: flex;
  justify-content: space-between;
  margin:16px 16px 16px 0;
  width:100%;

}
.lk-about-top-modal .lk-about__block-header-button--hide{
  font-size: 16px;
  margin-right: 20px;
}
.lk-about-info__value-container-modal .lk-about__block-table-col {
    gap: 8px;
}
.lk-about-info__value-container-modal .lk-about__block-table, .lk-about-info__value-container-modal .lk-about__block--requisites {
    margin-bottom: 0px;
}
.lk-about-info__value-container-modal .lk-about__flexend{
  padding: 0 24px;
}
.lk-about__block-table-modal-bank-del{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-right: 5px;
}
.lk-about__block-radio-wrapper .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box,
.lk-about__block-radio-wrapper .p-checkbox-checked .p-checkbox-box, .lk-about__block-radio .p-checkbox-checked .p-checkbox-box, .lk-about__block-radio .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box{
  border-color: rgba(249, 44, 13, 1);
  background: rgba(249, 44, 13, 1);
}
.lk-about__block-table-modal .lk-about__block-table {
  gap:0;
}
.lk-about-info__value-container-modal-grid .lk-about__block-table-col{
  min-height: 95px;
  padding-top: 0;

}
.lk-about-info__value-container-modal-grid .lk-about__block-table-col .d-input-error{
  margin-top: -5px
}
.success-modal{

  padding: 100px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 50px;
}
.success-modal h2{
  text-align: center;
  font-size: 28px;
}

  </style>
