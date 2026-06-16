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
        <div class="d-top-order-container-buttons">
          <button
            class="order-card__action order-card__action-edit"
            v-if="
              status.api_key == 'new' ||
              status.api_key == 'seller_started' ||
              status.api_key == 'seller_accepted' ||
              status.api_key == 'buyer_accepted'
            "
            @click.prevent="optOrderEdit()"
          >
            <i class="d-icon-pen2"></i>
          </button>

          <SelectInput
            v-model="form.status"
            @change="setStatus()"
            :options="seller_statuses"
            optionLabel="data"
            placeholder="Изменить статус"
            class="w-full md:w-56 order_change_status"
            v-if="order.portal_integration == '1'"
          >
            <template #value="slotProps">
              <span v-if="!slotProps.value">
                {{ slotProps.placeholder }}
              </span>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="order_change_status--option">
                <div
                  class="d-badge2 d-badge2--fit order-card__status"
                  :style="'background-color: #' + slotProps.option.color"
                  :class="slotProps.option.api_key ? 'status-' + slotProps.option.api_key : ''"
                >
                  {{ slotProps.option.name_seller }}
                </div>
              </div>
            </template>
          </SelectInput>

          <button
            class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__cancel"
            v-if="
              status.api_key == 'new' ||
              status.api_key == 'seller_started' ||
              status.api_key == 'seller_accepted' ||
              status.api_key == 'buyer_accepted'
            "
            @click.prevent="modalCancel = true"
          >
            <i class="item-list-item-icon d-icon-plus"></i>
            <span class="catalog__head-item-text">Отменить заказ</span>
          </button>
          <button
            class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__action order-card__action order-card__docs"
            @click.prevent="modalDocs = true"
            v-if="docs.length"
          >
            <i class="item-list-item-icon d-icon-doc"></i>
            <span class="catalog__head-item-text"
              >Документы <span v-if="docs.length">({{ docs.length }})</span></span
            >
          </button>
          <button
            class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small order-card__action order-card__docs-upload"
            @click.prevent="modalDocsUpload = true"
            v-if="order.portal_integration == '1'"
          >
            <i class="d-icon d-icon-download"></i>
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
          <router-link
            v-if="this.order?.offer_id"
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
          @deleteElem="deleteDoc"
        />
        <button
          class="d-button d-button-primary d-button-primary-small d-button--sm-shadow"
          @click.prevent="modalDocs = false"
        >
          Ok
        </button>
      </customModal>
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
      <customModal v-model="modalDocsUpload" class="order-card__modal order-card__modal-docsupload">
        <h3>Загрузить документы</h3>
        <p>Загрузите документы к заказу №{{ order.id }}</p>

        <DropZone
          class="dart-dropzone"
          :maxFiles="Number(10)"
          url="/rest/file_upload.php?upload_docs"
          :uploadOnDrop="true"
          :multipleUpload="true"
          :parallelUpload="1"
          @sending="parseFile"
          v-bind="args"
        >
          <template v-slot:message>
            <div class="dart-dropzone__custom">
              <i class="pi pi-cloud-upload"></i>
              <b>Перетащите файл в эту область</b>
              <p>Вы также можете загрузить файл, <span>нажав сюда</span></p>
            </div>
          </template>
        </DropZone>
        <div class="order-card__modal-docsupload-container">
          <button
            type="button"
            href="#"
            class="d-button d-button-primary d-button--sm-shadow order-card__modal-docsupload-container-button"
            @click.prevent="this.modalDocsUpload = false"
          >
            Отменить
          </button>
          <button
            type="button"
            href="#"
            class="d-button d-button-primary d-button--sm-shadow order-card__modal-docsupload-container-button"
            @click.prevent="saveDocs()"
          >
            Загрузить
          </button>
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
import saleWindow from '@/pages/purchases/ui/activeSalesWindow.vue'
import SelectInput from 'primevue/select'
import DropZone from 'dropzone-vue'

export default {
  name: 'WholesaleOrder',
  components: {
    Breadcrumbs,
    BaseTable,
    Loader,
    customModal,
    MinProductTable,
    saleWindow,
    SelectInput,
    DropZone,
  },
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
      form: {
        status: null,
        files: [],
      },
      modalActiveActions: false,
      modalCancel: false,
      productOrder: [],
      orderInfo: {},
      modalDocsUpload: false,
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
  emits: ['toggleOrderOffer', 'cartStore', 'refreshVendors'],
  methods: {
    ...mapActions({
      getOrder: 'wholesale/getOrder',
      unsetOrder: 'wholesale/unsetOrder',
      optOrderCancel: 'wholesale/optOrderCancel',
      editOptOrder: 'wholesale/editOptOrder',
      getSellerStatuses: 'wholesale/getSellerStatuses',
      setOrderStatus: 'wholesale/setOrderStatus',
      deleteOrderOrtDoc: 'wholesale/deleteOrderOrtDoc',
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
    deleteDoc(data) {
      console.log(data)
      this.$confirm.require({
        message: 'Вы действительно хотите удалить документ ' + data.name + '?',
        header: 'Подтвердите удаление документа',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading = true
          this.deleteOrderOrtDoc({ doc_id: data.id }).then((res) => {
            if (res.data.success) {
              this.$toast.add({
                severity: 'success',
                summary: 'Удаление документа',
                detail: 'Документ удален!',
                life: 3000,
              })
              let data = {}
              data.order_id = this.$route.params.order_id
              data.page = this.page
              data.perpage = this.pagination_items_per_page
              this.getOrder(data).then(() => {
                this.loading = false
              })
            } else {
              this.$toast.add({
                severity: 'error',
                summary: 'Удаление документа',
                detail: res.data.message,
                life: 3000,
              })
            }
          })
        },
        reject: () => {
          this.$toast.add({
            severity: 'error',
            summary: 'Удаление документа',
            detail: 'Действие отклонено',
            life: 3000,
          })
        },
      })
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
    saleModal(data) {
      this.modalActiveActions = true
      this.productOrder = data
    },
    optOrderEdit() {
      let head =
        'Вы уверены, что хотите отредактировать заказ №' + this.$route.params.order_id + '?'
      let mess =
        'Перейти на страницу создания предложения для поставщика ' +
        this.order?.buyer_name +
        ', склад #' +
        this.order?.buyer_w_id +
        '?'
      this.$confirm.require({
        message: mess,
        header: head,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading = true
          this.$emit('cartStore', this.order.warehouse_id)
          this.editOptOrder({
            order_id: this.$route.params.order_id,
          }).then(() => {
            this.loading = false
            let vendor_data = {}
            vendor_data.org_id = this.order.from_org_id
            vendor_data.store_id = this.order.store_id
            this.$emit('refreshVendors', vendor_data)

            setTimeout(() => {
              this.$router.push({
                name: 'WholesalesOfferClient',
                params: { id: this.$route.params.id, id_org_from: this.order.org_id },
              })
              this.$emit('toggleOrderOffer')
            }, 500)
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
    cancelOrder() {
      this.loading = true
      let data = {}
      data.order_id = this.$route.params.order_id
      this.optOrderCancel(data).then((res) => {
        this.loading = false
        if (res.data.success) {
          this.$toast.add({
            severity: 'success',
            summary: 'Заказ успешно отменен!',
            detail: res.data.message,
            life: 3000,
          })
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: res.data.message,
            life: 3000,
          })
        }
        data.page = this.page
        data.perpage = this.pagination_items_per_page
        data.order_id = this.$route.params.order_id
        this.getOrder(data).then(() => {
          this.loading = false
          this.modalCancel = false
        })
      })
    },
    setStatus() {
      this.loading = true
      this.setOrderStatus({ status_id: this.form.status.id }).then(() => {
        this.form.status = null
        let data = {}
        data.order_id = this.$route.params.order_id
        data.page = this.page
        data.perpage = this.pagination_items_per_page
        this.getOrder(data).then(() => {
          this.loading = false
        })
      })
    },
    parseFile(files, xhr) {
      console.log(files)
      console.log(xhr)
      // const callback = (e) => {
      //   const res = JSON.parse(e)
      //   console.log(res)
      //   if (res.data.files[0].name) {
      //     this.formRequirements.file = res.data.files[0]
      //   }
      // }
      // xhr.onreadystatechange = () => {
      //   if (xhr.readyState === 4) {
      //     callback(xhr.response)
      //   }
      // }
    },
  },
  mounted() {
    this.getOrder({
      page: this.page,
      perpage: this.pagination_items_per_page,
      order_id: this.$route.params.order_id,
    }).then(() => {
      this.orderInfo.seller_name = this.order.seller_name
      this.orderInfo.seller_img = this.order.seller_image
      this.orderInfo.delivery = this.order.day_delivery
      this.orderInfo.payer = this.order.payer
      this.orderInfo.delay_type = this.order.delay_type
      this.orderInfo.delay = this.order.delay
      if (this.order.portal_integration == '1') {
        this.getSellerStatuses()

        this.table_docs.actions.available.delete = {
          icon: 'pi pi-trash',
          label: 'Удалить',
        }
        this.table_docs.actions.label = 'Скачать / Удалить'
      }
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      order: 'wholesale/order',
      seller_statuses: 'wholesale/seller_statuses',
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
      if (newVal.portal_integration == '1') {
        this.getSellerStatuses()
      }
    },
    refreshOrderPage: function (newVal) {
      if (newVal == true) {
        this.loading = true
        this.getOrder({
          page: this.page,
          perpage: this.pagination_items_per_page,
          order_id: this.$route.params.order_id,
        }).then(() => {
          this.loading = false
        })
      }
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.order-card__modal-docsupload {
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
  .dart-dropzone {
    margin-top: 41px;
    margin-bottom: 32px;
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
    }
  }
}
</style>
