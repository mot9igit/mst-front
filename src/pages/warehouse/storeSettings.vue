<template>
  <section class="warehouse-analysis" id="warehouse-analysis">
    <Toast />
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>

    <div class="warehouse-analysis__header">
      <h1 class="warehouse-analysis__header-title">Настройки склада</h1>
    </div>
    <div class="warehouse-analysis__header-storeinfo">
        <div class="warehouse-analysis__header-storeinfo-logo">
          <img :src="storeImage" />
        </div>
        <div class="warehouse-analysis__header-storeinfo-info">
          <div class="warehouse-analysis__header-storeinfo-info-name">{{ storeName }}</div>
          <div class="warehouse-analysis__header-storeinfo-info-address"><i class="d-icon-location"></i><span>{{ storeAddress }}</span></div>
        </div>
    </div>
    <Loader v-if="loading" />
    <form @submit.prevent="saveSettings()">
      <div v-for="(item, index) in storeSettings" :key="index" class="lk-staff-edit__table warehouse-settings-table">
        <h3>{{ item.name }}</h3>
        <div v-for="(value, k) in item.settings" :key="k" class="lk-about__info">
          <div class="lk-about__info-title-wrapper" v-if="!value.hidden">
            <p class="lk-staff-edit__table-label">{{ value.label }}:</p>
          </div>
          <div class="d-input--cont" >
            <div class="d-input d-input--light lk-about__info-input" v-if="value.type == 1 && !value.hidden">
              <input
                type="text"
                v-model="this.form[value.key]"
                :placeholder="value.value.name"
                :name="value.key"
                class="d-input__field lk-about__info-input-field"
                @input="formatPhone"
                @focus="errors[value.key] = ''"
              />
            </div>
              <SelectInput
                v-else-if="value.type == 2 && !value.hidden"
                v-model="this.form[value.key]"
                :options="this.selects"
                optionLabel="name"
                :id="value.key"
                class="d-input__field lk-about__info-input-field"
              />
              <Checkbox
                v-else-if="value.type == 3 && !value.hidden"

                v-model="this.form[value.key]"
                :binary="true"
                :inputId="value.key"
                :name="value.key"
                :value="value.value"
              />
              <DatePicker
                v-else-if="value.type == 8 && !value.hidden"
                v-model="this.form[value.key]"
                dateFormat="dd.mm.yy"
                placeholder="Выберите дату прихода"
                :manualInput="false"
                :minDate="now"
                :autocomplete="now"
                @focus="errors[value.key] = ''"
                showIcon
              />
              <div class="d-input d-input--light lk-about__info-input" v-if="value.type == 4 && !value.hidden">
                <input
                  type="number"
                  v-model="this.form[value.key]"
                  :placeholder="value.value.name"
                  :name="value.key"
                  class="d-input__field lk-about__info-input-field"
                  @input="formatPhone"
                  @focus="errors[value.key] = ''"
                />
              </div>

            <div class="d-input-error" v-if="errors[value.key]">
              <i class="d-icon-warning d-input-error__icon"></i>
              <span class="d-input-error__text">
                {{ errors[value.key] }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="lk-about__submit-container">
        <button
      class="d-button d-button-primary d-button--no-shadow lk-staff__header-button"
      type="submit"
      >
        <i class="d-icon-plus-flat lk-staff__header-button-icon"></i>
        Сохранить настройки
      </button>
      </div>

    </form>


  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'
import { Checkbox } from 'primevue'
import DatePicker from 'primevue/datepicker'
import SelectInput from "primevue/dropdown";
import Toast from 'primevue/toast'

export default {
  name: 'storeSettings',
components: { Breadcrumbs, Loader, SelectInput, Checkbox, DatePicker, Toast },
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25,
    },
    pagination_offset: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: true,

      storeName: '',
      storeImage: null,
      storeAddress: '',
      now: new Date(),
      storeSettings: {},
      selects: [],
      form: {},
      errors: [],

		}
  },
  mounted() {
    this.getOrgStore().then(() => {
      this.loading = false
      this.storeSettings = this.orgStore.settings.groups
      this.getOptPrises()
      const groupKeys = Object.keys(this.storeSettings);
      let in_ship = ''
          for (let i = 0; i < groupKeys.length; i++) {
            const keys = Object.keys(this.storeSettings[groupKeys[i]].settings)
            for (let j = 0; j < keys.length; j++) {
              if(this.storeSettings[groupKeys[i]].settings[keys[j]].key == 'in_ship'){
                in_ship = Number(this.storeSettings[groupKeys[i]].settings[keys[j]].value)
                console.log(in_ship)
              }
            }
          }
          for (let i = 0; i < groupKeys.length; i++) {
            const keys = Object.keys(this.storeSettings[groupKeys[i]].settings)
            for (let j = 0; j < keys.length; j++) {
              if(this.storeSettings[groupKeys[i]].settings[keys[j]].properties == '{"visible":{"in_ship":1}}'){
                this.storeSettings[groupKeys[i]].settings[keys[j]].hidden = Boolean(!in_ship)
              }
            }

          }
    })

  },
  computed: {
    ...mapGetters({
      orgStore: 'org/orgStore',
      optPrices: 'org/optPrices'
    })
  },
  methods: {
    ...mapActions({
      getOrgStore: 'org/getOrgStore',
      getOptPrises: 'org/getOptPrises',
      setOrgSettings: 'org/setOrgSettings'
    }),
    saveSettings() {
			this.errors = []
      if(this.form.in_ship == true){
        if(this.form.shipping_date == 0){
          this.errors.shipping_date = 'Заполните дату прихода товара на удаленный склад!'
        }
        if(this.form.value_in_product_card == 0){
          this.errors.value_in_product_card = 'Заполните значение в карточке товара!'
        }
      }else{
        this.form.shipping_date = 0
        this.form.value_in_product_card = 0
        this.form.shipping_delay = 0
      }
      if(this.errors.length == 0){
        this.loading = true
        this.$load(async () => {
          await this.setOrgSettings({
            settings: this.form,
          })
            .then((result) => {
              this.loading = false;
              this.$toast.add({
                severity: "info",
                summary: "Данные изменены",
                detail: "Данные были успешно изменены",
                life: 3000,
              });
              this.getOrgStore();
            })
            .catch((result) => {
              console.log(result);
            });
        });
      }else{
        return
      }

		},

  },
  watch: {

    orgStore: function(newVal) {
          this.storeName = newVal.name_short
          this.storeImage = newVal.image
          this.storeAddress = newVal.address


          const settings = JSON.parse(JSON.stringify(newVal.settings));
          const groupKeys = Object.keys(settings.groups);
          for (let i = 0; i < groupKeys.length; i++) {
            const keys = Object.keys(settings.groups[groupKeys[i]].settings);
            for (let j = 0; j < keys.length; j++) {
              if (settings.groups[groupKeys[i]].settings[keys[j]].type === "2") {
                this.form[settings.groups[groupKeys[i]].settings[keys[j]].key] =
                  settings.groups[groupKeys[i]].settings[keys[j]].value;
              } else if (settings.groups[groupKeys[i]].settings[keys[j]].type === "3") {
                if (settings.groups[groupKeys[i]].settings[keys[j]].value === "1" || settings.groups[groupKeys[i]].settings[keys[j]].value === "8" ) {
                  this.form[
                    settings.groups[groupKeys[i]].settings[keys[j]].key
                  ] = true;
                } else {
                  this.form[
                    settings.groups[groupKeys[i]].settings[keys[j]].key
                  ] = false;
                }
              } else {
                this.form[settings.groups[groupKeys[i]].settings[keys[j]].key] =
                  settings.groups[groupKeys[i]].settings[keys[j]].value;
              }
            }
          }
    },
    optPrices: function (newVal) {
			this.selects = [];
			for (let i = 0; i < newVal.length; i++) {
				this.selects.push({ key: newVal[i].guid, name: newVal[i].name });
			}
		},
    'form.in_ship': function (newVal) {
          const groupKeys = Object.keys(this.storeSettings);
          for (let i = 0; i < groupKeys.length; i++) {
            const keys = Object.keys(this.storeSettings[groupKeys[i]].settings)
            for (let j = 0; j < keys.length; j++) {
              if(this.storeSettings[groupKeys[i]].settings[keys[j]].properties == '{"visible":{"in_ship":1}}'){
                this.storeSettings[groupKeys[i]].settings[keys[j]].hidden = !newVal
              }
            }

          }
    }

  }
}
</script>
<style lang="scss">
.warehouse-settings-table h3{
  font-size: 22px;
}
.warehouse-settings-table .lk-about__info {
    border-bottom: none;
}
.warehouse-settings-table.lk-staff-edit__table {
  border-bottom: 0.5px solid #75757575;
  padding-bottom: 8px;
}
.warehouse-settings-table .p-datepicker{
  width: 100%;
}
</style>
