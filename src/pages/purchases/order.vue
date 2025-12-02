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
          <div class="d-top-order-container-date-created-hidden d-top-order-container-date-created">от {{ this.order.date }}</div>
          <div class="d-badge2 d-badge2--fit order-card__status" :style="
            'background-color: #' +
              status.color
              "
              v-if="(Object.keys(status).length != 0)"
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
          :disabled="order.offer_id">
            <i class="d-icon-pen2"></i>
          </button>

          <button
          class="d-button d-button-primary d-button-primary-small d-button--sm-shadow  order-card__action"
          @click.prevent="changeStatus"
          v-if="status.api_key == 'seller_accepted'">
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

          <button  class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__repeat"
          @click.prevent="showReq()"
          :disabled="order.offer_id"
          >
            <i class="item-list-item-icon d-icon-refresh"></i>
            <span class="catalog__head-item-text">Повторить заказ</span>
          </button>

          <button  class="d-button d-button-tertiary d-button-tertiary-small order-card__action order-card__docs"
          @click.prevent="modalDocs = true"
          v-if="docs.length">
            <i class="item-list-item-icon d-icon-doc"></i>
            <span class="catalog__head-item-text">Документы <span v-if="docs.length">({{ docs.length }})</span></span>
          </button>

        </div>
      </div>
    </div>
    <div class="d-top-order-container-info">
      <h3>Информация о заказе</h3>
      <div class="order-card__orderinfo order-card__orderinfo-line1">

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Сумма</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.cost != '' ? this.order?.cost : '-' }}
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Инициатор</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.initiator_org_name != '' ? this.order?.initiator_org_name : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down order-card__orderinfo-grid-text-down-min">
            ({{ this.order?.initiator_user_name != '' ? this.order?.initiator_user_name : '' }})
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Поставщик</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.seller_name != '' ? this.order?.seller_name : '' }}  ИНН: {{ this.order?.seller_inn != '' ? this.order?.seller_inn : '-' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down">
            <b>Склад {{ this.order?.seller_w_id ? ' #'+this.order?.seller_w_id : '' }}</b>
            <p>{{ this.order?.seller_w_address ? this.order?.seller_w_address : '' }}</p>
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Покупатель</div>
          <div class="order-card__orderinfo-grid-text">
            {{ this.order?.buyer_name != '' ? this.order?.buyer_name : '' }}  ИНН: {{ this.order?.ur_persone?.inn != '' ? this.order?.ur_persone?.inn : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down">
            <b>Склад {{ this.order?.buyer_w_id ? ' #'+this.order?.buyer_w_id : '' }}</b>
            <p>{{ this.order?.buyer_w_address ? this.order?.buyer_w_address : '' }}</p>
          </div>
        </div>

        <div class="order-card__orderinfo-grid">
          <div class="order-card__orderinfo-grid-lable">Отсрочка</div>
          <div class="order-card__orderinfo-grid-text" v-if="this.order?.delay_text">
            {{ this.order?.delay_text }}
          </div>
          <div class="order-card__orderinfo-grid-text" v-else>
            {{ this.order?.delay != '' ? (Number.parseInt(this.order?.delay) ? this.order?.delay + ' дн.' : this.order?.delay) : '0 дн.' }}
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
            {{ this.order?.delay != '' ? (Number.parseInt(this.order?.delay) ? this.order?.delay + ' дн.' : this.order?.delay) : '0 дн.' }}
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
          <div  class="order-card__ordercomment-container" v-if="order.comment">
            <div class="order-card__orderinfo-grid-lable">Комментарий:</div>
            <div v-html="order.comment"></div>
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
        :total="optorder.products.length"
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
        count: {
          label: 'Кол-во',
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
    }
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
    editOrder(){
      let head = 'Вы уверены, что хотите отредактировать заказ №' + this.$route.params.order_id + '?'
      let mess = 'Корзина поставщика ' + this.order?.seller_name + ' будет очищена. Добавить текущий заказ для редактирования в корзину?'
      this.$confirm.require({
        message: mess,
        header: head,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading = true
          this.setOrderEditToCart({
            store_id: this.optorder.warehouse_id,
            seller_id: this.optorder.seller_id,
            seller_store_id: this.optorder.store_id
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

  },
  mounted() {
    this.getOptOrder({
      order_id: this.$route.params.order_id,
    }).then(() => (this.loading = false))
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
.d-top-order-container-date-created-hidden.d-top-order-container-date-created{
  display:none;
}
.order-card__orderinfo-grid-text-down p{
  margin-top: 4px;
}
@media (width <= 3000px) {
  .d-top-order-container-buttons-order_text.d-top-order-container-buttons-text p {
    max-width: 350px;
    color: #75757575;
  }
}
.d-button-quaternary:disabled{
  cursor: default;
  background-color: #75757540;
  color: #75757599;
  font-weight: 600;
}
.d-button--sm-shadow:disabled{
  box-shadow: none;
}
.d-top-order-container-buttons {
  align-items: center;
}
.order-card__action-edit{
  padding-left: 8px;
  padding-right: 8px;
  position: relative;
  font-size: 18px;
  color:#757575;
  display: flex;
  align-items: center;
}
.order-card__action-edit:before{
  content: '';
  background-color: rgb(117 117 117 / 30%);
  width: 0.5px;
  height: 13px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-50%, -50%);
}
.order-card__cancel i{
  transform: rotate(45deg);
  font-size: 18px;
}
.order-card__docs .item-list-item-icon {
  font-size: 20px;
  font-weight: 600;
}
.order-card__modal button{
  min-width: 111px;
}
// grids
.order-card__orderinfo-line2 .order-card__orderinfo-grid{
  display:none;
}
.order-card__orderinfo-grid{
  height: 100%;
  align-items: start;
  grid-template-rows: auto 100%
}
.order-card__orderinfo-line1{
  display: grid;
  grid-template-columns: 139fr 149fr 400fr 400fr 150fr 150fr 134fr;
  grid-template-rows: 100%;
  grid-row-gap: 24px;
  align-items: start;
}
.order-card__orderinfo-line2 {
 grid-template-columns: 100%;
 grid-template-rows: 100%;
 align-items: start;
 gap: 8px;
}
.order-card__ordercomment{
  display: grid;
  width: 90%;
}
.order-card__orderinfo-grid:first-child{
  padding-left: 0;
}
.order-card__orderinfo-grid:not(:first-child){
  border-left: 0.5px solid #75757575;
}
//
.d-top-order-container-left-top{
  display: flex;
  gap: 16px;
  align-items: center;
}
.d-top-order-container-left {
  flex-direction: column;
  gap: 16px;
}
.d-top-order-container-date-created {
  margin-top: 0px;
}
.d-top-order-container-left-top .d-badge2 {
  border-radius: 41px;
  padding: 7px 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #ededed;
  min-height: 32px;
  min-width: auto;
}
@media (width <= 1536px) {
  .d-top-order-container-left{
    gap: 8px;
  }
  .shipments .d-top-order-container{
    align-items: center;
  }
  // grids
  .order-card__orderinfo-grid, .order-card__ordercomment {
    padding: 0 18px !important;
    margin:  0 0 0 0 !important;
    width: 100% !important;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:first-child{
    padding-left:0px !important;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(-n){
    display:none;
  }
  .order-card__orderinfo-line1.order-card__orderinfo{
    display: grid;
    grid-template-columns: 147fr 196fr 327fr 327fr 178fr;
    grid-template-rows: auto;
    grid-row-gap: 24px;
  }
  .order-card__orderinfo-grid-lable{
    height: min-content;
  }
  .order-card__orderinfo-line2.order-card__orderinfo{
    display: grid;
    grid-template-columns: 178fr 189fr 905fr;
    grid-template-rows: auto;
    grid-row-gap: 0px;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(6){
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(7){
    display: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(2){
    display: inline-grid;
    border-left: none;
    padding-left: 0 !important;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(3){
    display: inline-grid;
  }
  .order-card__ordercomment{
    display: grid;
    padding-left: 18px;
    border-left: 0.5px solid #75757575;
    grid-column-start: auto;
    grid-column-end: auto;
  }
  .order-card__orderinfo-grid:first-child{
    padding-left: 0;
  }
  .order-card__orderinfo-grid:not(:first-child){
    border-left: 0.5px solid #75757575;
  }
  //
  .d-top-order-container h2{
    font-size: 20px;
  }
  .d-top-order-container-buttons button {
    height: 38px;
    min-height: 38px;
    max-height: 38px;
  }
  .d-top-order-container-left-top .d-badge2 {
    border-radius: 41px;
    padding: 6px 16px;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #ededed;
    min-height: 30px;
    min-width: auto;
  }
  .order-card__orderinfo-grid-text {
    margin-top: 8px;
  }
  .order-card__ordercomment-container {
    gap: 8px !important;
  }
}
@media (width <= 1280px) {
  .shipments .d-top-order-container{
    align-items: end;
  }
  .order-card__orderinfo-grid-text-down-min, .order-card__orderinfo-grid-text-down, .order-card__ordercomment-container div {
    font-size: 12px;
    font-weight: 400;
  }
  .order-card__orderinfo-grid-text-down, .order-card__orderinfo-grid-text{
    margin-top: 8px;
  }
  .order-card__orderinfo-grid-text-down b{
    margin-bottom: 8px;
  }
  // grids
  .order-card__orderinfo-grid, .order-card__ordercomment {
    padding: 0 22px !important;
  }
  .order-card__orderinfo-grid, .order-card__ordercomment {
    padding: 0 22px !important;
    margin:  0 0 0 0 !important;
    width: 100% !important;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:first-child{
    padding-left:0px !important;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(-n){
    display:none;
  }
  .order-card__orderinfo-line1.order-card__orderinfo{
    display: grid;
    grid-template-columns: 102fr 184fr 274fr 274fr 173fr;
    grid-template-rows: auto;
    grid-row-gap: 24px;
  }
  .order-card__orderinfo-grid-lable{
    height: min-content;
  }
  .order-card__orderinfo-line2.order-card__orderinfo{
    display: grid;
    grid-template-columns: 162fr 180fr 666fr;
    grid-template-rows: auto;
    grid-row-gap: 0px;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(6){
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(7){
    display: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(2){
    display: inline-grid;
    border-left: none;
    padding-left: 0 !important;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(3){
    display: inline-grid;
  }
  .order-card__ordercomment{
    display: grid;
    padding-left: 22px;
    border-left: 0.5px solid #75757575;
    grid-column-start: auto;
    grid-column-end: auto;
  }
  //
  .d-top-order-container h2{
    font-size: 16px;
  }
  .d-top-order-container-buttons button {
    height: 31px;
    min-height: 31px;
    max-height: 31px;
  }
  .d-top-order-container-left-top .d-badge2 {
    border-radius: 41px;
    padding: 4px 10px;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #ededed;
    min-height: 24px;
    min-width: auto;
  }
  .d-top-order-container-buttons {
    gap: 8px;
  }
}
@media (width <= 1024px) {
  .d-top-order-container-left-top .d-badge2 {
    padding: 3px 8px;
    font-size: 9px;
    line-height: 11px;
    min-height: 18px;
    max-height: 18px;
  }
  .shipments button span {
    font-size: 10px;
  }
  .order-card__cancel i {
    font-size: 12px;
  }
  .order-card__repeat .item-list-item-icon {
    font-size: 12px !important;
  }
  .order-card__docs .item-list-item-icon {
    font-size: 15px;
  }
  .order-card__action-edit i{
    font-size: 13px;
  }
  .d-top-order-container-left {
    gap: 8px;
  }
  .order-card__action-edit{
    color: #282828;
  }
}
@media (width <= 800px) {
  .d-top-order-container h2 {
    font-size: 14px;
  }
  .d-top-order-container-left-top .order-card__status {
    font-size: 9px !important;
  }
  .d-top-order-container-date-created {
    font-size: 12px;
    margin-top: 0px;
  }
  .order_content .d-top-order-container{
    flex-direction: row;
    align-items: end;
  }
  .order_content .d-top-order-container-buttons button, .shipments .d-badge2 {
    height: 20px;
    max-height: 20px;
    min-height: 20px;
  }
  // grids
  .order-card__orderinfo-grid {
    padding: 0 10px !important;
    margin:  0 0 0 0 !important;
    width: 100% !important;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:first-child{
    padding-left:0px !important;
  }
  .order-card__orderinfo-line1.order-card__orderinfo{
    display: grid;
    grid-template-columns: 70fr 150fr 180fr 231fr;
    grid-template-rows: auto;
    grid-row-gap: 24px;
  }
  .order-card__orderinfo-grid-lable{
    height: min-content;
  }
  .order-card__orderinfo-line2.order-card__orderinfo{
    display: grid;
    grid-template-columns: 190fr 305fr 515fr;
    grid-template-rows: auto auto;
    grid-row-gap: 24px;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(5){
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(6){
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(7){
    display: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:first-child{
    display: inline-grid;
    border-left: none;
    padding-left: 0 !important;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(2){
    display: inline-grid;
    border-left: 1px solid #75757575;
    padding-left: 10px !important;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(3){
    display: inline-grid;
  }
  .order-card__ordercomment{
    display: grid;
    padding: 0px !important;
    border-left: none;
    grid-column-start: 1;
    grid-column-end: 4;
  }
  //
  .order-card__orderinfo-grid-lable {
    font-size: 10px;
    line-height: 12px;
  }
  .d-top-order-container-info h3, .d-order-container h3 {
    font-size: 14px;
    line-height: 16px;
  }
  .order-card__orderinfo-grid-text{
    font-size: 12px;
    line-height: 14px;
  }
  .order-card__orderinfo-grid-text-down{
    font-size: 10px;
    line-height: 12px;
  }
  .order-card__orderinfo-grid-text-down-min, .order-card__ordercomment-container div {
    font-size: 10px;
  }
}
@media (width <= 700px) {
  .d-top-order-container{
    flex-direction: column !important;
    justify-content: center;
    align-items: start !important;
    gap: 8px;
    padding-bottom: 30px !important;
  }
  .order-card__orderinfo {
    padding-bottom: 16px;
  }
  .d-top-order-container-left{
    flex-direction: row;
    gap: 8px;
  }
  .d-top-order-container-date-created-hidden.d-top-order-container-date-created{
    display: flex;
  }
  .d-top-order-container-date-created:not(.d-top-order-container-date-created-hidden){
    display:none;
  }
  .d-top-order-container-left-top .d-badge2{
    height: 16px;
    max-height: 16px;
    min-height: 16px;
  }
  .order_content .d-top-order-container-buttons button {
    height: 18px;
    max-height: 18px;
    min-height: 18px;
    font-size: 9px;
    padding: 3px 8px;
    gap: 8px;
  }
  .order-card__action-edit{
    padding-left: 0 !important;
  }
  .d-top-order-container-info h3 {
    margin-top: 16px;
    margin-bottom: 16px;
  }
  // grids
  .order-card__orderinfo-grid {
    padding: 0 8px !important;
    margin:  0 0 0 0 !important;
    width: 100% !important;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:first-child{
    padding-left:0px !important;
  }
  .order-card__orderinfo-line1.order-card__orderinfo{
    display: grid;
    grid-template-columns: 78fr 86fr 158fr 150fr;
    grid-template-rows: auto;
    grid-row-gap: 16px;
  }
  .order-card__orderinfo-grid-lable{
    height: min-content;
  }
  .order-card__orderinfo-line2.order-card__orderinfo{
    display: grid;
    grid-template-columns: 76fr 86fr 116fr 194fr;
    grid-template-rows: auto;
    grid-row-gap: 0px;
    gap: 0;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(5){
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(6){
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(7){
    display: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:first-child{
    display: inline-grid;
    border-left: none;
    padding-left: 0 !important;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(2){
    display: inline-grid;
    border-left: 1px solid #75757575;
    padding-left: 10px !important;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(3){
    display: inline-grid;
  }
  .order-card__ordercomment{
    display: inline-grid;
    padding-left: 8px !important;
    border-left: 1px solid #75757575;
    grid-column-start: auto;
    grid-column-end: auto;
  }
  //
  .order-card__orderinfo-grid-lable {
    font-size: 7px;
    line-height: 9px;
  }
  .order-card__orderinfo-grid-text-down, .order-card__orderinfo-grid-text {
    margin-top: 4px;
  }
  .order-card__orderinfo-grid-text, .order-card__orderinfo-grid-text-down {
    font-size: 8px;
    line-height: 10px;
  }
  .order-card__orderinfo-grid-text-down p, .order-card__orderinfo-grid-text-down-min, .order-card__ordercomment-container div {
    font-size: 7px;
    line-height: 9px;
  }
  .order-card__ordercomment-container {
    gap: 4px !important;
  }
}
@media (width <= 600px) {
  .d-top-order-container{
    position: relative;
  }
  .d-top-order-container{
    border-bottom: none;
    padding-bottom: 40px !important;
  }
  .d-top-order-container-left-top{
    flex-direction: column;
    gap: 8px;
    align-items: start;
    justify-content: center;
  }
  .d-top-order-container-date-created{
    padding-bottom: 0;
    font-size: 14px;
  }
  .d-top-order-container h2 {
    font-size: 16px;
  }
  .order_content .d-top-order-container-left-top .d-badge2{
    height: 24px;
    max-height: 24px;
    min-height: 24px;
    font-size:12px !important;
  }
  .order-card__action-edit{
    padding-right: 0 !important;
  }
  .order-card__action-edit:before{
    display: none;
  }
  .order-card__action-edit{
    position: absolute;
    top: 0;
    right: 0;
    width:min-content !important;
    padding: 0 !important;
    align-items: start;
  }
  .order_content .d-top-order-container-buttons button {
    height: 32px;
    max-height: 32px;
    min-height: 32px;
    font-size: 12px !important;
    padding: 8px;
    gap: 8px;
  }
  .order_content  button span {
    font-size: 12px;
  }
  .order_content .d-top-order-container-buttons button:not(.order-card__action-edit) {
    width:100%;
  }
  .d-top-order-container-buttons {
    flex-direction: column-reverse;
  }
  .d-top-order-container-right{
    padding-top:40px;
  }
  .d-top-order-container-info h3, .d-order-container h3 {
    font-size: 16px;
    line-height: 18px;
    margin-top: 0;
    margin-bottom: 16px;
  }
   // grids -> flex
  .order-card__orderinfo-grid {  
    margin:  0 0 0 0 !important;
    width: 100% !important;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:first-child{
    padding-left:0px !important;
  }
  .order-card__orderinfo-line1.order-card__orderinfo{
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 0;
    padding-bottom: 0;
  }
  .order-card__orderinfo-grid-lable{
    height: min-content;
  }
  .order-card__orderinfo-line2.order-card__orderinfo{
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 0;
    padding-bottom: calc(40px - 16px);
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(5){
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(6){
    display: none;
  }
  .order-card__orderinfo-line1 .order-card__orderinfo-grid:nth-child(7){
    display: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:first-child{
    display: block;
    border-left: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(2){
    display: block;
    border-left: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(3){
    display: block;
    border-left: none;
  }
  .order-card__ordercomment{
    display: block;
  }
  .order-card__orderinfo-grid, .order-card__ordercomment{
    border-left: none;
    padding: 16px 0px !important;
  }
  .order-card__orderinfo-grid:not(:first-child) {
    border-left: none;
  }
  .order-card__orderinfo-line2 .order-card__orderinfo-grid:nth-child(2) {
    padding-left: 0 !important;
  }
  //
  .order-card__orderinfo-grid-lable, .order-card__ordercomment-container .order-card__orderinfo-grid-lable{
    font-size: 12px;
    line-height: 14px;
  }
  .order-card__orderinfo-grid-text, .order-card__orderinfo-grid-text-down {
    font-size: 16px;
    line-height: 18px;
  }
  .order-card__orderinfo-grid-text-down p, .order-card__orderinfo-grid-text-down-min, .order-card__ordercomment-container div {
    font-size: 16px;
    line-height: 18px;
  }
  .order-card__orderinfo-grid-text {
    margin-top: 8px;
  }
  .order-card__ordercomment-container {
    gap: 8px !important;
  }
  .order-card__orderinfo-grid-text-down-min,.order-card__orderinfo-grid-text-down{
    margin-top: 4px;
  }
}
</style>
