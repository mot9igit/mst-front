<template>
  <div class="d-sheet__overlay order__sheet-overlay" :class="{ active: active }">
    <div class="d-sheet__wrapper order__sheet-wrapper">
      <div
        class="d-sheet d-sheet--active order__sheet"
      >
        <Loader v-if="this.loading"></Loader>
        <div class="d-sheet__content order">
          <!-- Шапка -->
          <div class="order__header">
            <h3 class="order__header-title">Изменение заказа № {{ this.$route.params.order_id }}</h3>
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
                        <p class="order__item-header-warehouse-label">Склад #{{ optorder.warehouse_id }}</p>
                        <p class="order__item-header-warehouse-value">
                          {{
                            optorder.seller_w_name
                              ? optorder.seller_w_name
                              : optorder.seller_address
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="order__item-header-right">

                    </div>
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
                        :key="product?.key"
                      />
                    </div>
                    <a
                      href="#"
                      class="cart__item-header-button"
                      @click="
                        clearBasketProduct(product_key)
                      "
                    >
                      <i class="d-icon-trash"></i>
                    </a>
                  </div>
                  <div class="order__item-price">
                    <Counter
                      :classPrefix="'order__item-product'"
                      @ElemCount="ElemCount"
                      :item="product.count"
                      :mini="true"
                      :min="0"
                      :max="Number(product?.available)"
                      :value="Number(product?.count)"
                      :step="Number(product?.multiplicity ? product?.multiplicity : 1)"
                      :id="Number(product?.remain_id)"
                      :key="product?.key"
                    />
                    <span class="order__item-product-price"
                      >{{ product.price.toLocaleString('ru') }} ₽</span
                    >
                  </div>
                </div>
                <div class="order__item-content-bottom">
                  <div class="order__item-content-bottom-left">
                    <div class="order__item-prop">
                      <p class="order__item-prop-label">
                        {{ optorder?.delay_tupe != 2 ? (Number.parseInt(optorder?.delay) ? 'Отсрочка' : optorder?.delay) : 'Рассрочка' }}
                      </p>
                      <p class="order__item-prop-value" v-if="Number.parseInt(optorder?.delay)">{{ optorder?.delay + ' дн.' }}</p>
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
                  {{ (summ.toFixed(2)).toLocaleString('ru') }} ₽
                </p>
                <div class="order__footer-actions">
                  <button
                    class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__footer-actions-buy"
                    @click.prevent="editOrder()"
                  >
                    Изменить заказ
                  </button>
                </div>
              </div>


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

export default {
  name: 'orderWindow',
  emits: ['close', 'orderCancel'],
  components: { Loader, Counter },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      summ: 0,
      editOrderProducts: [],


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
      orderCalc: 'purchases/orderCalc',

    }),
    close() {
      this.$emit('close')
      this.editOrderProducts = []
      this.summ = 0
    },

    clearBasketProduct(index) {
      this.loading = true
      if(this.editOrderProducts.length > 1){
         this.editOrderProducts.splice(index, 1)
         this.loading = false
      }else{
        this.$emit('close')
        this.editOrderProducts = []
        this.summ = 0
        this.$emit('orderCancel')
        this.loading = false
      }

    },

    ElemCount(object) {
      this.loading = false
      const index = object.index
      console.log(object)
      if (object.value == object.min) {
        if(this.editOrderProducts.length > 1){
          this.summ = this.summ - this.editOrderProducts[index].cost
          this.editOrderProducts.splice(index, 1)
        }else{
          this.$emit('close')
          this.editOrderProducts = []
          this.summ = 0
          this.$emit('orderCancel')
        }

        return
      }
      if (object.value > Number(object.max)) {
        this.editOrderProducts[index].count = Number(object.value)
        this.modal_remain = true
        this.editOrderProducts[index].count --
      } else {
          console.log(object.value)
          this.editOrderProducts[index].count = Number(object.value)
          this.summ = Number(this.summ) - Number(this.editOrderProducts[index].cost)
          this.editOrderProducts[index].cost = Number(this.editOrderProducts[index].price) * Number(object.value)
          this.summ = Number(this.summ) + Number(this.editOrderProducts[index].cost)
          this.orderCalc({
            orderEdit: this.editOrderProducts
          })
      }
    },

  },
  mounted() {
    this.getOptOrder({
      order_id: this.$route.params.order_id
    }).then(() => {
      this.loading = false
    })


  },
  watch: {
    optorder: function(newVal){
      this.editOrderProducts = newVal.products
      this.summ = Number(newVal.cart_cost)
    }
  },
}
</script>
<style lang="scss"></style>
