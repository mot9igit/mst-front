<template>
  <section class="shipments" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <Loader v-if="loading" />
    <div class="d-top-order-container">
      <div class="d-top-order-container-left">
        <div>
          <h2>Заказ № {{ this.$route.params.order_id }}</h2>

          <div class="d-top-order-container-date-created">от {{ this.order.date }}</div>
        </div>
        <div class="d-badge2 d-badge2--fit d-button--sm-shadow order-card__status">
          {{ order.status_name }}
        </div>
      </div>
      <div class="d-top-order-container-right">
        <!-- <div class="d-top-order-container-buttons-text"><p>Убедитесь, что товар есть в наличии и подготовьте его к отправке.</p></div>-->
    <div class="d-top-order-container-buttons">
    <button  class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__docs" @click.prevent="modalDocs = true"  v-if="docs.length">
      <i class="item-list-item-icon d-icon-doc"></i>
      <span class="catalog__head-item-text">Документы <span v-if="docs.length">({{ docs.length }})</span></span>
		</button>
    <!--<button  class="d-button d-button-primary d-button-primary-small d-button--sm-shadow  order-card__action">
      <span class="catalog__head-item-text">Подтвердить заказ</span>
		</button>-->
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
          <div class="order-card__orderinfo-grid-text-down">
            {{ this.order?.buyer_address != '' ? this.order?.buyer_address : '' }}
          </div>
          <div class="order-card__orderinfo-grid-text-down">
            <b>Магазин/склад:</b>
            {{ this.order?.buyer_store != '' ? this.order?.buyer_store : '-' }}
          </div>
        </div>
        <div class="order-card__orderinfo-grid d-col-md-3">
          <div class="order-card__orderinfo-grid-lable">Отсрочка</div>
          <div class="order-card__orderinfo-grid-text">
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
            {{ this.order?.day_delivery }} дн. ({{ this.order?.delivery_date }})
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
        @download="downloadDoc"
      />
      <button class="d-button d-button-primary d-button-primary-small d-button--sm-shadow" @click.prevent="modalDocs = false">
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
import customModal from '@/shared/ui/Modal.vue'

export default {
  name: 'purchasesOrder',
  components: { Breadcrumbs, BaseTable, Loader, customModal },
  data() {
    return {
      loading: true,
      page: 1,
      page_docs: 1,
      order: [],
      modalDocs: false,
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
      docs: [
      //  {
      //    name: 'Файл 1',
      //    date: '23.07.2035',
      //    href: '/',
      //  },
      //  {
      //    name: 'Файл 2',
      //    date: '25.07.2035',
      //    href: '/',
      //  },
      ],
      table_docs: {
        name: {
          label: 'Название',
          type: 'text',
          class: 'cell_centeralign',
        },
        date: {
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
            download: {
              icon: 'pi pi-upload',
              label: 'Загрузить',
              url: 'href',
            },
          },
        },
      },
    }
  },

  methods: {
  ...mapActions({
      getOptOrder: 'purchases/getOptOrder',
      unsetOptOrder: 'purchases/unsetOptOrder',
    }),
    paginate(data){
      this.loading = true
      this.unsetOptOrder()
      data.page = this.page
      data.order_id = this.$route.params.order_id,
      this.getOptOrder(data).then(() => {
        this.loading = false
      })
    },
    downloadDoc(){

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
</style>
