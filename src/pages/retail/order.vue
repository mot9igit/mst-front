<template>
  <section class="shipments retailorders__content" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <div class="d-top-order-container" v-if="order.order">
      <div class="d-top-order-container-left">
        <div>
          <h2>Заказ № {{ this.$route.params.order_id }}</h2>

          <div class="d-top-order-container-date-created">от {{ order.order.createdon }}</div>
        </div>
        <div
          class="d-badge2 d-badge2--fit d-button--sm-shadow order-card__status"
          :style="'background-color: #' + order.order.status_color"
        >
          {{ order.order.status_name }}
        </div>
      </div>
      <div class="d-top-order-container-right">
        <div class="d-top-order-container-buttons-text">
          <p>Убедитесь, что товар есть в наличии и подготовьте его к отправке.</p>
        </div>
        <div class="d-top-order-container-buttons">
          <button
            class="d-button d-button-primary d-button-primary-small d-button--sm-shadow order-card__action"
          >
            <span class="catalog__head-item-text">Подтвердить заказ</span>
          </button>
        </div>
      </div>
    </div>
    <div class="d-top-order-container-info">
      <h3>Информация о заказе</h3>
      <div class="order-card__orderinfo">
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Покупатель</div>
          <div class="order-card__orderinfo-grid-text">
            {{ order.order?.customer != '' ? order.order?.customer : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Адрес доставки</div>
          <div class="order-card__orderinfo-grid-text">
            {{
              order.order?.properties?.sl?.address != ''
                ? order.order?.properties?.sl?.address != null
                  ? order.order?.properties?.sl?.address
                  : '-'
                : '-'
            }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Номер телефона</div>
          <div class="order-card__orderinfo-grid-text">
            {{ order.order?.customer_phone != '' ? order.order?.customer_phone : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Email</div>
          <div class="order-card__orderinfo-grid-text">
            {{ order.order?.customer_email != '' ? order.order?.customer_email : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Транспортная компания</div>
          <div class="order-card__orderinfo-grid-text">
            {{ order.order?.tk != '' ? order.order?.tk : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Тип доставки</div>
          <div class="order-card__orderinfo-grid-text">
            {{ order.order?.delivery != '' ? order.order?.delivery : '-' }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-order-container">
      <h3>Состав заказа</h3>
      <Loader v-if="loading" />
      <BaseTable
        v-else
        :items_data="order.products"
        :total="order.products.length"
        :table_data="this.table_data"
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
  name: 'RetailOrder',
  components: { Breadcrumbs, BaseTable, Loader },
  data() {
    return {
      loading: true,
      page: 1,
      table_data: {
        image: {
          label: 'Фото',
          type: 'image',
          class: 'cell_centeralign',
        },
        name: {
          label: 'Название',
          type: 'text',
          class: 'cell_centeralign',
        },
        article: {
          label: 'Артикул',
          type: 'text',
          class: 'cell_centeralign',
        },
        price: {
          label: 'Стоимость за единицу',
          type: 'text',
          class: 'cell_centeralign',
        },
        count: {
          label: 'Количество',
          type: 'text',
          class: 'cell_centeralign',
        },
        summ: {
          label: 'Сумма',
          type: 'text',
          class: 'cell_centeralign',
        },
      },
    }
  },

  methods: {
    ...mapActions({
      getOrder: 'retail/getOrder',
      unsetOrder: 'retail/unsetOrder',
    }),
  },
  mounted() {
    this.getOrder({
      order_id: this.$route.params.order_id,
    }).then(() => (this.loading = false))
  },
  computed: {
    ...mapGetters({
      order: 'retail/order',
    }),
  },
  watch: {
    order: function (newVal) {
      console.log(newVal)
    },
  },
}
</script>
<style lang="scss" scoped></style>
