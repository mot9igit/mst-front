<template>

  <section class="lk-staff" id="lk-staff">
      <!-- Верхушка страницы -->
    <Toast />
    <div class="d-top">
      <breadcrumbs />
    </div>



    <Loader v-if="loading" />


    <form  @submit.prevent="createStaff()">
    <div class="lk-staff-create__header">
			<div class="lk-staff-edit__header-left">
        <h1>Создание нового сотрудника</h1>
			</div>

			<div class="lk-staff-edit__header-right">
				<div class="lk-staff-edit__header-buttom">
					<button
						class="d-button d-button-primary d-button--no-shadow lk-staff__header-button"
            type="submit"
					>
						<i class="d-icon-plus-flat lk-staff__header-button-icon"></i>
						Сохранить
					</button>
				</div>
			</div>
		</div>

		<div class="lk-staff-edit__table">

      <div class="lk-about__info" v-for="(field, index) in tableData" :key="index">
        <div class="lk-about__info-title-wrapper ">
          <p class="lk-staff-edit__table-label">{{ field.label }}:</p>
        </div>

        <div class="d-input--cont">
          <div class="d-input d-input--light lk-about__info-input">
              <!--:class="{ error: vEditOrgData.editOrgValues[field.name].$errors.length }"-->
            <input
              type="text"
              v-model="form[field.name]"
              :placeholder="field.placeholder"
              :name="field.name"
              class="d-input__field lk-about__info-input-field"
            />
          </div>
          <!--<div
            class="d-input-error"
            v-for="(error, index) of vEditOrgData.editOrgValues[field.name].$errors"
            :key="index"
          >
            <i class="d-icon-warning d-input-error__icon"></i>
            <span class="d-input-error__text">
              {{ error.$message }}
            </span>
          </div>-->
        </div>

      </div>

								<!--
                <div class="lk-staff-edit__table-row">
									<div class="lk-staff-edit__table-row-content">
										<p class="lk-staff-edit__table-label">
											Группа пользователя:
										</p>
										<p class="lk-staff-edit__table-value">Администратор</p>
									</div>
									<div class="lk-staff-edit__table-row-actions">
										<div
											class="d-divider d-divider--vertical lk-staff-edit__table-row-actions-divider"
										></div>
										<button class="lk-staff-edit__table-row-actions-button">
											<i class="d-icon-pen2"></i>
										</button>
									</div>
								</div>-->



	  </div>

		<div class="lk-staff-edit__operator">
			<p class="lk-staff-edit__operator-title">Оператор клиентов</p>
			<div class="d-radio__wrapper lk-staff-edit__operator-radio-wrapper">
				<label
          for="unlimitedCLients"
          class="d-radio lk-staff-edit__operator-radio"
          >
  				<input
						type="checkbox"
						name="unlimitedCLients"
						id="unlimitedCLients"
						class="d-radio__input lk-staff-edit__operator-radio-input"
            v-model="form.global"
            value="1"
					/>
				</label>
				<label
					for="unlimitedCLients"
					class="d-radio__label lk-staff-edit__operator-radio-label"
					>
          Неограниченный круг клиентов
				</label>
			</div>
      <div v-if="!form.global">

        <div>
          <div class="regions">

              <i class="d-icon-search-big d-search__icon"></i>
              <input
                type="text"
                placeholder="Найти организацию"
                class="d-search__field"
                v-model="search.organization"
                @focus="search.organizationSuggestionsShow = true"
                @blur="unActivateOrganization()"
              />
              <ul class="d-search__suggestions" v-if="this.search.organizationSuggestionsShow">
                <li
                  class="d-search__suggestion"
                  v-for="suggestion in organizations"
                  :key="suggestion.code"
                >
                  <a
                    href="#"
                    class="d-search__suggestion-card"
                    @click.prevent="orgSelect(suggestion)"
                  >
                    <img
                      :src="suggestion.image"
                      alt=""
                      class="d-search__suggestion-card__img"
                      v-if="suggestion.image"
                    />
                    <div class="d-search__suggestion-card__content">
                      <span class="d-search__suggestion-card__title">{{ suggestion.name }}</span>
                    </div>
                  </a>
                </li>
              </ul>

            <div class="chips">
              <div
                class="chip"
                v-for="(item, index) in this.form.org"
                :key="item.code"
              >
                <img v-if="item.image" :src="item.image" :alt="item.name" class="chip-img" />
                <span v-else class="chip-img"></span>
                <span>{{ item.name }}</span>
                <a href="#" class="chip-close" @click.prevent="orgDel(index)"></a>
              </div>
            </div>
          </div>
        </div>

        <div class="lk-staff-edit__operator-address-wrapper">
          <p class="lk-staff-edit__operator-address">
            <i
            class="d-icon-location lk-staff-edit__operator-address-icon"
            ></i>
            <span>УрФО, Москва, ООО “Стин”, Пром хрень снаб</span>
          </p>
          <div class="lk-staff-edit__operator-address-actions">
            <div class="d-divider d-divider--vertical lk-staff-edit__operator-address-actions-divider"></div>
              <button class="lk-staff-edit__operator-address-actions-button">
              <i class="d-icon-pen2"></i>
              </button>
            </div>
        </div>

        <div class="d-input d-input--light lk-staff-edit__operator-search">
            <input
              type="text"
              placeholder="Поиск города"
              name="date"
              class="d-input__field lk-staff-edit__operator-search-field"
            />
              <div class="d-input__actions">
                <button
                class="d-icon-wrapper lk-staff-edit__operator-search-button"
                >
                  <i class="d-icon-search-big"></i>
                </button>
              </div>
        </div>
      </div>
		</div>

    </form>
	</section>
</template>

<script>
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProfileStaffCreate',
  components: { Breadcrumbs, Loader },
  data(){
    return {
      loading: false,
      tableData: [
          {
            name: 'name',
            label: 'ФИО сотрудника',
            placeholder: 'Введите ФИО сотрудника',
            placeholder_icon: '',
          },
          {
            name: 'phone',
            label: 'Рабочий телефон',
            placeholder: 'Введите рабочий телефон',
            placeholder_icon: 'd-icon-telephone',
          },
          {
            name: 'email',
            label: 'Рабочий email',
            placeholder: 'Введите рабочий email',
            placeholder_icon: 'd-icon-mail2',
          },
        ],
      form: {
        name: '',
        email: '',
        phone: '',
        region: '',
        city: '',
        org: '',
        global: ''
      },
      search: {
        city: '',
        citySuggestionsShow: false,
        region: '',
        regionSuggestionsShow: false,
        organization: '',
        organizationSuggestionsShow: false,
      }
    }
  },
  mounted() {
    this.getRegions({ exclude: [], filter: '' })
    this.getOrganizations({ exclude: [], filter: '' })
  },
  methods: {
  ...mapActions({
    getRegions: 'addition/getRegions',
    getOrganizations: 'addition/getOrganizations',
  })
  },
  computed: {
  ...mapGetters({
    regions: 'addition/regions',
    organizations: 'addition/organizations',
  })
  }
}
</script>

<style lang="scss">
  .lk-staff-create__header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }
</style>
