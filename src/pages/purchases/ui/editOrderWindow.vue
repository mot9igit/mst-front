<template>
  <div class="d-sheet__overlay order__sheet-overlay" :class="{ active: active }">
    <div class="d-sheet__wrapper order__sheet-wrapper">
      <div class="d-sheet d-sheet--active order__sheet">
        <Toast />
        <Loader v-if="this.loading"></Loader>
        <div class="d-sheet__content order">
          <!-- Шапка -->
          <div class="order__header">
            <h3 class="order__header-title">
              Изменение заказа № {{ this.$route.params.order_id }}
            </h3>
            <button class="order__header-close" @click.prevent="close()">
              <i class="d-icon-times-flat"></i>
            </button>
          </div>

          <!-- Информация о плательщике -->
          <!--
          <div class="order__info">
            <div class="order__info-left">
              <div class="order__info-item">
                <p class="order__info-item-label">
                  Ваше юридическое лицо для заказа:&nbsp;
                  <span class="order__info-item-value">ООО «МСТ»</span>
                </p>
              </div>
              <div class="order__info-item">
                <p class="order__info-item-label">
                  ИНН:&nbsp;
                  <span class="order__info-item-value">7743255403</span>
                </p>
              </div>
            </div>
            <div class="order__info-right">
              <button class="order__info-edit">
                <i class="d-icon-pen2"></i>
              </button>
            </div>
          </div>
          -->
          <!-- Список товаров -->
          <div class="order__item-list" v-if="Object.keys(optorder).length > 1">
            <div>
              <div class="order__item">
                <div class="order__item-header">
                  <div class="order__item-header-top">
                    <div class="order__item-header-left">
                      <div class="d-badge2 d-badge2--fit order__item-header-badge">
                        <div class="order__item-header-badge-image-container">
                          <img
                            :src="optorder.seller_image"
                            :alt="optorder.seller_name"
                            class="order__item-header-badge-image"
                          />
                        </div>
                        <p class="order__item-header-badge-text">{{ optorder.seller_name }}</p>
                      </div>
                      <div class="d-divider d-divider--vertical order__item-header-divider"></div>
                      <div class="order__item-header-warehouse">
                        <p class="order__item-header-warehouse-label">
                          Склад #{{ optorder.warehouse_id }}
                        </p>
                        <p class="order__item-header-warehouse-value">
                          {{
                            optorder.seller_w_name
                              ? optorder.seller_w_name
                              : optorder.seller_address
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="order__item-header-right"></div>
                  </div>
                </div>
                <div class="d-divider d-divider--full d-divider--big order__item-divider"></div>
                <div
                  class="order__item-content"
                  v-for="(product, product_key) in editOrderProducts"
                  :key="product_key"
                >
                  <div class="order__item-content-top">
                    <div class="order__item-product">
                      <div class="order__item-product-image-container">
                        <img
                          :src="product.image"
                          :alt="product.name"
                          class="order__item-product-image"
                        />
                      </div>
                      <div class="order__item-product-content">
                        <p class="order__item-product-title">
                          {{ product.name }}
                        </p>
                        <div class="order__item-product-additional">
                          <p class="order__item-product-article">Арт: {{ product.article }}</p>
                          <!-- <div class="order__item-product-discount">Скидка 27%</div> -->
                        </div>
                      </div>
                    </div>
                    <div class="order__item-content-top-right">
                      <span class="order__item-product-price"
                        >{{ product.price.toLocaleString('ru') }} ₽</span
                      >
                      <Counter
                        :classPrefix="'order__item-product'"
                        @ElemCount="ElemCount"
                        :item="{ product }"
                        :mini="true"
                        :min="0"
                        :max="Number(product?.available)"
                        :value="Number(product?.count)"
                        :step="Number(product?.multiplicity ? product?.multiplicity : 1)"
                        :id="Number(product?.remain_id)"
                        :key="new Date().getTime() + '_' + Number(product?.remain_id)"
                      />
                    </div>
                    <a
                      href="#"
                      class="cart__item-header-button"
                      @click="clearBasketProduct(product_key)"
                    >
                      <i class="d-icon-trash"></i>
                    </a>
                  </div>
                </div>
                <div class="order__item-content-bottom">
                  <div class="order__item-content-bottom-left">
                    <div class="order__item-prop">
                      <p class="order__item-prop-label">
                        {{
                          optorder?.delay_tupe != 2
                            ? Number.parseInt(optorder?.delay)
                              ? 'Отсрочка'
                              : optorder?.delay
                            : 'Рассрочка'
                        }}
                      </p>
                      <p class="order__item-prop-value" v-if="Number.parseInt(optorder?.delay)">
                        {{ optorder?.delay + ' дн.' }}
                      </p>
                    </div>
                    <div class="d-divider d-divider--vertical order__item-prop-divider"></div>
                    <div class="order__item-prop">
                      <p class="order__item-prop-label">Оплата доставки:&nbsp;</p>
                      <p class="order__item-prop-value">
                        {{ optorder.payer }}
                      </p>
                    </div>
                  </div>
                  <div class="order__item-content-bottom-right">
                    <!--<button
                      class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__item-buy"
                      @click.prevent="
                        () => {
                          if (org?.cart_data?.not_available) {
                            this.showChangedCount = true
                            this.showChangedId = org.org_data.id
                          } else {
                            orderSubmit(org.org_data.id)
                          }
                        }
                      "
                    >
                      Отправить заказ
                    </button>

                      <div
                        class="d-divider d-divider--vertical order__item-content-bottom-right-divider"
                      ></div>
                      <button class="order__item-upload">
                        <i class="d-icon-upload2"></i>
                      </button>
                      -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Итого -->
          <div class="order__footer" v-if="Object.keys(optorder).length > 1">
            <div class="d-divider d-divider--full order__footer-divider"></div>

            <div class="order__footer-content">
              <div class="order__footer-left">
                <p class="order__footer-label">Итого</p>
              </div>
              <div class="order__footer-right">
                <p class="order__footer-value">
                  {{ ordercalc?.new_cost ? ordercalc?.new_cost.toFixed(2) : optorder.cost }} ₽
                </p>
                <div class="order__footer-actions">
                  <button
                    class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__footer-actions-buy"
                    @click.prevent="modalEditSubmit = true"
                  >
                    Изменить заказ
                  </button>
                </div>
              </div>
              <Teleport to="body">
                <customModal v-model="modalEditSubmit" class="order__edit-modal">
                  <h3>Подтверждение редактирование заказа</h3>
                  Вы уверены, что хотите изменить заказ № {{ this.$route.params.order_id }}?
                  <div class="collection__modal-buttons">
                    <button
                      type="button"
                      href="#"
                      class="d-button d-button-primary d-button--sm-shadow collection__modal-cansel"
                      @click.prevent="this.modalEditSubmit = false"
                    >
                      Отмена
                    </button>
                    <button
                      type="button"
                      href="#"
                      class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
                      @click.prevent="editOrder()"
                    >
                      Ok
                    </button>
                  </div>
                </customModal>
              </Teleport>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import Counter from '@/shared/ui/Counter.vue'
import customModal from '@/shared/ui/Modal.vue'
import Toast from 'primevue/toast'

export default {
  name: 'orderWindow',
  emits: ['close', 'orderCancel'],
  components: { Loader, Counter, customModal, Toast },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      fetchIds: [],
      editOrderProducts: [],
      modalEditSubmit: false,
    }
  },
  computed: {
    ...mapGetters({
      optorder: 'purchases/optorder',
      ordercalc: 'purchases/ordercalc',
    }),
  },
  methods: {
    ...mapActions({
      getOptOrder: 'purchases/getOptOrder',
      getOrderCalc: 'purchases/getOrderCalc',
      setOrderEdit: 'purchases/setOrderEdit',
    }),
    close() {
      this.loading = true
      this.$emit('close')
      this.getOptOrder({
          order_id: this.$route.params.order_id
        }).then(() => {
      this.getOrderCalc({
            orderEdit: this.optorder.products
          }).then(() => {
            this.editOrderProducts = this.ordercalc.orderEdit
            this.fetchIds = []
            for (let i = 0; i < this.editOrderProducts.length; i++) {
                this.fetchIds.push(this.editOrderProducts[i].remain_id)
            }
            this.loading = false
          })
        })
    },

    clearBasketProduct(index) {
      this.loading = true
      if (this.editOrderProducts.length > 1) {
        this.editOrderProducts.splice(index, 1)
        this.fetchIds.splice(index, 1)
        this.getOrderCalc({
          orderEdit: this.editOrderProducts,
        }).then(() => {
          this.loading = false
        })
      } else {
        this.close()
        this.$emit('orderCancel')
        this.loading = false
      }
    },

    ElemCount(object) {
      this.loading = true
      let index = this.fetchIds.indexOf(object.item.product.remain_id)
      if (object.value == object.min) {
        if (this.editOrderProducts.length > 1) {
          this.editOrderProducts.splice(index, 1)
          this.fetchIds.splice(index, 1)
          this.getOrderCalc({
            orderEdit: this.editOrderProducts,
          }).then(() => {
            this.loading = false
          })
        } else {
          this.loading = false
          this.close()
          this.$emit('orderCancel')
        }
        return
      } else {
        console.log(object)
        if (object.value > Number(object.max)) {
          this.loading = false
          this.modal_remain = true
        } else {
          this.editOrderProducts[index].count = Number(object.value)
          this.getOrderCalc({
            orderEdit: this.editOrderProducts,
          }).then(() => {
            this.loading = false
          })
        }
      }
    },
    editOrder() {
      this.loading = true
      this.setOrderEdit({
        orderEdit: this.ordercalc,
      }).then((res) => {
        if (res.data.success) {
          this.$toast.add({
            severity: 'success',
            summary: 'Заказ успешно отредактирован!',
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
        this.loading = false
        this.modalEditSubmit = false

        this.close()
      })

    },
  },
  mounted() {
    this.getOptOrder({
      order_id: this.$route.params.order_id,
    }).then(() => {
      this.getOrderCalc({
        orderEdit: this.optorder.products,
      }).then(() => {
        this.editOrderProducts = this.ordercalc.orderEdit
        this.fetchIds = []
        for (let i = 0; i < this.editOrderProducts.length; i++) {
          this.fetchIds.push(this.editOrderProducts[i].remain_id)
        }
        this.loading = false
      })
    })
  },
  watch: {
    ordercalc: function (newVal) {
      this.editOrderProducts = newVal.orderEdit
      this.fetchIds = []
      for (let i = 0; i < this.editOrderProducts.length; i++) {
            this.fetchIds.push(this.editOrderProducts[i].remain_id)
        }
    },
    // optorder: function(newVal){
    //   this.editOrderProducts = newVal.products
    //   this.fetchIds = []
    //   for (let i = 0; i < this.editOrderProducts.length; i++) {
    //         this.fetchIds.push(this.editOrderProducts[i].remain_id)
    //     }
    // },

  },
}
</script>
<style lang="scss"></style>
