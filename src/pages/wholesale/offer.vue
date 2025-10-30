<template>
  <Toast/>
  <section class="shipments wholesaleoffer__content" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <Loader v-if="loading" />
    <div class="d-top-order-container">
      <div class="d-top-order-container-left">
        <div>
          <h2>Предложение № {{ this.$route.params.offer_id }}</h2>

          <div class="d-top-order-container-date-created">от {{ offer.date }}</div>
        </div>
        <div class="d-badge2 d-badge2--fit d-button--sm-shadow order-card__status" :style="
          'background-color: #' +
          status.color
        "
        v-if="(Object.keys(status).length != 0)"
      >
        {{ status.name }}</div>
      </div>
     <div class="d-top-order-container-right">
        <!-- <div class="d-top-order-container-buttons-text"><p>Убедитесь, что товар есть в наличии и подготовьте его к отправке.</p></div>-->
    <div class="d-top-order-container-buttons">

    <button
      v-if="status.api_key != 'offer_accept'"
      @click.prevent="cancelOffer()"
      class="d-button d-button-primary d-button-primary-small d-button--sm-shadow  order-card__action">
      <span class="catalog__head-item-text">Отозвать предложение</span>
		</button>
    <button
      v-if="status.api_key == 'offer_accept' && offer.order_id != 0"
      @click.prevent="routeToOrder(offer.order_id)"
      class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__docs">
      <span class="catalog__head-item-text">Перейти к заказу № {{ offer.order_id }}</span>
		</button>

    </div>
      </div>
    </div>
    <div class="d-top-order-container-info">
      <h3>Информация о заказе</h3>
      <div class="order-card__orderinfo dart-row">
        <div class="order-card__orderinfo-grid d-col-md-5">
          <div class="order-card__orderinfo-grid-lable">Сумма</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.offer?.cost != '' ? this.offer?.cost : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-5">
          <div class="order-card__orderinfo-grid-lable">Инициатор</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.offer?.initiator_org_name != '' ? this.offer?.initiator_org_name : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down">
            ({{ this.offer?.initiator_user_name != '' ? this.offer?.initiator_user_name : '' }})
          </div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-5">
          <div class="order-card__orderinfo-grid-lable">Покупатель</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.offer?.from_org_name != '' ? this.offer?.from_org_name : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text order-card__orderinfo-grid-text-nomarg">
            ИНН: {{ this.offer?.from_org_inn != '' ? this.offer?.from_org_inn : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down">
            <b>Магазин/склад:</b>
            {{ this.offer?.store_name != '' ? this.offer?.store_name : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-5">
          <div class="order-card__orderinfo-grid-lable">Дата окончания предложения</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.offer?.date_end != '' ? this.offer?.date_end  : '' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-4">
          <div class="order-card__orderinfo-grid-lable">Срок доставки</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.offer?.day_delivery != '' ? this.offer?.day_delivery : '?' }} дн.
          </div>
        </div>
      </div>
    </div>
    <div class="d-order-container">
      <h3>Состав заказа</h3>
      <Loader v-if="loading" />
      <BaseTable
        v-else
        :items_data="offer.products"
        :total="offer.products"
        :table_data="this.table_data"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
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
import Toast from 'primevue/toast'

export default {
  name: 'WholesaleOffer',
  components: { Breadcrumbs, BaseTable, Loader, Toast },
  data() {
    return {
      loading: true,
      page: 1,
      status: [],
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
  methods: {
  ...mapActions({
      getOffer: 'wholesale/getOffer',
      unsetOffer: 'wholesale/unsetOffer',
      deleteOffer: 'wholesale/deleteOffer',
    }),
    cancelOffer(){
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить предложение №' + this.offer.id + '?',
        header: 'Удаление предложение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading = true
          this.deleteOffer({offer_id: this.$route.params.offer_id}).then((response) => {
            if (response.data.data.success) {
              this.$toast.add({
                severity: 'success',
                summary: 'Удаление прошло успешно',
                life: 3000,
              })
                this.loading = false
                this.$router.push({ name: 'wholesaleOffers'})
            } else {
              this.loading = false
              this.$toast.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: response.data.data.message,
                life: 3000,
              })
            }
          })
        },
        reject: () => {
          this.$toast.add({
            severity: 'error',
            summary: 'Удаление предложения',
            detail: 'Действие отклонено',
            life: 3000,
          })
        },
      })
    },
    routeToOrder(order){
      this.$router.push({
        name: 'wholesaleOrder',
        params: {
          id: this.$route.params.id,
          order_id: order
        }})
    }

  },
  mounted() {
    this.getOffer({
      offer_id: this.$route.params.offer_id,
    }).then(() => (this.loading = false))
  },
  computed: {
    ...mapGetters({
      offer: 'wholesale/offer',
    }),
  },
  watch: {
    offer: function (newVal) {
      this.status.name = newVal.status_name
      this.status.color = newVal.status_color
      this.status.api_key = newVal.api_key
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
</style>
