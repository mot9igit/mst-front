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
            :class="status.api_key ? 'status-' + status.api_key : ''"
            v-if="Object.keys(status).length != 0"
          >
            {{ status.name }}
          </div>
        </div>

        <div class="d-top-order-container-date-created">от {{ this.order.date }}</div>
      </div>
      <div class="d-top-order-container-right">
        <!-- <div class="d-top-order-container-buttons-text"><p>Убедитесь, что товар есть в наличии и подготовьте его к отправке.</p></div>-->
        <button @click.prevent="toDownload" class="download-button">
          <i class="d-icon-upload2 d-select__arrow promotions__card-header-right-upload-icon"></i>
        </button>
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
          <router-link
            v-if="this.order?.offer_id && this.order?.initiator_org_id == this.$route.params.id"
            :to="{
              name: 'wholesaleOffer',
              params: {
                id: this.$route.params.id,
                offer_id: this.order.offer_id,
              },
            }"
          >
            <div class="order-card__orderinfo-grid-text">
              {{ this.order?.initiator_org_name != '' ? this.order?.initiator_org_name : '' }}
            </div>
            <div class="order-card__orderinfo-grid-text-down">
              ({{ this.order?.initiator_user_name != '' ? this.order?.initiator_user_name : '' }})
            </div>
          </router-link>
          <div v-else>
            <div class="order-card__orderinfo-grid-text">
              {{ this.order?.initiator_org_name != '' ? this.order?.initiator_org_name : '' }}
            </div>
            <div class="order-card__orderinfo-grid-text-down">
              ({{ this.order?.initiator_user_name != '' ? this.order?.initiator_user_name : '' }})
            </div>
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
  </section>
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
  name: 'WholesaleOrderInitiator',
  components: {
    Breadcrumbs,
    BaseTable,
    Loader,
    MinProductTable,
    customModal,
    saleWindow,
  },
  data() {
    return {
      loading: true,
      page: 1,
      status: [],
      orderInfo: {},
      modalActiveActions: false,
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
    refreshOrderPage: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions({
      getOrder: 'wholesale/getOrderInitiator',
      unsetOrder: 'wholesale/unsetOrderInitiator',
      downloadOrder: 'wholesale/downloadOrder',
    }),

    paginate(data) {
      this.loading = true
      this.unsetOrder()
      this.page = data.page
      ;(data.order_id = this.$route.params.order_id),
        this.getOrder(data).then(() => {
          this.loading = false
        })
    },
    saleModal(data) {
      this.modalActiveActions = true
      this.productOrder = data
    },
    toDownload() {
      this.loading = true
      this.downloadOrder({
        mode: 'initiator',
      }).then((response) => {
        this.loading = false
        if (response.data.data.filename) {
          this.loading = false
          let loc = response.data.data.filename
          var downloadLink = document.createElement('a')
          downloadLink.href = loc
          downloadLink.setAttribute('download', loc)
          downloadLink.setAttribute('target', '_blank')
          //console.log(downloadLink)
          downloadLink.click()
        } else {
          this.loading = false
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Не удалось скачать отчет!',
            life: 3000,
          })
        }
      })
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
      order: 'wholesale/order_initiator',
      seller_statuses: 'wholesale/seller_statuses',
    }),
  },
  watch: {
    order: function (newVal) {
      this.status = newVal.status
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
.order-card__cancel {
  width: 100%;
}
.p-select.order_change_status {
  width: auto;
  background-color: #ededed;
  border: none;
  border-radius: 20px;
  height: 40px;
  .p-select-label.p-placeholder {
    color: #282828;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    padding: 8px 8px 8px 16px;
    position: relative;
    span {
      padding-left: 8px;
    }
  }
  .p-select-label.p-placeholder:before {
    content: '\e079';
    font-family: 'Iconly';
    position: relative;
    font-size: 18px;
    width: 18px;
    height: 21px;
    font-weight: 400;
    transform: rotate(90deg);
    display: inline-block;
  }
  .p-select-label.p-placeholder:after {
    content: '';
    position: absolute;
    top: calc(50% - 4px);
    right: 0;
    width: 1px;
    height: 8px;
    background-color: #75757575;
    display: block;
    margin: 0;
    border-radius: 0;
  }
  .p-select-dropdown {
    color: #282828;
    width: 10px;
    margin: 0 16px 0 8px;
    .p-icon {
      width: 10px;
      height: 10px;
    }
  }
}
.order_change_status--option {
  display: flex;
  align-items: center;
  max-height: 48px;
  justify-content: start;
  .d-badge2 {
    margin-top: 0;
    height: 32px;
  }
}
.catalog__head-item-text {
  white-space: nowrap;
}
.order-card__docs-upload {
  width: 40px;
  max-width: 40px;
  min-width: 40px;
  padding: 8px;
  .d-icon {
    width: 18px;
    height: 18px;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.order-card__modal-docsupload {
  .modal__content {
    overflow-x: hidden;
  }
  h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    margin-bottom: 8px;
    letter-spacing: -0.01em;
    color: #282828;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;

    color: #757575;
  }
  .dropzone {
    display: block;
    border-radius: 6px;
  }
  .dart-dropzone__custom {
    padding: 0;
    i {
      height: 52px;
    }
  }
  .dropzone__message {
    //margin-top: -22px;
  }
  .dart-dropzone {
    margin-top: 41px;
    margin-bottom: 32px;
    height: 100%;
    min-height: 148px;
    max-height: 148px;
    overflow: hidden;
    position: relative;
    display: block;
    cursor: pointer;
    z-index: 1010;
  }
  &-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-top: 8px;
    &-button {
      width: auto;
      margin: 0 !important;
      font-weight: 500;
      &--cancel {
        background: transparent;
        color: #282828;
        border: 1px solid #282828;
      }
      &--cancel:hover {
        background: #282828;
        color: #fff;
        border: 1px solid #282828;
      }
    }
    .d-button-primary:disabled {
      background-color: #ededed;
      color: #757575;
      font-weight: 500;
    }
  }
  .dropzone__item:not(:first-child) {
    display: none;
  }
  .dropzone__item:first-child {
    width: 100%;
    height: 158px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -25px;
    position: relative;
    z-index: 1001;
    &-thumbnail {
      display: none;
    }
    .dropzone__progress {
      display: none;
    }
    .dropzone__file-size {
      display: none;
    }
    .dropzone__filename {
      display: none;
    }
    .dropzone__item-thumbnail {
      display: none;
    }
  }
  .order-card__modal-docsupload-docs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    position: relative;
    width: 100%;
    margin-bottom: 56px;
    &-item-cont {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 57px;
      background: #ededed;
      box-shadow: 0px 4px 9.3px -5px rgba(0, 0, 0, 0.08);
      border-radius: 11px;
      padding: 8px 16px;
      position: relative;
      &-trash {
        cursor: pointer;
      }
    }
    &-item {
      width: auto;

      display: flex;
      align-items: center;
      gap: 8px;

      &-sheet {
        width: 16px;
        height: 20px;
      }
      &-type {
        position: absolute;
        font-size: 5px;
        line-height: 5px;
        text-transform: uppercase;
        top: calc(50% - 1px);
        left: 19px;
        font-weight: 600;
        width: 10px;
        max-width: 10px;
        max-height: 5px;
        overflow: hidden;
        text-align: center;
      }
      &-text {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 2px;
        &-name {
          width: 260px;
          height: 21px;
          font-weight: 600;
          font-size: 16px;
          line-height: 21px;
          color: #282828;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &-date {
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;
          color: #757575;
        }
      }
    }
  }
}
</style>
