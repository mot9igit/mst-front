<template>
  <section class="balance">
  <div class="balance__header">
      <Breadcrumbs />

			<div class="balance-info__container">
				<div class="balance-info__button-wrapper">
					<div class="balance-info__value-container">
						<div class="balance-info__label">Ваш баланс навсегда</div>
						<div class="balance-info__value">0 ₽</div>
            <button
						type="button"
						href="#"
						class="d-button d-button-primary d-button-primary-small d-button--sm-shadow balance-info__button"
						@click.prevent=""
					  >
            <i data-v-0f783535="" class="item-list-item-icon d-icon-wallet"></i>
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


					</div>

			</div>
			<div class="balance__table-accordion">
			 <h3>История заказов</h3>
					<div class="panel-widget">


					</div>
				</div>

		</div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'RetailBalance',
  components: { Breadcrumbs, BaseTable, Loader },
}
</script>
<style lang="scss">
.balance-info__container{
  display: flex;
  align-items: center;
  justify-content: start;
  width:100%;
  height:auto;
  min-height: 195px;
  background: #FBFBFB;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
  margin-top: 40px;
}
.balance-info__button-wrapper{
  width:17.7%;
  max-width: 269px;
  border-right: 0.5px solid #75757575;
  height: 100%;
  min-height: 195px;
}

.balance-info__value-container{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  width:fit-content;
  height:100%;
  min-height: 195px;
  margin-left: 32px;
}
.balance-info__value-container .d-button{
  width:100%;
  gap: 8px;
  font-size: 16px;
}
.balance-info__label{
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #757575;

}
.balance-info__value{
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 42px;
  align-items: center;
  letter-spacing: -0.01em;
  color: #282828;
  margin: 8px 0 23px;

}
.balance-info__button-wrapper .d-button .item-list-item-icon{
  font-size:24px;
}
.balance-info__info-wrapper{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  width:fit-content;
  height:100%;
  min-height: 195px;
  margin-left: 56px;
}
.balance-info__info-wrapper h3, .balance-info__index{
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
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
  font-size: 16px;
  line-height: 21px;
  color: #282828;
  margin-top: 16px;
}
.balance-info__item{
  padding:0 40px 21px 0;

}
.balance-info__item:not(:last-child){
  border-right: 0.5px solid #75757575;
}
.balance-info__item:first-child p{
  width: auto;
  max-width: 221px;
}
.balance-info__item:not(:first-child) p{
  width: auto;
  max-width: 388px;
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

</style>
