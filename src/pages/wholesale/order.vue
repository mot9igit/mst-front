<template>
  <section class="shipments optorder__content" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <Loader v-if="loading" />
    <div class="d-top-order-container">
      <div class="d-top-order-container-left">
        <div class="d-top-order-container-left-top">
          <h2>Заказ № {{ this.$route.params.order_id }}</h2>
          <div class="d-top-order-container-date-created-hidden d-top-order-container-date-created">
            от {{ this.order.date }}
          </div>
          <div
            class="d-badge2 d-badge2--fit order-card__status"
            :style="'background-color: #' + status.color"
            v-if="Object.keys(status).length != 0"
          >
            {{ status.name }}
          </div>
        </div>

        <div class="d-top-order-container-date-created">от {{ this.order.date }}</div>
      </div>
      <div class="d-top-order-container-right">
        <!-- <div class="d-top-order-container-buttons-text"><p>Убедитесь, что товар есть в наличии и подготовьте его к отправке.</p></div>-->
        <div class="d-top-order-container-buttons">
          <button
            class="d-button d-button-tertiary d-button-tertiary-small order-card__action order-card__docs"
            @click.prevent="modalDocs = true"
            v-if="docs.length"
          >
            <i class="item-list-item-icon d-icon-doc"></i>
            <span class="catalog__head-item-text"
              >Документы <span v-if="docs.length">({{ docs.length }})</span></span
            >
          </button>
          <!--<button  class="d-button d-button-primary d-button-primary-small d-button--sm-shadow  order-card__action">
            <span class="catalog__head-item-text">Подтвердить заказ</span>
          </button>-->
        </div>
      </div>
    </div>
    <div class="d-top-order-container-info">
      <h3>Информация о заказе</h3>
      <div class="order-card__orderinfo order-card__orderinfo-line1">
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Сумма</div>
          <div class="order-card__orderinfo-grid-text nowrap">
            {{ this.order?.cost != '' ? this.order?.cost : '-' }}
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Инициатор</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.initiator_org_name != '' ? this.order?.initiator_org_name : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down">
            ({{ this.order?.initiator_user_name != '' ? this.order?.initiator_user_name : '' }})
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Поставщик</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.seller_name != '' ? this.order?.seller_name : '' }} ИНН:
            {{ this.order?.seller_inn != '' ? this.order?.seller_inn : '-' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down">
            <b>Склад {{ this.order?.seller_w_id ? ' #' + this.order?.seller_w_id : '' }}</b
            ><br />
            <p>{{ this.order?.seller_w_address ? this.order?.seller_w_address : '' }}</p>
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Покупатель</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.buyer_name != '' ? this.order?.buyer_name : '' }} ИНН:
            {{ this.order?.ur_persone?.inn != '' ? this.order?.ur_persone?.inn : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down">
            <b>Склад {{ this.order?.buyer_w_id ? ' #' + this.order?.buyer_w_id : '' }}</b
            ><br />
            <p>{{ this.order?.buyer_w_address ? this.order?.buyer_w_address : '' }}</p>
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Отсрочка</div>
          <div class="order-card__orderinfo-grid-text" v-if="this.order?.delay_text">
            {{ this.order?.delay_text }}
          </div>
          <div class="order-card__orderinfo-grid-text" v-else>
            {{
              this.order?.delay != ''
                ? Number.parseInt(this.order?.delay)
                  ? this.order?.delay + ' дн.'
                  : this.order?.delay
                : '0 дн.'
            }}
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Оплата доставки</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.payer != '' ? this.order?.payer : '-' }}
          </div>
        </div>

        <div class="order-card__orderinfo-grid d-col-md-2">
          <div class="order-card__orderinfo-grid-lable">Срок доставки</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.day_delivery }}дн. ({{ this.order?.delivery_date }})
          </div>
        </div>
      </div>
      <div class="order-card__orderinfo order-card__orderinfo-line2">
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Отсрочка</div>
          <div class="order-card__orderinfo-grid-text" v-if="this.order?.delay_text">
            {{ this.order?.delay_text }}
          </div>
          <div class="order-card__orderinfo-grid-text" v-else>
            {{
              this.order?.delay != ''
                ? Number.parseInt(this.order?.delay)
                  ? this.order?.delay + ' дн.'
                  : this.order?.delay
                : '0 дн.'
            }}
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Оплата доставки</div>
          <div class="order-card__orderinfo-grid-text">{{ this.order?.payer }}</div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Срок доставки</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.day_delivery }}дн. ({{ this.order?.delivery_date }})
          </div>
        </div>

        <div class="order-card__ordercomment">
          <div class="order-card__ordercomment-container" v-if="order.comment">
            <div class="order-card__orderinfo-grid-lable">Комментарий:</div>
            <div v-html="order.comment"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-order-container">
      <h3>Состав заказа</h3>
      <BaseTable
        :items_data="order.products"
        :total="order.total_products"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        @paginate="paginate"
        @saleModal="saleModal"
      />
      <MinProductTable
        :items_data="order.products"
        :total="order.total_products"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        @paginate="paginate"
        @saleModal="saleModal"
      />
    </div>
    <Teleport to="body">
      <customModal v-model="modalDocs" class="order-card__modal">
        <h3>
          Документы <span v-if="docs.length">({{ docs.length }})</span>
        </h3>
        <BaseTable
          :items_data="docs"
          :total="docs.length"
          :table_data="table_docs"
          @clickElem="docClick"
        />
        <button
          class="d-button d-button-primary d-button-primary-small d-button--sm-shadow"
          @click.prevent="modalDocs = false"
        >
          Ok
        </button>
      </customModal>
      <customModal v-model="modalActiveActions" class="product-card-actions__modal-all product-card-actions-product__modal-all">
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
import MinProductTable from '@/shared/ui/tableMinProduct/table.vue'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import saleWindow from '@/pages/purchases/ui/activeSalesWindow.vue'

export default {
  name: 'WholesaleOrder',
  components: { Breadcrumbs, BaseTable, Loader, customModal, MinProductTable, saleWindow },
  data() {
    return {
      loading: true,
      page: 1,
      page_docs: 1,
      modalDocs: false,
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
          class: 'cell_centeralign nowrap',
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
          class: 'cell_centeralign nowrap',
        },
      },
      docs: [],
      table_docs: {
        name: {
          label: 'Название',
          type: 'text',
          class: 'cell_centeralign',
        },
        type: {
          label: 'Тип документа',
          type: 'text',
          class: 'cell_centeralign',
        },
        createdon: {
          label: 'Дата',
          type: 'text',
          class: 'cell_centeralign',
        },
        actions: {
          label: 'Скачать',
          type: 'actions',
          sort: false,
          class: 'cell_centeralign',
          available: {
            click: {
              icon: 'pi pi-download',
              label: 'Загрузить',
            },
          },
        },
      },
      modalActiveActions: false,
      productOrder: [],
      orderInfo: {}
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
      getOrder: 'wholesale/getOrder',
      unsetOrder: 'wholesale/unsetOrder',
    }),
    docClick(data) {
      let loc = data.filename
      var downloadLink = document.createElement('a')
      downloadLink.href = loc
      downloadLink.setAttribute('download', loc)
      downloadLink.setAttribute('target', '_blank')
      // console.log(downloadLink)
      downloadLink.click()
    },
    paginate(data) {
      this.loading = true
      this.unsetOrder()
      this.page = data.page
      ;(data.order_id = this.$route.params.order_id),
        this.getOrder(data).then(() => {
          this.loading = false
        })
    },
    saleModal(data){
      this.modalActiveActions = true
      this.productOrder = data
    },
  },
  mounted() {
    this.getOrder({
      page: this.page,
      perpage: this.pagination_items_per_page,
      order_id: this.$route.params.order_id,
    }).then(() => {
      this.loading = false
      this.orderInfo.seller_name = this.order.seller_name
      this.orderInfo.seller_img = this.order.seller_image
      this.orderInfo.delivery = this.order.day_delivery
      this.orderInfo.payer = this.order.payer
      this.orderInfo.delay_type = this.order.delay_type
      this.orderInfo.delay = this.order.delay
    })
  },
  computed: {
    ...mapGetters({
      order: 'wholesale/order',
    }),
  },
  watch: {
    order: function (newVal) {
      this.status = newVal.status
      this.docs = newVal.docs
      this.orderInfo.seller_name = newVal.seller_name
      this.orderInfo.seller_img = newVal.seller_image
      this.orderInfo.delivery = newVal.day_delivery
      this.orderInfo.payer = newVal.payer
      this.orderInfo.delay_type = newVal.delay_type
      this.orderInfo.delay = newVal.delay
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
.order-card__ordercomment-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.order-card__ordercomment {
  margin: 0px 9% 0px 0;
}
.product-card-actions-product__modal-all-button{
  margin: 40px auto 0;
}
.product-card-actions-product__modal-all .product-card__seller{
  cursor: auto;
}
.product-card-actions-product__modal-all .product-card__price-container-all{
  width: 100%;
}
@media (width <= 1280px) {
  .shipments.optorder__content .d-top-order-container {
    align-items: start;
  }
}
</style>
