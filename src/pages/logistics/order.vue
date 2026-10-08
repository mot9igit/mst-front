<template>
  <section class="shipments logisticorder__content" id="logistics-order">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <Loader v-if="loading" />
    <div class="d-top-order-container">
      <div class="d-top-order-container-left">
        <div class="d-top-order-container-left-top">
          <h2>Заказ № {{ this.order_id }}</h2>
          <div class="d-top-order-container-date-created-hidden d-top-order-container-date-created">
            от {{ this.order?.order_date }}
          </div>
          <div
            class="d-badge2 d-badge2--fit order-card__status"
      :style="'background-color: ' + status.color + '; color: ' + (status.color_text || '#282828')"
      :class="status.api_key ? 'status-' + status.api_key : ''"
      v-if="Object.keys(status).length != 0"
          >
            {{ status.name }}
          </div>
        </div>
        <div class="d-top-order-container-date-created">от {{ this.order?.order_date }}</div>
      </div>
      <div class="d-top-order-container-right">
        <div class="logisticorder__action-wrap">
          <template v-if="showActionButton">
            <div class="logisticorder__action-text">
              <p>{{ actionHint }}</p>
            </div>
            <div class="d-top-order-container-buttons">
              <button
                class="d-button d-button--sm-shadow d-button-primary d-button-primary-small logisticorder__action"
                @click.prevent="modalKey = true"
              >
                <span class="catalog__head-item-text">{{ actionButton }}</span>
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="d-top-order-container-info">
      <h3>Информация о заказе</h3>
      <div class="order-card__orderinfo order-card__orderinfo-line1">
        <div class="order-card__orderinfo-grid" v-if="!isShipment">
          <div class="order-card__orderinfo-grid-lable">Сумма</div>
          <div class="order-card__orderinfo-grid-text nowrap">
            {{ this.order?.cost != '' ? this.order?.cost : '-' }}
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
            {{ this.order?.buyer_inn != '' ? this.order?.buyer_inn : '-' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down">
            <b>Склад {{ this.order?.buyer_w_id ? ' #' + this.order?.buyer_w_id : '' }}</b
            ><br />
            <p>{{ this.order?.buyer_w_address ? this.order?.buyer_w_address : '' }}</p>
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Тип доставки</div>
          <div class="order-card__orderinfo-grid-text">
            {{ deliveryType }}
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Дата получения/отправки</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.shipping_date != '' ? this.order?.shipping_date : '-' }}
          </div>
        </div>

        <div class="order-card__orderinfo-grid d-col-md-2">
          <div class="order-card__orderinfo-grid-lable">Срок доставки</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.delivery_date != '' ? this.order?.delivery_date : '-' }}
          </div>
        </div>
      </div>
      <div class="order-card__orderinfo order-card__orderinfo-line2">
        <div class="order-card__ordercomment">
          <div class="order-card__ordercomment-container" v-if="this.order?.comment">
            <div class="order-card__orderinfo-grid-lable">Комментарий:</div>
            <div v-html="this.order?.comment"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-order-container">
      <h3>Состав заказа</h3>
      <BaseTable
        :items_data="this.order?.products"
        :total="this.order?.total_products"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        @paginate="paginate"
      />
      <MinProductTable
        :items_data="this.order?.products"
        :total="this.order?.total_products"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        @paginate="paginate"
      />
    </div>
    <Teleport to="body">
      <customModal v-model="modalKey" class="logisticorder__modal-key">
        <div class="logisticorder__modal-key-wrapper">
          <h2>Секретный ключ</h2>
          <Loader v-if="loadingCode" />
          <template v-if="!codeAccepted">
            <form class="clients-form__modal" @submit.prevent="submitCode()">
              <InputOtp
                class="clients-form__modal-numbers"
                :length="6"
                v-model="code"
                integerOnly
              />
              <div class="logisticorder__modal-error" v-if="errorMsg">{{ errorMsg }}</div>
              <div class="clients-form__modal-buttons">
                <button
                  type="button"
                  href="#"
                  class="d-button d-button-primary d-button--sm-shadow clients__filters-create clients__filters-cansel"
                  @click.prevent="closeKeyModal()"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  href="#"
                  class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
                  :disabled="code.length != 6"
                >
                  Отправить
                </button>
              </div>
            </form>
          </template>
          <template v-else>
            <div class="logisticorder__modal-success">
              <div class="logisticorder__modal-success-icon">
                <i class="pi pi-check"></i>
              </div>
              <div class="logisticorder__modal-success-text">Код принят</div>
            </div>
            <div class="clients-form__modal-buttons">
              <button
                type="button"
                href="#"
                class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
                @click.prevent="closeKeyModal()"
              >
                Ок
              </button>
            </div>
          </template>
        </div>
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
import InputOtp from 'primevue/inputotp'

export default {
  name: 'LogisticsOrder',
  components: { Breadcrumbs, BaseTable, MinProductTable, Loader, customModal, InputOtp },
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25,
    },
    pagination_offset: {
      type: Number,
      default: 0,
    },
    order_id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: true,
      loadingCode: false,
      page: 1,
      status: {},
      modalKey: false,
      code: '',
      codeAccepted: false,
      errorMsg: '',
      wasAccepted: false,
    }
  },
  computed: {
    ...mapGetters({
      order: 'logistic/order',
    }),
    isShipment() {
      return this.order?.is_shipment === true
    },
    showActionButton() {
      const key = this.status?.api_key
      if (this.isShipment) {
        return key === 'buyer_accepted'
      }
      return key === 'seller_packed'
    },
    actionButton() {
      return this.isShipment ? 'Выдать товар' : 'Принять товар'
    },
    actionHint() {
      return this.isShipment
        ? 'Нажмите на кнопку для передачи товара курьеру'
        : 'Нажмите кнопку для подтверждения получения заказа'
    },
    deliveryType() {
      const type = String(this.order?.delivery_type_opt ?? '')
      return type == '0' ? 'Самовывоз' : type == '2' ? 'Доставка МС' : 'Транспортной компанией'
    },
    table_data() {
      const base = {
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
        count: {
          label: 'Количество',
          type: 'text',
          class: 'cell_centeralign',
        },
      }
      if (this.isShipment) {
        return base
      }
      return {
        ...base,
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
        summ: {
          label: 'Сумма',
          type: 'text',
          class: 'cell_centeralign nowrap',
        },
      }
    },
  },
  methods: {
    ...mapActions({
      getOrder: 'logistic/getOrder',
      unsetOrder: 'logistic/unsetOrder',
      acceptCode: 'logistic/acceptCode',
    }),
    paginate(data) {
      this.loading = true
      this.unsetOrder()
      this.page = data.page
      this.getOrder({
        order_id: this.order_id,
        page: data.page,
        perpage: data.perpage,
      }).then(() => {
        this.loading = false
      })
    },
    async submitCode() {
      if (this.code.length != 6 || this.loading) return
      this.loadingCode = true
      const res = await this.acceptCode({
        order_id: this.order_id,
        code: this.code,
      })
      this.loadingCode = false
      const inner = res?.data?.data
      if (inner?.success === true) {
        this.codeAccepted = true
        this.code = ''
        this.errorMsg = ''
        this.wasAccepted = true
      } else {
        this.code = ''
        this.errorMsg = inner?.message || res?.data?.message || 'Ошибка'
      }
    },
    closeKeyModal() {
      this.modalKey = false
      this.code = ''
      this.errorMsg = ''
      this.codeAccepted = false
      if (this.wasAccepted) {
        this.getOrder({
          order_id: this.order_id,
          page: this.page,
          perpage: this.pagination_items_per_page,
        })
        this.wasAccepted = false
      }
    },
  },
  mounted() {
    this.getOrder({
      order_id: this.order_id,
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.loading = false
    })
  },
  watch: {
    order: function (newVal) {
      this.status = newVal.status ?? {}
    },
    beforeUnmount() {
      this.unsetOrder()
    },
  },
}
</script>

<style lang="scss">
.logisticorder__content {
  padding-block: 40px;
}

.logisticorder__action-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logisticorder__action-text {
  p {
    margin: 0;
    font-size: 16px;
    line-height: 21px;
    color: #757575;
    max-width: 292px;
    text-align: right;
  }
}

.logisticorder__modal-key {
  :deep(.modal__content) {
    width: 500px;
    max-width: 100%;
  }

  .logisticorder__modal-key-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    font-size: 20px;
    line-height: 26px;
    font-weight: 600;
    color: #282828;
    text-align: center;
    margin-bottom: 34px;
  }

  .clients-form__modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 34px;
    width: 100%;
  }

  .p-inputotp {
    gap: 24px;
  }

  .p-inputotp-input {
    width: 50px;
    height: 60px;
  }

  .clients-form__modal-buttons {
    display: flex;
    gap: 16px;
  }

  .clients__filters-cansel {
    background-color: #fff;
    border: 1px solid #282828;
    color: #282828;
  }

  .clients__filters-cansel:hover {
    background-color: #282828;
    border: 1px solid #282828;
    color: #ededed;
  }

  .logisticorder__modal-error {
    color: #d00;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
  }

  .logisticorder__modal-success {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .logisticorder__modal-success-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #cdf0a9;
    display: flex;
    align-items: center;
    justify-content: center;

    .pi-check {
      color: #63c400;
      font-size: 13px;
    }
  }

  .logisticorder__modal-success-text {
    color: #63c400;
    font-size: 20px;
    line-height: 26px;
  }
}
</style>
