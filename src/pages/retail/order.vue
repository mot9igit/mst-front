<template>
    <div>
  <div class="d-top">
    <a class="d-back d-top-back">
      <i class="d-icon-arrow d-back__icon d-top-back-icon"></i>
      <span class="d-back__text">Назад</span>
    </a>
      <Breadcrumbs />
  </div>
  <div class="d-top-order-container">
  <div class="d-top-order-container-left">
    <div>
      <h2>Заказ номер</h2>
      <div class="d-top-order-container-date-created">Дата заказа</div>
    </div>
    <div class="d-badge2 d-badge2--fit d-button--sm-shadow order-card__status">Cтатус заказа</div>
  </div>
  <div class="d-top-order-container-right">
    <div class="d-top-order-container-buttons-text"><p>Убедитесь, что товар есть в наличии и подготовьте его к отправке.</p></div>
    <div class="d-top-order-container-buttons">
    <button  class="d-button d-button-primary d-button-primary-small d-button--sm-shadow  order-card__action">
      <span class="catalog__head-item-text">Подтвердить заказ</span>
		</button>
    </div>
  </div>
  </div>
  <div class="d-top-order-container-info">
      <h3>Информация о заказе</h3>
      <div class="order-card__orderinfo">
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">ФИО покупателя</div>
          <div class="order-card__orderinfo-grid-text">Данные</div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Адрес доставки</div>
          <div class="order-card__orderinfo-grid-text">Данные</div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Номер телефона</div>
          <div class="order-card__orderinfo-grid-text">Данные</div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Email</div>
          <div class="order-card__orderinfo-grid-text">Данные</div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Транспортная компания</div>
          <div class="order-card__orderinfo-grid-text">Данные</div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Тип доставки</div>
          <div class="order-card__orderinfo-grid-text">Данные</div>
        </div>
      </div>

  </div>
  <div class="d-order-container">
    <h3>Состав заказа</h3>
  <Loader v-if="loading" />
  <BaseTable v-else/>
  </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'RetailOrder',
  components: { Breadcrumbs, BaseTable, Loader },
}
</script>
<style lang="scss" scoped>

</style>

