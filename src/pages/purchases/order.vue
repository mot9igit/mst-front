<template>
  <section class="shipments order_content" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <Toast />
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
        <div class="d-top-order-container-buttons">
          <button
            class="order-card__action order-card__action-edit"
            @click.prevent="editOrder()"
            v-if="status.editable"
            :disabled="order.offer_id"
          >
            <i class="d-icon-pen2"></i>
          </button>

          <button
            class="d-button d-button-primary d-button-primary-small d-button--sm-shadow order-card__action"
            @click.prevent="changeStatus"
            v-if="status.api_key == 'seller_accepted'"
          >
            <span class="catalog__head-item-text">Подтвердить заказ</span>
          </button>

          <button
            class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__cancel"
            @click.prevent="modalCancel = true"
            v-if="status.cancelable"
          >
            <i class="item-list-item-icon d-icon-plus"></i>
            <span class="catalog__head-item-text">Отменить заказ</span>
          </button>

          <button
            class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__repeat"
            @click.prevent="showReq()"
            :disabled="order.offer_id"
          >
            <i class="item-list-item-icon d-icon-refresh"></i>
            <span class="catalog__head-item-text">Повторить заказ</span>
          </button>

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
          <div
            class="order-card__orderinfo-grid-text-down order-card__orderinfo-grid-text-down-min"
          >
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
            <b>Склад {{ this.order?.seller_w_id ? ' #' + this.order?.seller_w_id : '' }}</b>
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
            <b>Склад {{ this.order?.buyer_w_id ? ' #' + this.order?.buyer_w_id : '' }}</b>
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
          <div class="order-card__orderinfo-grid-text">{{ this.order?.payer }}</div>
        </div>

        <div class="order-card__orderinfo-grid">
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
        :items_data="optorder.products"
        :total="optorder.total_products"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        @paginate="paginate"
        @saleModal="saleModal"
      />
      <MinProductTable
        :items_data="optorder.products"
        :total="optorder.total_products"
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
      <Teleport to="body">
        <customModal v-model="modalCancel" class="order-card__modal order-card__modal-cansel">
          <h3>Отмена заказа № {{ this.$route.params.order_id }}</h3>
          Вы уверены, что хотите отменить заказ № {{ this.$route.params.order_id }}?
          <div class="collection__modal-buttons">
            <button
              type="button"
              href="#"
              class="d-button d-button-primary d-button--sm-shadow collection__modal-cansel"
              @click.prevent="this.modalCancel = false"
            >
              Отмена
            </button>
            <button
              type="button"
              href="#"
              class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
              @click.prevent="cancelOrder()"
            >
              Ok
            </button>
          </div>
        </customModal>
      </Teleport>
    </Teleport>
    <teleport to="body">
      <editOrderWindow
        :active="this.modalEdit"
        @close="modalEditClose()"
        @orderCancel="modalCancel = true"
      />
    </teleport>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import MinProductTable from '@/shared/ui/tableMinProduct/table.vue'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import Toast from 'primevue/toast'
import editOrderWindow from './ui/editOrderWindow.vue'
import saleWindow from './ui/activeSalesWindow.vue'

export default {
  name: 'purchasesOrder',
  components: {
    Breadcrumbs,
    BaseTable,
    Loader,
    customModal,
    Toast,
    editOrderWindow,
    MinProductTable,
    saleWindow,
  },
  data() {
    return {
      loading: true,
      page: 1,
      page_docs: 1,
      order: [],
      modalDocs: false,
      modalCancel: false,
      modalEdit: false,
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
          label: 'Кол-во',
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
      status: [],
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
              url: 'filename',
            },
          },
        },
      },
      requirement: {},
      requirement_id: 0,
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
  methods: {
    ...mapActions({
      getOptOrder: 'purchases/getOptOrder',
      unsetOptOrder: 'purchases/unsetOptOrder',
      canselOptOrder: 'purchases/canselOptOrder',
      repeatOrder: 'purchases/repeatOrder',
      setStatusAccept: 'purchases/setStatusAccept',
      setOrderEditToCart: 'purchases/setOrderEditToCart',
      getBasket: 'basket/getBasket',
    }),
    changeStatus() {
      this.loading = true
      this.setStatusAccept({
        order_id: this.$route.params.order_id,
      }).then(() => {
        this.getOptOrder({
          page: this.page,
          perpage: this.pagination_items_per_page,
          order_id: this.$route.params.order_id,
        }).then(() => (this.loading = false))
      })
    },
    showReq() {
      this.loading = true
      this.repeatOrder({
        data: this.requirement,
      }).then((data) => {
        if (data.data.success) {
          this.$toast.add({
            severity: 'success',
            summary: 'Потребность по вашему заказу успешно создана!',
            detail: data.data.message,
            life: 3000,
          })
          this.requirement_id = data.data.data
          this.loading = false
          this.$router.push({
            name: 'purchasesCatalogRequirement',
            params: { requirement_id: this.requirement_id + '_req' },
            query: { timestamp: Date.now() },
          })
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка повторения заказа!',
            detail: data.data.message,
            life: 3000,
          })
        }
      })
    },
    paginate(data) {
      this.loading = true
      this.unsetOptOrder()
      this.page = data.page
      ;(data.order_id = this.$route.params.order_id),
        this.getOptOrder(data).then(() => {
          this.loading = false
        })
    },
    docClick(data) {
      // console.log(data)
      let loc = data.filename
      var downloadLink = document.createElement('a')
      downloadLink.href = loc
      downloadLink.setAttribute('download', loc)
      downloadLink.setAttribute('target', '_blank')
      // console.log(downloadLink)
      downloadLink.click()
    },
    cancelOrder() {
      this.loading = true
      let data = {}
      ;(data.order_id = this.$route.params.order_id),
        (data.action = 'order/opt/cancel'),
        console.log(data)
      this.canselOptOrder(data).then((res) => {
        this.loading = false
        if (res.data.data.success) {
          this.$toast.add({
            severity: 'success',
            summary: 'Заказ успешно отменен!',
            detail: res.data.data.message,
            life: 3000,
          })
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: res.data.data.message,
            life: 3000,
          })
        }
        data.page = this.page
        data.perpage = this.pagination_items_per_page
        data.order_id = this.$route.params.order_id
        this.getOptOrder(data).then(() => {
          this.loading = false
          this.modalCancel = false
        })
      })
    },
    modalEditClose() {
      this.modalEdit = false
      this.getOptOrder({
        order_id: this.$route.params.order_id,
      })
    },
    editOrder() {
      let head =
        'Вы уверены, что хотите отредактировать заказ №' + this.$route.params.order_id + '?'
      let mess =
        'Корзина поставщика ' +
        this.order?.seller_name +
        ' будет очищена. Добавить текущий заказ для редактирования в корзину?'
      this.$confirm.require({
        message: mess,
        header: head,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading = true
          this.setOrderEditToCart({
            store_id: this.optorder.warehouse_id,
            seller_id: this.optorder.seller_id,
            seller_store_id: this.optorder.store_id,
          }).then(() => {
            this.getBasket()
            this.loading = false
          })
        },
        reject: () => {
          this.$toast.add({
            severity: 'error',
            summary: 'Редактирование заказа',
            detail: 'Действие отклонено',
            life: 3000,
          })
        },
      })
    },
    saleModal(data) {
      this.modalActiveActions = true
      this.productOrder = data
    },
  },
  mounted() {
    this.getOptOrder({
      page: this.page,
      perpage: this.pagination_items_per_page,
      order_id: this.$route.params.order_id,
    }).then(() => {
      this.loading = false
      this.orderInfo.seller_name = this.optorder.seller_name
      this.orderInfo.seller_img = this.optorder.seller_image
      this.orderInfo.delivery = this.optorder.day_delivery
      this.orderInfo.payer = this.optorder.payer
      this.orderInfo.delay_type = this.optorder.delay_type
      this.orderInfo.delay = this.optorder.delay
    })
  },
  computed: {
    ...mapGetters({
      optorder: 'purchases/optorder',
      basket: 'basket/basket',
    }),
  },
  watch: {
    optorder: function (newVal) {
      this.order = newVal
      this.docs = newVal.docs
      this.status = newVal.status
      this.requirement = newVal
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

<style lang="scss"></style>
