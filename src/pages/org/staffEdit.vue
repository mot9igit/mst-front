<template>

  <section class="lk-staff" id="lk-staff">
      <!-- Верхушка страницы -->
    <Toast />
    <div class="d-top">
      <breadcrumbs />
    </div>

    <Loader v-if="loading" />

    <form  @submit.prevent="editStaff()">
    <div class="lk-staff-create__header">
			<div class="lk-staff-edit__header-left">
        <h1>Редактирование сотрудника</h1>
			</div>

			<div class="lk-staff-edit__header-right">
				<div class="lk-staff-edit__header-buttom">
					<button
						class="d-button d-button-primary d-button--no-shadow lk-staff__header-button"
            type="submit"
					>
						<i class="d-icon-plus-flat lk-staff__header-button-icon"></i>
						Сохранить изменения
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
            <input
                v-if="field.name === 'phone'"
                type="text"
                v-model="form[field.name]"
                :placeholder="field.placeholder"
                :name="field.name"
                class="d-input__field lk-about__info-input-field"
                @input="formatPhone"
                @focus="errors[field.name] = ''"
              />
            <input
            v-else
              type="text"
              v-model="form[field.name]"
              :placeholder="field.placeholder"
              :name="field.name"
              class="d-input__field lk-about__info-input-field"
              @focus="errors[field.name] = ''"

            />
          </div>
          <div
            class="d-input-error"
            v-if="errors[field.name]"
          >
            <i class="d-icon-warning d-input-error__icon"></i>
            <span class="d-input-error__text">
              {{ errors[field.name] }}
            </span>
          </div>
        </div>

      </div>
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
      <div v-if="!form.global" class="lk-staff-edit__regions-cont">
          <div class="lk-staff-edit__regions">

            <div class="chips">
              <div class="chip" v-for="(item, index) in this.form.region" :key="item.code">
                <i class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"></i>
                <span>{{ item.name }}</span>
                <a href="#" class="chip-close" @click.prevent="regionDel(index)"></a>
              </div>
            </div>

            <form class="d-search d-search--alt">
              <div class="d-input d-input--light lk-staff-edit__operator-search">
                <input
                  type="text"
                  placeholder="Поиск региона"
                  class="d-input__field lk-staff-edit__operator-search-field"
                  v-model="search.region"
                  @focus="search.regionSuggestionsShow = true"
                  @blur="unActivateRegion()"
                  @keypress.enter.prevent=""
                />
              </div>

              <ul class="d-search__suggestions" v-if="this.search.regionSuggestionsShow">
                <li
                  class="d-search__suggestion"
                  v-for="suggestion in regions_all"
                  :key="suggestion.code"
                >
                  <a
                    href="#"
                    class="d-search__suggestion-card"
                    @click.prevent="
                      () => {
                        this.regionSelect(suggestion)
                      }
                    "
                  >
                    <div class="d-search__suggestion-card__content">
                      <span class="d-search__suggestion-card__title">{{ suggestion.name }}</span>
                    </div>
                  </a>
                </li>
              </ul>
            </form>
          </div>

          <div class="lk-staff-edit__regions">

            <div class="chips">
              <div class="chip" v-for="(item, index) in this.form.city" :key="item.code">
                <i class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"></i>
                <span>{{ item.name }}</span>
                <a href="#" class="chip-close" @click.prevent="cityDel(index)"></a>
              </div>
            </div>

            <form class="d-search d-search--alt">
              <div class="d-input d-input--light lk-staff-edit__operator-search">
                <input
                  type="text"
                  placeholder="Поиск города"
                  class="d-input__field lk-staff-edit__operator-search-field"
                  v-model="search.city"
                  @focus="search.citySuggestionsShow = true"
                  @blur="unActivateCity()"
                  @keypress.enter.prevent=""
                />
              </div>

              <ul class="d-search__suggestions" v-if="this.search.citySuggestionsShow">
                <li
                  class="d-search__suggestion"
                  v-for="suggestion in city_all"
                  :key="suggestion.code"
                >
                  <a
                    href="#"
                    class="d-search__suggestion-card"
                    @click.prevent="
                      () => {
                        this.citySelect(suggestion)
                      }
                    "
                  >
                    <div class="d-search__suggestion-card__content">
                      <span class="d-search__suggestion-card__title">{{ suggestion.name }}</span>
                    </div>
                  </a>
                </li>
              </ul>
            </form>
          </div>

          <div class="lk-staff-edit__regions">

            <div class="chips">
              <div class="chip" v-for="(item, index) in this.form.org" :key="item.code">
                <i class="d-icon-location d-badge__icon promotions__card-audience-badge-icon"></i>
                <span>{{ item.name }}</span>
                <a href="#" class="chip-close" @click.prevent="orgDel(index)"></a>
              </div>
            </div>

            <form class="d-search d-search--alt">
              <div class="d-input d-input--light lk-staff-edit__operator-search">
                <input
                  type="text"
                  placeholder="Поиск организаций"
                  class="d-input__field lk-staff-edit__operator-search-field"
                  v-model="search.org"
                  @focus="search.orgSuggestionsShow = true"
                  @blur="unActivateOrg()"
                  @keypress.enter.prevent=""
                />
              </div>

              <ul class="d-search__suggestions" v-if="this.search.orgSuggestionsShow">
                <li
                  class="d-search__suggestion"
                  v-for="suggestion in organizations_all"
                  :key="suggestion.code"
                >
                  <a
                    href="#"
                    class="d-search__suggestion-card"
                    @click.prevent="
                      () => {
                        this.orgSelect(suggestion)
                      }
                    "
                  >
                    <div class="d-search__suggestion-card__content">
                      <span class="d-search__suggestion-card__title">{{ suggestion.name }}</span>
                    </div>
                  </a>
                </li>
              </ul>
            </form>
          </div>
      </div>
      <div class="lk-staff-edit__operator-notifications-wrapper">
          <p class="lk-staff-edit__operator-title">Подписка на уведомления:</p>
          <div class="d-radio__wrapper lk-staff-edit__operator-radio-wrapper" v-for="(type,index) in notifications_types.items" :key="index">
            <Checkbox
              v-model="form.notifications_types"
              :binary="false"
              :inputId="type.id"
              :name="type.id"
              :value="type.id"
              />
            <label
              :for="type.id"
              class="d-radio__label vendor-change__selected-item-radio-label"
              >
              {{ type.name }}
            </label>
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
import Toast from 'primevue/toast'
import { Checkbox } from 'primevue'


export default {
  name: 'ProfileStaffEdit',
  components: { Breadcrumbs, Loader, Toast, Checkbox },
  data(){
    return {
      loading: true,
      regions_all: [],
      city_all: [],
      organizations_all: [],
      tableData: [
          {
            name: 'name',
            label: 'ФИО сотрудника',
            placeholder: 'Введите ФИО сотрудника',
          },
          {
            name: 'phone',
            label: 'Рабочий телефон',
            placeholder: 'Введите рабочий телефон',
          },
          {
            name: 'email',
            label: 'Рабочий email',
            placeholder: 'Введите рабочий email',
          },
        ],
      form: {
        name: '',
        email: '',
        phone: '',
        region: [],
        city: [],
        org: [],
        global: false,
        notifications_types: []
      },
      search: {
        city: '',
        citySuggestionsShow: false,
        region: '',
        regionSuggestionsShow: false,
        org: '',
        orgSuggestionsShow: false,
      },
      errors: {
        name: '',
        phone: '',
        email: '',
      }
    }
  },
  mounted() {

    this.getManager({
      manager_id: this.$route.params.manager_id
    }).then(() => {
      this.form = this.manager
      this.getRegions({ exclude: this.form.region, filter: '' }).then(() => {
      this.regions_all = this.regions.map(function (el) {
        return { name: el.label, code: el.key }
      })
    })
    this.getCities({ exclude: this.form.city, filter: '' }).then(() => {
      this.cities_all = this.cities.map(function (el) {
        return { name: el.label, code: el.key }
      })
      this.loading = false
    })
    this.getOrganizations({ exclude: this.form.org, filter: '' }).then(() => {
      this.organizations_all = this.organizations.map(function (el) {
        return { name: el.name, code: el.id }
      })
    })
    this.getNotificationsTypes()
    })



  },
  methods: {
  ...mapActions({
    getRegions: 'addition/getRegions',
    getCities: 'addition/getCities',
    getOrganizations: 'addition/getOrganizations',
    setManager: 'org/setManager',
    getManager: 'org/getManager',
    getNotificationsTypes: 'notifications/getNotificationsTypes',
  }),
  regionSelect(item) {
      this.form.region.push(item)
      // Берем географию
      this.getRegions({ exclude: this.form.region, filter: '' }).then(() => {
        this.regions_all = this.regions.map(function (el) {
          return { name: el.label, code: el.key }
        })
      })
      this.search.region = ''
    },
    unActivateRegion(){
      setTimeout(() => (this.search.regionSuggestionsShow = false), 250)
    },
    regionDel(index) {
      this.form.region.splice(index, 1)
      this.getRegions({ exclude: this.form.region, filter: '' }).then(() => {
        this.regions_all = this.regions.map(function (el) {
          return { name: el.label, code: el.key }
        })
      })
    },
    citySelect(item) {
      this.form.city.push(item)
      // Берем географию
      this.getCities({ exclude: this.form.city, filter: '' }).then(() => {
        this.city_all = this.cities.map(function (el) {
          return { name: el.label, code: el.key }
        })
      })
      this.search.city = ''
    },
    unActivateCity(){
      setTimeout(() => (this.search.citySuggestionsShow = false), 250)
    },
    cityDel(index) {
      this.form.city.splice(index, 1)
      this.getCities({ exclude: this.form.city, filter: '' }).then(() => {
        this.city_all = this.cities.map(function (el) {
          return { name: el.label, code: el.key }
        })
      })
    },
    orgSelect(item) {
      this.form.org.push(item)
      // Берем географию
      this.getOrganizations({ exclude: this.form.org, filter: '' }).then(() => {
        this.organizations_all = this.organizations.map(function (el) {
          return { name: el.name, code: el.id }
        })
      })
      this.search.org = ''
    },
    unActivateOrg(){
      setTimeout(() => (this.search.orgSuggestionsShow = false), 250)
    },
    orgDel(index) {
      this.form.org.splice(index, 1)
      this.getOrganizations({ exclude: this.form.org, filter: '' }).then(() => {
        this.organizations_all = this.organizations.map(function (el) {
          return { name: el.label, code: el.key }
        })
      })
    },
    debounce(func, delay) {
      clearTimeout(this.searchPTimer)
      this.searchPTimer = setTimeout(func, delay)
    },
    formatPhone(event) {
      let value = event.target.value.replace(/\D/g, ""); // Удаляем все нецифровые символы
      this.errors.phone = ''
      if (value.length > 11) {
        value = value.slice(0, 11); // Ограничиваем ввод до 11 цифр
      }
      // Форматируем номер по маске: +X (XXX) XXX-XX-XX
      let formatted = "+";
      if (value.length > 0) formatted += value[0];
      if (value.length > 1) formatted += " (" + value.substring(1, 4);
      if (value.length > 4) formatted += ") " + value.substring(4, 7);
      if (value.length > 7) formatted += "-" + value.substring(7, 9);
      if (value.length > 9) formatted += "-" + value.substring(9, 11);
      this.form.phone = formatted;
    },
    formatPhoneInput(value) {
      value.replace(/\D/g, ""); // Удаляем все нецифровые символы
      let formatted = "";
      formatted += value[0];
      formatted += value[1];
      formatted += " (" + value.substring(2, 5);
      formatted += ") " + value.substring(5, 8);
      formatted += "-" + value.substring(8, 10);
      formatted += "-" + value.substring(10, 12);
      return formatted;
    },
    validatePhone(phone) {
      const regex = /^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
      return regex.test(phone);
    },
    validateEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    },
    editStaff(){
      let error = 0
      //let phone = this.formatPhoneInput(this.form.phone)
      if (!this.validatePhone(this.form.phone)) {
        this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Некорректный номер телефона', life: 3000 });
        this.errors.phone = 'Введите корректный номер телефона'
        error++
      }
      if(this.form.name == ''){
          this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Укажите ФИО сотрудника', life: 3000 });
          this.errors.name = 'Введите ФИО сотрудника'
          error++
      }
      if (!this.validateEmail(this.form.email)) {
            this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Укажите Email сотрудника', life: 3000 });
            this.errors.email = 'Введите корректный Email сотрудника'
            error++
      }

      if(error > 0){
        return
      }else{
            if(this.form.global == 1){
              this.form.city = []
              this.form.region = []
              this.form.org = []
            }
            this.setManager({
              data: this.form,
            }).then(() => {
              this.getManager({
                manager_id: this.$route.params.manager_id
              })
              this.$toast.add({ severity: 'success', summary: 'Данные сотрудника отредактированы!', detail: 'Вы успешно отредактировали карточку сотрудника', life: 3000 });
              this.$router.push({ name: 'profileStuff', params: { id: this.$route.params.id } })

            })
          }





    },
  },
  computed: {
    ...mapGetters({
      regions: 'addition/regions',
      cities: 'addition/cities',
      organizations: 'addition/organizations',
      manager: 'org/manager',
      notifications_types: 'notifications/notifications_types',
    })
  },
  watch: {
    manager: function(newVal){
      this.form = this.newVal
      this.getRegions({ exclude: this.form.region, filter: '' }).then(() => {
      this.regions_all = this.regions.map(function (el) {
        return { name: el.label, code: el.key }
      })
    })
    this.getCities({ exclude: this.form.city, filter: '' }).then(() => {
      this.cities_all = this.cities.map(function (el) {
        return { name: el.label, code: el.key }
      })
      this.loading = false
    })
    this.getOrganizations({ exclude: this.form.org, filter: '' }).then(() => {
      this.organizations_all = this.organizations.map(function (el) {
        return { name: el.name, code: el.id }
      })
    })
    },
    regions: function (newVal) {
      this.regions_all = newVal.map(function (el) {
        return { name: el.label, code: el.key }
      })
    },
    cities: function (newVal) {
      this.city_all = newVal.map(function (el) {
        return { name: el.label, code: el.key }
      })
    },
    organizations: function (newVal) {
      this.organizations_all = newVal.map(function (el) {
        return { name: el.name, code: el.id, image: el.image }
      })
    },
    'search.region': function (newVal, oldVal) {
      if (newVal.length < 3 && oldVal.length < newVal.length) {
        return
      }
      if (newVal.length < 3) {
        newVal = ''
      }
      this.debounce(() => {
        this.getRegions({ exclude: this.form.region, filter: newVal }).then(() => {
          this.regions_all = this.regions.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }, 300)
    },
    'search.city': function (newVal, oldVal) {
      if (newVal.length < 3 && oldVal.length < newVal.length) {
        return
      }
      if (newVal.length < 3) {
        newVal = ''
      }
      this.debounce(() => {
        this.getCities({ exclude: this.form.city, filter: newVal }).then(() => {
          this.city_all = this.cities.map(function (el) {
            return { name: el.label, code: el.key }
          })
        })
      }, 300)
    },
    'search.org': function (newVal, oldVal) {
      if (newVal.length < 3 && oldVal.length < newVal.length) {
        return
      }
      if (newVal.length < 3) {
        newVal = ''
      }
      this.debounce(() => {
        this.getOrganizations({ exclude: this.form.org, filter: newVal }).then(() => {
          this.organizations_all = this.organizations.map(function (el) {
            return { name: el.name, code: el.id }
          })
        })
      }, 300)
    },
  },

}
</script>

<style lang="scss">
  .lk-staff-create__header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  .lk-staff-edit__operator-search:after{
    content: "\e01d";
    font-family: 'Iconly';
    position: relative;
    display: block;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 9px;
    font-size: 18px;
  }

  .lk-staff-edit__regions .d-search .d-search__suggestions {
    top: 36px;
    left: 2px;
    padding: 20px 4px 10px 4px !important;
    //z-index: 0;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
    background: #ededed;
    max-height: 500px;
    overflow-y: scroll;
    width: fit-content;
    min-width: 560px;
}
.lk-staff-edit__regions:first-child .lk-staff-edit__operator-search{
    z-index:6;
}
.lk-staff-edit__regions:first-child .d-search .d-search__suggestions{
    z-index:5;
}
.lk-staff-edit__regions:nth-child(2) .lk-staff-edit__operator-search{
    z-index:4;
}
.lk-staff-edit__regions:nth-child(2) .d-search .d-search__suggestions{
    z-index:3;
}
.lk-staff-edit__regions:last-child .lk-staff-edit__operator-search{
    z-index:2;
}
.lk-staff-edit__regions:last-child .d-search .d-search__suggestions{
    z-index:1;
}
.lk-staff-edit__regions .chips{
  margin: 20px 0 16px;
}
.lk-staff-edit__regions-cont{
  padding-bottom: 40px;
  border-bottom: 0.5px solid rgba(117, 117, 117, 0.4588235294);
}
.lk-staff-edit__operator-notifications-wrapper{
  padding-top: 32px;
}
</style>
