<template>
  <Toast />
  <section class="shipments purchasesoffer__content" id="shipments">
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
        <div
          class="d-badge2 d-badge2--fit d-button--sm-shadow order-card__status"
          :style="'background-color: #' + status.color"
          v-if="Object.keys(status).length != 0"
        >
          {{ status.name }}
        </div>
      </div>
      <div class="d-top-order-container-right">
        <!-- <div class="d-top-order-container-buttons-text"><p>Убедитесь, что товар есть в наличии и подготовьте его к отправке.</p></div>-->
        <div class="d-top-order-container-buttons">
          <button
            class="d-button d-button-primary d-button-primary-small d-button--sm-shadow order-card__action"
            @click.prevent="acceptOfferClick"
            v-if="status.acceptable == 1"
          >
            <span class="catalog__head-item-text">Принять предложение</span>
          </button>
          <button
            class="d-button d-button-tertiary d-button-tertiary-small d-button--sm-shadow order-card__action"
            @click.prevent="cancelOfferClick"
            v-if="status.cancelable == 1"
          >
            <span class="catalog__head-item-text">Отклонить</span>
          </button>
          <button
            v-if="status.api_key == 'offer_accept' && offer.order_id != 0"
            @click.prevent="routeToOrder(offer.order_id)"
            class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__docs"
          >
            <span class="catalog__head-item-text">Перейти к заказу № {{ offer.order_id }}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="d-top-order-container-info">
      <h3>Информация о заказе</h3>
      <div class="order-card__orderinfo order-card__orderinfo-line1">
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Сумма</div>
          <div class="order-card__orderinfo-grid-text nowrap">
            {{ this.offer?.cost != '' ? this.offer?.cost : '-' }}
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Инициатор</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.offer?.initiator_org_name != '' ? this.offer?.initiator_org_name : '' }}
          </div>
          <div
            class="order-card__orderinfo-grid-text-down order-card__orderinfo-grid-text-down-min"
          >
            ({{ this.offer?.initiator_user_name != '' ? this.offer?.initiator_user_name : '' }})
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Поставщик</div>
          <div class="order-card__orderinfo-grid-text" v-if="this.offer?.seller_name">
            {{ this.offer?.seller_name != '' ? this.offer?.seller_name : '' }} ИНН:
            {{ this.offer?.seller_inn != '' ? this.offer?.seller_inn : '-' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down" v-if="this.offer?.seller_name">
            <b>Склад {{ this.offer?.seller_w_id ? ' #' + this.offer?.seller_w_id : '' }}</b>
            <p>{{ this.offer?.seller_w_address ? this.offer?.seller_w_address : '' }}</p>
          </div>
          <div v-else></div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Покупатель</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.offer?.buyer_name != '' ? this.offer?.buyer_name : '' }} ИНН:
            {{ this.offer?.buyer_inn != '' ? this.offer?.buyer_inn : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down">
            <b>Склад {{ this.offer?.buyer_w_id ? ' #' + this.offer?.buyer_w_id : '' }}</b>
            <p>{{ this.offer?.buyer_w_address ? this.offer?.buyer_w_address : '' }}</p>
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Отсрочка</div>
          <div class="order-card__orderinfo-grid-text" v-if="this.offer?.delay_text">
            {{ this.offer?.delay_text }}
          </div>
          <div class="order-card__orderinfo-grid-text" v-else>
            {{
              this.offer?.delay != '' && Number.parseInt(this.offer?.delay) != 0
                ? Number.parseInt(this.offer?.delay)
                  ? this.offer?.delay + 'дн.'
                  : this.offer?.delay
                : '0дн.'
            }}
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Оплата доставки</div>
          <div class="order-card__orderinfo-grid-text">{{ this.offer?.payer }}</div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Срок доставки</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.offer?.day_delivery }}дн. ({{ this.offer?.delivery_date }})
          </div>
        </div>
      </div>
      <div class="order-card__orderinfo order-card__orderinfo-line2">
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Отсрочка</div>
          <div class="order-card__orderinfo-grid-text" v-if="this.offer?.delay_text">
            {{ this.offer?.delay_text }}
          </div>
          <div class="order-card__orderinfo-grid-text" v-else>
            {{
              this.offer?.delay != '' && Number.parseInt(this.offer?.delay) != 0
                ? Number.parseInt(this.offer?.delay)
                  ? this.offer?.delay + 'дн.'
                  : this.offer?.delay
                : '0дн.'
            }}
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Оплата доставки</div>
          <div class="order-card__orderinfo-grid-text">{{ this.offer?.payer }}</div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Срок доставки</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.offer?.day_delivery }}дн. ({{ this.offer?.delivery_date }})
          </div>
        </div>

        <div class="order-card__ordercomment">
          <div class="order-card__ordercomment-container" v-if="offer.comment">
            <div class="order-card__orderinfo-grid-lable">Комментарий:</div>
            <div v-html="offer.comment"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-order-container">
      <h3>Состав заказа</h3>
      <BaseTable
        v-if="!loading"
        :items_data="offer.products"
        :total="offer.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        @paginate="paginate"
        @saleModal="saleModal"
      />
      <MinProductTable
        v-if="!loading"
        :items_data="offer.products"
        :total="offer.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        @paginate="paginate"
        @saleModal="saleModal"
      />
    </div>
    <Teleport to="body">
      <customModal
        v-model="modalActiveActions"
        class="product-card-actions__modal-all product-card-actions-product__modal-all"
      >
        <saleWindow :product="productOrder" :orderInfo="orderInfo"></saleWindow>
        <button
          class="d-button d-button-primary d-button-primary-small d-button--sm-shadow product-card-actions-product__modal-all-button"
          @click.prevent="modalActiveActions = false"
        >
          Ok
        </button>
      </customModal>
    </Teleport>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'
import Toast from 'primevue/toast'
import saleWindow from './ui/activeSalesWindow.vue'
import customModal from '@/shared/ui/Modal.vue'
import MinProductTable from '@/shared/ui/tableMinProduct/table.vue'

export default {
  name: 'purchasesOffer',
  components: {
    Breadcrumbs,
    BaseTable,
    Loader,
    customModal,
    Toast,
    MinProductTable,
    saleWindow,
  },
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
          label: 'Наименование',
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
        rrc_discount: {
          label: 'Скидка от РРЦ в %',
          type: 'text',
          class: 'cell_centeralign',
        },
        actions: {
          label: 'Примененные акции',
          type: 'sales',
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
      modalActiveActions: false,
      productOrder: [],
      orderInfo: {},
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
  emits: ['toggleOrder'],
  methods: {
    ...mapActions({
      getOffer: 'purchases/getOffer',
      unsetOffer: 'purchases/unsetOffer',
      acceptOfferReview: 'offer/acceptOfferReview',
      acceptOffer: 'purchases/acceptOffer',
      cancelOffer: 'purchases/cancelOffer',
      getBasket: 'basket/getBasket',
    }),
    paginate(data) {
      this.loading = true
      this.unsetOffer()
      this.page = data.page
      data.offer_id = this.$route.params.offer_id

      this.getOffer(data).then(() => {
        this.loading = false
      })
    },
    saleModal(data) {
      this.modalActiveActions = true
      this.productOrder = data
    },
    acceptOfferClick() {
      this.$confirm.require({
        message: 'Товары из предложения №' + this.offer.id + ' будут добавлены в вашу корзину',
        header: 'Принять предложение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading = true
          this.acceptOfferReview({
            offer_id: this.offer.id,
            store_id: this.basketWarehouse,
          }).then((res) => {
            if (res.data.data) {
              this.$confirm.require({
                message: res.data.data,
                header: 'Принять предложение',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                  this.acceptOffer({
                    offer_id: this.$route.params.offer_id,
                  }).then((response) => {
                    if (response.data.success) {
                      this.$toast.add({
                        severity: 'success',
                        summary: 'Предложение добавлено в корзину',
                        life: 3000,
                      })
                      this.getOffer({
                        offer_id: this.$route.params.offer_id,
                      })
                      this.getBasket().then(() => {
                        this.$emit('toggleOrder')
                        this.loading = false
                      })
                    } else {
                      this.loading = false
                      this.$toast.add({
                        severity: 'error',
                        summary: 'Ошибка',
                        detail: 'Произошла ошибка',
                        life: 3000,
                      })
                    }
                  })
                },
                reject: () => {
                  this.$toast.add({
                    severity: 'error',
                    summary: 'Принять предложение',
                    detail: 'Действие отклонено',
                    life: 3000,
                  })
                  this.loading = false
                },
              })
            } else {
              this.acceptOffer({
                offer_id: this.$route.params.offer_id,
              }).then((response) => {
                if (response.data.success) {
                  this.$toast.add({
                    severity: 'success',
                    summary: 'Предложение добавлено в корзину',
                    life: 3000,
                  })
                  this.getBasket().then(() => {
                    this.$emit('toggleOrder')
                    this.loading = false
                  })
                } else {
                  this.loading = false
                  this.$toast.add({
                    severity: 'error',
                    summary: 'Ошибка',
                    detail: 'Произошла ошибка',
                    life: 3000,
                  })
                }
              })
            }
          })
        },
        reject: () => {
          this.$toast.add({
            severity: 'error',
            summary: 'Принять предложение',
            detail: 'Действие отклонено',
            life: 3000,
          })
          this.loading = false
        },
      })
    },
    cancelOfferClick() {
      this.$confirm.require({
        message: 'Вы уверены, что хотите отклонить предложение №' + this.offer.id + '?',
        header: 'Отклонить предложение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading = true
          this.cancelOffer({
            offer_id: this.$route.params.offer_id,
          }).then((response) => {
            if (response.data.success) {
              this.$toast.add({
                severity: 'success',
                summary: 'Вы отклонили предложение',
                life: 3000,
              })
              this.getOffer({
                offer_id: this.$route.params.offer_id,
              }).then(() => (this.loading = false))
            } else {
              this.loading = false
              this.$toast.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: 'Произошла ошибка',
                life: 3000,
              })
            }
          })
        },
        reject: () => {
          this.$toast.add({
            severity: 'error',
            summary: 'Отклонение предложения',
            detail: 'Вы отменили отклонение',
            life: 3000,
          })
        },
      })
    },
    routeToOrder(order) {
      this.$router.push({
        name: 'purchasesOrder',
        params: {
          id: this.$route.params.id,
          order_id: order,
        },
      })
    },
  },
  mounted() {
    this.getOffer({
      offer_id: this.$route.params.offer_id,
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.loading = false
      this.orderInfo.seller_name = this.offer.seller_name
      this.orderInfo.seller_img = this.offer.seller_image
      this.orderInfo.delivery = this.offer.day_delivery
      this.orderInfo.payer = this.offer.payer
      this.orderInfo.delay_type = this.offer.delay_type
      this.orderInfo.delay = this.offer.delay
    })
  },
  computed: {
    ...mapGetters({
      offer: 'purchases/offer',
      cartCleaner: 'offer/cartCleaner',
      basketWarehouse: 'basket/basketWarehouse',
    }),
  },
  watch: {
    offer: function (newVal) {
      this.status.name = newVal.status_name
      this.status.color = newVal.status_color
      this.status.id = newVal.status
      this.status.api_key = newVal.api_key
      this.status.cancelable = newVal.cancelable
      this.status.acceptable = newVal.acceptable
      this.orderInfo.seller_name = this.offer.seller_name
      this.orderInfo.seller_img = this.offer.seller_image
      this.orderInfo.delivery = this.offer.day_delivery
      this.orderInfo.payer = this.offer.payer
      this.orderInfo.delay_type = this.offer.delay_type
      this.orderInfo.delay = this.offer.delay
    },
  },
}
</script>
<style></style>
