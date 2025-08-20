<template>
  <section class="shipments retailorders__content" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <div class="d-top-order-container" v-if="order.order">
      <div class="d-top-order-container-left">
        <div>
          <h2>Заказ № {{ order.order.num }}</h2>

          <div class="d-top-order-container-date-created">от {{ order.order.createdon }}</div>
        </div>
        <div
          class="d-badge2 d-badge2--fit d-button--sm-shadow order-card__status"
          :style="'background-color: #' + order.order.status_color"
        >
          {{ order.order.status_name }}
        </div>
      </div>
      <div class="d-top-order-container-right" v-if="order.order?.stores_available != 0">
        <div class="d-top-order-container-buttons-text" v-if="order.order?.stage_description">
          <p>{{ order.order?.stage_description }}</p>
        </div>
        <div class="d-top-order-container-buttons">
          <button
            @click="order.order?.stage_check_code ? orderCheckCode() : orderChangeStage()"
            class="d-button d-button-primary d-button-primary-small d-button--sm-shadow order-card__action"
          >
            <span class="catalog__head-item-text">{{ order.order?.transition_anchor }}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="d-top-order-container-info">
      <h3>Информация о заказе</h3>
      <div class="order-card__orderinfo dart-row">
        <div class="order-card__orderinfo-grid d-col-md-4">
          <div class="order-card__orderinfo-grid-lable">Покупатель</div>
          <div class="order-card__orderinfo-grid-text">
            {{ order.order?.customer != '' ? order.order?.customer : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-4">
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
        <div class="order-card__orderinfo-grid d-col-md-4">
          <div class="order-card__orderinfo-grid-lable">Номер телефона</div>
          <div class="order-card__orderinfo-grid-text">
            {{ order.order?.customer_phone != '' ? order.order?.customer_phone : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-4">
          <div class="order-card__orderinfo-grid-lable">Email</div>
          <div class="order-card__orderinfo-grid-text">
            {{ order.order?.customer_email != '' ? order.order?.customer_email : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-4">
          <div class="order-card__orderinfo-grid-lable">Транспортная компания</div>
          <div class="order-card__orderinfo-grid-text">
            {{ order.order?.tk != '' ? order.order?.tk : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-4">
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
  <teleport to="body">
    <customModal v-model="this.modals.code" class="codeWindow">
      <template v-slot:title>Введите код</template>
      <form action="#" @submit.prevent="formSubmit">
        <InputOtp v-model="code" integerOnly />
        <div class="buttons-container">
          <button class="d-button d-button-primary d-button-primary-small" type="submit">
            Ок!
          </button>
        </div>
      </form>
    </customModal>
    <customModal v-model="this.modals.codeAccepted" class="codeWindow">
      <template v-slot:title>Код принят</template>
      <div class="text-center">
        <img src="/icons/check.svg" alt="" class="order-secret__img" />
      </div>
      <div class="buttons-container">
        <button
          class="d-button d-button-primary d-button-primary-small"
          @click="
            () => {
              this.modals.codeAccepted = false
            }
          "
        >
          Ок
        </button>
      </div>
    </customModal>
    <customModal v-model="this.modals.codeNotAccepted" class="codeWindow">
      <template v-slot:title>Код не принят</template>
      <div class="text-center">
        <img src="/icons/not-check.svg" alt="" class="order-secret__img" />
      </div>
      <div class="buttons-container">
        <button
          class="d-button d-button-primary d-button-primary-small"
          @click="
            () => {
              this.modals.codeNotAccepted = false
            }
          "
        >
          Ок
        </button>
      </div>
    </customModal>
  </teleport>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import InputOtp from 'primevue/inputotp'
import customModal from '@/shared/ui/Modal.vue'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'RetailOrder',
  components: { Breadcrumbs, BaseTable, customModal, InputOtp, Loader },
  props: {
    id: {
      type: String,
      default: '',
    },
    order_id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: true,
      modals: {
        code: false,
        codeAccepted: false,
        codeNotAccepted: false,
      },
      code: '',
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
      changeStatus: 'retail/changeStatus',
      checkCode: 'retail/checkCode',
    }),
    async formSubmit() {
      const data = await this.checkCode({
        code: this.code,
      })
      this.response = data.data.data
      if (this.response.success) {
        this.orderChangeStage()
        this.modals.code = false
        this.code = ''
        this.modals.codeAccepted = true
      } else {
        this.modals.code = false
        this.code = ''
        this.modals.codeNotAccepted = true
      }
    },
    orderCheckCode() {
      this.modals.code = true
    },
    orderChangeStage() {
      this.loading = !false
      this.changeStatus()
        .then(() => {
          this.loading = !true
        })
        .catch((error) => {
          console.error(error)
        })
    },
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
    order: function () {
      // console.log(newVal)
    },
  },
}
</script>
<style lang="scss">
.codeWindow {
  .modal__title {
    margin: 24px 48px 0 0;
  }
  .modal__content {
    padding-bottom: 0;
  }
  .modal-content {
    max-width: 344px;
    img {
      max-width: 70px;
    }
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .p-inputotp {
        justify-content: center;
      }
      .p-inputtext {
        border: 1px solid #757575;
      }
    }
    .buttons-container {
      width: 100%;
      text-align: center;
      margin-top: 24px;
      .d-button {
        display: inline-block;
        box-shadow: none;
      }
    }
  }
}
</style>
