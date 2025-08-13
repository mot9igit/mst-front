<template>
  <section class="shipments" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <div class="d-top-order-container">
      <div class="d-top-order-container-left">
        <div>
          <h2>Заказ № {{ this.$route.params.order_id }}</h2>

          <div class="d-top-order-container-date-created">от {{ order.date }}</div>
        </div>
        <!--<div class="d-badge2 d-badge2--fit d-button--sm-shadow order-card__status" :style="
          'background-color: #' +
          order.status_color
        "
      >
        {{ order.status_name }}</div>-->
      </div>
      <div class="d-top-order-container-right">
        <!-- <div class="d-top-order-container-buttons-text"><p>Убедитесь, что товар есть в наличии и подготовьте его к отправке.</p></div>
    <div class="d-top-order-container-buttons">
    <button  class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__docs">
      <i class="item-list-item-icon d-icon-doc"></i>
      <span class="catalog__head-item-text">Место под кнопку Документы или статус</span>
		</button>
    <button  class="d-button d-button-primary d-button-primary-small d-button--sm-shadow  order-card__action">
      <span class="catalog__head-item-text">Подтвердить заказ</span>
		</button>
    </div>-->
      </div>
    </div>
    <div class="d-top-order-container-info">
      <h3>Информация о заказе</h3>
      <div class="order-card__orderinfo">
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Покупатель</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.ur_persone?.name != '' ? this.order?.ur_persone?.name : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Адрес доставки</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.buyer_address != '' ? this.order?.buyer_address : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Номер телефона</div>
          <div class="order-card__orderinfo-grid-text">-</div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Email</div>
          <div class="order-card__orderinfo-grid-text">-</div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Транспортная компания</div>
          <div class="order-card__orderinfo-grid-text">-</div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Тип доставки</div>
          <div class="order-card__orderinfo-grid-text">-</div>
        </div>
      </div>
    </div>
    <div class="d-order-container">
      <h3>Состав заказа</h3>
      <Loader v-if="loading" />
      <BaseTable
        v-else
        :items_data="order.products"
        :total="order.cost"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        @paginate="paginate"
      />
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'WholesaleOrder',
  components: { Breadcrumbs, BaseTable, Loader },
  data() {
    return {
      loading: true,
      page: 1,
      table_data: {
        image: {
          label: 'Фото',
          type: 'image',
        },
        name: {
          label: 'Название',
          type: 'text',
        },
        article: {
          label: 'Артикул',
          type: 'text',
        },
        price: {
          label: 'Стоимость за единицу',
          type: 'text',
        },
        count: {
          label: 'Количество',
          type: 'text',
        },
        summ: {
          label: 'Сумма',
          type: 'text',
        },
      },
    }
  },

  methods: {
    ...mapActions({
      getOrder: 'wholesale/getOrder',
      unsetOrder: 'wholesale/unsetOrder',
    }),
  },
  mounted() {
    this.getOrder({
      order_id: this.$route.params.order_id,
    }).then(() => (this.loading = false))
  },
  computed: {
    ...mapGetters({
      order: 'wholesale/order',
    }),
  },
  watch: {
    order: function (newVal) {
      console.log(newVal)
    },
  },
}
</script>

<style lang="scss">
.d-badge2 {
  background: #282828;
  border-radius: 41px;
  padding: 3px 12px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #ededed;
  min-height: 24px;
  min-width: 146px;
}
.d-top-order-container-buttons-text {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: end;
  text-align: right;
  color: #75757575;
  width: 100%;
  margin-bottom: 10px;
}
.d-top-order-container-buttons-text p {
  max-width: 223px;
}
.d-top-order-container-date-created {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: #757575;
  margin-top: 16px;
}
.d-top-order-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px;
  width: 100%;
  height: auto;
  min-height: 145px;
  border-bottom: 0.5px solid #75757575;
}
.d-top-order-container-left {
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 16px;
  margin: 0px;
  width: auto;
  height: auto;
}
.order-card__status {
  margin-top: 8px;
}
.d-top-order-container-buttons {
  display: flex;
  align-items: end;
  justify-content: end;
  gap: 16px;
  margin: 0px;
  width: auto;
  height: auto;
}
.order-card__docs {
  padding: 8px 23px;
  gap: 8px;
}
.order-card__action {
  padding: 9px 23px;
}
.order-card__docs .item-list-item-icon {
  font-size: 24px;
  font-weight: 600;
}
.d-top-order-container-info {
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 0px;
  width: 100%;
  height: auto;
  min-height: 145px;
  border-bottom: 0.5px solid #75757575;
  flex-wrap: wrap;
}
.d-top-order-container-info h3,
.d-order-container h3 {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  color: #757575;
  margin: 32px 0;
}
.order-card__orderinfo {
  display: flex;
  position: relative;
  align-items: start;
  justify-content: space-between;
  margin: 0px;
  gap: 8px;
  width: 100%;
  height: auto;
}
.order-card__orderinfo-grid {
  margin-bottom: 26px;
  width: 100%;
  height: 100%;
  position: relative;
}
.order-card__orderinfo-grid:not(:last-child):before {
  content: '';
  background-color: rgba(117, 117, 117, 0.4588235294);
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  width: 0.5px;
  height: 56px;
}
.order-card__orderinfo-grid-lable {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #757575;
}
.order-card__orderinfo-grid-text {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #282828;
  margin-top: 16px;
}
</style>
