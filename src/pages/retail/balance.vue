<template>
  <section class="balance">
  <div class="balance__header">
      <Breadcrumbs />

			<div class="balance-info__container">
				<div class="balance-info__button-wrapper">
					<div class="balance-info__value-container">
						<div class="balance-info__label">Ваш баланс на {{ this.nowDate }}</div>
						<div class="balance-info__value">{{ orgActive.balance != '' ? orgActive.balance : '0'}} ₽</div>
            <button
						type="button"
						href="#"
						class="d-button d-button-primary d-button-primary-small d-button--sm-shadow balance-info__button"
						@click.prevent="this.modal_balance = true"
					  >
            <i class="item-list-item-icon d-icon-wallet"></i>
              Вывести
            </button>
					</div>
				</div>
        <div class="balance-info__info-wrapper">
          <h3>Как вывести средства с баланса:</h3>
          <ul class="balance-info">
            <li class="balance-info__item">
              <span class="balance-info__index">1</span>
              <p class="balance-info__text">Создайте заявку на вывод средств.</p>
            </li>
            <li class="balance-info__item">
              <span class="balance-info__index">2</span>
              <p class="balance-info__text">
                Получите и подпишите в ЭДО отчет комитенту и акт оказания услуг
                комиссионера.
              </p>
            </li>
            <li class="balance-info__item">
              <span class="balance-info__index">3</span>
              <p class="balance-info__text">
                Получите в течение <span style="color:#F92C0D">трех рабочих дней</span> выплату средств за реализованные
                товары за вычетом комиссии.
              </p>
            </li>
          </ul>
        </div>

			</div>
		</div>
		<div class="dart-row balance__main">
			<div class="balance__table-accordion">
				 <h3>История заявок</h3>
					<div class="panel-widget">
            <Loader v-if="loading" />
            <BaseTable v-else
              :items_data="balance_request.items"
              :total="balance_request.total"
              :pagination_items_per_page="this. pagination_items_per_page_balance_request"
              :pagination_offset="this.pagination_offset_balance_request"
              :page="this.page_balance_request"
              :table_data="this.table_data_balance_request"
              @paginate="paginate_balance_request"
            />
					</div>
			</div>
			<div class="balance__table-accordion">
			 <h3>История заказов</h3>
					<div class="panel-widget">
            <Loader v-if="loading" />
           <BaseTable v-else
              :items_data="balance.items"
              :total="balance.total"
              :pagination_items_per_page="this. pagination_items_per_page_balance"
              :pagination_offset="this.pagination_offset_balance"
              :page="this.page_balance"
              :table_data="this.table_data_balance"
              @paginate="paginate_balance"
            />
					</div>
				</div>
		</div>
  </section>

   <teleport to="body">
    <customModal v-model="this.modal_balance" @cancel="cancel" class="balance-form__modal">
      <div class="balance-info__value-container">
        <h2>Создание заявки</h2>
				<div class="balance-info__label">Доступная сумма для вывода:</div>
				<div class="balance-info__value">{{ orgActive.balance != '' ? orgActive.balance : '0'}} ₽</div>
        <div class="balance-info__label">Сумма для вывода:</div>
        <form class="balance-form__modal"  @submit.prevent="formSubmit()">
        <input
          type="number"
          min = "0"
          :max = "orgActive.balance"
          name="summEntered"
          class="modal__input balance-form__input"
          :class="{ 'd-input--error': v$.form.summEntered.$error }"
          placeholder="0"
          v-model="form.summEntered"
        />
        <div v-if="v$.form.summEntered.$error" class="d-input-error">
            {{ console.log(v$.form.summEntered) }}
            <i class="d-icon-warning d-input-error__icon"></i>
            <span v-if="v$.form.summEntered.required" class="d-input-error__text"
              >Пожалуйста, введите корректную сумму для вывода</span>
          </div>
        <button
						type="submit"
						href="#"
						class="d-button d-button-primary d-button-primary-small d-button--sm-shadow balance-info__button"
				>
          Ok
        </button>
      </form>
			</div>
    </customModal>
  </teleport>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export default {
  name: 'RetailBalance',
  components: { Breadcrumbs, BaseTable, Loader, customModal },
  data() {
		return {
      modal_balance: false,
      page_balance: 1,
      page_balance_request: 1,
      nowDate: '',
      form: {
        summEntered: '',
      },
      errors: [],
      table_data_balance: {
				date: {
					label: "Дата",
					type: "text",
				},
				type: {
					label: "Тип операции",
					type: "text",
				},
				value: {
					label: "Сумма",
					type: "text",
				},
				description: {
					label: "Основание",
					type: "text",
				},
			},
			table_data_balance_request: {
				date: {
					label: "Дата",
					type: "text",
				},
				id: {
					label: "Номер заявки",
					type: "text",
				},
				value: {
					label: "Сумма к получению",
					type: "text",
				},
				status: {
					label: "Статус",
					type: "status",
				},
			},
    }
  },
   props: {
    pagination_items_per_page_balance: {
      type: Number,
      default: 5,
    },
    pagination_offset_balance: {
      type: Number,
      default: 0,
    },
    pagination_items_per_page_balance_request: {
      type: Number,
      default: 5,
    },
    pagination_offset_balance_request: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    ...mapActions({
      getBalance: 'retail/getBalance',
      getBalanceRequest: 'retail/getBalanceRequest',
    }),
    paginate_balance(data) {
			this.page_balance = data.page;
			this.getBalance(data);
		},
		paginate_balance_request(data) {
			this.page_balance_request = data.page;
			this.getBalanceRequest(data);
		},
    getNow: function() {
      const date = new Date();
      let nowDay = date.getDate()
      nowDay = nowDay.toString().padStart(2, '0');
      let nowMonth = date.getMonth()+1
      nowMonth = nowMonth.toString().padStart(2, '0');
      let nowYear = date.getFullYear()
      this.nowDate = nowDay + '.' + nowMonth + '.' + nowYear;
    },
    clearField() {
      this.form.summEntered = ''
    },
    formSubmit(event) {
      this.v$.$touch() // Отмечаем все поля как проверенные
      if (this.v$.$invalid) {
        const errorMessage = this.getErrorMessages()
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: errorMessage,
          life: 3000,
        })
        return
      }

			//const result = !isNaN(this.costEntered) && this.costEntered > 0;

			//console.log('this.costEntered > orgActive.balance', Number(this.costEntered) > Number(this.orgActive.balance))
			//console.log(Number(this.costEntered), Number(this.orgActive.balance))

			//if(Number(this.costEntered) > Number(this.orgActive.balance)){
			//	this.$v.add({ severity: 'error', summary: 'Ошибка', detail: "Вы ввели не корректную сумму для вывода!", life: 3000 });
			//	return;
			//}

			//if (!result) {
			//	console.log(result);
			//	return;
			//}
		},

  },
  mounted() {
    this.getBalance({
      page: this.page_balance,
      perpage: this.pagination_items_per_page_balance,
    }).then(() => {
      this.loading = false
    })
    this.getBalanceRequest({
      page: this.page_balance_request,
      perpage: this.pagination_items_per_page_balance_request,
    }).then(() => {
      this.loading = false
    }),
    setInterval(this.getNow, 100);
  },
  computed: {
    ...mapGetters({
      balance: 'retail/balance',
      balance_request: 'retail/balance_request',
      orgActive: 'orgActive'
    }),
  },
  watch: {

  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      form: {
        summEntered: {
          required,
        },
      },
    }
  },
}
</script>

<style lang="scss">
.balance-info__container{
  display: flex;
  align-items: center;
  justify-content: start;
  width:100%;
  height:auto;
  background: #FBFBFB;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
  margin-top: 40px;
}
.balance-info__button-wrapper{
  border-right: 0.5px solid #75757575;
  height: 100%;
}

.balance-info__value-container{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  width:fit-content;
  height:100%;
  margin: 0 32px;
}
.balance-info__value-container .d-button{
  width:100%;
  gap: 8px;
}
.balance-info__label{
  font-style: normal;
  font-weight: 400;
  color: #757575;

}
.balance-info__value{
  font-style: normal;
  font-weight: 600;
  align-items: center;
  letter-spacing: -0.01em;
  color: #282828;
  margin: 8px 0 23px;

}
.balance-info__info-wrapper{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  width:fit-content;
  height:100%;
  min-height: 195px;
  padding: 32px 32px 32px 56px;
}
.balance-info__info-wrapper h3, .balance-info__index{
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  color: #757575;
}
.balance-info{
  display: flex;
  justify-content: start;
  align-content: start;
  gap:40px;
  margin-top:16px;
}
.balance-info__text{
  font-style: normal;
  font-weight: 600;
  color: #282828;
  margin-top: 16px;
}
.balance-info__item:not(:last-child){
  padding-right:21px;

}
.balance-info__item:not(:last-child){
  border-right: 0.5px solid #75757575;
}
.balance__main{
  display: flex;
  justify-content: space-between;
  align-content: start;
  position:relative;
  gap:100px;
  margin-top:64px;
}
.balance__main:before{
  content: '';
  background-color: rgba(117, 117, 117, 0.4588235294);
  position: absolute;
  display: flex;
  top: 0;
  left: 50%;
  width: 0.5px;
  height: 100%;
}
.balance__main h3{
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 31px;
  color: #282828;
}
.panel-widget{
  width: 710px;
  height: 300px;
}
.balance-info__container{
  min-height: 195px;
}
.balance-info__value-container{
  min-height: 195px;
}
.balance-info__button-wrapper{
  min-width: 269px;
  width:18%;
  min-height: 195px;
}
.balance-info__label{
  font-size: 14px;
  line-height: 18px;
}
.balance-info__value{
  font-size: 32px;
  line-height: 42px;
}
.balance-info__value-container .d-button{
  font-size: 16px;
}
.balance-info__button-wrapper .d-button .item-list-item-icon{
  font-size:24px;
}
.balance-info__item:first-child p{
  width: auto;
  max-width: 221px;
}
.balance-info__item:not(:first-child) p{
  width: auto;
  max-width: 388px;
}
.balance-info__text{
  font-size: 16px;
  line-height: 21px;
}
.balance-info__info-wrapper h3, .balance-info__index{
  font-size: 14px;
}
.balance-form__modal .modal-content{
  max-width: 660px;
  padding-bottom: 0;
}
.balance-form__modal .modal-content h2{
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: -0.01em;
  color: #282828;
  margin-bottom: 30px;
}
.balance-form__modal .modal-content .balance-info__value-container{
  width:100%;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}
.balance-form__modal .modal-content .balance-info__value {
  padding: 16px 0 20px;
  border-bottom: 0.5px solid #75757575;
}
.balance-form__modal .modal-content .modal__input{
  margin-top: 16px;
}
.balance-form__modal .modal-content .d-button{
  max-width: 112px;
  margin: 40px auto 0
}
.balance-form__modal .modal-content input::-webkit-outer-spin-button,
.balance-form__modal .modal-content input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
@media (width <= 1920px) {
.balance-info__container{
  min-height: 195px;
}
.balance-info__value-container{
  min-height: 195px;
}
.balance-info__button-wrapper{
  min-width: 269px;
  width:18%;
  min-height: 195px;
}
.balance-info__label{
  font-size: 14px;
  line-height: 18px;
}
.balance-info__value{
  font-size: 32px;
  line-height: 42px;
}
.balance-info__value-container .d-button{
  font-size: 16px;
}
.balance-info__button-wrapper .d-button .item-list-item-icon{
  font-size:24px;
}
.balance-info__item:first-child p{
  width: auto;
  max-width: 221px;
}
.balance-info__item:not(:first-child) p{
  width: auto;
  max-width: 388px;
}
.balance-info__text{
  font-size: 16px;
  line-height: 21px;
}
.balance-info__info-wrapper h3, .balance-info__index{
  font-size: 14px;
}
}
@media (width <= 1024px) {
.balance__header .d-breadcrumbs{
  float: right;
  margin-bottom: 24px;
}
.balance-info__container{
  min-height: 153px;
}
.balance-info__value-container{
  min-height: 105px;
}
.balance-info__button-wrapper, .balance-info-wrapper{
  margin: 24px 0;
}
.balance-info__button-wrapper{
  min-width: 181px;
  width:24%;
  min-height: 83px;
}
.balance-info__label{
  font-size: 10px;
  line-height: 14px;
}
.balance-info__value{
  font-size: 20px;
  line-height: 24px;
}
.balance-info__value-container .d-button{
  font-size: 10px;
}
.balance-info__button-wrapper .d-button .item-list-item-icon{
  font-size:12px;
}
.balance-info__item:first-child p{
  width: auto;
  max-width: 102px;
}
.balance-info__item:nth-child(2) p{
  width: auto;
  max-width: 168px;
}
.balance-info__item:nth-child(3) p{
  width: auto;
  max-width: 199px;
}
.balance-info__info-wrapper h3, .balance-info__text{
  font-size: 10px;
  line-height: 13px;
}
 .balance-info__index{
  font-size: 12px;
}
.balance__main:before{
  display: none;
}
}


</style>
