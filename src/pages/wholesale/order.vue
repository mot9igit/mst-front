<template>
  <div>
  <div class="d-top">
    <a class="d-back d-top-back">
      <i class="d-icon-arrow d-back__icon d-top-back-icon"></i>
      <span class="d-back__text">Назад</span>
    </a>
      <Breadcrumbs />
      {{ this.orderId }}
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
    <button  class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__docs">
      <i class="item-list-item-icon d-icon-doc"></i>
      <span class="catalog__head-item-text">Место под кнопку или статус</span>
		</button>
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
  <BaseTable v-else

  />
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'WholesaleOrder',
  components: { Breadcrumbs, BaseTable, Loader },
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
      page: 1,
      orderId: 0,
      order: [],
      filters: {
        name: {
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text',
        },
      },
      table_data: {
        id: {
          label: 'Номер',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
        },
        buyer: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
        },
        date: {
          label: 'Дата',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
        },
        cost: {
          label: 'Сумма',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
        },
        initiator: {
          label: 'Инициатор',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
        },
        ur_persone_name: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
          sort: true,
        },
        seller_w_name: {
          label: 'Магазин/Склад',
          type: 'link',
          link_to: 'wholesaleOrder',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id',
          },
        },
      },
    }
  },
  methods: {
    ...mapActions({
      getOrders: 'wholesale/getOrders',
      unsetOrders: 'wholesale/unsetOrders',
    }),
    filter(data) {
      console.log(data)
      this.loading = true
      this.unsetOrders()
      this.page = 1
      this.getOrders(data).then(() => {
        this.loading = false
      })
    },
    paginate(data) {
      this.loading = true
      this.unsetOrders()
      this.page = data.page
      this.getOrders(data).then(() => {
        this.loading = false
      })
    },
  },
  mounted() {
    this.getOrders({
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      orders: 'wholesale/orders',

    }),
  },
  watch: {

  },
}
</script>

<style lang="scss">
.d-badge2{
  background: #282828;
  border-radius: 41px;
  padding: 3px 12px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #EDEDED;
  min-height: 24px;
  min-width:146px;
}
.d-top-order-container-buttons-text{
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: end;
  text-align: right;
  color: #75757575;
  width:100%;
  margin-bottom:10px;
}
.d-top-order-container-buttons-text p{
  max-width: 223px;
}
.d-top-order-container-date-created{
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: #757575;
  margin-top: 16px;
}
.d-top-order-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px;
  width:100%;
  height:auto;
  min-height: 145px;
  border-bottom: 0.5px solid #75757575;
}
.d-top-order-container-left{
  display: flex;
  align-items: start;
  justify-content:start;
  gap: 16px;
  margin: 0px;
  width:auto;
  height:auto;
}
.order-card__status{
  margin-top: 8px;
}
.d-top-order-container-buttons{
  display: flex;
  align-items: end;
  justify-content:end;
  gap: 16px;
  margin: 0px;
  width:auto;
  height:auto;
}
.order-card__docs{
  padding: 8px 23px;
  gap: 8px;
}
.order-card__action{
  padding: 9px 23px;
}
.order-card__docs .item-list-item-icon{
  font-size:24px;
  font-weight:600;
}
.d-top-order-container-info{
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 0px;
  width:100%;
  height:auto;
  min-height: 145px;
  border-bottom: 0.5px solid #75757575;
  flex-wrap: wrap;
}
.d-top-order-container-info h3, .d-order-container h3{
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  color: #757575;
  margin: 32px 0;
}
.order-card__orderinfo{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px;
  gap: 8px;
  width:100%;
  height:auto;
}
.order-card__orderinfo-grid{
  margin-bottom: 26px;
  width:100%;
}
.order-card__orderinfo-grid:not(:last-child){
  border-right: 0.5px solid #75757575;
}
.order-card__orderinfo-grid-lable{
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #757575;

}
.order-card__orderinfo-grid-text{
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #282828;
  margin-top: 16px;
}
</style>
