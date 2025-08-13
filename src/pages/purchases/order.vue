<template>
  <section class="shipments" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <div class="d-top-order-container">
      <div class="d-top-order-container-left">
        <div>
          <h2>Заказ № {{ this.$route.params.order_id }}</h2>

          <div class="d-top-order-container-date-created">от {{ this.order.date }}</div>
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
          <div class="order-card__orderinfo-grid-lable">Поставщик</div>
          <div class="order-card__orderinfo-grid-text">{{ this.order.seller_name }}</div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Инициатор</div>
          <div class="order-card__orderinfo-grid-text">{{ this.order?.initiator_org_name }}</div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Покупатель</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.ur_persone?.name }}, ИНН:{{ this.order?.ur_persone?.inn }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Сумма</div>
          <div class="order-card__orderinfo-grid-text">{{ this.order.cost }}</div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Отсрочка</div>
          <div class="order-card__orderinfo-grid-text">{{ this.order.delay }}</div>
        </div>
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Срок доставки</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order.day_delivery }} дн. ({{ this.order.delivery_date }})
          </div>
        </div>
      </div>
    </div>
    <div class="d-order-container">
      <h3>Состав заказа</h3>
      <Loader v-if="loading" />
      <BaseTable
        v-else
        :items_data="optorder.products"
        :total="optorder.cost"
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
  name: 'purchasesOrder',
  components: { Breadcrumbs, BaseTable, Loader },
  data() {
    return {
      loading: true,
      page: 1,
      order: [],
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
      getOptOrder: 'purchases/getOptOrder',
      unsetOptOrder: 'purchases/unsetOptOrder',
    }),
  },
  mounted() {
    this.getOptOrder({
      order_id: this.$route.params.order_id,
    }).then(() => (this.loading = false))
  },
  computed: {
    ...mapGetters({
      optorder: 'purchases/optorder',
    }),
  },
  watch: {
    optorder: function (newVal) {
      this.order = newVal
    },
  },
}
</script>

<style lang="scss"></style>
