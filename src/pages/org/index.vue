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
        <div class="lk-about__info">
          <div class="lk-about__info-title-wrapper">
            <p class="lk-about__info-title-label">Название компании</p>
            <p class="lk-about__info-title-description">Отображается для покупателей</p>
          </div>

          <div class="d-input d-input--light lk-about__info-input" >
            <input
              type="text"
              placeholder="Название компании"
              :value="orgProfValues.name"
              :v-model="form.nameEntered"
              name="name"
              class="d-input__field lk-about__info-input-field"
              @input="this.showSaveButton = true"
            />

          </div>
          <button
            type="button"
            class="d-button d-button-quaternary d-button--no-shadow lk-about__info-button"
            @click.prevent="this.modalAddCompany = true"
          >
            <i class="d-icon-plus-flat lk-about__info-button-icon"></i>
            <span>Добавить компанию</span>
          </button>
        </div>
        <div class="lk-about__info">
          <div class="lk-about__info-title-wrapper">
            <p class="lk-about__info-title-label">Логотип компании</p>
            <p class="lk-about__info-title-description">Отображается для покупателей</p>
          </div>

          <div class="lk-about__info-image-wrapper" v-if="orgProfValues.image != ''">
            <img :src="orgProfValues.image" alt="" class="lk-about__info-image" />
        </div>

        </div>
        <div class="lk-about__info">
          <div class="lk-about__info-title-wrapper">
            <p class="lk-about__info-title-label">Код поставщика</p>
            <p class="lk-about__info-title-description">Данный необходим вашим клиентам, для подключения к вашему каталогу в МС: Закупки</p>
          </div>

          <div class="lk-about__info-text-wrapper">
            <p class="lk-about__info-text">{{ orgProfValues.id }}</p>
          </div>

        </div>
        <div class="lk-about__info">
          <div class="lk-about__info-title-wrapper">
            <p class="lk-about__info-title-label">Телефон компании</p>
            <p class="lk-about__info-title-description">Отображается для покупателей</p>
          </div>

          <div class="d-input d-input--light lk-about__info-input" >
            <input
              type="text"
              placeholder="Телефон компании"
              :value="orgProfValues.phone"
              :v-model="form.phoneEntered"
              name="phone"
              class="d-input__field lk-about__info-input-field"
              @input="this.showSaveButton = true"
            />

          </div>
        </div>
        <div class="lk-about__info">
          <div class="lk-about__info-title-wrapper">
            <p class="lk-about__info-title-label">Email компании</p>
            <p class="lk-about__info-title-description">Отображается для покупателей</p>
          </div>

          <div class="d-input d-input--light lk-about__info-input" >
            <input
              type="text"
              placeholder="Email компании"
              :value="orgProfValues.email"
              :v-model="form.emailEntered"
              name="name"
              class="d-input__field lk-about__info-input-field"
              @input="this.showSaveButton = true"
            />

          </div>
        </div>
      </div>
      <div class="lk-about__submit-container">
        <button
						type="submit"
						href="#"
						class="d-button d-button-primary d-button-primary-small d-button--sm-shadow lk-about__submit-button"
            v-if="showSaveButton === true"
				>
          Сохранить изменения
        </button>
      </div>
      </form>

      <div class="lk-about__block lk-about__block--requisites" v-for="(requisit, index) in orgReqValues" :key="requisit.id">
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
            @click.prevent="this.modalRequisites = true"
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

        <div class="d-radio__wrapper lk-about__block-radio-wrapper" >
          <label for="forMarketplace" class="d-radio lk-about__block-radio">
            <input v-if="requisit.marketplace == '0'"
              type="checkbox"
              name="forMarketplace"
              id="forMarketplace"
              value="1"
              class="d-radio__input lk-about__block-radio-input"
            />
            <input v-else
              type="checkbox"
              checked
              name="forMarketplace"
              id="forMarketplace"
              value="1"
              class="d-radio__input lk-about__block-radio-input"
            />
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
        <div  v-for="(requisit, index) in orgReqValues" :key="requisit.id">
          <div class="lk-about__block-table" v-for="(bank, i) in requisit.banks" :key="i">
              <div class="lk-about__block-table-row">
                <div class="lk-about__block-table-col" v-for="(item, index_item) in this.form.bank" :key="i + '_' + index_item">
                  <p class="lk-about__block-table-label">{{ item.label }}</p>
                  <p class="lk-about__block-table-value">{{ bank[item.name] != '' && bank[item.name] != undefined ? bank[item.name] : '-' }}</p>
                </div>
              </div>
            </div>
        </div>
      </div>



    </div>

    <teleport to="body">
    <customModal v-model="this.modalRequisites" class="lk-about-form__modal">
      <div class="lk-about-info__value-container-modal">

        <form class="lk-about-info__value-container-modal"  @submit.prevent="addRequisit">
          <div class="lk-about-top-modal">
          <h3>Запрос на добавление реквизитов</h3>
          <button
                class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
                @click.prevent="modals.requisit = !modals.requisit">
                <i class="d-icon-plus lk-about__block-header-button-icon"></i>
                Добавить реквизиты
              </button>
          </div>

          <div class="lk-about__block lk-about__block--requisites lk-about-info__value-container-modal" v-for="(requisit, index) in orgReqValues" :key="requisit.id">
            <div class="lk-about__block-table" >
              <div class="lk-about__block-table-row">
                <div class="lk-about__block-table-col" v-for="(field, index_field) in this.form.requisit"	:key="index + '_' + index_field">
                  <p class="lk-about__block-table-label">{{ field.label }}</p>
                  <input
                  type="text"
									class="dart-form-control d-input__field lk-about__info-input-field"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  />
                </div>
              </div>
            </div>

            <div class="d-radio__wrapper lk-about__block-radio-wrapper">
              <label for="new-requisit-market" class="d-radio lk-about__block-radio">
                <input
                  type="checkbox"
							    name="new-requisit-market"
                  class="d-radio__input lk-about__block-radio-input"
                />
              </label>

              <label for="new-requisit-market" class="d-radio__label lk-about__block-radio-label"
                >Реквизиты для маркетплейса
              </label>
            </div>
          </div>


          <div class="lk-about__block" v-if="addRequisitShow">

            <div  v-for="(requisit, index) in orgReqValues" :key="requisit.id" class="lk-about__block-table-modal">
              <div class="lk-about__block-table lk-about__block-table-modal-bank" v-for="(bank, i) in requisit.banks" :key="i">
                  <div class="lk-about__block-table lk-about__block-table-modal-bank lk-about__block-table-modal-bank-del">
                    <h4>Банковские реквизиты (1)</h4>
                    <div class="lk-about__block-delete">
                    <button class="clients__card-action"   >
                        <i class="d-icon-trash"></i>
                      </button>
                  </div>
                  </div>
                  <div class="lk-about__block-table-row">
                    <div class="lk-about__block-table-col" v-for="(item, index_item) in this.form.bank" :key="i + '_' + index_item">
                      <p class="lk-about__block-table-label">{{ item.label }}</p>
                      <input
                      type="text"
                      class="dart-form-control"
									    :name="item.name"
                      :placeholder="item.placeholder" />
                    <!--

                    <div class="error__desc">
									      <span v-for="error of vEditRequisites.orgProfValues.requisites.$each.$response.$errors[this.modals.requisitedit_index]?.banks[this.modals.requisitedit_index]?.$response.$errors[index_req][field.name]">
										      {{ error.$message }}
									      </span>
								      </div>-->
                    </div>
                  </div>

              </div>
            </div>

          </div>
          <div class="lk-about__flexend">
            <button
                class="d-button d-button-quaternary d-button-quaternary-small d-button--no-shadow lk-about__block-header-button lk-about__block-header-button--hide"
                @click.prevent="">
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
import { toRaw } from 'vue'
import Toast from "primevue/toast";
import customModal from '@/shared/ui/Modal.vue'
import { ref } from "vue";


export default {
  name: 'ProfileMain',
  components: { Breadcrumbs, Loader, Toast, customModal },
  data(){
    return {
      loading: false,
      showSaveButton: false,
      requisitesShow: true,
      orgProfValues: [],
      orgReqValues: [],
      orgBankValues: [],
      modalRequisites: false,
      modalAddCompany: false,
      addRequisitShow: false,
  //    form: {
  //      nameEntered: '',
  //      phoneEntered: '',
  //      emailEntered: '',
   //   },
   modals: {

				requisit: false, //добавление компании
				requisitedit: false, //редактировать реквизиты
				requisitedit_index: 0,
				bank: false,
				bankedit: false,
			},
      form: {
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
    this.getOrgProfile({
      action: "get/org/profile",
      id: this.$route.params.id,
    });
  },
   methods: {
    ...mapActions({
      getOrgProfile: 'org/getOrgProfile',
    }),

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
			this.new_requisit.banks.push({
				bank_bik: "",
				bank_name: "",
				bank_number: "",
				bank_knumber: "",
			});
		},
		addBankRequisitEdit() {
			this.orgProfValues.requisites[this.modals.requisitedit_index].banks.push({
				bank_bik: "",
				bank_name: "",
				bank_number: "",
				bank_knumber: "",
			});
		},
		deleteBankRequisit(index) {
			const array = Array.from(this.new_requisit.banks);
			delete array[index];
			const newArray = [];
			for (let i = 0; i < array.length; i++) {
				if (array[i]) {
					newArray.push(array[i]);
				}
			}
			this.new_requisit.banks = newArray;
		},
		deleteBankRequisitEdit(index) {
			const array = Array.from(
				this.orgProfValues.requisites[this.modals.requisitedit_index].banks
			);
			delete array[index];
			const newArray = [];
			for (let i = 0; i < array.length; i++) {
				if (array[i]) {
					newArray.push(array[i]);
				}
			}
			this.orgProfValues.requisites[this.modals.requisitedit_index].banks = newArray;
		},
		async editRequisit() {
			const validationResult = await this.vEditRequisites.$validate();
			console.log("Validation result", validationResult);
			if (!validationResult) {
				return;
			}

			const data = this.orgProfValues.requisites[this.modals.requisitedit_index];
			data.org_name = this.orgProfValues.name;
			if (data.marketplace.length > 0 && data.marketplace !== false) {
				data.marketplace = true;
			} else {
				data.marketplace = false;
			}
			//this.getorgProfValues({
			//	action: "set/request/profile",
			//	id: router.currentRoute._value.params.id,
			//	data: data,
			//}).then((res) => {
			//	if (res.data.data.status) {
			//		this.modals.requisitedit = false;
				//	this.org_profile_from_api({
					//	action: "get/org/profile",
					//	id: router.currentRoute._value.params.id,
			//		});
			//	}
			//	this.$toast.add({
			//		severity: "info",
			//		summary: "Успех!",
			//		detail: res.data.data.message,
			//		life: 3000,
			//	});
			//});
		},
		async addRequisit() {
			const validationResult = await this.vAddRequisites.$validate();
			console.log("Validation result", validationResult);
			if (!validationResult) {
				return;
			}

			const data = this.new_requisit;
			data.org_name = this.orgProfValues.name;
			if (data.marketplace.length > 0) {
				data.marketplace = true;
			} else {
				data.marketplace = false;
			}
			//this.getOrgProfile({
			//	action: "set/request/profile",
			//	id: router.currentRoute._value.params.id,
			//	data: data,
			//}).then((res) => {
			//	if (res.data.data.status) {
			//		this.modals.requisit = false;
			//		this.new_requisit = {
			//			name: "",
			//			inn: "",
			//			ogrn: "",
			//			kpp: "",
			//			ur_address: "",
			//			fact_address: "",
			//			marketplace: [],
			//			banks: [],
			//		};
			//	}
			//	this.$toast.add({
			//		severity: "info",
			//		summary: "Успех!",
			//		detail: res.data.data.message,
			//		life: 3000,
			//	});
			//});
		},
		saveProfile() {
		//	this.getOrgProfile({
		//		action: "set/org/profile",
		//		id: router.currentRoute._value.params.id,
		//		data: {
		//			managers: this.managers,
		//			image: this.orgprofile.image,
		//			upload_image: this.orgprofile.upload_image,
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
      this.showSaveButton=false
      this.orgProfValues = newVal
      this.orgReqValues = newVal.requisites
    },
  },

  validations() {
    return {

    }
  },
  setup() {
		const addRequisitesRules = {
			new_requisit: {
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

		const new_requisit = ref({
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
			new_requisit: new_requisit
		});

		const orgProfValues = ref([]);

		const editRequisitesData = ref({
			orgProfValues: orgProfValues
		});

		const vAddRequisites = useVuelidate(addRequisitesRules, addRequisitesData);
		const vEditRequisites = useVuelidate(editRequisitesRules, editRequisitesData);

		return {
			vAddRequisites,
			vEditRequisites,

			new_requisit,
			orgProfValues
		}
	},
}
</script>

<style lang="scss" scoped>
  h1 {
    margin-bottom: 40px;
  }
  .lk-about-form__modal{
    max-width: 752px;
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
  padding: 24px 24px 0 24px;
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
.lk-about-info__value-container-modal .lk-about__info-input-field,.lk-about-info__value-container-modal .lk-about__info-input-field:focus{
  background-color: transparent;
  color: #282828;
  padding: 11px;
  padding-right: 0;
  width: 100%;
  height: 42px;
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
  margin-top:40px;
}
.lk-about__block-delete{
  padding-top: 24px;
}
.lk-about-top-modal{
  display: flex;
  justify-content: space-between;
  margin-top:16px;
  width:100%;
  padding-right: 16px;
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
.lk-about-info__value-container-modal .lk-about__block-radio-wrapper{
  padding-top:12px;
}
.lk-about__block-table-modal-bank-del{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-right: 5px;
}
</style>
