<template>
  <section class="shipments" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <Toast />
    <Loader v-if="loading" />
    <div class="d-top-order-container">
      <div class="d-top-order-container-left">
        <div>
          <h2>Заказ № {{ this.$route.params.order_id }}</h2>

          <div class="d-top-order-container-date-created">от {{ this.order.date }}</div>
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
    <button  class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__docs" @click.prevent="modalDocs = true"  v-if="docs.length">
      <i class="item-list-item-icon d-icon-doc"></i>
      <span class="catalog__head-item-text">Документы <span v-if="docs.length">({{ docs.length }})</span></span>
		</button>
    </div>
    <div class="d-top-order-container-buttons">
      <button
    class="d-button d-button-primary d-button-primary-small d-button--sm-shadow  order-card__action"
    @click.prevent="changeStatus"
    v-if="status.api_key == 'seller_accepted'">
      <span class="catalog__head-item-text">Подтвердить заказ</span>
		</button>
    <button
    class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__action"
    @click.prevent="modalEdit = true"
    v-if="status.editable">
      <span class="catalog__head-item-text">Редактировать заказ</span>
		</button>

    <button  class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__repeat" @click.prevent="showReq()">
      <i class="item-list-item-icon d-icon-refresh"></i>
      <span class="catalog__head-item-text">Повторить заказ</span>
		</button>
    <button
    class="d-button d-button-tertiary d-button-tertiary-small d-button--sm-shadow  order-card__action"
    @click.prevent="modalCancel = true"
    v-if="status.cancelable">
      <span class="catalog__head-item-text">Отменить заказ</span>
		</button>
    </div>
      </div>
    </div>
    <div class="d-top-order-container-info">
      <h3>Информация о заказе</h3>
      <div class="order-card__orderinfo dart-row">
        <div class="order-card__orderinfo-grid d-col-md-3">
          <div class="order-card__orderinfo-grid-lable">Сумма</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.cost != '' ? this.order?.cost : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-3">
          <div class="order-card__orderinfo-grid-lable">Инициатор</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.initiator_org_name != '' ? this.order?.initiator_org_name : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down">
            ({{ this.order?.initiator_user_name != '' ? this.order?.initiator_user_name : '' }})
          </div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-5">
          <div class="order-card__orderinfo-grid-lable">Поставщик</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.seller_name != '' ? this.order?.seller_name : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text order-card__orderinfo-grid-text-nomarg">
            ИНН: {{ this.order?.seller_inn != '' ? this.order?.seller_inn : '-' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down">
            {{ this.order?.seller_address != '' ? this.order?.seller_address : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down">
            <b>Магазин/склад:</b>
            {{ this.order?.seller_w_name != '' ? this.order?.seller_w_name : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-5">
          <div class="order-card__orderinfo-grid-lable">Покупатель</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.buyer_name != '' ? this.order?.buyer_name : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text order-card__orderinfo-grid-text-nomarg">
            ИНН: {{ this.order?.ur_persone?.inn != '' ? this.order?.ur_persone?.inn : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down" v-if="this.order?.delivery_address">
            {{ this.order?.delivery_address }}
          </div>
          <div class="order-card__orderinfo-grid-text-down" v-else>
            {{ this.order?.buyer_address != '' ? this.order?.buyer_address : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down">
            <b>Магазин/склад:</b>
            {{ this.order?.buyer_store != '' ? this.order?.buyer_store : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-3">
          <div class="order-card__orderinfo-grid-lable">Отсрочка</div>
          <div class="order-card__orderinfo-grid-text" v-if="this.order?.delay_text">
            {{ this.order?.delay_text }}
          </div>
          <div class="order-card__orderinfo-grid-text" v-else>
            {{ this.order?.delay != '' ? (Number.parseInt(this.order?.delay) ? this.order?.delay + ' дн.' : this.order?.delay) : '0 дн.' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-3">
          <div class="order-card__orderinfo-grid-lable">Оплата доставки</div>
          <div class="order-card__orderinfo-grid-text">{{ this.order?.payer }}</div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-2">
          <div class="order-card__orderinfo-grid-lable">Срок доставки</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.day_delivery }}  ({{ this.order?.delivery_date }})
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
    <Teleport to="body">
      <customModal v-model="modalDocs" class="order-card__modal">
        <h3>Документы <span v-if="docs.length">({{ docs.length }})</span></h3>
        <BaseTable
        :items_data="docs"
        :total="docs.length"
        :table_data="table_docs"
        @clickElem="docClick"
      />
      <button class="d-button d-button-primary d-button-primary-small d-button--sm-shadow" @click.prevent="modalDocs = false">
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
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import Toast from 'primevue/toast'
import editOrderWindow from './ui/editOrderWindow.vue'


export default {
  name: 'purchasesOrder',
  components: { Breadcrumbs, BaseTable, Loader, customModal, Toast, editOrderWindow },
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
      docs: [],
      status: [],
      table_docs: {
        name: {
          label: 'Название',
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
              url: 'href',
            },
          },
        },
      },
      requirement: {},
      requirement_id: 0,
    }
  },

  methods: {
  ...mapActions({
      getOptOrder: 'purchases/getOptOrder',
      unsetOptOrder: 'purchases/unsetOptOrder',
      canselOptOrder: 'purchases/canselOptOrder',
      repeatOrder: 'purchases/repeatOrder',
      setStatusAccept: 'purchases/setStatusAccept'
    }),
    changeStatus(){
      this.loading = true
      this.setStatusAccept({
          order_id: this.$route.params.order_id,
        }).then(() => {
        this.getOptOrder({
          order_id: this.$route.params.order_id,
        }).then(() => (this.loading = false))
      })
    },
    showReq(){
      this.loading = true
      this.repeatOrder({
        data: this.requirement
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
          }else{
            this.$toast.add({
              severity: 'error',
              summary: 'Ошибка повторения заказа!',
              detail: data.data.message,
              life: 3000,
          })
          }

      })

    },
    paginate(data){
      this.loading = true
      this.unsetOptOrder()
      data.page = this.page
      data.order_id = this.$route.params.order_id,
      this.getOptOrder(data).then(() => {
        this.loading = false
      })
    },
    docClick(data){
      let loc = data.href
      var downloadLink = document.createElement("a")
      downloadLink.href = loc
      downloadLink.setAttribute('download', loc)
      downloadLink.setAttribute('target','_blank')
      console.log(downloadLink)
      downloadLink.click();
    },
    cancelOrder(){
      this.loading = true
      let data = {}
      data.order_id = this.$route.params.order_id,
      data.action = 'order/opt/cancel',
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
        data.order_id = this.$route.params.order_id,
        this.getOptOrder(data).then(() => {
        this.loading = false
        this.modalCancel = false
      })
      })
    },
    modalEditClose(){
      this.modalEdit = false
      this.getOptOrder({
        order_id: this.$route.params.order_id,
      })
    },

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
      this.docs = newVal.docs
      this.status = newVal.status
      this.requirement = newVal
    },
  },
}
</script>

<style lang="scss">
.order-card__modal button{
 margin: 20px auto;
}
.order-card__modal h3{
  margin-bottom: 40px;
  margin-top: -5px;
}
.order-card__modal-cansel .modal-content, .order__edit-modal .modal-content{
  max-width: 600px;
}
.order-card__repeat{
  padding: 8px 23px;
  gap: 8px;
}
.order-card__repeat .item-list-item-icon{
  font-size: 18px;
  font-weight: 600;
}
.order-card__docs{
  margin-bottom:16px;
}
</style>
