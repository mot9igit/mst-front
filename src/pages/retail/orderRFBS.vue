<template>
  <section class="shipments order_content rfbs_content" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <Loader v-if="loading" />
    <div class="d-top-order-container" v-if="!loading">
      <div class="d-top-order-container-left">
        <div class="d-top-order-container-left-top">
          <h2>Заказ RFBS №{{ order.order.num }}</h2>
          <div class="d-top-order-container-date-created-hidden d-top-order-container-date-created">
            {{ order.order.createdon }}
          </div>
          <div
            class="d-badge2 d-badge2--fit order-card__status"
            :style="'background-color: #' + order.order.status_color"
          >
            {{ order.order.status_name }}
          </div>
        </div>

        <div class="d-top-order-container-date-created">{{ order.order.createdon }}</div>
      </div>
      <div class="d-top-order-container-right">
        <div class="d-top-order-container-buttons">
          <button
          v-if="order.order?.transition_anchor"
            @click="order.order?.stage_check_code ? orderCheckCode() : orderChangeStage()"
            class="d-button d-button-primary d-button-primary-small d-button--sm-shadow order-card__action"
          >
            <span class="catalog__head-item-text">{{ order.order?.transition_anchor }}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="d-top-order-container-info" v-if="!loading">
      <div class="order-card__orderinfo order-card__orderinfo-line4">
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
          <div class="order-card__orderinfo-grid--column">
            <div class="order-card__orderinfo-grid-lable">Номер телефона</div>
            <div class="order-card__orderinfo-grid-text">
              {{ order.order?.customer_phone != '' ? order.order?.customer_phone : '-' }}
            </div>
          </div>
          <div>
            <div class="order-card__orderinfo-grid-lable">E-mail</div>
            <div class="order-card__orderinfo-grid-text">
              {{ order.order?.customer_email != '' ? order.order?.customer_email : '-' }}
            </div>
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

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Адрес склада</div>
          <div class="order-card__orderinfo-grid-text">
            {{ order.order?.store_address != '' ? order.order?.store_address : '-' }}
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Источник</div>
          <div class="order-card__orderinfo-grid-image-text">
            <img :src="order.order?.rfbs_img" />
            <div class="order-card__orderinfo-grid-text">
              {{ order.order?.rfbs_name != '' ? order.order?.rfbs_name : '-' }}
            </div>
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Продавец</div>
          <div class="order-card__orderinfo-grid-image-text">
            <img :src="order.order?.store_img" />
            <div class="order-card__orderinfo-grid-text">
              {{ order.order?.store_name != '' ? order.order?.store_name : '-' }}
            </div>
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Доход</div>
          <div class="order-card__orderinfo-grid-image-text">
            <div class="order-card__orderinfo-grid-text nowrap">
              {{ order.order?.cost != '' ? order.order?.cost : '-' }}
            </div>
            <div class="order-card__orderinfo-badge">-10%</div>
          </div>
        </div>
      </div>
      <div
        class="order-card__orderinfo order-card__orderinfo-line3"
        v-if="order.order?.comment != null && order.order?.comment != ''"
      >
        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Комментарий</div>
          <div
            class="order-card__orderinfo-grid-text order-card__orderinfo-grid-lable--ordercomment"
          >
            {{ order.order?.comment }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-order-container" v-if="!loading">
      <BaseTable
        v-if="!loading"
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
        <InputOtp v-model="code" :length="6" integerOnly />
        <div class="buttons-container">
          <button class="d-button d-button-primary d-button-primary-small" type="submit">
            Проверить
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
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import Loader from '@/shared/ui/Loader.vue'
import InputOtp from 'primevue/inputotp'
import customModal from '@/shared/ui/Modal.vue'

export default {
  name: 'RetailOrderRFBS',
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
      page: 1,
      modals: {
        code: false,
        codeAccepted: false,
        codeNotAccepted: false,
      },
      code: '',
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
    }).then(() => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      order: 'retail/order',
    }),
  },
  watch: {},
}
</script>
<style lang="scss">
@media (width <= 3000px) {
  .rfbs_content {
    .order-card__status {
      margin-top: 0px;
    }
    .d-top-order-container {
      align-items: start;
      border-bottom: none;
      padding-bottom: 40px;
    }
    .d-top-order-container-date-created {
      font-size: 16px;
      line-height: 21px;
    }
    .d-top-order-container-buttons button {
      box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.2588235294);
    }
    .order-card__orderinfo-line4 {
      display: grid;
      grid-template-columns: 139fr 264fr 223fr 150fr 150fr 201fr 100fr 168fr 126fr;
      grid-template-rows: 100%;
      grid-row-gap: 24px;
      align-items: start;
    }
    .d-top-order-container-info {
      border-bottom: none;
    }
    .order-card__orderinfo:last-child {
      padding-bottom: 64px;
    }
    .dart-mb-1 {
      margin-bottom: 0;
    }
    .order-card__orderinfo-grid--column {
      padding-bottom: 8px;
      border-bottom: 1px solid #75757575;
      margin-bottom: 8px;
    }
    .order-card__orderinfo-grid-image-text {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 16px;
    }
    .order-card__orderinfo-grid-image-text .order-card__orderinfo-grid-text {
      margin-top: 0;
    }
    .order-card__orderinfo-grid-image-text img {
      width: 16px;
      height: 16px;
      border-radius: 16px;
    }
    .order-card__orderinfo-badge {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 1px 8px;
      background: #ededed;
      border-radius: 20px;
      font-weight: 600;
      font-size: 10px;
      line-height: 13px;
      color: #282828;
    }
    .d-top-order-container-left-top .d-badge2 {
      border-radius: 41px;
      padding: 4px 16px;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: #ededed;
      min-height: 24px;
      min-width: auto;
    }
    .order-card__orderinfo-grid-lable--ordercomment.order-card__orderinfo-grid-text {
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
    }
  }
}
</style>
